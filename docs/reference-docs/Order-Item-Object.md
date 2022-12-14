---
title: Order Item Object
excerpt: Schema description
category: 636284b7e6b02c00a136e873
slug: the-order-item-object
parentDoc: 63990c1a507af40043a09d7f
---

Order Items are always specified within [the order object](ref:the-order-object). They can be related either to [products](ref:the-product-object) or [SKUs](ref:the-sku-object).

Product/SKU details sent within an order item will be used on top of Product/SKU already stored in the system during the [Redeem Voucher](ref:redeem-voucher), [Validate Voucher](ref:validate-voucher), [Validate Promotions](ref:validate-promotions-1) and [Redeem Promotion](ref:redeem-promotion) requests - details in the table below.

TABLE

```json Example Response
{
    "id": "ord_Rm1hlzO0jUyci39LoowoJqND",
    "source_id": null,
    "object": "order",
    "created_at": "2017-05-24T15:27:41.008Z",
    "updated_at": null,
    "status": "CREATED",
    "amount": 20050,
    "items": [
        {
            "sku_id": null,
            "quantity": 2,
            "product_id": "prod_anJ03RZZq74z4v",
            "product": {
                "override": true,
                "name": "Apple iPhone 8",
                "metadata": {
                    "shop": "citycenter"
                }
            },
            "metadata": {
                "series": "2022-783CV"
            }
        },
        {
            "sku_id": "sku_0KtP4rvwEECQ2U",
            "quantity": 1,
            "product_id": null,
            "sku": {
                "override": true,
                "sku": "Apple iPhone 8 Silver 64GB"
            }
        }
    ],
    "customer": {
        "object": "customer",
        "id": "cust_54euyQiFb4UYIP9wEOw7FgUA"
    },
    "metadata": null
}
```