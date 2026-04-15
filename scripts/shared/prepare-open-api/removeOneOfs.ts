import {
  camelCase,
  compact,
  intersection,
  omit,
  uniq,
  upperFirst,
} from "lodash";
import { isDeepStrictEqual } from "util";
import { removeNotUsedSchemas } from "./remove-not-used-schemas";
import dotenv from "dotenv";
dotenv.config();
import colors from "colors";

const addSpacesInTitle = (title: string) =>
  title
    .replaceAll(" ", "")
    .replace(/([A-Z])/g, " $1")
    .trim();
const checkProperties = (schema, title, schemas) => {
  const properties = Object.fromEntries(
    Object.entries(schema.properties).map((propertyNameAndEntry) => {
      const [propertyName, entry] = propertyNameAndEntry as any;
      if (entry?.oneOf) {
        return [
          propertyName,
          removeOneOf(
            entry,
            schemas,
            addSpacesInTitle(title + upperFirst(camelCase(propertyName))),
          ).schema,
        ];
      }
      if (entry?.properties) {
        return [
          propertyName,
          checkProperties(
            entry,
            title + upperFirst(camelCase(propertyName)),
            schemas,
          ),
        ];
      }
      if (entry.items?.oneOf) {
        return [
          propertyName,
          {
            ...omit(entry.items, "oneOf"),
            type: "array",
            items: removeOneOf(
              entry.items,
              schemas,
              addSpacesInTitle(
                title + upperFirst(camelCase(propertyName)) + "Item",
              ),
            ).schema,
          },
        ];
      }
      return [propertyName, entry];
    }),
  );
  return { ...schema, properties };
};

const removeOneOf = (schema, schemas, title) => {
  if (Array.isArray(schema)) {
    let removed = false;
    return {
      removed,
      schema: schema.map((schemaItem) => {
        if (removed) {
          return schemaItem;
        }
        const { removed: _removed, schema } = removeOneOf(
          schemaItem,
          schemas,
          addSpacesInTitle(title),
        );
        if (_removed) {
          removed = true;
        }
        return schema;
      }),
    };
  }
  if (schema.items) {
    const { removed, schema: _schema } = removeOneOf(
      schema.items,
      schemas,
      title,
    );
    return {
      removed,
      schema: {
        ...schema,
        title: `${title}Item`,
        items: _schema,
      },
    };
  }
  if (schema.allOf) {
    let removed = false;
    return {
      removed,
      schema: {
        ...schema,
        title: addSpacesInTitle(title),
        allOf: schema.allOf.map((schemaItem) => {
          if (removed) {
            return schemaItem;
          }
          const { removed: _removed, schema } = removeOneOf(
            schemaItem,
            schemas,
            title,
          );
          if (_removed) {
            removed = true;
          }
          return schema;
        }),
      },
    };
  }
  if (!(schema instanceof Object) || !("oneOf" in schema)) {
    if (schema.properties) {
      return {
        removed: false,
        schema: checkProperties(schema, title, schemas),
      };
    }
    return { removed: false, schema };
  }
  const oneOf = schema["oneOf"].map((data) =>
    data.$ref ? schemas[data.$ref?.split("/")?.at(-1)] : "any",
  );
  if (oneOf.find((item) => item === "any")) {
    return { removed: true, schema: { title: addSpacesInTitle(title) } };
  }
  if (
    !oneOf ||
    oneOf.reduce((accumulator, currentValue) => {
      if (!!currentValue?.oneOf) {
        return accumulator;
      }
      return false;
    }, false)
  ) {
    return { removed: false, schema };
  }

  const oneOfWithNoRefs = oneOf
    .map((oneOfPartial) => {
      if (!oneOfPartial?.allOf) {
        return oneOfPartial;
      }
      const allOf = oneOfPartial["allOf"]
        .map((data) => {
          if (data.$ref?.split("/")?.at(-1)) {
            return schemas[data.$ref?.split("/")?.at(-1)];
          }
          return data;
        })
        .map((el) => {
          if (el.properties) {
            el.properties = Object.fromEntries(
              Object.entries(el.properties).map(([key, entry]) => {
                if ((entry as any).allOf) {
                  return [
                    key,
                    mergeAllOfObjects(
                      (entry as any).allOf,
                      schemas,
                      `${title}${key}`,
                    ),
                  ];
                }
                return [key, entry];
              }),
            );
          }
          if (el.allOf) {
            return mergeAllOfObjects(el.allOf, schemas, title);
          }
          return el;
        });
      if (
        allOf.reduce((accumulator, currentValue) => {
          if (!currentValue?.oneOf) {
            return false;
          }
          return accumulator;
        }, false)
      ) {
        console.log("error");
        return { break: true };
      }
      return { ...oneOfPartial, allOf };
    })
    .map((oneOfPartial) => {
      if (oneOfPartial?.allOf) {
        return oneOfPartial.allOf;
      }
      return oneOfPartial;
    })
    .flat(Infinity);
  if (!oneOfWithNoRefs) {
    return { type: "any" };
  }
  if (oneOfWithNoRefs.find((a) => a?.break)) {
    console.log("break!");
    return { removed: false, schema };
  }
  return {
    removed: true,
    schema: mergeAllOfObjects(oneOfWithNoRefs, schemas, title),
  };
};
const removeSingleOneOf = (schemas) => {
  let removed = false;
  const schemas_ = Object.fromEntries(
    Object.entries(schemas).map((schemaNameAndEntry) => {
      const [schemaName, entry] = schemaNameAndEntry;
      if (removed) {
        return [schemaName, entry];
      }
      const result = removeOneOf(entry, schemas, schemaName);
      if (result.removed) {
        removed = true;
      }
      return [schemaName, result.schema];
    }),
  );
  return {
    removed,
    schemas: schemas_,
  };
};

