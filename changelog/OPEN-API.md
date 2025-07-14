

--------------------

Older changes in [DEPRECATED.md](deprecated/DEPRECATED.md)

## 2025-07-14

- Added `limit` to the `Bundle` and `ValidationRuleBundleRules` schemas.
- Removed `logic` from the `ValidationRuleBundleRules` schema, as it was hidden.

## 2025-07-11

- Added `units_limit_exceeded` to the `ApplicableTo` schema.

## 2025-06-27

- Updated `expiration_rules` with `FIXED_DAY_OF_YEAR` in the following schemas: `CampaignLoyaltyCard` (also in OpenAPIWebhooks.json), `EarningRuleExpirationRules`.

## 2025-06-26

- Added `session` object to the `RedemptionBase` schema.

## 2025-06-25

- Added `webhooks_enabled` property to the `VouchersImportCSVRequestBody` schema.
- Added `404` errors with examples to the `/v1/vouchers/{code}/sessions/{sessionKey}` endpoint and improved its description.
- Added `locked_credits` to the `RedeemableGift` schema and `session` to the `QualificationsCheckEligibilityRequestBody` and `ClientQualificationsCheckEligibilityRequestBody`.
- Added the info about `join_once` being always set to `true` for loyalty campaigns.

## 2025-06-17

- Added a new endpoint: GET `/v1/campaigns/{campaignId}/summary` and associated schemas: `ParameterDateOnly`, `CampaignsSummaryGetResponseBody`, `CampaignsSummaryDiscountCampaign`, `CampaignsSummaryGiftCampaign`, `CampaignsSummaryLoyaltyCampaign`, `CampaignsSummaryPromotionCampaign`, `CampaignsSummaryReferralCampaign`, `CampaignsSummaryCampaignBase`, `CampaignsSummaryVouchersPublications`, `CampaignsSummaryDiscounts`, `CampaignsSummaryLoyalty`.

## 2025-06-11

Remove `Beta` tag from pending point endpoints

## 2025-06-04

- Improved descriptions in the `StackingRules` and `ManagementProjectsStackingRules` schemas.
- Added `no_effect_skip_categories`, `no_effect_redeem_anyway_categories` to the `StackingRules` schema.
- Added `no_effect_skip_categories`, `redeemables_products_application_mode`, `redeemables_no_effect_rule`, `no_effect_redeem_anyway_categories` to the `ManagementProjectsStackingRules` schema.

## 2025-05-23

- Added `expiration_rules` to the `EarningRuleBase` schema.

## 2025-04-16

- Added `campaign_status` and `is_referral_code` query parameters to GET List campaigns.
  - Added relevant code to `index.ts` to remove the changes.

## 2025-04-10

- Added `bundle_rules` to the `ValidationRuleBase` schema in OpenAPIWebhooks.json.
- Added `contains`, `not_contain` conditions to the `FilterConditionsString` schema.
  - Added relevant code to `index.ts` to remove the changes.
- Added `campaigns`, `campaigns_id`, `status`, `active`, `created_date`, `updated_at`, `start_date`, `expiration_date`, `validity_day_of_week` filters to the `ParameterFiltersListCampaigns` schema.
  - Added relevant code to `index.ts` to remove the changes.
- Fixed `is_referral_code` and improved `voucher_code` filters in the `ParameterFiltersListCampaigns` schema.
  - Added relevant code to `index.ts` to remove the changes.
- Changed name from `Add or Remove Voucher Balance` to `Adjust Voucher Balance`, `Add or Remove Loyalty Card Balance` to `Adjust Loyalty Card Balance`, `Add or Remove Loyalty Card Balance` to `Adjust Loyalty Card Balance`

## 2025-04-01

- Added `created_date` and `expiration_date` to the `ParameterFiltersListCampaigns` schema for GET `/v1/campaigns`.
 - Added relevant code to `index.ts` to remove the changes.
- Added `Bundle` schema for POST `v1/qualifications`.

## 2025-03-24

Added `balance` to the `RedeemableResultGiftCard` schema.

## 2025-03-20

Added new events to the `ManagementProjectsWebhookBase` schema.

## 2025-03-19

- Added `pending_points` property to the `LoyaltiesEarningRulesCreateOrderPaidRequestBody` and `LoyaltiesEarningRulesUpdateRequestBody` schemas.

## 2025-03-17

- Added `EVENTS.CAMPAIGN.LOYALTY_TIER.CREATED`, `EVENTS.CAMPAIGN.LOYALTY_TIER.DELETED`, `EVENTS.CAMPAIGN.LOYALTY_TIER.UPDATED` and associated schemas to OpenAPIWebhooks.json

## 2025-03-14

- Changed `200 OAuth tokens` to `1000 OAuth tokens` as per v20250224.

## 2025-03-11

- Add `has_more` property to the `AsyncActionsListResponseBody` schema.

## 2025-03-06

- Added `EventCustomerLoyaltyCardPendingPointsUpdated` schema and linked to `CustomerActivityData` and `MemberActivityData`
- Added `EVENTS.CUSTOMER.VOUCHER.LOYALTY_CARD.PENDING_POINTS.UPDATED` and associated schemas to OpenAPIWebhooks.json
- Added `EVENTS.VOUCHER.LOYALTY_CARD.PENDING_POINTS.UPDATED` and associated schemas to OpenAPIWebhooks.json

## 2025-03-04

- Added POST `/v1/loyalties/members/{memberId}/pending-points/{pendingPointsId}/balance` with associated schemas: `LoyaltiesMembersPendingPointsBalanceRequestBody`, `LoyaltiesMembersPendingPointsBalanceResponseBody`

## 2025-02-27

