---
title: Errors
excerpt: Learn about the errors returned to responses and how you can customize them to improve your customer experience.
categorySlug: introduction
slug: errors
type: basic
hidden: false
order: 2
---

The Voucherify API uses conventional HTTP status codes to indicate success or failure. Responses with a status code starting with 4xx or 5xx can be considered as failed. The API returns errors in a JSON format in the following structure:

```json Error structure
{
  "code": 405,
  "message": "HTTP Method Not Allowed",
  "details": "PUT is not supported by this endpoint. Did you mean GET or POST?"
}
```

> 📘 Developer-friendly API
>
> Voucherify attempts to provide a developer-friendly API, hence sometimes you can find a hint on how to fix an error right in its details (like in the example above).


| Attributes | Description |
|:---:|:---|
| `code` | The HTTP status code of error returned. Possible values are varients of: `2xx`, `4xx`, or `5xx`. |
| `key` | For API object errors, a short string from the list on the right hand side, describing the kind of error which occurred. |
| `message` | A human-readable message providing a short description about the error. |
| `details` | A human-readable message providing more details about the error. |

## HTTP status code summary

| HTTP Status Code | Text | Description |
|:---|:---|:---|
| 400 | Bad Request | The request was invalid. It may occur for various reasons - a malformed JSON or a violated rule (e.g. an attempt to redeem an expired voucher). |
| 401 | Unauthorized | Authentication has failed or has not been provided yet. |
| 402 | Payment Required | The request exceeded your current pricing plan (we send friendly reminders first). |
| 404 | Not Found | The requested resource could not be found. |
| 405 | Method Not Allowed | The request used a method (GET, POST, etc.) that is not available for a given resource. Error details include a hint on which methods are allowed. |
| 406 | Not Acceptable | The API is unable to produce a response in a format specified by the `Accept` header. In most cases the only available response format is `application/json`. |
| 415 | Unsupported Media Type | The API is unable to consume a request in a format specified by the `Content-Type` header. |
| 429 | API limit reached | Error occurs when you exceed your limit of API calls or when your subscription plan has ended. |
| 500 | Internal Server Error | An internal API error occurred. Don't worry, we track and verify all such errors and try to react as asap as possible. |

## Error Messages


The table below shows a list of errors that may be returned along with a brief description of the reason why it occurs.

