---
title: Quickstart
excerpt: Get started with Voucherify API and dashboard by redeeming your first coupon code.
categorySlug: getting-started
slug: quickstart
type: basic
hidden: false
order: 2
---

Welcome to Voucherify! We’re excited to be your partner in building a future-proof Promotion Engine. Let’s start with a simple use case — applying a $10 off BLCKFRDY coupon to the cart — to learn how Voucherify works.

You must first create an [account](http://app.voucherify.io/#/signup) — Voucherify offers a **free tier** (“Sandbox project”) you can use to build a proof of concept and, further, test it in production. 

[block:html]
{
  "html": "<div>\n<iframe src=\"https://player.vimeo.com/video/685819484?h=5332d0408e\" width=\"640\" height=\"360\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" allowfullscreen></iframe>\n</div>"
}
[/block]

## Join the dashboard

After you create your account, you get access to the Sandbox dashboard. Sandbox comes with a set of predefined campaigns. That’s why when you browse through the views, you can see several objects already created. One of the essential objects in Voucherify is a [voucher](doc:vouchers). In a nutshell, it represents a code that serves as an identifier for promotions supported by Voucherify, including a coupon, referral code, or gift card.

Type **BLCKFRDY** in the search bar and Voucherify will **redirect** you to the voucher page, which displays the basic information about the discount it carries. Let’s redeem the code with the API.

<!-- ![Voucherify Dashboard](../../assets/img/guides_getting_started_quickstart_voucher_dashboard_1.png "Voucher Dashboard") -->
![Voucherify Dashboard](https://files.readme.io/fcb7572-voucher_dashboard.png "Voucher Dashboard")

## Get your API keys

The Sandbox Project Dashboard is already showing your default API keys for the Sandbox project. You can also navigate to Project Settings to find the Authentication section. 

<!-- ![Application Keys](../../assets/img/guides_getting_started_quickstart_application_keys_2.png "Application Keys") -->
![Application Keys](https://files.readme.io/9003954-application-keys.png "Application Keys")

## Make a test API request

Within the Sandbox, you get 100 API calls per hour. Visit [Limits](doc:limits) to learn how to monitor your usage. With the first API request, we’ll [redeem](doc:redeem-voucher) our coupon. This function is essential to Voucherify workflow as it takes care of:

1. Checking if the code is recognizable with your account.
2. Validating if it satisfies the business rules.
3. Calculating and returning the discount value.
4. Marking the code as used.

**Note:** while calling the [redemption endpoint](ref:redeem-voucher) is enough to satisfy a basic promo code flow, it's useful to add [validation](ref:validate-voucher) to the flow every time the promo code or cart changes. Validation performs 1-3 points, but it doesn't mark the code as used.
**Note:** Voucherify API supports the redemption of a single promo code and [Stackable discounts API](doc:manage-stackable-discounts), which lets you redeem up to 5 incentives per call. Before integrating Voucherify, choose which redemption endpoint you prefer to use. 

<!-- ![First Call Flow](../../assets/img/guides_getting_started_quickstart_first_call_flow_3.jpeg "First Call Flow") -->
![First Call Flow](https://files.readme.io/030a879-first-call-flow.jpeg "First Call Flow")

Let’s call a test redemption. Use the following snippet with the keys copied from the Project Settings. Make sure you choose the correct [API endpoint](doc:api-endpoints) for the region you selected when creating your account.

You can also check out our [SDKs](doc:sdks) and call our API right from your development environment.

```curl cURL
curl -X POST \
-H "X-App-Id: ID" \
-H "X-App-Token: SECRET KEY" \
-H "Content-Type: application/json" \
-d '{"order": {"amount": 20000} }' "https://api.voucherify.io/v1/vouchers/BLCKFRDY/redemption"
```
```javascript JavaScript
const { VoucherifyServerSide } = require('@voucherify/sdk')

const client = VoucherifyServerSide({
	applicationId: 'ID',
	secretKey: 'TOKEN',
	// apiUrl: 'https://<region>.api.voucherify.io'
})

client.redemptions.redeem("BLCKFRDY", {"order" : {"amount": 20000}}).then(console.log)
```

Voucherify should reply with the [redemption](ref:get-redemption) details as in the screenshot below. If Voucherify doesn’t reply with a 20x status, check the [error code](ref:errors) to find the reason.

```json 200 OK
{
    "id": "r_1utfsnmdnq9KMh4xEKjcZT3m",
    "object": "redemption",
    "date": "2022-02-16T07:39:21.575Z",
    "customer_id": null,
    "tracking_id": null,
    "metadata": null,
    "result": "SUCCESS",
    "order": {
        "id": "ord_0r32g8iQNp0WA84fBK814RgG",
        "source_id": null,
        "created_at": "2022-02-16T07:39:21.546Z",
        "updated_at": null,
        "status": "PAID",
        "amount": 20000,
        "discount_amount": 1000,
        "total_discount_amount": 1000,
        "total_amount": 19000,
        "applied_discount_amount": 1000,
        "total_applied_discount_amount": 1000,
        "customer_id": null,
        "referrer_id": null,
        "object": "order",
        "redemptions": {
            "r_1utfsnmdnq9KMh4xEKjcZT3m": {
                "date": "2022-02-16T07:39:21.575Z",
                "related_object_type": "voucher",
                "related_object_id": "v_MMn7nc75rwUjdPnfl4X6NtCAK5MDNgNk"
            }
        }
    },
    "customer": null,
    "related_object_type": "voucher",
    "related_object_id": "v_MMn7nc75rwUjdPnfl4X6NtCAK5MDNgNk",
    "voucher": {
        "id": "v_MMn7nc75rwUjdPnfl4X6NtCAK5MDNgNk",
        "code": "BLCKFRDY",
        "campaign": null,
        "campaign_id": null,
        "category": "showcase",
        "type": "DISCOUNT_VOUCHER",
        "discount": {
            "type": "AMOUNT",
            "amount_off": 1000
        },
        "gift": null,
        "loyalty_card": null,
        "start_date": null,
        "expiration_date": null,
        "validity_timeframe": null,
        "validity_day_of_week": null,
        "active": true,
        "additional_info": null,
        "metadata": {
            "name": "Black Friday Coupon"
        },
        "assets": {
            "qr": {
                "id": "U2FsdGVkX1/FEz2OO26+KPxsV7dn/EFfzLbdGNArC+25Y8CX1j+beNmaxFcbOTVHnHHvmHzc50VdE+D0Cimz+7ZMJC92PSvshoCDBEnu5T10TOKozvVTaZn5O1NfaR5q+3zDnWRoFhfCcg/TilTQng==",
                "url": "https://dl.voucherify.io/api/v1/assets/qr/U2FsdGVkX1%2FFEz2OO26%2BKPxsV7dn%2FEFfzLbdGNArC%2B25Y8CX1j%2BbeNmaxFcbOTVHnHHvmHzc50VdE%2BD0Cimz%2B7ZMJC92PSvshoCDBEnu5T10TOKozvVTaZn5O1NfaR5q%2B3zDnWRoFhfCcg%2FTilTQng%3D%3D"
            },
            "barcode": {
                "id": "U2FsdGVkX1+Pgk0VxfAp5EbUgyoJxdy9Dcnnt4YYF64Kdk4o3GXzc3NeOvi6wFL27I2/j8bbMm8xZxETc6C0xgV9DcDUarJhpYjA4k+EhSu0dvoqrkSuGo1Pk+yFAeu7dieakoIR2xv+5B2ebqXstQ==",
                "url": "https://dl.voucherify.io/api/v1/assets/barcode/U2FsdGVkX1%2BPgk0VxfAp5EbUgyoJxdy9Dcnnt4YYF64Kdk4o3GXzc3NeOvi6wFL27I2%2Fj8bbMm8xZxETc6C0xgV9DcDUarJhpYjA4k%2BEhSu0dvoqrkSuGo1Pk%2ByFAeu7dieakoIR2xv%2B5B2ebqXstQ%3D%3D"
            }
        },
        "is_referral_code": false,
        "created_at": "2022-02-16T06:58:29.207Z",
        "updated_at": "2022-02-16T07:39:21.576Z",
        "validation_rules_assignments": {
            "object": "list",
            "data_ref": "data",
            "data": [],
            "total": 0
        },
        "redemption": {
            "quantity": null,
            "redeemed_quantity": 1,
            "object": "list",
            "url": "/v1/vouchers/BLCKFRDY/redemptions?page=1&limit=10"
        },
        "publish": {
            "object": "list",
            "count": 0,
            "url": "/v1/vouchers/BLCKFRDY/publications?page=1&limit=10"
        },
        "object": "voucher",
        "applicable_to": {
            "data": [],
            "total": 0,
            "data_ref": "data",
            "object": "list"
        },
        "inapplicable_to": {
            "data": [],
            "total": 0,
            "data_ref": "data",
            "object": "list"
        }
    }
}
```

Because BLCKFRDY doesn’t have any redemption limits, you can use it multiple times. 

## Review logs in the dashboard

Every redemption can be [listed](ref:list-redemptions) with the API or in the dashboard. When you go to the voucher view, in “Recent changes”, you’ll see operations performed on the object. You can switch to the REDEMPTIONS HISTORY tab to track all redemptions.  

<!-- ![Recent Changes](../../assets/img/guides_getting_started_quickstart_recent_changes_4.png "Recent Changes") -->

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/8bc30bc-recent_changes.png",
        "recent_changes.png",
        1004
      ],
      "sizing": "80"
    }
  ]
}
[/block]

