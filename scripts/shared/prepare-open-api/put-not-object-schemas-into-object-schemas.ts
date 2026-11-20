export const putNotObjectSchemasIntoObjectSchemas = (schemas: any) => {
  const notObjectSchemas = Object.fromEntries(
    Object.entries(schemas).filter(([key, entry]) => {
      return (
        entry instanceof Object && "type" in entry && entry.type !== "object"
      );
    })
  );
  const notObjectSchemasIds = Object.keys(notObjectSchemas);

  const replaceNotObjectSchemas = (partialSchema: any) => {
    if (
      partialSchema?.allOf?.length === 1 &&
      notObjectSchemasIds.includes(
        partialSchema?.allOf?.[0]?.$ref?.split?.("/")?.at?.(-1)
      )
    ) {
      return notObjectSchemas[partialSchema.allOf[0].$ref.split("/").at(-1)];
    }
    if (
      partialSchema?.$ref &&
      notObjectSchemasIds.includes(partialSchema.$ref?.split?.("/")?.at?.(-1))
    ) {
      return notObjectSchemas[partialSchema.$ref.split("/").at(-1)];
    }
    if (Array.isArray(partialSchema)) {
      return partialSchema.map(replaceNotObjectSchemas);
    }
    if (partialSchema instanceof Object) {
      return Object.fromEntries(
        Object.entries(partialSchema).map((keyAndEntry) => {
          const [key, entry] = keyAndEntry;
          return [key, replaceNotObjectSchemas(entry)];
        })
      );
    }
    return partialSchema;
  };

  return Object.fromEntries(
    Object.entries(schemas).map((keyAndEntry) => {
      const [key, entry] = keyAndEntry;
      return [key, replaceNotObjectSchemas(entry)];
    })
  );
};
