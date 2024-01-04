package org.example;

import io.github.cdimascio.dotenv.Dotenv;
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.api.CampaignsApi;
import org.openapitools.client.auth.ApiKeyAuth;
import org.openapitools.client.model.*;


public class Main {

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.load();

        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath(dotenv.get("VOUCHERIFY_HOST"));

        ApiKeyAuth id = (ApiKeyAuth) defaultClient.getAuthentication("X-App-Id-1");
        id.setApiKey(dotenv.get("X_APP_ID"));

        ApiKeyAuth token = (ApiKeyAuth) defaultClient.getAuthentication("X-App-Token-1");
        token.setApiKey(dotenv.get("X_APP_TOKEN"));

        CampaignsApi apiInstance = new CampaignsApi(defaultClient);

        String campaignId = "camp_IY0bKXqQ1eX98xBPeoeUwnn4";

        try {
            CampaignsGetResponseBody result = apiInstance.getCampaign(campaignId);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling CampaignsApiApi#addVoucherWithSpecificCodeToCampaign");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            e.printStackTrace();
        }
    }
}
