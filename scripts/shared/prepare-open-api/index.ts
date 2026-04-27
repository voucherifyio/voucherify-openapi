import colors from "colors";
import fs from "fs";
import fsPromises from "fs/promises";
import _ from "lodash";
import minimist from "minimist";
import path from "path";
import originalOpenAPIContent from "../../../reference/OpenAPI.json";
import { getPathsWithoutDeprecated } from "./get-paths-without-deprecated";
import { putNotObjectSchemasIntoObjectSchemas } from "./put-not-object-schemas-into-object-schemas";
import {
  removeBuggedTagsFromOpenAPIParameters,
  removeBuggedTagsFromOpenAPIPaths,
} from "./remove-bugged-tags-from-open-api";
import { removeNotUsedSchemas } from "./remove-not-used-schemas";
import { removeUnwantedProperties } from "./remove-unwanted-properties";
import { removedNotUsedParameters } from "./removed-not-used-parameters";
import {
  cleanUpDescriptionsInEntireObject,
  removeAllOneOfs,
} from "./removeOneOfs";
import {
  parseNullsToNullableObjects,
  removeStoplightTag,
  snakeToCamel,
} from "./utils";

let openAPIContent: any = originalOpenAPIContent;
import addMissingDefaults from "./add-missing-defaults";
import * as openApi from "../../../reference/OpenAPI.json";
import removePythonBreakingChanges from "./remove-breaking-changes/python";
import removeRubyBreakingChanges from "./remove-breaking-changes/ruby";
import removePhpBreakingChanges from "./remove-breaking-changes/php";
import removeJavaBreakingChanges from "./remove-breaking-changes/java";
import removeDotnetBreakingChanges from "./remove-breaking-changes/dotnet";
import removeJsBreakingChanges from "./remove-breaking-changes/js";

const options = minimist(process.argv.slice(2));

type LanguageOptions = {
  name: string;
  simplifyAllObjectsThatHaveAdditionalProperties?: true;
  putNotObjectSchemasIntoObjectSchemas?: true;
  use2XX?: true;
  fixBreakingChanges: {
    before: (openApiContent: unknown) => typeof openApi;
    after: (openApiContent: unknown) => any;
  };
  supportOauth?: true;
  removeAllSchemasDefaults?: true;
};

const supportedLanguages: {
  [language: string]: LanguageOptions;
} = {
  python: {
    name: "python",
    simplifyAllObjectsThatHaveAdditionalProperties: true, //MUST STAY!
    use2XX: true, //MUST STAY!
    fixBreakingChanges: removePythonBreakingChanges,
  },
  ruby: {
    name: "ruby",
    fixBreakingChanges: removeRubyBreakingChanges,
  },
  php: {
    name: "php",
    putNotObjectSchemasIntoObjectSchemas: true, //MUST STAY!
    fixBreakingChanges: removePhpBreakingChanges,
  },
  java: {
    name: "java",
    fixBreakingChanges: removeJavaBreakingChanges,
  },
  dotnet: {
    name: "dotnet",
    supportOauth: true,
    removeAllSchemasDefaults: true,
    fixBreakingChanges: removeDotnetBreakingChanges,
  },
  js: {
    name: "js",
    supportOauth: true,
    fixBreakingChanges: removeJsBreakingChanges,
  },
};

const savePreparedOpenApiFile = async (lang: string, openAPI: object) => {
  const pathToReference = path.join(__dirname, "../../../reference");
  if (!fs.existsSync(pathToReference)) {
    fs.mkdirSync(pathToReference);
  }
  const pathToReferenceReadonlySdks = path.join(
    __dirname,
    "../../../reference/readonly-sdks",
  );
  if (!fs.existsSync(pathToReferenceReadonlySdks)) {
    fs.mkdirSync(pathToReferenceReadonlySdks);
  }
  const pathToReferenceReadonlySdksLanguage = path.join(
    __dirname,
    `../../../reference/readonly-sdks/${lang}`,
  );
  if (!fs.existsSync(pathToReferenceReadonlySdksLanguage)) {
    fs.mkdirSync(pathToReferenceReadonlySdksLanguage);
  }
  await fsPromises.writeFile(
    path.join(
      __dirname,
      `../../../reference/readonly-sdks/${lang}/OpenAPI.json`,
    ),
    JSON.stringify(openAPI, null, 2),
  );
};

