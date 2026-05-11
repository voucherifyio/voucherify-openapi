import {
  makeEverythingNullable,
  removeAdditionalProperties,
  removeRequiredOnNullableAttributes,
} from "./utils";

type Components = {
  parameters: Record<string, any>;
  schemas: Record<string, any>;
};

type LanguageOptions = {
  simplifyAllObjectsThatHaveAdditionalProperties?: boolean;
};

export const removeNotUsedSchemas = (
  components: Components,
  paths: {},
  languageOptions: LanguageOptions,
  schemas: Record<string, any>,
) => {
  const schemasNamesFoundInPaths = JSON.stringify(paths)
    .match(/"#\/components\/schemas\/.*?"/g)
    .map((match) => match.replace('"#/components/schemas/', "").slice(0, -1))
    .sort();

  const usedParameters = JSON.stringify(paths)
    .match(/"#\/components\/parameters\/.*?"/g)
    .map((match) =>
      match.replace('"#/components/parameters/', "").slice(0, -1),
    );
  const schemasNamesFoundInPathsParameters: string[] = [];
  for (const parameter of usedParameters) {
    if (!components.parameters?.[parameter]) {
      continue;
    }
    const schemasNamesFoundInParameter = JSON.stringify(
      components.parameters[parameter],
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
    if (!components.schemas?.[schemaName]) {
      console.log(`not found ${schemaName} in schemas`);
      continue;
    }
    schemas[schemaName] = removeAdditionalProperties(
      components.schemas[schemaName],
      !languageOptions.simplifyAllObjectsThatHaveAdditionalProperties,
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
    const schemasNames = schemaStringify
      .match(/"#\/components\/schemas\/.*?"/g)
      .map((match) => match.replace('"#/components/schemas/', "").slice(0, -1))
      .sort();
    for (const schemaName of schemasNames) {
      if (!components.schemas?.[schemaName]) {
        console.log(`not found ${schemaName} in schemas`);
        continue;
      }
      schemas[schemaName] = removeAdditionalProperties(
        components.schemas[schemaName],
        !languageOptions.simplifyAllObjectsThatHaveAdditionalProperties,
      );
    }
  }

  Object.keys(schemas).forEach((schemaName) => {
    schemas[schemaName] = makeEverythingNullable(schemas[schemaName]);
  });
  Object.keys(schemas).forEach((schemaName) => {
    schemas[schemaName] = removeRequiredOnNullableAttributes(
      schemas[schemaName],
    );
  });

  return schemas;
};
