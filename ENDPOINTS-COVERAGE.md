# Endpoints Coverage
# Table of Contents

- [Vouchers](#vouchers)
  - [/v1/vouchers](#v1vouchers)
  - [/v1/vouchers/{code}](#v1voucherscode)
  - [/v1/vouchers/{code}/enable](#v1voucherscodeenable)
  - [/v1/vouchers/{code}/disable](#v1voucherscodedisable)
  - [/v1/vouchers/{code}/balance](#v1voucherscodebalance)
  - [/v1/vouchers/{code}/transactions](#v1voucherscodetransactions)
  - [/v1/vouchers/{code}/transactions/export](#v1voucherscodetransactionsexport)
  - [/v1/vouchers/import](#v1vouchersimport)
  - [/v1/vouchers/importCSV](#v1vouchersimportcsv)
  - [/v1/vouchers/qualification](#v1vouchersqualification)
  - [/v1/vouchers/bulk/async](#v1vouchersbulkasync)
  - [/v1/vouchers/metadata/async](#v1vouchersmetadataasync)
  - [/v1/vouchers/{code}/sessions/{sessionKey}](#v1voucherscodesessionssessionkey)
- [Campaigns](#campaigns)
  - [/v1/campaigns](#v1campaigns)
  - [/v1/campaigns/{campaignId}](#v1campaignscampaignid)
  - [/v1/campaigns/{campaignId}/vouchers](#v1campaignscampaignidvouchers)
  - [/v1/campaigns/{campaignId}/vouchers/{code}](#v1campaignscampaignidvoucherscode)
  - [/v1/campaigns/{campaignId}/import](#v1campaignscampaignidimport)
  - [/v1/campaigns/{campaignId}/importCSV](#v1campaignscampaignidimportcsv)
  - [/v1/campaigns/qualification](#v1campaignsqualification)
  - [/v1/campaigns/{campaignId}/enable](#v1campaignscampaignidenable)
  - [/v1/campaigns/{campaignId}/disable](#v1campaignscampaigniddisable)
- [Promotions](#promotions)
  - [/v1/promotions/tiers](#v1promotionstiers)
  - [/client/v1/promotions/tiers](#clientv1promotionstiers)
  - [/v1/promotions/{campaignId}/tiers](#v1promotionscampaignidtiers)
  - [/v1/promotions/tiers/{promotionTierId}](#v1promotionstierspromotiontierid)
  - [/v1/promotions/tiers/{promotionTierId}/enable](#v1promotionstierspromotiontieridenable)
  - [/v1/promotions/tiers/{promotionTierId}/disable](#v1promotionstierspromotiontieriddisable)
  - [/v1/promotions/stacks](#v1promotionsstacks)
  - [/v1/promotions/{campaignId}/stacks](#v1promotionscampaignidstacks)
  - [/v1/promotions/{campaignId}/stacks/{stackId}](#v1promotionscampaignidstacksstackid)
- [Rewards](#rewards)
  - [/v1/rewards](#v1rewards)
  - [/v1/rewards/{rewardId}](#v1rewardsrewardid)
  - [/v1/rewards/{rewardId}/assignments](#v1rewardsrewardidassignments)
  - [/v1/rewards/{rewardId}/assignments/{assignmentId}](#v1rewardsrewardidassignmentsassignmentid)
- [Publications](#publications)
  - [/v1/publications/create](#v1publicationscreate)
  - [/v1/publications](#v1publications)
- [Validations](#validations)
  - [/v1/vouchers/{code}/validate](#v1voucherscodevalidate)
  - [/client/v1/validate](#clientv1validate)
  - [/v1/promotions/validation](#v1promotionsvalidation)
  - [/v1/promotions/tiers/{tierId}/validation](#v1promotionstierstieridvalidation)
- [Redemptions](#redemptions)
  - [/v1/redemptions](#v1redemptions)
  - [/v1/redemptions/{redemptionId}](#v1redemptionsredemptionid)
  - [/v1/vouchers/{code}/redemption](#v1voucherscoderedemption)
  - [/client/v1/redeem](#clientv1redeem)
  - [/v1/redemptions/{redemptionId}/rollback](#v1redemptionsredemptionidrollback)
  - [/v1/promotions/tiers/{promotionTierId}/redemption](#v1promotionstierspromotiontieridredemption)
- [Stackable Discounts](#stackable discounts)
  - [/client/v1/redemptions](#clientv1redemptions)
  - [/v1/validations](#v1validations)
  - [/client/v1/validations](#clientv1validations)
  - [/v1/redemptions/{parentRedemptionId}/rollbacks](#v1redemptionsparentredemptionidrollbacks)
- [Loyalties](#loyalties)
  - [/v1/loyalties](#v1loyalties)
  - [/v1/loyalties/{campaignId}](#v1loyaltiescampaignid)
  - [/v1/loyalties/{campaignId}/members](#v1loyaltiescampaignidmembers)
  - [/v1/loyalties/{campaignId}/members/{memberId}](#v1loyaltiescampaignidmembersmemberid)
  - [/v1/loyalties/members/{memberId}](#v1loyaltiesmembersmemberid)
  - [/v1/loyalties/{campaignId}/members/{memberId}/activities](#v1loyaltiescampaignidmembersmemberidactivities)
  - [/v1/loyalties/members/{memberId}/activities](#v1loyaltiesmembersmemberidactivities)
  - [/v1/loyalties/{campaignId}/members/{memberId}/balance](#v1loyaltiescampaignidmembersmemberidbalance)
  - [/v1/loyalties/members/{memberId}/balance](#v1loyaltiesmembersmemberidbalance)
  - [/v1/loyalties/{campaignId}/members/{memberId}/transfers](#v1loyaltiescampaignidmembersmemberidtransfers)
  - [/v1/loyalties/{campaignId}/members/{memberId}/transactions](#v1loyaltiescampaignidmembersmemberidtransactions)
  - [/v1/loyalties/members/{memberId}/transactions](#v1loyaltiesmembersmemberidtransactions)
  - [/v1/loyalties/members/{memberId}/transactions/export](#v1loyaltiesmembersmemberidtransactionsexport)
  - [/v1/loyalties/{campaignId}/members/{memberId}/transactions/export](#v1loyaltiescampaignidmembersmemberidtransactionsexport)
  - [/v1/loyalties/{campaignId}/members/{memberId}/points-expiration](#v1loyaltiescampaignidmembersmemberidpoints-expiration)
  - [/v1/loyalties/{campaignId}/points-expiration/export](#v1loyaltiescampaignidpoints-expirationexport)
  - [/v1/loyalties/{campaignId}/earning-rules](#v1loyaltiescampaignidearning-rules)
  - [/v1/loyalties/{campaignId}/earning-rules/{earningRuleId}](#v1loyaltiescampaignidearning-rulesearningruleid)
  - [/v1/loyalties/{campaignId}/earning-rules/{earningRuleId}/enable](#v1loyaltiescampaignidearning-rulesearningruleidenable)
  - [/v1/loyalties/{campaignId}/earning-rules/{earningRuleId}/disable](#v1loyaltiescampaignidearning-rulesearningruleiddisable)
  - [/v1/loyalties/members/{memberId}/rewards](#v1loyaltiesmembersmemberidrewards)
  - [/v1/loyalties/{campaignId}/reward-assignments/{assignmentId}/reward](#v1loyaltiescampaignidreward-assignmentsassignmentidreward)
  - [/v1/loyalties/{campaignId}/reward-assignments](#v1loyaltiescampaignidreward-assignments)
  - [/v1/loyalties/{campaignId}/rewards](#v1loyaltiescampaignidrewards)
  - [/v1/loyalties/{campaignId}/reward-assignments/{assignmentId}](#v1loyaltiescampaignidreward-assignmentsassignmentid)
  - [/v1/loyalties/{campaignId}/rewards/{assignmentId}](#v1loyaltiescampaignidrewardsassignmentid)
  - [/v1/loyalties/{campaignId}/members/{memberId}/redemption](#v1loyaltiescampaignidmembersmemberidredemption)
  - [/v1/loyalties/members/{memberId}/redemption](#v1loyaltiesmembersmemberidredemption)
  - [/v1/loyalties/{campaignId}/tiers](#v1loyaltiescampaignidtiers)
  - [/v1/loyalties/{campaignId}/tiers/{loyaltyTierId}](#v1loyaltiescampaignidtiersloyaltytierid)
  - [/v1/loyalties/members/{memberId}/tiers](#v1loyaltiesmembersmemberidtiers)
  - [/v1/loyalties/{campaignId}/tiers/{loyaltyTierId}/earning-rules](#v1loyaltiescampaignidtiersloyaltytieridearning-rules)
  - [/v1/loyalties/{campaignId}/tiers/{loyaltyTierId}/rewards](#v1loyaltiescampaignidtiersloyaltytieridrewards)
- [Customers](#customers)
  - [/v1/customers](#v1customers)
  - [/v1/customers/{customerId}](#v1customerscustomerid)
  - [/v1/customers/{customerId}/permanent-deletion](#v1customerscustomeridpermanent-deletion)
  - [/v1/customers/importCSV](#v1customersimportcsv)
  - [/v1/customers/bulk/async](#v1customersbulkasync)
  - [/v1/customers/metadata/async](#v1customersmetadataasync)
  - [/v1/customers/{customerId}/consents](#v1customerscustomeridconsents)
  - [/client/v1/customers/{customerId}/consents](#clientv1customerscustomeridconsents)
  - [/v1/customers/{customerId}/activities](#v1customerscustomeridactivities)
  - [/v1/customers/{customerId}/segments](#v1customerscustomeridsegments)
- [Orders](#orders)
  - [/v1/orders](#v1orders)
  - [/v1/orders/{orderId}](#v1ordersorderid)
  - [/v1/orders/import](#v1ordersimport)
  - [/v1/orders/export](#v1ordersexport)
- [Products](#products)
  - [/v1/products](#v1products)
  - [/v1/products/{productId}](#v1productsproductid)
  - [/v1/products/bulk/async](#v1productsbulkasync)
  - [/v1/products/metadata/async](#v1productsmetadataasync)
  - [/v1/skus/{skuId}](#v1skusskuid)
  - [/v1/products/{productId}/skus](#v1productsproductidskus)
  - [/v1/products/{productId}/skus/{skuId}](#v1productsproductidskusskuid)
  - [/v1/products/importCSV](#v1productsimportcsv)
  - [/v1/skus/importCSV](#v1skusimportcsv)
- [Product Collections](#product collections)
  - [/v1/product-collections](#v1product-collections)
  - [/v1/product-collections/{productCollectionId}](#v1product-collectionsproductcollectionid)
  - [/v1/product-collections/{productCollectionId}/products](#v1product-collectionsproductcollectionidproducts)
- [Validation Rules](#validation rules)
  - [/v1/validation-rules](#v1validation-rules)
  - [/v1/validation-rules/{validationRuleId}](#v1validation-rulesvalidationruleid)
  - [/v1/validation-rules-assignments](#v1validation-rules-assignments)
  - [/v1/validation-rules/{validationRuleId}/assignments](#v1validation-rulesvalidationruleidassignments)
  - [/v1/validation-rules/{validationRuleId}/assignments/{assignmentId}](#v1validation-rulesvalidationruleidassignmentsassignmentid)
- [Segments](#segments)
  - [/v1/segments/{segmentId}](#v1segmentssegmentid)
  - [/v1/segments](#v1segments)
- [Events](#events)
  - [/v1/events](#v1events)
  - [/client/v1/events](#clientv1events)
- [Consents](#consents)
  - [/v1/consents](#v1consents)
  - [/client/v1/consents](#clientv1consents)
- [Async Actions](#async actions)
  - [/v1/async-actions](#v1async-actions)
  - [/v1/async-actions/{asyncActionId}](#v1async-actionsasyncactionid)
- [Exports](#exports)
  - [/v1/exports](#v1exports)
  - [/v1/exports/{exportId}](#v1exportsexportid)
- [Categories](#categories)
  - [/v1/categories](#v1categories)
  - [/v1/categories/{categoryId}](#v1categoriescategoryid)
- [Metadata Schemas](#metadata schemas)
  - [/v1/metadata-schemas](#v1metadata-schemas)
  - [/v1/metadata-schemas/{resource}](#v1metadata-schemasresource)
- [Locations](#locations)
  - [/v1/locations](#v1locations)
  - [/v1/locations/{locationId}](#v1locationslocationid)
- [Qualifications](#qualifications)
  - [/v1/qualifications](#v1qualifications)
  - [/client/v1/qualifications](#clientv1qualifications)
# Endpoints

## Vouchers
### /v1/vouchers
#### List Vouchers (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
#### Generate Random Code (post)
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
### /v1/vouchers/{code}
#### Get Voucher (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/VouchersGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/VouchersGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/vouchers_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/vouchers_get_response_body.rb) ✅
#### Update Voucher (put)
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
#### Delete Voucher (delete)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
#### Create Voucher (post)
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
### /v1/vouchers/{code}/enable
#### Enable Voucher (post)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/VouchersEnableResponseBody.java) ✅
  - [php](./sdks/php/src/Model/VouchersEnableResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/vouchers_enable_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/vouchers_enable_response_body.rb) ✅
### /v1/vouchers/{code}/disable
#### Disable Voucher (post)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/VouchersDisableResponseBody.java) ✅
  - [php](./sdks/php/src/Model/VouchersDisableResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/vouchers_disable_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/vouchers_disable_response_body.rb) ✅
### /v1/vouchers/{code}/balance
#### Add or Remove Voucher Balance (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/VouchersBalanceUpdateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/VouchersBalanceUpdateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/vouchers_balance_update_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/vouchers_balance_update_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/VouchersBalanceUpdateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/VouchersBalanceUpdateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/vouchers_balance_update_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/vouchers_balance_update_response_body.rb) ✅
### /v1/vouchers/{code}/transactions
#### List Voucher Transactions (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/VouchersTransactionsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/VouchersTransactionsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/vouchers_transactions_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/vouchers_transactions_list_response_body.rb) ✅
### /v1/vouchers/{code}/transactions/export
#### Export Voucher Transactions (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/VouchersTransactionsExportCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/VouchersTransactionsExportCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/vouchers_transactions_export_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/vouchers_transactions_export_create_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/VouchersTransactionsExportCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/VouchersTransactionsExportCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/vouchers_transactions_export_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/vouchers_transactions_export_create_response_body.rb) ✅
### /v1/vouchers/import
#### Import Vouchers (post)
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
### /v1/vouchers/importCSV
#### Import Vouchers using CSV (post)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/VouchersImportCsvCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/VouchersImportCsvCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/vouchers_import_csv_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/vouchers_import_csv_create_response_body.rb) ✅
### ~~❗/v1/vouchers/qualification [Deprecated]❗~~
#### ~~❗Examine Qualification [Deprecated] (post)❗~~
### /v1/vouchers/bulk/async
#### Update Vouchers in bulk (post)
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
### /v1/vouchers/metadata/async
#### Update Vouchers' metadata in bulk (post)
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
### /v1/vouchers/{code}/sessions/{sessionKey}
#### Release Validation Session (delete)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
## Campaigns
### /v1/campaigns
#### Create Campaign (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CampaignsCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/CampaignsCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/campaigns_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/campaigns_create_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CampaignsCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CampaignsCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/campaigns_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/campaigns_create_response_body.rb) ✅
#### List Campaigns (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CampaignsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CampaignsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/campaigns_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/campaigns_list_response_body.rb) ✅
### /v1/campaigns/{campaignId}
#### Get Campaign (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CampaignsGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CampaignsGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/campaigns_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/campaigns_get_response_body.rb) ✅
#### Update Campaign (put)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CampaignsUpdateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/CampaignsUpdateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/campaigns_update_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/campaigns_update_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CampaignsUpdateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CampaignsUpdateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/campaigns_update_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/campaigns_update_response_body.rb) ✅
#### Delete Campaign (delete)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CampaignsDeleteResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CampaignsDeleteResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/campaigns_delete_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/campaigns_delete_response_body.rb) ✅
### /v1/campaigns/{campaignId}/vouchers
#### Add Vouchers to Campaign (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CampaignsVouchersCreateInBulkRequestBody.java) ✅
  - [php](./sdks/php/src/Model/CampaignsVouchersCreateInBulkRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/campaigns_vouchers_create_in_bulk_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/campaigns_vouchers_create_in_bulk_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CampaignsVouchersCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CampaignsVouchersCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/campaigns_vouchers_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/campaigns_vouchers_create_response_body.rb) ✅
### /v1/campaigns/{campaignId}/vouchers/{code}
#### Add Voucher with Specific Code to Campaign (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CampaignsVouchersCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/CampaignsVouchersCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/campaigns_vouchers_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/campaigns_vouchers_create_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CampaignsVouchersCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CampaignsVouchersCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/campaigns_vouchers_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/campaigns_vouchers_create_response_body.rb) ✅
### /v1/campaigns/{campaignId}/import
#### Import Vouchers to Campaign (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CampaignsImportCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/CampaignsImportCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/campaigns_import_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/campaigns_import_create_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CampaignsImportCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CampaignsImportCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/campaigns_import_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/campaigns_import_create_response_body.rb) ✅
### /v1/campaigns/{campaignId}/importCSV
#### Import Vouchers to Campaign by CSV (post)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CampaignsImportCsvCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CampaignsImportCsvCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/campaigns_import_csv_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/campaigns_import_csv_create_response_body.rb) ✅
### ~~❗/v1/campaigns/qualification [Deprecated]❗~~
#### ~~❗Examine Qualification [Deprecated] (post)❗~~
### /v1/campaigns/{campaignId}/enable
#### Enable Campaign (post)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CampaignsEnableResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CampaignsEnableResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/campaigns_enable_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/campaigns_enable_response_body.rb) ✅
### /v1/campaigns/{campaignId}/disable
#### Disable Campaign (post)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CampaignsDisableResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CampaignsDisableResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/campaigns_disable_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/campaigns_disable_response_body.rb) ✅
## Promotions
### /v1/promotions/tiers
#### List Promotion Tiers (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
### /client/v1/promotions/tiers
#### List Promotion Tiers (client-side) (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
### /v1/promotions/{campaignId}/tiers
#### List Promotion Tiers from Campaign (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/PromotionsTiersListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/PromotionsTiersListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/promotions_tiers_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/promotions_tiers_list_response_body.rb) ✅
#### Add Promotion Tier to Campaign (post)
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
### /v1/promotions/tiers/{promotionTierId}
#### Get Promotion Tier (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/PromotionsTiersGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/PromotionsTiersGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/promotions_tiers_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/promotions_tiers_get_response_body.rb) ✅
#### Update Promotion Tier (put)
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
#### Delete Promotion Tier (delete)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
### /v1/promotions/tiers/{promotionTierId}/enable
#### Enable Promotion Tier (post)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/PromotionsTiersEnableResponseBody.java) ✅
  - [php](./sdks/php/src/Model/PromotionsTiersEnableResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/promotions_tiers_enable_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/promotions_tiers_enable_response_body.rb) ✅
### /v1/promotions/tiers/{promotionTierId}/disable
#### Disable Promotion Tier (post)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/PromotionsTiersDisableResponseBody.java) ✅
  - [php](./sdks/php/src/Model/PromotionsTiersDisableResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/promotions_tiers_disable_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/promotions_tiers_disable_response_body.rb) ✅
### /v1/promotions/stacks
#### List Promotion Stacks (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/PromotionsStacksListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/PromotionsStacksListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/promotions_stacks_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/promotions_stacks_list_response_body.rb) ✅
### /v1/promotions/{campaignId}/stacks
#### List Promotion Stacks in Campaign (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/PromotionsStacksListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/PromotionsStacksListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/promotions_stacks_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/promotions_stacks_list_response_body.rb) ✅
#### Create Promotion Stack (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/PromotionsStacksCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/PromotionsStacksCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/promotions_stacks_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/promotions_stacks_create_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/PromotionsStacksCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/PromotionsStacksCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/promotions_stacks_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/promotions_stacks_create_response_body.rb) ✅
### /v1/promotions/{campaignId}/stacks/{stackId}
#### Get Promotion Stack (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/PromotionsStacksGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/PromotionsStacksGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/promotions_stacks_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/promotions_stacks_get_response_body.rb) ✅
#### Update Promotion Stack (put)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/PromotionsStacksUpdateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/PromotionsStacksUpdateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/promotions_stacks_update_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/promotions_stacks_update_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/PromotionsStacksUpdateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/PromotionsStacksUpdateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/promotions_stacks_update_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/promotions_stacks_update_response_body.rb) ✅
#### Delete Promotion Stack (delete)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
## Rewards
### /v1/rewards
#### List Rewards (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
#### Create Reward (post)
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
### /v1/rewards/{rewardId}
#### Get Reward (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
#### Update Reward (put)
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
#### Delete Reward (delete)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
### /v1/rewards/{rewardId}/assignments
#### List Reward Assignments (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/RewardsAssignmentsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/RewardsAssignmentsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/rewards_assignments_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/rewards_assignments_list_response_body.rb) ✅
#### Create Reward Assignment (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/RewardsAssignmentsCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/RewardsAssignmentsCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/rewards_assignments_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/rewards_assignments_create_request_body.rb) ✅
- **ResponseSupported:** ❌
### /v1/rewards/{rewardId}/assignments/{assignmentId}
#### Update Reward Assignment (put)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/RewardsAssignmentsUpdateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/RewardsAssignmentsUpdateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/rewards_assignments_update_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/rewards_assignments_update_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/RewardsAssignmentsUpdateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/RewardsAssignmentsUpdateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/rewards_assignments_update_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/rewards_assignments_update_response_body.rb) ✅
#### Delete Reward Assignment (delete)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
#### Get Reward Assignment (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/RewardsAssignmentsGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/RewardsAssignmentsGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/rewards_assignments_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/rewards_assignments_get_response_body.rb) ✅
## Publications
### /v1/publications/create
#### Create Publication (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
### /v1/publications
#### List Publications (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/PublicationsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/PublicationsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/publications_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/publications_list_response_body.rb) ✅
#### Create Publication (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/PublicationsCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/PublicationsCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/publications_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/publications_create_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/PublicationsCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/PublicationsCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/publications_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/publications_create_response_body.rb) ✅
## Validations
### ~~❗/v1/vouchers/{code}/validate [Deprecated]❗~~
#### ~~❗Validate Voucher [Deprecated] (post)❗~~
### ~~❗/client/v1/validate [Deprecated]❗~~
#### ~~❗Validate Voucher (client-side) [Deprecated] (get)❗~~
### ~~❗/v1/promotions/validation [Deprecated]❗~~
#### ~~❗Validate Promotions [Deprecated] (post)❗~~
### ~~❗/v1/promotions/tiers/{tierId}/validation [Deprecated]❗~~
#### ~~❗Validate Promotion Tier [Deprecated] (post)❗~~
## Redemptions
### /v1/redemptions
#### List Redemptions (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/RedemptionsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/RedemptionsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/redemptions_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/redemptions_list_response_body.rb) ✅
#### Redeem Stackable Discounts (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/RedemptionsRedeemRequestBody.java) ✅
  - [php](./sdks/php/src/Model/RedemptionsRedeemRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/redemptions_redeem_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/redemptions_redeem_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/RedemptionsRedeemResponseBody.java) ✅
  - [php](./sdks/php/src/Model/RedemptionsRedeemResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/redemptions_redeem_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/redemptions_redeem_response_body.rb) ✅
### /v1/redemptions/{redemptionId}
#### Get Redemption (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/RedemptionsGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/RedemptionsGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/redemptions_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/redemptions_get_response_body.rb) ✅
### /v1/vouchers/{code}/redemption
#### Get Voucher's Redemptions (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/VouchersRedemptionGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/VouchersRedemptionGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/vouchers_redemption_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/vouchers_redemption_get_response_body.rb) ✅
#### ~~❗Redeem Voucher [Deprecated] (post)❗~~
### ~~❗/client/v1/redeem [Deprecated]❗~~
#### ~~❗Redeem Voucher (client-side) [Deprecated] (post)❗~~
### /v1/redemptions/{redemptionId}/rollback
#### Rollback Redemption (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/RedemptionsRollbackCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/RedemptionsRollbackCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/redemptions_rollback_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/redemptions_rollback_create_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/RedemptionsRollbackCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/RedemptionsRollbackCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/redemptions_rollback_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/redemptions_rollback_create_response_body.rb) ✅
### ~~❗/v1/promotions/tiers/{promotionTierId}/redemption [Deprecated]❗~~
#### ~~❗Redeem Promotion [Deprecated] (post)❗~~
## Stackable Discounts
### /client/v1/redemptions
#### Redeem Stackable Discounts (client-side) (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ClientRedemptionsRedeemRequestBody.java) ✅
  - [php](./sdks/php/src/Model/ClientRedemptionsRedeemRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/client_redemptions_redeem_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/client_redemptions_redeem_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ClientRedemptionsRedeemResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ClientRedemptionsRedeemResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/client_redemptions_redeem_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/client_redemptions_redeem_response_body.rb) ✅
### /v1/validations
#### Validate Stackable Discounts (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ValidationsValidateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/ValidationsValidateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/validations_validate_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/validations_validate_request_body.rb) ✅
- **ResponseSupported:** ❌
### /client/v1/validations
#### Validate Stackable Discounts (client-side) (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ClientValidationsValidateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/ClientValidationsValidateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/client_validations_validate_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/client_validations_validate_request_body.rb) ✅
- **ResponseSupported:** ❌
### /v1/redemptions/{parentRedemptionId}/rollbacks
#### Rollback Stackable Redemptions (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/RedemptionsRollbacksCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/RedemptionsRollbacksCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/redemptions_rollbacks_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/redemptions_rollbacks_create_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/RedemptionsRollbacksCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/RedemptionsRollbacksCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/redemptions_rollbacks_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/redemptions_rollbacks_create_response_body.rb) ✅
## Loyalties
### /v1/loyalties
#### List Loyalty Campaigns (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
#### Create Loyalty Campaign (post)
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
### /v1/loyalties/{campaignId}
#### Get Loyalty Campaign (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
#### Update Loyalty Campaign (put)
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
#### Delete Loyalty Campaign (delete)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesDeleteResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesDeleteResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_delete_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_delete_response_body.rb) ✅
### /v1/loyalties/{campaignId}/members
#### List Members (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
#### Add Member (post)
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
### /v1/loyalties/{campaignId}/members/{memberId}
#### Get Member (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
### /v1/loyalties/members/{memberId}
#### Get Member (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
### /v1/loyalties/{campaignId}/members/{memberId}/activities
#### Get Member Activities (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
### /v1/loyalties/members/{memberId}/activities
#### Get Member Activities (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
### /v1/loyalties/{campaignId}/members/{memberId}/balance
#### Add or Remove Loyalty Card Balance (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesMembersBalanceUpdateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesMembersBalanceUpdateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_members_balance_update_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_members_balance_update_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesMembersBalanceUpdateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesMembersBalanceUpdateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_members_balance_update_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_members_balance_update_response_body.rb) ✅
### /v1/loyalties/members/{memberId}/balance
#### Add or Remove Loyalty Card Balance (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesMembersBalanceUpdateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesMembersBalanceUpdateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_members_balance_update_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_members_balance_update_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesMembersBalanceUpdateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesMembersBalanceUpdateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_members_balance_update_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_members_balance_update_response_body.rb) ✅
### /v1/loyalties/{campaignId}/members/{memberId}/transfers
#### Transfer Loyalty Points (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesMembersTransfersCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesMembersTransfersCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_members_transfers_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_members_transfers_create_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesMembersTransfersCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesMembersTransfersCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_members_transfers_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_members_transfers_create_response_body.rb) ✅
### /v1/loyalties/{campaignId}/members/{memberId}/transactions
#### List Loyalty Card Transactions (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesMembersTransactionsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesMembersTransactionsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_members_transactions_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_members_transactions_list_response_body.rb) ✅
### /v1/loyalties/members/{memberId}/transactions
#### List Loyalty Card Transactions (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesMembersTransactionsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesMembersTransactionsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_members_transactions_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_members_transactions_list_response_body.rb) ✅
### /v1/loyalties/members/{memberId}/transactions/export
#### Export Loyalty Card Transactions (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesMembersTransactionsExportCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesMembersTransactionsExportCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_members_transactions_export_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_members_transactions_export_create_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesMembersTransactionsExportCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesMembersTransactionsExportCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_members_transactions_export_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_members_transactions_export_create_response_body.rb) ✅
### /v1/loyalties/{campaignId}/members/{memberId}/transactions/export
#### Export Loyalty Card Transactions (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesMembersTransactionsExportCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesMembersTransactionsExportCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_members_transactions_export_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_members_transactions_export_create_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesMembersTransactionsExportCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesMembersTransactionsExportCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_members_transactions_export_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_members_transactions_export_create_response_body.rb) ✅
### /v1/loyalties/{campaignId}/members/{memberId}/points-expiration
#### Get Points Expiration (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesMembersPointsExpirationListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesMembersPointsExpirationListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_members_points_expiration_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_members_points_expiration_list_response_body.rb) ✅
### /v1/loyalties/{campaignId}/points-expiration/export
#### Create Points Expiration Export (post)
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
### /v1/loyalties/{campaignId}/earning-rules
#### List Earning Rules (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
#### Create Earning Rule (post)
- **RequestSupported:** ❌
- **ResponseSupported:** *Not applicable*
### /v1/loyalties/{campaignId}/earning-rules/{earningRuleId}
#### Get Earning Rule (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesEarningRulesGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesEarningRulesGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_earning_rules_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_earning_rules_get_response_body.rb) ✅
#### Update Earning Rule (put)
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
#### Delete Earning Rule (delete)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
### /v1/loyalties/{campaignId}/earning-rules/{earningRuleId}/enable
#### Enable Earning Rule (post)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesEarningRulesEnableResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesEarningRulesEnableResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_earning_rules_enable_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_earning_rules_enable_response_body.rb) ✅
### /v1/loyalties/{campaignId}/earning-rules/{earningRuleId}/disable
#### Disable Earning Rule (post)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesEarningRulesDisableResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesEarningRulesDisableResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_earning_rules_disable_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_earning_rules_disable_response_body.rb) ✅
### /v1/loyalties/members/{memberId}/rewards
#### List Member Rewards (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesMembersRewardsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesMembersRewardsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_members_rewards_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_members_rewards_list_response_body.rb) ✅
### /v1/loyalties/{campaignId}/reward-assignments/{assignmentId}/reward
#### Get Reward Details (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesRewardAssignmentsRewardGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesRewardAssignmentsRewardGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_reward_assignments_reward_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_reward_assignments_reward_get_response_body.rb) ✅
### /v1/loyalties/{campaignId}/reward-assignments
#### List Reward Assignments (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
### /v1/loyalties/{campaignId}/rewards
#### List Reward Assignments (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
#### Create Reward Assignment (post)
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
### /v1/loyalties/{campaignId}/reward-assignments/{assignmentId}
#### Get Reward Assignment (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesRewardAssignmentsGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesRewardAssignmentsGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_reward_assignments_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_reward_assignments_get_response_body.rb) ✅
### /v1/loyalties/{campaignId}/rewards/{assignmentId}
#### Get Reward Assignment (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesRewardsGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesRewardsGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_rewards_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_rewards_get_response_body.rb) ✅
#### Update Reward Assignment (put)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesRewardsUpdateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesRewardsUpdateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_rewards_update_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_rewards_update_request_body.rb) ✅
- **ResponseSupported:** ❌
#### Delete Reward Assignment (delete)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
### /v1/loyalties/{campaignId}/members/{memberId}/redemption
#### Redeem Reward (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesMembersRedemptionRedeemRequestBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesMembersRedemptionRedeemRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_members_redemption_redeem_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_members_redemption_redeem_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesMembersRedemptionRedeemResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesMembersRedemptionRedeemResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_members_redemption_redeem_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_members_redemption_redeem_response_body.rb) ✅
### /v1/loyalties/members/{memberId}/redemption
#### Redeem Reward (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesMembersRedemptionRedeemRequestBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesMembersRedemptionRedeemRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_members_redemption_redeem_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_members_redemption_redeem_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesMembersRedemptionRedeemResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesMembersRedemptionRedeemResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_members_redemption_redeem_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_members_redemption_redeem_response_body.rb) ✅
### /v1/loyalties/{campaignId}/tiers
#### List Loyalty Tiers (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesTiersListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesTiersListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_tiers_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_tiers_list_response_body.rb) ✅
#### Create loyalty tiers (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesTiersCreateInBulkRequestBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesTiersCreateInBulkRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_tiers_create_in_bulk_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_tiers_create_in_bulk_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesTiersCreateInBulkResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesTiersCreateInBulkResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_tiers_create_in_bulk_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_tiers_create_in_bulk_response_body.rb) ✅
### /v1/loyalties/{campaignId}/tiers/{loyaltyTierId}
#### Get Loyalty Tier (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesTiersGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesTiersGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_tiers_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_tiers_get_response_body.rb) ✅
### /v1/loyalties/members/{memberId}/tiers
#### List Member's Loyalty Tiers (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesMembersTiersListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesMembersTiersListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_members_tiers_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_members_tiers_list_response_body.rb) ✅
### /v1/loyalties/{campaignId}/tiers/{loyaltyTierId}/earning-rules
#### List Loyalty Tier Earning Rules (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesTiersEarningRulesListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesTiersEarningRulesListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_tiers_earning_rules_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_tiers_earning_rules_list_response_body.rb) ✅
### /v1/loyalties/{campaignId}/tiers/{loyaltyTierId}/rewards
#### List Loyalty Tier Rewards (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesTiersRewardsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesTiersRewardsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_tiers_rewards_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_tiers_rewards_list_response_body.rb) ✅
## Customers
### /v1/customers
#### List Customers (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CustomersListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CustomersListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/customers_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/customers_list_response_body.rb) ✅
#### Create Customer (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CustomersCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/CustomersCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/customers_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/customers_create_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CustomersCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CustomersCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/customers_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/customers_create_response_body.rb) ✅
### /v1/customers/{customerId}
#### Get Customer (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CustomersGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CustomersGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/customers_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/customers_get_response_body.rb) ✅
#### Delete Customer (delete)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
#### Update Customer (put)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CustomersUpdateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/CustomersUpdateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/customers_update_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/customers_update_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CustomersUpdateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CustomersUpdateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/customers_update_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/customers_update_response_body.rb) ✅
### /v1/customers/{customerId}/permanent-deletion
#### Delete Customer Permanently (post)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CustomersPermanentDeletionCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CustomersPermanentDeletionCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/customers_permanent_deletion_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/customers_permanent_deletion_create_response_body.rb) ✅
### /v1/customers/importCSV
#### Import and Update Customers using CSV (post)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CustomersImportCsvCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CustomersImportCsvCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/customers_import_csv_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/customers_import_csv_create_response_body.rb) ✅
### /v1/customers/bulk/async
#### Update Customers in bulk (post)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CustomersUpdateInBulkResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CustomersUpdateInBulkResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/customers_update_in_bulk_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/customers_update_in_bulk_response_body.rb) ✅
### /v1/customers/metadata/async
#### Update Customers' Metadata in bulk (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CustomersMetadataUpdateInBulkRequestBody.java) ✅
  - [php](./sdks/php/src/Model/CustomersMetadataUpdateInBulkRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/customers_metadata_update_in_bulk_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/customers_metadata_update_in_bulk_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CustomersMetadataUpdateInBulkResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CustomersMetadataUpdateInBulkResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/customers_metadata_update_in_bulk_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/customers_metadata_update_in_bulk_response_body.rb) ✅
### /v1/customers/{customerId}/consents
#### Update Customer's consents (put)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CustomersConsentsUpdateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/CustomersConsentsUpdateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/customers_consents_update_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/customers_consents_update_request_body.rb) ✅
- **ResponseSupported:** *Not applicable*
### /client/v1/customers/{customerId}/consents
#### Update Customer's consents (client-side) (put)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ClientCustomersConsentsUpdateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/ClientCustomersConsentsUpdateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/client_customers_consents_update_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/client_customers_consents_update_request_body.rb) ✅
- **ResponseSupported:** *Not applicable*
### /v1/customers/{customerId}/activities
#### List Customer Activities (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CustomersActivitiesListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CustomersActivitiesListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/customers_activities_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/customers_activities_list_response_body.rb) ✅
### /v1/customers/{customerId}/segments
#### List Customer's Segments (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CustomersSegmentsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CustomersSegmentsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/customers_segments_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/customers_segments_list_response_body.rb) ✅
## Orders
### /v1/orders
#### List Orders (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/OrdersListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/OrdersListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/orders_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/orders_list_response_body.rb) ✅
#### Create Order (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/OrdersCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/OrdersCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/orders_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/orders_create_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/OrdersCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/OrdersCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/orders_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/orders_create_response_body.rb) ✅
### /v1/orders/{orderId}
#### Get Order (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/OrdersGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/OrdersGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/orders_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/orders_get_response_body.rb) ✅
#### Update Order (put)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/OrdersUpdateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/OrdersUpdateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/orders_update_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/orders_update_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/OrdersUpdateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/OrdersUpdateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/orders_update_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/orders_update_response_body.rb) ✅
### /v1/orders/import
#### Import Orders (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/OrdersImportCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/OrdersImportCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/orders_import_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/orders_import_create_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/OrdersImportCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/OrdersImportCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/orders_import_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/orders_import_create_response_body.rb) ✅
### /v1/orders/export
#### Create Orders Export (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/OrdersExportCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/OrdersExportCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/orders_export_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/orders_export_create_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/OrdersExportCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/OrdersExportCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/orders_export_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/orders_export_create_response_body.rb) ✅
## Products
### /v1/products
#### List Products (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ProductsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/products_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/products_list_response_body.rb) ✅
#### Create Product (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductsCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/ProductsCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/products_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/products_create_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductsCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ProductsCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/products_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/products_create_response_body.rb) ✅
### /v1/products/{productId}
#### Get Product (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductsGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ProductsGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/products_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/products_get_response_body.rb) ✅
#### Update Product (put)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductsUpdateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/ProductsUpdateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/products_update_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/products_update_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductsUpdateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ProductsUpdateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/products_update_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/products_update_response_body.rb) ✅
#### Delete Product (delete)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
### /v1/products/bulk/async
#### Update Products in bulk (post)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductsUpdateInBulkResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ProductsUpdateInBulkResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/products_update_in_bulk_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/products_update_in_bulk_response_body.rb) ✅
### /v1/products/metadata/async
#### Update Products' Metadata in bulk (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductsMetadataUpdateInBulkRequestBody.java) ✅
  - [php](./sdks/php/src/Model/ProductsMetadataUpdateInBulkRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/products_metadata_update_in_bulk_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/products_metadata_update_in_bulk_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductsMetadataUpdateInBulkResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ProductsMetadataUpdateInBulkResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/products_metadata_update_in_bulk_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/products_metadata_update_in_bulk_response_body.rb) ✅
### /v1/skus/{skuId}
#### Get SKU (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/SkusGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/SkusGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/skus_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/skus_get_response_body.rb) ✅
### /v1/products/{productId}/skus
#### List SKUs in Product (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductsSkusListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ProductsSkusListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/products_skus_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/products_skus_list_response_body.rb) ✅
#### Create SKU (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductsSkusCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/ProductsSkusCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/products_skus_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/products_skus_create_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductsSkusCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ProductsSkusCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/products_skus_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/products_skus_create_response_body.rb) ✅
### /v1/products/{productId}/skus/{skuId}
#### Update SKU (put)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductsSkusUpdateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/ProductsSkusUpdateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/products_skus_update_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/products_skus_update_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductsSkusUpdateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ProductsSkusUpdateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/products_skus_update_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/products_skus_update_response_body.rb) ✅
#### Delete SKU (delete)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
### /v1/products/importCSV
#### Import Products using CSV (post)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductsImportCsvCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ProductsImportCsvCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/products_import_csv_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/products_import_csv_create_response_body.rb) ✅
### /v1/skus/importCSV
#### Import SKUs using CSV (post)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/SkusImportCsvCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/SkusImportCsvCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/skus_import_csv_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/skus_import_csv_create_response_body.rb) ✅
## Product Collections
### /v1/product-collections
#### List Product Collections (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductCollectionsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ProductCollectionsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/product_collections_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/product_collections_list_response_body.rb) ✅
#### Create Product Collection (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductCollectionsCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/ProductCollectionsCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/product_collections_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/product_collections_create_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductCollectionsCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ProductCollectionsCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/product_collections_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/product_collections_create_response_body.rb) ✅
### /v1/product-collections/{productCollectionId}
#### Get Product Collection (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductCollectionsGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ProductCollectionsGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/product_collections_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/product_collections_get_response_body.rb) ✅
#### Delete Product Collection (delete)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
### /v1/product-collections/{productCollectionId}/products
#### List Products in Collection (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductCollectionsProductsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ProductCollectionsProductsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/product_collections_products_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/product_collections_products_list_response_body.rb) ✅
## Validation Rules
### /v1/validation-rules
#### List Validation Rules (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ValidationRulesListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ValidationRulesListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/validation_rules_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/validation_rules_list_response_body.rb) ✅
#### Create Validation Rules (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ValidationRulesCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/ValidationRulesCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/validation_rules_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/validation_rules_create_request_body.rb) ✅
- **ResponseSupported:** ❌
### /v1/validation-rules/{validationRuleId}
#### Get Validation Rule (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ValidationRulesGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ValidationRulesGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/validation_rules_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/validation_rules_get_response_body.rb) ✅
#### Update Validation Rule (put)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ValidationRulesUpdateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/ValidationRulesUpdateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/validation_rules_update_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/validation_rules_update_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ValidationRulesUpdateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ValidationRulesUpdateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/validation_rules_update_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/validation_rules_update_response_body.rb) ✅
#### Delete Validation Rule (delete)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
### /v1/validation-rules-assignments
#### List Validation Rules' Assignment(s) (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ValidationRulesAssignmentsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ValidationRulesAssignmentsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/validation_rules_assignments_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/validation_rules_assignments_list_response_body.rb) ✅
### /v1/validation-rules/{validationRuleId}/assignments
#### List Validation Rule Assignments (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ValidationRulesAssignmentsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ValidationRulesAssignmentsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/validation_rules_assignments_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/validation_rules_assignments_list_response_body.rb) ✅
#### Create Validation Rules Assignments (post)
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
### /v1/validation-rules/{validationRuleId}/assignments/{assignmentId}
#### Delete Validation Rule Assignment (delete)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
## Segments
### /v1/segments/{segmentId}
#### Get Segment (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
#### Delete Segment (delete)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
### /v1/segments
#### Create Segment (post)
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
## Events
### /v1/events
#### Track Custom Event (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/EventsCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/EventsCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/events_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/events_create_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/EventsCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/EventsCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/events_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/events_create_response_body.rb) ✅
### /client/v1/events
#### Track Custom Event (client-side) (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ClientEventsCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/ClientEventsCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/client_events_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/client_events_create_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ClientEventsCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ClientEventsCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/client_events_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/client_events_create_response_body.rb) ✅
## Consents
### /v1/consents
#### List Consents (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
### /client/v1/consents
#### List Consents (client-side) (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
## Async Actions
### /v1/async-actions
#### List Async Actions (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
### /v1/async-actions/{asyncActionId}
#### Get Async Action (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
## Exports
### /v1/exports
#### Create Export (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ExportsCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/ExportsCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/exports_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/exports_create_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ExportsCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ExportsCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/exports_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/exports_create_response_body.rb) ✅
#### List Exports (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ExportsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ExportsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/exports_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/exports_list_response_body.rb) ✅
### /v1/exports/{exportId}
#### Get Export (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ExportsGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ExportsGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/exports_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/exports_get_response_body.rb) ✅
#### Delete Export (delete)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
## Categories
### /v1/categories
#### List Categories (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CategoriesListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CategoriesListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/categories_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/categories_list_response_body.rb) ✅
#### Create Category (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CategoriesCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/CategoriesCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/categories_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/categories_create_request_body.rb) ✅
- **ResponseSupported:** ❌
### /v1/categories/{categoryId}
#### Get Category (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CategoriesGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CategoriesGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/categories_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/categories_get_response_body.rb) ✅
#### Delete Category (delete)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
#### Update Category (put)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CategoriesUpdateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/CategoriesUpdateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/categories_update_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/categories_update_request_body.rb) ✅
- **ResponseSupported:** ❌
## Metadata Schemas
### /v1/metadata-schemas
#### List Metadata Schemas (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
### /v1/metadata-schemas/{resource}
#### Get Metadata Schema (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
## Locations
### /v1/locations
#### List Locations (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
### /v1/locations/{locationId}
#### Get Location (get)
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
## Qualifications
### /v1/qualifications
#### Check Eligibility (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/QualificationsCheckEligibilityRequestBody.java) ✅
  - [php](./sdks/php/src/Model/QualificationsCheckEligibilityRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/qualifications_check_eligibility_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/qualifications_check_eligibility_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/QualificationsCheckEligibilityResponseBody.java) ✅
  - [php](./sdks/php/src/Model/QualificationsCheckEligibilityResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/qualifications_check_eligibility_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/qualifications_check_eligibility_response_body.rb) ✅
### /client/v1/qualifications
#### Check Eligibility (client-side) (post)
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ClientQualificationsCheckEligibilityRequestBody.java) ✅
  - [php](./sdks/php/src/Model/ClientQualificationsCheckEligibilityRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/client_qualifications_check_eligibility_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/client_qualifications_check_eligibility_request_body.rb) ✅
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ClientQualificationsCheckEligibilityResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ClientQualificationsCheckEligibilityResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/client_qualifications_check_eligibility_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/client_qualifications_check_eligibility_response_body.rb) ✅