---
title: Validation Object
type: basic
categorySlug: voucherify-api
parentDocSlug: validations-api
slug: validation-object
hidden: false
order: 3
---

## Valid
<p>Response schema model for validating a voucher using <strong>POST</strong> <code>/vouchers/{code}/validate</code>.</p>

Any of:

[Valid - Discount Code](#valid---discount-code), [Valid - Gift Card](#valid---gift-card), [Valid - Loyalty Card](#valid---loyalty-card)

## Valid - Discount Code
| Attributes |  Description |
|:-----|:--------|
| valid</br>`boolean` | <p>Indicates whether the voucher is valid within the context of the parameters provided in the request body.</p> |
| applicable_to | See: [Included  Items](#included--items) |
| inapplicable_to | See: [Excluded Items](#excluded-items) |
| tracking_id</br>`string` | <p>Hashed customer source ID.</p> |
| order | See: [Order object](#order-object) |
| code</br>`string` | <p>Voucher code.</p> |
| discount | <p>Contains information about the discount to be applied to the order.</p> Any of: [Amount Discount](#amount-discount), [Percent Discount](#percent-discount), [Fixed Discount](#fixed-discount), [Unit Discount, single item](#unit-discount-single-item), [Unit Discount, multiple items](#unit-discount-multiple-items), [Shipping Discount](#shipping-discount) |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the code. A set of key/value pairs that you can attach to a voucher object. It can be useful for storing additional information about the voucher in a structured format.</p> |
| start_date</br>`string` | <p>Activation timestamp defines when the voucher starts to be active in ISO 8601 format. Voucher is <em>inactive</em> before this date.</p> **Example:** <p>2022-10-04T00:00:00.000Z</p> |
| expiration_date</br>`string` | <p>Expiration timestamp defines when the voucher expires in ISO 8601 format. Voucher is <em>inactive</em> after this date.</p> **Example:** <p>2022-10-31T00:00:00.000Z</p> |
| campaign</br>`string` | <p>Voucher's parent campaign name.</p> |
| campaign_id</br>`string` | <p>Voucher's parent campaign's unique ID.</p> **Example:** <p>camp_W8DJVd8J0btqXT6FBwn7BSkC</p> |
| session | See: [Session Lock](#session-lock) |

## Valid - Gift Card
| Attributes |  Description |
|:-----|:--------|
| valid</br>`boolean` | <p>Indicates whether the voucher is valid within the context of the parameters provided in the request body.</p> |
| applicable_to | See: [Included  Items](#included--items) |
| inapplicable_to | See: [Excluded Items](#excluded-items) |
| tracking_id</br>`string` | <p>Hashed customer source ID.</p> |
| order | See: [Order object](#order-object) |
| code</br>`string` | <p>Voucher code.</p> |
| gift</br>`object` | <p>Contains current gift card balance information.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">amount</br><code>integer</code></td><td style="text-align:left"><p>Total gift card income over the lifetime of the card. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 amount is written as 10000.</p></td></tr><tr><td style="text-align:left">balance</br><code>integer</code></td><td style="text-align:left"><p>Available funds. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 amount is written as 10000.</p></td></tr><tr><td style="text-align:left">effect</br><code>string</code></td><td style="text-align:left"><p>Defines how the credits are applied to the customer's order.</p> Available values: <code>APPLY_TO_ORDER</code>, <code>APPLY_TO_ITEMS</code></td></tr></tbody></table> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the code. A set of key/value pairs that you can attach to a voucher object. It can be useful for storing additional information about the voucher in a structured format.</p> |
| start_date</br>`string` | <p>Activation timestamp defines when the voucher starts to be active in ISO 8601 format. Voucher is <em>inactive</em> before this date.</p> **Example:** <p>2022-10-04T00:00:00.000Z</p> |
| expiration_date</br>`string` | <p>Expiration timestamp defines when the voucher expires in ISO 8601 format. Voucher is <em>inactive</em> after this date.</p> **Example:** <p>2022-10-31T00:00:00.000Z</p> |
| campaign</br>`string` | <p>Voucher's parent campaign name.</p> |
| campaign_id</br>`string` | <p>Voucher's parent campaign's unique ID.</p> **Example:** <p>camp_W8DJVd8J0btqXT6FBwn7BSkC</p> |
| session | See: [Session Lock](#session-lock) |

## Valid - Loyalty Card
| Attributes |  Description |
|:-----|:--------|
| valid</br>`boolean` | <p>Indicates whether the voucher is valid within the context of the parameters provided in the request body.</p> |
| applicable_to | See: [Included  Items](#included--items) |
| inapplicable_to | See: [Excluded Items](#excluded-items) |
| tracking_id</br>`string` | <p>Hashed customer source ID.</p> |
| order | See: [Order object - Effect: Apply to order](#order-object---effect:-apply-to-order) |
| code</br>`string` | <p>Voucher code.</p> |
| loyalty</br>`object` | <p>Contains the cost of reward in points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">points_cost</br><code>integer</code></td><td style="text-align:left"><p>Number of points that wlil be deducted from loyaty card for the associated reward.</p></td></tr></tbody></table> |
| reward</br>`object` | <p>Contains information about the reward that is being validated.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique reward ID assigned by Voucherify.</p> <strong>Example:</strong> <p>rew_Crmu3hu2FKZWZIML59AeAs1n</p></td></tr><tr><td style="text-align:left">assignment_id</br><code>string</code></td><td style="text-align:left"><p>Unique reward assignment ID assigned by Voucherify.</p> <strong>Example:</strong> <p>rewa_xZr6Ks0j5AHeMRVdELmpI9sc</p></td></tr><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>Number of points applied to the reward.</p></td></tr></tbody></table> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the code. A set of key/value pairs that you can attach to a voucher object. It can be useful for storing additional information about the voucher in a structured format.</p> |
| start_date</br>`string` | <p>Activation timestamp defines when the voucher starts to be active in ISO 8601 format. Voucher is <em>inactive</em> before this date.</p> **Example:** <p>2022-10-04T00:00:00.000Z</p> |
| expiration_date</br>`string` | <p>Expiration timestamp defines when the voucher expires in ISO 8601 format. Voucher is <em>inactive</em> after this date.</p> **Example:** <p>2022-10-31T00:00:00.000Z</p> |
| campaign</br>`string` | <p>Voucher's parent campaign name.</p> |
| campaign_id</br>`string` | <p>Voucher's parent campaign's unique ID.</p> **Example:** <p>camp_W8DJVd8J0btqXT6FBwn7BSkC</p> |
| session | See: [Session Lock](#session-lock) |

## Included  Items
| Attributes |  Description |
|:-----|:--------|
| data</br>`array` | <p>Contains array of items to which the discount can apply.</p> Array any of: [Product Collection](#product-collection), [Product Collection for Unit Discount](#product-collection-for-unit-discount), [Product Collection for Fixed Amount Discount](#product-collection-for-fixed-amount-discount), [Product](#product), [Product for Unit Discount](#product-for-unit-discount), [Product for Fixed Amount Discount](#product-for-fixed-amount-discount), [SKU](#sku), [SKU for Unit Discount](#sku-for-unit-discount), [SKU for Amount Discount](#sku-for-amount-discount) |
| total</br>`integer` | <p>Total number of objects defining included products, SKUs, or product collections.</p> |
| data_ref</br>`string` | <p>Identifies the name of the attribute that contains the array of included objects.</p> |
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about included products, SKUs, or product collections in a dictionary.</p> |

## Excluded Items
| Attributes |  Description |
|:-----|:--------|
| data</br>`array` | <p>Contains array of items to which the discount cannot apply.</p> Array any of: [Product Collection](#product-collection), [Product](#product), [SKU](#sku) |
| total</br>`integer` | <p>Total number of objects defining excluded products, SKUs, or product collections.</p> |
| data_ref</br>`string` | <p>Identifies the name of the attribute that contains the array of excluded objects.</p> |
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about excluded products, SKUs, or product collections in a dictionary.</p> |

## Order object
<p>This is an object representing an order with calculated discounts applied using the voucher code.</p>

One of:

[Order object - Effect: Apply to order](#order-object---effect:-apply-to-order), [Order object - Effect: Apply to items](#order-object---effect:-apply-to-items)

## Amount Discount
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines the type of voucher.</p> |
| effect</br>`string` | <p>Defines how the discount is applied to the customer's order.</p> Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS`, `APPLY_TO_ITEMS_PROPORTIONALLY`, `APPLY_TO_ITEMS_PROPORTIONALLY_BY_QUANTITY`, `APPLY_TO_ITEMS_BY_QUANTITY` |
| amount_off</br>`integer` | <p>Amount taken off the subtotal of a price. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 discount is written as 1000.</p> |

## Percent Discount
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines the type of voucher.</p> |
| effect</br>`string` | <p>Defines how the discount is applied to the customer's order.</p> Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS` |
| percent_off</br>`integer` | <p>The percent discount that the customer will receive.</p> |
| amount_limit</br>`integer` | <p>Upper limit allowed to be applied as a discount. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $6 maximum discount is written as 600.</p> |
| is_dynamic</br>`boolean` | <p>Flag indicating whether the discount was calculated using a formula.</p> |

## Fixed Discount
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Type of discount.</p> |
| effect</br>`string` | <p>Defines how the discount is applied to the customer's order.</p><table><thead><tr><th><strong>Effect</strong></th><th><strong>Definition</strong></th></tr></thead><tbody><tr><td><strong>APPLY_TO_ORDER</strong></td><td>Sets the order total amount to the value of the fixed amount. The discount value is calculated during the redemption as it's a difference between the total amount of the customer's order and the fixed amount.</td></tr><tr><td><strong>APPLY_TO_ITEMS</strong></td><td>Sets a new price on items. The total discount amount is calculated during the redemption and it's a difference between the initial item price and the fixed amount.</td></tr></tbody></table> Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS` |
| fixed_amount</br>`integer` | <p>Set a fixed valued for an order total or price of an item. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 discount is written as 1000. In case of the fixed amount being calculated by the formula, i.e. the <code>fixed_amount_formula</code> parameter is present in the fixed amount definition, this value becomes the <strong>fallback value</strong>. Such that in a case where the formula cannot be calculated due to missing metadata, for example, this value will be used as the fixed value.</p> |

## Unit Discount, single item
<p>This is an object representing the discount that the customer would receive in the context of the provided request body parameters. If the discount is calculated based on a formula, this object will return either the discount calculated based on the formula or the fallback value.</p>

One of:

[Unit Discount, Product](#unit-discount-product), [Unit Discount, SKU](#unit-discount-sku)

## Unit Discount, multiple items
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Discount type.</p> |
| effect</br>`string` | <p>Defines how the discount is applied to the customer's order.</p> |
| units | Any of: [Product Item](#product-item), [SKU Item](#sku-item) |

## Shipping Discount
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Discount type.</p> |
| effect</br>`string` | <p>Defines how the unit is added to the customer's order.</p> |
| unit_off</br>`integer` | <p>Number of units to be granted a full value discount.</p> |
| unit_type</br>`string` | <p>The shipping &quot;product&quot; deemed as free.</p> |
| product</br>`object` | <p>Contains information about the shipping &quot;product&quot;.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique shipping &quot;product&quot; ID, assigned by Voucherify.</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>&quot;Product's&quot; source ID.</p></td></tr><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"><p>&quot;Product&quot; name.</p></td></tr></tbody></table> |

## Session Lock
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>This session locks the redemption <strong>quantity</strong> by 1.</p> |
| key</br>`string` | <p>The session unique ID assigned by Voucherify or your own unique session ID.</p> **Example:** <p>ssn_yQGMTeKBSw8OOuFPwlBEjzGy8d8VA9Ts</p> |
| ttl_unit</br>`string` | <p>Defines the type of unit in which the session time is counted.</p> Available values: `HOURS`, `DAYS`, `MINUTES`, `SECONDS`, `MILLISECONDS`, `MICROSECONDS`, `NANOSECONDS` |
| ttl</br>`integer` | <p>Value for the period of time that the session is active. Units for this parameter are defined by the <code>session.ttl_unit</code> parameter.</p> |

## Session Lock
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>This session locks the redemption <strong>quantity</strong> by 1 and the redemption <strong>gift credits</strong> specified within the request.</p> |
| key</br>`string` | <p>The session unique ID assigned by Voucherify or your own unique session ID. Sending an existing ID will result in overwriting an existing session. If no session key is provided, then a new ID will be generated.</p> **Example:** <p>ssn_yQGMTeKBSw8OOuFPwlBEjzGy8d8VA9Ts</p> |
| ttl_unit</br>`string` | <p>Defines the type of unit in which the session time is counted.</p> Available values: `HOURS`, `DAYS`, `MINUTES`, `SECONDS`, `MILLISECONDS`, `MICROSECONDS`, `NANOSECONDS` |
| ttl</br>`integer` | <p>Value for the period of time that the session is active. Units for this parameter are defined by the <code>session.ttl_unit</code> parameter.</p> |

## Order object - Effect: Apply to order
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique order ID, assigned by Voucherify. This parameter is returned only if you use the order ID parameter of an already created and synced order in the Voucherify application, i.e by sending the <code>order.id</code> parameter in the request body.</p> **Example:** <p>ord_OLWs41pBk7VFn6ZTyX9U6keh</p> |
| source_id</br>`string` | <p>The merchant’s order ID if it is different from the Voucherify order ID. It is really useful in case of integration between multiple systems. It can be an order ID from CRM, database or 3rd party service. This parameter is returned only if you use the order ID parameter of an already created and synced order in the Voucherify application, i.e by sending the <code>order.id</code> parameter in the request body.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the order was created in ISO 8601 format. This parameter is returned only if you use the order ID parameter of an already created and synced order in the Voucherify application, i.e by sending the <code>order.id</code> parameter in the request body.</p> **Example:** <p>2022-10-06T11:40:48.705Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the order was updated in ISO 8601 format. This parameter is returned only if you use the order ID parameter of an already created and synced order in the Voucherify application, i.e by sending the <code>order.id</code> parameter in the request body.</p> **Example:** <p>2022-10-06T11:47:20.760Z</p> |
| status</br>`string` | <p>Order status. This parameter is returned if you use the order ID parameter of an already created and synced order in the Voucherify application, i.e by sending the <code>order.id</code> parameter in the request body or if you send the request body parameter when defining an order in the request body. This parameter can be passed but it's not required for validation at all. It's used in the redemption process. Normally after the redemption is done, the order is automatically to a <code>PAID</code> status. To avoid such default behaviour, the user can pass any of the other status options and it will be set the order status after the redemption instead of the default <code>PAID</code>.</p> Available values: `CREATED`, `PAID`, `CANCELED`, `FULFILLED` |
| amount</br>`integer` | <p>Order amount before applying any discount.</p> |
| discount_amount</br>`integer` | <p>Sum of all order-level discounts applied to the order.</p> |
| total_discount_amount</br>`integer` | <p>Sum of all order-level discounts.</p> |
| total_amount</br>`integer` | <p>Order amount after applying all the discounts.<br><code>total_amount</code> = <code>amount</code> - <code>total_discount_amount</code></p> |
| applied_discount_amount</br>`integer` | <p>This field shows the order-level discount applied.</p> |
| total_applied_discount_amount</br>`integer` | <p>This field sums up all order-level discounts applied to the order.</p> |
| items</br>`array` | <p>Array of order items that have been applied to the order. Each order item can show the effects of particular discounts on the item-level.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>The type of object represented by JSON. This object stores information about the <code>order_item</code>.</p></td></tr><tr><td style="text-align:left">product_id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier that represents the product and is assigned by Voucherify.</p> <strong>Example:</strong> <p>prod_5h0wc453_1</p></td></tr><tr><td style="text-align:left">sku_id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier that represents the SKU and is assigned by Voucherify.</p> <strong>Example:</strong> <p>sku_prod_5h0wc453_1_1</p></td></tr><tr><td style="text-align:left">quantity</br><code>integer</code></td><td style="text-align:left"><p>Quantity of the item in the cart.</p></td></tr><tr><td style="text-align:left">amount</br><code>integer</code></td><td style="text-align:left"><p>Represents a total pre-discount amount of order item (<code>price</code> * <code>quantity</code>).</p></td></tr><tr><td style="text-align:left">price</br><code>integer</code></td><td style="text-align:left"><p>Unit price of an item. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 is written as 10000.</p></td></tr><tr><td style="text-align:left">subtotal_amount</br><code>integer</code></td><td style="text-align:left"><p>Final order item amount after the applied item-level discount.  If there are no item-level discounts applied, this item is equal to the <code>amount</code>.<br><code>subtotal_amount</code>=<code>amount</code>-<code>discount_amount</code></p></td></tr><tr><td style="text-align:left">product</br><code>object</code></td><td style="text-align:left"><p>This object stores more information about the related product.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier that represents the product and is assigned by Voucherify.</p> <strong>Example:</strong> <p>prod_5h0wc453_1</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>A unique product identifier from your inventory system.</p> <strong>Example:</strong> <p>illy-arabica</p></td></tr><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"><p>Product name.</p> <strong>Example:</strong> <p>Brewing System</p></td></tr><tr><td style="text-align:left">price</br><code>integer</code></td><td style="text-align:left"><p>Unit price of a product. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 is written as 10000.</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">sku</br><code>object</code></td><td style="text-align:left"><p>This object stores more information about the related SKU.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier that represents the SKU and is assigned by Voucherify.</p> <strong>Example:</strong> <p>sku_prod_5h0wc453_1_1</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>A unique SKU identifier from your inventory system.</p> <strong>Example:</strong> <p>illy-arabica-250g</p></td></tr><tr><td style="text-align:left">sku</br><code>string</code></td><td style="text-align:left"><p>SKU name.</p></td></tr><tr><td style="text-align:left">price</br><code>integer</code></td><td style="text-align:left"><p>Unit price of a SKU. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 is written as 10000.</p></td></tr></tbody></table></td></tr></tbody></table> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the order. A set of key/value pairs that are att to an order object. Stores additional information about the order in a structured format.</p> |
| customer</br>`object` | <p>Object containing information about the customer that is making the purchase.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique customer ID of the customer making the purchase.</p> <strong>Example:</strong> <p>cust_7iUa6ICKyU6gH40dBU25kQU1</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>Type of object represented by the <code>customer</code> object.</p></td></tr></tbody></table> |
| referrer</br>`object` | <p>Object containing information about the referrer.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique referrer ID, who referred the customer making the purchase.</p> <strong>Example:</strong> <p>cust_7iUa6ICKyU6gH40dBU25kQU1</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>Type of object represented by the <code>referrer</code> object.</p></td></tr></tbody></table> |
| customer_id</br>`string` | <p>Unique customer ID of the customer making the purchase.</p> **Example:** <p>cust_7iUa6ICKyU6gH40dBU25kQU1</p> |
| referrer_id</br>`string` | <p>Unique referrer ID.</p> **Example:** <p>cust_nM4jqPiaXUvQdVSA6vTRUnix</p> |
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about the <code>order</code>.</p> |

## Session Lock
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>This session locks the redemption <strong>quantity</strong> by 1 and the redemption <strong>loyalty points</strong> specified within the request.</p> |
| key</br>`string` | <p>The session unique ID assigned by Voucherify or your own unique session ID. Sending an existing ID will result in overwriting an existing session. If no session key is provided, then a new ID will be generated.</p> **Example:** <p>ssn_yQGMTeKBSw8OOuFPwlBEjzGy8d8VA9Ts</p> |
| ttl_unit</br>`string` | <p>Defines the type of unit in which the session time is counted.</p> Available values: `HOURS`, `DAYS`, `MINUTES`, `SECONDS`, `MILLISECONDS`, `MICROSECONDS`, `NANOSECONDS` |
| ttl</br>`integer` | <p>Value for the period of time that the session is active. Units for this parameter are defined by the <code>session.ttl_unit</code> parameter.</p> |

## Product Collection
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>This object stores information about the product collection.</p> |
| id</br>`string` | <p>Unique product collection ID assigned by Voucherify.</p> **Example:** <p>pc_4ndRXAsTOzwSdHcQcxf489uU</p> |
| strict</br>`boolean` |  |
| effect</br>`string` | <p>Defines how the discount is applied to the customer's order.</p> Available values: `APPLY_TO_EVERY`, `APPLY_TO_CHEAPEST`, `APPLY_TO_MOST_EXPENSIVE` |

## Product Collection for Unit Discount
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>This object stores information about the product collection.</p> |
| id</br>`string` | <p>Unique product collection ID assigned by Voucherify.</p> **Example:** <p>pc_4ndRXAsTOzwSdHcQcxf489uU</p> |
| strict</br>`boolean` |  |
| effect</br>`string` | <p>Defines how the discount is applied to the customer's order.</p> Available values: `APPLY_TO_EVERY`, `APPLY_TO_CHEAPEST`, `APPLY_TO_MOST_EXPENSIVE` |
| quantity_limit</br>`integer` | <p>The maximum number of units allowed to be discounted per order line item.</p> |
| aggregated_quantity_limit</br>`integer` | <p>The maximum number of units allowed to be discounted combined across all matched order line items.</p> |

## Product Collection for Fixed Amount Discount
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>This object stores information about the product collection.</p> |
| id</br>`string` | <p>Unique product collection ID assigned by Voucherify.</p> **Example:** <p>pc_4ndRXAsTOzwSdHcQcxf489uU</p> |
| strict</br>`boolean` |  |
| price</br>`integer` | <p>New fixed price of an item. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 price is written as 1000. In case of the fixed price being calculated by the formula, i.e. the <code>price_formula</code> parameter is present in the fixed price definition, this value becomes the <strong>fallback value</strong>. Such that in a case where the formula cannot be calculated due to missing metadata, for example, this value will be used as the fixed price.</p> |
| price_formula</br>`string` | <p>Formula used to calculate the discounted price of an item.</p> **Example:** <p>&quot;IF(ORDER_AMOUNT &gt; 300;ORDER_ITEM_PRICE * 0.8;ORDER_ITEM_PRICE)</p> |
| effect</br>`string` | <p>Defines how the discount is applied to the customer's order.</p> Available values: `APPLY_TO_EVERY`, `APPLY_TO_CHEAPEST`, `APPLY_TO_MOST_EXPENSIVE` |

## Product
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>This object stores information about the product.</p> |
| id</br>`string` | <p>Unique product ID assigned by Voucherify.</p> **Example:** <p>prod_0bae2dc5a090fd0184</p> |
| source_id</br>`string` | <p>The product ID from your inventory system.</p> |
| strict</br>`boolean` |  |
| effect</br>`string` | <p>Defines how the discount is applied to the customer's order.</p> Available values: `APPLY_TO_EVERY`, `APPLY_TO_CHEAPEST`, `APPLY_TO_MOST_EXPENSIVE` |

## Product for Unit Discount
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>This object stores information about the product.</p> |
| id</br>`string` | <p>Unique product ID assigned by Voucherify.</p> **Example:** <p>prod_0bae2dc5a090fd0184</p> |
| source_id</br>`string` | <p>The product ID from your inventory system.</p> |
| strict</br>`boolean` |  |
| effect</br>`string` | <p>Defines how the discount is applied to the customer's order.</p> Available values: `APPLY_TO_EVERY`, `APPLY_TO_CHEAPEST`, `APPLY_TO_MOST_EXPENSIVE` |
| quantity_limit</br>`integer` | <p>The maximum number of units allowed to be discounted per order line item.</p> |
| aggregated_quantity_limit</br>`integer` | <p>The maximum number of units allowed to be discounted combined across all matched order line items.</p> |

## Product for Fixed Amount Discount
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>This object stores information about the product.</p> |
| id</br>`string` | <p>Unique product ID assigned by Voucherify.</p> **Example:** <p>prod_0bae2dc5a090fd0184</p> |
| source_id</br>`string` | <p>The product ID from your inventory system.</p> |
| strict</br>`boolean` |  |
| price</br>`integer` | <p>New fixed price of an item. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 price is written as 1000. In case of the fixed price being calculated by the formula, i.e. the <code>price_formula</code> parameter is present in the fixed price definition, this value becomes the <strong>fallback value</strong>. Such that in a case where the formula cannot be calculated due to missing metadata, for example, this value will be used as the fixed price.</p> |
| price_formula</br>`string` | <p>Formula used to calculate the discounted price of an item.</p> **Example:** <p>IF(ORDER_AMOUNT &gt; 300;ORDER_ITEM_PRICE * 0.8;ORDER_ITEM_PRICE)</p> |
| effect</br>`string` | <p>Defines how the discount is applied to the customer's order.</p> Available values: `APPLY_TO_EVERY`, `APPLY_TO_CHEAPEST`, `APPLY_TO_MOST_EXPENSIVE` |

## SKU
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>This object stores information about the product variant.</p> |
| id</br>`string` | <p>Unique SKU ID assigned by Voucherify.</p> **Example:** <p>sku_0b7d7dfb090be5c619</p> |
| source_id</br>`string` | <p>The source ID from your inventory system.</p> |
| product_id</br>`string` | <p>Parent product's unique ID assigned by Voucherify.</p> |
| product_source_id</br>`string` | <p>Parent product's source ID from your inventory system.</p> |
| strict</br>`boolean` |  |
| effect</br>`string` | <p>Defines how the discount is applied to the customer's order.</p> Available values: `APPLY_TO_EVERY`, `APPLY_TO_CHEAPEST`, `APPLY_TO_MOST_EXPENSIVE` |

## SKU for Unit Discount
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>This object stores information about the product variant.</p> |
| id</br>`string` | <p>Unique SKU ID assigned by Voucherify.</p> **Example:** <p>sku_0b7d7dfb090be5c619</p> |
| source_id</br>`string` | <p>The source ID from your inventory system.</p> |
| product_id</br>`string` | <p>Parent product's unique ID assigned by Voucherify.</p> |
| product_source_id</br>`string` | <p>Parent product's source ID from your inventory system.</p> |
| strict</br>`boolean` |  |
| effect</br>`string` | <p>Defines how the discount is applied to the customer's order.</p> Available values: `APPLY_TO_EVERY`, `APPLY_TO_CHEAPEST`, `APPLY_TO_MOST_EXPENSIVE` |
| quantity_limit</br>`integer` | <p>The maximum number of units allowed to be discounted per order line item.</p> |
| aggregated_quantity_limit</br>`integer` | <p>The maximum number of units allowed to be discounted combined across all matched order line items.</p> |

## SKU for Amount Discount
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>This object stores information about the product variant.</p> |
| id</br>`string` | <p>Unique SKU ID assigned by Voucherify.</p> **Example:** <p>sku_0b7d7dfb090be5c619</p> |
| source_id</br>`string` | <p>The source ID from your inventory system.</p> |
| product_id</br>`string` | <p>Parent product's unique ID assigned by Voucherify.</p> |
| product_source_id</br>`string` | <p>Parent product's source ID from your inventory system.</p> |
| strict</br>`boolean` |  |
| price</br>`integer` | <p>New fixed price of an item. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 price is written as 1000. In case of the fixed price being calculated by the formula, i.e. the <code>price_formula</code> parameter is present in the fixed price definition, this value becomes the <strong>fallback value</strong>. Such that in a case where the formula cannot be calculated due to missing metadata, for example, this value will be used as the fixed price.</p> |
| price_formula</br>`string` | <p>Formula used to calculate the discounted price of an item.</p> **Example:** <p>IF(ORDER_AMOUNT &gt; 200;ORDER_ITEM_PRICE * 0.2;6)</p> |
| effect</br>`string` | <p>Defines how the discount is applied to the customer's order.</p> Available values: `APPLY_TO_EVERY`, `APPLY_TO_CHEAPEST`, `APPLY_TO_MOST_EXPENSIVE` |

## Product Collection
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>This object stores information about the product collection.</p> |
| id</br>`string` | <p>Unique product collection ID assigned by Voucherify.</p> **Example:** <p>pc_4ndRXAsTOzwSdHcQcxf489uU</p> |
| strict</br>`boolean` |  |
| effect</br>`string` | <p>Defines how the discount is applied to the customer's order.</p> Available values: `APPLY_TO_EVERY` |

## Product
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>This product stores information about the product.</p> |
| id</br>`string` | <p>Unique product ID assigned by Voucherify.</p> **Example:** <p>prod_0bae2dc5a090fd0184</p> |
| source_id</br>`string` | <p>The product ID from your inventory system.</p> |
| strict</br>`boolean` |  |
| effect</br>`string` | <p>Defines how the discount is applied to the customer's order.</p> Available values: `APPLY_TO_EVERY` |

## SKU
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>This object stores information about the product variant.</p> |
| id</br>`string` | <p>Unique SKU ID assigned by Voucherify.</p> **Example:** <p>sku_0b7d7dfb090be5c619</p> |
| source_id</br>`string` | <p>The source ID from your inventory system.</p> |
| strict</br>`boolean` |  |
| effect</br>`string` | <p>Defines how the discount is applied to the customer's order.</p> Available values: `APPLY_TO_EVERY` |

## Order object - Effect: Apply to items
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique order ID, assigned by Voucherify. This parameter is returned only if you use the order ID parameter of an already created and synced order in the Voucherify application, i.e by sending the <code>order.id</code> parameter in the request body.</p> **Example:** <p>ord_OLWs41pBk7VFn6ZTyX9U6keh</p> |
| source_id</br>`string` | <p>The merchant’s order ID if it is different from the Voucherify order ID. It is really useful in case of integration between multiple systems. It can be an order ID from CRM, database or 3rd party service. This parameter is returned only if you use the order ID parameter of an already created and synced order in the Voucherify application, i.e by sending the <code>order.id</code> parameter in the request body.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the order was created in ISO 8601 format. This parameter is returned only if you use the order ID parameter of an already created and synced order in the Voucherify application, i.e by sending the <code>order.id</code> parameter in the request body.</p> **Example:** <p>2022-10-06T11:40:48.705Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the order was updated in ISO 8601 format. This parameter is returned only if you use the order ID parameter of an already created and synced order in the Voucherify application, i.e by sending the <code>order.id</code> parameter in the request body.</p> **Example:** <p>2022-10-06T11:47:20.760Z</p> |
| status</br>`string` | <p>Order status. This parameter is returned if you use the order ID parameter of an already created and synced order in the Voucherify application, i.e by sending the <code>order.id</code> parameter in the request body or if you send the request body parameter when defining an order in the request body. This parameter can be passed but it's not required for validation at all. It's used in the redemption process. Normally after the redemption is done, the order is automatically to a <code>PAID</code> status. To avoid such default behaviour, the user can pass any of the other status options and it will be set the order status after the redemption instead of the default <code>PAID</code>.</p> Available values: `CREATED`, `PAID`, `CANCELED`, `FULFILLED` |
| amount</br>`integer` | <p>Order amount before applying any discount.</p> |
| items_discount_amount</br>`integer` | <p>Sum of all product-specific discounts applied.<br><code>sum(items, i =&gt; i.discount_amount)</code></p> |
| total_discount_amount</br>`integer` | <p>Sum of all product-specific discounts applied.</p> |
| total_amount</br>`integer` | <p>Order amount after applying all the discounts.<br><code>total_amount</code> = <code>amount</code> - <code>total_discount_amount</code></p> |
| items_applied_discount_amount</br>`integer` | <p>Product-specifc discounts applied to all the items.</p> |
| total_applied_discount_amount</br>`integer` | <p>Product-specific discounts applied in the order.</p> |
| items</br>`array` | <p>Array of order items that have been applied to the order. Each order item can show the effects of particular discounts on the item-level.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>The type of object represented by JSON. This object stores information about the <code>order_item</code>.</p></td></tr><tr><td style="text-align:left">product_id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier that represents the product and is assigned by Voucherify.</p> <strong>Example:</strong> <p>prod_5h0wc453_1</p></td></tr><tr><td style="text-align:left">sku_id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier that represents the SKU and is assigned by Voucherify.</p> <strong>Example:</strong> <p>sku_prod_5h0wc453_1_1</p></td></tr><tr><td style="text-align:left">quantity</br><code>integer</code></td><td style="text-align:left"><p>Quantity of the item in the cart.</p></td></tr><tr><td style="text-align:left">amount</br><code>integer</code></td><td style="text-align:left"><p>Represents a total pre-discount amount of order item (<code>price</code> * <code>quantity</code>).</p></td></tr><tr><td style="text-align:left">discount_amount</br><code>integer</code></td><td style="text-align:left"><p>The item-level discount applied to the item.</p></td></tr><tr><td style="text-align:left">applied_discount_amount</br><code>integer</code></td><td style="text-align:left"><p>The item-level discount applied to the item.</p></td></tr><tr><td style="text-align:left">price</br><code>integer</code></td><td style="text-align:left"><p>Unit price of an item. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 is written as 10000.</p></td></tr><tr><td style="text-align:left">subtotal_amount</br><code>integer</code></td><td style="text-align:left"><p>Final order item amount after the applied item-level discount.  If there are no item-level discounts applied, this item is equal to the <code>amount</code>.<br><code>subtotal_amount</code>=<code>amount</code>-<code>discount_amount</code></p></td></tr><tr><td style="text-align:left">product</br><code>object</code></td><td style="text-align:left"><p>This object stores more information about the related product.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier that represents the product and is assigned by Voucherify.</p> <strong>Example:</strong> <p>prod_5h0wc453_1</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>A unique product identifier from your inventory system.</p> <strong>Example:</strong> <p>illy-arabica</p></td></tr><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"><p>Product name.</p> <strong>Example:</strong> <p>Brewing System</p></td></tr><tr><td style="text-align:left">price</br><code>integer</code></td><td style="text-align:left"><p>Unit price of a product. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 is written as 10000.</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">sku</br><code>object</code></td><td style="text-align:left"><p>This object stores more information about the related SKU.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier that represents the SKU and is assigned by Voucherify.</p> <strong>Example:</strong> <p>sku_prod_5h0wc453_1_1</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>A unique SKU identifier from your inventory system.</p> <strong>Example:</strong> <p>illy-arabica-250g</p></td></tr><tr><td style="text-align:left">sku</br><code>string</code></td><td style="text-align:left"><p>SKU name.</p></td></tr><tr><td style="text-align:left">price</br><code>integer</code></td><td style="text-align:left"><p>Unit price of a SKU. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 is written as 10000.</p></td></tr></tbody></table></td></tr></tbody></table> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the order. A set of key/value pairs that are att to an order object. Stores additional information about the order in a structured format.</p> |
| customer</br>`object` | <p>Object containing information about the customer that is making the purchase.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique customer ID of the customer making the purchase.</p> <strong>Example:</strong> <p>cust_7iUa6ICKyU6gH40dBU25kQU1</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>Type of object represented by the <code>customer</code> object.</p></td></tr></tbody></table> |
| referrer</br>`object` | <p>Object containing information about the referrer.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique referrer ID, who referred the customer making the purchase.</p> <strong>Example:</strong> <p>cust_7iUa6ICKyU6gH40dBU25kQU1</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>Type of object represented by the <code>referrer</code> object.</p></td></tr></tbody></table> |
| customer_id</br>`string` | <p>Unique customer ID of the customer making the purchase.</p> **Example:** <p>cust_7iUa6ICKyU6gH40dBU25kQU1</p> |
| referrer_id</br>`string` | <p>Unique referrer ID.</p> **Example:** <p>cust_nM4jqPiaXUvQdVSA6vTRUnix</p> |
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about the <code>order</code>.</p> |

## Unit Discount, Product
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Discount type.</p> |
| effect</br>`string` | <p>Defines how the unit is added to the customer's order.</p> Available values: `ADD_MISSING_ITEMS`, `ADD_NEW_ITEMS` |
| unit_off</br>`integer` | <p>Number of units to be granted a full value discount.</p> |
| unit_type</br>`string` | <p>The product deemed as free, chosen from product inventory (e.g. time, items).</p> **Example:** <p>prod_0a9f9ab4ab019a42d5</p> |
| product</br>`object` | <p>Contains information about the product.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique product ID, assigned by Voucherify.</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>Product's source ID.</p></td></tr><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"><p>Product name.</p></td></tr></tbody></table> |

## Unit Discount, SKU
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Discount type.</p> |
| effect</br>`string` | <p>Defines how the unit is added to the customer's order.</p> Available values: `ADD_MISSING_ITEMS`, `ADD_NEW_ITEMS` |
| unit_off</br>`integer` | <p>Number of units to be granted a full value discount.</p> |
| unit_type</br>`string` | <p>The product variant deemed as free, chosen from product inventory (e.g. time, items).</p> **Example:** <p>sku_0bae3b28f610fd0da1</p> |
| sku</br>`object` | <p>Contains information about the SKU.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique SKU ID, assigned by Voucherify.</p> <strong>Example:</strong> <p>sku_0bae3b28f610fd0da1</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>Product variant's source ID.</p></td></tr><tr><td style="text-align:left">sku</br><code>string</code></td><td style="text-align:left"><p>Product varient's name.</p></td></tr></tbody></table> |
| product</br>`object` | <p>Contains information about the parent product.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique parent product ID, assigned by Voucherify.</p> <strong>Example:</strong> <p>prod_0bae2dc5a090fd0184</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>Source ID of parent product.</p></td></tr><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"><p>Name of parent product.</p></td></tr></tbody></table> |

## Product Item
| Attributes |  Description |
|:-----|:--------|
| effect</br>`string` | <p>Defines how the unit is added to the customer's order.</p> Available values: `ADD_MISSING_ITEMS`, `ADD_NEW_ITEMS` |
| unit_off</br>`integer` | <p>Number of units to be granted a full value discount.</p> |
| unit_type</br>`string` | <p>The product deemed as free, chosen from product inventory (e.g. time, items).</p> **Example:** <p>prod_0a9f9ab4ab019a42d5</p> |
| product</br>`object` | <p>Contains information about the product.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique product ID, assigned by Voucherify.</p> <strong>Example:</strong> <p>prod_0a9f9ab4ab019a42d5</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>Product's source ID.</p></td></tr><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"><p>Product name.</p></td></tr></tbody></table> |

## SKU Item
| Attributes |  Description |
|:-----|:--------|
| effect</br>`string` | <p>Defines how the unit is added to the customer's order.</p> Available values: `ADD_MISSING_ITEMS`, `ADD_NEW_ITEMS` |
| unit_off</br>`integer` | <p>Number of units to be granted a full value discount.</p> |
| unit_type</br>`string` | <p>The product variant deemed as free, chosen from product inventory (e.g. time, items).</p> **Example:** <p>sku_0bae3b28f610fd0da1</p> |
| sku</br>`object` | <p>Contains information about the SKU.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique SKU ID, assigned by Voucherify.</p> <strong>Example:</strong> <p>sku_0bae3b28f610fd0da1</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>Product variant's source ID.</p></td></tr><tr><td style="text-align:left">sku</br><code>string</code></td><td style="text-align:left"><p>Product varient's name.</p></td></tr></tbody></table> |
| product</br>`object` | <p>Contains information about the parent product.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique parent product ID, assigned by Voucherify.</p> <strong>Example:</strong> <p>prod_0b7d7dfb05cbe5c616</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>Source ID of parent product.</p></td></tr><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"><p>Name of parent product.</p></td></tr></tbody></table> |

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
