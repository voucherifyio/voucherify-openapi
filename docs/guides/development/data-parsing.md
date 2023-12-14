---
title: Data parsing
excerpt: Learn how to read and use data sent by Voucherify
categorySlug: development
slug: data-parsing
type: basic
hidden: false
order: 205
---

Voucherify API sends much data in a validation or redemption response and only some of the data is relevant to end-customer.

> 📘 Goals
>
> - Learn how to read Voucherify API response
> - Learn which data are relevant
> - Learn which data could be shown to end-customers

> 👍 Outcome
> 
> You know which data to show to end-customers

## Response analysis

A complete API response for [validation](ref:validate-stacked-discounts) or [redemption](ref:redeem-stacked-discounts) includes many objects. In the example below, the response shows, among others, the following objects:
- order – the order placed by the customer
- customer – the customer who placed the order
- voucher – a discount coupon redeemed in the order
- item – an item in the cart

<!-- ^ Should we go into details and describe the sample response for all those objects?

I'd consider only the order and/or item.
 -->

<details>
<summary>Unroll a full redemption API request and response for a discount coupon</summary>
<p>

```json Request
{
    "customer": {
        "source_id": "test_customer_id_2"
    },
    "redeemables": [
        {
            "object": "voucher",
            "id": "Basic-discount-1"
        }
    ],
    "order": {
        "items": [
            {
                "source_id": "adv-mug",
                "related_object": "product",
                "price": 1000,
                "quantity": 2,
                "product": {
                    "metadata": {
                        "brand": "Adventure"
                    }
                }
            },
            {
                "source_id": "adv-poster",
                "related_object": "product",
                "price": 1500,
                "quantity": 3,
                "product": {
                    "metadata": {
                        "brand": "Adventure"
                    }
                }
            },
            {
                "source_id": "adv-tshirt",
                "related_object": "product",
                "price": 2000,
                "quantity": 3,
                "product": {
                    "metadata": {
                        "brand": "Adventure"
                    }
                }
            },
            {
                "source_id": "star-th-bottle",
                "related_object": "product",
                "price": 2500,
                "quantity": 2,
                "product": {
                    "metadata": {
                        "brand": "Star"
                    }
                }
            }
        ],
        "metadata": {}
    },
    "metadata": {}
}
```
```json Response
{
    "redemptions": [
        {
            "id": "r_0df92df74824167835",
            "customer_id": "cust_1g637SqVZnkdPNdAIZ7Ra879",
            "tracking_id": "track_Pw6r3ejnml43kIwNS4Zj09KZ67xOfLUy",
            "date": "2023-12-12T11:27:36.224Z",
            "order": {
                "id": "ord_iB08cMWm3sM3mWRJW17h62Pf",
                "source_id": null,
                "status": "PAID",
                "customer_id": "cust_1g637SqVZnkdPNdAIZ7Ra879",
                "referrer_id": null,
                "amount": 17500,
                "items_discount_amount": 5000,
                "items_applied_discount_amount": 5000,
                "total_discount_amount": 5000,
                "total_applied_discount_amount": 5000,
                "total_amount": 12500,
                "items": [
                    {
                        "object": "order_item",
                        "source_id": "adv-mug",
                        "related_object": "product",
                        "quantity": 2,
                        "amount": 2000,
                        "discount_amount": 2000,
                        "applied_discount_amount": 2000,
                        "price": 1000
                    },
                    {
                        "object": "order_item",
                        "source_id": "adv-poster",
                        "related_object": "product",
                        "quantity": 3,
                        "amount": 4500,
                        "discount_amount": 2000,
                        "applied_discount_amount": 2000,
                        "price": 1500
                    },
                    {
                        "object": "order_item",
                        "source_id": "adv-tshirt",
                        "related_object": "product",
                        "quantity": 3,
                        "amount": 6000,
                        "discount_amount": 1000,
                        "applied_discount_amount": 1000,
                        "price": 2000
                    },
                    {
                        "object": "order_item",
                        "source_id": "star-th-bottle",
                        "related_object": "product",
                        "quantity": 2,
                        "amount": 5000,
                        "price": 2500
                    }
                ],
                "metadata": {},
                "object": "order"
            },
            "customer": {
                "id": "cust_1g637SqVZnkdPNdAIZ7Ra879",
                "name": "Jane Doe",
                "email": "jane-doe@jane.doe",
                "source_id": "test_customer_id_2",
                "metadata": {
                    "lang": "en",
                    "test": true
                },
                "object": "customer"
            },
            "result": "SUCCESS",
            "voucher": {
                "id": "v_NhxOlxSaoeK13zf949Q3u0CRQ0ag0L3o",
                "code": "Basic-discount-1",
                "discount": {
                    "type": "AMOUNT",
                    "amount_off": 2000,
                    "aggregated_amount_limit": 5000,
                    "effect": "APPLY_TO_ITEMS"
                },
                "type": "DISCOUNT_VOUCHER",
                "campaign": "Basic discount-2",
                "campaign_id": "camp_BiFtRVJHJ8moAUe75NzspHNO",
                "is_referral_code": false,
                "created_at": "2023-12-06T15:34:57.264Z",
                "object": "voucher"
            },
            "object": "redemption"
        }
    ],
    "order": {
        "id": "ord_iB08cMWm3sM3mWRJW17h62Pf",
        "source_id": null,
        "created_at": "2023-12-12T11:27:36.184Z",
        "updated_at": null,
        "status": "PAID",
        "amount": 17500,
        "items_discount_amount": 5000,
        "total_discount_amount": 5000,
        "total_amount": 12500,
        "items_applied_discount_amount": 5000,
        "total_applied_discount_amount": 5000,
        "items": [
            {
                "object": "order_item",
                "source_id": "adv-mug",
                "related_object": "product",
                "quantity": 2,
                "amount": 2000,
                "discount_amount": 2000,
                "applied_discount_amount": 2000,
                "price": 1000,
                "subtotal_amount": 0,
                "product": {
                    "id": "prod_0df14b3a6ad8f282a8",
                    "source_id": "adv-mug",
                    "name": "Adventure Mug",
                    "metadata": {
                        "brand": "Adventure"
                    }
                }
            },
            {
                "object": "order_item",
                "source_id": "adv-poster",
                "related_object": "product",
                "quantity": 3,
                "amount": 4500,
                "discount_amount": 2000,
                "applied_discount_amount": 2000,
                "price": 1500,
                "subtotal_amount": 2500,
                "product": {
                    "id": "prod_0df14b548e58f282c0",
                    "source_id": "adv-poster",
                    "name": "Adventure Poster",
                    "metadata": {
                        "brand": "Adventure"
                    }
                }
            },
            {
                "object": "order_item",
                "source_id": "adv-tshirt",
                "related_object": "product",
                "quantity": 3,
                "amount": 6000,
                "discount_amount": 1000,
                "applied_discount_amount": 1000,
                "price": 2000,
                "subtotal_amount": 5000,
                "product": {
                    "id": "prod_0df14b684f58f282d4",
                    "source_id": "adv-tshirt",
                    "name": "Adventure T-shirt",
                    "metadata": {
                        "brand": "Adventure"
                    }
                }
            },
            {
                "object": "order_item",
                "source_id": "star-th-bottle",
                "related_object": "product",
                "quantity": 2,
                "amount": 5000,
                "price": 2500,
                "subtotal_amount": 5000,
                "product": {
                    "id": "prod_0df14b7e7d8975079d",
                    "source_id": "star-th-bottle",
                    "name": "Star Thermal Bottle",
                    "metadata": {
                        "brand": "Star"
                    }
                }
            }
        ],
        "metadata": {},
        "customer": {
            "id": "cust_1g637SqVZnkdPNdAIZ7Ra879",
            "object": "customer"
        },
        "customer_id": "cust_1g637SqVZnkdPNdAIZ7Ra879",
        "referrer_id": null,
        "object": "order",
        "redemptions": {
            "r_0df92df74824167835": {
                "date": "2023-12-12T11:27:36.224Z",
                "related_object_type": "voucher",
                "related_object_id": "v_NhxOlxSaoeK13zf949Q3u0CRQ0ag0L3o",
                "related_object_parent_id": "camp_BiFtRVJHJ8moAUe75NzspHNO"
            }
        }
    },
    "inapplicable_redeemables": [],
    "skipped_redeemables": []
}
```

