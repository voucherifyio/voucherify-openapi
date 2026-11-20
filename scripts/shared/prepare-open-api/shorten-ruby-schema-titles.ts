/**
 * `gem build` rejects file names longer than 100 bytes
 * (Gem::Package::TooLongFileName). OpenAPI Generator turns schema `title`
 * into `snake_case.rb` under `lib/VoucherifySdk/models/`. Titles are produced
 * by fixSchemasTitles from the schema path, so shortening here is the only
 * place a shorter name survives regeneration.
 *
 * Explicit map entries win. Anything still over the limit gets deterministic
 * segment abbreviations, then a short hash suffix if needed.
 */
import { createHash } from "crypto";

const MAX_RUBY_BASENAME = 100; // including ".rb"

/** Hand-tuned shortenings kept for stable public class names across releases. */
const schemaTitleShortenings: Record<string, string> = {
  LoyaltiesEarningRulesCreateRequestBodyItemLoyaltyOrderItemsSubtotalAmountApplicableToItem:
    "LoyaltiesEarningRulesCreateRequestBodyItemOrderItemsSubtotalAmountApplicableToItem",
  LoyaltiesEarningRulesCreateResponseBodyLoyaltyOrderItemsSubtotalAmountApplicableToItem:
    "LoyaltiesEarningRulesCreateResponseBodyOrderItemsSubtotalAmountApplicableToItem",
  LoyaltiesEarningRulesDisableResponseBodyLoyaltyOrderItemsSubtotalAmountApplicableToItem:
    "LoyaltiesEarningRulesDisableResponseBodyOrderItemsSubtotalAmountApplicableToItem",
  LoyaltiesEarningRulesEnableResponseBodyLoyaltyOrderItemsSubtotalAmountApplicableToItem:
    "LoyaltiesEarningRulesEnableResponseBodyOrderItemsSubtotalAmountApplicableToItem",
  LoyaltiesEarningRulesUpdateRequestBodyLoyaltyOrderItemsSubtotalAmountApplicableToItem:
    "LoyaltiesEarningRulesUpdateRequestBodyOrderItemsSubtotalAmountApplicableToItem",
  LoyaltiesEarningRulesUpdateResponseBodyLoyaltyOrderItemsSubtotalAmountApplicableToItem:
    "LoyaltiesEarningRulesUpdateResponseBodyOrderItemsSubtotalAmountApplicableToItem",
};

const SEGMENT_ABBREVIATIONS: [string, string][] = [
  [
    "LoyaltiesProgramsMembersRewardsPurchasesCreateCombinedResponseBody",
    "LpmRewPurchCcrb",
  ],
  [
    "LoyaltiesProgramsMembersOrdersPaymentsCreateCombinedResponseBody",
    "LpmOrdPayCcrb",
  ],
  [
    "LoyaltiesPointsExpirationExportCreateResponseBodyParametersFilters",
    "LpeExportRespFilters",
  ],
  [
    "LoyaltiesPointsExpirationExportCreateRequestBodyParametersFilters",
    "LpeExportReqFilters",
  ],
  [
    "CampaignsTransactionsExportCreateResponseBodyParametersFilters",
    "CampTxnExportRespFilters",
  ],
  [
    "ManagementProjectsStackingRulesCreateResponseBodyApplicableRedeemablesCategoryLimitsEntry",
    "MgmtStackRulesCreateRespCatLimitsEntry",
  ],
  [
    "ManagementProjectsStackingRulesUpdateResponseBodyApplicableRedeemablesCategoryLimitsEntry",
    "MgmtStackRulesUpdateRespCatLimitsEntry",
  ],
  [
    "ManagementProjectsStackingRulesCreateRequestBodyApplicableRedeemablesCategoryLimitsEntry",
    "MgmtStackRulesCreateReqCatLimitsEntry",
  ],
  [
    "ManagementProjectsStackingRulesUpdateRequestBodyApplicableRedeemablesCategoryLimitsEntry",
    "MgmtStackRulesUpdateReqCatLimitsEntry",
  ],
  [
    "LoyaltiesEarningRulesCreateRequestBodyItemLoyaltyOrderItemsSubtotalAmountApplicableTo",
    "LoyEarnRulesCreateReqItemOrderItemsSubtotalApplicableTo",
  ],
  ["DigitalLoyaltyCardPoints", "DigLcPoints"],
  ["TransactionDetails", "TxDetails"],
  ["CreateCombinedResponseBody", "Ccrb"],
];

const titleToRubyBasename = (title: string) => {
  const compact = title.replaceAll(" ", "");
  const snake = compact
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .toLowerCase();
  return `${snake}.rb`;
};

const abbreviateTitle = (title: string) => {
  let next = title.replaceAll(" ", "");
  for (const [from, to] of SEGMENT_ABBREVIATIONS) {
    next = next.split(from).join(to);
  }
  return next;
};

const forceFitTitle = (original: string, candidate: string) => {
  let next = candidate;
  if (titleToRubyBasename(next).length <= MAX_RUBY_BASENAME) {
    return next;
  }
  const hash = createHash("sha1")
    .update(original.replaceAll(" ", ""))
    .digest("hex")
    .slice(0, 8);
  const suffix = `X${hash}`;
  while (
    titleToRubyBasename(next + suffix).length > MAX_RUBY_BASENAME &&
    next.length > 8
  ) {
    next = next.slice(0, -1);
  }
  return `${next}${suffix}`;
};

export const shortenRubySchemaTitle = (title: string) => {
  const compact = title.replaceAll(" ", "");
  const mapped = schemaTitleShortenings[compact] ?? compact;
  if (titleToRubyBasename(mapped).length <= MAX_RUBY_BASENAME) {
    return mapped === compact ? title : mapped;
  }
  const abbreviated = abbreviateTitle(mapped);
  const fitted = forceFitTitle(compact, abbreviated);
  return fitted;
};

const shortenRubySchemaTitles = (node: Record<string, any>) => {
  if (!node || typeof node !== "object") {
    return;
  }
  if (typeof node.title === "string") {
    node.title = shortenRubySchemaTitle(node.title);
  }
  Object.values(node).forEach(shortenRubySchemaTitles);
};

export default shortenRubySchemaTitles;
