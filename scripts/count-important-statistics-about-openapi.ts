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

const countResponsesSchemasWithOneOf = (openAPIContent) => {
  const schemas = openAPIContent.components.schemas;

  const schemasWithOneOf = Object.keys(schemas)
    .filter((schemaName) => schemaName.includes("ResponseBody"))
    .filter((schemaName) => schemas[schemaName].oneOf);

  console.log("Responses schemas with oneOf = ", schemasWithOneOf);
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
