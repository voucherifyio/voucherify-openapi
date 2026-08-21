import { removeNotYetRefactoredPaths } from "../remove-not-yet-refactored-paths";
import { mergeMultipleOkResponsesIntoOne } from "./merge-multiple-ok-responses-into-one";

export const getPathsWithoutDeprecated = (
  allPaths: any,
  lng?: string,
  use2XX?: boolean,
) => {
  // Filter to SDK-published paths before merging 2xx responses. Otherwise
  // mergeMultipleOkResponsesIntoOne creates *CombinedResponseBody schemas for
  // paths outside getTakeList (e.g. /v2/loyalties/*), which leak into SDK prep
  // via the newSchemas seed passed to removeNotUsedSchemas.
  const sdkPaths = removeNotYetRefactoredPaths(allPaths, lng);
  const { paths, newSchemas } = mergeMultipleOkResponsesIntoOne(
    sdkPaths,
    use2XX,
  );
  return {
    paths,
    newSchemas,
  };
};
