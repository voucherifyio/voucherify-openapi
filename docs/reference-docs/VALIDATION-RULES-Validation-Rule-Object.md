---
title: Validation Rule Object
type: basic
categorySlug: voucherify-api
parentDocSlug: validation-rules
slug: validation-rule-object
hidden: false
order: 1
---

## Validation Rule
All of:

1. [Validation Rule Base](#validation-rule-base)
2. <h3>Validation Rule</h3><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique validation rule ID.</p> <strong>Example:</strong> <p>val_eR1c41hu0vUU</p></td></tr><tr><td style="text-align:left">created_at</br><code>string</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the validation rule was created in ISO 8601 format.</p> <strong>Example:</strong> <p>2022-03-23T07:44:00.444Z</p></td></tr><tr><td style="text-align:left">updated_at</br><code>string</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the validation rule was updated in ISO 8601 format.</p> <strong>Example:</strong> <p>2022-04-26T08:35:54.960Z</p></td></tr><tr><td style="text-align:left">assignments_count</br><code>integer</code></td><td style="text-align:left"><p>The number of instances the validation rule has been assigned to different types of redeemables.</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>The type of object represented by JSON. This object stores information about the validation rule.</p></td></tr></tbody></table>

## Validation Rule Base
| Attributes |  Description |
|:-----|:--------|
| name</br>`string` | <p>Custom, unique name for set of validation rules.</p> **Example:** <p>Business Validation Rule</p> |
| rules | See: [Validation Rule Rules](#validation-rule-rules) |
| error</br>`object` | <p>Contains the error message returned from API when validation / redemption fails to meet requirements of defined rules.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">message</br><code>string</code></td><td style="text-align:left"><p>The error message returned from API when validation / redemption fails to meet requirements of defined rules.</p></td></tr></tbody></table> |
| applicable_to</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">excluded</br><code>array</code></td><td style="text-align:left"><p>Defines which items are excluded from a discount.</p> Array of <a href="#applicable-to">Applicable To</a></td></tr><tr><td style="text-align:left">included</br><code>array</code></td><td style="text-align:left"><p>Defines which items are included in a discount.</p> Array of <a href="#applicable-to">Applicable To</a></td></tr><tr><td style="text-align:left">included_all</br><code>boolean</code></td><td style="text-align:left"><p>Indicates whether all items are included in the discount.</p></td></tr></tbody></table> |
| type</br>`string` | <p>Type of validation rule.</p> Available values: `expression`, `basic`, `advanced`, `complex` |
| context_type</br>`string` | <p>Validation rule context type.</p><table><thead><tr><th style="text-align:left"><strong>Context Type</strong></th><th style="text-align:left"><strong>Definition</strong></th></tr></thead><tbody><tr><td style="text-align:left">earning_rule.order.paid</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">earning_rule.custom_event</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">earning_rule.customer.segment.entered</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.discount_coupons</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.discount_coupons.discount.apply_to_order</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.discount_coupons.discount.apply_to_items</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.discount_coupons.discount.apply_to_items_proportionally</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.discount_coupons.discount.apply_to_items_proportionally_by_quantity</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.discount_coupons.discount.fixed.apply_to_items</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.gift_vouchers</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.gift_vouchers.gift.apply_to_order</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.gift_vouchers.gift.apply_to_items</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.referral_program</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.referral_program.discount.apply_to_order</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.referral_program.discount.apply_to_items</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.referral_program.discount.apply_to_items_proportionally</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.referral_program.discount.apply_to_items_proportionally_by_quantity</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.referral_program.discount.fixed.apply_to_items</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.promotion</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.promotion.discount.apply_to_order</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.promotion.discount.apply_to_items</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.promotion.discount.apply_to_items_proportionally</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.promotion.discount.apply_to_items_proportionally_by_quantity</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.promotion.discount.fixed.apply_to_items</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.loyalty_program</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.lucky_draw</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">voucher.discount_voucher</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">voucher.discount_voucher.discount.apply_to_order</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">voucher.discount_voucher.discount.apply_to_items</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">voucher.discount_voucher.discount.apply_to_items_proportionally</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">voucher.discount_voucher.discount.apply_to_items_proportionally_by_quantity</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">voucher.discount_voucher.discount.fixed.apply_to_items</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">voucher.gift_voucher</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">voucher.gift_voucher.gift.apply_to_order</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">voucher.gift_voucher.gift.apply_to_items</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">voucher.loyalty_card</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">voucher.lucky_draw_code</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">distribution.custom_event</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">reward_assignment.pay_with_points</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">global</td><td style="text-align:left"></td></tr></tbody></table> Available values: `earning_rule.order.paid`, `earning_rule.custom_event`, `earning_rule.customer.segment.entered`, `earning_rule.customer.tier.joined`, `earning_rule.customer.tier.left`, `earning_rule.customer.tier.upgraded`, `earning_rule.customer.tier.downgraded`, `earning_rule.customer.tier.prolonged`, `campaign.discount_coupons`, `campaign.discount_coupons.discount.apply_to_order`, `campaign.discount_coupons.discount.apply_to_items`, `campaign.discount_coupons.discount.apply_to_items_proportionally`, `campaign.discount_coupons.discount.apply_to_items_proportionally_by_quantity`, `campaign.discount_coupons.discount.apply_to_items_by_quantity`, `campaign.discount_coupons.discount.fixed.apply_to_items`, `campaign.discount_coupons.discount.percent.apply_to_items`, `campaign.gift_vouchers`, `campaign.gift_vouchers.gift.apply_to_order`, `campaign.gift_vouchers.gift.apply_to_items`, `campaign.referral_program`, `campaign.referral_program.discount.apply_to_order`, `campaign.referral_program.discount.apply_to_items`, `campaign.referral_program.discount.apply_to_items_proportionally`, `campaign.referral_program.discount.apply_to_items_proportionally_by_quantity`, `campaign.referral_program.discount.apply_to_items_by_quantity`, `campaign.referral_program.discount.fixed.apply_to_items`, `campaign.referral_program.discount.percent.apply_to_items`, `campaign.promotion`, `campaign.promotion.discount.apply_to_order`, `campaign.promotion.discount.apply_to_items`, `campaign.promotion.discount.apply_to_items_proportionally`, `campaign.promotion.discount.apply_to_items_proportionally_by_quantity`, `campaign.promotion.discount.apply_to_items_by_quantity`, `campaign.promotion.discount.fixed.apply_to_items`, `campaign.promotion.discount.percent.apply_to_items`, `campaign.loyalty_program`, `campaign.lucky_draw`, `voucher.discount_voucher`, `voucher.discount_voucher.discount.apply_to_order`, `voucher.discount_voucher.discount.apply_to_items`, `voucher.discount_voucher.discount.apply_to_items_proportionally`, `voucher.discount_voucher.discount.apply_to_items_proportionally_by_quantity`, `voucher.discount_voucher.discount.apply_to_items_by_quantity`, `voucher.discount_voucher.discount.fixed.apply_to_items`, `voucher.discount_voucher.discount.percent.apply_to_items`, `voucher.gift_voucher`, `voucher.gift_voucher.gift.apply_to_order`, `voucher.gift_voucher.gift.apply_to_items`, `voucher.loyalty_card`, `voucher.lucky_draw_code`, `distribution.custom_event`, `distribution.order.paid`, `distribution.order.created`, `distribution.order.canceled`, `distribution.order.updated`, `reward_assignment.pay_with_points`, `global` |

## Validation Rule Rules
| Attributes |  Description |
|:-----|:--------|
| logic</br>`string` | <p>Defines the logic between the rules.</p> **Example:** <p>(1 and 2) and (3)</p> |
| [propertyName]</br>`object` | <p>Contains details about the point balances left on loyalty cards and the number of referred customers in each campaign.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"><p>Voucherify specific rule name.  The list of available names is provided below.</p><p><strong>Name</strong></td></tr><tr><td style="text-align:left">property</br><code>string</code>, <code>null</code></td><td style="text-align:left"><p>Custom name for a metadata property associated with the condition to be satisfied. <strong>Required</strong> if the property <code>name</code> is any of the following:<br>customer_metadata<br>custom_event_metadata<br>order_items_metadata<br>order_metadata<br>product_metadata<br>redemption_metadata</p></td></tr><tr><td style="text-align:left">conditions</td><td style="text-align:left">See: <a href="#validation-rule-conditions">Validation Rule Conditions</a></td></tr><tr><td style="text-align:left">rules</td><td style="text-align:left">See: <a href="#validation-rule-rules">Validation Rule Rules</a></td></tr><tr><td style="text-align:left">error</br><code>object</code></td><td style="text-align:left"><p>Contains the error message returned from API when validation / redemption fails to meet requirements of defined rule.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">message</br><code>string</code></td><td style="text-align:left"><p>The error message returned from API when validation / redemption fails to meet requirements of defined rule.</p></td></tr></tbody></table></td></tr></tbody></table> |

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

## Validation Rule Conditions
| Attributes |  Description |
|:-----|:--------|
| $is | See: [Any](#any) |
| $is_not | See: [Any](#any) |
| $in | See: [Any](#any) |
| $not_in | See: [Any](#any) |
| $less_than | See: [Any](#any) |
| $less_than_or_equal | See: [Any](#any) |
| $more_than | See: [Any](#any) |
| $more_than_or_equal | See: [Any](#any) |
| $starts_with | See: [Any](#any) |
| $ends_with | See: [Any](#any) |
| $contains | See: [Any](#any) |
| $timeframe | See: [Any](#any) |
| $timeframe_absolute | See: [Any](#any) |
| $dow | See: [Any](#any) |
| $count | See: [Any](#any) |
| $count_more | See: [Any](#any) |
| $count_less | See: [Any](#any) |
| $from | See: [Any](#any) |

## Applicable To Effect
Available values: `APPLY_TO_EVERY`, `APPLY_TO_CHEAPEST`, `APPLY_TO_MOST_EXPENSIVE`

## Any
One of:

 1. Array any of: string, number, object
 2. string
 3. number
 4. object

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]