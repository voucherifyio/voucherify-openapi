<?php
require_once(__DIR__ . '/vendor/autoload.php');

$env = parse_ini_file('.env');

// Configure
$config = OpenAPI\Client\Configuration::getDefaultConfiguration()->setApiKey('X-App-Id', $env["X_APP_ID"]);
$config = OpenAPI\Client\Configuration::getDefaultConfiguration()->setApiKey('X-App-Token', $env["X_APP_TOKEN"]);
$config = OpenAPI\Client\Configuration::getDefaultConfiguration()->setHost($env["VOUCHERIFY_HOST"]);

$campaignsApiInstance = new OpenAPI\Client\Api\CampaignsApi(
    new GuzzleHttp\Client(),
    $config
);

$limit = 1; // int | A limit on the number of objects to be returned. Limit can range between 1 and 100 items.
$page = 1; // int | Which page of results to return.
$campaign_type = \OpenAPI\Client\Model\ParameterCampaignType::DISCOUNT_COUPONS->value; // ParameterCampaignType
$expand = \OpenAPI\Client\Model\ParameterExpandListCampaigns::CATEGORY->value; // ParameterExpandListCampaigns
$order = \OpenAPI\Client\Model\ParameterOrderListCampaigns::CREATED_AT->value; // ParameterOrderListCampaigns

try {
    $result = $campaignsApiInstance->listCampaigns($limit, $page, $campaign_type, $expand, $order);
    echo '<pre>' . json_encode($result, JSON_PRETTY_PRINT) . '</pre>';
} catch (Exception $e) {
    echo 'Exception when calling CampaignsApi->listCampaigns: ', $e->getMessage(), PHP_EOL;
}

$campaignsApiInstance = new OpenAPI\Client\Api\CustomersApi(
    new GuzzleHttp\Client(),
    $config
);

$customersCreateRequestBody = new \OpenAPI\Client\Model\CustomersCreateRequestBody(); // CustomersCreateRequestBody

try {
    $result = $campaignsApiInstance->createCustomer($customersCreateRequestBody);
     echo '<pre>' . json_encode($result, JSON_PRETTY_PRINT) . '</pre>';
} catch (Exception $e) {
    echo 'Exception when calling CampaignsApi->listCampaigns: ', $e->getMessage(), PHP_EOL;
}
