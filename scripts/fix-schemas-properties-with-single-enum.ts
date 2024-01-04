import path from "path";
import fsPromises from "fs/promises";
import colors from "colors";

const fixSchemasPropertiesWithSingleEnum = (object: any) => {
  if (Array.isArray(object)) {
    return object.map((value) => fixSchemasPropertiesWithSingleEnum(value));
  }
  if (object instanceof Object) {
    if ("enum" in object && object["enum"]?.length === 1) {
      const indexOfEnum = Object.keys(object).findIndex(
        (value) => value === "enum"
      );
      const enumEntries = Object.entries(object);

      if (typeof object["enum"][0] !== "string") {
        console.log(
          colors.red('"DEFAULT" IS NOT A STRING, ERROR, CHECK DIF!!!')
        );
      }

      return Object.fromEntries([
        ...enumEntries.slice(0, indexOfEnum),
        [["default"], object["enum"][0]],
        ...enumEntries.slice(indexOfEnum),
      ]);
    }
    return Object.fromEntries(
      Object.entries(object).map((keyAndEntry) => {
        const [key, entry] = keyAndEntry;
        return [key, fixSchemasPropertiesWithSingleEnum(entry)];
      })
    );
  }
  return object;
};
const main = async () => {
  const openApiPath = path.join(__dirname, "../reference/OpenAPI.json");

  const getOpenAPI = async () =>
    JSON.parse((await fsPromises.readFile(openApiPath)).toString());

  await fsPromises.writeFile(
    openApiPath,
    JSON.stringify(
      fixSchemasPropertiesWithSingleEnum(await getOpenAPI()),
      null,
      2
    )
  );
  console.log("done");
};

main();
