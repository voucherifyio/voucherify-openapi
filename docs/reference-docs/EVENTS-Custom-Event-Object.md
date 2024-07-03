---
title: Custom Event Object
type: basic
categorySlug: voucherify-api
parentDocSlug: events
slug: custom-event-object
hidden: false
order: 1
---

## Events Create Request Body
| Attributes |  Description |
|:-----|:--------|
| event</br>`string` | <p>Event name. This is the same name that you used to define a custom event in the <strong>Dashboard</strong> &gt; <strong>Project Settings</strong> &gt; <strong>Event Schema</strong>.</p> |
| customer | <p>Customer's information.</p> [Customer](#customer) |
| referral</br>`object` | <p>If a <strong>conversion event</strong> for a referral program is set to a custom event, then you need to send the referral code in the payload to make a record of the conversion event.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">code</br><code>string</code></td><td style="text-align:left"><p>A code through which a new visitor has been referred to a service.</p></td></tr><tr><td style="text-align:left">referrer_id</br><code>string</code></td><td style="text-align:left"><p>Unique ID of the referring person - it is optional and not required if the referral <strong>code</strong> is provided.</p> <strong>Example:</strong> <p>cust_Vzck5i8U3OhcEUFY6MKhN9Rv</p></td></tr></tbody></table> |
| loyalty</br>`object` | <p>If an earning rule in a loyalty program is based on a custom event. This objects let's you specify the loyalty card to which the custom event should be attributed to.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">code</br><code>string</code></td><td style="text-align:left"><p>Code of the loyalty card to receive points based on the calculation method defined in the related earning rule. An earning rule is triggered for the loyalty card when the event passed in the <code>event</code> parameter of the request payload gets sent along with this loyalty card code.</p> <strong>Example:</strong> <p>L-CARD-BUHuH6g</p></td></tr></tbody></table> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the event. A set of key/value pairs that you can attach to an event object. It can be useful for storing additional information about the event in a structured format. Event metadata schema is defined in the <strong>Dashboard</strong> &gt; <strong>Project Settings</strong> &gt; <strong>Event Schema</strong> &gt; <strong>Edit particular event</strong> &gt; <strong>Metadata property definition</strong>.</p> |

## Customer
All of:

1. <h3>Customer Id And Source Id</h3><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>The ID of an existing customer.</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier of the customer who validates a voucher. It can be a customer ID or email from a CRM system, database, or a third-party service. If you also pass a customer ID (unique ID assigned by Voucherify), the source ID will be ignored.</p></td></tr></tbody></table>
2. [Customer Base](#customer-base)

## Customer Base
| Attributes |  Description |
|:-----|:--------|
| name</br>`string` | <p>Customer's first and last name.</p> |
| description</br>`string` | <p>An arbitrary string that you can attach to a customer object.</p> |
| email</br>`string` | <p>Customer's email address.</p> |
| phone</br>`string` | <p>Customer's phone number. This parameter is mandatory when you try to send out codes to customers via an SMS channel.</p> |
| birthday</br>`string` | <p><code>Deprecated</code>. <s>Customer's birthdate; format YYYY-MM-DD</s>.</p> |
| birthdate</br>`string` | <p>Customer's birthdate; format YYYY-MM-DD.</p> |
| address</br>`object`, `null` | <p>Customer's address.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">city</br><code>string</code></td><td style="text-align:left"><p>City</p></td></tr><tr><td style="text-align:left">state</br><code>string</code></td><td style="text-align:left"><p>State</p></td></tr><tr><td style="text-align:left">line_1</br><code>string</code></td><td style="text-align:left"><p>First line of address.</p></td></tr><tr><td style="text-align:left">line_2</br><code>string</code></td><td style="text-align:left"><p>Second line of address.</p></td></tr><tr><td style="text-align:left">country</br><code>string</code></td><td style="text-align:left"><p>Country.</p></td></tr><tr><td style="text-align:left">postal_code</br><code>string</code></td><td style="text-align:left"><p>Postal code.</p></td></tr></tbody></table> |
| metadata</br>`object` | <p>A set of custom key/value pairs that you can attach to a customer. The metadata object stores all custom attributes assigned to the customer. It can be useful for storing additional information about the customer in a structured format. This metadata can be used for validating whether the customer qualifies for a discount or it can be used in building customer segments.</p> |

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
