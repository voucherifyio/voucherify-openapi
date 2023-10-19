---
title: Export Object
type: basic
categorySlug: voucherify-api
parentDocSlug: exports-api
slug: export-object
hidden: false
order: 1
---

## Export
All of:

1. [Export Base](#export-base)
2. Any of: [Export Vouchers](#export-vouchers), [Export Redemptions](#export-redemptions), [Export Customers](#export-customers), [Export Publications](#export-publications), [Export Orders](#export-orders), [Export Points Expirations](#export-points-expirations), [Export Vouchers Transactions Expiration](#export-vouchers-transactions-expiration)

## Export Base
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique export ID.</p> |
| object</br>`string` | <p>The type of object being represented. This object stores information about the export.</p> Available values: `export` |
| created_at</br>`string` | <p>Timestamp representing the date and time when the export was scheduled in ISO 8601 format.</p> |
| status</br>`string` | <p>Status of the export. Informs you whether the export has already been completed, i.e. indicates whether the file containing the exported data has been generated.</p> Available values: `SCHEDULED`, `IN_PROGRESS`, `DONE`, `ERROR` |
| channel</br>`string` | <p>The channel through which the export was triggered.</p> |
| result</br>`object,null` | <p>Contains the URL of the CSV file.</p> |
| user_id</br>`string,null` | <p>Identifies the specific user who initiated the export through the Voucherify Dashboard; returned when the channel value is WEBSITE.</p> |

## Export Vouchers
| Attributes |  Description |
|:-----|:--------|
| exported_object</br>`string` | <p>The type of object to be exported.</p> Available values: `voucher` |
| parameters</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">order</td><td style="text-align:left"><p>How the export is filtered, where the dash - preceding a sorting option means sorting in a descending order.</p> See: <a href="#export-voucher-order">Export Voucher Order</a></td></tr><tr><td style="text-align:left">fields</br><code>array</code></td><td style="text-align:left"><p>Array of strings containing the data in the export. These fields define the headers in the CSV file.</p> Array of <a href="#export-voucher-fields">Export Voucher Fields</a></td></tr><tr><td style="text-align:left">filters</td><td style="text-align:left"><p>Filter conditions.</p> See: <a href="#export-voucher-filters">Export Voucher Filters</a></td></tr></tbody></table> |

## Export Redemptions
| Attributes |  Description |
|:-----|:--------|
| exported_object</br>`string` | <p>The type of object to be exported.</p> Available values: `redemption` |
| parameters</br>`object` | <p>List of available fields and filters that can be exported with an order along with the sorting order of the returned data.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">order</td><td style="text-align:left"><p>How the export is filtered, where the dash - preceding a sorting option means sorting in a descending order.</p> See: <a href="#export-redemption-order">Export Redemption Order</a></td></tr><tr><td style="text-align:left">fields</br><code>array</code></td><td style="text-align:left"><p>Array of strings containing the data in the export. These fields define the headers in the CSV file.</p> Array of <a href="#export-redemption-fields">Export Redemption Fields</a></td></tr><tr><td style="text-align:left">filters</td><td style="text-align:left"><p>Filter conditions.</p> See: <a href="#export-redemption-filters">Export Redemption Filters</a></td></tr></tbody></table> |

## Export Customers
| Attributes |  Description |
|:-----|:--------|
| exported_object</br>`string` | <p>The type of object to be exported.</p> Available values: `customer` |
| parameters</br>`object` | <p>List of available fields and filters that can be exported with an order along with the sorting order of the returned data.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">order</td><td style="text-align:left"><p>How the export is filtered, where the dash - preceding a sorting option means sorting in a descending order.</p> See: <a href="#export-customer-order">Export Customer Order</a></td></tr><tr><td style="text-align:left">fields</br><code>array</code></td><td style="text-align:left"><p>Array of strings containing the data in the export. These fields define the headers in the CSV file.</p> Array of <a href="#export-customer-fields">Export Customer Fields</a></td></tr><tr><td style="text-align:left">filters</td><td style="text-align:left"><p>Filter conditions.</p> See: <a href="#export-customer-filters">Export Customer Filters</a></td></tr></tbody></table> |

## Export Publications
| Attributes |  Description |
|:-----|:--------|
| exported_object</br>`string` | <p>The type of object to be exported.</p> Available values: `publication` |
| parameters</br>`object` | <p>List of available fields and filters that can be exported with an order along with the sorting order of the returned data.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">order</td><td style="text-align:left"><p>How the export is filtered, where the dash - preceding a sorting option means sorting in a descending order.</p> See: <a href="#export-publication-order">Export Publication Order</a></td></tr><tr><td style="text-align:left">fields</br><code>array</code></td><td style="text-align:left"><p>Array of strings containing the data in the export. These fields define the headers in the CSV file.</p> Array of <a href="#export-publication-fields">Export Publication Fields</a></td></tr><tr><td style="text-align:left">filters</td><td style="text-align:left"><p>Filter conditions.</p> See: <a href="#export-publication-filters">Export Publication Filters</a></td></tr></tbody></table> |

## Export Orders
| Attributes |  Description |
|:-----|:--------|
| exported_object</br>`string` | <p>The type of object to be exported.</p> Available values: `order` |
| parameters</br>`object` | <p>List of available fields and filters that can be exported with an order along with the sorting order of the returned data.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">order</td><td style="text-align:left"><p>How the export is filtered, where the dash - preceding a sorting option means sorting in a descending order.</p> See: <a href="#export-order-order">Export Order Order</a></td></tr><tr><td style="text-align:left">fields</br><code>array</code></td><td style="text-align:left"><p>Array of strings containing the data in the export. These fields define the headers in the CSV file.</p> Array of <a href="#export-order-fields">Export Order Fields</a></td></tr><tr><td style="text-align:left">filters</td><td style="text-align:left"><p>Filter conditions.</p> See: <a href="#export-order-filters">Export Order Filters</a></td></tr></tbody></table> |

## Export Points Expirations
| Attributes |  Description |
|:-----|:--------|
| exported_object</br>`string` | <p>The type of object to be exported.</p> Available values: `points_expiration` |
| parameters</br>`object` | <p>List of available fields and filters that can be exported with an order along with the sorting order of the returned data.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">order</td><td style="text-align:left"><p>How the export is filtered, where the dash - preceding a sorting option means sorting in a descending order.</p> See: <a href="#export-points-expiration-order">Export Points Expiration Order</a></td></tr><tr><td style="text-align:left">fields</br><code>array</code></td><td style="text-align:left"><p>Array of strings containing the data in the export. These fields define the headers in the CSV file.</p> Array of <a href="#export-points-expiration-fields">Export Points Expiration Fields</a></td></tr><tr><td style="text-align:left">filters</td><td style="text-align:left"><p>Filter conditions.</p> See: <a href="#export-points-expiration-filters">Export Points Expiration Filters</a></td></tr></tbody></table> |

## Export Vouchers Transactions Expiration
| Attributes |  Description |
|:-----|:--------|
| exported_object</br>`string` | <p>The type of object to be exported.</p> Available values: `voucher_transactions` |
| parameters</br>`object` | <p>List of available fields and filters that can be exported with an order along with the sorting order of the returned data.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">order</td><td style="text-align:left"><p>How the export is filtered, where the dash - preceding a sorting option means sorting in a descending order.</p> See: <a href="#export-voucher-transactions-order">Export Voucher Transactions Order</a></td></tr><tr><td style="text-align:left">fields</br><code>array</code></td><td style="text-align:left"><p>Array of strings containing the data in the export. These fields define the headers in the CSV file.</p> Array of <a href="#export-voucher-transactions-fields">Export Voucher Transactions Fields</a></td></tr><tr><td style="text-align:left">filters</td><td style="text-align:left"><p>Filter conditions.</p> See: <a href="#export-voucher-transactions-filters">Export Voucher Transactions Filters</a></td></tr></tbody></table> |

## Export Voucher Order
Available values: `code`, `-code`, `voucher_type`, `-voucher_type`, `value`, `-value`, `discount_type`, `-discount_type`, `campaign`, `-campaign`, `category`, `-category`, `start_date`, `-start_date`, `expiration_date`, `-expiration_date`, `gift_balance`, `-gift_balance`, `loyalty_balance`, `-loyalty_balance`, `redemption_quantity`, `-redemption_quantity`, `redemption_count`, `-redemption_count`, `active`, `-active`, `qr_code`, `-qr_code`, `bar_code`, `-bar_code`, `metadata`, `-metadata`, `id`, `-id`, `is_referral_code`, `-is_referral_code`, `created_at`, `-created_at`, `updated_at`, `-updated_at`, `validity_timeframe_interval`, `-validity_timeframe_interval`, `validity_timeframe_duration`, `-validity_timeframe_duration`, `validity_day_of_week`, `-validity_day_of_week`, `discount_amount_limit`, `-discount_amount_limit`, `campaign_id`, `-campaign_id`, `additional_info`, `-additional_info`, `customer_id`, `-customer_id`, `discount_unit_type`, `-discount_unit_type`, `discount_unit_effect`, `-discount_unit_effect`, `customer_source_id`, `-customer_source_id`

## Export Voucher Fields
Available values: `code`, `voucher_type`, `value`, `discount_type`, `campaign`, `category`, `start_date`, `expiration_date`, `gift_balance`, `loyalty_balance`, `redemption_quantity`, `redemption_count`, `active`, `qr_code`, `bar_code`, `metadata`, `id`, `is_referral_code`, `created_at`, `updated_at`, `validity_timeframe_interval`, `validity_timeframe_duration`, `validity_day_of_week`, `discount_amount_limit`, `campaign_id`, `additional_info`, `customer_id`, `discount_unit_type`, `discount_unit_effect`, `customer_source_id`

## Export Voucher Filters
| Attributes |  Description |
|:-----|:--------|
| junction | <p>Filter by conditions set on the junction parameter indicating how the conditions should be accounted for in the query. An AND is an all-inclusive logical operator, meaning the AND operator displays a record if ALL the conditions separated by AND are TRUE, while an OR operator displays a record if ANY of the conditions separated by OR is TRUE.</p> See: [Junction](#junction) |
| code | See: [Field Conditions](#field-conditions) |
| voucher_type | See: [Field Conditions](#field-conditions) |
| value | See: [Field Conditions](#field-conditions) |
| discount_type | See: [Field Conditions](#field-conditions) |
| campaign | See: [Field Conditions](#field-conditions) |
| category | See: [Field Conditions](#field-conditions) |
| start_date | See: [Field Conditions](#field-conditions) |
| expiration_date | See: [Field Conditions](#field-conditions) |
| gift_balance | See: [Field Conditions](#field-conditions) |
| loyalty_balance | See: [Field Conditions](#field-conditions) |
| redemption_quantity | See: [Field Conditions](#field-conditions) |
| redemption_count | See: [Field Conditions](#field-conditions) |
| active | See: [Field Conditions](#field-conditions) |
| qr_code | See: [Field Conditions](#field-conditions) |
| bar_code | See: [Field Conditions](#field-conditions) |
| metadata | See: [Field Conditions](#field-conditions) |
| id | See: [Field Conditions](#field-conditions) |
| is_referral_code | See: [Field Conditions](#field-conditions) |
| created_at | See: [Field Conditions](#field-conditions) |
| updated_at | See: [Field Conditions](#field-conditions) |
| validity_timeframe_interval | See: [Field Conditions](#field-conditions) |
| validity_timeframe_duration | See: [Field Conditions](#field-conditions) |
| validity_day_of_week | See: [Field Conditions](#field-conditions) |
| discount_amount_limit | See: [Field Conditions](#field-conditions) |
| campaign_id | See: [Field Conditions](#field-conditions) |
| additional_info | See: [Field Conditions](#field-conditions) |
| customer_id | See: [Field Conditions](#field-conditions) |
| discount_unit_type | See: [Field Conditions](#field-conditions) |
| discount_unit_effect | See: [Field Conditions](#field-conditions) |
| customer_source_id | See: [Field Conditions](#field-conditions) |

## Export Redemption Order
Available values: `id`, `-id`, `object`, `-object`, `date`, `-date`, `voucher_code`, `-voucher_code`, `campaign`, `-campaign`, `promotion_tier_id`, `-promotion_tier_id`, `customer_id`, `-customer_id`, `customer_source_id`, `-customer_source_id`, `customer_name`, `-customer_name`, `tracking_id`, `-tracking_id`, `order_amount`, `-order_amount`, `gift_amount`, `-gift_amount`, `loyalty_points`, `-loyalty_points`, `result`, `-result`, `failure_code`, `-failure_code`, `failure_message`, `-failure_message`, `metadata`, `-metadata`

## Export Redemption Fields
Available values: `id`, `object`, `date`, `voucher_code`, `campaign`, `promotion_tier_id`, `customer_id`, `customer_source_id`, `customer_name`, `tracking_id`, `order_amount`, `gift_amount`, `loyalty_points`, `result`, `failure_code`, `failure_message`, `metadata`

## Export Redemption Filters
| Attributes |  Description |
|:-----|:--------|
| junction | See: [Junction](#junction) |
| id | See: [Field Conditions](#field-conditions) |
| object | See: [Field Conditions](#field-conditions) |
| date | See: [Field Conditions](#field-conditions) |
| voucher_code | See: [Field Conditions](#field-conditions) |
| campaign | See: [Field Conditions](#field-conditions) |
| promotion_tier_id | See: [Field Conditions](#field-conditions) |
| customer_id | See: [Field Conditions](#field-conditions) |
| customer_source_id | See: [Field Conditions](#field-conditions) |
| customer_name | See: [Field Conditions](#field-conditions) |
| tracking_id | See: [Field Conditions](#field-conditions) |
| order_amount | See: [Field Conditions](#field-conditions) |
| gift_amount | See: [Field Conditions](#field-conditions) |
| loyalty_points | See: [Field Conditions](#field-conditions) |
| result | See: [Field Conditions](#field-conditions) |
| failure_code | See: [Field Conditions](#field-conditions) |
| failure_message | See: [Field Conditions](#field-conditions) |
| metadata | See: [Field Conditions](#field-conditions) |

## Export Customer Order
Available values: `name`, `-name`, `id`, `-id`, `description`, `-description`, `email`, `-email`, `source_id`, `-source_id`, `created_at`, `-created_at`, `address_city`, `-address_city`, `address_state`, `-address_state`, `address_line_1`, `-address_line_1`, `address_line_2`, `-address_line_2`, `address_country`, `-address_country`, `address_postal_code`, `-address_postal_code`, `redemptions_total_redeemed`, `-redemptions_total_redeemed`, `redemptions_total_failed`, `-redemptions_total_failed`, `redemptions_total_succeeded`, `-redemptions_total_succeeded`, `redemptions_total_rolled_back`, `-redemptions_total_rolled_back`, `redemptions_total_rollback_failed`, `-redemptions_total_rollback_failed`, `redemptions_total_rollback_succeeded`, `-redemptions_total_rollback_succeeded`, `orders_total_amount`, `-orders_total_amount`, `orders_total_count`, `-orders_total_count`, `orders_average_amount`, `-orders_average_amount`, `orders_last_order_amount`, `-orders_last_order_amount`, `orders_last_order_date`, `-orders_last_order_date`, `loyalty_points`, `-loyalty_points`, `loyalty_referred_customers`, `-loyalty_referred_customers`, `updated_at`, `-updated_at`, `phone`, `-phone`, `birthday`, `-birthday`, `metadata`, `-metadata`, `birthdate`, `-birthdate`

## Export Customer Fields
Available values: `name`, `id`, `description`, `email`, `source_id`, `created_at`, `address_city`, `address_state`, `address_line_1`, `address_line_2`, `address_country`, `address_postal_code`, `redemptions_total_redeemed`, `redemptions_total_failed`, `redemptions_total_succeeded`, `redemptions_total_rolled_back`, `redemptions_total_rollback_failed`, `redemptions_total_rollback_succeeded`, `orders_total_amount`, `orders_total_count`, `orders_average_amount`, `orders_last_order_amount`, `orders_last_order_date`, `loyalty_points`, `loyalty_referred_customers`, `updated_at`, `phone`, `birthday`, `metadata`, `birthdate`

## Export Customer Filters
| Attributes |  Description |
|:-----|:--------|
| junction | See: [Junction](#junction) |
| name | See: [Field Conditions](#field-conditions) |
| id | See: [Field Conditions](#field-conditions) |
| description | See: [Field Conditions](#field-conditions) |
| email | See: [Field Conditions](#field-conditions) |
| source_id | See: [Field Conditions](#field-conditions) |
| created_at | See: [Field Conditions](#field-conditions) |
| address_city | See: [Field Conditions](#field-conditions) |
| address_state | See: [Field Conditions](#field-conditions) |
| address_line_1 | See: [Field Conditions](#field-conditions) |
| address_line_2 | See: [Field Conditions](#field-conditions) |
| address_country | See: [Field Conditions](#field-conditions) |
| address_postal_code | See: [Field Conditions](#field-conditions) |
| redemptions_total_redeemed | See: [Field Conditions](#field-conditions) |
| redemptions_total_failed | See: [Field Conditions](#field-conditions) |
| redemptions_total_succeeded | See: [Field Conditions](#field-conditions) |
| redemptions_total_rolled_back | See: [Field Conditions](#field-conditions) |
| redemptions_total_rollback_failed | See: [Field Conditions](#field-conditions) |
| redemptions_total_rollback_succeeded | See: [Field Conditions](#field-conditions) |
| orders_total_amount | See: [Field Conditions](#field-conditions) |
| orders_total_count | See: [Field Conditions](#field-conditions) |
| orders_average_amount | See: [Field Conditions](#field-conditions) |
| orders_last_order_amount | See: [Field Conditions](#field-conditions) |
| orders_last_order_date | See: [Field Conditions](#field-conditions) |
| loyalty_points | See: [Field Conditions](#field-conditions) |
| loyalty_referred_customers | See: [Field Conditions](#field-conditions) |
| updated_at | See: [Field Conditions](#field-conditions) |
| phone | See: [Field Conditions](#field-conditions) |
| birthday | See: [Field Conditions](#field-conditions) |
| metadata | See: [Field Conditions](#field-conditions) |
| birthdate | See: [Field Conditions](#field-conditions) |

## Export Publication Order
Available values: `voucher_code`, `-voucher_code`, `customer_id`, `-customer_id`, `customer_source_id`, `-customer_source_id`, `date`, `-date`, `channel`, `-channel`, `campaign`, `-campaign`, `is_winner`, `-is_winner`, `metadata`, `-metadata`

## Export Publication Fields
Available values: `voucher_code`, `customer_id`, `customer_source_id`, `date`, `channel`, `campaign`, `is_winner`, `metadata`

## Export Publication Filters
| Attributes |  Description |
|:-----|:--------|
| junction | See: [Junction](#junction) |
| voucher_code | See: [Field Conditions](#field-conditions) |
| customer_id | See: [Field Conditions](#field-conditions) |
| customer_source_id | See: [Field Conditions](#field-conditions) |
| date | See: [Field Conditions](#field-conditions) |
| channel | See: [Field Conditions](#field-conditions) |
| campaign | See: [Field Conditions](#field-conditions) |
| is_winner | See: [Field Conditions](#field-conditions) |
| metadata | See: [Field Conditions](#field-conditions) |

## Export Order Order
Available values: `id`, `-id`, `source_id`, `-source_id`, `created_at`, `-created_at`, `updated_at`, `-updated_at`, `status`, `-status`, `amount`, `-amount`, `discount_amount`, `-discount_amount`, `items_discount_amount`, `-items_discount_amount`, `total_discount_amount`, `-total_discount_amount`, `total_amount`, `-total_amount`, `customer_id`, `-customer_id`, `referrer_id`, `-referrer_id`, `metadata`, `-metadata`

## Export Order Fields
Available values: `id`, `source_id`, `created_at`, `updated_at`, `status`, `amount`, `discount_amount`, `items_discount_amount`, `total_discount_amount`, `total_amount`, `customer_id`, `referrer_id`, `metadata`

## Export Order Filters
| Attributes |  Description |
|:-----|:--------|
| junction | See: [Junction](#junction) |
| id | See: [Field Conditions](#field-conditions) |
| source_id | See: [Field Conditions](#field-conditions) |
| created_at | See: [Field Conditions](#field-conditions) |
| updated_at | See: [Field Conditions](#field-conditions) |
| status | See: [Field Conditions](#field-conditions) |
| amount | See: [Field Conditions](#field-conditions) |
| discount_amount | See: [Field Conditions](#field-conditions) |
| items_discount_amount | See: [Field Conditions](#field-conditions) |
| total_discount_amount | See: [Field Conditions](#field-conditions) |
| total_amount | See: [Field Conditions](#field-conditions) |
| customer_id | See: [Field Conditions](#field-conditions) |
| referrer_id | See: [Field Conditions](#field-conditions) |
| metadata | See: [Field Conditions](#field-conditions) |

## Export Points Expiration Order
Available values: `id`, `-id`, `campaign_id`, `-campaign_id`, `voucher_id`, `-voucher_id`, `points`, `-points`, `status`, `-status`, `expires_at`, `-expires_at`

## Export Points Expiration Fields
Available values: `id`, `campaign_id`, `voucher_id`, `points`, `status`, `expires_at`

## Export Points Expiration Filters
| Attributes |  Description |
|:-----|:--------|
| junction | See: [Junction](#junction) |
| id | See: [Field Conditions](#field-conditions) |
| campaign_id | See: [Field Conditions](#field-conditions) |
| voucher_id | See: [Field Conditions](#field-conditions) |
| points | See: [Field Conditions](#field-conditions) |
| status | See: [Field Conditions](#field-conditions) |
| expires_at | See: [Field Conditions](#field-conditions) |

## Export Voucher Transactions Order
Available values: `id`, `-id`, `campaign_id`, `-campaign_id`, `voucher_id`, `-voucher_id`, `type`, `-type`, `source_id`, `-source_id`, `reason`, `-reason`, `source`, `-source`, `balance`, `-balance`, `amount`, `-amount`, `related_transaction_id`, `-related_transaction_id`, `created_at`, `-created_at`, `details`, `-details`

## Export Voucher Transactions Fields
Available values: `id`, `campaign_id`, `voucher_id`, `type`, `source_id`, `reason`, `source`, `balance`, `amount`, `related_transaction_id`, `created_at`, `details`

## Export Voucher Transactions Filters
| Attributes |  Description |
|:-----|:--------|
| junction | See: [Junction](#junction) |
| id | See: [Field Conditions](#field-conditions) |
| campaign_id | See: [Field Conditions](#field-conditions) |
| voucher_id | See: [Field Conditions](#field-conditions) |
| type | See: [Field Conditions](#field-conditions) |
| source_id | See: [Field Conditions](#field-conditions) |
| reason | See: [Field Conditions](#field-conditions) |
| source | See: [Field Conditions](#field-conditions) |
| balance | See: [Field Conditions](#field-conditions) |
| amount | See: [Field Conditions](#field-conditions) |
| related_transaction_id | See: [Field Conditions](#field-conditions) |
| created_at | See: [Field Conditions](#field-conditions) |
| details | See: [Field Conditions](#field-conditions) |

## Junction
Available values: `and`, `AND`, `or`, `OR`

## Field Conditions
| Attributes |  Description |
|:-----|:--------|
| conditions | <p>Data filters used to narrow the data records to be returned in the result.</p> See: [Filters Condition](#filters-condition) |

## Filters Condition
| Attributes |  Description |
|:-----|:--------|
| $in | See: [Any](#any) |
| $not_in | See: [Any](#any) |
| $is | See: [Any](#any) |
| $is_days_ago | See: [Any](#any) |
| $is_days_in_future | See: [Any](#any) |
| $is_not | See: [Any](#any) |
| $has_value | See: [Any](#any) |
| $is_unknown | See: [Any](#any) |
| $contains | See: [Any](#any) |
| $not_contain | See: [Any](#any) |
| $starts_with | See: [Any](#any) |
| $ends_with | See: [Any](#any) |
| $more_than | See: [Any](#any) |
| $less_than | See: [Any](#any) |
| $more_than_ago | See: [Any](#any) |
| $less_than_ago | See: [Any](#any) |
| $more_than_future | See: [Any](#any) |
| $less_than_future | See: [Any](#any) |
| $more_than_equal | See: [Any](#any) |
| $less_than_equal | See: [Any](#any) |
| $after | See: [Any](#any) |
| $before | See: [Any](#any) |
| $count | See: [Any](#any) |
| $count_less | See: [Any](#any) |
| $count_more | See: [Any](#any) |

## Any
Any of:

 1. Array any of: string, number, object
 2. string
 3. number
 4. object

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n</style>"
}
[/block]
