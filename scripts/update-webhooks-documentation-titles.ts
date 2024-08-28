import fsPromises from "fs/promises";
import path from "path";
import { capitalize, groupBy } from "lodash";
import dotenv from "dotenv";
import minimist from "minimist";
import colors from "colors";
import { prepareWebhooksDocumentation } from "./prepare-webhooks-documentation";
dotenv.config();
const options = minimist(process.argv.slice(2));
const versionTag = options.versionTag || options.vt;
const mainVersion = "v2018-08-01";
const version = versionTag ? `${mainVersion}-${versionTag}` : undefined;

function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

const removeKey = (node: object, key: string): object => {
  delete node[key];
  for (const attr in node) {
    if (isObject(node[attr])) {
      removeKey(node[attr], key);
    }
  }
  return node;
};

const main = ({ version }: { version?: string }) => {
  if (!validate({ version })) {
    return;
  }
  updateWebhooksDocumentationTitles(version);
};

const updateWebhooksDocumentationTitles = async (version) => {
  if (process.env.README_IO_AUTH?.length < 10) {
    console.log("`README_IO_AUTH` was not provided in `.env` file :/");
    return;
  }
  const openApiWebhooksPath = path.join(
    __dirname,
    "../reference/OpenAPIWebhooks.json",
  );
  const openApiWebhooksContent = JSON.parse(
    (await fsPromises.readFile(openApiWebhooksPath)).toString(),
  );

  const dataStructures: {
    title: string;
    path: string;
    group: string;
    method: string;
    operationId: string;
  }[] = [];

  Object.entries(openApiWebhooksContent.paths).map(([path, pathEntry]) => {
    if (Object.keys(pathEntry).length !== 1) {
      throw "path has more than one method";
    }
    return [
      path,
      Object.fromEntries(
        Object.entries(pathEntry).map(([method, methodEntry]) => {
          let title = capitalize(path.split(".").slice(2).join(" "));
          const group = capitalize(
            path.split(".").slice(0, 2).join(" ").replaceAll("/", ""),
          );
          const operationId = path
            .toLowerCase()
            .replaceAll(".", "-")
            .replaceAll("/", "");
          dataStructures.push({ method, path, title, group, operationId });
          methodEntry.summary = title;
          methodEntry.tags = [group];
          methodEntry.operationId = operationId;
          return [method, methodEntry];
        }),
      ),
    ];
  });

  for (const categoryName of Object.keys(groupBy(dataStructures, "group"))) {
    const slug = categoryName.replaceAll(" ", "-").toLowerCase();
    let title = capitalize(
      slug.split("-").slice(1).join(" ").replaceAll("_", " "),
    );
    if (title === "Bus val rule") {
      title = "Validation Rules";
    }
    title = title
      .replaceAll("_", " ")
      .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
    const response = await fetch(
      `https://dash.readme.com/api/v1/docs/${slug}`,
      {
        method: "PUT",
        headers: {
          "x-readme-version": version,
          authorization: "Basic " + btoa(process.env.README_IO_AUTH + ":"),
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      },
    );
    if (!response.ok) {
      try {
        const responseJSON = await response.json();
        console.log(colors.red(responseJSON));
      } catch (e) {
        console.log(colors.red(response));
      }
      throw new Error("Error in json response from readme");
    } else {
      console.log(colors.green("ok"));
    }
  }
};

const validate = ({ version }: { version?: string }) => {
  if (process.env.README_IO_AUTH?.length < 10) {
    console.log(
      colors.red("`README_IO_AUTH` was not provided in `.env` file :/"),
    );
    return;
  }
  if (!version) {
    console.log(
      colors.red(
        "invalid arguments, missing `version` or `versionTag`, check `help` for more information\nrun 'npm run create-clean-project -- --help'",
      ),
    );
    return false;
  }
  return true;
};

main({
  version,
});