- Added `subtracted_amount` to the following schemas: `Gift`, `RedeemableVoucher`, `VoucherBase`.
- Added `expired_points` and `subtracted_points` to the following schemas: `LoyaltyMember`, `LoyaltiesMembersTransfersCreateResponseBody`, `RedeemableVoucher`, `SimpleLoyaltyCard`, `VoucherBase`.
- Removed an object with a `SimpleLoyaltyCard` schema from `VoucherUpdateLoyaltyCard`.
- Removed an object with a `Gift` schema from `VoucherUpdateGift`.
- Unified part of descriptions involving values for decimal places.
- Fixed `filters` query object in GET `v1/publications` by adding `"style": "deepObject"`.

## 2025-02-12

- Added POST `/v1/oauth/token`, POST `/v1/oauth/introspect`, POST `/v1/oauth/token/revoke` with associated schemas: `OAuthTokenGenerateRequestBody`, `OAuthTokenGenerateResponseBody`, `OAuthTokenIntrospectRequestBody`, `OAuthTokenIntrospectResponseBody`, `OAuthTokenRevokeRequestBody`, `OAuthToken`.

## 2025-02-05

- Added `type` filter to the `ParameterFiltersListCampaigns` schema. Updated the `index.ts` file as a result.
- Added the `channel` property to `SimpleRedemption` schemas in the OpenAPI.json and OpenAPIWebhooks.json files. Also, updated the `SimpleRedemption` schema in the OpenAPI.json.
- Added `id` to the `ValidationsValidateResponseBody` schema.
- Added the `rollback_order_mode` property to the `RedemptionBase` schema.
- Added the `redeemables_rollback_order_mode` to the `ManagementProjectsStackingRulesBase` schema.
- Removed the `related_redemptions` object from the `RedemptionRollback` schema.

## 2025-02-04

- Added the `access_settings` query parameter to GET `v1/campaigns` and associated `ParameterCampaignsAccessSetttings` schema. Updated the `index.ts` file as a result.

## 2025-01-28

- Added distribution events to OpenAPIWebhooks.json:
  - `EVENTS.CUSTOMER.VOUCHER.LOYALTY_CARD.PENDING_POINTS.ACTIVATED`
  - `EVENTS.CUSTOMER.VOUCHER.LOYALTY_CARD.PENDING_POINTS.ADDED`
  - `EVENTS.CUSTOMER.VOUCHER.LOYALTY_CARD.PENDING_POINTS.CANCELED`

## 2025-01-27

- Added the `pending_points` property to schemas:
  - `VoucherBase`
  - `LoyaltyMember`
  - `RedeemableVoucher`
  - `SimpleLoyaltyCard`
  - `LoyaltiesMembersTransfersCreateResponseBody`
  - `LoyaltyCardTransaction`
- Added the `pending_points` property to `EarningRuleBase`
- Added `PENDING_POINTS_ACTIVATION` to `LoyaltyCardTransactionsType`
- Added the `pending_points` property to `VoucherTransaction`, `LoyaltyCardTransaction`
- Added new schemas `EventCustomerLoyaltyCardPendingPointsActivated` `EventCustomerLoyaltyCardPendingPointsAdded`, and `EventCustomerLoyaltyCardPendingPointsCanceled` to `MemberActivityData` and `CustomerActivityData`
- Added `EVENTS.VOUCHER.LOYALTY_CARD.PENDING_POINTS.ACTIVATED` `EVENTS.VOUCHER.LOYALTY_CARD.PENDING_POINTS.ADDED`, and `EVENTS.VOUCHER.LOYALTY_CARD.PENDING_POINTS.CANCELED` together with associated schemas to OpenAPIWebhooks.json

## 2025-01-16

Added the following endpoints:
- GET `/loyalties/{campaignId}/pending-points`
- GET `/loyalties/{campaignId}/members/{memberId}/pending-points`
- GET `/loyalties/members/{memberId}/pending-points`
- POST `/loyalties/members/{memberId}/pending-points/{pendingPointsId}/activate`
- POST `/loyalties/members/{memberId}/pending-points/{pendingPointsId}/cancel`

Added the following schemas:
- `LoyaltiesCampaignPendingPointsListResponseBody`
- `LoyaltiesMembersPendingPointsListResponseBody`
- `ListPendingPoints`
- `LoyaltyPendingPoints`
- `LoyaltyPendingPointsDetails`
- `LoyaltiesMembersPendingPointsActivateResponseBody`

## 2025-01-15
- Removed [Beta] tag from the Management endpoints.

## 2025-01-14

- Added `expand` query parameter to GET `/v1/loyalties`
- Added `all_stores` to the `AreaStoreCampaignAssignment` schema and `AccessSettingsAssignmentsList` (OpenAPIWebhooks.json)
- Added `area_all_stores_ids` to the `AccessSettings` schema

## 2025-01-09

- Changed descriptions of the `points` property which relate to overall points accrued during the lifetime of a loyalty card.

## 2024-12-19

Added `application_details` property to Qualifications, Validations, and Redemptions, and the associated `ApplicationDetails` schema

## 2024-12-12

- Removed `bundle_rules` from the `ValidationRuleBase` schema – the feature is not released yet
- Added `holder_loyalty_tier` to OpenAPIWebhooks.json and OpenAPI.json with the following schemas:
  - `EventCustomerLoyaltyCardPointsAdded`
  - `EventCustomerVouchersLoyaltyPointsExpired`
  - `EventCustomerLoyaltyCardPointsTransferred`
  - `LoyaltyCardTransaction`
  - `VoucherTransaction`


## 2024-12-05

- Added the `order_item_units` array to the `ApplicableTo` schema
- Changed the following summary, file names, and titles:
  - `Get Points Expiration` to `List Loyalty Card Point Expiration`
  - `Create Points Expiration Export` to `Export Loyalty Campaign Point Expiration`


## 2024-12-04

Added `ValidationRuleBundleRules` schema and `bundle_rules` to the `ValidationRuleBase` schema