const propertiesIntersection = (
  currentProperties,
  newProperties,
  title,
  schemas,
) => {
  const allPropertyKeys = uniq([
    ...Object.keys(currentProperties),
    ...Object.keys(newProperties),
  ]);
  return Object.fromEntries(
    allPropertyKeys.map((key) => {
      let p1 = currentProperties[key];
      let p2 = newProperties[key];
      if (p1?.allOf) {
        p1 = mergeAllOfObjects(getObjects(p1, schemas), schemas, title);
      }
      if (p2?.allOf) {
        p2 = mergeAllOfObjects(getObjects(p2, schemas), schemas, title);
      }
      if (p1?.oneOf) {
        p1 = removeOneOf(p1, schemas, p1.title).schema;
      }
      if (p2?.oneOf) {
        p2 = removeOneOf(p2, schemas, p2.title).schema;
      }
      // console.log(p1, p2);
      return [
        key,
        !p2
          ? p1
          : !p1
            ? p2
            : typeIntersection(
                p1,
                p2,
                title + upperFirst(camelCase(key)),
                schemas,
              ),
      ];
    }),
  );
};

const getObjects = (object, schemas) => {
  if (object.$ref) {
    const refObject = schemas[object.$ref.split("/").at(-1)];
    return [getObjects(refObject, schemas)];
  }
  if (object.oneOf) {
    return [removeOneOf(object, schemas, object.title || "").schema];
  }
  if (object.allOf) {
    return object.allOf
      .map((object) => getObjects(object, schemas))
      .flat(Infinity);
  }
  return [object];
};

const typeIntersection = (p1, p2, title, schemas) => {
  if (!p1) {
    return p1;
  }
  if (!p2) {
    return p2;
  }
  if (p1?.$ref && p2?.$ref && isDeepStrictEqual(p1, p2)) {
    return p1;
  }
  const p1Local = p1?.$ref ? schemas[p1.$ref.split("/").at(-1)] : p1;
  const p2Local = p2?.$ref ? schemas[p2.$ref.split("/").at(-1)] : p2;
  if (p1Local.oneOf && p2Local.oneOf) {
    return mergeAllOfObjects(
      [
        ...p1Local.oneOf
          .map((object) => getObjects(object, schemas))
          .flat(Infinity),
        ...p2Local.oneOf
          .map((object) => getObjects(object, schemas))
          .flat(Infinity),
      ],
      schemas,
      title,
    );
  }
  if (p1Local.oneOf) {
    if (p2Local.allOf) {
      return mergeAllOfObjects(
        [
          ...p1Local.oneOf
            .map((object) => getObjects(object, schemas))
            .flat(Infinity),
          ...p2Local.allOf
            .map((object) => getObjects(object, schemas))
            .flat(Infinity),
        ],
        schemas,
        title,
      );
    }
    return mergeAllOfObjects(
      [...p1Local.oneOf.map((object) => getObjects(object, schemas)), p2Local],
      schemas,
      title,
    );
  }
  if (p2Local.oneOf) {
    if (p1Local.allOf) {
      return mergeAllOfObjects(
        [
          ...p2Local.oneOf
            .map((object) => getObjects(object, schemas))
            .flat(Infinity),
          ...p1Local.allOf
            .map((object) => getObjects(object, schemas))
            .flat(Infinity),
        ],
        schemas,
        title,
      );
    }
    return mergeAllOfObjects(
      [
        ...p2Local.oneOf
          .map((object) => getObjects(object, schemas))
          .flat(Infinity),
        p1Local,
      ],
      schemas,
      title,
    );
  }
  if (
    (p1Local.allOf || p1Local.properties) &&
    (p2Local.allOf || p2Local.properties)
  ) {
    const allOf = [p1Local.allOf || p1Local, p2Local.allOf || p2Local].flat(
      Infinity,
    );
    return mergeAllOfObjects(allOf, schemas, title);
  }
  if (isDeepStrictEqual(p1, p2)) {
    return p1;
  }
  if (p1Local.type !== p2Local.type) {
    if (p2Local?.$ref === p1?.$ref) {
      return p1;
    }
    if (p1Local?.$ref === p2?.$ref) {
      return p2;
    }
    console.log("ERROR p1.type not equal to p2.type", p1Local, p2Local);
    return p1Local;
  }
  if (p1Local.type === "string") {
    let enum_;
    if (p1Local.enum?.length > 0 && p2Local.enum?.length > 0) {
      enum_ = uniq([p1Local.enum, p2Local.enum].flat(Infinity));
    } else {
      enum_ = undefined;
    }
    let default_;
    if (p1Local.default && p1Local.default === p2Local.default) {
      default_ = p1Local.default;
    }
    return omit(
      { type: "string", enum: enum_, default: default_ },
      !default_ && !enum_
        ? ["enum", "default"]
        : !enum_
          ? ["default"]
          : !default_
            ? ["default"]
            : [],
    );
  }
  const nullable = p1Local?.nullable || p2Local?.nullable;
  const descriptions = compact([
    ...(p1Local?.descriptions || []),
    ...(p1Local?.descriptions || []),
    p1Local?.description,
    p2Local?.description,
  ]);

  if (p1Local.type === "array") {
    return omit(
      {
        nullable,
        descriptions,
        type: "array",
        items: typeIntersection(
          p1Local.items,
          p2Local.items,
          title + "Item",
          schemas,
        ),
      },
      compact([nullable ? "nullable" : undefined]),
    );
  }
  return omit(
    { nullable, descriptions, type: p1Local.type },
    compact([nullable ? "nullable" : undefined]),
  );
};

