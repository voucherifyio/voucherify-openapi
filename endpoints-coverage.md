# Endpoints Coverage
## /v1/vouchers
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
### post
- **RequestSupported:** ❌
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/VouchersGenerateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/VouchersGenerateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/vouchers_generate_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/vouchers_generate_response_body.rb) ✅
## /v1/vouchers/{code}
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/VouchersGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/VouchersGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/vouchers_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/vouchers_get_response_body.rb) ✅
### delete
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
### post
- **RequestSupported:** ❌
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/VouchersCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/VouchersCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/vouchers_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/vouchers_create_response_body.rb) ✅
## /v1/vouchers/{code}/enable
### post
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/VouchersEnableResponseBody.java) ✅
  - [php](./sdks/php/src/Model/VouchersEnableResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/vouchers_enable_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/vouchers_enable_response_body.rb) ✅
## /v1/vouchers/{code}/disable
### post
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/VouchersDisableResponseBody.java) ✅
  - [php](./sdks/php/src/Model/VouchersDisableResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/vouchers_disable_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/vouchers_disable_response_body.rb) ✅
## /v1/vouchers/{code}/balance
### post
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
## /v1/vouchers/{code}/transactions
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/VouchersTransactionsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/VouchersTransactionsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/vouchers_transactions_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/vouchers_transactions_list_response_body.rb) ✅
## /v1/vouchers/{code}/transactions/export
### post
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
## /v1/vouchers/import
### post
- **RequestSupported:** ❌
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/VouchersImportCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/VouchersImportCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/vouchers_import_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/vouchers_import_create_response_body.rb) ✅
## /v1/vouchers/importCSV
### post
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/VouchersImportCsvCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/VouchersImportCsvCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/vouchers_import_csv_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/vouchers_import_csv_create_response_body.rb) ✅
## /v1/vouchers/qualification
### post
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
## /v1/vouchers/bulk/async
### post
- **RequestSupported:** ❌
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/VouchersUpdateInBulkResponseBody.java) ✅
  - [php](./sdks/php/src/Model/VouchersUpdateInBulkResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/vouchers_update_in_bulk_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/vouchers_update_in_bulk_response_body.rb) ✅
## /v1/vouchers/metadata/async
### post
- **RequestSupported:** ❌
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/VouchersMetadataUpdateInBulkResponseBody.java) ✅
  - [php](./sdks/php/src/Model/VouchersMetadataUpdateInBulkResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/vouchers_metadata_update_in_bulk_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/vouchers_metadata_update_in_bulk_response_body.rb) ✅
## /v1/vouchers/{code}/sessions/{sessionKey}
### delete
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
## /v1/campaigns
### post
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
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CampaignsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CampaignsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/campaigns_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/campaigns_list_response_body.rb) ✅
## /v1/campaigns/{campaignId}
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CampaignsGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CampaignsGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/campaigns_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/campaigns_get_response_body.rb) ✅
### delete
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CampaignsDeleteResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CampaignsDeleteResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/campaigns_delete_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/campaigns_delete_response_body.rb) ✅
## /v1/campaigns/{campaignId}/vouchers
### post
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
## /v1/campaigns/{campaignId}/vouchers/{code}
### post
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
## /v1/campaigns/{campaignId}/import
### post
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
## /v1/campaigns/{campaignId}/importCSV
### post
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CampaignsImportCsvCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CampaignsImportCsvCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/campaigns_import_csv_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/campaigns_import_csv_create_response_body.rb) ✅
## /v1/campaigns/qualification
### post
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
## /v1/campaigns/{campaignId}/enable
### post
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CampaignsEnableResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CampaignsEnableResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/campaigns_enable_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/campaigns_enable_response_body.rb) ✅
## /v1/campaigns/{campaignId}/disable
### post
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CampaignsDisableResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CampaignsDisableResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/campaigns_disable_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/campaigns_disable_response_body.rb) ✅
## /v1/promotions/tiers
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
## /client/v1/promotions/tiers
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
## /v1/promotions/{campaignId}/tiers
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/PromotionsTiersListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/PromotionsTiersListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/promotions_tiers_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/promotions_tiers_list_response_body.rb) ✅
### post
- **RequestSupported:** ❌
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/PromotionsTiersCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/PromotionsTiersCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/promotions_tiers_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/promotions_tiers_create_response_body.rb) ✅
## /v1/promotions/tiers/{promotionTierId}
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/PromotionsTiersGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/PromotionsTiersGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/promotions_tiers_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/promotions_tiers_get_response_body.rb) ✅
### delete
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
## /v1/promotions/tiers/{promotionTierId}/enable
### post
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/PromotionsTiersEnableResponseBody.java) ✅
  - [php](./sdks/php/src/Model/PromotionsTiersEnableResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/promotions_tiers_enable_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/promotions_tiers_enable_response_body.rb) ✅
