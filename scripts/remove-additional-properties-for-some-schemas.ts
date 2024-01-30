import { omit, difference, uniq } from "lodash";

export const removeAdditionalPropertiesFromSchemas = (
  schemas: Record<string, any>,
  schemasNamesToRemoveAdditionalProperties: string[]
) => {
  const allRelatedSchemasNames = getAllRelatedSchemasNames(
    schemas,
    schemasNamesToRemoveAdditionalProperties
  );

  return Object.fromEntries(
    Object.entries(schemas).map(([key, value]) => [
      key,
      allRelatedSchemasNames.includes(key)
        ? removeAdditionalPropertiesForSomeSchemas(value)
        : value,
    ])
  );
};

const getAllRelatedSchemasNames = (
  schemas: Record<string, any>,
  schemaNames: string[]
) => {
  const _schemasNames = uniq(schemaNames);
  let additionalSchemasNames = [];
  while (true) {
    for (const schemaName of _schemasNames) {
      if (!schemas[schemaName]) {
        continue;
      }
      additionalSchemasNames.push(
        ...(JSON.stringify(schemas[schemaName])
          .match(/"#\/components\/schemas\/.*?"/g)
          ?.map((match) =>
            match.replace('"#/components/schemas/', "").slice(0, -1)
          ) || [])
      );
    }
    additionalSchemasNames = difference(
      uniq(additionalSchemasNames),
      uniq(_schemasNames)
    );
    if (additionalSchemasNames.length === 0) {
      break;
    } else {
      _schemasNames.push(...additionalSchemasNames);
      additionalSchemasNames = [];
    }
  }
  return _schemasNames;
};

export const removeAdditionalPropertiesForSomeSchemas = (
  schemaPartial: any
) => {
  const simplifyObjectModel = (schemaPartialTypeObject: object) =>
    omit(schemaPartialTypeObject, ["additionalProperties"]);

  if (Array.isArray(schemaPartial)) {
    return schemaPartial.map((item) =>
      removeAdditionalPropertiesForSomeSchemas(item)
    );
  }
  if (schemaPartial instanceof Object) {
    return simplifyObjectModel(
      Object.fromEntries(
        Object.entries(simplifyObjectModel(schemaPartial)).map(
          ([key, value]) => [
            key,
            removeAdditionalPropertiesForSomeSchemas(value),
          ]
        )
      )
    );
  }
  return schemaPartial;
};
