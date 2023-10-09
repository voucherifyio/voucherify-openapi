---
title: Product Collection Object
type: basic
categorySlug: voucherify-api
parentDocSlug: product-collections-api
slug: product-collection-object
hidden: false
order: 1
---

## Product Collection Object
<p>This is an object representing a product collection.</p><p>The products can be grouped into collections by the creation of a products collection object. You can retrieve a product collection and a list of products in the collection. Product collections are identified by a unique ID.</p>

One of:

[Static Product Collection](#static-product-collection), [Dynamic Product Collection](#dynamic-product-collection)

## Static Product Collection
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Product collection ID.</p> **Example:** <p>pc_a11pr0dUc75</p> |
| name</br>`string` | <p>Unique user-defined product collection name.</p> **Example:** <p>All Products</p> |
| type</br>`string` | <p>Describes whether the product collection is dynamic (products come in and leave based on set criteria) or static (manually selected products).</p> Available values: `AUTO_UPDATE`, `STATIC` |
| products</br>`array` | <p>Defines a set of products for a <code>STATIC</code> product collection type.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>The product ID.</p> <strong>Example:</strong> <p>prod_0a41bcf807c5fcaaf6</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>Denotes the type of object represented by the ID.</p></td></tr></tbody></table> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the product collection was created in ISO 8601 format.</p> **Example:** <p>2021-12-09T12:51:29.898Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the product collection was updated in ISO 8601 format.</p> **Example:** <p>2022-04-08T04:56:41.142Z</p> |
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about the static product collection.</p> |

## Dynamic Product Collection
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Product collection ID.</p> **Example:** <p>pc_a11pr0dUc75</p> |
| name</br>`string` | <p>Unique user-defined product collection name.</p> **Example:** <p>All Products</p> |
| type</br>`string` | <p>Describes whether the product collection is dynamic (products come in and leave based on set criteria) or static (manually selected products).</p> Available values: `AUTO_UPDATE`, `STATIC` |
| filter</br>`object` | <p>Defines a set of criteria and boundary conditions for an <code>AUTO_UPDATE</code> product collection type.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the product collection was created in ISO 8601 format.</p> **Example:** <p>2021-12-09T12:51:29.898Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the product collection was updated in ISO 8601 format.</p> **Example:** <p>2022-04-08T04:56:41.142Z</p> |
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about the dynamic product collection.</p> |

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
