import path from "path";
import fsPromises from "fs/promises";

const main = async () => {
    const openApiPath = path.join(__dirname, "../reference/OpenAPI.json");
    const openAPIContent = JSON.parse(
        (await fsPromises.readFile(openApiPath)).toString()
    );

    countResponsesSchemasWithOneOf(openAPIContent);
    countParametersWithoutRefs(openAPIContent);
    countEndpointsWithParametersThatNotUsingRefs(openAPIContent);
}

const countResponsesSchemasWithOneOf = (openAPIContent) => {
    const schemas = openAPIContent.components.schemas;

    const schemasWithOneOf = Object.keys(schemas)
        .filter(schemaName => schemaName.includes("ResponseBody"))
        .filter(schemaName => schemas[schemaName].oneOf)

    console.log("Responses schemas with oneOf = ", schemasWithOneOf);
}

const countParametersWithoutRefs = (openAPIContent) => {
    const parameters = openAPIContent.components.parameters;

    const parametersWithoutRefs = Object.keys(parameters)
        .filter(parameterName => !parameters[parameterName].schema.$ref)

    console.log("Parameters without refs = ", parametersWithoutRefs.length);
}

const countEndpointsWithParametersThatNotUsingRefs = (openAPIContent) => {
    type PathsWithMethods = Record<string, MethodWithParametersCount>;
    type MethodWithParametersCount = Record<string, number>;

    const paths = openAPIContent.paths;

    const result: PathsWithMethods = {}

    Object.keys(paths).forEach(path => {
        result[path] = {};

        const methods = Object.keys(paths[path]);
        methods.forEach(method => {
            const parameters = paths[path][method].parameters;
            if(parameters){
                const parametersWithoutRefs = parameters.filter(parameter => !parameter.$ref);

                if(parametersWithoutRefs.length){
                    result[path][method] = parametersWithoutRefs.map(parameter => parameter.name).join(", ");
                }
            }
        })

        if(!Object.keys(result[path]).length){
            delete result[path];
        }
    })

    console.log("Schema and methods that contains parameters without refs = ", result);
}

main()
