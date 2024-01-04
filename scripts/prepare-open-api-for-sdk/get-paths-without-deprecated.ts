import { removedDeprecatedPaths } from "./removed-deprecated-paths";
import openAPIContent from "../../reference/OpenAPI.json";
import { mergeMultipleOkResponsesIntoOne } from "./merge-multiple-ok-responses-into-one";

export const getPathsWithoutDeprecated = (
  allPaths: any,
  okResponseMustBeOnlyOne?: true
) => {
  if (!okResponseMustBeOnlyOne) {
    return {
      paths: removedDeprecatedPaths(openAPIContent.paths),
      newSchemas: {},
    };
  }
  const { paths, newSchemas } = mergeMultipleOkResponsesIntoOne(allPaths);
  return {
    paths: removedDeprecatedPaths(paths),
    newSchemas,
  };
};
