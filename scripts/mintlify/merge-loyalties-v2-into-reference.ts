import {
  LOYALTIES_V2_PATH_PREFIX,
  LOYALTIES_V2_SCHEMA_RENAMES_ON_MERGE,
  LOYALTIES_V2_SCHEMAS_SKIP_ON_MERGE,
} from "./loyalties-v2-openapi.config";
import {
  OpenAPISpec,
  renameComponentSchemas,
  renameSchemaReferences,
} from "./utils/openapi-component-collector";
import { normalizeOpenApi31To30 } from "./utils/openapi-null-transforms";

function mergeTags(
  referenceTags: unknown[] | undefined,
  incomingTags: unknown[] | undefined,
): unknown[] {
  const merged = [...(referenceTags ?? [])];
  const existingNames = new Set(
    merged
      .filter((tag): tag is { name: string } => tag instanceof Object && "name" in tag)
      .map((tag) => tag.name),
  );

  for (const tag of incomingTags ?? []) {
    if (
      tag instanceof Object &&
      "name" in tag &&
      typeof tag.name === "string" &&
      !existingNames.has(tag.name)
    ) {
      merged.push(tag);
      existingNames.add(tag.name);
    }
  }

  return merged;
}

function mergeSecuritySchemes(
  referenceSchemes: Record<string, unknown> | undefined,
  incomingSchemes: Record<string, unknown> | undefined,
): Record<string, unknown> {
  return {
    ...(referenceSchemes ?? {}),
    ...(incomingSchemes ?? {}),
  };
}

export function mergeLoyaltiesV2IntoReference(
  referenceSpec: OpenAPISpec,
  loyaltiesV2Spec: OpenAPISpec,
): OpenAPISpec {
  const normalizedV2 = normalizeOpenApi31To30(loyaltiesV2Spec) as OpenAPISpec;

  const renamedV2Components = renameComponentSchemas(
    normalizedV2.components ?? {},
    LOYALTIES_V2_SCHEMA_RENAMES_ON_MERGE,
  );

  const v2Schemas = (renamedV2Components.schemas ?? {}) as Record<
    string,
    unknown
  >;
  const mergedSchemas = {
    ...(referenceSpec.components?.schemas ?? {}),
  } as Record<string, unknown>;

  for (const [schemaName, schemaDefinition] of Object.entries(v2Schemas)) {
    if (LOYALTIES_V2_SCHEMAS_SKIP_ON_MERGE.has(schemaName)) {
      continue;
    }
    if (mergedSchemas[schemaName]) {
      throw new Error(
        `Schema name collision on merge: "${schemaName}" already exists in reference OpenAPI.`,
      );
    }
    mergedSchemas[schemaName] = schemaDefinition;
  }

  const renamedV2Paths = renameSchemaReferences(
    normalizedV2.paths ?? {},
    LOYALTIES_V2_SCHEMA_RENAMES_ON_MERGE,
  ) as Record<string, Record<string, unknown>>;

  for (const pathName of Object.keys(renamedV2Paths)) {
    if (!pathName.startsWith(LOYALTIES_V2_PATH_PREFIX)) {
      throw new Error(
        `Unexpected non-v2 path in loyalties-v2 spec: "${pathName}".`,
      );
    }
    if (referenceSpec.paths?.[pathName]) {
      throw new Error(
        `Path collision on merge: "${pathName}" already exists in reference OpenAPI.`,
      );
    }
  }

  return {
    ...referenceSpec,
    tags: mergeTags(referenceSpec.tags, normalizedV2.tags),
    paths: {
      ...(referenceSpec.paths ?? {}),
      ...renamedV2Paths,
    },
    components: {
      ...(referenceSpec.components ?? {}),
      schemas: mergedSchemas,
      securitySchemes: mergeSecuritySchemes(
        referenceSpec.components?.securitySchemes as Record<string, unknown>,
        renamedV2Components.securitySchemes as Record<string, unknown>,
      ),
    },
  };
}
