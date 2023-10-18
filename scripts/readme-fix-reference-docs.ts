import * as fsPromises from 'fs/promises'
import path from 'path';
import dotenv from 'dotenv'
import minimist from 'minimist';

dotenv.config();
const { version } = minimist(process.argv.slice(2));

const readmeFixReferenceDocs = async () => {
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
  const basePath = path.join(__dirname, "../docs");
  const pathsToFiles = await getFiles(basePath);

  const dataToProcess = [];
  for (const pathToFile of pathsToFiles) {
    const data = await fsPromises.readFile(pathToFile, { encoding: "utf8" });
    const slug = data.match(/slug: .*/)?.[0]?.split?.("slug: ")?.[1];
    const type = data.match(/type: .*/)?.[0]?.split?.("type: ")?.[1];
    const order = parseInt(
        data.match(/order: .*/)?.[0]?.split?.("order: ")?.[1]
    );
    if (!slug || isNaN(order)) {
      throw new Error("Invalid slug or order in " + pathToFile);
    }
    dataToProcess.push({ slug, order, pathToFile, type });
  }
  for (const chunk of chunkArray(dataToProcess, 10)) {
    await asyncMap(chunk, updateDoc);
  }
  console.log("Done!");
};

const updateDoc = async ({ slug, order, type, pathToFile }) => {
  const options = {
    method: "PUT",
    headers: {
      "x-readme-version": version,
      authorization: "Basic " + btoa(process.env.README_IO_AUTH + ":"),
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({ order, type }),
  };

  try{
    const response = await fetch(
      `https://dash.readme.com/api/v1/docs/${slug}`,
      options
    );

    const responseJSON = await response.json();

    if (responseJSON.error) {
      console.log(`Error in json response from readme for ${slug}`, { responseJSON });
      throw new Error(responseJSON.error);
    }

    if (order === responseJSON.order) {
      console.log(`Updated successfully ${pathToFile}!`);
    } else {
      console.log(`Not updated ${pathToFile}!`);
    }

    return responseJSON;
  }catch(error){
    console.log(`Error when reqesting readme for ${slug}`, error);
    throw new Error(error)
  }
};

const chunkArray = (list, chunkSize) =>
  [...Array(Math.ceil(list.length / chunkSize))].map((_) =>
    list.splice(0, chunkSize)
  );

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

const asyncMap = (arr, asyncFn) => {
  return Promise.all(arr.map(asyncFn));
};



readmeFixReferenceDocs()
