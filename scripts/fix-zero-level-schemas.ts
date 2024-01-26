import path from "path";
import fsPromises from "fs/promises";
import _, { lowerCase } from "lodash";
import fs from "fs";
import colors from "colors";
import {
  createResourceName,
  getNameElements,
} from "./helpers/createResourceName";

interface Response {
  code: string;
  currentName: string;
  newName: string;
}

interface Method {
  method: string;
  operationId: string;
  currentName: string;
  newName: string;
  responses: Response[];
}

interface Endpoint {
  name: string;
  path: string;
  isClient: boolean;
  methods: Method[];
}

interface NameFromTo {
  currentName: string;
  newName: string;
  endpointPath: string;
  method: string;
  responseCode?: string;
}

const main = async () => {
  const openApiPath = path.join(__dirname, "../reference/OpenAPI.json");

  const getOpenAPI = async () =>
    JSON.parse((await fsPromises.readFile(openApiPath)).toString());

  fix(await getOpenAPI());
};

const saveToJson = async (file, name) => {
  const pathToTmp = path.join(__dirname, "../tmp");
  if (!fs.existsSync(pathToTmp)) {
    fs.mkdirSync(pathToTmp);
  }

  const pathToTmpScriptsResults = path.join(__dirname, "../tmp/script-results");
  if (!fs.existsSync(pathToTmpScriptsResults)) {
    fs.mkdirSync(pathToTmpScriptsResults);
  }

  await fsPromises.writeFile(
    path.join(__dirname, `../tmp/script-results/${name}`),
    JSON.stringify(file, null, 2)
  );
};

const displayNameFromToNamesToChange = (namesFromTo: NameFromTo[]) => {
  let counter = 0;
  const writeLine = (nameFromTo: NameFromTo) => {
    console.log(
      colors.red(nameFromTo.currentName),
      " => ",
      colors.green(nameFromTo.newName)
    );
  };

  console.log("NAMES TO CHANGE: ");
  namesFromTo.forEach((nameFromTo) => {
    counter++;
    writeLine(nameFromTo);
  });

  console.log("COUNTER NAMES TO CHANGE = ", counter);
  console.log();
};

const transformEndpointsToNameFromTo = (
  endpoints: Endpoint[]
): NameFromTo[] => {
  return endpoints
    .map((endpoint) => {
      return endpoint.methods.map((method) => {
        const responsesMapped = method.responses.map((response) => {
          return {
            currentName: response.currentName,
            newName: response.newName,
            endpointPath: endpoint.path,
            method: method.method,
            responseCode: response.code,
          };
        });

        return [
          ...responsesMapped,
          {
            currentName: method.currentName,
            newName: method.newName,
            endpointPath: endpoint.path,
            method: method.method,
          },
        ];
      });
    })
    .flat(2)
    .filter((element) => element.newName)
    .filter((element) => element.currentName !== element.newName);
};

