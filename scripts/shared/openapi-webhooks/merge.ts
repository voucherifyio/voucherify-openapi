const SCHEMA_REF_PREFIX = "#/components/schemas/";

type JsonObject = { [key: string]: JsonValue };
type JsonValue = null | boolean | number | string | JsonValue[] | JsonObject;

export type WebhookMergeResult = {
  document: JsonObject;
  renames: { [from: string]: string };
};

function isObject(value: JsonValue | unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function schemaRefs(node: JsonValue, acc: string[] = []): string[] {
  if (Array.isArray(node)) {
    node.forEach((item) => schemaRefs(item, acc));
    return acc;
  }
  if (!isObject(node)) {
    return acc;
  }
  for (const [key, value] of Object.entries(node)) {
    if (
      key === "$ref" &&
      typeof value === "string" &&
      value.startsWith(SCHEMA_REF_PREFIX)
    ) {
      acc.push(value.slice(SCHEMA_REF_PREFIX.length));
    } else {
      schemaRefs(value, acc);
    }
  }
  return acc;
}

function closure(schemas: JsonObject, roots: string[]): Set<string> {
  const seen = new Set<string>();
  const stack = [...roots];
  while (stack.length > 0) {
    const name = stack.pop() as string;
    if (!name || seen.has(name)) {
      continue;
    }
    seen.add(name);
    const schema = schemas[name];
    if (schema !== undefined) {
      schemaRefs(schema).forEach((ref) => stack.push(ref));
    }
  }
  return seen;
}

function webhookSchemaName(original: string, taken: Set<string>): string {
  const base = `Webhook${original}`;
  if (!taken.has(base)) {
    return base;
  }
  let suffix = 2;
  while (taken.has(`${base}${suffix}`)) {
    suffix += 1;
  }
  return `${base}${suffix}`;
}

function rewriteRefs(
  value: JsonValue,
  renames: Map<string, string>,
): JsonValue {
  if (Array.isArray(value)) {
    return value.map((item) => rewriteRefs(item, renames));
  }
  if (!isObject(value)) {
    return value;
  }
  const copy: JsonObject = {};
  for (const [key, child] of Object.entries(value)) {
    if (
      key === "$ref" &&
      typeof child === "string" &&
      child.startsWith(SCHEMA_REF_PREFIX)
    ) {
      const name = child.slice(SCHEMA_REF_PREFIX.length);
      copy[key] = renames.has(name)
        ? `${SCHEMA_REF_PREFIX}${renames.get(name)}`
        : child;
    } else {
      copy[key] = rewriteRefs(child, renames);
    }
  }
  return copy;
}

/**
 * Copies webhook operations into the main document.
 *
 * An API schema is never replaced. A webhook schema keeps its name when the
 * main file does not already use it. When both files define the same name and
 * the bodies differ, or a shared body points at one of those copies, the
 * webhook schema is stored as `Webhook<Name>` and webhook `$ref`s follow it.
 * Schemas that no webhook operation reaches are not copied.
 */
export function mergeWebhooksIntoOpenApi(
  main: JsonObject,
  webhooksDocument: JsonObject,
): WebhookMergeResult {
  if (main.openapi !== "3.1.0" || webhooksDocument.openapi !== "3.1.0") {
    throw new Error(
      `Both documents must be OpenAPI 3.1.0, received ${JSON.stringify(
        main.openapi,
      )} and ${JSON.stringify(webhooksDocument.openapi)}`,
    );
  }
  if (isObject(main.webhooks as JsonValue)) {
    throw new Error("Main document already defines webhooks");
  }
  if (!isObject(webhooksDocument.webhooks as JsonValue)) {
    throw new Error("Webhook document has no webhooks object");
  }

  const mainComponents = isObject(main.components as JsonValue)
    ? (main.components as JsonObject)
    : {};
  const mainSchemas = isObject(mainComponents.schemas as JsonValue)
    ? (mainComponents.schemas as JsonObject)
    : {};
  const webhookComponents = isObject(webhooksDocument.components as JsonValue)
    ? (webhooksDocument.components as JsonObject)
    : {};
  const webhookSchemas = isObject(webhookComponents.schemas as JsonValue)
    ? (webhookComponents.schemas as JsonObject)
    : {};
  const webhooks = webhooksDocument.webhooks as JsonObject;

  const reachable = closure(webhookSchemas, schemaRefs(webhooks));
  const isPrivate = new Set<string>();
  for (const name of reachable) {
    if (!Object.prototype.hasOwnProperty.call(webhookSchemas, name)) {
      continue;
    }
    if (
      !Object.prototype.hasOwnProperty.call(mainSchemas, name) ||
      JSON.stringify(mainSchemas[name]) !== JSON.stringify(webhookSchemas[name])
    ) {
      isPrivate.add(name);
    }
  }
  let grew = true;
  while (grew) {
    grew = false;
    for (const name of reachable) {
      if (
        isPrivate.has(name) ||
        !Object.prototype.hasOwnProperty.call(webhookSchemas, name)
      ) {
        continue;
      }
      if (schemaRefs(webhookSchemas[name]).some((ref) => isPrivate.has(ref))) {
        isPrivate.add(name);
        grew = true;
      }
    }
  }

  const taken = new Set<string>([
    ...Object.keys(mainSchemas),
    ...Object.keys(webhookSchemas),
  ]);
  const renames = new Map<string, string>();
  for (const name of isPrivate) {
    if (!Object.prototype.hasOwnProperty.call(mainSchemas, name)) {
      continue;
    }
    const next = webhookSchemaName(name, taken);
    renames.set(name, next);
    taken.add(next);
  }

  const added: JsonObject = {};
  for (const name of Object.keys(webhookSchemas)) {
    if (!reachable.has(name) || !isPrivate.has(name)) {
      continue;
    }
    const target = renames.get(name) ?? name;
    added[target] = rewriteRefs(webhookSchemas[name], renames);
  }

  const components: JsonObject = {
    ...mainComponents,
    schemas: { ...mainSchemas, ...added },
  };
  const document: JsonObject = {};
  for (const [key, value] of Object.entries(main)) {
    document[key] = key === "components" ? components : value;
  }
  if (!Object.prototype.hasOwnProperty.call(document, "components")) {
    document.components = components;
  }
  document.webhooks = rewriteRefs(webhooks, renames);

  return { document, renames: Object.fromEntries(renames) };
}
