---
title: Event Object
excerpt: Schema description
category: 636284b7e6b02c00a136e873
slug: the-custom-event-object
parentDoc: 63990c8f92a8460091a88589
---

Voucherify distinguishes two types of events - custom and internal. Both are presented in the same Event structure. 

## Custom Events

Custom Events are actions taken by your customers. They’re best suited for tracking high-value customer interactions with your application. Logging a custom event can trigger any number of distributions, and enables the segmentation filters around the recency and frequency of that event.

With Custom Event metadata field, Voucherify allows you to set properties on custom events. These properties can then be used for further qualifying trigger conditions, increasing personalization in messaging, and generating more sophisticated analytics through raw data export.

The Custom Events are directly linked to the customers' resources from Voucherify. It means that each event gets a connection to a customer.

> :blue_book: An example
>
> If an e-commerce application wanted to send a message to a user when he/she abandons their cart, the custom event could additionally improve its target audience and allow for increased distribution personalization by adding a Custom Event of the `value` of customers’ order.

## Internal Voucherify Events

Moreover, Events are our way of letting you know when something interesting happens in your project. When an interesting event occurs, we create a new Event object. For example, when a redemption succeeds, we create a `redemption.succeeded` event.

Note that many API requests may cause multiple events to be created. For example, if you create a new redemption for a new customer not existing yet in Voucherify, you will receive both a `customer.created` event and a `redemption.succeeded` event.

The events occur when the state of another API resource changes and the state of that resource at the time of the change is embedded in the data field of the event.

TABLE

## Webhooks

Voucherify also has a separate system for sending the event objects directly to an endpoint at your end (server). We called that mechanism webhooks. They are managed in your project settings.

TABLE

```json Example Response
{
  "id": "event_ehkvgZFgSePlb95SH3JJulkApy9Kg9",
  "object": "event",
  "created_at": "2017-11-16T14:45:34.181Z",
  "type": "redemption.succeeded",
  "data": {
    "object": {
      "id": "r_mist0IpebikTaRdxiOGI2IhL",
      "date": "2017-11-16T14:45:32.733Z",
      "order": {
        "id": "ord_AhDlR13vQE5ino95P2NIABBN",
        "items": [
          {
            "object": "order_item",
            "sku_id": null,
            "quantity": 1,
            "source_id": null,
            "product_id": "iphone8"
          }
        ],
        "amount": 50000,
        "object": "order",
        "status": "CREATED",
        "customer": {
          "id": "cust_fJPsoub5ITJnIEVO3v9whrP9",
          "object": "customer"
        },
        "metadata": null,
        "referrer": null,
        "source_id": null,
        "created_at": "2017-11-16T14:45:32.023Z",
        "updated_at": null,
        "discount_amount": 2000
      },
      "object": "redemption",
      "result": "SUCCESS",
      "voucher": {
        "code": "2017-goX-aH",
        "gift": null,
        "type": "DISCOUNT_VOUCHER",
        "object": "voucher",
        "campaign": "SteffenTest",
        "discount": {
          "type": "AMOUNT",
          "amount_off": 2000
        },
        "is_referral_code": false
      },
      "customer": {
        "id": "cust_fJPsoub5ITJnIEVO3v9whrP9",
        "object": "customer"
      },
      "metadata": {
        "city": "London1"
      },
      "customer_id": "cust_fJPsoub5ITJnIEVO3v9whrP9",
      "tracking_id": "track_3tM7KR57bbeIRtMcvpKYr2aAOrCpYBDZ",
      "related_object_type": "voucher"
    },
    "previous_attributes": {}
  },
  "metadata": {
    "source": "API"
  }
}
```

## Customisable Campaign Events

As part of campaign creation, users can configure webhooks triggered when specific activities appear within a campaign's lifetime. Those webhooks get configurable names and the users implement them in Voucherify Dashboard as part of the campaign creation process.

This type of webhooks can be configured for the following actions:

TABLE

Payloads of customizable webhooks:

**Referral Program**

