/**
 * Turns JSON Schema `if` / `then` / `else` / `not` into one object schema.
 *
 * OpenAPI 3.0.1 and the pinned generators do not implement those keywords.
 * `const` is not rewritten here. `downgradeOpenApi310To301` still turns it
 * into a one-value enum so the nullable and const round-trip stays exact.
 *
 * The parent object is the schema generators see. A branch does not add
 * properties, does not add `required`, and does not replace a property with
 * `type: "null"`. A `not` that forbids a property keeps the property and
 * records the rule on that property, or on the parent when the property is
 * only a `$ref` (OpenAPI 3.0 ignores sibling keywords of `$ref`). The parent
 * description records that the API still validates the dropped combinations.
 *
 * Instance values under `example`, `examples`, `default`, `enum`, and `const`
 * are not walked. A document with none of the four keywords is returned
 * as the same reference.
 */

const CONDITIONAL_KEYS = new Set(["if", "then", "else", "not"]);
const INSTANCE_KEYS = new Set([
  "example",
  "examples",
  "default",
  "enum",
  "const",
]);

export const FIELD_COMBINATIONS_NOTE =
  "The API validates field combinations that this schema does not express.";

type JsonObject = { [key: string]: JsonValue };
type JsonValue = null | boolean | number | string | JsonValue[] | JsonObject;

type Phrase = {
  kind: "when" | "only-when";
  text: string;
  values: JsonValue[];
};

function isObject(value: JsonValue): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPureConditional(value: JsonValue): value is JsonObject {
  if (!isObject(value)) {
    return false;
  }
  const keys = Object.keys(value);
  return keys.length > 0 && keys.every((key) => CONDITIONAL_KEYS.has(key));
}

function readConst(schema: JsonObject): JsonValue | undefined {
  if ("const" in schema) {
    return schema.const;
  }
  if (
    schema["x-openapi-31-const"] === true &&
    Array.isArray(schema.enum) &&
    schema.enum.length === 1
  ) {
    return schema.enum[0];
  }
  return undefined;
}

function collectConsts(
  schema: JsonObject,
  prefix: string,
  hits: { path: string; value: JsonValue }[],
) {
  const direct = readConst(schema);
  if (direct !== undefined && prefix.length > 0) {
    hits.push({ path: prefix, value: direct });
    return;
  }
  if (!isObject(schema.properties)) {
    return;
  }
  for (const [name, child] of Object.entries(schema.properties)) {
    if (!isObject(child)) {
      continue;
    }
    collectConsts(child, prefix.length > 0 ? `${prefix}.${name}` : name, hits);
  }
}

function formatValue(value: JsonValue): string {
  if (typeof value === "string") {
    return `\`${value}\``;
  }
  if (value === null) {
    return "`null`";
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return `\`${String(value)}\``;
  }
  return `\`${JSON.stringify(value)}\``;
}

function phraseFor(ifSchema: JsonObject): Phrase | null {
  const inverted =
    isObject(ifSchema.not) &&
    Object.keys(ifSchema).every((key) => key === "not");
  const source = inverted ? (ifSchema.not as JsonObject) : ifSchema;
  const hits: { path: string; value: JsonValue }[] = [];
  collectConsts(source, "", hits);
  if (hits.length === 0) {
    return null;
  }
  const parts = hits.map(
    (hit) => `\`${hit.path}\` is ${formatValue(hit.value)}`,
  );
  const text =
    parts.length === 1
      ? `when ${parts[0]}`
      : `when ${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
  return {
    kind: inverted ? "only-when" : "when",
    text,
    values: hits.map((hit) => hit.value),
  };
}

function forbidNames(branch: JsonObject): string[] {
  if (!isObject(branch.not)) {
    return [];
  }
  const names: string[] = [];
  const take = (required: JsonValue) => {
    if (!Array.isArray(required)) {
      return;
    }
    for (const name of required) {
      if (typeof name === "string") {
        names.push(name);
      }
    }
  };
  take(branch.not.required);
  if (Array.isArray(branch.not.anyOf)) {
    for (const item of branch.not.anyOf) {
      if (isObject(item)) {
        take(item.required);
      }
    }
  }
  return names;
}

function forbidSentence(name: string, phrase: Phrase | null): string {
  if (!phrase) {
    return `\`${name}\` is rejected for some values of the other fields. The API validates this.`;
  }
  if (phrase.kind === "only-when") {
    return `\`${name}\` is allowed only ${phrase.text}. The API validates this.`;
  }
  return `\`${name}\` must be omitted ${phrase.text}. The API validates this.`;
}

function alreadyStates(description: JsonValue, phrase: Phrase | null): boolean {
  if (!phrase || typeof description !== "string") {
    return false;
  }
  const strings = phrase.values.filter(
    (value): value is string => typeof value === "string",
  );
  return (
    strings.length > 0 && strings.every((value) => description.includes(value))
  );
}

