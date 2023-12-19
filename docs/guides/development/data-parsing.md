---
title: Data Parsing
excerpt: Learn how to read and use data sent by Voucherify
categorySlug: development
slug: data-parsing
type: basic
hidden: false
order: 205
---

Voucherify API sends much data in a validation or redemption response and only some of the data is relevant to end-customers.

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

<!-- ^ Should we go into detail and describe the sample response for all those objects?

I'd consider only the order and/or item.
 -->

> 📘
> The amount values in the request and response are multiplied by 100 to represent two decimal places, e.g. $100 is `10000`.

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

Depending on the use case, different response data can be shown to an end-customer. The following sections contain snippets of JSON responses from Voucherify API [redemption](ref:redeem-stacked-discounts) endpoint.

See the comments in the code to find suggestions as to which data are worth showing to an end-customer.

### Discounts

In the case of discounts, the end-customer can be shown the data as commented in the code. This example covers any redeemed discount applied to the end-customer, whether it is applied from a discount coupon, cart promotion, or gift card.

In this example, two discounts are applied:
- a discount that covers products with `"brand": "Adventure"` metadata,
- a discount that reduces the cart's total price by $25.

```json Response
"order": {
        "id": "ord_tc4yusJRqAY87ybmvhnPkJ6u",
        "source_id": null,
        "created_at": "2023-12-13T14:29:20.533Z",
        "updated_at": null,
        "status": "PAID",
        "amount": 13000, // The order amount before applying any discount. This should be shown to the end-customer
        "discount_amount": 2500, // The sum of all discount amounts which are applied to the whole order only. This should be shown to the end-customer
        "items_discount_amount": 4000, // The sum of all discount amounts which are applied to specific products
        "total_discount_amount": 6500, // The sum of all order-level and all product-specific discounts. This should be shown to the end-customer
        "total_amount": 6500, // The order amount after applying all the discounts. This should be shown to the end-customer
        "applied_discount_amount": 2500, // The order-level discount applied in this particular request
        "items_applied_discount_amount": 4000, // The sum up of all product-specific discounts applied in this particular request
        "total_applied_discount_amount": 6500, // The sum of all order-level and all product-specific discounts applied in this particular request.
        "items": [
            {
                "object": "order_item",
                "source_id": "adv-mug",
                "related_object": "product",
                "quantity": 2, // The quantity of the particular item in the cart. This should be shown to the end-customer
                "amount": 2000, // The total amount of the order item, i.e. price * quantity. This should be shown to the end-customer
                "discount_amount": 2000, // The sum of all item-level discounts applied to this item.
                "applied_discount_amount": 2000, // The item-level discount applied by this particular redeemable. This should be shown to the end-customer
                "price": 1000, // Unit price of an item. This should be shown to the end-customer
                "subtotal_amount": 0, // Final order item amount after the applied item-level discount. In this case, the discount amount equals the product amount, making the subtotal amount equal 0. This should be shown to the end-customer
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
                "object": "order_item", // The comments are analogical like for the item above
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
                "subtotal_amount": 5000, // Here "subtotal_amount" equals "amount" because this product is not covered by the Adventure brand discount
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

The image below shows an example of an order summary for the purchase shown in the response above. The order summary includes the data recommended in the comments.

![](https://files.readme.io/c2b6a88-guides_development_data_parsing_order_summary_01.png)

### Free items

In the case of free item campaigns, there is additional data in the response which also can be shown to the end-customer, as commented in the code. This example covers any type of campaign in which an item (here, an Adventure Mug product) is added to the cart for free, whether it is applied from a voucher, cart promotion, gift card, or otherwise.

In this section, two cases are covered:
- the free item is already in the cart,
- the free item is not in the cart.

#### Free item already in the cart

In this example, the cart includes an Adventure Mug and one mug is added for free.

<!-- Make the terminology consistent:
- order items
- items
- products

Pick one for the code comments! -->

```json Response
"order": {
        "id": "ord_OJXfKGdC2pCpKVYm2BsSTgZ0",
        "source_id": null,
        "created_at": "2023-12-15T11:13:13.576Z",
        "updated_at": null,
        "status": "PAID",
        "amount": 7000, // The order amount before applying any discount, including the free item.
        "items_discount_amount": 1000, // The sum of all discount amounts which are applied to specific products. In this case, this is the full price for the free item
        "total_discount_amount": 1000, // The sum of all order-level and all product-specific discounts. In this case, this is this the full price for the free item. This should be shown to the end-customer
        "total_amount": 6000, // The order amount after applying all the discounts. This should be shown to the end-customer
        "items_applied_discount_amount": 1000, // The sum up of all product-specific discounts applied in this particular request
        "total_applied_discount_amount": 1000, // The sum of all order-level and all product-specific discounts applied in this particular request.
        "items": [
            {
                "object": "order_item",
                "source_id": "adv-mug",
                "related_object": "product",
                "quantity": 2, // The quantity of the particular item in the cart. This includes the free item. This should be shown to the end-customer
                "discount_quantity": 1, // Number of dicounted items. In this case, only one free mug is added. This should be shown to the end-customer
                "initial_quantity": 1, // Number of items the end-customer placed in the cart. This can be shown to the end-customer
                "amount": 2000, // The total amount of the order item, i.e. price * quantity. This should be shown to the end-customer
                "discount_amount": 1000, // The sum of all item-level discounts applied to this item. This equals the price of the free item.
                "initial_amount": 1000, // This is the sum of amounts for the order items which the end-customer added to the cart
                "applied_discount_amount": 1000, // The item-level discount applied by this particular redeemable. This equals the price of the free item. This should be shown to the end-customer
                "price": 1000, // Unit price of an item. This should be shown to the end-customer
                "subtotal_amount": 1000, // Final order item amount after the applied item-level discount. In this case, this equals the initial amount as no other discounts are applied. This should be shown to the end-customer
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

#### Free item not in the cart