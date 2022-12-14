---
title: Redemption Object
excerpt: Schema description
category: 636284b7e6b02c00a136e873
slug: the-redemption-object
parentDoc: 63990bb9d1a4a400107d1e30
---

Redemption is the key operation in the voucher and promotion tier lifecycle. A customer can redeem a voucher or promotion tier once or multiple times depending on selected limit (`quantity`). Each redemption is recorded in voucher/promotion's history (`redemption_entries`). There is also an option to cancel a redemption. We call such operation a [redemption rollback](ref:rollback-redemption).

TABLE

```json Example Response
{
  "id": "r_iMsIlXpjfQwMWFJPEPJFeJ4h",
  "object": "redemption",
  "date": "2016-11-16T14:14:31Z",
  "customer_id": "cust_PqojQVpYAmwtcddM3oGfRh05",
  "tracking_id": "joe@op.pl",
  "order": {
    "amount": 10000,
    "items": [
      {
        "product_id": "prod_EkU6J42uLEMkSJ",
        "sku_id": null,
        "quantity": 1
      }
    ]
  },
  "metadata": {
    "test": true,
    "locale": "pl-en"
  },
  "result": "SUCCESS",
  "voucher": {
    "code": "Testing7fjWdr",
    "campaign": null,
    "category": "test",
    "type": "DISCOUNT_VOUCHER",
    "discount": {
      "type": "AMOUNT",
      "amount_off": 1000
    },
    "gift": null,
    "start_date": null,
    "expiration_date": null,
    "publish": {
      "count": 0,
      "entries": []
    },
    "redemption": {
      "quantity": null,
      "redeemed_quantity": 1,
      "redeemed_amount": 10000,
      "redemption_entries": []
    },
    "active": true,
    "additional_info": null,
    "metadata": {
      "test": true,
      "locale": "pl-en"
    },
    "assets": {
      "qr": {
        "id": "U2FsdGVkX19kSEL6ZbJWNQP/0Nt5ddIJDdvJDgHoeWo25FAq1aAn1L3kd6S/sSHUHYwHXaFtsnJ1Lesh0yzGA7aMNf6kgMUD/dDw1e77kedfhV3BpBWEgYWY1GurPbzV50rexNBppZjPTVJN5DQXJQ==",
        "url": "https://dl.voucherify.io/api/v1/assets/qr/U2FsdGVkX19kSEL6ZbJWNQP%2F0Nt5ddIJDdvJDgHoeWo25FAq1aAn1L3kd6S%2FsSHUHYwHXaFtsnJ1Lesh0yzGA7aMNf6kgMUD%2FdDw1e77kedfhV3BpBWEgYWY1GurPbzV50rexNBppZjPTVJN5DQXJQ%3D%3D"
      }
    }
  }
}
```