package org.example;

import com.google.gson.JsonSyntaxException;
import org.example.data.Voucherify;
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.api.QualificationsApi;
import org.openapitools.client.model.*;

import java.util.ArrayList;

public class Qualifications {

    public void test(ApiClient defaultClient) {
        QualificationsApi qualifications = new QualificationsApi(defaultClient);


        //TO ENSURE DATA FOR QUALIFICATIONS WAS CALCULATED PROPERLY
        System.out.println("Doing sleep()");
        if (Thread.currentThread().isAlive()) {
            try {
                Thread.sleep(10000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        } else {
            System.out.println("Sleep currently working");
        }
        System.out.println("Done sleep()");
        
        try {
            QualificationsCheckEligibilityRequestBody qualificationsCheckEligibilityRequestBody = new QualificationsCheckEligibilityRequestBody();

            Customer customer = new Customer();
            customer.setId(Voucherify.getInstance().getCustomer().getId());
            qualificationsCheckEligibilityRequestBody.setCustomer(customer);

            OrderItem orderItem = new OrderItem();
            orderItem.setProductId(Voucherify.getInstance().getProducts().get(0).getId());
            orderItem.setQuantity(1);
            orderItem.setAmount(100);

            ArrayList<OrderItem> orderItems = new ArrayList<>();
            orderItems.add(orderItem);

            Order order = new Order();
            order.setItems(orderItems);

            qualificationsCheckEligibilityRequestBody.setOrder(order);


            qualifications.checkEligibility(qualificationsCheckEligibilityRequestBody);

            System.out.println("Calling QualificationsApi#checkEligibility OK");
        } catch (ApiException | JsonSyntaxException e) {
            System.err.println("Exception when calling QualificationsApi#qualificationsCheckEligibility");
            System.err.println("Status message: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
