import { omit } from "lodash";

export const readmeReplaceTitle = (object: any) => {
  if (Array.isArray(object)) {
    return object.map((value) => readmeReplaceTitle(value));
  }
  if (object instanceof Object) {
    if ("readmeTitle" in object && typeof object.readmeTitle === "string") {
      object = {
        title: object.readmeTitle,
        ...omit(object, "title", "readmeTitle"),
      };
    }
    return Object.fromEntries(
      Object.entries(object).map((keyAndEntry) => {
        const [key, entry] = keyAndEntry;
        return [key, readmeReplaceTitle(entry)];
      }),
    );
  }
  return object;
};