```json Referral code assigned
{
  "id": "evcus_0a26b1a5acd3437894",
  "object": "event",
  "webhook_id": null,
  "project_id": "proj_nXIkFGNmrFSf",
  "created_at": "2021-01-24T11:09:57.765Z",
  "type": "referral_code_assigned",
  "data": {
    "object": {
      "voucher": {
        "id": "v_ZlNAlSHNgK57ErFgOxAz7swPBPfMBlMp",
        "code": "xYwEheRh",
        "campaign": "Referral Webhooks",
        "campaign_id": "camp_UaT2wwkN9zQs3RiIk7H0PcBc",
        "category": null,
        "type": "DISCOUNT_VOUCHER",
        "discount": {
          "type": "AMOUNT",
          "amount_off": 1000,
          "effect": "APPLY_TO_ORDER"
        },
        "gift": null,
        "loyalty_card": null,
        "start_date": null,
        "expiration_date": null,
        "validity_timeframe": null,
        "validity_day_of_week": null,
        "active": true,
        "additional_info": null,
        "metadata": {},
        "assets": {
          "qr": {
              "id": "U2FsdGVkX19wsHlNj5GT/2Kkf/MnPKlL4WjU55GyTsmpXgw+KQOwp3ux0XzUAgsTcujC49hkjk7ony8mPL429zzWHGy/OHpvDwuY0Z6AECrqzRea81MCjkqI0gKlVEhqYWoCm7Va+MFPSHRy5tesDQ==",
              "url": "https://dl.voucherify.io/api/v1/assets/qr/U2FsdGVkX19wsHlNj5GT%2F2Kkf%2FMnPKlL4WjU55GyTsmpXgw%2BKQOwp3ux0XzUAgsTcujC49hkjk7ony8mPL429zzWHGy%2FOHpvDwuY0Z6AECrqzRea81MCjkqI0gKlVEhqYWoCm7Va%2BMFPSHRy5tesDQ%3D%3D"
          },
          "barcode": {
              "id": "U2FsdGVkX19ZgrgURtgcjD1cvt/L6wMNDySfG6AOT4NHpVJgceyuHAqJWYN3UgCn9jv8TIPtSfkNuHzI4i/UVUbmXTxDvNXsceP+nzHjmWp6fS3e7dR3SVEL3VHdSLZ1O7W9xPjRadOCGNZXPddd3w==",
              "url": "https://dl.voucherify.io/api/v1/assets/barcode/U2FsdGVkX19ZgrgURtgcjD1cvt%2FL6wMNDySfG6AOT4NHpVJgceyuHAqJWYN3UgCn9jv8TIPtSfkNuHzI4i%2FUVUbmXTxDvNXsceP%2BnzHjmWp6fS3e7dR3SVEL3VHdSLZ1O7W9xPjRadOCGNZXPddd3w%3D%3D"
          }
        },
        "is_referral_code": true,
        "created_at": "2021-11-12T11:09:57.772Z",
        "updated_at": null,
        "holder_id": "cust_laSm5Bbd6fzSgVtyKYfGot4L",
        "referrer_id": "cust_laSm5Bbd6fzSgVtyKYfGot4L",
        "redemption": {
          "quantity": null,
          "redeemed_quantity": 0,
          "object": "list",
          "url": "/v1/vouchers/xYwEheRh/redemptions?page=1&limit=10"
        },
        "publish": {
          "object": "list",
          "count": 1,
          "url": "/v1/vouchers/xYwEheRh/publications?page=1&limit=10"
        },
        "object": "voucher"
      },
      "campaign": {
        "id": "camp_UaT2wwkN9zQs3RiIk7H0PcBc",
        "name": "Referral Webhooks",
        "campaign_type": "REFERRAL_PROGRAM",
        "type": "AUTO_UPDATE",
        "voucher": {
          "type": "DISCOUNT_VOUCHER",
          "discount": {
            "type": "AMOUNT",
            "amount_off": 1000,
            "effect": "APPLY_TO_ORDER"
          },
          "gift": null,
          "loyalty_card": null,
          "redemption": {
            "quantity": null,
            "redeemed_quantity": 0
          },
          "code_config": {
            "length": 8,
            "charset": "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
            "pattern": "########",
            "prefix": "",
            "postfix": ""
          },
          "is_referral_code": true
        },
        "referral_program": {
          "conversion_event_type": "redemption"
        },
        "join_once": false,
        "use_voucher_metadata_schema": true,
        "vouchers_count": 1,
        "active": true,
        "metadata": {},
        "created_at": "2021-11-12T11:00:08.306Z",
        "updated_at": "2021-11-12T11:09:40.671Z",
        "creation_status": "DONE",
        "vouchers_generation_status": "DONE",
        "object": "campaign"
      },
      "customer": {
        "id": "cust_laSm5Bbd6fzSgVtyKYfGot4L",
        "source_id": "test_referrer__01",
        "name": "John Doe",
        "description": null,
        "email": null,
        "phone": null,
        "birthday": null,
        "birthdate": null,
        "address": null,
        "summary": {
          "redemptions": {
            "total_redeemed": 0,
            "total_failed": 0,
            "total_succeeded": 0,
            "total_rolled_back": 0,
            "total_rollback_failed": 0,
            "total_rollback_succeeded": 0
          },
          "orders": {
            "total_amount": 0,
            "total_count": 0,
            "average_amount": null,
            "last_order_amount": null,
            "last_order_date": null
          }
        },
        "loyalty": {
          "points": 0,
          "referred_customers": 0,
          "campaigns": {}
        },
        "referrals": {
          "total": 0,
          "campaigns": []
        },
        "metadata": {
          "test": true,
          "acq_channel": "Twitter"
        },
        "system_metadata": {},
        "created_at": "2021-11-12T11:09:57.749Z",
        "updated_at": "2021-11-12T11:09:58.620Z",
        "object": "customer"
      },
      "publication": {
        "id": "pub_gSpZUNX0hcDfEeRx3qIMMFrtfsZjeJO8",
        "object": "publication",
        "result": "SUCCESS",
        "channel": "API",
        "voucher": {
          "id": "v_ZlNAlSHNgK57ErFgOxAz7swPBPfMBlMp",
          "code": "xYwEheRh",
          "gift": null,
          "type": "DISCOUNT_VOUCHER",
          "active": true,
          "assets": {
            "qr": {
                "id": "U2FsdGVkX19wsHlNj5GT/2Kkf/MnPKlL4WjU55GyTsmpXgw+KQOwp3ux0XzUAgsTcujC49hkjk7ony8mPL429zzWHGy/OHpvDwuY0Z6AECrqzRea81MCjkqI0gKlVEhqYWoCm7Va+MFPSHRy5tesDQ==",
                "url": "https://dl.voucherify.io/api/v1/assets/qr/U2FsdGVkX19wsHlNj5GT%2F2Kkf%2FMnPKlL4WjU55GyTsmpXgw%2BKQOwp3ux0XzUAgsTcujC49hkjk7ony8mPL429zzWHGy%2FOHpvDwuY0Z6AECrqzRea81MCjkqI0gKlVEhqYWoCm7Va%2BMFPSHRy5tesDQ%3D%3D"
            },
            "barcode": {
                "id": "U2FsdGVkX19ZgrgURtgcjD1cvt/L6wMNDySfG6AOT4NHpVJgceyuHAqJWYN3UgCn9jv8TIPtSfkNuHzI4i/UVUbmXTxDvNXsceP+nzHjmWp6fS3e7dR3SVEL3VHdSLZ1O7W9xPjRadOCGNZXPddd3w==",
                "url": "https://dl.voucherify.io/api/v1/assets/barcode/U2FsdGVkX19ZgrgURtgcjD1cvt%2FL6wMNDySfG6AOT4NHpVJgceyuHAqJWYN3UgCn9jv8TIPtSfkNuHzI4i%2FUVUbmXTxDvNXsceP%2BnzHjmWp6fS3e7dR3SVEL3VHdSLZ1O7W9xPjRadOCGNZXPddd3w%3D%3D"
            }
          },
          "object": "voucher",
          "publish": {
            "url": "/v1/vouchers/xYwEheRh/publications?page=1&limit=10",
            "count": 1,
            "object": "list"
          },
          "campaign": "Referral Webhooks",
          "category": null,
          "discount": {
            "type": "AMOUNT",
            "effect": "APPLY_TO_ORDER",
            "amount_off": 1000
          },
          "metadata": {},
          "holder_id": "cust_laSm5Bbd6fzSgVtyKYfGot4L",
          "created_at": "2021-11-12T11:09:57.772Z",
          "redemption": {
            "url": "/v1/vouchers/xYwEheRh/redemptions?page=1&limit=10",
            "object": "list",
            "quantity": null,
            "redeemed_quantity": 0
          },
          "start_date": null,
          "updated_at": null,
          "campaign_id": "camp_UaT2wwkN9zQs3RiIk7H0PcBc",
          "referrer_id": "cust_laSm5Bbd6fzSgVtyKYfGot4L",
          "loyalty_card": null,
          "distributions": null,
          "additional_info": null,
          "expiration_date": null,
          "is_referral_code": true,
          "validity_timeframe": null,
          "validity_day_of_week": null,
          "referred_customers_count": null,
          "value": "$10.00"
        },
        "customer": {
          "id": "cust_laSm5Bbd6fzSgVtyKYfGot4L",
          "name": "John Doe",
          "email": null,
          "object": "customer",
          "metadata": {
            "test": true,
            "acq_channel": "Twitter"
          },
          "source_id": "test_referrer__01"
        },
        "metadata": {},
        "source_id": null,
        "created_at": "2021-11-12T11:09:57.765Z",
        "customer_id": "cust_laSm5Bbd6fzSgVtyKYfGot4L",
        "tracking_id": "test_referrer__01",
        "vouchers_id": [
          "v_ZlNAlSHNgK57ErFgOxAz7swPBPfMBlMp"
        ]
      }
    },
    "related_object": {
      "id": "evcus_0a26b1a5acd3437894",
      "type": "customer.publication.succeeded",
      "data": {
        "customer": {
          "id": "cust_laSm5Bbd6fzSgVtyKYfGot4L",
          "name": "John Doe",
          "email": null,
          "source_id": "test_referrer__01",
          "metadata": {
            "test": true,
            "acq_channel": "Twitter"
          },
          "object": "customer"
        },
        "campaign": {
          "id": "camp_UaT2wwkN9zQs3RiIk7H0PcBc",
          "name": "Referral Webhooks",
          "campaign_type": "REFERRAL_PROGRAM",
          "type": "AUTO_UPDATE",
          "is_referral_code": true,
          "voucher": {
            "type": "DISCOUNT_VOUCHER",
            "discount": {
              "type": "AMOUNT",
              "effect": "APPLY_TO_ORDER",
              "amount_off": 1000
            },
            "redemption": {
              "quantity": null,
              "redeemed_quantity": 0
            },
            "code_config": {
              "length": 8,
              "prefix": "",
              "charset": "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
              "pattern": "########",
              "postfix": ""
            }
          },
          "referral_program": {
            "conversion_event_type": "redemption"
          },
          "auto_join": null,
          "join_once": false,
          "active": true
        },
        "publication": {
          "id": "pub_gSpZUNX0hcDfEeRx3qIMMFrtfsZjeJO8",
          "object": "publication",
          "result": "SUCCESS",
          "channel": "API",
          "voucher": {
            "id": "v_ZlNAlSHNgK57ErFgOxAz7swPBPfMBlMp",
            "code": "xYwEheRh",
            "gift": null,
            "type": "DISCOUNT_VOUCHER",
            "active": true,
            "assets": {
              "qr": {
                  "id": "U2FsdGVkX19wsHlNj5GT/2Kkf/MnPKlL4WjU55GyTsmpXgw+KQOwp3ux0XzUAgsTcujC49hkjk7ony8mPL429zzWHGy/OHpvDwuY0Z6AECrqzRea81MCjkqI0gKlVEhqYWoCm7Va+MFPSHRy5tesDQ==",
                  "url": "https://dl.voucherify.io/api/v1/assets/qr/U2FsdGVkX19wsHlNj5GT%2F2Kkf%2FMnPKlL4WjU55GyTsmpXgw%2BKQOwp3ux0XzUAgsTcujC49hkjk7ony8mPL429zzWHGy%2FOHpvDwuY0Z6AECrqzRea81MCjkqI0gKlVEhqYWoCm7Va%2BMFPSHRy5tesDQ%3D%3D"
              },
              "barcode": {
                  "id": "U2FsdGVkX19ZgrgURtgcjD1cvt/L6wMNDySfG6AOT4NHpVJgceyuHAqJWYN3UgCn9jv8TIPtSfkNuHzI4i/UVUbmXTxDvNXsceP+nzHjmWp6fS3e7dR3SVEL3VHdSLZ1O7W9xPjRadOCGNZXPddd3w==",
                  "url": "https://dl.voucherify.io/api/v1/assets/barcode/U2FsdGVkX19ZgrgURtgcjD1cvt%2FL6wMNDySfG6AOT4NHpVJgceyuHAqJWYN3UgCn9jv8TIPtSfkNuHzI4i%2FUVUbmXTxDvNXsceP%2BnzHjmWp6fS3e7dR3SVEL3VHdSLZ1O7W9xPjRadOCGNZXPddd3w%3D%3D"
              }
            },
            "object": "voucher",
            "publish": {
              "url": "/v1/vouchers/xYwEheRh/publications?page=1&limit=10",
              "count": 1,
              "object": "list"
            },
            "campaign": "Referral Webhooks",
            "category": null,
            "discount": {
              "type": "AMOUNT",
              "effect": "APPLY_TO_ORDER",
              "amount_off": 1000
            },
            "metadata": {},
            "holder_id": "cust_laSm5Bbd6fzSgVtyKYfGot4L",
            "created_at": "2021-11-12T11:09:57.772Z",
            "redemption": {
              "url": "/v1/vouchers/xYwEheRh/redemptions?page=1&limit=10",
              "object": "list",
              "quantity": null,
              "redeemed_quantity": 0
            },
            "start_date": null,
            "updated_at": null,
            "campaign_id": "camp_UaT2wwkN9zQs3RiIk7H0PcBc",
            "referrer_id": "cust_laSm5Bbd6fzSgVtyKYfGot4L",
            "loyalty_card": null,
            "distributions": null,
            "additional_info": null,
            "expiration_date": null,
            "is_referral_code": true,
            "validity_timeframe": null,
            "validity_day_of_week": null,
            "referred_customers_count": null
          },
          "customer": {
            "id": "cust_laSm5Bbd6fzSgVtyKYfGot4L",
            "name": "John Doe",
            "email": null,
            "object": "customer",
            "metadata": {
              "test": true,
              "acq_channel": "Twitter"
            },
            "source_id": "test_referrer__01"
          },
          "metadata": {},
          "source_id": null,
          "created_at": "2021-11-12T11:09:57.765Z",
          "customer_id": "cust_laSm5Bbd6fzSgVtyKYfGot4L",
          "tracking_id": "test_referrer__01",
          "vouchers_id": [
            "v_ZlNAlSHNgK57ErFgOxAz7swPBPfMBlMp"
          ]
        }
      },
      "created_at": "2021-11-12T11:09:57.765Z"
    }
  },
  "metadata": {}
}
```
```json Referrer rewarded
{
  "id": "evcus_0a26b3e7b718c480ca",
  "object": "event",
  "webhook_id": null,
  "project_id": "proj_nXIkFGNmrFSf",
  "created_at": "2021-01-24T11:19:49.723Z",
  "type": "referrer_rewarded_webhook",
  "data": {
    "object": {
      "voucher": {
        "id": "v_2teI9HcRvdvK1RsWD6gyNztHr4SMkMDy",
        "code": "dOzJ84Ky",
        "campaign": "Bonus Cards",
        "campaign_id": "camp_yheSCBQGrgeBwGMkQqjsUW24",
        "category": null,
        "type": "GIFT_VOUCHER",
        "discount": null,
        "gift": {
          "amount": 500,
          "balance": 500
        },
        "loyalty_card": null,
        "start_date": null,
        "expiration_date": null,
        "validity_timeframe": null,
        "validity_day_of_week": null,
        "active": true,
        "additional_info": null,
        "metadata": {},
        "assets": {
          "qr": {
            "id": "U2FsdGVkX1+tdyBGQeM+ZONM/k",
            "url": "https://dl.voucherify.io/api/v1/assets/qr/U2FsdGVkX1+tdyBGQeM+ZONM/k"
          },
          "barcode": {
            "id": "U2FsdGVkX1+WOEBHpX4y",
            "url": "https://dl.voucherify.io/api/v1/assets/barcode/U2FsdGVkX1%2BWOEBHpX4y"
          }
        },
        "is_referral_code": false,
        "created_at": "2021-01-24T11:19:40.409Z",
        "updated_at": "2021-01-24T11:19:41.518Z",
        "holder_id": "cust_laSm5Bbd6fzSgVtyKYfGot4L",
        "redemption": {
          "quantity": 1,
          "redeemed_quantity": 0,
          "redeemed_amount": 0,
          "object": "list",
          "url": "/v1/vouchers/dOzJ84Ky/redemptions?page=1&limit=10"
        },
        "publish": {
          "object": "list",
          "count": 1,
          "url": "/v1/vouchers/dOzJ84Ky/publications?page=1&limit=10"
        },
        "object": "voucher"
      },
      "campaign": {
        "id": "camp_UaT2wwkN9zQs3RiIk7H0PcBc",
        "name": "Referral Webhooks",
        "campaign_type": "REFERRAL_PROGRAM",
        "type": "AUTO_UPDATE",
        "voucher": {
          "type": "DISCOUNT_VOUCHER",
          "discount": {
            "type": "AMOUNT",
            "effect": "APPLY_TO_ORDER",
            "amount_off": 1000
          },
          "redemption": {
            "quantity": null,
            "redeemed_quantity": 0
          },
          "code_config": {
            "length": 8,
            "prefix": "",
            "charset": "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
            "pattern": "########",
            "postfix": ""
          },
          "is_referral_code": true
        },
        "referral_program": {
          "conversion_event_type": "redemption"
        },
        "join_once": false,
        "vouchers_count": 0,
        "active": true,
        "object": "campaign"
      },
      "customer": {
        "id": "cust_laSm5Bbd6fzSgVtyKYfGot4L",
        "source_id": "test_referrer__01",
        "name": "John Doe",
        "description": null,
        "email": null,
        "phone": null,
        "birthday": null,
        "birthdate": null,
        "address": null,
        "summary": {
          "redemptions": {
            "total_redeemed": 0,
            "total_failed": 0,
            "total_succeeded": 0,
            "total_rolled_back": 0,
            "total_rollback_failed": 0,
            "total_rollback_succeeded": 0
          },
          "orders": {
            "total_amount": 0,
            "total_count": 0,
            "average_amount": null,
            "last_order_amount": null
          }
        },
        "loyalty": {
          "points": 0,
          "referred_customers": 1,
          "campaigns": {
            "Referral Webhooks": {
              "points": 0,
              "referred_customers": 1
            }
          }
        },
        "referrals": {
          "total": 0,
          "campaigns": []
        },
        "metadata": {
          "test": true,
          "acq_channel": "Twitter"
        },
        "system_metadata": {},
        "created_at": "2021-01-24T11:09:57.749Z",
        "updated_at": "2021-01-24T11:19:41.513Z",
        "object": "customer"
      },
      "publication": {
        "id": "pub_9Y7nwUx3BaU3cHqBVbd0TEtS2ENiFZhJ",
        "created_at": "2021-01-24T11:19:40.317Z",
        "customer_id": "cust_laSm5Bbd6fzSgVtyKYfGot4L",
        "customer": {
          "id": "cust_laSm5Bbd6fzSgVtyKYfGot4L",
          "name": "John Doe",
          "email": null,
          "source_id": "test_referrer__01",
          "metadata": {
            "test": true,
            "acq_channel": "Twitter"
          },
          "object": "customer"
        },
        "tracking_id": "test_referrer__01",
        "metadata": {},
        "channel": "Automation",
        "source_id": null,
        "result": "SUCCESS",
        "voucher_code": "dOzJ84Ky",
        "vouchers": [
          {
            "id": "v_2teI9HcRvdvK1RsWD6gyNztHr4SMkMDy",
            "code": "dOzJ84Ky",
            "campaign": "Bonus Cards",
            "campaign_id": "camp_yheSCBQGrgeBwGMkQqjsUW24",
            "category": null,
            "type": "GIFT_VOUCHER",
            "discount": null,
            "gift": {
              "amount": 500,
              "balance": 500
            },
            "loyalty_card": null,
            "start_date": null,
            "expiration_date": null,
            "validity_timeframe": null,
            "validity_day_of_week": null,
            "active": true,
            "additional_info": null,
            "metadata": {},
            "assets": {
              "qr": {
                "id": "U2FsdGVkX1+tdyBGQeM+ZONM/kBdZ",
                "url": "https://dl.voucherify.io/api/v1/assets/qr/U2FsdGVkX1%2BtdyBGQeM%2BZONM%2FkBdZ"
              },
              "barcode": {
                "id": "U2FsdGVkX1+WOEBHpX4y",
                "url": "https://dl.voucherify.io/api/v1/assets/barcode/U2FsdGVkX1%2BWOEBHpX4y"
              }
            },
            "is_referral_code": false,
            "created_at": "2021-01-24T11:19:40.409Z",
            "updated_at": "2021-01-24T11:19:41.518Z",
            "holder_id": "cust_laSm5Bbd6fzSgVtyKYfGot4L",
            "object": "voucher",
            "distributions": null,
            "publish": {
              "object": "list",
              "count": 1,
              "url": "/v1/vouchers/dOzJ84Ky/publications?page=1&limit=10"
            },
            "redemption": {
              "quantity": 1,
              "redeemed_quantity": 0,
              "redeemed_amount": 0,
              "object": "list",
              "url": "/v1/vouchers/dOzJ84Ky/redemptions?page=1&limit=10"
            }
          }
        ],
        "vouchers_id": [
          "v_2teI9HcRvdvK1RsWD6gyNztHr4SMkMDy"
        ],
        "campaign_name": "Bonus Cards",
        "gift": {
          "amount": 0,
          "balance": 0
        },
        "loyalty_card": null,
        "discount": null,
        "is_referral_code": false,
        "failure_code": null,
        "failure_message": null,
        "voucher": null
      }
    },
    "related_object": {
      "id": "evcus_0a26b3e7b718c480ca",
      "type": "customer.reward_redemptions.completed",
      "data": {
        "customer": {
          "id": "cust_laSm5Bbd6fzSgVtyKYfGot4L",
          "name": "John Doe",
          "email": null,
          "source_id": "test_referrer__01",
          "metadata": {
            "test": true,
            "acq_channel": "Twitter"
          },
          "object": "customer"
        },
        "holder": {
          "id": "cust_laSm5Bbd6fzSgVtyKYfGot4L",
          "name": "John Doe",
          "email": null,
          "source_id": "test_referrer__01",
          "metadata": {
            "test": true,
            "acq_channel": "Twitter"
          },
          "object": "customer"
        },
        "voucher": {
          "id": "v_ZlNAlSHNgK57ErFgOxAz7swPBPfMBlMp",
          "code": "xYwEheRh",
          "discount": {
            "type": "AMOUNT",
            "amount_off": 1000,
            "effect": "APPLY_TO_ORDER"
          },
          "type": "DISCOUNT_VOUCHER",
          "campaign": "Referral Webhooks",
          "campaign_id": "camp_UaT2wwkN9zQs3RiIk7H0PcBc",
          "is_referral_code": true,
          "holder_id": "cust_laSm5Bbd6fzSgVtyKYfGot4L",
          "referrer_id": "cust_laSm5Bbd6fzSgVtyKYfGot4L"
        },
        "campaign": {
          "id": "camp_UaT2wwkN9zQs3RiIk7H0PcBc",
          "name": "Referral Webhooks",
          "campaign_type": "REFERRAL_PROGRAM",
          "type": "AUTO_UPDATE",
          "is_referral_code": true,
          "voucher": {
            "type": "DISCOUNT_VOUCHER",
            "discount": {
              "type": "AMOUNT",
              "effect": "APPLY_TO_ORDER",
              "amount_off": 1000
            },
            "redemption": {
              "quantity": null,
              "redeemed_quantity": 0
            },
            "code_config": {
              "length": 8,
              "prefix": "",
              "charset": "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
              "pattern": "########",
              "postfix": ""
            }
          },
          "referral_program": {
            "conversion_event_type": "redemption"
          },
          "auto_join": null,
          "join_once": false,
          "active": true
        },
        "reward_redemption": {
          "id": "rewr_Fuzc1rngCCuKRDfBXBjUwl5j",
          "state": "COMPLETED",
          "created_at": "2021-01-24T11:19:43.883Z",
          "updated_at": null,
          "voucher_id": "v_ZlNAlSHNgK57ErFgOxAz7swPBPfMBlMp",
          "campaign_id": "camp_UaT2wwkN9zQs3RiIk7H0PcBc",
          "customer_id": "cust_laSm5Bbd6fzSgVtyKYfGot4L",
          "reward_assignment_id": "rewa_9FxFsy0M5UYc8jWjNrlSBWtG",
          "source_id": "event_0a26b3d269013fc79e",
          "source_type": "redemption_event"
        },
        "reward": {
          "assignment_id": "rewa_9FxFsy0M5UYc8jWjNrlSBWtG",
          "voucher": {
            "id": "v_2teI9HcRvdvK1RsWD6gyNztHr4SMkMDy",
            "code": "dOzJ84Ky",
            "gift": {
              "amount": 500,
              "balance": 500
            },
            "type": "GIFT_VOUCHER",
            "campaign": "Bonus Cards",
            "campaign_id": "camp_yheSCBQGrgeBwGMkQqjsUW24",
            "is_referral_code": false,
            "holder_id": "cust_laSm5Bbd6fzSgVtyKYfGot4L"
          },
          "id": "rew_e5taIjbo05k2vODIJtZ7mGED",
          "object": "reward",
          "name": "Credits - 5$",
          "type": "CAMPAIGN"
        },
        "reward_assignment": {
          "id": "rewa_9FxFsy0M5UYc8jWjNrlSBWtG",
          "reward_id": "rew_e5taIjbo05k2vODIJtZ7mGED",
          "related_object_id": "rrt_NWk1WYi1sZs3Epjvvd5a9JZx",
          "related_object_type": "referral_tier",
          "created_at": "2021-01-24T11:00:08.471Z",
          "updated_at": null,
          "object": "reward_assignment"
        },
        "source": {
          "id": "event_0a26b3d269013fc79e",
          "type": "redemption_event"
        },
        "balance": {
          "amount": 500
        }
      },
      "created_at": "2021-01-24T11:19:49.723Z"
    }
  },
  "metadata": {}
}
```
```json Customer rewarded
{
  "id": "event_0a26b3d893cc3ac160",
  "object": "event",
  "webhook_id": null,
  "project_id": "proj_nXIkFGNmrFSf",
  "created_at": "2021-01-24T11:19:41.101Z",
  "type": "referee_invited",
  "data": {
    "object": {
      "order": {},
      "campaign": {
        "object": "campaign",
        "id": "camp_UaT2wwkN9zQs3RiIk7H0PcBc",
        "name": "Referral Webhooks",
        "campaign_type": "REFERRAL_PROGRAM",
        "type": "AUTO_UPDATE",
        "description": null,
        "start_date": null,
        "expiration_date": null,
        "validity_timeframe": null,
        "validity_day_of_week": null,
        "activity_duration_after_publishing": null,
        "vouchers_count": 0,
        "updated_at": "2021-01-24T11:09:40.671Z",
        "created_at": "2021-01-24T11:00:08.306Z",
        "active": true,
        "metadata": {},
        "vouchers_generation_status": "DONE",
        "category": null,
        "voucher": {
          "type": "DISCOUNT_VOUCHER",
          "discount": {
            "type": "AMOUNT",
            "effect": "APPLY_TO_ORDER",
            "amount_off": 1000
          },
          "gift": null,
          "loyalty_card": null,
          "redemption": {
            "quantity": null
          },
          "code_config": {
            "length": 8,
            "charset": "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
            "pattern": "########"
          }
        },
        "referral_program": {
          "conversion_event_type": "redemption"
        },
        "lucky_draw": null
      },
      "customer": {
        "id": "cust_BfTxUsoofap6Sb6oxG1BLCi5",
        "source_id": "referred_001",
        "name": null,
        "description": null,
        "email": null,
        "phone": null,
        "birthday": null,
        "birthdate": null,
        "address": null,
        "summary": {
          "redemptions": {
            "total_redeemed": 0,
            "total_failed": 0,
            "total_succeeded": 0,
            "total_rolled_back": 0,
            "total_rollback_failed": 0,
            "total_rollback_succeeded": 0,
            "gift": {
              "redeemed_amount": 0,
              "amount_to_go": 0
            },
            "loyalty_card": {
              "redeemed_points": 0,
              "points_to_go": 0
            }
          },
          "orders": {
            "total_amount": 25000,
            "total_count": 1,
            "average_amount": 25000,
            "last_order_amount": 25000,
            "last_order_date": "2021-01-24T11:19:28.598Z"
          }
        },
        "loyalty": {
          "points": 0,
          "referred_customers": 0,
          "campaigns": {}
        },
        "metadata": {
          "vip": true
        },
        "system_metadata": {},
        "created_at": "2021-01-24T11:19:27.844Z",
        "updated_at": "2021-01-24T11:19:28.926Z",
        "email_unsubscribed": false,
        "referrals": {
          "total": 0,
          "campaigns": []
        },
        "object": "customer"
      }
    },
    "related_object": {
      "id": "event_0a26b3d893cc3ac160",
      "type": "customer.referred",
      "created_at": "2021-01-24T11:19:34.223Z",
      "data_json": {
        "object": {
          "id": "cust_BfTxUsoofap6Sb6oxG1BLCi5",
          "source_id": "referred_001",
          "name": null,
          "description": null,
          "email": null,
          "phone": null,
          "birthday": null,
          "birthdate": null,
          "address": null,
          "summary": {
            "redemptions": {
              "total_redeemed": 0,
              "total_failed": 0,
              "total_succeeded": 0,
              "total_rolled_back": 0,
              "total_rollback_failed": 0,
              "total_rollback_succeeded": 0,
              "gift": {
                "redeemed_amount": 0,
                "amount_to_go": 0
              },
              "loyalty_card": {
                "redeemed_points": 0,
                "points_to_go": 0
              }
            },
            "orders": {
              "total_amount": 25000,
              "total_count": 1,
              "average_amount": 25000,
              "last_order_amount": 25000,
              "last_order_date": "2021-01-24T11:19:28.598Z"
            }
          },
          "loyalty": {
            "points": 0,
            "referred_customers": 0,
            "campaigns": {}
          },
          "metadata": {
            "vip": true
          },
          "system_metadata": {},
          "created_at": "2021-01-24T11:19:27.844Z",
          "updated_at": "2021-01-24T11:19:28.926Z",
          "email_unsubscribed": false,
          "referrals": {
            "total": 0,
            "campaigns": []
          },
          "object": "customer"
        },
        "previous_attributes": {},
        "related_object": {}
      },
      "metadata_json": {
        "is_rewarded": true,
        "source": null
      },
      "automation_id": null,
      "group_id": "v-0a26b3d24b032c4871"
    }
  },
  "metadata": {}
}
```

