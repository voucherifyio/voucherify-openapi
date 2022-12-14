---
title: Loyalty Tiers Object
excerpt: Schema description
category: 636284b7e6b02c00a136e873
slug: the-loyalty-tiers-object
parentDoc: 63990be54b4742001155bfad
---

This entity describes loyalty tiers (note: loyalty tiers are used to create a loyalty program with different levels of membership and varied earning rules and rewards based on customer’s tiers).

TABLE

```json Example Response
[
    {
        "id": "ltr_9dH5XeKKBCrxa7gMx8QtZuc3",
        "name": "Test Tier 1",
        "campaign_id": "camp_SuZb5HnjoksvxkZRrOnmpXvR",
        "metadata": {},
        "created_at": "2020-05-04T13:28:47.442Z",
        "updated_at": null,
        "earning_rules": {
            "ern_p6McdhUL4mPFuV7PE52QRkGr": {
                "type": "MULTIPLY",
                "multiplier": 10
            }
        },
        "rewards": {
            "rewa_q4bqVoA64qUXP2whbEQHNvYJ": {
                "type": "CUSTOM",
                "points": 5
            }
        },
        "points": {
            "from": 0,
            "to": 40
        },
        "segment_id": "seg_m6zGCZXvMLt7K4ZzhDB8ZLdG",
        "object": "loyalty_tier"
    }
]
```