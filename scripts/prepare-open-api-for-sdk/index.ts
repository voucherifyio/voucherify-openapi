import fsPromises from "fs/promises";
import fs from "fs";
import path from "path";
import minimist from "minimist";
import colors from "colors";
import { removedDepreceatedPaths } from './removed-depreceated-paths'
import {
  parseNullsToNullableObjects,
  removeStoplightTag,
} from "./utils";
import openAPIContent from "../../reference/OpenAPI.json";
import {removedNotUsedParameters} from './removed-not-used-parameters'
import {removedNotUsedSchemas} from './removed-not-used-schemas'

const options = minimist(process.argv.slice(2));

type LanguageOptions = {
  name: string;
  removeRequiredOnNullable?: boolean;
  simplifyAllObjectsThatHaveAdditionalProperties: boolean;
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
    simplifyAllObjectsThatHaveAdditionalProperties: false, //Will keep additional properties if regular properties are not present
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
    path.join(
      __dirname,
      `../../tmp/reference/${lang}/OpenAPI.json`
    ),
    JSON.stringify(openAPI, null, 2)
  );
}


const main = async (languageOptions: LanguageOptions) => {

  removeStoplightTag(openAPIContent);
  const paths = removedDepreceatedPaths(openAPIContent.paths)
  const parameters = removedNotUsedParameters(openAPIContent.components.parameters, paths, languageOptions)
  const schemas = removedNotUsedSchemas(openAPIContent.components, paths, languageOptions)
  
  // Building all together
  const newOpenApiFile = { 
    ...openAPIContent,
    components: {
      ...openAPIContent.components, 
      schemas: parseNullsToNullableObjects(schemas),
      parameters
    },
    paths
  };``

  await savePreparedOpenApiFile(languageOptions.name, newOpenApiFile)
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
