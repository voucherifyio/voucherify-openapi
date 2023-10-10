---
title: Loyalty Tier Object
type: basic
categorySlug: voucherify-api
parentDocSlug: loyalties-api
slug: loyalty-tier-object
hidden: false
order: 3
---

## Loyalty Tier Object
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique loyalty tier ID.</p> **Example:** <p>ltr_30KHciA0UG8B71Fo51GZqwgN</p> |
| name</br>`string` | <p>Loyalty Tier name.</p> |
| campaign_id</br>`string` | <p>Unique parent campaign ID.</p> **Example:** <p>camp_fkZ28pe7DUAEmmabofkxHI8N</p> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the loyalty tier. A set of key/value pairs that you can attach to a loyalty tier object. It can be useful for storing additional information about the loyalty tier in a structured format.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the loyalty tier was created in ISO 8601 format.</p> **Example:** <p>2022-11-10T12:20:52.755Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the loyalty tier was updated in ISO 8601 format.</p> **Example:** <p>2022-11-25T10:59:43.231Z</p> |
| earning_rules</br>`object` | <p>Contains a list of earning rule IDs and their points mapping for the given earning rule.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">unique_earning_rule_ID</td><td style="text-align:left"><p>ern_95aq3JaE5A8xzHjoJPYNRqXZ</p> Any of: <a href="#multiply-points">Multiply Points</a>, <a href="#fixed-points">Fixed Points</a></td></tr></tbody></table> |
| rewards</br>`object` | <p>Contains a list of reward IDs and their points mapping for the given reward.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">unique_reward_ID</td><td style="text-align:left"><p>rewa_t88DnSdNnE0IzQX6gqH3jHGQ</p> Any of: <a href="#multiply-points">Multiply Points</a>, <a href="#fixed-points">Fixed Points</a></td></tr></tbody></table> |
| config</br>`object` | <p>Defines loyalty tier range in points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">points</br><code>object</code></td><td style="text-align:left"><p>Defines range of loyalty tier in points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">from</br><code>integer</code></td><td style="text-align:left"><p>Bottom points threshold value.</p></td></tr><tr><td style="text-align:left">to</br><code>integer</code></td><td style="text-align:left"><p>Top points threshold value.</p></td></tr></tbody></table></td></tr></tbody></table> |
| points</br>`object` | <p>Defines range of loyalty tier in points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">from</br><code>integer</code></td><td style="text-align:left"><p>Bottom points threshold value.</p></td></tr><tr><td style="text-align:left">to</br><code>integer</code></td><td style="text-align:left"><p>Top points threshold value.</p></td></tr></tbody></table> |
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about the loyalty.</p> |

## Multiply Points
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Type of calculation.</p> Available values: `MULTIPLY` |
| multiplier</br>`integer` | <p>Multiplication factor used to multiply the points to obtain the mapped points.</p> |

## Fixed Points
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Type of calculation.</p> Available values: `CUSTOM` |
| points</br>`integer` | <p>Fixed number of points to be applied.</p> |

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
