import path from "path";
import fs from "fs/promises";
import { rawTakeList } from "./helpers/get-take-list";
import minimist from "minimist";
const options = minimist(process.argv.slice(2));
const generateForOptions: GenerateForOption[] = [
  "java",
  "ruby",
  "default",
  "php",
  "python",
  "dotnet",
];
type GenerateForOption =
  | "java"
  | "ruby"
  | "default"
  | "php"
  | "python"
  | "dotnet";
const generateFor =
  generateForOptions.includes(options.generateFor) && options.generateFor;
import colors from "colors";

type SdkLink = {
  java?: string;
  php?: string;
  python?: string;
  ruby?: string;
  dotnet?: string;
};

type Method = {
  method: string;
  summary: string;
  tags: string[];
  isDeprecated: boolean;
  supported: {
    default?: boolean;
    java?: boolean;
    ruby?: boolean;
    php?: boolean;
    python?: boolean;
    dotnet?: boolean;
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

  return inputString.replace(regex, "").replaceAll(" ", "");
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

const writeSupported = (
  method: Method,
  sdk: "java" | "ruby" | "default" = "default",
) => {
  const generateFor = sdk || "default";
  const supported = " **Supported ✅** ";
  const notSupported = " **Not supported ❌** ";

  return method.supported[generateFor] ? supported : notSupported;
};

const generateEndpoints = async (
  collection: Collection,
  sdk?: GenerateForOption,
) => {
  const { markdownTable } = await import("markdown-table");
  let readmeContent = `\n# Endpoints\n`;

  Object.keys(collection).forEach((key) => {
    readmeContent += `
## ${key}`;
    const mdTable = [
      ["endpoint", "method", "summary", "is supported", "is deprecated"],
    ];
    collection[key].forEach(({ endpoint, methods }) => {
      methods.forEach((methodData) => {
        const method = methodData.method;
        const summary = methodData.summary;
        const supported = sdk ? methodData.supported[sdk] || false : false;
        const isDeprecated = methodData.isDeprecated || false;
        mdTable.push([
          endpoint,
          method,
          summary,
          (supported && `<font color='green'>supported</font>`) || ``,
          (isDeprecated && ` <font color='red'>deprecated</font>`) || ``,
        ]);
      });
    });
    readmeContent += `
${markdownTable(mdTable)}`;
  });

  return readmeContent;
};

const generateTableOfContents = (collection: Collection) => {
  let readmeContent = `
## Table of Content\n`;

  Object.keys(collection).forEach((key) => {
    readmeContent += `
- [${key}](#${key.toLowerCase().replace(" ", "-")})`;
  });

  return readmeContent;
};

const generateReadme = async (
  collection: Collection,
  generateFor: GenerateForOption,
) => {
  let readmeContent = `# Endpoints Coverage\n`;

  readmeContent += generateTableOfContents(collection);
  readmeContent += await generateEndpoints(collection, generateFor);

  const readmePath =
    generateFor === "default"
      ? path.join(__dirname, "../production/ENDPOINTS-COVERAGE.md")
      : path.join(`./sdks/${generateFor}/ENDPOINTS-COVERAGE.md`);
  fs.writeFile(readmePath, readmeContent)
    .then((data) => {
      console.log(
        colors.green(`ENDPOINTS-COVERAGE.md generated for ${generateFor}`),
      );
    })
    .catch((err) => {
      console.log(colors.red(err.message));
      console.log(err);
    });
};

const main = async (generateFor: GenerateForOption) => {
  const openApiPath = path.join(__dirname, "../reference/OpenAPI.json");
  const openAPIContent = JSON.parse(
    (await fs.readFile(openApiPath)).toString(),
  );

  const allEndpoints: Endpoint[] = [];

  Object.entries(openAPIContent.paths).forEach(([endpoint, elements]) => {
    const endpointMethods: Method[] = [];
    const apiMethods = filterApiMethodsFromEndpointElements(elements);
    Object.entries(apiMethods).forEach(([method, methodContent]) => {
      const supported =
        rawTakeList?.[endpoint]?.[method] === true
          ? true
          : rawTakeList?.[endpoint]?.[method]?.includes?.(generateFor) || false;
      const methodObj: Method = {
        method,
        tags: methodContent.tags,
        summary: methodContent.summary,
        isDeprecated:
          methodContent.summary.toLowerCase().includes("deprecated") || false,
        supported: {
          [generateFor]: supported,
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

  await generateReadme(collectionsWithEndpoints, generateFor);
};

if (!generateFor) {
  console.log(
    colors.red(
      `Provided argument \`generateFor\` is missing or not valid. Must be one of ${generateForOptions.join(
        ", ",
      )}`,
    ),
  );
} else {
  main(generateFor);
}
