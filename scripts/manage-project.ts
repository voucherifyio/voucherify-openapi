import dotenv from "dotenv";
import minimist from "minimist";
import colors from "colors";
import { exec } from "child_process";
import { buildMdTablesFromOpenApi } from "./build-md-tables-from-openapi";
import { updateMdTablesInDoc } from "./update-md-tables-in-doc";

dotenv.config();
const options = minimist(process.argv.slice(2));
const versionTag = options.versionTag || options.vt;
const versionOption = options.version || options.v;

const createNew = options.create || options.c;
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
          `\n"create" or "c" for version, for example "npm run manage-project -- --vt=piotr-1234" --c` +
          `\n\nuse "versionTag" or "version" for version, not both!` +
          `\n\nby default, cleans up version (not creates one)`
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
  if (createNew) {
    await createNewVersion(version);
  }
  await cleanProject(version);
  console.log(
    colors.green(
      "UPLOADING OPEN API FILE... PLEASE WAIT... THIS MAY TAKE UP TO A MINUTE"
    )
  );
  await new Promise((resolve) => {
    exec(
      `rdme openapi ./reference/OpenAPI.json --version=${version} --create`,
      (error, stdout, stderr) => {
        if (
          error
            ?.toString?.()
            ?.includes?.(
              `We're sorry, your upload request timed out. Please try again or split your file up into smaller chunks.`
            ) ||
          stderr
        ) {
          console.log(colors.green("OPEN API FILE WAS UPLOADED"));
          return resolve(true);
        }
        throw new Error(
          error?.toString?.() || "OPEN API FILE WAS NOT UPLOADED"
        );
      }
    );
  });
  console.log(colors.green("BUILDING MD TABLES FROM OPEN API..."));
  await new Promise((resolve) => {
    exec(`npm run build-md-tables-from-openapi`, (error, stdout, stderr) => {
      if (stderr) {
        console.log(colors.green("MD TABLES WERE BUILDED SUCCESSFULLY!"));
        return resolve(true);
      }
      console.log(colors.red(error?.toString?.()));
      throw new Error("MD TABLES WERE NOT BUILDED!");
    });
  });
  console.log(colors.green("UPDATING MD TABLES IN DOCS..."));
  await new Promise((resolve) => {
    exec(`npm run update-md-tables-in-doc`, (error, stdout, stderr) => {
      if (stderr) {
        console.log(
          colors.green("MD TABLES WERE UPDATED IN DOCS SUCCESSFULLY!")
        );
        return resolve(true);
      }
      console.log(colors.red(error?.toString?.()));
      throw new Error("MD TABLES WERE NOT UPDATED IN DOCS!");
    });
  });
  console.log(colors.green("UPLOADING GUIDES DOC FILES..."));
  await new Promise((resolve) => {
    exec(
      `rdme docs ./docs/guides --version=${version} --create`,
      (error, stdout, stderr) => {
        if (stderr) {
          console.log(colors.green("GUIDES FILES WERE UPLOADED!"));
          return resolve(true);
        }
        console.log(colors.red(error?.toString?.()));
        throw new Error("GUIDES WERE NOT UPLOADED!");
      }
    );
  });

  console.log(
    colors.green(`\n\nDONE!\nVisit: https://docs.voucherify.io/${version}/`)
  );
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
