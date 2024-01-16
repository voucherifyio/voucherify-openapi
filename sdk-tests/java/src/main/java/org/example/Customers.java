package org.example;

import com.google.gson.JsonSyntaxException;
import org.example.data.Voucherify;
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.api.CustomersApi;
import org.openapitools.client.model.*;

import java.util.ArrayList;
import java.util.List;

public class Customers {

    private String sourceIdToDelete = null;

    public void test(ApiClient defaultClient) {
        CustomersApi customers = new CustomersApi(defaultClient);

        try {
            CustomersCreateResponseBody customersCreateResponseBody = customers.createCustomer(new CustomersCreateRequestBody());
            CustomersCreateResponseBody customersCreateResponseBody2 = customers.createCustomer(new CustomersCreateRequestBody());

            Voucherify.getInstance().getCustomer().setId(customersCreateResponseBody.getId());
            sourceIdToDelete = customersCreateResponseBody2.getId();
            System.out.println("Calling CustomersApi#createCustomer OK");
        } catch (ApiException | JsonSyntaxException e) {
            System.err.println("Exception when calling CustomersApi#createCustomer");
            System.err.println("Status message: " + e.getMessage());
            e.printStackTrace();
        }

        try {
            List<CustomersUpdateInBulkRequestBody> customersUpdateInBulkRequestBody = new ArrayList<>();

            CustomersUpdateInBulkRequestBody customer1 = new CustomersUpdateInBulkRequestBody();
            CustomersUpdateInBulkRequestBody customer2 = new CustomersUpdateInBulkRequestBody();

            customer1.setSourceId(Utils.getAlphaNumericString(10));
            customer2.setSourceId(Utils.getAlphaNumericString(10));

            customersUpdateInBulkRequestBody.add(customer1);
            customersUpdateInBulkRequestBody.add(customer2);

            customers.updateCustomersInBulk(customersUpdateInBulkRequestBody);

            System.out.println("Calling CustomersApi#customersUpdateInBulkRequestBody OK");
        } catch (ApiException | JsonSyntaxException e) {
            System.err.println("Exception when calling CustomersApi#customersUpdateInBulkRequestBody");
            System.err.println("Status message: " + e.getMessage());
            e.printStackTrace();
        }

        try {
            customers.listCustomers(
                    15,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                null
            );

            System.out.println("Calling CustomersApi#listCustomers OK");
        } catch (ApiException | JsonSyntaxException e) {
            System.err.println("Exception when calling CustomersApi#listCustomers");
            System.err.println("Status message: " + e.getMessage());
            e.printStackTrace();
        }

        try {
            customers.deleteCustomer(sourceIdToDelete);

            System.out.println("Calling CustomersApi#deleteCustomer OK");
        } catch (ApiException | JsonSyntaxException e) {
            System.err.println("Exception when calling CustomersApi#deleteCustomer");
            System.err.println("Status message: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
