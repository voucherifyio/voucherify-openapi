

--------------------

Older changes in [DEPRECATED.md](deprecated/DEPRECATED.md)


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
