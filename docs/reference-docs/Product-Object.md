---
title: Product Object
excerpt: Schema description
category: 636284b7e6b02c00a136e873
slug: the-product-object
parentDoc: 63990c30716fa10022a6f6c4
---

This entity should be used to map product items from your inventory management system. The aim of products is to build [validation rules](doc:validation-rules) which reflect product-specific campaigns.

TABLE

```json Example Response
{  
  "id":"prod_VOBfMBM3sCuGSy",
  "source_id":"internal_crm_id_1477475919",
  "object":"product",
  "name":"Apple iPhone 7",
  "attributes":[  
    "color",
    "memory"
  ],
  "image_url": "https://voucherify.io/img_YegsAlQ4hu3zDJq20vsmdBbB.png",
  "metadata":{  
    "test":true
  },
  "created_at":"2016-10-26T09:58:39Z",
  "skus":{  
    "object":"list",
    "total":1,
    "data":[  
      {  
        "id":"sku_0KtP4rvwEECQ2U",
        "source_id":"internal_erp_sku_id_1477475922",
        "sku":"APPLE_IPHONE_7",
        "currency":"USD",
        "price":70000,
        "attributes":{  
          "color":"black",
          "memory":"32"
        },
        "created_at":"2016-10-26T10:04:52Z",
        "object":"sku"
      }
    ]
  }
}
```