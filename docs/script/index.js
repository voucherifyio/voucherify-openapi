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
  const docsForCategories = new Map();

  const basePath = path.join(__dirname, "..");
  const pathsToFiles = await getFiles(basePath);

  const baseOutputPath = path.join(basePath, ".bin");
  //create .bin folder
  if (!fs.existsSync(baseOutputPath)) {
    await fsPromises.mkdir(baseOutputPath);
  }

  for (const pathToFile of pathsToFiles) {
    const data = await fsPromises.readFile(pathToFile, { encoding: "utf8" });
    const fileCategorySlug = data
      .match(/categorySlug: .*/)?.[0]
      ?.split?.("categorySlug: ")?.[1];
    if (!fileCategorySlug) {
      console.log(`error, ${fileCategorySlug}, ${pathToFile}`);
      continue;
    }
    const category = categories
      .filter((c) => c.slug.includes(fileCategorySlug))
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )?.[0];
    if (!category) {
      console.log(`error, ${fileCategorySlug}, ${category}, ${pathToFile}`);
      continue;
    }

    const categorySlug = category.slug;

    //handling reference-docs aka. "parentDoc: id"
    const replaceParentDoc = { old: "", new: "" };
    const parentDocFile = data
      .match(/parentDoc: .*/)?.[0]
      ?.split?.("parentDoc: ")?.[1];
    if (parentDocFile) {
      if (!docsForCategories.get(categorySlug)) {
        docsForCategories.set(
          categorySlug,
          await getDocsForCategory(categorySlug)
        );
      }
      const docsForCategory = docsForCategories.get(categorySlug);
      const docSlug = data.match(/\nslug: .*/)?.[0]?.split?.("slug: ")?.[1];
      const allowedMissing = [
        "establish-validation-session",
        "stacking-api-overview",
        "validation-session",
      ];
      if (allowedMissing.includes(docSlug)) {
        const parentDocSlug = data
          .match(/parentDocSlug: .*/)?.[0]
          ?.split?.("parentDocSlug: ")?.[1];
        if (!parentDocSlug) {
          console.log(`error! parentDocSlug was not provided in ${pathToFile}`);
          throw new Error("Missing parentDocSlug");
        }
        const parentDoc = docsForCategory.find(
          (categoryDoc) => categoryDoc.slug === parentDocSlug
        );
        if (!parentDoc) {
          console.log(`error, ${parentDocSlug}, ${docSlug}, ${pathToFile}`);
          throw new Error("parentDoc not found");
        }
        replaceParentDoc.old = `parentDoc: ${parentDocFile}`;
        replaceParentDoc.new = `parentDoc: ${parentDoc._id}`;
      } else {
        const parentDoc = docsForCategory.find((categoryDocs) =>
          categoryDocs.children.find((doc) => doc.slug === docSlug)
        );
        if (!parentDoc?._id) {
          console.log(`error, ${parentDocFile}, ${docSlug}, ${pathToFile}`);
          console.log(JSON.stringify(docsForCategory));
          throw new Error("Missing parentDoc or parentDoc._id");
        }
        replaceParentDoc.old = `parentDoc: ${parentDocFile}`;
        replaceParentDoc.new = `parentDoc: ${parentDoc._id}`;
      }
      console.log("ok");
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
      replaceParentDoc.old && replaceParentDoc.new
        ? data
            .replace(/category: .*/, `category: ${category.id}`)
            .replace(replaceParentDoc.old, replaceParentDoc.new)
            .toString()
        : data.replace(/category: .*/, `category: ${category.id}`).toString(),
      "utf8"
    );
  }
};

const getDocsForCategory = async (slug) => {
  const options = {
    method: "GET",
    headers: {
      "x-readme-version": version,
      authorization: "Basic " + btoa(process.env.README_IO_AUTH + ":"),
    },
  };

  const response = await fetch(
    `https://dash.readme.com/api/v1/categories/${slug}/docs`,
    options
  );

  const responseJSON = await response.json();
  if (responseJSON.error) {
    console.log(response);
    throw new Error(responseJSON.error);
  }

  if (
    !Array.isArray(responseJSON) ||
    responseJSON.find((element) => !element?._id)
  ) {
    console.log(responseJSON);
    throw new Error(`Unknown response :/`);
  }
  return responseJSON;
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
