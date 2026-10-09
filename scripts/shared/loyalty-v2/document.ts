import { rawTakeList } from "../get-take-list";
import { schemaNamesReachableFromPaths } from "../openapi-webhooks/reachable-schemas";

export const LOYALTY_V2_PATH_PREFIX = "/v2/loyalties";
export const LOYALTY_V2_SCHEMA_PREFIX = "VL";
export const LOYALTY_V2_TAG_PREFIX = "LV2-";
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

export function isLoyaltyV2Tag(tag: string): boolean {
  return tag.startsWith(LOYALTY_V2_TAG_PREFIX);
}

export function stripLoyaltyV2TagPrefix(tag: string): string {
  return isLoyaltyV2Tag(tag) ? tag.slice(LOYALTY_V2_TAG_PREFIX.length) : tag;
}

/**
 * The source tags keep `LV2-` so they do not join an API tag file.
 * `loyalties-v2.json` is one document for every such tag, without the prefix.
 */
export function withoutLoyaltyV2TagPrefix<T extends OpenApiDocument>(
  document: T,
): T {
  const copy = clone(document);
  for (const pathItem of Object.values(copy.paths ?? {})) {
    if (!pathItem || typeof pathItem !== "object" || Array.isArray(pathItem)) {
      continue;
    }
    for (const operation of Object.values(pathItem)) {
      if (
        !operation ||
        typeof operation !== "object" ||
        Array.isArray(operation) ||
        !Array.isArray((operation as { tags?: unknown }).tags)
      ) {
        continue;
      }
      const tagged = operation as { tags: string[] };
      tagged.tags = tagged.tags.map((tag) =>
        typeof tag === "string" ? stripLoyaltyV2TagPrefix(tag) : tag,
      );
    }
  }
  return copy;
}

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
 * Schemas reached by `pathNames` and by no other path.
 * Shared schemas stay.
 */
function schemaNamesOnlyOnPaths(
  document: OpenApiDocument,
  pathNames: Set<string>,
): Set<string> {
  const selectedPaths: Record<string, unknown> = {};
  const otherPaths: Record<string, unknown> = {};
  for (const [pathName, pathItem] of Object.entries(document.paths ?? {})) {
    if (pathNames.has(pathName)) {
      selectedPaths[pathName] = pathItem;
    } else {
      otherPaths[pathName] = pathItem;
    }
  }
  const components = document.components as
    | { [group: string]: { [name: string]: unknown } | undefined }
    | undefined;
  const fromSelected = schemaNamesReachableFromPaths({
    paths: selectedPaths,
    components,
  });
  const fromOther = schemaNamesReachableFromPaths({
    paths: otherPaths,
    components,
  });
  const only = new Set<string>();
  for (const name of fromSelected) {
    if (!fromOther.has(name)) {
      only.add(name);
    }
  }
  return only;
}

/**
 * Schemas a Loyalty v2 path reaches that no other path reaches.
 * SDK prep deletes these before the 3.0.1 downgrade, except schemas
 * reached by an allowlisted Loyalty v2 path. Shared schemas stay.
 */
export function loyaltyOnlySchemaNames(document: OpenApiDocument): Set<string> {
  const loyaltyPaths = new Set<string>();
  for (const pathName of Object.keys(document.paths ?? {})) {
    if (isLoyaltyV2Path(pathName)) {
      loyaltyPaths.add(pathName);
    }
  }
  return schemaNamesOnlyOnPaths(document, loyaltyPaths);
}

/**
 * Loyalty v2 paths `rawTakeList` publishes (`true` or a non-empty language array).
 * An empty array registers the path and ships it to nobody.
 */
export function sdkPublishedLoyaltyV2Paths(): Set<string> {
  const kept = new Set<string>();
  for (const [pathName, methods] of Object.entries(rawTakeList)) {
    if (!isLoyaltyV2Path(pathName)) {
      continue;
    }
    for (const value of Object.values(methods)) {
      if (value === true || (Array.isArray(value) && value.length > 0)) {
        kept.add(pathName);
        break;
      }
    }
  }
  return kept;
}

