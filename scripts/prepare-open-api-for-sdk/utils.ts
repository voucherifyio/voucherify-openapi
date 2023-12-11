import colors from "colors";
import { omit } from "lodash";

export const isObject = (value) => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

export const removeStoplightTag = (node: object): object => {
  delete node["x-stoplight"];
  for (const attr in node) {
    if (isObject(node[attr])) {
      removeStoplightTag(node[attr]);
    }
  }
  return node;
};

export const parseNullToNullable = (schemas) => {
  let counter = 0;
  const parseNullToNullableInSchema = (schema) => {
    if (schema instanceof Object) {
      if (schema.type === "null") {
        counter++;
        return { ...schema, nullable: true, type: "object" };
      }

      if (schema.properties) {
        for (const propertyKey of Object.keys(schema.properties)) {
          schema.properties[propertyKey] = parseNullToNullableInSchema(
            schema.properties[propertyKey]
          );
        }
      }
    }

    return schema;
  };

  for (const schemaName of Object.keys(schemas)) {
    schemas[schemaName] = parseNullToNullableInSchema(schemas[schemaName]);
  }

  console.log(colors.green(`Replaced ${counter} nulls to nullable`));

  return schemas;
};

export const removeAdditionalProperties = (
  e: any,
  keepIfPropertiesNotPresent: boolean
) => {
  const simplifyObjectModel = (o) =>
    omit(o, ["additionalProperties", "properties"]);

  if (e instanceof Object) {
    if (
      !keepIfPropertiesNotPresent &&
      "additionalProperties" in e &&
      e.additionalProperties instanceof Object
    ) {
      return simplifyObjectModel(e);
    } else if (
      "additionalProperties" in e &&
      e.additionalProperties instanceof Object &&
      "properties" in e
    ) {
      return simplifyObjectModel(e);
    }
    for (const f of Object.keys(e)) {
      if (typeof e[f] === "object") {
        e[f] = removeAdditionalProperties(e[f], keepIfPropertiesNotPresent);
      }
    }
  }
  return e;
};
