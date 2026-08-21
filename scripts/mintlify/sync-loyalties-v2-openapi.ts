import fs from "fs/promises";
import path from "path";
import { extractLoyaltiesV2OpenApi } from "./extract-loyalties-v2-openapi";
import { OpenAPISpec } from "./utils/openapi-component-collector";

const REFERENCE_OPENAPI_PATH = path.join(
  __dirname,
  "../../reference/OpenAPI.json",
);
const OUTPUT_PATH = path.join(
  __dirname,
  "../../documentation/openapi/loyalties-v2.json",
);

export async function syncLoyaltiesV2OpenApiFromReference(
  referencePath = REFERENCE_OPENAPI_PATH,
  outputPath = OUTPUT_PATH,
): Promise<OpenAPISpec> {
  const referenceContent = JSON.parse(
    await fs.readFile(referencePath, "utf8"),
  ) as OpenAPISpec;

  const extracted = extractLoyaltiesV2OpenApi(referenceContent);
  await fs.writeFile(outputPath, `${JSON.stringify(extracted, null, 2)}\n`);
  return extracted;
}

if (require.main === module) {
  syncLoyaltiesV2OpenApiFromReference()
    .then((spec) => {
      const pathCount = Object.keys(spec.paths ?? {}).length;
      const schemaCount = Object.keys(spec.components?.schemas ?? {}).length;
      console.log(
        `Wrote ${OUTPUT_PATH} (${pathCount} paths, ${schemaCount} schemas).`,
      );
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
