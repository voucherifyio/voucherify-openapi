# Changelog

## 20230829

**Added schemas**
- CustomerPermanentDeletion
- CustomerRequestBasicData
- UpdateCustomersInBulk
- UpdateCustomersMetadataInBulk

**Endpoints changes**
- `/v1/customers/{customerId}/permanent-deletion`
  - POST
    - Response schema was replaced with `CustomerPermanentDeletion`
- `/v1/customers/bulk/async`
  - POST
    - Request parameters schema was replaced with `UpdateCustomersInBulk`
- `/v1/customers/metadata/async`
  - POST
    - Request parameters schema was replaced with `UpdateCustomersMetadataInBulk`

## 20230828

**Added schemas**
- CategoryObject
- CreateCategory
- ResponseCreateCategory
- UpdateCategoryRequest
- ResponseUpdateCategory
- ListCategories

**Endpoints changes**
- `/v1/categories`
  - GET
    - Response schema was replaced with `ListCategories`
  - POST
    - Request parameters schema was replaced with `CreateCategory`
    - Response schema was replaced with `ResponseCreateCategory`
- `/v1/categories/{categoryId}`
  - GET
    - Response schema was replaced with `CategoryObject`
  - PUT
    - Request parameters schema was replaced with `UpdateCategoryRequest`
    - Response schema was replaced with `ResponseUpdateCategory`

## 20230825

**Added schemas**
- ValidationSessionParams
- ResponseValidateVoucherTrue
- ResponseValidateVoucherFalse
- OrderObjectRedemptions
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

**Removed schemas**
- 6_req_validate_voucher

**Endpoints changes**
- `/v1/vouchers/{code}/validate`
  - Request parameters schema was replaced with new one: `ValidationSessionParams`
  - Response schema was replaced with `anyOf`: `ResponseValidateVoucherTrue`, `ResponseValidateVoucherFalse`
- `/v1/validation-object`
  - Response schema was replaced with `anyOf`: `ResponseValidateVoucherTrue`, `ResponseValidateVoucherFalse`

## 20230823 - New Endpoints

### Introduced new endpoints and related object schemas

| **API** | **Endpoint** | **New Slug** |
|---|---|---|
| **Locations** | Location Object | location-object | true |
|  | Get Location | get-location | true |
|  | List Locations | list-locations | true |
| **Qualifications** | Qualification Object | qualification-object | true |
|  | Examine Qualification | examine-qualification | true |


## 20230809 - Deprecated Endpoints

### Marked the following endpoints as deprecated

| **API** | **Endpoint** | **Slug** |
|---|---|---|
| **Vouchers** | Examine Qualification | examine-vouchers-qualification |
| **Campaigns** | Examine Qualification | examine-campaigns-qualification |
| **Validations** | Validate Voucher | validate-voucher |
|  | Validate Voucher (client-side) | validate-voucher-client-side |
|  | Validate Promotions | validate-promotions |
|  | Validate Promotion Tier | validate-promotion-tier |
| **Redemptions** | Redeem Voucher | redeem-voucher |
|  | Redeem Voucher (client-side) | redeem-voucher-client-side |
|  | Redeem Promotion | redeem-promotion |


## 20230530 - Transition to Interactive documentation


### Slugs updated for Reference Docs

