---
title: Product Collection Object
type: basic
categorySlug: voucherify-api
parentDocSlug: product-collections
slug: product-collection-object
hidden: false
order: 1
---

## Product Collection Base
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Product collection ID.</p> |
| name</br>`string` | <p>Unique user-defined product collection name.</p> **Example:** <p>All Products</p> |
| type</br>`string` | <p>Describes whether the product collection is dynamic (products come in and leave based on set criteria) or static (manually selected products).</p> Available values: `STATIC`, `AUTO_UPDATE` |
| filter</br>`object` | <p>Defines a set of criteria and boundary conditions for an <code>AUTO_UPDATE</code> product collection type.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">junction</td><td style="text-align:left">See: <a href="#junction">Junction</a></td></tr><tr><td style="text-align:left">[propertyName]</td><td style="text-align:left"><p>Valid keys: <code>id</code>, <code>product_id</code>, <code>source_id</code>, <code>name</code>, <code>price</code>, <code>object</code>, <code>attributes</code>, <code>image_url</code>, <code>skus</code>, <code>created_at</code>, <code>updated_at</code> and <code>metadata.*</code></p> <a href="#field-conditions">Field Conditions</a></td></tr></tbody></table> |
| products</br>`array` | <p>Defines a set of products for a <code>STATIC</code> product collection type.</p> Array of: <h3>Product Collections Item Products Item</h3><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>The product ID.</p> <strong>Example:</strong> <p>prod_0a41bcf807c5fcaaf6</p></td></tr><tr><td style="text-align:left">product_id</br><code>string</code></td><td style="text-align:left"><p>Product ID for SKUs.</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>Denotes the type of the object represented by the ID.</p> Available values: <code>sku</code>, <code>product</code></td></tr></tbody></table> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the product collection was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2021-12-09T12:51:29.898Z</p> |
| object</br>`string` | <p>The type of the object represented by JSON. This object stores information about the static product collection.</p> Available values: `products_collection` |

## Junction
<p>Logical Operator Between Filters. Filter by conditions set on the <code>junction</code> parameter indicating how the <code>conditions</code> should be accounted for in the query. An <code>AND</code> is an all-inclusive logical operator, meaning the <code>AND</code> operator displays a record if <strong>ALL</strong> the conditions separated by AND are TRUE, while  an <code>OR</code> operator displays a record if <strong>ANY</strong> of the conditions separated by OR is TRUE.</p>

Available values: `and`, `or`

## Field Conditions
| Attributes |  Description |
|:-----|:--------|
| conditions | <p>Data filters used to narrow down the data records to be returned in the result.</p> [Filters Condition](#filters-condition) |

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
Array any of: string, string, string, number, object

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
