import sys
sys.path.insert(0, './tmp/python')
import os

import openapi_client
import unittest
import responses
from openapi_client.rest import ApiException
from pprint import pprint
import random

configuration = openapi_client.Configuration(
    host = os.environ['VOUCHERIFY_HOST'] or 'https://api.voucherify.io'
)

#dev
configuration.api_key['X-App-Id-1'] = os.environ['X_APP_ID']
configuration.api_key['X-App-Token-1'] = os.environ['X_APP_TOKEN']


#main
# configuration.api_key['X-App-Id-1'] = "3f9717d5-0214-42e5-bf2d-ce23891228ea"
# configuration.api_key['X-App-Token-1'] = "2f0b10b4-71f8-4fe5-b59e-7eb8ff1c0edd"

#localhost
# configuration.api_key['X-App-Id-1'] = "af1742f9-28de-45e0-be50-71b6dfeb21fe"
# configuration.api_key['X-App-Token-1'] = "798b7287-0f5f-48e0-aa73-a754aff62fec"

class TestYourSDK(unittest.TestCase):

    def __init__(self, *args, **kwargs):
        super(TestYourSDK, self).__init__(*args, **kwargs)


    @responses.activate
    def test_list_redemptions(self):
        with openapi_client.ApiClient(configuration) as api_client:
            api_instance = openapi_client.REDEMPTIONSAPIApi(api_client)

            try:
                result = api_instance.list_redemptions()

                pprint(result)

            except ApiException as e:
                print("Exception when calling test_list_redemptions: %s\n" % e)

    @responses.activate
    def test_list_publications(self):
        with openapi_client.ApiClient(configuration) as api_client:
            api_instance = openapi_client.PUBLICATIONSAPIApi(api_client)

            try:
                result = api_instance.list_publications()

                pprint(result)

            except ApiException as e:
                print("Exception when calling test_list_publications: %s\n" % e)

    @responses.activate
    def test_list_products_in_collection(self):
        with openapi_client.ApiClient(configuration) as api_client:
            api_instance = openapi_client.PRODUCTCOLLECTIONSAPIApi(api_client)

            try:
                result = api_instance.list_products_in_collection("pc_a11pr0dUc75")

                pprint(result)

            except ApiException as e:
                print("Exception when calling test_list_products_in_collection: %s\n" % e)

    @responses.activate
    def test_list_member_rewards(self):
        with openapi_client.ApiClient(configuration) as api_client:
            api_instance = openapi_client.LOYALTIESAPIApi(api_client)

            try:
                result = api_instance.list_member_rewards("abcd")
            except ApiException as e:
                print("Member not found")


if __name__ == '__main__':
    unittest.main()
