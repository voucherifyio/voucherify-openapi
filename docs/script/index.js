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
  const basePath = path.join(__dirname, "..");
  const pathsToFiles = await getFiles(basePath);
  const dataToProcess = [];
  for (const pathToFile of pathsToFiles) {
    const data = await fsPromises.readFile(pathToFile, { encoding: "utf8" });
    const slug = data.match(/slug: .*/)?.[0]?.split?.("slug: ")?.[1];
    const order = parseInt(
      data.match(/order: .*/)?.[0]?.split?.("order: ")?.[1]
    );
    if (!slug || isNaN(order)) {
      throw new Error("Invalid slug or order in " + pathToFile);
    }
    dataToProcess.push({ slug, order, pathToFile });
  }
  for (const chunk of chunkArray(dataToProcess, 6)) {
    await asyncMap(chunk, updateDoc);
  }
  console.log("Done!");
};
const updateDoc = async ({ slug, order, pathToFile }) => {
  const options = {
    method: "PUT",
    headers: {
      "x-readme-version": version,
      authorization: "Basic " + btoa(process.env.README_IO_AUTH + ":"),
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({ order }),
  };

  const response = await fetch(
    `https://dash.readme.com/api/v1/docs/${slug}`,
    options
  );

  const responseJSON = await response.json();
  if (responseJSON.error) {
    console.log({ filePath: pathToFile, response });
    throw new Error(responseJSON.error);
  }

  if (order === responseJSON.order) {
    console.log(`Updated successfully ${pathToFile}!`);
  } else {
    console.log(`Not updated ${pathToFile}!`);
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

const asyncMap = (arr, asyncFn) => {
  return Promise.all(arr.map(asyncFn));
};

const chunkArray = (list, chunkSize) =>
  [...Array(Math.ceil(list.length / chunkSize))].map((_) =>
    list.splice(0, chunkSize)
  );

main();
