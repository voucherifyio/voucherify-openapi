---
title: Order Object
type: basic
categorySlug: voucherify-api
parentDocSlug: orders
slug: order-object
hidden: false
order: 1
---

## Order Calculated No Customer Data
All of:

1. [Order Response Base](#order-response-base)
2. <h3>Order Customer And Referrer Ids Objects</h3><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">created_at</br><code>string</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the order was created. The value is shown in the ISO 8601 format.</p> <strong>Example:</strong> <p>2021-12-22T10:13:06.487Z</p></td></tr><tr><td style="text-align:left">updated_at</br><code>string</code>, <code>null</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the order was last updated in ISO 8601 format.</p> <strong>Example:</strong> <p>2021-12-22T10:14:45.316Z</p></td></tr><tr><td style="text-align:left">customer_id</br><code>string</code>, <code>null</code></td><td style="text-align:left"><p>Unique customer ID of the customer making the purchase.</p> <strong>Example:</strong> <p>cust_7iUa6ICKyU6gH40dBU25kQU1</p></td></tr><tr><td style="text-align:left">referrer_id</br><code>string</code>, <code>null</code></td><td style="text-align:left"><p>Unique referrer ID.</p> <strong>Example:</strong> <p>cust_nM4jqPiaXUvQdVSA6vTRUnix</p></td></tr><tr><td style="text-align:left">customer</td><td style="text-align:left"><a href="#customer-id">Customer Id</a></td></tr><tr><td style="text-align:left">referrer</td><td style="text-align:left"><a href="#referrer-id">Referrer Id</a></td></tr></tbody></table>

## Order Response Base
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique ID assigned by Voucherify of an existing order that will be linked to the redemption of this request.</p> |
| source_id</br>`string`, `null` | <p>Unique source ID of an existing order that will be linked to the redemption of this request.</p> |
| status</br>`string` | <p>The order status.</p> Available values: `CREATED`, `PAID`, `CANCELED`, `FULFILLED` |
| amount</br>`integer` | <p>A positive integer in the smallest currency unit (e.g. 100 cents for $1.00) representing the total amount of the order. This is the sum of the order items' amounts.</p> |
| initial_amount</br>`integer` | <p>A positive integer in the smallest currency unit (e.g. 100 cents for $1.00) representing the total amount of the order. This is the sum of the order items' amounts.</p> |
| discount_amount</br>`integer` | <p>Sum of all order-level discounts applied to the order.</p> |
| items_discount_amount</br>`integer` | <p>Sum of all product-specific discounts applied to the order.</p> |
| total_discount_amount</br>`integer` | <p>Sum of all order-level AND all product-specific discounts applied to the order.</p> |
| total_amount</br>`integer` | <p>Order amount after undoing all the discounts through the rollback redemption.</p> |
| applied_discount_amount</br>`integer` | <p>This field shows the order-level discount applied.</p> |
| items_applied_discount_amount</br>`integer` | <p>Sum of all product-specific discounts applied in a particular request.<br><code>sum(items, i =&gt; i.applied_discount_amount)</code></p> |
| total_applied_discount_amount</br>`integer` | <p>Sum of all order-level AND all product-specific discounts applied in a particular request.<br><code>total_applied_discount_amount</code> = <code>applied_discount_amount</code> + <code>items_applied_discount_amount</code></p> |
| items</br>`array` | <p>Array of items applied to the order.</p> Array of [Order Item Calculated](#order-item-calculated) |
| metadata</br>`object` | <p>A set of custom key/value pairs that you can attach to an order. It can be useful for storing additional information about the order in a structured format.</p> |
| object</br>`string` | <p>The type of the object represented by JSON.</p> Available values: `order` |

## Customer Id
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>A unique identifier of an existing customer.</p> |
| object</br>`string` | <p>The type of the object represented by JSON.</p> Available values: `customer` |

## Referrer Id
[Customer Id](#customer-id)

## Order Item Calculated
| Attributes |  Description |
|:-----|:--------|
| sku_id</br>`string` | <p>Unique identifier of the SKU. It is assigned by Voucherify.</p> |
| product_id</br>`string` | <p>Unique identifier of the product. It is assigned by Voucherify.</p> |
| related_object</br>`string` | <p>Used along with the source_id property, can be set to either sku or product.</p> Available values: `product`, `sku` |
| source_id</br>`string` | <p>The merchant's product/SKU ID (if it is different from the Voucherify product/SKU ID). It is useful in the integration between multiple systems. It can be an ID from an eCommerce site, a database, or a third-party service.</p> |
| quantity</br>`integer` | <p>The quantity of the particular item in the cart.</p> |
| discount_quantity</br>`integer` | <p>Number of dicounted items.</p> |
| initial_quantity</br>`integer` | <p>A positive integer in the smallest unit quantity representing the total amount of the order; this is the sum of the order items' quantity.</p> |
| amount</br>`integer` | <p>The total amount of the order item (price * quantity).</p> |
| discount_amount</br>`integer` | <p>Sum of all order-item-level discounts applied to the order.</p> |
| applied_discount_amount</br>`integer` | <p>This field shows the order-level discount applied.</p> |
| applied_discount_quantity</br>`integer` | <p>Number of the discounted items applied in the transaction.</p> |
| applied_quantity</br>`integer` | <p>Quantity of items changed by the application of a new quantity items. It can be positive when an item is added or negative if an item is replaced.</p> |
| applied_quantity_amount</br>`integer` | <p>Amount for the items changed by the application of a new quantity items. It can be positive when an item is added or negative if an item is replaced.</p> |
| initial_amount</br>`integer` | <p>A positive integer in the smallest currency unit (e.g. 100 cents for $1.00) representing the total amount of the order. This is the sum of the order items' amounts.</p> |
| price</br>`integer` | <p>Unit price of an item. Value is multiplied by 100 to precisely represent 2 decimal places. For example <code>10000 cents</code> for <code>$100.00</code>.</p> |
| subtotal_amount</br>`integer` | <p>Final order item amount after the applied item-level discount.  If there are no item-level discounts applied, this item is equal to the <code>amount</code>.<br><code>subtotal_amount</code>=<code>amount</code>-<code>applied_discount_amount</code></p> |
| product</br>`object` | <p>An object containing details of the related product.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier that represents the product and is assigned by Voucherify.</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>The merchant's product ID (if it is different than Voucherify's product ID). It is really useful in case of integration between multiple systems. It can be an ID from an eCommerce site, a database or a 3rd party service.</p></td></tr><tr><td style="text-align:left">override</br><code>boolean</code></td><td style="text-align:left"><p>The override set to <code>true</code> is used to store the product information in the system. If the product does not exist, it will be created with a source_id; if it does exist, the provided values for the name, price, and metadata will replace those already stored in the system.</p></td></tr><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"><p>Product name.</p></td></tr><tr><td style="text-align:left">metadata</br><code>object</code></td><td style="text-align:left"><p>A set of custom key/value pairs that you can attach to a product. It can be useful for storing additional information about the product in a structured format.</p></td></tr><tr><td style="text-align:left">price</br><code>number</code></td><td style="text-align:left"><p>Product price. A positive integer in the smallest currency unit (e.g. 100 cents for $1.00).</p></td></tr></tbody></table> |
| sku</br>`object` | <p>An object containing details of the related SKU.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier that represents the SKU and is assigned by Voucherify.</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>The merchant's SKU ID (if it is different than Voucherify's SKU ID). It is really useful in case of integration between multiple systems. It can be an ID from an eCommerce site, a database or a 3rd party service.</p></td></tr><tr><td style="text-align:left">override</br><code>boolean</code></td><td style="text-align:left"><p>The override set to <code>true</code> is used to store the product information in the system. If the product does not exist, it will be created with a source_id; if it does exist, the provided values for the name, price, and metadata will replace those already stored in the system.</p></td></tr><tr><td style="text-align:left">sku</br><code>string</code></td><td style="text-align:left"><p>The SKU name.</p></td></tr><tr><td style="text-align:left">price</br><code>number</code></td><td style="text-align:left"><p>SKU price. A positive integer in the smallest currency unit (e.g. 100 cents for $1.00).</p></td></tr></tbody></table> |
| object</br>`string` | <p>The type of the object represented by JSON.</p> Available values: `order_item` |
| metadata</br>`object` | <p>A set of custom key/value pairs that you can attach to an SKU. It can be useful for storing additional information about the SKU in a structured format.</p> |

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
