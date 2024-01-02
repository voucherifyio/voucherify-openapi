import sys
sys.path.insert(0, '../tmp/python')

import os
import openapi_client
import unittest
import responses
from openapi_client.rest import ApiException
from pprint import pprint
import random
from dotenv import load_dotenv

load_dotenv()

HOST = os.getenv('VOUCHERIFY_HOST')
X_APP_ID = os.getenv('X_APP_ID')
X_APP_TOKEN = os.getenv('X_APP_TOKEN')

configuration = openapi_client.Configuration(
    host = HOST or 'https://api.voucherify.io'
)

configuration.api_key['X-App-Id-1'] = X_APP_ID
configuration.api_key['X-App-Token-1'] = X_APP_TOKEN

class TestYourSDK(unittest.TestCase):

    def __init__(self, *args, **kwargs):
        super(TestYourSDK, self).__init__(*args, **kwargs)

    @responses.activate
    def test_add_vouchers_to_campaign(self):
        with openapi_client.ApiClient(configuration) as api_client:
            api_instance = openapi_client.CampaignsApi(api_client)

            randomCode = random.randint(0, 100000)
            campaign_name = "camp_test_" + str(randomCode)
            code = "test_code_" + str(randomCode)

            try:
                campaignsCreateRequestBody = openapi_client.CampaignsCreateRequestBody(
                    actual_instance=openapi_client.CampaignsCreateDiscountCouponsCampaign(
                        name=campaign_name,
                        voucher=openapi_client.DiscountCouponsCampaignVoucher(
                            type="DISCOUNT_VOUCHER",
                            discount=openapi_client.Discount(
                                actual_instance=openapi_client.DiscountAmount(
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

                pprint(async_action)
                pprint(campaigns_vouchers_create_response_body)
                pprint(campaigns_vouchers_specific_code_create_response_body)

            except ApiException as e:
                print("Exception when calling CAMPAIGNSAPIApi->create_qualification: %s\n" % e)

    @responses.activate
    def test_list_redemptions(self):
        with openapi_client.ApiClient(configuration) as api_client:
            api_instance = openapi_client.RedemptionsApi(api_client)

            try:
                result = api_instance.list_redemptions()

                pprint(result)

            except ApiException as e:
                print("Exception when calling test_list_redemptions: %s\n" % e)

    @responses.activate
    def test_list_publications(self):
        with openapi_client.ApiClient(configuration) as api_client:
            api_instance = openapi_client.PublicationsApi(api_client)

            try:
                result = api_instance.list_publications()

                pprint(result)

            except ApiException as e:
                print("Exception when calling test_list_publications: %s\n" % e)

    @responses.activate
    def test_list_products_in_collection(self):
        with openapi_client.ApiClient(configuration) as api_client:
            api_instance = openapi_client.ProductCollectionsApi(api_client)

            try:
                result = api_instance.list_products_in_collection("pc_a11pr0dUc75")

                pprint(result)

            except ApiException as e:
                print("Exception when calling test_list_products_in_collection: %s\n" % e)

    @responses.activate
    def test_list_member_rewards(self):
        with openapi_client.ApiClient(configuration) as api_client:
            api_instance = openapi_client.LoyaltiesApi(api_client)

            try:
                result = api_instance.list_member_rewards("abcd")
            except ApiException as e:
                print("Member not found")


if __name__ == '__main__':
    unittest.main()
