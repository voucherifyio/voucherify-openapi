---
title: Fetching Data
excerpt: Learn how to specify the data you would like to fetch.
categorySlug: introduction
slug: listing
type: basic
hidden: false
order: 4
---

All top-level API resources have support for fetches via **list** API methods. For instance, you can list redemptions, list publications, list customers, or list products. 

These list API methods share a common structure, using at least these _query parameters_: `limit` and `created_at`.  

| **Parameter name** | **Description**                                                                                                                                                                                                                                                                                                                                            |
| :----------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      `limit`       | A limit on the number of objects to be returned; between 1 and 100.                                                                                                                                                                                                                                                                                        |
|    `created_at`    | A filter on the list based on the object `created_at` field.<br><br>The value is a dictionary with the following options: `before`, `after`. A date value must be presented in ISO 8601 format (`2016-11-16T14:14:31Z` or `2016-11-16`).<br><br>_Examples:_<br><br>- `[created_at][before]=2017-09-08T13:52:18.227Z`<br>- `[created_at][after]=2017-09-08` |

## Paging the results

Some of the list API methods use the `page` query parameter to display another page of results.

However, the following list API methods use the `starting_after_id` query parameter:
- [List customer activity](ref:list-customer-activity)
- [List member activity](ref:list-member-activity)
- [List member activity (with campaign ID)](ref:list-member-activity-1)
- [List voucher transactions](ref:list-voucher-transactions)
- [List loyalty card transactions](ref:list-loyalty-card-transactions)
- [List loyalty card transactions (with campaign ID)](ref:list-loyalty-card-transactions-1)
- [List customer redeemables](ref:list-customer-redeemables)
- [List referral code holders](ref:referrals-code-holders-1)
- [List referral code holders (with campaign ID)](ref:referrals-code-holders-1)
- [List bin entries](ref:list-bin-entries)
- [List campaign templates](ref:list-campaign-templates)
- [Management – List campaign templates](ref:management-list-campaign-templates)

The response to these methods may include a `more_starting_after` key that takes a string value with an ID. Use this ID with the `starting_after_id` query parameter to display another page of results.

## Response format

The listing method returns a dictionary with a data property that contains an array of resources. The maximum number of resources returned is determined by the `limit` query parameter. If no more resources are available, the resulting array on a given page will be empty. The result can be narrowed down according to the specified (or default) filters.  

| **Property name**     | **Description**                                                                                                                                           |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `object`              | A string describing the object type returned.                                                                                                             |
| `data_ref`            | The value for this property indicates the property name containing the results array.                                                                     |
| `data`                | An array that contains objects for a given list endpoint. In older methods, this is replaced by the name of the respective resource, e.g. `publications`. |
| `total`               | Total number of records for given filtering query. In some methods, this field is absent.                                                                 |
| `has_more`            | It indicates that there are more results to be returned for given filter parameters.                                                                      |
| `more_starting_after` | Present in some of the newer endpoints; it provides an ID that can be used with a `starting_after_id` query parameter to return another page of results.  |


```json Old Method Example Response
{
    "object": "list",
    "total": 1,
    "data_ref": "vouchers",
    "vouchers": [
        {
            "id": "v_yY3smFaWii1iy3EvtaiJJpZqQxoS9rJn",
            "code": "2018-Heq-mK-2w1",
            "campaign": "Benefit",
            "campaign_id": "camp_FzQCVyac6jAAEephT0i2L14F",
            "type": "DISCOUNT_VOUCHER",
            "discount": {
                "type": "AMOUNT",
                "amount_off": 1000
            },
            "start_date": "2018-09-03T22:00:00.000Z",
            "validity_timeframe": {
                "interval": "P1D",
                "duration": "PT1H"
            },
            "validity_day_of_week": [
                2,
                3
            ],
            "publish": {
                "object": "list",
                "count": 1,
                "url": "/v1/vouchers/2018-Heq-mK-2w1/publications?page=1&limit=10"
            },
            "redemption": {
                "object": "list",
                "quantity": 5,
                "redeemed_quantity": 0,
                "url": "/v1/vouchers/2018-Heq-mK-2w1/redemptions?page=1&limit=10"
            },
            "active": false,
            "assets": {
                "qr": {
                    "id": "U2FsdGVkX1+oNqKQ08m2y1IWJemXXWI7RpgBrrNvmBiQbxe/4XBlAudagPJWbdtDI3S5biYSdslhXIwPyRCx0eUhUqnQmngmBadWq8xX3HeGSjUxMu2/yF9PAc3izKU0MUJ2oXJpjZ/oieEHtIElEA==",
                    "url": "{{voucherify_internal_URL}}"
                },
                "barcode": {
                    "id": "U2FsdGVkX1+anixbnFov/mzPXUmqQp6YDR++HLW2m0WxQBc4t1wbBSKHqP8cAa63CUQE8IdyZEIZIku0RwAQiYflEAq6upaJ5CHiB3LUOh0EsdtnzUCB21EBkaNCs3PKNvFdDwG5UQzqIjN0u5MOGA==",
                    "url": "{{voucherify_internal_URL}}"
                }
            },
            "is_referral_code": false,
            "created_at": "2018-09-04T14:58:25.000Z",
            "updated_at": "2018-09-20T08:03:55Z",
            "object": "voucher"
        }
    ]
}
```
```json New Method Example Response
{
    "object": "list",
    "data_ref": "data",
    "data": [
        {
            "id": "rh_0f35d7ba9300a8e8e4",
            "created_at": "2024-08-14T10:29:19.542Z",
            "redeemable_id": "v_YdDGS5yBnLCp79vfPbHhkoRrqPwkgyiy",
            "redeemable_object": "voucher",
            "campaign_id": "camp_vVk4unz3k4gA023fk9XoSiTh",
            "campaign_type": "REFERRAL_PROGRAM",
            "voucher_type": "DISCOUNT_VOUCHER",
            "customer_id": "cust_K11DXLfeJIZz7LZpxgiLhZpX",
            "holder_role": "REFEREE",
            "object": "redeemable_holder",
            "metadata": {
                "influencer_code": true
            }
        },
        {
            "id": "rh_0f35d7ba9300a8e8e3",
            "created_at": "2024-08-14T10:29:19.542Z",
            "redeemable_id": "v_YdDGS5yBnLCp79vfPbHhkoRrqPwkgyiy",
            "redeemable_object": "voucher",
            "campaign_id": "camp_vVk4unz3k4gA023fk9XoSiTh",
            "campaign_type": "REFERRAL_PROGRAM",
            "voucher_type": "DISCOUNT_VOUCHER",
            "customer_id": "cust_6P4K6p7PxEuK37sDtiLOii0A",
            "holder_role": "REFEREE",
            "object": "redeemable_holder",
            "metadata": {
                "influencer_code": false
            }
        }
    ],
    "total": 2,
    "has_more": true,
    "more_starting_after": "rh_0f35d7ba9300a8e8e3"
}
```

