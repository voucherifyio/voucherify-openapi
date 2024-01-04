import {
  camelCase,
  compact,
  intersection,
  isEqual,
  omit,
  uniq,
  upperFirst,
} from "lodash";
import { isDeepStrictEqual } from "util";

const checkProperties = (properties, title, schemas) => {
  return Object.fromEntries(
    Object.entries(properties).map((propertyNameAndEntry) => {
      const [propertyName, entry] = propertyNameAndEntry as any;
      if (entry?.oneOf) {
        return [
          propertyName,
          removeOneOf(
            entry,
            schemas,
            title + upperFirst(camelCase(propertyName))
          ),
        ];
      }
      if (entry?.properties) {
        return [
          propertyName,
          {
            type: "object",
            properties: checkProperties(
              (entry as any).properties,
              title,
              schemas
            ),
          },
        ];
      }
      if (entry.items?.oneOf) {
        return [
          propertyName,
          {
            type: "array",
            items: removeOneOf(
              entry.items,
              schemas,
              title + upperFirst(camelCase(propertyName)) + "Item"
            ),
          },
        ];
      }
      return [propertyName, entry];
    })
  );
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
          title
        );
        if (_removed) {
          removed = true;
        }
        return schema;
      }),
    };
  }
  if (!(schema instanceof Object) || !("oneOf" in schema)) {
    if (schema.properties) {
      console.log(88);
      return {
        removed: false,
        schema: {
          type: "object",
          properties: checkProperties(schema.properties, title, schemas),
        },
      };
    }
    return { removed: false, schema };
  }
  const oneOf = schema["oneOf"].map((data) =>
    data.$ref ? schemas[data.$ref?.split("/")?.at(-1)] : "any"
  );
  if (oneOf.find((item) => item === "any")) {
    return { removed: true, schema: { title: "Any", type: "any" } };
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
      const allOf = oneOfPartial["allOf"].map((data) => {
        if (data.$ref?.split("/")?.at(-1)) {
          return schemas[data.$ref?.split("/")?.at(-1)];
        }
        return data;
      });
      if (
        allOf.reduce((accumulator, currentValue) => {
          return !!currentValue?.oneOf;
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
    .flat();
  if (!oneOfWithNoRefs) {
    return { type: "any" };
  }
  if (oneOfWithNoRefs.find((a) => a?.break)) {
    console.log(66);
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
    })
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
  schemas
) => {
  const allPropertyKeys = uniq([
    ...Object.keys(currentProperties),
    ...Object.keys(newProperties),
  ]);
  return Object.fromEntries(
    allPropertyKeys.map((key) => {
      const p1 = currentProperties[key];
      const p2 = newProperties[key];
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
              schemas
            ),
      ];
    })
  );
};

const getObject = (object, schemas) => {
  if (object.$ref) {
    return schemas[object.$ref.split("/").at(-1)];
  }
  return object;
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
        ...p1Local.oneOf.map((object) => getObject(object, schemas)),
        ...p2Local.oneOf.map((object) => getObject(object, schemas)),
      ],
      schemas,
      title
    );
  }
  if (p1Local.oneOf) {
    if (p2Local.allOf) {
      return mergeAllOfObjects(
        [
          ...p1Local.oneOf.map((object) => getObject(object, schemas)),
          ...p2Local.allOf.map((object) => getObject(object, schemas)),
        ],
        schemas,
        title
      );
    }
    return mergeAllOfObjects(
      [...p1Local.oneOf.map((object) => getObject(object, schemas)), p2Local],
      schemas,
      title
    );
  }
  if (p2Local.oneOf) {
    if (p1Local.allOf) {
      return mergeAllOfObjects(
        [
          ...p2Local.oneOf.map((object) => getObject(object, schemas)),
          ...p1Local.allOf.map((object) => getObject(object, schemas)),
        ],
        schemas,
        title
      );
    }
    return mergeAllOfObjects(
      [...p2Local.oneOf.map((object) => getObject(object, schemas)), p1Local],
      schemas,
      title
    );
  }
  if (
    (p1Local.allOf || p1Local.type === "object" || p1Local.properties) &&
    (p2Local.allOf || p2Local.type === "object" || p2Local.properties)
  ) {
    const allOf = [p1Local.allOf || p1Local, p2Local.allOf || p2Local].flat();
    //nie tu
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
    let enum_ = p1Local.enum || p2Local.enum || undefined;
    if (p1Local.enum && p2Local.enum) {
      enum_ = uniq([p1Local.enum, p2Local.enum].flat());
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
        : []
    );
  }
  if (p1Local.type === "array") {
    return {
      type: "array",
      items: typeIntersection(
        p1Local.items,
        p2Local.items,
        title + "Item",
        schemas
      ),
    };
  }
  return { type: p1Local.type };
};

const mergeAllOfObjects = (allAreObjects, schemas, title) => {
  if (allAreObjects.length === 1) {
    return allAreObjects[0];
  }
  const allAreObjectsLocal = allAreObjects.map((object) =>
    getObject(object, schemas)
  );
  const areAllObjectsObjects = allAreObjectsLocal.reduce(
    (accumulator, currentValue) => {
      if (currentValue?.type === "object" || currentValue?.properties) {
        return accumulator;
      }
      return false;
    },
    true
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
        schemas
      );
      const required = intersection(
        accumulator.required,
        currentValue?.required || []
      );
      return { ...accumulator, properties, required };
    }, undefined);
    return omit(
      result,
      compact([
        result.required.length === 0 ? "required" : undefined,
        Object.keys(result.properties).length === 0 ? "properties" : undefined,
      ])
    );
  }
  if (
    !allAreObjectsLocal
      .slice(1)
      .reduce(
        (accumulator, currentValue) =>
          typeIntersection(accumulator, currentValue, title, schemas),
        allAreObjectsLocal[0]
      )
  ) {
    console.log(123, allAreObjectsLocal);
  }
  return allAreObjectsLocal
    .slice(1)
    .reduce(
      (accumulator, currentValue) =>
        typeIntersection(accumulator, currentValue, title, schemas),
      allAreObjectsLocal[0]
    );
};

export const removeAllOneOfs = (schemas) => {
  let localSchemas = { ...schemas };
  let result;
  let index = 0;
  do {
    result = removeSingleOneOf({ ...localSchemas });
    if (JSON.stringify(localSchemas) === JSON.stringify(result.schemas)) {
      break;
    }

    localSchemas = result.schemas;
    index += 1;
    console.log(index);
  } while (true);
  return localSchemas;
};
