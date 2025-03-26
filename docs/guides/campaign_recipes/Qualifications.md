---
title: Qualification – Checking Eligibility
excerpt: null
categorySlug: campaigns-recipes
slug: checking-eligibility
type: basic
hidden: false
order: 1
---

## Overview

Sometimes you want to show a customer all the coupons they’re eligible for — taking into account their **attributes** as well as the **current content of their cart**.

Voucherify's [Qualifications API](ref:check-eligibility) helps recommend applicable promotions and coupons in the given customer and order context with filtering options based on campaign category and hierarchy.

The qualifications API can be applied (among others) for:
- Upsell scenarios - showing the customers the discounts available for the customer, encouraging the customer to adjust the cart to conform to the available promotions.
- Customer wallet - providing a list of vouchers the customer was assigned/received (in Voucherify's terms, a voucher was **published** to the customer) in the past that can be used for the current cart.
- Strike through price - showing new prices for a list of products after a promotional discount is applied.
- Showing coupons available for given products in a product catalog

![Product Catalog Coupon](https://files.readme.io/c955bb2-campaign_recipes_qualification_checking_eligibility_productCatalogCoupon.png "Product Catalog Coupon")

## API Endpoints

There are two dedicated API Endpoints for checking eligibility:

| **Endpoint**                           | **Link**                                                                               |
| :------------------------------------- | :------------------------------------------------------------------------------------- |
| **POST** `v1/v1/qualifications`        | Check eligibility using the [server-side endpoint](ref:check-eligibility).             |
| **POST** `v1/client/v1/qualifications` | Check eligibility using the [client-side endpoint](ref:check-eligibility-client-side). |

You can find a description of the qualification object schema in the data model description [here](ref:qualification-object).

## Scenarios

To specify the types of promotions and codes that you would like to reveal to your customers, we introduced the option of including a scenario. A scenario defines the type of content that you would like to return from all the available campaigns and standalone codes that you've created in Voucherify.

| **Scenario**                  | **Possible Use Case**                                                                                                                                                        |
| :---------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ALL                           | Returns all redeemables available for the customer in one API request.                                                                                                       |
| CUSTOMER_WALLET               | returns vouchers applicable to the customer’s cart based on the vouchers assigned to the customer’s profile.                                                                 |
| AUDIENCE_ONLY                 | Returns all vouchers, promotion tiers, and campaigns available to the customer. Voucherify validates the rules based on the customer profile only.                           |
| PRODUCTS                      | Returns all promotions available for the products (when a discount is defined to be applied to the item or when the item is required in the validation rule).                |
| PRODUCTS_DISCOUNT             | Returns all promotions available for products when a discount is defined as applicable to specific item(s).                                                                  |
| PROMOTION_STACKS              | Returns the applicable promotion stacks.                                                                                                                                     |
| PRODUCTS_BY_CUSTOMER          | Returns all promotions available for a customer for the products (when a discount is defined to be applied to the item or when the item is required in the validation rule). |
| PRODUCTS_DISCOUNT_BY_CUSTOMER | Returns all promotions available for a customer for products when a discount is defined as applicable to specific item(s).                                                   |

In the request, you can add [options](ref:check-eligibility) to configure the parameters returned in the response, e.g. filters for types of redeemables or sorting rules like `BEST_DEAL` or `LEAST_DEAL`.

## Use Cases

To show a couple of the use cases that are possible with the qualifications API, we'll show it using the following scenarios. Depending on the different scenario, we'll send a slightly different API call and the results will be returned in the context of the scenario.

### Customer profile

The customer is assigned 2 vouchers.

| **Campaign**                                       | **Details**                                                                                        |
| :------------------------------------------------- | :------------------------------------------------------------------------------------------------- |
| Gift card campaign                                 | The gift voucher maIxGd5r can be used by the owner of the code only                                |
| Discount campaign<br>camp_f78wOLL9cE2WCSdtliT0UIh0 | Voucher code vm3HkNF2 from a 10% discount for BOSCH products redeemable by the owners of the code. |

### Promotions
The use case assumes there are also two promotions available.
1. 10% for everyone on entire order
2. 20% for Digital books for VIP customers.

We'll send a qualification API call with several different settings and explain the results.

---
### Case 1 - Logged in vs non-logged in customers

- If the customer is not logged in, the customer will see only one promotion - the 10% for everyone. | `"scenario": "ALL"`
- If they are logged in, they will see two promotion tiers and all the vouchers they have on their hand. | `"scenario": "ALL"`

#### Not Logged in

Since we cannot identify the customer, we can not show redeemables that are out of scope, i.e. that are not dependent on the customer profile.

![Promotions Available for non-logged in customers](https://files.readme.io/3dedd4a-campaign_recipes_qualification_checking_eligibility_availableOffersNotLoggedIn.png "Promotions Available for non-logged in customers")

```json Request
{
    "scenario": "ALL",
    "order": {
        "items": [
            {
                "source_id": "bosch_product_1",
                "quantity": "1",
                "price": 10000,
                "related_object": "product",
                "product": {
                    "name": "BOSCH GDR 120-LI Cordless Impact Driver / Wrench"
                }
            },
            {
                "source_id": "digital_book",
                "quantity": "1",
                "price": 1500,
                "related_object": "product",
                "product": {
                    "name": "Digital Book"
                }
            }
        ]
    },
    "options": {
        "expand": [
            "redeemable"
        ]
    }
}
```
```json Response
{
    "redeemables": {
        "object": "list",
        "data_ref": "data",
        "data": [
            {
                "id": "promo_mIVcCKyEOu47LPDjXn3rTUC1",
                "object": "promotion_tier",
                "created_at": "2023-09-18T11:52:08.234Z",
                "result": {
                    "discount": {
                        "type": "PERCENT",
                        "effect": "APPLY_TO_ORDER",
                        "percent_off": 10,
                        "is_dynamic": false
                    }
                },
                "order": {
                    "amount": 11500,
                    "discount_amount": 1150,
                    "total_discount_amount": 1150,
                    "total_amount": 10350,
                    "applied_discount_amount": 1150,
                    "total_applied_discount_amount": 1150,
                    "items": [
                        {
                            "object": "order_item",
                            "source_id": "bosch_product_1",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 10000,
                            "price": 10000,
                            "subtotal_amount": 10000,
                            "product": {
                                "name": "BOSCH GDR 120-LI Cordless Impact Driver / Wrench"
                            }
                        },
                        {
                            "object": "order_item",
                            "source_id": "digital_book",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 1500,
                            "price": 1500,
                            "subtotal_amount": 1500,
                            "product": {
                                "name": "Digital Book"
                            }
                        }
                    ],
                    "metadata": {},
                    "customer_id": null,
                    "referrer_id": null,
                    "object": "order"
                },
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
                },
                "metadata": {},
                "name": "10% off",
                "banner": "10% off",
                "campaign_id": "camp_orPbvjZ9OSmaZzRvj5gjT1kK",
                "campaign_name": "Promotion - % off"
            }
        ],
        "total": 1,
        "has_more": false
    },
    "order": {
        "items": [
            {
                "object": "order_item",
                "source_id": "bosch_product_1",
                "related_object": "product",
                "quantity": 1,
                "price": 10000,
                "product": {
                    "name": "BOSCH GDR 120-LI Cordless Impact Driver / Wrench"
                }
            },
            {
                "object": "order_item",
                "source_id": "digital_book",
                "related_object": "product",
                "quantity": 1,
                "price": 1500,
                "product": {
                    "name": "Digital Book"
                }
            }
        ],
        "metadata": {},
        "customer_id": null,
        "referrer_id": null,
        "object": "order"
    },
    "stacking_rules": {
        "redeemables_limit": 30,
        "applicable_redeemables_limit": 5
    }
}
```

#### Logged in

Once we know who the customer is, the Qualifications API can now return the promotions that are customer specific and the voucher codes the customer owns and that can be used right now.

This would then return the following:

| **Campaign**                                         | **Details**                                                                                           |
| :--------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| Gift card campaign                                   | The gift voucher maIxGd5r can be used by the owner of the code only                                   |
| Discount campaign<br>10% discount for BOSCH products | Voucher code vm3HkNF2 from a 10% discount for BOSCH products redeemable by the owners of the code     |
| 10% for everyone on entire order                     | The promotion is available for anyone and gives a 10% discount                                        |
| 20% for Digital books for VIP customers              | The promotion is available to customers who are VIP customers and is applicable to digital books only |

![Offers Available for logged in customers](https://files.readme.io/fff83fa-campaign_recipes_qualification_checking_eligibility_availableOffersLoggedIn.png "Offers Available for logged in customers")

```json Request
{
    "scenario": "ALL",
    "customer": {
        "source_id": "GUID_123_john_wayne",
        "name": "John Wayne",
        "metadata": {
            "tier": "VIP"
        }
    },
    "order": {
        "items": [
            {
                "source_id": "bosch_product_1",
                "quantity": "1",
                "price": 10000,
                "related_object": "product",
                "product": {
                    "name": "BOSCH GDR 120-LI Cordless Impact Driver / Wrench"
                }
            },
            {
                "source_id": "digital_book",
                "quantity": "1",
                "price": 1500,
                "related_object": "product",
                "product": {
                    "name": "Digital Book"
                }
            }
        ]
    },
    "options": {
        "expand": [
            "redeemable"
        ]
    }
}
```
```json Response
{
    "redeemables": {
        "object": "list",
        "data_ref": "data",
        "data": [
            {
                "id": "promo_mIVcCKyEOu47LPDjXn3rTUC1",
                "object": "promotion_tier",
                "created_at": "2023-09-18T11:52:08.234Z",
                "result": {
                    "discount": {
                        "type": "PERCENT",
                        "effect": "APPLY_TO_ORDER",
                        "percent_off": 10,
                        "is_dynamic": false
                    }
                },
                "order": {
                    "amount": 11500,
                    "discount_amount": 1150,
                    "total_discount_amount": 1150,
                    "total_amount": 10350,
                    "applied_discount_amount": 1150,
                    "total_applied_discount_amount": 1150,
                    "items": [
                        {
                            "object": "order_item",
                            "source_id": "bosch_product_1",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 10000,
                            "price": 10000,
                            "subtotal_amount": 10000,
                            "product": {
                                "name": "BOSCH GDR 120-LI Cordless Impact Driver / Wrench"
                            }
                        },
                        {
                            "object": "order_item",
                            "source_id": "digital_book",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 1500,
                            "price": 1500,
                            "subtotal_amount": 1500,
                            "product": {
                                "name": "Digital Book"
                            }
                        }
                    ],
                    "metadata": {},
                    "customer_id": null,
                    "referrer_id": null,
                    "object": "order"
                },
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
                },
                "metadata": {},
                "name": "10% off",
                "banner": "10% off",
                "campaign_id": "camp_orPbvjZ9OSmaZzRvj5gjT1kK",
                "campaign_name": "Promotion - % off"
            },
            {
                "id": "maIxGd5r",
                "object": "voucher",
                "created_at": "2023-09-15T13:00:36.391Z",
                "result": {
                    "gift": {
                        "credits": 2500
                    }
                },
                "order": {
                    "amount": 11500,
                    "discount_amount": 2500,
                    "total_discount_amount": 2500,
                    "total_amount": 9000,
                    "applied_discount_amount": 2500,
                    "total_applied_discount_amount": 2500,
                    "items": [
                        {
                            "object": "order_item",
                            "source_id": "bosch_product_1",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 10000,
                            "price": 10000,
                            "subtotal_amount": 10000,
                            "product": {
                                "name": "BOSCH GDR 120-LI Cordless Impact Driver / Wrench"
                            }
                        },
                        {
                            "object": "order_item",
                            "source_id": "digital_book",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 1500,
                            "price": 1500,
                            "subtotal_amount": 1500,
                            "product": {
                                "name": "Digital Book"
                            }
                        }
                    ],
                    "metadata": {},
                    "customer_id": null,
                    "referrer_id": null,
                    "object": "order"
                },
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
                },
                "metadata": {},
                "campaign_id": "camp_blYBZY5V5KQ3PuLfzs0DmuX0",
                "campaign_name": "Gift Card Campaign Fall 2023"
            },
            {
                "id": "vm3HkNF2",
                "object": "voucher",
                "created_at": "2023-09-15T12:59:34.860Z",
                "result": {
                    "discount": {
                        "type": "PERCENT",
                        "effect": "APPLY_TO_ITEMS",
                        "percent_off": 10,
                        "is_dynamic": false
                    }
                },
                "order": {
                    "amount": 11500,
                    "items_discount_amount": 1000,
                    "total_discount_amount": 1000,
                    "total_amount": 10500,
                    "items_applied_discount_amount": 1000,
                    "total_applied_discount_amount": 1000,
                    "items": [
                        {
                            "object": "order_item",
                            "source_id": "bosch_product_1",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 10000,
                            "discount_amount": 1000,
                            "applied_discount_amount": 1000,
                            "price": 10000,
                            "subtotal_amount": 9000,
                            "product": {
                                "name": "BOSCH GDR 120-LI Cordless Impact Driver / Wrench"
                            }
                        },
                        {
                            "object": "order_item",
                            "source_id": "digital_book",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 1500,
                            "price": 1500,
                            "subtotal_amount": 1500,
                            "product": {
                                "name": "Digital Book"
                            }
                        }
                    ],
                    "metadata": {},
                    "customer_id": null,
                    "referrer_id": null,
                    "object": "order"
                },
                "applicable_to": {
                    "data": [
                        {
                            "object": "products_collection",
                            "id": "pc_kHDQEBDVn8G04oxvgzRf5et9",
                            "strict": false,
                            "effect": "APPLY_TO_EVERY",
                            "order_item_indices": [
                                0
                            ]
                        },
                        {
                            "object": "product",
                            "id": "bosch_product_1",
                            "source_id": "bosch_product_1",
                            "strict": true,
                            "effect": "APPLY_TO_EVERY",
                            "order_item_indices": [
                                0
                            ]
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
                },
                "metadata": {},
                "campaign_id": "camp_f78wOLL9cE2WCSdtliT0UIh0",
                "campaign_name": "10% discount for BOSCH products"
            },
            {
                "id": "promo_QwH9khhoiNAthPykdnpAcpAi",
                "object": "promotion_tier",
                "created_at": "2023-09-15T12:48:11.443Z",
                "result": {
                    "discount": {
                        "type": "PERCENT",
                        "effect": "APPLY_TO_ITEMS",
                        "percent_off": 20,
                        "is_dynamic": false
                    }
                },
                "order": {
                    "amount": 11500,
                    "items_discount_amount": 300,
                    "total_discount_amount": 300,
                    "total_amount": 11200,
                    "items_applied_discount_amount": 300,
                    "total_applied_discount_amount": 300,
                    "items": [
                        {
                            "object": "order_item",
                            "source_id": "bosch_product_1",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 10000,
                            "price": 10000,
                            "subtotal_amount": 10000,
                            "product": {
                                "name": "BOSCH GDR 120-LI Cordless Impact Driver / Wrench"
                            }
                        },
                        {
                            "object": "order_item",
                            "source_id": "digital_book",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 1500,
                            "discount_amount": 300,
                            "applied_discount_amount": 300,
                            "price": 1500,
                            "subtotal_amount": 1200,
                            "product": {
                                "name": "Digital Book"
                            }
                        }
                    ],
                    "metadata": {},
                    "customer_id": null,
                    "referrer_id": null,
                    "object": "order"
                },
                "applicable_to": {
                    "data": [
                        {
                            "object": "products_collection",
                            "id": "pc_KM2mzWPu77CFvZX2wWBqVKVp",
                            "strict": false,
                            "effect": "APPLY_TO_EVERY",
                            "order_item_indices": [
                                1
                            ]
                        },
                        {
                            "object": "product",
                            "id": "digital_book",
                            "source_id": "digital_book",
                            "strict": true,
                            "effect": "APPLY_TO_EVERY",
                            "order_item_indices": [
                                1
                            ]
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
                },
                "metadata": {},
                "name": "20% off Digital books for VIP customers",
                "banner": "20% off Digital books for VIP customers",
                "campaign_id": "camp_orPbvjZ9OSmaZzRvj5gjT1kK",
                "campaign_name": "Promotion - % off"
            }
        ],
        "total": 4,
        "has_more": false
    },
    "tracking_id": "track_wBhrnKJfwZMTuOpQ+uItfJXOJ6STUymy",
    "order": {
        "items": [
            {
                "object": "order_item",
                "source_id": "bosch_product_1",
                "related_object": "product",
                "quantity": 1,
                "price": 10000,
                "product": {
                    "name": "BOSCH GDR 120-LI Cordless Impact Driver / Wrench"
                }
            },
            {
                "object": "order_item",
                "source_id": "digital_book",
                "related_object": "product",
                "quantity": 1,
                "price": 1500,
                "product": {
                    "name": "Digital Book"
                }
            }
        ],
        "metadata": {},
        "customer_id": null,
        "referrer_id": null,
        "object": "order"
    },
    "stacking_rules": {
        "redeemables_limit": 30,
        "applicable_redeemables_limit": 5
    }
}
```

> Case 1 Summary
>
> The qualification request returned all of the possible vouchers and redeemables the customer could use right now. You can use the qualifications API request to enhance the customer experience by:
> - Showing the current promotions available for everyone on the home page
> - Showing a different set of promotions available for a specific customer on the home page
> - Present the list of available discounts during the customer's checkout

All of these scenarios require one API request per attempt.

> 📘 Audience only
>
> This scenario considered the promotions, voucher codes, and voucher campaigns available for the customer to be used on the current cart. You can experiment with the "Audience Only" scenario that will return all of the discounts based on the customer profile alone, enabling you to create upsell scenarios.

---
### Case 2 - Vouchers assigned to customer

We'll send the same request, but with a different `scenario` setting.

Only the voucher codes assigned to the customer will be returned. `"scenario": "CUSTOMER_WALLET"`

![Product Catalog Coupon](https://files.readme.io/be0044a-campaign_recipes_qualification_checking_eligibility_myCoupons.png "Product Catalog Coupon")

```json Request
{
    "scenario": "CUSTOMER_WALLET",
    "customer": {
        "source_id": "GUID_123_john_wayne",
        "name": "John Wayne",
        "metadata": {
            "tier": "VIP"
        }
    },
    "order": {
        "items": [
            {
                "source_id": "bosch_product_1",
                "quantity": "1",
                "price": 10000,
                "related_object": "product",
                "product": {
                    "name": "BOSCH GDR 120-LI Cordless Impact Driver / Wrench"
                }
            },
            {
                "source_id": "digital_book",
                "quantity": "1",
                "price": 1500,
                "related_object": "product",
                "product": {
                    "name": "Digital Book"
                }
            }
        ]
    },
    "options": {
        "expand": [
            "redeemable"
        ]
    }
}
```
```json Response
{
    "redeemables": {
        "object": "list",
        "data_ref": "data",
        "data": [
            {
                "id": "maIxGd5r",
                "object": "voucher",
                "created_at": "2023-09-15T13:00:36.391Z",
                "result": {
                    "gift": {
                        "credits": 2500
                    }
                },
                "order": {
                    "amount": 11500,
                    "discount_amount": 2500,
                    "total_discount_amount": 2500,
                    "total_amount": 9000,
                    "applied_discount_amount": 2500,
                    "total_applied_discount_amount": 2500,
                    "items": [
                        {
                            "object": "order_item",
                            "source_id": "bosch_product_1",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 10000,
                            "price": 10000,
                            "subtotal_amount": 10000,
                            "product": {
                                "name": "BOSCH GDR 120-LI Cordless Impact Driver / Wrench"
                            }
                        },
                        {
                            "object": "order_item",
                            "source_id": "digital_book",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 1500,
                            "price": 1500,
                            "subtotal_amount": 1500,
                            "product": {
                                "name": "Digital Book"
                            }
                        }
                    ],
                    "metadata": {},
                    "customer_id": null,
                    "referrer_id": null,
                    "object": "order"
                },
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
                },
                "metadata": {},
                "campaign_id": "camp_blYBZY5V5KQ3PuLfzs0DmuX0",
                "campaign_name": "Gift Card Campaign Fall 2023"
            },
            {
                "id": "vm3HkNF2",
                "object": "voucher",
                "created_at": "2023-09-15T12:59:34.860Z",
                "result": {
                    "discount": {
                        "type": "PERCENT",
                        "effect": "APPLY_TO_ITEMS",
                        "percent_off": 10,
                        "is_dynamic": false
                    }
                },
                "order": {
                    "amount": 11500,
                    "items_discount_amount": 1000,
                    "total_discount_amount": 1000,
                    "total_amount": 10500,
                    "items_applied_discount_amount": 1000,
                    "total_applied_discount_amount": 1000,
                    "items": [
                        {
                            "object": "order_item",
                            "source_id": "bosch_product_1",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 10000,
                            "discount_amount": 1000,
                            "applied_discount_amount": 1000,
                            "price": 10000,
                            "subtotal_amount": 9000,
                            "product": {
                                "name": "BOSCH GDR 120-LI Cordless Impact Driver / Wrench"
                            }
                        },
                        {
                            "object": "order_item",
                            "source_id": "digital_book",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 1500,
                            "price": 1500,
                            "subtotal_amount": 1500,
                            "product": {
                                "name": "Digital Book"
                            }
                        }
                    ],
                    "metadata": {},
                    "customer_id": null,
                    "referrer_id": null,
                    "object": "order"
                },
                "applicable_to": {
                    "data": [
                        {
                            "object": "products_collection",
                            "id": "pc_kHDQEBDVn8G04oxvgzRf5et9",
                            "strict": false,
                            "effect": "APPLY_TO_EVERY",
                            "order_item_indices": [
                                0
                            ]
                        },
                        {
                            "object": "product",
                            "id": "bosch_product_1",
                            "source_id": "bosch_product_1",
                            "strict": true,
                            "effect": "APPLY_TO_EVERY",
                            "order_item_indices": [
                                0
                            ]
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
                },
                "metadata": {},
                "campaign_id": "camp_f78wOLL9cE2WCSdtliT0UIh0",
                "campaign_name": "10% discount for BOSCH products"
            }
        ],
        "total": 2,
        "has_more": false
    },
    "tracking_id": "track_wBhrnKJfwZMTuOpQ+uItfJXOJ6STUymy",
    "order": {
        "items": [
            {
                "object": "order_item",
                "source_id": "bosch_product_1",
                "related_object": "product",
                "quantity": 1,
                "price": 10000,
                "product": {
                    "name": "BOSCH GDR 120-LI Cordless Impact Driver / Wrench"
                }
            },
            {
                "object": "order_item",
                "source_id": "digital_book",
                "related_object": "product",
                "quantity": 1,
                "price": 1500,
                "product": {
                    "name": "Digital Book"
                }
            }
        ],
        "metadata": {},
        "customer_id": null,
        "referrer_id": null,
        "object": "order"
    },
    "stacking_rules": {
        "redeemables_limit": 30,
        "applicable_redeemables_limit": 5
    }
}
```

> Case 2 Summary
>
> The customer wallet scenario returned the list of vouchers the customer can use right now. This mechanism enables you to show the customer, at the cart level, all of his/her vouchers he/she can use, including the gift vouchers and loyalty cards that can be used as the means of payment, enabling your customers to choose a specific reward for themselves, or allowing you to apply the discounts automatically.

---
### Case 3 - Vouchers applicable to specific products

Only a promotion that is applicable to items in the cart. `"scenario": "PRODUCTS_DISCOUNT"`

![Product Coupons In Cart](https://files.readme.io/dfd3e1f-campaign_recipes_qualification_checking_eligibility_productCouponsInCart.png "Product Coupons In Cart")

```json Request
{
    "scenario": "PRODUCTS_DISCOUNT",
    "customer": {
        "source_id": "GUID_123_john_wayne",
        "name": "John Wayne",
        "metadata": {
            "tier": "VIP"
        }
    },
    "order": {
        "items": [
            {
                "source_id": "bosch_product_1",
                "quantity": "1",
                "price": 10000,
                "related_object": "product",
                "product": {
                    "name": "BOSCH GDR 120-LI Cordless Impact Driver / Wrench"
                }
            },
            {
                "source_id": "digital_book",
                "quantity": "1",
                "price": 1500,
                "related_object": "product",
                "product": {
                    "name": "Digital Book"
                }
            }
        ]
    },
    "options": {
        "expand": [
            "redeemable"
        ]
    }
}
```
```json Response
{
    "redeemables": {
        "object": "list",
        "data_ref": "data",
        "data": [
            {
                "id": "vm3HkNF2",
                "object": "voucher",
                "created_at": "2023-09-15T12:59:34.860Z",
                "result": {
                    "discount": {
                        "type": "PERCENT",
                        "effect": "APPLY_TO_ITEMS",
                        "percent_off": 10,
                        "is_dynamic": false
                    }
                },
                "order": {
                    "amount": 11500,
                    "items_discount_amount": 1000,
                    "total_discount_amount": 1000,
                    "total_amount": 10500,
                    "items_applied_discount_amount": 1000,
                    "total_applied_discount_amount": 1000,
                    "items": [
                        {
                            "object": "order_item",
                            "source_id": "bosch_product_1",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 10000,
                            "discount_amount": 1000,
                            "applied_discount_amount": 1000,
                            "price": 10000,
                            "subtotal_amount": 9000,
                            "product": {
                                "name": "BOSCH GDR 120-LI Cordless Impact Driver / Wrench"
                            }
                        },
                        {
                            "object": "order_item",
                            "source_id": "digital_book",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 1500,
                            "price": 1500,
                            "subtotal_amount": 1500,
                            "product": {
                                "name": "Digital Book"
                            }
                        }
                    ],
                    "metadata": {},
                    "customer_id": null,
                    "referrer_id": null,
                    "object": "order"
                },
                "applicable_to": {
                    "data": [
                        {
                            "object": "products_collection",
                            "id": "pc_kHDQEBDVn8G04oxvgzRf5et9",
                            "strict": false,
                            "effect": "APPLY_TO_EVERY",
                            "order_item_indices": [
                                0
                            ]
                        },
                        {
                            "object": "product",
                            "id": "bosch_product_1",
                            "source_id": "bosch_product_1",
                            "strict": true,
                            "effect": "APPLY_TO_EVERY",
                            "order_item_indices": [
                                0
                            ]
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
                },
                "metadata": {},
                "campaign_id": "camp_f78wOLL9cE2WCSdtliT0UIh0",
                "campaign_name": "10% discount for BOSCH products"
            },
            {
                "id": "camp_f78wOLL9cE2WCSdtliT0UIh0",
                "object": "campaign",
                "created_at": "2023-09-15T12:59:34.307Z",
                "result": {
                    "discount": {
                        "type": "PERCENT",
                        "effect": "APPLY_TO_ITEMS",
                        "percent_off": 10,
                        "is_dynamic": false
                    }
                },
                "order": {
                    "amount": 11500,
                    "items_discount_amount": 1000,
                    "total_discount_amount": 1000,
                    "total_amount": 10500,
                    "items_applied_discount_amount": 1000,
                    "total_applied_discount_amount": 1000,
                    "items": [
                        {
                            "object": "order_item",
                            "source_id": "bosch_product_1",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 10000,
                            "discount_amount": 1000,
                            "applied_discount_amount": 1000,
                            "price": 10000,
                            "subtotal_amount": 9000,
                            "product": {
                                "name": "BOSCH GDR 120-LI Cordless Impact Driver / Wrench"
                            }
                        },
                        {
                            "object": "order_item",
                            "source_id": "digital_book",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 1500,
                            "price": 1500,
                            "subtotal_amount": 1500,
                            "product": {
                                "name": "Digital Book"
                            }
                        }
                    ],
                    "metadata": {},
                    "customer_id": null,
                    "referrer_id": null,
                    "object": "order"
                },
                "applicable_to": {
                    "data": [
                        {
                            "object": "products_collection",
                            "id": "pc_kHDQEBDVn8G04oxvgzRf5et9",
                            "strict": false,
                            "effect": "APPLY_TO_EVERY",
                            "order_item_indices": [
                                0
                            ]
                        },
                        {
                            "object": "product",
                            "id": "bosch_product_1",
                            "source_id": "bosch_product_1",
                            "strict": true,
                            "effect": "APPLY_TO_EVERY",
                            "order_item_indices": [
                                0
                            ]
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
                },
                "metadata": {},
                "name": "10% discount for BOSCH products"
            },
            {
                "id": "promo_QwH9khhoiNAthPykdnpAcpAi",
                "object": "promotion_tier",
                "created_at": "2023-09-15T12:48:11.443Z",
                "result": {
                    "discount": {
                        "type": "PERCENT",
                        "effect": "APPLY_TO_ITEMS",
                        "percent_off": 20,
                        "is_dynamic": false
                    }
                },
                "order": {
                    "amount": 11500,
                    "items_discount_amount": 300,
                    "total_discount_amount": 300,
                    "total_amount": 11200,
                    "items_applied_discount_amount": 300,
                    "total_applied_discount_amount": 300,
                    "items": [
                        {
                            "object": "order_item",
                            "source_id": "bosch_product_1",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 10000,
                            "price": 10000,
                            "subtotal_amount": 10000,
                            "product": {
                                "name": "BOSCH GDR 120-LI Cordless Impact Driver / Wrench"
                            }
                        },
                        {
                            "object": "order_item",
                            "source_id": "digital_book",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 1500,
                            "discount_amount": 300,
                            "applied_discount_amount": 300,
                            "price": 1500,
                            "subtotal_amount": 1200,
                            "product": {
                                "name": "Digital Book"
                            }
                        }
                    ],
                    "metadata": {},
                    "customer_id": null,
                    "referrer_id": null,
                    "object": "order"
                },
                "applicable_to": {
                    "data": [
                        {
                            "object": "products_collection",
                            "id": "pc_KM2mzWPu77CFvZX2wWBqVKVp",
                            "strict": false,
                            "effect": "APPLY_TO_EVERY",
                            "order_item_indices": [
                                1
                            ]
                        },
                        {
                            "object": "product",
                            "id": "digital_book",
                            "source_id": "digital_book",
                            "strict": true,
                            "effect": "APPLY_TO_EVERY",
                            "order_item_indices": [
                                1
                            ]
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
                },
                "metadata": {},
                "name": "20% off Digital books for VIP customers",
                "banner": "20% off Digital books for VIP customers",
                "campaign_id": "camp_orPbvjZ9OSmaZzRvj5gjT1kK",
                "campaign_name": "Promotion - % off"
            }
        ],
        "total": 3,
        "has_more": false
    },
    "tracking_id": "track_wBhrnKJfwZMTuOpQ+uItfJXOJ6STUymy",
    "order": {
        "items": [
            {
                "object": "order_item",
                "source_id": "bosch_product_1",
                "related_object": "product",
                "quantity": 1,
                "price": 10000,
                "product": {
                    "name": "BOSCH GDR 120-LI Cordless Impact Driver / Wrench"
                }
            },
            {
                "object": "order_item",
                "source_id": "digital_book",
                "related_object": "product",
                "quantity": 1,
                "price": 1500,
                "product": {
                    "name": "Digital Book"
                }
            }
        ],
        "metadata": {},
        "customer_id": null,
        "referrer_id": null,
        "object": "order"
    },
    "stacking_rules": {
        "redeemables_limit": 30,
        "applicable_redeemables_limit": 5
    }
}
```

> Case 3 Summary
>
> Voucherify will return all the discounts that apply to the products you sent in the order. When a customer is browsing your products and is shown the product listing page, you can send, in the payload, the list of all the products the customer is presented and Voucherify will return all the discounts that apply to these products. The returned results can be visualized, for example, by a striked-through price.

---
### Case 4 - Upselling (audience only)

The upsell scenario displays all the incentives within customer's reach in their cart view and encourages them to purchase additional products. `"scenario": "AUDIENCE_ONLY"`

![Upselling](https://files.readme.io/accc476-guides_campaign_recipes_qualification_checking_eligibility_upselling.png "Upselling")

```json Request
{
    "scenario": "AUDIENCE_ONLY",
    "customer": { 
        "source_id": "15072024", 
        "name": "John Toolman", 
        "email": "john.toolman@voucherify.io", 
        "metadata": {
            "subscribed": false
        }
    },
    "order": {
        "items": [
            {
                "quantity": 1, 
                "price": 10000,  
                "amount": 10000,
                "source_id": "23425235", 
                "name": "GDR Drill",
                "related_object": "product",
                "product": {
                    "metadata": {
                        "category": "Tools",
                        "vendor": "Bosch",
                        "color": "gray"
                    }
                }
            },
            {
                "quantity": 1,
                "price": 40000,
                "amount": 40000, 
                "source_id": "327583490",
                "name": "GRW Stirring Mech.", 
                "related_object": "product",
                "product": {
                    "metadata": {
                        "category": "Tools",
                        "vendor": "Bosch",
                        "color": "dark_green"
                    }
                }
            }
        ]
    },
    "options": {
        "limit": 30,
        "starting_after": "null", 
        "sorting_rule": "DEFAULT",
        "expand": [
            "redeemable",
            "validation_rules",
            "category"
        ],
        "filters": {
            "resource_type": {
                "conditions": {
                    "$is": [
                        "promotion_tier"
                    ]
                }
            }
        }
    }
}
```
```json Response
{
    "redeemables": {
        "object": "list",
        "data_ref": "data",
        "data": [
            {
                "id": "promo_zEvnqe70cvuC1UZ4Dwpc8HIN",
                "object": "promotion_tier",
                "created_at": "2024-07-12T13:40:07.596Z",
                "result": {
                    "discount": {
                        "type": "PERCENT",
                        "effect": "APPLY_TO_ITEMS",
                        "percent_off": 25,
                        "is_dynamic": false
                    }
                },
                "order": {
                    "amount": 50000,
                    "total_amount": 50000,
                    "items": [
                        {
                            "object": "order_item",
                            "source_id": "23425235",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 10000,
                            "price": 10000,
                            "subtotal_amount": 10000,
                            "product": {
                                "id": "prod_0efff3875308dc5ab8",
                                "source_id": "23425235",
                                "name": "GDR Drill",
                                "metadata": {
                                    "category": "Tools",
                                    "vendor": "Bosch",
                                    "color": "gray"
                                },
                                "price": 10000
                            }
                        },
                        {
                            "object": "order_item",
                            "source_id": "327583490",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 40000,
                            "price": 40000,
                            "subtotal_amount": 40000,
                            "product": {
                                "id": "prod_0efff55b6308dc189f",
                                "source_id": "327583490",
                                "name": "GRW Stirring Mech.",
                                "metadata": {
                                    "category": "Tools",
                                    "vendor": "Bosch",
                                    "color": "dark_green"
                                },
                                "price": 40000
                            }
                        }
                    ],
                    "metadata": {},
                    "customer_id": null,
                    "referrer_id": null,
                    "object": "order"
                },
                "applicable_to": {
                    "data": [
                        {
                            "object": "product",
                            "id": "prod_0efff4bd5b88dc03ee",
                            "source_id": "23787597244",
                            "strict": false,
                            "effect": "APPLY_TO_EVERY",
                            "aggregated_quantity_limit": 1
                        }
                    ],
                    "total": 1,
                    "data_ref": "data",
                    "object": "list"
                },
                "inapplicable_to": {
                    "data": [],
                    "total": 0,
                    "data_ref": "data",
                    "object": "list"
                },
                "metadata": {
                    "button_link": "https://www.diytoolkit.com/products/mixing-accessories/bosch",
                    "button_text": "ADD MIXING ACCESSORIES",
                    "terms_and_conditions": [
                        "Discount applies only to BOSCH mixing accessories with the purchase of the BOSCH Stirring Mechanism.",
                        "Limit one discounted accessory per customer."
                    ]
                },
                "categories": [],
                "name": "Mix it Up with Power",
                "banner": "Buy any Bosch stirring mechanisms and get <b>25% off any Bosch mixing accessories</b>.",
                "campaign_id": "camp_BpaPSw3Ij0T0Hd7McHZn5hPF",
                "campaign_name": "Upselling",
                "validation_rules_assignments": {
                    "object": "list",
                    "data_ref": "data",
                    "data": [
                        {
                            "id": "asgm_kPomkMQRhDGCSnsf",
                            "rule_id": "val_Znc2zJvKopJm",
                            "related_object_id": "promo_zEvnqe70cvuC1UZ4Dwpc8HIN",
                            "related_object_type": "promotion_tier",
                            "object": "validation_rules_assignment",
                            "validation_status": "PARTIALLY_VALID",
                            "validation_omitted_rules": [
                                "1"
                            ]
                        }
                    ],
                    "total": 1
                }
            },
            {
                "id": "promo_NNdPNMKlHqBWLEOMD7F29Zbh",
                "object": "promotion_tier",
                "created_at": "2024-07-12T13:40:07.161Z",
                "result": {
                    "discount": {
                        "type": "PERCENT",
                        "effect": "APPLY_TO_ORDER",
                        "percent_off": 15,
                        "is_dynamic": false
                    }
                },
                "order": {
                    "amount": 50000,
                    "discount_amount": 7500,
                    "total_discount_amount": 7500,
                    "total_amount": 42500,
                    "applied_discount_amount": 7500,
                    "total_applied_discount_amount": 7500,
                    "items": [
                        {
                            "object": "order_item",
                            "source_id": "23425235",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 10000,
                            "price": 10000,
                            "subtotal_amount": 10000,
                            "product": {
                                "id": "prod_0efff3875308dc5ab8",
                                "source_id": "23425235",
                                "name": "GDR Drill",
                                "metadata": {
                                    "category": "Tools",
                                    "vendor": "Bosch",
                                    "color": "gray"
                                },
                                "price": 10000
                            }
                        },
                        {
                            "object": "order_item",
                            "source_id": "327583490",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 40000,
                            "price": 40000,
                            "subtotal_amount": 40000,
                            "product": {
                                "id": "prod_0efff55b6308dc189f",
                                "source_id": "327583490",
                                "name": "GRW Stirring Mech.",
                                "metadata": {
                                    "category": "Tools",
                                    "vendor": "Bosch",
                                    "color": "dark_green"
                                },
                                "price": 40000
                            }
                        }
                    ],
                    "metadata": {},
                    "customer_id": null,
                    "referrer_id": null,
                    "object": "order"
                },
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
                },
                "metadata": {
                    "button_link": "https://www.diytoolkit.com/products/tools/bosch",
                    "button_text": "ADD ADDITIONAL BOSCH TOOL",
                    "terms_and_conditions": [
                        "Discount applies to the entire purchase.",
                        "Must buy 3 BOSCH power tools to qualify.",
                        "Cannot be combined with other coupons or promotions."
                    ]
                },
                "categories": [
                    {
                        "id": "cat_0f00fcef1f89b84497",
                        "name": "Exclusive",
                        "hierarchy": 1,
                        "created_at": "2024-07-04T09:12:22.909Z",
                        "object": "category",
                        "stacking_rules_type": "EXCLUSIVE"
                    }
                ],
                "name": "Complete Your Set",
                "banner": "Add 3 Bosch power tools to your cart and <b>save 15% on the entire purchase</b>.",
                "campaign_id": "camp_BpaPSw3Ij0T0Hd7McHZn5hPF",
                "campaign_name": "Upselling",
                "validation_rules_assignments": {
                    "object": "list",
                    "data_ref": "data",
                    "data": [
                        {
                            "id": "asgm_wPUdL0bcM0a6ghsz",
                            "rule_id": "val_1UieF6chm4ZG",
                            "related_object_id": "promo_NNdPNMKlHqBWLEOMD7F29Zbh",
                            "related_object_type": "promotion_tier",
                            "object": "validation_rules_assignment",
                            "validation_status": "PARTIALLY_VALID",
                            "validation_omitted_rules": [
                                "1"
                            ]
                        }
                    ],
                    "total": 1
                }
            },
            {
                "id": "promo_efLUWNBKOeKvfMwrDCU6QdKH",
                "object": "promotion_tier",
                "created_at": "2024-07-12T13:40:06.969Z",
                "result": {
                    "discount": {
                        "type": "UNIT",
                        "effect": "ADD_MISSING_ITEMS",
                        "unit_off": 1,
                        "unit_type": "prod_0efff23a1648dc2df0",
                        "product": {
                            "id": "prod_0efff23a1648dc2df0",
                            "source_id": "2857934875983543",
                            "name": "Bosch Rapid Charger"
                        },
                        "is_dynamic": false
                    }
                },
                "order": {
                    "amount": 53500,
                    "initial_amount": 50000,
                    "items_discount_amount": 3500,
                    "total_discount_amount": 3500,
                    "total_amount": 50000,
                    "items_applied_discount_amount": 3500,
                    "total_applied_discount_amount": 3500,
                    "items": [
                        {
                            "object": "order_item",
                            "source_id": "23425235",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 10000,
                            "price": 10000,
                            "subtotal_amount": 10000,
                            "product": {
                                "id": "prod_0efff3875308dc5ab8",
                                "source_id": "23425235",
                                "name": "GDR Drill",
                                "metadata": {
                                    "category": "Tools",
                                    "vendor": "Bosch",
                                    "color": "gray"
                                },
                                "price": 10000
                            }
                        },
                        {
                            "object": "order_item",
                            "source_id": "327583490",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 40000,
                            "price": 40000,
                            "subtotal_amount": 40000,
                            "product": {
                                "id": "prod_0efff55b6308dc189f",
                                "source_id": "327583490",
                                "name": "GRW Stirring Mech.",
                                "metadata": {
                                    "category": "Tools",
                                    "vendor": "Bosch",
                                    "color": "dark_green"
                                },
                                "price": 40000
                            }
                        },
                        {
                            "object": "order_item",
                            "product_id": "prod_0efff23a1648dc2df0",
                            "quantity": 1,
                            "discount_quantity": 1,
                            "initial_quantity": 0,
                            "amount": 3500,
                            "discount_amount": 3500,
                            "initial_amount": 0,
                            "applied_discount_amount": 3500,
                            "applied_discount_quantity": 1,
                            "applied_quantity": 1,
                            "applied_quantity_amount": 3500,
                            "price": 3500,
                            "subtotal_amount": 0,
                            "product": {
                                "id": "prod_0efff23a1648dc2df0",
                                "source_id": "2857934875983543",
                                "name": "Bosch Rapid Charger",
                                "price": 3500
                            }
                        }
                    ],
                    "metadata": {},
                    "customer_id": null,
                    "referrer_id": null,
                    "object": "order"
                },
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
                },
                "metadata": {
                    "button_link": "https://www.diytoolkit.com/products/cordless-tool-kits",
                    "button_text": "ADD CORDLESS TOOL KIT.",
                    "terms_and_conditions": [
                        "Free charger with purchase of cordless tool kits only.",
                        "Limit one free charger per customer."
                    ]
                },
                "categories": [],
                "name": "Stay charged",
                "banner": "Buy any cordless tool kit and receive a <b>free rapid charger</b>.",
                "campaign_id": "camp_BpaPSw3Ij0T0Hd7McHZn5hPF",
                "campaign_name": "Upselling",
                "validation_rules_assignments": {
                    "object": "list",
                    "data_ref": "data",
                    "data": [
                        {
                            "id": "asgm_w7NCg6C4f2Hqrlo4",
                            "rule_id": "val_ZrnfCjDiSvIm",
                            "related_object_id": "promo_efLUWNBKOeKvfMwrDCU6QdKH",
                            "related_object_type": "promotion_tier",
                            "object": "validation_rules_assignment",
                            "validation_status": "PARTIALLY_VALID",
                            "validation_omitted_rules": [
                                "1"
                            ]
                        }
                    ],
                    "total": 1
                }
            },
            {
                "id": "promo_z0mYFqqnYo8eR8LW7HC2dWTk",
                "object": "promotion_tier",
                "created_at": "2024-07-12T13:40:06.805Z",
                "result": {
                    "discount": {
                        "type": "PERCENT",
                        "effect": "APPLY_TO_ITEMS",
                        "percent_off": 20,
                        "is_dynamic": false
                    }
                },
                "order": {
                    "amount": 50000,
                    "total_amount": 50000,
                    "items": [
                        {
                            "object": "order_item",
                            "source_id": "23425235",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 10000,
                            "price": 10000,
                            "subtotal_amount": 10000,
                            "product": {
                                "id": "prod_0efff3875308dc5ab8",
                                "source_id": "23425235",
                                "name": "GDR Drill",
                                "metadata": {
                                    "category": "Tools",
                                    "vendor": "Bosch",
                                    "color": "gray"
                                },
                                "price": 10000
                            }
                        },
                        {
                            "object": "order_item",
                            "source_id": "327583490",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 40000,
                            "price": 40000,
                            "subtotal_amount": 40000,
                            "product": {
                                "id": "prod_0efff55b6308dc189f",
                                "source_id": "327583490",
                                "name": "GRW Stirring Mech.",
                                "metadata": {
                                    "category": "Tools",
                                    "vendor": "Bosch",
                                    "color": "dark_green"
                                },
                                "price": 40000
                            }
                        }
                    ],
                    "metadata": {},
                    "customer_id": null,
                    "referrer_id": null,
                    "object": "order"
                },
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
                },
                "metadata": {
                    "button_link": "https://www.diytoolkit.com/products/stands-and-tables",
                    "button_text": "ADD BENCH TOOL",
                    "terms_and_conditions": [
                        "Discount applies only to tool stands and tables.",
                        "Cannot be combined with other coupons or promotions."
                    ]
                },
                "categories": [
                    {
                        "id": "cat_0f00fcef1f89b84497",
                        "name": "Exclusive",
                        "hierarchy": 1,
                        "created_at": "2024-07-04T09:12:22.909Z",
                        "object": "category",
                        "stacking_rules_type": "EXCLUSIVE"
                    }
                ],
                "name": "Enhance Your Workshop",
                "banner": "Purchase a bench tool and get <b>20% discount</b> on tool stands and tables.",
                "campaign_id": "camp_BpaPSw3Ij0T0Hd7McHZn5hPF",
                "campaign_name": "Upselling",
                "validation_rules_assignments": {
                    "object": "list",
                    "data_ref": "data",
                    "data": [
                        {
                            "id": "asgm_jGuPwTMgwN2A871D",
                            "rule_id": "val_S82j82DYDf5H",
                            "related_object_id": "promo_z0mYFqqnYo8eR8LW7HC2dWTk",
                            "related_object_type": "promotion_tier",
                            "object": "validation_rules_assignment",
                            "validation_status": "PARTIALLY_VALID",
                            "validation_omitted_rules": [
                                "1"
                            ]
                        }
                    ],
                    "total": 1
                }
            }
        ],
        "total": 4,
        "has_more": false,
    },
    "tracking_id": "track_6G9+vdeGnx+Zf09lzSq5dw==",
    "order": {
        "items": [
            {
                "object": "order_item",
                "source_id": "23425235",
                "related_object": "product",
                "quantity": 1,
                "amount": 10000,
                "price": 10000,
                "product": {
                    "id": "prod_0efff3875308dc5ab8",
                    "source_id": "23425235",
                    "name": "GDR Drill",
                    "metadata": {
                        "category": "Tools",
                        "vendor": "Bosch",
                        "color": "gray"
                    },
                    "price": 10000
                }
            },
            {
                "object": "order_item",
                "source_id": "327583490",
                "related_object": "product",
                "quantity": 1,
                "amount": 40000,
                "price": 40000,
                "product": {
                    "id": "prod_0efff55b6308dc189f",
                    "source_id": "327583490",
                    "name": "GRW Stirring Mech.",
                    "metadata": {
                        "category": "Tools",
                        "vendor": "Bosch",
                        "color": "dark_green"
                    },
                    "price": 40000
                }
            }
        ],
        "metadata": {},
        "customer_id": null,
        "referrer_id": null,
        "object": "order"
    },
    "stacking_rules": {
        "redeemables_limit": 30,
        "applicable_redeemables_limit": 5,
        "applicable_exclusive_redeemables_limit": 1,
        "exclusive_categories": [
            "cat_0f00fcef1f89b84497"
        ],
        "joint_categories": [],
        "redeemables_application_mode": "ALL",
        "redeemables_sorting_rule": "REQUESTED_ORDER"
    }
}
```

> Case 4 Summary
>
> Based on the customer order, Voucherify will encourage customers to buy a more expensive version of a product or add extra products from a matching theme adding various incentives. This process focuses on enhancing the customer's purchase to increase the total sale.

### Bundles

With bundles, you can create discount incentives that depend on the content of the customer's cart (`order.items` array in the request). For example, you can create a bundle of two thermal bottles and five products from a product collection that the customer must have in their cart to be eligible for a $10 discount for a hoodie.

The incentives based on a bundle behave differently depending on the qualification scenario. The incentives are returned depending on how the customer's cart meets bundle requirements:
- `ALL` – the cart must meet the bundle conditions for the incentive to be returned;
- `AUDIENCE_ONLY` – the cart does not have to meet the bundle conditions for the incentive to be returned;
- `CUSTOMER_WALLET` – the cart must meet the bundle conditions;
- `PRODUCTS` – the cart does not have to meet the bundle conditions;
- `PRODUCTS_DISCOUNT` – the incentive is returned if it is a discount that target products and if that discounted product is in the cart; however, the cart does not have to meet the bundle conditions;
- `PROMOTION_STACKS` – the cart must meet the bundle conditions;
- `PRODUCTS_BY_CUSTOMER` – the cart does not have to meet the bundle conditions
- `PRODUCTS_DISCOUNT_BY_CUSTOMER` – the incentive is returned if it is a discount that target products and if that discounted product is in the cart; however, the cart does not have to meet the bundle conditions.

If the bundle conditions are not met, but the incentive is returned nevertheless, the qualification will return the data showing which SKUs, products, or collections are missing and the missing quantity.

In the following example, the bundle conditions are:
- 2 Star Thermal Bottles
- 5 Adventure-brand products


Because the customer's cart (`order.items`) include only 1 Star Thermal Bottle, 1 Adventure T-shirt, and 2 pairs of Adventure Socks, the qualification returns data with `identified` products and their quantities that meet the bundle conditions and what is `missing` in the bundle, namely 1 Star Thermal Bottle and 2 items from the Adventure-brand collection (`"id": "pc_pWu3TzRFhJ99Xak7Z7QlynNa"`).

```json Qualification request
{
    "customer": {
        "source_id": "rdmr01"
    },
    "order": {
        "items": [
            {
                "product": {
                    "id": "prod_0fc35dfe978defeb6b",
                    "name": "Star Thermal Bottle",
                    "price": 2499,
                    "metadata": {
                        "brand": "Star"
                    }
                },
                "quantity": 1
            },
            {
                "product": {
                    "id": "prod_0fc35dfeaa0defeb73",
                    "name": "Adventure T-shirt",
                    "price": 1999,
                    "metadata": {
                        "brand": "Adventure"
                    }
                },
                "quantity": 1
            },
            {
                "product": {
                    "id": "prod_0fc35dfeabcdefeb80",
                    "name": "Adventure Socks",
                    "price": 499,
                    "metadata": {
                        "brand": "Adventure"
                    }
                },
                "quantity": 2
            }
        ]
    },
    "options": {
        "filters": {
            "campaign_type": {
                "conditions": {
                    "$is": [
                        "DISCOUNT_COUPONS"
                    ]
                }
            },
            "resource_type": {
                "conditions": {
                    "$is": [
                        "voucher"
                    ]
                }
            }
        },
        "expand": [
            "redeemable",
            "validation_rules"
        ],
        "limit": 1
    },
    "scenario": "AUDIENCE_ONLY"
}
```
```json Qualification response
{
    "redeemables": {
        "object": "list",
        "data_ref": "data",
        "data": [
            {
                "id": "BUNDLE-PROD-1c",
                "object": "voucher",
                "created_at": "2025-03-26T11:00:17.987Z",
                "result": {
                    "discount": {
                        "type": "AMOUNT",
                        "effect": "APPLY_TO_ITEMS",
                        "amount_off": 1000,
                        "aggregated_amount_limit": 10000,
                        "is_dynamic": false
                    },
                    "bundle": {
                        "quantity": 0,
                        "identified": [
                            {
                                "id": "prod_0fc35dfe978defeb6b",
                                "object": "product",
                                "item_index": 0,
                                "item_quantity": 1
                            },
                            {
                                "id": "prod_0fc35dfeaa0defeb73",
                                "object": "product",
                                "item_index": 1,
                                "item_quantity": 1
                            },
                            {
                                "id": "prod_0fc35dfeabcdefeb80",
                                "object": "product",
                                "item_index": 2,
                                "item_quantity": 2
                            }
                        ],
                        "missing": [
                            {
                                "id": "prod_0fc35dfe978defeb6b",
                                "object": "product",
                                "item_quantity": 1
                            },
                            {
                                "id": "pc_pWu3TzRFhJ99Xak7Z7QlynNa",
                                "object": "products_collection",
                                "item_quantity": 2
                            }
                        ]
                    }
                },
                "order": {
                    "amount": 5496,
                    "total_amount": 5496,
                    "items": [
                        {
                            "object": "order_item",
                            "id": "ordli_10568b16f101e97576",
                            "quantity": 1,
                            "initial_quantity": 1,
                            "amount": 2499,
                            "initial_amount": 2499,
                            "price": 2499,
                            "subtotal_amount": 2499,
                            "product": {
                                "id": "prod_0fc35dfe978defeb6b",
                                "source_id": "star-th-bottle",
                                "name": "Star Thermal Bottle",
                                "metadata": {
                                    "brand": "Star"
                                },
                                "price": 2499
                            }
                        },
                        {
                            "object": "order_item",
                            "id": "ordli_10568b16f101e97577",
                            "quantity": 1,
                            "initial_quantity": 1,
                            "amount": 1999,
                            "initial_amount": 1999,
                            "price": 1999,
                            "subtotal_amount": 1999,
                            "product": {
                                "id": "prod_0fc35dfeaa0defeb73",
                                "source_id": "adv-tshirt",
                                "name": "Adventure T-shirt",
                                "metadata": {
                                    "brand": "Adventure"
                                },
                                "price": 1999
                            }
                        },
                        {
                            "object": "order_item",
                            "id": "ordli_10568b16f101e97578",
                            "quantity": 2,
                            "initial_quantity": 2,
                            "amount": 998,
                            "initial_amount": 998,
                            "price": 499,
                            "subtotal_amount": 998,
                            "product": {
                                "id": "prod_0fc35dfeabcdefeb80",
                                "source_id": "adv-scks",
                                "name": "Adventure Socks",
                                "metadata": {
                                    "brand": "Adventure"
                                },
                                "price": 499
                            }
                        }
                    ],
                    "customer_id": null,
                    "referrer_id": null,
                    "object": "order"
                },
                "applicable_to": {
                    "data": [
                        {
                            "object": "products_collection",
                            "id": "pc_nw1xRgXB8cBzDJSrSbdSqJP4",
                            "strict": false,
                            "effect": "APPLY_TO_EVERY",
                            "skip_initially": 0,
                            "repeat": 1,
                            "target": "ITEM"
                        }
                    ],
                    "total": 1,
                    "data_ref": "data",
                    "object": "list"
                },
                "inapplicable_to": {
                    "data": [],
                    "total": 0,
                    "data_ref": "data",
                    "object": "list"
                },
                "metadata": {},
                "campaign_id": "camp_vzuF8JZdh1tdQqw3R6rS63ci",
                "campaign_name": "Bundle-Product-Discount",
                "validation_rules_assignments": {
                    "object": "list",
                    "data_ref": "data",
                    "data": [
                        {
                            "id": "asgm_e9RsrtXBMCJ5ti1S",
                            "rule_id": "val_g1rAIcaPuxAd",
                            "related_object_id": "v_XXSJVTBFFKLPiy585UqtTPiYJMF1bnBW",
                            "related_object_type": "voucher",
                            "object": "validation_rules_assignment",
                            "validation_status": "VALID"
                        }
                    ],
                    "total": 1
                }
            }
        ],
        "total": 1,
        "has_more": true,
        "more_starting_after": "2025-03-26T11:00:17.987Z"
    },
    "tracking_id": "track_C7TLT9aBmso=",
    "order": {
        "items": [
            {
                "object": "order_item",
                "id": "ordli_10568b16f101e97576",
                "quantity": 1,
                "product": {
                    "id": "prod_0fc35dfe978defeb6b",
                    "source_id": "star-th-bottle",
                    "name": "Star Thermal Bottle",
                    "metadata": {
                        "brand": "Star"
                    },
                    "price": 2499
                }
            },
            {
                "object": "order_item",
                "id": "ordli_10568b16f101e97577",
                "quantity": 1,
                "product": {
                    "id": "prod_0fc35dfeaa0defeb73",
                    "source_id": "adv-tshirt",
                    "name": "Adventure T-shirt",
                    "metadata": {
                        "brand": "Adventure"
                    },
                    "price": 1999
                }
            },
            {
                "object": "order_item",
                "id": "ordli_10568b16f101e97578",
                "quantity": 2,
                "product": {
                    "id": "prod_0fc35dfeabcdefeb80",
                    "source_id": "adv-scks",
                    "name": "Adventure Socks",
                    "metadata": {
                        "brand": "Adventure"
                    },
                    "price": 499
                }
            }
        ],
        "customer_id": null,
        "referrer_id": null,
        "object": "order"
    },
    "stacking_rules": {
        "redeemables_limit": 25,
        "applicable_redeemables_limit": 5,
        "applicable_exclusive_redeemables_limit": 1,
        "exclusive_categories": [],
        "joint_categories": [],
        "redeemables_application_mode": "PARTIAL",
        "redeemables_sorting_rule": "REQUESTED_ORDER",
        "redeemables_no_effect_rule": "REDEEM_ANYWAY",
        "redeemables_products_application_mode": "STACK",
        "redeemables_rollback_order_mode": "WITH_ORDER"
    }
}
```