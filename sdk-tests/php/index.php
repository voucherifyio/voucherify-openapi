<?php
//generateRandomString
function generateRandomString($length = 10) {
    $randomString = '';
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    $max = strlen($characters) - 1;

    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[random_int(0, $max)];
    }

    return $randomString;
}

//load SDK
require_once(__DIR__ . '/vendor/autoload.php');
//load .env
$env = parse_ini_file('.env');

//configure SDK
$config = OpenAPI\Client\Configuration::getDefaultConfiguration()->setApiKey('X-App-Id', $env["X_APP_ID"]);
$config = OpenAPI\Client\Configuration::getDefaultConfiguration()->setApiKey('X-App-Token', $env["X_APP_TOKEN"]);
$config = OpenAPI\Client\Configuration::getDefaultConfiguration()->setHost($env["VOUCHERIFY_HOST"]);

//create campaignsApi
$campaignsApiInstance = new OpenAPI\Client\Api\CampaignsApi(
    new GuzzleHttp\Client(),
    $config
);

//create variable to store campaign data
$created_discount_campaign;
//createCampaign - DISCOUNT_COUPONS
$campaigns_create_request_body_discount = new \OpenAPI\Client\Model\CampaignsCreateRequestBody();
$campaigns_create_request_body_discount->setName(generateRandomString(12));
$campaigns_create_request_body_discount->setCampaignType("DISCOUNT_COUPONS");
$campaigns_create_request_body_discount->setType("AUTO_UPDATE");
$campaigns_create_request_body_discount->setVoucher(new \OpenAPI\Client\Model\CampaignsCreateRequestBodyVoucher());
$campaigns_create_request_body_discount->getVoucher()->setType("DISCOUNT_VOUCHER");
$campaigns_create_request_body_discount->getVoucher()->setDiscount(new \OpenAPI\Client\Model\Discount());
$campaigns_create_request_body_discount->getVoucher()->getDiscount()->setType("AMOUNT");
$campaigns_create_request_body_discount->getVoucher()->getDiscount()->setAmountOff(1000);
try {
    $created_discount_campaign = $campaignsApiInstance->createCampaign($campaigns_create_request_body_discount);
    echo '<pre>createCampaign - DISCOUNT_COUPONS<br />' . json_encode($created_discount_campaign, JSON_PRETTY_PRINT) . '</pre>';
} catch (Exception $e) {
    echo 'Exception when calling CampaignsApi->createCampaign: ', $e->getMessage(), PHP_EOL;
}

//create variable to store campaign data
$created_promotion_campaign;
//createCampaign - PROMOTION
$campaigns_create_request_body_promotion = new \OpenAPI\Client\Model\CampaignsCreateRequestBody();
$campaigns_create_request_body_promotion->setName(generateRandomString(12));
$campaigns_create_request_body_promotion->setCampaignType("PROMOTION");
//promotionTierCreateParams
$promotionTierCreateParams = new \OpenAPI\Client\Model\PromotionTierCreateParams();
$promotionTierCreateParams->setBanner('testBanner');
$promotionTierCreateParams->setAction(new \OpenAPI\Client\Model\PromotionTierAction());
$promotionTierCreateParams->getAction()->setDiscount(new \OpenAPI\Client\Model\Discount());
$promotionTierCreateParams->getAction()->getDiscount()->setType("AMOUNT");
$promotionTierCreateParams->getAction()->getDiscount()->setAmountOff(1000);
$campaigns_create_request_body_promotion->setPromotion([$promotionTierCreateParams]);
try {
    echo '<pre>createCampaign - PROMOTION<br />' . json_encode($campaigns_create_request_body_promotion, JSON_PRETTY_PRINT) . '</pre>';
    $created_promotion_campaign = $campaignsApiInstance->createCampaign($campaigns_create_request_body_promotion);
    echo '<pre>createCampaign - PROMOTION<br />' . json_encode($created_discount_campaign, JSON_PRETTY_PRINT) . '</pre>';
} catch (Exception $e) {
    echo 'Exception when calling CampaignsApi->createCampaign: ', $e->getMessage(), PHP_EOL;
}


