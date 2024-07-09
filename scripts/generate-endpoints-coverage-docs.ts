import path from "path";
import fs from "fs/promises";
import { snakeCase } from "lodash";
import { getTakeList, rawTakeList } from "./helpers/get-take-list";

type SdkLink = {
  java?: string;
  // php?: string;
  // python?: string;
  ruby?: string;
};

type Method = {
  method: string;
  summary: string;
  tags: string[];
  isDeprecated: boolean;
  supported: {
    default: boolean;
    java: boolean;
    ruby: boolean;
  };
};

type Endpoint = {
  endpoint: string;
  methods: Method[];
};

type Collection = {
  [key: string]: Endpoint[];
};

const removeSpecialCharacters = (inputString) => {
  const regex = /[{}\/\\]/g;

  return inputString.replace(regex, "");
};

const filterApiMethodsFromEndpointElements = (elements: any): Object => {
  let allowedKeys = ["get", "post", "update", "delete", "put"];

  return Object.keys(elements)
    .filter((key) => allowedKeys.includes(key))
    .reduce((obj, key) => {
      obj[key] = elements[key];
      return obj;
    }, {});
};

const writeSupported = (method: Method, sdk?: keyof SdkLink) => {
  const generateFor = sdk || "default";
  const supported = " **Supported ✅** ";
  const notSupported = " **Not supported ❌** ";

  return method.supported[generateFor] ? supported : notSupported;
};

const generateEndpoints = (collection: Collection, sdk?: keyof SdkLink) => {
  let readmeContent = `\n# Endpoints\n`;

  Object.keys(collection).forEach((key) => {
    readmeContent += `
## ${key}`;
    collection[key].forEach((endpoint) => {
      const allMethodsDeprecated = endpoint.methods.every(
        (method) => method.isDeprecated,
      );
      if (allMethodsDeprecated) {
        readmeContent += `\n### ~~❗${endpoint.endpoint} [Deprecated]❗~~`;
      } else {
        readmeContent += `\n### ${endpoint.endpoint}`;
      }
      endpoint.methods.forEach((method) => {
        if (method.isDeprecated) {
          readmeContent += `\n#### ~~❗${method.summary} (${method.method})❗~~`;
        } else {
          readmeContent += `
#### ${method.summary} (${method.method})
${writeSupported(method, sdk)}`;
        }
      });
    });
  });

  return readmeContent;
};

const generateTableOfContents = (collection: Collection) => {
  let readmeContent = `# Table of Contents\n`;

  Object.keys(collection).forEach((key) => {
    readmeContent += `
- [${key}](#${key.toLowerCase()})`;
    collection[key].forEach((endpoint) => {
      let link = removeSpecialCharacters(endpoint.endpoint.toLowerCase());

      if (endpoint.methods[0].isDeprecated) {
        link += "-deprecated";
      }

      readmeContent += `
  - [${endpoint.endpoint}](#${link})`;
    });
  });

  return readmeContent;
};

const generateReadme = (collection: Collection) => {
  let readmeContent = `# Endpoints Coverage\n`;

  readmeContent += generateTableOfContents(collection);
  readmeContent += generateEndpoints(collection);

  const readmePath = path.join(__dirname, "../ENDPOINTS-COVERAGE.md");
  fs.writeFile(readmePath, readmeContent);

  const sdkLinks: SdkLink = {
    java: "./sdks/java",
    // php: "./sdks/php",
    // python: "./sdks/python",
    ruby: "./sdks/ruby",
  };

  Object.keys(sdkLinks).map((key: keyof SdkLink) => {
    readmeContent = `# Endpoints Coverage\n`;

    readmeContent += generateTableOfContents(collection);
    readmeContent += generateEndpoints(collection, key);

    const readmePath = path.join(`${sdkLinks[key]}/ENDPOINTS-COVERAGE.md`);
    fs.writeFile(readmePath, readmeContent);
  });
};

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
        tags: methodContent.tags,
        summary: methodContent.summary,
        isDeprecated: methodContent.summary.includes("Deprecated"),
        supported: {
          default:
            rawTakeList?.[endpoint]?.[method]?.includes("default") || false,
          java: rawTakeList?.[endpoint]?.[method]?.includes("java") || false,
          ruby: rawTakeList?.[endpoint]?.[method]?.includes("ruby") || false,
        },
      };

      endpointMethods.push(methodObj);
    });
    allEndpoints.push({ endpoint, methods: endpointMethods });
  });

  const collectionsWithEndpoints: Collection = {};

  allEndpoints.forEach((endpoint: Endpoint) => {
    const tags = endpoint.methods
      .map((method) => method.tags)
      .flat(2)
      .filter((tag) => tag !== undefined);
    collectionsWithEndpoints[tags[0]] = [
      ...(collectionsWithEndpoints[tags[0]] ?? []),
      endpoint,
    ];
  });

  generateReadme(collectionsWithEndpoints);
};

main();
