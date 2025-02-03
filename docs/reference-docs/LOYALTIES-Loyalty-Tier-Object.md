---
title: Loyalty Tier Object
type: basic
categorySlug: voucherify-api
parentDocSlug: loyalties
slug: loyalty-tier-object
hidden: false
order: 30
---

## Loyalty Tier
All of:

1. [Loyalty Tier Base](#loyalty-tier-base)
2. <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique loyalty tier ID.</p></td></tr><tr><td style="text-align:left">campaign_id</br><code>string</code></td><td style="text-align:left"><p>Unique parent campaign ID.</p></td></tr><tr><td style="text-align:left">metadata</br><code>object</code>, <code>null</code></td><td style="text-align:left"><p>The metadata object stores all custom attributes assigned to the loyalty tier. A set of key/value pairs that you can attach to a loyalty tier object. It can be useful for storing additional information about the loyalty tier in a structured format.</p></td></tr><tr><td style="text-align:left">created_at</br><code>string</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the loyalty tier was created. The value is shown in the ISO 8601 format.</p></td></tr><tr><td style="text-align:left">updated_at</br><code>string</code>, <code>null</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the loyalty tier was updated. The value is shown in the ISO 8601 format.</p></td></tr><tr><td style="text-align:left">config</br><code>object</code></td><td style="text-align:left"><p>Defines loyalty tier range in points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">points</br><code>object</code></td><td style="text-align:left"><p>Defines range of loyalty tier in points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">from</br><code>integer</code></td><td style="text-align:left"><p>Bottom points threshold value.</p></td></tr><tr><td style="text-align:left">to</br><code>integer</code></td><td style="text-align:left"><p>Top points threshold value.</p></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="text-align:left">expiration</td><td style="text-align:left">See: <a href="#loyalty-tier-expiration">Loyalty Tier Expiration</a></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>The type of the object represented by JSON. This object stores information about the loyalty.</p> Available values: <code>loyalty_tier</code></td></tr></tbody></table>

## Loyalty Tier Base
| Attributes |  Description |
|:-----|:--------|
| name</br>`string` | <p>Loyalty Tier name.</p> |
| earning_rules</br>`object` | <p>Contains a list of earning rule IDs and their points mapping for the given earning rule.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">[propertyName]</td><td style="text-align:left">See: <a href="#mappingpoints">MappingPoints</a></td></tr></tbody></table> |
| rewards</br>`object` | <p>Contains a list of reward IDs and their points mapping for the given reward.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">[propertyName]</td><td style="text-align:left">See: <a href="#mappingpoints">MappingPoints</a></td></tr></tbody></table> |
| points</br>`object` | <p>Defines range of loyalty tier in points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">from</br><code>integer</code></td><td style="text-align:left"><p>Bottom points threshold value.</p></td></tr><tr><td style="text-align:left">to</br><code>integer</code></td><td style="text-align:left"><p>Top points threshold value.</p></td></tr></tbody></table> |

## Loyalty Tier Expiration
| Attributes |  Description |
|:-----|:--------|
| customer_id</br>`string` | <p>Unique customer identifier of the customer making the purchase. The ID is assigned by Voucherify.</p> **Example:** <p>cust_7iUa6ICKyU6gH40dBU25kQU1</p> |
| campaign_id</br>`string` | <p>Unique campaign ID, assigned by Voucherify.</p> **Example:** <p>camp_rRsfatlwN7unSeUIJDCYedal</p> |
| tier_id</br>`string` | <p>Unique tier ID, assigned by Voucherify.</p> |
| start_date</br>`string` | <p>Activation timestamp defines when the loyalty tier starts to be active in ISO 8601 format. Loyalty tier is inactive before this date.</p> |
| expiration_date</br>`string` | <p>Expiration timestamp defines when the loyalty tier expires in ISO 8601 format. Loyalty tier is inactive after this date.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the loyalty tier was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2021-12-22T10:13:06.487Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the loyalty tier was updated. The value is shown in the ISO 8601 format.</p> **Example:** <p>2021-12-22T10:13:06.487Z</p> |

## MappingPoints
One of:

[MappingMultiply](#mappingmultiply), [MappingFixed](#mappingfixed)

## MappingMultiply
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Type of calculation.</p> Available values: `MULTIPLY` |
| multiplier</br>`number` | <p>Multiplication factor used to multiply the points to obtain the mapped points.</p> |

## MappingFixed
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Type of calculation.</p> Available values: `CUSTOM` |
| points</br>`integer` | <p>Fixed number of points to be applied.</p> |

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]