function tagsUsedByOperations(
  paths: Record<string, unknown> | undefined,
): Set<string> {
  const used = new Set<string>();
  for (const pathItem of Object.values(paths ?? {})) {
    if (!pathItem || typeof pathItem !== "object" || Array.isArray(pathItem)) {
      continue;
    }
    for (const operation of Object.values(pathItem)) {
      if (!operation || typeof operation !== "object" || Array.isArray(operation)) {
        continue;
      }
      const tags = (operation as { tags?: unknown }).tags;
      if (!Array.isArray(tags)) {
        continue;
      }
      for (const tag of tags) {
        if (typeof tag === "string") {
          used.add(tag);
        }
      }
    }
  }
  return used;
}

export type DocumentWithoutLoyaltyV2Options = {
  /**
   * Keep Loyalty v2 paths that the SDK allowlist publishes, plus the schemas
   * and tags those paths reach. Markdown tables leave this off.
   */
  keepSdkPublishedPaths?: boolean;
};

/**
 * Drops Loyalty v2 paths and the schemas only those paths reach.
 * SDK and production pass `keepSdkPublishedPaths` so allowlisted Loyalty v2
 * operations survive the 3.0.1 downgrade. Markdown tables stay on the
 * non-loyalty API surface.
 */
export function documentWithoutLoyaltyV2<T extends OpenApiDocument>(
  document: T,
  options?: DocumentWithoutLoyaltyV2Options,
): T {
  const copy = clone(document);
  const keptPaths = options?.keepSdkPublishedPaths
    ? sdkPublishedLoyaltyV2Paths()
    : new Set<string>();
  const droppedLoyaltyPaths = new Set<string>();
  for (const pathName of Object.keys(copy.paths ?? {})) {
    if (isLoyaltyV2Path(pathName) && !keptPaths.has(pathName)) {
      droppedLoyaltyPaths.add(pathName);
    }
  }
  const onlyDropped = schemaNamesOnlyOnPaths(copy, droppedLoyaltyPaths);
  delete copy[LOYALTY_V2_DOCUMENT_KEY];
  if (copy.paths) {
    for (const pathName of droppedLoyaltyPaths) {
      delete copy.paths[pathName];
    }
  }
  const usedTags = tagsUsedByOperations(copy.paths);
  const tagged = copy as T & { tags?: { name?: string }[] };
  if (Array.isArray(tagged.tags)) {
    tagged.tags = tagged.tags.filter(
      (tag) =>
        !tag?.name ||
        !isLoyaltyV2Tag(tag.name) ||
        usedTags.has(tag.name),
    );
  }
  const schemas = copy.components?.schemas;
  if (schemas) {
    for (const name of onlyDropped) {
      delete schemas[name];
    }
  }
  dropUnreferencedSecuritySchemes(copy);
  return copy;
}

