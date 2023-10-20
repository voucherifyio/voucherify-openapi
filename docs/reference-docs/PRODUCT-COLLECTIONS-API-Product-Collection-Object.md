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

All of:

1. [Product Collection Base](#product-collection-base)
2. Any of: [Static Product Collection](#static-product-collection), [Dynamic Product Collection](#dynamic-product-collection)

## Product Collection Base
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Product collection ID.</p> |
| name</br>`string` | <p>Unique user-defined product collection name.</p> **Example:** <p>All Products</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the product collection was created in ISO 8601 format.</p> **Example:** <p>2021-12-09T12:51:29.898Z</p> |
| object | <p>The type of object represented by JSON. This object stores information about the static product collection.</p> Available values: `products_collection` |

## Static Product Collection
| Attributes |  Description |
|:-----|:--------|
| type | <p>Describes whether the product collection is dynamic (products come in and leave based on set criteria) or static (manually selected products).</p> Available values: `STATIC` |
| products</br>`array` | <p>Defines a set of products for a <code>STATIC</code> product collection type.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>The product ID.</p> <strong>Example:</strong> <p>prod_0a41bcf807c5fcaaf6</p></td></tr><tr><td style="text-align:left">product_id</br><code>string</code></td><td style="text-align:left"><p>Product ID for SKUs.</p></td></tr><tr><td style="text-align:left">object</td><td style="text-align:left"><p>Denotes the type of object represented by the ID.</p> Available values: <code>sku</code>, <code>product</code></td></tr></tbody></table> |

## Dynamic Product Collection
| Attributes |  Description |
|:-----|:--------|
| type | <p>Describes whether the product collection is dynamic (products come in and leave based on set criteria) or static (manually selected products).</p> Available values: `AUTO_UPDATE` |
| filter</br>`object` | <p>Defines a set of criteria and boundary conditions for an <code>AUTO_UPDATE</code> product collection type.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">junction</td><td style="text-align:left">See: <a href="#junction">Junction</a></td></tr><tr><td style="text-align:left">id</td><td style="text-align:left">See: <a href="#field-conditions">Field Conditions</a></td></tr><tr><td style="text-align:left">product_id</td><td style="text-align:left">See: <a href="#field-conditions">Field Conditions</a></td></tr><tr><td style="text-align:left">source_id</td><td style="text-align:left">See: <a href="#field-conditions">Field Conditions</a></td></tr><tr><td style="text-align:left">name</td><td style="text-align:left">See: <a href="#field-conditions">Field Conditions</a></td></tr><tr><td style="text-align:left">price</td><td style="text-align:left">See: <a href="#field-conditions">Field Conditions</a></td></tr><tr><td style="text-align:left">object</td><td style="text-align:left">See: <a href="#field-conditions">Field Conditions</a></td></tr><tr><td style="text-align:left">attributes</td><td style="text-align:left">See: <a href="#field-conditions">Field Conditions</a></td></tr><tr><td style="text-align:left">metadata</td><td style="text-align:left">See: <a href="#field-conditions">Field Conditions</a></td></tr><tr><td style="text-align:left">image_url</td><td style="text-align:left">See: <a href="#field-conditions">Field Conditions</a></td></tr><tr><td style="text-align:left">skus</td><td style="text-align:left">See: <a href="#field-conditions">Field Conditions</a></td></tr><tr><td style="text-align:left">created_at</td><td style="text-align:left">See: <a href="#field-conditions">Field Conditions</a></td></tr><tr><td style="text-align:left">updated_at</td><td style="text-align:left">See: <a href="#field-conditions">Field Conditions</a></td></tr></tbody></table> |

## Junction
Available values: `and`, `AND`, `or`, `OR`

## Field Conditions
| Attributes |  Description |
|:-----|:--------|
| conditions | <p>Data filters used to narrow the data records to be returned in the result.</p> See: [Filters Condition](#filters-condition) |

## Filters Condition
| Attributes |  Description |
|:-----|:--------|
| $in | See: [Any](#any) |
| $not_in | See: [Any](#any) |
| $is | See: [Any](#any) |
| $is_days_ago | See: [Any](#any) |
| $is_days_in_future | See: [Any](#any) |
| $is_not | See: [Any](#any) |
| $has_value | See: [Any](#any) |
| $is_unknown | See: [Any](#any) |
| $contains | See: [Any](#any) |
| $not_contain | See: [Any](#any) |
| $starts_with | See: [Any](#any) |
| $ends_with | See: [Any](#any) |
| $more_than | See: [Any](#any) |
| $less_than | See: [Any](#any) |
| $more_than_ago | See: [Any](#any) |
| $less_than_ago | See: [Any](#any) |
| $more_than_future | See: [Any](#any) |
| $less_than_future | See: [Any](#any) |
| $more_than_equal | See: [Any](#any) |
| $less_than_equal | See: [Any](#any) |
| $after | See: [Any](#any) |
| $before | See: [Any](#any) |
| $count | See: [Any](#any) |
| $count_less | See: [Any](#any) |
| $count_more | See: [Any](#any) |

## Any
Any of:

 1. Array any of: string, number, object
 2. string
 3. number
 4. object

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
