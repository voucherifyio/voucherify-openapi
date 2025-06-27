//FOR NEW ENDPOINTS, PLEASE ADD AS:
// "path": {
//     **METHOD**: [],  (empty array)
//   },

export const rawTakeList = {
  "/v1/campaigns/{campaignId}/transactions/export": {
    post: true,
  },
  "/v1/loyalties/{campaignId}/transactions/export": {
    post: true,
  },
  "/v1/campaigns/{campaignId}/transactions": {
    get: true,
  },
  "/v1/loyalties/{campaignId}/transactions": {
    get: true,
  },
  "/v1/oauth/token": {
    post: ["dotnet"],
  },
  "/v1/oauth/introspect": {
    post: ["dotnet"],
  },
  "/v1/oauth/token/revoke": {
    post: ["dotnet"],
  },
  "/v1/loyalties/members/{memberId}/pending-points/{pendingPointsId}/balance": {
    post: true,
  },
  "/v1/loyalties/{campaignId}/pending-points": {
    get: true,
  },
  "/v1/loyalties/{campaignId}/members/{memberId}/pending-points": {
    get: true,
  },
  "/v1/loyalties/members/{memberId}/pending-points": {
    get: true,
  },
  "/v1/loyalties/members/{memberId}/pending-points/{pendingPointsId}/activate":
    {
      post: true,
    },
  "/v1/loyalties/members/{memberId}/pending-points/{pendingPointsId}/cancel": {
    post: true,
  },
  "/management/v1/projects/{projectId}/templates/campaigns": {
    get: true,
  },
  "/management/v1/projects/{projectId}/templates/campaigns/{campaignTemplateId}/copy":
    {
      post: true,
    },
  "/v1/templates/campaigns": {
    post: true,
    get: true,
  },
  "/v1/templates/campaigns/{campaignTemplateId}": {
    get: true,
    put: true,
    delete: true,
  },
  "/v1/templates/campaigns/{campaignTemplateId}/campaign-setup": {
    post: true,
  },
  "/v1/templates/campaigns/{campaignTemplateId}/tier-setup": {
    post: true,
  },
  "/v1/loyalties/{campaignId}/points-expiration/export": {
    post: true,
  },
  "/v1/customers/{customerId}/redeemables": {
    get: true,
  },
  "/v1/vouchers/import": {
    post: true,
  },
  "/v1/vouchers/metadata/async": {
    post: true,
  },
  "/v1/customers/{customerId}/activity": {
    get: true,
  },
  "/v1/vouchers/bulk/async": {
    post: true,
  },
  "/client/v1/promotions/tiers": {
    get: true,
  },
  "/v1/promotions/tiers": { get: true },
  "/v1/async-actions": { get: true },
  "/v1/async-actions/{asyncActionId}": {
    get: true,
  },
  "/v1/segments": { post: true },
  "/v1/segments/{segmentId}": {
    delete: true,
    get: true,
  },
  "/v1/publications/create": {
    get: true,
  },
  "/v1/vouchers/{code}/sessions/{sessionKey}": {
    delete: true,
  },
  "/v1/publications": {
    get: true,
    post: true,
  },
  "/v1/qualifications": { post: true },
  "/v1/validations": { post: true },
  "/v1/redemptions": {
    get: true,
    post: true,
  },
  "/v1/redemptions/{redemptionId}": {
    get: true,
  },
  "/v1/vouchers/{code}/redemption": {
    get: true,
  },
  "/v1/redemptions/{redemptionId}/rollback": {
    post: true,
  },
  "/v1/redemptions/{parentRedemptionId}/rollbacks": {
    post: true,
  },
  "/v1/vouchers": {
    get: true,
    post: true,
  },
  "/v1/vouchers/{code}": {
    get: true,
    post: true,
    put: true,
    delete: true,
  },
  "/v1/vouchers/{code}/enable": {
    post: true,
  },
  "/v1/vouchers/{code}/disable": {
    post: true,
  },
  "/v1/vouchers/{code}/balance": {
    post: true,
  },
  "/v1/vouchers/{code}/transactions": {
    get: true,
  },
  "/v1/vouchers/{code}/transactions/export": {
    post: true,
  },
  "/v1/vouchers/importCSV": {
    post: true,
  },
  "/v1/campaigns": {
    post: true,
    get: true,
  },
  "/v1/campaigns/{campaignId}": {
    get: true,
    put: true,
    delete: true,
  },
  "/v1/campaigns/{campaignId}/vouchers": {
    post: true,
  },
  "/v1/campaigns/{campaignId}/vouchers/{code}": {
    post: true,
  },
  "/v1/campaigns/{campaignId}/import": {
    post: true,
  },
  "/v1/campaigns/{campaignId}/importCSV": {
    post: true,
  },
  "/v1/campaigns/{campaignId}/enable": {
    post: true,
  },
  "/v1/campaigns/{campaignId}/disable": {
    post: true,
  },
  "/v1/campaigns/{campaignId}/summary": {
    get: true,
  },
  "/v1/promotions/{campaignId}/tiers": {
    post: true,
    get: true,
  },
  "/v1/promotions/tiers/{promotionTierId}": {
    put: true,
    get: true,
    delete: true,
  },
  "/v1/promotions/tiers/{promotionTierId}/enable": {
    post: true,
  },
  "/v1/promotions/tiers/{promotionTierId}/disable": {
    post: true,
  },
  "/v1/promotions/stacks": {
    get: true,
  },
  "/v1/promotions/{campaignId}/stacks": {
    get: true,
    post: true,
  },
  "/v1/promotions/{campaignId}/stacks/{stackId}": {
    get: true,
    put: true,
    delete: true,
  },
  "/v1/rewards": {
    get: true,
    post: true,
  },
  "/v1/rewards/{rewardId}": {
    get: true,
    put: true,
    delete: true,
  },
  "/v1/rewards/{rewardId}/assignments": {
    get: true,
    post: true,
  },
  "/v1/rewards/{rewardId}/assignments/{assignmentId}": {
    put: true,
    delete: true,
    get: true,
  },
  "/v1/loyalties/{campaignId}": {
    get: true,
    delete: true,
    put: true,
  },
  "/v1/loyalties/{campaignId}/members/{memberId}/balance": {
    post: true,
  },
  "/v1/loyalties/{campaignId}/members/{memberId}": {
    get: true,
  },
  "/v1/loyalties/{campaignId}/members": {
    get: true,
    post: true,
  },
  "/v1/loyalties": {
    get: true,
    post: true,
  },
  "/v1/loyalties/members/{memberId}": {
    get: true,
  },
  "/v1/loyalties/{campaignId}/members/{memberId}/activity": {
    get: true,
  },
  "/v1/loyalties/members/{memberId}/activity": {
    get: true,
  },
  "/v1/loyalties/members/{memberId}/balance": {
    post: true,
  },
  "/v1/loyalties/{campaignId}/members/{memberId}/transfers": {
    post: true,
  },
  "/v1/loyalties/{campaignId}/members/{memberId}/transactions": {
    get: true,
  },
  "/v1/loyalties/members/{memberId}/transactions": {
    get: true,
  },
  "/v1/loyalties/members/{memberId}/transactions/export": {
    post: true,
  },
  "/v1/loyalties/{campaignId}/members/{memberId}/transactions/export": {
    post: true,
  },
  "/v1/loyalties/{campaignId}/members/{memberId}/points-expiration": {
    get: true,
  },
  "/v1/loyalties/{campaignId}/earning-rules": {
    get: true,
    post: true,
  },
  "/v1/loyalties/{campaignId}/earning-rules/{earningRuleId}": {
    get: true,
    delete: true,
    put: true,
  },
  "/v1/loyalties/{campaignId}/earning-rules/{earningRuleId}/enable": {
    post: true,
  },
  "/v1/loyalties/{campaignId}/earning-rules/{earningRuleId}/disable": {
    post: true,
  },
  "/v1/loyalties/members/{memberId}/rewards": {
    get: true,
  },
  "/v1/loyalties/{campaignId}/reward-assignments/{assignmentId}/reward": {
    get: true,
  },
  "/v1/loyalties/{campaignId}/reward-assignments/{assignmentId}": {
    get: true,
  },
  "/v1/loyalties/{campaignId}/reward-assignments": {
    get: true,
  },
  "/v1/loyalties/{campaignId}/rewards": {
    get: true,
    post: true,
  },
  "/v1/loyalties/{campaignId}/rewards/{assignmentId}": {
    get: true,
    put: true,
    delete: true,
  },
  "/v1/loyalties/{campaignId}/members/{memberId}/redemption": {
    post: true,
  },
  "/v1/loyalties/members/{memberId}/redemption": {
    post: true,
  },
  "/v1/loyalties/{campaignId}/tiers": {
    get: true,
    post: true,
  },
  "/v1/loyalties/{campaignId}/tiers/{loyaltyTierId}": {
    get: true,
  },
  "/v1/loyalties/members/{memberId}/tiers": {
    get: true,
  },
  "/v1/loyalties/{campaignId}/tiers/{loyaltyTierId}/earning-rules": {
    get: true,
  },
  "/v1/loyalties/{campaignId}/tiers/{loyaltyTierId}/rewards": {
    get: true,
  },
  "/v1/customers": {
    get: true,
    post: true,
  },
  "/v1/customers/{customerId}": {
    get: true,
    delete: true,
    put: true,
  },
  "/v1/customers/{customerId}/permanent-deletion": {
    post: true,
  },
  "/v1/customers/importCSV": {
    post: true,
  },
  "/v1/customers/bulk/async": {
    post: true,
  },
  "/v1/customers/metadata/async": {
    post: true,
  },
  "/v1/customers/{customerId}/consents": {
    put: true,
  },
  "/v1/customers/{customerId}/activities": { get: ["ruby"] },
  "/v1/customers/{customerId}/segments": {
    get: true,
  },
  "/v1/orders": {
    get: true,
    post: true,
  },
  "/v1/orders/{orderId}": {
    get: true,
    put: true,
  },
  "/v1/orders/import": { post: true },
  "/v1/orders/export": { post: true },
  "/v1/products": {
    get: true,
    post: true,
  },
  "/v1/products/{productId}": {
    get: true,
    put: true,
    delete: true,
  },
  "/v1/products/bulk/async": {
    post: true,
  },
  "/v1/products/metadata/async": {
    post: true,
  },
  "/v1/skus/{skuId}": { get: true },
  "/v1/products/{productId}/skus": {
    get: true,
    post: true,
  },
  "/v1/products/{productId}/skus/{skuId}": {
    put: true,
    delete: true,
  },
  "/v1/products/importCSV": {
    post: true,
  },
  "/v1/skus/importCSV": { post: true },
  "/v1/product-collections": {
    get: true,
    post: true,
  },
  "/v1/product-collections/{productCollectionId}": {
    get: true,
    delete: true,
  },
  "/v1/product-collections/{productCollectionId}/products": {
    get: true,
  },
  "/v1/validation-rules": {
    get: true,
    post: true,
  },
  "/v1/validation-rules/{validationRuleId}": {
    get: true,
    put: true,
    delete: true,
  },
  "/v1/validation-rules-assignments": {
    get: true,
  },
  "/v1/validation-rules/{validationRuleId}/assignments": {
    get: true,
    post: true,
  },
  "/v1/validation-rules/{validationRuleId}/assignments/{assignmentId}": {
    delete: true,
  },
  "/v1/events": { post: true },
  "/v1/exports": {
    post: true,
    get: true,
  },
  "/v1/exports/{exportId}": {
    get: true,
    delete: true,
  },
  "/v1/exports/{export_Id}": {
    get: true,
  },
  "/v1/categories": {
    get: true,
    post: true,
  },
  "/v1/categories/{categoryId}": {
    get: true,
    delete: true,
    put: true,
  },
  "/client/v1/qualifications": {
    post: true,
  },
  "/client/v1/redemptions": {
    post: true,
  },
  "/client/v1/validations": {
    post: true,
  },
  "/client/v1/events": { post: true },
  "/v1/trash-bin": { get: true },
  "/v1/trash-bin/{binEntryId}": { delete: true },
  "/management/v1/projects": { post: true, get: true },
  "/management/v1/projects/{projectId}": {
    put: true,
    get: true,
    delete: true,
  },
  "/management/v1/projects/users/invite": {
    post: true,
  },
  "/management/v1/projects/{projectId}/users": {
    post: true,
    get: true,
  },
  "/management/v1/projects/{projectId}/users/{userId}": {
    get: true,
    put: true,
    delete: true,
  },
  "/management/v1/projects/{projectId}/metadata-schemas": {
    post: true,
    get: true,
  },
  "/management/v1/projects/{projectId}/metadata-schemas/{metadataSchemaId}": {
    get: true,
    put: true,
    delete: true,
  },
  "/management/v1/projects/{projectId}/custom-event-schemas": {
    post: true,
    get: true,
  },
  "/management/v1/projects/{projectId}/custom-event-schemas/{customEventSchemaId}":
    {
      get: true,
      put: true,
      delete: true,
    },
  "/management/v1/projects/{projectId}/stacking-rules": {
    post: true,
    get: true,
  },
  "/management/v1/projects/{projectId}/stacking-rules/{stackingRulesId}": {
    get: true,
    put: true,
    delete: true,
  },
  "/management/v1/projects/{projectId}/webhooks": {
    post: true,
    get: true,
  },
  "/management/v1/projects/{projectId}/webhooks/{webhookId}": {
    get: true,
    put: true,
    delete: true,
  },
  "/management/v1/projects/{projectId}/branding": {
    post: true,
    get: true,
  },
  "/management/v1/projects/{projectId}/branding/{brandingId}": {
    get: true,
    put: true,
    delete: true,
  },
  "/v1/metadata-schemas/{resource}": {
    get: true,
  },
  "/v1/metadata-schemas": {
    get: true,
  },
  "/v1/locations": {
    get: true,
  },
  "/v1/locations/{locationId}": {
    get: true,
  },
  "/v1/referrals/{campaignId}/members/{memberId}/holders": {
    get: true,
    post: true,
  },
  "/v1/referrals/members/{memberId}/holders": {
    get: true,
    post: true,
  },
  "/v1/referrals/{campaignId}/members/{memberId}/holders/{holderId}": {
    delete: true,
  },
  "/v1/referrals/members/{memberId}/holders/{holderId}": {
    delete: true,
  },
};

export const getTakeList = (
  language: string = "default",
): { endpoint: string; methods: string[] }[] => {
  return Object.entries(rawTakeList)
    ?.map(([endpoint, methods]) => {
      const supportedMethods =
        Object.entries(methods)
          ?.map(([method, languages]) => {
            if (languages === true || languages?.includes(language)) {
              return method;
            }
            return undefined;
          })
          ?.filter((e) => e) || [];
      if (supportedMethods.length > 0) {
        return { endpoint, methods: supportedMethods };
      }
    })
    .filter((e) => e);
};
