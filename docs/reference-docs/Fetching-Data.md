---
title: Fetching Data
excerpt: Learn how to specify the data you would like to fetch.
categorySlug: introduction
slug: listing
type: basic
hidden: false
order: 4
---

All top-level API resources have support for fetches via **list** API methods. For instance, you can list redemptions, list publications, list customers, list products, and more. 

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
- [List campaign transactions](ref:list-campaign-transactions)
- [List voucher transactions](ref:list-voucher-transactions)
- [List loyalty campaign transactions](ref:list-loyalty-campaign-transactions)
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
| **Vouchers**                  | `[filters][active][conditions][$active]=true`<br>`[filters][active][conditions][$expired]=true`<br>`[filters][active][conditions][$enabled]=true`<br>`[filters][active][conditions][$disabled]=true`<br>`[filters][redemption.redeemed_quantity][conditions][$is]=0`<br>`[filters][is_referral_code][conditions][$is]=true`<br>`[filters][expiration_date][conditions][$before]=2024-04-29T00:00:00.000Z` <br> `[filters][metadata.seq_number][conditions][$is]=1`                                                   |
| **Campaigns**                 | `[filters][metadata.seq_number][conditions][$is]=1`<br>`[filters][metadata.test][conditions][$is]=true`                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Products and Skus**         | `[filters][updated_at][conditions][$after][0]=2020-08-20T14:17:09Z`<br>`[filters][updated_at][conditions][$before][0]=2020-08-20T14:17:09Z`<br>`[filters][created_at][conditions][$after][0]=2020-08-20T14:17:09Z`<br>`[filters][created_at][conditions][$before][0]=2020-08-20T14:17:09Z`                                                                                                                                                                                                                           |
| **List all promotion stacks** | `[created_at][before]=2021-12-30T13:52:18.227Z`<br>`[created_at][after]=2021-12-30T13:52:18.227Z`<br>`[filters][created_at][conditions][$before][0]=2021-12-30T13:52:18.227Z`<br>`[filters][created_at][conditions][$after][0]=2021-12-30T13:52:18.227Z`<br>`[updated_at][before]=2021-12-30T13:52:18.227Z`<br>`[updated_at][after]=2021-12-30T13:52:18.227Z`<br>`[filters][updated_at][conditions][$before][0]=2021-12-30T13:52:18.227Z`<br>`[filters][updated_at][conditions][$after][0]=2021-12-30T13:52:18.227Z` |

<!---
## Filtering metadata

To filter metadata, you can use the following request:

```String
filters[metadata.brandName][conditions][$is]=Voucherify
```
```Array
filters[metadata.shirtSize][conditions][$in][0]=S&filters[metadata.shirtSize][conditions][$includes][1]=M&filters[metadata.shirtSize][conditions][$in][1]=L
```

You can use different conditions to filter data; see the table below.

> 🚧 Documentation in progress
>
> The list of conditions is not complete yet.