| **API** | **Endpoint** | **Previous Slug** | **New Slug** |
|---|---|---|---|
| **Vouchers** | Get Voucher | vouchers-get | get-voucher |
|  | Add Gift Card Balance | add-gift-voucher-balance | add-remove-gift-voucher-balance |
|  | Import Vouchers | import-vouchers-1 | import-vouchers |
|  | Import Vouchers using CSV | import-vouchers-by-csv-1 | import-vouchers-using-csv |
|  | Examine Qualification | push-qualification-request | examine-vouchers-qualification |
|  | Update Vouchers in bulk | aa-update-vouchers-in-bulk | update-vouchers-in-bulk |
|  | Update Vouchers Metadata in bulk | aaupdate-vouchers-metadata-in-bulk | update-vouchers-metadata-in-bulk |
| **Campaigns** | Add Vouchers to Campaign | add-voucher-to-campaign | add-vouchers-to-campaign |
|  | Add Voucher with certain code to Campaign | add-voucher-with-certain-code-to-campaign | add-voucher-with-specific-code-to-campaign |
|  | Import Vouchers to Campaign | import-vouchers | import-vouchers-to-campaign |
|  | Import Vouchers to Campaign by CSV | import-vouchers-by-csv | import-vouchers-to-campaign-using-csv |
|  | Examine Qualification | create-qualification-request | examine-campaigns-qualification |
| **Promotions** | List Promotion Tiers from Campaign | get-promotions | list-promotion-tiers-from-campaign |
|  | Update Promotion Tier | update-promotion | update-promotion-tier |
|  | Delete Promotion Tier | delete-promotion | delete-promotion-tier |
|  | List Promotion Stacks | list-promotion-stacks | list-promotion-stacks-in-campaign |
| **Validations** | Validate Voucher (client-side) | vouchers-validate | validate-voucher-client-side |
|  | Validate Promotions | validate-promotions-1 | validate-promotions |
| **Redemptions** | Get Voucher's Redemptions | vouchers-redemptions | get-voucher-redemptions |
| **Stackable Discounts** | Validate Stackable Discounts | validate-stacked-discounts-1 | validate-stacked-discounts |
|  | Validate Stackable Discounts (client-side) | validate-stackable-discounts-client-side | validate-stacked-discounts-client-side |
|  | Redeem Stackable Discounts | redeem-stackable-discounts-client-side | redeem-stacked-discounts-client-side |
|  | Rollback Stackable Redemptions | rollback-stackable-redemptions | rollback-stacked-redemptions |
| **Loyalties** | Get Reward Assignment | get-reward-assignment | get-reward-assignment-1 |
|  | Get Reward Assignment | get-reward-assignment-1 | get-reward-assignment-2 |
|  | List Reward Assignments | list-reward-assignments-1 | list-reward-assignments-2 |
|  | List Reward Assignments | list-reward-assignments-2 | list-reward-assignments-1 |
|  | Redeem Reward | redeem-loyalty-card | redeem-reward-1 |
|  | Add Member | create-member | add-member |
|  | Get Member | get-member | get-member-1 |
|  | Get Member | get-member-1 | get-member |
|  | Get Member Activities | get-member-activities-1 | get-member-activities |
|  | Get Member Activities | get-member-activities | get-member-activities-1 |
|  | Add or Remove Loyalty Card Balance | add-loyalty-card-balance | add-remove-loyalty-card-balance-1 |
|  | Transfer Loyalty Points | transfer-points2 | transfer-points |
| **Customers** | Get Customer | read-customer | get-customer |
|  | Update Customers in Bulk | post-customers-in-bulk | update-customers-in-bulk |
|  | Update Customers Metadata in Bulk | post-customers-metadata-in-bulk | update-customers-metadata-in-bulk |
|  | Update Customer's consents (client) | update-customers-consents-client | update-customers-consents-client-side |
|  | List Customer Activities | get-customer-activities | list-customer-activities |
|  | List Customer's Segments | list-segments | list-customer-segments |
| **Orders** | Create Export | create-export-1 | create-order-export |
| **Products** | Update Products in bulk | post-products-in-bulk | update-products-in-bulk |
|  | Update Products Metadata in bulk | async-update-products-metadata-in-bulk | update-products-metadata-in-bulk |
|  | Get SKU | get-sku-v20210726 | get-sku |
|  | List SKUs | list-skus | list-skus-in-product |
|  | Import Products Using CSV | import-products-by-csv | import-products-using-csv |
|  | Import SKUS using CSV | import-skus-by-csv | import-skus-using-csv |
| **Product Collections** | List Products in Collection | get-products-in-collection | list-products-in-collection |
| **Validation Rules** | Get Validation Rules | get-validation-rules | get-validation-rule |
|  | Update Validation Rule | update-validation-rules | update-validation-rule |
|  | Create Validation Rules Assignment | create-validation-rules-assignment | create-validation-rule-assignment |
|  | Delete Validation Rules Assignment | delete-validation-rules-assignment | delete-validation-rule-assignment |
| **Events** | Track Custom Event | create-custom-event | track-custom-event |
| **Consents** | List Consents | get-consents | list-consents |
|  | List Consents (client-side) | get-consent-client-side | list-consents-client-side |
| **Async Actions** | Get Async Action | get-async-actions-1 | get-async-action |


### Slugs updated for Guides

| **Category** | **Guide** | **Previous Slug** | **New Slug** |
|:---|:---|:---|:---|
| More | Status | status-1 | status |
| Building Blocks | Orders | orders-1 | orders |
| Building Blocks | Vouchers | vouchers-1 | vouchers |
| Building Blocks | Campaigns | campaigns-1 | campaigns |


### Endpoints descriptions that were removed

| **API** | **Endpoint Name** | **Endpoint** | **Slug** | **Why** |
|---|---|---|---|---|
| **Vouchers** | [deprecated] Update Vouchers' metadata in bulk | **POST** `/vouchers/metdata` | update-vouchers-metadata-in-bulk | deprecated |
|  | [deprecated] Update Vouchers in bulk | **POST** `/vouchers/bulk` | update-vouchers-in-bulk | deprecated |
| **Promotions** | Create Promotion Campaign | **POST** `/campaigns` | create-promotion-campaign | path exists under Campaigns API |
| **Customers** | [deprecated] Update Customers' metadata in bulk | **POST** `customers/metadata` | update-customers-metadata-in-bulk | deprecated |
|  | [deprecated] Update Customers in bulk | **POST** `customers/bulk` | update-customers-in-bulk | deprecated |
| **Orders** | Download Export | **GET** `/exports/{id}` | download-export-1 | same in Exports API |
| **Products** | [deprecated] Update Products metadata in bulk | **POST** `/products/metadata` | update-products-metadata-in-bulk | deprecated |
|  | [deprecated] Update Products in bulk | **POST** `/products/bulk` | update-products-in-bulk | deprecated |
|  | Get SKU [deprecated] | **GET** `/products/{productId}/skus/{skuId}` | get-sku | deprecated |


