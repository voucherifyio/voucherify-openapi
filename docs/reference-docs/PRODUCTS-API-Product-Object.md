---
title: Product Object
type: endpoint
category: 639ba2628407100061f5faac
parentDoc: 639ba2658407100061f5fab9
slug: product-object
hidden: false
order: 1
---

| Attributes |  Description  | Example |
|:-----|:--------|------:|
| id | <p>Unique product ID assigned by Voucherify.</p> | <p>prod_0b1da8105693710357</p> |
| source_id | <p>Unique product source ID from your inventory system.</p> | <p>productSourceID16</p> |
| name | <p>Unique user-defined product name.</p> | <p>T-shirt</p> |
| price | <p>Product unit price. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 is written as 10000.</p> |  |
| attributes | <p>A list of product attributes whose values you can customize for given SKUs: <code>[&quot;color&quot;,&quot;size&quot;,&quot;ranking&quot;]</code>. Each child SKU can have a unique value for a given attribute.</p> |  |
| metadata | <p>The metadata object stores all custom attributes assigned to the product. A set of key/value pairs that you can attach to a product object. It can be useful for storing additional information about the product in a structured format.</p>  |  |
| image_url | <p>The HTTPS URL pointing to the .png or .jpg file that will be used to render the product image.</p> | <p>https://images.com/original.jpg</p> |
| created_at | <p>Timestamp representing the date and time when the product was created in ISO 8601 format.</p> | <p>2022-05-23T06:52:55.008Z</p> |
| updated_at | <p>Timestamp representing the date and time when the product was updated in ISO 8601 format.</p> | <p>2022-05-23T09:24:07.405Z</p> |
| object | <p>The type of object represented by JSON. This object stores information about the <code>product</code>.</p> |  |
| skus |  |  |

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]