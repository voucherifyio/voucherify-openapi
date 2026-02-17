const fs = require("fs");
const path = require("path");

// === PATH CONFIGURATION ===
// __dirname is the directory where this script resides (i.e., .../scripts)
// We go up one level (..) and then into sdks/js/src
const RELATIVE_PATH_TO_SRC = "../../../sdks/js/src";

// Build absolute paths to prevent path resolution errors
const ABSOLUTE_PATH_TO_SRC = path.resolve(__dirname, RELATIVE_PATH_TO_SRC);
const ABSOLUTE_PATH_TO_MODELS = path.join(ABSOLUTE_PATH_TO_SRC, "model");

const TARGET_EXTENSIONS = [".ts", ".js"];
// ============================

/**
 * Checks if a model file (e.g., inside sdks/js/src/model) contains an Enum definition.
 */
function isModelEnum(modelName) {
  // Construct the expected path for the model file
  const modelFilePath = path.join(ABSOLUTE_PATH_TO_MODELS, `${modelName}.js`);

  if (!fs.existsSync(modelFilePath)) {
    // If the file doesn't exist, we assume it's not an Enum (or cannot be verified)
    return false;
  }

  try {
    const content = fs.readFileSync(modelFilePath, "utf8");
    // Look for the exact JSDoc string: "* Enum class NAME"
    // We escape the asterisk as it is a special regex character
    const regex = new RegExp(`\\* Enum class ${modelName}`, "i");
    return regex.test(content);
  } catch (error) {
    return false;
  }
}

/**
 * Main function to replace module references in the file content.
 */
function replaceModules(content) {
  // Regex captures: module:model/Something OR module:api/Something
  // Group 1: 'model' or 'api'
  // Group 2: the rest of the name (allowing alphanumeric, underscores, and tildes)
  const regex = /module:(model|api)\/([a-zA-Z0-9_~]+)/g;

  return content.replace(regex, (match, type, nameRaw) => {
    // --- CASE 1: module:model ---
    if (type === "model") {
      // nameRaw is e.g., "CampaignsCreateRequestBody"

      // Check if the referenced model is actually an Enum
      if (isModelEnum(nameRaw)) {
        // Found an Enum -> replace with typeof syntax
        // console.log(`🔹 [ENUM] ${nameRaw} detected`);
        return `Exclude<keyof typeof ${nameRaw}, "prototype" | "constructFromObject">`;
      } else {
        // Regular Class -> just remove the prefix
        return nameRaw;
      }
    }

    // --- CASE 2: module:api ---
    if (type === "api") {
      // nameRaw is e.g., "CampaignsApi~createCampaignCallback"

      // Check for tilde syntax (callback references)
      if (nameRaw.includes("~")) {
        const parts = nameRaw.split("~");
        // Return only the part after the tilde
        return parts[1];
      } else {
        // No tilde -> simply remove 'module:api/' prefix
        return nameRaw;
      }
    }

    return match;
  });
}

/**
 * Recursive directory walker
 */
function walkAndProcess(dir) {
  if (!fs.existsSync(dir)) {
    console.error(`❌ Error: Target directory does not exist: ${dir}`);
    return;
  }

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip node_modules and .git directories
      if (file !== "node_modules" && file !== ".git") {
        walkAndProcess(fullPath);
      }
    } else {
      // Process only targeted file extensions
      if (TARGET_EXTENSIONS.includes(path.extname(file))) {
        processFile(fullPath);
      }
    }
  });
}

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    const originalContent = content;

    content = replaceModules(content);

    // Write only if changes were made
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, "utf8");
      // Log relative path for cleaner output
      console.log(
        `✅ Modified: ${path.relative(ABSOLUTE_PATH_TO_SRC, filePath)}`,
      );
    }
  } catch (err) {
    console.error(`❌ Error processing file ${filePath}:`, err);
  }
}

// === START ===
console.log("🚀 Starting type fix script...");
console.log(`📂 Target Directory (Source): ${ABSOLUTE_PATH_TO_SRC}`);
console.log(
  `📂 Models Directory (for verification): ${ABSOLUTE_PATH_TO_MODELS}`,
);
console.log("---");

walkAndProcess(ABSOLUTE_PATH_TO_SRC);

console.log("---");
console.log("🏁 Processing finished.");
