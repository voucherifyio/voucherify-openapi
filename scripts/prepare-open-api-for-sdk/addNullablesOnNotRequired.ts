import { isObject } from "./utils";

export const addNullablesOnNotRequired = (schemaPartial: any) => {
  if (isObject(schemaPartial?.properties)) {
    const required = schemaPartial.required ?? [];
    Object.keys(schemaPartial.properties).forEach((key) => {
      if (!required.includes(key)) {
        schemaPartial.properties[key].nullable = true;
      }
      schemaPartial.properties[key] = addNullablesOnNotRequired(
        schemaPartial.properties[key]
      );
    });
  } else if (isObject(schemaPartial)) {
    Object.keys(schemaPartial).forEach((key) => {
      schemaPartial[key] = addNullablesOnNotRequired(schemaPartial[key]);
    });
  } else if (Array.isArray(schemaPartial)) {
    schemaPartial = schemaPartial.map((schemaPartial) =>
      addNullablesOnNotRequired(schemaPartial)
    );
  }
  return schemaPartial;
};
