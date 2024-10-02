import { removeNotYetRefactoredPaths } from "../helpers/remove-not-yet-refactored-paths";
import openAPIContent from "../../reference/OpenAPI.json";
import { mergeMultipleOkResponsesIntoOne } from "./merge-multiple-ok-responses-into-one";

export const getPathsWithoutDeprecated = (
  allPaths: any,
  lng?: string,
  use2XX?: boolean,
) => {
  const { paths, newSchemas } = mergeMultipleOkResponsesIntoOne(
    allPaths,
    use2XX,
  );
  return {
    paths: removeNotYetRefactoredPaths(paths, lng),
    newSchemas,
  };
};
