import { removeNotYetRefactoredPaths } from "../helpers/remove-not-yet-refactored-paths";
import openAPIContent from "../../reference/OpenAPI.json";
import { mergeMultipleOkResponsesIntoOne } from "./merge-multiple-ok-responses-into-one";

export const getPathsWithoutDeprecated = (allPaths: any, lng?: string) => {
  const { paths, newSchemas } = mergeMultipleOkResponsesIntoOne(allPaths);
  return {
    paths: removeNotYetRefactoredPaths(paths, lng),
    newSchemas,
  };
};
