---
title: Reward Object
excerpt: Schema description
category: 636284b7e6b02c00a136e873
slug: the-reward-object
parentDoc: 63990b77b32c2306631c7b53
---

This entity describes a reward.

TABLE

Example [List Rewards](ref:list-rewards) responses for the different reward types:

```json MATERIAL reward type
{
  "id": "rew_736aO2cI1cgUpItFA4lSV8b9",
  "name": "Headphones - Reward",
  "type": "MATERIAL",
  "parameters": {
    "product": {
      "id": "prod_3ttSkdxGuAfcv3"
    }
  },
  "stock": "70",
  "redeemed": "2",
  "attributes": {
    "image_url": "",
    "description": "Free Headphones, series 265-ER352"
  },
  "created_at": "2021-02-09T13:58:20.194Z",
  "updated_at": "2021-02-24T13:09:17.148Z",
  "object": "reward"
}
```
```json COIN reward type
{
  "id": "rew_ApxE9MMnKi1g6FhD7pHRZpwh",
  "name": "Pay with points - $50",
  "type": "COIN",
  "parameters": {
    "coin": {
      "exchange_ratio": 50,
      "points_ratio": 2000
    }
  },
  "stock": null,
  "redeemed": null,
  "attributes": {},
  "created_at": "2021-02-15T13:28:50.936Z",
  "updated_at": null,
  "object": "reward"
}
```
```json CAMPAIGN reward type
{
  "id": "rew_mnwXcVMuyRwmzxQH0o78cBWt",
  "name": "40 USD",
  "type": "CAMPAIGN",
  "parameters": {
    "campaign": {
      "id": "camp_S4ckmZjNvFHHHVqyzNVslnVG",
      "type": "DISCOUNT_COUPONS"
    }
  },
  "stock": null,
  "redeemed": null,
  "attributes": {},
  "created_at": "2020-10-28T18:04:07.982Z",
  "updated_at": null,
  "object": "reward"
}
```