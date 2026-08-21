export interface OpenAPIComponents {
  schemas?: Record<string, unknown>;
  parameters?: Record<string, unknown>;
  responses?: Record<string, unknown>;
  requestBodies?: Record<string, unknown>;
  headers?: Record<string, unknown>;
  securitySchemes?: Record<string, unknown>;
  examples?: Record<string, unknown>;
  links?: Record<string, unknown>;
  callbacks?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface OpenAPISpec {
  openapi: string;
  info: Record<string, unknown>;
  servers?: unknown[];
  paths?: Record<string, Record<string, unknown>>;
  components?: OpenAPIComponents;
  tags?: unknown[];
  security?: unknown[];
  [key: string]: unknown;
}

type ComponentType = keyof OpenAPIComponents;

interface RefInfo {
  type: ComponentType;
  name: string;
}

export function findAllReferences(
  obj: unknown,
  refs: Set<string> = new Set(),
): Set<string> {
  if (obj === null || typeof obj !== "object") {
    return refs;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item) => findAllReferences(item, refs));
    return refs;
  }

  for (const [key, value] of Object.entries(obj)) {
    if (key === "$ref" && typeof value === "string") {
      refs.add(value);
    } else {
      findAllReferences(value, refs);
    }
  }

  return refs;
}

export function parseRef(refString: string): RefInfo | null {
  const match = refString.match(
    /^#\/components\/(schemas|parameters|responses|requestBodies|headers|securitySchemes|examples|links|callbacks)\/(.+)$/,
  );
  if (match?.[1] && match[2]) {
    return {
      type: match[1] as ComponentType,
      name: match[2],
    };
  }
  return null;
}

export function collectAllReferencedComponents(
  initialRefs: Set<string>,
  originalComponents: OpenAPIComponents,
): OpenAPIComponents {
  const collectedComponents: OpenAPIComponents = {};
  const queue = new Set<string>(initialRefs);
  const processedRefs = new Set<string>();

  for (const refString of queue) {
    if (processedRefs.has(refString)) {
      continue;
    }
    processedRefs.add(refString);

    const refInfo = parseRef(refString);
    if (!refInfo) {
      continue;
    }

    const { type: componentType, name: componentName } = refInfo;
    const componentBucket = originalComponents[componentType] as
      | Record<string, unknown>
      | undefined;

    if (componentBucket?.[componentName]) {
      if (!collectedComponents[componentType]) {
        collectedComponents[componentType] = {};
      }

      const bucket = collectedComponents[componentType] as Record<
        string,
        unknown
      >;
      bucket[componentName] = componentBucket[componentName];

      findAllReferences(componentBucket[componentName]).forEach((newRef) => {
        if (!processedRefs.has(newRef)) {
          queue.add(newRef);
        }
      });
    }
  }

  return collectedComponents;
}

export function extractSecuritySchemes(operation: {
  security?: Array<Record<string, unknown>>;
}): Set<string> {
  const securitySchemes = new Set<string>();

  operation.security?.forEach((securityReq) => {
    Object.keys(securityReq).forEach((schemeName) => {
      securitySchemes.add(schemeName);
    });
  });

  return securitySchemes;
}

export function collectUsedSecuritySchemes(
  operations: Array<{ security?: Array<Record<string, unknown>> }>,
  allSecuritySchemes: Record<string, unknown>,
): Record<string, unknown> {
  const usedSchemes = new Set<string>();

  operations.forEach((operation) => {
    extractSecuritySchemes(operation).forEach((scheme) => usedSchemes.add(scheme));
  });

  const result: Record<string, unknown> = {};
  usedSchemes.forEach((schemeName) => {
    if (allSecuritySchemes[schemeName]) {
      result[schemeName] = allSecuritySchemes[schemeName];
    }
  });

  return result;
}

export function selectPathsByPrefix(
  paths: Record<string, Record<string, unknown>> | undefined,
  prefix: string,
): Record<string, Record<string, unknown>> {
  if (!paths) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(paths).filter(([pathName]) => pathName.startsWith(prefix)),
  );
}

export function collectRefsFromPaths(
  paths: Record<string, Record<string, unknown>>,
): Set<string> {
  const refs = new Set<string>();
  findAllReferences(paths, refs);
  return refs;
}

export function renameSchemaReferences(
  value: unknown,
  renameMap: Record<string, string>,
): unknown {
  if (value === null || typeof value !== "object") {
    if (
      typeof value === "string" &&
      value.startsWith("#/components/schemas/")
    ) {
      const schemaName = value.replace("#/components/schemas/", "");
      if (renameMap[schemaName]) {
        return `#/components/schemas/${renameMap[schemaName]}`;
      }
    }
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => renameSchemaReferences(item, renameMap));
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [
      key,
      renameSchemaReferences(entry, renameMap),
    ]),
  );
}

export function renameComponentSchemas(
  components: OpenAPIComponents,
  renameMap: Record<string, string>,
): OpenAPIComponents {
  if (!components.schemas) {
    return components;
  }

  const schemas = components.schemas as Record<string, unknown>;
  const renamedSchemas = Object.fromEntries(
    Object.entries(schemas).map(([name, schema]) => {
      const newName = renameMap[name] ?? name;
      return [newName, renameSchemaReferences(schema, renameMap)];
    }),
  );

  return {
    ...components,
    schemas: renamedSchemas,
  };
}