</p>
</details>

<!-- ### Order object – response analysis

Code plus description, plus link to API reference

### Item object – response analysis

Code plus description, plus link to API reference

 -->

## Data to be shown

Depending on a use case, different response data can be shown to an end-customer. The following sections contain snippets of JSON responses from Voucherify API [redemption](ref:redeem-stacked-discounts) endpoint.

See the comments in the code to learn which data are worth showing to an end-customer.

### Discounts <!-- COMMENTS TO BE ADDED TOMORROW -->

In the case of discounts, the end-customer can be shown the data as commented in the code. This example covers any redeemed discount applied to the end-customer, whether it is applied from a discount coupon, cart promotion, or a gift card.

In this example, two discounts are applied:
- discount that covers products with an `Adventure` metadata
- discount that reduces the cart total by $20 

```json Response
"order": {
        "id": "ord_tc4yusJRqAY87ybmvhnPkJ6u",
        "source_id": null,
        "created_at": "2023-12-13T14:29:20.533Z",
        "updated_at": null,
        "status": "PAID",
        "amount": 13000, // This is the initial amount of the cart, before any discounts have been applied 
        "discount_amount": 2500,
        "items_discount_amount": 4000,
        "total_discount_amount": 6500,
        "total_amount": 6500,
        "applied_discount_amount": 2500,
        "items_applied_discount_amount": 4000,
        "total_applied_discount_amount": 6500,
        "items": [
            {
                "object": "order_item",
                "source_id": "adv-mug",
                "related_object": "product",
                "quantity": 2,
                "amount": 2000,
                "discount_amount": 2000,
                "applied_discount_amount": 2000,
                "price": 1000,
                "subtotal_amount": 0,
                "product": {
                    "id": "prod_0df14b3a6ad8f282a8",
                    "source_id": "adv-mug",
                    "name": "Adventure Mug",
                    "metadata": {
                        "brand": "Adventure"
                    }
                }
            },
            {
                "object": "order_item",
                "source_id": "adv-tshirt",
                "related_object": "product",
                "quantity": 3,
                "amount": 6000,
                "discount_amount": 2000,
                "applied_discount_amount": 2000,
                "price": 2000,
                "subtotal_amount": 4000,
                "product": {
                    "id": "prod_0df14b684f58f282d4",
                    "source_id": "adv-tshirt",
                    "name": "Adventure T-shirt",
                    "metadata": {
                        "brand": "Adventure"
                    }
                }
            },
            {
                "object": "order_item",
                "source_id": "star-th-bottle",
                "related_object": "product",
                "quantity": 2,
                "amount": 5000,
                "price": 2500,
                "subtotal_amount": 5000,
                "product": {
                    "id": "prod_0df14b7e7d8975079d",
                    "source_id": "star-th-bottle",
                    "name": "Star Thermal Bottle",
                    "metadata": {
                        "brand": "Star"
                    }
                }
            }
        ],
    }
```

<!--

### Free items -->