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

const PATH_TO_GERENATED_TABLES = [__dirname, "./output"];
const PATH_TO_DOCS_REFERENCE = [__dirname, "../docs/reference-docs"];
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
        path.join(...PATH_TO_GERENATED_TABLES, fileName),
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
  for (const [objectName, docFile] of mdTables) {
    if (!docFile) {
      continue;
    }
    try {
      const docPath = path.join(...PATH_TO_DOCS_REFERENCE, docFile);
      const fileContent = await fs.readFile(docPath);
      const fileContentBlocks = fileContent
        .toString()
        .split(/(^---$)|(^\[block\:html\]$)/m) // Split by `---` and [block:html] that surrounds the table
        .filter((e) => !!e);

      // Find block with table by part of the markdown table syntax
      const contentBlockIndexWithTableToReplace = fileContentBlocks.findIndex(
        (block) => block.indexOf("|:-----") >= 0,
      );

      if (contentBlockIndexWithTableToReplace < 0) {
        throw new Error(
          `Could not find table to replace in file ${docFile} (object: ${objectName}) `,
        );
      }

      const additionalBlockquotes =
        fileContentBlocks[contentBlockIndexWithTableToReplace].match(
          /^\>.*$/gm,
        );

      const contentBeforeTable = fileContentBlocks
        .slice(0, contentBlockIndexWithTableToReplace)
        .join("");
      const contentAfterTable = fileContentBlocks
        .slice(contentBlockIndexWithTableToReplace + 1)
        .join("");

      const newTable = (
        await fs.readFile(
          path.join(...PATH_TO_GENERATED_TABLES, `${objectName}.md`),
        )
      ).toString();
      // .replace((/^\# .*$/m), ''); // Remove first header as in readme.io it already exists

      const newFileContent = [
        contentBeforeTable,
        additionalBlockquotes?.length ? additionalBlockquotes.join(EOL) : false,
        newTable,
        contentAfterTable,
      ]
        .filter((e) => !!e)
        .join(`${EOL}${EOL}`);

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
