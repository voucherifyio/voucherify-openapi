import * as fs from 'fs/promises'
import path from 'path';
import { EOL } from 'os';
import { mdTables } from './md-tables';

const PATH_TO_DOCS_REFERENCE = [__dirname, '../docs/reference-docs'];
const PATH_TO_GENERATED_TABLES = [__dirname, './output'];

const updateMdTablesInDoc = async () => {
    for (const [objectName, docFile] of mdTables) {
        if (!docFile) {
            continue;
        }
        try {
            const docPath = path.join(...PATH_TO_DOCS_REFERENCE, docFile);
            const fileContent = await fs.readFile(docPath)
            const fileContentBlocks = fileContent
                .toString()
                .split(/(^---$)|(^\[block\:html\]$)/m) // Split by `---` and [block:html] that surrounds the table
                .filter(e => !!e);

            // Find block with table by part of the markdown table syntax
            const contentBlockIndexWithTableToReplace = fileContentBlocks.findIndex(block => block.indexOf('|:-----') >= 0)

            if (contentBlockIndexWithTableToReplace < 0) {
                throw new Error(`Could not find table to replace in file ${docFile} (object: ${objectName}) `)
            }

            const additionalBlockquotes = fileContentBlocks[contentBlockIndexWithTableToReplace].match(/^\>.*$/gm)

            const contentBeforeTable = fileContentBlocks.slice(0, contentBlockIndexWithTableToReplace).join('')
            const contentAfterTable = fileContentBlocks.slice(contentBlockIndexWithTableToReplace + 1).join('')

            const newTable = (await fs.readFile(path.join(...PATH_TO_GENERATED_TABLES, `${objectName}.md`)))
                .toString();
                // .replace((/^\# .*$/m), ''); // Remove first header as in readme.io it already exists

            const newFileContent = [
                contentBeforeTable,
                additionalBlockquotes?.length? additionalBlockquotes.join(EOL) : false,
                newTable,
                contentAfterTable
            ].filter(e => !!e)
            .join(`${EOL}${EOL}`)

            await fs.writeFile(docPath, newFileContent)
            console.log(`Updated table in ${docFile} `)
        } catch (e) {
            console.log(`Error for ${objectName}`, e)

        }
    }
    console.log('done')
}

updateMdTablesInDoc();
