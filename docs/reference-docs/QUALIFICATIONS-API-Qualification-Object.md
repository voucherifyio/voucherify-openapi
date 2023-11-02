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
| order | See: [Order Response](#order-response) |
| stacking_rules | See: [Examine Qualification Stacking Rules](#examine-qualification-stacking-rules) |

## Redeemables
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>The type of object represented by JSON. Default is <code>list</code>.</p> |
| data_ref</br>`string` | <p>Identifies the name of the attribute that contains the array of qualified redeemables.</p> |
| data</br>`array` | <p>Array of qualified redeemables.</p> Array of [Combined response of redeemable object and multiple redeemables within](#combined-response-of-redeemable-object-and-multiple-redeemables-within) |
| total</br>`integer` | <p>The number of redeemables returned in the API request.</p> **Example:** <p>5</p> |
| has_more</br>`boolean` | <p>As results are always limited, the <code>has_more</code> flag indicates whether there are more records for given parameters. This let's you know if you are able to run another request (with different options) to get more records returned in the results.</p> |
| more_starting_after</br>`string` | <p>Timestamp representing the date and time to use in starting_after cursor to get more redeemables.</p> **Example:** <p>2023-10-31T12:13:16.374Z</p> |

## Order Response
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique ID assigned by Voucherify of an existing order that will be linked to the redemption of this request.</p> |
| source_id</br>`string` | <p>Unique source ID of an existing order that will be linked to the redemption of this request.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the order was created in ISO 8601 format.</p> **Example:** <p>2021-12-22T10:13:06.487Z</p> |
| updated_at</br>`string,null` | <p>Timestamp representing the date and time when the order was last updated in ISO 8601 format.</p> **Example:** <p>2021-12-22T10:14:45.316Z</p> |
| status</br>`string` | <p>The order status.</p> Available values: `CREATED`, `PAID`, `CANCELED`, `FULFILLED` |
| amount</br>`integer` | <p>A positive integer in the smallest currency unit (that is, 100 cents for $1.00) representing the total amount of the order; this is the sum of the order items' amounts.</p> |
| initial_amount</br>`integer` | <p>A positive integer in the smallest currency unit (that is, 100 cents for $1.00) representing the total amount of the order; this is the sum of the order items' amounts.</p> |
| discount_amount</br>`integer` | <p>Sum of all order-level discounts applied to the order.</p> |
| items_discount_amount</br>`integer` | <p>Sum of all product-specific discounts applied to the order.</p> |
| total_discount_amount</br>`integer` | <p>Sum of all order-level AND all product-specific discounts applied to the order.</p> |
| total_amount</br>`integer` | <p>Order amount after undoing all the discounts through the rollback redemption.</p> |
| applied_discount_amount</br>`number` | <p>This field shows the order-level discount applied.</p> |
| items_applied_discount_amount</br>`integer` | <p>Sum of all product-specific discounts applied in a particular request.<br><code>sum(items, i =&gt; i.applied_discount_amount)</code></p> |
| total_applied_discount_amount</br>`integer` | <p>Sum of all order-level AND all product-specific discounts applied in a particular request.<br><code>total_applied_discount_amount</code> = <code>applied_discount_amount</code> + <code>items_applied_discount_amount</code></p> |
| items</br>`array` | <p>Array of items applied to the order.</p> Array of [Order Item Response](#order-item-response) |
| customer | <p>This is an object containing information about the customer.</p> See: [Customer](#customer) |
| customer_id</br>`string,null` | <p>Unique customer ID of the customer making the purchase.</p> **Example:** <p>cust_7iUa6ICKyU6gH40dBU25kQU1</p> |
| referrer | <p>This is an object containing information about the referrer.</p> See: [Referrer](#referrer) |
| referrer_id</br>`string,null` | <p>Unique referrer ID.</p> **Example:** <p>cust_nM4jqPiaXUvQdVSA6vTRUnix</p> |
| object</br>`string` | <p>The type of object represented by JSON.</p> Available values: `order` |
| metadata</br>`object` | <p>A set of custom key/value pairs that you can attach to an order. It can be useful for storing additional information about the order in a structured format.</p> |

## Examine Qualification Stacking Rules
| Attributes |  Description |
|:-----|:--------|
| redeemables_limit</br>`integer` | <p>Defines how many redeemables can be sent with one stacking request (comment: more redeemables means more processing time!).</p> |
| applicable_redeemables_limit</br>`integer` | <p>Defines how many of sent redeemables will be actually applied to the order (e.g. user can select 30 discounts but only 5 will be applied to the order, the remaining will be marked as SKIPPED).</p> |
| applicable_exclusive_redeemables_limit</br>`integer` | <p>Defines how many redeemables with an exclusive category can be applied in one request.</p> |
| exclusive_categories</br>`array` | <p>Lists all exclusive categories. A redeemable from a campaign with an exclusive category is the only redeemable to be redeemed when applied with redeemables from other campaigns unless these campaigns are exclusive or joint.</p> |
| joint_categories</br>`array` | <p>Lists all joint categories. A campaign with a joint category is always applied regardless of the exclusivity of other campaigns.</p> |

## Combined response of redeemable object and multiple redeemables within
All of:

1. [Single redeemable](#single-redeemable)
2. <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">redeemables</br><code>array</code></td><td style="text-align:left">Array of <a href="#single-redeemable">Single redeemable</a></td></tr></tbody></table>

## Order Item Response
| Attributes |  Description |
|:-----|:--------|
| sku_id</br>`string` | <p>A unique SKU ID assigned by Voucherify.</p> |
| product_id</br>`string` | <p>A unique product ID assigned by Voucherify.</p> |
| related_object</br>`string` | <p>Used along with the source_id property, can be set to either sku or product.</p> Available values: `product`, `sku` |
| source_id</br>`string` | <p>The merchant’s product/SKU ID (if it is different from the Voucherify product/SKU ID). It is really useful in case of integration between multiple systems. It can be an ID from an eCommerce site, a database or a 3rd party service.</p> |
| quantity</br>`integer` | <p>The quantity of the particular item in the cart.</p> |
| discount_quantity</br>`integer` | <p>Number of dicounted items.</p> |
| initial_quantity</br>`integer` | <p>A positive integer in the smallest unit quantity representing the total amount of the order; this is the sum of the order items' quantity.</p> |
| amount</br>`integer` | <p>The total amount of the order item (price * quantity).</p> |
| discount_amount</br>`integer` | <p>Sum of all order-item-level discounts applied to the order.</p> |
| initial_amount</br>`integer` | <p>A positive integer in the smallest currency unit (that is, 100 cents for $1.00) representing the total amount of the order; this is the sum of the order items' amounts.</p> |
| total_applied_discount_amount</br>`integer` | <p>Sum of all order-level AND all product-specific discounts applied in a particular request.<br><code>total_applied_discount_amount</code> = <code>applied_discount_amount</code> + <code>items_applied_discount_amount</code></p> |
| price</br>`integer` | <p>Unit price of an item. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 is written as 10000.</p> |
| subtotal_amount</br>`integer` | <p>Final order item amount after the applied item-level discount.  If there are no item-level discounts applied, this item is equal to the <code>amount</code>.<br><code>subtotal_amount</code>=<code>amount</code>-<code>applied_discount_amount</code></p> |
| product</br>`object` | <p>An object containing details of the related product.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier that represents the product and is assigned by Voucherify.</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>The merchant’s product ID (if it is different than Voucherify's product ID). It is really useful in case of integration between multiple systems. It can be an ID from an eCommerce site, a database or a 3rd party service.</p></td></tr><tr><td style="text-align:left">override</br><code>boolean</code></td><td style="text-align:left"><p>The override set to true is used to store the product information in the system. If product does not exist, it will be created with the use of source_id; if it does exist, the provided values for the name, price, and metadata will replace those already stored in the system.</p></td></tr><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"><p>Product name.</p></td></tr><tr><td style="text-align:left">metadata</br><code>object</code></td><td style="text-align:left"><p>A set of custom key/value pairs that you can attach to a product. It can be useful for storing additional information about the product in a structured format.</p></td></tr><tr><td style="text-align:left">price</br><code>number</code></td><td style="text-align:left"><p>Product price. A positive integer in the smallest currency unit (that is, 100 cents for $1.00).</p></td></tr></tbody></table> |
| sku</br>`object` | <p>An object containing details of the related SKU.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier that represents the SKU and is assigned by Voucherify.</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>The merchant’s SKU ID (if it is different than Voucherify's SKU ID). It is really useful in case of integration between multiple systems. It can be an ID from an eCommerce site, a database or a 3rd party service.</p></td></tr><tr><td style="text-align:left">override</br><code>boolean</code></td><td style="text-align:left"><p>The override set to true is used to store the product information in the system. If product does not exist, it will be created with the use of source_id; if it does exist, the provided values for the name, price, and metadata will replace those already stored in the system.</p></td></tr><tr><td style="text-align:left">sku</br><code>string</code></td><td style="text-align:left"><p>The SKU name.</p></td></tr><tr><td style="text-align:left">price</br><code>number</code></td><td style="text-align:left"><p>SKU price. A positive integer in the smallest currency unit (that is, 100 cents for $1.00).</p></td></tr></tbody></table> |
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about the <code>order_item</code>.</p> Available values: `order_item` |
| metadata</br>`object` | <p>A set of custom key/value pairs that you can attach to an SKU. It can be useful for storing additional information about the SKU in a structured format.</p> |

## Customer
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>The ID of an existing customer that will be linked to redemption in this request.</p> |
| source_id</br>`string` | <p>A unique identifier of a customer that validates a voucher. It can be a customer ID or email from a CRM system, database or 3rd-party service. If you also pass a customer ID (unique ID assigned by Voucherify), the source ID will be ignored.</p> |
| name</br>`string` | <p>Customer's first and last name.</p> |
| description</br>`string` | <p>An arbitrary string that you can attach to a customer object.</p> |
| email</br>`string` | <p>Customer's email address.</p> |
| phone</br>`string` | <p>Customer's phone number. This parameter is mandatory when you try to send out codes to customers via an SMS channel.</p> |
| birthdate</br>`string` | <p>Customer's birthdate; format YYYY-MM-DD.</p> |
| address</br>`object` | <p>Customer's address.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">city</br><code>string</code></td><td style="text-align:left"><p>City</p></td></tr><tr><td style="text-align:left">state</br><code>string</code></td><td style="text-align:left"><p>State</p></td></tr><tr><td style="text-align:left">line_1</br><code>string</code></td><td style="text-align:left"><p>First line of address.</p></td></tr><tr><td style="text-align:left">line_2</br><code>string</code></td><td style="text-align:left"><p>Second line of address.</p></td></tr><tr><td style="text-align:left">country</br><code>string</code></td><td style="text-align:left"><p>Country.</p></td></tr><tr><td style="text-align:left">postal_code</br><code>string</code></td><td style="text-align:left"><p>Postal code.</p></td></tr></tbody></table> |
| metadata</br>`object` | <p>A set of custom key/value pairs that you can attach to a customer. The metadata object stores all custom attributes assigned to the customer. It can be useful for storing additional information about the customer in a structured format. This metadata can be used for validating whether the customer qualifies for a discount or it can be used in building customer segments.</p> |

## Referrer
All of:

1. [Customer](#customer)

## Single redeemable
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Id of the redeemable.</p> |
| object</br>`string` | <p>Object type of the redeemable</p> Available values: `campaign`, `promotion_tier`, `promotion_stack`, `voucher` |
| created_at</br>`string` | <p>Timestamp representing the date and time when the object was created in ISO 8601 format.</p> **Example:** <p>2022-03-09T11:19:04.819Z</p> |
| result | See: [Redeemable Single Result](#redeemable-single-result) |
| order | See: [Order Response](#order-response) |
| validation_rule_id</br>`string` | <p>A unique validation rule identifier assigned by the Voucherify API. The validation rule is verified before points are added to the balance.</p> |
| applicable_to | <p>Contains list of items that qualify in the scope of the discount. These are definitions of included products, SKUs, and product collections. These can be discounted.</p> See: [Applicable To Result List](#applicable-to-result-list) |
| inapplicable_to | <p>Contains list of items that do not qualify in the scope of the discount. These are definitions of excluded products, SKUs, and product collections. These CANNOT be discounted.</p> See: [Inapplicable To Result List](#inapplicable-to-result-list) |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the product. A set of key/value pairs that you can attach to a product object. It can be useful for storing additional information about the product in a structured format.</p> |
| categories</br>`array` | <p>List of categories</p> Array of [Category](#category) |
| banner</br>`string` | <p>Name of the earning rule. This is displayed as a header for the earning rule in the Dashboard.</p> **Example:** <p>Order Paid - You will get 100 points</p> |
| name</br>`string` | <p>Name of the redeemable.</p> **Example:** <p>promotion_tier_get_points</p> |
| campaign_name</br>`string` | <p>Name of the campaign associated to the redeemable. This field is available only if object is not <code>campaign</code></p> **Example:** <p>PromotionCampaign</p> |
| campaign_id</br>`string` | <p>Id of the campaign associated to the redeemable. This field is available only if object is not <code>campaign</code></p> **Example:** <p>camp_Mow7u4gSxagLlZ2oDQ01ZS5N</p> |
| validation_rules_assignments | See: [Validation Rules Assignments](#validation-rules-assignments) |

## Redeemable Single Result
| Attributes |  Description |
|:-----|:--------|
| discount | See: [Discount](#discount) |
| gift | See: [Gift](#gift) |
| loyalty_card | <p>Loyalty Card object response</p> See: [Loyalty Card](#loyalty-card) |
| error | <p>Error in result</p> See: [Error Object](#error-object) |

## Applicable To Result List
| Attributes |  Description |
|:-----|:--------|
| data</br>`array` | <p>Contains array of items to which the discount can apply.</p> Array of [ApplicableTo](#applicableto) |
| total</br>`integer` | <p>Total number of objects defining included products, SKUs, or product collections.</p> |
| object</br>`string` | <p>The type of object represented by JSON.</p> Available values: `list` |
| data_ref</br>`string` | <p>The type of object represented by JSON.</p> Available values: `data` |

## Inapplicable To Result List
| Attributes |  Description |
|:-----|:--------|
| data</br>`array` | <p>Contains array of items to which the discount cannot apply.</p> Array of [InapplicableTo](#inapplicableto) |
| total</br>`integer` | <p>Total number of objects defining included products, SKUs, or product collections.</p> |
| object</br>`string` | <p>The type of object represented by JSON.</p> Available values: `list` |
| data_ref</br>`string` | <p>The type of object represented by JSON.</p> Available values: `data` |

## Category
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique category ID assigned by Voucherify.</p> |
| name</br>`string` | <p>Category name.</p> |
| hierarchy</br>`integer` | <p>Category hierarchy.</p> |
| object</br>`string` | <p>The type of object represented by the JSON. This object stores information about the category.</p> Available values: `category` |
| created_at</br>`string` | <p>Timestamp representing the date and time when the category was created in ISO 8601 format.</p> **Example:** <p>2022-07-14T10:45:13.156Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the category was updated in ISO 8601 format.</p> **Example:** <p>2022-08-16T10:52:08.094Z</p> |
| stacking_rules_type</br>`string` | <p>The type of category stacking rules</p> Available values: `JOINT`, `EXCLUSIVE` |

## Validation Rules Assignments
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about validation rules assignments.</p> Available values: `list` |
| data_ref</br>`string` | <p>Identifies the name of the attribute that contains the array of validation rules assignments.</p> Available values: `data` |
| data</br>`array` | <p>Contains array of validation rules assignments.</p> Array of [Business Validation Rule Assignment](#business-validation-rule-assignment) |
| total</br>`integer` | <p>Total number of validation rules assignments.</p> |

## Discount
<p>Contains information about discount.</p>

Any of:

[Amount](#amount), [Unit](#unit), [Unit Multiple](#unit-multiple), [Percent](#percent), [Fixed](#fixed)

## Gift
| Attributes |  Description |
|:-----|:--------|
| balance</br>`number` | <p>Available funds. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 amount is written as 10000.</p> |
| credits</br>`number` | <p>The number of credits that the user wants to use from the gift card to fulfil the order. The value of credits cannot be higher than the current balance on the gift card. If the user gives more points than he has on the gift card, the application will return an error code in response. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 is written as 10000.</p> |

## Loyalty Card
| Attributes |  Description |
|:-----|:--------|
| points</br>`integer` | <p>Total points incurred over lifespan of loyalty card.</p> **Example:** <p>7000</p> |
| balance</br>`integer` | <p>Points available for reward redemption.</p> **Example:** <p>6970</p> |
| exchange_ratio</br>`number` | <p>The cash equivalent of the points defined in the points_ratio property.</p> |
| points_ratio</br>`integer` | <p>The number of loyalty points that will map to the predefined cash amount defined by the exchange_ratio property.</p> |
| transfers</br>`array` | Array of [Loyalties Transfer Points](#loyalties-transfer-points) |

## Error Object
| Attributes |  Description |
|:-----|:--------|
| code</br>`integer` | <p>Error's HTTP status code.</p> |
| key</br>`string` | <p>Short string describing the kind of error which occurred.</p> |
| message</br>`string` | <p>A human-readable message providing a short description about the error.</p> |
| details</br>`string` | <p>A human-readable message providing more details about the error.</p> |
| request_id</br>`string` | <p>This ID is useful when troubleshooting and/or finding the root cause of an error response by our support team.</p> **Example:** <p>v-0a885062c80375740f</p> |
| resource_id</br>`string` | <p>Unique resource ID that can be used in another endpoint to get more details.</p> **Example:** <p>rf_0c5d710a87c8a31f86</p> |
| resource_type</br>`string` | <p>The resource type.</p> **Example:** <p>voucher</p> |

## ApplicableTo
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
| quantity_limit</br>`integer` | <p>The maximum number of units allowed to be discounted per order line item.</p> |
| aggregated_quantity_limit</br>`integer` | <p>The maximum number of units allowed to be discounted combined across all matched order line items.</p> |
| effect | <p>Defines how the discount is applied to the customer's order.</p> See: [Applicable To Effect](#applicable-to-effect) |

## InapplicableTo
All of:

1. [ApplicableTo](#applicableto)

## Business Validation Rule Assignment
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>The unique identifier for a assignment</p> |
| rule_id</br>`string` | <p>The unique identifier for a rule</p> |
| related_object_id</br>`string` | <p>The unique identifier for a related object</p> |
| related_object_type</br>`string` | <p>The type of related object</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the object was created in ISO 8601 format.</p> **Example:** <p>2022-03-09T11:19:04.819Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the object was last updated in ISO 8601 format.</p> **Example:** <p>2022-03-09T11:19:04.819Z</p> |
| object</br>`string` | <p>The type of object represented by JSON.</p> Available values: `validation_rules_assignment` |
| validation_status</br>`string` | <p>The validation status of the assignment</p> Available values: `VALID`, `PARTIALLY_VALID`, `INVALID` |
| validation_omitted_rules</br>`array` | <p>The list of omitted rules</p> |

## Amount
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines the type of voucher.</p> Available values: `AMOUNT` |
| amount_off</br>`number` | <p>Amount taken off the subtotal of a price. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 discount is written as 1000.</p> |
| amount_off_formula</br>`string` |  |
| effect | <p>Defines how the discount is applied to the customer's order.</p> See: [Discount Amount Vouchers Effect Types](#discount-amount-vouchers-effect-types) |

## Unit
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Discount type.</p> Available values: `UNIT` |
| unit_off</br>`integer` | <p>Number of units to be granted a full value discount.</p> |
| unit_off_formula</br>`string` |  |
| effect | <p>Defines how the unit is added to the customer's order.</p> See: [Discount Unit Vouchers Effect Types](#discount-unit-vouchers-effect-types) |
| unit_type</br>`string` | <p>The product deemed as free, chosen from product inventory (e.g. time, items).</p> |
| product | <p>Contains information about the product.</p> See: [Simple Product Discount Unit](#simple-product-discount-unit) |
| sku | See: [Simple Sku Discount Unit](#simple-sku-discount-unit) |

## Unit Multiple
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Discount type.</p> Available values: `UNIT` |
| effect</br>`string` | <p>Defines how the discount is applied to the customer's order.</p> Available values: `ADD_MANY_ITEMS` |
| units</br>`array` | Array of [One Unit](#one-unit) |

## Percent
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines the type of voucher.</p> Available values: `PERCENT` |
| percent_off</br>`number` | <p>The percent discount that the customer will receive.</p> |
| percent_off_formula</br>`string` |  |
| amount_limit</br>`number` | <p>Upper limit allowed to be applied as a discount. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $6 maximum discount is written as 600.</p> |
| effect | <p>Defines how the discount is applied to the customer's order.</p> See: [Discount Percent Vouchers Effect Types](#discount-percent-vouchers-effect-types) |
| is_dynamic</br>`boolean` | <p>Flag indicating whether the discount was calculated using a formula.</p> |

## Fixed
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines the type of voucher.</p> Available values: `FIXED` |
| fixed_amount</br>`number` | <p>Set a fixed valued for an order total or price of an item. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 discount is written as 1000. In case of the fixed amount being calculated by the formula, i.e. the fixed_amount_formula parameter is present in the fixed amount definition, this value becomes the fallback value. Such that in a case where the formula cannot be calculated due to missing metadata, for example, this value will be used as the fixed value.</p> |
| fixed_amount_formula</br>`string` |  |
| effect | <p>Defines how the discount is applied to the customer's order.</p> See: [Discount Fixed Vouchers Effect Types](#discount-fixed-vouchers-effect-types) |

## Loyalties Transfer Points
| Attributes |  Description |
|:-----|:--------|
| code</br>`string` | <p>Unique loyalty card code from which the user wants to transfer loyalty points (source).</p> |
| points</br>`integer` | <p>The number of loyalty points that the user wants to transfer to another loyalty card. The number of points cannot be higher than the current balance on the loyalty card (source).</p> |
| reason</br>`string` | <p>Reason for the transfer.</p> |
| source_id</br>`string` | <p>The merchant’s transaction ID if it is different from the Voucherify transaction ID. It is really useful in case of an integration between multiple systems. It can be a transaction ID from a CRM system, database or 3rd-party service.</p> |

## Applicable To Effect
Available values: `APPLY_TO_EVERY`, `APPLY_TO_CHEAPEST`, `APPLY_TO_MOST_EXPENSIVE`

## Discount Amount Vouchers Effect Types
Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS`, `APPLY_TO_ITEMS_PROPORTIONALLY`, `APPLY_TO_ITEMS_PROPORTIONALLY_BY_QUANTITY`

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
| product | <p>Contains information about the product.</p> See: [Simple Product Discount Unit](#simple-product-discount-unit) |
| sku | <p>Contains information about the sku.</p> See: [Simple Sku Discount Unit](#simple-sku-discount-unit) |

## Discount Percent Vouchers Effect Types
Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS`

## Discount Fixed Vouchers Effect Types
Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS`

[block:html]
{
    "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
