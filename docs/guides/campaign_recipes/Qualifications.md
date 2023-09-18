---
title: Qualification - Checking eligibility
excerpt: null
category: 639ba16d677235008f80045c
slug: checking-eligibility
type: basic
hidden: false
order: 1
---

## Overview

Sometimes you want to show a customer all the coupons they’re eligible for — taking into account their **attributes** as well as the **current content of their cart**.

Voucherify's Qualifications API helps recommend applicable promotions and coupons in the given customer and order context with filtering options based on campaign category and hierarchy. 

The qualifications API can be applied (among others) for:
- Upsell scenarios - showing the customers the discounts available for the customer, encouraging the customer to adjust the cart to conform to the available promotions.
- Customer wallet - providing a list of vouchers the customer was assigned/received (in Voucherify's terms, a voucher was **published** to the customer) in the past that can be used for the current cart.
- Strike through price - showing new prices for a list of products after a promotional discount is applied.

## Scenarios

To specify the types of promotions and codes that you would like to reveal to your customers, we introduced the option of including a scenario. A scenario defines the type of content that you would like to return from all the available campaigns and standalone codes that you've created in Voucherify.

| **Scenario** | **Possible Use Case** |
|:---|:---|
| ALL | Returns all redeemables available for the customer in one API request. |
| CUSTOMER_WALLET | returns vouchers applicable to the customer’s cart based on the vouchers assigned to the customer’s profile. |
| AUDIENCE_ONLY | Returns all vouchers, promotion tiers, and campaigns available to the customer. Voucherify validates the rules based on the customer profile only. |
| PRODUCTS | Returns all promotions available for the products (when a discount is defined to be applied to the item or when the item is required in the validation rule). |
| PRODUCTS_DISCOUNT | Returns all promotions available for products when a discount is defined as applicable to specific item(s). |
| PROMOTION_STACKS | Returns the applicable promotion stacks. |
| PRODUCTS_BY_CUSTOMER | Returns all promotions available for a customer for the products (when a discount is defined to be applied to the item or when the item is required in the validation rule). |
| PRODUCTS_DISCOUNT_BY_CUSTOMER | Returns all promotions available for a customer for products when a discount is defined as applicable to specific item(s). |

## Use Cases

To show a couple of the use cases that are possible with the qualifications API, we'll show it using the following scenarios. Depending on the different scenario, we'll send a slightly different API call and the results will be returned in the context of the scenario. 

### Customer profile

The customer is assigned 2 vouchers.

| **Campaign** | **Details** |
|:---|:---|
| Gift card campaign | The gift voucher maIxGd5r can be used by the owner of the code only |
| Discount campaign<br>camp_f78wOLL9cE2WCSdtliT0UIh0  | Voucher code vm3HkNF2 from a 10% discount for BOSCH products redeemable by the owners of the code. |

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

```json Request
{
    "scenario": "ALL",
    "mode": "BASIC",
    "order": {
        "items": [
            {
                "source_id": "9919975",
                "quantity": "1",
                "price": 10000,
                "related_object": "product",
                "product": {
                    "name": "Bosch POF 1200 AE"
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
                "id": "promo_5TgxuYWm7mQoVM562QKaLQGF",
                "object": "promotion_tier",
                "created_at": "2023-09-15T12:48:11.100Z",
                "result": {
                    "discount": {
                        "type": "AMOUNT",
                        "effect": "APPLY_TO_ORDER",
                        "amount_off": 1000,
                        "is_dynamic": false
                    }
                },
                "order": {
                    "amount": 11500,
                    "discount_amount": 1000,
                    "total_discount_amount": 1000,
                    "total_amount": 10500,
                    "applied_discount_amount": 1000,
                    "total_applied_discount_amount": 1000,
                    "items": [
                        {
                            "object": "order_item",
                            "source_id": "9919975",
                            "related_object": "product",
                            "quantity": 1,
                            "amount": 10000,
                            "price": 10000,
                            "subtotal_amount": 10000,
                            "product": {
                                "id": "prod_0d8539b587c404cbea",
                                "source_id": "9919975",
                                "name": "Bosch POF 1200 AE"
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
                "name": "10% off order",
                "banner": "10% off order",
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
                "source_id": "9919975",
                "related_object": "product",
                "quantity": 1,
                "price": 10000,
                "product": {
                    "id": "prod_0d8539b587c404cbea",
                    "source_id": "9919975",
                    "name": "Bosch POF 1200 AE"
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

| **Campaign** | **Details** |
|:---|:---|
| Gift card campaign | The gift voucher maIxGd5r can be used by the owner of the code only |
| Discount campaign<br>camp_f78wOLL9cE2WCSdtliT0UIh0  | Voucher code vm3HkNF2 from a 10% discount for BOSCH products redeemable by the owners of the code |
| 10% for everyone on entire order | The promotion is available for anyone and gives a 10% discount |
| 20% for Digital books for VIP customers  | The promotion is available to customers who are VIP customers and is applicable to digital books only |

```json Request
{
    "scenario": "ALL",
    "mode": "BASIC",
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
                    "name": "BOSCH POF 1200 AE"
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
                                "name": "BOSCH POF 1200 AE"
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
                }
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
                                "name": "BOSCH POF 1200 AE"
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
                }
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
                                "name": "BOSCH POF 1200 AE"
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
                }
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
                                "name": "BOSCH POF 1200 AE"
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
                }
            },
            {
                "id": "promo_5TgxuYWm7mQoVM562QKaLQGF",
                "object": "promotion_tier",
                "created_at": "2023-09-15T12:48:11.100Z",
                "result": {
                    "discount": {
                        "type": "AMOUNT",
                        "effect": "APPLY_TO_ORDER",
                        "amount_off": 1000,
                        "is_dynamic": false
                    }
                },
                "order": {
                    "amount": 11500,
                    "discount_amount": 1000,
                    "total_discount_amount": 1000,
                    "total_amount": 10500,
                    "applied_discount_amount": 1000,
                    "total_applied_discount_amount": 1000,
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
                                "name": "BOSCH POF 1200 AE"
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
                "name": "10% off order",
                "banner": "10% off order",
                "campaign_id": "camp_orPbvjZ9OSmaZzRvj5gjT1kK",
                "campaign_name": "Promotion - % off"
            }
        ],
        "total": 5,
        "has_more": true
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
                    "name": "BOSCH POF 1200 AE"
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

