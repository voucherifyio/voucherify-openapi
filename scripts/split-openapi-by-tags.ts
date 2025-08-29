import * as fs from "fs/promises";
import * as path from "path";
import * as openApi from "../reference/OpenAPI.json";

interface OpenAPISpec {
  openapi: string;
  info: any;
  servers?: any[];
  paths: Record<string, Record<string, any>>;
  components?: {
    schemas?: Record<string, any>;
    parameters?: Record<string, any>;
    responses?: Record<string, any>;
    requestBodies?: Record<string, any>;
    headers?: Record<string, any>;
    securitySchemes?: Record<string, any>;
    examples?: Record<string, any>;
    links?: Record<string, any>;
    callbacks?: Record<string, any>;
    [key: string]: any;
  };
  [key: string]: any;
}

interface EndpointInfo {
  path: string;
  method: string;
  operationId: string;
  operation: any;
  tags: string[];
}

interface TagGroup {
  tag: string;
  endpoints: EndpointInfo[];
}

const OUTPUT_FOLDER = path.join(
  __dirname,
  "../reference/split-openapi-by-tags",
);

/**
 * Recursively finds all $ref references in an object
 * Returns a Set of full $ref strings (e.g., "#/components/schemas/MySchema")
 */
function findAllReferences(
  obj: any,
  refs: Set<string> = new Set(),
): Set<string> {
  if (obj === null || typeof obj !== "object") {
    return refs;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item) => findAllReferences(item, refs));
    return refs;
  }

  for (const [key, value] of Object.entries(obj)) {
    if (key === "$ref" && typeof value === "string") {
      refs.add(value);
    } else {
      findAllReferences(value, refs);
    }
  }

  return refs;
}

interface RefInfo {
  type: keyof NonNullable<OpenAPISpec["components"]>;
  name: string;
}

/**
 * Parses a $ref string into its component type and name.
 */
function parseRef(refString: string): RefInfo | null {
  const match = refString.match(
    /^#\/components\/(schemas|parameters|responses|requestBodies|headers|securitySchemes|examples|links|callbacks)\/(.+)$/,
  );
  if (match && match[1] && match[2]) {
    return {
      type: match[1] as keyof NonNullable<OpenAPISpec["components"]>,
      name: match[2],
    };
  }
  return null;
}

/**
 * Recursively collects all referenced components (schemas, parameters, etc.)
 * including nested references.
 */
function collectAllReferencedComponents(
  initialRefs: Set<string>,
  originalComponents: NonNullable<OpenAPISpec["components"]>,
): NonNullable<OpenAPISpec["components"]> {
  const collectedComponents: NonNullable<OpenAPISpec["components"]> = {};
  const queue = new Set<string>(initialRefs);
  const processedRefs = new Set<string>();

  for (const refString of queue) {
    if (processedRefs.has(refString)) {
      continue;
    }
    processedRefs.add(refString);

    const refInfo = parseRef(refString);

    if (!refInfo) {
      continue;
    }

    const componentType = refInfo.type;
    const componentName = refInfo.name;

    if (
      originalComponents[componentType] &&
      originalComponents[componentType][componentName]
    ) {
      if (!collectedComponents[componentType]) {
        collectedComponents[componentType] = {};
      }

      const componentObject = originalComponents[componentType][componentName];
      collectedComponents[componentType][componentName] = componentObject;

      const newRefs = findAllReferences(componentObject);
      newRefs.forEach((newRefString) => {
        if (!processedRefs.has(newRefString)) {
          queue.add(newRefString);
        }
      });
    }
  }

  return collectedComponents;
}

/**
 * Recursively transforms objects by replacing type: "null" with type: "object", nullable: true, default: null
 */
function transformNullTypes(obj: any): any {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => transformNullTypes(item));
  }

  const result: any = {};

  for (const [key, value] of Object.entries(obj)) {
    // Check if this is a type property with value "null"
    if (key === "type" && value === "null") {
      // Transform this object to have the new structure
      result.type = "object";
      result.nullable = true;
      result.default = null;
      // Skip processing the original "type": "null" property
      continue;
    }

    // Recursively process all other properties
    result[key] = transformNullTypes(value);
  }

  return result;
}

