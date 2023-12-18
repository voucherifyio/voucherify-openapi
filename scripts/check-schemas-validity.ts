import path from "path";
import fsPromises from "fs/promises";
import _ from "lodash";

const descriptionCheckedSchemas = [
    'Contains current gift card balance information.',
    'Create publication with campaign.',
    'Order information.',
    'Redeem a discount code.',
    'Redeem a discount code.',
    'Request body schema for **POST** `/rewards/{rewardID}/assignments`.',
    'Request body schema for **POST** `/rewards/{rewardID}/assignments`.',
    'Request schema model for **POST** `/vouchers/{code}/validate`.',
    'Request schema model for validating a voucher using **POST** `/vouchers/{code}/validate`.',
    'Response body schema for **POST** `/campaigns/{campaignId}/disable`.',
    'Response body schema for **POST** `/campaigns/{campaignId}/vouchers`.',
    'Response body schema for **POST** `/campaigns/{campaignId}/vouchers`.',
    'Response body schema for **POST** `/customers/importCSV`.',
    'Response body schema for **POST** `/loyalties/{campaignId}/members/{memberId}/transfers`.',
    'Response body schema for **POST** `/product-collections`.',
    'Response body schema for **POST** `/product-collections`.',
    'Response body schema for **POST** `/product-collections`.',
    'Response body schema for **POST** `/products/importCSV`.',
    'Response body schema for **POST** `/publication` and **GET** `/publications/create`.',
    'Response body schema for **POST** `/publication` and **GET** `/publications/create`.',
    'Response body schema for **POST** `/redemptions`.',
    'Response body schema for **POST** `/skus/importCSV`.',
    'Response body schema for **POST** `/vouchers/{code}/validate`.',
    'Response body schema for **POST** `/vouchers/{code}/validate`.',
    'Response body schema for **PUT** `/validation-rules/{validationRuleId}`.',
    'Schema model for a campaign loyalty card.',
    'Schema model for a discount voucher.'
]

const main = async () => {
    const openApiPath = path.join(__dirname, "../reference/OpenAPI.json");

    const getOpenAPI = async () =>
        JSON.parse((await fsPromises.readFile(openApiPath)).toString());

    checkDuplications(await getOpenAPI(), "title");
    checkDuplications(await getOpenAPI(), "description", descriptionCheckedSchemas);
};

const checkDuplications = (openAPIContent, property: string, checkedSchemas: string[] = []) => {
    console.log(`Checking ${property} duplications...`);
    const schemas = openAPIContent.components.schemas;

    const elements = Object.keys(schemas)
        .filter(schemaName => /^[A-Z]/.test(schemaName))
        .map(schemaName => schemas[schemaName][property])
        .filter(element => !!element)

    const notCheckedElements = elements.filter(element => !checkedSchemas.includes(element));

    const duplicates = notCheckedElements
        .filter((element, index) => notCheckedElements.indexOf(element) !== index)
        .sort();

    console.log("Duplication count: ", notCheckedElements.length - _.uniq(notCheckedElements).length);

    console.log("Duplication: ", duplicates);
}

main();
