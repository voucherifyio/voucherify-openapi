---
title: Metadata Schema Object
type: basic
categorySlug: voucherify-api
parentDocSlug: metadata-schemas
slug: metadata-schema-object
hidden: false
order: 1
---

## Metadata Schema Object
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique metadata schema ID.</p> **Example:** <p>ms_OF36L2rk4EqhdxvZs56IW9iE</p> |
| related_object</br>`string` | <p>The resource type. There is an infinite number of possibilities for the resource type because you can define custom metadata schemas. Some examples are included here to show you the standard metadata schema resource types.</p> Available values: `campaign`, `customer`, `earning_rule`, `loyalty_tier`, `order`, `order_item`, `product`, `promotion_tier`, `publication`, `redemption`, `reward`, `voucher` |
| properties</br>`object` | <p>Contains the metadata definitions. There can be many properties within this object.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">custom_property_name</br><code>object</code></td><td style="text-align:left"><p>Custom property name. This is defined in <strong>Project Settings</strong> &gt; <strong>Metadata Schema</strong> in the Dashboard.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">type</br><code>string</code></td><td style="text-align:left">Available values: <code>string</code>, <code>number</code>, <code>object</code>, <code>date</code>, <code>datetime</code>, <code>geopoint</code>, <code>boolean</code>, <code>image_url</code></td></tr><tr><td style="text-align:left">array</br><code>boolean</code></td><td style="text-align:left"><p>Indicates whether the definition is an array.</p></td></tr><tr><td style="text-align:left">optional</br><code>boolean</code></td><td style="text-align:left"><p>Indicates whether this definition is optional or not optional for the resource.</p></td></tr><tr><td style="text-align:left">objectType</br><code>string</code>, <code>null</code></td><td style="text-align:left"><p>Returns the name of the custom resource if the resource was previously defined in the Dashboard as a custom (non-standard) Nested object.</p></td></tr><tr><td style="text-align:left">eq</br><code>array</code></td><td style="text-align:left"><p>Array of possible values when the setting for <code>is equal to any of</code> in the Dashboard is defined explicitly.</p></td></tr><tr><td style="text-align:left">ne</br><code>array</code></td><td style="text-align:left"><p>Array of values that are not allowed when the setting for <code>is not equal to any of</code> in the Dashboard is defined explicitly.</p></td></tr><tr><td style="text-align:left">lt</br><code>integer</code></td><td style="text-align:left"><p>A property of <code>number</code> type must have <code>less than</code> this value.</p></td></tr><tr><td style="text-align:left">lte</br><code>integer</code></td><td style="text-align:left"><p>A property of <code>number</code> type must be <code>less than or equal</code> to this value.</p></td></tr><tr><td style="text-align:left">gt</br><code>integer</code></td><td style="text-align:left"><p>A property of <code>number</code> type must be <code>greater than</code> this value.</p></td></tr><tr><td style="text-align:left">gte</br><code>integer</code></td><td style="text-align:left"><p>A property of <code>number</code> type must be <code>greater than or equal</code> to this value.</p></td></tr><tr><td style="text-align:left">deleted</br><code>boolean</code></td><td style="text-align:left"><p>Indicates whether the definition was deleted from the schema.</p></td></tr><tr><td style="text-align:left">maxLength</br><code>integer</code></td><td style="text-align:left"><p>Value for maximum length when the setting for <code>has maximum length of</code> in the Dashboard is defined explicitly.</p></td></tr><tr><td style="text-align:left">minLength</br><code>integer</code></td><td style="text-align:left"><p>Value indicating minimum length when the setting for <code>has minimum length of</code> in the Dashboard is defined explicitly.</p></td></tr><tr><td style="text-align:left">exactLength</br><code>integer</code></td><td style="text-align:left"><p>Value indicating exact length when the setting for <code>has exact length of</code> in the Dashboard is defined explicitly.</p></td></tr></tbody></table></td></tr></tbody></table> |
| allow_defined_only</br>`boolean` | <p>Restricts the creation of metadata fields when set to <code>true</code>. In other words, it indicates whether or not you are allowed to create new metadata definitions; for example, in the campaign manager or publication manager. If it is set to true, then only the defined fields will be available for assigning values.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the metadata schema was created in ISO 8601 format.</p> **Example:** <p>2021-12-03T13:33:44.556Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the metadata schema was updated in ISO 8601 format.</p> **Example:** <p>2022-08-11T08:05:30.695Z</p> |
| object</br>`string` | <p>The type of object represented by the JSON. This object stores information about the metadata schema.</p> |

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]