## /v1/promotions/tiers/{promotionTierId}/disable
### post
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/PromotionsTiersDisableResponseBody.java) ✅
  - [php](./sdks/php/src/Model/PromotionsTiersDisableResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/promotions_tiers_disable_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/promotions_tiers_disable_response_body.rb) ✅
## /v1/promotions/stacks
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/PromotionsStacksListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/PromotionsStacksListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/promotions_stacks_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/promotions_stacks_list_response_body.rb) ✅
## /v1/promotions/{campaignId}/stacks
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/PromotionsStacksListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/PromotionsStacksListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/promotions_stacks_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/promotions_stacks_list_response_body.rb) ✅
### post
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
## /v1/promotions/{campaignId}/stacks/{stackId}
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/PromotionsStacksGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/PromotionsStacksGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/promotions_stacks_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/promotions_stacks_get_response_body.rb) ✅
### delete
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
## /v1/rewards
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
### post
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
## /v1/rewards/{rewardId}
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
### delete
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
## /v1/rewards/{rewardId}/assignments
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/RewardsAssignmentsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/RewardsAssignmentsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/rewards_assignments_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/rewards_assignments_list_response_body.rb) ✅
### post
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/RewardsAssignmentsCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/RewardsAssignmentsCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/rewards_assignments_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/rewards_assignments_create_request_body.rb) ✅
- **ResponseSupported:** ❌
## /v1/rewards/{rewardId}/assignments/{assignmentId}
### delete
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/RewardsAssignmentsGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/RewardsAssignmentsGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/rewards_assignments_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/rewards_assignments_get_response_body.rb) ✅
## /v1/publications/create
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
## /v1/publications
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/PublicationsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/PublicationsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/publications_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/publications_list_response_body.rb) ✅
### post
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
## /v1/vouchers/{code}/validate
### post
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/VouchersValidateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/VouchersValidateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/vouchers_validate_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/vouchers_validate_request_body.rb) ✅
- **ResponseSupported:** ❌
## /client/v1/validate
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
## /v1/promotions/validation
### post
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
## /v1/promotions/tiers/{tierId}/validation
### post
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
## /v1/redemptions
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/RedemptionsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/RedemptionsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/redemptions_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/redemptions_list_response_body.rb) ✅
### post
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
## /v1/redemptions/{redemptionId}
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/RedemptionsGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/RedemptionsGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/redemptions_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/redemptions_get_response_body.rb) ✅
## /v1/vouchers/{code}/redemption
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/VouchersRedemptionGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/VouchersRedemptionGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/vouchers_redemption_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/vouchers_redemption_get_response_body.rb) ✅
### post
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
## /client/v1/redeem
### post
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
## /v1/redemptions/{redemptionId}/rollback
### post
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
## /v1/promotions/tiers/{promotionTierId}/redemption
### post
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
## /client/v1/redemptions
### post
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
## /v1/validations
### post
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ValidationsValidateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/ValidationsValidateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/validations_validate_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/validations_validate_request_body.rb) ✅
- **ResponseSupported:** ❌
## /client/v1/validations
### post
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ClientValidationsValidateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/ClientValidationsValidateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/client_validations_validate_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/client_validations_validate_request_body.rb) ✅
- **ResponseSupported:** ❌
## /v1/redemptions/{parentRedemptionId}/rollbacks
### post
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
## /v1/loyalties
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
### post
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
## /v1/loyalties/{campaignId}
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
### delete
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesDeleteResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesDeleteResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_delete_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_delete_response_body.rb) ✅
## /v1/loyalties/{campaignId}/members
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
### post
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
## /v1/loyalties/{campaignId}/members/{memberId}
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
## /v1/loyalties/members/{memberId}
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
## /v1/loyalties/{campaignId}/members/{memberId}/activities
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
## /v1/loyalties/members/{memberId}/activities
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
## /v1/loyalties/{campaignId}/members/{memberId}/balance
### post
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
## /v1/loyalties/members/{memberId}/balance
### post
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
## /v1/loyalties/{campaignId}/members/{memberId}/transfers
### post
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
## /v1/loyalties/{campaignId}/members/{memberId}/transactions
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesMembersTransactionsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesMembersTransactionsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_members_transactions_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_members_transactions_list_response_body.rb) ✅
## /v1/loyalties/members/{memberId}/transactions
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesMembersTransactionsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesMembersTransactionsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_members_transactions_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_members_transactions_list_response_body.rb) ✅
## /v1/loyalties/members/{memberId}/transactions/export
### post
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
## /v1/loyalties/{campaignId}/members/{memberId}/transactions/export
### post
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
## /v1/loyalties/{campaignId}/members/{memberId}/points-expiration
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesMembersPointsExpirationListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesMembersPointsExpirationListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_members_points_expiration_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_members_points_expiration_list_response_body.rb) ✅
## /v1/loyalties/{campaignId}/points-expiration/export
### post
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
## /v1/loyalties/{campaignId}/earning-rules
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
### post
- **RequestSupported:** ❌
- **ResponseSupported:** *Not applicable*
## /v1/loyalties/{campaignId}/earning-rules/{earningRuleId}
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesEarningRulesGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesEarningRulesGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_earning_rules_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_earning_rules_get_response_body.rb) ✅
### delete
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
## /v1/loyalties/{campaignId}/earning-rules/{earningRuleId}/enable
### post
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesEarningRulesEnableResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesEarningRulesEnableResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_earning_rules_enable_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_earning_rules_enable_response_body.rb) ✅
## /v1/loyalties/{campaignId}/earning-rules/{earningRuleId}/disable
### post
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesEarningRulesDisableResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesEarningRulesDisableResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_earning_rules_disable_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_earning_rules_disable_response_body.rb) ✅
## /v1/loyalties/members/{memberId}/rewards
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesMembersRewardsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesMembersRewardsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_members_rewards_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_members_rewards_list_response_body.rb) ✅
## /v1/loyalties/{campaignId}/reward-assignments/{assignmentId}/reward
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesRewardAssignmentsRewardGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesRewardAssignmentsRewardGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_reward_assignments_reward_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_reward_assignments_reward_get_response_body.rb) ✅
## /v1/loyalties/{campaignId}/reward-assignments
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
## /v1/loyalties/{campaignId}/rewards
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
### post
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
## /v1/loyalties/{campaignId}/reward-assignments/{assignmentId}
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesRewardAssignmentsGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesRewardAssignmentsGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_reward_assignments_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_reward_assignments_get_response_body.rb) ✅
## /v1/loyalties/{campaignId}/rewards/{assignmentId}
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesRewardsGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesRewardsGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_rewards_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_rewards_get_response_body.rb) ✅
### delete
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
## /v1/loyalties/{campaignId}/members/{memberId}/redemption
### post
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
## /v1/loyalties/members/{memberId}/redemption
### post
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
## /v1/loyalties/{campaignId}/tiers
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesTiersListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesTiersListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_tiers_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_tiers_list_response_body.rb) ✅
### post
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
## /v1/loyalties/{campaignId}/tiers/{loyaltyTierId}
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesTiersGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesTiersGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_tiers_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_tiers_get_response_body.rb) ✅
## /v1/loyalties/members/{memberId}/tiers
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesMembersTiersListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesMembersTiersListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_members_tiers_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_members_tiers_list_response_body.rb) ✅
## /v1/loyalties/{campaignId}/tiers/{loyaltyTierId}/earning-rules
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesTiersEarningRulesListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesTiersEarningRulesListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_tiers_earning_rules_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_tiers_earning_rules_list_response_body.rb) ✅
## /v1/loyalties/{campaignId}/tiers/{loyaltyTierId}/rewards
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/LoyaltiesTiersRewardsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/LoyaltiesTiersRewardsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/loyalties_tiers_rewards_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/loyalties_tiers_rewards_list_response_body.rb) ✅
## /v1/customers
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CustomersListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CustomersListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/customers_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/customers_list_response_body.rb) ✅
### post
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
## /v1/customers/{customerId}
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CustomersGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CustomersGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/customers_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/customers_get_response_body.rb) ✅
### delete
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
## /v1/customers/{customerId}/permanent-deletion
### post
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CustomersPermanentDeletionCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CustomersPermanentDeletionCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/customers_permanent_deletion_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/customers_permanent_deletion_create_response_body.rb) ✅
## /v1/customers/importCSV
### post
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CustomersImportCsvCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CustomersImportCsvCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/customers_import_csv_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/customers_import_csv_create_response_body.rb) ✅
## /v1/customers/bulk/async
### post
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CustomersUpdateInBulkResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CustomersUpdateInBulkResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/customers_update_in_bulk_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/customers_update_in_bulk_response_body.rb) ✅
## /v1/customers/metadata/async
### post
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
## /v1/customers/{customerId}/consents
## /client/v1/customers/{customerId}/consents
## /v1/customers/{customerId}/activities
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CustomersActivitiesListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CustomersActivitiesListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/customers_activities_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/customers_activities_list_response_body.rb) ✅
## /v1/customers/{customerId}/segments
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CustomersSegmentsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CustomersSegmentsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/customers_segments_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/customers_segments_list_response_body.rb) ✅
## /v1/orders
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/OrdersListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/OrdersListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/orders_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/orders_list_response_body.rb) ✅
### post
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
## /v1/orders/{orderId}
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/OrdersGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/OrdersGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/orders_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/orders_get_response_body.rb) ✅
## /v1/orders/import
### post
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
## /v1/orders/export
### post
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
## /v1/products
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ProductsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/products_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/products_list_response_body.rb) ✅
### post
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
## /v1/products/{productId}
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductsGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ProductsGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/products_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/products_get_response_body.rb) ✅
### delete
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
## /v1/products/bulk/async
### post
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductsUpdateInBulkResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ProductsUpdateInBulkResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/products_update_in_bulk_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/products_update_in_bulk_response_body.rb) ✅
## /v1/products/metadata/async
### post
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
## /v1/skus/{skuId}
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/SkusGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/SkusGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/skus_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/skus_get_response_body.rb) ✅
## /v1/products/{productId}/skus
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductsSkusListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ProductsSkusListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/products_skus_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/products_skus_list_response_body.rb) ✅
### post
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
## /v1/products/{productId}/skus/{skuId}
### delete
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
## /v1/products/importCSV
### post
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductsImportCsvCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ProductsImportCsvCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/products_import_csv_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/products_import_csv_create_response_body.rb) ✅
## /v1/skus/importCSV
### post
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/SkusImportCsvCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/SkusImportCsvCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/skus_import_csv_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/skus_import_csv_create_response_body.rb) ✅
## /v1/product-collections
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductCollectionsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ProductCollectionsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/product_collections_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/product_collections_list_response_body.rb) ✅
### post
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
## /v1/product-collections/{productCollectionId}
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductCollectionsGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ProductCollectionsGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/product_collections_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/product_collections_get_response_body.rb) ✅
### delete
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
## /v1/product-collections/{productCollectionId}/products
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ProductCollectionsProductsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ProductCollectionsProductsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/product_collections_products_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/product_collections_products_list_response_body.rb) ✅
## /v1/validation-rules
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ValidationRulesListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ValidationRulesListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/validation_rules_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/validation_rules_list_response_body.rb) ✅
### post
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ValidationRulesCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/ValidationRulesCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/validation_rules_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/validation_rules_create_request_body.rb) ✅
- **ResponseSupported:** ❌
## /v1/validation-rules/{validationRuleId}
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ValidationRulesGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ValidationRulesGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/validation_rules_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/validation_rules_get_response_body.rb) ✅
### delete
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
## /v1/validation-rules-assignments
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ValidationRulesAssignmentsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ValidationRulesAssignmentsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/validation_rules_assignments_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/validation_rules_assignments_list_response_body.rb) ✅
## /v1/validation-rules/{validationRuleId}/assignments
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ValidationRulesAssignmentsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ValidationRulesAssignmentsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/validation_rules_assignments_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/validation_rules_assignments_list_response_body.rb) ✅
### post
- **RequestSupported:** ❌
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ValidationRulesAssignmentsCreateResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ValidationRulesAssignmentsCreateResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/validation_rules_assignments_create_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/validation_rules_assignments_create_response_body.rb) ✅
## /v1/validation-rules/{validationRuleId}/assignments/{assignmentId}
### delete
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
## /v1/segments/{segmentId}
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
### delete
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
## /v1/segments
### post
- **RequestSupported:** ❌
- **ResponseSupported:** ❌
## /v1/events
### post
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
## /client/v1/events
### post
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
## /v1/consents
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
## /client/v1/consents
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
## /v1/async-actions
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
## /v1/async-actions/{asyncActionId}
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
## /v1/exports
### post
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
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ExportsListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ExportsListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/exports_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/exports_list_response_body.rb) ✅
## /v1/exports/{exportId}
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/ExportsGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/ExportsGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/exports_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/exports_get_response_body.rb) ✅
### delete
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
## /v1/categories
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CategoriesListResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CategoriesListResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/categories_list_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/categories_list_response_body.rb) ✅
### post
- **RequestSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CategoriesCreateRequestBody.java) ✅
  - [php](./sdks/php/src/Model/CategoriesCreateRequestBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/categories_create_request_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/categories_create_request_body.rb) ✅
- **ResponseSupported:** ❌
## /v1/categories/{categoryId}
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** 
  - [java](./sdks/java/src/main/java/voucherify/client/model/CategoriesGetResponseBody.java) ✅
  - [php](./sdks/php/src/Model/CategoriesGetResponseBody.php) ✅
  - [python](./sdks/python/voucherify_client/models/categories_get_response_body.py) ✅
  - [ruby](./sdks/ruby/lib/VoucherifySDK/models/categories_get_response_body.rb) ✅
### delete
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** *Not applicable*
## /v1/metadata-schemas
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
## /v1/metadata-schemas/{resource}
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
## /v1/locations
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
## /v1/locations/{locationId}
### get
- **RequestSupported:** *Not applicable*
- **ResponseSupported:** ❌
## /v1/qualifications
### post
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
## /client/v1/qualifications
### post
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