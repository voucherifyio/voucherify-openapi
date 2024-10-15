import dotenv from "dotenv";
import minimist from "minimist";
import colors from "colors";
import { exec } from "child_process";
import { prepareWebhooksDocumentation } from "./prepare-webhooks-documentation";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

dotenv.config();
const options = minimist(process.argv.slice(2));
const versionTag = options.versionTag || options.vt;
const uploadAll = options.ua || options.uploadAll;
const help = options.help || options.h;
const mainVersion = "v2018-08-01";
const version = versionTag ? `${mainVersion}-${versionTag}` : undefined;

const listOfGuideCategories = [
  "Getting started",
  "Integration Blueprint",
  "Development",
  "Campaigns Recipes",
  "Discounts Recipes",
  "Distributions Recipes",
  "Landing Pages",
  "More",
];

const listOfReferenceCategories = ["Introduction"];

const main = async ({
  help,
  version,
}: {
  help?: boolean;
  version?: string;
}) => {
  if (!validate({ help, version })) {
    return;
  }
  await runCliProcess({
    command: `npm run create-open-api-version-to-upload`,
    okIncludes: "ok",
  });
  await createNewVersion(version);
  await cleanProject(version);
  await uploadImagesUsedInMdFiles();
  console.log(colors.green("Preparing webhooks documentation"));
  await prepareWebhooksDocumentation();
  if (!uploadAll) {
    console.log(
      `\nNow run:\n` +
        colors.yellow(
          `rdme openapi ./tmp/referenceToUpload/OpenAPI.json --version=${version} --create`,
        ) +
        `\nwait 10s` +
        colors.yellow(
          `\nrdme openapi ./reference/OpenAPIWebhooks.json --version=${version} --create`,
        ) +
        `\nwait 10s` +
        colors.yellow(`\nrdme docs ./docs/guides --version=${version}`) +
        colors.yellow(
          `\nrdme docs ./docs/reference-docs --version=${version}`,
        ) +
        colors.yellow(
          `\nnpm run update-webhooks-documentation-titles -- --vt=${versionTag}`,
        ) +
        colors.yellow(`\nrdme docs ./docs/webhooks --version=${version}`) +
        colors.yellow(
          `\nrdme docs ./docs/custom-webhook-sites --version=${version}`,
        ),
    );
  } else {
    await runCliProcess({
      command: `rdme openapi ./tmp/referenceToUpload/OpenAPI.json --version=${version} --create`,
      okIncludes: "done!",
    });
    await runCliProcess({
      command: `rdme openapi ./reference/OpenAPIWebhooks.json --version=${version} --create`,
      okIncludes: "done!",
    });
    console.log(colors.green("sleeping 10s..."));
    await new Promise((r) => setTimeout(r, 10000));
    await runCliProcess({
      command: `rdme docs ./docs/guides --version=${version}`,
      okIncludes: "successfully created",
    });
    await runCliProcess({
      command: `rdme docs ./docs/reference-docs --version=${version}`,
      okIncludes: "successfully updated",
    });
    await runCliProcess({
      command: `npm run update-webhooks-documentation-titles -- --vt=${versionTag}`,
      okIncludes: "ok",
    });
    await runCliProcess({
      command: `rdme docs ./docs/webhooks --version=${version}`,
      okIncludes: "successfully updated",
    });
    await runCliProcess({
      command: `rdme docs ./docs/custom-webhook-sites --version=${version}`,
      okIncludes: "successfully created",
    });
  }
  console.log(
    colors.green(`\n\nDONE!\nVisit: https://docs.voucherify.io/${version}/`),
  );
};

const uploadImagesUsedInMdFiles = async () => {
  console.log(
    colors.green(
      "LOOKING FOR NOT UPLOADED IMAGES IN MD FILES, UPLOADING IF NEEDED...",
    ),
  );
  await runCliProcess({
    command: `npm run readme-upload-missing-images`,
    okIncludes: "Done!",
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
        },
      )
    ).status === 200
  );
};

const runCliProcess = async ({
  command,
  okIncludes,
}: {
  command: string;
  okIncludes?: string;
}): Promise<{ success: boolean }> => {
  console.log(colors.green(`Running: ${command}`));
  return await new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      const stdoutClean = `${stdout.replace(/.*voucherify/, "").trim()}\n${
        stderr || ""
      }`;
      console.log(colors.yellow(stdoutClean));
      if (
        stdoutClean.includes("Error") &&
        !stdoutClean.includes("Errors") &&
        !stdoutClean.includes("Error-")
      ) {
        console.log(colors.red(`Error`));
        return resolve({ success: false });
      } else if (okIncludes && stdoutClean.includes(okIncludes)) {
        console.log(colors.green(`Success`));
        return resolve({ success: true });
      }
      console.log(colors.yellow(stdoutClean));
      console.log(colors.red(`Unknown result`));
      return resolve({ success: false });
    });
  });
};

const createNewVersion = async (version) => {
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
      console.log(
        colors.red(
          `Response status: ${response.status}; ${
            response.status === 401
              ? "Readme api key is invalid"
              : "Is this versionTag already created?"
          }`,
        ),
      );
      process.exit(1);
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
    async (category) => await deleteCategory(version, category.slug),
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
        { type: "reference" },
      ),
  );
  console.log(colors.green(`REFERENCE CATEGORIES UPDATED!`));
  const allApiSpecifications = await getAllApiSpecifications(version);
  for (const apiSpecification of allApiSpecifications) {
    await deleteSpecification(apiSpecification.id);
  }
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
      },
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
      },
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

const validate = ({ help, version }: { help?: boolean; version?: string }) => {
  if (process.env.README_IO_AUTH?.length < 10) {
    console.log(
      colors.red("`README_IO_AUTH` was not provided in `.env` file :/"),
    );
    return;
  }
  if (help) {
    printHelp();
    return false;
  }
  if (!version) {
    console.log(
      colors.red(
        "invalid arguments, missing `versionTag` or `vt`, check `help` for more information\nrun 'npm run create-clean-project -- --help'",
      ),
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
        `\nnpm run create-clean-version -- --vt=[your-name]-[version-number]`,
    ),
  );
};

(async () => {
  await main({
    help,
    version,
  });
})();
