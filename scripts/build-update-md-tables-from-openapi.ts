import * as fs from "fs/promises";
import path from "path";
import "./types/globals.t";
import * as openApi from "../reference/OpenAPI.json";
import { mdTables } from "./md-tables";
import SchemaToMarkdownTable, {
  ExamplesRenderedAs,
  RenderMode,
} from "./src/schema-to-md-table";
import { EOL } from "os";
import _ from "lodash";
import { prettify } from "htmlfy";
import { sanitizeHtmlAttributes } from "./sanitize-html-attributes";

const PATH_TO_DOCS_REFERENCE = [
  __dirname,
  "../documentation/markdowns/objects",
];
const PATH_TO_GENERATED_TABLES = [__dirname, "./output"];

export const buildUpdateMdTablesFromOpenapi = async () => {
  const stm = new SchemaToMarkdownTable(
    openApi.components.schemas,
    RenderMode.List,
    ExamplesRenderedAs.PartOfDescription,
  );
  let doneSuccessfully = true;

  for (const [objectName] of mdTables) {
    try {
      const fileName = `${objectName}.md`;
      await fs.writeFile(
        path.join(...PATH_TO_GENERATED_TABLES, fileName),
        stm.render(objectName),
      );
      console.log(`Generated markdown table in ${fileName}`);
    } catch (e) {
      console.log(`Error for ${objectName}`, e);
      doneSuccessfully = false;
    }
  }

  return doneSuccessfully;
};

export const updateMdTablesInDoc = async () => {
  const { default: markdown, getCodeString } = await import(
    "@wcj/markdown-to-html"
  );

  for (const [objectName, docFile] of mdTables) {
    if (!docFile) {
      continue;
    }
    try {
      const mdPath = path.join(...PATH_TO_GENERATED_TABLES, `${objectName}.md`);
      console.log(mdPath);
      const fileContent = await fs.readFile(mdPath, "utf8");
      const fileContentAsHtml = sanitizeHtmlAttributes(
        prettify(markdown(fileContent) as string),
      );

      const newFileContent = _.compact([
        `---
title: "${docFile?.title ?? objectName}"
mode: "frame"
---`,
        '<div class="inner">',
        docFile?.htmlDescription,
        fileContentAsHtml,
        "</div>",
      ])
        .filter((e) => !!e)
        .join(`${EOL}${EOL}`);

      const docPath = path.join(...PATH_TO_DOCS_REFERENCE, `${objectName}.mdx`);
      await fs.writeFile(docPath, newFileContent);
      console.log(`Updated table in ${docFile} `);
    } catch (e) {
      console.log(`Error for ${objectName}`, e);
      throw new Error(`Error for ${objectName}`);
    }
  }
  console.log("done");
};

(async () => {
  const doneSuccessfully = await buildUpdateMdTablesFromOpenapi();

  if (!doneSuccessfully) {
    console.log("Failed to build md tables from openapi");
    throw new Error("Failed to build md tables from openapi");
  }

  await updateMdTablesInDoc();
})();
