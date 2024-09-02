---
title: Validation Object
type: basic
categorySlug: voucherify-api
parentDocSlug: validations
slug: validation-object
hidden: false
order: 1
---

## Vouchers Validate Response Body
<p>Response body schema for <strong>POST</strong> <code>v1/vouchers/{code}/validate</code>.</p>

One of:

[Vouchers Validate Valid Response Body](#vouchers-validate-valid-response-body), [Vouchers Validate Invalid Response Body](#vouchers-validate-invalid-response-body)

## Vouchers Validate Valid Response Body
| Attributes |  Description |
|:-----|:--------|
| valid</br>`boolean` | <p>Indicates whether the voucher is valid within the context of the parameters provided in the request body.</p> |
| code</br>`string` | <p>Voucher code.</p> |
| applicable_to | <p>Contains list of items that qualify in the scope of the discount. These are definitions of included products, SKUs, and product collections. These can be discounted.</p> [Applicable To Result List](#applicable-to-result-list) |
| inapplicable_to | <p>Contains list of items that do not qualify in the scope of the discount. These are definitions of excluded products, SKUs, and product collections. These CANNOT be discounted.</p> [Inapplicable To Result List](#inapplicable-to-result-list) |
| campaign</br>`string` | <p>Voucher's parent campaign name.</p> |
| campaign_id</br>`string` | <p>Voucher's parent campaign's unique ID.</p> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the code. A set of key/value pairs that you can attach to a voucher object. It can be useful for storing additional information about the voucher in a structured format.</p> |
| discount | See: [Discount](#discount) |
| gift | <p>Gift object response</p> [Gift](#gift) |
| loyalty</br>`object` | <p>Contains the cost of reward in points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">points_cost</br><code>number</code></td><td style="text-align:left"><p>Number of points that wlil be deducted from loyaty card for the associated reward.</p></td></tr></tbody></table> |
| reward</br>`object` | <p>Contains information about the reward that is being validated.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique reward ID assigned by Voucherify.</p></td></tr><tr><td style="text-align:left">assignment_id</br><code>string</code></td><td style="text-align:left"><p>Unique reward assignment ID assigned by Voucherify.</p></td></tr><tr><td style="text-align:left">points</br><code>number</code></td><td style="text-align:left"><p>Number of points applied to the reward.</p></td></tr></tbody></table> |
| order | See: [Order Calculated No Customer Data](#order-calculated-no-customer-data) |
| session | <p>Schema model for session lock object. The session object contains information about the session key that was used to establish a session between multiple parallel validation and redemption requests.</p> [Session](#session) |
| start_date</br>`string` | <p>Activation timestamp defines when the voucher starts to be active in ISO 8601 format. Voucher is inactive before this date.</p> |
| expiration_date</br>`string` | <p>Expiration timestamp defines when the voucher expires in ISO 8601 format. Voucher is inactive after this date.</p> |
| tracking_id</br>`string` | <p>Hashed order source ID.</p> |

## Vouchers Validate Invalid Response Body
| Attributes |  Description |
|:-----|:--------|
| valid</br>`boolean` | <p>Indicates whether the voucher is valid within the context of the parameters provided in the request body.</p> |
| code</br>`string` | <p>Voucher code.</p> |
| error</br>`object` | <p>Detailed failure cause for the invalid voucher if the reason has a translation defined in the Dashboard → Project Settings → Error Messages.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">code</br><code>number</code></td><td style="text-align:left"><p>Voucher code.</p></td></tr><tr><td style="text-align:left">key</br><code>string</code></td><td style="text-align:left"></td></tr><tr><td style="text-align:left">message</br><code>string</code></td><td style="text-align:left"><p>Customized error message.</p></td></tr><tr><td style="text-align:left">details</br><code>string</code></td><td style="text-align:left"></td></tr><tr><td style="text-align:left">request_id</br><code>string</code></td><td style="text-align:left"></td></tr><tr><td style="text-align:left">resource_id</br><code>string</code></td><td style="text-align:left"></td></tr><tr><td style="text-align:left">resource_type</br><code>string</code></td><td style="text-align:left"></td></tr></tbody></table> |
| tracking_id</br>`string` | <p>Hashed customer source ID.</p> |
| customer_id</br>`string` | <p>Unique customer ID of the customer making the purchase.</p> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the code. A set of key/value pairs that you can attach to a voucher object. It can be useful for storing additional information about the voucher in a structured format.</p> |
| reason</br>`string` |  |

## Applicable To Result List
| Attributes |  Description |
|:-----|:--------|
| data</br>`array` | <p>Contains array of items to which the discount can apply.</p> Array of [Applicable To](#applicable-to) |
| total</br>`integer` | <p>Total number of objects defining included products, SKUs, or product collections.</p> |
| object</br>`string` | <p>The type of the object represented by JSON.</p> Available values: `list` |
| data_ref</br>`string` | <p>The type of the object represented by JSON.</p> Available values: `data` |

## Inapplicable To Result List
| Attributes |  Description |
|:-----|:--------|
| data</br>`array` | <p>Contains array of items to which the discount cannot apply.</p> Array of [Inapplicable To](#inapplicable-to) |
| total</br>`integer` | <p>Total number of objects defining included products, SKUs, or product collections.</p> |
| object</br>`string` | <p>The type of the object represented by JSON.</p> Available values: `list` |
| data_ref</br>`string` | <p>The type of the object represented by JSON.</p> Available values: `data` |

## Discount
<p>Contains information about discount.</p>

One of:

[Amount](#amount), [Unit](#unit), [Unit Multiple](#unit-multiple), [Percent](#percent), [Fixed](#fixed)

## Gift
| Attributes |  Description |
|:-----|:--------|
| amount</br>`number` | <p>Total gift card income over the lifetime of the card. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 amount is written as 10000.</p> |
| balance</br>`number` | <p>Available funds. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 amount is written as 10000.</p> |
| effect</br>`string` | <p>Defines how the credits are applied to the customer's order.</p> Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS` |

## Order Calculated No Customer Data
All of:

1. [Order Response Base](#order-response-base)
2. <h3>Order Customer And Referrer Ids Objects</h3><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">created_at</br><code>string</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the order was created. The value is shown in the ISO 8601 format.</p> <strong>Example:</strong> <p>2021-12-22T10:13:06.487Z</p></td></tr><tr><td style="text-align:left">updated_at</br><code>string</code>, <code>null</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the order was last updated in ISO 8601 format.</p> <strong>Example:</strong> <p>2021-12-22T10:14:45.316Z</p></td></tr><tr><td style="text-align:left">customer_id</br><code>string</code>, <code>null</code></td><td style="text-align:left"><p>Unique customer ID of the customer making the purchase.</p> <strong>Example:</strong> <p>cust_7iUa6ICKyU6gH40dBU25kQU1</p></td></tr><tr><td style="text-align:left">referrer_id</br><code>string</code>, <code>null</code></td><td style="text-align:left"><p>Unique referrer ID.</p> <strong>Example:</strong> <p>cust_nM4jqPiaXUvQdVSA6vTRUnix</p></td></tr><tr><td style="text-align:left">customer</td><td style="text-align:left"><a href="#customer-id">Customer Id</a></td></tr><tr><td style="text-align:left">referrer</td><td style="text-align:left"><a href="#referrer-id">Referrer Id</a></td></tr></tbody></table>

## Session
| Attributes |  Description |
|:-----|:--------|
| key</br>`string` | <p>The session unique ID assigned by Voucherify or your own unique session ID. Sending an existing ID will result in overwriting an existing session. If no session key is provided, then a new ID will be generated.</p> |
| type</br>`string` | <p>This parameter is required to establish a new session.</p> Available values: `LOCK` |
| ttl</br>`number` | <p>Value for the period of time that the session is active. Units for this parameter are defined by the session.ttl_unit parameter.</p> |
| ttl_unit</br>`string` | <p>Defines the type of unit in which the session time is counted.</p> Available values: `DAYS`, `HOURS`, `MICROSECONDS`, `MILLISECONDS`, `MINUTES`, `NANOSECONDS`, `SECONDS` |

## Applicable To
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>This object stores information about the product collection.</p> Available values: `product`, `sku`, `products_collection` |
| id</br>`string` | <p>Unique product collection ID assigned by Voucherify.</p> |
| source_id</br>`string` | <p>The source ID from your inventory system.</p> |
| product_id</br>`string` | <p>Parent product's unique ID assigned by Voucherify.</p> |
| product_source_id</br>`string` | <p>Parent product's source ID from your inventory system.</p> |
| strict</br>`boolean` |  |
| price</br>`number` | <p>New fixed price of an item. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 price is written as 1000. In case of the fixed price being calculated by the formula, i.e. the price_formula parameter is present in the fixed price definition, this value becomes the fallback value. Such that in a case where the formula cannot be calculated due to missing metadata, for example, this value will be used as the fixed price.</p> |
| price_formula</br>`number` | <p>Formula used to calculate the discounted price of an item.</p> |
| effect | <p>Defines how the discount is applied to the customer's order.</p> [Applicable To Effect](#applicable-to-effect) |
| quantity_limit</br>`integer` | <p>The maximum number of units allowed to be discounted per order line item.</p> |
| aggregated_quantity_limit</br>`integer` | <p>The maximum number of units allowed to be discounted combined across all matched order line items.</p> |
| amount_limit</br>`integer` | <p>Upper limit allowed to be applied as a discount per order line item. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $6 maximum discount is written as 600.</p> |
| aggregated_amount_limit</br>`integer` | <p>Maximum discount amount per order. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $6 maximum discount on the entire order is written as 600. This value is definable for the following discount effects:</p><ul><li><code>APPLY_TO_ITEMS</code> (each item subtotal is discounted equally)</li><li><code>APPLY_TO_ITEMS_BY_QUANTITY</code> (each unit of matched products has the same discount value)</li></ul> |
| order_item_indices</br>`array` |  |

## Inapplicable To
[Applicable To](#applicable-to)

## Amount
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines the type of the voucher.</p> Available values: `AMOUNT` |
| amount_off</br>`number` | <p>Amount taken off the subtotal of a price. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 discount is written as 1000.</p> |
| amount_off_formula</br>`string` |  |
| aggregated_amount_limit</br>`integer` | <p>Maximum discount amount per order.</p> |
| effect | <p>Defines how the discount is applied to the customer's order.</p> [Discount Amount Vouchers Effect Types](#discount-amount-vouchers-effect-types) |
| is_dynamic</br>`boolean` | <p>Flag indicating whether the discount was calculated using a formula.</p> |

## Unit
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Discount type.</p> Available values: `UNIT` |
| unit_off</br>`integer` | <p>Number of units to be granted a full value discount.</p> |
| unit_off_formula</br>`string` |  |
| effect | <p>Defines how the unit is added to the customer's order.</p> [Discount Unit Vouchers Effect Types](#discount-unit-vouchers-effect-types) |
| unit_type</br>`string` | <p>The product deemed as free, chosen from product inventory (e.g. time, items).</p> |
| product | <p>Contains information about the product.</p> [Simple Product Discount Unit](#simple-product-discount-unit) |
| sku | See: [Simple Sku Discount Unit](#simple-sku-discount-unit) |
| is_dynamic</br>`boolean` | <p>Flag indicating whether the discount was calculated using a formula.</p> |

## Unit Multiple
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Discount type.</p> Available values: `UNIT` |
| effect</br>`string` | <p>Defines how the discount is applied to the customer's order.</p> Available values: `ADD_MANY_ITEMS` |
| units</br>`array` | Array of [One Unit](#one-unit) |

## Percent
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines the type of the voucher.</p> Available values: `PERCENT` |
| percent_off</br>`number` | <p>The percent discount that the customer will receive.</p> |
| percent_off_formula</br>`string` |  |
| amount_limit</br>`number` | <p>Upper limit allowed to be applied as a discount. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $6 maximum discount is written as 600.</p> |
| aggregated_amount_limit</br>`integer` | <p>Maximum discount amount per order.</p> |
| effect | <p>Defines how the discount is applied to the customer's order.</p> [Discount Percent Vouchers Effect Types](#discount-percent-vouchers-effect-types) |
| is_dynamic</br>`boolean` | <p>Flag indicating whether the discount was calculated using a formula.</p> |

## Fixed
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines the type of the voucher.</p> Available values: `FIXED` |
| fixed_amount</br>`number` | <p>Sets a fixed value for an order total or the item price. The value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 discount is written as 1000. If the fixed amount is calculated by the formula, i.e. the <code>fixed_amount_formula</code> parameter is present in the fixed amount definition, this value becomes the <strong>fallback value</strong>. As a result, if the formula cannot be calculated due to missing metadata, for example, this value will be used as the fixed value.</p> |
| fixed_amount_formula</br>`string` |  |
| effect | <p>Defines how the discount is applied to the customer's order.</p> [Discount Fixed Vouchers Effect Types](#discount-fixed-vouchers-effect-types) |
| is_dynamic</br>`boolean` | <p>Flag indicating whether the discount was calculated using a formula.</p> |

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

## Applicable To Effect
Available values: `APPLY_TO_EVERY`, `APPLY_TO_CHEAPEST`, `APPLY_TO_MOST_EXPENSIVE`

## Discount Amount Vouchers Effect Types
Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS`, `APPLY_TO_ITEMS_PROPORTIONALLY`, `APPLY_TO_ITEMS_PROPORTIONALLY_BY_QUANTITY`, `APPLY_TO_ITEMS_BY_QUANTITY`

## Discount Unit Vouchers Effect Types
Available values: `ADD_MISSING_ITEMS`, `ADD_NEW_ITEMS`, `ADD_MANY_ITEMS`

## Simple Product Discount Unit
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique product ID, assigned by Voucherify.</p> |
| source_id</br>`string` | <p>Product's source ID.</p> |
| name</br>`string` | <p>Product name.</p> |

## Simple Sku Discount Unit
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique SKU ID, assigned by Voucherify.</p> |
| source_id</br>`string` | <p>Product variant's source ID.</p> |
| name</br>`string` | <p>Sku name</p> |

## One Unit
| Attributes |  Description |
|:-----|:--------|
| unit_off</br>`number` | <p>Number of units to be granted a full value discount.</p> |
| unit_off_formula</br>`string` |  |
| effect</br>`string` | <p>Defines how the unit is added to the customer's order.</p> Available values: `ADD_NEW_ITEMS`, `ADD_MISSING_ITEMS` |
| unit_type</br>`string` | <p>The product deemed as free, chosen from product inventory (e.g. time, items).</p> |
| product | <p>Contains information about the product.</p> [Simple Product Discount Unit](#simple-product-discount-unit) |
| sku | <p>Contains information about the sku.</p> [Simple Sku Discount Unit](#simple-sku-discount-unit) |

## Discount Percent Vouchers Effect Types
Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS`

## Discount Fixed Vouchers Effect Types
Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS`

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