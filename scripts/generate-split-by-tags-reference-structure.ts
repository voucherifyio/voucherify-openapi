import * as fs from "fs";

interface OpenApiOperation {
  tags?: string[];
  operationId?: string;
  [key: string]: any;
}

interface OpenApiPathItem {
  get?: OpenApiOperation;
  post?: OpenApiOperation;
  put?: OpenApiOperation;
  delete?: OpenApiOperation;
  patch?: OpenApiOperation;
  head?: OpenApiOperation;
  options?: OpenApiOperation;
  trace?: OpenApiOperation;
  [key: string]: OpenApiOperation | undefined;
}

interface OpenApiDocument {
  paths?: {
    [path: string]: OpenApiPathItem;
  };
  webhooks?: {
    [webhookName: string]: OpenApiPathItem;
  };
  [key: string]: any;
}

interface OutputItem {
  group: string;
  openapi: string;
  pages: string[];
}

/**
 * Converts tag name to filename format (lowercase, spaces to hyphens)
 */
function formatTagForFilename(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, "-");
}

/**
 * Processes a collection of PathItems (paths or webhooks) and groups them by tags
 */
function processPathItems(
  items: { [name: string]: OpenApiPathItem },
  groupedByTag: Map<string, string[]>,
  prefix: string,
) {
  for (const apiPath in items) {
    const pathItem = items[apiPath];

    for (const method in pathItem) {
      const lowerCaseMethod = method.toLowerCase();
      if (
        [
          "get",
          "post",
          "put",
          "delete",
          "patch",
          "head",
          "options",
          "trace",
        ].includes(lowerCaseMethod)
      ) {
        const operation: OpenApiOperation | undefined = pathItem[method];

        if (operation && operation.tags && operation.tags.length > 0) {
          const pageEntry = `${lowerCaseMethod.toUpperCase()} ${prefix}${apiPath}`;

          operation.tags.forEach((tag) => {
            if (!groupedByTag.has(tag)) {
              groupedByTag.set(tag, []);
            }
            groupedByTag.get(tag)!.push(pageEntry);
          });
        } else {
          console.warn(
            `Warning: Skipping operation on ${prefix}${apiPath} [${method}] due to missing tags.`,
          );
        }
      }
    }
  }
}

/**
 * Generates structure grouped by tags with OpenAPI endpoints (paths + webhooks)
 */
function generateOpenApiPagesByTags(openApiFilePath: string): OutputItem[] {
  if (!fs.existsSync(openApiFilePath)) {
    throw new Error(
      `Error: OpenAPI file not found at path: ${openApiFilePath}`,
    );
  }

  const fileContent = fs.readFileSync(openApiFilePath, "utf8");
  let openApiDocument: OpenApiDocument;

  try {
    openApiDocument = JSON.parse(fileContent);
  } catch (error: any) {
    throw new Error(
      `Error: Failed to parse OpenAPI file as JSON: ${error.message}`,
    );
  }

  const groupedByTag = new Map<string, string[]>();

  if (openApiDocument.paths) {
    processPathItems(openApiDocument.paths, groupedByTag, "");
  }

  if (openApiDocument.webhooks) {
    processPathItems(openApiDocument.webhooks, groupedByTag, "");
  }

  const resultArray: OutputItem[] = [];
  for (const [tag, pages] of groupedByTag.entries()) {
    resultArray.push({
      group: tag,
      openapi: `/openapi-rename-me/${formatTagForFilename(tag)}.json`,
      pages: pages,
    });
  }

  return resultArray;
}

// Main execution block
if (require.main === module) {
  const defaultOpenApiFile = "./reference/OpenAPIWebhooks.json";
  const openApiFile = process.argv[2] || defaultOpenApiFile;

  try {
    const result = generateOpenApiPagesByTags(openApiFile);
    console.log(JSON.stringify(result, null, 2));
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
}
