import path from "path";
import fsPromises from "fs/promises";
import colors from "colors";
import _ from "lodash";

const wrapColor = (ok: boolean, message: any) =>
  ok ? colors.green(message) : colors.red(message);

const main = async () => {
  const openApiPath = path.join(__dirname, "../reference/OpenAPI.json");

  const getOpenAPI = async () =>
    JSON.parse((await fsPromises.readFile(openApiPath)).toString());

  countResponsesSchemasWithOneOf(await getOpenAPI());
  countParametersWithoutRefs(await getOpenAPI());
  countEndpointsWithParametersThatNotUsingRefs(await getOpenAPI());
  checkRequestResponseSchemaNamesCorrectness(await getOpenAPI());
};

const countResponsesSchemasWithOneOf = (openAPIContent) => {
  const countSchemasWithOneOf = (schemas, mainSchemaName = null) => {
    const elements = [];

    for (const schemaName in schemas) {
      if (schemas[schemaName].oneOf || schemas[schemaName].items?.oneOf) {
        elements.push(mainSchemaName ?? schemaName);
      }

      if (schemas[schemaName].properties) {
        const nestedSchemas = countSchemasWithOneOf(
          schemas[schemaName].properties,
          mainSchemaName ?? schemaName,
        );
        elements.push(...nestedSchemas);
      }
    }

    return elements;
  };

  const getPathsResponses = (openAPIContent) => {
    const schemas = openAPIContent.components.schemas;

    const pathsResponsesNames = Object.keys(openAPIContent.paths)
      .map((path) => {
        const methods = Object.keys(openAPIContent.paths[path]);

        return methods.map((method) => {
          const responses = openAPIContent.paths[path][method].responses;

          return Object.keys(responses ?? [])
            .map(
              (responseName) =>
                responses[responseName].content?.["application/json"]?.schema
                  ?.$ref,
            )
            .filter((e) => e);
        });
      })
      .flat(3);

    const responseSchemas = {};

    pathsResponsesNames.forEach((schemaName) => {
      const splitName = schemaName.split("/").pop();
      responseSchemas[splitName] = schemas[splitName];
    });

    return responseSchemas;
  };

  const responseSchemas = getPathsResponses(openAPIContent);

  const schemasWithOneOf: Set<string> = new Set(
    countSchemasWithOneOf(responseSchemas),
  );

  const validSchemasWithOneOf = [
    "ExportsCreateResponseBody",
    "ValidationsValidateResponseBody", //fixed after main repo PR merged
    "PublicationsCreateResponseBody",
    "PublicationsListResponseBody",
    "ProductCollectionsProductsListResponse",
    "RedemptionsListResponseBody", //fixed by fixing in python template, has problems with required
    "RedemptionsGetResponseBody",
    "RedemptionsGetVoucherRedemptionResponseBody",
    "RewardAssignment",
    "VouchersValidateResponseBody", //deprecated
  ];

  const obsoleteSchemasWithOneOf = [
    "4_obj_reward_object",
    "6_res_validate_promotion_tier",
    "8_obj_loyalty_campaign_object",
    "8_obj_export_object_points_expiration",
    "8_obj_earning_rule_object",
    "17_obj_async_action_object",
  ];

  const result = _.difference(_.toArray(schemasWithOneOf), [
    ...validSchemasWithOneOf,
    ...obsoleteSchemasWithOneOf,
  ]);

  console.log(
    wrapColor(!result.length, "Top level responses schemas with oneOf ="),
    result,
  );
};

const countParametersWithoutRefs = (openAPIContent) => {
  const parameters = openAPIContent.components.parameters;

  const parametersWithoutRefs = Object.keys(parameters).filter(
    (parameterName) => !parameters[parameterName].schema.$ref,
  );

  console.log(
    wrapColor(parametersWithoutRefs.length === 0, "Parameters without refs ="),
    parametersWithoutRefs,
  );
};

const countEndpointsWithParametersThatNotUsingRefs = (openAPIContent) => {
  type PathsWithMethods = Record<string, MethodWithParametersCount>;
  type MethodWithParametersCount = Record<string, number>;

  const paths = openAPIContent.paths;

  const result: PathsWithMethods = {};

  Object.keys(paths).forEach((path) => {
    result[path] = {};

    const methods = Object.keys(paths[path]);
    methods.forEach((method) => {
      const parameters = paths[path][method].parameters;
      if (parameters) {
        const parametersWithoutRefs = parameters.filter(
          (parameter) => !parameter.$ref && !parameter.schema?.$ref,
        );

        if (parametersWithoutRefs.length) {
          result[path][method] = parametersWithoutRefs
            .map((parameter) => parameter.name)
            .filter((e) => e);
        }
      }
    });

    if (!Object.keys(result[path]).length) {
      delete result[path];
    }
  });

  console.log(
    wrapColor(
      Object.keys(result).length === 0,
      "Schema and methods that contains parameters without refs =",
    ),
    result,
  );
};

