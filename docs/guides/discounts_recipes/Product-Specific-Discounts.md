---
title: Product-specific discounts
excerpt: A recipe for using *applicable_to* validation rule
categorySlug: discounts-recipes
slug: discount-for-particular-product
type: basic
hidden: false
order: 3
---

Some validation rules are based on the structure of products in the cart. Sometimes you want to make a discount applicable only to particular items (products and SKUs). This can be achieved with [Discount Effects](doc:discount-effects). Product-specific discounts can be applied in two ways: to products added to your account and to new order items. 

Once you create an incentive with a discount applied to specific items (defined by validation rules), the API will validate order items and discount only products listed in discounted products.

> 📘 Creating product-specific discounts
>
> Our API lets you create campaigns and assign validation rules, however, it is highly recommended to create all your incentives and validation rules through the Dashboard.

Here is an example redemption of a voucher with a product-specific discount.

```json Redeem voucher
{
    "customer":{
       "source_id":"tom+my_frist_campaign_700@voucherify.io"
    },
    "order":{
       "amount":15100,
       "items":[
          {
             "quantity":1,
             "price":50070,
             "product_id":"prod_3ttSkdxGuAfcv3"
          }
        ]
     }
 }
 ```

 The redemption response will store items section which has new, discounted amount per product.
 
 ```json 200 OK Response
 {
    "id": "r_38dHnMEa5Yvc5mcGDKarOSml",
    "object": "redemption",
    "date": "2021-05-19T07:36:03.823Z",
    "customer_id": "cust_abIpZ6jmKQ5jUdmV1vjDpR5H",
    "tracking_id": "track_MaEPqlh2331IRKXZqdq2OMDhyQxAnyBIuG9VNZRWT0rMQtybQ0m7HA==",
    "order": {
        "id": "ord_smEh8p1p6W6DgOmeERk092LG",
        "source_id": null,
        "created_at": "2021-05-19T07:36:03.801Z",
        "updated_at": null,
        "status": "PROCESSING",
        "amount": 15100,
        "total_discount_amount": 25035,
        "total_amount": 0,
        "items": [
            {
                "object": "order_item",
                "product_id": "prod_3ttSkdxGuAfcv3",
                "quantity": 1,
                "amount": 50070,
                "discount_amount": 25035,
                "price": 50070,
                "product": {
                    "id": "prod_3ttSkdxGuAfcv3",
                    "name": "Ear Headphones",
                    "metadata": {}
                }
            }
        ],
        "customer": {
            "id": "cust_abIpZ6jmKQ5jUdmV1vjDpR5H",
            "object": "customer"
        },
        "customer_id": "cust_abIpZ6jmKQ5jUdmV1vjDpR5H",
        "referrer_id": null,
        "object": "order"
    },
    "metadata": null,
    "result": "SUCCESS",
    "customer": {
        "id": "cust_abIpZ6jmKQ5jUdmV1vjDpR5H",
        "name": null,
        "email": null,
        "source_id": "tom+my_frist_campaign_700@voucherify.io",
        "metadata": null,
        "object": "customer"
    },
    "related_object_type": "voucher",
    "voucher": {
        "id": "v_EJBMbY0iZq1214bfonl6tJKN9sjx9b7F",
        "code": "test2222",
        "campaign_id": null,
        "type": "DISCOUNT_VOUCHER",
        "discount": {
            "type": "PERCENT",
            "effect": "APPLY_TO_ITEMS",
            "percent_off": 50
        },
        "active": true,
        "metadata": {},
        "assets": {
            "qr": {
                "id": "U2FsdGVkX19D1UrTqx2J/xs+EI/MTirzxjqiyeASUVBvoOEAn97I3KhhozhuFGw72VstX1I6Wk6etDQLFEWAUkh9Eo8AwM+TVDxOT2cdXy6yYpwR3KdUUSM4gDeHuMv1EpdLwG/j/s4HAa6hvWcTLQ==",
                "url": "https://dl.voucherify.io/api/v1/assets/qr/U2FsdGVkX19D1UrTqx2J%2Fxs%2BEI%2FMTirzxjqiyeASUVBvoOEAn97I3KhhozhuFGw72VstX1I6Wk6etDQLFEWAUkh9Eo8AwM%2BTVDxOT2cdXy6yYpwR3KdUUSM4gDeHuMv1EpdLwG%2Fj%2Fs4HAa6hvWcTLQ%3D%3D"
            },
            "barcode": {
                "id": "U2FsdGVkX185CON/rZh3E3Mh54kAM6zwxQ+LK6AzXBN1DFiWcGf9PR+pTPQIhcqKhQCxihp6V9gAhR3v0ZlCRsekBWmpFsNMDkw7oOv0iuphf236chdmtCRXtTLLlYN6O+6u9VgKKxdaLGLUxHax2Q==",
                "url": "https://dl.voucherify.io/api/v1/assets/barcode/U2FsdGVkX185CON%2FrZh3E3Mh54kAM6zwxQ%2BLK6AzXBN1DFiWcGf9PR%2BpTPQIhcqKhQCxihp6V9gAhR3v0ZlCRsekBWmpFsNMDkw7oOv0iuphf236chdmtCRXtTLLlYN6O%2B6u9VgKKxdaLGLUxHax2Q%3D%3D"
            }
        },
        "is_referral_code": false,
        "created_at": "2021-05-19T07:08:03.966Z",
        "updated_at": "2021-05-19T07:36:03.823Z",
        "validation_rules_assignments": {
            "object": "list",
            "data_ref": "data",
            "data": [
                {
                    "id": "asgm_oqOgSYoR2MVRbM3P",
                    "rule_id": "val_YAWzcM9LRBY9",
                    "related_object_id": "v_EJBMbY0iZq1214bfonl6tJKN9sjx9b7F",
                    "related_object_type": "voucher",
                    "object": "validation_rules_assignment"
                }
            ],
            "total": 1
        },
        "redemption": {
            "quantity": null,
            "redeemed_quantity": 3,
            "object": "list",
            "url": "/v1/vouchers/test2222/redemptions?page=1&limit=10"
        },
        "publish": {
            "object": "list",
            "count": 0,
            "url": "/v1/vouchers/test2222/publications?page=1&limit=10"
        },
        "object": "voucher",
        "applicable_to": {
            "data": [
                {
                    "object": "product",
                    "id": "prod_3ttSkdxGuAfcv3",
                    "source_id": null,
                    "strict": false
                },
                {
                    "object": "product",
                    "id": "prod_08a994ecd640159277",
                    "source_id": null,
                    "strict": false
                }
            ],
            "total": 2,
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
