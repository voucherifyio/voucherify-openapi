export interface OpenAPISpec {
  openapi?: string;
  info?: any;
  paths?: {
    [path: string]: {
      [method: string]: {
        requestBody?: {
          required?: boolean;
          description?: string;
          content?: any;
          [key: string]: any;
        };
        responses?: {
          [statusCode: string]: {
            required?: boolean;
            description?: string;
            content?: any;
            [key: string]: any;
          };
        };
        [key: string]: any;
      };
    };
  };
  [key: string]: any;
}

export interface RemovalStats {
  requestBodyCount: number;
  responseCount: number;
  totalOperations: number;
}

/**
 * Removes all 'required: true' fields from requestBody and responses in OpenAPI specification
 * @param spec - OpenAPI specification object
 * @returns Object with cleaned specification and statistics
 */
function removeRequiredFields(spec: OpenAPISpec): {
  spec: OpenAPISpec;
  stats: RemovalStats;
} {
  // Create a deep copy to avoid modifying the original
  const cleanedSpec = JSON.parse(JSON.stringify(spec)) as OpenAPISpec;

  const stats: RemovalStats = {
    requestBodyCount: 0,
    responseCount: 0,
    totalOperations: 0,
  };

  if (!cleanedSpec.paths) {
    return { spec: cleanedSpec, stats };
  }

  // Iterate through all paths
  for (const [pathName, pathItem] of Object.entries(cleanedSpec.paths)) {
    if (!pathItem || typeof pathItem !== "object") continue;

    // Iterate through all HTTP methods in the given path
    for (const [method, operation] of Object.entries(pathItem)) {
      if (!operation || typeof operation !== "object") continue;

      stats.totalOperations++;

      // Remove required from requestBody
      if (operation.requestBody && typeof operation.requestBody === "object") {
        if ("required" in operation.requestBody) {
          delete operation.requestBody.required;
          stats.requestBodyCount++;
        }
      }

      // Remove required from responses
      if (operation.responses && typeof operation.responses === "object") {
        for (const [statusCode, response] of Object.entries(
          operation.responses,
        )) {
          if (
            response &&
            typeof response === "object" &&
            "required" in response
          ) {
            delete response.required;
            stats.responseCount++;
          }
        }
      }
    }
  }

  return { spec: cleanedSpec, stats };
}

/**
 * Helper function to check if object is an OpenAPI specification
 * @param obj - Object to check
 * @returns boolean
 */
export function isOpenAPISpec(obj: any): obj is OpenAPISpec {
  return (
    obj &&
    typeof obj === "object" &&
    (obj.openapi || obj.swagger) &&
    obj.info &&
    typeof obj.paths === "object"
  );
}

/**
 * Function to process OpenAPI specification with validation
 * @param input - OpenAPI specification as object or JSON string
 * @returns Cleaned specification with removed required fields
 */
export function removeRequiredFromRequestsAndResponses(
  input: OpenAPISpec | string,
): {
  spec: OpenAPISpec;
  stats: RemovalStats;
} {
  let spec: OpenAPISpec;

  // If input is string, try to parse as JSON
  if (typeof input === "string") {
    try {
      spec = JSON.parse(input);
    } catch (error) {
      throw new Error("Invalid JSON format in OpenAPI specification");
    }
  } else {
    spec = input;
  }

  // Basic validation
  if (!isOpenAPISpec(spec)) {
    throw new Error("Invalid OpenAPI specification - missing required fields");
  }

  return removeRequiredFields(spec);
}
