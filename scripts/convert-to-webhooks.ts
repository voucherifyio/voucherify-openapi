import fs from "fs";
import path from "path";
import minimist from "minimist";

type AnyObject = Record<string, any>;

function loadJson(filePath: string): AnyObject {
  const text = fs.readFileSync(filePath, "utf8");
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error(
      `Failed to parse JSON from ${filePath}: ${(e as Error).message}`,
    );
  }
}

function writeJson(filePath: string, data: AnyObject) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function isObject(v: any): v is AnyObject {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

// Resolve a local $ref like "#/components/responses/MyResponse"
function resolveLocalRef(doc: AnyObject, ref: string): AnyObject | undefined {
  if (!ref.startsWith("#/")) return undefined;
  const pathParts = ref.slice(2).split("/").map(decodeURIComponent);
  let node: any = doc;
  for (const part of pathParts) {
    if (!isObject(node) || !(part in node)) return undefined;
    node = node[part];
  }
  return node;
}

// Extract content object from the best-matching 2xx response (prefer 200, then 202, then any 2xx)
function extract2xxContentFromResponses(
  doc: AnyObject,
  op: AnyObject,
): AnyObject | undefined {
  const res = isObject(op.responses) ? op.responses : undefined;
  if (!res) return undefined;

  const preferred = ["200", "202"];
  const allStatus = Object.keys(res);
  const candidates = [
    ...preferred.filter((c) => c in res),
    ...allStatus.filter((s) => /^2\d\d$/.test(s) && !preferred.includes(s)),
  ];

  for (const code of candidates) {
    let respObj = res[code];
    if (!isObject(respObj)) continue;
    if (respObj.$ref && typeof respObj.$ref === "string") {
      const resolved = resolveLocalRef(doc, respObj.$ref);
      if (isObject(resolved)) respObj = resolved;
    }
    const content = isObject(respObj.content) ? respObj.content : undefined;
    if (content && Object.keys(content).length > 0) {
      return content;
    }
  }
  return undefined;
}

function convertPostPathsToWebhooks(
  doc: AnyObject,
  options: { keepPaths: boolean },
) {
  if (!isObject(doc)) {
    throw new Error("OpenAPI document must be a JSON object.");
  }

  const openapiVersion = String(doc.openapi || "");
  if (!openapiVersion.startsWith("3.1")) {
    console.warn(
      `Warning: Expected OpenAPI 3.1.x, found "${openapiVersion}". Proceeding.`,
    );
  }

  const paths: AnyObject = isObject(doc.paths) ? doc.paths : {};
  const webhooks: AnyObject = isObject(doc.webhooks) ? doc.webhooks : {};

  const pathsToRemove: string[] = [];

  for (const rawPath of Object.keys(paths)) {
    const pathItem = paths[rawPath];
    if (!isObject(pathItem)) continue;

    const postOp = pathItem.post;
    if (!isObject(postOp)) continue; // only convert POST

    const webhookName = rawPath.startsWith("/") ? rawPath.slice(1) : rawPath;

    // Build webhook operation, preserving selected metadata
    const webhookOp: AnyObject = {
      operationId: postOp.operationId,
      summary: postOp.summary,
      description: postOp.description,
      tags: Array.isArray(postOp.tags) ? postOp.tags : undefined,
      externalDocs: isObject(postOp.externalDocs)
        ? postOp.externalDocs
        : undefined,
      security: Array.isArray(postOp.security) ? postOp.security : undefined,
      callbacks: isObject(postOp.callbacks) ? postOp.callbacks : undefined,
      // Responses: acknowledge with 200 and 202
      responses: {
        "200": { description: "Webhook accepted" },
        "202": { description: "Webhook accepted" },
      },
    };

    // Derive requestBody from the original successful response payload (preferred: 200, then 202, then any 2xx)
    const contentFromResponse = extract2xxContentFromResponses(doc, postOp);
    if (contentFromResponse) {
      webhookOp.requestBody = {
        required: true,
        content: contentFromResponse,
      };
    } else if (postOp.requestBody) {
      // Fallback: preserve existing requestBody if any
      webhookOp.requestBody = postOp.requestBody;
    } else {
      // Last resort: empty optional JSON body
      webhookOp.requestBody = {
        required: false,
        content: {
          "application/json": {
            schema: {},
          },
        },
      };
    }

    // Clean up undefined fields to keep output tidy
    for (const key of Object.keys(webhookOp)) {
      if (webhookOp[key] === undefined) {
        delete webhookOp[key];
      }
    }

    webhooks[webhookName] = {
      post: webhookOp,
    };

    if (!options.keepPaths) {
      pathsToRemove.push(rawPath);
    }
  }

  if (pathsToRemove.length > 0) {
    for (const p of pathsToRemove) {
      delete paths[p];
    }
  }

  doc.paths = paths;
  doc.webhooks = webhooks;

  return doc;
}

function main() {
  const argv = minimist(process.argv.slice(2), {
    string: ["in", "out"],
    boolean: ["keep-paths", "help"],
    alias: {
      i: "in",
      o: "out",
      k: "keep-paths",
      h: "help",
    },
    default: {
      "keep-paths": false,
    },
  });

  if (argv.help || !argv.in || !argv.out) {
    console.log(`Convert POST paths to webhooks in an OpenAPI 3.1.0 JSON.

Usage:
  ts-node convert-to-webhooks.ts --in openapi.json --out openapi.webhooks.json [--keep-paths]

Options:
  --in,  -i        Input OpenAPI JSON file path
  --out, -o        Output OpenAPI JSON file path
  --keep-paths, -k Keep converted POST paths in "paths" (default: remove)
  --help, -h       Show this help
`);
    process.exit(0);
  }

  const inPath = path.resolve(String(argv.in));
  const outPath = path.resolve(String(argv.out));
  const keepPaths = Boolean(argv["keep-paths"]);

  const doc = loadJson(inPath);
  const converted = convertPostPathsToWebhooks(doc, { keepPaths });
  writeJson(outPath, converted);

  console.log(`Wrote converted OpenAPI with webhooks to: ${outPath}`);
}

if (require.main === module) {
  main();
}
