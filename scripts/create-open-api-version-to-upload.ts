import colors from "colors";
import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import "./build-production-openapi";
import { removeAdditionalPropertiesFromSchemas } from "./remove-additional-properties-for-some-schemas";
import _ from "lodash";

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

  //Removing OAuth, since Readme.io does not support optional parameters
  Object.values(openAPIContent.paths).forEach((methods) => {
    Object.values(methods).forEach((method) => {
      if (method?.security) {
        method.security = [
          _.omit(method.security?.[0] || {}, "X-Voucherify-OAuth"),
        ];
      }
    });
  });

  let newOpenApiFile = {
    paths: openAPIContent.paths,
    ...openAPIContent,
    components: {
      ...openAPIContent.components,
      //Removing OAuth, since Readme.io does not support optional parameters
      securitySchemes: _.omit(openAPIContent.components.securitySchemes, [
        "X-Voucherify-OAuth",
      ]),
      schemas: removeAdditionalPropertiesFromSchemas(
        openAPIContent.components.schemas,
        ["ExportsCreateRequestBody", "ExportsCreateResponseBody"],
      ),
    },
  };
  newOpenApiFile.openapi = "3.1.0";

  await fsPromises.writeFile(
    path.join(__dirname, "../tmp/referenceToUpload/OpenAPI.json"),
    JSON.stringify(newOpenApiFile, null, 2),
  );

  console.log(colors.green("ok"));
};

(async () => {
  await createOpenAPIVersionToUpload();
})();
