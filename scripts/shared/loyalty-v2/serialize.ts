import {
  LOYALTY_V2_DOCUMENT_KEY,
  LOYALTY_V2_SCHEMA_PREFIX,
  isLoyaltyV2Path,
  loyaltyOnlySchemaNames,
  type LoyaltyV2Envelope,
  type OpenApiDocument,
} from "./document";

/**
 * Writes the main OpenAPI document.
 * Loyalty schema lines and `/v2/loyalties` path lines end with a trailing
 * space. Those objects repeat lines that already exist later in the file.
 * Without the space, a diff pairs the two copies and looks like a move.
 * `prepare-generated` writes the space back.
 */
export function serializeOpenApiDocument(document: OpenApiDocument): string {
  const text = JSON.stringify(document, null, 2);
  const envelope = document[LOYALTY_V2_DOCUMENT_KEY] as
    | LoyaltyV2Envelope
    | undefined;
  const schemas = document.components?.schemas ?? {};
  const loyaltySchemas = new Set<string>();
  for (const name of loyaltyOnlySchemaNames(document)) {
    // Folded copies keep the longer API name. Those lines were never spaced.
    if (name.startsWith("LoyaltyV2")) {
      continue;
    }
    loyaltySchemas.add(name);
  }
  if (envelope?.schemaNames) {
    for (const publicName of envelope.schemaNames) {
      const prefixed = `${LOYALTY_V2_SCHEMA_PREFIX}${publicName}`;
      if (Object.prototype.hasOwnProperty.call(schemas, prefixed)) {
        loyaltySchemas.add(prefixed);
      } else if (Object.prototype.hasOwnProperty.call(schemas, publicName)) {
        loyaltySchemas.add(publicName);
      }
    }
  }
  if (
    schemas.CardPointsExpirationResult &&
    !loyaltySchemas.has("CardPointsExpirationResult")
  ) {
    loyaltySchemas.add("CardPointsExpirationResult");
  }
  const loyaltyPaths = new Set(
    Object.keys(document.paths ?? {}).filter((pathName) =>
      isLoyaltyV2Path(pathName),
    ),
  );
  if (loyaltySchemas.size === 0 && loyaltyPaths.size === 0 && !envelope) {
    return text;
  }
  return markLoyaltyLines(text, loyaltySchemas, loyaltyPaths);
}

function braceDelta(line: string): number {
  let delta = 0;
  let inString = false;
  let escaped = false;
  for (const char of line) {
    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (char === '"') {
        inString = false;
      }
      continue;
    }
    if (char === '"') {
      inString = true;
      continue;
    }
    if (char === "{" || char === "[") {
      delta += 1;
    } else if (char === "}" || char === "]") {
      delta -= 1;
    }
  }
  return delta;
}

function objectKey(line: string): string | null {
  const match = line.match(/^\s*"((?:\\.|[^"\\])*)"\s*:/);
  return match ? match[1] : null;
}

function markLoyaltyLines(
  text: string,
  loyaltySchemas: Set<string>,
  loyaltyPaths: Set<string>,
): string {
  const lines = text.split("\n");
  const frames: string[] = [];
  let depth = 0;
  let markUntil: number | null = null;
  const marked = lines.map((line) => {
    const startDepth = depth;
    const delta = braceDelta(line);
    const key = objectKey(line);
    let isLoyaltyLine = markUntil !== null && startDepth >= markUntil;
    if (
      key &&
      markUntil === null &&
      ((startDepth === 3 &&
        frames[1] === "components" &&
        frames[2] === "schemas" &&
        loyaltySchemas.has(key)) ||
        (startDepth === 2 &&
          frames[1] === "paths" &&
          loyaltyPaths.has(key)) ||
        (startDepth === 1 && key === LOYALTY_V2_DOCUMENT_KEY))
    ) {
      isLoyaltyLine = true;
      if (delta > 0) {
        markUntil = startDepth;
      }
    }
    depth += delta;
    if (key && delta > 0) {
      frames[startDepth] = key;
      frames.length = startDepth + 1;
    } else if (delta < 0) {
      frames.length = Math.max(0, depth);
    }
    if (markUntil !== null && depth <= markUntil && delta < 0) {
      markUntil = null;
    }
    if (!isLoyaltyLine || line.length === 0) {
      return line;
    }
    return `${line} `;
  });
  return marked.join("\n");
}
