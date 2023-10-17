import dotenv from "dotenv";
import minimist from "minimist";
import colors from "colors";

dotenv.config();
const options = minimist(process.argv.slice(2));
const versionTag = options.versionTag || options.vt;
const versionOption = options.version || options.v;

const cleanOnly = options.cleanOnly || options.co;
const help = options.help || options.h;

const mainVersion = "v2018-08-01";
const version =
  versionOption || versionTag ? `${mainVersion}-${versionTag}` : undefined;

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
  if (help) {
    console.log(
      colors.green(
        `options:` +
          `\n"versionTag" or "vt" for versionTag, for example "npm run manage-project -- --vt=piotr-1234"` +
          `\n"version" or "v" for version, for example "npm run manage-project -- --v=v2018-08-01-piotr-1234"` +
          `\n"cleanOnly" or "co" for version, for example "npm run manage-project -- --vt=piotr-1234" --co` +
          `\n\nuse "versionTag" or "version" for version, not both!`
      )
    );
    return;
  }
  if (!version) {
    console.log(
      colors.red(
        "invalid arguments, check `help` for more information\nrun 'npm run manage-project -- --help'"
      )
    );
    return;
  }
  if (!cleanOnly) {
    await createNewVersion(version);
  }
  await cleanProject(version);
  console.log(colors.green(`\nVisit: https://docs.voucherify.io/${version}/`));
};

const createNewVersion = async (version) => {
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
      throw new Error(
        `Response status: ${response.status}, maybe this versionTag is already used?`
      );
    }
    console.log(colors.green(`FORK CREATED! VERSION "${version}"`));
  } catch (error) {
    console.log(colors.red(`Error while creating fork from ${mainVersion}!`)),
      error;
    throw new Error(error);
  }
};

const cleanProject = async (version) => {
  const categoriesToDelete = await getAllCategories(version);
  //delete all categories
  await asyncMap(
    categoriesToDelete,
    async (category) => await deleteCategory(version, category.slug)
  );
  console.log(colors.green(`OLD CATEGORIES DELETED!`));
  //create categories
  await asyncMap(
    [...listOfGuideCategories, ...listOfReferenceCategories],
    async (title) => await createCategory(version, title)
  );
  console.log(colors.green(`NEW CATEGORIES CREATED!`));
  const allCategories = await getAllCategories(version);
  //update reference categories types
  await asyncMap(
    listOfReferenceCategories,
    async (categoryTitle) =>
      await updateCategory(
        version,
        allCategories.find((category) => category.title === categoryTitle).slug,
        { type: "reference" }
      )
  );
  console.log(colors.green(`REFERENCE CATEGORIES UPDATED!`));
  const allApiSpecifications = await getAllApiSpecifications(version);
  await asyncMap(allApiSpecifications, deleteSpecification);
  console.log(colors.green(`API SPECIFICATIONS DELETED!`));
  console.log(colors.green(`VERSION "${version}" IS CLEANED UP!`));
};

const updateCategory = async (version, slug, data = {}) => {
  await fetch(`https://dash.readme.com/api/v1/categories/${slug}`, {
    method: "PUT",
    headers: {
      "x-readme-version": version,
      authorization: "Basic " + btoa(process.env.README_IO_AUTH + ":"),
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(data),
  });
};

const getAllCategories = async (version) =>
  await (
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
  await fetch(`https://dash.readme.com/api/v1/categories`, {
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

const getAllApiSpecifications = async (version) =>
  await (
    await fetch(
      `https://dash.readme.com/api/v1/api-specification?perPage=100&page=1`,
      {
        method: "GET",
        headers: {
          "x-readme-version": version,
          authorization: "Basic " + btoa(process.env.README_IO_AUTH + ":"),
        },
      }
    )
  ).json();

const deleteSpecification = async (id) => {
  await fetch(`https://dash.readme.com/api/v1/api-specification/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "Basic " + btoa(process.env.README_IO_AUTH + ":"),
      accept: "application/json",
    },
  });
};

const asyncMap = (arr, asyncFn) => {
  return Promise.all(arr.map(asyncFn));
};

main();
