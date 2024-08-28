import fsPromises from "fs/promises";
import path from "path";
import { capitalize, groupBy } from "lodash";
import { EOL } from "os";
import dotenv from "dotenv";
import fs from "fs";
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

export const prepareWebhooksDocumentation = async () => {
  const openApiWebhooksPath = path.join(
    __dirname,
    "../reference/OpenAPIWebhooks.json",
  );
  const openApiWebhooksContent = JSON.parse(
    (await fsPromises.readFile(openApiWebhooksPath)).toString(),
  );

  removeKey(openApiWebhooksContent, "x-stoplight");

  const dataStructures: {
    title: string;
    path: string;
    group: string;
    method: string;
    operationId: string;
    examples?: Record<string, any>;
  }[] = [];

  openApiWebhooksContent.paths = Object.fromEntries(
    Object.entries(openApiWebhooksContent.paths).map(([path, pathEntry]) => {
      if (Object.keys(pathEntry).length !== 1) {
        throw "path has more than one method";
      }
      return [
        path,
        Object.fromEntries(
          Object.entries(pathEntry).map(([method, methodEntry]) => {
            const title = capitalize(path.split(".").slice(2).join(" "));
            const group = capitalize(
              path.split(".").slice(0, 2).join(" ").replaceAll("/", ""),
            );
            const operationId = path
              .toLowerCase()
              .replaceAll(".", "-")
              .replaceAll("/", "");
            dataStructures.push({
              method,
              path,
              title,
              group,
              operationId,
              examples:
                methodEntry?.responses?.["200"]?.content?.["application/json"]
                  ?.examples ||
                methodEntry?.responses?.["201"]?.content?.["application/json"]
                  ?.examples,
            });
            methodEntry.summary = title;
            methodEntry.tags = [group];
            methodEntry.operationId = operationId;
            return [method, methodEntry];
          }),
        ),
      ];
    }),
  );

  const dataStructuresByGroup = groupBy(dataStructures, "group");

  openApiWebhooksContent.tags = Object.keys(dataStructuresByGroup).map(
    (key) => ({ name: capitalize(key), description: capitalize(key) }),
  );

  await fsPromises.writeFile(
    openApiWebhooksPath,
    JSON.stringify(openApiWebhooksContent, null, 2),
  );

  const PATH_TO_WEBHOOKS_DOCS = [__dirname, "../docs/webhooks"];
  const PATH_TO_WEBHOOKS_INSTRUCTIONS_DOCS = [
    __dirname,
    "../docs/webhook-introductions",
  ];

  if (!fs.existsSync(path.join(...PATH_TO_WEBHOOKS_DOCS))) {
    fs.mkdirSync(path.join(...PATH_TO_WEBHOOKS_DOCS));
  }
  if (!fs.existsSync(path.join(...PATH_TO_WEBHOOKS_INSTRUCTIONS_DOCS))) {
    fs.mkdirSync(path.join(...PATH_TO_WEBHOOKS_INSTRUCTIONS_DOCS));
  }

  for (const dataStructures of Object.values(dataStructuresByGroup)) {
    for (const [index, singleDataStructure] of dataStructures.entries()) {
      const {
        title,
        group,
        path: pathName,
        method,
        operationId,
        examples,
      } = singleDataStructure;
      const mdComment = [];
      mdComment.push("---");
      mdComment.push(`title: ${capitalize(title)}`);
      mdComment.push(`type: endpoint`);
      mdComment.push(`categorySlug: events`);
      mdComment.push(
        `parentDocSlug: ${group.toLowerCase().replaceAll(" ", "-")}`,
      );
      mdComment.push(`slug: ${operationId}`);
      mdComment.push(`hidden: false`);
      mdComment.push(`order: ${index + 1}`);
      mdComment.push("---");
      const mdText = [];
      mdText.push(
        `# EVENT: "${pathName.replaceAll(
          "/",
          "",
        )}"<br />HTTP method: ${method.toUpperCase()}`,
      );
      const fileName = `${operationId.replaceAll(".", "-")}.md`;
      if (
        fs.existsSync(
          path.join(...PATH_TO_WEBHOOKS_INSTRUCTIONS_DOCS, fileName),
        )
      ) {
        const webhookInstructionsFile = (
          await fsPromises.readFile(
            path.join(...PATH_TO_WEBHOOKS_INSTRUCTIONS_DOCS, fileName),
          )
        ).toString();
        mdText.push("\n\n");
        mdText.push(webhookInstructionsFile);
        mdText.push("\n");
      }

      if (examples && Object.keys(examples).length > 0) {
        Object.entries(examples).map(([exampleName, example]) => {
          mdText.push(`#### Example: ${exampleName.replaceAll("_", " ")}`);
          mdText.push(`\`\`\`json`);
          mdText.push(JSON.stringify(example.value, null, 2));
          mdText.push(`\`\`\``);
        });
      }
      await fsPromises.writeFile(
        path.join(...PATH_TO_WEBHOOKS_DOCS, fileName),
        [...mdComment, ...mdText].join(EOL) +
          `${EOL}${EOL}[block:html]${EOL}` +
          `{${EOL}` +
          `"html": "<style>\\n[title=\\"Toggle library\\"] { \\n  display: none; }\\n.LanguagePicker-divider { \\n  display: none; }\\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\\n  display: none; }\\n.LanguagePicker-languages1qVVo_v6AlP9 {\\n  display: none; }\\n.headline-container-article-info2GaOf2jMpV0r {\\n  display: none; }\\n.APISectionHeader3LN_-QIR0m7x {\\n  display: none; }\\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\\n  display: none; }\\n.PlaygroundC7DInM9NFvBg {\\n  display: none; }\\n.Modal-Header3VPrQs3MUWWd {\\n  display: none; }\\n.rm-ReferenceMain .rm-Article {\\n  max-width: 2000px; }\\n.AccordionContentzBCM46dZQ5Xc {\\n  display: block !important; }\\n.AccordionToggle2c6jPP7vVvLS {\\n  display: block; cursor: default !important; }\\n.APIResponseSchemaPicker-option-toggle1Rk-RliJASLl {\\n  display: block; cursor: default !important; }\\n.APIResponseSchemaPicker-option-toggle1Rk-RliJASLl:focus-within {\\n  border-color: inherit !important; cursor: default !important; background: inherit !important; box-shadow: none !important; }\\n</style>"${EOL}}${EOL}` +
          `[/block]`,
      );
    }
  }
};