const main = async (languageOptions: LanguageOptions) => {
  const prohibited = [
    '"readOnly": true',
    '"readOnly": false',
    '"writeOnly": true',
    '"writeOnly": false',
  ];
  prohibited.forEach((prohibited) => {
    if (JSON.stringify(openAPIContent).includes(prohibited)) {
      throw `Prohibited string found in source OpenAPI file! Found: "${prohibited}"`;
    }
  });

  //////////////////////////////////////////////////////////////////////////////
  ////////////////////BEGINNING OF CLEANUP OPEN API FILE////////////////////////
  ///////////////////////THIS SHALL BE HERE FOREVER/////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  removeStoplightTag(openAPIContent);
  openAPIContent.components.schemas = removeUnwantedProperties(
    openAPIContent.components.schemas,
    ["title"],
  );
  //Simplify AsyncAction.result
  openAPIContent.components.schemas.AsyncAction.allOf.map((schema) => {
    if (schema?.properties?.result) {
      schema.properties.result = {
        // @ts-ignore
        type: "object",
      };
    }
  });
  //use JSON.parse to not worry about TS
  openAPIContent.components.schemas.Any = JSON.parse(`{
        "title": "Any"
      }`);
  delete openAPIContent.components.schemas.AsyncActionBase.properties.type.enum;
  if (openAPIContent.components.schemas.CustomerActivity?.properties?.data) {
    openAPIContent.components.schemas.CustomerActivity.properties.data = {
      type: "object",
      description:
        "Contains details about the event. The objects that are returned in the data attribute differ based on the context of the event type.",
    };
  }
  // Remove query parameter from GET /v1/templates/campaigns/{campaignTemplateId}
  openAPIContent.paths["/v1/templates/campaigns/{campaignTemplateId}"].get.parameters = [];
  //////////////////////////////////////////////////////////////////////////////
  ///////////////////////END OF CLEANUP OPEN API FILE///////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  openAPIContent = languageOptions.fixBreakingChanges.before(openAPIContent);
  openAPIContent = addMissingDefaults(openAPIContent);
  const { paths, newSchemas } = getPathsWithoutDeprecated(
    openAPIContent.paths,
    languageOptions.name,
    languageOptions.use2XX,
  );
  const parameters = removedNotUsedParameters(
    openAPIContent.components.parameters,
    paths,
    languageOptions,
  );
  let schemasWithoutNotUsed = removeNotUsedSchemas(
    openAPIContent.components,
    paths,
    languageOptions,
    newSchemas,
  );
  if (languageOptions.putNotObjectSchemasIntoObjectSchemas) {
    schemasWithoutNotUsed = putNotObjectSchemasIntoObjectSchemas(
      schemasWithoutNotUsed,
    );
  }
  const schemas = removeAllOneOfs(
    schemasWithoutNotUsed,
    paths,
    openAPIContent.components.parameters,
    languageOptions,
  );
  const pathsWithoutBuggedTags = removeBuggedTagsFromOpenAPIPaths(paths);
  const pathsWithFixedResponses = Object.fromEntries(
    Object.entries(pathsWithoutBuggedTags).map(([path, pathEntry]) => {
      return [
        path,
        Object.fromEntries(
          Object.entries(pathEntry).map(([method, methodEntry]) => {
            methodEntry.responses = Object.fromEntries(
              _.compact(
                Object.entries(methodEntry.responses || {}).map(
                  ([statusCode, responseEntry]) => {
                    if (!statusCode.startsWith("2")) {
                      return;
                    }
                    if (languageOptions.use2XX) {
                      return ["2XX", responseEntry];
                    }
                    return [statusCode, responseEntry];
                  },
                ),
              ),
            );
            return [method, methodEntry];
          }),
        ),
      ];
    }),
  );

  openAPIContent.components.parameters = removeBuggedTagsFromOpenAPIParameters(
    openAPIContent.components.parameters,
  );

  const schemasWithFixedTitles: any = fixSchemasTitles(
    removeUnwantedProperties(
      parseNullsToNullableObjects(copySchemasIfUsedAsAllOfInBase(schemas)),
      ["title"],
    ),
  );
  schemasWithoutNotUsed = removeNotUsedSchemas(
    {
      schemas: schemasWithFixedTitles,
      parameters: openAPIContent.components.parameters,
    },
    paths,
    languageOptions,
    {},
  );
  if (languageOptions.removeAllSchemasDefaults) {
    schemasWithoutNotUsed = removeUnwantedProperties(schemasWithoutNotUsed, [
      "default",
    ]);
  }

  if (!languageOptions.supportOauth) {
    openAPIContent.components.securitySchemes = _.omit(
      openAPIContent.components.securitySchemes,
      ["X-Voucherify-OAuth"],
    );
    Object.values(pathsWithFixedResponses).forEach((methods) => {
      Object.values(methods).forEach((method) => {
        if (method?.security) {
          method.security = [
            _.omit(method.security?.[0] || {}, "X-Voucherify-OAuth"),
          ];
        }
      });
    });
  }

  // Building all together
  let newOpenApiFile = cleanUpDescriptionsInEntireObject({
    ...openAPIContent,
    components: {
      ...openAPIContent.components,
      schemas: fixRefUagesInAllSchemasProperties(schemasWithoutNotUsed),
      parameters,
    },
    paths: pathsWithFixedResponses,
  });

  newOpenApiFile = languageOptions.fixBreakingChanges.after(newOpenApiFile);

  newOpenApiFile.components.schemas = fixSchemasTitles(
    _.cloneDeep(newOpenApiFile.components.schemas),
  );

  await savePreparedOpenApiFile(languageOptions.name, newOpenApiFile);
};

