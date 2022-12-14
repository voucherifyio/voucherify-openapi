---
title: Segment Object
excerpt: Schema description
category: 636284b7e6b02c00a136e873
slug: the-segment-object
parentDoc: 63990c7976b5a5009d0567a6
---

This entity describes a [customer segment](customers#section-segments).

TABLE

```json Example Response
{
  "id":"seg_9e3ALnjEWVwYGt3zWL96aQQR",
  "name":"ref",
  "created_at":"2016-12-15T15:39:23Z",
  "metadata":{

  },
  "filter":{
    "junction":"and",
    "loyalty.referred_customers.campaigns.Referral Campaign 10":{
      "conditions":{
        "$less_than":[
          "2"
        ]
      }
    },
    "name":{
      "conditions":{
        "$starts_with":[
          "Tom"
        ]
      }
    }
  },
  "customers":null,
  "type":"auto-update",
  "object":"segment"
}
```