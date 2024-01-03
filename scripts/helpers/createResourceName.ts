import _ from "lodash";

const allKeyWords = [
  "get",
  "list",
  "create",
  "upsert",
  "update",
  "delete",
  "in-bulk",
  "generate",
  "enable",
  "disable",
  "validate",
  "redeem",
  "check-eligibility",
];

const methodToActionMap = {
  get: "Get",
  post: "Create",
  put: "Update",
};
export const createResourceName = (
  operatorId: string,
  method: string,
  pathName: string
) => {
  const nameElements = getNameElements(pathName);

  const result = allKeyWords
    .map((element) => {
      let occurred = false;
      let position = -1;

      while ((position = operatorId.indexOf(element, position + 1)) !== -1) {
        occurred = true;
      }

      return { element, occurred };
    })
    .filter((element) => element.occurred)
    .map((element) => _.camelCase(element.element))
    .map((element) => _.upperFirst(element));

  if (result.length === 0) {
    return nameElements.join("") + methodToActionMap[method];
  } else {
    return _.uniq([...nameElements, ...result]).join("");
  }
};

export const getNameElements = (pathName: string) =>
  pathName
    .split("/")
    .slice(pathName.includes("client") ? 3 : 2)
    .filter((name) => !/\{.*\}/.test(name))
    .filter((name) => name !== "async")
    .filter((name) => name !== "bulk")
    .map((name) => _.camelCase(name))
    .map((name) => _.upperFirst(name));
