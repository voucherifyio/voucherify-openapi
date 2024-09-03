import sys
sys.path.insert(0, './')

import os
import voucherify_client
import unittest
import responses
from voucherify_client.rest import ApiException
from pprint import pprint
import random
from dotenv import load_dotenv

load_dotenv()

HOST = os.getenv('VOUCHERIFY_HOST')
X_APP_ID = os.getenv('X_APP_ID')
X_APP_TOKEN = os.getenv('X_APP_TOKEN')

configuration = voucherify_client.Configuration(
    host = HOST or 'https://api.voucherify.io'
)

configuration.api_key['X-App-Id'] = X_APP_ID
configuration.api_key['X-App-Token'] = X_APP_TOKEN

class TestYourSDK(unittest.TestCase):

    def __init__(self, *args, **kwargs):
        super(TestYourSDK, self).__init__(*args, **kwargs)

    @responses.activate
    def test_add_vouchers_to_campaign(self):
        with voucherify_client.ApiClient(configuration) as api_client:
            api_instance = voucherify_client.CampaignsApi(api_client)

            randomCode = random.randint(0, 100000)
            campaign_name = "camp_test_" + str(randomCode)
            code = "test_code_" + str(randomCode)

            try:
                campaignsCreateRequestBody = voucherify_client.CampaignsCreateRequestBody(
                    actual_instance=voucherify_client.CampaignsCreateDiscountCouponsCampaign(
                        name=campaign_name,
                        voucher=voucherify_client.DiscountCouponsCampaignVoucher(
                            type="DISCOUNT_VOUCHER",
                            discount=voucherify_client.Discount(
                                actual_instance=voucherify_client.DiscountAmount(
                                    type="AMOUNT",
                                    amount_off=1000
                                )
                            )
                        ),
                        metadata={
                            "mandatory_v": "test"
                        }
                    )
                )
                campaign = api_instance.create_campaign(campaignsCreateRequestBody)

                async_action = api_instance.add_vouchers_to_campaign(campaign.id, 5)
                campaigns_vouchers_create_response_body = api_instance.add_vouchers_to_campaign(campaign.id)
                campaigns_vouchers_specific_code_create_response_body = api_instance.add_voucher_with_specific_code_to_campaign(campaign.id, code)

                self.assertIsNotNone(async_action)
                self.assertIsNotNone(campaigns_vouchers_create_response_body)
                self.assertIsNotNone(campaigns_vouchers_specific_code_create_response_body)

            except ApiException as e:
                self.fail("Exception when calling CAMPAIGNSAPIApi->create_qualification: %s\n" % e)

    @responses.activate
    def test_list_redemptions(self):
        with voucherify_client.ApiClient(configuration) as api_client:
            api_instance = voucherify_client.RedemptionsApi(api_client)

            try:
                result = api_instance.list_redemptions()
            except ApiException as e:
                self.fail("Exception when calling test_list_redemptions: %s\n" % e)

    @responses.activate
    def test_list_publications(self):
        with voucherify_client.ApiClient(configuration) as api_client:
            api_instance = voucherify_client.PublicationsApi(api_client)

            try:
                result = api_instance.list_publications()
                self.assertIsNotNone(result)

            except ApiException as e:
                self.fail("Exception when calling test_list_publications: %s\n" % e)

    @responses.activate
    def test_list_products_in_collection(self):
        with voucherify_client.ApiClient(configuration) as api_client:
            api_instance = voucherify_client.ProductCollectionsApi(api_client)

            try:
                result = api_instance.list_products_in_collection("pc_a11pr0dUc75")
                self.assertIsNotNone(result)

            except ApiException as e:
                self.fail("Exception when calling test_list_products_in_collection: %s\n" % e)

    @responses.activate
    def test_list_member_rewards(self):
        with voucherify_client.ApiClient(configuration) as api_client:
            api_instance = voucherify_client.LoyaltiesApi(api_client)

            try:
                result = api_instance.list_member_rewards("abcd")
                self.assertIsNotNone(result)

            except ApiException as e:
                self.fail("Member not found")


if __name__ == '__main__':
    unittest.main()