## 2024-12-03

Remove `validation_rules` from Create Loyalty Campaign endpoints by swapping `CampaignsCreateBaseValidationRules` to `CampaignsCreateBase` in `CampaignsCreateLoyaltyCampaign`.

## 2024-11-28

Make `access_settings_assignments` appear in GET `v1/campaigns` response:
- Remove `access_settings_assignments` from the `Campaign` schema
- Add `access_settings_assignments` to the `CampaignBase` schema

## 2024-11-26

- Added the `metadata` object to the `sku` in:
  - `OrderCalculatedItem` schema
  - `OrderItem` schema
  - Improved descriptions in `metadata` for products, skus, and items

## 2024-11-25

- Added `error.message` to the `Error` schema.
- Added `STANDALONE` type to the following schemas:
  - `CampaignBase`
  - `CampaignsCreateBase`
  - `SimpleCampaign`
  - and respective changes in `OpenAPIWebhooks.json`
- Updated the descriptions regarding standalone vouchers and campaigns (v20241004)
- Added the `access_settings_assignments` to the `ParameterExpandListCampaigns` schema

## 2024-11-21

- Refactored `ValidationRuleConditions`:
  - Added the description of new conditions: `$after`, `$before`, `$more_than_ago`, `$less_than_ago`, `$is_days_ago`, `$more_than_future`, `$less_than_future`, `$is_days_in_future`
  - Added or changed the following schemas:
    - `Any` – remodelled it allow strings, strings in a date-time format, numbers, and objects in an array
    - `AnyOne` – this is the `Any` schema but accepts only one item in the array
    - `AnyNumber` – `AnyOne`, but only for numbers
    - `AnyString` – `Any`, but only for strings
    - `AnyDateTime` – `AnyString`, but only for date-time format

## 2024-11-15

- Restored `ParameterPage` schema `maximum` value to 100 – bug reported by a client
- Added a new `ParameterPage99` schema with `maximum` value equal to 99, as only the following methods have the page limit set to 99:
  - GET `v1/customers`
  - GET `v1/vouchers`
  - GET `v1/redemptions`

## 2024-11-14

Fixed `ParameterPage` schema `maximum` value to 99 – bug reported by a client

## 2024-11-12

- Added `404` errors to:
  - GET `v1/loyalties/members/{memberId}/activity`
  - GET `v1/loyalties/{id}/members/{memberId}/activity`
  - GET `v1/customers/{id}/activity`

## 2024-11-08

- Added the following endpoint methods with associated schemas:
  - POST `v1/loyalties/{campaignId}/transactionsexport`
  - POST `v1/campaigns/{campaignId}/transactions/export`
- Fixed filtering in:
  - GET `v1/loyalties/{campaignId}/members/{memberId}/transactions`
  - GET `v1/loyalties/members/{memberId}/transactions`


## 2024-11-06

- Drop `[Beta]` tags from:
  - `management/v1/projects/{projectId}/templates/campaigns/{campaignTemplateId}/copy` – POST
  - `management/v1/projects/{projectId}/templates/campaigns` – GET
  - `v1/templates/campaigns/{campaignTemplateId}/tier-setup` – POST
  - `v1/templates/campaigns/{campaignTemplateId}/campaign-setup` – POST
  - `v1/templates/campaigns/{campaignTemplateId}` – GET, DELETE, PUT
- Added `name` property in `ValidationsRedeemableSkipped`, `ValidationsRedeemableApplicable`, and `ValidationsRedeemableInapplicable` schemas as it is a promotion tier name returned in validations with the expand option
- Added `created_at` filter to `v1/loyalties/members/{memberId}/transactions` and `v1/loyalties/{campaignId}/members/{memberId}/transactions` endpoints

## 2024-11-04
- Added support for returning `campaign_id` and `campaign_name` in stackable validation endpoint, when `redeemable` option is expanded

## 2024-10-25

- Fixes, updates, refactorings:
  - Added `SimpleEvent`, `VoucherBalance`, `GiftVoucherTransactionsType`, `LoyaltyPointsBucket`, `VoucherTransactionBase` (on the basis of `VoucherTransaction`) schemas and added them where relevant
  - `VoucherTransaction` includes `VoucherTransactionBase` and relevant gift voucher or loyalty card `type`s
  - Described `customer_event` in `EventCustomerRewarded` schema
- Added the following endpoints with associated schemas:
  - `v1/loyalties/{campaignId}/transactions`
  - `v1/campaigns/{campaignId}/transactions`

## 2024-10-23

- Added `auto_redeem` flag to `RewardAssignmentParameters`, `RewardsAssignmentsCreateDigitalOrMaterialRewardRequestBody`, and `RewardsAssignmentsUpdateRequestBody` schemas
- Added `AUTO_REDEEM` to `channel_type` property in the `RedemptionBase` schema

## 2024-10-22

Fixes and updates:
- `ValidationEntity` schema has now correct objects for `redeemables`, `skipped_redeemables`, and `inapplicable_redeemables`
- Added info that each redeemable can be added once in validation/redemption endpoints
- Improved description for `options.expand.redeemable` option
- Improved descriptions for `categories.hierarchy`
- Fixed links to the Stacking Rules documentation throughout descriptions
- Removed `DISCOUNT_VOUCHER` from `enum` in the `referee_reward` property
- Redemption -> RedemptionWithVoucherCategories
- RedemptionRedeem -> Redemption
- VoucherQualificationValidationRedemption -> VoucherWithStackingRulesTypeCategories

## 2024-10-21

- Changes to POST `v1/qualifications`, POST `v1/validations` POST `v1/redemptions` and client-side versions – only these endpoints should return `vouchers.categories.stacking_rules_type`

## 2024-10-17

Fixed `security` field in the `/v1/exports/{export_Id}.get` path.

