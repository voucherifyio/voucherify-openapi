---
title: Async Action Object
type: basic
categorySlug: voucherify-api
parentDocSlug: async-actions
slug: async-action-object
hidden: false
order: 1
---

## Async Action
<p>This is an object representing an asynchronous action.</p>

All of:

1. [Async Action Base](#async-action-base)
2. <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">result</td><td style="text-align:left">One of: <a href="#campaign.vouchers_import">CAMPAIGN.VOUCHERS_IMPORT</a>, <a href="#campaign.vouchers_import_csv">CAMPAIGN.VOUCHERS_IMPORT_CSV</a>, <a href="#campaign.vouchers_update">CAMPAIGN.VOUCHERS_UPDATE</a>, <a href="#campaign.vouchers_delete">CAMPAIGN.VOUCHERS_DELETE</a>, <a href="#campaign.vouchers_generate">CAMPAIGN.VOUCHERS_GENERATE</a>, <a href="#campaigns.metadata_key_purge">CAMPAIGNS.METADATA_KEY_PURGE</a>, <a href="#customers.import_csv">CUSTOMERS.IMPORT_CSV</a>, <a href="#customers.bulk_update">CUSTOMERS.BULK_UPDATE</a>, <a href="#customers.metadata_update">CUSTOMERS.METADATA_UPDATE</a>, <a href="#customers.metadata_key_purge">CUSTOMERS.METADATA_KEY_PURGE</a>, <a href="#products.bulk_update">PRODUCTS.BULK_UPDATE</a>, <a href="#products.metadata_update">PRODUCTS.METADATA_UPDATE</a>, <a href="#products.import_csv">PRODUCTS.IMPORT_CSV</a>, <a href="#skus.import_csv">SKUS.IMPORT_CSV</a>, <a href="#products.metadata_key_purge">PRODUCTS.METADATA_KEY_PURGE</a>, <a href="#vouchers.import">VOUCHERS.IMPORT</a>, <a href="#vouchers.import_csv">VOUCHERS.IMPORT_CSV</a>, <a href="#vouchers.bulk_update">VOUCHERS.BULK_UPDATE</a>, <a href="#vouchers.metadata_update">VOUCHERS.METADATA_UPDATE</a>, <a href="#vouchers.metadata_key_purge">VOUCHERS.METADATA_KEY_PURGE</a>, <a href="#orders.import">ORDERS.IMPORT</a>, <a href="#orders.metadata_key_purge">ORDERS.METADATA_KEY_PURGE</a></td></tr></tbody></table>

## Async Action Base
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Async action unique ID.</p> **Example:** <p>aa_0adad13d6f057f088e</p> |
| type</br>`string` | <p>Type of async action.</p> Available values: `CAMPAIGN.VOUCHERS_IMPORT`, `CAMPAIGN.VOUCHERS_IMPORT_CSV`, `CAMPAIGN.VOUCHERS_UPDATE`, `CAMPAIGN.VOUCHERS_DELETE`, `CAMPAIGN.VOUCHERS_GENERATE`, `CAMPAIGNS.METADATA_KEY_PURGE`, `CUSTOMERS.IMPORT_CSV`, `CUSTOMERS.BULK_UPDATE`, `CUSTOMERS.METADATA_UPDATE`, `CUSTOMERS.METADATA_KEY_PURGE`, `PRODUCTS.BULK_UPDATE`, `PRODUCTS.METADATA_UPDATE`, `PRODUCTS.METADATA_KEY_PURGE`, `PRODUCTS.IMPORT_CSV`, `SKUS.IMPORT_CSV`, `VOUCHERS.IMPORT`, `VOUCHERS.IMPORT_CSV`, `VOUCHERS.BULK_UPDATE`, `VOUCHERS.METADATA_UPDATE`, `VOUCHERS.METADATA_KEY_PURGE`, `ORDERS.IMPORT`, `ORDERS.METADATA_KEY_PURGE` |
| status</br>`string` | <p>Status of the async action. Informs you whether the async action has already been completed.</p> Available values: `DONE`, `ENQUEUED`, `FAILED`, `IN_PROGRESS` |
| operation_status</br>`string` | <p>Status of async action processing. Informs about the async action status, whether it failed, succeeded, or the status is unknown.</p> Available values: `FAILED`, `SUCCESS`, `UNKNOWN` |
| created_at</br>`string` | <p>Timestamp representing the date and time when the async action was scheduled in ISO 8601 format.</p> **Example:** <p>2022-06-23T11:21:45.578Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the async action was updated. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-06-23T11:21:46.795Z</p> |
| request_id</br>`string` | <p>Unique request ID.</p> **Example:** <p>v-0b45cee140c3c9b5ca</p> |
| processing_time</br>`integer` | <p>The length of time it took to process the request in milliseconds.</p> **Example:** <p>1217</p> |
| progress</br>`integer` | <p>% progress to completion of the asynchronous action.</p> |
| object</br>`string` | <p>The type of the object represented by JSON. This object stores information about the <code>async_action</code>.</p> Available values: `async_action` |

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
All of:

1. [Async Action Voucher Customer Product Bulk Update Result](#async-action-voucher-customer-product-bulk-update-result)
2. <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">errors</br><code>array</code></td><td style="text-align:left"><p>List of errors encountered during processing.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">message</br><code>string</code></td><td style="text-align:left"><p>A human-readable message providing a short description of the error.</p></td></tr><tr><td style="text-align:left">details</br><code>string</code></td><td style="text-align:left"><p>A human-readable message providing more details about the error.</p></td></tr><tr><td style="text-align:left">key</br><code>string</code></td><td style="text-align:left"><p>Short string describing the kind of error which occurred.</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>Source identifier of the customer for which the error occurred.</p></td></tr></tbody></table></td></tr></tbody></table>

## CUSTOMERS.METADATA_UPDATE
| Attributes |  Description |
|:-----|:--------|
| errors</br>`array` | <p>List of errors encountered during processing.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">message</br><code>string</code></td><td style="text-align:left"><p>A human-readable message providing a short description of the error.</p></td></tr><tr><td style="text-align:left">details</br><code>string</code></td><td style="text-align:left"><p>A human-readable message providing more details about the error.</p></td></tr><tr><td style="text-align:left">key</br><code>string</code></td><td style="text-align:left"><p>Short string describing the kind of error which occurred.</p></td></tr></tbody></table> |

## CUSTOMERS.METADATA_KEY_PURGE
| Attributes |  Description |
|:-----|:--------|
| message</br>`string` | <p>A human-readable message providing a short description about the result.</p> |
| done_count</br>`integer` | <p>Number of resources processed successfully.</p> |

## PRODUCTS.BULK_UPDATE
All of:

1. [Async Action Voucher Customer Product Bulk Update Result](#async-action-voucher-customer-product-bulk-update-result)
2. <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">errors</br><code>array</code></td><td style="text-align:left"><p>List of errors encountered during processing.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">message</br><code>string</code></td><td style="text-align:left"><p>A human-readable message providing a short description of the error.</p></td></tr><tr><td style="text-align:left">details</br><code>string</code></td><td style="text-align:left"><p>A human-readable message providing more details about the error.</p></td></tr><tr><td style="text-align:left">key</br><code>string</code></td><td style="text-align:left"><p>Short string describing the kind of error which occurred.</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>Source identifier of the product for which the error occurred.</p></td></tr></tbody></table></td></tr></tbody></table>

## PRODUCTS.METADATA_UPDATE
| Attributes |  Description |
|:-----|:--------|
| errors</br>`array` | <p>List of errors encountered during processing.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">message</br><code>string</code></td><td style="text-align:left"><p>A human-readable message providing a short description of the error.</p></td></tr><tr><td style="text-align:left">details</br><code>string</code></td><td style="text-align:left"><p>A human-readable message providing more details about the error.</p></td></tr><tr><td style="text-align:left">key</br><code>string</code></td><td style="text-align:left"><p>Short string describing the kind of error which occurred.</p></td></tr></tbody></table> |

## PRODUCTS.IMPORT_CSV
| Attributes |  Description |
|:-----|:--------|
| message</br>`string` | <p>A human-readable message providing a short description about the result.</p> |
| failed</br>`array` | <p>If any records failed during the process, this array shows the failure details.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">row</br><code>integer</code></td><td style="text-align:left"><p>The CSV file row number where the product definition is recorded. The row counter excludes the file headers row.</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>The source identifier of the product that caused the error.</p></td></tr><tr><td style="text-align:left">reason</br><code>string</code></td><td style="text-align:left"><p>Detailed failure cause for the product import.</p></td></tr></tbody></table> |
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
All of:

1. [Async Action Voucher Customer Product Bulk Update Result](#async-action-voucher-customer-product-bulk-update-result)
2. <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">errors</br><code>array</code></td><td style="text-align:left"><p>List of errors encountered during processing.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">message</br><code>string</code></td><td style="text-align:left"><p>A human-readable message providing a short description of the error.</p></td></tr><tr><td style="text-align:left">details</br><code>string</code></td><td style="text-align:left"><p>A human-readable message providing more details about the error.</p></td></tr><tr><td style="text-align:left">key</br><code>string</code></td><td style="text-align:left"><p>Short string describing the kind of error which occurred.</p></td></tr><tr><td style="text-align:left">code</br><code>string</code></td><td style="text-align:left"><p>Code of the voucher for which the error occurred.</p></td></tr></tbody></table></td></tr></tbody></table>

## VOUCHERS.METADATA_UPDATE
| Attributes |  Description |
|:-----|:--------|
| errors</br>`array` | <p>List of errors encountered during processing.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">message</br><code>string</code></td><td style="text-align:left"><p>A human-readable message providing a short description of the error.</p></td></tr><tr><td style="text-align:left">details</br><code>string</code></td><td style="text-align:left"><p>A human-readable message providing more details about the error.</p></td></tr><tr><td style="text-align:left">key</br><code>string</code></td><td style="text-align:left"><p>Short string describing the kind of error which occurred.</p></td></tr></tbody></table> |

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

## Async Action Voucher Customer Product Bulk Update Result
| Attributes |  Description |
|:-----|:--------|
| done_count</br>`integer` | <p>Number of items successfully processed.</p> |
| failed_count</br>`integer` | <p>Number of items that failed to be processed.</p> |
| reports</br>`array` | <p>List of URLs to report files.</p> |
| reports_available_till</br>`string` | <p>Timestamp until the reports are available.</p> |

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