export const checkRequestResponseSchemaNamesCorrectness = (openAPIContent) => {
  let skipList = [];
  const redResponses: Response[] = [];

  type Response = {
    endpoint: string;
    method: string;
    statusCode: string;
    schemaName: string;
    red?: boolean;
  };

  const addToSkipList = (path, method) => {
    const existingItemWithCurrentPath = skipList.find(
      (item) => item.endpoint === path,
    );
    if (existingItemWithCurrentPath) {
      skipList = [
        ...skipList.filter((item) => item.endpoint !== path),
        {
          ...existingItemWithCurrentPath,
          methods: [...existingItemWithCurrentPath.methods, method],
        },
      ];
    } else {
      skipList.push({ endpoint: path, methods: [method] });
    }
  };

  console.log(wrapColor(true, "\nchecking request/response schema names.."));

  Object.entries(openAPIContent.paths).map((pathAndPathData) => {
    const [path, pathData] = pathAndPathData;
    Object.entries(pathData).map((methodNameAndMethodData) => {
      const messages: Response[] = [];

      const [methodName, methodData] = methodNameAndMethodData;
      if (methodName === "parameters") {
        return [methodName, methodData];
      }
      const { responses } = methodData;
      const requestSchemasNames =
        methodData?.requestBody instanceof Object
          ? JSON.stringify(methodData?.requestBody)
              .match(/"#\/components\/schemas\/.*?"/g)
              ?.map((match) =>
                match.replace('"#/components/schemas/', "").slice(0, -1),
              )
              .sort() || []
          : [];

      let old = false;
      for (const requestSchemaName of requestSchemasNames) {
        if (requestSchemaName?.includes?.("_")) {
          old = true;
        }
        if (
          requestSchemaName &&
          !requestSchemaName?.endsWith?.("RequestBody")
        ) {
          messages.push({
            endpoint: path,
            method: methodName,
            statusCode: null,
            schemaName: requestSchemaName,
          });
        }
      }

      Object.entries(responses || {}).map((statusCodeAndResponseData) => {
        const [statusCode, responseData] = statusCodeAndResponseData;
        const statusCodeNumber = parseInt(statusCode);
        if (statusCodeNumber >= 300) {
          return [statusCode, responseData];
        }
        const responseSchema = (responseData as any)?.content?.[
          "application/json"
        ]?.schema;
        const responseSchemasNames =
          responseSchema instanceof Object
            ? JSON.stringify(responseSchema)
                .match(/"#\/components\/schemas\/.*?"/g)
                ?.map((match) =>
                  match.replace('"#/components/schemas/', "").slice(0, -1),
                )
                .sort() || []
            : [];

        for (const responseSchemaName of responseSchemasNames) {
          if (responseSchemaName?.includes?.("_")) {
            old = true;
          }
          if (
            responseSchemaName &&
            !responseSchemaName?.endsWith?.("ResponseBody")
          ) {
            // `${path} [${methodName}/request] - ${requestSchemaName}`
            // `${path} [${methodName}/response/${statusCode}] - ${responseSchemaName}`
            messages.push({
              endpoint: path,
              method: methodName,
              statusCode: statusCode,
              schemaName: responseSchemaName,
            });
          }
        }
      });

      if (old) {
        addToSkipList(path, methodName);
      }
      if (messages.length > 0) {
        if (old) {
          console.log(
            colors.yellow(
              messages
                .map(
                  (message) =>
                    `${message.endpoint} [${message.method}/${message.statusCode}] - ${message.schemaName}`,
                )
                .join("\n"),
            ),
          );
        } else {
          console.log(
            colors.red(
              messages
                .map(
                  (message) =>
                    `${message.endpoint} [${message.method}/${message.statusCode}] - ${message.schemaName}`,
                )
                .join("\n"),
            ),
          );
          redResponses.push(
            ...messages.map((message) => {
              return { ...message, red: true };
            }),
          );
        }
      }
    });
  });

  console.log(colors.yellow("skipList:"), JSON.stringify(skipList));

  return redResponses;
};

main();