const mergeObjectsWithAllOfs = (object, schemas) => {
  const _object = _.omit(object, ["allOf"]);
  _object.type = "object";
  _object.properties = {};
  object.allOf.forEach((item) => {
    if (item?.$ref) {
      const shcemaName = item?.$ref?.split("/").at(-1);
      if (!schemas[shcemaName]) {
        throw new Error(
          `Could not find schema ${shcemaName}, ref: ${item?.$ref}`,
        );
      }
      if (schemas[shcemaName].allOf) {
        _object.properties = {
          ..._object.properties,
          ...mergeObjectsWithAllOfs(schemas[shcemaName], schemas).properties,
        };
      } else if (schemas[shcemaName].properties) {
        _object.properties = {
          ..._object.properties,
          ...schemas[shcemaName].properties,
        };
      } else {
        throw new Error(
          `Could not find allOf or Properties in schema ${shcemaName}`,
        );
      }
    } else if (item?.properties) {
      _object.properties = {
        ..._object.properties,
        ...item?.properties,
      };
    } else if (item.allOf) {
      _object.properties = {
        ...mergeObjectsWithAllOfs(item, schemas).properties,
        ...item?.properties,
      };
    } else if (item.type === "object" && item.required.length) {
    } else {
      console.log(item);
      throw new Error(
        `Could not find any properties and any ref in one of allOf in object`,
        object,
      );
    }
  });
  return _object;
};

const fixRefUagesInAllSchemasProperties = (schemas) => {
  return Object.fromEntries(
    Object.entries(schemas).map(([title, schema]) => {
      return [title, fixRefsUsages(schema)];
    }),
  );
};

