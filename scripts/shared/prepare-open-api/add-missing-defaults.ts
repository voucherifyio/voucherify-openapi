import colors from "colors";

const addMissingDefaults = (object: any) => {
  if (Array.isArray(object)) {
    return object.map((value) => addMissingDefaults(value));
  }
  if (object instanceof Object) {
    if ("enum" in object && object["enum"]?.length === 1) {
      const indexOfEnum = Object.keys(object).findIndex(
        (value) => value === "enum",
      );
      const enumEntries = Object.entries(object);

      if (typeof object["enum"][0] !== "string") {
        console.log(
          colors.red('"DEFAULT" IS NOT A STRING, ERROR, CHECK BELOW'),
        );
        console.log({ enum: object["enum"] });
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
        return [key, addMissingDefaults(entry)];
      }),
    );
  }
  return object;
};

export default addMissingDefaults;
