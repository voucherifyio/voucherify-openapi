export const LOYALTIES_V2_PATH_PREFIX = "/v2/loyalties";

/** Schemas renamed on merge into reference to avoid v1 collisions. */
export const LOYALTIES_V2_SCHEMA_RENAMES_ON_MERGE: Record<string, string> = {
  MemberActivity: "LoyaltyV2MemberActivity",
  MemberActivitySource: "LoyaltyV2MemberActivitySource",
  BadRequest: "LoyaltyV2BadRequest",
};

/** Reverse map applied when extracting docs file from reference. */
export const LOYALTIES_V2_SCHEMA_RENAMES_ON_EXTRACT: Record<string, string> =
  Object.fromEntries(
    Object.entries(LOYALTIES_V2_SCHEMA_RENAMES_ON_MERGE).map(([from, to]) => [
      to,
      from,
    ]),
  );

/** v2 schemas skipped on merge — reference already defines these keys. */
export const LOYALTIES_V2_SCHEMAS_SKIP_ON_MERGE = new Set<string>();

export const LOYALTIES_V2_EXTRACT_INFO = {
  title: "Voucherify Loyalty v2 API",
  version: "2.0.0",
  description:
    "Complete OpenAPI specification for the Voucherify Loyalty v2 API.\nAll endpoints require the LOYALTY_V2 feature flag.\n\nCombined from per-domain specs: programs.yaml, members.yaml, program-operations.yaml, card-definitions.yaml, earning-rules.yaml, tier-structures.yaml, benefits.yaml, rewards.yaml, examine.yaml",
};

export const LOYALTIES_V2_EXTRACT_SERVERS = [
  {
    url: "{protocol}://{host}",
    variables: {
      protocol: {
        default: "https",
        enum: ["https", "http"],
      },
      host: {
        default: "api.voucherify.io",
      },
    },
  },
];

export const LOYALTIES_V2_EXTRACT_TAGS = [
  {
    name: "Programs",
    description:
      "Loyalty program CRUD, lifecycle management, program-scoped resource assignments (card definitions, earning rules, rewards, tier structures), member management (create, list, get, update, activate, deactivate, delete), membership retrieval (member + program + cards with tier progress, by customer ID, customer source ID, or member ID), card operations (points adjustment, pending points, expiring points, transactions), reward purchases, and activity history.",
  },
  {
    name: "Card definitions",
    description:
      "CRUD operations, lifecycle management, and activity history for card definitions. Card definitions describe the configuration for loyalty cards, including code generation, points expiration, earning/spending limits, pending points, refunds, and balance settings.",
  },
  {
    name: "Earning rules",
    description:
      "Manage earning rules that define how customers earn points or receive incentives based on triggers (events, segments, custom events). Includes CRUD, lifecycle, and activity history.",
  },
  {
    name: "Tier structures",
    description:
      "CRUD operations, lifecycle management, and activity history for tier structures. Includes nested tier definitions (create, list, update, delete) within tier structures. Tier structures define the tiering model for loyalty programs — how members qualify for and move between tiers.",
  },
  {
    name: "Benefits",
    description:
      "Manage benefit definitions (fixed points, proportional points, material, digital). Includes CRUD, lifecycle transitions, and activity history.",
  },
  {
    name: "Rewards",
    description:
      "CRUD, lifecycle operations, and activity history for reward definitions. Rewards can be material (product/SKU) or digital (discount coupons, gift vouchers).",
  },
  {
    name: "Examine",
    description:
      "Evaluation endpoints that estimate earning opportunities and reward availability for a customer across their loyalty program memberships, without side effects.",
  },
];

export const LOYALTIES_V2_EXTRACT_SECURITY = [
  { "X-App-Id": [], "X-App-Token": [] },
  { bearerAuth: [] },
];

export const LOYALTIES_V2_EXTRACT_SECURITY_SCHEMES = {
  "X-App-Id": {
    type: "apiKey",
    in: "header",
    name: "X-App-Id",
  },
  "X-App-Token": {
    type: "apiKey",
    in: "header",
    name: "X-App-Token",
  },
  bearerAuth: {
    type: "http",
    scheme: "bearer",
  },
};
