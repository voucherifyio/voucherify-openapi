import {
  LOYALTIES_V2_EXTRACT_INFO,
  LOYALTIES_V2_EXTRACT_SECURITY,
  LOYALTIES_V2_EXTRACT_SECURITY_SCHEMES,
  LOYALTIES_V2_EXTRACT_SERVERS,
  LOYALTIES_V2_EXTRACT_TAGS,
  LOYALTIES_V2_PATH_PREFIX,
  LOYALTIES_V2_SCHEMA_RENAMES_ON_EXTRACT,
} from "./loyalties-v2-openapi.config";
import {
  collectAllReferencedComponents,
  collectRefsFromPaths,
  collectUsedSecuritySchemes,
  OpenAPISpec,
  renameComponentSchemas,
  renameSchemaReferences,
  selectPathsByPrefix,
} from "./utils/openapi-component-collector";
import { normalizeOpenApi30To31 } from "./utils/openapi-null-transforms";

export function extractLoyaltiesV2OpenApi(
  referenceSpec: OpenAPISpec,
): OpenAPISpec {
  const paths = selectPathsByPrefix(
    referenceSpec.paths,
    LOYALTIES_V2_PATH_PREFIX,
  );

  if (Object.keys(paths).length === 0) {
    throw new Error(
      `No paths found with prefix "${LOYALTIES_V2_PATH_PREFIX}" in reference OpenAPI.`,
    );
  }

  const refs = collectRefsFromPaths(paths);
  const collectedComponents = collectAllReferencedComponents(
    refs,
    referenceSpec.components ?? {},
  );

  const operations = Object.values(paths).flatMap((pathItem) =>
    Object.entries(pathItem)
      .filter(([method]) =>
        ["get", "post", "put", "patch", "delete"].includes(method),
      )
      .map(([, operation]) => operation as { security?: Array<Record<string, unknown>> }),
  );

  const usedSecuritySchemes = {
    ...LOYALTIES_V2_EXTRACT_SECURITY_SCHEMES,
    ...collectUsedSecuritySchemes(
      operations,
      referenceSpec.components?.securitySchemes ?? {},
    ),
  };

  const componentsWithSecurity = {
    ...collectedComponents,
    securitySchemes: usedSecuritySchemes,
  };

  const renamedComponents = renameComponentSchemas(
    componentsWithSecurity,
    LOYALTIES_V2_SCHEMA_RENAMES_ON_EXTRACT,
  );

  const renamedPaths = renameSchemaReferences(
    paths,
    LOYALTIES_V2_SCHEMA_RENAMES_ON_EXTRACT,
  ) as Record<string, Record<string, unknown>>;

  const spec: OpenAPISpec = {
    openapi: "3.1.0",
    info: LOYALTIES_V2_EXTRACT_INFO,
    servers: LOYALTIES_V2_EXTRACT_SERVERS,
    tags: LOYALTIES_V2_EXTRACT_TAGS,
    security: LOYALTIES_V2_EXTRACT_SECURITY,
    paths: renamedPaths,
    components: renamedComponents,
  };

  return normalizeOpenApi30To31(spec) as OpenAPISpec;
}

export function countLoyaltiesV2Operations(spec: OpenAPISpec): number {
  const paths = selectPathsByPrefix(spec.paths, LOYALTIES_V2_PATH_PREFIX);
  return Object.values(paths).reduce((count, pathItem) => {
    return (
      count +
      Object.keys(pathItem).filter((method) =>
        ["get", "post", "put", "patch", "delete"].includes(method),
      ).length
    );
  }, 0);
}