## 2024-10-11

Changed the structure of the `ValidationRuleRules` schema. The recurrence of the schema caused performance issues with Readme pages that use the schema. Fixed by copying the schema and allowing 3 levels of nesting.

## 2024-10-10
- refactoring `v1/metadata-schemas/{resource}` and `v1/metadata-schemas` use MetadataSchemasGetResponseBody & MetadataSchemasListResponseBody
- refactoring `/v1/locations/{locationId}` and `/v1/locations` use LocationsGetResponseBody & LocationsListResponseBody
- `filter` property in schemas ProductCollectionsCreateRequestBody, ProductCollectionsCreateResponseBody and ProductCollectionsGetResponseBody has changed. Uses additionalProperties.
- refactored `referrals` endpoints. - https://github.com/voucherifyio/voucherify-openapi/commit/30fc8382917a6d0db6d05d5edf68526f63d325b1

## 2024-10-10
- refactoring /templates - deleted `TemplatesCreateCampaignFromTemplateBody`, renamed schemas to match `path+action+request/response+body`
- commit https://github.com/voucherifyio/voucherify-openapi/commit/a95ce3e404cccb1a92e6ed1f3343bc9d6e074d3e

## 2024-10-09

- Added the GET `/management/v1/projects/{projectId}/templates/campaigns"` and POST `/management/v1/projects/{projectId}/templates/campaigns/{campaignTemplateId}/copy` endpoints with the associated schemas:
  - `ManagementTemplatesCampaignsCopyRequestBody`, `ManagementTemplatesCampaignsListResponseBody`, 

## 2024-10-08

- Added the POST `v1/templates/campaign/{campaignTemplateId}/tier-setup` endpoint and associated schemas:
  - `PromotionTierCreateBase` (edited out of `PromotionTierCreate`),`TemplatesCampaignsAddTierFromTemplateRequestBody`, `TemplatesCampaignsAddTierFromTemplateResponseBody`
- Renamed the `17_res_obj_get_async_action_result_products_import_csv` schema to `AsyncActionResultProductsImportCSV` (responses in the Get Async Action endpoint).

## 2024-10-02
https://github.com/voucherifyio/voucherify-openapi/pull/797/files#diff-b489d733b8287aa4e95ebb17457df080e796eae9abcd9408d0c4c096bace6bb9
to be described

## 2024-09-30

Added the following endpoints:
- POST `v1/templates/campaign`
- GET `v1/templates/campaign/{campaignTemplateId}`
- PUT `v1/templates/campaign/{campaignTemplateId}`
- DELETE `v1/templates/campaign/{campaignTemplateId}`
- POST `v1/templates/campaign/{campaignTemplateId}/campaign-setup`

Added or updated the following schemas:
- `ParameterCampaignTemplateId`, `CampaignsCreateBaseValidationRules`, `AccessSettings`, `TemplatesCampaignsCreateRequestBody`, `TemplatesCampaignsUpdateRequestBody`, `TemplatesCampaignsNameDescription`, `TemplatesCampaignsGetResponseBody`, `TemplatesCampaignsListResponseBody`, `TemplatesCampaignsCreateFromTemplateRequestBody`, `TemplatesCampaignsCreateFromTemplateResponseBody`, `TemplatesCampaignsCreateTemplateResponseBody`, `CampaignTemplateBase`, `CampaignTemplateBody`, `TemplatesCreateCampaignFromTemplateBody`, 

## 2024-09-24

- Removed Giveaway/`LUCK_DRAW` schemas and other data for v20240902
- Updated titles and descriptions for:
  - `RedeemPromotionStack`
  - `RedeemPromotionTier`
  - `RedeemGiftCard`
  - `RedeemLoyaltyCard`
  - `RedeemVoucher`
- Fixes to descriptions:
  - `override` flag in the `Order` object
  - broken link in `Validate Voucher [Deprecated]`

## 2024-09-16

- Updated the following endpoints with new paging methods:
  - GET `/v1/vouchers/{campaignId}/transactions`
  - GET `/v1/loyalties/{campaignId}/members/{memberId}/transactions`
  - GET `/v1/loyalties/members/{memberId}/transactions`

## 2024-09-12

Added the descriptions to the following fields in the `ApplicableTo` schema:
- `order_item_indices`
- `repeat`
- `skip_initially`
- `target`

Added two new effects to the `enum` in `ApplicableToEffect` schema:
- `APPLY_FROM_CHEAPEST`
- `APPLY_FROM_MOST_EXPENSIVE`

The changes also apply to the `OpenAPIWebhooks.json` file.

Changes to responses to GET `/v1/async-actions/{asyncActionId}` for bulk updates to customer, product, and voucher, including metadata bulk updates:
- Removed the `errors` object from the `AsyncActionsVoucherCustomerProductBulkUpdateResult` schema
- Added a separate `errors` object in the following schemas:
  - `AsyncActionResultCustomersBulkUpdateResponseBody`
  - `AsyncActionResultCustomersMetadataUpdateResponseBody`
  - `AsyncActionResultProductsBulkUpdateResponseBody`
  - `AsyncActionResultProductsMetadataUpdateResponseBody`
  - `AsyncActionResultVouchersBulkUpdateResponseBody`
  - `AsyncActionResultVouchersMetadataUpdateResponseBody`
- Removed the reference to the `Error` schema in the above-mentioned schemas

## 2024-09-06

`OpenAPI.json` and `OpenAPIWebhooks.json` - removed references to consent feature; removed among others:
- `customer.consents.given` and `customer.consents.revoked` events
- `18_res_list_consents_GET`, `CustomersConsentsUpdateRequestBody`, `ClientCustomersConsentsUpdateRequestBody`, `EventCustomerConsents`, `EventCustomerConsentsGiven`, `EventCustomerConsentsRevoked`, `SimpleConsent` schemas
- GET `/v1/consents` and `/client/v1/consents`, PUT `/v1/customers/{customerId}/consents` and `/client/v1/customers/{customerId}/consents` endpoints
- `/EVENTS.CUSTOMER.CONSENTS.GIVEN` and `/EVENTS.CUSTOMER.CONSENTS.REVOKED` and referred to schemas

