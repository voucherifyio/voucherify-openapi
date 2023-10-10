---
title: Qualification Object
type: basic
categorySlug: voucherify-api
parentDocSlug: qualifications-api
slug: qualification-object
hidden: false
order: 1
---

> 👍 Scenario Guide
>
> Read our dedicated guide to learn about some use cases these endpoints can cover [here](doc:checking-eligibility).

## Qualification object
| Attributes |  Description |
|:-----|:--------|
| redeemables | See: [Redeemables](#redeemables) |
| tracking_id</br>`string` | <p>This identifier is generated during voucher qualification based on your internal id (e.g., email, database ID). This is a hashed customer source ID.</p> |
| order</br>`object` | <p>The order object sent in the request.</p> See: [Order object](#order-object) |
| stacking_rules | See: [Examine Qualification Stacking Rules](#examine-qualification-stacking-rules) |

## Redeemables
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>The type of object represented by JSON. Default is <code>list</code>.</p> |
| data_ref</br>`string` | <p>Identifies the name of the attribute that contains the array of qualified redeemables.</p> |
| data</br>`array` | <p>Array of qualified redeemables.</p> |
| total</br>`integer` | <p>The number of redeemables returned in the API request.</p> **Example:** <p>5</p> |
| has_more</br>`boolean` | <p>As results are always limited, the <code>has_more</code> flag indicates whether there are more records for given parameters. This let's you know if you are able to run another request (with different options) to get more records returned in the results.</p> |

## Order object
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique order ID, assigned by Voucherify.</p> **Example:** <p>ord_GFDbbv2I0wnO0sFUBOOOXPj2</p> |
| source_id</br>`string` | <p>The merchant’s order ID if it is different from the Voucherify order ID. It is really useful in case of integration between multiple systems. It can be an order ID from CRM, database or 3rd party service.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the order was created in ISO 8601 format.</p> **Example:** <p>2022-03-09T11:19:04.819Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the order was updated in ISO 8601 format.</p> **Example:** <p>2022-08-12T13:34:10.681Z</p> |
| status</br>`string` | <p>Order status.</p> Available values: `CREATED`, `PAID`, `CANCELED`, `FULFILLED` |
| amount</br>`integer` | <p>Order amount before applying any discount.</p> |
| discount_amount</br>`integer` | <p>Sum of all order-level discounts applied to the order.</p> |
| items_discount_amount</br>`integer` | <p>Sum of all product-specific discounts applied to the order.<br><code>sum(items, i =&gt; i.discount_amount)</code></p> |
| total_discount_amount</br>`integer` | <p>Sum of all order-level AND all product-specific discounts applied to the order.<br><code>total_discount_amount</code> = <code>discount_amount</code> + <code>items_discount_amount</code></p> |
| total_amount</br>`integer` | <p>Order amount after applying all the discounts.<br><code>total_amount</code> = <code>amount</code> - <code>total_discount_amount</code></p> |
| items</br>`array` | <p>Array of order items that have been applied to the order. Each order item can show the effects of particular discounts on the item-level.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>The type of object represented by JSON. This object stores information about the <code>order_item</code>.</p></td></tr><tr><td style="text-align:left">product_id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier that represents the product and is assigned by Voucherify.</p> <strong>Example:</strong> <p>prod_5h0wc453_1</p></td></tr><tr><td style="text-align:left">sku_id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier that represents the SKU and is assigned by Voucherify.</p> <strong>Example:</strong> <p>sku_prod_5h0wc453_1_1</p></td></tr><tr><td style="text-align:left">quantity</br><code>integer</code></td><td style="text-align:left"><p>Quantity of the item in the cart.</p></td></tr><tr><td style="text-align:left">amount</br><code>integer</code></td><td style="text-align:left"><p>Represents a total pre-discount amount of order item (<code>price</code> * <code>quantity</code>).</p></td></tr><tr><td style="text-align:left">discount_amount</br><code>integer</code></td><td style="text-align:left"><p>The item-level discount applied to the item.</p></td></tr><tr><td style="text-align:left">price</br><code>integer</code></td><td style="text-align:left"><p>Unit price of an item. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 is written as 10000.</p></td></tr><tr><td style="text-align:left">subtotal_amount</br><code>integer</code></td><td style="text-align:left"><p>Final order item amount after the applied item-level discount.  If there are no item-level discounts applied, this item is equal to the <code>amount</code>.<br><code>subtotal_amount</code>=<code>amount</code>-<code>discount_amount</code></p></td></tr><tr><td style="text-align:left">product</br><code>object</code></td><td style="text-align:left"><p>This object stores more information about the related product.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier that represents the product and is assigned by Voucherify.</p> <strong>Example:</strong> <p>prod_5h0wc453_1</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>A unique product identifier from your inventory system.</p> <strong>Example:</strong> <p>illy-arabica</p></td></tr><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"><p>Product name.</p> <strong>Example:</strong> <p>Brewing System</p></td></tr><tr><td style="text-align:left">price</br><code>integer</code></td><td style="text-align:left"><p>Unit price of a product. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 is written as 10000.</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">sku</br><code>object</code></td><td style="text-align:left"><p>This object stores more information about the related SKU.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier that represents the SKU and is assigned by Voucherify.</p> <strong>Example:</strong> <p>sku_prod_5h0wc453_1_1</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>A unique SKU identifier from your inventory system.</p> <strong>Example:</strong> <p>illy-arabica-250g</p></td></tr><tr><td style="text-align:left">sku</br><code>string</code></td><td style="text-align:left"><p>SKU name.</p></td></tr><tr><td style="text-align:left">price</br><code>integer</code></td><td style="text-align:left"><p>Unit price of a SKU. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 is written as 10000.</p></td></tr></tbody></table></td></tr></tbody></table> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the order. A set of key/value pairs that are attached to an order object. Stores additional information about the order in a structured format.</p> |
| customer</br>`object` | <p>Object containing information about the customer that is making the purchase.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique customer ID of the customer making the purchase.</p> <strong>Example:</strong> <p>cust_7iUa6ICKyU6gH40dBU25kQU1</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>Type of object represented by the <code>customer</code> object.</p></td></tr></tbody></table> |
| referrer</br>`object` | <p>Object containing information about the referrer.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique referrer ID, who referred the customer making the purchase.</p> <strong>Example:</strong> <p>cust_7iUa6ICKyU6gH40dBU25kQU1</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>Type of object represented by the referrer object.</p></td></tr></tbody></table> |
| customer_id</br>`string` | <p>Unique customer ID of the customer making the purchase.</p> **Example:** <p>cust_7iUa6ICKyU6gH40dBU25kQU1</p> |
| referrer_id</br>`string` | <p>Unique referrer ID.</p> **Example:** <p>cust_nM4jqPiaXUvQdVSA6vTRUnix</p> |
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about the <code>order</code>.</p> |

## Examine Qualification Stacking Rules
| Attributes |  Description |
|:-----|:--------|
| redeemables_limit</br>`integer` | <p>Defines how many redeemables can be sent with one stacking request. We have extended the maximum value from 5 to 30 (comment: but more redeemables means more processing time!). Default limit is <code>30</code>.</p> |
| applicable_redeemables_limit</br>`integer` | <p>Defines how many of sent redeemables will be actually applied to the order (e.g. user can select 30 discounts but only 5 will be applied to the order, the remaining will be marked as SKIPPED). Default limit is <code>5</code>.</p> |

[block:html]
{
    "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
