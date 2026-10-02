/**
 * Converts this repository's OpenAPI 3.0.1 dialect to 3.1.0 and back.
 *
 * The only keyword in reference/OpenAPI.json that changes meaning between
 * those versions is `nullable`. OpenAPI 3.1 schemas are JSON Schema
 * 2020-12, which has no `nullable`. A typed schema becomes a union with
 * `null`. A composition (allOf / anyOf / oneOf / not) is wrapped in
 * `anyOf` with `{ "type": "null" }`, because putting `null` on `type`
 * would still require the composition to match.
 *
 * `type: "null"` is already used in this spec and is legal in 3.1, so it
 * stays. `example` stays too: JSON Schema keeps unknown keywords as
 * annotations, and this file uses `example` on thousands of schemas.
 * `enum` is not given an extra `null` entry. A strict 3.1 validator can
 * reject `null` for those two enums; keeping the enum bytes is what makes
 * the downgrade identical to the original document. Instance values under
 * `example`, `examples`, `default`, and `enum` are not walked.
 *
 * Key order is part of the round-trip. `nullable` immediately before
 * `type` is encoded as `["null", "<type>"]`. Any other position is stored
 * in `x-openapi-30-nullable-index` and removed on the way back to 3.0.1.
 */
const INSTANCE_KEYS = new Set(["example", "examples", "default", "enum"]);
const COMPOSITION_KEYS = ["allOf", "anyOf", "oneOf", "not"] as const;

/**
 * Present only when `nullable` was not adjacent to `type` (or not the first
 * key of a composition). Downgrade removes it and puts `nullable` back at
 * this index so the 3.0.1 document matches the original key order.
 */
export const OPENAPI_30_NULLABLE_INDEX = "x-openapi-30-nullable-index";

type JsonObject = { [key: string]: JsonValue };
type JsonValue = null | boolean | number | string | JsonValue[] | JsonObject;

function isObject(value: JsonValue): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function upgradeOpenApi301To310<T extends { openapi: string }>(
  document: T,
): T {
  if (document.openapi !== "3.0.1") {
    throw new Error(
      `Expected OpenAPI 3.0.1, received ${JSON.stringify(document.openapi)}`,
    );
  }

  const upgraded = upgradeValue(structuredClone(document), "#") as T;
  upgraded.openapi = "3.1.0";
  return upgraded;
}

export function downgradeOpenApi310To301<T extends { openapi: string }>(
  document: T,
): T {
  if (document.openapi !== "3.1.0") {
    throw new Error(
      `Expected OpenAPI 3.1.0, received ${JSON.stringify(document.openapi)}`,
    );
  }

  const downgraded = downgradeValue(structuredClone(document)) as T;
  downgraded.openapi = "3.0.1";
  return downgraded;
}

/**
 * SDK and documentation generators still emit OpenAPI 3.0.1.
 * A 3.0.1 document is returned as-is. A 3.1.0 document is downgraded.
 */
export function ensureOpenApi301<T extends { openapi: string }>(
  document: T,
): T {
  if (document.openapi === "3.0.1") {
    return document;
  }
  if (document.openapi === "3.1.0") {
    return downgradeOpenApi310To301(document);
  }
  throw new Error(
    `Cannot represent OpenAPI ${JSON.stringify(document.openapi)} as 3.0.1`,
  );
}

function upgradeValue(value: JsonValue, path: string): JsonValue {
  if (Array.isArray(value)) {
    return value.map((item, index) => upgradeValue(item, `${path}/${index}`));
  }
  if (!isObject(value)) {
    return value;
  }

  const next: JsonObject = {};
  for (const [key, child] of Object.entries(value)) {
    next[key] = INSTANCE_KEYS.has(key)
      ? child
      : upgradeValue(child, `${path}/${key}`);
  }
  if (!("nullable" in next)) {
    return next;
  }
  return upgradeNullable(next, path);
}

function upgradeNullable(schema: JsonObject, path: string): JsonObject {
  if (schema.nullable !== true) {
    throw new Error(
      `${path}: expected nullable: true, received ${JSON.stringify(
        schema.nullable,
      )}`,
    );
  }
  if (COMPOSITION_KEYS.some((key) => key in schema)) {
    return wrapNullableComposition(schema);
  }
  if (typeof schema.type !== "string") {
    throw new Error(
      `${path}: nullable schema needs a string type or a composition keyword (allOf, anyOf, oneOf, not)`,
    );
  }
  if (schema.type === "null") {
    throw new Error(
      `${path}: nullable cannot be combined with type null; type null is already valid in OpenAPI 3.1`,
    );
  }
  return convertSimpleNullable(schema);
}

