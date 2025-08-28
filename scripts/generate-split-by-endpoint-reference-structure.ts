import * as fs from "fs";
import * as path from "path";

interface OpenAPIOperation {
  operationId?: string;
  tags?: string[];
}

interface OpenAPIPath {
  [method: string]: OpenAPIOperation;
}

interface OpenAPISpec {
  paths: {
    [path: string]: OpenAPIPath;
  };
}

interface OutputGroup {
  group: string;
  pages: string[];
}

function generateReferenceStructure(openApiFilePath: string): OutputGroup[] {
  // Read OpenAPI file
  const openApiContent = fs.readFileSync(openApiFilePath, "utf-8");
  const openApiSpec: OpenAPISpec = JSON.parse(openApiContent);

  // Map for grouping by tags
  const groupsMap = new Map<string, string[]>();

  // Iterate through all paths
  Object.entries(openApiSpec.paths).forEach(([pathUrl, pathObject]) => {
    // Iterate through all HTTP methods in the given path
    Object.entries(pathObject).forEach(([method, operation]) => {
      // Check if it's an HTTP operation (not e.g. parameters)
      const httpMethods = [
        "get",
        "post",
        "put",
        "patch",
        "delete",
        "head",
        "options",
        "trace",
      ];
      if (!httpMethods.includes(method.toLowerCase())) {
        return;
      }

      const { operationId, tags } = operation;

      if (!operationId) {
        console.warn(
          `Missing operationId for ${method.toUpperCase()} ${pathUrl}`,
        );
        return;
      }

      // If no tags, use default
      const operationTags = tags && tags.length > 0 ? tags : ["default"];

      // Create entry for each tag
      operationTags.forEach((tag) => {
        const pageEntry = `/reference/split-by-endpoint/${operationId}.json ${method.toUpperCase()} ${pathUrl}`;

        if (!groupsMap.has(tag)) {
          groupsMap.set(tag, []);
        }

        groupsMap.get(tag)!.push(pageEntry);
      });
    });
  });

  // Convert map to result structure
  const result: OutputGroup[] = Array.from(groupsMap.entries()).map(
    ([group, pages]) => ({
      group,
      pages: pages.sort(), // Optionally sort pages
    }),
  );

  // Sort groups alphabetically
  result.sort((a, b) => a.group.localeCompare(b.group));

  return result;
}

// Function to save result
function saveResult(result: OutputGroup[], outputPath: string): void {
  const jsonContent = JSON.stringify(result, null, 2);
  fs.writeFileSync(outputPath, jsonContent, "utf-8");
  console.log(`Result saved to: ${outputPath}`);
}

// Main function
function main(): void {
  // Path to OpenAPI file - adjust as needed
  const openApiFilePath = "./reference/OpenAPI.json"; // or other path to your file
  const outputPath = "./output/reference-structure.json";

  try {
    // Check if OpenAPI file exists
    if (!fs.existsSync(openApiFilePath)) {
      console.error(`OpenAPI file not found: ${openApiFilePath}`);
      process.exit(1);
    }

    // Create output directory if it doesn't exist
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generate structure
    console.log(`Processing OpenAPI file: ${openApiFilePath}`);
    const result = generateReferenceStructure(openApiFilePath);

    console.log(`Found ${result.length} group(s):`);
    result.forEach((group) => {
      console.log(`  - ${group.group}: ${group.pages.length} endpoint(s)`);
    });

    // Save result
    saveResult(result, outputPath);

    // Optionally display result in console
    console.log("\nGenerated structure:");
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error during processing:", error);
    process.exit(1);
  }
}

// Run script if called directly
if (require.main === module) {
  main();
}

export { generateReferenceStructure, saveResult };
