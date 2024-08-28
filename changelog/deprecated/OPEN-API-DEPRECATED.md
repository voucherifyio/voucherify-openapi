### This file is closed! PLease check [OPEN-API.md](../OPEN-API.md) or [ARTICLES.md](../ARTICLES.md) for newer changes

----------------------------------------------------------------

# Changelog - DEPRECATED

## 20240130

Update to the API version upgrades article regarding the v2024-01-01 webhook version.

## 20240117

Quick fix to the CSV export with API article.

## 20240112

Updates to:
- Rewritten the Development checklist article
- Changed slug in the Security article
- Changed the Sandbox and demoshop article to redirect to Help Scout article
- Changed the response example in the Client-side API article
- Changed images in the Integration Processes article

## 20240110

- Data parsing article added
- Changed the link in the Guides > Introduction for API Reference

## 20231213

- Integration processes article added

## 20231207

- Key concepts article updated after feedback

## 20231204

- Key concepts article added
- Minor fixes to a number of articles

## 20231128

- Data synchronization article added

## 20231128 – Fixes and minor updates

- Fixed to consistent title format (capital letters)
- Added excerpts
- Added green callouts in the Integration blueprint section
- Fixed an example email address in First Steps in Voucherify article
- Fixed image in the Integration Overview article
- Added link to the new article – Data Synchronization – in the Data Model article

## 20231123 - Campaigns API

**Added schemas**
- CampaignResponse
- CampaignVoucher
- CodeConfig
- CodeConfigResponse
- CampaignsImportVoucherLoyaltyCard
- CampaignLoyaltyCardResponse 
- CampaignLoyaltyCardResponse
- CampaignLoyaltyCardRequestBody
- LuckyDraw
- CampaignsCreateBase
- CampaignsUpdateBase
- CampaignsUpdateCouponCampaignBase
- CampaignsUpdateDiscountCouponsCampaign
- CampaignsUpdateGiftCampaign
- CampaignsUpdateReferralCampaign
- CampaignsUpdateLoyaltyCampaign
- CampaignsUpdateGiveawayCampaign
- CampaignsUpdatePromotionCampaign
- CampaignsCreateRequestBody
- CampaignsUpdateRequestBody
- CampaignsCreateDiscountCouponsCampaign
- CampaignsCreateReferralCampaign
- CampaignsCreateGiftCampaign
- CampaignsCreateLoyaltyCampaign
- CampaignsCreatePromotionCampaign
- CampaignsCreateGiveawayCampaign
- CampaignsCreateCampaignVoucherWithCodeRequestBody
- CampaignsCreateCampaignVoucherRequestBody
- CampaignsImportVoucherRequestBody
- CampaignsImportVoucherItem
- CampaignsListResponseBody
- DiscountCouponsCampaignVoucher
- ReferralCampaignVoucher
- GiveawayCampaignVoucher
- GiftCampaignVoucher
- LoyaltyCampaignVoucher
- PromotionTierCreateParams
- PromotionTiersList
- LoyaltyTiersExpirationAll

**Deleted schemas**
- 2_obj_campaign_object
- 2_req_create_campaign
- 2_req_create_campaign_discount_voucher
- 2_req_create_campaign_loyalty
- 2_req_create_campaign_gift
- 2_req_create_campaign_referral
- 2_req_create_campaign_promotion
- 2_req_update_campaign
- 2_req_add_vouchers_to_campaign
- 2_req_import_vouchers_to_campaign
- 2_obj_import_vouchers_to_campaign_object
- 2_res_list_campaigns
- 3_res_list_promotion_tiers_from_campaign
- 20_obj_category_object
- e_409_duplicate_found

## 20231117 - Quality Fixes

**Changed schemas**
- Fixed Products and ProductCollections schemas names (mostly `requestBody`) according to proper template.
- Fixed wrong required properties in Products and Discounts responses
- Using type null instead of nullable flag

## 20231120

- Changed category `Implementation blueprint` to `Development` and made all relevant changes to headers
- Changed images in `Welcome to Voucherify`
- Minor fixes in `Welcome to Voucherify` as per the Marketing's feedback

## 20231117

*Renamed schemas**
- OrdersCreateExportRequestBody (old `10_req_create_order_export`)
- OrdersCreateExportResponseBody (old `16_obj_export_object`)

**Added schemas**
- ExportOrderRequest

- POST `/v1/orders/import`
  - Request body schema was replaced with new one: `OrdersImportRequestBody` (old one: `10_req_orders_import`)

## 20231117

**Added schemas**

- OrdersImportRequestBody
- ValidationRulesListResponseBody
- ValidationRulesCreateRequestBody
- ValidationRuleResponse
- ValidationRuleRequest
- ValidationRulesUpdateRequestBody

- POST `/v1/orders/import`
  - Request body schema was replaced with new one: `OrdersImportRequestBody` (old one: `10_req_orders_import`)
- GET `/v1/validation-rules`
  - Response body schema was replaced with new one: `ValidationRulesListResponseBody` (old one: `13_res_list_validation_rules`)
- POST `/v1/validation-rules`
  - Request body schema was replaced with new one: `ValidationRulesCreateRequestBody` (old one: `13_req_create_validation_rule`)
  - Response body schema was replaced with new one: `ValidationRulesCreateResponseBody` (old one: `13_obj_validation_rule_object`)
- GET `/v1/validation-rules/{validationRuleId}`
  - Response body schema was replaced with new one: `ValidationRulesGetResponseBody` (old one: `13_obj_validation_rule_object`)
- GET `/v1/validation-rules/{validationRuleId}`
  - Request body schema was replaced with new one: `ValidationRulesUpdateRequestBody` (old one: `13_req_create_validation_rule`)
  - Response body schema was replaced with new one: `ValidationRulesUpdateResponseBody` (old one: `13_obj_validation_rule_object`)

## 20231116 - Redemptions

**Added schemas**

- Redemption
- RedemptionRollback
- RedemptionsGetResponseBody
- RedemptionsListResponseBody
- RedemptionsGetVoucherRedemptionResponseBody
- RedemptionsRollbackRequestBody
- RedemptionsRollbackResponseBody
- RedemptionRewardResult
- RedemptionsRollbackStackableResponseBody
- LoyaltiesRedeemRewardResponseBody

- GET `v1/redemptions`
  - Response body schema was replaced with new one: `RedemptionsListResponseBody` (old one: `7_res_list_redemptions`)
- GET `v1/redemptions/{redemptionId}`
  - Response body schema was replaced with new one: `RedemptionsGetResponseBody` (old one: `7_res_get_redemption`)
- GET `v1/vouchers/{code}/redemption`
  - Response body schema was replaced with new one: `RedemptionsGetVoucherRedemptionResponseBody` (old one: `7_res_get_vouchers_redemptions`)
- POST `v1/redemptions/{redemptionId}/rollback`
  - Request body schema was replaced with new one: `RedemptionsRollbackRequestBody` (old one: `7_req_rollback_redemption`)
  - Response body schema was replaced with new one: `RedemptionsRollbackResponseBody` (old one: `7_res_rollback_redemption`)
- POST `/v1/redemptions/{parentRedemptionId}/rollbacks`
  - Request body schema was added: `RedemptionsRollbackRequestBody`
  - Response body schema was replaced with new one: `RedemptionsRollbackStackableResponseBody` (old one: `19_res_redemptions_parentRedemptionId_rollbacks`)
- GET `v1/loyalties/{campaignId}/members/{memberId}/redemption`
  - Response body schema was replaced with new one: `LoyaltiesRedeemRewardResponseBody` (old one: `8_res_redeem_reward`)
- GET `v1/vouchers/{code}/redemption`
  - Response body schema was replaced with new one: `LoyaltiesRedeemRewardResponseBody` (old one: `8_res_redeem_reward`)

## 20231116

- Changed the order of the articles in the `Implementation Blueprint` category
- Moved `Authentication` and `API Endpoints` from the `Getting started` category to `Implementation Blueprint`
- Split the `Modeling Voucherify integration` article and created a `Scenario discovery` article out of that in the `Integration Blueprint` category
- Added `Integration connectors` and `Webhooks` articles to the `Implementation Blueprint`. The articles are actually links to respective articles on Help Scout
- Updated `Metadata mapping` (formatting, links)
- Updated `Test mode (Sandbox)` – removed deprecated section

## 20231113 - Removing Not Used Schemas

**Removed schemas**

