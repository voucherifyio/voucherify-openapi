---
title: Publication Object
type: basic
categorySlug: voucherify-api
parentDocSlug: publications-api
slug: publication-object
hidden: false
order: 1
---

## Publication Object
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique publication ID, assigned by Voucherify.</p> **Example:** <p>pub_BbjAXnmm8e0SIm3zG8qvvFCP0KuLywtp</p> |
| object</br>`string` | <p>The type of object represented by the JSON. This object stores information about the publication.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the publication was created in ISO 8601 format.</p> **Example:** <p>2022-09-23T09:57:00.434Z</p> |
| customer_id</br>`string` | <p>Unique customer ID of the customer receiving the publication.</p> **Example:** <p>cust_eWgXlBBiY6THFRJwX45Iakv4</p> |
| tracking_id</br>`string` | <p>Customer's <code>source_id</code>.</p> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the publication. A set of key/value pairs that you can attach to a publication object. It can be useful for storing additional information about the publication in a structured format.</p> |
| channel</br>`string` | <p>How the publication was originated. It can be your own custom channel or an example value provided here.</p> Available values: `voucherify-website`, `Dashboard`, `Automation`, `API`, `Braze`, `Reward`, `SMS`, `Email`, `Activecampaign`, `Webhook`, `Intercom`, `Mailchimp`, `Shopify` |
| source_id</br>`string` | <p>The merchant’s publication ID if it is different from the Voucherify publication ID. It's an optional tracking identifier of a publication. It is really useful in case of an integration between multiple systems. It can be a publication ID from a CRM system, database or 3rd-party service.</p> |
| result</br>`string` | <p>Status of the publication attempt.</p> Available values: `SUCCESS`, `FAILURE` |
| customer</br>`object` | <p>Contains information about the customer to whom the publication was directed.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique customer ID, assigned by Voucherify.</p> <strong>Example:</strong> <p>cust_eWgXlBBiY6THFRJwX45Iakv4</p></td></tr><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"><p>Customer's name.</p></td></tr><tr><td style="text-align:left">email</br><code>string</code></td><td style="text-align:left"><p>Customer's email.</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>The merchant’s customer ID if it is different from the Voucherify customer ID. It is really useful in case of an integration between multiple systems. It can be a customer ID from a CRM system, database or 3rd-party service.</p></td></tr><tr><td style="text-align:left">metadata</br><code>object</code></td><td style="text-align:left"><p>A set of custom key/value pairs attached to a customer. The metadata object stores all custom attributes assigned to the customer. It can be useful for storing additional information about the customer in a structured format. This metadata can be used for validating whether the customer qualifies for a discount or it can be used in building customer segments.</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>The type of object represented by the JSON. This object stores information about the customer.</p></td></tr></tbody></table> |
| voucher | <p>Contains information about the voucher being published.</p> Any of: [Discount Voucher](#discount-voucher), [Loyalty Card](#loyalty-card), [Gift Card](#gift-card) |
| vouchers_id</br>`array` | <p>Contains the unique internal voucher ID that was assigned by Voucherify.</p> |

## Discount Voucher
| Attributes |  Description |
|:-----|:--------|
| code</br>`string` | <p>Voucher code.</p> |
| object</br>`string` | <p>The type of object represented by the JSON. This object stores information about the voucher.</p> |
| campaign</br>`string` | <p>Name of voucher's parent campaign.</p> |
| discount | Any of: [Amount](#amount), [Percentage](#percentage), [Fixed](#fixed), [Unit, single item](#unit-single-item), [Unit, multiple items](#unit-multiple-items), [Shipping](#shipping) |
| is_referral_code</br>`boolean` | <p>Whether this voucher is a referral code.</p> |

## Loyalty Card
| Attributes |  Description |
|:-----|:--------|
| code</br>`string` | <p>Voucher code.</p> |
| object</br>`string` | <p>The type of object represented by the JSON. This object stores information about the voucher.</p> |
| campaign</br>`string` | <p>Name of voucher's parent campaign.</p> |
| loyalty_card</br>`object` | <p>Contains information about the loyalty card being published.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>The incremental points to be added to the loyalty card as the initial balance on the card.</p></td></tr><tr><td style="text-align:left">balance</br><code>integer</code></td><td style="text-align:left"><p>The points balance after the incremental points are added to the loyalty card.</p></td></tr></tbody></table> |
| is_referral_code</br>`boolean` | <p>Whether this voucher is a referral code.</p> |

## Gift Card
| Attributes |  Description |
|:-----|:--------|
| code</br>`string` | <p>Voucher code.</p> |
| object</br>`string` | <p>The type of object represented by the JSON. This object stores information about the voucher.</p> |
| campaign</br>`string` | <p>Name of voucher's parent campaign.</p> |
| gift</br>`object` | <p>Contains information about the gift card being published.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">amount</br><code>integer</code></td><td style="text-align:left"><p>The incremental amount to be added as the initial balance on the gift card. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 amount is written as 10000.</p></td></tr><tr><td style="text-align:left">balance</br><code>integer</code></td><td style="text-align:left"><p>The credit balance on the gift card after the initial incremental amount is added to the gift card. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 amount is written as 10000.</p></td></tr><tr><td style="text-align:left">effect</br><code>string</code></td><td style="text-align:left"><p>How the credits are applied to the customer's order.</p> Available values: <code>APPLY_TO_ORDER</code>, <code>APPLY_TO_ITEMS</code></td></tr></tbody></table> |
| is_referral_code</br>`boolean` | <p>Whether this voucher is a referral code.</p> |

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

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
