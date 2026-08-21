import fs from "fs/promises";
import path from "path";
import minimist from "minimist";
import { mergeLoyaltiesV2IntoReference } from "./merge-loyalties-v2-into-reference";
import { OpenAPISpec } from "./utils/openapi-component-collector";

const REFERENCE_OPENAPI_PATH = path.join(
  __dirname,
  "../../reference/OpenAPI.json",
);
const DEFAULT_LOYALTIES_V2_SOURCE_PATH = path.join(
  __dirname,
  "../../documentation/openapi/loyalties-v2.json",
);

export async function mergeLoyaltiesV2SourceIntoReference(
  referencePath = REFERENCE_OPENAPI_PATH,
  loyaltiesV2Path = DEFAULT_LOYALTIES_V2_SOURCE_PATH,
): Promise<OpenAPISpec> {
  const referenceSpec = JSON.parse(
    await fs.readFile(referencePath, "utf8"),
  ) as OpenAPISpec;
  const loyaltiesV2Spec = JSON.parse(
    await fs.readFile(loyaltiesV2Path, "utf8"),
  ) as OpenAPISpec;

  const merged = mergeLoyaltiesV2IntoReference(referenceSpec, loyaltiesV2Spec);
  await fs.writeFile(referencePath, `${JSON.stringify(merged, null, 2)}\n`);
  return merged;
}

if (require.main === module) {
  const options = minimist(process.argv.slice(2));
  const sourcePath = options.source
    ? path.resolve(process.cwd(), options.source)
    : DEFAULT_LOYALTIES_V2_SOURCE_PATH;

  mergeLoyaltiesV2SourceIntoReference(REFERENCE_OPENAPI_PATH, sourcePath)
    .then((spec) => {
      const pathCount = Object.keys(spec.paths ?? {}).filter((p) =>
        p.startsWith("/v2/loyalties"),
      ).length;
      console.log(
        `Merged loyalty v2 from ${sourcePath} into ${REFERENCE_OPENAPI_PATH} (${pathCount} v2 paths).`,
      );
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
