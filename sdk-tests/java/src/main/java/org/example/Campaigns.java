package org.example;

import com.google.gson.JsonSyntaxException;
import org.example.data.Voucherify;
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.api.CampaignsApi;
import org.openapitools.client.model.*;

import java.math.BigDecimal;

public class Campaigns {
    public void test(ApiClient defaultClient) {
        CampaignsApi apiInstance = new CampaignsApi(defaultClient);

        String campaignId = "";
        String generatedString = Utils.getAlphaNumericString(20);

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
            CampaignsCreateResponseBody result = apiInstance.createCampaign(campaignsCreateRequestBody);

            campaignId = result.getId();
            String campaignName = result.getName();

            Voucherify.getInstance().getCampaign().setId(campaignId);
            Voucherify.getInstance().getCampaign().setName(campaignName);

            System.out.println("Calling CampaignsApi#createCampaign OK");
        } catch (ApiException | JsonSyntaxException e) {
            System.err.println("Exception when calling CampaignsApi#createCampaign OK");
            System.err.println("Status message: " + e.getMessage());
            e.printStackTrace();
        }

        try {
            CampaignsGetResponseBody result = apiInstance.getCampaign(campaignId);

            System.out.println("Calling CampaignsApi#getCampaign OK");
        } catch (ApiException | JsonSyntaxException e) {
            System.err.println("Exception when calling CampaignsApi#getCampaign OK");
            System.err.println("Status message: " + e.getMessage());
            e.printStackTrace();
        }

        try {
            Integer vouchersCount = 1; // Integer | Number of vouchers that should be added.
            CampaignsVouchersCreateInBulkRequestBody campaignsVouchersCreateInBulkRequestBody = new CampaignsVouchersCreateInBulkRequestBody(); // CampaignsVouchersCreateInBulkRequestBody | Specify the voucher parameters that you would like to overwrite.

            CampaignsVouchersCreateCombinedResponseBody result = apiInstance.addVouchersToCampaign(campaignId, vouchersCount, campaignsVouchersCreateInBulkRequestBody);
            Voucherify.getInstance().getCampaign().addVoucherId(
                ((CampaignsVouchersCreateResponseBody) result.getActualInstance()).getId()
            );

            //NEED TWO VOUCHERS FOR PUBLICATION
            CampaignsVouchersCreateCombinedResponseBody result2 = apiInstance.addVouchersToCampaign(campaignId, vouchersCount, campaignsVouchersCreateInBulkRequestBody);
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
            apiInstance.addVouchersToCampaign(campaignId, vouchersCount, campaignsVouchersCreateInBulkRequestBody);

            System.out.println("Calling CampaignsApi#addVouchersToCampaign OK");
        } catch (ApiException | JsonSyntaxException e) {
            System.err.println("Exception when calling CampaignsApi#addVouchersToCampaign OK");
            System.err.println("Status message: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
