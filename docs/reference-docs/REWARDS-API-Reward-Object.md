---
title: Reward Object
type: basic
categorySlug: voucherify-api
parentDocSlug: rewards-api
slug: reward-object
hidden: false
order: 1
---

## Reward Object
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique reward ID, assigned by Voucherify.</p> **Example:** <p>rew_nIy4gHpQHle2c3pNMwuj7G6j</p> |
| name</br>`string` | <p>Reward name.</p> |
| type</br>`string` | <p>Reward type.</p> Available values: `CAMPAIGN`, `COIN`, `MATERIAL` |
| parameters | <p>Defines how the reward is generated.</p> One of: [Digital](#digital), [Pay with Points](#pay-with-points), [Material](#material) |
| stock</br>`integer` | <p>Configurable for <strong>material rewards</strong>. The number of units of the product that you want to share as reward.</p> |
| redeemed</br>`integer` | <p>Defines the number of already invoked (successful) reward redemptions.</p> |
| attributes</br>`object` | <p>These properties are configurable for <strong>material rewards</strong>.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">image_url</br><code>string</code></td><td style="text-align:left"><p>The HTTPS URL pointing to the .png or .jpg file.</p></td></tr><tr><td style="text-align:left">description</br><code>string</code></td><td style="text-align:left"><p>An arbitrary string that you can attach to a material reward.</p></td></tr></tbody></table> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the reward was created in ISO 8601 format.</p> **Example:** <p>2022-08-11T14:49:22.586Z</p> |
| updated_at</br>`string,null` | <p>Timestamp representing the date and time when the reward was updated in ISO 8601 format.</p> **Example:** <p>2022-08-11T16:01:34.885Z</p> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the reward. A set of key/value pairs that you can attach to a reward object. It can be useful for storing additional information about the reward in a structured format.</p> |
| object</br>`string` | <p>The type of object represented by the JSON. This object stores information about the reward.</p> |

## Digital
| Attributes |  Description |
|:-----|:--------|
| campaign | <p>Objects stores information about the campaign related to the reward.</p> Any of: [Discount Coupons](#discount-coupons), [Gift Vouchers](#gift-vouchers), [Points on loyalty card](#points-on-loyalty-card) |

## Pay with Points
| Attributes |  Description |
|:-----|:--------|
| coin</br>`object` | <p>Defines the ratio by mapping the number of loyalty points in <code>points_ratio</code> to a predefined cash amount in <code>exchange_ratio</code>.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">exchange_ratio</br><code>integer</code></td><td style="text-align:left"><p>The cash equivalent of the points defined in the <code>points_ratio</code> property.</p></td></tr><tr><td style="text-align:left">points_ratio</br><code>integer</code></td><td style="text-align:left"><p>The number of loyalty points that will map to the predefined cash amount defined by the <code>exchange_ratio</code> property.</p></td></tr></tbody></table> |

## Material
| Attributes |  Description |
|:-----|:--------|
| product</br>`object` | <p>Contains information about the product given as a reward.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique product ID, assigned by Voucherify.</p> <strong>Example:</strong> <p>prod_0b7d7dfb05cbe5c616</p></td></tr><tr><td style="text-align:left">sku_id</br><code>string,null</code></td><td style="text-align:left"><p>Unique SKU ID, assigned by Voucherify, of the SKU given as a reward.</p> <strong>Example:</strong> <p>sku_0b7d7dfb090be5c619</p></td></tr></tbody></table> |

## Discount Coupons
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique campaign ID, assigned by Voucherify.</p> **Example:** <p>camp_13BbZ0kQsNinhqsX3wUts2UP</p> |
| type</br>`string` | <p>Campaign type.</p> |

## Gift Vouchers
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique campaign ID, assigned by Voucherify.</p> **Example:** <p>camp_13BbZ0kQsNinhqsX3wUts2UP</p> |
| balance</br>`integer` | <p>The incremental amout to be added to the current balance on the gift card. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 amount is written as 10000.</p> |
| type</br>`string` | <p>Campaign type.</p> |

## Points on loyalty card
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique campaign ID, assigned by Voucherify.</p> **Example:** <p>camp_13BbZ0kQsNinhqsX3wUts2UP</p> |
| balance</br>`integer` | <p>The incremental points to be added to the current balance on the loyalty card.</p> |
| type</br>`string` | <p>Campaign type.</p> |

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
