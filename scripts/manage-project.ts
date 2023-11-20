import dotenv from "dotenv";
import minimist from "minimist";
import colors from "colors";
import { exec } from "child_process";

dotenv.config();
const options = minimist(process.argv.slice(2));
const versionTag = options.versionTag || options.vt;
const versionOption = options.version || options.v;
const { create, update } = options;
const help = options.help || options.h;
const mainVersion = "v2018-08-01";
const version =
  versionOption || versionTag ? `${mainVersion}-${versionTag}` : undefined;

const listOfGuideCategories = [
  "Getting started",
  "Integration Blueprint",
  "Development",
  "Building blocks",
  "Campaigns Recipes",
  "Discounts Recipes",
  "Distributions Recipes",
  "More",
];

const listOfReferenceCategories = ["Introduction"];

const main = async ({
  help,
  version,
  create,
  update,
}: {
  help?: boolean;
  version?: string;
  create?: boolean;
  update?: boolean;
}) => {
  if (!(await validate({ help, version, create, update }))) {
    return;
  }
  if (create) {
    await createNewVersion(version);
  }
  await cleanProject(version);
  await uploadOpenApiFileWithMaxNumberOfAttempts(version, 2);
  await buildMdTables();
  await updateMdTablesInDocs();
  await uploadImagesUsedInMdFiles();
  await uploadGuideFiles(version);
  await uploadReferenceDocsWithMaxNumberOfAttempts(version, 4);
  console.log(
    colors.green(`\n\nDONE!\nVisit: https://docs.voucherify.io/${version}/`)
  );
};

const uploadImagesUsedInMdFiles = async () => {
  console.log(
    colors.green(
      "LOOKING FOR NOT UPLOADED IMAGES IN MD FILES, UPLOADING IF NEEDED..."
    )
  );
  await runCliProcess({
    command: `npm run readme-upload-missing-images`,
  });
  console.log(colors.green("OPERATION WAS COMPLETED SUCCESSFULLY!"));
};

const isVersionExists = async (version: string) => {
  return (
    (
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
    ).status === 200
  );
};

const uploadOpenApiFileWithMaxNumberOfAttempts = async (
  version,
  maxNumberOfUploadingAttempts = 3
) => {
  console.log(
    colors.green(
      "UPLOADING OPEN API FILE... PLEASE WAIT... THIS MAY TAKE UP TO A MINUTE"
    )
  );
  for (let i = 1; i <= maxNumberOfUploadingAttempts; i++) {
    const { success, error } = await runCliProcess({
      command: `rdme openapi ./reference/OpenAPI.json --version=${version} --create`,
      stderrIncludes: `We're sorry, your upload request timed out. Please try again or split your file up into smaller chunks.`,
      stdoutIncludes: `You've successfully uploaded a new OpenAPI file to your ReadMe project!`,
      resolveErrorAsFalse: true,
    });
    if (success) {
      console.log(colors.green("OPEN API FILE WAS UPLOADED"));
      break;
    }
    if (i === maxNumberOfUploadingAttempts) {
      console.log(error);
      throw new Error("OPEN API FILE WAS NOT UPLOADED!");
    }
  }
  return;
};

const uploadReferenceDocsWithMaxNumberOfAttempts = async (
  version,
  maxNumberOfUploadingAttempts = 3
) => {
  console.log(colors.green("UPLOADING REFERENCE DOC FILES..."));
  for (let i = 1; i <= maxNumberOfUploadingAttempts; i++) {
    await new Promise((r) => setTimeout(r, 10000));
    const { success, error } = await runCliProcess({
      command: `rdme docs ./docs/reference-docs --version=${version}`,
      stdoutIncludes: "successfully created",
      resolveErrorAsFalse: true,
    });
    if (success) {
      console.log(colors.green("REFERENCE DOC FILES WERE UPLOADED!"));
      break;
    }
    if (i === maxNumberOfUploadingAttempts) {
      console.log(error);
      throw new Error("REFERENCE DOC FILES WERE NOT UPLOADED!");
    }
  }
  return;
};

const runCliProcess = async ({
  command,
  stdoutIncludes,
  stderrIncludes,
  resolveErrorAsFalse = false,
}: {
  command: string;
  stdoutIncludes?: string;
  stderrIncludes?: string;
  resolveErrorAsFalse?: boolean;
}): Promise<{ success: boolean; error?: string }> => {
  return await new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      const stdoutClean = stdout.replace(/.*voucherify/, "").trim();
      if (
        (stdoutIncludes && stdoutClean?.includes(stdoutIncludes)) ||
        (!stdoutIncludes && stdoutClean) ||
        (stderrIncludes && stderr.includes(stderrIncludes))
      ) {
        return resolve({ success: true });
      }
      if (resolveErrorAsFalse) {
        return resolve({ success: false, error: `Error: \n${stderr}` });
      }
      if (stderr) {
        console.log(`Error: \n${stderr}`);
      }
      throw error;
    });
  });
};

