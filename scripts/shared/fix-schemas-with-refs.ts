import path from "path";
import fsPromises from "fs/promises";
import { omit, pick } from "lodash";
import {
  isLoyaltyV2Path,
  pathsWithoutLoyaltyV2,
} from "./loyalty-v2/document";
import { schemaNamesReachableFromPaths } from "./openapi-webhooks/reachable-schemas";

/**
 * Rewrites `$ref` siblings the way the API spec already does.
 * Schemas that are only reachable from `webhooks` or `/v2/loyalties` are left
 * alone, and those trees are not walked. SDK and production specs do not
 * include them, and the Loyalty v2 tag file keeps descriptions next to `$ref`.
 */
export const fixSchemasWithRefs = (
  object: any,
  path: string[] = [],
  reachable?: Set<string>,
): any => {
  if (path[0] === "webhooks") {
    return object;
  }
  if (path[0] === "paths" && path.length >= 2 && isLoyaltyV2Path(path[1])) {
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
    schemaNamesReachableFromPaths({
      ...document,
      paths: pathsWithoutLoyaltyV2(
        document.paths as Record<string, unknown> | undefined,
      ),
    }),
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
