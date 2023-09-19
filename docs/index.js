const fetch = require("node-fetch");
const fs = require("fs/promises");
const path = require("path");
require("dotenv").config();

const { version } = require("minimist")(process.argv.slice(2));

if (!version) {
  console.log(
    "`version` argument was not provided :/, next time try add `--version=************` at the end of file execution command"
  );
  return;
}

(async () => {
  const options = {
    method: "GET",
    headers: {
      "x-readme-version": version,
      authorization: "Basic " + btoa(process.env.README_IO_AUTH + ":"),
    },
  };

  const response = await fetch(
    "https://dash.readme.com/api/v1/categories?perPage=100",
    options
  ).then((res) => res.json());

  if (response.error) {
    console.log(response);
    return;
  }

  const categories = response;
  const pathsToFiles = [];
  const getFiles = async (path) => {
    const items = await fs.readdir(path, {
      withFileTypes: true,
    });
    for (const item of items) {
      const itemPath = path + `/${item.name}`;
      if (item.isDirectory() && !itemPath.endsWith("node_modules")) {
        await getFiles(itemPath);
        continue;
      }
      if (itemPath.endsWith(".md")) {
        pathsToFiles.push(itemPath);
      }
    }
  };

  await getFiles(__dirname);

  for (const pathToFile of pathsToFiles) {
    const data = await fs.readFile(pathToFile, { encoding: "utf8" });
    const categorySlug = data
      .match(/category\-slug: .*/)?.[0]
      ?.split?.("category-slug: ")?.[1];
    if (!categorySlug) {
      console.log(`error, ${categorySlug}, ${pathToFile}`);
      continue;
    }
    const category = categories.find((c) => c.slug === categorySlug);
    if (!category) {
      console.log(`error, ${categorySlug}, ${category}, ${pathToFile}`);
      continue;
    }
    await fs.writeFile(
      pathToFile,
      data.replace(/category: .*/, `category: ${category.id}`).toString(),
      "utf8"
    );
  }
})();
