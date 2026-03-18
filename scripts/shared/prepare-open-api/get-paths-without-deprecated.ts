import { removeNotYetRefactoredPaths } from "../remove-not-yet-refactored-paths";
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
