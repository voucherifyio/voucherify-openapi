import path from "path";
import fsPromises from "fs/promises";
import { checkRequestResponseSchemaNamesCorrectness } from "./count-important-statistics-about-openapi";
import _ from "lodash";
import fs from "fs";

type OpenAPIResponse = {
  endpoint: string;
  method: string;
  statusCode: string;
  schemaName: string;
};

const fixNames = (openApi) => {
  const redResponses: OpenAPIResponse[] =
    checkRequestResponseSchemaNamesCorrectness(openApi);

  const createSchemasFromResponsesAndChangeInPaths = (
    responses: OpenAPIResponse[]
  ) => {
    const schemas = {};

    responses.forEach((response) => {
      const endpointParts = _.split(response.endpoint, "/");
      const apiName = endpointParts[2];
      const titleCaseApiName = _.upperFirst(_.camelCase(apiName));

      const schemaName = `${titleCaseApiName}${response.schemaName}ResponseBody`;
      const schemaTitle = schemaName.split(/(?=[A-Z])/).join(" ");
      const shortenedEndpoint = endpointParts.slice(2).join("/");
      const description = `Response body for **${response.method.toUpperCase()}** for \`/${shortenedEndpoint}\`.`;

      schemas[schemaName] = {
        type: "object",
        title: schemaTitle,
        description: description,
        allOf: [
          {
            $ref: `#/components/schemas/${response.schemaName}`,
          },
        ],
      };

      openApi.paths[response.endpoint][response.method].responses[
        response.statusCode
      ].content["application/json"].schema = {
        $ref: `#/components/schemas/${schemaName}`,
      };
    });

    return schemas;
  };

  const newSchemas = createSchemasFromResponsesAndChangeInPaths(redResponses);

  openApi.components.schemas = {
    ...openApi.components.schemas,
    ...newSchemas,
  };

  return openApi;
};

const main = async () => {
  const openApiPath = path.join(__dirname, "../reference/OpenAPI.json");

  const getOpenAPI = async () =>
    JSON.parse((await fsPromises.readFile(openApiPath)).toString());

  const responseOpenApi = fixNames(await getOpenAPI());

  const pathToTmp = path.join(__dirname, "../tmp");
  if (!fs.existsSync(pathToTmp)) {
    fs.mkdirSync(pathToTmp);
  }

  const pathToTmpReference = path.join(__dirname, "../tmp/reference");
  if (!fs.existsSync(pathToTmpReference)) {
    fs.mkdirSync(pathToTmpReference);
  }

  await fsPromises.writeFile(
    path.join(__dirname, "../tmp/reference/fixedResponseBodies.json"),
    JSON.stringify(responseOpenApi, null, 2)
  );
};

main();
