---
title: Reward Assignment Object
type: endpoint
category: 639ba2628407100061f5faac
parentDoc: 639ba2658407100061f5fab1
slug: reward-assignment-object
hidden: false
order: 2
---

| Attributes |  Description  | Example |
|:-----|:--------|------:|
| id | <p>Unique reward assignment ID, assigned by Voucherify.</p> | <p>rewa_PbIRoMXpwe5QhobW4JKu0VjH</p> |
| reward_id | <p>Associated reward ID.</p> | <p>rew_C7wS9eHFDN4CIbXI5PpLSkGY</p> |
| related_object_id | <p>Related object ID to which the reward was assigned.</p> | <p>camp_wciTvaOfYmAa3EmIIW3QpXXZ</p> |
| related_object_type | <p>Related object type to which the reward was assigned.</p> | <p>campaign</p> |
| parameters | <p>Defines the cost of the reward.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th><th style="text-align:right">Example</th></tr></thead><tbody><tr><td style="text-align:left">loyalty</td><td style="text-align:left"><p>Defines the equivalent points value of the reward.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th><th style="text-align:right">Example</th></tr></thead><tbody><tr><td style="text-align:left">points</td><td style="text-align:left"><p>The number of points required to redeem the reward.</p></td><td style="text-align:right"></td></tr></tbody></table></td><td style="text-align:right"></td></tr></tbody></table> |  |
| created_at | <p>Timestamp representing the date and time when the reward assignment was created in ISO 8601 format.</p> | <p>2022-08-11T14:49:22.586Z</p> |
| updated_at | <p>Timestamp representing the date and time when the reward assignment was updated in ISO 8601 format.</p> | <p>2022-08-11T16:01:34.885Z</p> |
| object | <p>The type of object represented by the JSON. This object stores information about the reward assignment.</p> |  |

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]