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
| redemptions</br>`array` | Array of [Simple Redemption](#simple-redemption) |
| parent_redemption | See: [Simple Redemption](#simple-redemption) |
| order | <p>Contains the order details associated with the redemption.</p> [Order Calculated](#order-calculated) |
| inapplicable_redeemables</br>`array` | <p>Lists validation results of each inapplicable redeemable.</p> Array of [Inapplicable Redeemable](#inapplicable-redeemable) |
| skipped_redeemables</br>`array` | <p>Lists validation results of each redeemable. If a redeemable can be applied, the API returns <code>&quot;status&quot;: &quot;APPLICABLE&quot;</code>.</p> Array of [Skipped Redeemable](#skipped-redeemable) |

## Simple Redemption
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique redemption ID.</p> **Example:** <p>r_0bc92f81a6801f9bca</p> |
| customer_id</br>`string`, `null` | <p>Unique customer ID of the redeeming customer.</p> **Example:** <p>cust_i8t5Tt6eiKG5K79KQlJ0Vs64</p> |
| tracking_id</br>`string` | <p>Hashed customer source ID.</p> |
| date</br>`string` | <p>Timestamp representing the date and time when the redemption was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2021-12-22T10:13:06.487Z</p> |
| amount</br>`integer` | <p>For gift cards, this is a positive integer in the smallest currency unit (e.g. 100 cents for $1.00) representing the number of redeemed credits.<br>For loyalty cards, this is the number of loyalty points used in the transaction.<br>In the case of redemption rollback, the numbers are expressed as negative integers.</p> **Example:** <p>10000</p> |
| order | See: [Simple Order](#simple-order) |
| reward | See: [Simple Redemption Reward Result](#simple-redemption-reward-result) |
| customer | See: [Simple Customer](#simple-customer) |
| result</br>`string` | <p>Redemption result.</p> Available values: `SUCCESS`, `FAILURE` |
| status</br>`string`, `null` | Available values: `SUCCEEDED`, `FAILED`, `ROLLED BACK` |
| voucher | <p>Defines the details of the voucher being redeemed.</p> [Simple Voucher](#simple-voucher) |
| promotion_tier | See: [Simple Promotion Tier](#simple-promotion-tier) |
| redemption</br>`string` | <p>Unique redemption ID of the parent redemption.</p> **Example:** <p>r_0c656311b5878a2031</p> |
| object</br>`string` | <p>The type of the object represented by the JSON. This object stores information about the <code>redemption</code>.</p> |

## Order Calculated
All of:

1. [Order Response Base](#order-response-base)
2. <h3>Order Calculated</h3><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">customer</td><td style="text-align:left">One of: <a href="#customer-id">Customer Id</a></td></tr><tr><td style="text-align:left">referrer</td><td style="text-align:left">One of: <a href="#referrer-id">Referrer Id</a></td></tr></tbody></table>

## Inapplicable Redeemable
| Attributes |  Description |
|:-----|:--------|
| status</br>`string` | <p>Indicates whether the redeemable can be applied or not applied based on the validation rules.</p> Available values: `INAPPLICABLE` |
| id</br>`string` | <p>Redeemable ID, i.e. the voucher code.</p> |
| object</br>`string` | <p>Redeemable's object type.</p> Available values: `voucher`, `promotion_tier` |
| result</br>`object` | <p>Includes the error object with details about the reason why the redeemable is inapplicable</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">error</td><td style="text-align:left">See: <a href="#error-object">Error Object</a></td></tr><tr><td style="text-align:left">details</br><code>object</code></td><td style="text-align:left"><p>Provides details about the reason why the redeemable is inapplicable.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">message</br><code>string</code></td><td style="text-align:left"><p>Generic message from the <code>message</code> string shown in the <code>error</code> object or the message configured in a validation rule.</p></td></tr><tr><td style="text-align:left">key</br><code>string</code></td><td style="text-align:left"><p>Generic message from the <code>key</code> string shown in the <code>error</code> object.</p></td></tr></tbody></table></td></tr></tbody></table> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes in the form of key/value pairs assigned to the redeemable.</p> |
| categories</br>`array` | Array of [Category](#category) |

## Skipped Redeemable
| Attributes |  Description |
|:-----|:--------|
| status</br>`string` | <p>Indicates whether the redeemable can be applied or not applied based on the validation rules.</p> Available values: `SKIPPED` |
| id</br>`string` | <p>Redeemable ID, i.e. the voucher code.</p> |
| object</br>`string` | <p>Redeemable's object type.</p> Available values: `voucher`, `promotion_tier` |
| result</br>`object` | <p>Provides details about the reason why the redeemable is skipped.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">details</td><td style="text-align:left">One of: <a href="#validations-redeemable-skipped-result-limit-exceeded">Validations Redeemable Skipped Result Limit Exceeded</a>, <a href="#validations-redeemable-skipped-result-category-limit-exceeded">Validations Redeemable Skipped Result Category Limit Exceeded</a>, <a href="#validations-redeemable-skipped-result-redeemables-limit-exceeded">Validations Redeemable Skipped Result Redeemables Limit Exceeded</a>, <a href="#validations-redeemable-skipped-result-redeemables-category-limit-exceeded">Validations Redeemable Skipped Result Redeemables Category Limit Exceeded</a>, <a href="#validations-redeemable-skipped-result-exclusion-rules-not-met">Validations Redeemable Skipped Result Exclusion Rules Not Met</a>, <a href="#validations-redeemable-skipped-result-preceding-validation-failed">Validations Redeemable Skipped Result Preceding Validation Failed</a></td></tr></tbody></table> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes in the form of key/value pairs assigned to the redeemable.</p> |
| categories</br>`array` | Array of [Category](#category) |

## Simple Order
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique ID assigned by Voucherify of an existing order that will be linked to the redemption of this request.</p> |
| source_id</br>`string` | <p>Unique source ID of an existing order that will be linked to the redemption of this request.</p> |
| status</br>`string` | <p>The order status.</p> Available values: `CREATED`, `PAID`, `CANCELED`, `FULFILLED` |
| customer_id</br>`string`, `null` | <p>Unique customer ID of the customer making the purchase.</p> **Example:** <p>cust_7iUa6ICKyU6gH40dBU25kQU1</p> |
| referrer_id</br>`string`, `null` | <p>Unique referrer ID.</p> **Example:** <p>cust_nM4jqPiaXUvQdVSA6vTRUnix</p> |
| amount</br>`integer` | <p>A positive integer in the smallest currency unit (e.g. 100 cents for $1.00) representing the total amount of the order. This is the sum of the order items' amounts.</p> |
| discount_amount</br>`integer` | <p>Sum of all order-level discounts applied to the order.</p> |
| applied_discount_amount</br>`integer` | <p>This field shows the order-level discount applied.</p> |
| items_discount_amount</br>`integer` | <p>Sum of all product-specific discounts applied to the order.</p> |
| items_applied_discount_amount</br>`integer` | <p>Sum of all product-specific discounts applied in a particular request.<br><code>sum(items, i =&gt; i.applied_discount_amount)</code></p> |
| total_discount_amount</br>`integer` | <p>Sum of all order-level AND all product-specific discounts applied to the order.</p> |
| total_applied_discount_amount</br>`integer` | <p>Sum of all order-level AND all product-specific discounts applied in a particular request.<br><code>total_applied_discount_amount</code> = <code>applied_discount_amount</code> + <code>items_applied_discount_amount</code></p> |
| total_amount</br>`integer` | <p>Order amount after undoing all the discounts through the rollback redemption.</p> |
| items</br>`array` | <p>Array of items applied to the order.</p> Array of [Simple Order Item](#simple-order-item) |
| metadata</br>`object` | <p>A set of custom key/value pairs that you can attach to an order. It can be useful for storing additional information about the order in a structured format.</p> |
| object</br>`string` | <p>The type of the object represented by JSON.</p> Available values: `order` |

## Simple Redemption Reward Result
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Simple Customer](#simple-customer) |
| assignment_id</br>`string` | <p>Unique reward assignment ID assigned by Voucherify.</p> |
| voucher | <p>Defines of the voucher.</p> [Simple Voucher](#simple-voucher) |
| product | <p>Defines of the product.</p> [Simple Product](#simple-product) |
| sku | <p>Defines of the sku.</p> [Simple Sku](#simple-sku) |
| loyalty_tier_id</br>`string` | <p>Unique loyalty tier ID assigned by Voucherify.</p> |
| id</br>`string` | <p>Unique reward ID, assigned by Voucherify.</p> **Example:** <p>rew_nIy4gHpQHle2c3pNMwuj7G6j</p> |
| object</br>`string` | <p>The type of the object represented by the JSON. This object stores information about the reward.</p> Available values: `reward` |
| name</br>`string` | <p>Reward name.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the reward was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-08-11T14:49:22.586Z</p> |
| updated_at</br>`string`, `null` | <p>Timestamp representing the date and time when the reward was updated. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-08-11T16:01:34.885Z</p> |
| parameters</br>`object` | <p>Defines how the reward is generated.</p> |
| type</br>`string` | <p>Reward type.</p> Available values: `CAMPAIGN`, `COIN`, `MATERIAL` |

## Simple Customer
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>The ID of an existing customer that will be linked to redemption in this request.</p> |
| source_id</br>`string` | <p>A unique identifier of the customer who validates a voucher. It can be a customer ID or email from a CRM system, database, or a third-party service. If you also pass a customer ID (unique ID assigned by Voucherify), the source ID will be ignored.</p> |
| name</br>`string` | <p>Customer's first and last name.</p> |
| email</br>`string` | <p>Customer's email address.</p> |
| metadata</br>`object` | <p>A set of custom key/value pairs that you can attach to a customer. The metadata object stores all custom attributes assigned to the customer. It can be useful for storing additional information about the customer in a structured format. This metadata can be used for validating whether the customer qualifies for a discount or it can be used in building customer segments.</p> |
| object</br>`string` | <p>The type of the object represented by JSON.</p> Available values: `customer` |

## Simple Voucher
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>A unique identifier that represents the voucher assigned by Voucherify.</p> |
| code</br>`string` | <p>Voucher code.</p> |
| gift | <p>Gift object response.</p> [Gift](#gift) |
| discount | See: [Discount](#discount) |
| loyalty_card</br>`object` | <p>Defines the loyalty card details.</p> [Simple Loyalty Card](#simple-loyalty-card) |
| type</br>`string` | <p>Type of the voucher.</p> Available values: `DISCOUNT_VOUCHER`, `LOYALTY_CARD`, `GIFT_VOUCHER` |
| campaign</br>`string` | <p>Campaign name.</p> |
| campaign_id</br>`string` | <p>Campaign unique ID.</p> |
| is_referral_code</br>`boolean` | <p>Flag indicating whether this voucher is a referral code; <code>true</code> for campaign type <code>REFERRAL_PROGRAM</code>.</p> |
| holder_id</br>`string` | <p>Unique customer ID of the campaign owner.</p> **Example:** <p>cust_eWgXlBBiY6THFRJwX45Iakv4</p> |
| referrer_id</br>`string` | <p>Unique identifier of the referrer assigned by Voucherify.</p> **Example:** <p>cust_nM4jqPiaXUvQdVSA6vTRUnix</p> |
| category_id</br>`string`, `null` | <p>Unique identifier of the category that this voucher belongs to.</p> **Example:** <p>cat_0b6152ce12414820dc</p> |
| categories</br>`array` | <p>Contains details about the category.</p> Array of [Category](#category) |
| active</br>`boolean` | <p>Shows whether the voucher is on or off. <code>true</code> indicates an <em>active</em> voucher and <code>false</code> indicates an <em>inactive</em> voucher.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the order was created. Timestamp is presented in the ISO 8601 format.</p> **Example:** <p>2021-12-22T10:13:06.487Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the voucher was updated in the ISO 8601 format.</p> **Example:** <p>2024-01-01T11:11:11.111Z</p> |
| redemption</br>`object` | <p>Defines the redemption limits on vouchers.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">quantity</br><code>integer</code>, <code>null</code></td><td style="text-align:left"><p>How many times a voucher can be redeemed. A <code>null</code> value means unlimited.</p></td></tr><tr><td style="text-align:left">redeemed_quantity</br><code>integer</code></td><td style="text-align:left"><p>How many times a voucher has already been redeemed.</p> <strong>Example:</strong> <p>1</p></td></tr></tbody></table> |
| start_date</br>`string` | <p>Activation timestamp defines when the code starts to be active in ISO 8601 format. Voucher is <em>inactive before</em> this date.</p> **Example:** <p>2021-12-01T00:00:00.000Z</p> |
| expiration_date</br>`string` | <p>Expiration timestamp defines when the code expires in ISO 8601 format.  Voucher is <em>inactive after</em> this date.</p> **Example:** <p>2021-12-31T00:00:00.000Z</p> |
| metadata</br>`object` | <p>A set of custom key/value pairs that you can attach to a voucher. The metadata object stores all custom attributes assigned to the voucher.</p> |
| object</br>`string` | <p>The type of the object represented by JSON.</p> Available values: `voucher` |

## Simple Promotion Tier
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique promotion tier ID.</p> **Example:** <p>promo_63fYCt81Aw0h7lzyRkrGZh9p</p> |
| name</br>`string` | <p>Name of the promotion tier.</p> |
| banner</br>`string` | <p>Text to be displayed to your customers on your website.</p> |
| campaign</br>`object` | <p>Contains details about promotion tier's parent campaign.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique campaign ID.</p></td></tr></tbody></table> |
| metadata</br>`object` | <p>A set of custom key/value pairs that you can attach to a promotion tier. The metadata object stores all custom attributes assigned to the promotion tier.</p> |

## Order Response Base
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique ID assigned by Voucherify of an existing order that will be linked to the redemption of this request.</p> |
| source_id</br>`string`, `null` | <p>Unique source ID of an existing order that will be linked to the redemption of this request.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the order was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2021-12-22T10:13:06.487Z</p> |
| updated_at</br>`string`, `null` | <p>Timestamp representing the date and time when the order was last updated in ISO 8601 format.</p> **Example:** <p>2021-12-22T10:14:45.316Z</p> |
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
| customer_id</br>`string`, `null` | <p>Unique customer ID of the customer making the purchase.</p> **Example:** <p>cust_7iUa6ICKyU6gH40dBU25kQU1</p> |
| referrer_id</br>`string`, `null` | <p>Unique referrer ID.</p> **Example:** <p>cust_nM4jqPiaXUvQdVSA6vTRUnix</p> |
| object</br>`string` | <p>The type of the object represented by JSON.</p> Available values: `order` |
| redemptions</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">[propertyName]</td><td style="text-align:left">See: <a href="#order-redemptions">Order Redemptions</a></td></tr></tbody></table> |

## Customer Id
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>A unique identifier of an existing customer.</p> |
| object</br>`string` | <p>The type of the object represented by JSON.</p> Available values: `customer` |

## Referrer Id
[Customer Id](#customer-id)

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

## Category
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique category ID assigned by Voucherify.</p> |
| name</br>`string` | <p>Category name.</p> |
| hierarchy</br>`integer` | <p>Category hierarchy.</p> |
| object</br>`string` | <p>The type of the object represented by the JSON. This object stores information about the category.</p> Available values: `category` |
| created_at</br>`string` | <p>Timestamp representing the date and time when the category was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-07-14T10:45:13.156Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the category was updated. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-08-16T10:52:08.094Z</p> |
| stacking_rules_type</br>`string` | <p>The type of the stacking rule eligibility.</p> Available values: `JOINT`, `EXCLUSIVE` |

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

## Simple Order Item
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique identifier of the order line item.</p> |
| object</br>`string` | <p>The type of the object represented by JSON. This object stores information about the <code>order_item</code>.</p> Available values: `order_item` |
| source_id</br>`string` | <p>The merchant's product/SKU ID (if it is different from the Voucherify product/SKU ID). It is useful in the integration between multiple systems. It can be an ID from an eCommerce site, a database, or a third-party service.</p> |
| related_object</br>`string` | <p>Used along with the <code>source_id</code> property, can be set to either SKU or product.</p> Available values: `product`, `sku` |
| product_id</br>`string` | <p>Unique identifier of the product. It is assigned by Voucherify.</p> |
| sku_id</br>`string` | <p>Unique identifier of the SKU. It is assigned by Voucherify.</p> |
| quantity</br>`integer` | <p>Quantity of the particular item in the cart.</p> |
| applied_quantity</br>`integer` | <p>Quantity of items changed by the application of a new quantity items. It can be positive when an item is added or negative if an item is replaced.</p> |
| applied_quantity_amount</br>`integer` | <p>Amount for the items changed by the application of a new quantity items. It can be positive when an item is added or negative if an item is replaced.</p> |
| discount_quantity</br>`integer` | <p>Number of discounted items.</p> |
| applied_discount_quantity</br>`integer` | <p>Number of the discounted items applied in the transaction.</p> |
| amount</br>`integer` | <p>Total amount of the order item (price * quantity).</p> |
| discount_amount</br>`integer` | <p>Sum of all order-item-level discounts applied to the order.</p> |
| applied_discount_amount</br>`integer` | <p>Order-level discount amount applied in the transaction.</p> |
| price</br>`integer` | <p>Unit price of an item. Value is multiplied by 100 to precisely represent 2 decimal places. For example <code>10000 cents</code> for <code>$100.00</code>.</p> |
| subtotal_amount</br>`integer` | <p>Final order item amount after the applied item-level discount.  If there are no item-level discounts applied, this item is equal to the <code>amount</code>.<br><code>subtotal_amount</code>=<code>amount</code>-<code>discount_amount</code></p> |

## Simple Product
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique product ID.</p> |
| source_id</br>`string` | <p>Product source id.</p> |
| name</br>`string` | <p>Product name.</p> |

## Simple Sku
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique sku ID.</p> |
| source_id</br>`string` | <p>Sku source id.</p> |
| sku</br>`string` | <p>Sku name.</p> |

## Gift
| Attributes |  Description |
|:-----|:--------|
| amount</br>`number` | <p>Total gift card income over the lifetime of the card. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 amount is written as 10000.</p> |
| balance</br>`number` | <p>Available funds. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 amount is written as 10000.</p> |
| effect</br>`string` | <p>Defines how the credits are applied to the customer's order.</p> Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS` |

## Discount
<p>Contains information about discount.</p>

One of:

[Amount](#amount), [Unit](#unit), [Unit Multiple](#unit-multiple), [Percent](#percent), [Fixed](#fixed)

## Simple Loyalty Card
| Attributes |  Description |
|:-----|:--------|
| points</br>`integer` | <p>Total points incurred over lifespan of loyalty card.</p> |
| balance</br>`integer` | <p>Points available for reward redemption.</p> |
| next_expiration_date</br>`string` | <p>The next closest date when the next set of points are due to expire.</p> |
| next_expiration_points</br>`integer` | <p>The amount of points that are set to expire next.</p> |

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
| initial_amount</br>`integer` | <p>A positive integer in the smallest currency unit (e.g. 100 cents for $1.00) representing the total amount of the order. This is the sum of the order items' amounts.</p> |
| applied_discount_quantity</br>`integer` | <p>Number of the discounted items applied in the transaction.</p> |
| applied_quantity</br>`integer` | <p>Quantity of items changed by the application of a new quantity items. It can be positive when an item is added or negative if an item is replaced.</p> |
| applied_quantity_amount</br>`integer` | <p>Amount for the items changed by the application of a new quantity items. It can be positive when an item is added or negative if an item is replaced.</p> |
| price</br>`integer` | <p>Unit price of an item. Value is multiplied by 100 to precisely represent 2 decimal places. For example <code>10000 cents</code> for <code>$100.00</code>.</p> |
| subtotal_amount</br>`integer` | <p>Final order item amount after the applied item-level discount.  If there are no item-level discounts applied, this item is equal to the <code>amount</code>.<br><code>subtotal_amount</code>=<code>amount</code>-<code>applied_discount_amount</code></p> |
| product</br>`object` | <p>An object containing details of the related product.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier that represents the product and is assigned by Voucherify.</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>The merchant's product ID (if it is different than Voucherify's product ID). It is really useful in case of integration between multiple systems. It can be an ID from an eCommerce site, a database or a 3rd party service.</p></td></tr><tr><td style="text-align:left">override</br><code>boolean</code></td><td style="text-align:left"><p>The override set to <code>true</code> is used to store the product information in the system. If the product does not exist, it will be created with a source_id; if it does exist, the provided values for the name, price, and metadata will replace those already stored in the system.</p></td></tr><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"><p>Product name.</p></td></tr><tr><td style="text-align:left">metadata</br><code>object</code></td><td style="text-align:left"><p>A set of custom key/value pairs that you can attach to a product. It can be useful for storing additional information about the product in a structured format.</p></td></tr><tr><td style="text-align:left">price</br><code>number</code></td><td style="text-align:left"><p>Product price. A positive integer in the smallest currency unit (e.g. 100 cents for $1.00).</p></td></tr></tbody></table> |
| sku</br>`object` | <p>An object containing details of the related SKU.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier that represents the SKU and is assigned by Voucherify.</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>The merchant's SKU ID (if it is different than Voucherify's SKU ID). It is really useful in case of integration between multiple systems. It can be an ID from an eCommerce site, a database or a 3rd party service.</p></td></tr><tr><td style="text-align:left">override</br><code>boolean</code></td><td style="text-align:left"><p>The override set to <code>true</code> is used to store the product information in the system. If the product does not exist, it will be created with a source_id; if it does exist, the provided values for the name, price, and metadata will replace those already stored in the system.</p></td></tr><tr><td style="text-align:left">sku</br><code>string</code></td><td style="text-align:left"><p>The SKU name.</p></td></tr><tr><td style="text-align:left">price</br><code>number</code></td><td style="text-align:left"><p>SKU price. A positive integer in the smallest currency unit (e.g. 100 cents for $1.00).</p></td></tr></tbody></table> |
| object</br>`string` | <p>The type of the object represented by JSON.</p> Available values: `order_item` |
| metadata</br>`object` | <p>A set of custom key/value pairs that you can attach to an SKU. It can be useful for storing additional information about the SKU in a structured format.</p> |

## Order Redemptions
| Attributes |  Description |
|:-----|:--------|
| date</br>`string` | <p>Timestamp representing the date and time when the redemption was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-09-02T17:06:56.649Z</p> |
| rollback_id</br>`string` | <p>Unique ID of the redemption rollback.</p> **Example:** <p>rr_0c63c84eb78ee0a6c0</p> |
| rollback_date</br>`string` | <p>Timestamp representing the date and tiem when the redemption rollback was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2023-01-31T14:18:37.150Z</p> |
| related_object_type</br>`string` | <p>The source of the incentive.</p> |
| related_object_id</br>`string` | <p>Unique ID of the parent redemption.</p> **Example:** <p>r_0ba186c4824e4881e1</p> |
| related_object_parent_id</br>`string` | <p>Represent's the campaign ID of the voucher if the redemption was based on a voucher that was part of bulk codes generated within a campaign. In case of a promotion tier, this represents the campaign ID of the promotion tier's parent campaign.</p> |
| stacked</br>`array` | <p>Contains a list of unique IDs of child redemptions, which belong to the stacked incentives.</p> |
| rollback_stacked</br>`array` | <p>Lists the rollback redemption IDs of the particular child redemptions.</p> |

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

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
