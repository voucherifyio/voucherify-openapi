import minimist from "minimist";
import fs from "fs";
import path from "path";
import colors from "colors";

const options = minimist(process.argv.slice(2));

function searchAndReplaceInFiles(dir, extensions, searchRegex, replaceWith) {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Error ${dir}:`, err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file.name);

      if (file.isDirectory()) {
        searchAndReplaceInFiles(filePath, extensions, searchRegex, replaceWith);
      } else if (extensions.includes(path.extname(file.name))) {
        fs.readFile(filePath, "utf8", (err, data) => {
          if (err) {
            console.error(`Error ${filePath}:`, err);
            return;
          }

          if (searchRegex.test(data)) {
            const updatedData = data.replace(searchRegex, replaceWith);
            fs.writeFile(filePath, updatedData, "utf8", (err) => {
              if (err) {
                console.error(`Error ${filePath}:`, err);
              } else {
                console.log(`Updated file: ${filePath}`);
              }
            });
          }
        });
      }
    });
  });
}

const searchReplace = [
  {
    search: "POINTS_PENDING_ACTIVATION",
    replaceWith: "PENDING_POINTS_ACTIVATION",
  },
];

async function main(_path: string) {
  const startDir = path.join(__dirname, "../../sdks", _path);
  const extensions = [".ruby", ".php", ".java", ".md", ".py"];
  for (const _searchReplace of searchReplace) {
    await new Promise((r) => setTimeout(r, 1000));

    const searchRegex = new RegExp(_searchReplace.search, "g");
    const replaceWith = _searchReplace.replaceWith;

    searchAndReplaceInFiles(startDir, extensions, searchRegex, replaceWith);
  }
}

if (!("path" in options) || typeof options.path !== "string") {
  console.log(colors.red("invalid arguments, missing path parameter"));
} else {
  console.log("wait a second");
  main(options.path);
}
