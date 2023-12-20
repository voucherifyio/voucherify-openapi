import path from "path";
import fsPromises from "fs/promises";
import _ from "lodash";
import fs from "fs";

interface Response {
    code: string;
    currentName: string;
    newName: string;
}

interface Method {
    method: string
    operationId: string;
    currentName: string;
    newName: string;
    responses: Response[];
}

interface Endpoint {
    name: string;
    path: string;
    methods: Method[];
}

const allKeyWords = [
    "get",
    "list",
    "create",
    "upsert",
    "update",
    "delete",
    "in-bulk",
    "generate-random-code",
    "enable",
    "disable",
    "validate-stacked",
    "redeem-stacked"
]

const methodToActionMap = {
    "get": "Get",
    "post": "Create",
    "put": "Update",
}

const main = async () => {
    const openApiPath = path.join(__dirname, "../reference/OpenAPI.json");

    const getOpenAPI = async () =>
        JSON.parse((await fsPromises.readFile(openApiPath)).toString());

    fix(await getOpenAPI());
};

const saveToJson = async (newOpenApiFile) => {
    const pathToTmp = path.join(__dirname, "../tmp");
    if (!fs.existsSync(pathToTmp)) {
        fs.mkdirSync(pathToTmp);
    }

    const pathToTmpReferenceToUpload = path.join(
        __dirname,
        "../tmp/script-results"
    );
    if (!fs.existsSync(pathToTmpReferenceToUpload)) {
        fs.mkdirSync(pathToTmpReferenceToUpload);
    }

    await fsPromises.writeFile(
        path.join(__dirname, "../tmp/script-results/new-names.json"),
        JSON.stringify(newOpenApiFile, null, 2)
    );
}


const createResourceName = (operatorId: string, method: string, nameElements) => {

    const result = allKeyWords.map(element => {
        let occurred = false;
        let position = -1;

        while ((position = operatorId.indexOf(element, position + 1)) !== -1) {
            occurred = true
        }

        return {element, occurred};
    })
        .filter(element => element.occurred)
        .map(element => _.camelCase(element.element))
        .map(element => _.upperFirst(element))

    if(result.length === 0){
        return nameElements.join("") + methodToActionMap[method];
    } else {
        return _.uniq([...nameElements, ...result]).join("");
    }
}

const fix = async (openApi) => {
    const paths = openApi.paths;

    const endpoints: Endpoint[] = Object.keys(paths).map((pathName) => {
        const path = paths[pathName];

        const nameElements = pathName
            .split("/")
            .slice(pathName.includes("client") ? 3 : 2)
            .filter(name => !/\{.*\}/.test(name))
            .filter(name => name !== "async")
            .filter(name => name !== "bulk")
            .map(name => _.camelCase(name))
            .map(name => _.upperFirst(name));

        const methods = Object.keys(path)
            .filter(method => method !== "parameters")
            .map(method => {
                const operatorId = path[method].operationId;

                const endpointName = createResourceName(operatorId, method, nameElements);

                const responses = Object.keys(path[method].responses ?? {})
                    .filter(code => parseInt(code) >= 200 && parseInt(code) < 300)
                    .map(code => {
                        const response = path[method].responses[code];

                        const ref = response.content?.["application/json"]?.schema?.$ref;

                        if(!ref){
                            return;
                        }

                        if(ref.includes("_") || /\{.*\}/.test(ref)){
                            return;
                        }

                        return {
                            code,
                            currentName: ref.split("/").slice(-1).pop(),
                            newName: endpointName + "ResponseBody",
                        }
                    })

                const ref = path[method].requestBody?.content["application/json"]?.schema?.$ref;

                let skip = false;

                if(ref){
                    if(ref.includes("_") || /\{.*\}/.test(ref)){
                        skip = true;
                    }
                } else {
                    skip = true;
                }

                return {
                    method,
                    operationId: path[method].operationId,
                    currentName: ref ? ref.split("/").slice(-1).pop() : null,
                    newName: skip ? null : endpointName + "RequestBody",
                    responses: responses.filter(e => e),
                }
            })

        return {
            name: nameElements.join(""),
            path: pathName,
            methods: methods.filter(e => e),
        }
    }).filter(e => e);

    const filtered = endpoints
        .map(endpoint =>
            {
                const methods = endpoint.methods
                    .filter(method => !(!method.newName && method.responses.length === 0))

                return {
                    ...endpoint,
                    methods,
                }
            }
        );

    await saveToJson(filtered);
}


main();
