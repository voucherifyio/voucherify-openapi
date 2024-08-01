import { omit } from "lodash";

export const removeUnwantedProperties = (
  object: any,
  unwantedProperties: string[],
) => {
  if (Array.isArray(object)) {
    return object.map((value) =>
      removeUnwantedProperties(value, unwantedProperties),
    );
  }
  if (object instanceof Object) {
    object = omit(object, unwantedProperties);
    return Object.fromEntries(
      Object.entries(object).map((keyAndEntry) => {
        const [key, entry] = keyAndEntry;
        return [key, removeUnwantedProperties(entry, unwantedProperties)];
      }),
    );
  }
  return object;
};
