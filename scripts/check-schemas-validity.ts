import path from "path";
import fsPromises from "fs/promises";
import _ from "lodash";

const main = async () => {
    const openApiPath = path.join(__dirname, "../reference/OpenAPI.json");

    const getOpenAPI = async () =>
        JSON.parse((await fsPromises.readFile(openApiPath)).toString());

    checkDuplications(await getOpenAPI(), "title");
    checkDuplications(await getOpenAPI(), "description");
};

const checkDuplications = (openAPIContent, property: string) => {
    console.log(`Checking ${property} duplications...`);
    const schemas = openAPIContent.components.schemas;

    const elements = Object.keys(schemas)
        .filter(schemaName => /^[A-Z]/.test(schemaName))
        .map(schemaName => schemas[schemaName][property])
        .filter(element => !!element)

    const duplicates = elements.filter((element, index) => elements.indexOf(element) !== index);

    console.log("Duplication count: ", elements.length - _.uniq(elements).length);

    console.log("Duplication: ", duplicates);
}

main();