## Shortcuts

List API methods offer a list of query parameters. These parameters allow you to filter the results. Each API resource enables a specific set of options which can be used for simplifying a query. If you need advanced options, read the [next section](#advanced-filters-for-fetching-resources).  

| Resource                        | **Shortcuts**                                                                                                                                       | **Example**                                                                                    |
| :------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| **Vouchers**                    | `customer`<br>`campaign`<br>`category`                                                                                                              | `{api-url}/vouchers?customer=source_id`                                                        |
| **Redemptions**                 | `campaign_name`<br>`customer`<br>`voucher_code`<br>`related_object_id`<br>`related_object_parent_id`                                                | `{api-url}/redemptions?customer=customer_id`<br><br>`{api-url}/redemptions?customer=source_id` |
| **Customers**                   | `email`<br>`name`                                                                                                                                   | `{api-url}/customers?email=test@voucherify.io`                                                 |
| **Publications**                | `campaign_name`<br>`customer_id`<br>`voucher_code`<br>`result`<br>`voucher_type`<br>`is_referral_code`<br>`parent_object_id`<br>`related_object_id` | `{api-url}/publications?campaign_name=TEST`                                                    |
| **Validation Rule Assignments** | `related_object_id`<br>`rule`                                                                                                                       | `{api-url}/validation-rules-assignments?related_object_id=promo_id`                            |

## Advanced filters for fetching resources

Moreover, API methods for fetching resources offer extended capabilities for filtering data. A user​ can build advanced queries by passing parameters that define search criteria.  

| **Resource**                  | **Examples**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Vouchers**                  | `[filters][active][conditions][$active]=true`<br>`[filters][active][conditions][$expired]=true`<br>`[filters][active][conditions][$enabled]=true`<br>`[filters][active][conditions][$disabled]=true`<br>`[filters][redemption.redeemed_quantity][conditions][$is]=0`<br>`[filters][is_referral_code][conditions][$is]=true`<br>`[filters][metadata.seq_number][conditions][$is]=1`                                                                                                                                   |
| **Campaigns**                 | `[filters][metadata.seq_number][conditions][$is]=1`<br>`[filters][metadata.test][conditions][$is]=true`                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Products and Skus**         | `[filters][updated_at][conditions][$after][0]=2020-08-20T14:17:09Z`<br>`[filters][updated_at][conditions][$before][0]=2020-08-20T14:17:09Z`<br>`[filters][created_at][conditions][$after][0]=2020-08-20T14:17:09Z`<br>`[filters][created_at][conditions][$before][0]=2020-08-20T14:17:09Z`                                                                                                                                                                                                                           |
| **List all promotion stacks** | `[created_at][before]=2021-12-30T13:52:18.227Z`<br>`[created_at][after]=2021-12-30T13:52:18.227Z`<br>`[filters][created_at][conditions][$before][0]=2021-12-30T13:52:18.227Z`<br>`[filters][created_at][conditions][$after][0]=2021-12-30T13:52:18.227Z`<br>`[updated_at][before]=2021-12-30T13:52:18.227Z`<br>`[updated_at][after]=2021-12-30T13:52:18.227Z`<br>`[filters][updated_at][conditions][$before][0]=2021-12-30T13:52:18.227Z`<br>`[filters][updated_at][conditions][$after][0]=2021-12-30T13:52:18.227Z` |
