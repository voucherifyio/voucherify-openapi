import * as fs from "fs";
import * as path from "path";

const modelDir = path.join(
  __dirname,
  "../../../sdks/dotnet/src/Voucherify/Model",
);

// Read all .cs files from the Model directory
const files = fs
  .readdirSync(modelDir)
  .filter((file) => file.endsWith(".cs"))
  .map((file) => path.join(modelDir, file));

let filesFixed = 0;

files.forEach((file) => {
  let content = fs.readFileSync(file, "utf8");

  // Check if file contains OpenAPIDateConverter import but not Voucherify.Client
  if (
    content.includes(
      "using OpenAPIDateConverter = Voucherify.Client.OpenAPIDateConverter;",
    ) &&
    !content.includes("using Voucherify.Client;")
  ) {
    // Add Voucherify.Client import after OpenAPIDateConverter line
    content = content.replace(
      "using OpenAPIDateConverter = Voucherify.Client.OpenAPIDateConverter;",
      "using OpenAPIDateConverter = Voucherify.Client.OpenAPIDateConverter;\nusing Voucherify.Client;",
    );

    fs.writeFileSync(file, content);
    console.log(`Fixed imports in: ${path.basename(file)}`);
    filesFixed++;
  }
});

console.log(`\nTotal files fixed: ${filesFixed}`);