- 3_res_list_promotion_stacks
- 3_req_create_promotion_stack
- 5_obj_publication_object
- 5_req_create_publication_from_campaign_one_specific_voucher
- 5_req_create_publication_from_campaign_multiple_vouchers
- 5_req_create_publication_campaign_id
- 5_req_create_publication_campaign_name
- 5_req_create_publication_campaign
- 5_res_create_publication_customer_id
- 5_res_create_publication_customer_source_id
- 5_req_create_publication_customer
- 5_obj_publication_object_discount
- 5_obj_publication_object_loyalty_card
- 5_obj_publication_object_gift_card
- 6_req_validate_voucher_discount_code
- 6_req_validate_voucher_gift_card
- 6_req_validate_voucher_loyalty_card
- 19_req_session_lock
- 19_res_session_lock
- 19_obj_voucher_object_discount_amount
- 19_obj_voucher_object_discount_amount_dynamic
- 19_obj_voucher_object_discount_percentage
- 19_obj_voucher_object_discount_percentage_dynamic
- 19_obj_voucher_object_discount_fixed_order
- 19_obj_voucher_object_discount_fixed_items
- 19_obj_voucher_object_discount_unit_one
- 19_obj_order_object_validation_res
- 19_obj_order_object_validation_res_per_redeemable
- 8_obj_loyalty_tier_object
- 8_obj_mapping_multiply
- 8_obj_mapping_fixed
- 9_req_update_customer
- 9_obj_customer_object
- 9_obj_customer_object_email_parameter
- 20_res_list_categories
- 20_req_update_categories_categoryId
- 20_req_create_category
- 20_res_create_category
- 23_obj_order_object
- 23_req_create_qualification_customer_id
- 23_req_create_qualification_customer_source_id
- 23_req_create_qualification_order_id
- 23_req_create_qualification_order_source_id

## 20231114

File changes:
- Added `project-setup-guide.md` file: article titled `Getting started`
- Fixed typo in `Qualifications.md`
- Moved `integrations-checklist.md` to `Implementation blueprint`
  - Changed the file name and title to `Implementation checklist`
  - Cleaned the article from links to currently hidden pages
- Moved `Quickstart.md` to `Implementation blueprint`
  - Changed title to `First steps in Voucherify`
- Changed the order of the files in the `Implementation blueprint` category

## 20231113 - Publications API

**Added schemas**

- CreatePublicationCampaign

**Other changes**

- Query params changed in `/v1/publications/create` `GET` request.

## 20231110 - Publications API

**Added schemas**

- PublicationsCreateRequestBody
- PublicationsCreateResponseSingleVoucherBody
- ListPublicationsItemBase
- ListPublicationsItemValidSingleVoucher
- ListPublicationsItemValidMultipleVouchers
- ListPublicationsItemInvalid
- PublicationsCreateResponseBaseBody
- PublicationsCreateResponseMultipleVouchersBody
- PublicationsCreateResponseBody
- PublicationsListResponseBody
- ValidationRulesAssignmentsList

- GET `/v1/publications`
  - Response body schema was replaced with new one: `PublicationsListResponseBody` (old one: `5_res_list_publications`)
- POST `/v1/publications`
  - Request body schema was replaced with new one: `PublicationsCreateRequestBody` (old one: `5_req_create_publication`)
  - Response body schema was replaced with new one: `PublicationsCreateResponseBody` (old one: `5_res_create_publication`)
- GET `/v1/publications/create`
  - Response body schema was replaced with new one: `PublicationsCreateResponseBody` (old one: `5_res_create_publication`)

## 20231108 - Orders API

**Added schemas**

- OrderRequestBase
- OrderResponseBase
- OrderResponseNoCustomerData
- OrdersCreateRequestBody
- OrdersCreateRequestBody
- OrdersUpdateRequestBody
- OrdersUpdateResponseBody
- OrdersGetResponseBody
- OrdersListResponseBody

- GET `/v1/orders`
  - Request body schema was replaced with new one: `OrdersListResponseBody` (old one: `10_res_list_orders`)
- POST `/v1/orders`
  - Request body schema was replaced with new one: `OrdersCreateRequestBody` (old one: `10_req_create_order`)
  - Response body schema was replaced with new one: `OrdersCreateResponseBody` (old one: `10_obj_order_object_no_discount_calculations`)
- GET `/v1/orders/{orderId}`
  - Request body schema was replaced with new one: `OrdersGetResponseBody` (old one: `10_obj_order_object`)
- PUT `/v1/orders/{orderId}`
  - Request body schema was replaced with new one: `OrdersUpdateRequestBody` (old one: `10_req_update_order`)
  - Response body schema was replaced with new one: `OrdersUpdateResponseBody` (old one: `10_obj_order_object`)

## 20231107 - Customers API

**Added schemas**

- SimpleOrder
- SimpleOrderItem
- SimplePromotionTier
- SimpleRedemption
- ReferralProgram
- SimpleVoucher
- SimpleConsent
- CustomersListCustomerActivitiesResponseBody
- CustomerActivity
- CustomerActivityData
- EventCustomerSent
- EventCustomerRecovered
- EventCustomerFailed
- EventCustomerConfirmed
- EventCustomerCreated
- EventCustomerUpdated
- EventCustomerDeleted
- EventCustomerReferred
- EventCustomerCustomEvent
- EventCustomerSegmentEntered
- EventCustomerSegmentLeft
- EventCustomerSmsSent
- EventCustomerSmsRecovered
- EventCustomerSmsFailed
- EventCustomerEmailSent
- EventCustomerEmailRecovered
- EventCustomerEmailFailed
- EventCustomerActiveCampaignSent
- EventCustomerActiveCampaignRecovered
- EventCustomerActiveCampaignFailed
- EventCustomerBrazeSent
- EventCustomerBrazeRecovered
- EventCustomerMailchimpSent
- EventCustomerMailchimpRecovered
- EventCustomerMailchimpFailed
- EventCustomerIntercomSent
- EventCustomerIntercomRecovered
- EventCustomerIntercomFailed
- EventCustomerShopifySent
- EventCustomerShopifyRecovered
- EventCustomerShopifyFailed
- EventCustomerKlaviyoSent
- EventCustomerKlaviyoRecovered
- EventCustomerKlaviyoFailed
- EventCustomerBatchSent
- EventCustomerBatchRecovered
- EventCustomerBatchFailed
- EventCustomerRewarded
- EventCustomerRewardedLoyaltyPoints
- EventCustomerGiftVoucherBalanceAdded
- EventCustomerLoyaltyCardPointsAdded
- EventCustomerLoyaltyCardPointsTransferred
- EventCustomerVouchersLoyaltyPointsExpired
- EventCustomerVoucherDeleted
- EventCustomerPublicationSucceeded
- EventCustomerPublicationFailed
- EventCustomerValidationSucceeded
- EventCustomerValidationFailed
- EventCustomerRedemption
- EventCustomerRedemptionSucceeded
- EventCustomerRedemptionFailed
- EventCustomerRedemptionRollbackSucceeded
- EventCustomerRedemptionRollbackFailed
- EventCustomerConsents
- EventCustomerConsentsGiven
- EventCustomerConsentsRevoked
- EventCustomerOrder
- EventCustomerOrderCanceled
- EventCustomerOrderCreated
- EventCustomerOrderFulfilled
- EventCustomerOrderPaid
- EventCustomerOrderProcessing
- EventCustomerOrderUpdated
- EventCustomerRewardRedemptions
- EventCustomerRewardRedemptionsCreated
- EventCustomerRewardRedemptionsPending
- EventCustomerRewardRedemptionsCompleted
- EventCustomerRewardRedemptionsRolledBack
- EventCustomerLoyaltyUpdated
- EventCustomerLoyaltyTierBase
- EventCustomerLoyaltyTierUpgraded
- EventCustomerLoyaltyTierDowngraded
- EventCustomerLoyaltyTierProlonged
- EventCustomerLoyaltyTierExpirationChanged
- EventCustomerLoyaltyTierJoined
- EventCustomerLoyaltyTierLeft
- ValidationRulesListRulesAssignmentsResponseBody
- SimpleReferralTier
- CustomEvent
- ValidationEntity
- SimpleSku
- SimpleProduct
- LoyaltyTierExpiration
- VoucherTransaction
- LoyaltyCardTransaction


- GET `/v1/customers/{customerId}/activities`
  - Request body schema was replaced with new one: `CustomersListCustomerActivitiesResponseBody` (old one: `9_res_list_customer_activities`)


- **reward_assignment** renamed to **RewardAssignment**
- **validation_rules_list_rules_assignments_response_body** renamed to **ValidationRulesListRulesAssignmentsResponseBody**

## 20231107 - Product and Products Collections API

**Added schemas**
- UpdateProductRequestBody
- UpsertProductRequestBody
- BulkUpsertProductsMetadataRequestBody
- BulkUpsertProductRequestBody
- ProductsListResponse
- ProductWithoutSkusResponse
- ProductResponse
- SkusListForProductResponse
- SkusListResponse
- SkuWithProductResponse
- SkuResponse
- UpsertSkuRequestBody
- UpdateSkuRequestBody
- ProductCollectionsProductsListResponse
- ProductCollectionsItemResponse
- ProductCollectionsListResponse
- ImportCSVRequestBody

