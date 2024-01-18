import path from "path";
import fs from "fs/promises";
import {snakeCase} from "lodash";

type SdkLink = {
  java?: string;
  php?: string;
  python?: string;
  ruby?: string;
};

type Method = {
  method: string;
  requestName: string;
  requestSupported: boolean;
  requestNotApplicable: boolean;
  responseName: string;
  responseSupported: boolean;
  responseNotApplicable: boolean;
  sdkRequestLinks?: SdkLink;
  sdkResponseLinks?: SdkLink;
};

type Endpoint = {
  endpoint: string;
  methods: Method[];
};

const filterApiMethodsFromEndpointElements = (elements: any): Object => {
  let allowedKeys = ["get", "post", "update", "delete"];

  return Object.keys(elements)
    .filter((key) => allowedKeys.includes(key))
    .reduce((obj, key) => {
      obj[key] = elements[key];
      return obj;
    }, {});
};

const writeRequests = (method: Method) => {
  let result = "- **RequestSupported:** ";

  if (method.requestNotApplicable){
    result += "*Not applicable*";
  } else if (!method.requestSupported) {
    result += "❌";
  } else {
    Object.keys(method.sdkRequestLinks).map((key) => {
        result += `\n  - [${key}](${method.sdkRequestLinks[key]}) ✅`;
    })
  }

  return result;
}

const writeResponses = (method: Method) => {
  let result = "- **ResponseSupported:** ";

  if (method.responseNotApplicable){
    result += "*Not applicable*";
  } else if (!method.responseSupported) {
    result += "❌";
  } else {
    Object.keys(method.sdkResponseLinks).map((key) => {
      result += `\n  - [${key}](${method.sdkResponseLinks[key]}) ✅`;
    })
  }

  return result;
}

const generateReadme = (allEndpoints: Endpoint[]) => {
  let readmeContent = `# Endpoints Coverage`;

  allEndpoints.forEach((endpoint) => {
    readmeContent += `
## ${endpoint.endpoint}`;
    endpoint.methods.forEach((method) => {
      readmeContent += `
### ${method.method}
${writeRequests(method)}
${writeResponses(method)}`;
    });
  });

  const readmePath = path.join(__dirname, "../endpoints-coverage.md");
  fs.writeFile(readmePath, readmeContent);
}

const checkIsNewName = (name: string): boolean => {
  if (!name) {
    return true;
  }

  return !/[0-9_]/.test(name);
};

const checkAllResponsesAreCorrect = (responses: Object): boolean => {
  return Object.keys(responses).every((key) => {
    const response = responses[key];

    if (!response.content) {
      return true;
    }

    return checkIsNewName(
      responses[key].content["application/json"]?.schema?.$ref
        ?.split("/")
        .pop(),
    );
  });
};

const getAllNamesFromResponses = (responses: Object): string[] => {
  return Object.keys(responses).map((key) => {
    const response = responses[key];

    if (!response.content) {
      return null;
    }

    return responses[key].content["application/json"]?.schema?.$ref
      ?.split("/")
      .pop();
  });
};

const main = async () => {
  const openApiPath = path.join(__dirname, "../reference/OpenAPI.json");
  const openAPIContent = JSON.parse(
    (await fs.readFile(openApiPath)).toString(),
  );

  const allEndpoints: Endpoint[] = [];

  Object.entries(openAPIContent.paths).forEach(([endpoint, elements]) => {
    const endpointMethods: Method[] = [];
    const apiMethods = filterApiMethodsFromEndpointElements(elements);
    Object.entries(apiMethods).forEach(([method, methodContent]) => {
      const methodName =
        methodContent.requestBody?.content["application/json"]?.schema?.$ref
          ?.split("/")
          .pop() ?? "";

      const methodObj: Method = {
        method,
        requestName: methodName,
        requestSupported: checkIsNewName(methodName),
        requestNotApplicable: methodName === "",
        responseName: getAllNamesFromResponses(methodContent.responses)[0],
        responseNotApplicable: (getAllNamesFromResponses(methodContent.responses)[0] ?? "") === "",
        responseSupported: checkAllResponsesAreCorrect(methodContent.responses),
      };

      methodObj.sdkRequestLinks = {
        java: `./sdks/java/src/main/java/voucherify/client/model/${methodObj.requestName}.java`,
        php: `./sdks/php/src/Model/${methodObj.requestName}.php`,
        python: `./sdks/python/voucherify_client/models/${snakeCase(methodObj.requestName)}.py`,
        ruby: `./sdks/ruby/lib/VoucherifySDK/models/${snakeCase(methodObj.requestName)}.rb`,
      };

      methodObj.sdkResponseLinks = {
        java: `./sdks/java/src/main/java/voucherify/client/model/${methodObj.responseName}.java`,
        php: `./sdks/php/src/Model/${methodObj.responseName}.php`,
        python: `./sdks/python/voucherify_client/models/${snakeCase(methodObj.responseName)}.py`,
        ruby: `./sdks/ruby/lib/VoucherifySDK/models/${snakeCase(methodObj.responseName)}.rb`,
      };

      endpointMethods.push(methodObj);
    });
    allEndpoints.push({ endpoint, methods: endpointMethods });
  });

  generateReadme(allEndpoints);
};

main();
