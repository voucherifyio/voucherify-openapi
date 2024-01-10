<?php

function generateRandomString($length = 10) {
    $randomString = '';
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    $max = strlen($characters) - 1;

    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[random_int(0, $max)];
    }

    return $randomString;
}

require_once(__DIR__ . '/vendor/autoload.php');
$env = parse_ini_file('.env');

// Configure
$config = OpenAPI\Client\Configuration::getDefaultConfiguration()->setApiKey('X-App-Id', $env["X_APP_ID"]);
$config = OpenAPI\Client\Configuration::getDefaultConfiguration()->setApiKey('X-App-Token', $env["X_APP_TOKEN"]);
$config = OpenAPI\Client\Configuration::getDefaultConfiguration()->setHost($env["VOUCHERIFY_HOST"]);

//create campaignsApi
$campaignsApiInstance = new OpenAPI\Client\Api\CampaignsApi(
    new GuzzleHttp\Client(),
    $config
);

//create variable to store campaign data
$created_campaign;
//createCampaign
$campaigns_create_request_body = new \OpenAPI\Client\Model\CampaignsCreateRequestBody();
$campaigns_create_request_body->setName(generateRandomString(12));
$campaigns_create_request_body->setCampaignType("DISCOUNT_COUPONS");
$campaigns_create_request_body->setVoucher(new \OpenAPI\Client\Model\CampaignsCreateRequestBodyVoucher());
$campaigns_create_request_body->getVoucher()->setType("DISCOUNT_VOUCHER");
$campaigns_create_request_body->getVoucher()->setDiscount(new \OpenAPI\Client\Model\Discount());
$campaigns_create_request_body->getVoucher()->getDiscount()->setType("AMOUNT");
$campaigns_create_request_body->getVoucher()->getDiscount()->setAmountOff(1000);
try {
    $created_campaign = $campaignsApiInstance->createCampaign($campaigns_create_request_body);
    echo '<pre>createCampaign<br />' . json_encode($created_campaign, JSON_PRETTY_PRINT) . '</pre>';
} catch (Exception $e) {
    echo 'Exception when calling CampaignsApi->createCampaign: ', $e->getMessage(), PHP_EOL;
}

//listCampaigns
$limit = 1; // int | A limit on the number of objects to be returned. Limit can range between 1 and 100 items.
$page = 1; // int | Which page of results to return.
$campaign_type = \OpenAPI\Client\Model\ParameterCampaignType::DISCOUNT_COUPONS->value; // ParameterCampaignType
$expand = \OpenAPI\Client\Model\ParameterExpandListCampaigns::CATEGORY->value; // ParameterExpandListCampaigns
$order = \OpenAPI\Client\Model\ParameterOrderListCampaigns::CREATED_AT2->value; // ParameterOrderListCampaigns
try {
    $result = $campaignsApiInstance->listCampaigns($limit, $page, $campaign_type, $expand, $order);
    echo '<pre>listCampaigns<br />' . json_encode($result, JSON_PRETTY_PRINT) . '</pre>';
} catch (Exception $e) {
    echo 'Exception when calling CampaignsApi->listCampaigns: ', $e->getMessage(), PHP_EOL;
}

//getCampaign
try {
    $result = $campaignsApiInstance->getCampaign($created_campaign->getId());
    echo '<pre>getCampaign<br />' . json_encode($result, JSON_PRETTY_PRINT) . '</pre>';
    echo '<pre>getValidationRulesAssignments<br />' . json_encode($result->getValidationRulesAssignments(), JSON_PRETTY_PRINT) . '</pre>';
} catch (Exception $e) {
    echo 'Exception when calling CampaignsApi->getCampaign: ', $e->getMessage(), PHP_EOL;
}

//create customersApi
$customersApiInstance = new OpenAPI\Client\Api\CustomersApi(
    new GuzzleHttp\Client(),
    $config
);

//create variable to store customer data
$created_campaign;

//createCustomer
$customersCreateRequestBody = new \OpenAPI\Client\Model\CustomersCreateRequestBody();
$customersCreateRequestBody->setSourceId('test123');

try {
    $result = $customersApiInstance->createCustomer($customersCreateRequestBody);
     echo '<pre>createCustomer<br />' . json_encode($result, JSON_PRETTY_PRINT) . '</pre>';
} catch (Exception $e) {
    echo 'Exception when calling CustomersApi->createCustomer: ', $e->getMessage(), PHP_EOL;
}





$redemptionsApiInstance = new OpenAPI\Client\Api\RedemptionsApi(
    new GuzzleHttp\Client(),
    $config
);

try {
    $result = $redemptionsApiInstance->listRedemptions(1, 1);
     echo '<pre>listRedemptions<br />' . json_encode($result, JSON_PRETTY_PRINT) . '</pre>';
} catch (Exception $e) {
    echo 'Exception when calling RedemptionsApi->listRedemptions: ', $e->getMessage(), PHP_EOL;
}



//delete campaign
try {
    $result = $campaignsApiInstance->deleteCampaign($created_campaign->getId(), true);
    echo '<pre>deleteCampaign<br />' . json_encode($result, JSON_PRETTY_PRINT) . '</pre>';
    echo '<pre>getAsyncActionId<br />' . $result->getAsyncActionId() . '</pre>';
} catch (Exception $e) {
    echo 'Exception when calling CampaignsApi->listCampaigns: ', $e->getMessage(), PHP_EOL;
}
