package org.example;

import com.google.gson.JsonSyntaxException;
import org.example.data.Product;
import org.example.data.Voucherify;
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.api.ProductsApi;
import org.openapitools.client.model.ProductsCreateRequestBody;
import org.openapitools.client.model.ProductsCreateResponseBody;

public class Products {

    public void test(ApiClient defaultClient) {
        ProductsApi products = new ProductsApi(defaultClient);

        try {
            ProductsCreateRequestBody productsCreateRequestBody = new ProductsCreateRequestBody();

            String productName = "Test product";
            String productSourceId = Utils.getAlphaNumericString(10);

            productsCreateRequestBody.setSourceId(productSourceId);
            productsCreateRequestBody.setName(productName);

            ProductsCreateResponseBody productsCreateResponseBody = products.createProduct(productsCreateRequestBody);

            String productId = productsCreateResponseBody.getId();

            Voucherify.getInstance().getProducts().add(
                new Product(productId, productName, productSourceId)
            );

            System.out.println("Calling ProductsApi#createProduct OK");
        } catch (ApiException | JsonSyntaxException e) {
            System.err.println("Exception when calling ProductsApi#createProduct");
            System.err.println("Status message: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
