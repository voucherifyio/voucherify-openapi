---
title: Redemption Rollback Object
excerpt: Schema description
category: 636284b7e6b02c00a136e873
slug: the-redemption-rollback-object
parentDoc: 63990bb9d1a4a400107d1e30
---

There is a possibility to withdraw a voucher redemption. We call such operation a redemption rollback.

TABLE

```json Example Response
{
  "id": "rr_c4loD6wOSTK7elmq6yNfgkGc",
  "object": "redemption_rollback",
  "date": "2016-11-24T12:23:32Z",
  "customer_id": "cust_g1OFNMgwqtISWZ9hjyKeb7ib",
  "tracking_id": "track_9KevqqtmGcUcjy2eAzMDeQ==",
  "redemption": "r_pTclIxpGU08dB4KWT0Kg7wnK",
  "reason": "Mistake",
  "result": "SUCCESS",
  "voucher": {
    "code": "PROMO-VMb4LyH",
    "campaign": null,
    "category": "docs_test",
    "type": "DISCOUNT_VOUCHER",
    "discount": {
      "type": "PERCENT",
      "percent_off": 10
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
      "redeemed_quantity": 0,
      "redeemed_amount": 0,
      "redemption_entries": []
    },
    "active": true,
    "additional_info": null,
    "metadata": {
      "channel": "online-shop",
      "locale": "de-en"
    },
    "assets": {
      "qr": {
        "id": "U2FsdGVkX1/MOrwVNRLth3m1Q+4uiam+pRhPZOTCEk0sJHJ2jvPCTeaWHr2aiIm9iNR+4pVyvOqVSUu8V+uw7T7gQBURI/RBBNez0759Cdmq2N4CRab1LRGy5ZpGi0mI/SFHjZiZDyS0PcU1sRFrzg==",
        "url": "https://dl.voucherify.io/api/v1/assets/qr/U2FsdGVkX1%2FMOrwVNRLth3m1Q%2B4uiam%2BpRhPZOTCEk0sJHJ2jvPCTeaWHr2aiIm9iNR%2B4pVyvOqVSUu8V%2Buw7T7gQBURI%2FRBBNez0759Cdmq2N4CRab1LRGy5ZpGi0mI%2FSFHjZiZDyS0PcU1sRFrzg%3D%3D"
      }
    }
  }
}
```