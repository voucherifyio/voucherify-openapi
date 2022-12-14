---
title: Earning Rule Object
excerpt: Schema description
category: 636284b7e6b02c00a136e873
slug: the-earning-rule-object
parenDoc: 63990be54b4742001155bfad
---

This entity describes an earning rule object.

TABLE

```json Example Response
{
    "id": "ern_P6MWOFGsv63sbTaTZBp0IHGK",
    "created_at": "2022-02-02T13:18:32.557Z",
    "updated_at": "2022-02-03T13:09:27.206Z",
    "validation_rule_id": "val_6o0qdvlbh1mt",
    "loyalty": {
        "points": 1000,
        "type": "FIXED"
    },
    "event": "order.paid",
    "source": {
        "banner": "Order paid 1000 points",
        "object_id": "camp_Pfja7X91b1GoyH5wnpzCwlP3",
        "object_type": "campaign"
    },
    "active": true,
    "start_date": "2022-02-02T13:00:00.000Z",
    "expiration_date": "2022-03-03T14:30:00.000Z",
    "validity_timeframe": {
        "duration": "PT1H",
        "interval": "P1D"
    },
    "object": "earning_rule",
    "automation_id": "auto_RVgObANuPToNla8LuD5aT3Zb"
}
```