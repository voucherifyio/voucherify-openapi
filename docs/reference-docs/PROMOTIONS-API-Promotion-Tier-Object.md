---
title: Promotion Tier Object
type: basic
categorySlug: voucherify-api
parentDocSlug: promotions-api
slug: promotion-tier-object
hidden: false
order: 1
---

## Promotion Tier Object
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique promotion tier ID.</p> **Example:** <p>promo_63fYCt81Aw0h7lzyRkrGZh9p</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the promotion tier was created in ISO 8601 format.</p> **Example:** <p>2021-12-15T11:34:01.333Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the promotion tier was updated in ISO 8601 format.</p> **Example:** <p>2022-02-09T09:20:05.603Z</p> |
| name</br>`string` | <p>Name of the promotion tier.</p> |
| banner</br>`string` | <p>Text to be displayed to your customers on your website.</p> |
| action</br>`object` | <p>Contains details about the discount applied by the promotion tier.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">discount</td><td style="text-align:left"><p>The type of discount that will be applied to a customer's order.</p> Any of: <a href="#amount">Amount</a>, <a href="#percentage">Percentage</a>, <a href="#fixed">Fixed</a>, <a href="#unit-single-item">Unit, single item</a>, <a href="#unit-multiple-items">Unit, multiple items</a>, <a href="#shipping">Shipping</a></td></tr></tbody></table> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the promotion tier. A set of key/value pairs that you can attach to a promotion tier object. It can be useful for storing additional information about the promotion tier in a structured format.</p> |
| hierarchy</br>`integer` | <p>The promotions hierarchy defines the order in which the discounts from different tiers will be applied to a customer's order. If a customer qualifies for discounts from more than one tier, discounts will be applied in the order defined in the hierarchy.</p> |
| campaign</br>`object` | <p>Contains details about promotion tier's parent campaign.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique campaign ID.</p></td></tr><tr><td style="text-align:left">start_date</br><code>string</code></td><td style="text-align:left"><p>Activation timestamp defines when the campaign starts to be active in ISO 8601 format. Campaign is <em>inactive before</em> this date.</p> <strong>Example:</strong> <p>2022-09-22T00:00:00.000Z</p></td></tr><tr><td style="text-align:left">expiration_date</br><code>string</code></td><td style="text-align:left"><p>Expiration timestamp defines when the campaign expires in ISO 8601 format.  Campaign is <em>inactive after</em> this date.</p> <strong>Example:</strong> <p>2022-09-30T00:00:00.000Z</p></td></tr><tr><td style="text-align:left">validity_timeframe</br><code>object</code></td><td style="text-align:left"><p>Recurrent time periods when the campaign is valid. For example, valid for 1 hour every other day.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">interval</br><code>string</code></td><td style="text-align:left"><p>Defines the intervening time between two time points in ISO 8601 format, expressed as a duration. For example, a campaign with an <code>interval</code> of <code>P2D</code> will be active every other day.</p></td></tr><tr><td style="text-align:left">duration</br><code>string</code></td><td style="text-align:left"><p>Defines the amount of time the campaign will be active in ISO 8601 format. For example, a campaign with a <code>duration</code> of <code>P1D</code> will be valid for a duration of one day.</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">validity_day_of_week</br><code>array</code></td><td style="text-align:left"><p>Integer array corresponding to the particular days of the week in which the campaign is valid.</p><ul><li><code>0</code>  Sunday</li><li><code>1</code>  Monday</li><li><code>2</code>  Tuesday</li><li><code>3</code>  Wednesday</li><li><code>4</code>  Thursday</li><li><code>5</code>  Friday</li><li><code>6</code>  Saturday</li></ul></td></tr><tr><td style="text-align:left">active</br><code>boolean</code></td><td style="text-align:left"><p>A flag indicating whether the campaign is active or not active. A campaign can be disabled even though it's within the active period defined by the <code>start_date</code> and <code>expiration_date</code> using the <!-- [Disable Campaign](OpenAPI.json/paths/~1campaigns~1{campaignId}~1disable) --><a href="ref:disable-campaign">Disable Campaign</a> endpoint.</p><ul><li><code>true</code> indicates an <em>active</em> campaign</li><li><code>false</code> indicates an <em>inactive</em> campaign</li></ul></td></tr><tr><td style="text-align:left">category_id</br><code>string</code></td><td style="text-align:left"><p>Unique category ID that this campaign belongs to.</p> <strong>Example:</strong> <p>cat_0b688929a2476386a6</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>The type of object represented by the campaign object. This object stores information about the campaign.</p></td></tr></tbody></table> |
| campaign_id</br>`string` | <p>Promotion tier's parent campaign's unique ID.</p> |
| active</br>`boolean` | <p>A flag to toggle the promotion tier on or off. You can disable a promotion tier even though it's within the active period defined by the <code>start_date</code> and <code>expiration_date</code>.</p><ul><li><code>true</code> indicates an <em>active</em> promotion tier</li><li><code>false</code> indicates an <em>inactive</em> promotion tier</li></ul> |
| start_date</br>`string` | <p>Activation timestamp defines when the promotion tier starts to be active in ISO 8601 format. Promotion tier is <em>inactive before</em> this date.</p> **Example:** <p>2022-09-23T00:00:00.000Z</p> |
| expiration_date</br>`string` | <p>Activation timestamp defines when the promotion tier expires in ISO 8601 format. Promotion tier is <em>inactive after</em> this date.</p> **Example:** <p>2022-09-26T00:00:00.000Z</p> |
| validity_timeframe</br>`object` | <p>Set recurrent time periods when the promotion tier is valid. For example, valid for 1 hour every other day.<code>start_date</code> <strong>required</strong> when including the <code>validity_timeframe</code>.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">interval</br><code>string</code></td><td style="text-align:left"><p>Defines the intervening time between two time points in ISO 8601 format, expressed as a duration. For example, a promotion tier with an <code>interval</code> of <code>P2D</code> will be active every other day.</p></td></tr><tr><td style="text-align:left">duration</br><code>string</code></td><td style="text-align:left"><p>Defines the amount of time the promotion tier will be active in ISO 8601 format. For example, a promotion tier with a <code>duration</code> of <code>P1D</code> will be valid for a duration of one day.</p></td></tr></tbody></table> |
| validity_day_of_week</br>`array` | <p>Integer array corresponding to the particular days of the week in which the promotion tier is valid.</p><ul><li><code>0</code>  Sunday</li><li><code>1</code>  Monday</li><li><code>2</code>  Tuesday</li><li><code>3</code>  Wednesday</li><li><code>4</code>  Thursday</li><li><code>5</code>  Friday</li><li><code>6</code>  Saturday</li></ul> |
| summary</br>`object` | <p>Contains statistics about promotion tier redemptions and orders.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">redemptions</br><code>object</code></td><td style="text-align:left"><p>Contains statistics about promotion tier redemptions.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">total_redeemed</br><code>integer</code></td><td style="text-align:left"><p>Number of times the promotion tier was redeemed.</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">orders</br><code>object</code></td><td style="text-align:left"><p>Contains statistics about orders related to the promotion tier.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">total_amount</br><code>integer</code></td><td style="text-align:left"><p>Sum of order totals.</p></td></tr><tr><td style="text-align:left">total_discount_amount</br><code>integer</code></td><td style="text-align:left"><p>Sum of total discount applied using the promotion tier.</p></td></tr></tbody></table></td></tr></tbody></table> |
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about the promotion tier.</p> |
| validation_rule_assignments | See: [Validation Rule Assignments](#validation-rule-assignments) |
| category_id</br>`string` | <p>Promotion tier category ID.</p> **Example:** <p>cat_0c9da30e7116ba6bba</p> |
| categories | <p>Details about the category assigned to the promotion tier.</p> See: [Category Object](#category-object) |

## Amount
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Applies an amount discount.</p> |
| amount_off</br>`integer` | <p>Amount taken off the subtotal of a price. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 discount is written as 1000. In case of the amount being calculated by the formula, i.e. the <code>amount_off_formula</code> parameter is present in the amount definition, this value becomes the <strong>fallback value</strong>. Such that in a case where the formula cannot be calculated due to missing metadata, for example, this value will be used as the amount off.</p> **Example:** <p>100</p> |
| amount_off_formula</br>`string` | <p>Formula used to calculate the discount.</p> |
| aggregated_amount_limit</br>`integer` | <p>Maximum discount amount per order. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $6 maximum discount on the entire order is written as 600. This value is definable for the following discount effects:</p><ul><li><code>APPLY_TO_ITEMS</code> (each item subtotal is discounted equally)</li><li><code>APPLY_TO_ITEMS_BY_QUANTITY</code> (each unit of matched products has the same discount value)</li></ul> |
| effect</br>`string` | <p>Defines how the discount is applied to the customer's order. The discount effects are defined as follows:</p><ul><li><code>APPLY_TO_ORDER</code> (discount applies to the total order amount)</li><li><code>APPLY_TO_ITEMS</code> (each item subtotal is discounted equally)</li><li><code>APPLY_TO_ITEMS_PROPORTIONALLY</code> (split discount proportionally to amount)</li><li><code>APPLY_TO_ITEMS_PROPORTIONALLY_BY_QUANTITY</code> (split discount proportionally to quantity)</li><li><code>APPLY_TO_ITEMS_BY_QUANTITY</code> (each unit of matched products has the same discount value)</li></ul> Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS`, `APPLY_TO_ITEMS_PROPORTIONALLY`, `APPLY_TO_ITEMS_PROPORTIONALLY_BY_QUANTITY`, `APPLY_TO_ITEMS_BY_QUANTITY` |

## Percentage
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Applies a percentage discount.</p> |
| amount_limit</br>`string` | <p>Upper limit allowed to be applied as a discount per order line item. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $6 maximum discount is written as 600.</p> |
| aggregated_amount_limit</br>`integer` | <p>Maximum discount amount per order. This value is definable for the <code>APPLY_TO_ITEMS</code> discount effect. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $6 maximum discount on the entire order is written as 600.</p> |
| percent_off</br>`integer` | <p>Percent taken off the subtotal amount. In case of the percent being calculated by the formula, i.e. the <code>percent_off_formula</code> parameter is present in the percent definition, this value becomes the <strong>fallback value</strong>. Such that in a case where the formula cannot be calculated due to missing metadata, for example, this value will be used as the percent off.</p> |
| percent_off_formula</br>`string` | <p>Formula used to calculate the discount.</p> |
| effect</br>`string` | <p>Defines how the discount is applied to the customer's order.</p> Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS` |

## Fixed
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Sets a fixed total on cart or item(s) and then calculates the discount to apply.</p> |
| fixed_amount</br>`integer` | <p>Set a fixed valued for an order total or price of an item. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 discount is written as 1000. In case of the fixed amount being calculated by the formula, i.e. the <code>fixed_amount_formula</code> parameter is present in the fixed amount definition, this value becomes the <strong>fallback value</strong>. Such that in a case where the formula cannot be calculated due to missing metadata, for example, this value will be used as the fixed value.</p> **Example:** <p>1000</p> |
| fixed_amount_formula</br>`string` | <p>Formula used to calculate the discounted price of an item or a new order total.</p> |
| effect</br>`string` | <table><thead><tr><th style="text-align:left"><strong>Effect</strong></th><th style="text-align:left"><strong>Definition</strong></th></tr></thead><tbody><tr><td style="text-align:left"><strong>APPLY_TO_ORDER</strong></td><td style="text-align:left">Sets the order total amount to the value of the fixed amount. The discount value is calculated dynamically during the redemption as it's a difference between the total amount of the customer's order and the fixed amount. For example, if the fixed amount is set to equal $10 and the order amount equals $25, then the calculated discount will be $15.</td></tr><tr><td style="text-align:left"><strong>APPLY_TO_ITEMS</strong></td><td style="text-align:left">Sets a new price on items. The total discount amount is dynamically calculated during the redemption and it's a difference between the initial item price and the fixed amount. During the redemption, prices for items will change only if the new price is lower than the original price. If the new product price you set is different from the product price in a collection, then the new product price will be passed during the redemption. If a prodct is in more than one collection, the price is always changed to the lowest price. The new price for products with several SKUs will force the price change for SKUs if their original price is higher than the new price.</td></tr></tbody></table> Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS` |

## Unit, single item
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Applies a full value discount to item(s).</p> |
| unit_off</br>`number` | <p>Number of units to be granted a full value discount. In case of the unit being calculated by the formula, i.e. the <code>unit_off_formula</code> parameter is present in the unit definition, this value becomes the <strong>fallback value</strong>. Such that in a case where the formula cannot be calculated due to missing metadata, for example, this value will be used as the unit value.</p> **Example:** <p>1</p> |
| unit_off_formula</br>`string` | <p>Formula used to calculate the number of units.</p> |
| unit_type</br>`string` | <p>The product deemed as free, chosen from the product  inventory (e.g. time, items).</p> **Example:** <p>prod_f1r5Tpr0DuC7</p> |
| effect</br>`string` | <p>Defines how the unit is added to the customer's order.</p> Available values: `ADD_NEW_ITEMS`, `ADD_MISSING_ITEMS` |

## Unit, multiple items
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Applies a full value discount to item(s).</p> |
| effect</br>`string` | <p>Defines the effect for adding multiple item types.</p> |
| units</br>`array` | <p>Array of objects defining items to be offered for free. Each item type can have a different discount effect assigned.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">unit_off</br><code>integer</code></td><td style="text-align:left"><p>Number of units to be granted a full value discount. In case of the unit being calculated by the formula, i.e. the <code>unit_off_formula</code> parameter is present in the unit definition, this value becomes the <strong>fallback value</strong>. Such that in a case where the formula cannot be calculated due to missing metadata, for example, this value will be used as the unit value.</p> <strong>Example:</strong> <p>1</p></td></tr><tr><td style="text-align:left">unit_off_formula</br><code>string</code></td><td style="text-align:left"><p>Formula used to calculate the number of units.</p></td></tr><tr><td style="text-align:left">unit_type</br><code>string</code></td><td style="text-align:left"><p>The product deemed as free, chosen from the product  inventory (e.g. time, items).</p> <strong>Example:</strong> <p>prod_f1r5Tpr0DuC7</p></td></tr><tr><td style="text-align:left">effect</br><code>string</code></td><td style="text-align:left"><p>Defines how the unit is added to the customer's order.</p> Available values: <code>ADD_NEW_ITEMS</code>, <code>ADD_MISSING_ITEMS</code></td></tr></tbody></table> |

## Shipping
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Applies a full value discount to item(s).</p> |
| unit_off</br>`number` | <p>Subtracts 1 shipping item from the subtotal.</p> |
| unit_type</br>`string` | <p>The shipping product deemed as free.</p> |
| effect</br>`string` | <p>Defines how the unit is added to the customer's order.</p> |

## Validation Rule Assignments
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about validation rule assignments.</p> |
| data_ref</br>`string` | <p>Identifies the name of the JSON property that contains the array of validation rule assignments.</p> |
| data</br>`array` | <p>A dictionary that contains an array of validation rule assignments.</p> Array of [Validation Rule Assignment Object](#validation-rule-assignment-object) |
| total</br>`integer` | <p>Total number of validation rule assignments.</p> |

## Category Object
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique category ID assigned by Voucherify.</p> |
| name</br>`string` | <p>Category name.</p> |
| hierarchy</br>`integer` | <p>Category hierarchy.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the category was created in ISO 8601 format.</p> **Example:** <p>2022-07-14T10:45:13.156Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the category was updated in ISO 8601 format.</p> **Example:** <p>2022-08-16T10:52:08.094Z</p> |
| object</br>`string` | <p>The type of object represented by the JSON. This object stores information about the category.</p> |

## Validation Rule Assignment Object
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Validation rule assignment ID.</p> **Example:** <p>asgm_74F7QZoYbUoljwQO</p> |
| rule_id</br>`string` | <p>Validation rule ID.</p> **Example:** <p>val_4j7DCRm2IS59</p> |
| related_object_id</br>`string` | <p>The resource ID to which the validation rule was assigned.</p> **Example:** <p>v_JtWunK6jUo7X2qOFj0SyRHq4p9tgENlT</p> |
| related_object_type</br>`string` | <p>The type of resource to which the validation rule was assigned.</p> Available values: `voucher`, `campaign`, `earning_rule`, `reward_assignment`, `promotion_tier`, `distribution` |
| created_at</br>`string` | <p>Timestamp representing the date and time when the validation rule assignment was created in ISO 8601 format.</p> **Example:** <p>2022-02-17T08:18:15.085Z</p> |
| object</br>`string` | <p>The type of object represented by the ID.</p> |

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
