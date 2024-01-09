package org.example;

import com.google.gson.JsonSyntaxException;
import org.jetbrains.annotations.NotNull;
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.api.StackableDiscountsApi;
import org.openapitools.client.model.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class StackableDiscounts {

    public void test(ApiClient defaultClient) {
        StackableDiscountsApi apiInstance = new StackableDiscountsApi(defaultClient);

        ValidationsValidateRequestBody validationsValidateRequestBody = getValidationsValidateRequestBody();

        //THIS TEST NOT WORKING YET. DUE TO MISSING `application_mode` IN API RESPONSE
        try {
            apiInstance.validateStackedDiscounts(validationsValidateRequestBody);

            System.out.println("Calling StackableDiscountsApi#validateStackedDiscounts OK");
        } catch (ApiException | JsonSyntaxException e) {
            System.err.println("Exception when calling StackableDiscountsApi#validateStackedDiscounts OK");
            System.err.println("Status message: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @NotNull
    private static ValidationsValidateRequestBody getValidationsValidateRequestBody() {
        Order order = getOrder();

        StackableValidateRedeemBaseRedeemablesItem redeemable = new StackableValidateRedeemBaseRedeemablesItem();
        
        RedeemVoucher redeemVoucher = new RedeemVoucher();
        redeemVoucher.setId("test");
        
        redeemable.setActualInstance(redeemVoucher);

        ValidationsValidateRequestBody validationsValidateRequestBody = new ValidationsValidateRequestBody();

        validationsValidateRequestBody.setOrder(order);
        validationsValidateRequestBody.addRedeemablesItem(redeemable);

        return validationsValidateRequestBody;
    }

    @NotNull
    private static Order getOrder() {
        List<OrderItem> items = new ArrayList<>();
        OrderItem item = new OrderItem();
        item.setProductId("prod_001");
        item.setQuantity(1);
        items.add(item);

        OrderItem item2 = new OrderItem();
        item2.setProductId("prod_002");
        item2.setQuantity(1);
        items.add(item2);

        Order order = new Order();
        order.setAmount(10000);
        order.setItems(items);
        return order;
    }
}
