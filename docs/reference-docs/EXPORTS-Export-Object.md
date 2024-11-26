---
title: Export Object
type: basic
categorySlug: voucherify-api
parentDocSlug: exports
slug: export-object
hidden: false
order: 1
---

## Export
One of:

[Export Voucher](#export-voucher), [Export Redemption](#export-redemption), [Export Customers](#export-customers), [Export Publication](#export-publication), [Export Orders](#export-orders), [Export Points Expiration](#export-points-expiration), [Export Vouchers Transactions](#export-vouchers-transactions)

## Export Voucher
All of:

1. [Export Base](#export-base)
2. [Export Vouchers](#export-vouchers)

## Export Redemption
All of:

1. [Export Base](#export-base)
2. [Export Redemptions](#export-redemptions)

## Export Customers
All of:

1. [Export Base](#export-base)
2. [Export Customers](#export-customers)

## Export Publication
All of:

1. [Export Base](#export-base)
2. [Export Publications](#export-publications)

## Export Orders
All of:

1. [Export Base](#export-base)
2. [Export Orders](#export-orders)

## Export Points Expiration
All of:

1. [Export Base](#export-base)
2. [Export Points Expirations](#export-points-expirations)

## Export Vouchers Transactions
All of:

1. [Export Base](#export-base)
2. [Export Vouchers Transactions](#export-vouchers-transactions)

## Export Base
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique export ID.</p> |
| object</br>`string` | <p>The type of object being represented. This object stores information about the export.</p> Available values: `export` |
| created_at</br>`string` | <p>Timestamp representing the date and time when the export was scheduled in ISO 8601 format.</p> |
| status</br>`string` | <p>Status of the export. Informs you whether the export has already been completed, i.e. indicates whether the file containing the exported data has been generated.</p> Available values: `SCHEDULED`, `IN_PROGRESS`, `DONE`, `ERROR` |
| channel</br>`string` | <p>The channel through which the export was triggered.</p> |
| result</br>`object`, `null` | <p>Contains the URL of the CSV file.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">url</br><code>string</code></td><td style="text-align:left"><p>URL of the CSV file location. It contains the token used for authorization in the Download export method.</p></td></tr></tbody></table> |
| user_id</br>`string`, `null` | <p>Identifies the specific user who initiated the export through the Voucherify Dashboard; returned when the channel value is WEBSITE.</p> |

## Export Vouchers
| Attributes |  Description |
|:-----|:--------|
| exported_object</br>`string` | <p>The type of object to be exported.</p> Available values: `voucher` |
| parameters</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">order</td><td style="text-align:left"><p>How the export is filtered, where the dash - preceding a sorting option means sorting in a descending order.</p> <a href="#export-voucher-order">Export Voucher Order</a></td></tr><tr><td style="text-align:left">fields</br><code>array</code></td><td style="text-align:left"><p>Array of strings containing the data in the export. These fields define the headers in the CSV file.</p> Array of <a href="#export-voucher-fields">Export Voucher Fields</a></td></tr><tr><td style="text-align:left">filters</td><td style="text-align:left"><p>Filter conditions.</p> <a href="#export-voucher-filters">Export Voucher Filters</a></td></tr></tbody></table> |

## Export Redemptions
| Attributes |  Description |
|:-----|:--------|
| exported_object</br>`string` | <p>The type of object to be exported.</p> Available values: `redemption` |
| parameters</br>`object` | <p>List of available fields and filters that can be exported with an order along with the sorting order of the returned data.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">order</td><td style="text-align:left"><p>How the export is filtered, where the dash - preceding a sorting option means sorting in a descending order.</p> <a href="#export-redemption-order">Export Redemption Order</a></td></tr><tr><td style="text-align:left">fields</br><code>array</code></td><td style="text-align:left"><p>Array of strings containing the data in the export. These fields define the headers in the CSV file.</p> Array of <a href="#export-redemption-fields">Export Redemption Fields</a></td></tr><tr><td style="text-align:left">filters</td><td style="text-align:left"><p>Filter conditions.</p> <a href="#export-redemption-filters">Export Redemption Filters</a></td></tr></tbody></table> |

## Export Customers
| Attributes |  Description |
|:-----|:--------|
| exported_object</br>`string` | <p>The type of object to be exported.</p> Available values: `customer` |
| parameters</br>`object` | <p>List of available fields and filters that can be exported with an order along with the sorting order of the returned data.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">order</td><td style="text-align:left"><p>How the export is filtered, where the dash - preceding a sorting option means sorting in a descending order.</p> <a href="#export-customer-order">Export Customer Order</a></td></tr><tr><td style="text-align:left">fields</br><code>array</code></td><td style="text-align:left"><p>Array of strings containing the data in the export. These fields define the headers in the CSV file.</p> Array of <a href="#export-customer-fields">Export Customer Fields</a></td></tr><tr><td style="text-align:left">filters</td><td style="text-align:left"><p>Filter conditions.</p> <a href="#export-customer-filters">Export Customer Filters</a></td></tr></tbody></table> |

## Export Publications
| Attributes |  Description |
|:-----|:--------|
| exported_object</br>`string` | <p>The type of object to be exported.</p> Available values: `publication` |
| parameters</br>`object` | <p>List of available fields and filters that can be exported with an order along with the sorting order of the returned data.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">order</td><td style="text-align:left"><p>How the export is filtered, where the dash - preceding a sorting option means sorting in a descending order.</p> <a href="#export-publication-order">Export Publication Order</a></td></tr><tr><td style="text-align:left">fields</br><code>array</code></td><td style="text-align:left"><p>Array of strings containing the data in the export. These fields define the headers in the CSV file.</p> Array of <a href="#export-publication-fields">Export Publication Fields</a></td></tr><tr><td style="text-align:left">filters</td><td style="text-align:left"><p>Filter conditions.</p> <a href="#export-publication-filters">Export Publication Filters</a></td></tr></tbody></table> |

## Export Orders
| Attributes |  Description |
|:-----|:--------|
| exported_object</br>`string` | <p>The type of object to be exported.</p> Available values: `order` |
| parameters</br>`object` | <p>List of available fields and filters that can be exported with an order along with the sorting order of the returned data.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">order</td><td style="text-align:left"><p>How the export is filtered, where the dash - preceding a sorting option means sorting in a descending order.</p> <a href="#export-order-order">Export Order Order</a></td></tr><tr><td style="text-align:left">fields</br><code>array</code></td><td style="text-align:left"><p>Array of strings containing the data in the export. These fields define the headers in the CSV file.</p> Array of <a href="#export-order-fields">Export Order Fields</a></td></tr><tr><td style="text-align:left">filters</td><td style="text-align:left"><p>Filter conditions.</p> <a href="#export-order-filters">Export Order Filters</a></td></tr></tbody></table> |

## Export Points Expirations
| Attributes |  Description |
|:-----|:--------|
| exported_object</br>`string` | <p>The type of object to be exported.</p> Available values: `points_expiration` |
| parameters</br>`object` | <p>List of available fields and filters that can be exported with an order along with the sorting order of the returned data.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">order</td><td style="text-align:left"><p>How the export is filtered, where the dash - preceding a sorting option means sorting in a descending order.</p> <a href="#export-points-expiration-order">Export Points Expiration Order</a></td></tr><tr><td style="text-align:left">fields</br><code>array</code></td><td style="text-align:left"><p>Array of strings containing the data in the export. These fields define the headers in the CSV file.</p> Array of <a href="#export-points-expiration-fields">Export Points Expiration Fields</a></td></tr><tr><td style="text-align:left">filters</td><td style="text-align:left"><p>Filter conditions.</p> <a href="#export-points-expiration-filters">Export Points Expiration Filters</a></td></tr></tbody></table> |

## Export Vouchers Transactions
| Attributes |  Description |
|:-----|:--------|
| exported_object</br>`string` | <p>The type of object to be exported.</p> Available values: `voucher_transactions` |
| parameters</br>`object` | <p>List of available fields and filters that can be exported with an order along with the sorting order of the returned data.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">order</td><td style="text-align:left"><p>How the export is filtered, where the dash - preceding a sorting option means sorting in a descending order.</p> <a href="#export-voucher-transactions-order">Export Voucher Transactions Order</a></td></tr><tr><td style="text-align:left">fields</br><code>array</code></td><td style="text-align:left"><p>Array of strings containing the data in the export. These fields define the headers in the CSV file.</p> Array of <a href="#export-voucher-transactions-fields">Export Voucher Transactions Fields</a></td></tr><tr><td style="text-align:left">filters</td><td style="text-align:left"><p>Filter conditions.</p> <a href="#export-voucher-transactions-filters">Export Voucher Transactions Filters</a></td></tr></tbody></table> |

## Export Voucher Order
Available values: `-created_at`, `created_at`, `-updated_at`, `updated_at`, `-code`, `code`

## Export Voucher Fields
Available values: `code`, `voucher_type`, `value`, `formula`, `discount_type`, `campaign`, `category`, `start_date`, `expiration_date`, `gift_balance`, `loyalty_balance`, `redemption_quantity`, `redemption_count`, `active`, `qr_code`, `bar_code`, `metadata`, `id`, `is_referral_code`, `created_at`, `updated_at`, `validity_timeframe_interval`, `validity_timeframe_duration`, `validity_day_of_week`, `discount_amount_limit`, `campaign_id`, `additional_info`, `customer_id`, `discount_effect`, `discount_unit_type`, `discount_unit_effect`, `validation_rules_id`, `customer_source_id`

## Export Voucher Filters
| Attributes |  Description |
|:-----|:--------|
| junction | <p>Filter by conditions set on the junction parameter indicating how the conditions should be accounted for in the query. An AND is an all-inclusive logical operator, meaning the AND operator displays a record if ALL the conditions separated by AND are TRUE, while an OR operator displays a record if ANY of the conditions separated by OR is TRUE.</p> [Junction](#junction) |
| created_at | See: [Field Conditions](#field-conditions) |
| updated_at | See: [Field Conditions](#field-conditions) |
| created_date | See: [Field Conditions](#field-conditions) |
| active | See: [Field Conditions](#field-conditions) |
| redemption_status | See: [Field Conditions](#field-conditions) |
| start_date | See: [Field Conditions](#field-conditions) |
| expiration_date | See: [Field Conditions](#field-conditions) |
| validity_day_of_week | See: [Field Conditions](#field-conditions) |
| code | See: [Field Conditions](#field-conditions) |
| categories | See: [Field Conditions](#field-conditions) |
| vouchers | See: [Field Conditions](#field-conditions) |
| holder_id | See: [Field Conditions](#field-conditions) |
| is_referral_code | See: [Field Conditions](#field-conditions) |
| published_for_customer_id | See: [Field Conditions](#field-conditions) |
| validity_timeframe | See: [Field Conditions](#field-conditions) |
| category_ids | See: [Field Conditions](#field-conditions) |
| [propertyName] | See: [Field Conditions](#field-conditions) |

## Export Redemption Order
Available values: `-id`, `id`, `-voucher_code`, `voucher_code`, `-tracking_id`, `tracking_id`, `-customer_id`, `customer_id`, `-created_at`, `created_at`

## Export Redemption Fields
Available values: `id`, `object`, `date`, `voucher_code`, `campaign`, `promotion_tier_id`, `customer_id`, `customer_source_id`, `customer_name`, `tracking_id`, `order_id`, `order_amount`, `gift_amount`, `loyalty_points`, `result`, `failure_code`, `failure_message`, `metadata`

## Export Redemption Filters
| Attributes |  Description |
|:-----|:--------|
| junction | See: [Junction](#junction) |
| created_at</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">conditions</br><code>object</code></td><td style="text-align:left"><h4>Filters Condition</h4><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">$after</td><td style="text-align:left">See: <a href="#any">Any</a></td></tr><tr><td style="text-align:left">$before</td><td style="text-align:left">See: <a href="#any">Any</a></td></tr></tbody></table></td></tr></tbody></table> |
| campaign</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">conditions</br><code>object</code></td><td style="text-align:left"><h4>Filters Condition</h4><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">$is</td><td style="text-align:left">See: <a href="#any">Any</a></td></tr></tbody></table></td></tr></tbody></table> |
| customer</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">conditions</br><code>object</code></td><td style="text-align:left"><h4>Filters Condition</h4><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">$is</td><td style="text-align:left">See: <a href="#any">Any</a></td></tr></tbody></table></td></tr></tbody></table> |
| voucher</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">conditions</br><code>object</code></td><td style="text-align:left"><h4>Filters Condition</h4><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">$is</td><td style="text-align:left">See: <a href="#any">Any</a></td></tr></tbody></table></td></tr></tbody></table> |
| related_object</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">conditions</br><code>object</code></td><td style="text-align:left"><h4>Filters Condition</h4><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">$in</td><td style="text-align:left">See: <a href="#any">Any</a></td></tr></tbody></table></td></tr></tbody></table> |
| voucher_code | See: [Field Conditions](#field-conditions) |
| related_object_id | See: [Field Conditions](#field-conditions) |
| related_object_parent_id | See: [Field Conditions](#field-conditions) |
| parent_redemption_id | See: [Field Conditions](#field-conditions) |
| failure_code | See: [Field Conditions](#field-conditions) |
| result | See: [Field Conditions](#field-conditions) |
| object | See: [Field Conditions](#field-conditions) |
| customer_id | See: [Field Conditions](#field-conditions) |
| campaign_name | See: [Field Conditions](#field-conditions) |
| user_login | See: [Field Conditions](#field-conditions) |
| status | See: [Field Conditions](#field-conditions) |
| [propertyName] | See: [Field Conditions](#field-conditions) |

## Export Customer Order
Available values: `-name`, `name`, `-id`, `id`, `-email`, `email`, `-source_id`, `source_id`, `-created_at`, `created_at`, `-updated_at`, `updated_at`

## Export Customer Fields
Available values: `name`, `id`, `description`, `email`, `source_id`, `created_at`, `address_city`, `address_state`, `address_line_1`, `address_line_2`, `address_country`, `address_postal_code`, `redemptions_total_redeemed`, `redemptions_total_failed`, `redemptions_total_succeeded`, `redemptions_total_rolled_back`, `redemptions_total_rollback_failed`, `redemptions_total_rollback_succeeded`, `orders_total_amount`, `orders_total_count`, `orders_average_amount`, `orders_last_order_amount`, `orders_last_order_date`, `loyalty_points`, `loyalty_referred_customers`, `updated_at`, `phone`, `birthday`, `metadata`, `birthdate`

## Export Customer Filters
| Attributes |  Description |
|:-----|:--------|
| junction | See: [Junction](#junction) |
| created_at</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">conditions</br><code>object</code></td><td style="text-align:left"><h4>Filters Condition</h4><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">$after</td><td style="text-align:left">See: <a href="#any">Any</a></td></tr><tr><td style="text-align:left">$before</td><td style="text-align:left">See: <a href="#any">Any</a></td></tr></tbody></table></td></tr></tbody></table> |
| updated_at</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">conditions</br><code>object</code></td><td style="text-align:left"><h4>Filters Condition</h4><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">$after</br><code>array</code></td><td style="text-align:left"></td></tr><tr><td style="text-align:left">$before</br><code>array</code></td><td style="text-align:left"></td></tr><tr><td style="text-align:left">$is</br><code>array</code></td><td style="text-align:left"></td></tr></tbody></table></td></tr></tbody></table> |
| email | See: [Field Conditions](#field-conditions) |
| name | See: [Field Conditions](#field-conditions) |
| city</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">conditions</br><code>object</code></td><td style="text-align:left"><h4>Filters Condition</h4><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">$is</td><td style="text-align:left">See: <a href="#any">Any</a></td></tr></tbody></table></td></tr></tbody></table> |
| phone | See: [Field Conditions](#field-conditions) |
| birthday | See: [Field Conditions](#field-conditions) |
| source_id | See: [Field Conditions](#field-conditions) |
| publications.created_at | See: [Field Conditions](#field-conditions) |
| publications.related_object_id | See: [Field Conditions](#field-conditions) |
| [propertyName] | See: [Field Conditions](#field-conditions) |

## Export Publication Order
Available values: `-id`, `id`, `-voucher_code`, `voucher_code`, `-tracking_id`, `tracking_id`, `-customer_id`, `customer_id`, `-created_at`, `created_at`, `-channel`, `channel`

## Export Publication Fields
Available values: `voucher_code`, `customer_id`, `customer_source_id`, `date`, `channel`, `campaign`, `is_winner`, `metadata`

## Export Publication Filters
| Attributes |  Description |
|:-----|:--------|
| junction | See: [Junction](#junction) |
| created_at</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">conditions</br><code>object</code></td><td style="text-align:left"><h4>Filters Condition</h4><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">$after</td><td style="text-align:left">See: <a href="#any">Any</a></td></tr><tr><td style="text-align:left">$before</td><td style="text-align:left">See: <a href="#any">Any</a></td></tr></tbody></table></td></tr></tbody></table> |
| campaign</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">conditions</br><code>object</code></td><td style="text-align:left"><h4>Filters Condition</h4><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">$is</td><td style="text-align:left">See: <a href="#any">Any</a></td></tr></tbody></table></td></tr></tbody></table> |
| customer</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">conditions</br><code>object</code></td><td style="text-align:left"><h4>Filters Condition</h4><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">$is</td><td style="text-align:left">See: <a href="#any">Any</a></td></tr></tbody></table></td></tr></tbody></table> |
| voucher</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">conditions</br><code>object</code></td><td style="text-align:left"><h4>Filters Condition</h4><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">$is</td><td style="text-align:left">See: <a href="#any">Any</a></td></tr></tbody></table></td></tr></tbody></table> |
| failure_code | See: [Field Conditions](#field-conditions) |
| result | See: [Field Conditions](#field-conditions) |
| customer_id | See: [Field Conditions](#field-conditions) |
| campaign_name | See: [Field Conditions](#field-conditions) |
| voucher_type | See: [Field Conditions](#field-conditions) |
| is_referral_code | See: [Field Conditions](#field-conditions) |
| parent_object_id | See: [Field Conditions](#field-conditions) |
| related_object_id | See: [Field Conditions](#field-conditions) |
| source_id | See: [Field Conditions](#field-conditions) |
| [propertyName] | See: [Field Conditions](#field-conditions) |

## Export Order Order
Available values: `-created_at`, `created_at`, `-updated_at`, `updated_at`, `-status`, `status`

## Export Order Fields
Available values: `id`, `source_id`, `created_at`, `updated_at`, `status`, `amount`, `discount_amount`, `items_discount_amount`, `total_discount_amount`, `total_amount`, `customer_id`, `referrer_id`, `metadata`

## Export Order Filters
| Attributes |  Description |
|:-----|:--------|
| junction | See: [Junction](#junction) |
| created_at</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">conditions</br><code>object</code></td><td style="text-align:left"><h4>Filters Condition</h4><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">$after</td><td style="text-align:left">See: <a href="#any">Any</a></td></tr><tr><td style="text-align:left">$before</td><td style="text-align:left">See: <a href="#any">Any</a></td></tr></tbody></table></td></tr></tbody></table> |
| updated_at</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">conditions</br><code>object</code></td><td style="text-align:left"><h4>Filters Condition</h4><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">$after</td><td style="text-align:left">See: <a href="#any">Any</a></td></tr><tr><td style="text-align:left">$before</td><td style="text-align:left">See: <a href="#any">Any</a></td></tr></tbody></table></td></tr></tbody></table> |
| status | See: [Field Conditions](#field-conditions) |
| source_id | See: [Field Conditions](#field-conditions) |
| amount | See: [Field Conditions](#field-conditions) |
| total_amount | See: [Field Conditions](#field-conditions) |
| discount_amount | See: [Field Conditions](#field-conditions) |
| total_discount_amount | See: [Field Conditions](#field-conditions) |
| items_discount_amount | See: [Field Conditions](#field-conditions) |
| [propertyName] | See: [Field Conditions](#field-conditions) |

## Export Points Expiration Order
Available values: `-expires_at`, `expires_at`

## Export Points Expiration Fields
Available values: `id`, `campaign_id`, `voucher_id`, `points`, `status`, `expires_at`

## Export Points Expiration Filters
| Attributes |  Description |
|:-----|:--------|
| junction | See: [Junction](#junction) |
| campaign_id | See: [Field Conditions](#field-conditions) |
| voucher_id | See: [Field Conditions](#field-conditions) |

## Export Voucher Transactions Order
Available values: `-created_at`, `created_at`

## Export Voucher Transactions Fields
Available values: `id`, `campaign_id`, `voucher_id`, `type`, `source_id`, `reason`, `source`, `balance`, `amount`, `related_transaction_id`, `created_at`, `details`

## Export Voucher Transactions Filters
| Attributes |  Description |
|:-----|:--------|
| junction | See: [Junction](#junction) |
| created_at | See: [Field Conditions](#field-conditions) |
| voucher_id | See: [Field Conditions](#field-conditions) |
| campaign_id | See: [Field Conditions](#field-conditions) |

## Junction
<p>Logical Operator Between Filters. Filter by conditions set on the <code>junction</code> parameter indicating how the <code>conditions</code> should be accounted for in the query. An <code>AND</code> is an all-inclusive logical operator, meaning the <code>AND</code> operator displays a record if <strong>ALL</strong> the conditions separated by AND are TRUE, while  an <code>OR</code> operator displays a record if <strong>ANY</strong> of the conditions separated by OR is TRUE.</p>

Available values: `and`, `or`

## Field Conditions
| Attributes |  Description |
|:-----|:--------|
| conditions | <p>Data filters used to narrow down the data records to be returned in the result.</p> [Filters Condition](#filters-condition) |

## Any
Array any of: string, string, string, number, object

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

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n</style>"
}
[/block]
