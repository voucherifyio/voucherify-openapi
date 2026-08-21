/**
 * Normalizes OpenAPI 3.1 null representations to OpenAPI 3.0.1-compatible shapes.
 */
export function normalizeOpenApi31To30(obj: unknown): unknown {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => normalizeOpenApi31To30(item));
  }

  const source = obj as Record<string, unknown>;
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(source)) {
    if (key === "type") {
      if (value === "null") {
        result.type = "object";
        result.nullable = true;
        continue;
      }

      if (Array.isArray(value) && value.includes("null")) {
        const nonNullTypes = value.filter((type) => type !== "null");
        if (nonNullTypes.length === 1) {
          result.type = nonNullTypes[0];
          result.nullable = true;
          continue;
        }
      }
    }

    result[key] = normalizeOpenApi31To30(value);
  }

  return result;
}

/**
 * Converts OpenAPI 3.0.1 nullable fields back to OpenAPI 3.1 type arrays for docs output.
 */
export function normalizeOpenApi30To31(obj: unknown): unknown {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => normalizeOpenApi30To31(item));
  }

  const source = obj as Record<string, unknown>;
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(source)) {
    if (key === "type" && source.nullable === true && typeof value === "string") {
      result.type = [value, "null"];
      continue;
    }

    if (key === "nullable") {
      continue;
    }

    result[key] = normalizeOpenApi30To31(value);
  }

  return result;
}
