---
title: Promotion Tier Object
excerpt: Schema description
category: 636284b7e6b02c00a136e873
slug: the-promotion-object
parentDoc: 63990b5dfff22900a52b8252
---

This entity describes a [promotion tier](doc:promotion-tier) (note: promotion tiers are always assigned to a campaign, can't be used standalone)

TABLE

```json Example Response
{
    "id": "promo_s2Ynoxm3Q91xwF5qVwzpYgMf",
    "object": "promotion_tier",
    "name": "BFCM 2017",
    "banner": "Congratulations, you get $10 off.",
    "campaign": {
        "id": "camp_M7nEJ40solLyPvS8tAx006bX",
        "object": "campaign",
        "start_date": "2017-10-24T00:00:00Z",
        "expiration_date": "2017-10-27T23:59:59Z",
        "active": true
    },
    "validation_rule_assignments": {
      "object": "list",
      "total": 1,
      "data_ref": "data",
      "data": [
        {
          "id": "asgm_hXnKYgeW74BsDByc",
          "rule_id": "val_bXOKIS7bAMaG",
          "related_object_id": "promo_s2Ynoxm3Q91xwF5qVwzpYgMf",
          "related_object_type": "promotion_tier",
          "created_at": "2018-12-19T10:25:50Z",
          "updated_at": null,
          "object": "validation_rules_assignment"
        }
      ]
    },
    "action": {
        "discount": {
            "type": "AMOUNT",
            "amount_off": 1000
        }
    },
    "metadata": null
}
```