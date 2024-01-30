import fsPromises from "fs/promises";
import path from "path";
import { capitalize, groupBy } from "lodash";
import SchemaToMarkdownTable, {
  ExamplesRenderedAs,
  RenderMode,
} from "./src/schema-to-md-table";
import { EOL } from "os";
import dotenv from "dotenv";
dotenv.config();

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

const main = async () => {
  const version = "v2018-08-01-piotr-579";
  if (process.env.README_IO_AUTH?.length < 10) {
    console.log("`README_IO_AUTH` was not provided in `.env` file :/");
    return;
  }
  const openApiWebhooksPath = path.join(
    __dirname,
    "../reference/OpenAPIWebhooks.json"
  );
  const openApiWebhooksContent = JSON.parse(
    (await fsPromises.readFile(openApiWebhooksPath)).toString()
  );

  removeKey(openApiWebhooksContent, "x-stoplight");

  const webhooks = openApiWebhooksContent.webhooks;
  const dataStructure = [];
  Object.keys(webhooks).forEach((webhookKey) => {
    const webhookData = webhooks[webhookKey];
    const title = webhookKey.split(".").at(-1);
    const group = webhookKey.split(".")[1];
    const method = Object.keys(webhookData)[0];
    const schemaRef = webhookData[method].requestBody.content[
      "application/json"
    ].schema.$ref
      .split("/")
      .at(-1);
    dataStructure.push({ title, group, method, schemaRef });
  });

  const dataStructureGroupedById: Record<
    string,
    {
      title: string;
      group: string;
      method: string;
      schemaRef: string;
    }[]
  > = groupBy(dataStructure, "group");

  // initialize SchemaToMarkdownTable tool
  const stm = new SchemaToMarkdownTable(
    openApiWebhooksContent.components.schemas,
    RenderMode.List,
    ExamplesRenderedAs.PartOfDescription
  );

  //create Webhooks category
  const response = await fetch(`https://dash.readme.com/api/v1/categories`, {
    method: "POST",
    headers: {
      "x-readme-version": version,
      authorization: "Basic " + btoa(process.env.README_IO_AUTH + ":"),
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      type: "reference",
      title: "Webhooks",
    }),
  });
  if (!response.ok) {
    try {
      const responseJSON = await response.json();
      console.log(responseJSON);
    } catch (e) {
      console.log(response);
    }
    throw new Error("Error in json response from readme");
  }
  const { _id: webhooksCategoryId } = await response.json();

  //create folder `webhooks` in `docs/`
  //clean up this folder

  //create categories docs grab slug...
  for (const singleDataStructureGroupedById of Object.keys(
    dataStructureGroupedById
  )) {
    const categoryTitle = capitalize(singleDataStructureGroupedById);
    const response = await fetch(`https://dash.readme.com/api/v1/docs`, {
      method: "POST",
      headers: {
        "x-readme-version": version,
        authorization: "Basic " + btoa(process.env.README_IO_AUTH + ":"),
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        type: "basic",
        category: webhooksCategoryId,
        title: categoryTitle,
        hidden: false,
        order: 1,
      }),
    });
    if (!response.ok) {
      try {
        const responseJSON = await response.json();
        console.log(responseJSON);
      } catch (e) {
        console.log(response);
      }
      throw new Error("Error in json response from readme");
    }
    const { slug: parentDocSlug } = await response.json();
    //create md files in `docs/webhooks/` with content:
    for (const [index, singleDataStructure] of dataStructureGroupedById[
      singleDataStructureGroupedById
    ].entries()) {
      const { title, method, schemaRef, group } = singleDataStructure;
      const slug = `event-${group.toLowerCase().replaceAll(" ", "-")}-${title
        .toLowerCase()
        .replaceAll(" ", "-")}`;
      const mdComment = [];
      mdComment.push("---");
      mdComment.push(`title: ${capitalize(title)}`);
      mdComment.push(`type: basic`);
      mdComment.push(`categorySlug: webhooks`);
      mdComment.push(`parentDocSlug: ${parentDocSlug}`);
      mdComment.push(`slug: ${slug}`);
      mdComment.push(`hidden: false`);
      mdComment.push(`order: ${index + 1}`);
      mdComment.push("---");
      const mdIntroduction = [];
      mdIntroduction.push(`# EVENTS.${group}.${title}`);
      mdIntroduction.push(`## HTTP request method: ${method.toUpperCase()}`);
      const schemaData = stm.render(schemaRef);
      const PATH_TO_WEBHOOKS_DOCS = [__dirname, "../docs/webhooks"];
      await fsPromises.writeFile(
        path.join(...PATH_TO_WEBHOOKS_DOCS, `${slug}.md`),
        [...mdComment, ...mdIntroduction].join(EOL) + EOL + schemaData
      );
    }
  }
};

main();
