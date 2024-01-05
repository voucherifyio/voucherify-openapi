package org.example;

import com.google.gson.JsonSyntaxException;
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.api.CampaignsApi;
import org.openapitools.client.model.*;

import java.math.BigDecimal;

public class Campaign {
    public void test(ApiClient defaultClient) {
        CampaignsApi apiInstance = new CampaignsApi(defaultClient);

        String campaignId = "";
        String generatedString = Utils.getAlphaNumericString(20);

        Discount discount = new Discount();
        DiscountAmount discountAmount = new DiscountAmount();
        discountAmount.setType(DiscountAmount.TypeEnum.AMOUNT);
        discountAmount.setAmountOff(BigDecimal.valueOf(1));
        discount.setActualInstance(discountAmount);

        DiscountCouponsCampaignVoucher discountCouponsCampaignVoucher = new DiscountCouponsCampaignVoucher();
        discountCouponsCampaignVoucher.setDiscount(discount);

        CampaignsCreateDiscountCouponsCampaign campaignsCreateDiscountCouponsCampaign = new CampaignsCreateDiscountCouponsCampaign();
        campaignsCreateDiscountCouponsCampaign.setCampaignType("DISCOUNT_COUPONS");
        campaignsCreateDiscountCouponsCampaign.setCampaignType("AUTO_UPDATE");
        campaignsCreateDiscountCouponsCampaign.setName(generatedString);

        CampaignsCreateRequestBody campaignsCreateRequestBody = new CampaignsCreateRequestBody(); // CampaignsCreateRequestBody | Specify the details of the campaign that you would like to create.
        campaignsCreateRequestBody.setActualInstance(campaignsCreateDiscountCouponsCampaign);
        campaignsCreateDiscountCouponsCampaign.setVoucher(discountCouponsCampaignVoucher);

        try {
            CampaignsCreateResponseBody result = apiInstance.createCampaign(campaignsCreateRequestBody);
            campaignId = result.getId();
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling CampaignsApi#createCampaign");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            System.out.println(e.getMessage());
            e.printStackTrace();
        } catch (JsonSyntaxException e){
            System.err.println("Exception when calling StackableDiscountsApi#validateStackedDiscounts");
            System.err.println("Status message: " + e.getMessage());
        }

        try {
            CampaignsGetResponseBody result = apiInstance.getCampaign(campaignId);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling CampaignsApiApi#addVoucherWithSpecificCodeToCampaign");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            e.printStackTrace();
        } catch (JsonSyntaxException e){
            System.err.println("Exception when calling StackableDiscountsApi#validateStackedDiscounts");
            System.err.println("Status message: " + e.getMessage());
        }

        try {
            Integer vouchersCount = 1; // Integer | Number of vouchers that should be added.
            CampaignsVouchersCreateInBulkRequestBody campaignsVouchersCreateInBulkRequestBody = new CampaignsVouchersCreateInBulkRequestBody(); // CampaignsVouchersCreateInBulkRequestBody | Specify the voucher parameters that you would like to overwrite.
            CampaignsVouchersCreateCombinedResponseBody result = apiInstance.addVouchersToCampaign(campaignId, vouchersCount, campaignsVouchersCreateInBulkRequestBody);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling CampaignsApi#addVouchersToCampaign");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            e.printStackTrace();
        } catch (JsonSyntaxException e){
            System.err.println("Exception when calling StackableDiscountsApi#validateStackedDiscounts");
            System.err.println("Status message: " + e.getMessage());
        }

        try {
            Integer vouchersCount = 2; // Integer | Number of vouchers that should be added.
            CampaignsVouchersCreateInBulkRequestBody campaignsVouchersCreateInBulkRequestBody = new CampaignsVouchersCreateInBulkRequestBody(); // CampaignsVouchersCreateInBulkRequestBody | Specify the voucher parameters that you would like to overwrite.
            CampaignsVouchersCreateCombinedResponseBody result = apiInstance.addVouchersToCampaign(campaignId, vouchersCount, campaignsVouchersCreateInBulkRequestBody);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling CampaignsApi#addVouchersToCampaign");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            e.printStackTrace();
        } catch (JsonSyntaxException e){
            System.err.println("Exception when calling StackableDiscountsApi#validateStackedDiscounts");
            System.err.println("Status message: " + e.getMessage());
        }
    }
}