const copySchemasIfUsedAsAllOfInBase = (schemas): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(schemas).map(([schemaName, schema]): any => {
      if (
        !_.isObject(schema) ||
        !("allOf" in schema) ||
        (schema as any).allOf?.length === 0
      ) {
        return [schemaName, schema];
      } else if ((schema as any).allOf?.length === 1) {
        const copyFrom = schema.allOf?.[0]?.$ref;
        if (typeof copyFrom === "string") {
          const copyFromSchemaName = copyFrom.split("/").at(-1);
          if (schemas[copyFromSchemaName]) {
            if (schemas[copyFromSchemaName].allOf) {
              return [
                schemaName,
                _.merge(
                  _.omit(
                    _.omit(
                      mergeObjectsWithAllOfs(
                        schemas[copyFromSchemaName],
                        schemas,
                      ),
                      ["description", "allOf"],
                    ),
                    ["description"],
                  ),
                  _.pick(schema, ["description"]),
                ),
              ];
            }
            return [
              schemaName,
              _.merge(
                _.omit(schemas[copyFromSchemaName], ["description"]),
                _.pick(schema, ["description"]),
              ),
            ];
          } else {
            throw new Error(
              `Could not find ${copyFromSchemaName} schema.... ref found in schema ${schemaName}`,
            );
          }
        } else {
          throw new Error(
            `Could not find $ref in schema ${schemaName}.allOf[0]`,
          );
        }
      } else {
        return [
          schemaName,
          _.merge(
            _.omit(mergeObjectsWithAllOfs(schema, schemas), [
              "description",
              "allOf",
            ]),
            _.pick(schema, ["description"]),
          ),
        ];
      }
    }),
  );
};

const returnRefSchemaIfAllOfContainsOnly1Reference = (schema) => {
  if (
    schema?.allOf?.length === 1 &&
    schema.allOf[0]?.$ref &&
    !schema.required?.length
  ) {
    return schema.allOf[0];
  }
  return false;
};

const fixRefsUsages = (schema) => {
  const refSchema = returnRefSchemaIfAllOfContainsOnly1Reference(schema);
  if (refSchema) {
    return refSchema;
  }
  if (schema.items) {
    schema.items = fixRefsUsages(schema.items);
  } else if (schema.properties) {
    schema.properties = Object.fromEntries(
      Object.entries(schema.properties).map(([property, schema]: any) => {
        return [property, fixRefsUsages(schema)];
      }),
    );
  } else if (schema.additionalProperties) {
    schema.additionalProperties = fixRefsUsages(schema.additionalProperties);
  }
  return schema;
};

const fixSchemasTitles = (schemas) => {
  return Object.fromEntries(
    Object.entries(schemas).map(([title, schema]) => {
      return [title, fixSchemaTitle(schema, title, schemas)];
    }),
  );
};

const fixSchemaTitle = (schema, title, schemas, skipSettingTitle?: boolean) => {
  if (schema.$ref) {
    return _.pick(schema, "$ref");
  }
  if (skipSettingTitle !== true) {
    if (schema.additionalProperties) {
      schema.title = `${title}Entry`;
    } else {
      schema.title = title;
    }
  }
  if (schema.items) {
    schema.items = fixSchemaTitle(schema.items, `${title}Item`, schemas);
  }
  if (schema.properties) {
    schema.properties = Object.fromEntries(
      Object.entries(_.cloneDeep(schema.properties)).map(
        ([property, schema]: any) => {
          const _title = `${title}${_.startCase(
            snakeToCamel(property),
          ).replaceAll(" ", "")}`;
          if ("allOf" in schema && schema.allOf.length > 1) {
            return [
              property,
              fixSchemaTitle(
                mergeObjectsWithAllOfs(schema, schemas),
                _title,
                schemas,
              ),
            ];
          } else if ("allOf" in schema && schema.allOf.length === 1) {
            return [property, fixSchemaTitle(schema.allOf[0], _title, schemas)];
          } else if (schema.type === "object" || schema.type === "array") {
            return [property, fixSchemaTitle(schema, _title, schemas)];
          }
          return [property, schema];
        },
      ),
    );
  }
  if (schema.allOf) {
    schema.allOf = schema.allOf.map((schema: any) =>
      fixSchemaTitle(schema, title, schemas, true),
    );
  }
  if (schema.additionalProperties) {
    schema.additionalProperties = fixSchemaTitle(
      schema.additionalProperties,
      `${title}Entry`,
      schemas,
      true,
    );
  }
  return { title: schema.title, ..._.omit(schema, ["title"]) };
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
        supportedLanguages,
      )
        .map((language) => `"${language}"`)
        .join(", ")}`,
    ),
  );
} else {
  main(supportedLanguages[options.language]);
}