/**
 * Extracts security scheme names from endpoint security configuration
 */
function extractSecuritySchemes(operation: any): Set<string> {
  const securitySchemes = new Set<string>();

  if (operation.security && Array.isArray(operation.security)) {
    operation.security.forEach((securityReq: any) => {
      Object.keys(securityReq).forEach((schemeName) => {
        securitySchemes.add(schemeName);
      });
    });
  }

  return securitySchemes;
}

/**
 * Collects used security schemes from multiple operations
 */
function collectUsedSecuritySchemes(
  endpoints: EndpointInfo[],
  allSecuritySchemes: Record<string, any>,
): Record<string, any> {
  const usedSchemes = new Set<string>();

  // Collect all security schemes used by all endpoints for this tag
  endpoints.forEach((endpoint) => {
    const endpointSchemes = extractSecuritySchemes(endpoint.operation);
    endpointSchemes.forEach((scheme) => usedSchemes.add(scheme));
  });

  const result: Record<string, any> = {};
  usedSchemes.forEach((schemeName) => {
    if (allSecuritySchemes[schemeName]) {
      result[schemeName] = allSecuritySchemes[schemeName];
    }
  });

  return result;
}

/**
 * Extracts all endpoints from OpenAPI paths and groups them by tags
 */
function extractEndpointsByTags(
  openApiSpec: OpenAPISpec,
): Map<string, EndpointInfo[]> {
  const tagGroups = new Map<string, EndpointInfo[]>();

  for (const [pathName, pathItem] of Object.entries(openApiSpec.paths)) {
    for (const [method, operation] of Object.entries(pathItem)) {
      // Skip non-HTTP method properties
      if (
        ![
          "get",
          "post",
          "put",
          "patch",
          "delete",
          "options",
          "head",
          "trace",
        ].includes(method.toLowerCase())
      ) {
        continue;
      }

      if (operation && typeof operation === "object" && operation.operationId) {
        const endpoint: EndpointInfo = {
          path: pathName,
          method: method.toLowerCase(),
          operationId: operation.operationId,
          operation,
          tags: operation.tags || ["untagged"], // Use 'untagged' for endpoints without tags
        };

        // Add this endpoint to each of its tags
        endpoint.tags.forEach((tag) => {
          if (!tagGroups.has(tag)) {
            tagGroups.set(tag, []);
          }
          tagGroups.get(tag)!.push(endpoint);
        });
      }
    }
  }

  return tagGroups;
}

/**
 * Creates a complete OpenAPI spec for endpoints with a specific tag
 */
function createTagOpenApiSpec(
  tag: string,
  endpoints: EndpointInfo[],
  originalSpec: OpenAPISpec,
): OpenAPISpec {
  // Collect all references from all endpoints for this tag
  const allRefs = new Set<string>();
  endpoints.forEach((endpoint) => {
    const endpointRefs = findAllReferences(endpoint.operation);
    endpointRefs.forEach((ref) => allRefs.add(ref));
  });

  // Collect all referenced components
  const collectedComponents = collectAllReferencedComponents(
    allRefs,
    originalSpec.components || {},
  );

  // Collect used security schemes
  const usedSecuritySchemes = collectUsedSecuritySchemes(
    endpoints,
    originalSpec.components?.securitySchemes || {},
  );

  // Merge security schemes into collected components
  if (Object.keys(usedSecuritySchemes).length > 0) {
    if (!collectedComponents.securitySchemes) {
      collectedComponents.securitySchemes = {};
    }
    Object.assign(collectedComponents.securitySchemes, usedSecuritySchemes);
  }

  // Build paths object for this tag
  const paths: Record<string, Record<string, any>> = {};
  endpoints.forEach((endpoint) => {
    if (!paths[endpoint.path]) {
      paths[endpoint.path] = {};
    }
    paths[endpoint.path][endpoint.method] = endpoint.operation;
  });

  // Create new OpenAPI spec for this tag
  const tagSpec: OpenAPISpec = {
    openapi: originalSpec.openapi,
    info: {
      ...originalSpec.info,
      title: `${originalSpec.info.title} - ${tag}`,
      description: `${
        originalSpec.info.description || ""
      } - Endpoints tagged with '${tag}'`,
    },
    servers: originalSpec.servers,
    paths,
    components: collectedComponents,
  };

  // Delete 'components' key if it's empty
  if (Object.keys(tagSpec.components || {}).length === 0) {
    delete tagSpec.components;
  }

  return tagSpec;
}

