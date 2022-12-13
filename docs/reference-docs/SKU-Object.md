---
title: SKU Object
excerpt: Schema description
category: 636284b7e6b02c00a136e873
slug: the-sku-object
---

The SKU (acronym from Stock Keeping Unit) is tightly related to [the product object](ref:the-product-object). It basically reflects its different variants. One product can have many SKUs which are characterised by the product `attributes`.

TABLE

```json Example Response
{  
  "id":"sku_0KtP4rvwEECQ2U",
  "source_id":"internal_erp_sku_id_1477475922",
  "sku":"APPLE_IPHONE_7_BLACK_32",
  "attributes":{  
    "color":"black",
    "memory":"32"
  },
  "created_at":"2016-10-26T10:04:52Z",
  "object":"sku",
  "metadata": { 
    "country": "us"
	}
}
```