function wrapNullableComposition(schema: JsonObject): JsonObject {
  const keys = Object.keys(schema);
  const nullableIndex = keys.indexOf("nullable");
  const inner: JsonObject = {};
  for (const key of keys) {
    if (key !== "nullable") {
      inner[key] = schema[key];
    }
  }

  const wrapped: JsonObject = {
    anyOf: [inner, { type: "null" }],
  };
  if (nullableIndex !== 0) {
    wrapped[OPENAPI_30_NULLABLE_INDEX] = nullableIndex;
  }
  return wrapped;
}

function convertSimpleNullable(schema: JsonObject): JsonObject {
  const keys = Object.keys(schema);
  const nullableIndex = keys.indexOf("nullable");
  const typeIndex = keys.indexOf("type");
  const adjacent = Math.abs(nullableIndex - typeIndex) === 1;
  const nullFirst = nullableIndex < typeIndex;
  const typeName = schema.type as string;
  const converted: JsonObject = {};

  for (const key of keys) {
    if (key === "nullable") {
      continue;
    }
    if (key === "type") {
      converted.type = nullFirst ? ["null", typeName] : [typeName, "null"];
    } else {
      converted[key] = schema[key];
    }
  }
  if (!adjacent) {
    converted[OPENAPI_30_NULLABLE_INDEX] = nullableIndex;
  }
  return converted;
}

function downgradeValue(value: JsonValue): JsonValue {
  if (Array.isArray(value)) {
    return value.map((item) => downgradeValue(item));
  }
  if (!isObject(value)) {
    return value;
  }

  const next: JsonObject = {};
  for (const [key, child] of Object.entries(value)) {
    next[key] = INSTANCE_KEYS.has(key) ? child : downgradeValue(child);
  }
  if (isNullableAnyOf(next)) {
    return collapseNullableAnyOf(next);
  }
  if (Array.isArray(next.type)) {
    return collapseNullUnion(next);
  }
  return next;
}

function isExactNullSchema(value: JsonValue): boolean {
  return (
    isObject(value) && Object.keys(value).length === 1 && value.type === "null"
  );
}

function isNullableAnyOf(schema: JsonObject): boolean {
  if (!Array.isArray(schema.anyOf) || schema.anyOf.length !== 2) {
    return false;
  }
  if (!isExactNullSchema(schema.anyOf[1] as JsonValue)) {
    return false;
  }
  if ("type" in schema) {
    return false;
  }
  return Object.keys(schema).every(
    (key) => key === "anyOf" || key === OPENAPI_30_NULLABLE_INDEX,
  );
}

function collapseNullableAnyOf(schema: JsonObject): JsonObject {
  const nullableIndex =
    typeof schema[OPENAPI_30_NULLABLE_INDEX] === "number"
      ? (schema[OPENAPI_30_NULLABLE_INDEX] as number)
      : 0;
  const inner = schema.anyOf?.[0];
  if (!isObject(inner as JsonValue)) {
    throw new Error("Nullable anyOf branch must be an object");
  }
  return insertKey(inner as JsonObject, nullableIndex, "nullable", true);
}

function collapseNullUnion(schema: JsonObject): JsonObject {
  const types = schema.type as JsonValue[];
  const nonNull = types.filter((type) => type !== "null");
  if (
    types.length !== 2 ||
    nonNull.length !== 1 ||
    types.some((type) => typeof type !== "string")
  ) {
    throw new Error(
      `Cannot downgrade type union ${JSON.stringify(
        types,
      )} to OpenAPI 3.0.1 nullable`,
    );
  }

  const single = nonNull[0];
  const nullFirst = types[0] === "null";
  const withoutExtension: JsonObject = {};
  for (const [key, value] of Object.entries(schema)) {
    if (key === OPENAPI_30_NULLABLE_INDEX) {
      continue;
    }
    withoutExtension[key] = key === "type" ? single : value;
  }

  if (OPENAPI_30_NULLABLE_INDEX in schema) {
    const index = schema[OPENAPI_30_NULLABLE_INDEX];
    if (typeof index !== "number") {
      throw new Error(`${OPENAPI_30_NULLABLE_INDEX} must be a number`);
    }
    return insertKey(withoutExtension, index, "nullable", true);
  }

  const typeIndex = Object.keys(withoutExtension).indexOf("type");
  const nullableIndex = nullFirst ? typeIndex : typeIndex + 1;
  return insertKey(withoutExtension, nullableIndex, "nullable", true);
}

function insertKey(
  schema: JsonObject,
  index: number,
  key: string,
  value: JsonValue,
): JsonObject {
  const entries = Object.entries(schema);
  if (index < 0 || index > entries.length) {
    throw new Error(
      `Cannot restore nullable at index ${index}; schema has ${entries.length} keys`,
    );
  }
  entries.splice(index, 0, [key, value]);
  return Object.fromEntries(entries);
}
