export const LOYALTY_V2_PATH_PREFIX = "/v2/loyalties";
export const LOYALTY_V2_SCHEMA_PREFIX = "VL";
export const LOYALTY_V2_DOCUMENT_KEY = "x-loyalty-v2";

const SCHEMA_REF_PREFIX = "#/components/schemas/";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

export type LoyaltyV2Envelope = {
  info: Json;
  servers: Json;
  tags: Json;
  security: Json;
  securitySchemes: Json;
  schemaNames: string[];
};

export type OpenApiDocument = {
  openapi?: string;
  paths?: Record<string, Json>;
  components?: {
    schemas?: Record<string, Json>;
    securitySchemes?: Record<string, Json>;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

export function isLoyaltyV2Path(pathName: string): boolean {
  return (
    pathName === LOYALTY_V2_PATH_PREFIX ||
    pathName.startsWith(`${LOYALTY_V2_PATH_PREFIX}/`)
  );
}

export function pathsWithoutLoyaltyV2(
  paths: Record<string, unknown> | undefined,
): Record<string, unknown> {
  if (!paths || typeof paths !== "object") {
    return {};
  }
  return Object.fromEntries(
    Object.entries(paths).filter(([pathName]) => !isLoyaltyV2Path(pathName)),
  );
}

/**
 * Drops Loyalty v2 paths, schemas, and the tag-file envelope.
 * SDK, production, and Markdown-table downgrades stay on the API surface.
 * A `VL` schema is the loyalty copy. The unprefixed name is removed only when
 * that copy was renamed onto it.
 */
export function documentWithoutLoyaltyV2<T extends OpenApiDocument>(
  document: T,
): T {
  const envelope = document[LOYALTY_V2_DOCUMENT_KEY] as
    | LoyaltyV2Envelope
    | undefined;
  const copy = clone(document);
  delete copy[LOYALTY_V2_DOCUMENT_KEY];
  if (copy.paths) {
    for (const pathName of Object.keys(copy.paths)) {
      if (isLoyaltyV2Path(pathName)) {
        delete copy.paths[pathName];
      }
    }
  }
  const schemas = copy.components?.schemas;
  if (envelope && schemas) {
    for (const publicName of envelope.schemaNames) {
      const prefixed = `${LOYALTY_V2_SCHEMA_PREFIX}${publicName}`;
      if (Object.prototype.hasOwnProperty.call(schemas, prefixed)) {
        delete schemas[prefixed];
      } else {
        delete schemas[publicName];
      }
    }
  }
  return copy;
}

export function omitLoyaltyV2Document<T extends Record<string, unknown>>(
  document: T,
): T {
  if (!Object.prototype.hasOwnProperty.call(document, LOYALTY_V2_DOCUMENT_KEY)) {
    return document;
  }
  const copy = { ...document };
  delete copy[LOYALTY_V2_DOCUMENT_KEY];
  return copy;
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function schemaRef(name: string): string {
  return `${SCHEMA_REF_PREFIX}${name}`;
}

function rewriteSchemaRefs(
  node: Json,
  rename: (name: string) => string | undefined,
): void {
  if (Array.isArray(node)) {
    node.forEach((item) => rewriteSchemaRefs(item, rename));
    return;
  }
  if (!node || typeof node !== "object") {
    return;
  }
  for (const [key, value] of Object.entries(node)) {
    if (key === "$ref" && typeof value === "string" && value.startsWith(SCHEMA_REF_PREFIX)) {
      const name = decodeURIComponent(value.slice(SCHEMA_REF_PREFIX.length));
      const next = rename(name);
      if (next) {
        (node as { [key: string]: Json })[key] = schemaRef(next);
      }
      continue;
    }
    rewriteSchemaRefs(value, rename);
  }
}

function loyaltyEnvelope(document: OpenApiDocument): LoyaltyV2Envelope {
  const envelope = document[LOYALTY_V2_DOCUMENT_KEY] as LoyaltyV2Envelope | undefined;
  if (!envelope?.schemaNames) {
    throw new Error("OpenAPI document has no Loyalty v2 envelope");
  }
  return envelope;
}

function storedSchemaName(
  publicName: string,
  schemas: Record<string, Json>,
): string {
  const prefixed = `${LOYALTY_V2_SCHEMA_PREFIX}${publicName}`;
  if (Object.prototype.hasOwnProperty.call(schemas, prefixed)) {
    return prefixed;
  }
  if (Object.prototype.hasOwnProperty.call(schemas, publicName)) {
    return publicName;
  }
  throw new Error(`Loyalty v2 schema ${publicName} is missing from components.schemas`);
}

/**
 * Copies Loyalty v2 paths and schemas onto the main document.
 * Schema names are stored with a `VL` prefix so they do not collide with API
 * schemas. The tag file written later strips that prefix.
 */
export function appendLoyaltyV2(
  main: OpenApiDocument,
  loyalty: OpenApiDocument,
): OpenApiDocument {
  if (Object.prototype.hasOwnProperty.call(main, LOYALTY_V2_DOCUMENT_KEY)) {
    throw new Error("Loyalty v2 is already appended");
  }
  const document = clone(main);
  const loyaltySchemas = loyalty.components?.schemas ?? {};
  const publicNames = Object.keys(loyaltySchemas);
  const publicNameSet = new Set(publicNames);
  const schemas = document.components?.schemas ?? {};
  document.components = document.components ?? {};
  document.components.schemas = schemas;
  document.paths = document.paths ?? {};

  for (const publicName of publicNames) {
    const storedName = `${LOYALTY_V2_SCHEMA_PREFIX}${publicName}`;
    if (Object.prototype.hasOwnProperty.call(schemas, storedName)) {
      throw new Error(`Schema ${storedName} already exists`);
    }
    const schema = clone(loyaltySchemas[publicName]);
    rewriteSchemaRefs(schema, (name) =>
      publicNameSet.has(name) ? `${LOYALTY_V2_SCHEMA_PREFIX}${name}` : undefined,
    );
    schemas[storedName] = schema;
  }

  for (const [pathName, pathItem] of Object.entries(loyalty.paths ?? {})) {
    if (!isLoyaltyV2Path(pathName)) {
      throw new Error(`Loyalty v2 path is outside ${LOYALTY_V2_PATH_PREFIX}: ${pathName}`);
    }
    if (Object.prototype.hasOwnProperty.call(document.paths, pathName)) {
      throw new Error(`Path ${pathName} already exists`);
    }
    const path = clone(pathItem);
    rewriteSchemaRefs(path, (name) =>
      publicNameSet.has(name) ? `${LOYALTY_V2_SCHEMA_PREFIX}${name}` : undefined,
    );
    document.paths[pathName] = path;
  }

  document[LOYALTY_V2_DOCUMENT_KEY] = {
    info: clone(loyalty.info),
    servers: clone(loyalty.servers),
    tags: clone(loyalty.tags),
    security: clone(loyalty.security),
    securitySchemes: clone(loyalty.components?.securitySchemes ?? {}),
    schemaNames: publicNames,
  };

  return document;
}

/**
 * Renames `VL` schemas to their public names when that name is free.
 * Names that already exist (`BadRequest`, `MemberActivity`, `MemberActivityData`)
 * stay prefixed so the API body is not overwritten.
 */
export function dropFreeLoyaltyV2Prefixes(
  document: OpenApiDocument,
): OpenApiDocument {
  const copy = clone(document);
  const envelope = loyaltyEnvelope(copy);
  const schemas = copy.components?.schemas;
  if (!schemas) {
    return copy;
  }
  const rename = new Map<string, string>();
  for (const publicName of envelope.schemaNames) {
    const prefixed = `${LOYALTY_V2_SCHEMA_PREFIX}${publicName}`;
    if (!Object.prototype.hasOwnProperty.call(schemas, prefixed)) {
      continue;
    }
    if (Object.prototype.hasOwnProperty.call(schemas, publicName)) {
      continue;
    }
    rename.set(prefixed, publicName);
  }
  const next: Record<string, Json> = {};
  for (const [name, schema] of Object.entries(schemas)) {
    next[rename.get(name) ?? name] = schema;
  }
  copy.components = copy.components ?? {};
  copy.components.schemas = next;
  const apply = (name: string): string | undefined => rename.get(name);
  if (copy.paths) {
    rewriteSchemaRefs(copy.paths as Json, apply);
  }
  rewriteSchemaRefs(next as Json, apply);
  return copy;
}

/**
 * Rebuilds documentation/openapi/loyalties-v2.json from the main document.
 * Stored `VL` names are written back as the original schema names.
 */
export function extractLoyaltyV2Document(main: OpenApiDocument): OpenApiDocument {
  const envelope = loyaltyEnvelope(main);
  const schemas = main.components?.schemas ?? {};
  const storedToPublic = new Map<string, string>();
  for (const publicName of envelope.schemaNames) {
    storedToPublic.set(storedSchemaName(publicName, schemas), publicName);
  }
  const rename = (name: string): string | undefined => storedToPublic.get(name);

  const paths: Record<string, Json> = {};
  for (const [pathName, pathItem] of Object.entries(main.paths ?? {})) {
    if (!isLoyaltyV2Path(pathName)) {
      continue;
    }
    const path = clone(pathItem);
    rewriteSchemaRefs(path, rename);
    paths[pathName] = path;
  }

  const extractedSchemas: Record<string, Json> = {};
  for (const publicName of envelope.schemaNames) {
    const storedName = storedSchemaName(publicName, schemas);
    const schema = clone(schemas[storedName]);
    rewriteSchemaRefs(schema, rename);
    extractedSchemas[publicName] = schema;
  }

  return {
    openapi: main.openapi,
    info: clone(envelope.info),
    servers: clone(envelope.servers),
    tags: clone(envelope.tags),
    paths,
    components: {
      schemas: extractedSchemas,
      securitySchemes: clone(envelope.securitySchemes) as Record<string, Json>,
    },
    security: clone(envelope.security),
  };
}