## 2024-09-03
- Merged https://github.com/voucherifyio/voucherify-openapi/pull/793

## 2024-09-02

- Removed `created_at` and `-created_at` from the `order` query parameter for List Bin Entries – `ParameterOrderListBin`

## 2024-08-26

- Added the `Templates` tag and the following endpoints:
  - GET `/v1/templates/campaigns`
  - POST `/v1/templates/campaigns`

## 2024-08-21

- Added the `AsyncActionsVoucherCustomerProductBulkUpdateResult` schema for the results of the GET Async Action endpoint for the following bulk update actions:
  - POST Update Vouchers in bulk
  - POST Update Vouchers' metadata in bulk
  - POST Update Customers in bulk
  - POST Update Customers' Metadata in bulk
  - POST Update Products in bulk
  - POST Update Products' Metadata in bulk
- Changes to descriptions to the above-mentioned endpoints
- Added error 413 to the above-mentioned endpoints
- Added `enum` to the `CampaignLoyaltyCard` and `AsyncActionBase` schemas

## 2024-08-07
`OpenAPI.json`
- New shemas `CreatePublicationWithoutSpecifyingVoucher`, `LoyaltiesMembersCreateResponseBody`
- Added property `channel` to `CreatePublicationBase`

## 2024-08-07
`OpenAPI.json`
- New schemas: `LoyaltiesGetCampaignResponseBody`, `LoyaltiesListCampaignsResponseBody`, `ParameterCode`, `ParameterIds`, `LoyaltyMember`, `LoyaltiesListMembersResponseBody`, `LoyaltiesMembersGetResponseBody`

## 2024-08-13
- Added updated the description to `PromotionStackBase`, `PromotionsStacksUpdateRequestBody`, and `SimplePromotionStack` with the info about 30 promotion tiers in one stack

## 2024-08-06
`OpenAPI.json`
- New schemas: `LoyaltyCampaign`, `LoyaltyCampaignVoucher`, `LoyaltiesCreateCampaignRequestBody`, `LoyaltiesCreateCampaignResponseBody`, `LoyaltiesUpdateCampaignRequestBody`, `LoyaltiesUpdateCampaignResponseBody`

## 2024-08-06
`OpenAPI.json`
- New schemas: `LoyaltiesRewardsCreateAssignmentRequestBody`, `LoyaltiesRewardsCreateAssignmentResponseBody`, `LoyaltiesRewardsCreateAssignmentItemRequestBody`, `LoyaltiesRewardsUpdateAssignmentRequestBody`, `LoyaltiesRewardsUpdateAssignmentResponseBody`
- Schema renamed:
  - `VouchersImportCreateRequestBodyItem` -> `VouchersImportCreateItemRequestBody`
  - `VouchersUpdateInBulkRequestBodyItem` -> `VouchersUpdateInBulkItemRequestBody`
  - `VouchersImportCreateRequestBodyItem` -> `VouchersImportCreateItemRequestBody`
  - `VouchersImportCreateRequestBodyItemRedemption` -> `VouchersImportCreateItemRequestBodyRedemption`
  - `VouchersImportCreateRequestBodyItemMetadata` -> `VouchersImportCreateItemRequestBodyMetadata`
  - `VouchersUpdateInBulkRequestBodyItem` -> `VouchersUpdateInBulkItemRequestBody`

## 2024-08-06
`OpenAPI.json`
- New schemas: `LoyaltiesRewardsListAssignmentsResponseBody`, `LoyaltiesRewardAssignmentsListResponseBody`

## 2024-08-05
`OpenAPI.json`
- New schemas: `VouchersUpdateInBulkRequestBody`, `VouchersUpdateInBulkRequestBodyItem`
- renamed `ParameterCategory` into `ParameterActivityCategory`

## 2024-08-02-02
`OpenAPI.json`
- New schemas: `VouchersImportCreateRequestBody`, `VouchersImportCreateRequestBodyItem`, `VoucherImportLoyaltyCard`, `VoucherImportGift`, `VoucherImportDiscount`, `VouchersImportGiftVoucherRequestBody`, `VouchersImportDiscountVoucherRequestBody`, `VoucherImportBase`, `CampaignsImportVoucherItem`

## 2024-08-02-02
`OpenAPI.json`
- New schemas: `VouchersMetadataUpdateInBulkRequestBody`, `EarningRuleBase`

## 2024-08-02

`OpenAPI.json`
- refactored `/v1/vouchers` GET and POST
- refactored `/v1/vouchers/{code}` POST and PUT
- Added `VoucherWithCategories`, `VoucherBase`, `VouchersCreateRequestBody`, `VoucherCreateLoyaltyCard`, `VoucherCreateGiftWithSpecificCodeOrCodeConfig`, `VoucherCreateGiftWithSpecificCode`, `VoucherCreateGiftWithCodeConfig`, `VoucherUpdateGift`, `VoucherCreateGift`, `VoucherCreateDiscountWithSpecificCodeOrCodeConfig`, `VoucherCreateDiscountWithSpecificCode`, `VoucherCreateDiscountWithCodeConfig`, `VoucherCreateDiscount`, `VoucherUpdateDiscount`, `VoucherCreateBase`, `VouchersListResponseBody`, `VoucherUpdateBase`, `VouchersUpdateRequestBody`, `CodeConfigBase`
- `Voucher` is now created from `VoucherBase` 

## 2024-07-30

  `OpenAPI.json`
