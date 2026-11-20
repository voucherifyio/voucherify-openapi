import fsPromises from "fs/promises";
import fs from "fs";
import path from "path";
import { removedNotUsedParameters } from "./prepare-open-api/removed-not-used-parameters";
import { removeNotUsedSchemas } from "./prepare-open-api/remove-not-used-schemas";
import { parseNullsToNullableObjects } from "./prepare-open-api/utils";
import { removeNotYetRefactoredPaths } from "./remove-not-yet-refactored-paths";
import { applySdkOpenApiVersion } from "./openapi-version/migrate";
import {
  documentWithoutLoyaltyV2,
  omitLoyaltyV2Document,
} from "./loyalty-v2/document";
import { omitWebhooks } from "./openapi-webhooks/reachable-schemas";

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
  const openApiPath = path.join(__dirname, "../../reference/OpenAPI.json");
  // production/readOnly-openAPI.json stays 3.0.1 for external viewers.
  // The reversible downgrade leaves if/then/not; the SDK entry folds them.
  const openAPIContent = applySdkOpenApiVersion(
    documentWithoutLoyaltyV2(
      JSON.parse((await fsPromises.readFile(openApiPath)).toString()),
      { keepSdkPublishedPaths: true },
    ),
    true,
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
    ...omitLoyaltyV2Document(omitWebhooks(openAPIContent)),
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
    path.join(__dirname, `../../production/readOnly-openAPI.json`),
    JSON.stringify(newOpenApiFile, null, 2),
  );
};

main();