| Condition                    | Allowed data types         | Description                                                                                                                    |
| ---------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `$active`                    |                            |                                                                                                                                |
| `$after_equal`               |                            |                                                                                                                                |
| `$after`                     | date, date time            | Returns results which occur after the specified value.                                                                         |
| `$before_equal`              |                            |                                                                                                                                |
| `$before_start`              |                            |                                                                                                                                |
| `$before`                    | date, date time            | Returns results which occur before the specified value.                                                                        |
| `$contains`                  |                            |                                                                                                                                |
| `$count_less`                |                            |                                                                                                                                |
| `$count_more`                |                            |                                                                                                                                |
| `$count`                     |                            |                                                                                                                                |
| `$disabled`                  |                            |                                                                                                                                |
| `$enabled`                   |                            |                                                                                                                                |
| `$ends_with`                 | image URL, string          | Returns results that end with the specified value.                                                                             |
| `$expired`                   |                            |                                                                                                                                |
| `$failed`                    |                            |                                                                                                                                |
| `$has_value`                 | boolean, image URL, string | Returns results that have any value.                                                                                           |
| `$in_location`               |                            |                                                                                                                                |
| `$in_progress`               |                            |                                                                                                                                |
| `$in`                        | image URL, string          |                                                                                                                                |
| `$includes`                  | array of different types   | Compares values in an array. Returns results that have **all** of the values listed.                                           |
| `$intersects`                | array of different types   | Compares values in an array. Returns results that have **at least one** of the values listed.                                  |
| `$is_day_of_month`           |                            |                                                                                                                                |
| `$is_day`                    |                            |                                                                                                                                |
| `$is_days_ago_md`            | date                       | Returns results that occurred exactly the specified number of days ago.                                                        |
| `$is_days_ago`               |                            |                                                                                                                                |
| `$is_days_in_future_md`      | date                       | Returns results that will occur exactly in the specified number of days in the future.                                         |
| `$is_days_in_future`         |                            |                                                                                                                                |
| `$is_less_days_ago_md`       | date                       | Returns results that occurred exactly the specified number of days ago or less than that number.                               |
| `$is_less_days_in_future_md` | date                       | Returns results that will occur exactly in the specified number of days in the future or less than that number.                |
| `$is_month`                  |                            |                                                                                                                                |
| `$is_more_days_ago_md`       |                            |                                                                                                                                |
| `$is_more_days_in_future_md` |                            |                                                                                                                                |
| `$is_not`                    | boolean, image URL, string |                                                                                                                                |
| `$is_unknown`                | boolean, image URL, string | Returns results that have an unkown or no value.                                                                               |
| `$is_year`                   |                            |                                                                                                                                |
| `$is_years_ago`              | date, date time            | Returns results that occurred exactly the specified number of years ago.                                                       |
| `$is`                        | boolean, image URL, string |                                                                                                                                |
| `$last_month_md`             |                            |                                                                                                                                |
| `$last_month`                | date                       | Returns results that occurred in the previous month, e.g. January. It takes `true` as the value.                               |
| `$last_week_md`              |                            |                                                                                                                                |
| `$last_week`                 | date                       | Returns results that occurred in the previous week. It takes `true` as the value.                                              |
| `$last_year`                 | date                       | Returns results that occurred in the previous year, e.g. 2024. It takes `true` as the value.                                   |
| `$less_than_ago`             |                            |                                                                                                                                |
| `$less_than_equal`           |                            |                                                                                                                                |
| `$less_than_future`          |                            |                                                                                                                                |
| `$less_than`                 |                            |                                                                                                                                |
| `$more_than_ago`             |                            |                                                                                                                                |
| `$more_than_equal`           |                            |                                                                                                                                |
| `$more_than_future`          |                            |                                                                                                                                |
| `$more_than`                 |                            |                                                                                                                                |
| `$next_month_md`             |                            |                                                                                                                                |
| `$next_month`                | date                       | Returns results that will occur in the next month, e.g. February. It takes `true` as the value.                                |
| `$next_week_md`              |                            |                                                                                                                                |
| `$next_week`                 | date                       | Returns results that will occur in the next week. It takes `true` as the value.                                                |
| `$next_year`                 | date                       | Returns results that will occur in the next year, e.g. 2026. It takes `true` as the value.                                     |
| `$not_contain`               |                            |                                                                                                                                |
| `$not_in_location`           |                            |                                                                                                                                |
| `$not_in`                    | image URL, string          |                                                                                                                                |
| `$redeemable`                |                            |                                                                                                                                |
| `$redeemed`                  |                            |                                                                                                                                |
| `$starts_with`               | image URL, string          | Returns results that begin with the specified value.                                                                           |
| `$this_month_md`             |                            |                                                                                                                                |
| `$this_month`                | date                       | Returns results that occurred or will occur this month, e.g. January 2025. It takes `true` as the value.                       |
| `$this_week_md`              |                            |                                                                                                                                |
| `$this_week`                 | date                       | Returns results that occurred or will occur this week. It takes `true` as the value.                                           |
| `$this_year`                 | date                       | Returns results that occurred or will occur this year, e.g. 2025. It takes `true` as the value.                                |
| `$today_md`                  |                            |                                                                                                                                |
| `$today`                     | date                       | Returns results that occur today, e.g. 01 January 2025 if that is today's date. It takes `true` as the value.                  |
| `$tomorrow_md`               |                            |                                                                                                                                |
| `$tomorrow`                  | date                       | Returns results that will occur the following day, e.g. 02 January 2025 if today is 01 January. It takes `true` as the value.  |
| `$yesterday_md`              |                            |                                                                                                                                |
| `$yesterday`                 | date                       | Returns results that occurred the day before, e.g. 31 December 2024 if today is 01 January 2025. It takes `true` as the value. |
--->