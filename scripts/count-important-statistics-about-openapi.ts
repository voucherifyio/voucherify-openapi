import path from "path";
import fsPromises from "fs/promises";
import colors from "colors";

const wrapColor = (ok: boolean, message: any) =>
  ok ? colors.green(message) : colors.red(message);

const main = async () => {
  const openApiPath = path.join(__dirname, "../reference/OpenAPI.json");
  const openAPIContent = JSON.parse(
    (await fsPromises.readFile(openApiPath)).toString()
  );

  countResponsesSchemasWithOneOf(openAPIContent);
  countParametersWithoutRefs(openAPIContent);
  countEndpointsWithParametersThatNotUsingRefs(openAPIContent);
};

const getPathsResponsesNames = (openAPIContent) => {
  const schemas = openAPIContent.components.schemas;

  const pathsResponsesNames = Object.keys(openAPIContent.paths).map((path) => {
    const methods = Object.keys(openAPIContent.paths[path]);

    return methods.map((method) => {
      const responses = openAPIContent.paths[path][method].responses;

      return Object.keys(responses ?? [])
          .map((responseName) => responses[responseName].content?.["application/json"]?.schema?.$ref)
          .filter((e) => e)
    })
  }).flat(3);

  const responseSchemas = {};

  pathsResponsesNames.forEach((schemaName) => {
    const splitName = schemaName.split('/').pop();
    responseSchemas[splitName] = schemas[splitName];
  });

  return responseSchemas
}

const countResponsesSchemasWithOneOf = (openAPIContent) => {
  const countSchemasWithOneOf = (schemas, mainSchemaName = null) => {
    const elements = [];

    for (const schemaName in schemas) {
      if (schemas[schemaName].oneOf || schemas[schemaName].items?.oneOf) {
        elements.push(mainSchemaName ?? schemaName);
      }

      if (schemas[schemaName].properties) {
        const nestedSchemas = countSchemasWithOneOf(schemas[schemaName].properties, mainSchemaName ?? schemaName);
        elements.push(...nestedSchemas);
      }
    }

    return elements;
  };

  const responseSchemas = getPathsResponsesNames(openAPIContent);

  const schemasWithOneOf = new Set(countSchemasWithOneOf(responseSchemas));

  console.log("Top level responses schemas with oneOf =", schemasWithOneOf);
};

const countParametersWithoutRefs = (openAPIContent) => {
  const parameters = openAPIContent.components.parameters;

  const parametersWithoutRefs = Object.keys(parameters).filter(
    (parameterName) => !parameters[parameterName].schema.$ref
  );

  console.log(
    wrapColor(parametersWithoutRefs.length === 0, "Parameters without refs ="),
    parametersWithoutRefs
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
          (parameter) => !parameter.$ref && !parameter.schema?.$ref
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
      "Schema and methods that contains parameters without refs ="
    ),
    result
  );
};

main();
