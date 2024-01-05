package org.example;

import com.google.gson.JsonSyntaxException;
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.api.PublicationsApi;
import org.openapitools.client.model.ParameterOrderListPublications;
import org.openapitools.client.model.ParameterResultListPublications;
import org.openapitools.client.model.ParameterVoucherTypeListPublications;

public class Publications {
    public void test(ApiClient defaultClient) {
        PublicationsApi apiInstance = new PublicationsApi(defaultClient);

        try {
            apiInstance.listPublications(
                5,
                1,
                ParameterOrderListPublications._ID,
                "",
                "",
                "",
                ParameterResultListPublications.SUCCESS,
                ParameterVoucherTypeListPublications.DISCOUNT,
                true,
                "",
                ""
            );
        } catch (ApiException e) {
            System.err.println("Exception when calling PublicationsApi#listPublications");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            System.out.println(e.getMessage());
            e.printStackTrace();
        } catch (JsonSyntaxException e){
            System.err.println("Exception when calling PublicationsApi#listPublications");
            System.err.println("Status message: " + e.getMessage());
        }
    }
}
