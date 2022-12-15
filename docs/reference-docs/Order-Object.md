---
title: Order Object
excerpt: Schema description
category: 636284b7e6b02c00a136e873
slug: the-order-object
parentDoc: 63990c1a507af40043a09d7f
---

The purchase transactions can be tracked in Voucherify by the creation of an order object. You can create, retrieve, and pay individual orders, as well as list and export all of them in a CSV format. Orders are identified by a unique ID.

Orders are automatically created during the [redeem voucher](ref:redeem-voucher) and [redeem promotion](ref:redeem-promotion) call.

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
      "product_id": "prod_anJ03RZZq74z4v"
    },
    {
      "sku_id": "sku_0KtP4rvwEECQ2U",
      "quantity": 1,
      "product_id": null
    }
  ],
  "customer": {
    "object": "customer",
    "id": "cust_54euyQiFb4UYIP9wEOw7FgUA"
  },
  "metadata": null
}
```

> 🚧 order.id and order session
>
> If you use the same order.id in more than one redemption request, all valid discounts provided in the redemption payload will be applied to the given order. 
> 
> Each time you use particular order in your requests, the API will automatically trigger a new session linked to the order.id. The session is active during the request and ends asynchronously after the request is completed. The session mechanism ensures that the particular order.id can be used in one API request at once.