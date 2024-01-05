---
title: Data Parsing
excerpt: Learn how to read and use data sent by Voucherify
categorySlug: development
slug: data-parsing
type: basic
hidden: false
order: 45
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
            "date": "2024-01-01T01:11:11.224Z",
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
                "created_at": "2024-01-01T01:11:11.264Z",
                "object": "voucher"
            },
            "object": "redemption"
        }
    ],
    "order": {
        "id": "ord_iB08cMWm3sM3mWRJW17h62Pf",
        "source_id": null,
        "created_at": "2024-01-01T11:11:11.184Z",
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

Code plus description, plus a link to the API reference

### Item object – response analysis

Code plus description, plus a link to the API reference

 -->

## Data to be shown

Voucherify supports many different use cases. Once the data are mapped correctly, the data can be shown to end-customers in various contexts. The following sections contain snippets of JSON responses from the Voucherify API [redemption](ref:redeem-stacked-discounts) endpoint.

See the comments in the code to find suggestions as to which data are worth showing to an end-customer.

### Discounts

In the case of discounts, the end-customer can be shown the data as commented in the code. This example covers any redeemed discount applied to the end-customer, whether it is applied from a discount coupon, cart promotion, gift card, or pay with points.

In this example, two discounts are applied:
- a discount that reduces each item subtotal by $20 and covers only the products with `"brand": "Adventure"` metadata,
- a discount that reduces the cart's total price by $25.

A Star thermal bottle is added as a reference item that is not covered by any discounts.

```json Response
"order": {
        "id": "ord_tc4yusJRqAY87ybmvhnPkJ6u",
        "source_id": null,
        "created_at": "2024-01-01T11:11:11.533Z",
        "updated_at": null,
        "status": "PAID",
        "amount": 14000, // The order amount before applying any discount. This should be shown to the end-customer.
        "discount_amount": 2500, // The sum of all discount amounts which are applied to the whole cart only. This should be shown to the end-customer.
        "applied_discount_amount": 2500, // The order-level discount applied in this particular request.
        "items_discount_amount": 4000, // The sum of all discount amounts which are applied to specific products.
        "total_discount_amount": 6500, // The sum of all order-level and all product-specific discounts. This should be shown to the end-customer.
        "items_applied_discount_amount": 4000, // The sum up of all product-specific discounts applied in this particular request.
        "total_applied_discount_amount": 6500, // The sum of all order-level and all product-specific discounts applied in this particular request.
        "total_amount": 7500, // The order amount after applying all the discounts. This should be shown to the end-customer.
        "items": [
            {
                "object": "order_item",
                "source_id": "adv-mug",
                "related_object": "product",
                "quantity": 3, // The quantity of the particular item in the cart. This should be shown to the end-customer.
                "amount": 3000, // The total amount of the order item, i.e. price * quantity. This should be shown to the end-customer.
                "discount_amount": 2000, // The sum of all item-level discounts applied to this item.
                "applied_discount_amount": 2000, // The item-level discount applied by all applicable redeemables. In this case, it is the $20 discount. This should be shown to the end-customer.
                "price": 1000, // Unit price of an item. This should be shown to the end-customer.
                "subtotal_amount": 1000, // Final order item amount after the applied item-level discount. This should be shown to the end-customer.
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
                "object": "order_item", // The comments are the same as in the `adv-mug` item above.
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
                "object": "order_item", // This order item is not covered by any discount. The response shows details for a typical order item.
                "source_id": "star-th-bottle",
                "related_object": "product",
                "quantity": 2, // The quantity of the particular item in the cart. This should be shown to the end-customer.
                "amount": 5000, // The total amount of the order item, i.e. price * quantity. This should be shown to the end-customer.
                "price": 2500, // Unit price of an item. This should be shown to the end-customer.
                "subtotal_amount": 5000, // Here, "subtotal_amount" equals "amount" because this product is not covered by the Adventure brand discount.
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

![](https://files.readme.io/84830b5-guides_development_data_parsing_order_summary_01.png "An order summary showing the cart representing the example described in the response.")

### Free items

In the case of free item campaigns, there is additional data in the response which also can be shown to the end-customer, as commented in the code. This example covers any type of campaign in which an item (here, an Adventure mug product) is added to the cart for free, whether it is applied from a voucher, cart promotion, gift card, or otherwise.

In this section, two cases are covered:
- the free item is already in the cart,
- the free item is not in the cart.

#### Free item already in the cart

In this example, the cart includes an Adventure mug and one mug is added for free. A Star thermal bottle is added as a reference item that is not covered by any discounts.

Check the request tab for reference.

<!-- Make the terminology consistent:
- order items
- items
- products

Pick one for the code comments! -->

```json Response
"order": {
        "id": "ord_OJXfKGdC2pCpKVYm2BsSTgZ0",
        "source_id": null,
        "created_at": "2024-01-01T11:11:11.576Z",
        "updated_at": null,
        "status": "PAID",
        "amount": 7000, // The order amount before applying any discount, including the free item. This should be shown to the end-customer.
        "items_discount_amount": 1000, // The sum of all discount amounts which are applied to specific products. In this case, this is the full price for the free item.
        "total_discount_amount": 1000, // The sum of all order-level and all product-specific discounts. In this case, this is this the full price for the free item. This should be shown to the end-customer.
        "total_amount": 6000, // The order amount after applying all the discounts. This should be shown to the end-customer.
        "items_applied_discount_amount": 1000, // The sum up of all product-specific discounts applied in this particular request.
        "total_applied_discount_amount": 1000, // The sum of all order-level and all product-specific discounts applied in this particular request.
        "items": [
            {
                "object": "order_item",
                "source_id": "adv-mug",
                "related_object": "product",
                "quantity": 2, // The quantity of the particular item in the cart. This includes the free item. This should be shown to the end-customer.
                "discount_quantity": 1, // Number of dicounted items. In this case, only one free mug is added. This should be shown to the end-customer.
                "initial_quantity": 1, // Number of the items which the end-customer placed in the cart. This can be shown to the end-customer.
                "amount": 2000, // The total amount of the order item, i.e. price * quantity. This should be shown to the end-customer.
                "discount_amount": 1000, // The sum of all item-level discounts applied to this item. This equals the price of the free item.
                "initial_amount": 1000, // This is the sum of amounts for the order items which the end-customer added to the cart.
                "applied_discount_amount": 1000, // The item-level discount applied by all applicable redeemables. In this case, it equals the price of the free item. This should be shown to the end-customer.
                "price": 1000, // Unit price of an item. This should be shown to the end-customer.
                "subtotal_amount": 1000, // Final order item amount after the applied item-level discount. In this case, this equals the initial amount as no other discounts are applied. This should be shown to the end-customer.
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
                "object": "order_item", // This order item is not covered by any discount. The response shows details for a typical order item.
                "source_id": "star-th-bottle",
                "related_object": "product",
                "quantity": 2, // The quantity of the particular item in the cart. This should be shown to the end-customer.
                "amount": 5000, // The total amount of the order item, i.e. price * quantity. This should be shown to the end-customer.
                "price": 2500, // Unit price of an item. This should be shown to the end-customer.
                "subtotal_amount": 5000, // Here, "subtotal_amount" equals "amount" because this product is not covered by any discount.
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
```json Request
{
    "customer": {
        "source_id": "test_customer_id_2"
    },
    "redeemables": [ // In this case, the free mug is added with a voucher.
        {
            "object": "voucher",
            "id": "Always-add-prods-5"
        }
    ],
    "order": { // The end-customer ordered one Adventure mug and two Start thermal bottles.
        "items": [
            {
                "source_id": "adv-mug",
                "related_object": "product",
                "price": 1000,
                "quantity": 1,
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

The image below shows an example of an order summary for the purchase shown in the response above.

![](https://files.readme.io/da280ae-guides_development_data_parsing_order_summary_02.png "An order summary showing the cart representing the example described in the response.")

#### Free item not in the cart

In this example, the cart does not include an Adventure mug, so one mug is added for free. A Star thermal bottle is added as a reference item that is not covered by any discounts.

Check the request tab for reference.

```json Response
"order": {
        "id": "ord_nVg612IxXYkTmoFJuk5d1nyZ",
        "source_id": null,
        "created_at": "2024-01-01T11:11:11.111111Z",
        "updated_at": null,
        "status": "PAID",
        "amount": 5000, // The order amount before applying any discount. This should be shown to the end-customer.
        "total_amount": 5000, // The order amount after applying all the discounts. This should be shown to the end-customer.
        "items": [
            {
                "object": "order_item", // This order item is not covered by any discount. The response shows details for a typical order item.
                "source_id": "star-th-bottle",
                "related_object": "product",
                "quantity": 2, // The quantity of the particular item in the cart. This should be shown to the end-customer.
                "amount": 5000, // The total amount of the order item, i.e. price * quantity. This should be shown to the end-customer.
                "price": 2500, // Unit price of an item. This should be shown to the end-customer.
                "subtotal_amount": 5000, // Here, "subtotal_amount" equals "amount" because this product is not covered by any discount.
                "product": {
                    "id": "prod_0df14b7e7d8975079d",
                    "source_id": "star-th-bottle",
                    "name": "Star Thermal Bottle",
                    "metadata": {
                        "brand": "Star"
                    },
                }
            },
            {
                "object": "order_item", // This is the item added for free.
                "product_id": "prod_0df14b3a6ad8f282a8",
                "quantity": 1, // The quantity of the particular item in the cart. In this case, it is the quantity of items added for free. This should be shown to the end-customer.
                "discount_quantity": 1, // Number of dicounted items. In this case, only one free mug is added. This should be shown to the end-customer.
                "initial_quantity": 0, // Number of the items which the end-customer placed in the cart. In this case, it is 0 because the end-customer did not have any mugs in the cart. This can be shown to the end-customer.
                "product": {
                    "id": "prod_0df14b3a6ad8f282a8",
                    "source_id": "adv-mug",
                    "name": "Adventure Mug"
                }
            }
        ]
}
```
```json Request
{
    "customer": {
        "source_id": "test_customer_id_2"
    },
    "redeemables": [ // In this case, the free mug is added with a voucher.
        {
            "object": "voucher",
            "id": "Always-add-prods-5"
        }
    ],
    "order": { // The end-customer ordered only two Start thermal bottles. That is why there is no object for the Adventure mug in the request.
        "items": [
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

The image below shows an example of an order summary for the purchase shown in the response above.

![](https://files.readme.io/d4a65de-guides_development_data_parsing_order_summary_03.png)