function dropUnreferencedSecuritySchemes(document: OpenApiDocument): void {
  const schemes = document.components?.securitySchemes;
  if (!schemes) {
    return;
  }
  const used = new Set<string>();
  const note = (security: unknown) => {
    if (!Array.isArray(security)) {
      return;
    }
    for (const requirement of security) {
      if (requirement && typeof requirement === "object") {
        for (const name of Object.keys(requirement as Record<string, unknown>)) {
          used.add(name);
        }
      }
    }
  };
  note(document.security);
  for (const pathItem of Object.values(document.paths ?? {})) {
    if (!pathItem || typeof pathItem !== "object" || Array.isArray(pathItem)) {
      continue;
    }
    for (const operation of Object.values(pathItem)) {
      if (operation && typeof operation === "object" && !Array.isArray(operation)) {
        note((operation as { security?: unknown }).security);
      }
    }
  }
  for (const name of Object.keys(schemes)) {
    if (!used.has(name)) {
      delete schemes[name];
    }
  }
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

const IGNORED_SCHEMA_KEYS = new Set([
  "description",
  "title",
  "example",
  "examples",
  "externalDocs",
]);

function schemaBody(node: Json): Json {
  if (Array.isArray(node)) {
    return node.map((item) => schemaBody(item));
  }
  if (!node || typeof node !== "object") {
    return node;
  }
  const body: { [key: string]: Json } = {};
  for (const [key, value] of Object.entries(node)) {
    if (IGNORED_SCHEMA_KEYS.has(key) || key.startsWith("x-")) {
      continue;
    }
    body[key] = schemaBody(value);
  }
  return body;
}

function isStoredLoyaltySchema(name: string, publicNames: Set<string>): boolean {
  return (
    publicNames.has(name) ||
    (name.startsWith(LOYALTY_V2_SCHEMA_PREFIX) &&
      publicNames.has(name.slice(LOYALTY_V2_SCHEMA_PREFIX.length)))
  );
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
 * Points a Loyalty v2 schema at an existing schema when that schema is the
 * same body and its name ends with the loyalty name (`Foo` and `...Foo`).
 * Shared shapes that do not share the name stay separate. When descriptions
 * differ, the loyalty text is kept: it is the loyalty spec, and the other
 * copy is the event schema.
 */
export function dedupeLoyaltyV2Schemas(
  document: OpenApiDocument,
): OpenApiDocument {
  const copy = clone(document);
  const envelope = loyaltyEnvelope(copy);
  const schemas = copy.components?.schemas;
  if (!schemas) {
    return copy;
  }
  const publicNames = new Set(envelope.schemaNames);
  const apiByBody = new Map<string, string[]>();
  for (const [name, schema] of Object.entries(schemas)) {
    if (isStoredLoyaltySchema(name, publicNames)) {
      continue;
    }
    const body = JSON.stringify(schemaBody(schema));
    const names = apiByBody.get(body) ?? [];
    names.push(name);
    apiByBody.set(body, names);
  }

  const rename = new Map<string, string>();
  const kept: string[] = [];
  for (const publicName of envelope.schemaNames) {
    const storedName = storedSchemaName(publicName, schemas);
    const matches = (apiByBody.get(JSON.stringify(schemaBody(schemas[storedName]))) ??
      []
    ).filter((name) => name !== publicName && name.endsWith(publicName));
    if (matches.length !== 1) {
      kept.push(publicName);
      continue;
    }
    const canonical = matches[0] as string;
    const loyaltySchema = schemas[storedName] as { description?: Json };
    const canonicalSchema = schemas[canonical] as { description?: Json };
    if (
      typeof loyaltySchema.description === "string" &&
      loyaltySchema.description !== canonicalSchema.description
    ) {
      canonicalSchema.description = loyaltySchema.description;
    }
    delete schemas[storedName];
    rename.set(storedName, canonical);
  }
  envelope.schemaNames = kept;
  const apply = (name: string): string | undefined => rename.get(name);
  if (copy.paths) {
    rewriteSchemaRefs(copy.paths as Json, apply);
  }
  rewriteSchemaRefs(schemas as Json, apply);
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
  const pending: string[] = [];
  const noteRef = (node: Json) => {
    if (Array.isArray(node)) {
      node.forEach(noteRef);
      return;
    }
    if (!node || typeof node !== "object") {
      return;
    }
    for (const [key, value] of Object.entries(node)) {
      if (
        key === "$ref" &&
        typeof value === "string" &&
        value.startsWith(SCHEMA_REF_PREFIX)
      ) {
        pending.push(decodeURIComponent(value.slice(SCHEMA_REF_PREFIX.length)));
        continue;
      }
      noteRef(value);
    }
  };
  noteRef(paths as Json);
  noteRef(extractedSchemas as Json);
  while (pending.length > 0) {
    const name = pending.pop() as string;
    if (
      Object.prototype.hasOwnProperty.call(extractedSchemas, name) ||
      !Object.prototype.hasOwnProperty.call(schemas, name)
    ) {
      continue;
    }
    const schema = clone(schemas[name]);
    rewriteSchemaRefs(schema, rename);
    extractedSchemas[name] = schema;
    noteRef(schema);
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