### Endpoints that were added

| **API** | **Endpoint Name** | **Endpoint** | **Slug** |
|---|---|---|---|
| Rewards | Get Reward Assignment | **GET** `/rewards/{rewardId}/assignments/{assignmentId}` | get-reward-assignment |
| Vouchers | List Gift Card Transactions | **GET** `/vouchers/{code}/transactions` | list-gift-card-transactions |
| Vouchers | Export Gift Card Transactions | **POST** `/vouchers/{code}/transactions/export` | export-gift-card-transactions |
| Loyalties | List Loyalty Card Transactions | **GET** `/loyalties/{campaignId}/members/{memberId}/transactions` |  list-loyalty-card-transactions-1 |
| Loyalties | List Loyalty Card Transactions | **GET** `/loyalties/members/{memberId}/transactions` | list-loyalty-card-transactions |
| Loyalties | Export Loyalty Card Transactions | **POST** `/loyalties/{campaignId}/members/{memberId}/transactions/export` | export-loyalty-card-transactions-1 |
| Loyalties | Export Loyalty Card Transactions | **POST** `/loyalties/members/{memberId}/transactions/export` | export-loyalty-card-transactions |


### Slugs updated for Object Schemas

| **API** | **Object Definition** | **Previous Slug** | **New Slug** |
|---|---|---|---|
| **Vouchers** | The Voucher Object | the-voucher-object | voucher-object |
| **Campaigns** | The Campaign Object | the-campaign-object | campaign-object |
| **Promotions** | The Promotion Tier Object | the-promotion-object | promotion-tier-object |
| **Rewards** | The Reward Object | the-reward-object | reward-object |
|  | The Reward Assignment Object | the-reward-assignment-object | reward-assignment-object |
| **Validations** | The Validation Object | the-validation-object | validation-object |
| **Redemptions** | The Redemption Object | the-redemption-object | redemption-object |
|  | The Redemption Rollback Object | the-redemption-rollback-object | rollback-redemption-object |
| **Loyalties** | The Loyalty Campaign Object | the-loyalty-campaign-object |  |
|  | The Loyalty Card Object | loyalty-card-object | loyalty-card-object (_slug remains the same_) |
|  | The Earning Rule Object | the-earning-rule-object | earning-rule-object |
|  | The Loyalty Tiers Object | the-loyalty-tiers-object | loyalty-tier-object |
|  | The Customer Object | the-customer-object | _moved to Customers API and re-named to_ customer-object |
|  | The Customer Activity Object | the-customer-activities-object | _moved to Customers API and re-named to_ customer-activity-object |
| **Orders** | The Order Object | the-order-object | order-object |
|  | The Order Item Object | the-order-item-object | _removed_ |
| **Products** | The Product Object | the-product-object | product-object |
|  | The SKU Object | the-sku-object | sku-object |
| **Product Collections** | The Product Collections Object | the-product-collections-object | product-collection-object |
| **Validation Rules** | The Validation Rule Object | the-validation-rule-object | validation-rule-object |
|  | The Validation Rule Assignment Object | the-validation-rule-assignment-object | validation-rule-assignment-object |
| **Segments** | The Segment Object | the-segment-object | customer-segment-object |
| **Events** | The Custom Event Object | the-custom-event-object | custom-event-object |
| **Exports** | The Export Object | the-export-object | export-object |
| **Categories** | The Category Object | category-object | category-object (_slug remains the same_) |
| **Metadata Schemas** | The Metadata Schema Object | the-metadata-schema-object | metadata-schema-object |

### Slugs for newly added objects

| **API** | **Object Definition** | **New Slug** |
|---|---|---|
| **Publications** | The Voucher Object | publication-object |
| **Stackable Discounts API** | Stackable Redemptions Object | stackable-redemptions-object |
| **Loyalties API** | Loyalty Campaign Object | loyalty-campaign-object |
| **Consents API** | Consents Object | consents-object |
| **Async Actions API** | Async Action Object | async-action-object |



### API Reference Guides that were turned into redirects

| **API** | **Title** | **Slug** | **Now links to** |
|:---|:---|:---|:---|
| Validations | Validation Session | validation-session | locking-validation-session |
| Stackable Discounts | Establish Validation Session | establish-validation-session | locking-validation-session |
| Stackable Discounts | API Overview | stacking-api-overview | manage-stackable-discounts |

### API Reference Guides removed

| **API** | **Title** | **Slug** | **Reason** |
|:---|:---|:---|:---|
| Stackable Discounts | Redeemables Reference | redeemables-reference | same content in Guide with slug manage-stackable-discounts |


### Redirects

/docs/status-1 -> /docs/status
/docs/orders-1  -> /docs/orders
/docs/vouchers-1 -> /docs/vouchers
/docs/campaigns-1 -> /docs/campaigns
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
