import { schemaNamesReachableFromPaths } from "./reachable-schemas";

const SCHEMA_REF_PREFIX = "#/components/schemas/";
const WEBHOOK_PREFIX = "Webhook";

/**
 * Webhook copies that are not the same JSON as the API schema, but the API
 * schema is the object the backend serializes on the event. The API body is
 * left as it is, so generated SDK specs stay on that body.
 *
 * Checked against voucherify-mono serializers (DTO / Simple* classes), not
 * against the webhook file.
 */
export const WEBHOOK_COPIES_REPLACED_BY_API = [
  // Unit discount effect includes ADD_SAME_ITEMS.
  "DiscountUnitVouchersEffectTypes",
  // GiftDTO / SimpleGift emit subtracted_amount and copy unknown keys through.
  "Gift",
  // LoyaltyPointsBucketDTO is the event object. The copy only adds a pattern and a default.
  "LoyaltyPointsBucket",
  // earning_rules and rewards are optional on LoyaltyTierDTO.
  "LoyaltyTierBase",
  // referee_reward.amount is an integer. type is GIFT_VOUCHER or LOYALTY_CARD.
  "ReferralProgram",
  // Reward events use RewardDTO, which includes created_at.
  "Reward",
  // Material reward requires product.id. sku_id is optional.
  "RewardTypeMaterial",
  // SimpleOrderItem emits id and the applied quantity fields.
  "SimpleOrderItem",
  // SimpleVoucher emits redemption.redeemed_points.
  "SimpleVoucher",
  // days_of_week items are integers 0 through 6.
  "ValidityHours",
] as const;

type JsonObject = { [key: string]: JsonValue };
type JsonValue = null | boolean | number | string | JsonValue[] | JsonObject;

const IGNORED_KEYS = new Set([
  "description",
  "title",
  "example",
  "examples",
  "externalDocs",
]);

function isObject(value: JsonValue | unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function schemaName(ref: string): string | undefined {
  if (!ref.startsWith(SCHEMA_REF_PREFIX)) {
    return undefined;
  }
  return ref.slice(SCHEMA_REF_PREFIX.length);
}

function webhookBaseName(name: string): string | undefined {
  if (
    !name.startsWith(WEBHOOK_PREFIX) ||
    name.length === WEBHOOK_PREFIX.length
  ) {
    return undefined;
  }
  return name.slice(WEBHOOK_PREFIX.length);
}

function canonical(
  node: JsonValue,
  rewriteRef: (ref: string) => string,
): JsonValue {
  if (Array.isArray(node)) {
    return node.map((item) => canonical(item, rewriteRef));
  }
  if (!isObject(node)) {
    return node;
  }
  const out: JsonObject = {};
  for (const key of Object.keys(node).sort()) {
    if (IGNORED_KEYS.has(key) || key.startsWith("x-")) {
      continue;
    }
    const value = node[key];
    if (key === "$ref" && typeof value === "string") {
      out[key] = rewriteRef(value);
    } else {
      out[key] = canonical(value, rewriteRef);
    }
  }
  return out;
}

function rewriteRefs(node: JsonValue, dropped: Set<string>): void {
  if (Array.isArray(node)) {
    node.forEach((item) => rewriteRefs(item, dropped));
    return;
  }
  if (!isObject(node)) {
    return;
  }
  for (const [key, value] of Object.entries(node)) {
    if (key === "$ref" && typeof value === "string") {
      const name = schemaName(value);
      const base = name ? webhookBaseName(name) : undefined;
      if (base && dropped.has(base) && name === `${WEBHOOK_PREFIX}${base}`) {
        node[key] = `${SCHEMA_REF_PREFIX}${base}`;
      }
    } else {
      rewriteRefs(value, dropped);
    }
  }
}

function collectSchemaRefs(node: JsonValue, acc: string[]): void {
  if (Array.isArray(node)) {
    node.forEach((item) => collectSchemaRefs(item, acc));
    return;
  }
  if (!isObject(node)) {
    return;
  }
  for (const [key, value] of Object.entries(node)) {
    if (key === "$ref" && typeof value === "string") {
      const name = schemaName(value);
      if (name) {
        acc.push(name);
      }
    } else {
      collectSchemaRefs(value, acc);
    }
  }
}

/**
 * Deletes webhook copies that match the API schema once description, title,
 * examples, and extension keys are ignored. Also deletes the names in
 * `replacedByApi`, then any copy that only differed by a `$ref` to a deleted
 * copy. Refs are retargeted at the API name. Schemas reachable from `paths`
 * are not edited.
 */
export function dropMatchingWebhookCopies(
  document: JsonObject,
  replacedByApi: readonly string[] = WEBHOOK_COPIES_REPLACED_BY_API,
): { document: JsonObject; dropped: string[] } {
  const clone = JSON.parse(JSON.stringify(document)) as JsonObject;
  const schemas =
    clone.components && isObject(clone.components)
      ? clone.components.schemas
      : undefined;
  if (!isObject(schemas)) {
    throw new Error("OpenAPI document has no components.schemas");
  }

  const pairs = Object.keys(schemas).flatMap((name) => {
    const base = webhookBaseName(name);
    if (!base || !Object.prototype.hasOwnProperty.call(schemas, base)) {
      return [];
    }
    return [base];
  });
  const pairSet = new Set(pairs);

  for (const name of replacedByApi) {
    if (!pairSet.has(name)) {
      throw new Error(`No Webhook${name} copy to replace with ${name}`);
    }
  }

  const dropped = new Set<string>(replacedByApi);
  let grew = true;
  while (grew) {
    grew = false;
    const rewrite = (ref: string) => {
      const name = schemaName(ref);
      const base = name ? webhookBaseName(name) : undefined;
      if (base && dropped.has(base) && name === `${WEBHOOK_PREFIX}${base}`) {
        return `${SCHEMA_REF_PREFIX}${base}`;
      }
      return ref;
    };
    for (const base of pairs) {
      if (dropped.has(base)) {
        continue;
      }
      const apiJson = JSON.stringify(canonical(schemas[base], (ref) => ref));
      const copyJson = JSON.stringify(
        canonical(schemas[`${WEBHOOK_PREFIX}${base}`], rewrite),
      );
      if (apiJson === copyJson) {
        dropped.add(base);
        grew = true;
      }
    }
  }

  const reachable = schemaNamesReachableFromPaths(clone);
  for (const name of reachable) {
    if (dropped.has(webhookBaseName(name) || "")) {
      throw new Error(`Refusing to drop ${name}: it is reachable from paths`);
    }
    const refs: string[] = [];
    collectSchemaRefs(schemas[name], refs);
    for (const ref of refs) {
      const base = webhookBaseName(ref);
      if (base && dropped.has(base) && ref === `${WEBHOOK_PREFIX}${base}`) {
        throw new Error(
          `Refusing to retarget ${name} -> ${ref}: ${name} is reachable from paths`,
        );
      }
    }
  }

  rewriteRefs(clone, dropped);
  for (const base of dropped) {
    delete schemas[`${WEBHOOK_PREFIX}${base}`];
  }

  return { document: clone, dropped: [...dropped].sort() };
}