- Added parameter `ParameterRedeemableHolderId`
- Schema `Session` - property `key` is no longer `enum`
- Added `RewardsListResponseBody`, `PromotionsTiersCreateRequestBody`, `PromotionsTiersCreateResponseBody`, `PromotionsTiersUpdateRequestBody`, `PromotionsTiersUpdateResponseBody`, `PromotionTierUpdate`, `PromotionTierCreateParams`, `RewardsCreateRequestBodyMaterial`, `RewardsCreateRequestBodyDigital`, `RewardsCreateRequestBodyDigitalParameters`, `RewardsCreateRequestBodyPayWithPoints`,  `RewardsUpdateRequestBody`, `RewardsUpdateRequestBodyDigital`, `RewardsUpdateRequestBodyPayWithPoints`, `RewardsUpdateRequestBodyMaterial`, `RewardsUpdateRequestBodyDigitalParametersLoyaltyProgram`, `RewardsUpdateRequestBodyDigitalParametersGiftVouchers`, `RewardsUpdateRequestBodyDigitalParametersDiscountCoupons`, `RewardsUpdateRequestBodyDigitalParameters`, `RewardsUpdateRequestBodyMaterialParameters`, `RewardsUpdateRequestBodyPayWithPointsParameters`, `RewardsCreateRequestBodyDigitalParametersLoyaltyProgram`, `RewardsCreateRequestBodyDigitalParametersGiftVouchers`, `RewardsCreateRequestBodyDigitalParametersDiscountCoupons`, `RewardsCreateRequestBodyMaterialParameters`, `RewardsCreateRequestBodyPayWithPointsParameters`,`SegmentsCreateRequestBodyStatic`,  `SegmentsCreateRequestBody`, `SegmentsGetResponseBody`, `SegmentsCreateResponseBody`, `SegmentsCreateRequestBodyDynamic`, `AsyncActionGetResponseBody`, `AsyncAction`, `AsyncActionsListResponseBody`, `ReferralsMembersHoldersCreateInBulkRequestBody`, `ReferralsMembersHoldersCreateInBulkResponseBody`, `RedemptionEntry`, `ClientPromotionsTiersListResponseBody`
- Deleted `CodeConfigRequiredLengthCharsetPattern`
- Deleted ordering by `created_at` and `-created_at` from `ParameterOrderListRedeemables` for endpoints with `redeemable_holders`

  `OpenAPI.json` and `OpenAPIWebhooks.json`:
- Added `AccessSettingsCampaignAssignmentsList` and `AreaStoreCampaignAssignment` schemas for the Areas and Stores feature
- Added `access_settings_assignments` field to the `Campaign` schema

## 2024-07-29

- Added POST `v1/referrals/{campaignId}/members/{memberId}/holders` and `v1/referrals/members/{memberId}/holders`
- Added DELETE `v1/referrals/{campaignId}/members/{memberId}/holders/{holderId}` and `v1/referrals/members/{memberId}/holders/{holderId}`
- Added a `holder_role` filter to Qualifications

## 2024-07-15

`OpenAPI.json`:
- Added a new endpoint, Invite a New User (**POST** `v1/management/v1/projects/users/invite`), and associated schemas:
  - ManagementProjectsUserInviteCreateRequestBody
  - ManagementProjectsUserInviteParameters
- Added the ManagementProjectsSideKeys schema for app ID and app token in the server-side and client-side objects, which are returned in the **POST** `v1/management/v1/projects/` endpoint

## 2024-07-10
- added schemas `ValidityTimeframe` and `ValidityDayOfWeek`, replaced everywhere `validity_day_of_week` with ref to `ValidityDayOfWeek`, replaced everywhere `validity_timeframe` with ref to `ValidityTimeframe`

`OpenAPI.json`:
- fixed invalid schemas
- ListPublicationsItemBase[metadata] removed all required
- ListPublicationsItemBase added new property `vouchers`
- ValidationsValidateResponseBody[skipped_redeemables] fixed (replaced ValidationsRedeemableInapplicable with ValidationsRedeemableSkipped)
- ValidationsValidateResponseBody added new property `stacking_rules` with flag required
- added required `"required": ["status","id","object","result"]` on `ValidationsRedeemableSkipped`, `ValidationsRedeemableInapplicable` and `ValidationsRedeemableApplicable`
- ValidationsRedeemableInapplicable[result] added new property `details`
- ValidationsRedeemableInapplicable added new properties `metadata` and `categories`
- ValidationsRedeemableSkipped[result] added new property `details`
- ValidationsRedeemableSkipped added new properties `metadata` and `categories`
- added schemas `ValidationsRedeemableSkippedResultLimitExceeded`, `ValidationsRedeemableSkippedResultCategoryLimitExceeded`, `ValidationsRedeemableSkippedResultRedeemablesLimitExceeded`, `ValidationsRedeemableSkippedResultRedeemablesCategoryLimitExceeded`, `ValidationsRedeemableSkippedResultExclusionRulesNotMet`, `ValidationsRedeemableSkippedResultPrecedingValidationFailed`
- StackingRules added properties: `applicable_redeemables_per_category_limit`, `applicable_exclusive_redeemables_per_category_limit`, and added required on `redeemables_application_mode` and `redeemables_sorting_rule`
- fixed ManagementProjectsMetadataSchema and its usages.
- OrderCalculatedBase updated property items[array] ref from `OrderItemCalculated` to `OrderItem`
- OrderItem added property `object` - enum `order_item`
- OrderItem added properties `applied_discount_amount`, `applied_discount_quantity`, `applied_quantity`, `applied_quantity_amount`, `subtotal_amount`
- SimpleOrderItem added properties `id`, `applied_quantity`, `applied_quantity_amount`, `applied_discount_quantity`, `subtotal_amount`
- SimpleRedemption added property `status`

