import referenceOpenApi from "../../../reference/OpenAPI.json";
import { getPathsWithoutDeprecated } from "./get-paths-without-deprecated";
import { mergeMultipleOkResponsesIntoOne } from "./merge-multiple-ok-responses-into-one";

const V2_LOYALTY_COMBINED_SCHEMA =
  /^LoyaltiesProgramsMembers(RewardsPurchases|OrdersPayments)CreateCombinedResponseBody$/;

describe("getPathsWithoutDeprecated", () => {
  test("does not expose v2 loyalty combined response schemas to SDK prep", () => {
    const { paths, newSchemas } = getPathsWithoutDeprecated(
      referenceOpenApi.paths,
      "ruby",
    );

    expect(Object.keys(paths).some((path) => path.startsWith("/v2/loyalties/"))).toBe(
      false,
    );

    const leakedCombinedSchemas = Object.keys(newSchemas).filter((name) =>
      V2_LOYALTY_COMBINED_SCHEMA.test(name),
    );
    expect(leakedCombinedSchemas).toEqual([]);
  });

  test("merge on unfiltered paths still creates v2 combined schemas (regression guard)", () => {
    const { newSchemas } = mergeMultipleOkResponsesIntoOne(referenceOpenApi.paths);

    expect(Object.keys(newSchemas)).toEqual(
      expect.arrayContaining([
        "LoyaltiesProgramsMembersRewardsPurchasesCreateCombinedResponseBody",
        "LoyaltiesProgramsMembersOrdersPaymentsCreateCombinedResponseBody",
      ]),
    );
  });
});
