import colors from "colors";
import { difference, omit } from "lodash";

export const isObject = (value) => {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    value instanceof Object
  );
};

export const removeAllRequireds = (node: object): object => {
  delete node["x-stoplight"];
  for (const attr in node) {
    if (isObject(node[attr])) {
      removeAllRequireds(node[attr]);
    }
  }
  return node;
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

export const parseNullsToNullableObjects = (schemas) => {
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
            schema.properties[propertyKey],
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
  schemaPartial: any,
  keepIfPropertiesNotPresent: boolean,
) => {
  const simplifyObjectModel = (schemaPartialTypeObject: object) =>
    omit(schemaPartialTypeObject, ["additionalProperties", "properties"]);

  if (!isObject(schemaPartial)) {
    return schemaPartial;
  }
  if (
    !keepIfPropertiesNotPresent &&
    "additionalProperties" in schemaPartial &&
    isObject(schemaPartial.additionalProperties)
  ) {
    return simplifyObjectModel(schemaPartial);
  } else if (
    "additionalProperties" in schemaPartial &&
    isObject(schemaPartial.additionalProperties) &&
    "properties" in schemaPartial
  ) {
    return simplifyObjectModel(schemaPartial);
  }
  for (const f of Object.keys(schemaPartial)) {
    if (typeof schemaPartial[f] === "object") {
      schemaPartial[f] = removeAdditionalProperties(
        schemaPartial[f],
        keepIfPropertiesNotPresent,
      );
    }
  }
  return schemaPartial;
};

export const removeRequiredOnNullableAttributes = (schemaPartial: any) => {
  if (!isObject(schemaPartial)) {
    return schemaPartial;
  }

  if (!schemaPartial?.properties && !schemaPartial?.allOf) {
    return schemaPartial;
  }

  //ONLY FOR ALL OF BECAUSE WE ENSURE ALL ONE OF CONTAINS LIST OF REFS
  if (schemaPartial?.allOf) {
    schemaPartial.allOf = schemaPartial.allOf.map((item: any) =>
      removeRequiredOnNullableAttributes(item),
    );
  }

  if (schemaPartial.properties) {
    Object.keys(schemaPartial.properties).forEach((key) => {
      schemaPartial.properties[key] = removeRequiredOnNullableAttributes(
        schemaPartial.properties[key],
      );
    });

    const nullables = Object.keys(schemaPartial.properties).filter((key) => {
      return schemaPartial.properties[key].nullable ?? false;
    });

    const required = schemaPartial.required ?? [];

    if (required.length > 0) {
      schemaPartial.required = difference(required, nullables);
    }
  }

  return schemaPartial;
};

export const makeEverythingNullable = (schemaPartial: any) => {
  if (!isObject(schemaPartial)) {
    return schemaPartial;
  }

  if (!schemaPartial?.properties && !schemaPartial?.allOf) {
    return schemaPartial;
  }

  //ONLY FOR ALL OF BECAUSE WE ENSURE ALL ONE OF CONTAINS LIST OF REFS
  if (schemaPartial?.allOf) {
    schemaPartial.allOf = schemaPartial.allOf.map((item: any) =>
      makeEverythingNullable(item),
    );
  }

  if (schemaPartial.properties) {
    Object.keys(schemaPartial.properties).forEach((key) => {
      if (typeof schemaPartial.properties[key]?.type === "string") {
        schemaPartial.properties[key].nullable = true;
      }
      schemaPartial.properties[key] = makeEverythingNullable(
        schemaPartial.properties[key],
      );
    });
  }

  return schemaPartial;
};
