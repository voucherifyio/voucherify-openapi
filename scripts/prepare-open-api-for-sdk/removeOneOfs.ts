import {
  camelCase,
  intersection,
  isEqual,
  omit,
  uniq,
  upperFirst,
} from "lodash";
import { isDeepStrictEqual } from "util";

const removeSingleOneOf = (schemas) => {
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
      return { removed: false, schema };
    }
    const oneOf = schema["oneOf"].map(
      (data) => schemas[data.$ref?.split("/")?.at(-1)]
    );
    if (oneOf.find((item) => !item)) {
      return { type: "any" };
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
        // console.log(888, allOf);
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
      return { removed: false, schema };
    }
    if (oneOfWithNoRefs.find((a) => !a)) {
      console.log(123, oneOfWithNoRefs, schema);
    }
    return {
      removed: true,
      schema: mergeAllOfObjects(oneOfWithNoRefs, schemas, title),
    };
  };

  let removed = false;
  const schemas_ = Object.fromEntries(
    Object.entries(schemas).map((schemaNameAndEntry) => {
      const [schemaName, entry] = schemaNameAndEntry;
      if (removed) {
        // console.log(1423143);
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
      return [
        key,
        typeIntersection(p1, p2, title + upperFirst(camelCase(key)), schemas),
      ];
    })
  );
};

const typeIntersection = (p1, p2, title, schemas) => {
  if (!p1) {
    return p1;
  }
  if (!p2) {
    return p2;
  }
  const p1Local = p1?.$ref ? schemas[p1.$ref.split("/").at(-1)] : p1;
  const p2Local = p2?.$ref ? schemas[p2.$ref.split("/").at(-1)] : p2;
  if (p1Local.oneOf && p2Local.oneOf) {
    console.log(1);
    return mergeAllOfObjects(
      [...p1Local.oneOf, ...p2Local.oneOf],
      schemas,
      title
    );
  }
  if (p1Local.oneOf) {
    if (p2Local.allOf) {
      console.log(2);
      return mergeAllOfObjects(
        [...p1Local.oneOf, ...p2Local.allOf],
        schemas,
        title
      );
    }
    console.log(4);
    return mergeAllOfObjects([...p1Local.oneOf, p2Local], schemas, title);
  }
  if (p2Local.oneOf) {
    if (p1Local.allOf) {
      console.log(3);
      return mergeAllOfObjects(
        [...p2Local.oneOf, ...p1Local.allOf],
        schemas,
        title
      );
    }
    console.log(5);
    return mergeAllOfObjects([...p2Local.oneOf, p1Local], schemas, title);
  }
  if (
    (p1Local.allOf || p1Local.type === "object" || p1Local.properties) &&
    (p2Local.allOf || p2Local.type === "object" || p2Local.properties)
  ) {
    const allOf = [p1Local.allOf || p1Local, p2Local.allOf || p2Local].flat();
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
    console.log(
      p1Local.items,
      p2Local.items,
      typeIntersection(p1Local.items, p2Local.items, title + "Item", schemas)
    );
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
  const areAllObjectsObjects = allAreObjects.reduce(
    (accumulator, currentValue) => {
      if (currentValue?.type === "object" || currentValue?.properties) {
        return accumulator;
      }
      return false;
    },
    true
  );
  if (areAllObjectsObjects) {
    const result = {
      type: "object",
      title,
      properties: allAreObjects[0].properties || {},
      required: allAreObjects[0].required || [],
    };

    allAreObjects.slice(1).forEach((object) => {
      const objectProperties = object.properties || {};
      const objectRequired = object.required || [];
      result.properties = propertiesIntersection(
        result.properties,
        objectProperties,
        title,
        schemas
      );
      result.required = intersection(result.required, objectRequired);
    });
    return result;
  }
  if (
    !allAreObjects
      .slice(1)
      .reduce(
        (accumulator, currentValue) =>
          typeIntersection(accumulator, currentValue, title, schemas),
        allAreObjects[0]
      )
  ) {
    console.log(123, allAreObjects);
  }
  // console.log(
  //   123,
  //   allAreObjects
  //     .slice(1)
  //     .reduce(
  //       (accumulator, currentValue) =>
  //         typeIntersection(accumulator, currentValue, title, schemas),
  //       allAreObjects[0]
  //     )
  // );
  return allAreObjects
    .slice(1)
    .reduce(
      (accumulator, currentValue) =>
        typeIntersection(accumulator, currentValue, title, schemas),
      allAreObjects[0]
    );
};

export const removeAllOneOfs = (schemas) => {
  let localSchemas = { ...schemas };
  let result;
  let index = 0;
  do {
    result = removeSingleOneOf(localSchemas);
    localSchemas = result.schemas;
    index += 1;
    console.log(index);
  } while (result.removed);
  return localSchemas;
};
