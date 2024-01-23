---
title: Validation Rule Object
type: basic
categorySlug: voucherify-api
parentDocSlug: validation-rules-api
slug: validation-rule-object
hidden: false
order: 1
---

## Validation Rule Response
<p>This is an object representing a validation rule.</p>


| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique validation rule ID.</p> **Example:** <p>val_eR1c41hu0vUU</p> |
| name</br>`string` | <p>Custom, unique name for set of validation rules.</p> **Example:** <p>Business Validation Rule</p> |
| rules | See: [Validation Rule Rules](#validation-rule-rules) |
| error</br>`object` | <p>Contains the error message returned from API when validation / redemption fails to meet requirements of defined rules.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">message</br><code>string</code></td><td style="text-align:left"><p>The error message returned from API when validation / redemption fails to meet requirements of defined rules.</p></td></tr></tbody></table> |
| applicable_to</br>`object,null` |  |
| created_at</br>`string` | <p>Timestamp representing the date and time when the validation rule was created in ISO 8601 format.</p> **Example:** <p>2022-03-23T07:44:00.444Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the validation rule was updated in ISO 8601 format.</p> **Example:** <p>2022-04-26T08:35:54.960Z</p> |
| type</br>`string` | <p>Type of validation rule.</p> Available values: `expression`, `basic`, `advanced`, `complex` |
| context_type</br>`string` | <p>Validation rule context type.</p><table><thead><tr><th style="text-align:left"><strong>Context Type</strong></th><th style="text-align:left"><strong>Definition</strong></th></tr></thead><tbody><tr><td style="text-align:left">earning_rule.order.paid</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">earning_rule.custom_event</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">earning_rule.customer.segment.entered</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.discount_coupons</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.discount_coupons.discount.apply_to_order</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.discount_coupons.discount.apply_to_items</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.discount_coupons.discount.apply_to_items_proportionally</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.discount_coupons.discount.apply_to_items_proportionally_by_quantity</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.discount_coupons.discount.fixed.apply_to_items</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.gift_vouchers</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.gift_vouchers.gift.apply_to_order</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.gift_vouchers.gift.apply_to_items</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.referral_program</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.referral_program.discount.apply_to_order</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.referral_program.discount.apply_to_items</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.referral_program.discount.apply_to_items_proportionally</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.referral_program.discount.apply_to_items_proportionally_by_quantity</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.referral_program.discount.fixed.apply_to_items</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.promotion</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.promotion.discount.apply_to_order</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.promotion.discount.apply_to_items</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.promotion.discount.apply_to_items_proportionally</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.promotion.discount.apply_to_items_proportionally_by_quantity</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.promotion.discount.fixed.apply_to_items</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.loyalty_program</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">campaign.lucky_draw</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">voucher.discount_voucher</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">voucher.discount_voucher.discount.apply_to_order</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">voucher.discount_voucher.discount.apply_to_items</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">voucher.discount_voucher.discount.apply_to_items_proportionally</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">voucher.discount_voucher.discount.apply_to_items_proportionally_by_quantity</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">voucher.discount_voucher.discount.fixed.apply_to_items</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">voucher.gift_voucher</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">voucher.gift_voucher.gift.apply_to_order</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">voucher.gift_voucher.gift.apply_to_items</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">voucher.loyalty_card</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">voucher.lucky_draw_code</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">distribution.custom_event</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">reward_assignment.pay_with_points</td><td style="text-align:left"></td></tr><tr><td style="text-align:left">global</td><td style="text-align:left"></td></tr></tbody></table> Available values: `earning_rule.order.paid`, `earning_rule.custom_event`, `earning_rule.customer.segment.entered`, `earning_rule.customer.tier.joined`, `earning_rule.customer.tier.left`, `earning_rule.customer.tier.upgraded`, `earning_rule.customer.tier.downgraded`, `earning_rule.customer.tier.prolonged`, `campaign.discount_coupons`, `campaign.discount_coupons.discount.apply_to_order`, `campaign.discount_coupons.discount.apply_to_items`, `campaign.discount_coupons.discount.apply_to_items_proportionally`, `campaign.discount_coupons.discount.apply_to_items_proportionally_by_quantity`, `campaign.discount_coupons.discount.apply_to_items_by_quantity`, `campaign.discount_coupons.discount.fixed.apply_to_items`, `campaign.discount_coupons.discount.percent.apply_to_items`, `campaign.gift_vouchers`, `campaign.gift_vouchers.gift.apply_to_order`, `campaign.gift_vouchers.gift.apply_to_items`, `campaign.referral_program`, `campaign.referral_program.discount.apply_to_order`, `campaign.referral_program.discount.apply_to_items`, `campaign.referral_program.discount.apply_to_items_proportionally`, `campaign.referral_program.discount.apply_to_items_proportionally_by_quantity`, `campaign.referral_program.discount.apply_to_items_by_quantity`, `campaign.referral_program.discount.fixed.apply_to_items`, `campaign.referral_program.discount.percent.apply_to_items`, `campaign.promotion`, `campaign.promotion.discount.apply_to_order`, `campaign.promotion.discount.apply_to_items`, `campaign.promotion.discount.apply_to_items_proportionally`, `campaign.promotion.discount.apply_to_items_proportionally_by_quantity`, `campaign.promotion.discount.apply_to_items_by_quantity`, `campaign.promotion.discount.fixed.apply_to_items`, `campaign.promotion.discount.percent.apply_to_items`, `campaign.loyalty_program`, `campaign.lucky_draw`, `voucher.discount_voucher`, `voucher.discount_voucher.discount.apply_to_order`, `voucher.discount_voucher.discount.apply_to_items`, `voucher.discount_voucher.discount.apply_to_items_proportionally`, `voucher.discount_voucher.discount.apply_to_items_proportionally_by_quantity`, `voucher.discount_voucher.discount.apply_to_items_by_quantity`, `voucher.discount_voucher.discount.fixed.apply_to_items`, `voucher.discount_voucher.discount.percent.apply_to_items`, `voucher.gift_voucher`, `voucher.gift_voucher.gift.apply_to_order`, `voucher.gift_voucher.gift.apply_to_items`, `voucher.loyalty_card`, `voucher.lucky_draw_code`, `distribution.custom_event`, `distribution.order.paid`, `distribution.order.created`, `distribution.order.canceled`, `distribution.order.updated`, `reward_assignment.pay_with_points`, `global` |
| assignments_count</br>`integer` | <p>The number of instances the validation rule has been assigned to different types of redeemables.</p> |
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about the validation rule.</p> |

## Validation Rule Rules
<p>Contains all the rule definitions for the validation rule. It is a set of key value pairs representing the rules and logic between the rules. The keys are numbered consequtively beginning from <code>1</code>. The values are objects containing the rule conditions.</p>


| Attributes |  Description |
|:-----|:--------|
| logic</br>`string` | <p>Defines the logic between the rules.</p> **Example:** <p>(1 and 2) and (3)</p> |
| [propertyName]</br>`object` | <p>Contains details about the point balances left on loyalty cards and the number of referred customers in each campaign.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"><p>Voucherify specific rule name.  The list of available names is provided below.</p><p><strong>Name</strong></td></tr><tr><td style="text-align:left">property</br><code>string,null</code></td><td style="text-align:left"><p>Custom name for a metadata property associated with the condition to be satisfied. <strong>Required</strong> if the property <code>name</code> is any of the following:<br>customer_metadata<br>custom_event_metadata<br>order_items_metadata<br>order_metadata<br>product_metadata<br>redemption_metadata</p></td></tr><tr><td style="text-align:left">conditions</td><td style="text-align:left">See: <a href="#validation-rule-conditions">Validation Rule Conditions</a></td></tr><tr><td style="text-align:left">rules</td><td style="text-align:left">See: <a href="#validation-rule-rules">Validation Rule Rules</a></td></tr><tr><td style="text-align:left">error</br><code>object</code></td><td style="text-align:left"><p>Contains the error message returned from API when validation / redemption fails to meet requirements of defined rule.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">message</br><code>string</code></td><td style="text-align:left"><p>The error message returned from API when validation / redemption fails to meet requirements of defined rule.</p></td></tr></tbody></table></td></tr></tbody></table> |

## Validation Rule Conditions
<p>A set of key value pairs representing the condition name and value. The list of available conditions is provided below:</p><table><thead><tr><th><strong>Condition (key)</strong></th><th><strong>Definition</strong></th></tr></thead><tbody><tr><td>$is</td><td>A property is a predefined value.</td></tr><tr><td>$is_not</td><td>A property is not a predefined value.</td></tr><tr><td>$in</td><td>A property either one value in a predefined list of values.</td></tr><tr><td>$less_than</td><td>A property is less than a predefined value.</td></tr><tr><td>$less_than_or_equal</td><td>A property is less than or equal to a predefined value.</td></tr><tr><td>$more_than</td><td>A property is more than a predefined value.</td></tr><tr><td>$more_than_or_equal</td><td>A property is more than or equal to a predefined value.</td></tr><tr><td>$starts_with</td><td>A property starts with the predefined sequence of characters.</td></tr><tr><td>$ends_with</td><td>A property ends with the predefined sequence of characters.</td></tr><tr><td>$contains</td><td>A property contains the predefined sequence of characters.</td></tr><tr><td>$timeframe</td><td> </td></tr><tr><td>$timeframe_absolute</td><td> </td></tr><tr><td>$dow</td><td> </td></tr><tr><td>$count</td><td> </td></tr><tr><td>$count_more</td><td> </td></tr><tr><td>$count_less</td><td> </td></tr><tr><td>$from</td><td> </td></tr></tbody></table>


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

## Any
Any of:

 1. Array any of: string, number, object
 2. string
 3. number
 4. object

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
