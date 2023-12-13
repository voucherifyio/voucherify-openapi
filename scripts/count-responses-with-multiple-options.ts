import path from "path";
import fsPromises from "fs/promises";

const main = async () => {
    const openApiPath = path.join(__dirname, "../reference/OpenAPI.json");
    const openAPIContent = JSON.parse(
        (await fsPromises.readFile(openApiPath)).toString()
    );

    const schemas = openAPIContent.components.schemas;

    const schemasWithOneOf = Object.keys(schemas)
        .filter(schemaName => schemaName.includes("ResponseBody"))
        .filter(schemaName => schemas[schemaName].oneOf)

    console.log("Responses schemas with oneOf = ", schemasWithOneOf);
}

main()
