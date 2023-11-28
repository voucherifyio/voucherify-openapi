// to run it:
// npm run generate-open-api-with-specific-endpoints-remove-additionalProperties-if -- --always
// or
// npm run generate-open-api-with-specific-endpoints-remove-additionalProperties-if -- --usedWithStandardProperties

import fsPromises from "fs/promises";
import fs from "fs";
import path from "path";
import { omit } from "lodash";
import minimist from "minimist";
import colors from "colors";
const options = minimist(process.argv.slice(2));

function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

const removeStoplightTag = (node: object): object => {
  delete node["x-stoplight"];
  for (const attr in node) {
    if (isObject(node[attr])) {
      removeStoplightTag(node[attr]);
    }
  }
  return node;
};

const grabList: { endpoint: string; methods: string[] | true }[] = [
  { endpoint: "/v1/customers/{customerId}/consents", methods: ["put"] },
];

const removeAdditionalProperties = (
  e: any,
  keepIfPropertiesNotPresent = false
) => {
  const simplifyObjectModel = (o) =>
    omit(o, ["additionalProperties", "properties"]);

  if (e instanceof Object) {
    if (
      !keepIfPropertiesNotPresent &&
      "additionalProperties" in e &&
      e.additionalProperties instanceof Object
    ) {
      return simplifyObjectModel(e);
    } else if (
      "additionalProperties" in e &&
      e.additionalProperties instanceof Object &&
      "properties" in e
    ) {
      return simplifyObjectModel(e);
    }
    for (const f of Object.keys(e)) {
      if (typeof e[f] === "object") {
        e[f] = removeAdditionalProperties(e[f]);
      }
    }
  }
  return e;
};

const main = async (keepIfPropertiesNotPresent) => {
  const openApiPath = path.join(__dirname, "../reference/OpenAPI.json");
  const openAPIContent = JSON.parse(
    (await fsPromises.readFile(openApiPath)).toString()
  );
  removeStoplightTag(openAPIContent);

  // Removing deprecated paths
  const paths = {};
  const pathsKeys = Object.keys(openAPIContent.paths);
  for (const pathKey of pathsKeys) {
    const grab = grabList.find((grab) => grab.endpoint === pathKey);
    const path = {};
    const methods = Object.keys(openAPIContent.paths[pathKey]);
    for (const method of methods) {
      if (
        grab?.methods === true ||
        (grab?.methods && grab.methods.includes(method)) ||
        (grab?.methods && method === "parameters")
      ) {
        path[method] = openAPIContent.paths[pathKey][method];
      } else {
        continue;
      }
    }
    if (Object.keys(path).length > 0) {
      paths[pathKey] = path;
    }
  }

  const pathsStringify = JSON.stringify(paths);

  // Removing not used parameters
  const parametersNames =
    pathsStringify
      .match(/"#\/components\/parameters\/.*?"/g)
      ?.map((match) =>
        match.replace('"#/components/parameters/', "").slice(0, -1)
      )
      .sort() || [];
  const parameters = {};
  for (const parameterName of parametersNames) {
    if (!openAPIContent.components.parameters?.[parameterName]) {
      console.log(`not found ${parameterName} in parameters`);
      continue;
    }
    parameters[parameterName] = removeAdditionalProperties(
      openAPIContent.components.parameters[parameterName],
      keepIfPropertiesNotPresent
    );
  }

  // Removing not used schemas
  const schemas = {};
  const schemasNames =
    pathsStringify
      .match(/"#\/components\/schemas\/.*?"/g)
      ?.map((match) => match.replace('"#/components/schemas/', "").slice(0, -1))
      .sort() || [];
  for (const schemaName of schemasNames) {
    if (!openAPIContent.components.schemas?.[schemaName]) {
      console.log(`not found ${schemaName} in schemas`);
      continue;
    }
    schemas[schemaName] = removeAdditionalProperties(
      openAPIContent.components.schemas[schemaName],
      keepIfPropertiesNotPresent
    );
  }

  // Finding other schemas uses
  let lastSchemaStringify = "";
  while (true) {
    const schemaStringify = JSON.stringify(schemas);
    if (lastSchemaStringify === schemaStringify) {
      break;
    }
    lastSchemaStringify = schemaStringify;
    const schemasNames =
      schemaStringify
        .match(/"#\/components\/schemas\/.*?"/g)
        ?.map((match) =>
          match.replace('"#/components/schemas/', "").slice(0, -1)
        )
        .sort() || [];
    for (const schemaName of schemasNames) {
      if (!openAPIContent.components.schemas?.[schemaName]) {
        console.log(`not found ${schemaName} in schemas`);
        continue;
      }
      schemas[schemaName] = openAPIContent.components.schemas[schemaName];
    }
  }

  // Building all together
  const newOpenApiFile = { ...openAPIContent };
  newOpenApiFile.components.parameters = parameters;
  newOpenApiFile.components.schemas = schemas;
  newOpenApiFile.paths = paths;

  //write the new OpenApiFile
  const pathToTmp = path.join(__dirname, "../tmp");
  if (!fs.existsSync(pathToTmp)) {
    fs.mkdirSync(pathToTmp);
  }
  const pathToTmpReference = path.join(__dirname, "../tmp/referencePartial");
  if (!fs.existsSync(pathToTmpReference)) {
    fs.mkdirSync(pathToTmpReference);
  }
  await fsPromises.writeFile(
    path.join(__dirname, "../tmp/referencePartial/OpenAPI.json"),
    JSON.stringify(newOpenApiFile, null, 2)
  );
};

const { always, usedWithStandardProperties } = options;
if (!always && !usedWithStandardProperties) {
  console.log(
    colors.red(
      "invalid arguments, missing `always` or `usedWithStandardProperties`"
    )
  );
} else if (always && usedWithStandardProperties) {
  console.log(
    colors.red(
      "invalid arguments, provided `always` and `usedWithStandardProperties`, please provide one argument"
    )
  );
} else {
  main(!!usedWithStandardProperties);
}