> 🚧 Customize Error Messages
> A subset of the messages returned for the errors listed below can be customized in the UI.
>  
> Go to **Project Settings** > Error Messages to customize an error message. Then click on *Create new translations group* to create specific error messages. [Read more here](https://support.voucherify.io/article/264-how-can-i-create-custom-errors).

| **Error** | **Reason** |
|:---|:---|
| `already_rolled_back` | redemption was rolled back before the current operation start time |
| `customer_rules_violated` | customer did not match to the segment |
| `duplicate_resource_key` | resource identifier is in use |
| `gift_amount_exceeded` | gift amount has been exceeded |
| `invalid_add_balance_params` | balance object was specified incorrectly |
| `invalid_amount` | order amount was specified incorrectly |
| `invalid_campaign_params` | campaign object was specified incorrectly |
| `invalid_code_config` | voucher code configuration object was specified incorrectly |
| `invalid_customer` | customer object was specified incorrectly |
| `invalid_export_params` | export object was specified incorrectly |
| `invalid_gift` | gift object was specified incorrectly |
| `invalid_order` | order object was specified incorrectly |
| `invalid_payload` | a request body is invalid and cannot be processed |
| `invalid_product` | product object was specified incorrectly |
| `invalid_publish_params` | publication object was specified incorrectly |
| `invalid_query_params` | input request query parameters are invalid |
| `invalid_rollback_params` | redemption rollback object was specified incorrectly |
| `invalid_sku` | SKU object was specified incorrectly |
| `invalid_validation_rules` | validation rules object was specified incorrectly |
| `invalid_voucher` | voucher object was specified incorrectly (e.g., `gift` or `discount` is missing) |
| `loyalty_card_points_exceeded` | loyalty card points were exceeded |
| `missing_amount` | order amount was not specified |
| `missing_customer` | customer was not specified |
| `missing_order` | order is missing |
| `missing_order_items` | order items were not specified |
| `missing_order_items_amount` | missing order item's amount(s) |
| `missing_reward` | reward is missing |
| `multiple_requests` | multiple requests detected; i.e. when a redemption is in progress and a session lock is in place, then an attempt to validate the voucher will result in this error because it is unknown whether the voucher can or cannot be used |
| `no_voucher_suitable_for_publication` | lack of vouchers suitable for publication |
| `not_found` | resource with given ID/code does not exist |
| `order_rules_violated` | order did not match validation rules |
| `promotion_inactive` | promotion is inactive |
| `promotion_not_active_now` | promotion is not active in the given timeframe |
| `quantity_exceeded` | voucher's redemptions limit has been exceeded |
| `query_too_large` | request body payload too large or query string too large |
| `referrer_not_permitted_to_redeem` | the referral code is being redeemed by the referrer |
| `resource_not_found` | voucher with given code does not exist |
| `voucher_disabled` | voucher has been disabled (active: false) |
| `voucher_expired` | voucher has already expired (after expiration date) |
| `voucher_not_active` | voucher is not active yet (before start date) |
| `voucher_not_active_now` | voucher is not active in the given timeframe |

## Custom error messages with Validation Rules

Voucherify allows you to define your custom error message per Validation Rule; such message is going to be returned in API Response when validation or redemption of your promotion campaign or code fails due to not meeting requirements of that rule.
Additionally, you can specify a fallback error message that should be used when there is no error message defined for the rule.
You can define your custom error message both from the API or your Dashboard.

The content of custom error message is going to be returned in `error` object under `message` property.
If you do not specify any error message for your Validation Rule then `error` property will not be included in the API response.

**Example**:

Let's assume that you create a new Validation Rule via API and would like to have a custom error message "You can't get a discount because you are not new customer" returned from API.
The second condition says that your customer who is validating a voucher is not a new one (for that, we are going to use a segment represented by ID: `seg_n3vVcU5t0m3rs4rEPr3C1oU5`).
Additionally, you wish that the customer cart must contain an iPhone (`prod_f1r5Tpr0DuC7` is our iPhone), and if not, then a fallback error message should be used: "You must buy iPhone and be our new customer to get a discount."
Let's examine how a request for creating such Validation Rule would look like, later we are also going to explore in details how API response is going to look:

```json
{
  "name": "My validation rule",
  "error": {
    "message": "You must buy IPhone and be our new customer in order to get a discount"
  },
  "rules": {
    "1": {
      "name": "customer.segment",
      "conditions": {
        "$is": ["seg_n3vVcU5t0m3rs4rEPr3C1oU5"]
      },
      "error": {
        "message": "You can't get discount because you are not a new customer"
      },
      "rules": {}
    },
    "2": {
        "name": "product.id",
        "conditions": {
            "$is": [{
                "id": "prod_f1r5Tpr0DuC7"
            }]
        },
        "rules": {}
    },
    "logic": "1 AND 2"
  }
}
```

As you can see in request body above, there is an `error` property defined at the top level which is going to serve as a fallback. There is also an `error` message set per rule which is going to be returned in the API response when validation / redemption fail due to that specific rule.

Let's see below how the API Response is going to look in different scenarios with validation voucher:

**Provided required iPhone in order but the customer does not belong to required segment:**

```json
{
    "code": "MY-TEST-CODE",
    "valid": false,
    "reason": "customer does not match segment rules",
    "tracking_id": "track_BRR0eIl/xcEftRmZCj65AQ==",
    "metadata": {},
    "error": {
        "message": "You can't get discount because you are not a new customer"
    }
}
```

**Provided customer belongs to required segment, but the iPhone was not specified in the order:**

```json
{
    "code": "MY-TEST-CODE",
    "valid": false,
    "reason": "order does not match validation rules",
    "tracking_id": "track_BRR0eIl/xcFGi+qDwBt2E8W3LQP5W8Np",
    "metadata": {},
    "error": {
        "message": "You must buy IPhone and be our new customer in order to get a discount"
    }
}
```

**Passing both checks - providing customer who belongs to the required segment and items list with iPhone:**

```json
{
    "code": "MY-TEST-CODE",
    "valid": true,
    "discount": {
        "type": "AMOUNT",
        "amount_off": 10000
    },
    "order": {
        "object": "order",
        "items": [
            {
                "object": "order_item",
                "product_id": "prod_f1r5Tpr0DuC7",
                "quantity": 1
            }
        ]
    },
    "tracking_id": "track_BRR0eIl/xcFGi+qDwBt2E8W3LQP5W8Np",
    "metadata": {}
}
```
