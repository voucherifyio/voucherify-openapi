---
title: Redemption Object
type: basic
categorySlug: voucherify-api
parentDocSlug: redemptions
slug: redemption-object
hidden: false
order: 1
---

## Redemptions Redeem Response Body
| Attributes |  Description |
|:-----|:--------|
| redemptions</br>`array` | Array of [Redemption](#redemption) |
| parent_redemption | See: [Redemption](#redemption) |
| order | <p>Contains the order details associated with the redemption.</p> All of: 1. [Order Calculated No Customer Data](#order-calculated-no-customer-data)
2. <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">items</br><code>array</code></td><td style="text-align:left"><p>Array of items applied to the order. It can include up to 500 items.</p></td></tr></tbody></table> |
| inapplicable_redeemables</br>`array` | <p>Lists validation results of each inapplicable redeemable.</p> Array of [Inapplicable Redeemable](#inapplicable-redeemable) |
| skipped_redeemables</br>`array` | <p>Lists validation results of each redeemable. If a redeemable can be applied, the API returns <code>&quot;status&quot;: &quot;APPLICABLE&quot;</code>.</p> Array of [Skipped Redeemable](#skipped-redeemable) |

## Redemption
<p>This is an object representing a redemption for <strong>POST</strong> <code>v1/redemptions</code> and <strong>POST</strong> <code>/client/v1/redemptions</code>.</p>

All of:

1. [Redemption Base](#redemption-base)
2. <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">voucher</td><td style="text-align:left"><p>Defines the details of the voucher being redeemed.</p> All of: 1. <a href="#voucher-with-categories-and-validation-rules-assignments">Voucher with categories and validation rules assignments</a></td></tr></tbody></table><ol start="2"><li><a href="#voucher-holder">Voucher Holder</a> |</li></ol>

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

## Inapplicable Redeemable
| Attributes |  Description |
|:-----|:--------|
| status</br>`string` | <p>Indicates whether the redeemable can be applied or not applied based on the validation rules.</p> Available values: `INAPPLICABLE` |
| id</br>`string` | <p>Redeemable ID, i.e. the voucher code.</p> |
| object</br>`string` | <p>Redeemable's object type.</p> Available values: `voucher`, `promotion_tier` |
| result</br>`object` | <p>Includes the error object with details about the reason why the redeemable is inapplicable</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">error</td><td style="text-align:left">See: <a href="#error-object">Error Object</a></td></tr><tr><td style="text-align:left">details</br><code>object</code></td><td style="text-align:left"><p>Provides details about the reason why the redeemable is inapplicable.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">message</br><code>string</code></td><td style="text-align:left"><p>Generic message from the <code>message</code> string shown in the <code>error</code> object or the message configured in a validation rule.</p></td></tr><tr><td style="text-align:left">key</br><code>string</code></td><td style="text-align:left"><p>Generic message from the <code>key</code> string shown in the <code>error</code> object.</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">bundle</td><td style="text-align:left">See: <a href="#bundle-details">Bundle Details</a></td></tr></tbody></table> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes in the form of key/value pairs assigned to the redeemable.</p> |
| categories</br>`array` | Array of [Category with Stacking Rules Type](#category-with-stacking-rules-type) |
| campaign_name</br>`string` | <p>Campaign name. Displayed only if the <code>options.expand</code> is passed with a <code>redeemable</code> value in the validation request body.</p> |
| campaign_id</br>`string` | <p>Unique campaign ID assigned by Voucherify. Displayed only if the <code>options.expand</code> is passed with a <code>redeemable</code> value in the validation request body.</p> **Example:** <p>camp_pqZjuhG6Mgtp4GD0zD7b8hA3</p> |
| name</br>`string` | <p>Name of the promotion tier. Displayed only if the <code>options.expand</code> is passed with a <code>redeemable</code> value in the validation request body.</p> |

## Skipped Redeemable
| Attributes |  Description |
|:-----|:--------|
| status</br>`string` | <p>Indicates whether the redeemable can be applied or not applied based on the validation rules.</p> Available values: `SKIPPED` |
| id</br>`string` | <p>Redeemable ID, i.e. the voucher code.</p> |
| object</br>`string` | <p>Redeemable's object type.</p> Available values: `voucher`, `promotion_tier` |
| result</br>`object` | <p>Provides details about the reason why the redeemable is skipped.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">details</td><td style="text-align:left">One of: <a href="#validations-redeemable-skipped-result-limit-exceeded">Validations Redeemable Skipped Result Limit Exceeded</a>, <a href="#validations-redeemable-skipped-result-category-limit-exceeded">Validations Redeemable Skipped Result Category Limit Exceeded</a>, <a href="#validations-redeemable-skipped-result-redeemables-limit-exceeded">Validations Redeemable Skipped Result Redeemables Limit Exceeded</a>, <a href="#validations-redeemable-skipped-result-redeemables-category-limit-exceeded">Validations Redeemable Skipped Result Redeemables Category Limit Exceeded</a>, <a href="#validations-redeemable-skipped-result-exclusion-rules-not-met">Validations Redeemable Skipped Result Exclusion Rules Not Met</a>, <a href="#validations-redeemable-skipped-result-preceding-validation-failed">Validations Redeemable Skipped Result Preceding Validation Failed</a></td></tr></tbody></table> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes in the form of key/value pairs assigned to the redeemable.</p> |
| categories</br>`array` | Array of [Category with Stacking Rules Type](#category-with-stacking-rules-type) |
| campaign_name</br>`string` | <p>Campaign name. Displayed only if the <code>options.expand</code> is passed with a <code>redeemable</code> value in the validation request body.</p> |
| campaign_id</br>`string` | <p>Unique campaign ID assigned by Voucherify. Displayed only if the <code>options.expand</code> is passed with a <code>redeemable</code> value in the validation request body.</p> **Example:** <p>camp_pqZjuhG6Mgtp4GD0zD7b8hA3</p> |
| name</br>`string` | <p>Name of the promotion tier. Displayed only if the <code>options.expand</code> is passed with a <code>redeemable</code> value in the validation request body.</p> |

## Redemption Base
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique redemption ID.</p> **Example:** <p>r_0bc92f81a6801f9bca</p> |
| object</br>`string` | <p>The type of the object represented by the JSON</p> Available values: `redemption` |
| date</br>`string` | <p>Timestamp representing the date and time when the object was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2021-12-22T10:13:06.487Z</p> |
| customer_id</br>`string`, `null` | <p>Unique customer ID of the redeeming customer.</p> **Example:** <p>cust_i8t5Tt6eiKG5K79KQlJ0Vs64</p> |
| tracking_id</br>`string`, `null` | <p>Hashed customer source ID.</p> |
| metadata</br>`object`, `null` | <p>The metadata object stores all custom attributes assigned to the redemption.</p> |
| amount</br>`integer` | <p>For gift cards, this is a positive integer in the smallest currency unit (e.g. 100 cents for $1.00) representing the number of redeemed credits.<br>For loyalty cards, this is the number of loyalty points used in the transaction.</p> **Example:** <p>10000</p> |
| redemption</br>`string`, `null` | <p>Unique redemption ID of the parent redemption.</p> **Example:** <p>r_0c656311b5878a2031</p> |
| result</br>`string` | <p>Redemption result.</p> Available values: `SUCCESS`, `FAILURE` |
| status</br>`string` | <p>Redemption status.</p> Available values: `SUCCEEDED`, `FAILED`, `ROLLED_BACK` |
| session</br>`object` | <p>Contains details about the redemption session lock. Sessions can be established only for discount vouchers, promotions, and gift cards.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">key</br><code>string</code></td><td style="text-align:left"><p>The session unique ID assigned by Voucherify or your own unique session ID sent in the request.</p></td></tr></tbody></table> |
| related_redemptions</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">rollbacks</br><code>array</code></td><td style="text-align:left">Array of: <h4>Redemption Related Redemptions Rollbacks Item</h4><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique rollback redemption ID.</p> <strong>Example:</strong> <p>rr_0bc92f81a6801f9bca</p></td></tr><tr><td style="text-align:left">date</br><code>string</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the object was created. The value is shown in the ISO 8601 format.</p> <strong>Example:</strong> <p>2021-12-22T10:13:06.487Z</p></td></tr><tr><td style="text-align:left">rollback_order_mode</br><code>string</code></td><td style="text-align:left"><p>Defines the rollback mode for the order. <code>WITH_ORDER</code> is a default setting. The redemption is rolled back together with the data about the order, including related discount values. <code>WITHOUT_ORDER</code> allows rolling the redemption back without affecting order data, including the applied discount values. This is returned only in GET <code>v1/redemptions/</code> and GET <code>v1/redemptions/{redemptionId}</code> endpoints.</p> Available values: <code>WITH_ORDER</code>, <code>WITHOUT_ORDER</code></td></tr></tbody></table></td></tr><tr><td style="text-align:left">redemptions</br><code>array</code></td><td style="text-align:left">Array of: <h4>Redemption Related Redemptions Item</h4><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique redemption ID.</p> <strong>Example:</strong> <p>r_0bc92f81a6801f9bca</p></td></tr><tr><td style="text-align:left">date</br><code>string</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the object was created. The value is shown in the ISO 8601 format.</p> <strong>Example:</strong> <p>2021-12-22T10:13:06.487Z</p></td></tr></tbody></table></td></tr></tbody></table> |
| failure_code</br>`string` | <p>If the result is <code>FAILURE</code>, this parameter will provide a generic reason as to why the redemption failed.</p> **Example:** <p>customer_rules_violated</p> |
| failure_message</br>`string` | <p>If the result is <code>FAILURE</code>, this parameter will provide a more expanded reason as to why the redemption failed.</p> |
| order | All of: 1. [Order Calculated No Customer Data](#order-calculated-no-customer-data)
2. <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">items</br><code>array</code></td><td style="text-align:left"><p>Array of items applied to the order. It can include up to 500 items.</p></td></tr></tbody></table> |
| channel</br>`object` | <p>Defines the details of the channel through which the redemption was issued.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">channel_id</br><code>string</code></td><td style="text-align:left"><p>Unique channel ID of the user performing the redemption. This is either a user ID from a user using the Voucherify Dashboard or an X-APP-Id of a user using the API. For <code>AUTO_REDEEM</code>, it is the reward assignment ID.</p> <strong>Example:</strong> <p>user_g24UoRO3Caxu7FCT4n5tpYEa3zUG0FrH</p></td></tr><tr><td style="text-align:left">channel_type</br><code>string</code></td><td style="text-align:left"><p>The source of the channel for the redemption. A <code>USER</code> corresponds to the Voucherify Dashboard, <code>API</code> corresponds to the API, and <code>AUTO_REDEEM</code> corresponds to a loyalty campaign reward that has been redeemed automatically.</p> Available values: <code>USER</code>, <code>API</code>, <code>AUTO_REDEEM</code></td></tr></tbody></table> |
| customer | [Simple Customer](#simple-customer) |
| related_object_type</br>`string` | <p>Defines the related object.</p> Available values: `voucher`, `promotion_tier`, `redemption` |
| related_object_id</br>`string` | <p>Unique related object ID assigned by Voucherify, i.e. v_lfZi4rcEGe0sN9gmnj40bzwK2FH6QUno for a voucher.</p> |
| promotion_tier | <p>Contains details of the promotion tier and the parent campaign.</p> [Promotion Tier](#promotion-tier) |
| reward | See: [Redemption Reward Result](#redemption-reward-result) |
| gift</br>`object` | <p>Contains the amount subtracted from the gift card for the redemption.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">amount</br><code>integer</code></td><td style="text-align:left"><p>Amount subtracted from the gift card as a result of the redemption. The amount is expressed as the smallest currency unit (e.g. 100 cents for $1.00).</p></td></tr></tbody></table> |
| loyalty_card</br>`object` | <p>Contains the number of points subtracted from the loyalty card for the redemption.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>Number of points subtracted from the loyalty card as a result of the redemption.</p></td></tr></tbody></table> |

## Voucher with categories and validation rules assignments
<p>This is an object representing a voucher with categories and validation rules assignments for <strong>POST</strong> <code>v1/qualifications</code>, <strong>POST</strong> <code>v1/redemptions</code>, and <strong>POST</strong> <code>v1/validations</code>.</p>

All of:

1. [Voucher Base](#voucher-base)
2. <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">categories</br><code>array</code></td><td style="text-align:left"><p>Contains details about the category.</p> Array of <a href="#category-with-stacking-rules-type">Category with Stacking Rules Type</a></td></tr><tr><td style="text-align:left">validation_rules_assignments</td><td style="text-align:left">See: <a href="#validation-rules-assignments-list">Validation Rules Assignments List</a></td></tr></tbody></table>

## Voucher Holder
| Attributes |  Description |
|:-----|:--------|
| holder | See: [Simple Customer](#simple-customer) |

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

## Bundle Details
| Attributes |  Description |
|:-----|:--------|
| quantity</br>`integer` | <p>Determines how many bundles are qualified. If there are missing bundle products, the value is <code>0</code>. If the bundle is qualified, the value is <code>1</code>. The maximum number of identified bundles can equal the number set in <code>limit</code>. Also defines the multiplier of the discount for <code>AMOUNT</code>, <code>PERCENT</code>, and <code>UNIT</code> discount types. To inform end-customers that more products can be added to meet additional bundles, compare this parameter with <code>limit</code>.</p> |
| limit</br>`integer` | <p>Determines the maximum number of identified bundles. This also defines the maximum multiplier of the bundle discount.</p> |
| identified</br>`array` | <p>Determines products from the customer's order items that meet bundle conditions. SKUs meet the conditions for their product that is used in the bundle. Returns only the products and their quantity that meet the bundle.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique identifier of the product or SKU that meets the bundle condition. This is an ID assigned by Voucherify.</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>Determines the type of the object that meets the bundle condition.</p> Available values: <code>product</code>, <code>sku</code></td></tr><tr><td style="text-align:left">item_index</br><code>integer</code></td><td style="text-align:left"><p>Number assigned to the order line item in accordance with the order sent in the request. It starts with <code>0</code> for the first order line item in the request.</p></td></tr><tr><td style="text-align:left">item_quantity</br><code>integer</code></td><td style="text-align:left"><p>Quantity of items that meet the bundle conditions. If the quantity in the order is higher than the quantity required by the bundle, this returns only the number that meets the bundle. For example, if the bundle requires <code>5</code> coffees, but the order includes <code>10</code> coffees, <code>item_quantity</code> returns <code>5</code>.</p></td></tr></tbody></table> |
| missing</br>`array` | <p>Determines products, SKUs, or collections from the bundle that are missing in the customer's order items. Determines also the missing quantity. For collections, this means that order items do not include a sufficient number of items that belong to the collection. Not returned when all required bundle items are in the order.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique identifier of the collection, product, or SKU that is missing in the customer's order items. This is an ID assigned by Voucherify.</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>Determines the type of the object that is missing in the customer's order items.</p> Available values: <code>product</code>, <code>products_collection</code>, <code>sku</code></td></tr><tr><td style="text-align:left">item_quantity</br><code>integer</code></td><td style="text-align:left"><p>Quantity of items that are missing in the order items to meet the bundle conditions.</p></td></tr></tbody></table> |

## Category with Stacking Rules Type
<p>Category object with <code>stacking_rules_type</code></p>

All of:

1. [Category](#category)
2. <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">stacking_rules_type</br><code>string</code></td><td style="text-align:left"><p>The type of the stacking rule eligibility.</p> Available values: <code>JOINT</code>, <code>EXCLUSIVE</code></td></tr></tbody></table>

## Validations Redeemable Skipped Result Limit Exceeded
| Attributes |  Description |
|:-----|:--------|
| key</br>`string` | Available values: `applicable_redeemables_limit_exceeded` |
| message</br>`string` | **Example:** <p>Applicable redeemables limit exceeded</p> |

## Validations Redeemable Skipped Result Category Limit Exceeded
| Attributes |  Description |
|:-----|:--------|
| key</br>`string` | Available values: `applicable_redeemables_per_category_limit_exceeded` |
| message</br>`string` | **Example:** <p>Applicable redeemables limit per category exceeded</p> |

## Validations Redeemable Skipped Result Redeemables Limit Exceeded
| Attributes |  Description |
|:-----|:--------|
| key</br>`string` | Available values: `applicable_exclusive_redeemables_limit_exceeded` |
| message</br>`string` | **Example:** <p>Applicable exclusive redeemables limit exceeded</p> |

## Validations Redeemable Skipped Result Redeemables Category Limit Exceeded
| Attributes |  Description |
|:-----|:--------|
| key</br>`string` | Available values: `applicable_exclusive_redeemables_per_category_limit_exceeded` |
| message</br>`string` | **Example:** <p>Applicable exclusive redeemables limit per category exceeded</p> |

## Validations Redeemable Skipped Result Exclusion Rules Not Met
| Attributes |  Description |
|:-----|:--------|
| key</br>`string` | Available values: `exclusion_rules_not_met` |
| message</br>`string` | **Example:** <p>Redeemable cannot be applied due to exclusion rules</p> |

## Validations Redeemable Skipped Result Preceding Validation Failed
| Attributes |  Description |
|:-----|:--------|
| key</br>`string` | Available values: `preceding_validation_failed` |
| message</br>`string` | **Example:** <p>Redeemable cannot be applied due to preceding validation failure</p> |

## Simple Customer
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique identifier of an existing customer. It is assigned by Voucherify.</p> |
| name</br>`string` | <p>Customer's first and last name.</p> |
| email</br>`string` | <p>Customer's email address.</p> |
| source_id</br>`string` | <p>A unique identifier of the customer. It can be a customer ID or email from a CRM system, database, or a third-party service.</p> |
| metadata</br>`object` | <p>A set of custom key/value pairs that are attached to the customer. It stores all custom attributes assigned to the customer.</p> |
| object</br>`string` | <p>The type of the object represented by JSON.</p> Available values: `customer` |

## Promotion Tier
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique promotion tier ID.</p> **Example:** <p>promo_63fYCt81Aw0h7lzyRkrGZh9p</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the promotion tier was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2021-12-15T11:34:01.333Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the promotion tier was updated. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-02-09T09:20:05.603Z</p> |
| name</br>`string` | <p>Name of the promotion tier.</p> |
| banner</br>`string` | <p>Text to be displayed to your customers on your website.</p> |
| action</br>`object` | <p>Contains details about the discount applied by the promotion tier.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">discount</td><td style="text-align:left">See: <a href="#discount">Discount</a></td></tr></tbody></table> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the promotion tier. A set of key/value pairs that you can attach to a promotion tier object. It can be useful for storing additional information about the promotion tier in a structured format.</p> |
| hierarchy</br>`integer` | <p>The promotions hierarchy defines the order in which the discounts from different tiers will be applied to a customer's order. If a customer qualifies for discounts from more than one tier, discounts will be applied in the order defined in the hierarchy.</p> |
| promotion_id</br>`string` | <p>Promotion unique ID.</p> |
| campaign</br>`object` | <p>Contains details about promotion tier's parent campaign.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique campaign ID.</p></td></tr><tr><td style="text-align:left">start_date</br><code>string</code></td><td style="text-align:left"><p>Activation timestamp defines when the campaign starts to be active in ISO 8601 format. Campaign is <em>inactive before</em> this date.</p> <strong>Example:</strong> <p>2022-09-22T00:00:00.000Z</p></td></tr><tr><td style="text-align:left">expiration_date</br><code>string</code></td><td style="text-align:left"><p>Expiration timestamp defines when the campaign expires in ISO 8601 format.  Campaign is <em>inactive after</em> this date.</p> <strong>Example:</strong> <p>2022-09-30T00:00:00.000Z</p></td></tr><tr><td style="text-align:left">validity_timeframe</td><td style="text-align:left">See: <a href="#validity-timeframe">Validity Timeframe</a></td></tr><tr><td style="text-align:left">validity_day_of_week</td><td style="text-align:left">See: <a href="#validity-day-of-week">Validity Day Of Week</a></td></tr><tr><td style="text-align:left">validity_hours</td><td style="text-align:left">See: <a href="#validity-hours">Validity Hours</a></td></tr><tr><td style="text-align:left">active</br><code>boolean</code></td><td style="text-align:left"><p>A flag indicating whether the campaign is active or not active. A campaign can be disabled even though it's within the active period defined by the <code>start_date</code> and <code>expiration_date</code> using the <!-- [Disable Campaign](OpenAPI.json/paths/~1campaigns~1{campaignId}~1disable) --><a href="ref:disable-campaign">Disable Campaign</a> endpoint.</p><ul><li><code>true</code> indicates an <em>active</em> campaign</li><li><code>false</code> indicates an <em>inactive</em> campaign</li></ul></td></tr><tr><td style="text-align:left">category_id</br><code>string</code></td><td style="text-align:left"><p>Unique category ID that this campaign belongs to.</p> <strong>Example:</strong> <p>cat_0b688929a2476386a6</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>The type of the object represented by the campaign object. This object stores information about the campaign.</p></td></tr></tbody></table> |
| campaign_id</br>`string` | <p>Promotion tier's parent campaign's unique ID.</p> |
| active</br>`boolean` | <p>A flag to toggle the promotion tier on or off. You can disable a promotion tier even though it's within the active period defined by the <code>start_date</code> and <code>expiration_date</code>.</p><ul><li><code>true</code> indicates an <em>active</em> promotion tier</li><li><code>false</code> indicates an <em>inactive</em> promotion tier</li></ul> |
| start_date</br>`string` | <p>Activation timestamp defines when the promotion tier starts to be active in ISO 8601 format. Promotion tier is <em>inactive before</em> this date.</p> **Example:** <p>2022-09-23T00:00:00.000Z</p> |
| expiration_date</br>`string` | <p>Activation timestamp defines when the promotion tier expires in ISO 8601 format. Promotion tier is <em>inactive after</em> this date.</p> **Example:** <p>2022-09-26T00:00:00.000Z</p> |
| validity_timeframe | See: [Validity Timeframe](#validity-timeframe) |
| validity_day_of_week | See: [Validity Day Of Week](#validity-day-of-week) |
| validity_hours | See: [Validity Hours](#validity-hours) |
| summary</br>`object` | <p>Contains statistics about promotion tier redemptions and orders.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">redemptions</br><code>object</code></td><td style="text-align:left"><p>Contains statistics about promotion tier redemptions.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">total_redeemed</br><code>integer</code></td><td style="text-align:left"><p>Number of times the promotion tier was redeemed.</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">orders</br><code>object</code></td><td style="text-align:left"><p>Contains statistics about orders related to the promotion tier.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">total_amount</br><code>integer</code></td><td style="text-align:left"><p>Sum of order totals.</p></td></tr><tr><td style="text-align:left">total_discount_amount</br><code>integer</code></td><td style="text-align:left"><p>Sum of total discount applied using the promotion tier.</p></td></tr></tbody></table></td></tr></tbody></table> |
| object</br>`string` | <p>The type of the object represented by JSON. This object stores information about the promotion tier.</p> |
| validation_rule_assignments | See: [Validation Rule Assignments List](#validation-rule-assignments-list) |
| category_id</br>`string` | <p>Promotion tier category ID.</p> **Example:** <p>cat_0c9da30e7116ba6bba</p> |
| categories</br>`array` | Array of [Category](#category) |

## Redemption Reward Result
| Attributes |  Description |
|:-----|:--------|
| customer | [Simple Customer](#simple-customer) |
| assignment_id</br>`string`, `null` | <p>Unique reward assignment ID assigned by Voucherify.</p> |
| voucher | [Voucher](#voucher) |
| product | [Product](#product) |
| sku | [SKU Object](#sku-object) |
| loyalty_tier_id</br>`string`, `null` | <p>Unique loyalty tier ID assigned by Voucherify.</p> |
| id</br>`string` | <p>Unique reward ID.</p> **Example:** <p>rew_0bc92f81a6801f9bca</p> |
| name</br>`string` | <p>Name of the reward.</p> **Example:** <p>Reward Name</p> |
| object</br>`string` | <p>The type of the object represented by the JSON</p> Available values: `reward` |
| created_at</br>`string` | <p>Timestamp representing the date and time when the redemption was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2021-12-22T10:13:06.487Z</p> |
| updated_at</br>`string` | <p>Timestamp in ISO 8601 format indicating when the reward was updated.</p> **Example:** <p>2022-10-03T12:24:58.008Z</p> |
| parameters</br>`object` | <p>These are parameters representing a material reward.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">campaign</br><code>object</code></td><td style="text-align:left"><p>Defines the product redeemed as a reward.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Campaign unique ID.</p> <strong>Example:</strong> <p>camp_13BbZ0kQsNinhqsX3wUts2UP</p></td></tr><tr><td style="text-align:left">balance</br><code>integer</code></td><td style="text-align:left"><p>Points available for reward redemption. This is calculated as follows: <code>balance</code> = <code>points</code> - <code>expired_points</code> - <code>subtracted_points</code> - <code>redemption.redeemed_points</code>.</p></td></tr><tr><td style="text-align:left">type</br><code>string</code></td><td style="text-align:left"><p>Defines the type of the campaign.</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">product</br><code>object</code></td><td style="text-align:left"><p>Defines the product redeemed as a reward.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique product ID, assigned by Voucherify.</p> <strong>Example:</strong> <p>prod_0b7d7dfb05cbe5c616</p></td></tr><tr><td style="text-align:left">sku_id</br><code>string</code></td><td style="text-align:left"><p>Unique identifier of the SKU. It is assigned by Voucherify.</p> <strong>Example:</strong> <p>sku_0a41e31c7b41c28358</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">coin</br><code>object</code></td><td style="text-align:left"><p>Defines the ratio by mapping the number of loyalty points in <code>points_ratio</code> to a predefined cash amount in <code>exchange_ratio</code>.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">exchange_ratio</br><code>integer</code></td><td style="text-align:left"><p>The cash equivalent of the points defined in the <code>points_ratio</code> property.</p></td></tr><tr><td style="text-align:left">points_ratio</br><code>integer</code></td><td style="text-align:left"><p>The number of loyalty points that will map to the predefined cash amount defined by the <code>exchange_ratio</code> property.</p></td></tr></tbody></table></td></tr></tbody></table> |
| metadata</br>`object` | <p>A set of custom key/value pairs that you can attach to a reward. The metadata object stores all custom attributes assigned to the reward.</p> |
| type</br>`string` | <p>Reward type.</p> Available values: `CAMPAIGN`, `COIN`, `MATERIAL` |

## Voucher Base
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Assigned by the Voucherify API, identifies the voucher.</p> **Example:** <p>v_mkZN9v7vjYUadXnHrMza8W5c34fE5KiV</p> |
| code</br>`string` | <p>A code that identifies a voucher. Pattern can use all letters of the English alphabet, Arabic numerals, and special characters.</p> **Example:** <p>WVPblOYX</p> |
| campaign</br>`string` | <p>A unique campaign name, identifies the voucher's parent campaign.</p> **Example:** <p>Gift Card Campaign</p> |
| campaign_id</br>`string` | <p>Assigned by the Voucherify API, identifies the voucher's parent campaign.</p> **Example:** <p>camp_FNYR4jhqZBM9xTptxDGgeNBV</p> |
| category</br>`string` | <p>Tag defining the category that this voucher belongs to. Useful when listing vouchers using the List Vouchers endpoint.</p> |
| category_id</br>`string` | <p>Unique category ID assigned by Voucherify.</p> **Example:** <p>cat_0bb343dee3cdb5ec0c</p> |
| type</br>`string` | <p>Defines the type of the voucher.</p> Available values: `GIFT_VOUCHER`, `DISCOUNT_VOUCHER`, `LOYALTY_CARD` |
| discount | See: [Discount](#discount) |
| gift</br>`object` | <p>Object representing gift parameters. Child attributes are present only if <code>type</code> is <code>GIFT_VOUCHER</code>. Defaults to <code>null</code>.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">amount</br><code>integer</code></td><td style="text-align:left"><p>Total gift card income over the lifetime of the card. The value is multiplied by 100 to represent 2 decimal places. For example <code>10000 cents</code> for <code>$100.00</code>.</p> <strong>Example:</strong> <p>10000</p></td></tr><tr><td style="text-align:left">subtracted_amount</br><code>integer</code></td><td style="text-align:left"><p>Total amount of subtracted credits over the gift card lifetime. The value is multiplied by 100 to represent 2 decimal places. For example <code>10000 cents</code> for <code>$100.00</code>.</p></td></tr><tr><td style="text-align:left">balance</br><code>integer</code></td><td style="text-align:left"><p>Available funds. The value is multiplied by 100 to represent 2 decimal places. For example <code>10000 cents</code> for <code>$100.00</code>.</p> <strong>Example:</strong> <p>500</p></td></tr><tr><td style="text-align:left">effect</br><code>string</code></td><td style="text-align:left"><p>Defines how the credits are applied to the customer's order.</p> Available values: <code>APPLY_TO_ORDER</code>, <code>APPLY_TO_ITEMS</code></td></tr></tbody></table> |
| loyalty_card</br>`object` | <p>Object representing loyalty card parameters. Child attributes are present only if <code>type</code> is <code>LOYALTY_CARD</code>. Defaults to <code>null</code>.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>Total number of points added to the loyalty card over its lifespan.</p> <strong>Example:</strong> <p>7000</p></td></tr><tr><td style="text-align:left">balance</br><code>integer</code></td><td style="text-align:left"><p>Points available for reward redemption. This is calculated as follows: <code>balance</code> = <code>points</code> - <code>expired_points</code> - <code>subtracted_points</code> - <code>redemption.redeemed_points</code>.</p> <strong>Example:</strong> <p>6970</p></td></tr><tr><td style="text-align:left">next_expiration_date</br><code>string</code></td><td style="text-align:left"><p>The next closest date when the next set of points are due to expire.</p> <strong>Example:</strong> <p>2023-05-30</p></td></tr><tr><td style="text-align:left">next_expiration_points</br><code>integer</code></td><td style="text-align:left"><p>The amount of points that are set to expire next.</p></td></tr><tr><td style="text-align:left">pending_points</br><code>integer</code></td><td style="text-align:left"><p>Shows the number of pending points that will be added to the loyalty card when they are activated automatically or manually.</p></td></tr><tr><td style="text-align:left">expired_points</br><code>integer</code></td><td style="text-align:left"><p>Shows the total number of expired points over the lifetime of the loyalty card.</p></td></tr><tr><td style="text-align:left">subtracted_points</br><code>integer</code></td><td style="text-align:left"><p>Shows the total number of subtracted points over the lifetime of the loyalty card.</p></td></tr></tbody></table> |
| start_date</br>`string` | <p>Activation timestamp defines when the code starts to be active in ISO 8601 format. Voucher is <em>inactive before</em> this date.</p> **Example:** <p>2021-12-01T00:00:00.000Z</p> |
| expiration_date</br>`string` | <p>Expiration timestamp defines when the code expires in ISO 8601 format.  Voucher is <em>inactive after</em> this date.</p> **Example:** <p>2021-12-31T00:00:00.000Z</p> |
| validity_timeframe | See: [Validity Timeframe](#validity-timeframe) |
| validity_day_of_week | See: [Validity Day Of Week](#validity-day-of-week) |
| validity_hours | See: [Validity Hours](#validity-hours) |
| active</br>`boolean`, `null` | <p>A flag to toggle the voucher on or off. You can disable a voucher even though it's within the active period defined by the <code>start_date</code> and <code>expiration_date</code>.</p><ul><li><code>true</code> indicates an <em>active</em> voucher</li><li><code>false</code> indicates an <em>inactive</em> voucher</li></ul> |
| additional_info</br>`string` | <p>An optional field to keep any extra textual information about the code such as a code description and details.</p> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the code. A set of key/value pairs that you can attach to a voucher object. It can be useful for storing additional information about the voucher in a structured format.</p> |
| assets | See: [Voucher Assets](#voucher-assets) |
| is_referral_code</br>`boolean`, `null` | <p>Flag indicating whether this voucher is a referral code; <code>true</code> for campaign type <code>REFERRAL_PROGRAM</code>.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the voucher was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2021-12-22T10:13:06.487Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the voucher was last updated in ISO 8601 format.</p> **Example:** <p>2021-12-22T10:14:45.316Z</p> |
| holder_id</br>`string` | <p>Unique customer identifier of the redeemable holder. It equals to the customer ID assigned by Voucherify.</p> **Example:** <p>cust_eWgXlBBiY6THFRJwX45Iakv4</p> |
| referrer_id</br>`string` | <p>Unique identifier of the referring person.</p> **Example:** <p>cust_Vzck5i8U3OhcEUFY6MKhN9Rv</p> |
| object</br>`string` | <p>The type of the object represented by JSON. Default is <code>voucher</code>.</p> |
| publish</br>`object` | <p>Stores a summary of publication events: an event counter and endpoint to return details of each event. Publication is an assignment of a code to a customer, e.g. through a distribution.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>The type of the object represented is by default <code>list</code>. To get this list, you need to make a call to the endpoint returned in the <code>url</code> attribute.</p></td></tr><tr><td style="text-align:left">count</br><code>integer</code></td><td style="text-align:left"><p>Publication events counter.</p> <strong>Example:</strong> <p>0</p></td></tr><tr><td style="text-align:left">url</br><code>string</code></td><td style="text-align:left"><p>The endpoint where this list of publications can be accessed using a <strong>GET</strong> method. <code>/v1/vouchers/{voucher_code}/publications</code></p> <strong>Example:</strong> <p>/v1/vouchers/WVPblOYX/publications?page=1&amp;limit=10</p></td></tr></tbody></table> |
| redemption</br>`object` | <p>Stores a summary of redemptions that have been applied to the voucher.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">quantity</br><code>integer</code></td><td style="text-align:left"><p>How many times a voucher can be redeemed. A <code>null</code> value means unlimited.</p></td></tr><tr><td style="text-align:left">redeemed_quantity</br><code>integer</code></td><td style="text-align:left"><p>How many times a voucher has already been redeemed.</p> <strong>Example:</strong> <p>1</p></td></tr><tr><td style="text-align:left">redeemed_points</br><code>integer</code></td><td style="text-align:left"><p>Total loyalty points redeemed.</p> <strong>Example:</strong> <p>100000</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>The type of the object represented is by default <code>list</code>. To get this list, you need to make a call to the endpoint returned in the url attribute.</p></td></tr><tr><td style="text-align:left">url</br><code>string</code></td><td style="text-align:left"><p>The endpoint where this list of redemptions can be accessed using a <strong>GET</strong> method. <code>/v1/vouchers/{voucher_code}/redemptions</code></p> <strong>Example:</strong> <p>/v1/vouchers/WVPblOYX/redemptions?page=1&amp;limit=10</p></td></tr></tbody></table> |

## Validation Rules Assignments List
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>The type of the object represented by JSON. This object stores information about validation rules assignments.</p> Available values: `list` |
| data_ref</br>`string` | <p>Identifies the name of the attribute that contains the array of validation rules assignments.</p> Available values: `data` |
| data</br>`array` | <p>Contains array of validation rules assignments.</p> Array of [Business Validation Rule Assignment](#business-validation-rule-assignment) |
| total</br>`integer` | <p>Total number of validation rules assignments.</p> |

## Category
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique category ID assigned by Voucherify.</p> |
| name</br>`string` | <p>Category name.</p> |
| hierarchy</br>`integer` | <p>Category hierarchy. Categories with lower hierarchy are processed before categories with higher hierarchy value.</p> |
| object</br>`string` | <p>The type of the object represented by the JSON. This object stores information about the category.</p> Available values: `category` |
| created_at</br>`string` | <p>Timestamp representing the date and time when the category was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-07-14T10:45:13.156Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the category was updated. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-08-16T10:52:08.094Z</p> |

## Discount
<p>Contains information about discount.</p>

One of:

[Amount](#amount), [Unit](#unit), [Unit Multiple](#unit-multiple), [Percent](#percent), [Fixed](#fixed)

## Validity Timeframe
| Attributes |  Description |
|:-----|:--------|
| duration</br>`string` | <p>Defines the amount of time an earning rule will be active in ISO 8601 format. For example, an earning rule with a <code>duration</code> of <code>PT1H</code> will be valid for a duration of one hour.</p> **Example:** <p>PT1H</p> |
| interval</br>`string` | <p>Defines the intervening time between two time points in ISO 8601 format, expressed as a duration. For example, an earning rule with an <code>interval</code> of <code>P2D</code> will be valid every other day.</p> **Example:** <p>P2D</p> |

## Validity Day Of Week
<p>Integer array corresponding to the particular days of the week in which the voucher is valid.</p><ul><li><code>0</code> Sunday</li><li><code>1</code> Monday</li><li><code>2</code> Tuesday</li><li><code>3</code> Wednesday</li><li><code>4</code> Thursday</li><li><code>5</code> Friday</li><li><code>6</code> Saturday</li></ul>

## Validity Hours
| Attributes |  Description |
|:-----|:--------|
| daily</br>`array` | <p>Defines the reccuring period(s) when the resource is active. The periods should not overlap.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">start_time</br><code>string</code></td><td style="text-align:left"><p>Defines the starting hour of validity in the HH:mm format. The resource is <em>inactive before</em> this time.</p> <strong>Example:</strong> <p>12:00</p></td></tr><tr><td style="text-align:left">days_of_week</br><code>array</code></td><td style="text-align:left"><p>Integer array corresponding to the particular days of the week in which the resource is valid.</p><ul><li><code>0</code> Sunday</li><li><code>1</code> Monday</li><li><code>2</code> Tuesday</li><li><code>3</code>  Wednesday</li><li><code>4</code> Thursday</li><li><code>5</code> Friday</li><li><code>6</code> Saturday</li></ul></td></tr><tr><td style="text-align:left">expiration_time</br><code>string</code></td><td style="text-align:left"><p>Defines the ending hour of validity in the HH:mm format. The resource is <em>inactive after</em> this time.</p> <strong>Example:</strong> <p>14:00</p></td></tr></tbody></table> |

## Validation Rule Assignments List
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>The type of the object represented by JSON. This object stores information about validation rule assignments.</p> |
| data_ref</br>`string` | <p>Identifies the name of the JSON property that contains the array of validation rule assignments.</p> |
| data</br>`array` | <p>A dictionary that contains an array of validation rule assignments.</p> Array of [Validation Rule Assignment](#validation-rule-assignment) |
| total</br>`integer` | <p>Total number of validation rule assignments.</p> |

## Voucher
<p>This is an object representing a voucher with categories and validation rules assignments.</p>

All of:

1. [Voucher Base](#voucher-base)
2. <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">categories</br><code>array</code></td><td style="text-align:left"><p>Contains details about the category.</p> Array of <a href="#category">Category</a></td></tr><tr><td style="text-align:left">validation_rules_assignments</td><td style="text-align:left">See: <a href="#validation-rules-assignments-list">Validation Rules Assignments List</a></td></tr></tbody></table>

## Product
<p>This is an object representing a product.</p><p>This entity should be used to map product items from your inventory management system. The aim of products is to build which reflect product-specific campaigns.</p>

All of:

1. [Product without Skus Object](#product-without-skus-object)
2. <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">skus</td><td style="text-align:left">See: <a href="#skus-list-for-product">Skus List For Product</a></td></tr></tbody></table>

## SKU Object
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>A unique identifier that represents the SKU and is assigned by Voucherify.</p> **Example:** <p>sku_0b1621b319d248b79f</p> |
| source_id</br>`string`, `null` | <p>A unique SKU identifier from your inventory system.</p> **Example:** <p>sku_source_id_4</p> |
| product_id</br>`string` | <p>The parent product's unique ID.</p> **Example:** <p>prod_0b15f6b9f650c16990</p> |
| sku</br>`string`, `null` | <p>Unique user-defined SKU name.</p> **Example:** <p>Large Pink Shirt</p> |
| price</br>`integer`, `null` | <p>Unit price. It is represented by a value multiplied by 100 to accurately reflect 2 decimal places, such as <code>$100.00</code> being expressed as <code>10000</code>.</p> |
| currency</br>`string`, `null` | <p>SKU price currency.</p> **Example:** <p>USD</p> |
| attributes</br>`object` | <p>The attributes object stores values for all custom attributes inherited by the SKU from the parent product. A set of key/value pairs that are attached to a SKU object and are unique to each SKU within a product family.</p> |
| image_url</br>`string`, `null` | <p>The HTTPS URL pointing to the .png or .jpg file that will be used to render the SKU image.</p> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the SKU. A set of key/value pairs that you can attach to a SKU object. It can be useful for storing additional information about the SKU in a structured format. It can be used to create product collections.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the SKU was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-05-17T10:36:30.187Z</p> |
| updated_at</br>`string`, `null` | <p>Timestamp representing the date and time when the SKU was updated. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-05-17T10:55:09.137Z</p> |
| object</br>`string` | <p>The type of the object represented by JSON. This object stores information about the <code>SKU</code>.</p> Available values: `sku` |

## Voucher Assets
| Attributes |  Description |
|:-----|:--------|
| qr</br>`object` | <p>Stores Quick Response (QR) representation of encrypted code.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Encrypted voucher code ID.</p> <strong>Example:</strong> <p>U2FsdGVkX19ucFhvVmBVpVYG5KoswTsjSIaqoKg5L9ie4BK+t4pp7U7oFzjGJzj9q/bmuMOj9mEFiVKDMIkSaruKedMvHbKoPX5Sg+BaZk5QwXMf8k/OzSlOEVybpwSq+AiqPoNtjeuqtIgkDyvT6Q==</p></td></tr><tr><td style="text-align:left">url</br><code>string</code></td><td style="text-align:left"><p>URL to QR code</p><p><em>Optional:</em> Attach query parameters to base URL to customize the image of the encrypted voucher code.</p><ul><li><code>size</code>: integer value from <code>1</code> to <code>100</code></li><li><code>format</code>: string, either <code>png</code> (default) or <code>svg</code></li></ul> <strong>Example:</strong> <p>https://dev.dl.voucherify.io/api/v1/assets/qr/U2FsdGVkX19ucFhvVmBVpVYG5KoswTsjSIaqoKg5L9ie4BK%2Bt4pp7U7oFzjGJzj9q%2FbmuMOj9mEFiVKDMIkSaruKedMvHbKoPX5Sg%2BBaZk5QwXMf8k%2FOzSlOEVybpwSq%2BAiqPoNtjeuqtIgkDyvT6Q%3D%3D</p></td></tr></tbody></table> |
| barcode</br>`object` | <p>Stores barcode representation of encrypted code.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Encrypted voucher code ID.</p> <strong>Example:</strong> <p>U2FsdGVkX19eJhGfWwUrH9+tulBkON+AnMktic+N6CVWzZ9+fHVxuVx22WakrzxiWXy0skuvvEHSeZIw9HlgyIJ+kJ1iPdUKpyENuNYJKzoZlO0mmTf6WQM6/pFs61apEn9SJx32ttCF6d3oxKISQQ==</p></td></tr><tr><td style="text-align:left">url</br><code>string</code></td><td style="text-align:left"><p>URL to barcode</p><p><em>Optional:</em> Attach query parameters to base URL to customize the image of the encrypted voucher code.</p><ul><li><code>size</code>: integer value from <code>1</code> to <code>100</code></li><li><code>format</code>: string, either <code>png</code> (default) or <code>svg</code></li></ul> <strong>Example:</strong> <p>https://dev.dl.voucherify.io/api/v1/assets/barcode/U2FsdGVkX19eJhGfWwUrH9%2BtulBkON%2BAnMktic%2BN6CVWzZ9%2BfHVxuVx22WakrzxiWXy0skuvvEHSeZIw9HlgyIJ%2BkJ1iPdUKpyENuNYJKzoZlO0mmTf6WQM6%2FpFs61apEn9SJx32ttCF6d3oxKISQQ%3D%3D</p></td></tr></tbody></table> |

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

## Validation Rule Assignment
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Validation rule assignment ID.</p> **Example:** <p>asgm_74F7QZoYbUoljwQO</p> |
| rule_id</br>`string` | <p>Validation rule ID.</p> **Example:** <p>val_4j7DCRm2IS59</p> |
| related_object_id</br>`string` | <p>The resource ID to which the validation rule was assigned.</p> **Example:** <p>v_JtWunK6jUo7X2qOFj0SyRHq4p9tgENlT</p> |
| related_object_type</br>`string` | <p>The type of resource to which the validation rule was assigned.</p> Available values: `voucher`, `campaign`, `earning_rule`, `reward_assignment`, `promotion_tier`, `distribution` |
| created_at</br>`string` | <p>Timestamp representing the date and time when the validation rule assignment was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-02-17T08:18:15.085Z</p> |
| object</br>`string` | <p>The type of the object represented by the ID.</p> Available values: `validation_rules_assignment` |

## Product without Skus Object
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique product ID assigned by Voucherify.</p> **Example:** <p>prod_0b1da8105693710357</p> |
| source_id</br>`string`, `null` | <p>Unique product source ID.</p> **Example:** <p>productSourceID16</p> |
| name</br>`string`, `null` | <p>Unique user-defined product name.</p> **Example:** <p>T-shirt</p> |
| price</br>`integer`, `null` | <p>Unit price. It is represented by a value multiplied by 100 to accurately reflect 2 decimal places, such as <code>$100.00</code> being expressed as <code>10000</code>.</p> |
| attributes</br>`array` | <p>A list of product attributes whose values you can customize for given SKUs: <code>[&quot;color&quot;,&quot;size&quot;,&quot;ranking&quot;]</code>. Each child SKU can have a unique value for a given attribute.</p> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the product. A set of key/value pairs that you can attach to a product object. It can be useful for storing additional information about the product in a structured format. It can be used to create product collections.</p> |
| image_url</br>`string`, `null` | <p>The HTTPS URL pointing to the .png or .jpg file that will be used to render the product image.</p> **Example:** <p>https://images.com/original.jpg</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the product was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-05-23T06:52:55.008Z</p> |
| updated_at</br>`string`, `null` | <p>Timestamp representing the date and time when the product was updated. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-05-23T09:24:07.405Z</p> |
| object</br>`string` | <p>The type of the object represented by JSON. This object stores information about the product.</p> Available values: `product` |

## Skus List For Product
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>The type of the object represented by JSON. This object stores information about SKUs.</p> |
| data_ref</br>`string` | <p>Identifies the name of the JSON property that contains the array of SKUs.</p> |
| data</br>`array` | <p>A dictionary that contains an array of SKUs.</p> Array of [SKU Object](#sku-object) |
| total</br>`integer` | <p>Total number of SKUs in the product.</p> |

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
