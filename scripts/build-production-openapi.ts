import fsPromises from "fs/promises";
import fs from "fs";
import path from "path";
import { parseNullsToNullableObjects } from "./prepare-open-api-for-sdk/utils";
import { removedNotUsedParameters } from "./prepare-open-api-for-sdk/removed-not-used-parameters";
import { removeNotUsedSchemas } from "./prepare-open-api-for-sdk/remove-not-used-schemas";
import { removeNotYetRefactoredPaths } from "./helpers/remove-not-yet-refactored-paths";

function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

const removeKey = (node: object, key: string): object => {
  delete node[key];
  for (const attr in node) {
    if (isObject(node[attr])) {
      removeKey(node[attr], key);
    }
  }
  return node;
};

const main = async () => {
  const openApiPath = path.join(__dirname, "../reference/OpenAPI.json");
  const openAPIContent = JSON.parse(
    (await fsPromises.readFile(openApiPath)).toString(),
  );
  removeKey(openAPIContent, "x-stoplight");
  const paths = removeNotYetRefactoredPaths(openAPIContent.paths);
  const parameters = removedNotUsedParameters(
    openAPIContent.components.parameters,
    paths,
    {},
  );
  let schemasWithoutNotUsed = removeNotUsedSchemas(
    openAPIContent.components,
    paths,
    {},
    {},
  );

  schemasWithoutNotUsed = parseNullsToNullableObjects(
    Object.fromEntries(
      Object.entries(schemasWithoutNotUsed)
        .map((entry) => {
          const [name, object] = entry;
          delete object["x-tags"];
          if ((object as any).type === "object") {
            delete object["examples"];
            delete object["example"];
          }
          return [name, object];
        })
        .sort(
          (a: [name: string, schema: any], b: [name: string, schema: any]) => {
            return a[0].localeCompare(b[0]);
          },
        ),
    ),
  );
  const newOpenApiFile = {
    ...openAPIContent,
    components: {
      ...openAPIContent.components,
      schemas: schemasWithoutNotUsed,
      parameters,
    },
    paths,
  };

  const pathToProductionReferenceFolder = path.join(__dirname, `../production`);
  if (!fs.existsSync(pathToProductionReferenceFolder)) {
    fs.mkdirSync(pathToProductionReferenceFolder);
  }

  await fsPromises.writeFile(
    path.join(__dirname, `../production/readOnly-openAPI.json`),
    JSON.stringify(newOpenApiFile, null, 2),
  );
};

main();
