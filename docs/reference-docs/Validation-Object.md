---
title: Validation Object
excerpt: Schema description
category: 636284b7e6b02c00a136e873
slug: the-validation-object
parentDoc: 63990ba4e5a407003a6ebc0b
---

Redemption is the key operation in the voucher and promotion tier lifecycle. A customer can redeem a voucher or promotion tier once or multiple times depending on selected limit (`quantity`). Each redemption is recorded in voucher/promotion's history (`redemption_entries`). There is also an option to cancel a redemption. We call such operation a [redemption rollback](ref:rollback-redemption).

TABLE

```json Example Response
{
  "code": "SALE25",
  "discount": {
    "type": "PERCENT",
    "percent_off": 25.0
  },
  "tracking_id": "track_BX9Qc8nH77gbgQAq1OYBlx2yJcYhWIyyfIQXD6s23u0=",
  "metadata": {},
  "order": {
    "amount": 10200,
    "total_discount_amount": 22500,
    "total_amount": 0,
    "items": [
      {
        "product_id": "prod_08c5d46d008a4f3e08",
        "sku_id": "sku_08c5d46d5b5d787ab6",
        "quantity": 1,
        "price": 90000,
        "amount": 90000,
        "discount_amount": 22500,
        "product": {
          "id": "prod_08c5d46d008a4f3e08",
          "name": "Headphones",
          "price": 60000,
          "metadata": {}
        },
        "sku": {
          "id": "sku_08c5d46d5b5d787ab6",
          "sku": "Headphones Limited Edition",
          "price": 90000,
          "metadata": {
            "category": "SALE"
          }
        }
      }
    ]
  },
  "valid": true,
  "applicable_to": {
    "data": [
      {
        "object": "sku",
        "id": "sku_08c5d46d5b5d787ab6",
        "source_id": "sku_08c5d46d5b5d787ab6"
      }
    ],
    "object": "list",
    "total": 1
  }
}
```