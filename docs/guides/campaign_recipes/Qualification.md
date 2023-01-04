---
title: Qualification - Checking eligibility for promo codes
excerpt: null
category: 639ba16d677235008f80045c
slug: checking-eligibility-for-coupons
type: basic
hidden: false
order: 1
---

Sometimes you want to show a customer all the coupons they’re eligible for — taking into account their **attributes** as well as the **current content of their cart** (check the examples below).

Voucherify API offers two endpoints for this purpose:
* [Vouchers qualification](ref:examine-vouchers-qualification) — returns a list of standalone coupons. The method can be used for sending a request to display all vouchers qualified to the given customer and context like order, loyalty reward, customer attributes. 

> 📘 Limits
> 
> Note that this method isn’t guaranteed to display all vouchers qualified to the given customer and context. It will check up to 150 standalone vouchers.

* [Campaigns qualification](ref:examine-campaigns-qualification) — returns a list of campaigns that store pre-generated unique bulk codes (which you can assign to the customer with [create publication](ref:create-publication) method.

> 📘 Limits
> 
> Note that this method doesn't return campaigns with the validation rule *Only for customers who are holders of the code*

## Examples

```curl
curl -X POST \
  -H "X-App-Id: c70a6f00-cf91-4756-9df5-47628850002b" \
  -H "X-App-Token: 3266b9f8-e246-4f79-bdf0-833929b1380c" \
  -H "Content-Type: application/json" \
  -d '{
    "customer" : {
      "id" : "cust_07sVjVsr71Ewot9lVZSrIVLH",
      "source_id" : "john@lemon.com",
      "name": "John Lemon"
    },
    "order" : {
      "amount" : 1000,
      "items": [
        { "product_id": "prod_anJ03RZZq74z4v", "quantity": "1", "price": 10000 },
        { "sku_id": "sku_dSbRQfbyUMyHnt", "quantity": "1" },
        { "sku_id": "sku_0KtP4rvwEECQ2U", "quantity": "1" }
      ]
    },
    "metadata": {
      "locale": "en-GB"
    }
  }' \
  https://api.voucherify.io/v1/vouchers/qualification
  ```
  ```json 200 OK Response
  {
    "id": "qfl_qo4vGT9kZqoL4VXiQ17G0Cp6",
    "created_at": "2019-05-16T14:45:00Z",
    "object": "list",
    "total": 2,
    "data_ref": "data",
    "data": [
        {
            "id": "v_V8uSNYjue8VhBbyVRgGOHFWWYIiGPdvB",
            "code": "TOP_VIP_COUPON",
            "campaign": null,
            "category": null,
            "type": "DISCOUNT_VOUCHER",
            "discount": {
                "type": "AMOUNT",
                "amount_off": 100000
            },
            "gift": null,
            "loyalty_card": null,
            "start_date": null,
            "expiration_date": null,
            "validity_timeframe": null,
            "validity_day_of_week": null,
            "publish": {
                "object": "list",
                "count": 0,
                "url": "/v1/vouchers/TOP_VIP_COUPON/publications?page=1&limit=10"
            },
            "redemption": {
                "object": "list",
                "quantity": 1,
                "redeemed_quantity": 0,
                "url": "/v1/vouchers/TOP_VIP_COUPON/redemptions?page=1&limit=10"
            },
            "active": true,
            "additional_info": null,
            "metadata": null,
            "assets": {
                "qr": {
                    "id": "U2FsdGVkX1/DhP//aqf5tEq+7yEsH6PWsikFFurjlqIABShOW+p3Lup1AJNQCqM+d8mUyfZKCoKkb1Q3LQjjYjYF+GlyzLLdZls37m71siuFgYY42Tj+b1Yp+xul3a8ShCbNs2YJsNNkir5gD51WWw==",
                    "url": "https://dl.voucherify.io/api/v1/assets/qr/U2FsdGVkX1%2FDhP%2F%2Faqf5tEq%2B7yEsH6PWsikFFurjlqIABShOW%2Bp3Lup1AJNQCqM%2Bd8mUyfZKCoKkb1Q3LQjjYjYF%2BGlyzLLdZls37m71siuFgYY42Tj%2Bb1Yp%2Bxul3a8ShCbNs2YJsNNkir5gD51WWw%3D%3D"
                },
                "barcode": {
                    "id": "U2FsdGVkX18x888KSjXtPmJPC3pOwO9gpnWyWDTFSxI3yq9Y+fJPDs32+ZNnVT3Jr4yed98mSLXPA3hqv0e0C5QUNubDKJ1kgD/F2pMGRRkW5O5lzATam2bxtcZzSGKXdfK7Mm7iZ4a//Y+hTh5axA==",
                    "url": "https://dl.voucherify.io/api/v1/assets/barcode/U2FsdGVkX18x888KSjXtPmJPC3pOwO9gpnWyWDTFSxI3yq9Y%2BfJPDs32%2BZNnVT3Jr4yed98mSLXPA3hqv0e0C5QUNubDKJ1kgD%2FF2pMGRRkW5O5lzATam2bxtcZzSGKXdfK7Mm7iZ4a%2F%2FY%2BhTh5axA%3D%3D"
                }
            },
            "is_referral_code": false,
            "updated_at": null,
            "object": "voucher",
            "validation_rules_assignments": {
                "object": "list",
                "total": 1,
                "data_ref": "data",
                "data": [
                    {
                        "id": "asgm_97dPBQ7KlVVOn9gt",
                        "rule_id": "val_fKHKXZAzpn1h",
                        "related_object_id": "v_V8uSNYjue8VhBbyVRgGOHFWWYIiGPdvB",
                        "related_object_type": "voucher",
                        "created_at": "2019-05-16T14:02:32Z",
                        "object": "validation_rules_assignment"
                    }
                ]
            }
        },
        {
            "id": "v_eSTLyUC8XDSpLZneveBnVh3GphkRpyln",
            "code": "METADATA_RULE",
            "campaign": null,
            "category": null,
            "type": "DISCOUNT_VOUCHER",
            "discount": {
                "type": "UNIT",
                "unit_off": 1,
                "unit_type": "value"
            },
            "gift": null,
            "loyalty_card": null,
            "start_date": null,
            "expiration_date": null,
            "validity_timeframe": null,
            "validity_day_of_week": null,
            "publish": {
                "object": "list",
                "count": 0,
                "url": "/v1/vouchers/METADATA_RULE/publications?page=1&limit=10"
            },
            "redemption": {
                "object": "list",
                "quantity": null,
                "redeemed_quantity": 0,
                "url": "/v1/vouchers/METADATA_RULE/redemptions?page=1&limit=10"
            },
            "active": true,
            "additional_info": null,
            "metadata": null,
            "assets": {
                "qr": {
                    "id": "U2FsdGVkX1/HmkkEsCe0QRKKBELNTHVeoWjB5zzTx3RJZ2rEOKg9HO61TjpyFpSNYG/xu4p9n3FuO1j/KDGNpql1fy37VPwQnktrLnlBQ72zb+FnsZu7+1zhcN5d/P7kHTdU08KHN/+Rh8JJFeRxmQ==",
                    "url": "https://dl.voucherify.io/api/v1/assets/qr/U2FsdGVkX1%2FHmkkEsCe0QRKKBELNTHVeoWjB5zzTx3RJZ2rEOKg9HO61TjpyFpSNYG%2Fxu4p9n3FuO1j%2FKDGNpql1fy37VPwQnktrLnlBQ72zb%2BFnsZu7%2B1zhcN5d%2FP7kHTdU08KHN%2F%2BRh8JJFeRxmQ%3D%3D"
                },
                "barcode": {
                    "id": "U2FsdGVkX19N/5DgwFyGTotsY2/kUB2UxipWmQsKNCyzYukrBL545eLfXa6/7240KP+ugXfBz8xceZt+Phr1wvjjAkXpX6zsS591JKa7DpQ9dx2mIfrjIG29lD3+W4RsQS0JNfo38QEOZjjgC+9qtg==",
                    "url": "https://dl.voucherify.io/api/v1/assets/barcode/U2FsdGVkX19N%2F5DgwFyGTotsY2%2FkUB2UxipWmQsKNCyzYukrBL545eLfXa6%2F7240KP%2BugXfBz8xceZt%2BPhr1wvjjAkXpX6zsS591JKa7DpQ9dx2mIfrjIG29lD3%2BW4RsQS0JNfo38QEOZjjgC%2B9qtg%3D%3D"
                }
            },
            "is_referral_code": false,
            "updated_at": null,
            "object": "voucher",
            "validation_rules_assignments": {
                "object": "list",
                "total": 1,
                "data_ref": "data",
                "data": [
                    {
                        "id": "asgm_XT3ZKXZEcKsma0sk",
                        "rule_id": "val_7aevsUnYoP7S",
                        "related_object_id": "v_eSTLyUC8XDSpLZneveBnVh3GphkRpyln",
                        "related_object_type": "voucher",
                        "created_at": "2019-05-16T14:44:37Z",
                        "object": "validation_rules_assignment"
                    }
                ]
            }
        }
    ]
}
```