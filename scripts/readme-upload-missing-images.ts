import * as fsPromises from "fs/promises";
import * as fs from "fs";
import path from "path";
import axios from "axios";

const readmeUploadMissingImages = async () => {
  if (process.env.README_IO_AUTH?.length < 10) {
    console.log("`README_IO_AUTH` was not provided in `.env` file :/");
    return;
  }
  const basePath = path.join(__dirname, "../docs");
  const pathsToFiles = await getFiles(basePath);
  for (const pathToFile of pathsToFiles) {
    const fileData = await fsPromises.readFile(pathToFile, {
      encoding: "utf8",
    });
    const matchIterator: any = fileData.matchAll(/\.\.\/\.\.\/assets.*/g);
    let match = matchIterator.next();
    const matches = [];
    while (match.value) {
      matches.push(match);
      match = matchIterator.next();
    }
    if (!matches.length) {
      continue;
    }
    let newFileContent = `${fileData}`;
    while (matches.length) {
      const { value } = matches.pop();
      const matchedString = value[0];
      if (matchedString.includes("-->")) {
        continue;
      }
      const matchedIndex = value.index;
      const pathToAsset = matchedString.match(/\.\.\/\.\.\/assets[^" ]+/)?.[0];
      if (!pathToAsset) {
        throw `Path to asset not found :/ problem in file: ${pathToFile}`;
      }

      const absolutePathToAsset = path.join(
        __dirname,
        "../docs",
        pathToAsset.replaceAll("../", "")
      );
      const urlToFile = await uploadImageToReadme(absolutePathToAsset);
      console.log(`Image uploaded, doc file: ${pathToFile}`);
      const textToReplaceWithMatchedString = matchedString.replace(
        pathToAsset,
        urlToFile
      );
      newFileContent =
        newFileContent.slice(0, matchedIndex) +
        textToReplaceWithMatchedString +
        newFileContent.slice(matchedIndex + matchedString.length);
    }
    if (newFileContent === fileData) {
      continue;
    }
    await fsPromises.writeFile(pathToFile, newFileContent);
  }
  console.log("Done!");
};

const FormData = require("form-data");
const uploadImageToReadme = async (pathToFile) => {
  const fileStream = fs.createReadStream(pathToFile);
  const form = new FormData();
  // Pass file stream directly to form
  form.append("file", fileStream);
  const response = await axios.post(
    "https://dash.readme.com/api/images/image-upload",
    form,
    {
      headers: {
        authorization: "Basic " + btoa(process.env.README_IO_AUTH + ":"),
      },
    }
  );
  if (response.status !== 200 || !response?.data?.[0]) {
    throw response;
  }
  return response.data[0];
};
const getFiles = async (path: string) => {
  const pathsToFiles: string[] = [];
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

readmeUploadMissingImages();
