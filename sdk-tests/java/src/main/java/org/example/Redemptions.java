package org.example;

import com.google.gson.JsonSyntaxException;
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.api.RedemptionsApi;

public class Redemptions {

    public void test(ApiClient defaultClient) {
        RedemptionsApi redemptions = new RedemptionsApi(defaultClient);

        try {
            redemptions.listRedemptions(
                1,
                2,
                null,
                null,
                null,
                null,
                null,
                null
            );
            System.out.println("Calling PublicationsApi#listPublications OK");
        } catch (ApiException | JsonSyntaxException e) {
            System.err.println("Exception when calling PublicationsApi#listPublications");
            System.err.println("Status message: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
