---
title: Voucher Object
type: basic
categorySlug: voucherify-api
parentDocSlug: vouchers
slug: voucher-object
hidden: false
order: 1
---

## Voucher
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Assigned by the Voucherify API, identifies the voucher.</p> **Example:** <p>v_mkZN9v7vjYUadXnHrMza8W5c34fE5KiV</p> |
| code</br>`string` | <p>A code that identifies a voucher. Pattern can use all letters of the English alphabet, Arabic numerals, and special characters.</p> **Example:** <p>WVPblOYX</p> |
| campaign</br>`string` | <p>A unique campaign name, identifies the voucher's parent campaign.</p> **Example:** <p>Gift Card Campaign</p> |
| campaign_id</br>`string` | <p>Assigned by the Voucherify API, identifies the voucher's parent campaign.</p> **Example:** <p>camp_FNYR4jhqZBM9xTptxDGgeNBV</p> |
| category</br>`string` | <p>Tag defining the category that this voucher belongs to. Useful when listing vouchers using the List Vouchers endpoint.</p> |
| category_id</br>`string` | <p>Unique category ID assigned by Voucherify.</p> **Example:** <p>cat_0bb343dee3cdb5ec0c</p> |
| categories</br>`array` | <p>Contains details about the category.</p> Array of [Category](#category) |
| type</br>`string` | <p>Defines the type of the voucher.</p> Available values: `GIFT_VOUCHER`, `DISCOUNT_VOUCHER`, `LOYALTY_CARD` |
| discount | See: [Discount](#discount) |
| gift</br>`object` | <p>Object representing gift parameters. Child attributes are present only if <code>type</code> is <code>GIFT_VOUCHER</code>. Defaults to <code>null</code>.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">amount</br><code>integer</code></td><td style="text-align:left"><p>Total gift card income over the lifetime of the card. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 amount is written as 10000.</p> <strong>Example:</strong> <p>10000</p></td></tr><tr><td style="text-align:left">balance</br><code>integer</code></td><td style="text-align:left"><p>Available funds. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 amount is written as 10000.</p> <strong>Example:</strong> <p>500</p></td></tr><tr><td style="text-align:left">effect</br><code>string</code></td><td style="text-align:left"><p>Defines how the credits are applied to the customer's order.</p> Available values: <code>APPLY_TO_ORDER</code>, <code>APPLY_TO_ITEMS</code></td></tr></tbody></table> |
| loyalty_card</br>`object` | <p>Object representing loyalty card parameters. Child attributes are present only if <code>type</code> is <code>LOYALTY_CARD</code>. Defaults to <code>null</code>.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>Total points incurred over lifespan of loyalty card.</p> <strong>Example:</strong> <p>7000</p></td></tr><tr><td style="text-align:left">balance</br><code>integer</code></td><td style="text-align:left"><p>Points available for reward redemption.</p> <strong>Example:</strong> <p>6970</p></td></tr><tr><td style="text-align:left">next_expiration_date</br><code>string</code></td><td style="text-align:left"><p>The next closest date when the next set of points are due to expire.</p> <strong>Example:</strong> <p>2023-05-30</p></td></tr><tr><td style="text-align:left">next_expiration_points</br><code>integer</code></td><td style="text-align:left"><p>The amount of points that are set to expire next.</p></td></tr></tbody></table> |
| start_date</br>`string` | <p>Activation timestamp defines when the code starts to be active in ISO 8601 format. Voucher is <em>inactive before</em> this date.</p> **Example:** <p>2021-12-01T00:00:00.000Z</p> |
| expiration_date</br>`string` | <p>Expiration timestamp defines when the code expires in ISO 8601 format.  Voucher is <em>inactive after</em> this date.</p> **Example:** <p>2021-12-31T00:00:00.000Z</p> |
| validity_timeframe</br>`object` | <p>Set recurrent time periods when the voucher is valid. For example, valid for 1 hour every other day.<code>start_date</code> <strong>required</strong> when including the <code>validity_timeframe</code>.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">duration</br><code>string</code></td><td style="text-align:left"><p>Defines the amount of time the voucher will be active in ISO 8601 format. For example, a voucher with a <code>duration</code> of <code>PT1H</code> will be valid for a duration of one hour.</p> <strong>Example:</strong> <p>PT1H</p></td></tr><tr><td style="text-align:left">interval</br><code>string</code></td><td style="text-align:left"><p>Defines the intervening time between two time points in ISO 8601 format, expressed as a duration. For example, a voucher with an <code>interval</code> of <code>P2D</code> will be active every other day.</p> <strong>Example:</strong> <p>P2D</p></td></tr></tbody></table> |
| validity_day_of_week</br>`array` | <p>Integer array corresponding to the particular days of the week in which the voucher is valid.</p><ul><li><code>0</code>  Sunday</li><li><code>1</code>  Monday</li><li><code>2</code>  Tuesday</li><li><code>3</code>  Wednesday</li><li><code>4</code>  Thursday</li><li><code>5</code>  Friday</li><li><code>6</code>  Saturday</li></ul> |
| active</br>`boolean`, `null` | <p>A flag to toggle the voucher on or off. You can disable a voucher even though it's within the active period defined by the <code>start_date</code> and <code>expiration_date</code>.</p><ul><li><code>true</code> indicates an <em>active</em> voucher</li><li><code>false</code> indicates an <em>inactive</em> voucher</li></ul> |
| additional_info</br>`string` | <p>An optional field to keep any extra textual information about the code such as a code description and details.</p> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the code. A set of key/value pairs that you can attach to a voucher object. It can be useful for storing additional information about the voucher in a structured format.</p> |
| assets | See: [Voucher Assets](#voucher-assets) |
| is_referral_code</br>`boolean`, `null` | <p>Flag indicating whether this voucher is a referral code; <code>true</code> for campaign type <code>REFERRAL_PROGRAM</code>.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the voucher was created in ISO 8601 format.</p> **Example:** <p>2021-12-22T10:13:06.487Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the voucher was last updated in ISO 8601 format.</p> **Example:** <p>2021-12-22T10:14:45.316Z</p> |
| holder_id</br>`string` | <p>Unique customer ID of voucher owner.</p> **Example:** <p>cust_eWgXlBBiY6THFRJwX45Iakv4</p> |
| object</br>`string` | <p>The type of object represented by JSON. Default is <code>voucher</code>.</p> |
| deleted</br>`boolean` | <p>Flag indicating whether this voucher is deleted.</p> |
| validation_rules_assignments | See: [Validation Rules Assignments List](#validation-rules-assignments-list) |
| publish</br>`object` | <p>This object stores a summary of publish events: an events counter and an endpoint which can be called to return details of each event.  A publication is required for loyalty cards and referral codes. This object gets updated whenever a voucher has been published. Publication means assigning a code to a particular customer. Typically, a publication is made by distributing your codes to your customers, e.g. through Export to MailChimp or <!-- [publish voucher](OpenAPI.json/paths/~1publications/post) --><a href="ref:create-publication">publish voucher</a> API method.</p><!-- title: My Table Title --><table><thead><tr><th>Required</th><th style="text-align:center">Optional</th></tr></thead><tbody><tr><td><code>type</code>:<code>LOYALTY_CARD</code></td><td style="text-align:center"><code>type</code>:<code>DISCOUNT_VOUCHER</code></td></tr><tr><td><code>is_referral_code</code>:<code>true</code></td><td style="text-align:center"><code>type</code>:<code>GIFT_VOUCHER</code></td></tr></tbody></table> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>The type of object represented is by default <code>list</code>. To get this list, you need to make a call to the endpoint returned in the <code>url</code> attribute.</p></td></tr><tr><td style="text-align:left">count</br><code>integer</code></td><td style="text-align:left"><p>Publication events counter.</p> <strong>Example:</strong> <p>0</p></td></tr><tr><td style="text-align:left">url</br><code>string</code></td><td style="text-align:left"><p>The endpoint where this list of publications can be accessed using a GET method. <code>/v1/vouchers/{voucher_code}/publications</code></p> <strong>Example:</strong> <p>/v1/vouchers/WVPblOYX/publications?page=1&amp;limit=10</p></td></tr></tbody></table> |
| redemption</br>`object` | <p>Stores a summary of redemptions that have been applied to the voucher.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">quantity</br><code>integer</code></td><td style="text-align:left"><p>How many times a voucher can be redeemed. A <code>null</code> value means unlimited.</p></td></tr><tr><td style="text-align:left">redeemed_quantity</br><code>integer</code></td><td style="text-align:left"><p>How many times a voucher has already been redeemed.</p> <strong>Example:</strong> <p>1</p></td></tr><tr><td style="text-align:left">redeemed_amount</br><code>integer</code></td><td style="text-align:left"><p>Total amount redeemed. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 balance is written as 10000.</p> <strong>Example:</strong> <p>100000</p></td></tr><tr><td style="text-align:left">redeemed_points</br><code>integer</code></td><td style="text-align:left"><p>Total loyalty points redeemed.</p> <strong>Example:</strong> <p>100000</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>The type of object represented is by default <code>list</code>. To get this list, you need to make a call to the endpoint returned in the url attribute.</p></td></tr><tr><td style="text-align:left">url</br><code>string</code></td><td style="text-align:left"><p>The endpoint where this list of redemptions can be accessed using a GET method. <code>/v1/vouchers/{voucher_code}/redemptions</code></p> <strong>Example:</strong> <p>/v1/vouchers/WVPblOYX/redemptions?page=1&amp;limit=10</p></td></tr></tbody></table> |

## Category
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique category ID assigned by Voucherify.</p> |
| name</br>`string` | <p>Category name.</p> |
| hierarchy</br>`integer` | <p>Category hierarchy.</p> |
| object</br>`string` | <p>The type of object represented by the JSON. This object stores information about the category.</p> Available values: `category` |
| created_at</br>`string` | <p>Timestamp representing the date and time when the category was created in ISO 8601 format.</p> **Example:** <p>2022-07-14T10:45:13.156Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the category was updated in ISO 8601 format.</p> **Example:** <p>2022-08-16T10:52:08.094Z</p> |
| stacking_rules_type</br>`string` | <p>The type of the stacking rule eligibility.</p> Available values: `JOINT`, `EXCLUSIVE` |

## Discount
<p>Contains information about discount.</p>

One of:

[Amount](#amount), [Unit](#unit), [Unit Multiple](#unit-multiple), [Percent](#percent), [Fixed](#fixed)

## Voucher Assets
| Attributes |  Description |
|:-----|:--------|
| qr</br>`object` | <p>Stores Quick Response (QR) representation of encrypted code.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Encrypted voucher code ID.</p> <strong>Example:</strong> <p>U2FsdGVkX19ucFhvVmBVpVYG5KoswTsjSIaqoKg5L9ie4BK+t4pp7U7oFzjGJzj9q/bmuMOj9mEFiVKDMIkSaruKedMvHbKoPX5Sg+BaZk5QwXMf8k/OzSlOEVybpwSq+AiqPoNtjeuqtIgkDyvT6Q==</p></td></tr><tr><td style="text-align:left">url</br><code>string</code></td><td style="text-align:left"><p>URL to QR code</p><p><em>Optional:</em> Attach query parameters to base URL to customize the image of the encrypted voucher code.</p><ul><li><code>size</code>: integer value from <code>1</code> to <code>100</code></li><li><code>format</code>: string, either <code>png</code> (default) or <code>svg</code></li></ul> <strong>Example:</strong> <p>https://dev.dl.voucherify.io/api/v1/assets/qr/U2FsdGVkX19ucFhvVmBVpVYG5KoswTsjSIaqoKg5L9ie4BK%2Bt4pp7U7oFzjGJzj9q%2FbmuMOj9mEFiVKDMIkSaruKedMvHbKoPX5Sg%2BBaZk5QwXMf8k%2FOzSlOEVybpwSq%2BAiqPoNtjeuqtIgkDyvT6Q%3D%3D</p></td></tr></tbody></table> |
| barcode</br>`object` | <p>Stores barcode representation of encrypted code.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Encrypted voucher code ID.</p> <strong>Example:</strong> <p>U2FsdGVkX19eJhGfWwUrH9+tulBkON+AnMktic+N6CVWzZ9+fHVxuVx22WakrzxiWXy0skuvvEHSeZIw9HlgyIJ+kJ1iPdUKpyENuNYJKzoZlO0mmTf6WQM6/pFs61apEn9SJx32ttCF6d3oxKISQQ==</p></td></tr><tr><td style="text-align:left">url</br><code>string</code></td><td style="text-align:left"><p>URL to barcode</p><p><em>Optional:</em> Attach query parameters to base URL to customize the image of the encrypted voucher code.</p><ul><li><code>size</code>: integer value from <code>1</code> to <code>100</code></li><li><code>format</code>: string, either <code>png</code> (default) or <code>svg</code></li></ul> <strong>Example:</strong> <p>https://dev.dl.voucherify.io/api/v1/assets/barcode/U2FsdGVkX19eJhGfWwUrH9%2BtulBkON%2BAnMktic%2BN6CVWzZ9%2BfHVxuVx22WakrzxiWXy0skuvvEHSeZIw9HlgyIJ%2BkJ1iPdUKpyENuNYJKzoZlO0mmTf6WQM6%2FpFs61apEn9SJx32ttCF6d3oxKISQQ%3D%3D</p></td></tr></tbody></table> |

## Validation Rules Assignments List
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about validation rules assignments.</p> Available values: `list` |
| data_ref</br>`string` | <p>Identifies the name of the attribute that contains the array of validation rules assignments.</p> Available values: `data` |
| data</br>`array` | <p>Contains array of validation rules assignments.</p> Array of [Business Validation Rule Assignment](#business-validation-rule-assignment) |
| total</br>`integer` | <p>Total number of validation rules assignments.</p> |

## Amount
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines the type of the voucher.</p> Available values: `AMOUNT` |
| amount_off</br>`number` | <p>Amount taken off the subtotal of a price. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 discount is written as 1000.</p> |
| amount_off_formula</br>`string` |  |
| aggregated_amount_limit</br>`integer` | <p>Maximum discount amount per order.</p> |
| effect | <p>Defines how the discount is applied to the customer's order.</p> [Discount Amount Vouchers Effect Types](#discount-amount-vouchers-effect-types) |
| is_dynamic</br>`boolean` | <p>Flag indicating whether the discount was calculated using a formula.</p> |

## Unit
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Discount type.</p> Available values: `UNIT` |
| unit_off</br>`integer` | <p>Number of units to be granted a full value discount.</p> |
| unit_off_formula</br>`string` |  |
| effect | <p>Defines how the unit is added to the customer's order.</p> [Discount Unit Vouchers Effect Types](#discount-unit-vouchers-effect-types) |
| unit_type</br>`string` | <p>The product deemed as free, chosen from product inventory (e.g. time, items).</p> |
| product | <p>Contains information about the product.</p> [Simple Product Discount Unit](#simple-product-discount-unit) |
| sku | See: [Simple Sku Discount Unit](#simple-sku-discount-unit) |
| is_dynamic</br>`boolean` | <p>Flag indicating whether the discount was calculated using a formula.</p> |

## Unit Multiple
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Discount type.</p> Available values: `UNIT` |
| effect</br>`string` | <p>Defines how the discount is applied to the customer's order.</p> Available values: `ADD_MANY_ITEMS` |
| units</br>`array` | Array of [One Unit](#one-unit) |

## Percent
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines the type of the voucher.</p> Available values: `PERCENT` |
| percent_off</br>`number` | <p>The percent discount that the customer will receive.</p> |
| percent_off_formula</br>`string` |  |
| amount_limit</br>`number` | <p>Upper limit allowed to be applied as a discount. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $6 maximum discount is written as 600.</p> |
| aggregated_amount_limit</br>`integer` | <p>Maximum discount amount per order.</p> |
| effect | <p>Defines how the discount is applied to the customer's order.</p> [Discount Percent Vouchers Effect Types](#discount-percent-vouchers-effect-types) |
| is_dynamic</br>`boolean` | <p>Flag indicating whether the discount was calculated using a formula.</p> |

## Fixed
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines the type of the voucher.</p> Available values: `FIXED` |
| fixed_amount</br>`number` | <p>Sets a fixed value for an order total or the item price. The value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 discount is written as 1000. If the fixed amount is calculated by the formula, i.e. the <code>fixed_amount_formula</code> parameter is present in the fixed amount definition, this value becomes the <strong>fallback value</strong>. As a result, if the formula cannot be calculated due to missing metadata, for example, this value will be used as the fixed value.</p> |
| fixed_amount_formula</br>`string` |  |
| effect | <p>Defines how the discount is applied to the customer's order.</p> [Discount Fixed Vouchers Effect Types](#discount-fixed-vouchers-effect-types) |
| is_dynamic</br>`boolean` | <p>Flag indicating whether the discount was calculated using a formula.</p> |

## Business Validation Rule Assignment
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>The unique identifier for a assignment</p> |
| rule_id</br>`string` | <p>The unique identifier for a rule</p> |
| related_object_id</br>`string` | <p>The unique identifier for a related object</p> |
| related_object_type</br>`string` | <p>The type of related object</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the object was created in ISO 8601 format.</p> **Example:** <p>2022-03-09T11:19:04.819Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the object was last updated in ISO 8601 format.</p> **Example:** <p>2022-03-09T11:19:04.819Z</p> |
| object</br>`string` | <p>The type of object represented by JSON.</p> Available values: `validation_rules_assignment` |
| validation_status</br>`string` | <p>The validation status of the assignment</p> Available values: `VALID`, `PARTIALLY_VALID`, `INVALID` |
| validation_omitted_rules</br>`array` | <p>The list of omitted rules</p> |

## Discount Amount Vouchers Effect Types
Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS`, `APPLY_TO_ITEMS_PROPORTIONALLY`, `APPLY_TO_ITEMS_PROPORTIONALLY_BY_QUANTITY`, `APPLY_TO_ITEMS_BY_QUANTITY`

## Discount Unit Vouchers Effect Types
Available values: `ADD_MISSING_ITEMS`, `ADD_NEW_ITEMS`, `ADD_MANY_ITEMS`

## Simple Product Discount Unit
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique product ID, assigned by Voucherify.</p> |
| source_id</br>`string` | <p>Product's source ID.</p> |
| name</br>`string` | <p>Product name.</p> |

## Simple Sku Discount Unit
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique SKU ID, assigned by Voucherify.</p> |
| source_id</br>`string` | <p>Product variant's source ID.</p> |
| name</br>`string` | <p>Sku name</p> |

## One Unit
| Attributes |  Description |
|:-----|:--------|
| unit_off</br>`number` | <p>Number of units to be granted a full value discount.</p> |
| unit_off_formula</br>`string` |  |
| effect</br>`string` | <p>Defines how the unit is added to the customer's order.</p> Available values: `ADD_NEW_ITEMS`, `ADD_MISSING_ITEMS` |
| unit_type</br>`string` | <p>The product deemed as free, chosen from product inventory (e.g. time, items).</p> |
| product | <p>Contains information about the product.</p> [Simple Product Discount Unit](#simple-product-discount-unit) |
| sku | <p>Contains information about the sku.</p> [Simple Sku Discount Unit](#simple-sku-discount-unit) |

## Discount Percent Vouchers Effect Types
Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS`

## Discount Fixed Vouchers Effect Types
Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS`

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
