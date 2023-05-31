---
title: Customer Activity Object
type: endpoint
category: 639ba2628407100061f5faac
parentDoc: 639ba2658407100061f5fab7
slug: customer-activity-object
hidden: false
order: 1
---

| Attributes |  Description  | Example |
|:-----|:--------|------:|
| id | <p>Unique event ID, assigned by Voucherify.</p> | <p>evcus_0c150c51730c6b60b1</p> |
| type | <p>Event type.</p> Available values: `customer.confirmed`, `customer.created`, `customer.updated`, `customer.deleted`, `customer.referred`, `customer.custom_event`, `customer.segment_entered`, `customer.segment.left`, `customer.sms.sent`, `customer.sms.failed`, `customer.email.sent`, `customer.email.failed`, `customer.activecampaign.sent`, `customer.braze.sent`, `customer.mailchimp.sent`, `customer.intercom.sent`, `customer.intercom.failed`, `customer.rewarded`, `customer.rewarded.loyalty_points`, `customer.voucher.gift.balance_added`, `customer.voucher.loyalty_card.points_added`, `customer.voucher.loyalty_card.points_transferred`, `customer.publication.succeeded`, `customer.publication.failed`, `customer.redemption.succeeded`, `customer.redemption.failed`, `customer.redemption.rollback.succeeded`, `customer.redemption.rollback.failed`, `customer.consents.given`, `customer.consents.revoked` |  |
| data | <p>Contains details about the event. The objects that are returned in the data attribute differ based on the context of the event type.</p> <h2>Customer Activity Data Object</h2> |  |
| created_at | <p>Timestamp representing the date and time when the customer activity occurred in ISO 8601 format.</p> | <p>2022-08-30T09:14:07.660Z</p> |

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]