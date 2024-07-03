import { removeNotYetRefactoredPaths } from "./remove-not-yet-refactored-paths";
import openAPIContent from "../../reference/OpenAPI.json";
import { mergeMultipleOkResponsesIntoOne } from "./merge-multiple-ok-responses-into-one";

export const getPathsWithoutDeprecated = (
  allPaths: any,
  okResponseMustBeOnlyOne?: true,
  lng?: string,
) => {
  if (!okResponseMustBeOnlyOne) {
    return {
      paths: removeNotYetRefactoredPaths(openAPIContent.paths, lng),
      newSchemas: {},
    };
  }
  const { paths, newSchemas } = mergeMultipleOkResponsesIntoOne(allPaths);
  return {
    paths: removeNotYetRefactoredPaths(paths, lng),
    newSchemas,
  };
};
