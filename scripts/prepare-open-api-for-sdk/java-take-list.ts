const takeList = {
  "/v1/publications": {
    methods: ["get", "post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/qualifications": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/validations": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/redemptions": {
    methods: ["get", "post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/redemptions/{redemptionId}": {
    methods: ["get"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/vouchers/{code}/redemption": {
    methods: ["get"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/redemptions/{redemptionId}/rollback": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/redemptions/{parentRedemptionId}/rollbacks": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/vouchers/{code}": {
    methods: ["get"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/vouchers/{code}/enable": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/vouchers/{code}/disable": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/vouchers/{code}/balance": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/vouchers/{code}/transactions": {
    methods: ["get"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/vouchers/{code}/transactions/export": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/vouchers/importCSV": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/campaigns": {
    methods: ["post", "get"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/campaigns/{campaignId}": {
    methods: ["get", "put", "delete"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/campaigns/{campaignId}/vouchers": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/campaigns/{campaignId}/vouchers/{code}": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/campaigns/{campaignId}/import": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/campaigns/{campaignId}/importCSV": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/campaigns/{campaignId}/enable": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/campaigns/{campaignId}/disable": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/promotions/{campaignId}/tiers": {
    methods: ["get"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/promotions/tiers/{promotionTierId}": {
    methods: ["get"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/promotions/tiers/{promotionTierId}/enable": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/promotions/tiers/{promotionTierId}/disable": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/promotions/stacks": {
    methods: ["get"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/promotions/{campaignId}/stacks": {
    methods: ["get", "post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/promotions/{campaignId}/stacks/{stackId}": {
    methods: ["get", "put", "delete"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/rewards/{rewardId}/assignments": {
    methods: ["get", "post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/rewards/{rewardId}/assignments/{assignmentId}": {
    methods: ["put", "delete", "get"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/loyalties/{campaignId}": {
    methods: ["delete"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/loyalties/{campaignId}/members/{memberId}/balance": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/loyalties/members/{memberId}/balance": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/loyalties/{campaignId}/members/{memberId}/transfers": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/loyalties/{campaignId}/members/{memberId}/transactions": {
    methods: ["get"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/loyalties/members/{memberId}/transactions": {
    methods: ["get"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/loyalties/members/{memberId}/transactions/export": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/loyalties/{campaignId}/members/{memberId}/transactions/export": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/loyalties/{campaignId}/members/{memberId}/points-expiration": {
    methods: ["get"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/loyalties/{campaignId}/earning-rules/{earningRuleId}": {
    methods: ["get"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/loyalties/{campaignId}/earning-rules/{earningRuleId}/enable": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/loyalties/{campaignId}/earning-rules/{earningRuleId}/disable": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/loyalties/members/{memberId}/rewards": {
    methods: ["get"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/loyalties/{campaignId}/reward-assignments/{assignmentId}/reward": {
    methods: ["get"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/loyalties/{campaignId}/reward-assignments/{assignmentId}": {
    methods: ["get"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/loyalties/{campaignId}/rewards/{assignmentId}": {
    methods: ["get", "delete"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/loyalties/{campaignId}/members/{memberId}/redemption": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/loyalties/members/{memberId}/redemption": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/loyalties/{campaignId}/tiers": {
    methods: ["get", "post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/loyalties/{campaignId}/tiers/{loyaltyTierId}": {
    methods: ["get"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/loyalties/members/{memberId}/tiers": {
    methods: ["get"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/loyalties/{campaignId}/tiers/{loyaltyTierId}/earning-rules": {
    methods: ["get"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/loyalties/{campaignId}/tiers/{loyaltyTierId}/rewards": {
    methods: ["get"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/customers": {
    methods: ["get", "post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/customers/{customerId}": {
    methods: ["get", "delete", "put"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/customers/{customerId}/permanent-deletion": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/customers/importCSV": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/customers/bulk/async": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/customers/metadata/async": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/customers/{customerId}/consents": {
    methods: ["put"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/customers/{customerId}/activities": {
    methods: ["get"],
    languages: ["default", "ruby"],
  },
  "/v1/customers/{customerId}/segments": {
    methods: ["get"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/orders": {
    methods: ["get", "post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/orders/{orderId}": {
    methods: ["get", "put"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/orders/import": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/orders/export": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/products": {
    methods: ["get", "post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/products/{productId}": {
    methods: ["get", "put", "delete"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/products/bulk/async": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/products/metadata/async": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/skus/{skuId}": {
    methods: ["get"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/products/{productId}/skus": {
    methods: ["get", "post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/products/{productId}/skus/{skuId}": {
    methods: ["put", "delete"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/products/importCSV": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/skus/importCSV": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/product-collections": {
    methods: ["get", "post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/product-collections/{productCollectionId}": {
    methods: ["get", "delete"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/product-collections/{productCollectionId}/products": {
    methods: ["get"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/validation-rules": {
    methods: ["get", "post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/validation-rules/{validationRuleId}": {
    methods: ["get", "put", "delete"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/validation-rules-assignments": {
    methods: ["get"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/validation-rules/{validationRuleId}/assignments": {
    methods: ["get", "post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/validation-rules/{validationRuleId}/assignments/{assignmentId}": {
    methods: ["delete"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/events": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/exports": {
    methods: ["post", "get"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/exports/{exportId}": {
    methods: ["get", "delete"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/exports/{export_Id}": {
    methods: ["get"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/categories": {
    methods: ["get", "post"],
    languages: ["default", "ruby", "java"],
  },
  "/v1/categories/{categoryId}": {
    methods: ["get", "delete", "put"],
    languages: ["default", "ruby", "java"],
  },
  "/client/v1/qualifications": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/client/v1/redemptions": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/client/v1/validations": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
  "/client/v1/customers/{customerId}/consents": {
    methods: ["put"],
    languages: ["default", "ruby", "java"],
  },
  "/client/v1/events": {
    methods: ["post"],
    languages: ["default", "ruby", "java"],
  },
};

const lng = "default";

console.log(
  Object.entries(takeList).map(([endpoint, { methods, languages }]) => {
    if (languages.includes(lng)) {
      return;
    }
  }),
);
