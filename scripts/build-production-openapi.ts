import fsPromises from "fs/promises";
import fs from "fs";
import path from "path";
import { parseNullToNullable } from "./prepare-open-api-for-sdk/utils";

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
    (await fsPromises.readFile(openApiPath)).toString()
  );

  removeKey(openAPIContent, "x-stoplight");

  openAPIContent.components.schemas = parseNullToNullable(
    Object.fromEntries(
      Object.entries(openAPIContent.components.schemas)
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
          }
        )
    )
  );

  const pathToProductionReferenceFolder = path.join(__dirname, `../production`);
  if (!fs.existsSync(pathToProductionReferenceFolder)) {
    fs.mkdirSync(pathToProductionReferenceFolder);
  }

  await fsPromises.writeFile(
    path.join(__dirname, `../production/readOnly-openAPI.json`),
    JSON.stringify(openAPIContent, null, 2)
  );
};

main();