**Removed schemas**
- e_error_no_translation
- 11_obj_sku_object
- 11_obj_product_object
- 11_req_create_product
- 11_req_update_products_metadata_in_bulk
- 11_res_list_products
- 11_obj_list_products_product_object
- 11_res_get_product_skus_object
- product_collections_product_in_collection
- 11_obj_product_object_truncated
- product_collections_sku_in_collection
- 11_req_update_sku
- product_collections_list_products_response_body
- 11_res_products_productId_skus
- product_collections_collection_item_base
- product_collections_static_collection
- product_collections_dynamic_collection
- product_collections_list_response_body
- a_req_importCSV

**Changed schemas**
- a_res_async_actions to AsyncActionsResponse
- e_400_resource_in_use to ResourceInUseError
- e_404_not_found to Error

## 20231102 - Customers API

**Added schemas**

- CustomerBase
- CustomerIdObjectResponse
- ReferrerIdObjectResponse
- CustomersCreateRequestBody
- CustomersUpdateRequestBody
- CustomersUpdateResponseBody
- CustomerRequest
- CustomersCreateResponseBody
- CustomerReferrals
- CustomerLoyalty
- CustomerSummary
- CustomerSummaryOrders
- CustomerSummaryRedemptions
- CustomersListResponseBody
- CustomersGetResponseBody
- CustomersUpdateInBulkRequestBody
- CustomersUpdateInBulkItemRequestBody
- CustomersUpdateCustomersConsentsRequestBody
- CustomersListCustomersSegments
- SimpleSegment

**Endpoints changes**
- GET `/v1/customers`
  - Request body schema was replaced with new one: `CustomersListResponseBody` (old one: `9_res_list_customers`)
- POST `/v1/customers`
  - Request body schema was replaced with new one: `CustomersCreateRequestBody` (old one: `9_req_create_customer`)
  - Response body schema was replaced with new one: `CustomersCreateResponseBody` (old one: `9_obj_customer_object`)
- GET `/v1/customers/{id}`
  - Response body schema was replaced with new one: `CustomersGetResponseBody` (old one: `9_obj_customer_object`)
- PUT `/v1/customers/{customerId}`
  - Request body schema was replaced with new one: `CustomersUpdateRequestBody` (old one: `9_req_update_customer`)
  - Response body schema was replaced with new one: `CustomersUpdateResponseBody` (old one: `9_obj_customer_object`)
- POST `/v1/customers/bulk/async`
  - Request body schema was replaced with new one: `CustomersUpdateInBulkRequestBody` (old one: `customers_update_in_bulk_request_body`)
- PUT `/v1/customers/{customerId}/consents`
  - Request body schema was replaced with new one: `CustomersUpdateCustomersConsentsRequestBody` (old one: `9_req_update_customers_consents`)
  - Response body schema was replaced with new one: `CustomersUpdateCustomersConsentsRequestBody` (old one: `9_req_update_customers_consents`)
- GET `/v1/customers/{customerId}/segments`
  - Response body schema was replaced with new one: `CustomersListCustomersSegments` (old one: `14_res_customers_customerId_segments`)

## 20231106 - Language fixes #535

- Descriptions changes in multiple schemas
https://github.com/voucherifyio/voucherify-openapi/pull/535/files

## 20231103 - Fix `options` in `RedemptionsRedeemRequestBod

- Fix `options` in `RedemptionsRedeemRequestBody`

**Added schemas**

- StackableValidateRedeemRequestBase

## 20231103 - Events API

**Changed schemas**
- 15_req_track_custom_event to TrackCustomEventRequestBody
- 15_res_track_custom_event to TrackCustomEventResponseBody

## 20231102 - Stackable Validations and stackable redemptions

**Removed schemas**
- Customer
- Referrer

**Added schemas**

- ReferrerRequest
- ReferrerResponse
- CustomerRequest
- CustomerResponse
- Discount
- VoucherAssets
- ValidationsValidateResponseBody
- ValidationsRedeemableApplicable
- ValidationsRedeemableInapplicable
- ValidationsRedeemableSkipped
- ValidationsValidateAllProvidedPromotionsMustBeValidResponseBody
- ValidationsValidateAtLeastOnePromotionMustBeValidResponseBody
- RedeemableResultVoucherCode
- RedeemableResultGiftCard
- RedeemableResultLoyaltyCard
- RedeemableResultPromotionTier
- RedeemableResultPromotionStack
- RedemptionsRedeemResponseBody
- RedemptionInternal

**REMOVED ALL DUMMY ENDPOINTS AS WE DON'T USE THEM ANYMORE!!!**

## 20231102 - Qualifications

**Added schemas**
- Discount
- Gift
- RedeemableGift
- QualificationsFieldConditions
- QualificationsFiltersCondition
- QualificationsRedeemableSingleResponse
- ValidationRulesAssignmentsList
- BusValRuleAssignment
- RedeemableSingleResultResponse
- RedeemableLoyaltyCard
- Error

**Removed schemas**
- 16_filter_conditions_string_qualification
- 23_obj_filter_category_id
- 23_obj_filter_campaign_id
- 23_obj_filter_resource_type
- 23_obj_filter_voucher_type
- qualificationJunction

**Changed schemas**
- 16_filter_conditions_string_qualification to QualificationsCheckEligibilityResponseBody
- 23_obj_qualification_object_stacking_rules to QualificationsStackingRulesResponse
- 23_req_create_qualification to QualificationsCheckEligibilityRequestBody
- 23_obj_qualification_redeemables to QualificationsRedeemablesResponse


## 20231031 Integration blueprint – 2 new articles

Added the following articles to the Integration Blueprint section:
- Integration overview
- Modeling Voucherify integration
- Campaign limits
-

## 20231030 - Order Model

**Removed schemas**
- Order

**Added schemas**
- OrderRequest
- OrderItemResponse
- OrderResponse
- OrderItemResponse
- OrderRedemptions

**Updated order object markdown.**

**Added support for `additionalProperties` to markdown generator.**

## 20231031 Integration blueprint – 2 new articles

Added the following articles to the Integration Blueprint section:
- Integration overview
- Modeling Voucherify integration
- Campaign limits
-
## 20231027 - Welcome to Voucherify, Stackable Discounts

- Added new article "Welcome to Voucherify" in "Getting started"
- Updated the "Stackable discounts API" article – current redeemable limit is 30, not 5

## 20231027 - Product Collections

- Fixed displaying of product collections object in response.

## 20231027 - Add or Remove Voucher Balance

- Renamed reference document `VOUCHERS-API-Add-Remove-Gift-Card-Balance` to `VOUCHERS-API-Add-Remove-Voucher-Balance`.
- Updated `operationId` and `slug` according to the new name.

**Added schemas**:
- vouchers_add_or_remove_voucher_balance_request_body (old `1_req_vouchers_code_balance`)
- vouchers_add_or_remove_voucher_balance_response_body (old `1_res_vouchers_code_balance`)

**Endpoint change**:
- Changed `operationId` to `add-remove-voucher-balance` for POST `/v1/vouchers/{code}/balance`
- Updated title and descriptions so that they also apply to loyalty cards.

## 20231027 - GET List Member Rewards

Added `required` and `description` attributes in `LoyaltiesListMemberRewardsResponseBody` schema.

## 20231026 - Stackable API

**Added schemas**
- Order
- RedeemPromotionStack
- RedeemPromotionTier
- RedeemGiftCard
- RedeemLoyaltyCard
- RedeemVoucher
- ValidationsValidateRequestBody
- RedemptionsRedeemRequestBody

**Endpoints changes**
- POST `/v1/validations`
    - Request body schema was replaced with new one: `ValidationsValidateRequestBody` (old one: `19_req_validations`)
- POST `/v1/redemptions`
    - Request body schema was replaced with new one: `RedemptionsRedeemRequestBody` (old one: `19_req_redemptions`)
- POST `/client/v1/validations`
    - Request body schema was replaced with new one: `ValidationsValidateRequestBody` (old one: `19_req_validations`)
- POST `/client/v1/redemptions`
    - Request body schema was replaced with new one: `RedemptionsRedeemRequestBody` (old one: `19_req_redemptions`)

## 20231031 - Integration Blueprint

**Adding a new section and articles**
- Added 'Integration Blueprint' section in 'Guides'
- Added 'Data-Model.md' article
- Added 'Data-Volume-Estimation.md' article
- Added 'Distributions.md' article
- Added 'Multi-brand management & internationalization.md' article
- Added 'Security.md' article
- Added 'Team-management.md' article


## 20231025 - Rewards, Loyalties

**Changes in models**
- Removed `reward_base`, `reward_identity`, `reward_created` - these types were combined into the `reward` model
- Removed `reward_assignment_identity`, `reward_assignment_response_data` - these types were combined into the `reward_assignment_base` model

## 20231025 - Vouchers