## 2024-06-25

- Changed the order of tags – `Referrals` is now under `Loyalties`

## 2024-06-24

`OpenAPI.json`:
- POST `v1/exports` – voucher export – added `discount_effect`, `formula`, and `validation_rules_id` fields
- GET List `v1/async-actions` and GET `/v1/async-actions/{asyncActionId}` – added `operation_status` field to responses
- Added `validity_hours` to various schemas regarding campaigns, earning rules, promotions, and vouchers
- Unified descriptions and `enum` for `validity_day_of_week`
- Changes to GET `List Member Holders [Beta]`:
  - Changed to `List Referral Code Holders [Beta]`
  - Changed descriptions
  - Removed `campaign_id`, `campaign_type`, `redeemable_id`, `redeemable_object`, `voucher_type`

`OpenAPIWebhooks.json`:
- Added `validity_hours` to various schemas regarding campaigns, earning rules, promotions, and vouchers

## 2024-06-19

Added two Referral endpoints:
- GET `/v1/referrals/members/{memberId}/holders`
- GET `/v1/referrals/{campaignId}/members/{memberId}/holders`

## 2024-06-13

- OpenAPI.json:
  - Added Validity Hours to schemas. 
  - Expanded `Campaign Base` model with Validity Hours object.
  - Expanded `Voucher` model with Validity Hours object.
  - Expanded `Promotion Tier` model with Validity Hours object.
  - Expanded `Earning Rule ` model with Validity Hours object.

 - OpenAPIWebhooks.json:
  - Added Validity Hours to schemas. 
  - Expanded `Campaign Base` model with Validity Hours object.
  - Expanded `Voucher` model with Validity Hours object.
  - Expanded `Promotion Tier` model with Validity Hours object.
  - Expanded `Earning Rule ` model with Validity Hours object.

## 2024-05-27

Added the two bin endpoints:
- GET List Bin Entries
- DELETE Delete Bin Entry

## 2024-05-23

- OpenAPIWebhooks.json:
  - Added the following events:
    - `EVENTS.CAMPAIGN.PROMOTION_TIER.CREATED`
    - `EVENTS.CAMPAIGN.PROMOTION_TIER.DELETED`
    - `EVENTS.CAMPAIGN.PROMOTION_TIER.DISABLED`
    - `EVENTS.CAMPAIGN.PROMOTION_TIER.ENABLED`
    - `EVENTS.CAMPAIGN.PROMOTION_TIER.UPDATED`
    - Removed the `.MAIN` suffix from the `CUSTOMER.REWARDED` event
- OpenAPI.json:
  - Changed the keys from `default` to `example` in `1_obj_voucher_object_discount_{discountType}_POST` schemas
  - Added missing `type` property to the `1_obj_voucher_object_discount_percentage_PUT` schema

## 2024-05-15

- Removed the `mode` parameters from Qualifications. For now, the only mode is `BASIC`, it is a default one, and the `ADVANCED` mode will not be developed any time soon
- Changed the Validation Rule Assignment request to a new form: `"related_object_type"` and `"related_object_id"`

## 2024-05-14

- Event documentation:
  - Added three new events:
    - `customer.reward_redemptions.created`
    - `customer.reward_redemptions.pending`
    - `customer.reward_redemptions.completed`

## 2024-05-10

- Added Management API endpoints for:
  - Custom Event Schemas (`POST`, `GET` all, `GET` one, `PUT`, `DELETE`)
  - Webhooks (`POST`, `GET` all, `GET` one, `PUT`, `DELETE`)
  - Brand (`POST`, `GET` all, `GET` one, `PUT`, `DELETE`)
- Updated Management API endpoints for v20240405
- Added `"order_id"` field to Export Redemptions in the Export endpoint
- Removed `"ReferrerWithSummaryLoyaltyReferrals"` and `"CustomerWithSummaryLoyaltyReferrals"` from `"OrderCalculatedNoCustomerData"`

## 2024-05-06

Added examples to Custom metadata schema endpoints

## 2024-04-26

- Added Management API endpoints for:
  - Metadata Schemas (`POST`, `GET` all, `GET` one, `PUT`, `DELETE`)
- Improvements to existing Management API endpoints
- Deleted deprecated `Get Member Activities` endpoints

## 2024-04-24

- Changes to Project endpoints
- Changes to List Customer Redeemables
- Added Custom Metadata Schema endpoints – hidden for now


## 2024-04-19

- Added Management API endpoints for:
  - Projects (`POST`, `GET` all, `GET` one, `PUT`, `DELETE`)
  - Users (`POST`, `GET` all, `GET` one, `PUT`, `DELETE`)
  - Stacking rules (`POST`, `GET` all, `GET` one, `PUT`, `DELETE`)

## 2024-04-11

- Added GET List Customer Redeemables endpoint

## 2024-04-04

- `"voucher"` schema – deleted the following:
  - `"deleted"`.
  - `"redeemed_amount"` in `"redemption"`.
- `"redemption"` schema – changed the wording for `"amount"`.

## 2024-03-29
- Removed "holder" object and "distribution" array of objects from Voucher definition
- `CONTRIBUTING.md` – fixed style. Added info about contributing to OpenAPIWebhooks.json

## 2024-03-20

- OpenAPIWebhooks.json:
  - Added a better example for the `customer.loyalty.tier.prolonged` event
  - Added `MANUAL_DISTRIBUTION_SCHEDULE` event
    - The `paths` object `/EVENTS.DISTRIBUTION.MANUAL_DISTRIBUTION_SCHEDULE` is a workaround; the actual event is called `MANUAL_DISTRIBUTION_SCHEDULE`
  - Added `categories` to the `SimpleCampaign` and `SimpleVoucher` schemas
  - Updated the `WebhookDistributionPayload` schema
