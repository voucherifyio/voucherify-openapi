---
title: Customer Segment Object
type: basic
categorySlug: voucherify-api
parentDocSlug: segments-api
slug: customer-segment-object
hidden: false
order: 1
---

## Customer Segment Object
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique segment ID.</p> **Example:** <p>seg_1wc52c5z6r1kQ81brO8j9Hk2</p> |
| name</br>`string` | <p>Segment name.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the segment was created in ISO 8601 format.</p> **Example:** <p>2022-05-12T13:01:56.896Z</p> |
| type</br>`string` | <p>Describes whether the segment is dynamic (customers come in and leave based on set criteria) or static (manually selected customers).</p> Available values: `auto-update`, `static` |
| filter</br>`object,null` | <p>Defines a set of criteria for an <code>auto-update</code> segment type.</p> |
| initial_sync_status</br>`string` | Available values: `IN_PROGRESS`, `DONE` |
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about the customer segment.</p> |

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
