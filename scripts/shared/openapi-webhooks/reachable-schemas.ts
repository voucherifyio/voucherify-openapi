const SCHEMA_REF_PREFIX = "#/components/schemas/";

function walkRefs(node: unknown, onRef: (ref: string) => void): void {
  if (Array.isArray(node)) {
    node.forEach((item) => walkRefs(item, onRef));
    return;
  }
  if (!node || typeof node !== "object") {
    return;
  }
  for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
    if (key === "$ref" && typeof value === "string") {
      onRef(value);
    } else {
      walkRefs(value, onRef);
    }
  }
}

/**
 * Schema names a generated API spec can reach. Starts at `paths` and follows
 * component refs. The `webhooks` key is not a root, so webhook-only schemas
 * stay out of SDK and production output.
 */
export function schemaNamesReachableFromPaths(document: {
  paths?: unknown;
  components?: { [group: string]: { [name: string]: unknown } | undefined };
}): Set<string> {
  const seenSchemas = new Set<string>();
  const seenComponents = new Set<string>();
  const pendingSchemas: string[] = [];

  const visit = (node: unknown) => {
    walkRefs(node, (ref) => {
      if (ref.startsWith(SCHEMA_REF_PREFIX)) {
        pendingSchemas.push(ref.slice(SCHEMA_REF_PREFIX.length));
        return;
      }
      if (!ref.startsWith("#/components/")) {
        return;
      }
      const parts = ref.split("/");
      if (parts.length < 4) {
        return;
      }
      const group = parts[2];
      const name = decodeURIComponent(parts.slice(3).join("/"));
      const id = `${group}/${name}`;
      if (seenComponents.has(id)) {
        return;
      }
      seenComponents.add(id);
      const target = document.components?.[group]?.[name];
      if (target) {
        visit(target);
      }
    });
  };

  visit(document.paths);
  while (pendingSchemas.length > 0) {
    const name = pendingSchemas.pop() as string;
    if (seenSchemas.has(name)) {
      continue;
    }
    seenSchemas.add(name);
    const schema = document.components?.schemas?.[name];
    if (schema) {
      visit(schema);
    }
  }
  return seenSchemas;
}

export function omitWebhooks<T extends Record<string, unknown>>(
  document: T,
): T {
  if (!Object.prototype.hasOwnProperty.call(document, "webhooks")) {
    return document;
  }
  const copy = { ...document };
  delete copy.webhooks;
  return copy;
}
