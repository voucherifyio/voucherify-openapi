package org.example;

import com.google.gson.JsonSyntaxException;
import org.example.data.Voucherify;
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.api.CustomersApi;
import org.openapitools.client.model.CustomersCreateRequestBody;
import org.openapitools.client.model.CustomersCreateResponseBody;

public class Customers {

    public void test(ApiClient defaultClient) {
        CustomersApi customers = new CustomersApi(defaultClient);

        try{
            CustomersCreateResponseBody customersCreateResponseBody = customers.createCustomer(new CustomersCreateRequestBody());

            Voucherify.getInstance().getCustomer().setId(customersCreateResponseBody.getId());
            System.out.println("Calling CustomersApi#createCustomer OK");
        } catch (ApiException | JsonSyntaxException e) {
            System.err.println("Exception when calling PublicationsApi#listPublications");
            System.err.println("Status message: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