To monitor and filter the list of all API calls for your project, you can go to the [Audit log](https://app.voucherify.io/#/app/core/logs):

<!-- ![Audit Log](../../assets/img/guides_getting_started_quickstart_audit_log_5.png "Audit Log") -->
![Audit Log](https://files.readme.io/1a4682c-audit_log.png "Audit Log")

## Test promo scenarios with "Hot Beans" demo store

Hot Beans simulates an ecommerce engine allowing your team to verify the look and feel of the promotion customer journey. It supports coupons (including “BLCKFRDY”) and cart-level promotions; the full list of supported scenarios can be found in the [Testing](doc:testing#test-data) section.

You can access Hot Beans directly from your Voucherify dashboard. Checkout is automatically connected to your Voucherify account, and the side panel shows all the requests sent to Voucherify API. 

Try redeeming BLCKFRDY to go through the coupon flow end-to-end (make sure “cart discounts” is disabled to unlock the coupon input).

<!-- ![Hot Beans Demo](../../assets/img/guides_getting_started_quickstart_hot_beans_demo_6.png "Hot Beans Demo") -->
![Hot Beans Demo](https://files.readme.io/16e5bf6-hot_beans.png "Hot Beans Demo")

## What's next?

The BLCKFRDY coupon redemption uses only the minimum business context (order amount). To enable advanced promotional rules, go to the [integration checklist](doc:welcome) and explore the Voucherify building blocks to learn what data you can share with Voucherify.
