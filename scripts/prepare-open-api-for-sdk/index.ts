import fsPromises from "fs/promises";
import fs from "fs";
import path from "path";
import minimist from "minimist";
import colors from "colors";
import { skipList } from "./skipList";
import {
  parseNullsToNullableObjects,
  removeAdditionalProperties,
  removeRequiredOnNullableAttributes,
  removeStoplightTag,
} from "./utils";
const options = minimist(process.argv.slice(2));

type LanguageOptions = {
  name: string;
  removeRequiredOnNullable?: boolean;
  simplifyAllObjectsThatHaveAdditionalProperties: boolean;
};

const supportedLanguages: {
  [language: string]: LanguageOptions;
} = {
  python: {
    name: "python",
    removeRequiredOnNullable: true,
    simplifyAllObjectsThatHaveAdditionalProperties: true,
  },
  ruby: {
    name: "ruby",
    simplifyAllObjectsThatHaveAdditionalProperties: false, //Will keep additional properties if regular properties are not present
  },
};

const main = async (languageOptions: LanguageOptions) => {
  const openApiPath = path.join(__dirname, "../../reference/OpenAPI.json");
  const openAPIContent = JSON.parse(
    (await fsPromises.readFile(openApiPath)).toString()
  );
  removeStoplightTag(openAPIContent);

  // Removing deprecated paths
  const paths = {};
  const pathsKeys = Object.keys(openAPIContent.paths);
  for (const pathKey of pathsKeys) {
    const skip = skipList.find((skip) => skip.endpoint === pathKey);
    const path = {};
    const methods = Object.keys(openAPIContent.paths[pathKey]);
    for (const method of methods) {
      if (
        openAPIContent.paths[pathKey][method]?.deprecated ||
        skip?.methods === true ||
        (skip?.methods && skip.methods.includes(method))
      ) {
        continue;
      }
      path[method] = openAPIContent.paths[pathKey][method];
      if (path[method].responses instanceof Object) {
        path[method].responses = Object.fromEntries(
          Object.entries(path[method].responses).filter((httpCodeAndSchema) => {
            const [httpCode, schema] = httpCodeAndSchema;
            return !isNaN(parseInt(httpCode)) && parseInt(httpCode) < 300;
          })
        );
      }
    }
    if (Object.keys(path).length > 0) {
      paths[pathKey] = path;
    }
  }

  // Removing not used parameters
  const parametersNames = JSON.stringify(paths)
    .match(/"#\/components\/parameters\/.*?"/g)
    .map((match) => match.replace('"#/components/parameters/', "").slice(0, -1))
    .sort();

  const parameters = {};
  for (const parameterName of parametersNames) {
    if (!openAPIContent.components.parameters?.[parameterName]) {
      console.log(`not found ${parameterName} in parameters`);
      continue;
    }
    parameters[parameterName] = removeAdditionalProperties(
      openAPIContent.components.parameters[parameterName],
      !languageOptions.simplifyAllObjectsThatHaveAdditionalProperties
    );
    if (languageOptions.removeRequiredOnNullable) {
      parameters[parameterName] = removeRequiredOnNullableAttributes(
        parameters[parameterName]
      );
    }
  }

  // Removing not used schemas
  const schemas = {};
  const schemasNamesFoundInPaths = JSON.stringify(paths)
    .match(/"#\/components\/schemas\/.*?"/g)
    .map((match) => match.replace('"#/components/schemas/', "").slice(0, -1))
    .sort();

  const usedParameters = JSON.stringify(paths)
    .match(/"#\/components\/parameters\/.*?"/g)
    .map((match) =>
      match.replace('"#/components/parameters/', "").slice(0, -1)
    );
  const schemasNamesFoundInPathsParameters: string[] = [];
  for (const parameter of usedParameters) {
    if (!openAPIContent.components.parameters?.[parameter]) {
      continue;
    }
    const schemasNamesFoundInParameter = JSON.stringify(
      openAPIContent.components.parameters[parameter]
    )
      .match(/"#\/components\/schemas\/.*?"/g)
      .map((match) => match.replace('"#/components/schemas/', "").slice(0, -1));
    schemasNamesFoundInPathsParameters.push(...schemasNamesFoundInParameter);
  }

  const allSchemasNames = [
    ...schemasNamesFoundInPaths,
    ...schemasNamesFoundInPathsParameters,
  ];

  for (const schemaName of allSchemasNames) {
    if (!openAPIContent.components.schemas?.[schemaName]) {
      console.log(`not found ${schemaName} in schemas`);
      continue;
    }
    schemas[schemaName] = removeAdditionalProperties(
      openAPIContent.components.schemas[schemaName],
      !languageOptions.simplifyAllObjectsThatHaveAdditionalProperties
    );
    if (languageOptions.removeRequiredOnNullable) {
      schemas[schemaName] = removeRequiredOnNullableAttributes(
        schemas[schemaName]
      );
    }
  }

  // Finding other schemas uses
  let lastSchemaStringify = "";
  while (true) {
    const schemaStringify = JSON.stringify(schemas);
    if (lastSchemaStringify === schemaStringify) {
      break;
    }
    lastSchemaStringify = schemaStringify;
    const schemasNames = schemaStringify
      .match(/"#\/components\/schemas\/.*?"/g)
      .map((match) => match.replace('"#/components/schemas/', "").slice(0, -1))
      .sort();
    for (const schemaName of schemasNames) {
      if (!openAPIContent.components.schemas?.[schemaName]) {
        console.log(`not found ${schemaName} in schemas`);
        continue;
      }
      schemas[schemaName] = removeAdditionalProperties(
        openAPIContent.components.schemas[schemaName],
        !languageOptions.simplifyAllObjectsThatHaveAdditionalProperties
      );
      if (languageOptions.removeRequiredOnNullable) {
        schemas[schemaName] = removeRequiredOnNullableAttributes(
          schemas[schemaName]
        );
      }
    }
  }

  // Building all together
  const newOpenApiFile = { ...openAPIContent };
  newOpenApiFile.components.parameters = parameters;
  newOpenApiFile.components.schemas = parseNullsToNullableObjects(schemas);
  newOpenApiFile.paths = paths;

  //write the new OpenApiFile
  const pathToTmp = path.join(__dirname, "../../tmp");
  if (!fs.existsSync(pathToTmp)) {
    fs.mkdirSync(pathToTmp);
  }
  const pathToTmpReference = path.join(__dirname, "../../tmp/reference");
  if (!fs.existsSync(pathToTmpReference)) {
    fs.mkdirSync(pathToTmpReference);
  }
  const pathToTmpReferenceLanguage = path.join(
    __dirname,
    `../../tmp/reference/${languageOptions.name}`
  );
  if (!fs.existsSync(pathToTmpReferenceLanguage)) {
    fs.mkdirSync(pathToTmpReferenceLanguage);
  }
  await fsPromises.writeFile(
    path.join(
      __dirname,
      `../../tmp/reference/${languageOptions.name}/OpenAPI.json`
    ),
    JSON.stringify(newOpenApiFile, null, 2)
  );
};

if (!("language" in options)) {
  console.log(colors.red("invalid arguments, missing language parameter"));
} else if (
  typeof options.language !== "string" ||
  !Object.keys(supportedLanguages).includes(options.language)
) {
  console.log(
    colors.red(
      `invalid language arguments, supported languages are ${Object.keys(
        supportedLanguages
      )
        .map((language) => `"${language}"`)
        .join(", ")}`
    )
  );
} else {
  main(supportedLanguages[options.language]);
}