const mergeAllOfObjects = (allOfs, schemas, title) => {
  if (allOfs.length === 1) {
    return allOfs[0];
  }
  const allAreObjectsLocal = allOfs
    .flat(Infinity)
    .map((object) => getObjects(object, schemas))
    .flat(Infinity);
  const areAllObjectsObjects = allAreObjectsLocal.reduce(
    (accumulator, currentValue) => {
      if (currentValue?.type === "object" || currentValue?.properties) {
        return accumulator;
      }
      return false;
    },
    true,
  );
  if (areAllObjectsObjects) {
    const result = allAreObjectsLocal.reduce((accumulator, currentValue) => {
      if (!accumulator) {
        return {
          type: "object",
          title,
          properties: currentValue?.properties || {},
          required: currentValue?.required || [],
        };
      }
      const properties = propertiesIntersection(
        accumulator.properties,
        currentValue?.properties || {},
        title,
        schemas,
      );
      const required = intersection(
        accumulator.required,
        currentValue?.required || [],
      );
      return { ...accumulator, properties, required };
    }, undefined);
    return omit(
      result,
      compact([
        result.required.length === 0 ? "required" : undefined,
        Object.keys(result.properties).length === 0 ? "properties" : undefined,
      ]),
    );
  }
  return allAreObjectsLocal
    .slice(1)
    .reduce(
      (accumulator, currentValue) =>
        typeIntersection(accumulator, currentValue, title, schemas),
      allAreObjectsLocal[0],
    );
};

export const removeAllOneOfs = (
  schemas,
  paths,
  parameters,
  languageOptions,
) => {
  let localSchemas = { ...schemas };
  do {
    const result = removeSingleOneOf({ ...localSchemas });
    if (JSON.stringify(localSchemas) === JSON.stringify(result.schemas)) {
      break;
    }
    localSchemas = result.schemas;
  } while (true);
  return cleanUpDescriptionsInEntireObject(
    removeNotUsedSchemas(
      { schemas: localSchemas, parameters },
      paths,
      languageOptions,
      {},
    ),
  );
};

export const cleanUpDescriptionsInEntireObject = (object: any) => {
  if (Array.isArray(object)) {
    return object.map((value) => cleanUpDescriptionsInEntireObject(value));
  }
  if (object instanceof Object) {
    if ("descriptions" in object) {
      const descriptions = uniq(object["descriptions"]);
      if (descriptions.length === 0) {
        return omit(object, "descriptions");
      }
      if (descriptions.length > 1) {
        console.log(
          colors.red("DESCRIPTIONS ARE NOT THE SAME:\n"),
          {
            descriptions,
          },
          "\n",
        );
      }
      return omit(
        { ...object, description: descriptions.join(" and ") },
        "descriptions",
      );
    }
    return Object.fromEntries(
      Object.entries(object).map((keyAndEntry) => {
        const [key, entry] = keyAndEntry;
        return [key, cleanUpDescriptionsInEntireObject(entry)];
      }),
    );
  }
  return object;
};
