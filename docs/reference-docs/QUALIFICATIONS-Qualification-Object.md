---
title: Qualification Object
type: basic
categorySlug: voucherify-api
parentDocSlug: qualifications
slug: qualification-object
hidden: false
order: 1
---

> 👍 Scenario Guide
>
> Read our dedicated guide to learn about some use cases these endpoints can cover [here](doc:checking-eligibility).

## Qualifications Check Eligibility Response Body
| Attributes |  Description |
|:-----|:--------|
| redeemables | See: [Redeemables](#redeemables) |
| tracking_id</br>`string` | <p>This identifier is generated during voucher qualification based on your internal id (e.g., email, database ID). This is a hashed customer source ID.</p> |
| order</br>`object` | All of: 1. [Order Calculated No Customer Data](#order-calculated-no-customer-data)
2. <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">items</br><code>array</code></td><td style="text-align:left"><p>Array of items applied to the order. It can include up to 500 items.</p></td></tr></tbody></table> |
| stacking_rules | See: [Stacking Rules](#stacking-rules) |

## Redeemables
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>The type of the object represented by JSON. Default is <code>list</code>.</p> Available values: `list` |
| data_ref</br>`string` | <p>Identifies the name of the attribute that contains the array of qualified redeemables.</p> Available values: `data` |
| data</br>`array` | <p>Array of qualified redeemables.</p> Array of [Combined response of redeemable object and multiple redeemables within](#combined-response-of-redeemable-object-and-multiple-redeemables-within) |
| total</br>`integer` | <p>The number of redeemables returned in the API request.</p> **Example:** <p>5</p> |
| has_more</br>`boolean` | <p>As results are always limited, the <code>has_more</code> flag indicates if there are more records for given parameters. This lets you know if you can run another request (with different options) to get more records returned in the results.</p> |
| more_starting_after</br>`string` | <p>Timestamp representing the date and time to use in <code>starting_after</code> cursor to get more redeemables.</p> **Example:** <p>2023-10-31T12:13:16.374Z</p> |

## Order Calculated No Customer Data
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique ID assigned by Voucherify of an existing order that will be linked to the redemption of this request.</p> |
| source_id</br>`string`, `null` | <p>Unique source ID of an existing order that will be linked to the redemption of this request.</p> |
| status</br>`string` | <p>The order status.</p> Available values: `CREATED`, `PAID`, `CANCELED`, `FULFILLED` |
| amount</br>`integer` | <p>This is the sum of the order items' amounts. It is expressed as an integer in the smallest currency unit (e.g. 100 cents for $1.00).</p> |
| initial_amount</br>`integer` | <p>This is the sum of the order items' amounts before any discount or other effect (e.g. add missing units) is applied. It is expressed as an integer in the smallest currency unit (e.g. 100 cents for $1.00).</p> |
| discount_amount</br>`integer` | <p>Sum of all order-level discounts applied to the order. It is expressed as an integer in the smallest currency unit (e.g. 100 cents for $1.00).</p> |
| items_discount_amount</br>`integer` | <p>Sum of all product-specific discounts applied to the order. It is expressed as an integer in the smallest currency unit (e.g. 100 cents for $1.00).</p> |
| total_discount_amount</br>`integer` | <p>Sum of all order-level AND all product-specific discounts applied to the order. It is expressed as an integer in the smallest currency unit (e.g. 100 cents for $1.00).</p> |
| total_amount</br>`integer` | <p>Order amount after undoing all the discounts through the rollback redemption. It is expressed as an integer in the smallest currency unit (e.g. 100 cents for $1.00).</p> |
| applied_discount_amount</br>`integer` | <p>This field shows the order-level discount applied. It is expressed as an integer in the smallest currency unit (e.g. 100 cents for $1.00).</p> |
| items_applied_discount_amount</br>`integer` | <p>Sum of all product-specific discounts applied in a particular request. It is expressed as an integer in the smallest currency unit (e.g. 100 cents for $1.00).<br><code>sum(items, i =&gt; i.applied_discount_amount)</code></p> |
| total_applied_discount_amount</br>`integer` | <p>Sum of all order-level AND all product-specific discounts applied in a particular request. It is expressed as an integer in the smallest currency unit (e.g. 100 cents for $1.00).<br><code>total_applied_discount_amount</code> = <code>applied_discount_amount</code> + <code>items_applied_discount_amount</code></p> |
| metadata</br>`object` | <p>A set of custom key/value pairs that you can attach to an order. It can be useful for storing additional information about the order in a structured format. It can be used to define business validation rules or discount formulas.</p> |
| object</br>`string` | <p>The type of the object represented by JSON.</p> Available values: `order` |
| created_at</br>`string` | <p>Timestamp representing the date and time when the order was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2021-12-22T10:13:06.487Z</p> |
| updated_at</br>`string`, `null` | <p>Timestamp representing the date and time when the order was last updated in ISO 8601 format.</p> **Example:** <p>2021-12-22T10:14:45.316Z</p> |
| customer_id</br>`string`, `null` | <p>Unique customer identifier of the customer making the purchase. The ID is assigned by Voucherify.</p> **Example:** <p>cust_7iUa6ICKyU6gH40dBU25kQU1</p> |
| referrer_id</br>`string`, `null` | <p>Unique referrer ID.</p> **Example:** <p>cust_nM4jqPiaXUvQdVSA6vTRUnix</p> |
| customer | [Customer Id](#customer-id) |
| referrer | [Referrer Id](#referrer-id) |
| redemptions</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">[propertyName]</td><td style="text-align:left">See: <a href="#order-redemptions">Order Redemptions</a></td></tr></tbody></table> |

## Stacking Rules
| Attributes |  Description |
|:-----|:--------|
| redeemables_limit</br>`integer` | <p>Defines how many redeemables can be sent in one request. Note: more redeemables means more processing time.</p> |
| applicable_redeemables_limit</br>`integer` | <p>Defines how many redeemables can be applied in one request. The number must be less than or equal to <code>redeemables_limit</code>. For example, a user can select 30 discounts but only 5 will be applied to the order and the remaining will be <code>SKIPPED</code> according to the <code>redeemables_sorting_rule</code>.</p> |
| applicable_redeemables_per_category_limit</br>`integer` | <p>Defines how many redeemables with the same category can be applied in one request. The number must be less than or equal to <code>applicable_redeemables_limit</code>. The ones above the limit will be <code>SKIPPED</code> according to the <code>redeemables_sorting_rule</code>.</p> |
| applicable_exclusive_redeemables_limit</br>`integer` | <p>Defines how many redeemables with an assigned exclusive category can be applied in one request. The ones above the limit will be <code>SKIPPED</code> according to the <code>redeemables_sorting_rule</code>.</p> |
| applicable_exclusive_redeemables_per_category_limit</br>`integer` | <p>Defines how many redeemables with an exclusive category per category in stacking rules can be applied in one request. The ones above the limit will be <code>SKIPPED</code> according to the <code>redeemables_sorting_rule</code>.</p> |
| exclusive_categories</br>`array` | <p>Lists the IDs of exclusive categories. A redeemable from a campaign with an exclusive category is the only redeemable to be redeemed when applied with redeemables from other campaigns unless these campaigns are exclusive or joint.</p> |
| joint_categories</br>`array` | <p>Lists the IDs of the joint categories. A campaign with a joint category is always applied regardless of the exclusivity of other campaigns.</p> |
| redeemables_application_mode</br>`string` | <p>Defines the application mode for redeemables.<br><code>&quot;ALL&quot;</code> means that all redeemables must be validated for the redemption to be successful.<br><code>&quot;PARTIAL&quot;</code> means that only those redeemables that can be validated will be redeemed. The redeemables that fail validaton will be skipped.</p> Available values: `ALL`, `PARTIAL` |
| redeemables_sorting_rule</br>`string` | <p>Defines redeemables sorting rule. <code>CATEGORY_HIERARCHY</code> means that redeemables are applied oaccording to the category priority. <code>REQUESTED_ORDER</code> means that redeemables are applied in the sequence provided in the request.</p> Available values: `CATEGORY_HIERARCHY`, `REQUESTED_ORDER` |
| redeemables_products_application_mode</br>`string` | <p>Defines redeemables products application mode. <code>STACK</code> means that multiple discounts can be applied to a product. <code>ONCE</code> means that only one discount can be applied to the same product.</p> Available values: `STACK`, `ONCE` |
| redeemables_no_effect_rule</br>`string` | <p>Defines redeemables no effect rule. <code>REDEEM_ANYWAY</code> means that the redeemable will be redeemed regardless of any restrictions or conditions in place. <code>SKIP</code> means that the redeemable will be processed only when an applicable effect is calculated.</p> Available values: `REDEEM_ANYWAY`, `SKIP` |
| no_effect_skip_categories</br>`array` | <p>Lists category IDs. Redeemables with a given category are skipped even if the <code>redeemables_no_effect_rule</code> is set to <code>REDEEM_ANYWAY</code>. Category IDs can't overlap with the IDs in <code>no_effect_redeem_anyway_categories</code>.</p> |
| no_effect_redeem_anyway_categories</br>`array` | <p>Lists category IDs. Redeemables with a given category are redeemed anyway even if the <code>redeemables_no_effect_rule</code> is set to <code>SKIP</code>. Category IDs can't overlap with the IDs in <code>no_effect_skip_categories</code>.</p> |
| redeemables_rollback_order_mode</br>`string` | <p>Defines the rollback mode for the order. <code>WITH_ORDER</code> is a default setting. The redemption is rolled back together with the data about the order, including related discount values. <code>WITHOUT_ORDER</code> allows rolling the redemption back without affecting order data, including the applied discount values.</p> Available values: `WITH_ORDER`, `WITHOUT_ORDER` |

## Combined response of redeemable object and multiple redeemables within
All of:

1. [Single redeemable](#single-redeemable)
2. <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">redeemables</br><code>array</code></td><td style="text-align:left">Array of <a href="#single-redeemable">Single redeemable</a></td></tr></tbody></table>

## Customer Id
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>A unique identifier of an existing customer.</p> |
| object</br>`string` | <p>The type of the object represented by JSON.</p> Available values: `customer` |

## Referrer Id
[Customer Id](#customer-id)

## Order Redemptions
| Attributes |  Description |
|:-----|:--------|
| date</br>`string` | <p>Timestamp representing the date and time when the redemption was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-09-02T17:06:56.649Z</p> |
| rollback_id</br>`string` | <p>Unique ID of the redemption rollback.</p> **Example:** <p>rr_0c63c84eb78ee0a6c0</p> |
| rollback_date</br>`string` | <p>Timestamp representing the date and time when the redemption rollback was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2023-01-31T14:18:37.150Z</p> |
| related_object_type</br>`string` | <p>The source of the incentive.</p> |
| related_object_id</br>`string` | <p>Unique ID of the parent redemption.</p> **Example:** <p>r_0ba186c4824e4881e1</p> |
| related_object_parent_id</br>`string` | <p>Represent's the campaign ID of the voucher if the redemption was based on a voucher that was part of bulk codes generated within a campaign. In case of a promotion tier, this represents the campaign ID of the promotion tier's parent campaign.</p> |
| stacked</br>`array` | <p>Contains a list of unique IDs of child redemptions, which belong to the stacked incentives.</p> |
| rollback_stacked</br>`array` | <p>Lists the rollback redemption IDs of the particular child redemptions.</p> |

## Single redeemable
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Id of the redeemable.</p> |
| object</br>`string` | <p>Object type of the redeemable.</p> Available values: `campaign`, `promotion_tier`, `promotion_stack`, `voucher` |
| created_at</br>`string` | <p>Timestamp representing the date and time when the object was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-03-09T11:19:04.819Z</p> |
| result | See: [Redeemable Result](#redeemable-result) |
| order | All of: 1. [Order Calculated No Customer Data](#order-calculated-no-customer-data)
2. <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">items</br><code>array</code></td><td style="text-align:left"><p>Array of items applied to the order. It can include up to 500 items.</p></td></tr></tbody></table> |
| validation_rule_id</br>`string` | <p>A unique validation rule identifier assigned by the Voucherify API. The validation rule is verified before points are added to the balance.</p> |
| applicable_to | <p>Contains list of items that qualify in the scope of the discount. These are definitions of included products, SKUs, and product collections. These can be discounted.</p> [Applicable To Result List](#applicable-to-result-list) |
| inapplicable_to | <p>Contains list of items that do not qualify in the scope of the discount. These are definitions of excluded products, SKUs, and product collections. These CANNOT be discounted.</p> [Inapplicable To Result List](#inapplicable-to-result-list) |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the product. A set of key/value pairs that you can attach to a product object. It can be useful for storing additional information about the product in a structured format.</p> |
| categories</br>`array` | <p>List of category information.</p> Array of [Category with Stacking Rules Type](#category-with-stacking-rules-type) |
| banner</br>`string` | <p>Name of the earning rule. This is displayed as a header for the earning rule in the Dashboard.</p> **Example:** <p>Order Paid - You will get 100 points</p> |
| name</br>`string` | <p>Name of the redeemable.</p> **Example:** <p>promotion_tier_get_points</p> |
| campaign_name</br>`string` | <p>Name of the campaign associated to the redeemable. This field is available only if object is not <code>campaign</code></p> **Example:** <p>PromotionCampaign</p> |
| campaign_id</br>`string` | <p>Id of the campaign associated to the redeemable. This field is available only if object is not <code>campaign</code></p> **Example:** <p>camp_Mow7u4gSxagLlZ2oDQ01ZS5N</p> |
| validation_rules_assignments | See: [Validation Rules Assignments List](#validation-rules-assignments-list) |

## Redeemable Result
| Attributes |  Description |
|:-----|:--------|
| discount | See: [Discount](#discount) |
| bundle | See: [Bundle Details](#bundle-details) |
| gift | See: [Redeemable Gift](#redeemable-gift) |
| loyalty_card | <p>Loyalty Card object response</p> [Redeemable Loyalty Card](#redeemable-loyalty-card) |
| error | <p>Error in result</p> [Error Object](#error-object) |

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

## Category with Stacking Rules Type
<p>Category object with <code>stacking_rules_type</code></p>

All of:

1. [Category](#category)
2. <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">stacking_rules_type</br><code>string</code></td><td style="text-align:left"><p>The type of the stacking rule eligibility.</p> Available values: <code>JOINT</code>, <code>EXCLUSIVE</code></td></tr></tbody></table>

## Validation Rules Assignments List
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>The type of the object represented by JSON. This object stores information about validation rules assignments.</p> Available values: `list` |
| data_ref</br>`string` | <p>Identifies the name of the attribute that contains the array of validation rules assignments.</p> Available values: `data` |
| data</br>`array` | <p>Contains array of validation rules assignments.</p> Array of [Business Validation Rule Assignment](#business-validation-rule-assignment) |
| total</br>`integer` | <p>Total number of validation rules assignments.</p> |

## Discount
<p>Contains information about discount.</p>

One of:

[Amount](#amount), [Unit](#unit), [Unit Multiple](#unit-multiple), [Percent](#percent), [Fixed](#fixed)

## Bundle Details
| Attributes |  Description |
|:-----|:--------|
| quantity</br>`integer` | <p>Determines how many bundles are qualified. If there are missing bundle products, the value is <code>0</code>. If the bundle is qualified, the value is <code>1</code>. The maximum number of identified bundles can equal the number set in <code>limit</code>. Also defines the multiplier of the discount for <code>AMOUNT</code>, <code>PERCENT</code>, and <code>UNIT</code> discount types. To inform end-customers that more products can be added to meet additional bundles, compare this parameter with <code>limit</code>.</p> |
| limit</br>`integer` | <p>Determines the maximum number of identified bundles. This also defines the maximum multiplier of the bundle discount.</p> |
| identified</br>`array` | <p>Determines products from the customer's order items that meet bundle conditions. SKUs meet the conditions for their product that is used in the bundle. Returns only the products and their quantity that meet the bundle.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique identifier of the product or SKU that meets the bundle condition. This is an ID assigned by Voucherify.</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>Determines the type of the object that meets the bundle condition.</p> Available values: <code>product</code>, <code>sku</code></td></tr><tr><td style="text-align:left">item_index</br><code>integer</code></td><td style="text-align:left"><p>Number assigned to the order line item in accordance with the order sent in the request. It starts with <code>0</code> for the first order line item in the request.</p></td></tr><tr><td style="text-align:left">item_quantity</br><code>integer</code></td><td style="text-align:left"><p>Quantity of items that meet the bundle conditions. If the quantity in the order is higher than the quantity required by the bundle, this returns only the number that meets the bundle. For example, if the bundle requires <code>5</code> coffees, but the order includes <code>10</code> coffees, <code>item_quantity</code> returns <code>5</code>.</p></td></tr></tbody></table> |
| missing</br>`array` | <p>Determines products, SKUs, or collections from the bundle that are missing in the customer's order items. Determines also the missing quantity. For collections, this means that order items do not include a sufficient number of items that belong to the collection. Not returned when all required bundle items are in the order.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique identifier of the collection, product, or SKU that is missing in the customer's order items. This is an ID assigned by Voucherify.</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>Determines the type of the object that is missing in the customer's order items.</p> Available values: <code>product</code>, <code>products_collection</code>, <code>sku</code></td></tr><tr><td style="text-align:left">item_quantity</br><code>integer</code></td><td style="text-align:left"><p>Quantity of items that are missing in the order items to meet the bundle conditions.</p></td></tr></tbody></table> |

## Redeemable Gift
| Attributes |  Description |
|:-----|:--------|
| balance</br>`number` | <p>Available funds. The value is multiplied by 100 to represent 2 decimal places. For example <code>10000 cents</code> for <code>$100.00</code>.</p> |
| credits</br>`number` | <p>The number of credits that the user wants to use from the gift card to fulfil the order. The value of credits cannot be higher than the current balance on the gift card. If the user gives more points than he has on the gift card, the application will return an error code in response. The value is multiplied by 100 to represent 2 decimal places. For example <code>10000 cents</code> for <code>$100.00</code>.</p> |
| locked_credits</br>`number` | <p>The number of credits that are locked under a validation session. This is returned if the qualification request includes <code>session.type: LOCK</code> parameter in the body. The value is multiplied by 100 to represent 2 decimal places. For example <code>10000</code> for <code>$100.00</code>. Returns <code>0</code> if there aren't any active validation sessions for the gift card.</p> |

## Redeemable Loyalty Card
| Attributes |  Description |
|:-----|:--------|
| points</br>`integer` | <p>Total number of points added to the loyalty card over its lifespan.</p> **Example:** <p>7000</p> |
| balance</br>`integer` | <p>Points available for reward redemption. This is calculated as follows: <code>balance</code> = <code>points</code> - <code>expired_points</code> - <code>subtracted_points</code> - <code>redemption.redeemed_points</code>.</p> **Example:** <p>6970</p> |
| exchange_ratio</br>`number` | <p>The cash equivalent of the points defined in the points_ratio property.</p> |
| points_ratio</br>`integer` | <p>The number of loyalty points that will map to the predefined cash amount defined by the exchange_ratio property.</p> |
| transfers</br>`array` | Array of [Loyalties Transfer Points](#loyalties-transfer-points) |

## Error Object
| Attributes |  Description |
|:-----|:--------|
| code</br>`integer` | <p>Error's HTTP status code.</p> |
| key</br>`string` | <p>Short string describing the kind of error which occurred.</p> |
| message</br>`string` | <p>A human-readable message providing a short description of the error.</p> |
| details</br>`string` | <p>A human-readable message providing more details about the error.</p> |
| request_id</br>`string` | <p>This ID is useful when troubleshooting and/or finding the root cause of an error response by our support team.</p> **Example:** <p>v-0a885062c80375740f</p> |
| resource_id</br>`string` | <p>Unique resource ID that can be used in another endpoint to get more details.</p> **Example:** <p>rf_0c5d710a87c8a31f86</p> |
| resource_type</br>`string` | <p>The resource type.</p> **Example:** <p>voucher</p> |
| error</br>`object` | <p>Includes additional information about the error.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">message</br><code>string</code></td><td style="text-align:left"><p>The message configured by the user in a validation rule.</p></td></tr></tbody></table> |

## Applicable To
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>This object stores information about the resource to which the discount is applicable.</p> Available values: `product`, `sku`, `products_collection` |
| id</br>`string` | <p>Unique product collection, product, or SKU identifier assigned by Voucherify.</p> |
| source_id</br>`string` | <p>The source identifier from your inventory system.</p> |
| product_id</br>`string` | <p>Parent product's unique ID assigned by Voucherify.</p> |
| product_source_id</br>`string` | <p>Parent product's source ID from your inventory system.</p> |
| price</br>`number` | <p>New fixed price of an item. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 price is written as 1000. In case of the fixed price being calculated by the formula, i.e. the price_formula parameter is present in the fixed price definition, this value becomes the fallback value. Such that in a case where the formula cannot be calculated due to missing metadata, for example, this value will be used as the fixed price.</p> |
| price_formula</br>`number` | <p>Formula used to calculate the discounted price of an item.</p> |
| effect | <p>Defines how the discount is applied to the customer's order.</p> [Applicable To Effect](#applicable-to-effect) |
| quantity_limit</br>`integer` | <p>The maximum number of units allowed to be discounted per order line item.</p> |
| aggregated_quantity_limit</br>`integer` | <p>The maximum number of units allowed to be discounted combined across all matched order line items.</p> |
| amount_limit</br>`integer` | <p>Upper limit allowed to be applied as a discount per order line item. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $6 maximum discount is written as 600.</p> |
| aggregated_amount_limit</br>`integer` | <p>Maximum discount amount per order. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $6 maximum discount on the entire order is written as 600. This value is definable for the following discount effects:</p><ul><li><code>APPLY_TO_ITEMS</code> (each item subtotal is discounted equally)</li><li><code>APPLY_TO_ITEMS_BY_QUANTITY</code> (each unit of matched products has the same discount value)</li></ul> |
| order_item_indices</br>`array` | <p>Lists which order lines are (not) covered by the discount. The order in the array is determined by the sequence of applied discounts, while the numbers correspond to the order lines sent in the <code>order</code> object in the request. The first order line is assigned <code>0</code>, the second order line is assigned <code>1</code>, and so on.</p> |
| order_item_units</br>`array` | <p>Lists which units within order lines are covered by the discount. The order line items are listed according to sequence of applied discounts while the <code>index</code> corresponds to the order line sent in the <code>order</code> object in the request.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">index</br><code>integer</code></td><td style="text-align:left"><p>Number assigned to the order line item in accordance with the order sent in the request.</p></td></tr><tr><td style="text-align:left">units</br><code>array</code></td><td style="text-align:left"><p>Numbers of units in the order line covered by the discount; e.g. <code>2, 5, 8</code> for 10 units with the setting <code>&quot;skip_initially&quot;: 1</code>, <code>&quot;repeat&quot;: 3</code>. The counting of units starts from <code>1</code>. The maximum quantity of all handled units is 1000. If the quantity of all order items exceeds 1000, this array is not returned, but <code>units_limit_exceeded: true</code>. However, the discount is calculated properly for all relevant units.</p></td></tr><tr><td style="text-align:left">units_limit_exceeded</br><code>boolean</code></td><td style="text-align:left"><p>Returned as <code>true</code> only when the sum total of <code>quantity</code> of all order items exceeds 1000.</p></td></tr></tbody></table> |
| repeat</br>`integer` | <p>Determines the recurrence of the discount, e.g. <code>&quot;repeat&quot;: 3</code> means that the discount is applied to every third item.</p> |
| skip_initially</br>`integer` | <p>Determines how many items are skipped before the discount is applied.</p> |
| target</br>`string` | <p>Determines to which kinds of objects the discount is applicable. <code>ITEM</code> includes products and SKUs. <code>UNIT</code> means particular units within an order line.</p> Available values: `ITEM`, `UNIT` |

## Inapplicable To
[Applicable To](#applicable-to)

## Category
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique category ID assigned by Voucherify.</p> |
| name</br>`string` | <p>Category name.</p> |
| hierarchy</br>`integer` | <p>Category hierarchy. Categories with lower hierarchy are processed before categories with higher hierarchy value.</p> |
| object</br>`string` | <p>The type of the object represented by the JSON. This object stores information about the category.</p> Available values: `category` |
| created_at</br>`string` | <p>Timestamp representing the date and time when the category was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-07-14T10:45:13.156Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the category was updated. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-08-16T10:52:08.094Z</p> |

## Business Validation Rule Assignment
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>The unique identifier for a assignment</p> |
| rule_id</br>`string` | <p>The unique identifier for a rule</p> |
| related_object_id</br>`string` | <p>The unique identifier for a related object</p> |
| related_object_type</br>`string` | <p>The type of related object</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the object was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-03-09T11:19:04.819Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the object was last updated in ISO 8601 format.</p> **Example:** <p>2022-03-09T11:19:04.819Z</p> |
| object</br>`string` | <p>The type of the object represented by JSON.</p> Available values: `validation_rules_assignment` |
| validation_status</br>`string` | <p>The validation status of the assignment</p> Available values: `VALID`, `PARTIALLY_VALID`, `INVALID` |
| validation_omitted_rules</br>`array` | <p>The list of omitted rules</p> |

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
| unit_off_formula</br>`string` | <p>Formula used to calculate the number of units.</p> |
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

## Loyalties Transfer Points
| Attributes |  Description |
|:-----|:--------|
| code</br>`string` | <p>Unique loyalty card code from which the user wants to transfer loyalty points (source).</p> |
| points</br>`integer` | <p>The number of loyalty points that the user wants to transfer to another loyalty card. The number of points cannot be higher than the current balance on the loyalty card (source).</p> |
| reason</br>`string` | <p>Reason for the transfer.</p> |
| source_id</br>`string` | <p>The merchant's transaction ID if it is different from the Voucherify transaction ID. It is really useful in case of an integration between multiple systems. It can be a transaction ID from a CRM system, database or 3rd-party service.</p> |

## Applicable To Effect
Available values: `APPLY_TO_EVERY`, `APPLY_TO_CHEAPEST`, `APPLY_FROM_CHEAPEST`, `APPLY_TO_MOST_EXPENSIVE`, `APPLY_FROM_MOST_EXPENSIVE`

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
| unit_off_formula</br>`string` | <p>Formula used to calculate the number of units.</p> |
| effect</br>`string` | <p>Defines how the unit is added to the customer's order.</p> Available values: `ADD_NEW_ITEMS`, `ADD_MISSING_ITEMS` |
| unit_type</br>`string` | <p>The product deemed as free, chosen from product inventory (e.g. time, items).</p> |
| product | <p>Contains information about the product.</p> [Simple Product Discount Unit](#simple-product-discount-unit) |
| sku | <p>Contains information about the sku.</p> [Simple Sku Discount Unit](#simple-sku-discount-unit) |

## Discount Percent Vouchers Effect Types
Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS`

## Discount Fixed Vouchers Effect Types
Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS`

[block:html]
{
    "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
