import colors from "colors";
import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import "./build-production-openapi";

import { removeAdditionalPropertiesFromSchemas } from "./remove-additional-properties-for-some-schemas";
import { readmeReplaceTitle } from "./readme-replace-title";

const createOpenAPIVersionToUpload = async () => {
  console.log(
    colors.green("CREATING OPEN API FILE TO UPLOAD... PLEASE WAIT..."),
  );

  const openApiPath = path.join(__dirname, "../reference/OpenAPI.json");
  const openAPIContent = JSON.parse(
    (await fsPromises.readFile(openApiPath)).toString(),
  );

  const pathToTmp = path.join(__dirname, "../tmp");
  if (!fs.existsSync(pathToTmp)) {
    fs.mkdirSync(pathToTmp);
  }

  const pathToTmpReferenceToUpload = path.join(
    __dirname,
    "../tmp/referenceToUpload",
  );
  if (!fs.existsSync(pathToTmpReferenceToUpload)) {
    fs.mkdirSync(pathToTmpReferenceToUpload);
  }

  let newOpenApiFile = {
    ...openAPIContent,
    components: {
      ...openAPIContent.components,
      schemas: removeAdditionalPropertiesFromSchemas(
        openAPIContent.components.schemas,
        ["ExportsCreateRequestBody", "ExportsCreateResponseBody"],
      ),
    },
  };
  newOpenApiFile.openapi = "3.1.0";

  //replaceTitles
  newOpenApiFile = readmeReplaceTitle(newOpenApiFile);

  await fsPromises.writeFile(
    path.join(__dirname, "../tmp/referenceToUpload/OpenAPI.json"),
    JSON.stringify(newOpenApiFile, null, 2),
  );

  console.log(colors.green("ok"));
};

(async () => {
  await createOpenAPIVersionToUpload();
})();
