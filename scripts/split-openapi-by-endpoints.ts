import * as fs from "fs/promises";
import * as path from "path";
import * as openApi from "../reference/OpenAPI.json"; // Assuming OpenAPI.json is in a 'reference' directory relative to the script

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
    [key: string]: any; // Allow other component types
  };
  [key: string]: any;
}

interface EndpointInfo {
  path: string;
  method: string;
  operationId: string;
  operation: any;
}

const OUTPUT_FOLDER = path.join(__dirname, "../reference/split-by-endpoints");

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
      refs.add(value); // Add the full ref string
    } else {
      findAllReferences(value, refs); // Recurse into nested objects
    }
  }

  return refs;
}

interface RefInfo {
  type: keyof NonNullable<OpenAPISpec["components"]>; // e.g., 'schemas', 'parameters', 'responses'
  name: string; // e.g., 'PublicationsCreateResponseBody', 'ParameterIds'
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
  originalComponents: NonNullable<OpenAPISpec["components"]>, // Ensure it's not null/undefined
): NonNullable<OpenAPISpec["components"]> {
  const collectedComponents: NonNullable<OpenAPISpec["components"]> = {};
  const queue = new Set<string>(initialRefs); // Refs to process

  // Use a Set to keep track of processed refs to avoid infinite loops and redundant work
  const processedRefs = new Set<string>();

  for (const refString of queue) {
    if (processedRefs.has(refString)) {
      continue; // Already processed this ref
    }
    processedRefs.add(refString);

    const refInfo = parseRef(refString);

    if (!refInfo) {
      continue; // Not a recognized component reference
    }

    const componentType = refInfo.type;
    const componentName = refInfo.name;

    // Check if the component exists in the original spec
    if (
      originalComponents[componentType] &&
      originalComponents[componentType][componentName]
    ) {
      // Initialize the component type in collectedComponents if it doesn't exist
      if (!collectedComponents[componentType]) {
        collectedComponents[componentType] = {};
      }

      const componentObject = originalComponents[componentType][componentName];
      collectedComponents[componentType][componentName] = componentObject;

      // Find new references within this component and add them to the queue
      const newRefs = findAllReferences(componentObject);
      newRefs.forEach((newRefString) => {
        if (!processedRefs.has(newRefString)) {
          // Only add if not already processed or in queue
          queue.add(newRefString);
        }
      });
    }
  }

  return collectedComponents;
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
 * Collects used security schemes from operation
 */
function collectUsedSecuritySchemes(
  operation: any,
  allSecuritySchemes: Record<string, any>,
): Record<string, any> {
  const usedSchemes = extractSecuritySchemes(operation);
  const result: Record<string, any> = {};

  usedSchemes.forEach((schemeName) => {
    if (allSecuritySchemes[schemeName]) {
      result[schemeName] = allSecuritySchemes[schemeName];
    }
  });

  return result;
}

/**
 * Extracts all endpoints from OpenAPI paths
 */
function extractEndpoints(openApiSpec: OpenAPISpec): EndpointInfo[] {
  const endpoints: EndpointInfo[] = [];

  for (const [pathName, pathItem] of Object.entries(openApiSpec.paths)) {
    for (const [method, operation] of Object.entries(pathItem)) {
      // Skip non-HTTP method properties like parameters, $ref, etc.
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
        endpoints.push({
          path: pathName,
          method: method.toLowerCase(),
          operationId: operation.operationId,
          operation,
        });
      }
    }
  }

  return endpoints;
}

/**
 * Creates a complete OpenAPI spec for a single endpoint
 */
function createEndpointOpenApiSpec(
  endpoint: EndpointInfo,
  originalSpec: OpenAPISpec,
): OpenAPISpec {
  // Find all references used by this endpoint operation itself (including parameters, requestBody, responses, etc.)
  const initialOperationRefs = findAllReferences(endpoint.operation);

  // Collect all necessary components based on initial refs and their nested dependencies
  const collectedComponents = collectAllReferencedComponents(
    initialOperationRefs,
    originalSpec.components || {},
  );

  // Collect used security schemes (handled separately as they are referenced by name in 'security' property, not $ref)
  const usedSecuritySchemes = collectUsedSecuritySchemes(
    endpoint.operation,
    originalSpec.components?.securitySchemes || {},
  );

  // Merge collected security schemes into the overall collected components
  if (Object.keys(usedSecuritySchemes).length > 0) {
    if (!collectedComponents.securitySchemes) {
      collectedComponents.securitySchemes = {};
    }
    Object.assign(collectedComponents.securitySchemes, usedSecuritySchemes);
  }

  // Create new OpenAPI spec for this endpoint
  const endpointSpec: OpenAPISpec = {
    openapi: originalSpec.openapi,
    info: originalSpec.info,
    servers: originalSpec.servers,
    paths: {
      [endpoint.path]: {
        [endpoint.method]: endpoint.operation,
      },
    },
    components: collectedComponents, // Use the fully collected components
  };

  // Delete 'components' key if it's empty after collecting everything
  if (
    Object.keys(endpointSpec.components || {}).length === 0 ||
    (Object.keys(endpointSpec.components || {}).length === 1 &&
      !endpointSpec.components?.schemas &&
      !endpointSpec.components?.securitySchemes &&
      Object.keys(
        endpointSpec.components![Object.keys(endpointSpec.components!)[0]],
      ).length === 0)
  ) {
    delete endpointSpec.components;
  }

  return endpointSpec;
}

/**
 * Main function to split OpenAPI into individual endpoint files
 */
async function splitOpenApiByEndpoints(): Promise<void> {
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

    // Extract all endpoints
    const endpoints = extractEndpoints(openApiSpec);

    console.log(`Found ${endpoints.length} endpoints to process`);

    // Process each endpoint
    for (const endpoint of endpoints) {
      try {
        // Create endpoint-specific OpenAPI spec
        const endpointSpec = createEndpointOpenApiSpec(endpoint, openApiSpec);

        // Generate filename based on operationId
        const filename = `${endpoint.operationId}.json`;
        const filePath = path.join(OUTPUT_FOLDER, filename);

        // Write the file
        await fs.writeFile(filePath, JSON.stringify(endpointSpec, null, 2));

        console.log(
          `Created: ${filename} (${endpoint.method.toUpperCase()} ${
            endpoint.path
          })`,
        );
      } catch (error) {
        console.error(
          `Error processing endpoint ${endpoint.operationId}:`,
          error,
        );
      }
    }

    console.log(
      `\nSuccessfully split OpenAPI into ${endpoints.length} endpoint files`,
    );
    console.log(`Output directory: ${OUTPUT_FOLDER}`);
  } catch (error) {
    console.error("Error splitting OpenAPI:", error);
    throw error;
  }
}

// Execute the script
(async () => {
  try {
    await splitOpenApiByEndpoints();
  } catch (error) {
    console.error("Script execution failed:", error);
    process.exit(1);
  }
})();
