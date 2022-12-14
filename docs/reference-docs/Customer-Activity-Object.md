---
title: Customer Activity Object
excerpt: Schema description
category: 636284b7e6b02c00a136e873
slug: the-customer-activities-object
parentDoc: 63990c032c817e00abdcf528
---

This is a general object which presents moments from customers' activity. Those are all types of different events that customers perform during the journey once they participate in Promotions. Those events describe moments when customers redeem coupons and earn points or rewards. The list of all types of activities is listed below.

The details describing activity are collected in a property named `data`. In this object, software integrators will find all further information explaining the event context.

TABLE

Customer Activity Object is a type of [Event](ref:the-custom-event-object)  which is our way of letting you know when something interesting happens in your project. When an interesting event concerning an individual customer occurs, we create a new Customer Activity object. For example, when a code is published to a customer, we create a `customer.publication.succeeded` event.

TABLE

```json Example Response
{
    "id": "event_Y9x2d0kte0IYgg4arcQo2x2rW0dYFW",
    "type": "customer.publication.succeeded",
    "data": {
        "campaign": {
            "id": "camp_ndaz4erJIds626zgTqqMCP4p",
            "name": "Unique Gift Card",
            "type": "AUTO_UPDATE",
            "active": true,
            "voucher": {
                "gift": {
                    "amount": 5000,
                    "balance": 5000
                },
                "type": "GIFT_VOUCHER",
                "discount": null,
                "redemption": {
                    "quantity": 1
                },
                "code_config": {
                    "length": 8,
                    "charset": "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
                    "pattern": "########"
                },
                "loyalty_card": null
            },
            "auto_join": null,
            "join_once": false,
            "lucky_draw": null,
            "campaign_type": "GIFT_VOUCHERS",
            "is_referral_code": false,
            "referral_program": null
        },
        "customer": {
            "id": "cust_U8B00DeMjOm9D1Y3JZqi5Eps",
            "name": "Jane Doe",
            "email": "jane.doe@voucherify.io",
            "object": "customer",
            "metadata": {
                "lang": "en",
                "test": true
            },
            "source_id": "test_customer_id_2"
        },
        "publication": {
            "id": "pub_8bFKw0AJl6D9kQuRUoVeOGMHMSBg8dXj",
            "object": "publication",
            "result": "SUCCESS",
            "channel": "voucherify-website",
            "voucher": {
                "code": "bzB0zHDB",
                "gift": {
                    "amount": 5000,
                    "balance": 5000
                },
                "object": "voucher",
                "campaign": "Unique Gift Card",
                "discount": null,
                "loyalty_card": null,
                "is_referral_code": false
            },
            "customer": {
                "id": "cust_U8B00DeMjOm9D1Y3JZqi5Eps",
                "object": "customer"
            },
            "metadata": {},
            "vouchers": null,
            "created_at": "2020-05-15T16:14:35.303Z",
            "customer_id": "cust_U8B00DeMjOm9D1Y3JZqi5Eps",
            "tracking_id": "test_customer_id_2",
            "failure_code": null,
            "failure_message": null
        }
    },
    "created_at": "2020-05-15T16:14:35.303Z"
}
```