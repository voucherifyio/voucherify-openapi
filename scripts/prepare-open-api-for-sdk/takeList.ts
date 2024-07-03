export const takeList = (
  lng?: string,
): { endpoint: string; methods: string[] }[] => {
  if (lng === "ruby") {
    return [
      { endpoint: "/v1/publications", methods: ["get", "post"] },
      { endpoint: "/v1/qualifications", methods: ["post"] },
      { endpoint: "/v1/validations", methods: ["post"] },
      { endpoint: "/v1/redemptions", methods: ["get", "post"] },
      { endpoint: "/v1/redemptions/{redemptionId}", methods: ["get"] },
      { endpoint: "/v1/vouchers/{code}/redemption", methods: ["get"] },
      {
        endpoint: "/v1/redemptions/{redemptionId}/rollback",
        methods: ["post"],
      },
      {
        endpoint: "/v1/redemptions/{parentRedemptionId}/rollbacks",
        methods: ["post"],
      },
      { endpoint: "/v1/vouchers/{code}", methods: ["get"] },
      { endpoint: "/v1/vouchers/{code}/enable", methods: ["post"] },
      { endpoint: "/v1/vouchers/{code}/disable", methods: ["post"] },
      { endpoint: "/v1/vouchers/{code}/balance", methods: ["post"] },
      { endpoint: "/v1/vouchers/{code}/transactions", methods: ["get"] },
      {
        endpoint: "/v1/vouchers/{code}/transactions/export",
        methods: ["post"],
      },
      { endpoint: "/v1/vouchers/importCSV", methods: ["post"] },
      { endpoint: "/v1/campaigns", methods: ["post", "get"] },
      {
        endpoint: "/v1/campaigns/{campaignId}",
        methods: ["get", "put", "delete"],
      },
      { endpoint: "/v1/campaigns/{campaignId}/vouchers", methods: ["post"] },
      {
        endpoint: "/v1/campaigns/{campaignId}/vouchers/{code}",
        methods: ["post"],
      },
      { endpoint: "/v1/campaigns/{campaignId}/import", methods: ["post"] },
      { endpoint: "/v1/campaigns/{campaignId}/importCSV", methods: ["post"] },
      { endpoint: "/v1/campaigns/{campaignId}/enable", methods: ["post"] },
      { endpoint: "/v1/campaigns/{campaignId}/disable", methods: ["post"] },
      { endpoint: "/v1/promotions/{campaignId}/tiers", methods: ["get"] },
      { endpoint: "/v1/promotions/tiers/{promotionTierId}", methods: ["get"] },
      {
        endpoint: "/v1/promotions/tiers/{promotionTierId}/enable",
        methods: ["post"],
      },
      {
        endpoint: "/v1/promotions/tiers/{promotionTierId}/disable",
        methods: ["post"],
      },
      { endpoint: "/v1/promotions/stacks", methods: ["get"] },
      {
        endpoint: "/v1/promotions/{campaignId}/stacks",
        methods: ["get", "post"],
      },
      {
        endpoint: "/v1/promotions/{campaignId}/stacks/{stackId}",
        methods: ["get", "put", "delete"],
      },
      {
        endpoint: "/v1/rewards/{rewardId}/assignments",
        methods: ["get", "post"],
      },
      {
        endpoint: "/v1/rewards/{rewardId}/assignments/{assignmentId}",
        methods: ["put", "delete", "get"],
      },
      { endpoint: "/v1/loyalties/{campaignId}", methods: ["delete"] },
      {
        endpoint: "/v1/loyalties/{campaignId}/members/{memberId}/balance",
        methods: ["post"],
      },
      {
        endpoint: "/v1/loyalties/members/{memberId}/balance",
        methods: ["post"],
      },
      {
        endpoint: "/v1/loyalties/{campaignId}/members/{memberId}/transfers",
        methods: ["post"],
      },
      {
        endpoint: "/v1/loyalties/{campaignId}/members/{memberId}/transactions",
        methods: ["get"],
      },
      {
        endpoint: "/v1/loyalties/members/{memberId}/transactions",
        methods: ["get"],
      },
      {
        endpoint: "/v1/loyalties/members/{memberId}/transactions/export",
        methods: ["post"],
      },
      {
        endpoint:
          "/v1/loyalties/{campaignId}/members/{memberId}/transactions/export",
        methods: ["post"],
      },
      {
        endpoint:
          "/v1/loyalties/{campaignId}/members/{memberId}/points-expiration",
        methods: ["get"],
      },
      {
        endpoint: "/v1/loyalties/{campaignId}/earning-rules/{earningRuleId}",
        methods: ["get"],
      },
      {
        endpoint:
          "/v1/loyalties/{campaignId}/earning-rules/{earningRuleId}/enable",
        methods: ["post"],
      },
      {
        endpoint:
          "/v1/loyalties/{campaignId}/earning-rules/{earningRuleId}/disable",
        methods: ["post"],
      },
      {
        endpoint: "/v1/loyalties/members/{memberId}/rewards",
        methods: ["get"],
      },
      {
        endpoint:
          "/v1/loyalties/{campaignId}/reward-assignments/{assignmentId}/reward",
        methods: ["get"],
      },
      {
        endpoint:
          "/v1/loyalties/{campaignId}/reward-assignments/{assignmentId}",
        methods: ["get"],
      },
      {
        endpoint: "/v1/loyalties/{campaignId}/rewards/{assignmentId}",
        methods: ["get", "delete"],
      },
      {
        endpoint: "/v1/loyalties/{campaignId}/members/{memberId}/redemption",
        methods: ["post"],
      },
      {
        endpoint: "/v1/loyalties/members/{memberId}/redemption",
        methods: ["post"],
      },
      {
        endpoint: "/v1/loyalties/{campaignId}/tiers",
        methods: ["get", "post"],
      },
      {
        endpoint: "/v1/loyalties/{campaignId}/tiers/{loyaltyTierId}",
        methods: ["get"],
      },
      { endpoint: "/v1/loyalties/members/{memberId}/tiers", methods: ["get"] },
      {
        endpoint:
          "/v1/loyalties/{campaignId}/tiers/{loyaltyTierId}/earning-rules",
        methods: ["get"],
      },
      {
        endpoint: "/v1/loyalties/{campaignId}/tiers/{loyaltyTierId}/rewards",
        methods: ["get"],
      },
      { endpoint: "/v1/customers", methods: ["get", "post"] },
      {
        endpoint: "/v1/customers/{customerId}",
        methods: ["get", "delete", "put"],
      },
      {
        endpoint: "/v1/customers/{customerId}/permanent-deletion",
        methods: ["post"],
      },
      { endpoint: "/v1/customers/importCSV", methods: ["post"] },
      { endpoint: "/v1/customers/bulk/async", methods: ["post"] },
      { endpoint: "/v1/customers/metadata/async", methods: ["post"] },
      { endpoint: "/v1/customers/{customerId}/consents", methods: ["put"] },
      { endpoint: "/v1/customers/{customerId}/activities", methods: ["get"] },
      { endpoint: "/v1/customers/{customerId}/segments", methods: ["get"] },
      { endpoint: "/v1/orders", methods: ["get", "post"] },
      { endpoint: "/v1/orders/{orderId}", methods: ["get", "put"] },
      { endpoint: "/v1/orders/import", methods: ["post"] },
      { endpoint: "/v1/orders/export", methods: ["post"] },
      { endpoint: "/v1/products", methods: ["get", "post"] },
      {
        endpoint: "/v1/products/{productId}",
        methods: ["get", "put", "delete"],
      },
      { endpoint: "/v1/products/bulk/async", methods: ["post"] },
      { endpoint: "/v1/products/metadata/async", methods: ["post"] },
      { endpoint: "/v1/skus/{skuId}", methods: ["get"] },
      { endpoint: "/v1/products/{productId}/skus", methods: ["get", "post"] },
      {
        endpoint: "/v1/products/{productId}/skus/{skuId}",
        methods: ["put", "delete"],
      },
      { endpoint: "/v1/products/importCSV", methods: ["post"] },
      { endpoint: "/v1/skus/importCSV", methods: ["post"] },
      { endpoint: "/v1/product-collections", methods: ["get", "post"] },
      {
        endpoint: "/v1/product-collections/{productCollectionId}",
        methods: ["get", "delete"],
      },
      {
        endpoint: "/v1/product-collections/{productCollectionId}/products",
        methods: ["get"],
      },
      { endpoint: "/v1/validation-rules", methods: ["get", "post"] },
      {
        endpoint: "/v1/validation-rules/{validationRuleId}",
        methods: ["get", "put", "delete"],
      },
      { endpoint: "/v1/validation-rules-assignments", methods: ["get"] },
      {
        endpoint: "/v1/validation-rules/{validationRuleId}/assignments",
        methods: ["get", "post"],
      },
      {
        endpoint:
          "/v1/validation-rules/{validationRuleId}/assignments/{assignmentId}",
        methods: ["delete"],
      },
      { endpoint: "/v1/events", methods: ["post"] },
      { endpoint: "/v1/exports", methods: ["post", "get"] },
      { endpoint: "/v1/exports/{exportId}", methods: ["get", "delete"] },
      { endpoint: "/v1/exports/{export_Id}", methods: ["get"] },
      { endpoint: "/v1/categories", methods: ["get", "post"] },
      {
        endpoint: "/v1/categories/{categoryId}",
        methods: ["get", "delete", "put"],
      },
      { endpoint: "/client/v1/qualifications", methods: ["post"] },
      { endpoint: "/client/v1/redemptions", methods: ["post"] },
      { endpoint: "/client/v1/validations", methods: ["post"] },
      {
        endpoint: "/client/v1/customers/{customerId}/consents",
        methods: ["put"],
      },
      { endpoint: "/client/v1/events", methods: ["post"] },
    ];
  }
  return [
    { endpoint: "/v1/publications", methods: ["get", "post"] },
    { endpoint: "/v1/qualifications", methods: ["post"] },
    { endpoint: "/v1/validations", methods: ["post"] },
    { endpoint: "/v1/redemptions", methods: ["get", "post"] },
    { endpoint: "/v1/redemptions/{redemptionId}", methods: ["get"] },
    { endpoint: "/v1/vouchers/{code}/redemption", methods: ["get"] },
    {
      endpoint: "/v1/redemptions/{redemptionId}/rollback",
      methods: ["post"],
    },
    {
      endpoint: "/v1/redemptions/{parentRedemptionId}/rollbacks",
      methods: ["post"],
    },
    { endpoint: "/v1/vouchers/{code}", methods: ["get"] },
    { endpoint: "/v1/vouchers/{code}/enable", methods: ["post"] },
    { endpoint: "/v1/vouchers/{code}/disable", methods: ["post"] },
    { endpoint: "/v1/vouchers/{code}/balance", methods: ["post"] },
    { endpoint: "/v1/vouchers/{code}/transactions", methods: ["get"] },
    {
      endpoint: "/v1/vouchers/{code}/transactions/export",
      methods: ["post"],
    },
    { endpoint: "/v1/vouchers/importCSV", methods: ["post"] },
    { endpoint: "/v1/campaigns", methods: ["post", "get"] },
    {
      endpoint: "/v1/campaigns/{campaignId}",
      methods: ["get", "put", "delete"],
    },
    { endpoint: "/v1/campaigns/{campaignId}/vouchers", methods: ["post"] },
    {
      endpoint: "/v1/campaigns/{campaignId}/vouchers/{code}",
      methods: ["post"],
    },
    { endpoint: "/v1/campaigns/{campaignId}/import", methods: ["post"] },
    { endpoint: "/v1/campaigns/{campaignId}/importCSV", methods: ["post"] },
    { endpoint: "/v1/campaigns/{campaignId}/enable", methods: ["post"] },
    { endpoint: "/v1/campaigns/{campaignId}/disable", methods: ["post"] },
    { endpoint: "/v1/promotions/{campaignId}/tiers", methods: ["get"] },
    { endpoint: "/v1/promotions/tiers/{promotionTierId}", methods: ["get"] },
    {
      endpoint: "/v1/promotions/tiers/{promotionTierId}/enable",
      methods: ["post"],
    },
    {
      endpoint: "/v1/promotions/tiers/{promotionTierId}/disable",
      methods: ["post"],
    },
    { endpoint: "/v1/promotions/stacks", methods: ["get"] },
    {
      endpoint: "/v1/promotions/{campaignId}/stacks",
      methods: ["get", "post"],
    },
    {
      endpoint: "/v1/promotions/{campaignId}/stacks/{stackId}",
      methods: ["get", "put", "delete"],
    },
    {
      endpoint: "/v1/rewards/{rewardId}/assignments",
      methods: ["get", "post"],
    },
    {
      endpoint: "/v1/rewards/{rewardId}/assignments/{assignmentId}",
      methods: ["put", "delete", "get"],
    },
    { endpoint: "/v1/loyalties/{campaignId}", methods: ["delete"] },
    {
      endpoint: "/v1/loyalties/{campaignId}/members/{memberId}/balance",
      methods: ["post"],
    },
    {
      endpoint: "/v1/loyalties/members/{memberId}/balance",
      methods: ["post"],
    },
    {
      endpoint: "/v1/loyalties/{campaignId}/members/{memberId}/transfers",
      methods: ["post"],
    },
    {
      endpoint: "/v1/loyalties/{campaignId}/members/{memberId}/transactions",
      methods: ["get"],
    },
    {
      endpoint: "/v1/loyalties/members/{memberId}/transactions",
      methods: ["get"],
    },
    {
      endpoint: "/v1/loyalties/members/{memberId}/transactions/export",
      methods: ["post"],
    },
    {
      endpoint:
        "/v1/loyalties/{campaignId}/members/{memberId}/transactions/export",
      methods: ["post"],
    },
    {
      endpoint:
        "/v1/loyalties/{campaignId}/members/{memberId}/points-expiration",
      methods: ["get"],
    },
    {
      endpoint: "/v1/loyalties/{campaignId}/earning-rules/{earningRuleId}",
      methods: ["get"],
    },
    {
      endpoint:
        "/v1/loyalties/{campaignId}/earning-rules/{earningRuleId}/enable",
      methods: ["post"],
    },
    {
      endpoint:
        "/v1/loyalties/{campaignId}/earning-rules/{earningRuleId}/disable",
      methods: ["post"],
    },
    {
      endpoint: "/v1/loyalties/members/{memberId}/rewards",
      methods: ["get"],
    },
    {
      endpoint:
        "/v1/loyalties/{campaignId}/reward-assignments/{assignmentId}/reward",
      methods: ["get"],
    },
    {
      endpoint: "/v1/loyalties/{campaignId}/reward-assignments/{assignmentId}",
      methods: ["get"],
    },
    {
      endpoint: "/v1/loyalties/{campaignId}/rewards/{assignmentId}",
      methods: ["get", "delete"],
    },
    {
      endpoint: "/v1/loyalties/{campaignId}/members/{memberId}/redemption",
      methods: ["post"],
    },
    {
      endpoint: "/v1/loyalties/members/{memberId}/redemption",
      methods: ["post"],
    },
    {
      endpoint: "/v1/loyalties/{campaignId}/tiers",
      methods: ["get", "post"],
    },
    {
      endpoint: "/v1/loyalties/{campaignId}/tiers/{loyaltyTierId}",
      methods: ["get"],
    },
    { endpoint: "/v1/loyalties/members/{memberId}/tiers", methods: ["get"] },
    {
      endpoint:
        "/v1/loyalties/{campaignId}/tiers/{loyaltyTierId}/earning-rules",
      methods: ["get"],
    },
    {
      endpoint: "/v1/loyalties/{campaignId}/tiers/{loyaltyTierId}/rewards",
      methods: ["get"],
    },
    { endpoint: "/v1/customers", methods: ["get", "post"] },
    {
      endpoint: "/v1/customers/{customerId}",
      methods: ["get", "delete", "put"],
    },
    {
      endpoint: "/v1/customers/{customerId}/permanent-deletion",
      methods: ["post"],
    },
    { endpoint: "/v1/customers/importCSV", methods: ["post"] },
    { endpoint: "/v1/customers/bulk/async", methods: ["post"] },
    { endpoint: "/v1/customers/metadata/async", methods: ["post"] },
    { endpoint: "/v1/customers/{customerId}/consents", methods: ["put"] },
    { endpoint: "/v1/customers/{customerId}/segments", methods: ["get"] },
    { endpoint: "/v1/orders", methods: ["get", "post"] },
    { endpoint: "/v1/orders/{orderId}", methods: ["get", "put"] },
    { endpoint: "/v1/orders/import", methods: ["post"] },
    { endpoint: "/v1/orders/export", methods: ["post"] },
    { endpoint: "/v1/products", methods: ["get", "post"] },
    {
      endpoint: "/v1/products/{productId}",
      methods: ["get", "put", "delete"],
    },
    { endpoint: "/v1/products/bulk/async", methods: ["post"] },
    { endpoint: "/v1/products/metadata/async", methods: ["post"] },
    { endpoint: "/v1/skus/{skuId}", methods: ["get"] },
    { endpoint: "/v1/products/{productId}/skus", methods: ["get", "post"] },
    {
      endpoint: "/v1/products/{productId}/skus/{skuId}",
      methods: ["put", "delete"],
    },
    { endpoint: "/v1/products/importCSV", methods: ["post"] },
    { endpoint: "/v1/skus/importCSV", methods: ["post"] },
    { endpoint: "/v1/product-collections", methods: ["get", "post"] },
    {
      endpoint: "/v1/product-collections/{productCollectionId}",
      methods: ["get", "delete"],
    },
    {
      endpoint: "/v1/product-collections/{productCollectionId}/products",
      methods: ["get"],
    },
    { endpoint: "/v1/validation-rules", methods: ["get", "post"] },
    {
      endpoint: "/v1/validation-rules/{validationRuleId}",
      methods: ["get", "put", "delete"],
    },
    { endpoint: "/v1/validation-rules-assignments", methods: ["get"] },
    {
      endpoint: "/v1/validation-rules/{validationRuleId}/assignments",
      methods: ["get", "post"],
    },
    {
      endpoint:
        "/v1/validation-rules/{validationRuleId}/assignments/{assignmentId}",
      methods: ["delete"],
    },
    { endpoint: "/v1/events", methods: ["post"] },
    { endpoint: "/v1/exports", methods: ["post", "get"] },
    { endpoint: "/v1/exports/{exportId}", methods: ["get", "delete"] },
    { endpoint: "/v1/exports/{export_Id}", methods: ["get"] },
    { endpoint: "/v1/categories", methods: ["get", "post"] },
    {
      endpoint: "/v1/categories/{categoryId}",
      methods: ["get", "delete", "put"],
    },
    { endpoint: "/client/v1/qualifications", methods: ["post"] },
    { endpoint: "/client/v1/redemptions", methods: ["post"] },
    { endpoint: "/client/v1/validations", methods: ["post"] },
    {
      endpoint: "/client/v1/customers/{customerId}/consents",
      methods: ["put"],
    },
    { endpoint: "/client/v1/events", methods: ["post"] },
  ];
};
