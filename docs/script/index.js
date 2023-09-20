const fetch = require("node-fetch");
const fsPromises = require("fs/promises");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const { version } = require("minimist")(process.argv.slice(2));

if (!version) {
  console.log(
    "`version` argument was not provided :/, next time try add `-- --version=************` at the end of file execution command"
  );
  return;
}

if (process.env.README_IO_AUTH?.length < 10) {
  console.log("`README_IO_AUTH` was not provided in `.env` file :/");
  return;
}
const main = async () => {
  const categories = await getCategories();

  const basePath = path.join(__dirname, "..");
  const pathsToFiles = await getFiles(basePath);

  const baseOutputPath = path.join(basePath, ".bin");
  //create .bin folder
  if (!fs.existsSync(baseOutputPath)) {
    await fsPromises.mkdir(baseOutputPath);
  }

  for (const pathToFile of pathsToFiles) {
    const data = await fsPromises.readFile(pathToFile, { encoding: "utf8" });
    const categorySlug = data
      .match(/category\-slug: .*/)?.[0]
      ?.split?.("category-slug: ")?.[1];
    if (!categorySlug) {
      console.log(`error, ${categorySlug}, ${pathToFile}`);
      continue;
    }
    const category = categories
      .filter((c) => c.slug.includes(categorySlug))
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )?.[0];

    if (!category) {
      console.log(`error, ${categorySlug}, ${category}, ${pathToFile}`);
      continue;
    }

    //folders that output data will be present
    const folders = pathToFile
      .replace(basePath, "")
      .split("/")
      .filter((e) => e && !e.endsWith(".md"))
      .map((value, index, array) => {
        let temp = value;
        for (let i = 0; i < index; i++) {
          temp = array[i] + "/" + temp;
        }
        return temp;
      });

    //checking if folders exists
    for (const folder of folders) {
      if (!fs.existsSync(baseOutputPath + "/" + folder)) {
        await fsPromises.mkdir(baseOutputPath + "/" + folder);
      }
    }

    //saving to .bin folder
    await fsPromises.writeFile(
      pathToFile.replace(basePath, baseOutputPath),
      data.replace(/category: .*/, `category: ${category.id}`).toString(),
      "utf8"
    );
  }
};
const getCategories = async () => {
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
  );

  const responseJSON = await response.json();
  if (responseJSON.error) {
    console.log(response);
    throw new Error(responseJSON.error);
  }

  if (
    !Array.isArray(responseJSON) ||
    responseJSON.find((element) => !element?.id)
  ) {
    console.log(responseJSON);
    throw new Error(`Unknown response :/`);
  }
  return responseJSON;
};
const getFiles = async (path) => {
  const pathsToFiles = [];
  const items = await fsPromises.readdir(path, {
    withFileTypes: true,
  });
  for (const item of items) {
    const itemPath = path + `/${item.name}`;
    if (item.isDirectory() && !itemPath.endsWith(".bin")) {
      (await getFiles(itemPath)).forEach((value) => {
        pathsToFiles.push(value);
      });
      continue;
    }
    if (itemPath.endsWith(".md")) {
      pathsToFiles.push(itemPath);
    }
  }
  return pathsToFiles;
};

main();
