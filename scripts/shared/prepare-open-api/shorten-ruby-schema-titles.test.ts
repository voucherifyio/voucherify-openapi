import shortenRubySchemaTitles, {
  shortenRubySchemaTitle,
} from "./shorten-ruby-schema-titles";

const titleToRubyBasename = (title: string) => {
  const compact = title.replaceAll(" ", "");
  const snake = compact
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .toLowerCase();
  return `${snake}.rb`;
};

describe("shortenRubySchemaTitles", () => {
  it("keeps legacy Loyalty earning-rule shortenings under 100 bytes", () => {
    const title =
      "LoyaltiesEarningRulesCreateRequestBodyItemLoyaltyOrderItemsSubtotalAmountApplicableToItem";
    const out = shortenRubySchemaTitle(title);
    expect(titleToRubyBasename(out).length).toBeLessThanOrEqual(100);
    expect(out).toBe(
      "LoyaltiesEarningRulesCreateRequestBodyItemOrderItemsSubtotalAmountApplicableToItem",
    );
  });

  it("abbreviates Loyalty v2 combined-purchase nested titles under 100 bytes", () => {
    const title =
      "LoyaltiesProgramsMembersRewardsPurchasesCreateCombinedResponseBodyTransactionDetailsResultDigitalLoyaltyCardPoints";
    const out = shortenRubySchemaTitle(title);
    expect(titleToRubyBasename(out).length).toBeLessThanOrEqual(100);
    expect(out).toContain("LpmRewPurchCcrb");
  });

  it("walks nested titles in schemas", () => {
    const schemas = {
      Wrapper: {
        title: "Wrapper",
        properties: {
          nested: {
            title:
              "LoyaltiesProgramsMembersOrdersPaymentsCreateCombinedResponseBodyTransactionDetailsRejectionDetails",
          },
        },
      },
    };
    shortenRubySchemaTitles(schemas);
    expect(
      titleToRubyBasename(schemas.Wrapper.properties.nested.title).length,
    ).toBeLessThanOrEqual(100);
  });
});
