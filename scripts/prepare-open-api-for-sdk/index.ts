import fsPromises from "fs/promises";
import fs from "fs";
import path from "path";
import minimist from "minimist";
import colors from "colors";
import { removeNotYetRefactoredPaths } from "./remove-not-yet-refactored-paths";
import { parseNullsToNullableObjects, removeStoplightTag } from "./utils";
import openAPIContent from "../../reference/OpenAPI.json";
import { removedNotUsedParameters } from "./removed-not-used-parameters";
import { removeNotUsedSchemas } from "./remove-not-used-schemas";
import { getPathsWithoutDeprecated } from "./get-paths-without-deprecated";
import { removeAllOneOfs } from "./removeOneOfs";
import { putNotObjectSchemasIntoObjectSchemas } from "./put-not-object-schemas-into-object-schemas";

const options = minimist(process.argv.slice(2));

type LanguageOptions = {
  name: string;
  removeRequiredOnNullable?: true; //default: false
  simplifyAllObjectsThatHaveAdditionalProperties?: true; //default: false
  okResponseMustBeOnlyOne?: true; //default: false
  mergeOneOfs?: true; //default: false
  putNotObjectSchemasIntoObjectSchemas?: true; //default: false
};

const supportedLanguages: {
  [language: string]: LanguageOptions;
} = {
  python: {
    name: "python",
    removeRequiredOnNullable: true,
    simplifyAllObjectsThatHaveAdditionalProperties: true,
  },
  ruby: {
    name: "ruby",
  },
  php: {
    name: "php",
    mergeOneOfs: true,
    putNotObjectSchemasIntoObjectSchemas: true,
  },
  java: {
    name: "java",
    okResponseMustBeOnlyOne: true,
    removeRequiredOnNullable: true,
  },
};

const savePreparedOpenApiFile = async (lang: string, openAPI: object) => {
  const pathToTmp = path.join(__dirname, "../../tmp");
  if (!fs.existsSync(pathToTmp)) {
    fs.mkdirSync(pathToTmp);
  }
  const pathToTmpReference = path.join(__dirname, "../../tmp/reference");
  if (!fs.existsSync(pathToTmpReference)) {
    fs.mkdirSync(pathToTmpReference);
  }
  const pathToTmpReferenceLanguage = path.join(
    __dirname,
    `../../tmp/reference/${lang}`
  );
  if (!fs.existsSync(pathToTmpReferenceLanguage)) {
    fs.mkdirSync(pathToTmpReferenceLanguage);
  }
  await fsPromises.writeFile(
    path.join(__dirname, `../../tmp/reference/${lang}/OpenAPI.json`),
    JSON.stringify(openAPI, null, 2)
  );
};

const main = async (languageOptions: LanguageOptions) => {
  removeStoplightTag(openAPIContent);
  const { paths, newSchemas } = getPathsWithoutDeprecated(
    removeNotYetRefactoredPaths(openAPIContent.paths),
    languageOptions.okResponseMustBeOnlyOne
  );
  const parameters = removedNotUsedParameters(
    openAPIContent.components.parameters,
    paths,
    languageOptions
  );
  let schemasWithoutNotUsed = removeNotUsedSchemas(
    openAPIContent.components,
    paths,
    languageOptions,
    newSchemas
  );
  if (languageOptions.putNotObjectSchemasIntoObjectSchemas) {
    schemasWithoutNotUsed = putNotObjectSchemasIntoObjectSchemas(
      schemasWithoutNotUsed
    );
  }
  const schemas = languageOptions.mergeOneOfs
    ? removeAllOneOfs(
        schemasWithoutNotUsed,
        paths,
        openAPIContent.components.parameters,
        languageOptions
      )
    : schemasWithoutNotUsed;

  // Building all together
  const newOpenApiFile = {
    ...openAPIContent,
    components: {
      ...openAPIContent.components,
      schemas: parseNullsToNullableObjects(schemas),
      parameters,
    },
    paths,
  };

  await savePreparedOpenApiFile(languageOptions.name, newOpenApiFile);
};

if (!("language" in options)) {
  console.log(colors.red("invalid arguments, missing language parameter"));
} else if (
  typeof options.language !== "string" ||
  !Object.keys(supportedLanguages).includes(options.language)
) {
  console.log(
    colors.red(
      `invalid language arguments, supported languages are ${Object.keys(
        supportedLanguages
      )
        .map((language) => `"${language}"`)
        .join(", ")}`
    )
  );
} else {
  main(supportedLanguages[options.language]);
}
