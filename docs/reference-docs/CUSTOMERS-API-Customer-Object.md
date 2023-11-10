---
title: Customer Object
type: basic
categorySlug: voucherify-api
parentDocSlug: customers-api
slug: customer-object
hidden: false
order: 1
---

## Customer Response
All of:

1. <h3>Customer Response Data</h3><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>The ID of an existing customer that will be linked to redemption in this request.</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier of the customer who validates a voucher. It can be a customer ID or email from a CRM system, database, or a third-party service. If you also pass a customer ID (unique ID assigned by Voucherify), the source ID will be ignored.</p></td></tr><tr><td style="text-align:left">summary</br><code>object,null</code></td><td style="text-align:left"></td></tr><tr><td style="text-align:left">loyalty</br><code>object,null</code></td><td style="text-align:left"></td></tr><tr><td style="text-align:left">referrals</br><code>object,null</code></td><td style="text-align:left"></td></tr><tr><td style="text-align:left">system_metadata</br><code>object</code></td><td style="text-align:left"><p>Object used to store system metadata information.</p></td></tr><tr><td style="text-align:left">created_at</br><code>string</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the customer was created in ISO 8601 format.</p> <strong>Example:</strong> <p>2022-08-30T06:32:07.380Z</p></td></tr><tr><td style="text-align:left">updated_at</br><code>string</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the customer was updated in ISO 8601 format.</p> <strong>Example:</strong> <p>2022-08-31T06:32:07.380Z</p></td></tr><tr><td style="text-align:left">assets</br><code>object</code></td><td style="text-align:left"><p>Contains information about the customer's cockpit.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">cockpit_url</br><code>string</code></td><td style="text-align:left"><p>Customer's cockpit URL address.</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>The type of object represented by JSON.</p> Available values: <code>customer</code></td></tr></tbody></table>
2. [Customer Base](#customer-base)

## Customer Base
| Attributes |  Description |
|:-----|:--------|
| name</br>`string` | <p>Customer's first and last name.</p> |
| description</br>`string` | <p>An arbitrary string that you can attach to a customer object.</p> |
| email</br>`string` | <p>Customer's email address.</p> |
| phone</br>`string` | <p>Customer's phone number. This parameter is mandatory when you try to send out codes to customers via an SMS channel.</p> |
| birthday</br>`string` | <p><em>Deprecated</em> Customer's birthdate; format YYYY-MM-DD.</p> |
| birthdate</br>`string` | <p>Customer's birthdate; format YYYY-MM-DD.</p> |
| address</br>`object,null` | <p>Customer's address.</p> |
| metadata</br>`object` | <p>A set of custom key/value pairs that you can attach to a customer. The metadata object stores all custom attributes assigned to the customer. It can be useful for storing additional information about the customer in a structured format. This metadata can be used for validating whether the customer qualifies for a discount or it can be used in building customer segments.</p> |

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
