# typed: strict

require 'time'
require 'openapi_client'
require 'json/ext'
# setup authorization
OpenapiClient.configure do |config|
  # Configure API key authorization: X-App-Id-1
  config.api_key['X-App-Id-1'] = ENV['X_APP_ID']
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-App-Id-1'] = 'Bearer'

  # Configure API key authorization: X-App-Token-1
  config.api_key['X-App-Token-1'] = ENV['X_APP_TOKEN']
  # Uncomment the following line to set a prefix for the API key, e.g. 'Bearer' (defaults to nil)
  # config.api_key_prefix['X-App-Token-1'] = 'Bearer'
  config.host = ENV['VOUCHERIFY_HOST'] || 'https://api.voucherify.io'
end

customers_api_instance = OpenapiClient::CUSTOMERSAPIApi.new
exports_api_instance = OpenapiClient::EXPORTSAPIApi.new
redemptions_api_instance = OpenapiClient::REDEMPTIONSAPIApi.new


begin
  # List Customers
  result = customers_api_instance.list_customers({
    limit: 100
  })
  puts result.class
  puts result.customers[1]
#   puts result
    puts 1

#   export_result = exports_api_instance.create_export(opts={
#   exports_create_request_body:{
#   exported_object: "voucher",
#       parameters: {
#         fields: ["code","voucher_type","value","discount_type","campaign","category","start_date","expiration_date","gift_balance","loyalty_balance","redemption_quantity","redemption_count","active","qr_code","bar_code","metadata","id","is_referral_code","created_at","updated_at","validity_timeframe_interval","validity_timeframe_duration","validity_day_of_week","discount_amount_limit","campaign_id","additional_info","customer_id","discount_unit_type","discount_unit_effect"],
#         }
#   }
#   })
#   puts export_result
#   puts exports_api_instance.list_exports()


  puts redemptions_api_instance.list_redemptions({limit: 100})



rescue OpenapiClient::ApiError => e
  puts e
end
