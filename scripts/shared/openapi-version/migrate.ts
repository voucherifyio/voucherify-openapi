/**
 * Converts this repository's OpenAPI 3.0.1 dialect to 3.1.0 and back.
 *
 * The only keyword in reference/OpenAPI.json that changes meaning between
 * those versions is `nullable`. OpenAPI 3.1 schemas are JSON Schema
 * 2020-12, which has no `nullable`. A typed schema becomes a union with
 * `null`. A composition (allOf / anyOf / oneOf / not) is wrapped in
 * `anyOf` with `{ "type": "null" }`, because putting `null` on `type`
 * would still require the composition to match. An `allOf` whose only
 * member is a `$ref` is that same reference: OpenAPI 3.0 ignores keywords
 * next to `$ref`, so the 3.0 document used `allOf` to keep `nullable`.
 * The 3.1 branch is the `$ref` itself. Downgrade puts the `allOf` back,
 * which is what SDK prep already flattens.
 *
 * `type: "null"` is already used in this spec and is legal in 3.1, so it
 * stays. `example` stays too: JSON Schema keeps unknown keywords as
 * annotations, and this file uses `example` on thousands of schemas.
 * `enum` is not given an extra `null` entry. A strict 3.1 validator can
 * reject `null` for those two enums; keeping the enum bytes is what makes
 * the downgrade identical to the original document. Instance values under
 * `example`, `examples`, `default`, `enum`, and `const` are not walked.
 *
 * JSON Schema `const` is legal in 3.1 and absent from 3.0. Downgrade
 * replaces it with a one-value `enum` in the same key position. Upgrade
 * leaves a one-value `enum` as an enum, so a document that already uses
 * `const` does not round-trip back to `const`.
 *
 * Key order is part of the round-trip. `nullable` immediately before
 * `type` is encoded as `["null", "<type>"]`. Any other position is stored
 * in `x-openapi-30-nullable-index` and removed on the way back to 3.0.1.
 */
const INSTANCE_KEYS = new Set([
  "example",
  "examples",
  "default",
  "enum",
  "const",
]);
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

/**
 * SDK prep opts in with `downgradeTo301`. Generators that must keep today's
 * 3.0.1 output call `ensureOpenApi301` directly.
 * The clone goes through JSON so a TypeScript JSON import can be copied.
 */
export function applySdkOpenApiVersion<T extends { openapi: string }>(
  document: T,
  downgradeTo301: boolean,
): T {
  if (!downgradeTo301) {
    return document;
  }
  return ensureOpenApi301(JSON.parse(JSON.stringify(document)) as T);
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

function isExactRefSchema(value: JsonValue): value is JsonObject {
  return (
    isObject(value) &&
    Object.keys(value).length === 1 &&
    typeof value.$ref === "string"
  );
}

/**
 * `{ "nullable": true, "allOf": [{ "$ref": "..." }] }` is how this spec
 * attaches nullable to a reference in OpenAPI 3.0. In 3.1 the reference
 * can sit directly in `anyOf`.
 */
function isSingleRefAllOf(value: JsonValue): value is JsonObject {
  if (
    !isObject(value) ||
    Object.keys(value).length !== 1 ||
    !Array.isArray(value.allOf) ||
    value.allOf.length !== 1
  ) {
    return false;
  }
  return isExactRefSchema(value.allOf[0] as JsonValue);
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
  const branch = isSingleRefAllOf(inner)
    ? { $ref: (inner.allOf as JsonObject[])[0].$ref }
    : inner;

  const wrapped: JsonObject = {
    anyOf: [branch, { type: "null" }],
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
    return downgradeConst(collapseNullableAnyOf(next));
  }
  if (Array.isArray(next.type)) {
    return downgradeConst(collapseNullUnion(next));
  }
  return downgradeConst(next);
}

/**
 * OpenAPI 3.0 has no `const`. A one-value enum is the same constraint.
 * The value itself is an instance, so it is copied as-is.
 */
function downgradeConst(schema: JsonObject): JsonObject {
  if (!("const" in schema)) {
    return schema;
  }

  const constValue = schema.const as JsonValue;
  if ("enum" in schema) {
    if (!Array.isArray(schema.enum)) {
      throw new Error(
        `Cannot downgrade const ${JSON.stringify(
          constValue,
        )} next to a non-array enum`,
      );
    }
    const allowed = schema.enum.some((item) =>
      jsonEqual(item as JsonValue, constValue),
    );
    if (!allowed) {
      throw new Error(
        `Cannot downgrade const ${JSON.stringify(
          constValue,
        )} because it is not listed in enum ${JSON.stringify(schema.enum)}`,
      );
    }
    const withoutConst: JsonObject = {};
    for (const [key, value] of Object.entries(schema)) {
      if (key !== "const") {
        withoutConst[key] = value;
      }
    }
    return withoutConst;
  }

  const converted: JsonObject = {};
  for (const [key, value] of Object.entries(schema)) {
    if (key === "const") {
      converted.enum = [constValue];
    } else {
      converted[key] = value;
    }
  }
  return converted;
}

function jsonEqual(left: JsonValue, right: JsonValue): boolean {
  if (left === right) {
    return true;
  }
  if (Array.isArray(left) || Array.isArray(right)) {
    if (
      !Array.isArray(left) ||
      !Array.isArray(right) ||
      left.length !== right.length
    ) {
      return false;
    }
    return left.every((item, index) =>
      jsonEqual(item, right[index] as JsonValue),
    );
  }
  if (isObject(left) || isObject(right)) {
    if (!isObject(left) || !isObject(right)) {
      return false;
    }
    const leftKeys = Object.keys(left);
    if (leftKeys.length !== Object.keys(right).length) {
      return false;
    }
    return leftKeys.every(
      (key) =>
        key in right &&
        jsonEqual(left[key] as JsonValue, right[key] as JsonValue),
    );
  }
  return false;
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
  // OpenAPI 3.0 ignores `nullable` next to `$ref`. Restore the allOf
  // wrapper the SDK pipeline already receives for these fields.
  const restored = isExactRefSchema(inner as JsonValue)
    ? { allOf: [inner as JsonObject] }
    : (inner as JsonObject);
  return insertKey(restored, nullableIndex, "nullable", true);
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
