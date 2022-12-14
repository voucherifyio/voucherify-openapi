---
title: Campaign Object
excerpt: Schema description
category: 636284b7e6b02c00a136e873
slug: the-campaign-object
parentDoc: 63990b46892482006870f80a
---

A campaign is used to group vouchers or promotion tiers of a specific type. Amongst others, the campaign type describes the discount you want to offer your customers and its validity timeframe. In case of voucher campaign, once you create a new campaign, Voucherify will generate a given number of codes. We put together a [tutorial](doc:getting-started) on how to create one.

TABLE

```json Example Response
{
  "name": "TC6 - test campaign - 11",
  "object": "campaign",
  "type": "AUTO_UPDATE",
  "description": "test",
  "active": true,
  "metadata": {
    "test": true
  },
  "voucher": {
    "code_config": {
      "length": 8,
      "charset": "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
      "prefix": null,
      "postfix": null,
      "pattern": "TC6-PROMO-#######"
    },
    "type": "DISCOUNT_VOUCHER",
    "discount": {
      "type": "PERCENT",
      "percent_off": 10
    },
    "start_date": "2016-09-26T00:00:00Z",
    "expiration_date": "2020-12-26T00:00:00Z",
    "redemption": {
      "quantity": 1
    }
  }
}
```