All of these scenarios requires one API request per attempt.

> 📘 Audience only
>
> This scenario considered the promotions, voucher codes, and voucher campaigns available for the customer to be used on the current cart. You can experiment with the "Audience Only" scenario that will return all of the discounts based on the customer profile alone, enabling you to create upsell scenarios.

---
### Case 2 - Vouchers assigned to customer

We'll send the same request, but with a different `scenario` setting.


Only the voucher codes assigned to the customer will be returned. `"scenario": "CUSTOMER_WALLET"`

```json Request
{
    "scenario": "CUSTOMER_WALLET",
    "mode": "BASIC",
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
                    "name": "BOSCH POF 1200 AE"
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
                                "name": "BOSCH POF 1200 AE"
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
                }
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
                                "name": "BOSCH POF 1200 AE"
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
                }
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
                    "name": "BOSCH POF 1200 AE"
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
Only a promotion that is applicable to one of the items in the cart. `"scenario": "PRODUCTS_DISCOUNT"`

```json Request
{
    "scenario": "PRODUCTS_DISCOUNT",
    "mode": "BASIC",
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
                    "name": "BOSCH POF 1200 AE"
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
                                "name": "BOSCH POF 1200 AE"
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
                }
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
                                "name": "BOSCH POF 1200 AE"
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
                }
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
                                "name": "BOSCH POF 1200 AE"
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
                }
            }
        ],
        "total": 3,
        "has_more": true
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
                    "name": "BOSCH POF 1200 AE"
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
> Voucherify will return all the discounts that apply to the products you sent in the order. When a customer is browsing your products and is shown the product listing page, you can send, in the payload, the list of all the products the customer is presented and Voucherify will return all the discounts that apply to these products. The returned results can be visualized, for example, by a striked through price.