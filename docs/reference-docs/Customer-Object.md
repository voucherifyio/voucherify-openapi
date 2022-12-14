---
title: Customer Object
excerpt: Schema description
category: 636284b7e6b02c00a136e873
slug: the-customer-object
parentDoc: 63990c032c817e00abdcf528
---

This entity allows you to:
* store customer details in Voucherify,
* link [redemptions](ref:the-redemption-object) and validations to a particular customer,
* build customer segments and use them in [validation rules](doc:validation-rules). 

Go to [Customers](doc:customers) to understand segmentation and tracking.

TABLE

```json Example Response
{
    "id": "cust_cwzFQcb3C5XgbgVknYPUNb1p",
    "source_id": "trackcust5432",
    "name": "Andy Tonic",
    "email": "test@voucherify.io",
    "address": {
        "city": null,
        "state": null,
        "line_1": null,
        "line_2": null,
        "country": null,
        "postal_code": null
    },
    "birthdate": "1974-07-04",
    "summary": {
        "redemptions": {
            "total_redeemed": 5,
            "total_failed": 0,
            "total_succeeded": 5,
            "total_rolled_back": 0,
            "total_rollback_failed": 0,
            "total_rollback_succeeded": 0,
            "gift": {
                "redeemed_amount": 0,
                "amount_to_go": 0
            },
            "loyalty_card": {
                "redeemed_points": 0,
                "points_to_go": 200
            }
        },
        "orders": {
            "total_amount": 148800,
            "total_count": 5,
            "average_amount": 49600,
            "last_order_amount": 0,
            "last_order_date": "2021-04-12T12:51:26Z"
        }
    },
    "loyalty": {
        "points": 340,
        "referred_customers": 1,
        "campaigns": {
            "loyalty easy": {
                "points": 200,
                "referred_customers": 0
            },
            "Loyalty Upgrade 01/2021": {
                "points": 140,
                "referred_customers": 0
            },
            "Referral campaign v_20210219": {
                "points": 0,
                "referred_customers": 1
            }
        }
    },
    "metadata": {
        "lang": "en"
    },
    "system_metadata": {
        "consents": {
            "unsubscribed": {
                "date": "2021-04-08T11:50:07.466Z",
                "value": false
            },
            "cnst_61uGQeWeTGYxQHwkt6QiF2Xe": {
                "date": "2021-04-08T11:50:07.466Z",
                "value": false
            },
            "cnst_7HDZvdVymgWhUO9nh19m1cxw": {
                "date": "2021-04-08T11:50:07.466Z",
                "value": false
            }
        }
    },
    "created_at": "2021-04-07T08:04:03Z",
    "updated_at": "2021-04-12T12:51:27Z",
    "object": "customer",
    "referrals": {
        "campaigns": [
            {
                "campaign_id": "camp_E2g0p1efx6wgpyF9Evkr5khL",
                "referrer_id": "cust_squ42iWjpBdRBMyJQre7tfLZ",
                "related_object_id": "r_oQCQjy86OIhmn8icxKUm3sFv",
                "related_object_type": "redemption",
                "date": "2021-04-16T11:49:44Z"
            }
        ],
        "total": 1
    },
    "assets": {
        "cockpit_url": "https://dev.cockpits.voucherify.io/customers?token=U2FsdGVkX1%2FUSiIJbW7IHhgYFezTdSyo%2BApQTEp%2Fx0%2BLdOjqduJXDJ1aeokHMIPCaQD8GuMzfpiCqepJ7dhHlPQphOcmh2O%2FWfwkxkn0EsG2Lst7qgQlMiPWCk3%2Fz080k66nvslYfkoglYmVhvCVUi1ncbqgUiXMzcnaN100Trb6LF2nOzYTYQMRZ8%2Fp4iY730L0WDDpskf1aDVWlDWdkQ%3D%3D"
    }
}
```