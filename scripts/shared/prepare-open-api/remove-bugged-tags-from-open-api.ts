export const removeBuggedTagsFromOpenAPIPaths = (paths: any) => {
  Object.keys(paths).forEach((key) => {
    Object.keys(paths[key]).forEach((method) => {
      if (method === "parameters") {
        paths[key]["parameters"] = paths[key]["parameters"].map(
          (parameter: any) => {
            let description = parameter.description;

            if (!description) {
              return parameter;
            }

            parameter.description = fixDescription(description);

            return parameter;
          },
        );
      }

      if (paths[key][method]["parameters"]?.length ?? 0 > 0) {
        paths[key][method]["parameters"] = paths[key][method]["parameters"].map(
          (parameter: any) => {
            let description = parameter.description;

            if (!description) {
              return parameter;
            }

            parameter.description = fixDescription(description);

            return parameter;
          },
        );
      }

      let description = paths[key][method].description;
      // let summary = paths[key][method].summary;
      let requestBodyDescription =
        paths[key][method]["requestBody"]?.description;

      if (description) {
        paths[key][method].description = fixDescription(description);
      }

      // if (summary) {
      //   paths[key][method].summary = fixDescription(summary);
      // }

      if (requestBodyDescription) {
        paths[key][method]["requestBody"].description = fixDescription(
          requestBodyDescription,
        );
      }
    });
  });

  return paths;
};

export const removeBuggedTagsFromOpenAPIParameters = (parameters: any) => {
  Object.keys(parameters).forEach((key: string) => {
    let description = parameters[key].description;

    if (!description) {
      return;
    }

    parameters[key].description = fixDescription(description);
  });

  return parameters;
};

const fixDescription = (description: string) => {
  description = removeUnnecessarilyHtmlTag(description);
  description = removeTable(description);
  description = reduceMultipleAndWrongNewLineElements(description);
  description = removeLinks(description);
  description = replaceHtmlEntitiesWithValidChar(description);
  description = removeSpecialHardcodedCases(description);

  return description;
};

const removeUnnecessarilyHtmlTag = (description: string) => {
  return description
    .replace(/```.*?```/gs, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/##/g, "#");
};

const removeTable = (description: string) => {
  return description.replace(/\|.*\|/g, "");
};

const reduceMultipleAndWrongNewLineElements = (description: string) => {
  return description
    .replace(/(?<!\r)\n\|/g, "\n")
    .replace(/(?<!\r)\n>/g, "\n")
    .replace(/(?<!\r)\n\n\n/g, "\n")
    .replace(/(?<!\r)\n\n/g, "\n")
    .replace(/(?<!\r)\n/g, "\n");
};

const removeLinks = (description: string) => {
  const refMatches = description.match(/\[(.*?)\]\(ref:(.*?)\)/g);

  if (refMatches && refMatches.length > 0) {
    refMatches.forEach((match: any) => {
      const replacement = match.match(/\[([^\]]+)\]/);
      description = description.replace(
        match,
        replacement ? replacement[1] : "",
      );
    });
  }

  const docMatches = description.match(/\[(.*?)\]\(doc:(.*?)\)/g);

  if (docMatches && docMatches.length > 0) {
    docMatches.forEach((match: any) => {
      const replacement = match.match(/\[([^\]]+)\]/);
      description = description.replace(
        match,
        replacement ? replacement[1] : "",
      );
    });
  }

  return description;
};

const replaceHtmlEntitiesWithValidChar = (description: string) => {
  return description
    .replace(/"/g, "")
    .replace(/`/g, "")
    .replace(/'/g, "")
    .replace(/=/g, " ");
};

const removeSpecialHardcodedCases = (description: string) => {
  return description.replace(
    /Curl Example.*?This API request starts/gs,
    "This API request starts",
  );
};
