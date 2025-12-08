/**
 * Helper script to clean up generated OpenAPI models.
 * It removes "| undefined" from JSDoc @type definitions for properties
 * listed in the Class.RequiredProperties array.
 * * Location: /scripts/fix-types.js
 * Target:   /sdks/js/src/model/*.js
 */

const fs = require('fs');
const path = require('path');

// Configuration: Path to the model directory
// We use '..' to go up from 'scripts/' to the project root, then down to the target folder.
const MODELS_DIR = path.join(__dirname, '..', 'sdks', 'js', 'src', 'model');

/**
 * Main function to process files
 */
function processFiles() {
    console.log(`Target directory: ${MODELS_DIR}`);

    // Check if directory exists
    if (!fs.existsSync(MODELS_DIR)) {
        console.error(`Error: Directory ${MODELS_DIR} not found.`);
        return;
    }

    // Read all files in the directory
    const files = fs.readdirSync(MODELS_DIR);

    files.forEach(file => {
        // Process only .js files
        if (path.extname(file) === '.js') {
            updateFile(path.join(MODELS_DIR, file));
        }
    });
}

/**
 * Analyzes and updates a single file
 * @param {string} filePath
 */
function updateFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let isModified = false;

    // Regex to find the class name and the RequiredProperties array
    const requiredPropsRegex = /(\w+)\.RequiredProperties\s*=\s*\[([\s\S]*?)\];/;
    const match = content.match(requiredPropsRegex);

    if (!match) {
        return;
    }

    const className = match[1];
    const rawArrayContent = match[2];

    // Extract property names from the string array
    const requiredProperties = [];
    const propNameRegex = /["'](\w+)["']/g;
    let propMatch;

    while ((propMatch = propNameRegex.exec(rawArrayContent)) !== null) {
        requiredProperties.push(propMatch[1]);
    }

    // Iterate over each required property
    requiredProperties.forEach(prop => {

        /**
         * UPDATED REGEX EXPLANATION:
         * 1. (@type\s*\{[^}]*?)         -> Matches start of type definition until closing brace (excluding brace)
         * 2. (\s*\|\s*undefined)        -> Matches the "| undefined" part we want to remove
         * 3. (?=\}[^;]*? ... )          -> Positive Lookahead:
         * - \}                     -> Must encounter closing brace immediately
         * - [^;]*?                 -> CRITICAL: Match anything BUT a semicolon.
         * This prevents jumping over previous property assignments.
         * - ${className}...['${prop}'] -> Must reach the specific property assignment.
         */
        const targetRegex = new RegExp(
            `(@type\\s*\\{[^}]*?)` +
            `(\\s*\\|\\s*undefined)` +
            `(?=\\}[^;]*?${className}\\.prototype\\['${prop}'\\])`,
            'g'
        );

        if (targetRegex.test(content)) {
            content = content.replace(targetRegex, '$1');
            isModified = true;
            console.log(`[MODIFIED] ${path.basename(filePath)} -> Fixed type for required property: '${prop}'`);
        }
    });

    if (isModified) {
        fs.writeFileSync(filePath, content, 'utf8');
    }
}

processFiles();
