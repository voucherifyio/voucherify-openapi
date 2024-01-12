# typed: strict

def generate_random_string(length=10)
  chars = ('a'..'z').to_a + ('A'..'Z').to_a + ('0'..'9').to_a
  random_string = Array.new(length) { chars.sample }.join
  return random_string
end

require 'time'
require 'VoucherifySdk'
require 'json/ext'
require 'dotenv/load'

# setup authorization
VoucherifySdk.configure do |config|
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

customers_api_instance = VoucherifySdk::CustomersApi.new()
exports_api_instance = VoucherifySdk::ExportsApi.new()
redemptions_api_instance = VoucherifySdk::RedemptionsApi.new()
products_api_instance = VoucherifySdk::ProductsApi.new()

# create variables to store products data
$created_product;
$created_product2;
begin
  # Create Product1
  $created_product = products_api_instance.create_product({
    products_create_request_body: VoucherifySdk::ProductsCreateRequestBody.new({
      source_id: generate_random_string(),
      name: generate_random_string(),
      price: 20000,
      attributes: ["color", "memory", "processor"]
    })
  });
  puts "Created product 1:";
  puts JSON.pretty_generate($created_product.to_hash);
  puts;
rescue VoucherifySdk::ApiError => e
  puts "Error when calling ProductsApi->create_product: #{e}"
end
begin
  # Create Product2
  $created_product2 = products_api_instance.create_product({
    products_create_request_body: VoucherifySdk::ProductsCreateRequestBody.new({
      source_id: generate_random_string(),
      name: generate_random_string(),
      price: 60000,
      attributes: ["color", "memory", "processor"]
    })
  });
  puts "Created product 1:";
  puts JSON.pretty_generate($created_product2.to_hash);
  puts;
rescue VoucherifySdk::ApiError => e
  puts "Error when calling ProductsApi->create_product: #{e}"
end

$created_customer;
begin
  # Create Customer
  $created_customer = customers_api_instance.create_customer({
    customers_create_request_body: VoucherifySdk::CustomersCreateRequestBody.new({
      source_id: generate_random_string(),
      name: "John Doe",
      address: VoucherifySdk::CustomerBaseAddress.new({
        country: "US",
        city: "New York",
        line_1: "5th Avenue",
        line_2: "1/2",
        postal_code: "11-111"
      })
    })
  })
  puts "Created customer:";
  puts JSON.pretty_generate($created_customer.to_hash);
  puts;
rescue VoucherifySdk::ApiError => e
  puts "Error when calling CustomersApi->create_customer: #{e}"
end




#

#

begin
  # Delete Customer
  result = customers_api_instance.customer_permanently_deletion($created_customer.id)
  puts "Deleted customer:";
  puts JSON.pretty_generate(result.to_hash);
  puts;
rescue VoucherifySdk::ApiError => e
  puts "Error when calling ProductsApi->delete_product: #{e}"
end

begin
  # Delete Product
  result = products_api_instance.delete_product($created_product.id, {
    force: true
  })
  puts "Deleted product 1:";
  puts JSON.pretty_generate(result);
  puts;
rescue VoucherifySdk::ApiError => e
  puts "Error when calling ProductsApi->delete_product: #{e}"
end

begin
  # Delete Product
  result = products_api_instance.delete_product($created_product2.id, {
    force: true
  })
  puts "Deleted product 1:";
  puts JSON.pretty_generate(result);
  puts;
rescue VoucherifySdk::ApiError => e
  puts "Error when calling ProductsApi->delete_product: #{e}"
end
