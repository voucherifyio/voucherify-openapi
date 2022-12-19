---
title: Voucher Object
excerpt: Schema description
category: ${{ secrets.API_CATEGORY_VOUCHERS }}
slug: the-voucher-object
parentDoc: 63990b2ff90ceb006a5e59cc
hidden: false
order: 1
---

Vouchers are essential resources in Voucherify. Every voucher has a unique code that a customer needs to know in order to [redeem](ref:redeem-voucher). Voucherify provides 2 types of vouchers - **discount** vouchers and **gift** vouchers. They are also used to represent referral codes.

## Discount

You can choose one of three types of discounts: 
 - **amount** *(e.g. $10 off)*,
 - **percent** *(e.g. 20% off)*,
 -  **unit** *(e.g. 2 piano lessons)*.

## Gift vouchers

They are like pre-paid gift cards. Redeemable once e.g. a fixed-price voucher for 3 hours golf course or redeemable multiple times against any of your product or service given a positive balance.

You can group vouchers in [campaigns](ref:the-campaign-object) and categories. Depending on your strategy vouchers can be valid only once or multiple times. Marketers and developers can activate vouchers at any time. Voucher's lifetime is either limited or unlimited. Vouchers include a detailed history of their [redemptions](ref:the-redemption-object).

TABLE

```json Example Response
{
  "code": "GIFT_1",
  "campaign": null,
  "category": "test",
  "type": "GIFT_VOUCHER",
  "discount": null,
  "gift": {
    "amount": 100000000,
    "balance": 90000000
  },
  "start_date": "2016-10-31T23:00:00Z",
  "expiration_date": null,
  "publish": {
    "object": "list",
    "count": 1,
    "url": "/v1/vouchers/GIFT_1/publications",
    "data_ref": "entries",
    "entries": [
      {
        "customer_id": "cust_BXduSjtFw9aMrLoW8sfewWLv",
        "customer": "test@myshop.com",
        "channel": "API",
        "published_at": "2016-11-26T17:24:05Z",
        "metadata": {
          "test": true,
          "app": "postman"
        }
      }
    ]
  },
  "redemption": {
    "object": "list",
    "total": 2,
    "url": "/v1/vouchers/GIFT_1/redemptions",
    "data_ref": "redemption_entries",
    "quantity": null,
    "redeemed_quantity": 2,
    "redeemed_amount": 20000,
    "redemption_entries": [
      {
        "id": "r_RaqsHhD5sPWw1yb0CGXASpPI",
        "object": "redemption",
        "date": "2016-11-23T13:49:15Z",
        "customer_id": "cust_ibxhJgzsXNplC3ojggfnOWWl",
        "tracking_id": "(tracking_id not set)",
        "amount": 10000,
        "order": {
          "amount": 10000,
          "items": []
        },
        "result": "SUCCESS"
      },
      {
        "id": "r_WdQGoDAaPT19kFWIGp434yzS",
        "object": "redemption",
        "date": "2016-11-23T13:50:35Z",
        "customer_id": "cust_ibxhJgzsXNplC3ojggfnOWWl",
        "tracking_id": "(tracking_id not set)",
        "amount": 10000,
        "order": {
          "amount": 10000,
          "items": []
        },
        "result": "SUCCESS"
      }
    ]
  },
  "active": true,
  "additional_info": null,
  "metadata": {},
  "assets": {
    "qr": {
      "id": "U2FsdGVkX18q6LE4stziCYvdHckywW5lCzMB3UdcK29ZZhzzc1YZ+vYnk3FTFrqsxaWqQXwGTf9RdS+qqUuAJzu1uM6QcohRLR6XkJWOQvZcZ11h0rglPIF2lFtC4E0SrLGsUWFUKH3N8SA1uSz7lA==",
      "url": "https://dl.voucherify.io/api/v1/assets/qr/U2FsdGVkX18q6LE4stziCYvdHckywW5lCzMB3UdcK29ZZhzzc1YZ%2BvYnk3FTFrqsxaWqQXwGTf9RdS%2BqqUuAJzu1uM6QcohRLR6XkJWOQvZcZ11h0rglPIF2lFtC4E0SrLGsUWFUKH3N8SA1uSz7lA%3D%3D"
    }
  }
}
```