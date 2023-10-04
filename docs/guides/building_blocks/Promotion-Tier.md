---
title: Promotion Tier
excerpt: 
categorySlug: building-blocks
slug: promotion-tier
type: basic
hidden: false
order: 8
---

A promotion tier enables auto-applied discounts. This object doesn't require a promo code. It needs, however, two fields to be provided:

- **Condition** – specifies the context under which the promotion is valid. The schema follows the [validation rule object](ref:get-validation-rule).
- **Action** – specifies the discount applied when the conditions are met.

> 📘 Object definition
> 
> [Promotion Tier object definition](ref:list-promotion-tiers)

## Auto-applied promotions workflow

A promotion tier always needs to be packaged with a campaign. Here's how to create one:

```curl
  curl -X POST \
    -H "X-App-Id: c70a6f00-cf91-4756-9df5-47628850002b" \
    -H "X-App-Token: 3266b9f8-e246-4f79-bdf0-833929b1380c" \
    -H "Content-Type: application/json" \
    -d '{
        "name": "BMCF 2017",
        "campaign_type": "PROMOTION",
        "start_date": "2017-11-24T00:00:00Z",
        "expiration_date": "2017-11-27T23:59:59Z",
        "promotion": {
          "tiers":[{
            "name": "BMCF 2017 - $10 off for orders above $100",
            "banner": "Congratulations, you get $10 off.",
            "action": {
              "discount": {
                "type": "AMOUNT",
                "amount_off": 1000
              }
            }
        }]
        }
    }' \
    https://api.voucherify.io/v1/campaigns
```

To provide business logic to the created promotion, you must create a validation rule and assign it to a given promotion tier. Here's how to do it:

```curl
 curl -X POST \
    -H "X-App-Id: c70a6f00-cf91-4756-9df5-47628850002b" \
    -H "X-App-Token: 3266b9f8-e246-4f79-bdf0-833929b1380c" \
    -H "Content-Type: application/json" \
    -d '{
    	"name": "Order Amount more than 100$",
      "rules": {
        "1": {
            "name": "order.amount",
            "conditions": {
                "$more_than": [10000]
            }
        },
        "logic": "1"
      }
    }' "https://api.voucherify.io/v1/validation-rules"

curl -X POST \
-H "X-App-Id: c70a6f00-cf91-4756-9df5-47628850002b" \
-H "X-App-Token: 3266b9f8-e246-4f79-bdf0-833929b1380c" \
-H "Content-Type: application/json" \
-d '{
  "promotion_tier": "promo_40sT6Tde71wuiyuDOVOl8ezI"
}' \
"https://api.voucherify.io/v1/validation-rules/val_269dXe4PYfqO/asisgnments"
```

Now, when shoppers are visiting your store, you can load all available promotion tiers with [List Promotion Tiers](ref:list-promotion-tiers) endpoint.

```curl
   curl -X GET \
      -H "X-App-Id: c70a6f00-cf91-4756-9df5-47628850002b" \
      -H "X-App-Token: 3266b9f8-e246-4f79-bdf0-833929b1380c" \
      -H "Content-Type: application/json" \
      https://api.voucherify.io/v1/promotions/tiers?is_available=true
```

Parse the `tier` objects from the response and display possible promo scenarios to the customer to entice them to purchase more.

```json
    {
      "object": "list",
      "data_ref": "tiers",
      "tiers": [
        {
          "id": "promo_40sT6Tde71wuiyuDOVOl8ezI",
          "object": "promotion_tier",
          "name": "New customer without orders, give 10%",
          "banner": null,
          "campaign": {
            "id": "camp_bj0C71gtxszPGYqGtJN8fM3l",
            "object": "campaign",
            "start_date": null,
            "expiration_date": "2018-03-30T22:00:00Z",
            "active": true
          },
          "action": {
            "discount": {
              "type": "PERCENT",
              "percent_off": 10
            }
          },
          "metadata": null
        }
      ],
      "has_more": false
    }
```

Every time the customer adds or removes something from the cart, run [validate](ref:validate-promotions) providing a customer id and the current cart structure.

```curl
curl -X POST \
    -H "X-App-Id: c70a6f00-cf91-4756-9df5-47628850002b" \
    -H "X-App-Token: 3266b9f8-e246-4f79-bdf0-833929b1380c" \
    -H "Content-Type: application/json" \
    -d '{
        "order" : {
                "amount" : 25000,
                "items": [
                  { 
                    "product_id": "prod_anJ03RZZq74z4v", 
                    "quantity": "2", 
                    "price": 10000 }
                ]
  }
}' \
https://api.voucherify.io/v1/promotions/validation
```

As a response, you'll get the promotion tiers which match the context.

```json
   {
        "valid": true,
        "promotions": [
            {
                "id": "promo_UkPq7pCZR7pvyPdYt7aU3bPw",
                "object": "promotion_tier",
                "banner": "You get 5% off",
                "discount": {
                    "type": "PERCENT",
                    "percent_off": 5
                },
                "discount_amount": 1250
            },
            {
                "id": "promo_gwYy781sqIdW5xYbmuQLKLwa",
                "banner": "Congratulations, you get $10 off!",
                "object": "promotion_tier",
                "discount": {
                    "type": "AMOUNT",
                    "amount_off": 1000
                },
                "discount_amount": 1000
            },
            {
                "id": "promo_oh640UsBGnAMrbyzwr4XoPV7",
                "banner": "Congratulations, you get $20 off!",
                "object": "promotion_tier",
                "discount": {
                    "type": "AMOUNT",
                    "amount_off": 2000
                },
                "discount_amount": 2000
            }
        ],
        "tracking_id": null
    }
```

The last step is to call the [redemption](ref:redeem-promotion) endpoint, passing an `id` of the promotion you (or the customer) selected.

```curl
 curl -X POST \
      -H "X-App-Id: c70a6f00-cf91-4756-9df5-47628850002b" \
      -H "X-App-Token: 3266b9f8-e246-4f79-bdf0-833929b1380c" \
      -H "Content-Type: application/json" \
      -d '{
        "customer": {
          "id": "cust_mOjhGypfbqch0v3DpAA9LDXj"
        },
        "order": {
          "amount": 25000,
          "items": [
            { "product_id": "prod_anJ03RZZq74z4v", "quantity": "2", "price": 10000 }
          ]
        }
      }' \
      "https://api.voucherify.io/v1/promotions/tiers/promo_gwYy781sqIdW5xYbmuQLKLwa/redemption"
```
