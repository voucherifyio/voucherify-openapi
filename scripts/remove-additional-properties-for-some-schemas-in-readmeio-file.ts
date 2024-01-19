import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import { removeAdditionalPropertiesFromSchemas } from "./remove-additional-properties-for-some-schemas";

export const main = async () => {
  const openApiPath = path.join(__dirname, "../reference/OpenAPI.json");
  const openAPIContent = JSON.parse(
    (await fsPromises.readFile(openApiPath)).toString()
  );

  const pathToTmp = path.join(__dirname, "../tmp");
  if (!fs.existsSync(pathToTmp)) {
    fs.mkdirSync(pathToTmp);
  }

  const pathToTmpReferenceToUpload = path.join(
    __dirname,
    "../tmp/referenceToUpload"
  );
  if (!fs.existsSync(pathToTmpReferenceToUpload)) {
    fs.mkdirSync(pathToTmpReferenceToUpload);
  }

  const newOpenApiFile = {
    ...openAPIContent,
    components: {
      ...openAPIContent.components,
      schemas: removeAdditionalPropertiesFromSchemas(
        openAPIContent.components.schemas,
        ["ExportsCreateRequestBody", "ExportsCreateResponseBody"]
      ),
    },
  };

  await fsPromises.writeFile(
    path.join(__dirname, "../tmp/referenceToUpload/OpenAPI.json"),
    JSON.stringify(newOpenApiFile, null, 2)
  );
  console.log("OpenAPI file for readme was generated successfully");
};

main();
