/**
 * OpenAPI Generator validates prepared specs as OpenAPI 3.0 and rejects
 * JSON Schema 2020-12 keywords that survive the 3.1 → 3.0.1 downgrade.
 *
 * - `patternProperties` becomes `additionalProperties` with the (sole)
 *   pattern value schema, so dynamic keys still generate. Conflicting
 *   pattern values fall back to `additionalProperties: true`.
 * - `unevaluatedProperties: false` becomes `additionalProperties: false`
 *   when that key is absent; `true` becomes `additionalProperties: true`.
 */

type JsonObject = { [key: string]: JsonValue };
type JsonValue = null | boolean | number | string | JsonValue[] | JsonObject;

function isObject(value: JsonValue): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepEqual(a: JsonValue, b: JsonValue): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

function stripSchema(schema: JsonObject): void {
  const patternProperties = schema.patternProperties;
  if (isObject(patternProperties)) {
    const values = Object.values(patternProperties);
    if (values.length > 0) {
      const first = values[0];
      const same = values.every((value) => deepEqual(value, first));
      schema.additionalProperties = same ? first : true;
    }
    delete schema.patternProperties;
  }

  if ("unevaluatedProperties" in schema) {
    const unevaluated = schema.unevaluatedProperties;
    if (!("additionalProperties" in schema)) {
      if (unevaluated === false) {
        schema.additionalProperties = false;
      } else if (unevaluated === true) {
        schema.additionalProperties = true;
      }
    }
    delete schema.unevaluatedProperties;
  }
}

function walk(value: JsonValue): void {
  if (Array.isArray(value)) {
    for (const item of value) {
      walk(item);
    }
    return;
  }
  if (!isObject(value)) {
    return;
  }
  stripSchema(value);
  for (const child of Object.values(value)) {
    walk(child);
  }
}

export function stripJsonSchema2020Keywords<T>(document: T): T {
  walk(document as JsonValue);
  return document;
}
