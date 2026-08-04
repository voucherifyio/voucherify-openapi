/**
 * `gem build` rejects file names longer than 100 bytes
 * (Gem::Package::TooLongFileName) and these titles produce longer ones. Titles
 * are generated from the schema path by fixSchemasTitles, so overriding them
 * here is the only place a shorter name survives a regeneration. The `Loyalty`
 * segment comes from the `loyalty` property and is redundant next to
 * `EarningRules`.
 */
const schemaTitleShortenings: Record<string, string> = {
  LoyaltiesEarningRulesCreateRequestBodyItemLoyaltyOrderItemsSubtotalAmountApplicableToItem: "LoyaltiesEarningRulesCreateRequestBodyItemOrderItemsSubtotalAmountApplicableToItem",
  LoyaltiesEarningRulesCreateResponseBodyLoyaltyOrderItemsSubtotalAmountApplicableToItem: "LoyaltiesEarningRulesCreateResponseBodyOrderItemsSubtotalAmountApplicableToItem",
  LoyaltiesEarningRulesDisableResponseBodyLoyaltyOrderItemsSubtotalAmountApplicableToItem: "LoyaltiesEarningRulesDisableResponseBodyOrderItemsSubtotalAmountApplicableToItem",
  LoyaltiesEarningRulesEnableResponseBodyLoyaltyOrderItemsSubtotalAmountApplicableToItem: "LoyaltiesEarningRulesEnableResponseBodyOrderItemsSubtotalAmountApplicableToItem",
  LoyaltiesEarningRulesUpdateRequestBodyLoyaltyOrderItemsSubtotalAmountApplicableToItem: "LoyaltiesEarningRulesUpdateRequestBodyOrderItemsSubtotalAmountApplicableToItem",
  LoyaltiesEarningRulesUpdateResponseBodyLoyaltyOrderItemsSubtotalAmountApplicableToItem: "LoyaltiesEarningRulesUpdateResponseBodyOrderItemsSubtotalAmountApplicableToItem",
};

const shortenRubySchemaTitles = (node: Record<string, any>) => {
  if (!node || typeof node !== "object") {
    return;
  }
  if (typeof node.title === "string" && schemaTitleShortenings[node.title]) {
    node.title = schemaTitleShortenings[node.title];
  }
  Object.values(node).forEach(shortenRubySchemaTitles);
};

export default shortenRubySchemaTitles;
