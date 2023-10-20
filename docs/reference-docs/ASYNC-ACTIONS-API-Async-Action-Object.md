---
title: Async Action Object
type: basic
categorySlug: voucherify-api
parentDocSlug: async-actions-api
slug: async-action-object
hidden: false
order: 1
---

## Async Action Object
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Async action unique ID.</p> **Example:** <p>aa_0adad13d6f057f088e</p> |
| type</br>`string` | <p>Type of async action.</p> Available values: `CAMPAIGN.VOUCHERS_IMPORT`, `CAMPAIGN.VOUCHERS_IMPORT_CSV`, `CAMPAIGN.VOUCHERS_UPDATE`, `CAMPAIGN.VOUCHERS_DELETE`, `CAMPAIGN.VOUCHERS_GENERATE`, `CAMPAIGNS.METADATA_KEY_PURGE`, `CUSTOMERS.IMPORT_CSV`, `CUSTOMERS.BULK_UPDATE`, `CUSTOMERS.METADATA_UPDATE`, `CUSTOMERS.METADATA_KEY_PURGE`, `PRODUCTS.BULK_UPDATE`, `PRODUCTS.METADATA_UPDATE`, `PRODUCTS.METADATA_KEY_PURGE`, `PRODUCTS.IMPORT_CSV`, `SKUS.IMPORT_CSV`, `VOUCHERS.IMPORT`, `VOUCHERS.IMPORT_CSV`, `VOUCHERS.BULK_UPDATE`, `VOUCHERS.METADATA_UPDATE`, `VOUCHERS.METADATA_KEY_PURGE`, `ORDERS.IMPORT`, `ORDERS.METADATA_KEY_PURGE` |
| status</br>`string` | <p>Status of async action. Informs you whether the async action has already been completed.</p> Available values: `ENQUEUED`, `IN_PROGRESS`, `DONE`, `FAILED` |
| result | Any of: [CAMPAIGN.VOUCHERS_IMPORT](#campaign.vouchers_import), [CAMPAIGN.VOUCHERS_IMPORT_CSV](#campaign.vouchers_import_csv), [CAMPAIGN.VOUCHERS_UPDATE](#campaign.vouchers_update), [CAMPAIGN.VOUCHERS_DELETE](#campaign.vouchers_delete), [CAMPAIGN.VOUCHERS_GENERATE](#campaign.vouchers_generate), [CAMPAIGNS.METADATA_KEY_PURGE](#campaigns.metadata_key_purge), [CUSTOMERS.IMPORT_CSV](#customers.import_csv), [CUSTOMERS.BULK_UPDATE](#customers.bulk_update), [CUSTOMERS.METADATA_UPDATE](#customers.metadata_update), [CUSTOMERS.METADATA_KEY_PURGE](#customers.metadata_key_purge), [PRODUCTS.BULK_UPDATE](#products.bulk_update), [PRODUCTS.METADATA_UPDATE](#products.metadata_update), [PRODUCTS.IMPORT_CSV](#products.import_csv), [SKUS.IMPORT_CSV](#skus.import_csv), [PRODUCTS.METADATA_KEY_PURGE](#products.metadata_key_purge), [VOUCHERS.IMPORT](#vouchers.import), [VOUCHERS.IMPORT_CSV](#vouchers.import_csv), [VOUCHERS.BULK_UPDATE](#vouchers.bulk_update), [VOUCHERS.METADATA_UPDATE](#vouchers.metadata_update), [VOUCHERS.METADATA_KEY_PURGE](#vouchers.metadata_key_purge), [ORDERS.IMPORT](#orders.import), [ORDERS.METADATA_KEY_PURGE](#orders.metadata_key_purge) |
| created_at</br>`string` | <p>Timestamp representing the date and time when the async action was scheduled in ISO 8601 format.</p> **Example:** <p>2022-06-23T11:21:45.578Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the async action was updated in ISO 8601 format.</p> **Example:** <p>2022-06-23T11:21:46.795Z</p> |
| request_id</br>`string` | <p>Unique request ID.</p> **Example:** <p>v-0b45cee140c3c9b5ca</p> |
| processing_time</br>`integer` | <p>The length of time it took to process the request in milliseconds.</p> **Example:** <p>1217</p> |
| progress</br>`integer` | <p>% progress to completion of the asynchronous action.</p> |
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about the <code>async_action</code>.</p> |

## CAMPAIGN.VOUCHERS_IMPORT
| Attributes |  Description |
|:-----|:--------|
| message</br>`string` | <p>A human-readable message providing a short description about the result.</p> |
| failed</br>`array` | <p>If any records failed during the process, this array shows the failure details.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">code</br><code>string</code></td><td style="text-align:left"><p>Unique voucher code.</p></td></tr><tr><td style="text-align:left">reason</br><code>string</code></td><td style="text-align:left"><p>Detailed failure cause for the voucher code import.</p></td></tr></tbody></table> |
| done_count</br>`integer` | <p>Number of resources processed successfully.</p> |
| failed_count</br>`integer` | <p>Number of resources failed to process.</p> |

## CAMPAIGN.VOUCHERS_IMPORT_CSV
| Attributes |  Description |
|:-----|:--------|
| message</br>`string` | <p>A human-readable message providing a short description about the result.</p> |
| failed</br>`array` | <p>If any records failed during the process, this array shows the failure details.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">code</br><code>string</code></td><td style="text-align:left"><p>Unique voucher code.</p></td></tr><tr><td style="text-align:left">row</br><code>integer</code></td><td style="text-align:left"><p>The CSV file row number where the code definition is recorded. The row counter excludes the file headers row.</p></td></tr><tr><td style="text-align:left">reason</br><code>string</code></td><td style="text-align:left"><p>Detailed failure cause for the voucher code import.</p></td></tr></tbody></table> |
| done_count</br>`integer` | <p>Number of resources processed successfully.</p> |
| failed_count</br>`integer` | <p>Number of resources failed to process.</p> |

## CAMPAIGN.VOUCHERS_UPDATE
| Attributes |  Description |
|:-----|:--------|
| message</br>`string` | <p>A human-readable message providing a short description about the result.</p> |
| done_count</br>`integer` | <p>Number of resources processed successfully.</p> |

## CAMPAIGN.VOUCHERS_DELETE
| Attributes |  Description |
|:-----|:--------|
| message</br>`string` | <p>A human-readable message providing a short description about the result.</p> |
| done_count</br>`integer` | <p>Number of resources processed successfully.</p> |

## CAMPAIGN.VOUCHERS_GENERATE
| Attributes |  Description |
|:-----|:--------|
| message</br>`string` | <p>A human-readable message providing a short description about the result.</p> |
| done_count</br>`integer` | <p>Number of resources processed successfully.</p> |

## CAMPAIGNS.METADATA_KEY_PURGE
| Attributes |  Description |
|:-----|:--------|
| message</br>`string` | <p>A human-readable message providing a short description about the result.</p> |
| done_count</br>`integer` | <p>Number of resources processed successfully.</p> |

## CUSTOMERS.IMPORT_CSV
| Attributes |  Description |
|:-----|:--------|
| message</br>`string` | <p>A human-readable message providing a short description about the result.</p> |
| failed</br>`array` | <p>If any records failed during the process, this array shows the failure details.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>Unique customer ID from your inventory system as indicated in the CSV file.</p></td></tr><tr><td style="text-align:left">row</br><code>integer</code></td><td style="text-align:left"><p>The CSV file row number where the customer is recorded. The row counter excludes the file headers row.</p></td></tr><tr><td style="text-align:left">reason</br><code>string</code></td><td style="text-align:left"><p>Detailed failure cause for the customer import.</p></td></tr></tbody></table> |
| done_count</br>`integer` | <p>Number of resources processed successfully.</p> |
| failed_count</br>`integer` | <p>Number of resources failed to process.</p> |

## CUSTOMERS.BULK_UPDATE
| Attributes |  Description |
|:-----|:--------|
| results</br>`array` | <p>An array of statuses for each record.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>Unique customer <code>source_id</code>.</p></td></tr><tr><td style="text-align:left">updated</br><code>boolean</code></td><td style="text-align:left"><p>Indicates whether the record was updated.</p></td></tr><tr><td style="text-align:left">found</br><code>boolean</code></td><td style="text-align:left"><p>Indicates whether the record was found.</p></td></tr></tbody></table> |
| done_count</br>`integer` | <p>Number or resources processed successfully.</p> |

## CUSTOMERS.METADATA_UPDATE
| Attributes |  Description |
|:-----|:--------|
| results</br>`array` | <p>An array of statuses for each record.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>Unique customer <code>source_id</code>.</p></td></tr><tr><td style="text-align:left">updated</br><code>boolean</code></td><td style="text-align:left"><p>Indicates whether the record was updated.</p></td></tr><tr><td style="text-align:left">found</br><code>boolean</code></td><td style="text-align:left"><p>Indicates whether the record was found.</p></td></tr></tbody></table> |
| done_count</br>`integer` | <p>Number of resources processed successfully.</p> |

## CUSTOMERS.METADATA_KEY_PURGE
| Attributes |  Description |
|:-----|:--------|
| message</br>`string` | <p>A human-readable message providing a short description about the result.</p> |
| done_count</br>`integer` | <p>Number of resources processed successfully.</p> |

## PRODUCTS.BULK_UPDATE
| Attributes |  Description |
|:-----|:--------|
| results</br>`array` | <p>An array of statuses for each record.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>Unique product <code>source_id</code>.</p></td></tr><tr><td style="text-align:left">updated</br><code>boolean</code></td><td style="text-align:left"><p>Indicates whether the record was updated.</p></td></tr><tr><td style="text-align:left">found</br><code>boolean</code></td><td style="text-align:left"><p>Indicates whether the record was found.</p></td></tr></tbody></table> |
| done_count</br>`integer` | <p>Number of resources processed successfully.</p> |

## PRODUCTS.METADATA_UPDATE
| Attributes |  Description |
|:-----|:--------|
| results</br>`array` | <p>An array of statuses for each record.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>Unique product <code>source_id</code>.</p></td></tr><tr><td style="text-align:left">updated</br><code>boolean</code></td><td style="text-align:left"><p>Indicates whether the record was updated.</p></td></tr><tr><td style="text-align:left">found</br><code>boolean</code></td><td style="text-align:left"><p>Indicates whether the record was found.</p></td></tr></tbody></table> |
| done_count</br>`integer` | <p>Number of resources processed successfully.</p> |

## PRODUCTS.IMPORT_CSV
| Attributes |  Description |
|:-----|:--------|
| message</br>`string` | <p>A human-readable message providing a short description about the result.</p> |
| failed</br>`array` | <p>If any records failed during the process, this array shows the failure details.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">row</br><code>integer</code></td><td style="text-align:left"><p>The CSV file row number where the product definition is recorded. The row counter excludes the file headers row.</p></td></tr><tr><td style="text-align:left">reason</br><code>string</code></td><td style="text-align:left"><p>Detailed failure cause for the product import.</p></td></tr></tbody></table> |
| done_count</br>`integer` | <p>Number of resources processed successfully.</p> |
| failed_count</br>`integer` | <p>Number of resources failed to process.</p> |

## SKUS.IMPORT_CSV
| Attributes |  Description |
|:-----|:--------|
| message</br>`string` | <p>A human-readable message providing a short description about the result.</p> **Example:** <p>2 sku(s) imported successfully, 6 failed.</p> |
| failed</br>`array` | <p>If any records failed during the process, this array shows the failure details.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">row</br><code>integer</code></td><td style="text-align:left"><p>The CSV file row number where the SKU definition is recorded. The row counter excludes the file headers row.</p> <strong>Example:</strong> <p>2</p></td></tr><tr><td style="text-align:left">reason</br><code>string</code></td><td style="text-align:left"><p>Detailed failure cause for the SKU import.</p> <strong>Example:</strong> <p>Resource sku with id size-small is in use by products with ids [prod_0b0e3441c2462eff2c]</p></td></tr></tbody></table> |
| done_count</br>`integer` | <p>Number of resources processed successfully.</p> |
| failed_count</br>`integer` | <p>Number of resources failed to process.</p> |

## PRODUCTS.METADATA_KEY_PURGE
| Attributes |  Description |
|:-----|:--------|
| message</br>`string` | <p>A human-readable message providing a short description about the result.</p> |
| done_count</br>`integer` | <p>Number of resources updated successfully.</p> |

## VOUCHERS.IMPORT
| Attributes |  Description |
|:-----|:--------|
| message</br>`string` | <p>A human-readable message providing a short description about the result.</p> |
| failed</br>`object` | <p>If any records failed during the process, this array shows the failure details.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">code</br><code>string</code></td><td style="text-align:left"><p>Unique voucher code.</p></td></tr><tr><td style="text-align:left">reason</br><code>string</code></td><td style="text-align:left"><p>Detailed failure cause for the voucher code import.</p></td></tr></tbody></table> |
| done_count</br>`integer` | <p>Number of resources processed successfully.</p> |
| failed_count</br>`integer` | <p>Number of resources failed to process.</p> |

## VOUCHERS.IMPORT_CSV
| Attributes |  Description |
|:-----|:--------|
| message</br>`string` | <p>A human-readable message providing a short description about the result.</p> |
| failed</br>`array` | <p>If any records failed during the process, this array shows the failure details.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">code</br><code>string</code></td><td style="text-align:left"><p>Unique voucher code.</p></td></tr><tr><td style="text-align:left">row</br><code>integer</code></td><td style="text-align:left"><p>The CSV file row number where the code definition is recorded. The row counter excludes the file headers row.</p></td></tr><tr><td style="text-align:left">reason</br><code>string</code></td><td style="text-align:left"><p>Detailed failure cause for the voucher code import.</p></td></tr></tbody></table> |
| done_count</br>`integer` | <p>Number of resources processed successfully.</p> |
| failed_count</br>`integer` | <p>Number of resources failed to process.</p> |

## VOUCHERS.BULK_UPDATE
| Attributes |  Description |
|:-----|:--------|
| results</br>`array` | <p>An array of statuses for each record.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">code</br><code>string</code></td><td style="text-align:left"><p>Unique voucher code.</p></td></tr><tr><td style="text-align:left">updated</br><code>boolean</code></td><td style="text-align:left"><p>Indicates whether the record was updated.</p></td></tr><tr><td style="text-align:left">found</br><code>boolean</code></td><td style="text-align:left"><p>Indicates whether the record was found.</p></td></tr></tbody></table> |
| done_count</br>`integer` | <p>Number of resources processed successfully.</p> |

## VOUCHERS.METADATA_UPDATE
| Attributes |  Description |
|:-----|:--------|
| results</br>`array` | <p>An array of statuses for each record.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">code</br><code>string</code></td><td style="text-align:left"><p>Unique voucher code.</p></td></tr><tr><td style="text-align:left">updated</br><code>boolean</code></td><td style="text-align:left"><p>Indicates whether the record was updated.</p></td></tr><tr><td style="text-align:left">found</br><code>boolean</code></td><td style="text-align:left"><p>Indicates whether the record was found.</p></td></tr></tbody></table> |
| done_count</br>`integer` | <p>Number of resources processed successfully.</p> |

## VOUCHERS.METADATA_KEY_PURGE
| Attributes |  Description |
|:-----|:--------|
| message</br>`string` | <p>A human-readable message providing a short description about the result.</p> |
| done_count</br>`integer` | <p>Number of resources processed successfully.</p> |

## ORDERS.IMPORT
| Attributes |  Description |
|:-----|:--------|
| message</br>`string` | <p>A human-readable message providing a short description about the result.</p> |
| failed</br>`object` | <p>If any records failed during the process, this array shows the failure details.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>Unique order source ID.</p></td></tr><tr><td style="text-align:left">reason</br><code>string</code></td><td style="text-align:left"><p>Detailed failure cause for the voucher code import.</p></td></tr></tbody></table> |
| done_count</br>`integer` | <p>Number of resources processed successfully.</p> |
| failed_count</br>`integer` | <p>Number of resources failed to process.</p> |

## ORDERS.METADATA_KEY_PURGE
| Attributes |  Description |
|:-----|:--------|
| message</br>`string` | <p>A human-readable message providing a short description about the result.</p> |
| done_count</br>`integer` | <p>Number of resources processed successfully.</p> |

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
