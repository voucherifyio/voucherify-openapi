import * as fsPromises from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import minimist from "minimist";

dotenv.config();
const { versionTag } = minimist(process.argv.slice(2));

const mainVersion = "v2018-08-01";

const listOfGuideCategories = [
  "Getting started",
  "Development",
  "Building blocks",
  "Campaigns Recipes",
  "Discounts Recipes",
  "Distributions Recipes",
  "More",
];

const listOfReferenceCategories = ["Introduction"];

const main = async () => {
  if (!versionTag) {
    console.log(
      "`version` argument was not provided :/, next time try add `-- --version=************` at the end of file execution command"
    );
    return;
  }
  const version = `${mainVersion}-${versionTag}`;
  //create fork
  try {
    const response = await fetch(
      `
https://dash.readme.com/api/v1/version`,
      {
        method: "POST",
        headers: {
          authorization: "Basic " + btoa(process.env.README_IO_AUTH + ":"),
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          is_beta: false,
          is_stable: false,
          is_hidden: true,
          is_deprecated: false,
          from: mainVersion,
          version,
        }),
      }
    );
    if (response.status !== 200) {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.log(`Error while creating fork from ${mainVersion}`, error);
    throw new Error(error);
  }
  const categoriesToDelete = await (
    await fetch(
      `https://dash.readme.com/api/v1/categories?perPage=100&page=1`,
      {
        method: "GET",
        headers: {
          "x-readme-version": version,
          authorization: "Basic " + btoa(process.env.README_IO_AUTH + ":"),
        },
      }
    )
  ).json();
  await asyncMap(categoriesToDelete, (category) =>
    deleteCategory(version, category.slug)
  );
  // console.log(await categories.json());
  // // categories.push(...responseJSON.categories);
  // // asyncMap(categories, (categoryId) => deleteCategory());
};

const deleteCategory = async (version, slug) => {
  await fetch(`https://dash.readme.com/api/v1/categories/${slug}`, {
    method: "DELETE",
    headers: {
      "x-readme-version": version,
      authorization: "Basic " + btoa(process.env.README_IO_AUTH + ":"),
      accept: "application/json",
    },
  });
};

const createCategory = async (version, title) => {
  const response = await fetch(`https://dash.readme.com/api/v1/categories`, {
    method: "POST",
    headers: {
      "x-readme-version": version,
      authorization: "Basic " + btoa(process.env.README_IO_AUTH + ":"),
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({ title }),
  });
};

const asyncMap = (arr, asyncFn) => {
  return Promise.all(arr.map(asyncFn));
};

main();
