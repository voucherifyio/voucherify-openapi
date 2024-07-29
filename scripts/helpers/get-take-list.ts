export const rawTakeList = {
  "/v1/async-actions": { get: ["default", "ruby", "java", "php"] },
  "/v1/async-actions/{asyncActionId}": {
    get: ["default", "ruby", "java", "php"],
  },
  "/v1/segments/{segmentId}": { delete: ["default", "ruby", "java", "php"] },
  "/v1/publications/create": { get: ["default", "ruby", "java", "php"] },
  "/v1/vouchers/{code}/sessions/{sessionKey}": {
    delete: ["default", "ruby", "java", "php"],
  },
  "/v1/publications": {
    get: ["default", "ruby", "java", "php"],
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/qualifications": { post: ["default", "ruby", "java", "php"] },
  "/v1/validations": { post: ["default", "ruby", "java", "php"] },
  "/v1/redemptions": {
    get: ["default", "ruby", "java", "php"],
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/redemptions/{redemptionId}": { get: ["default", "ruby", "java", "php"] },
  "/v1/vouchers/{code}/redemption": { get: ["default", "ruby", "java", "php"] },
  "/v1/redemptions/{redemptionId}/rollback": {
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/redemptions/{parentRedemptionId}/rollbacks": {
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/vouchers/{code}": {
    get: ["default", "ruby", "java", "php"],
    delete: ["default", "ruby", "java", "php"],
  },
  "/v1/vouchers/{code}/enable": { post: ["default", "ruby", "java", "php"] },
  "/v1/vouchers/{code}/disable": { post: ["default", "ruby", "java", "php"] },
  "/v1/vouchers/{code}/balance": { post: ["default", "ruby", "java", "php"] },
  "/v1/vouchers/{code}/transactions": {
    get: ["default", "ruby", "java", "php"],
  },
  "/v1/vouchers/{code}/transactions/export": {
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/vouchers/importCSV": { post: ["default", "ruby", "java", "php"] },
  "/v1/campaigns": {
    post: ["default", "ruby", "java", "php"],
    get: ["default", "ruby", "java", "php"],
  },
  "/v1/campaigns/{campaignId}": {
    get: ["default", "ruby", "java", "php"],
    put: ["default", "ruby", "java", "php"],
    delete: ["default", "ruby", "java", "php"],
  },
  "/v1/campaigns/{campaignId}/vouchers": {
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/campaigns/{campaignId}/vouchers/{code}": {
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/campaigns/{campaignId}/import": {
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/campaigns/{campaignId}/importCSV": {
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/campaigns/{campaignId}/enable": {
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/campaigns/{campaignId}/disable": {
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/promotions/{campaignId}/tiers": {
    post: ["default", "ruby", "java", "php"],
    get: ["default", "ruby", "java", "php"],
  },
  "/v1/promotions/tiers/{promotionTierId}": {
    put: ["default", "ruby", "java", "php"],
    get: ["default", "ruby", "java", "php"],
    delete: ["default", "ruby", "java", "php"],
  },
  "/v1/promotions/tiers/{promotionTierId}/enable": {
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/promotions/tiers/{promotionTierId}/disable": {
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/promotions/stacks": { get: ["default", "ruby", "java", "php"] },
  "/v1/promotions/{campaignId}/stacks": {
    get: ["default", "ruby", "java", "php"],
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/promotions/{campaignId}/stacks/{stackId}": {
    get: ["default", "ruby", "java", "php"],
    put: ["default", "ruby", "java", "php"],
    delete: ["default", "ruby", "java", "php"],
  },
  "/v1/rewards": {
    get: ["default", "ruby", "java", "php"],
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/rewards/{rewardId}": {
    get: ["default", "ruby", "java", "php"],
    put: ["default", "ruby", "java", "php"],
    delete: ["default", "ruby", "java", "php"],
  },
  "/v1/rewards/{rewardId}/assignments": {
    get: ["default", "ruby", "java", "php"],
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/rewards/{rewardId}/assignments/{assignmentId}": {
    put: ["default", "ruby", "java", "php"],
    delete: ["default", "ruby", "java", "php"],
    get: ["default", "ruby", "java", "php"],
  },
  "/v1/loyalties/{campaignId}": { delete: ["default", "ruby", "java", "php"] },
  "/v1/loyalties/{campaignId}/members/{memberId}/balance": {
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/loyalties/members/{memberId}/balance": {
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/loyalties/{campaignId}/members/{memberId}/transfers": {
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/loyalties/{campaignId}/members/{memberId}/transactions": {
    get: ["default", "ruby", "java", "php"],
  },
  "/v1/loyalties/members/{memberId}/transactions": {
    get: ["default", "ruby", "java", "php"],
  },
  "/v1/loyalties/members/{memberId}/transactions/export": {
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/loyalties/{campaignId}/members/{memberId}/transactions/export": {
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/loyalties/{campaignId}/members/{memberId}/points-expiration": {
    get: ["default", "ruby", "java", "php"],
  },
  "/v1/loyalties/{campaignId}/earning-rules/{earningRuleId}": {
    get: ["default", "ruby", "java", "php"],
    delete: ["default", "ruby", "java", "php"],
  },
  "/v1/loyalties/{campaignId}/earning-rules/{earningRuleId}/enable": {
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/loyalties/{campaignId}/earning-rules/{earningRuleId}/disable": {
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/loyalties/members/{memberId}/rewards": {
    get: ["default", "ruby", "java", "php"],
  },
  "/v1/loyalties/{campaignId}/reward-assignments/{assignmentId}/reward": {
    get: ["default", "ruby", "java", "php"],
  },
  "/v1/loyalties/{campaignId}/reward-assignments/{assignmentId}": {
    get: ["default", "ruby", "java", "php"],
  },
  "/v1/loyalties/{campaignId}/rewards/{assignmentId}": {
    get: ["default", "ruby", "java", "php"],
    delete: ["default", "ruby", "java", "php"],
  },
  "/v1/loyalties/{campaignId}/members/{memberId}/redemption": {
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/loyalties/members/{memberId}/redemption": {
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/loyalties/{campaignId}/tiers": {
    get: ["default", "ruby", "java", "php"],
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/loyalties/{campaignId}/tiers/{loyaltyTierId}": {
    get: ["default", "ruby", "java", "php"],
  },
  "/v1/loyalties/members/{memberId}/tiers": {
    get: ["default", "ruby", "java", "php"],
  },
  "/v1/loyalties/{campaignId}/tiers/{loyaltyTierId}/earning-rules": {
    get: ["default", "ruby", "java", "php"],
  },
  "/v1/loyalties/{campaignId}/tiers/{loyaltyTierId}/rewards": {
    get: ["default", "ruby", "java", "php"],
  },
  "/v1/customers": {
    get: ["default", "ruby", "java", "php"],
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/customers/{customerId}": {
    get: ["default", "ruby", "java", "php"],
    delete: ["default", "ruby", "java", "php"],
    put: ["default", "ruby", "java", "php"],
  },
  "/v1/customers/{customerId}/permanent-deletion": {
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/customers/importCSV": { post: ["default", "ruby", "java", "php"] },
  "/v1/customers/bulk/async": { post: ["default", "ruby", "java", "php"] },
  "/v1/customers/metadata/async": { post: ["default", "ruby", "java", "php"] },
  "/v1/customers/{customerId}/consents": {
    put: ["default", "ruby", "java", "php"],
  },
  "/v1/customers/{customerId}/activities": { get: ["ruby", "php"] },
  "/v1/customers/{customerId}/segments": {
    get: ["default", "ruby", "java", "php"],
  },
  "/v1/orders": {
    get: ["default", "ruby", "java", "php"],
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/orders/{orderId}": {
    get: ["default", "ruby", "java", "php"],
    put: ["default", "ruby", "java", "php"],
  },
  "/v1/orders/import": { post: ["default", "ruby", "java", "php"] },
  "/v1/orders/export": { post: ["default", "ruby", "java", "php"] },
  "/v1/products": {
    get: ["default", "ruby", "java", "php"],
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/products/{productId}": {
    get: ["default", "ruby", "java", "php"],
    put: ["default", "ruby", "java", "php"],
    delete: ["default", "ruby", "java", "php"],
  },
  "/v1/products/bulk/async": { post: ["default", "ruby", "java", "php"] },
  "/v1/products/metadata/async": { post: ["default", "ruby", "java", "php"] },
  "/v1/skus/{skuId}": { get: ["default", "ruby", "java", "php"] },
  "/v1/products/{productId}/skus": {
    get: ["default", "ruby", "java", "php"],
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/products/{productId}/skus/{skuId}": {
    put: ["default", "ruby", "java", "php"],
    delete: ["default", "ruby", "java", "php"],
  },
  "/v1/products/importCSV": { post: ["default", "ruby", "java", "php"] },
  "/v1/skus/importCSV": { post: ["default", "ruby", "java", "php"] },
  "/v1/product-collections": {
    get: ["default", "ruby", "java", "php"],
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/product-collections/{productCollectionId}": {
    get: ["default", "ruby", "java", "php"],
    delete: ["default", "ruby", "java", "php"],
  },
  "/v1/product-collections/{productCollectionId}/products": {
    get: ["default", "ruby", "java", "php"],
  },
  "/v1/validation-rules": {
    get: ["default", "ruby", "java", "php"],
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/validation-rules/{validationRuleId}": {
    get: ["default", "ruby", "java", "php"],
    put: ["default", "ruby", "java", "php"],
    delete: ["default", "ruby", "java", "php"],
  },
  "/v1/validation-rules-assignments": {
    get: ["default", "ruby", "java", "php"],
  },
  "/v1/validation-rules/{validationRuleId}/assignments": {
    get: ["default", "ruby", "java", "php"],
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/validation-rules/{validationRuleId}/assignments/{assignmentId}": {
    delete: ["default", "ruby", "java", "php"],
  },
  "/v1/events": { post: ["default", "ruby", "java", "php"] },
  "/v1/exports": {
    post: ["default", "ruby", "java", "php"],
    get: ["default", "ruby", "java", "php"],
  },
  "/v1/exports/{exportId}": {
    get: ["default", "ruby", "java", "php"],
    delete: ["default", "ruby", "java", "php"],
  },
  "/v1/exports/{export_Id}": { get: ["default", "ruby", "java", "php"] },
  "/v1/categories": {
    get: ["default", "ruby", "java", "php"],
    post: ["default", "ruby", "java", "php"],
  },
  "/v1/categories/{categoryId}": {
    get: ["default", "ruby", "java", "php"],
    delete: ["default", "ruby", "java", "php"],
    put: ["default", "ruby", "java", "php"],
  },
  "/client/v1/qualifications": { post: ["default", "ruby", "java", "php"] },
  "/client/v1/redemptions": { post: ["default", "ruby", "java", "php"] },
  "/client/v1/validations": { post: ["default", "ruby", "java", "php"] },
  "/client/v1/customers/{customerId}/consents": {
    put: ["default", "ruby", "java", "php"],
  },
  "/client/v1/events": { post: ["default", "ruby", "java", "php"] },
};

export const getTakeList = (
  language: string = "default",
): { endpoint: string; methods: string[] }[] => {
  return Object.entries(rawTakeList)
    .map(([endpoint, methods]) => {
      const supportedMethods = Object.entries(methods)
        .map(([method, languages]) => {
          if (languages.includes(language)) {
            return method;
          }
          return undefined;
        })
        .filter((e) => e);
      if (supportedMethods.length > 0) {
        return { endpoint, methods: supportedMethods };
      }
    })
    .filter((e) => e);
};