const uploadGuideFiles = async (version) => {
  console.log(colors.green("UPLOADING GUIDES DOC FILES..."));
  await runCliProcess({
    command: `rdme docs ./docs/guides --version=${version}`,
    stdoutIncludes: "successfully created",
  });
  console.log(colors.green("GUIDES DOC FILES WERE UPLOADED!"));
};

const updateMdTablesInDocs = async () => {
  console.log(colors.green("UPDATING MD TABLES IN DOCS..."));
  await runCliProcess({
    command: `npm run update-md-tables-in-doc`,
  });
  console.log(colors.green("MD TABLES WERE UPDATED IN DOCS SUCCESSFULLY!"));
};
const buildMdTables = async () => {
  console.log(colors.green("BUILDING MD TABLES FROM OPEN API..."));
  await runCliProcess({
    command: `npm run build-md-tables-from-openapi`,
  });
  console.log(colors.green("MD TABLES WERE BUILDED SUCCESSFULLY!"));
};

const createNewVersion = async (version) => {
  console.log(colors.green("CREATING NEW VERSION"));
  try {
    const response = await fetch(`https://dash.readme.com/api/v1/version`, {
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
    });
    if (response.status !== 200 && !(await isVersionExists(version))) {
      throw new Error(
        `Response status: ${response.status}, maybe this versionTag is already created?`
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
  //create categories one by one (creation order is important)
  for (const categoryTitle of [
    ...listOfGuideCategories,
    ...listOfReferenceCategories,
  ]) {
    await createCategory(version, categoryTitle);
  }
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
  await asyncMap(allApiSpecifications, (apiSpecification) =>
    deleteSpecification(apiSpecification.id)
  );
  console.log(colors.green(`API SPECIFICATIONS DELETED!`));
  console.log(colors.green(`VERSION "${version}" IS CLEANED UP!`));
  return;
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

const validate = async ({
  help,
  version,
  create,
  update,
}: {
  help?: boolean;
  version?: string;
  create?: boolean;
  update?: boolean;
}) => {
  if (process.env.README_IO_AUTH?.length < 10) {
    console.log(
      colors.red("`README_IO_AUTH` was not provided in `.env` file :/")
    );
    return;
  }
  if (help || (!version && !create && !update)) {
    printHelp();
    return false;
  }
  if (!version) {
    console.log(
      colors.red(
        "invalid arguments, missing `version` or `versionTag`, check `help` for more information\nrun 'npm run manage-project -- --help'"
      )
    );
    return false;
  }
  if (!create && !update) {
    console.log(
      colors.red(
        "invalid arguments, missing `update` or `create`, check `help` for more information\nrun 'npm run manage-project -- --help'"
      )
    );
    return false;
  }
  if (create && update) {
    console.log(
      colors.red(
        "invalid arguments, you provided conflicting arguments `update` and `create`, check `help` for more information\nrun 'npm run manage-project -- --help'"
      )
    );
    return false;
  }
  if (update && !(await isVersionExists(version))) {
    console.log(
      colors.red(
        `Version ${version} does not exist! Create it first. Use parameter --create instead of --update`
      )
    );
    return false;
  }
  if (create && (await isVersionExists(version))) {
    console.log(
      colors.red(
        `Version ${version} already exist! Update it instead. Use parameter --update instead of --create`
      )
    );
    return false;
  }
  return true;
};

const printHelp = () => {
  console.log(
    colors.green(
      `options:` +
        `\n"versionTag" or "vt" for versionTag` +
        `\n"version" or "v" for version` +
        `\n"create" if you want to create such version` +
        `\n"update" if you want to update such version` +
        `\n\nversionTag or version is required!` +
        `\ncreate or update option is required!` +
        `\n\nexamples:` +
        `\nnpm run manage-project -- --vt=piotr-123 --create` +
        `\nnpm run manage-project -- --v=v2018-08-01-piotr-123 --create` +
        `\nnpm run manage-project -- --vt=piotr-123 --update` +
        `\nnpm run manage-project -- --v=v2018-08-01-piotr-123 --update`
    )
  );
};

main({
  help,
  version,
  create,
  update,
});
