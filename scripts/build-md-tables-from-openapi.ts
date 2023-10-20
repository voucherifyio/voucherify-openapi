import * as fs from "fs/promises";
import path from "path";
import "./globals.t";
import * as openApi from "../reference/OpenAPI.json";
import { mdTables } from "./md-tables";
import SchemaToMarkdownTable, {
  RenderMode,
  ExamplesRenderedAs,
} from "./src/schema-to-md-table";

const PATH_TO_GERENATED_TABLES = [__dirname, "./output"];

export const buildMdTablesFromOpenApi = async () => {
  const stm = new SchemaToMarkdownTable(
    openApi.components.schemas,
    RenderMode.List,
    ExamplesRenderedAs.PartOfDescription
  );
  for (const [objectName] of mdTables) {
    try {
      const fileName = `${objectName}.md`;
      await fs.writeFile(
        path.join(...PATH_TO_GERENATED_TABLES, fileName),
        stm.render(objectName)
      );
      console.log(`Generated markdown table in ${fileName}`);
    } catch (e) {
      console.log(`Error for ${objectName}`, e);
    }
  }
  console.log("done");
};

buildMdTablesFromOpenApi();