/**
 * Sanitizes tag name for use as filename
 */
function sanitizeTagName(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-") // Replace non-alphanumeric with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Main function to split OpenAPI into tag-based files
 */
async function splitOpenApiByTags(): Promise<void> {
  try {
    const openApiSpec = openApi as OpenAPISpec;

    const oldOutputFolder = OUTPUT_FOLDER + "-to-delete";
    try {
      await fs.access(OUTPUT_FOLDER); // Check if OUTPUT_FOLDER exists
      console.log(
        `Existing output folder found at ${OUTPUT_FOLDER}. Renaming it to ${oldOutputFolder} for deletion.`,
      );
      await fs.rename(OUTPUT_FOLDER, oldOutputFolder); // Rename it
      // Start deletion in the background, no need to await
      fs.rm(oldOutputFolder, { recursive: true, force: true })
        .then(() =>
          console.log(
            `Successfully deleted old output folder: ${oldOutputFolder}`,
          ),
        )
        .catch((err) =>
          console.error(
            `Error deleting old output folder ${oldOutputFolder}:`,
            err,
          ),
        );
    } catch (error: any) {
      if (error.code === "ENOENT") {
        // Folder does not exist, which is fine, continue
        console.log(
          `Output folder not found at ${OUTPUT_FOLDER}. Proceeding with creation.`,
        );
      } else {
        // Other error, re-throw
        console.error(`Error accessing output folder ${OUTPUT_FOLDER}:`, error);
        throw error;
      }
    }

    // Create output directory
    await fs.mkdir(OUTPUT_FOLDER, { recursive: true });

    // Extract endpoints grouped by tags
    const tagGroups = extractEndpointsByTags(openApiSpec);

    console.log(`Found ${tagGroups.size} tags to process`);

    // Process each tag
    for (const [tag, endpoints] of tagGroups) {
      try {
        // Create tag-specific OpenAPI spec
        const tagSpec = transformNullTypes(
          createTagOpenApiSpec(tag, endpoints, openApiSpec),
        );

        // Generate filename based on tag name
        const sanitizedTagName = sanitizeTagName(tag);
        const filename = `${sanitizedTagName}.json`;
        const filePath = path.join(OUTPUT_FOLDER, filename);

        // Write the file
        await fs.writeFile(filePath, JSON.stringify(tagSpec, null, 2));

        console.log(
          `Created: ${filename} (${endpoints.length} endpoints for tag '${tag}')`,
        );
      } catch (error) {
        console.error(`Error processing tag ${tag}:`, error);
      }
    }

    console.log(
      `\nSuccessfully split OpenAPI into ${tagGroups.size} tag-based files`,
    );
    console.log(`Output directory: ${OUTPUT_FOLDER}`);

    // Print summary
    console.log("\nTag summary:");
    for (const [tag, endpoints] of tagGroups) {
      console.log(`  ${tag}: ${endpoints.length} endpoints`);
    }
  } catch (error) {
    console.error("Error splitting OpenAPI by tags:", error);
    throw error;
  }
}

// Execute the script
(async () => {
  try {
    await splitOpenApiByTags();
  } catch (error) {
    console.error("Script execution failed:", error);
    process.exit(1);
  }
})();