const createSchemas = (openApi, namesFromTo: NameFromTo[]) => {
  const newComponents = {};
  const schemasToDelete = [];

  console.log("GENERATING NEW SCHEMAS");

  const linkRefForNewSchema = (nameFromTo: NameFromTo) => {
    if (nameFromTo.responseCode) {
      openApi.paths[nameFromTo.endpointPath][nameFromTo.method].responses[
        nameFromTo.responseCode
      ].content[
        "application/json"
      ].schema.$ref = `#/components/schemas/${nameFromTo.newName}`;
    } else {
      openApi.paths[nameFromTo.endpointPath][
        nameFromTo.method
      ].requestBody.content[
        "application/json"
      ].schema.$ref = `#/components/schemas/${nameFromTo.newName}`;
    }
  };

  namesFromTo.forEach((nameFromTo) => {
    const schema = openApi.components.schemas[nameFromTo.currentName];

    const endpointPath = nameFromTo.endpointPath.split("/").slice(2).join("/");

    //NEW SCHEMAS
    if (!lowerCase(schema.description).includes(lowerCase(endpointPath))) {
      console.log(
        colors.red(
          "NEW SCHEMA - " + " " + endpointPath + " " + nameFromTo.newName
        )
      );

      const suffix = nameFromTo.currentName.includes("RequestBody")
        ? "RequestBody"
        : nameFromTo.currentName.includes("ResponseBody")
        ? "ResponseBody"
        : "";

      if (suffix) {
        newComponents[nameFromTo.newName] = {
          description:
            _.startCase(suffix) +
            " schema for " +
            `**${nameFromTo.method}**` +
            " " +
            "`/" +
            endpointPath +
            "`.",
          ...schema,
          title: _.startCase(_.camelCase(nameFromTo.newName)),
        };
      } else {
        newComponents[nameFromTo.newName] = {
          title: _.startCase(_.camelCase(nameFromTo.newName)),
          description:
            (nameFromTo.responseCode ? "Response body" : "Request body") +
            " schema for " +
            `**${nameFromTo.method}**` +
            " " +
            "`/" +
            endpointPath +
            "`.",
          allOf: [
            {
              $ref: `#/components/schemas/${nameFromTo.currentName}`,
            },
          ],
        };
      }

      linkRefForNewSchema(nameFromTo);

      return;
    }

    if (lowerCase(schema.description).includes(lowerCase(endpointPath))) {
      newComponents[nameFromTo.newName] = {
        ...schema,
        title: _.startCase(_.camelCase(nameFromTo.newName)),
      };
      schemasToDelete.push(nameFromTo.currentName);
      linkRefForNewSchema(nameFromTo);
    }
  });

  const schemasToRemove = _.difference(
    schemasToDelete,
    Object.keys(newComponents)
  );

  schemasToRemove.forEach((schemaToRemove) => {
    delete openApi.components.schemas[schemaToRemove];
  });

  Object.keys(newComponents).forEach((newComponent) => {
    openApi.components.schemas[newComponent] = newComponents[newComponent];
  });

  saveToJson(openApi, "new-schemas.json");
  console.log("NEW SCHEMAS SAVED IN new-schemas.json");
};

const fix = async (openApi) => {
  const paths = openApi.paths;

  const endpoints: Endpoint[] = Object.keys(paths).map((pathName) => {
    const path = paths[pathName];

    const isClient = pathName.includes("client");

    const nameElements = getNameElements(pathName);

    const methods = Object.keys(path)
      .filter((method) => method !== "parameters")
      .map((method) => {
        const operatorId = path[method].operationId;

        const endpointName = createResourceName(operatorId, method, pathName);

        const responses = Object.keys(path[method].responses ?? {})
          .filter((code) => parseInt(code) >= 200 && parseInt(code) < 300)
          .map((code) => {
            const response = path[method].responses[code];

            const ref = response.content?.["application/json"]?.schema?.$ref;

            if (!ref) {
              return;
            }

            if (ref.includes("_") || /\{.*\}/.test(ref)) {
              return;
            }

            return {
              code,
              currentName: ref.split("/").slice(-1).pop(),
              newName:
                (isClient ? "Client" : "") + endpointName + "ResponseBody",
            };
          });

        const ref =
          path[method].requestBody?.content["application/json"]?.schema?.$ref;

        let skip = false;

        if (ref) {
          if (ref.includes("_") || /\{.*\}/.test(ref)) {
            skip = true;
          }
        } else {
          skip = true;
        }

        if (skip) {
          console.log(colors.yellow("SKIP" + " " + pathName + " " + method));
        }

        return {
          method,
          operationId: path[method].operationId,
          currentName: ref ? ref.split("/").slice(-1).pop() : null,
          newName: skip
            ? null
            : (isClient ? "Client" : "") + endpointName + "RequestBody",
          responses: responses.filter((e) => e),
        };
      });

    return {
      name: nameElements.join(""),
      path: pathName,
      isClient: pathName.includes("client"),
      methods: methods,
    };
  });

  const endpointsRequiredChanges = endpoints.map((endpoint) => {
    const methods = endpoint.methods.filter(
      (method) => !(!method.newName && method.responses.length === 0)
    );

    return {
      ...endpoint,
      methods,
    };
  });

  await saveToJson(endpointsRequiredChanges, "new-names.json");
  console.log("ENDPOINTS REQUIRED CHANGES SAVED IN new-names.json\n");

  const nameFromTo = transformEndpointsToNameFromTo(endpointsRequiredChanges);

  displayNameFromToNamesToChange(nameFromTo);

  createSchemas(openApi, nameFromTo);
};

main();