**Changes in models**
- Removed `GiftCardTransactionIdentity`, `GiftCardTransactionCreated` - these types were combined into the `GiftCardTransactionBase` model
- Fixed the enum defined for `fields` property in `VoucherTransactionsExportParameters` and `VoucherTransactionsFilters` models

## 20231025 - List Loyalty Tiers

Endpoint change:
- Removed `page` from query params (GET `/v1/loyalties/{campaignId}/tiers`)

## 20231023

**Added schemas**
- VouchersValidateRequestBody
- VouchersValidateDiscountRequestBody
- VouchersValidateGiftRequestBody
- VouchersValidateLoyaltyRequestBody
- Referrer
- OrderItem
- Session
- VouchersValidateValidResponseBody
- VouchersValidateInvalidResponseBody
- OrderRedemptions
- SimpleProductDiscountUnit
- SimpleSkuDiscountUnit
- DiscountUnit
- DiscountUnitMultiple
- DiscountUnitMultipleOneUnit
- DiscountAmount
- DiscountPercent
- DiscountFixed
- DiscountAmountVouchersEffectTypes
- DiscountPercentVouchersEffectTypes
- DiscountFixedVouchersEffectTypes
- DiscountUnitVouchersEffectTypes
- DiscountVouchersEffectTypes
- DiscountVouchersTypes
- InapplicableToResultList
- ApplicableToResultList
- InapplicableTo
- ApplicableTo
- ApplicableToEffect
- VouchersValidateResponseBody

**Removed schemas**
- 6_req_validate_voucher

**Endpoints changes**
- `/v1/vouchers/{code}/validate`
  - Request parameters schema was replaced with new one: `VouchersValidateRequestBody` (old one: `6_req_validate_voucher` *has been deleted*)
  - Response schema was replaced with new one: `VouchersValidateResponseBody` (old one: `anyOf`: `6_res_validate_voucher`, `6_res_validate_voucher_false`)
- `/v1/validation-object`
  - Response schema was replaced with new one: `VouchersValidateResponseBody` (old one: `anyOf`: `6_res_validate_voucher`, `6_res_validate_voucher_false`)

## 20230924

- Updated `docs/guides/getting_started/Quickstart.md`

## 20230923 - Endpoint bugfixes and improvements

- Described customer object in Track custom event endpoint
- Fixed qualifications filters (missing and wrong properties)
- Fixed wrong name of rollback object in Rollback Stackable Redemptions response

| **API**                 | **Endpoint**                   | **Slug**                       |
| ----------------------- | ------------------------------ | ------------------------------ |
| **Events**              | Track Custom Event             | track-custom-event             | true                         |
| **Qualifications**      | Examine Qualification          | examine-qualification          | true                         |
| **Stackable Discounts** | Rollback Stackable Redemptions | rollback-stackable-redemptions | rollback-stacked-redemptions | true |

## 20231020

**Added schemas**
- Category
- CategoriesListResponseBody
- CategoriesCreateRequestBody
- CategoriesCreateResponseBody
- CategoriesGetResponseBody
- CategoriesUpdateRequestBody
- CategoriesUpdateResponseBody

**Endpoints changes**
- `/v1/categories`
  - GET
    - Response schema was replaced with `CategoriesListResponseBody` (old 20_res_list_categories)
  - POST
    - Request parameters schema was replaced with `CategoriesCreateRequestBody` (old 20_req_create_category)
    - Response schema was replaced with `CategoriesCreateResponseBody` (old 20_res_create_category)
- `/v1/categories/{categoryId}`
  - GET
    - Response schema was replaced with `CategoriesGetResponseBody` (old 20_obj_category_object)
  - PUT
    - Request parameters schema was replaced with `CategoriesUpdateRequestBody` (old 20_req_update_categories_categoryId)
    - Response schema was replaced with `CategoriesUpdateResponseBody` (old 20_obj_category_object)

## 20231019 - Promotions Stacks

#### New schemas
- PromotionsStacksListInCampaignResponseBody
- PromotionsStacksListResponseBody
- PromotionsStacksListRequestQuery
- PromotionsStacksGetResponseBody
- PromotionsStacksUpdateRequestBody
- PromotionsStacksUpdateResponseBody
- PromotionsStacksCreateInCampaignRequestBody
- PromotionsStacksCreateInCampaignResponseBody
- PromotionStackBase
- PromotionStack

- GET /v1/promotions/{campaignId}/stacks
  - new response schema `PromotionsStacksListInCampaignResponseBody` (old `3_res_list_promotion_stacks`)
- POST /v1/promotions/{campaignId}/stacks
  - new request schema `PromotionsStacksCreateInCampaignRequestBody` (old `3_req_create_promotion_stack`)
  - new response schema `PromotionsStacksCreateInCampaignResponseBody` (old `3_obj_promotion_stack_object`)
- GET /v1/promotions/{campaignId}/stacks/{stackId}
  - new response schema `PromotionsStacksGetResponseBody` (old `3_obj_promotion_stack_object`)
- PUT /v1/promotions/{campaignId}/stacks/{stackId}
  - new request schema `PromotionsStacksUpdateRequestBody` (old `3_req_create_promotion_stack`)
  - new response schema `PromotionsStacksUpdateResponseBody` (old `3_obj_promotion_stack_object`)
- GET /v1/promotions/stacks
  - new response schema `PromotionsStacksListResponseBody` (old `3_res_list_promotion_stacks`)

# 20231019 - Vouchers

- Vouchers - List Gift Card Transactions  (**GET** `v1/vouchers/{code}/transactions`) renamed to List Voucher Transactions
- Vouchers - Export Gift Card Transactions  (**GET** `v1/vouchers/{code}/transactions/export`) renamed to Export Voucher Transactions

**New models**
- vouchers_list_vouchers_transactions_response_body (old `1_res_vouchers_code_transactions`)
- voucher_transaction (old `1_obj_gift_card_transaction_object`)
- GiftCardTransaction
- GiftCardTransactionIdentity
- GiftCardTransactionBase
- GiftCardTransactionCreated
- GiftCardTransactionDetails
- GiftCardTransactionRedemptionDetails (old `1_obj_gift_card_transaction_object_redemption`)
- GiftCardTransactionRefundDetails (old `1_obj_gift_card_transaction_object_refund`)
- GiftCardTransactionAdditionDetails (old `1_obj_gift_card_transaction_object_addition`)
- GiftCardTransactionRemovalDetails (old `1_obj_gift_card_transaction_object_removal`)

