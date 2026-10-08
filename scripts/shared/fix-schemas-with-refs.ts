import path from "path";
import fsPromises from "fs/promises";
import { omit, pick } from "lodash";
import { schemaNamesReachableFromPaths } from "./openapi-webhooks/reachable-schemas";

/**
 * Rewrites `$ref` siblings the way the API spec already does.
 * Schemas that are only reachable from `webhooks` are left alone, and the
 * `webhooks` tree itself is not walked. Generated SDK and production specs
 * never include those schemas, so rewriting them would change event docs
 * the next time this script runs.
 */
export const fixSchemasWithRefs = (
  object: any,
  path: string[] = [],
  reachable?: Set<string>,
): any => {
  if (path[0] === "webhooks") {
    return object;
  }
  if (
    reachable &&
    path[0] === "components" &&
    path[1] === "schemas" &&
    path.length >= 3 &&
    !reachable.has(path[2])
  ) {
    return object;
  }
  if (Array.isArray(object)) {
    return object.map((value, index) =>
      fixSchemasWithRefs(value, path.concat(String(index)), reachable),
    );
  }
  if (object instanceof Object) {
    const keys = Object.keys(object);
    if (keys.includes("oneOf") && object.oneOf instanceof Object) {
      return {
        ...object,
        oneOf: object.oneOf.map((oneOf: any, index: number) => {
          if (!(oneOf instanceof Object) || !oneOf?.["$ref"]) {
            return fixSchemasWithRefs(
              oneOf,
              path.concat("oneOf", String(index)),
              reachable,
            );
          }
          return pick(oneOf, "$ref");
        }),
      };
    }
    if (!keys.includes("$ref")) {
      return Object.fromEntries(
        Object.entries(object).map(([key, entry]) => {
          return [key, fixSchemasWithRefs(entry, path.concat(key), reachable)];
        }),
      );
    }
    if (keys.length === 1) {
      return object;
    }
    return { ...omit(object, "$ref", "type"), allOf: [{ $ref: object.$ref }] };
  }
  return object;
};

export function fixOpenApiDocument<T extends { paths?: unknown }>(
  document: T,
): T {
  return fixSchemasWithRefs(
    document,
    [],
    schemaNamesReachableFromPaths(document),
  );
}

async function main(): Promise<void> {
  const openApiPath = path.join(__dirname, "../../reference/OpenAPI.json");
  const document = JSON.parse(
    (await fsPromises.readFile(openApiPath)).toString(),
  );

  await fsPromises.writeFile(
    openApiPath,
    JSON.stringify(fixOpenApiDocument(document), null, 2),
  );
}

if (require.main === module) {
  main();
}
