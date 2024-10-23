---
title: Reward Assignment Object
type: basic
categorySlug: voucherify-api
parentDocSlug: rewards
slug: reward-assignment-object
hidden: false
order: 2
---

## Reward Assignment
All of:

1. [Reward Assignment Base](#reward-assignment-base)
2. [Digital or Material Reward - Parameters](#digital-or-material-reward---parameters)

## Reward Assignment Base
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique reward assignment ID, assigned by Voucherify.</p> **Example:** <p>rewa_PbIRoMXpwe5QhobW4JKu0VjH</p> |
| reward_id</br>`string` | <p>Associated reward ID.</p> **Example:** <p>rew_C7wS9eHFDN4CIbXI5PpLSkGY</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the reward assignment was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-08-11T14:49:22.586Z</p> |
| updated_at</br>`string`, `null` | <p>Timestamp representing the date and time when the reward assignment was updated. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-08-11T16:01:34.885Z</p> |
| object</br>`string` | <p>The type of the object represented by the JSON. This object stores information about the reward assignment.</p> Available values: `reward_assignment` |
| related_object_id</br>`string` | <p>Related object ID to which the reward was assigned.</p> **Example:** <p>camp_wciTvaOfYmAa3EmIIW3QpXXZ</p> |
| related_object_type</br>`string` | <p>Related object type to which the reward was assigned.</p> Available values: `campaign` |

## Digital or Material Reward - Parameters
| Attributes |  Description |
|:-----|:--------|
| parameters</br>`object` | <p>Defines the cost of the reward.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">loyalty</br><code>object</code></td><td style="text-align:left"><p>Defines the equivalent points value of the reward.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>The number of points required to redeem the reward.</p></td></tr><tr><td style="text-align:left">auto_redeem</br><code>boolean</code>, <code>null</code></td><td style="text-align:left"><p>Determines if the reward is redeemed automatically when the customer reaches the sufficient number of points to redeem it. Value <code>true</code> means that the automatic reward redemption is active. Only one reward can be set to be redeemed automatically in a loyalty campaign, i.e. only one can have the value <code>true</code>.</p></td></tr></tbody></table></td></tr></tbody></table> |

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
