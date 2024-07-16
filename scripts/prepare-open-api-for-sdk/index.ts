import fsPromises from "fs/promises";
import fs from "fs";
import path from "path";
import minimist from "minimist";
import colors from "colors";
import { parseNullsToNullableObjects, removeStoplightTag } from "./utils";
import openAPIContent from "../../reference/OpenAPI.json";
import { removedNotUsedParameters } from "./removed-not-used-parameters";
import { removeNotUsedSchemas } from "./remove-not-used-schemas";
import { getPathsWithoutDeprecated } from "./get-paths-without-deprecated";
import { removeAllOneOfs } from "./removeOneOfs";
import { putNotObjectSchemasIntoObjectSchemas } from "./put-not-object-schemas-into-object-schemas";
import {
  removeBuggedTagsFromOpenAPIParameters,
  removeBuggedTagsFromOpenAPIPaths,
} from "./remove-bugged-tags-from-open-api";

const options = minimist(process.argv.slice(2));

type LanguageOptions = {
  name: string;
  removeRequiredOnNullable?: true; //default: false
  simplifyAllObjectsThatHaveAdditionalProperties?: true; //default: false
  okResponseMustBeOnlyOne?: true; //default: false
  mergeOneOfs?: true; //default: false
  putNotObjectSchemasIntoObjectSchemas?: true; //default: false
  removeBuggedTagsFromOpenAPIPaths?: true; //default: false
  makeEverythingNullable?: true; //default: false
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
    mergeOneOfs: true,
    okResponseMustBeOnlyOne: true,
    removeRequiredOnNullable: true,
    makeEverythingNullable: true,
    removeBuggedTagsFromOpenAPIPaths: true,
  },
  php: {
    name: "php",
    mergeOneOfs: true,
    putNotObjectSchemasIntoObjectSchemas: true,
  },
  java: {
    name: "java",
    mergeOneOfs: true,
    okResponseMustBeOnlyOne: true,
    removeRequiredOnNullable: true,
    makeEverythingNullable: true,
  },
};

const savePreparedOpenApiFile = async (lang: string, openAPI: object) => {
  const pathToReference = path.join(__dirname, "../../reference");
  if (!fs.existsSync(pathToReference)) {
    fs.mkdirSync(pathToReference);
  }
  const pathToReferenceReadonlySdks = path.join(
    __dirname,
    "../../reference/readonly-sdks",
  );
  if (!fs.existsSync(pathToReferenceReadonlySdks)) {
    fs.mkdirSync(pathToReferenceReadonlySdks);
  }
  const pathToReferenceReadonlySdksLanguage = path.join(
    __dirname,
    `../../reference/readonly-sdks/${lang}`,
  );
  if (!fs.existsSync(pathToReferenceReadonlySdksLanguage)) {
    fs.mkdirSync(pathToReferenceReadonlySdksLanguage);
  }
  await fsPromises.writeFile(
    path.join(__dirname, `../../reference/readonly-sdks/${lang}/OpenAPI.json`),
    JSON.stringify(openAPI, null, 2),
  );
};

const main = async (languageOptions: LanguageOptions) => {
  removeStoplightTag(openAPIContent);
  const { paths, newSchemas } = getPathsWithoutDeprecated(
    openAPIContent.paths,
    languageOptions.okResponseMustBeOnlyOne,
    languageOptions.name,
  );
  const parameters = removedNotUsedParameters(
    openAPIContent.components.parameters,
    paths,
    languageOptions,
  );
  let schemasWithoutNotUsed = removeNotUsedSchemas(
    openAPIContent.components,
    paths,
    languageOptions,
    newSchemas,
  );
  if (languageOptions.putNotObjectSchemasIntoObjectSchemas) {
    schemasWithoutNotUsed = putNotObjectSchemasIntoObjectSchemas(
      schemasWithoutNotUsed,
    );
  }
  const schemas = languageOptions.mergeOneOfs
    ? removeAllOneOfs(
        schemasWithoutNotUsed,
        paths,
        openAPIContent.components.parameters,
        languageOptions,
      )
    : schemasWithoutNotUsed;

  const newPaths = languageOptions.removeBuggedTagsFromOpenAPIPaths
    ? removeBuggedTagsFromOpenAPIPaths(paths)
    : paths;

  openAPIContent.components.parameters =
    languageOptions.removeBuggedTagsFromOpenAPIPaths
      ? removeBuggedTagsFromOpenAPIParameters(
          openAPIContent.components.parameters,
        )
      : openAPIContent.components.parameters;

  // Building all together
  const newOpenApiFile = {
    ...openAPIContent,
    components: {
      ...openAPIContent.components,
      schemas: parseNullsToNullableObjects(schemas),
      parameters,
    },
    paths: newPaths,
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
        supportedLanguages,
      )
        .map((language) => `"${language}"`)
        .join(", ")}`,
    ),
  );
} else {
  main(supportedLanguages[options.language]);
}
