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
  paths: {
    [path: string]: OpenApiPathItem;
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
 * Generates structure grouped by tags with OpenAPI endpoints
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

  // Map to group endpoints by tags
  const groupedByTag = new Map<string, string[]>();

  if (openApiDocument.paths) {
    // Iterate through each path
    for (const apiPath in openApiDocument.paths) {
      const pathItem = openApiDocument.paths[apiPath];

      // Iterate through each HTTP method
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
            // Create page entry in format "${method} ${path}"
            const pageEntry = `${lowerCaseMethod.toUpperCase()} ${apiPath}`;

            // Add this endpoint to all tags it's associated with
            operation.tags.forEach((tag) => {
              if (!groupedByTag.has(tag)) {
                groupedByTag.set(tag, []);
              }
              groupedByTag.get(tag)!.push(pageEntry);
            });
          } else {
            console.warn(
              `Warning: Skipping operation on path '${apiPath}' method '${method}' due to missing tags.`,
            );
          }
        }
      }
    }
  }

  // Transform map into final array of objects
  const resultArray: OutputItem[] = [];
  for (const [tag, pages] of groupedByTag.entries()) {
    resultArray.push({
      group: tag,
      openapi: `/reference/split-by-tags/${formatTagForFilename(tag)}.json`,
      pages: pages,
    });
  }

  return resultArray;
}

// Main execution block
if (require.main === module) {
  const defaultOpenApiFile = "./reference/OpenAPI.json";
  const openApiFile = process.argv[2] || defaultOpenApiFile;

  try {
    const result = generateOpenApiPagesByTags(openApiFile);
    console.log(JSON.stringify(result, null, 2));
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
}