- VouchersExportTransactionsRequestBody (old `1_req_create_gift_card_transactions_export`
- VoucherTransactionsExport (old `1_obj_export_transactions_object`)
- VoucherTransactionsExportParameters (old `1_obj_export_gift_card_transactions`)
- VoucherTransactionsFilters (old `16_obj_export_gift_card_transactions`)
- VoucherTransactionsExportFilterConditions (old `16_obj_filter_gift_card_transactions_voucher_id`)

- validation_rules_list_rules_assignments_response_body (old `13_res_validation-rules_validationRuleId_assignments`)
- ValidationRuleAssignment (old `13_obj_validation_rule_assignment_object`)

**Removed models**
- `8_obj_export_loyalty_card_transactions` - used only in one place, replaced with: `VoucherTransactionsExportParameters` in `8_req_create_loyalty_card_transactions_export` schema

**Endpoint changes**

- Added missing method for endpoint: GET `/vouchers/{code}/transactions (client.vouchers.listTransactions(code, query))`
    - Response body schema: `vouchers_list_vouchers_transactions_response_body`

- Added missing method for endpoint: POST `/vouchers/{code}/transactions/export (client.vouchers.exportTransactions(code, body))`
    - Request body schema: `VouchersExportTransactionsRequestBody`

- Added missing method for endpoint: GET `/validation-rules-assignments (client.client.validationRules.listRulesAssignments(validationRuleId))`
    - Request body schema: `validation_rules_list_rules_assignments_response_body`


## 20231016 - Rewards

**New models**
- reward
- reward_base
- reward_identity
- reward_response_data
- reward_parameters

- reward_parameters_CAMPAIGN
- reward_parameters_COIN
- reward_parameters_MATERIAL
- reward_assignment
- reward_assignment_base
- reward_assignment_identity
- reward_assignment_response_data
- rewards_list_assignments_response_body
- rewards_create_assignment_request_body
- rewards_create_assignment_coin_reward_request_body
- rewards_create_assignment_main_reward_request_body
- rewards_update_assignment_request_body

**Endpoint changes**
- Added missing method for endpoint: GET `/v1/rewards/{rewardId)}/assignments/{assignmentId}`
    - Response body schema: `reward_assignment`
- GET `/v1/rewards/{rewardId}/assignments` (listAssignments)
    - New response schema: `rewards_list_assignments_response_body` (old one: `4_res_list_reward_assignments`)
- POST `/v1/rewards/{rewardId}/assignments` (createAssignment)
    - New request schema: `rewards_create_assignment_request_body` (old one: `4_req_create_reward_assignment`)
    - New response schema: `reward_assignment` (old one: `4_obj_reward_assignment_object`)
- PUT `/v1/rewards/{rewardId}/assignments/{assignmentId}` (updateAssignment)
    - New request schema: `rewards_update_assignment_request_body` (old one: `4_req_update_reward_assignment`)
    - New response schema: `reward_assignment` (old one: `4_obj_reward_assignment_object`)

## 20231016 - Loyalties

**New models**
- reward
- reward_base
- reward_identity
- reward_response_data
- reward_parameters

- reward_parameters_CAMPAIGN
- reward_parameters_COIN
- reward_parameters_MATERIAL
- reward_assignment
- reward_assignment_base
- reward_assignment_identity
- reward_assignment_response_data
- loyalties_list_loyalty_tier_rewards_response_body
- loyalties_loyalty_tier_reward (old one: `8_obj_loyalty_tier_reward_object`)
- 

**Endpoint changes**
- Added missing method for endpoint: GET `/v1/loyalties/{campaignId)}/rewards/{assignmentId}`
    - Response body schema: `reward_assignment`
- Added missing method for endpoint: GET `/v1/loyalties/{campaignId)}/tiers/{tierId}/rewards`
    - Response body schema: `loyalties_list_loyalty_tier_rewards_response_body`

## 20231012 - Product Collections

**New models**
- product_collections_get_response_body
- product_collections_list_products_response_body
- product_collections_sku_in_collection
- product_collections_product_in_collection
- product_collections_collection_item
- product_collections_collection_item_base
- product_collections_static_collection
- product_collections_dynamic_collection
- product_collections_list_response_body
- product_collections_create_request_body
- product_collections_create_static_request_body
- product_collections_create_dynamic_request_body


**Endpoint changes**
- Added missing method for endpoint: POST `/v1/product-collections`
  - Request body schema: `product_collections_create_request_body`
  - Response body schema: `product_collections_collection`
- GET `/v1/product-collections`
	- New response schema: `product_collections_list_response_body` (old one: `12_res_product-collections`)
- GET `/v1/product-collections/{productCollectionId}`
	- New response schema: `product_collections_get_response_body` (old one: `12_obj_product_collection_object`)
- GET `/v1/product-collections/{productCollectionId}/products`
	- New response schema: `product_collections_list_products_response_body` (old one: `11_res_product-collections_productCollectionID_products`)
- /v1/product-collection-object 
  - New response schema: `product_collections_collection_item` (old one: `12_obj_product_collection_object`)

## 20231011

#### New schemas:
- LoyaltiesCreateTiersRequestBody
- LoyaltiesCreateTiersResponseBody
- LoyaltiesGetRewardAssignmentResponseBody
- LoyaltiesGetRewardDetailsResponseBody
- LoyaltiesListTiersRequestQuery
- LoyaltiesListLoyaltyTierEarningRulesRequestQuery
- LoyaltiesGetTierResponseBody
- LoyaltiesListTiersResponseBody
- LoyaltiesListMemberLoyaltyTiersResponseBody
- LoyaltiesListLoyaltyTierEarningRulesResponseBody
- CreateLoyaltyTier
- LoyaltyTier
- MappingMultiply
- MappingFixed
- EarningRule

#### Schemas changes
- GET /v1/loyalties/{campaignId}/tiers
    - new response schema `LoyaltiesListTiersResponseBody` (old `8_res_list_loyalty_tiers`)
- GET /v1/loyalties/{campaignId}/reward-assignments/{assignmentId}
    - new response schema `LoyaltiesGetRewardAssignmentResponseBody` (old `4_obj_reward_assignment_object`)
- GET /v1/loyalties/{campaignId}/reward-assignments/{assignmentId}/reward
    - new response schema `LoyaltiesGetRewardDetailsResponseBody` (old `4_obj_reward_object`)
- GET /v1/loyalties/{campaignId}/tiers/{tierId}
    - new response schema `LoyaltiesGetTierResponseBody` (old `8_obj_loyalty_tier_object`)
- GET /v1/loyalties/{campaignId}/tiers/{tierId}/earning-rules
    - new response schema `LoyaltiesListLoyaltyTierEarningRulesResponseBody` (old `8_res_list_loyalty_tier_earning_rules`)
- GET /v1/loyalties/members/{memberId}/tiers
    - new response schema `LoyaltiesListMemberLoyaltyTiersResponseBody` (old `8_res_get_member_loyalty_tier`)
- GET /v1/loyalties/{campaignId}/members/{memberId}/points-expiration
    - New response schema: `LoyaltiesGetPointsExpirationResponseBody` (old one: `8_res_get_points_expiration`)

#### New endpoint
- POST /v1/loyalties/{campaignId}/tiers

## 20231009

#### New schemas:
- LoyaltiesListMemberRewardsRequestQuery
- LoyaltiesGetPointsExpirationRequestQuery
- LoyaltiesGetPointsExpirationResponseBody
- LoyaltiesListCardTransactionsRequestQuery
- LoyaltiesListCardTransactionsResponseBody
- LoyaltyCardTransactionsType
- SimpleLoyaltyVoucher
- LoyaltyCardTransaction
- LoyaltyCardTransactionsFields
- LoyaltiesExportCardTransactionsRequestBody
- LoyaltiesExportCardTransactionsResponseBody
- RewardAssignment
- Reward
- RewardTypeCoin
- RewardTypeMaterial
- RewardTypeCampaign
- RewardType
- LoyaltiesAddOrRemoveCardBalanceResponseBody
- LoyaltiesTransferPointsResponseBody
- LoyaltiesTransferPoints
- LoyaltiesTransferPointsRequestBody
- LoyaltiesListMemberRewardsResponseBody
- LoyaltiesAddOrRemoveCardBalanceRequestBody
- PointsExpirationTypes

#### Schemas changes
- /v1/loyalties/{campaignId}/members/{memberId}/balance
    - new request schema `LoyaltiesAddOrRemoveCardBalanceRequestBody` (old `8_req_add_remove_points_balance`)
    - new response schema `LoyaltiesAddOrRemoveCardBalanceResponseBody` (old `8_res_add_remove_points_balance`)
- /v1/loyalties/members/{memberId}/balance
    - new request schema `LoyaltiesAddOrRemoveCardBalanceRequestBody` (old `8_req_add_remove_points_balance`)
    - new response schema `LoyaltiesAddOrRemoveCardBalanceResponseBody` (old `8_res_add_remove_points_balance`)
- /v1/loyalties/{campaignId}/members/{memberId}/transfers
    - new request schema `LoyaltiesTransferPointsRequestBody` (old `8_req_transfer_loyalty_points`)
    - new response schema `LoyaltiesTransferPointsResponseBody` (old `8_obj_loyalty_card_object_non_expanded_categories`)
- /v1/loyalties/{campaignId}/members/{memberId}/transactions
    - new request schema `LoyaltiesListCardTransactionsRequestBody` (old `8_res_get_loyalty_card_transactions`)
- /v1/loyalties/members/{memberId}/transactions
    - new request schema `LoyaltiesListCardTransactionsResponseBody` (old `8_res_get_loyalty_card_transactions`)
- /v1/loyalties/members/{memberId}/transactions/export
    - new request schema `LoyaltiesExportCardTransactionsRequestBody` (old `8_req_create_loyalty_card_transactions_export`)
    - new response schema `LoyaltiesExportCardTransactionsResponseBody` (old `8_obj_export_transactions_object`)
- /v1/loyalties/{campaignId}/members/{memberId}/transactions/export
    - new request schema `LoyaltiesExportCardTransactionsRequestBody` (old `8_req_create_loyalty_card_transactions_export`)
    - new response schema `LoyaltiesExportCardTransactionsResponseBody` (old `8_obj_export_transactions_object`)
- /v1/loyalties/{campaignId}/members/{memberId}/points-expiration
    - new response schema `LoyaltiesGetPointsExpirationResponseBody` (old `8_res_get_points_expiration`)

## 20230831 - Exports API

**New models**
- ExportsCreateRequestBody
- ExportBase
- Export
- ExportsCreateResponseBody
- ExportVoucher
- FieldConditions
- FiltersCondition
- ExportVoucherFilters
- Junction
- ExportRedemption
- ExportRedemptionFilters
- ExportCustomer
- ExportCustomerFilters
- ExportPublication
- ExportPublicationFilters
- ExportOrder
- ExportOrderFilters
- ExportPointsExpiration
- ExportPointsExpirationFilters
- ExportVoucherTransactionsExpiration
- ExportVoucherTransactionsFilters
- ExportsGetResponseBody
- ExportsListResponseBody
- ExportCustomerFields
- ExportCustomerOrder
- ExportPublicationFields
- ExportPublicationOrder
- ExportRedemptionFields
- ExportRedemptionOrder
- ExportVoucherFields
- ExportVoucherOrder
- ExportOrderFields
- ExportOrderOrder
- ExportPointsExpirationFields
- ExportPointsExpirationOrder
- ExportVoucherTransactionsFields
- ExportVoucherTransactionsOrder
- Any

**Endpoint changes**
- v1/exports
    - POST
        - New request schema: `ExportsCreateRequestBody`
        - New response schema: `ExportsCreateResponseBody`
    - GET
        - New response schema: `ExportsListResponseBody`
- v1/exports/{exportId}
    - GET
        - New response schema: `ExportsGetResponseBody`

## 20231005 - Earning rule

**New models**
- LoyaltiesGetEarningRuleResponseBody
- LoyaltiesEnableEarningRulesResponseBody
- LoyaltiesDisableEarningRulesResponseBody
- EarningRuleBase
- EarningRuleEvent
- EarningRuleFixed
- EarningRuleProportionalOrder
- EarningRuleProportionalOrderAmount
- EarningRuleProportionalOrderTotalAmount
- EarningRuleProportionalOrderMetadata
- EarningRuleProportional
- EarningRuleProportionalOrderItems
- EarningRuleProportionalOrderItemsQuantity
- EarningRuleProportionalOrderItemsAmount
- EarningRuleProportionalOrderItemsSubtotalAmount
- EarningRuleProportionalCustomerMetadata
- EarningRuleProportionalCustomEvent

**Endpoint changes**
- GET /v1/loyalties/{campaignId}/earning-rules
	- New response schema: LoyaltiesGetEarningRuleResponseBody (old one: `8_res_list_earning_rules`)
- POST /v1/loyalties/{campaignId}/earning-rules/{earningRuleId}/enable
	- New response schema: LoyaltiesEnableEarningRulesResponseBody (old one: 8_obj_earning_rule_object_no_validation_rule)
- POST /v1/loyalties/{campaignId}/earning-rules/{earningRuleId}/disable
	- New response schema: LoyaltiesDisableEarningRulesResponseBody (old one: 8_obj_earning_rule_object_no_validation_rule)

## 20230829

**Added schemas**
- customers_permanent_deletion_response_body
- customers_update_metadata_in_bulk_request_body
- customers_update_in_bulk_request_body


**Endpoints changes**
- `/v1/customers/{customerId}/permanent-deletion`
	- POST
		- Response schema was replaced with `customers_permanent_deletion_response_body` (old `9_res_customers_customerId_permanent-deletion`)
		- `status` default value was set to `DONE`
		- `data_json.customer` default value was set to 1
		- Added `required` to response properties
- `v1/customers/bulk/async`
	- POST
		- Request schema was replaced with `customers_update_in_bulk_request_body` (old `9_req_update_customers_bulk-deletion`)
		- Set as `required`: `async_action_id` property in `a_res_async_actions` model
- `v1/customers/metadata/async`
	- POST
		- Request schema was replaced with `customers_update_metadata_in_bulk_request_body` (old `9_req_customers_metadata_async`)
		- Set as `required`: `async_action_id` property in `a_res_async_actions` model

## 20230929 - Order references/guides script
- Changes on Performance and Qualification guidelines pages
- Added links to qualification guide in endpoints and qualification object schema.

## 20230928 - Order references/guides script
- Removed `beta` label from qualification API endpoints.
- Described contribution process.
- Added the script to clean up OpenAPI from Stoplight tags.
- Reorganised maintenance scripts.
- Automated the process of updating the data model documents based on the OpenAPI file.
- Improve script which generates markdown tables based on the OpenAPI file.
	- Render objects referred directly by $ref.
	- fix rendering oneOf + ref.
	- Render ref to simple types (e.g. enum)
	- Do not duplicate rendering tables when there is more than one reference.
	- add the missing title to `23_obj_qualification_object_stacking_rules object.

## 20230925 - Order references/guides script

Added script, located in `docs/script/` directory to quickly update order of references and guides based on `.md` files. For more information please check [Update-Order-Standard-Work.md](automation%2FUpdate-Order-Standard-Work.md) under `Update Order of Docs - AUTOMATIC` section.

## 20230823 - New Endpoints

### Introduced new endpoints and related object schemas

| **API**            | **Endpoint**          | **New Slug**          |
| ------------------ | --------------------- | --------------------- |
| **Locations**      | Location Object       | location-object       | true |
|                    | Get Location          | get-location          | true |
|                    | List Locations        | list-locations        | true |
| **Qualifications** | Qualification Object  | qualification-object  | true |
|                    | Examine Qualification | examine-qualification | true |


## 20230809 - Deprecated Endpoints

### Marked the following endpoints as deprecated

| **API**         | **Endpoint**                   | **Slug**                        |
| --------------- | ------------------------------ | ------------------------------- |
| **Vouchers**    | Examine Qualification          | examine-vouchers-qualification  |
| **Campaigns**   | Examine Qualification          | examine-campaigns-qualification |
| **Validations** | Validate Voucher               | validate-voucher                |
|                 | Validate Voucher (client-side) | validate-voucher-client-side    |
|                 | Validate Promotions            | validate-promotions             |
|                 | Validate Promotion Tier        | validate-promotion-tier         |
| **Redemptions** | Redeem Voucher                 | redeem-voucher                  |
|                 | Redeem Voucher (client-side)   | redeem-voucher-client-side      |
|                 | Redeem Promotion               | redeem-promotion                |


## 20230530 - Transition to Interactive documentation


### Slugs updated for Reference Docs

| **API**                 | **Endpoint**                               | **Previous Slug**                         | **New Slug**                               |
| ----------------------- | ------------------------------------------ | ----------------------------------------- | ------------------------------------------ |
| **Vouchers**            | Get Voucher                                | vouchers-get                              | get-voucher                                |
|                         | Add Gift Card Balance                      | add-gift-voucher-balance                  | add-remove-gift-voucher-balance            |
|                         | Import Vouchers                            | import-vouchers-1                         | import-vouchers                            |
|                         | Import Vouchers using CSV                  | import-vouchers-by-csv-1                  | import-vouchers-using-csv                  |
|                         | Examine Qualification                      | push-qualification-request                | examine-vouchers-qualification             |
|                         | Update Vouchers in bulk                    | aa-update-vouchers-in-bulk                | update-vouchers-in-bulk                    |
|                         | Update Vouchers Metadata in bulk           | aaupdate-vouchers-metadata-in-bulk        | update-vouchers-metadata-in-bulk           |
| **Campaigns**           | Add Vouchers to Campaign                   | add-voucher-to-campaign                   | add-vouchers-to-campaign                   |
|                         | Add Voucher with certain code to Campaign  | add-voucher-with-certain-code-to-campaign | add-voucher-with-specific-code-to-campaign |
|                         | Import Vouchers to Campaign                | import-vouchers                           | import-vouchers-to-campaign                |
|                         | Import Vouchers to Campaign by CSV         | import-vouchers-by-csv                    | import-vouchers-to-campaign-using-csv      |
|                         | Examine Qualification                      | create-qualification-request              | examine-campaigns-qualification            |
| **Promotions**          | List Promotion Tiers from Campaign         | get-promotions                            | list-promotion-tiers-from-campaign         |
|                         | Update Promotion Tier                      | update-promotion                          | update-promotion-tier                      |
|                         | Delete Promotion Tier                      | delete-promotion                          | delete-promotion-tier                      |
|                         | List Promotion Stacks                      | list-promotion-stacks                     | list-promotion-stacks-in-campaign          |
| **Validations**         | Validate Voucher (client-side)             | vouchers-validate                         | validate-voucher-client-side               |
|                         | Validate Promotions                        | validate-promotions-1                     | validate-promotions                        |
| **Redemptions**         | Get Voucher's Redemptions                  | vouchers-redemptions                      | get-voucher-redemptions                    |
| **Stackable Discounts** | Validate Stackable Discounts               | validate-stacked-discounts-1              | validate-stacked-discounts                 |
|                         | Validate Stackable Discounts (client-side) | validate-stackable-discounts-client-side  | validate-stacked-discounts-client-side     |
|                         | Redeem Stackable Discounts                 | redeem-stackable-discounts-client-side    | redeem-stacked-discounts-client-side       |
|                         | Rollback Stackable Redemptions             | rollback-stackable-redemptions            | rollback-stacked-redemptions               |
| **Loyalties**           | Get Reward Assignment                      | get-reward-assignment                     | get-reward-assignment-1                    |
|                         | Get Reward Assignment                      | get-reward-assignment-1                   | get-reward-assignment-2                    |
|                         | List Reward Assignments                    | list-reward-assignments-1                 | list-reward-assignments-2                  |
|                         | List Reward Assignments                    | list-reward-assignments-2                 | list-reward-assignments-1                  |
|                         | Redeem Reward                              | redeem-loyalty-card                       | redeem-reward-1                            |
|                         | Add Member                                 | create-member                             | add-member                                 |
|                         | Get Member                                 | get-member                                | get-member-1                               |
|                         | Get Member                                 | get-member-1                              | get-member                                 |
|                         | Get Member Activities                      | get-member-activities-1                   | get-member-activities                      |
|                         | Get Member Activities                      | get-member-activities                     | get-member-activities-1                    |
|                         | Add or Remove Loyalty Card Balance         | add-loyalty-card-balance                  | add-remove-loyalty-card-balance-1          |
|                         | Transfer Loyalty Points                    | transfer-points2                          | transfer-points                            |
| **Customers**           | Get Customer                               | read-customer                             | get-customer                               |
|                         | Update Customers in Bulk                   | post-customers-in-bulk                    | update-customers-in-bulk                   |
|                         | Update Customers Metadata in Bulk          | post-customers-metadata-in-bulk           | update-customers-metadata-in-bulk          |
|                         | Update Customer's consents (client)        | update-customers-consents-client          | update-customers-consents-client-side      |
|                         | List Customer Activities                   | get-customer-activities                   | list-customer-activities                   |
|                         | List Customer's Segments                   | list-segments                             | list-customer-segments                     |
| **Orders**              | Create Export                              | create-export-1                           | create-order-export                        |
| **Products**            | Update Products in bulk                    | post-products-in-bulk                     | update-products-in-bulk                    |
|                         | Update Products Metadata in bulk           | async-update-products-metadata-in-bulk    | update-products-metadata-in-bulk           |
|                         | Get SKU                                    | get-sku-v20210726                         | get-sku                                    |
|                         | List SKUs                                  | list-skus                                 | list-skus-in-product                       |
|                         | Import Products Using CSV                  | import-products-by-csv                    | import-products-using-csv                  |
|                         | Import SKUS using CSV                      | import-skus-by-csv                        | import-skus-using-csv                      |
| **Product Collections** | List Products in Collection                | get-products-in-collection                | list-products-in-collection                |
| **Validation Rules**    | Get Validation Rules                       | get-validation-rules                      | get-validation-rule                        |
|                         | Update Validation Rule                     | update-validation-rules                   | update-validation-rule                     |
|                         | Create Validation Rules Assignment         | create-validation-rules-assignment        | create-validation-rule-assignment          |
|                         | Delete Validation Rules Assignment         | delete-validation-rules-assignment        | delete-validation-rule-assignment          |
| **Events**              | Track Custom Event                         | create-custom-event                       | track-custom-event                         |
| **Consents**            | List Consents                              | get-consents                              | list-consents                              |
|                         | List Consents (client-side)                | get-consent-client-side                   | list-consents-client-side                  |
| **Async Actions**       | Get Async Action                           | get-async-actions-1                       | get-async-action                           |


### Slugs updated for Guides

| **Category**    | **Guide** | **Previous Slug** | **New Slug** |
| :-------------- | :-------- | :---------------- | :----------- |
| More            | Status    | status-1          | status       |
| Building Blocks | Orders    | orders-1          | orders       |
| Building Blocks | Vouchers  | vouchers-1        | vouchers     |
| Building Blocks | Campaigns | campaigns-1       | campaigns    |


### Endpoints descriptions that were removed

| **API**        | **Endpoint Name**                               | **Endpoint**                                 | **Slug**                          | **Why**                         |
| -------------- | ----------------------------------------------- | -------------------------------------------- | --------------------------------- | ------------------------------- |
| **Vouchers**   | [deprecated] Update Vouchers' metadata in bulk  | **POST** `v1/vouchers/metdata`                 | update-vouchers-metadata-in-bulk  | deprecated                      |
|                | [deprecated] Update Vouchers in bulk            | **POST** `v1/vouchers/bulk`                    | update-vouchers-in-bulk           | deprecated                      |
| **Promotions** | Create Promotion Campaign                       | **POST** `v1/campaigns`                        | create-promotion-campaign         | path exists under Campaigns API |
| **Customers**  | [deprecated] Update Customers' metadata in bulk | **POST** `customers/metadata`                | update-customers-metadata-in-bulk | deprecated                      |
|                | [deprecated] Update Customers in bulk           | **POST** `customers/bulk`                    | update-customers-in-bulk          | deprecated                      |
| **Orders**     | Download Export                                 | **GET** `v1/exports/{id}`                      | download-export-1                 | same in Exports API             |
| **Products**   | [deprecated] Update Products metadata in bulk   | **POST** `v1/products/metadata`                | update-products-metadata-in-bulk  | deprecated                      |
|                | [deprecated] Update Products in bulk            | **POST** `v1/products/bulk`                    | update-products-in-bulk           | deprecated                      |
|                | Get SKU [deprecated]                            | **GET** `v1/products/{productId}/skus/{skuId}` | get-sku                           | deprecated                      |


### Endpoints that were added

| **API**   | **Endpoint Name**                | **Endpoint**                                                              | **Slug**                           |
| --------- | -------------------------------- | ------------------------------------------------------------------------- | ---------------------------------- |
| Rewards   | Get Reward Assignment            | **GET** `v1/rewards/{rewardId}/assignments/{assignmentId}`                  | get-reward-assignment              |
| Vouchers  | List Gift Card Transactions      | **GET** `v1/vouchers/{code}/transactions`                                   | list-gift-card-transactions        |
| Vouchers  | Export Gift Card Transactions    | **POST** `v1/vouchers/{code}/transactions/export`                           | export-gift-card-transactions      |
| Loyalties | List Loyalty Card Transactions   | **GET** `v1/loyalties/{campaignId}/members/{memberId}/transactions`         | list-loyalty-card-transactions-1   |
| Loyalties | List Loyalty Card Transactions   | **GET** `v1/loyalties/members/{memberId}/transactions`                      | list-loyalty-card-transactions     |
| Loyalties | Export Loyalty Card Transactions | **POST** `v1/loyalties/{campaignId}/members/{memberId}/transactions/export` | export-loyalty-card-transactions-1 |
| Loyalties | Export Loyalty Card Transactions | **POST** `v1/loyalties/members/{memberId}/transactions/export`              | export-loyalty-card-transactions   |


### Slugs updated for Object Schemas

| **API**                 | **Object Definition**                 | **Previous Slug**                     | **New Slug**                                                      |
| ----------------------- | ------------------------------------- | ------------------------------------- | ----------------------------------------------------------------- |
| **Vouchers**            | The Voucher Object                    | the-voucher-object                    | voucher-object                                                    |
| **Campaigns**           | The Campaign Object                   | the-campaign-object                   | campaign-object                                                   |
| **Promotions**          | The Promotion Tier Object             | the-promotion-object                  | promotion-tier-object                                             |
| **Rewards**             | The Reward Object                     | the-reward-object                     | reward-object                                                     |
|                         | The Reward Assignment Object          | the-reward-assignment-object          | reward-assignment-object                                          |
| **Validations**         | The Validation Object                 | the-validation-object                 | validation-object                                                 |
| **Redemptions**         | The Redemption Object                 | the-redemption-object                 | redemption-object                                                 |
|                         | The Redemption Rollback Object        | the-redemption-rollback-object        | rollback-redemption-object                                        |
| **Loyalties**           | The Loyalty Campaign Object           | the-loyalty-campaign-object           |                                                                   |
|                         | The Loyalty Card Object               | loyalty-card-object                   | loyalty-card-object (_slug remains the same_)                     |
|                         | The Earning Rule Object               | the-earning-rule-object               | earning-rule-object                                               |
|                         | The Loyalty Tiers Object              | the-loyalty-tiers-object              | loyalty-tier-object                                               |
|                         | The Customer Object                   | the-customer-object                   | _moved to Customers API and re-named to_ customer-object          |
|                         | The Customer Activity Object          | the-customer-activities-object        | _moved to Customers API and re-named to_ customer-activity-object |
| **Orders**              | The Order Object                      | the-order-object                      | order-object                                                      |
|                         | The Order Item Object                 | the-order-item-object                 | _removed_                                                         |
| **Products**            | The Product Object                    | the-product-object                    | product-object                                                    |
|                         | The SKU Object                        | the-sku-object                        | sku-object                                                        |
| **Product Collections** | The Product Collections Object        | the-product-collections-object        | product-collection-object                                         |
| **Validation Rules**    | The Validation Rule Object            | the-validation-rule-object            | validation-rule-object                                            |
|                         | The Validation Rule Assignment Object | the-validation-rule-assignment-object | validation-rule-assignment-object                                 |
| **Segments**            | The Segment Object                    | the-segment-object                    | customer-segment-object                                           |
| **Events**              | The Custom Event Object               | the-custom-event-object               | custom-event-object                                               |
| **Exports**             | The Export Object                     | the-export-object                     | export-object                                                     |
| **Categories**          | The Category Object                   | category-object                       | category-object (_slug remains the same_)                         |
| **Metadata Schemas**    | The Metadata Schema Object            | the-metadata-schema-object            | metadata-schema-object                                            |

### Slugs for newly added objects

| **API**                     | **Object Definition**        | **New Slug**                 |
| --------------------------- | ---------------------------- | ---------------------------- |
| **Publications**            | The Voucher Object           | publication-object           |
| **Stackable Discounts API** | Stackable Redemptions Object | stackable-redemptions-object |
| **Loyalties API**           | Loyalty Campaign Object      | loyalty-campaign-object      |
| **Consents API**            | Consents Object              | consents-object              |
| **Async Actions API**       | Async Action Object          | async-action-object          |



### API Reference Guides that were turned into redirects

| **API**             | **Title**                    | **Slug**                     | **Now links to**           |
| :------------------ | :--------------------------- | :--------------------------- | :------------------------- |
| Validations         | Validation Session           | validation-session           | locking-validation-session |
| Stackable Discounts | Establish Validation Session | establish-validation-session | locking-validation-session |
| Stackable Discounts | API Overview                 | stacking-api-overview        | manage-stackable-discounts |

### API Reference Guides removed

| **API**             | **Title**             | **Slug**              | **Reason**                                                 |
| :------------------ | :-------------------- | :-------------------- | :--------------------------------------------------------- |
| Stackable Discounts | Redeemables Reference | redeemables-reference | same content in Guide with slug manage-stackable-discounts |


### Redirects

/docs/status-1 -> /docs/status
/docs/orders-1  -> /docs/orders
/docs/vouchers-1 -> /docs/vouchers
/docs/campaigns-1 -> /docs/campaigns
/docs/checking-eligibility-for-coupons -> /docs/checking-eligibility
/reference/examine-qualification -> /reference/check-eligibility
/reference/examine-qualification-client-side -> /reference/check-eligibility-client-side
/reference/vouchers-get -> /reference/get-voucher
/reference/add-gift-voucher-balance -> /reference/add-remove-gift-voucher-balance
/reference/import-vouchers-1 -> /reference/import-vouchers
/reference/import-vouchers-by-csv-1 -> /reference/import-vouchers-using-csv
/reference/push-qualification-request -> /reference/examine-vouchers-qualification
/reference/aa-update-vouchers-in-bulk -> /reference/update-vouchers-in-bulk
/reference/aaupdate-vouchers-metadata-in-bulk -> /reference/update-vouchers-metadata-in-bulk
/reference/add-voucher-to-campaign -> /reference/add-vouchers-to-campaign
/reference/add-voucher-with-certain-code-to-campaign -> /reference/add-voucher-with-specific-code-to-campaign
/reference/import-vouchers -> /reference/import-vouchers-to-campaign
/reference/import-vouchers-by-csv -> /reference/import-vouchers-to-campaign-using-csv
/reference/create-qualification-request -> /reference/examine-campaigns-qualification
/reference/get-promotions -> /reference/list-promotion-tiers-from-campaign
/reference/update-promotion -> /reference/update-promotion-tier
/reference/delete-promotion -> /reference/delete-promotion-tier
/reference/list-promotion-stacks -> /reference/list-promotion-stacks-in-campaign
/reference/vouchers-validate -> /reference/validate-voucher-client-side
/reference/validate-promotions-1 -> /reference/validate-promotions
/reference/vouchers-redemptions -> /reference/get-voucher-redemptions
/reference/validate-stacked-discounts-1 -> /reference/validate-stacked-discounts
/reference/validate-stackable-discounts-client-side -> /reference/validate-stacked-discounts-client-side
/reference/redeem-stackable-discounts-client-side -> /reference/redeem-stacked-discounts-client-side
/reference/rollback-stackable-redemptions -> /reference/rollback-stacked-redemptions
/reference/get-reward-assignment -> /reference/get-reward-assignment-1
/reference/get-reward-assignment-1 -> /reference/get-reward-assignment-2
/reference/list-reward-assignments-1 -> /reference/list-reward-assignments-2
/reference/list-reward-assignments-2 -> /reference/list-reward-assignments-1
/reference/redeem-loyalty-card -> /reference/redeem-reward-1
/reference/create-member -> /reference/add-member
/reference/get-member -> /reference/get-member-1
/reference/get-member-1 -> /reference/get-member
/reference/get-member-activities-1 -> /reference/get-member-activities
/reference/get-member-activities -> /reference/get-member-activities-1
/reference/add-loyalty-card-balance -> /reference/add-remove-loyalty-card-balance-1
/reference/transfer-points2 -> /reference/transfer-points
/reference/read-customer -> /reference/get-customer
/reference/post-customers-in-bulk -> /reference/update-customers-in-bulk
/reference/post-customers-metadata-in-bulk -> /reference/update-customers-metadata-in-bulk
/reference/update-customers-consents-client -> /reference/update-customers-consents-client-side
/reference/get-customer-activities -> /reference/list-customer-activities
/reference/list-segments -> /reference/list-customer-segments
/reference/create-export-1 -> /reference/create-order-export
/reference/post-products-in-bulk -> /reference/update-products-in-bulk
/reference/async-update-products-metadata-in-bulk -> /reference/update-products-metadata-in-bulk
/reference/get-sku-v20210726 -> /reference/get-sku
/reference/list-skus -> /reference/list-skus-in-product
/reference/import-products-by-csv -> /reference/import-products-using-csv
/reference/import-skus-by-csv -> /reference/import-skus-using-csv
/reference/get-products-in-collection -> /reference/list-products-in-collection
/reference/get-validation-rules -> /reference/get-validation-rule
/reference/update-validation-rules -> /reference/update-validation-rule
/reference/create-validation-rules-assignment -> /reference/create-validation-rule-assignment
/reference/delete-validation-rules-assignment -> /reference/delete-validation-rule-assignment
/reference/create-custom-event -> /reference/track-custom-event
/reference/get-consents -> /reference/list-consents
/reference/get-consent-client-side -> /reference/list-consents-client-side
/reference/get-async-actions-1 -> /reference/get-async-action
/reference/redeemables-reference -> /docs/manage-stackable-discounts
/reference/the-voucher-object -> /reference/voucher-object
/reference/the-campaign-object -> /reference/campaign-object
/reference/the-promotion-object -> /reference/promotion-tier-object
/reference/the-reward-object -> /reference/reward-object
/reference/the-reward-assignment-object -> /reference/reward-assignment-object
/reference/the-validation-object -> /reference/validation-object
/reference/the-redemption-object -> /reference/redemption-object
/reference/the-redemption-rollback-object -> /reference/rollback-redemption-object
/reference/the-loyalty-campaign-object -> /reference/loyalty-campaign-object
/reference/the-earning-rule-object -> /reference/earning-rule-object
/reference/the-loyalty-tiers-object -> /reference/loyalty-tier-object
/reference/the-customer-object -> /reference/customer-object
/reference/the-customer-activities-object -> /reference/customer-activity-object
/reference/the-order-object -> /reference/order-object
/reference/the-order-item-object -> /reference/order-object
/reference/the-product-object -> /reference/product-object
/reference/the-sku-object -> /reference/sku-object
/reference/the-product-collections-object -> /reference/product-collection-object
/reference/the-validation-rule-object -> /reference/validation-rule-object
/reference/the-validation-rule-assignment-object -> /reference/validation-rule-assignment-object
/reference/the-segment-object -> /reference/customer-segment-object
/reference/the-custom-event-object -> /reference/custom-event-object
/reference/the-export-object -> /reference/export-object
/reference/the-metadata-schema-object -> /reference/metadata-schema-object

### Dummy endpoints

The following endpoints in the OpenAPI document found in the `paths` object are dummy endpoints. They help in rendering object schemas in the documentation and are by no means actual API endpoints.

`/v1/voucher-object`
`/v1/campaign-object`
`/v1/promotion-tier-object`
`/v1/reward-object`
`/v1/reward-assignment-object`
`/v1/publication-object`
`/v1/validation-object`
`/v1/redemption-object`
`/v1/rollback-redemption-object`
`/v1/stackable-redemptions-object`
`/v1/loyalty-campaign-object`
`/v1/loyalty-card-object`
`/v1/loyalty-tier-object`
`/v1/earning-object`
`/v1/customer-object`
`/v1/customer-activity-object`
`/v1/order-object`
`/v1/product-object`
`/v1/sku-object`
`/v1/product-collection-object`
`v1/validation-rule-object`
`/v1/validation-rule-assignment-object`
`/v1/customer-segment-object`
`/v1/custom-event-object`
`/v1/consents-object`
`/v1/async-action-object`
`/v1/export-object`
`/v1/category-object`
`/v1/metadata-schema-object`
`/v1/location-object`
`/v1/qualification-object`
