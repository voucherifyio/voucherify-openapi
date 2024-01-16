package org.example;

import com.google.gson.JsonSyntaxException;
import org.example.data.Voucherify;
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.api.CampaignsApi;
import org.openapitools.client.model.*;

import java.math.BigDecimal;

public class Campaigns {
    
    CampaignsApi campaigns;
    
    private String createLoyaltyProgram(String generatedString){
        CampaignLoyaltyCard campaignLoyaltyCard = new CampaignLoyaltyCard();
        campaignLoyaltyCard.setPoints(500);

        CampaignLoyaltyVoucher campaignLoyaltyVoucher = new CampaignLoyaltyVoucher();
        campaignLoyaltyVoucher.loyaltyCard(campaignLoyaltyCard);

        CampaignsCreateLoyaltyCampaign campaignsCreate = new CampaignsCreateLoyaltyCampaign();
        campaignsCreate.setCampaignType("REFERRAL_PROGRAM");
        campaignsCreate.setCampaignType("AUTO_UPDATE");
        campaignsCreate.setName(generatedString);

        CampaignsCreateRequestBody campaignsCreateRequestBody = new CampaignsCreateRequestBody(); // CampaignsCreateRequestBody | Specify the details of the campaign that you would like to create.
        campaignsCreateRequestBody.setActualInstance(campaignsCreate);
        campaignsCreate.setVoucher(campaignLoyaltyVoucher);

        try {
            CampaignsCreateResponseBody result = campaigns.createCampaign(campaignsCreateRequestBody);

            String loyaltyProgramId = result.getId();
            String campaignName = result.getName();

            Voucherify.getInstance().getCampaign().setId(loyaltyProgramId);
            Voucherify.getInstance().getCampaign().setName(campaignName);

            System.out.println("Calling CampaignsApi#createCampaign OK");
            
            return loyaltyProgramId;
        } catch (ApiException | JsonSyntaxException e) {
            System.err.println("Exception when calling CampaignsApi#createCampaign OK");
            System.err.println("Status message: " + e.getMessage());
            e.printStackTrace();
            return "";
        }
    }

    private String createDiscountCampaign(String generatedString){
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
        campaignsCreateDiscountCouponsCampaign.setValidationRules(
            Voucherify.getInstance().getCampaign().getValidationRuleIds()
        );

        CampaignsCreateRequestBody campaignsCreateRequestBody = new CampaignsCreateRequestBody(); // CampaignsCreateRequestBody | Specify the details of the campaign that you would like to create.
        campaignsCreateRequestBody.setActualInstance(campaignsCreateDiscountCouponsCampaign);
        campaignsCreateDiscountCouponsCampaign.setVoucher(discountCouponsCampaignVoucher);

        try {
            CampaignsCreateResponseBody result = campaigns.createCampaign(campaignsCreateRequestBody);

            String discountCampaignId = result.getId();
            String campaignName = result.getName();

            Voucherify.getInstance().getCampaign().setId(discountCampaignId);
            Voucherify.getInstance().getCampaign().setName(campaignName);

            System.out.println("Calling CampaignsApi#createCampaign OK");

            return discountCampaignId;
        } catch (ApiException | JsonSyntaxException e) {
            System.err.println("Exception when calling CampaignsApi#createCampaign OK");
            System.err.println("Status message: " + e.getMessage());
            e.printStackTrace();
            return "";
        }
    }
    
    public void test(ApiClient defaultClient) {
        campaigns = new CampaignsApi(defaultClient);

        String loyaltyProgramId = createLoyaltyProgram(Utils.getAlphaNumericString(20));
        String discountCampaign = createDiscountCampaign(Utils.getAlphaNumericString(20));

        try {
            campaigns.getCampaign(loyaltyProgramId);

            System.out.println("Calling CampaignsApi#getCampaign OK");
        } catch (ApiException | JsonSyntaxException e) {
            System.err.println("Exception when calling CampaignsApi#getCampaign OK");
            System.err.println("Status message: " + e.getMessage());
            e.printStackTrace();
        }

        try {
            Integer vouchersCount = 1; // Integer | Number of vouchers that should be added.
            CampaignsVouchersCreateInBulkRequestBody campaignsVouchersCreateInBulkRequestBody = new CampaignsVouchersCreateInBulkRequestBody(); // CampaignsVouchersCreateInBulkRequestBody | Specify the voucher parameters that you would like to overwrite.

            CampaignsVouchersCreateCombinedResponseBody result = campaigns.addVouchersToCampaign(loyaltyProgramId, vouchersCount, campaignsVouchersCreateInBulkRequestBody);
            Voucherify.getInstance().getCampaign().addVoucherId(
                ((CampaignsVouchersCreateResponseBody) result.getActualInstance()).getId()
            );

            //NEED TWO VOUCHERS FOR PUBLICATION
            CampaignsVouchersCreateCombinedResponseBody result2 = campaigns.addVouchersToCampaign(loyaltyProgramId, vouchersCount, campaignsVouchersCreateInBulkRequestBody);
            Voucherify.getInstance().getCampaign().addVoucherId(
                ((CampaignsVouchersCreateResponseBody) result2.getActualInstance()).getId()
            );

            System.out.println("Calling CampaignsApi#addVouchersToCampaign OK");
        } catch (ApiException | JsonSyntaxException e) {
            System.err.println("Exception when calling CampaignsApi#addVouchersToCampaign OK");
            System.err.println("Status message: " + e.getMessage());
            e.printStackTrace();
        }

        try {
            Integer vouchersCount = 2; // Integer | Number of vouchers that should be added.
            CampaignsVouchersCreateInBulkRequestBody campaignsVouchersCreateInBulkRequestBody = new CampaignsVouchersCreateInBulkRequestBody(); // CampaignsVouchersCreateInBulkRequestBody | Specify the voucher parameters that you would like to overwrite.
            campaigns.addVouchersToCampaign(loyaltyProgramId, vouchersCount, campaignsVouchersCreateInBulkRequestBody);

            System.out.println("Calling CampaignsApi#addVouchersToCampaign OK");
        } catch (ApiException | JsonSyntaxException e) {
            System.err.println("Exception when calling CampaignsApi#addVouchersToCampaign OK");
            System.err.println("Status message: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