**Loyalty Campaign**

```json Loyalty card assigned
{
  "id": "evcus_0a26b89763051ed721",
  "object": "event",
  "webhook_id": null,
  "project_id": "proj_nXIkFGNmrFSf",
  "created_at": "2021-11-12T11:40:18.125Z",
  "type": "loyalty_code_assigned",
  "data": {
    "object": {
      "voucher": {
        "id": "v_CGrEQ778F6kLkgktg9xCyzvoMjzTcwbU",
        "code": "qjvEslzU",
        "campaign": "Loyalty Webhooks",
        "campaign_id": "camp_iQgR6PmpF3D5H22OcNcRUU0f",
        "category": null,
        "type": "LOYALTY_CARD",
        "discount": null,
        "gift": null,
        "loyalty_card": {
          "points": 0,
          "balance": 0
        },
        "start_date": null,
        "expiration_date": null,
        "validity_timeframe": null,
        "validity_day_of_week": null,
        "active": true,
        "additional_info": null,
        "metadata": {},
        "assets": {
          "qr": {
              "id": "U2FsdGVkX186jVQjLtmZYQOPrfFKy9deofCfaFP8VhVe0TTOFxTfEp2zjF3mnS3cvUuB3MkpJDNAvMKNJotHJMUla555NQ8ZBFXSW2fAXBiP997Zf/oALLiIGjqo5LTFtedHUTNq5IQ9XgvwgPJBLg==",
              "url": "https://dl.voucherify.io/api/v1/assets/qr/U2FsdGVkX186jVQjLtmZYQOPrfFKy9deofCfaFP8VhVe0TTOFxTfEp2zjF3mnS3cvUuB3MkpJDNAvMKNJotHJMUla555NQ8ZBFXSW2fAXBiP997Zf%2FoALLiIGjqo5LTFtedHUTNq5IQ9XgvwgPJBLg%3D%3D"
          },
          "barcode": {
              "id": "U2FsdGVkX1/ICHe/XvFeZfl2koGimwFH3D4ha4nTSbCzoIdbmxzXYKESU+S0A4SpuuDsMXXotf/AOO1kdii3o99cHExXipCGBlHaduIu64ogx4oyA9w4P3nmkZ2Nv6aLukBaVd969i5Gylp0GW71sA==",
              "url": "https://dl.voucherify.io/api/v1/assets/barcode/U2FsdGVkX1%2FICHe%2FXvFeZfl2koGimwFH3D4ha4nTSbCzoIdbmxzXYKESU%2BS0A4SpuuDsMXXotf%2FAOO1kdii3o99cHExXipCGBlHaduIu64ogx4oyA9w4P3nmkZ2Nv6aLukBaVd969i5Gylp0GW71sA%3D%3D"
          }
        },
        "is_referral_code": false,
        "created_at": "2021-11-12T11:40:18.138Z",
        "updated_at": null,
        "holder_id": "cust_vfkFOr6pMg3MZAHcd7J8Hch7",
        "redemption": {
          "quantity": null,
          "redeemed_quantity": 0,
          "redeemed_points": 0,
          "object": "list",
          "url": "/v1/vouchers/qjvEslzU/redemptions?page=1&limit=10"
        },
        "publish": {
          "object": "list",
          "count": 1,
          "url": "/v1/vouchers/qjvEslzU/publications?page=1&limit=10"
        },
        "object": "voucher"
      },
      "campaign": {
        "id": "camp_iQgR6PmpF3D5H22OcNcRUU0f",
        "name": "Loyalty Webhooks",
        "campaign_type": "LOYALTY_PROGRAM",
        "type": "AUTO_UPDATE",
        "voucher": {
          "type": "LOYALTY_CARD",
          "discount": null,
          "gift": null,
          "loyalty_card": {
            "points": 0,
            "balance": 0
          },
          "redemption": {
            "quantity": null,
            "redeemed_quantity": 0
          },
          "code_config": {
            "length": 8,
            "charset": "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
            "pattern": "########",
            "prefix": "",
            "postfix": ""
          },
          "is_referral_code": false
        },
        "auto_join": false,
        "join_once": false,
        "use_voucher_metadata_schema": true,
        "vouchers_count": 0,
        "active": true,
        "metadata": {},
        "created_at": "2021-11-12T11:39:05.254Z",
        "creation_status": "DONE",
        "vouchers_generation_status": "DONE",
        "object": "campaign"
      },
      "customer": {
        "id": "cust_vfkFOr6pMg3MZAHcd7J8Hch7",
        "source_id": "Loyal_customer__01",
        "name": "John Doe",
        "description": null,
        "email": null,
        "phone": null,
        "birthday": null,
        "birthdate": null,
        "address": null,
        "summary": {
          "redemptions": {
            "total_redeemed": 0,
            "total_failed": 0,
            "total_succeeded": 0,
            "total_rolled_back": 0,
            "total_rollback_failed": 0,
            "total_rollback_succeeded": 0
          },
          "orders": {
            "total_amount": 0,
            "total_count": 0,
            "average_amount": null,
            "last_order_amount": null
          }
        },
        "loyalty": {
          "points": 0,
          "referred_customers": 0,
          "campaigns": {}
        },
        "referrals": {
          "total": 0,
          "campaigns": []
        },
        "metadata": {
          "test": true,
          "acq_channel": "Twitter"
        },
        "system_metadata": {},
        "created_at": "2021-11-12T11:40:18.077Z",
        "updated_at": "2021-11-12T11:40:19.724Z",
        "object": "customer"
      },
      "publication": {
        "id": "pub_ZAS0kZMqzF8LG5y55nx6dHMx2GkVPmxP",
        "object": "publication",
        "result": "SUCCESS",
        "channel": "API",
        "voucher": {
          "id": "v_CGrEQ778F6kLkgktg9xCyzvoMjzTcwbU",
          "code": "qjvEslzU",
          "gift": null,
          "type": "LOYALTY_CARD",
          "active": true,
          "assets": {
            "qr": {
                "id": "U2FsdGVkX186jVQjLtmZYQOPrfFKy9deofCfaFP8VhVe0TTOFxTfEp2zjF3mnS3cvUuB3MkpJDNAvMKNJotHJMUla555NQ8ZBFXSW2fAXBiP997Zf/oALLiIGjqo5LTFtedHUTNq5IQ9XgvwgPJBLg==",
                "url": "https://dl.voucherify.io/api/v1/assets/qr/U2FsdGVkX186jVQjLtmZYQOPrfFKy9deofCfaFP8VhVe0TTOFxTfEp2zjF3mnS3cvUuB3MkpJDNAvMKNJotHJMUla555NQ8ZBFXSW2fAXBiP997Zf%2FoALLiIGjqo5LTFtedHUTNq5IQ9XgvwgPJBLg%3D%3D"
            },
            "barcode": {
                "id": "U2FsdGVkX1/ICHe/XvFeZfl2koGimwFH3D4ha4nTSbCzoIdbmxzXYKESU+S0A4SpuuDsMXXotf/AOO1kdii3o99cHExXipCGBlHaduIu64ogx4oyA9w4P3nmkZ2Nv6aLukBaVd969i5Gylp0GW71sA==",
                "url": "https://dl.voucherify.io/api/v1/assets/barcode/U2FsdGVkX1%2FICHe%2FXvFeZfl2koGimwFH3D4ha4nTSbCzoIdbmxzXYKESU%2BS0A4SpuuDsMXXotf%2FAOO1kdii3o99cHExXipCGBlHaduIu64ogx4oyA9w4P3nmkZ2Nv6aLukBaVd969i5Gylp0GW71sA%3D%3D"
            }
          },
          "object": "voucher",
          "publish": {
            "url": "/v1/vouchers/qjvEslzU/publications?page=1&limit=10",
            "count": 1,
            "object": "list"
          },
          "campaign": "Loyalty Webhooks",
          "category": null,
          "discount": null,
          "metadata": {},
          "holder_id": "cust_vfkFOr6pMg3MZAHcd7J8Hch7",
          "created_at": "2021-11-12T11:40:18.138Z",
          "redemption": {
            "url": "/v1/vouchers/qjvEslzU/redemptions?page=1&limit=10",
            "object": "list",
            "quantity": null,
            "redeemed_points": 0,
            "redeemed_quantity": 0
          },
          "start_date": null,
          "updated_at": null,
          "campaign_id": "camp_iQgR6PmpF3D5H22OcNcRUU0f",
          "loyalty_card": {
            "points": 0,
            "balance": 0
          },
          "distributions": null,
          "additional_info": null,
          "expiration_date": null,
          "is_referral_code": false,
          "validity_timeframe": null,
          "validity_day_of_week": null,
          "value": 0
        },
        "customer": {
          "id": "cust_vfkFOr6pMg3MZAHcd7J8Hch7",
          "name": "John Doe",
          "email": null,
          "object": "customer",
          "metadata": {
            "test": true,
            "acq_channel": "Twitter"
          },
          "source_id": "Loyal_customer__01"
        },
        "metadata": {},
        "source_id": null,
        "created_at": "2021-11-12T11:40:18.125Z",
        "customer_id": "cust_vfkFOr6pMg3MZAHcd7J8Hch7",
        "tracking_id": "Loyal_customer__01",
        "vouchers_id": [
          "v_CGrEQ778F6kLkgktg9xCyzvoMjzTcwbU"
        ]
      }
    },
    "related_object": {
      "id": "evcus_0a26b89763051ed721",
      "type": "customer.publication.succeeded",
      "data": {
        "customer": {
          "id": "cust_vfkFOr6pMg3MZAHcd7J8Hch7",
          "name": "John Doe",
          "email": null,
          "source_id": "Loyal_customer__01",
          "metadata": {
            "test": true,
            "acq_channel": "Twitter"
          },
          "object": "customer"
        },
        "campaign": {
          "id": "camp_iQgR6PmpF3D5H22OcNcRUU0f",
          "name": "Loyalty Webhooks",
          "campaign_type": "LOYALTY_PROGRAM",
          "type": "AUTO_UPDATE",
          "is_referral_code": false,
          "voucher": {
            "type": "LOYALTY_CARD",
            "loyalty_card": {
              "points": 0,
              "balance": 0
            },
            "redemption": {
              "quantity": null,
              "redeemed_quantity": 0
            },
            "code_config": {
              "length": 8,
              "prefix": "",
              "charset": "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
              "pattern": "########",
              "postfix": ""
            }
          },
          "auto_join": false,
          "join_once": false,
          "active": true
        },
        "publication": {
          "id": "pub_ZAS0kZMqzF8LG5y55nx6dHMx2GkVPmxP",
          "object": "publication",
          "result": "SUCCESS",
          "channel": "API",
          "voucher": {
            "id": "v_CGrEQ778F6kLkgktg9xCyzvoMjzTcwbU",
            "code": "qjvEslzU",
            "gift": null,
            "type": "LOYALTY_CARD",
            "active": true,
            "assets": {
              "qr": {
                  "id": "U2FsdGVkX186jVQjLtmZYQOPrfFKy9deofCfaFP8VhVe0TTOFxTfEp2zjF3mnS3cvUuB3MkpJDNAvMKNJotHJMUla555NQ8ZBFXSW2fAXBiP997Zf/oALLiIGjqo5LTFtedHUTNq5IQ9XgvwgPJBLg==",
                  "url": "https://dl.voucherify.io/api/v1/assets/qr/U2FsdGVkX186jVQjLtmZYQOPrfFKy9deofCfaFP8VhVe0TTOFxTfEp2zjF3mnS3cvUuB3MkpJDNAvMKNJotHJMUla555NQ8ZBFXSW2fAXBiP997Zf%2FoALLiIGjqo5LTFtedHUTNq5IQ9XgvwgPJBLg%3D%3D"
              },
              "barcode": {
                  "id": "U2FsdGVkX1/ICHe/XvFeZfl2koGimwFH3D4ha4nTSbCzoIdbmxzXYKESU+S0A4SpuuDsMXXotf/AOO1kdii3o99cHExXipCGBlHaduIu64ogx4oyA9w4P3nmkZ2Nv6aLukBaVd969i5Gylp0GW71sA==",
                  "url": "https://dl.voucherify.io/api/v1/assets/barcode/U2FsdGVkX1%2FICHe%2FXvFeZfl2koGimwFH3D4ha4nTSbCzoIdbmxzXYKESU%2BS0A4SpuuDsMXXotf%2FAOO1kdii3o99cHExXipCGBlHaduIu64ogx4oyA9w4P3nmkZ2Nv6aLukBaVd969i5Gylp0GW71sA%3D%3D"
              }
            },
            "object": "voucher",
            "publish": {
              "url": "/v1/vouchers/qjvEslzU/publications?page=1&limit=10",
              "count": 1,
              "object": "list"
            },
            "campaign": "Loyalty Webhooks",
            "category": null,
            "discount": null,
            "metadata": {},
            "holder_id": "cust_vfkFOr6pMg3MZAHcd7J8Hch7",
            "created_at": "2021-11-12T11:40:18.138Z",
            "redemption": {
              "url": "/v1/vouchers/qjvEslzU/redemptions?page=1&limit=10",
              "object": "list",
              "quantity": null,
              "redeemed_points": 0,
              "redeemed_quantity": 0
            },
            "start_date": null,
            "updated_at": null,
            "campaign_id": "camp_iQgR6PmpF3D5H22OcNcRUU0f",
            "loyalty_card": {
              "points": 0,
              "balance": 0
            },
            "distributions": null,
            "additional_info": null,
            "expiration_date": null,
            "is_referral_code": false,
            "validity_timeframe": null,
            "validity_day_of_week": null
          },
          "customer": {
            "id": "cust_vfkFOr6pMg3MZAHcd7J8Hch7",
            "name": "John Doe",
            "email": null,
            "object": "customer",
            "metadata": {
              "test": true,
              "acq_channel": "Twitter"
            },
            "source_id": "Loyal_customer__01"
          },
          "metadata": {},
          "source_id": null,
          "created_at": "2021-11-12T11:40:18.125Z",
          "customer_id": "cust_vfkFOr6pMg3MZAHcd7J8Hch7",
          "tracking_id": "Loyal_customer__01",
          "vouchers_id": [
            "v_CGrEQ778F6kLkgktg9xCyzvoMjzTcwbU"
          ]
        }
      },
      "created_at": "2021-11-12T11:40:18.125Z"
    }
  },
  "metadata": {}
}
```
```json Points earned
 {
   "id": "event_0a26b9290fc4891587",
   "object": "event",
   "webhook_id": null,
   "project_id": "proj_nXIkFGNmrFSf",
   "created_at": "2021-11-12T11:42:51.380Z",
   "type": "points_earned",
   "data": {
     "object": {
       "order": {},
       "voucher": {
         "id": "v_CGrEQ778F6kLkgktg9xCyzvoMjzTcwbU",
         "code": "qjvEslzU",
         "campaign": "Loyalty Webhooks",
         "campaign_id": "camp_iQgR6PmpF3D5H22OcNcRUU0f",
         "category": null,
         "type": "LOYALTY_CARD",
         "discount": null,
         "gift": null,
         "loyalty_card": {
           "points": 220,
           "balance": 220
         },
         "start_date": null,
         "expiration_date": null,
         "validity_timeframe": null,
         "validity_day_of_week": null,
         "active": true,
         "additional_info": null,
         "metadata": {},
         "assets": {
           "qr": {
              "id": "U2FsdGVkX186jVQjLtmZYQOPrfFKy9deofCfaFP8VhVe0TTOFxTfEp2zjF3mnS3cvUuB3MkpJDNAvMKNJotHJMUla555NQ8ZBFXSW2fAXBiP997Zf/oALLiIGjqo5LTFtedHUTNq5IQ9XgvwgPJBLg==",
              "url": "https://dl.voucherify.io/api/v1/assets/qr/U2FsdGVkX186jVQjLtmZYQOPrfFKy9deofCfaFP8VhVe0TTOFxTfEp2zjF3mnS3cvUuB3MkpJDNAvMKNJotHJMUla555NQ8ZBFXSW2fAXBiP997Zf%2FoALLiIGjqo5LTFtedHUTNq5IQ9XgvwgPJBLg%3D%3D"
           },
           "barcode": {
              "id": "U2FsdGVkX1/ICHe/XvFeZfl2koGimwFH3D4ha4nTSbCzoIdbmxzXYKESU+S0A4SpuuDsMXXotf/AOO1kdii3o99cHExXipCGBlHaduIu64ogx4oyA9w4P3nmkZ2Nv6aLukBaVd969i5Gylp0GW71sA==",
              "url": "https://dl.voucherify.io/api/v1/assets/barcode/U2FsdGVkX1%2FICHe%2FXvFeZfl2koGimwFH3D4ha4nTSbCzoIdbmxzXYKESU%2BS0A4SpuuDsMXXotf%2FAOO1kdii3o99cHExXipCGBlHaduIu64ogx4oyA9w4P3nmkZ2Nv6aLukBaVd969i5Gylp0GW71sA%3D%3D"
           }
         },
         "is_referral_code": false,
         "created_at": "2021-11-12T11:40:18.138Z",
         "updated_at": "2021-11-12T11:42:50.332Z",
         "holder_id": "cust_vfkFOr6pMg3MZAHcd7J8Hch7",
         "object": "voucher",
         "distributions": {
           "distr_naR4rx0AgM1baWZkFm1kfHn7A9": {
             "date": "2021-11-12T11:40:21.957Z"
           },
           "distr_pnfPKLDAxUpiPi3ZsuMrygtYNN": {
             "date": "2021-11-12T11:42:50.332Z"
           }
         },
         "publish": {
           "object": "list",
           "count": 1,
           "url": "/v1/vouchers/qjvEslzU/publications?page=1&limit=10"
         },
         "redemption": {
           "quantity": null,
           "redeemed_quantity": 0,
           "redeemed_points": 0,
           "object": "list",
           "url": "/v1/vouchers/qjvEslzU/redemptions?page=1&limit=10"
         }
       },
       "campaign": {
         "object": "campaign",
         "id": "camp_iQgR6PmpF3D5H22OcNcRUU0f",
         "name": "Loyalty Webhooks",
         "campaign_type": "LOYALTY_PROGRAM",
         "type": "AUTO_UPDATE",
         "description": null,
         "start_date": null,
         "expiration_date": null,
         "validity_timeframe": null,
         "validity_day_of_week": null,
         "activity_duration_after_publishing": null,
         "vouchers_count": 0,
         "updated_at": null,
         "created_at": "2021-11-12T11:39:05.254Z",
         "active": true,
         "metadata": {},
         "vouchers_generation_status": "DONE",
         "category": null,
         "voucher": {
           "type": "LOYALTY_CARD",
           "discount": null,
           "gift": null,
           "loyalty_card": {
             "points": 0,
             "balance": 0
           },
           "redemption": {
             "quantity": null
           },
           "code_config": {
             "length": 8,
             "charset": "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
             "pattern": "########"
           }
         },
         "referral_program": null,
         "lucky_draw": null
       },
       "customer": {
         "id": "cust_vfkFOr6pMg3MZAHcd7J8Hch7",
         "source_id": "Loyal_customer__01",
         "name": "John Doe",
         "description": null,
         "email": null,
         "phone": null,
         "birthday": null,
         "birthdate": null,
         "address": null,
         "summary": {
           "redemptions": {
             "total_redeemed": 0,
             "total_failed": 0,
             "total_succeeded": 0,
             "total_rolled_back": 0,
             "total_rollback_failed": 0,
             "total_rollback_succeeded": 0,
             "gift": {
               "redeemed_amount": 0,
               "amount_to_go": 0
             },
             "loyalty_card": {
               "redeemed_points": 0,
               "points_to_go": 220
             }
           },
           "orders": {
             "total_amount": 22000,
             "total_count": 1,
             "average_amount": 22000,
             "last_order_amount": 22000,
             "last_order_date": "2021-11-12T11:42:39.633Z"
           }
         },
         "loyalty": {
           "points": 220,
           "referred_customers": 0,
           "campaigns": {
             "Loyalty Webhooks": {
               "points": 220,
               "referred_customers": 0
             }
           }
         },
         "metadata": {
           "test": true,
           "acq_channel": "Twitter"
         },
         "system_metadata": {},
         "created_at": "2021-11-12T11:40:18.077Z",
         "updated_at": "2021-11-12T11:42:47.393Z",
         "email_unsubscribed": false,
         "referrals": {
           "total": 0,
           "campaigns": []
         },
         "object": "customer"
       }
     },
     "related_object": {
       "id": "event_0a26b9290fc4891587",
       "type": "customer.rewarded.loyalty_points",
       "created_at": "2021-11-12T11:42:47.359Z",
       "data_json": {
         "object": {
           "id": "cust_vfkFOr6pMg3MZAHcd7J8Hch7",
           "source_id": "Loyal_customer__01",
           "name": "John Doe",
           "description": null,
           "email": null,
           "phone": null,
           "birthday": null,
           "birthdate": null,
           "address": null,
           "summary": {
             "redemptions": {
               "total_redeemed": 0,
               "total_failed": 0,
               "total_succeeded": 0,
               "total_rolled_back": 0,
               "total_rollback_failed": 0,
               "total_rollback_succeeded": 0,
               "gift": {
                 "redeemed_amount": 0,
                 "amount_to_go": 0
               },
               "loyalty_card": {
                 "redeemed_points": 0,
                 "points_to_go": 0
               }
             },
             "orders": {
               "total_amount": 22000,
               "total_count": 1,
               "average_amount": 22000,
               "last_order_amount": 22000,
               "last_order_date": "2021-11-12T11:42:39.633Z"
             }
           },
           "loyalty": {
             "points": 0,
             "referred_customers": 0,
             "campaigns": {
               "Loyalty Webhooks": {
                 "points": 0,
                 "referred_customers": 0
               }
             }
           },
           "metadata": {
             "test": true,
             "acq_channel": "Twitter"
           },
           "system_metadata": {},
           "created_at": "2021-11-12T11:40:18.077Z",
           "updated_at": "2021-11-12T11:42:40.635Z",
           "email_unsubscribed": false,
           "referrals": {
             "total": 0,
             "campaigns": []
           },
           "object": "customer"
         },
         "previous_attributes": {},
         "related_object": {
           "points": 220,
           "total": 220,
           "balance": 220,
           "type": "loyalty_card",
           "object": "balance",
           "related_object": {
             "type": "voucher",
             "id": "v_CGrEQ778F6kLkgktg9xCyzvoMjzTcwbU"
           }
         },
         "balance": {
           "points": 220,
           "total": 220,
           "balance": 220,
           "type": "loyalty_card",
           "object": "balance",
           "related_object": {
             "type": "voucher",
             "id": "v_CGrEQ778F6kLkgktg9xCyzvoMjzTcwbU"
           }
         }
       },
       "metadata_json": {
         "source": "Automation"
       },
       "automation_id": "auto_McXM3rjWcPwaNU5ndIIP13jX",
       "group_id": "v-0a26b921779d7eebcb"
     }
   },
   "metadata": {}
 }
 ```
 ```json Points redeemed
 {
  "id": "evcus_0a26bb89060c3ad8bc",
  "object": "event",
  "webhook_id": null,
  "project_id": "proj_nXIkFGNmrFSf",
  "created_at": "2021-11-12T11:53:09.910Z",
  "type": "points_redeemed",
  "data": {
    "object": {
      "voucher": {
        "id": "v_ix6p7zxM8m7AdlgObubjP2ibDTCsnEkq",
        "code": "xUgBLQck",
        "campaign": "20% discount",
        "campaign_id": "camp_o9vZ7yIqtj5B9CbhJlKRXIZ5",
        "category": null,
        "type": "DISCOUNT_VOUCHER",
        "discount": {
          "type": "PERCENT",
          "amount_limit": 5000,
          "percent_off": 20
        },
        "gift": null,
        "loyalty_card": null,
        "start_date": null,
        "expiration_date": null,
        "validity_timeframe": null,
        "validity_day_of_week": null,
        "active": true,
        "additional_info": null,
        "metadata": {},
        "assets": {
          "qr": {
              "id": "U2FsdGVkX19pNCYXQ8ztNEb+OaYwP13ZoOfOMBJwzgz2RNchFxoMDPIHS47i8tY+oc3HzEpFr2SqITQ/IdD6V7RuYxsyrcfz53Je6+me6VBl9Pze3p8lTSJWwjp79tKEZHygNMggPsfIEi4Ei3Wt1A==",
              "url": "https://dl.voucherify.io/api/v1/assets/qr/U2FsdGVkX19pNCYXQ8ztNEb%2BOaYwP13ZoOfOMBJwzgz2RNchFxoMDPIHS47i8tY%2Boc3HzEpFr2SqITQ%2FIdD6V7RuYxsyrcfz53Je6%2Bme6VBl9Pze3p8lTSJWwjp79tKEZHygNMggPsfIEi4Ei3Wt1A%3D%3D"
          },
          "barcode": {
              "id": "U2FsdGVkX19a0CQqRE3y6dRDn0Jyr74H85dLNo9MQrXRZFBj9fcDUlaV3Q0uG2xa4l4Ch4WVfPGQ3iEEPpYTMQGwm8xN9cynpCv/upu9ZD9iWat6+nlw+PsKH5CcyNemhfI273GhBOvh5ysRMpFUZQ==",
              "url": "https://dl.voucherify.io/api/v1/assets/barcode/U2FsdGVkX19a0CQqRE3y6dRDn0Jyr74H85dLNo9MQrXRZFBj9fcDUlaV3Q0uG2xa4l4Ch4WVfPGQ3iEEPpYTMQGwm8xN9cynpCv%2Fupu9ZD9iWat6%2Bnlw%2BPsKH5CcyNemhfI273GhBOvh5ysRMpFUZQ%3D%3D"
          }
        },
        "is_referral_code": false,
        "created_at": "2021-11-12T11:53:03.194Z",
        "updated_at": null,
        "holder_id": "cust_vfkFOr6pMg3MZAHcd7J8Hch7",
        "redemption": {
          "quantity": 1,
          "redeemed_quantity": 0,
          "object": "list",
          "url": "/v1/vouchers/xUgBLQck/redemptions?page=1&limit=10"
        },
        "publish": {
          "object": "list",
          "count": 1,
          "url": "/v1/vouchers/xUgBLQck/publications?page=1&limit=10"
        },
        "object": "voucher"
      },
      "campaign": {
        "id": "camp_iQgR6PmpF3D5H22OcNcRUU0f",
        "name": "Loyalty Webhooks",
        "campaign_type": "LOYALTY_PROGRAM",
        "type": "AUTO_UPDATE",
        "voucher": {
          "type": "LOYALTY_CARD",
          "loyalty_card": {
            "points": 0,
            "balance": 0
          },
          "redemption": {
            "quantity": null,
            "redeemed_quantity": 0
          },
          "code_config": {
            "length": 8,
            "prefix": "",
            "charset": "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
            "pattern": "########",
            "postfix": ""
          },
          "is_referral_code": false
        },
        "auto_join": false,
        "join_once": false,
        "vouchers_count": 0,
        "active": true,
        "object": "campaign"
      },
      "customer": {
        "id": "cust_vfkFOr6pMg3MZAHcd7J8Hch7",
        "source_id": "Loyal_customer__01",
        "name": "John Doe",
        "description": null,
        "email": null,
        "phone": null,
        "birthday": null,
        "birthdate": null,
        "address": null,
        "summary": {
          "redemptions": {
            "total_redeemed": 1,
            "total_failed": 0,
            "total_succeeded": 1,
            "total_rolled_back": 0,
            "total_rollback_failed": 0,
            "total_rollback_succeeded": 0
          },
          "orders": {
            "total_amount": 22000,
            "total_count": 1,
            "average_amount": 22000,
            "last_order_amount": 22000,
            "last_order_date": "2021-11-12T11:42:39.633Z"
          }
        },
        "loyalty": {
          "points": 218,
          "referred_customers": 0,
          "campaigns": {
            "Loyalty Webhooks": {
              "points": 218,
              "referred_customers": 0
            }
          }
        },
        "referrals": {
          "total": 0,
          "campaigns": []
        },
        "metadata": {
          "test": true,
          "acq_channel": "Twitter"
        },
        "system_metadata": {},
        "created_at": "2021-11-12T11:40:18.077Z",
        "updated_at": "2021-11-12T11:53:07.582Z",
        "object": "customer"
      },
      "publication": {
        "id": "pub_aFszQ4kOtT1Hori8Wl1i0az1sFQN3CRv",
        "created_at": "2021-11-12T11:53:03.172Z",
        "customer_id": "cust_vfkFOr6pMg3MZAHcd7J8Hch7",
        "customer": {
          "id": "cust_vfkFOr6pMg3MZAHcd7J8Hch7",
          "name": "John Doe",
          "email": null,
          "source_id": "Loyal_customer__01",
          "metadata": {
            "test": true,
            "acq_channel": "Twitter"
          },
          "object": "customer"
        },
        "tracking_id": "Loyal_customer__01",
        "metadata": {},
        "channel": "API",
        "source_id": null,
        "result": "SUCCESS",
        "voucher_code": "xUgBLQck",
        "vouchers": [
          {
            "id": "v_ix6p7zxM8m7AdlgObubjP2ibDTCsnEkq",
            "code": "xUgBLQck",
            "campaign": "20% discount",
            "campaign_id": "camp_o9vZ7yIqtj5B9CbhJlKRXIZ5",
            "category": null,
            "type": "DISCOUNT_VOUCHER",
            "discount": {
              "type": "PERCENT",
              "percent_off": 20,
              "amount_limit": 5000
            },
            "gift": null,
            "loyalty_card": null,
            "start_date": null,
            "expiration_date": null,
            "validity_timeframe": null,
            "validity_day_of_week": null,
            "active": true,
            "additional_info": null,
            "metadata": {},
            "assets": {
              "qr": {
                  "id": "U2FsdGVkX19pNCYXQ8ztNEb+OaYwP13ZoOfOMBJwzgz2RNchFxoMDPIHS47i8tY+oc3HzEpFr2SqITQ/IdD6V7RuYxsyrcfz53Je6+me6VBl9Pze3p8lTSJWwjp79tKEZHygNMggPsfIEi4Ei3Wt1A==",
                  "url": "https://dl.voucherify.io/api/v1/assets/qr/U2FsdGVkX19pNCYXQ8ztNEb%2BOaYwP13ZoOfOMBJwzgz2RNchFxoMDPIHS47i8tY%2Boc3HzEpFr2SqITQ%2FIdD6V7RuYxsyrcfz53Je6%2Bme6VBl9Pze3p8lTSJWwjp79tKEZHygNMggPsfIEi4Ei3Wt1A%3D%3D"
              },
              "barcode": {
                  "id": "U2FsdGVkX19a0CQqRE3y6dRDn0Jyr74H85dLNo9MQrXRZFBj9fcDUlaV3Q0uG2xa4l4Ch4WVfPGQ3iEEPpYTMQGwm8xN9cynpCv/upu9ZD9iWat6+nlw+PsKH5CcyNemhfI273GhBOvh5ysRMpFUZQ==",
                  "url": "https://dl.voucherify.io/api/v1/assets/barcode/U2FsdGVkX19a0CQqRE3y6dRDn0Jyr74H85dLNo9MQrXRZFBj9fcDUlaV3Q0uG2xa4l4Ch4WVfPGQ3iEEPpYTMQGwm8xN9cynpCv%2Fupu9ZD9iWat6%2Bnlw%2BPsKH5CcyNemhfI273GhBOvh5ysRMpFUZQ%3D%3D"
              }
            },
            "is_referral_code": false,
            "created_at": "2021-11-12T11:53:03.194Z",
            "updated_at": null,
            "holder_id": "cust_vfkFOr6pMg3MZAHcd7J8Hch7",
            "object": "voucher",
            "distributions": null,
            "publish": {
              "object": "list",
              "count": 1,
              "url": "/v1/vouchers/xUgBLQck/publications?page=1&limit=10"
            },
            "redemption": {
              "quantity": 1,
              "redeemed_quantity": 0,
              "object": "list",
              "url": "/v1/vouchers/xUgBLQck/redemptions?page=1&limit=10"
            }
          }
        ],
        "vouchers_id": [
          "v_ix6p7zxM8m7AdlgObubjP2ibDTCsnEkq"
        ],
        "campaign_name": "20% discount",
        "gift": null,
        "loyalty_card": null,
        "discount": {
          "type": "PERCENT",
          "percent_off": 20,
          "amount_limit": 5000
        },
        "is_referral_code": false,
        "failure_code": null,
        "failure_message": null,
        "voucher": null
      }
    },
    "related_object": {
      "id": "evcus_0a26bb89060c3ad8bc",
      "type": "customer.reward_redemptions.completed",
      "data": {
        "customer": {
          "id": "cust_vfkFOr6pMg3MZAHcd7J8Hch7",
          "name": "John Doe",
          "email": null,
          "source_id": "Loyal_customer__01",
          "metadata": {
            "test": true,
            "acq_channel": "Twitter"
          },
          "object": "customer"
        },
        "holder": {
          "id": "cust_vfkFOr6pMg3MZAHcd7J8Hch7",
          "name": "John Doe",
          "email": null,
          "source_id": "Loyal_customer__01",
          "metadata": {
            "test": true,
            "acq_channel": "Twitter"
          },
          "object": "customer"
        },
        "voucher": {
          "id": "v_CGrEQ778F6kLkgktg9xCyzvoMjzTcwbU",
          "code": "qjvEslzU",
          "loyalty_card": {
            "points": 220,
            "balance": 218
          },
          "type": "LOYALTY_CARD",
          "campaign": "Loyalty Webhooks",
          "campaign_id": "camp_iQgR6PmpF3D5H22OcNcRUU0f",
          "is_referral_code": false,
          "holder_id": "cust_vfkFOr6pMg3MZAHcd7J8Hch7"
        },
        "campaign": {
          "id": "camp_iQgR6PmpF3D5H22OcNcRUU0f",
          "name": "Loyalty Webhooks",
          "campaign_type": "LOYALTY_PROGRAM",
          "type": "AUTO_UPDATE",
          "is_referral_code": false,
          "voucher": {
            "type": "LOYALTY_CARD",
            "loyalty_card": {
              "points": 0,
              "balance": 0
            },
            "redemption": {
              "quantity": null,
              "redeemed_quantity": 0
            },
            "code_config": {
              "length": 8,
              "prefix": "",
              "charset": "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
              "pattern": "########",
              "postfix": ""
            }
          },
          "auto_join": false,
          "join_once": false,
          "active": true
        },
        "reward_redemption": {
          "id": "rewr_uATcoUjIp3VJNgT5TZT5NMaT",
          "state": "COMPLETED",
          "created_at": "2021-11-12T11:53:06.025Z",
          "updated_at": null,
          "voucher_id": "v_CGrEQ778F6kLkgktg9xCyzvoMjzTcwbU",
          "campaign_id": "camp_iQgR6PmpF3D5H22OcNcRUU0f",
          "customer_id": "cust_vfkFOr6pMg3MZAHcd7J8Hch7",
          "reward_assignment_id": "rewa_bRTNrtAqXmdHNDe4cNg7y3JC",
          "source_id": "r_Lbxqqjv59hCRLG3Nkl8E4yYk",
          "source_type": "redemption"
        },
        "reward": {
          "assignment_id": "rewa_bRTNrtAqXmdHNDe4cNg7y3JC",
          "voucher": {
            "id": "v_ix6p7zxM8m7AdlgObubjP2ibDTCsnEkq",
            "code": "xUgBLQck",
            "discount": {
              "type": "PERCENT",
              "amount_limit": 5000,
              "percent_off": 20
            },
            "type": "DISCOUNT_VOUCHER",
            "campaign": "20% discount",
            "campaign_id": "camp_o9vZ7yIqtj5B9CbhJlKRXIZ5",
            "is_referral_code": false,
            "holder_id": "cust_vfkFOr6pMg3MZAHcd7J8Hch7"
          },
          "id": "rew_l7z9yeLGZHJgCsxwNX5tDXqs",
          "object": "reward",
          "name": "20% discount",
          "type": "CAMPAIGN"
        },
        "reward_assignment": {
          "id": "rewa_bRTNrtAqXmdHNDe4cNg7y3JC",
          "reward_id": "rew_l7z9yeLGZHJgCsxwNX5tDXqs",
          "related_object_id": "camp_iQgR6PmpF3D5H22OcNcRUU0f",
          "related_object_type": "campaign",
          "parameters": {
            "loyalty": {
              "points": 2
            }
          },
          "created_at": "2021-11-12T11:39:05.504Z",
          "updated_at": null,
          "object": "reward_assignment"
        },
        "source": {
          "id": "r_Lbxqqjv59hCRLG3Nkl8E4yYk",
          "type": "redemption"
        },
        "balance": null
      },
      "created_at": "2021-11-12T11:53:09.910Z"
    }
  },
  "metadata": {}
}
```

