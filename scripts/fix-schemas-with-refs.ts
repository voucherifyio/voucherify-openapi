import path from "path";
import fsPromises from "fs/promises";
import { omit, pick } from "lodash";

const fixSchemasWithRefs = (object: any) => {
  if (Array.isArray(object)) {
    return object.map((value) => fixSchemasWithRefs(value));
  }
  if (object instanceof Object) {
    const keys = Object.keys(object);
    if (keys.includes("oneOf") && object.oneOf instanceof Object) {
      return {
        ...object,
        oneOf: object.oneOf.map((oneOf: any) => {
          if (!(oneOf instanceof Object) || !oneOf?.["$ref"]) {
            return oneOf;
          }
          return pick(oneOf, "$ref");
        }),
      };
    }
    if (!keys.includes("$ref")) {
      return Object.fromEntries(
        Object.entries(object).map((keyAndEntry) => {
          const [key, entry] = keyAndEntry;
          return [key, fixSchemasWithRefs(entry)];
        })
      );
    }
    if (keys.length === 1) {
      return object;
    }
    return { ...omit(object, "$ref", "type"), allOf: [{ $ref: object.$ref }] };
  }
  return object;
};
const main = async () => {
  const openApiPath = path.join(__dirname, "../reference/OpenAPI.json");

  const getOpenAPI = async () =>
    JSON.parse((await fsPromises.readFile(openApiPath)).toString());

  await fsPromises.writeFile(
    openApiPath,
    JSON.stringify(fixSchemasWithRefs(await getOpenAPI()), null, 2)
  );
};

main();
