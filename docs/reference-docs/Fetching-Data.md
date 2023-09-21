---
title: Fetching Data
excerpt: Learn how to specify the data you would like to fetch.
categorySlug: introduction
slug: listing
type: basic
hidden: false
order: 4
---

All top-level API resources have support for fetches via **list** API methods. For instance, you can list redemptions, list publications, list customers, and list products. 

These list API methods share a common structure, consuming at least these three _query parameters_: `limit`, `page`, and `created_at`.  

| **Parameter name** | **Description** |
|:---:|:---|
| `limit` | A limit on the number of objects to be returned; between 1 and 100. |
| `page` | Which page of results to return. |
| `created_at` | A filter on the list based on the object `created_at` field.<br><br>The value is a dictionary with the following options: `before`, `after`. A date value must be presented in ISO 8601 format (`2016-11-16T14:14:31Z` or `2016-11-16`).<br><br>_Examples:_<br><br>- `[created_at][before]=2017-09-08T13:52:18.227Z`<br>- `[created_at][after]=2017-09-08` |

## Response format

The listing method returns a dictionary with a data property that contains an array of resources. The maximum number of resources returned is determined by the limit query parameter. If no more resources are available, the resulting array on a given page will be empty. The result can be narrowed down according to the specified (or default) filters.  

| **Property name** | **Description** |
|:---|:---|
| `object` | A string describing the object type returned. |
| `total` | Total number of records for given filtering query. |
| `data_ref` | The value for this property indicates the property name containing the results array. |


```json Example Response
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
                    "url": "https://dl.voucherify.io/api/v1/assets/qr/U2FsdGVkX1%2BoNqKQ08m2y1IWJemXXWI7RpgBrrNvmBiQbxe%2F4XBlAudagPJWbdtDI3S5biYSdslhXIwPyRCx0eUhUqnQmngmBadWq8xX3HeGSjUxMu2%2FyF9PAc3izKU0MUJ2oXJpjZ%2FoieEHtIElEA%3D%3D"
                },
                "barcode": {
                    "id": "U2FsdGVkX1+anixbnFov/mzPXUmqQp6YDR++HLW2m0WxQBc4t1wbBSKHqP8cAa63CUQE8IdyZEIZIku0RwAQiYflEAq6upaJ5CHiB3LUOh0EsdtnzUCB21EBkaNCs3PKNvFdDwG5UQzqIjN0u5MOGA==",
                    "url": "https://dl.voucherify.io/api/v1/assets/barcode/U2FsdGVkX1%2BanixbnFov%2FmzPXUmqQp6YDR%2B%2BHLW2m0WxQBc4t1wbBSKHqP8cAa63CUQE8IdyZEIZIku0RwAQiYflEAq6upaJ5CHiB3LUOh0EsdtnzUCB21EBkaNCs3PKNvFdDwG5UQzqIjN0u5MOGA%3D%3D"
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

## Shortcuts

**List** API methods offer a list of query parameters. These parameters allow you to filter the results. Each API resource enables a specific set of options which can be used for simplifying a query. If you need advanced options, you can read the next section.  

| Resource | **Shortcuts** | **Example** |
|:---|:---|:---|
| **Vouchers** | `customer`<br>`campaign`<br>`category` | `{api-url}/vouchers?customer=source_id` |
| **Redemptions** | `campaign_name`<br>`customer`<br>`voucher_code`<br>`related_object_id`<br>`related_object_parent_id` | `{api-url}/redemptions?customer=customer_id`<br><br>`{api-url}/redemptions?customer=source_id` |
| **Customers** | `email`<br>`name` | `{api-url}/customers?email=test@voucherify.io` |
| **Publications** | `campaign_name`<br>`customer_id`<br>`voucher_code`<br>`result`<br>`voucher_type`<br>`is_referral_code`<br>`parent_object_id`<br>`related_object_id` | `{api-url}/publications?campaign_name=TEST` |
| **Validation Rule Assignments** | `related_object_id`<br>`rule` | `{api-url}/validation-rules-assignments?related_object_id=promo_id` |

## Advanced filters for fetching resources

Moreover, API methods for fetching resources offer extended capabilities for filtering data. A user​ can build advanced queries by passing parameters that define search criteria.  

| **Resource** | **Examples** |
|:---|:---|
| **Vouchers** | `[filters][active][conditions][$active]=true`<br>`[filters][active][conditions][$expired]=true`<br>`[filters][active][conditions][$enabled]=true`<br>`[filters][active][conditions][$disabled]=true`<br>`[filters][redemption.redeemed_quantity][conditions][$is]=0`<br>`[filters][is_referral_code][conditions][$is]=true`<br>`[filters][metadata.seq_number][conditions][$is]=1` |
| **Campaigns** | `[filters][metadata.seq_number][conditions][$is]=1`<br>`[filters][metadata.test][conditions][$is]=true` |
| **Products and Skus** | `[filters][updated_at][conditions][$after][0]=2020-08-20T14:17:09Z`<br>`[filters][updated_at][conditions][$before][0]=2020-08-20T14:17:09Z`<br>`[filters][created_at][conditions][$after][0]=2020-08-20T14:17:09Z`<br>`[filters][created_at][conditions][$before][0]=2020-08-20T14:17:09Z` |
| **List all promotion stacks** | `[created_at][before]=2021-12-30T13:52:18.227Z`<br>`[created_at][after]=2021-12-30T13:52:18.227Z`<br>`[filters][created_at][conditions][$before][0]=2021-12-30T13:52:18.227Z`<br>`[filters][created_at][conditions][$after][0]=2021-12-30T13:52:18.227Z`<br>`[updated_at][before]=2021-12-30T13:52:18.227Z`<br>`[updated_at][after]=2021-12-30T13:52:18.227Z`<br>`[filters][updated_at][conditions][$before][0]=2021-12-30T13:52:18.227Z`<br>`[filters][updated_at][conditions][$after][0]=2021-12-30T13:52:18.227Z` |

### Advanced filters for qualification API

Examine qualifications methods display all vouchers or campaigns qualified to the given customer and context (e.g., order). Using the advanced filters listed below, you can limit the qualification results.  

| **Resource** | **Filter** | **Example** |
|:---|:---|:---|
| **Campaigns** | `category` | `[filters][categories][conditions][$is]={{category_name}}` |
| **Campaigns** | `voucher type` (`DISCOUNT_VOUCHER`, `GIFT_VOUCHER` or `LOYALTY_CARD`) | `[filters][voucher_type][conditions][$is]={{voucher_type}}` |
| **Campaigns** | `metadata` | `[filters][metadata.{{Campaign metadata key}}][conditions][$is]={{campaign_metadata_value}}` |
| **Voucher** | `category` | `[filters][categories][conditions][$is]={{category_name}}` |
| **Voucher** | voucher type<br>(`GIFT_VOUCHER`, or `DISCOUNT_VOUCHER`) | `[filters][type][conditions][$is]={{voucher_type}` |
| **Voucher** | `metadata` | `[filters][metadata.{{Voucher metadata key}}][conditions][$is]={{voucher_metadata_value}}` |
| **Voucher** | `holder_id`<br>(when a code is published to a customer, he/she becomes its holder) | `[filters][holder_id][conditions][$in]={{customer_id}}` |
| **Voucher** | `campaign_ids` | `[filters][campaign_id][conditions][$in]={{campaign_id}}` |
