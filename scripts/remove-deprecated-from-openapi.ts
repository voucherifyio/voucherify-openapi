import fsPromises from "fs/promises";
import fs from "fs";
import path from "path";

function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

const removeStoplightTag = (node: object): object => {
  delete node["x-stoplight"];
  for (const attr in node) {
    if (isObject(node[attr])) {
      removeStoplightTag(node[attr]);
    }
  }
  return node;
};

const skipList: { endpoint: string; methods: string[] | true }[] = [
  { endpoint: "/v1/locations", methods: ["get"] },
  { endpoint: "/v1/locations/{locationId}", methods: ["get"] },
  { endpoint: "/v1/async-actions/{asyncActionId}", methods: ["get"] },
  { endpoint: "/v1/async-actions", methods: ["get"] },
  { endpoint: "/v1/consents", methods: ["get"] },
  { endpoint: "/client/v1/consents#", methods: ["get"] },
  { endpoint: "/v1/vouchers/{code}", methods: ["post", "put"] },
  { endpoint: "/v1/vouchers", methods: ["post", "get"] },
  { endpoint: "/v1/promotions/{campaignId}/tiers", methods: ["post"] },
  { endpoint: "/v1/promotions/tiers/{promotionTierId}", methods: ["put"] },
  { endpoint: "/v1/campaigns", methods: ["get", "post"] },
  { endpoint: "/v1/campaigns/{campaignId}", methods: ["get", "put"] },
  { endpoint: "/v1/vouchers/import", methods: ["post"] },
  { endpoint: "/v1/vouchers/bulk/async", methods: ["post"] },
  { endpoint: "/v1/loyalties", methods: ["post", "get"] },
  { endpoint: "/v1/loyalties/{campaignId}", methods: ["get", "put"] },
  { endpoint: "/v1/campaigns/{campaignId}/import", methods: ["post"] },
  { endpoint: "/v1/campaigns/{campaignId}/vouchers", methods: ["post"] },
  { endpoint: "/v1/campaigns/{campaignId}/vouchers/{code}", methods: ["post"] },
  {
    endpoint: "/v1/loyalties/{campaignId}/rewards/{assignmentId}",
    methods: ["put"],
  },
  {
    endpoint: "/v1/loyalties/{campaignId}/rewards",
    methods: ["post", "get"],
  },
  {
    endpoint: "/v1/loyalties/{campaignId}/reward-assignments",
    methods: ["get"],
  },
  {
    endpoint: "/v1/loyalties/{campaignId}/members",
    methods: ["get", "post"],
  },
  {
    endpoint: "/v1/loyalties/members/{memberId}",
    methods: ["get"],
  },
  {
    endpoint: "/v1/rewards",
    methods: ["get", "post"],
  },
  {
    endpoint: "/v1/rewards/{rewardId}",
    methods: ["get", "put"],
  },
  {
    endpoint: "/v1/loyalties/{campaignId}/earning-rules",
    methods: ["get", "post"],
  },
  {
    endpoint: "/v1/loyalties/{campaignId}/earning-rules/{earningRuleId}",
    methods: ["put"],
  },
  {
    endpoint: "/v1/loyalties/{campaignId}/points-expiration/export",
    methods: ["post"],
  },
  {
    endpoint: "/v1/loyalties/{campaignId}/members/{memberId}",
    methods: ["get"],
  },
];

const main = async () => {
  const openApiPath = path.join(__dirname, "../reference/OpenAPI.json");
  const openAPIContent = JSON.parse(
    (await fsPromises.readFile(openApiPath)).toString()
  );
  removeStoplightTag(openAPIContent);

  // Removing deprecated paths
  const paths = {};
  const pathsKeys = Object.keys(openAPIContent.paths);
  for (const pathKey of pathsKeys) {
    const skip = skipList.find((skip) => skip.endpoint === pathKey);
    const path = {};
    const methods = Object.keys(openAPIContent.paths[pathKey]);
    for (const method of methods) {
      if (
        openAPIContent.paths[pathKey][method]?.deprecated ||
        skip?.methods === true ||
        (skip?.methods && skip.methods.includes(method))
      ) {
        continue;
      }
      path[method] = openAPIContent.paths[pathKey][method];
    }
    if (Object.keys(path).length > 0) {
      paths[pathKey] = path;
    }
  }

  const pathsStringify = JSON.stringify(paths);

  // Removing not used parameters
  const parametersNames = pathsStringify
    .match(/"#\/components\/parameters\/.*?"/g)
    .map((match) => match.replace('"#/components/parameters/', "").slice(0, -1))
    .sort();
  const parameters = {};
  for (const parameterName of parametersNames) {
    if (!openAPIContent.components.parameters?.[parameterName]) {
      console.log(`not found ${parameterName} in parameters`);
      continue;
    }
    parameters[parameterName] =
      openAPIContent.components.parameters[parameterName];
  }

  // Removing not used schemas
  const schemas = {};
  const schemasNames = pathsStringify
    .match(/"#\/components\/schemas\/.*?"/g)
    .map((match) => match.replace('"#/components/schemas/', "").slice(0, -1))
    .sort();
  for (const schemaName of schemasNames) {
    if (!openAPIContent.components.schemas?.[schemaName]) {
      console.log(`not found ${schemaName} in schemas`);
      continue;
    }
    schemas[schemaName] = openAPIContent.components.schemas[schemaName];
  }

  // Finding other schemas uses
  let lastSchemaStringify = "";
  while (true) {
    const schemaStringify = JSON.stringify(schemas);
    if (lastSchemaStringify === schemaStringify) {
      break;
    }
    lastSchemaStringify = schemaStringify;
    const schemasNames = schemaStringify
      .match(/"#\/components\/schemas\/.*?"/g)
      .map((match) => match.replace('"#/components/schemas/', "").slice(0, -1))
      .sort();
    for (const schemaName of schemasNames) {
      if (!openAPIContent.components.schemas?.[schemaName]) {
        console.log(`not found ${schemaName} in schemas`);
        continue;
      }
      schemas[schemaName] = openAPIContent.components.schemas[schemaName];
    }
  }

  // Building all together
  const newOpenApiFile = { ...openAPIContent };
  newOpenApiFile.components.parameters = parameters;
  newOpenApiFile.components.schemas = schemas;
  newOpenApiFile.paths = paths;

  //write the new OpenApiFile
  const pathToTmp = path.join(__dirname, "../tmp");
  if (!fs.existsSync(pathToTmp)) {
    fs.mkdirSync(pathToTmp);
  }
  const pathToTmpReference = path.join(__dirname, "../tmp/reference");
  if (!fs.existsSync(pathToTmpReference)) {
    fs.mkdirSync(pathToTmpReference);
  }
  await fsPromises.writeFile(
    path.join(__dirname, "../tmp/reference/OpenAPI.json"),
    JSON.stringify(newOpenApiFile, null, 2)
  );
};

main();
