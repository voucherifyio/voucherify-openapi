import type { OpenApiDocument } from "./document";

/** Writes the main OpenAPI document with no trailing spaces. */
export function serializeOpenApiDocument(document: OpenApiDocument): string {
  return JSON.stringify(document, null, 2);
}