function appendSentence(description: JsonValue, sentence: string): string {
  if (typeof description !== "string" || description.trim().length === 0) {
    return sentence;
  }
  if (description.includes(sentence)) {
    return description;
  }
  return `${description} ${sentence}`;
}

function withDescription(schema: JsonObject, description: string): JsonObject {
  if (schema.description === description) {
    return schema;
  }
  if (!("description" in schema)) {
    return { ...schema, description };
  }
  const next: JsonObject = {};
  for (const [key, value] of Object.entries(schema)) {
    next[key] = key === "description" ? description : value;
  }
  return next;
}

function isBareRef(schema: JsonObject): boolean {
  return Object.keys(schema).length === 1 && typeof schema.$ref === "string";
}

function replaceProperty(
  properties: JsonObject,
  name: string,
  nextProperty: JsonObject,
): JsonObject {
  const next: JsonObject = {};
  for (const [key, value] of Object.entries(properties)) {
    next[key] = key === name ? nextProperty : value;
  }
  return next;
}

function applyBranchNotes(
  properties: JsonObject | undefined,
  description: JsonValue,
  phrase: Phrase | null,
  branch: JsonObject,
): { properties: JsonObject | undefined; description: JsonValue } {
  let nextProperties = properties;
  let nextDescription = description;
  for (const name of forbidNames(branch)) {
    const sentence = forbidSentence(name, phrase);
    const candidate = nextProperties ? nextProperties[name] : undefined;
    const property = isObject(candidate) ? candidate : undefined;
    const describedOnProperty = property !== undefined && !isBareRef(property);
    const currentDescription = describedOnProperty
      ? property.description
      : nextDescription;
    if (alreadyStates(currentDescription, phrase)) {
      continue;
    }
    if (!describedOnProperty || property === undefined) {
      nextDescription = appendSentence(nextDescription, sentence);
      continue;
    }
    nextProperties = replaceProperty(
      nextProperties as JsonObject,
      name,
      withDescription(property, appendSentence(property.description, sentence)),
    );
  }
  return { properties: nextProperties, description: nextDescription };
}

function foldConditionals(schema: JsonObject): JsonObject {
  const ownConditional = Object.keys(schema).some((key) =>
    CONDITIONAL_KEYS.has(key),
  );
  const allOf = Array.isArray(schema.allOf) ? schema.allOf : undefined;
  const conditionalItems = allOf?.filter(isPureConditional) ?? [];
  if (!ownConditional && conditionalItems.length === 0) {
    return schema;
  }

  let properties = isObject(schema.properties) ? schema.properties : undefined;
  let description: JsonValue = schema.description;
  const applicators = [
    ...(ownConditional ? [schema] : []),
    ...conditionalItems,
  ];
  for (const applicator of applicators) {
    const phrase = isObject(applicator.if) ? phraseFor(applicator.if) : null;
    if (isObject(applicator.then)) {
      const applied = applyBranchNotes(
        properties,
        description,
        phrase,
        applicator.then,
      );
      properties = applied.properties;
      description = applied.description;
    }
    if (isObject(applicator.else)) {
      const applied = applyBranchNotes(
        properties,
        description,
        null,
        applicator.else,
      );
      properties = applied.properties;
      description = applied.description;
    }
  }
  description = appendSentence(description, FIELD_COMBINATIONS_NOTE);

  const next: JsonObject = {};
  let wroteDescription = false;
  for (const [key, value] of Object.entries(schema)) {
    if (CONDITIONAL_KEYS.has(key)) {
      continue;
    }
    if (key === "allOf" && Array.isArray(value)) {
      const kept = value.filter((item) => !isPureConditional(item));
      if (kept.length > 0) {
        next.allOf = kept;
      }
      continue;
    }
    if (key === "properties" && properties) {
      next.properties = properties;
      continue;
    }
    if (key === "description") {
      next.description = description;
      wroteDescription = true;
      continue;
    }
    next[key] = value;
  }
  if (!wroteDescription && description !== schema.description) {
    next.description = description;
  }
  return next;
}

function mergeValue(value: JsonValue): JsonValue {
  if (Array.isArray(value)) {
    let changed = false;
    const next = value.map((item) => {
      const folded = mergeValue(item);
      if (folded !== item) {
        changed = true;
      }
      return folded;
    });
    return changed ? next : value;
  }
  if (!isObject(value)) {
    return value;
  }

  const folded = foldConditionals(value);
  let changed = folded !== value;
  const next: JsonObject = {};
  for (const [key, child] of Object.entries(folded)) {
    const foldedChild = INSTANCE_KEYS.has(key)
      ? child
      : mergeValue(child as JsonValue);
    if (foldedChild !== child) {
      changed = true;
    }
    next[key] = foldedChild as JsonValue;
  }
  return changed ? next : value;
}

export function mergeJsonSchemaConditionals<T>(document: T): T {
  return mergeValue(document as JsonValue) as T;
}
