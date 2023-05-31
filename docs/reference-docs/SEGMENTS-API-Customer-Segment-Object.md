---
title: Customer Segment Object
type: endpoint
category: 639ba2628407100061f5faac
parentDoc: 639ba2658407100061f5fabc
slug: customer-segment-object
hidden: false
order: 1
---

| Attributes |  Description  | Example |
|:-----|:--------|------:|
| id | <p>Unique segment ID.</p> | <p>seg_1wc52c5z6r1kQ81brO8j9Hk2</p> |
| name | <p>Segment name.</p> |  |
| created_at | <p>Timestamp representing the date and time when the segment was created in ISO 8601 format.</p> | <p>2022-05-12T13:01:56.896Z</p> |
| type | <p>Describes whether the segment is dynamic (customers come in and leave based on set criteria) or static (manually selected customers).</p> Available values: `auto-update`, `static` |  |
| filter | <p>Defines a set of criteria for an <code>auto-update</code> segment type.</p> |  |
| initial_sync_status | Available values: `IN_PROGRESS`, `DONE` |  |
| object | <p>The type of object represented by JSON. This object stores information about the customer segment.</p> |  |


[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]