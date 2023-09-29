---
title: SKU Object
type: endpoint
categorySlug: voucherify-api
parentDocSlug: products-api
slug: sku-object
hidden: false
order: 2
---

| Attributes |  Description  | Example |
|:-----|:--------|------:|
| id | <p>A unique identifier that represents the SKU and is assigned by Voucherify.</p> | <p>sku_0b1621b319d248b79f</p> |
| source_id | <p>A unique SKU identifier from your inventory system.</p> | <p>sku_source_id_4</p> |
| product_id | <p>The parent product's unique ID.</p> | <p>prod_0b15f6b9f650c16990</p> |
| sku | <p>Unique user-defined SKU name.</p> | <p>Large Pink Shirt</p> |
| price | <p>SKU unit price. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 is written as 10000.</p> |  |
| currency | <p>SKU price currency.</p> | <p>USD</p> |
| attributes | <p>The attributes object stores values for all custom attributes inherited by the SKU from the parent product. A set of key/value pairs that are attached to a SKU object and are unique to each SKU within a product family.</p>  |  |
| image_url | <p>The HTTPS URL pointing to the .png or .jpg file that will be used to render the SKU image.</p> |  |
| metadata | <p>The metadata object stores all custom attributes assigned to the SKU. A set of key/value pairs that you can attach to a SKU object. It can be useful for storing additional information about the SKU in a structured format.</p>  |  |
| created_at | <p>Timestamp representing the date and time when the SKU was created in ISO 8601 format.</p> | <p>2022-05-17T10:36:30.187Z</p> |
| updated_at | <p>Timestamp representing the date and time when the SKU was updated in ISO 8601 format.</p> | <p>2022-05-17T10:55:09.137Z</p> |
| object | <p>The type of object represented by JSON. This object stores information about the <code>SKU</code>.</p> |  |

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