- OpenAPI.json:
  - Added the GET `/v1/loyalties/members/{memberId}/activity` endpoint and its associated schemas
  - Added the GET `/v1/loyalties/{id}/members/{memberId}/activity` endpoint and its associated schemas
  - Added the `SimpleCustomEvent` schema
  - Added the `campaign_type` filter for the POST `/v1/qualifications` endpoint
  - Updated the `EventCustomerCustomEvent` schema
  - Updated the `"publications"` object for events
  - Added the `ParameterOrderCreatedAt` schema

## 2024-03-13

- OpenAPIWebhooks.json:
  - Changed webhook documentation into Event documentation. Now, individual pages describe only the events
  - Added base webhook payload to the `introduction-to-webhook.md` file for distribution webhooks and project settings webhooks
  - Added the following events for distribution webhooks:
    - `customer.loyalty.tier.upgraded`
    - `customer.entered.segment`
    - `customer.order.paid`
    - `customer.voucher.loyalty_card.points_added`
    - `customer.order.updated`
    - `customer.order.created`
    - `customer.order.canceled`
    - `customer.segment.left`
  - Relevant changes to custom webhook pages
  - Added `category`, `start_date`, `expiration_date`, `description` to the `SimpleCampaign` schema
  - Added `start_date` and `expiratotion_date` to the `SimpleVoucher` schema
- OpenAPI.json:
  - Added GET `/v1/customers/{id}/activity` endpoint
  - Deprecated GET `/v1/customers/{id}/activities`
  - Removed inadequate request body parameters for POST `/v1/campaigns/{campaignId}/import`

## 2024-02-28

OpenAPI.json:
- Added `metadata` object to the following schemas (release v20240124):
  - `SimpleCampaign`,
  - `SimpleVoucher`,
  - `SimplePromotionTier`.
- Updated the `page` objects' descriptions with: `The lowest value is 1.`.
  - Fixed several articles to correctly display interactive `page` and limit `fields`.
- Added `order.initial_amount` to the `ValidationRuleRules` schema.
- Fixed `number` to `integer` on the "Validation Rule Object" page.
- Added `updated_at` filter to `ExportCustomerFilters` schema. Tested for `$before`, `$after`, `$is` – works. The `$is_not` fitler does not work.
- Added a `SimplePromotionStack` schema because `promotion_stack` was added to customer redemption events.
- Changed info about the maximum of vouchers returned in List Vouchers
- Changed descriptions to `total`, `balance`, and `points` descriptions for List Voucher Transactions
- Added `deprecated` note to the `birthday` properties
- Info about an async action to Add or Remove Loyalty Card Balance articles
- Fixed the table in the `ValidationRuleRules` schema.

OpenAPIWebhooks.json:
- Added a `SimplePromotionStack` schema because `promotion_stack` was added to customer redemption events.

## 2024-02-22

- Fixed the title for `"QualificationsFiltersCondition"` object.
- Added the following webhooks to OpenAPIWebhook.json:
  - EVENTS.CAMPAIGN.ENABLED
  - EVENTS.CAMPAIGN.DISABLED
  - EVENTS.CAMPAIGN.CREATED
  - EVENTS.CAMPAIGN.UPDATED
  - EVENTS.CAMPAIGN.DELETED
  - EVENTS.CAMPAIGN.VOUCHERS.GENERATION.COMPLETED

## 2024-02-16

Added the following webhooks to OpenAPIWebhooks.json:
- EVENTS.BUS_VAL_RULE.ASSIGNMENT.CREATED
- EVENTS.BUS_VAL_RULE.ASSIGNMENT.DELETED
- EVENTS.BUS_VAL_RULE.CREATED
- EVENTS.BUS_VAL_RULE.UPDATED
- EVENTS.BUS_VAL_RULE.DELETED

## 2024-02-14

Added the following webhooks to OpenAPIWebhooks.json:
- EVENTS.VOUCHER.PUBLISHED
- EVENTS.VOUCHER.UPDATED
- EVENTS.VOUCHER.DELETED
- EVENTS.VOUCHER.CREATED
- EVENTS.VOUCHER.ENABLED
- EVENTS.VOUCHER.DISABLED
- EVENTS.VOUCHER.LOYALTY_CARD.POINTS_ADDED

## 2024-02-13

- Added an introductory page for webhooks.
- Fixes to `CUSTOMER.CREATED` and `CUSTOMER.DELETED` schemas

## 2024-02-12

Added the following webhooks to OpenAPIWebhooks.json:
- EVENTS.VOUCHER.PUBLISHED
- EVENTS.VOUCHER.UPDATED
- EVENTS.VOUCHER.DELETED
- EVENTS.VOUCHER.CREATED
- EVENTS.VOUCHER.ENABLED
- EVENTS.VOUCHER.DISABLED
- EVENTS.VOUCHER.LOYALTY_CARD.POINTS_ADDED

## 2024-02-08

- Added info to `Redemption rollback` and `Stackable redemption rollback` about the 3 months limit for rollbacks.
- Added the following webhooks:
  - REDEMPTION:
    - EVENTS.REDEMPTION.SUCCEEDED
    - EVENTS.REDEMPTION.FAILED
    - EVENTS.REDEMPTION.ROLLBACK.SUCCEEDED
    - EVENTS.REDEMPTION.ROLLBACK.FAILED
  - CUSTOMER:
    - EVENTS.CUSTOMER.CREATED
    - EVENTS.CUSTOMER.DELETED
    - EVENTS.CUSTOMER.REWARDED.MAIN
    - EVENTS.CUSTOMER.REWARDED.LOYALTY_POINTS
    - EVENTS.CUSTOMER.CONSENTS.REVOKED
    - EVENTS.CUSTOMER.CONSENTS.GIVEN
  - PUBLICATION:
    - EVENTS.PUBLICATION.SUCCEEDED