//listCampaigns
$limit = 2; // int | A limit on the number of objects to be returned. Limit can range between 1 and 100 items.
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
    $result = $campaignsApiInstance->getCampaign($created_discount_campaign->getId());
    echo '<pre>getCampaign<br />' . json_encode($result, JSON_PRETTY_PRINT) . '</pre>';
    echo '<pre>getValidationRulesAssignments<br />' . json_encode($result->getValidationRulesAssignments(), JSON_PRETTY_PRINT) . '</pre>';
} catch (Exception $e) {
    echo 'Exception when calling CampaignsApi->getCampaign: ', $e->getMessage(), PHP_EOL;
}


//createVoucher
$voucher;
try {
    $voucher = $campaignsApiInstance->addVouchersToCampaign($created_discount_campaign->getId(),1);
    echo '<pre>addVouchersToCampaign<br />' . json_encode($voucher, JSON_PRETTY_PRINT) . '</pre>';
} catch (Exception $e) {
    echo 'Exception when calling CampaignsApi->getCampaign: ', $e->getMessage(), PHP_EOL;
}

//create customersApi
$customersApiInstance = new OpenAPI\Client\Api\CustomersApi(
    new GuzzleHttp\Client(),
    $config
);

//create variable to store customer data
$created_customer;

//createCustomer
$customersCreateRequestBody = new \OpenAPI\Client\Model\CustomersCreateRequestBody();
$customersCreateRequestBody->setSourceId('test123');
try {
    $created_customer = $customersApiInstance->createCustomer($customersCreateRequestBody);
     echo '<pre>createCustomer<br />' . json_encode($created_customer, JSON_PRETTY_PRINT) . '</pre>';
} catch (Exception $e) {
    echo 'Exception when calling CustomersApi->createCustomer: ', $e->getMessage(), PHP_EOL;
}

//create redemptionsApi
$redemptionsApiInstance = new OpenAPI\Client\Api\RedemptionsApi(
    new GuzzleHttp\Client(),
    $config
);

//listRedemptions
try {
    $result = $redemptionsApiInstance->listRedemptions(1, 1);
     echo '<pre>listRedemptions<br />' . json_encode($result, JSON_PRETTY_PRINT) . '</pre>';
} catch (Exception $e) {
    echo 'Exception when calling RedemptionsApi->listRedemptions: ', $e->getMessage(), PHP_EOL;
}


//deleteCampaign - DISCOUNT_COUPONS
try {
    $result = $campaignsApiInstance->deleteCampaign($created_discount_campaign->getId(), true);
    echo '<pre>deleteCampaign - DISCOUNT_COUPONS<br />' . json_encode($result, JSON_PRETTY_PRINT) . '</pre>';
    echo '<pre>getAsyncActionId<br />' . $result->getAsyncActionId() . '</pre>';
} catch (Exception $e) {
    echo 'Exception when calling CampaignsApi->listCampaigns: ', $e->getMessage(), PHP_EOL;
}

//deleteCampaign - PROMOTION
try {
    $result = $campaignsApiInstance->deleteCampaign($created_promotion_campaign->getId(), true);
    echo '<pre>deleteCampaign - PROMOTION<br />' . json_encode($result, JSON_PRETTY_PRINT) . '</pre>';
    echo '<pre>getAsyncActionId<br />' . $result->getAsyncActionId() . '</pre>';
} catch (Exception $e) {
    echo 'Exception when calling CampaignsApi->listCampaigns: ', $e->getMessage(), PHP_EOL;
}


//deleteCustomer
try {
    $result = $customersApiInstance->deleteCustomer($created_customer->getId());
     echo '<pre>createCustomer<br />' . json_encode($result, JSON_PRETTY_PRINT) . '</pre>';
} catch (Exception $e) {
    echo 'Exception when calling CustomersApi->createCustomer: ', $e->getMessage(), PHP_EOL;
}
