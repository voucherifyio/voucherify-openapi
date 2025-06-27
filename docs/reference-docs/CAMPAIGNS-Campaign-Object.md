---
title: Campaign Object
type: basic
categorySlug: voucherify-api
parentDocSlug: campaigns
slug: campaign-object
hidden: false
order: 1
---

## Campaign
All of:

1. [Campaign Base](#campaign-base)
2. <h3>Campaign Additional Data</h3><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">promotion</td><td style="text-align:left">See: <a href="#promotion-tiers">Promotion Tiers</a></td></tr><tr><td style="text-align:left">validation_rules_assignments</td><td style="text-align:left">See: <a href="#validation-rules-assignments-list">Validation Rules Assignments List</a></td></tr></tbody></table>

## Campaign Base
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique campaign ID, assigned by Voucherify.</p> **Example:** <p>camp_f7fBbQxUuTN7dI7tGOo5XMDA</p> |
| name</br>`string` | <p>Campaign name.</p> |
| description</br>`string` | <p>An optional field to keep any extra textual information about the campaign such as a campaign description and details.</p> |
| campaign_type</br>`string` | <p>Type of campaign.</p> Available values: `LOYALTY_PROGRAM`, `GIFT_VOUCHERS`, `DISCOUNT_COUPONS`, `PROMOTION`, `REFERRAL_PROGRAM` |
| type</br>`string` | <p>Defines whether the campaign can be updated with new vouchers after campaign creation or if the campaign consists of generic (standalone) voucherss.</p><ul><li><code>AUTO_UPDATE</code>: the campaign is dynamic, i.e. vouchers will generate based on set criteria</li><li><code>STATIC</code>: vouchers need to be manually published</li><li><code>STANDALONE</code>: campaign for single vouchers</li></ul> Available values: `AUTO_UPDATE`, `STATIC`, `STANDALONE` |
| voucher | See: [Campaign Voucher](#campaign-voucher) |
| auto_join</br>`boolean` | <p>Indicates whether customers will be able to auto-join a loyalty campaign if any earning rule is fulfilled.</p> |
| join_once</br>`boolean` | <p>If this value is set to <code>true</code>, customers will be able to join the campaign only once. It is always <code>false</code> for generic (standalone) vouchers campaigns and it cannot be changed in them. It is always <code>true</code> for loyalty campaigns and it cannot be changed in them.</p> |
| use_voucher_metadata_schema</br>`boolean` | <p>Flag indicating whether the campaign is to use the voucher's metadata schema instead of the campaign metadata schema.</p> |
| validity_timeframe | See: [Validity Timeframe](#validity-timeframe) |
| validity_day_of_week | See: [Validity Day Of Week](#validity-day-of-week) |
| validity_hours | See: [Validity Hours](#validity-hours) |
| activity_duration_after_publishing</br>`string` | <p>Defines the amount of time the vouchers will be active after publishing. The value is shown in the ISO 8601 format. For example, a voucher with the value of P24D will be valid for a duration of 24 days.</p> |
| vouchers_count</br>`integer` | <p>Total number of unique vouchers in campaign.</p> |
| start_date</br>`string` | <p>Activation timestamp defines when the campaign starts to be active in ISO 8601 format. Campaign is <em>inactive before</em> this date.</p> **Example:** <p>2022-09-20T00:00:00.000Z</p> |
| expiration_date</br>`string` | <p>Expiration timestamp defines when the campaign expires in ISO 8601 format.  Campaign is <em>inactive after</em> this date.</p> **Example:** <p>2022-09-30T00:00:00.000Z</p> |
| active</br>`boolean` | <p>A flag to toggle the campaign on or off. You can disable a campaign even though it's within the active period defined by the <code>start_date</code> and <code>expiration_date</code>.</p><ul><li><code>true</code> indicates an <em>active</em> campaign</li><li><code>false</code> indicates an <em>inactive</em> campaign</li></ul> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the campaign. A set of key/value pairs that you can attach to a campaign object. It can be useful for storing additional information about the campaign in a structured format.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the campaign was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2021-12-01T08:00:50.038Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the campaign was last updated in ISO 8601 format.</p> **Example:** <p>2022-09-20T09:18:19.623Z</p> |
| category</br>`string` | <p>Unique category name.</p> |
| creation_status</br>`string` | <p>Indicates the status of the campaign creation.</p> Available values: `DONE`, `IN_PROGRESS`, `FAILED`, `DRAFT`, `MODIFYING` |
| vouchers_generation_status</br>`string` | <p>Indicates the status of the campaign's voucher generation.</p> Available values: `DONE`, `IN_PROGRESS`, `FAILED`, `DRAFT`, `MODIFYING` |
| readonly</br>`boolean` | <p>Indicates whether the campaign can be only read by a restricted user in the Areas and Stores enterprise feature. It is returned only to restricted users; this field is not returned for users with other roles. It is also not returned for restricted users who use the <a href="ref:campaign-summary">GET Campaign summary</a> endpoint.</p> |
| protected</br>`boolean` | <p>Indicates whether the resource can be deleted.</p> |
| category_id</br>`string`, `null` | <p>Unique category ID that this campaign belongs to.</p> **Example:** <p>cat_0b688929a2476386a7</p> |
| categories</br>`array` | <p>Contains details about the campaign category. For the GET <a href="ref:list-campaigns">List campaigns</a> endpoint, this is returned only if the <code>expand=category</code> query parameter is passed in the request. Otherwise, it is returned as an empty array. For GET <a href="ref:get-campaign-summary">Campaign summary</a> endpoint, it is always returned as an empty array.</p> Array of [Category](#category) |
| object</br>`string` | <p>The type of the object represented by JSON. This object stores information about the campaign.</p> |
| referral_program | See: [Referral Program](#referral-program) |
| loyalty_tiers_expiration | See: [Loyalty Tiers Expiration](#loyalty-tiers-expiration) |
| access_settings_assignments | See: [Access Settings Campaign Assignments List](#access-settings-campaign-assignments-list) |

## Promotion Tiers
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>The type of the object represented by JSON. This object stores information about promotion tiers in a dictionary.</p> |
| data_ref</br>`string` | <p>Identifies the name of the attribute that contains the array of promotion tier objects.</p> |
| tiers</br>`array` | <p>Contains array of promotion tier objects.</p> Array of [Promotion Tier](#promotion-tier) |
| total</br>`integer` | <p>Total number of promotion tiers.</p> |
| has_more</br>`boolean` | <p>As query results are always limited (by the limit parameter), the <code>has_more</code> flag indicates if there are more records for given filter parameters. This lets you know if you can run another request to get more records returned in the results.</p> |

## Validation Rules Assignments List
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>The type of the object represented by JSON. This object stores information about validation rules assignments.</p> Available values: `list` |
| data_ref</br>`string` | <p>Identifies the name of the attribute that contains the array of validation rules assignments.</p> Available values: `data` |
| data</br>`array` | <p>Contains array of validation rules assignments.</p> Array of [Business Validation Rule Assignment](#business-validation-rule-assignment) |
| total</br>`integer` | <p>Total number of validation rules assignments.</p> |

## Campaign Voucher
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Type of voucher.</p> |
| discount | <p>Defines the voucher discount type and details.</p> [Discount](#discount) |
| gift | <p>Defines the voucher gift details.</p> [Gift](#gift) |
| loyalty_card | <p>Defines the voucher loyalty card details.</p> [Campaign Loyalty Card](#campaign-loyalty-card) |
| redemption</br>`object` | <p>Defines the redemption limits on vouchers.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">quantity</br><code>integer</code>, <code>null</code></td><td style="text-align:left"><p>How many times a voucher can be redeemed. A <code>null</code> value means unlimited.</p></td></tr></tbody></table> |
| code_config | [Code Config](#code-config) |
| is_referral_code</br>`boolean` | <p>Flag indicating whether this voucher is a referral code; <code>true</code> for campaign type <code>REFERRAL_PROGRAM</code>.</p> |
| start_date</br>`string` | <p>Activation timestamp defines when the campaign starts to be active in ISO 8601 format. Campaign is <em>inactive before</em> this date.</p> **Example:** <p>2022-09-20T00:00:00.000Z</p> |
| expiration_date</br>`string` | <p>Expiration timestamp defines when the campaign expires in ISO 8601 format.  Campaign is <em>inactive after</em> this date.</p> **Example:** <p>2022-09-30T00:00:00.000Z</p> |
| validity_timeframe | See: [Validity Timeframe](#validity-timeframe) |
| validity_day_of_week | See: [Validity Day Of Week](#validity-day-of-week) |
| validity_hours | See: [Validity Hours](#validity-hours) |

## Validity Timeframe
| Attributes |  Description |
|:-----|:--------|
| duration</br>`string` | <p>Defines the amount of time an earning rule will be active in ISO 8601 format. For example, an earning rule with a <code>duration</code> of <code>PT1H</code> will be valid for a duration of one hour.</p> **Example:** <p>PT1H</p> |
| interval</br>`string` | <p>Defines the intervening time between two time points in ISO 8601 format, expressed as a duration. For example, an earning rule with an <code>interval</code> of <code>P2D</code> will be valid every other day.</p> **Example:** <p>P2D</p> |

## Validity Day Of Week
<p>Integer array corresponding to the particular days of the week in which the voucher is valid.</p><ul><li><code>0</code> Sunday</li><li><code>1</code> Monday</li><li><code>2</code> Tuesday</li><li><code>3</code> Wednesday</li><li><code>4</code> Thursday</li><li><code>5</code> Friday</li><li><code>6</code> Saturday</li></ul>

## Validity Hours
| Attributes |  Description |
|:-----|:--------|
| daily</br>`array` | <p>Defines the reccuring period(s) when the resource is active. The periods should not overlap.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">start_time</br><code>string</code></td><td style="text-align:left"><p>Defines the starting hour of validity in the HH:mm format. The resource is <em>inactive before</em> this time.</p> <strong>Example:</strong> <p>12:00</p></td></tr><tr><td style="text-align:left">days_of_week</br><code>array</code></td><td style="text-align:left"><p>Integer array corresponding to the particular days of the week in which the resource is valid.</p><ul><li><code>0</code> Sunday</li><li><code>1</code> Monday</li><li><code>2</code> Tuesday</li><li><code>3</code>  Wednesday</li><li><code>4</code> Thursday</li><li><code>5</code> Friday</li><li><code>6</code> Saturday</li></ul></td></tr><tr><td style="text-align:left">expiration_time</br><code>string</code></td><td style="text-align:left"><p>Defines the ending hour of validity in the HH:mm format. The resource is <em>inactive after</em> this time.</p> <strong>Example:</strong> <p>14:00</p></td></tr></tbody></table> |

## Category
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique category ID assigned by Voucherify.</p> |
| name</br>`string` | <p>Category name.</p> |
| hierarchy</br>`integer` | <p>Category hierarchy. Categories with lower hierarchy are processed before categories with higher hierarchy value.</p> |
| object</br>`string` | <p>The type of the object represented by the JSON. This object stores information about the category.</p> Available values: `category` |
| created_at</br>`string` | <p>Timestamp representing the date and time when the category was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-07-14T10:45:13.156Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the category was updated. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-08-16T10:52:08.094Z</p> |

## Referral Program
| Attributes |  Description |
|:-----|:--------|
| conversion_event_type</br>`string` | <p>Define how a referral is triggered.</p> Available values: `redemption`, `custom_event` |
| custom_event</br>`object` | <p>Contains details about the custom event.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique custom event ID.</p> <strong>Example:</strong> <p>ms_Ll9enAm2BCN0M1s4VxWobLFM</p></td></tr><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"><p>Custom event name.</p></td></tr></tbody></table> |
| referee_reward</br>`object` | <p>Defines the referee reward.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">related_object_parent</br><code>object</code></td><td style="text-align:left"><p>Details of the resource from which the reward originates.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique ID of the reward source.</p> <strong>Example:</strong> <p>camp_kdxp3vf1clQ9CFs1jpqv3tZe</p></td></tr><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"><p>Name of the reward source.</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>Type of resource represented by the source of the reward.</p> Available values: <code>CAMPAIGN</code></td></tr></tbody></table></td></tr><tr><td style="text-align:left">type</br><code>string</code></td><td style="text-align:left"><p>Type of reward.</p> Available values: <code>LOYALTY_CARD</code>, <code>GIFT_VOUCHER</code></td></tr><tr><td style="text-align:left">amount</br><code>string</code></td><td style="text-align:left"><p>Define the number of <code>points</code> to add to a loyalty card or <code>credits</code> to the balance on a gift card. In case of the gift card, the value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 amount is written as 10000.</p></td></tr></tbody></table> |

## Loyalty Tiers Expiration
| Attributes |  Description |
|:-----|:--------|
| qualification_type</br>`string` | <p>Tier qualification.</p><p><code>BALANCE</code>: Points balance is based on the customer's current points balance. Customers qualify for the tier if their points balance is in the points range of the tier.<br><code>POINTS_IN_PERIOD</code>: A customer qualifies for the tier only if the sum of the accumulated points in a <strong>defined time interval</strong> reaches the tier threshold.</p> Available values: `BALANCE`, `POINTS_IN_PERIOD` |
| qualification_period</br>`string` | <p>Customers can qualify for the tier if they collected enough points in a given time period. So, in addition to the customer having to reach a points range, they also need to have collected the points within a set time period.</p><table><thead><tr><th style="text-align:left"><strong>Period</strong></th><th style="text-align:left"><strong>Definition</strong></th></tr></thead><tbody><tr><td style="text-align:left"><strong>Calendar Month</strong></td><td style="text-align:left">Points collected in one calendar month<br>January, February, March, etc.</td></tr><tr><td style="text-align:left"><strong>Calendar Quarter</strong></td><td style="text-align:left">Points collected in the quarter<br>- January - March<br>- April - June<br>- July - September<br>- October - December</td></tr><tr><td style="text-align:left"><strong>Calendar Half-year</strong></td><td style="text-align:left">Points collected in the half-year<br>- January - June<br>- July - December</td></tr><tr><td style="text-align:left"><strong>Calendar Year</strong></td><td style="text-align:left">Points collected in one calendar year<br>January - December</td></tr></tbody></table> Available values: `MONTH`, `QUARTER`, `HALF_YEAR`, `YEAR` |
| start_date</br>`object` | <p>Defines the conditions for the start date of the tier.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">type</br><code>string</code></td><td style="text-align:left"><p>What triggers the tier to be valid for a customer.<br><code>IMMEDIATE</code>: After reaching the minimum required points.<br><code>NEXT_PERIOD</code>: When the next qualification period starts.</p> Available values: <code>IMMEDIATE</code>, <code>NEXT_PERIOD</code></td></tr></tbody></table> |
| expiration_date</br>`object` | <p>Defines the conditions for the expiration date of a tier.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">type</br><code>string</code></td><td style="text-align:left"><p>What triggers the tier to expire for a customer.<br><code>END_OF_PERIOD</code>: Expire tier at the end of the period.<br><code>END_OF_NEXT_PERIOD</code>:  Expire tier at the end of the next period.<br><code>BALANCE_DROP</code>: Tier expires when the points balance drops below the required range of the tier.<br><code>CUSTOM</code>: Tier expires after a certain time period passes following the instance the points balance drops below the required range of the tier.</p> Available values: <code>END_OF_PERIOD</code>, <code>END_OF_NEXT_PERIOD</code>, <code>BALANCE_DROP</code>, <code>CUSTOM</code></td></tr><tr><td style="text-align:left">extend</br><code>string</code></td><td style="text-align:left"><p>Extend the expiration by adding extra months or days in ISO 8601 format. The tier will remain active even though it reaches its expiration time period. For example, a tier with a duration of <code>P3M</code> will be valid for an additional duration of 3 months and a tier with a duration of <code>P1D</code> will be valid for an additional duration of 1 day.</p></td></tr><tr><td style="text-align:left">rounding</td><td style="text-align:left"><p>Defines the rounding mechanism for tier expiration.</p></td></tr></tbody></table> |

## Access Settings Campaign Assignments List
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>The type of the object represented by JSON. Default is <code>list</code>. This object stores information about campaign assignments to areas and stores</p> Available values: `list` |
| data_ref</br>`string` | <p>Identifies the name of the attribute that contains the array of campaign assignments.</p> Available values: `data` |
| data</br>`array` | <p>Contains an array of campaign assignments.</p> Array of [Areas and Stores Campain Assignment](#areas-and-stores-campain-assignment) |
| total</br>`integer` | <p>Total number of areas and stores to which the campaign is assigned.</p> |

## Promotion Tier
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique promotion tier ID.</p> **Example:** <p>promo_63fYCt81Aw0h7lzyRkrGZh9p</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the promotion tier was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2021-12-15T11:34:01.333Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the promotion tier was updated. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-02-09T09:20:05.603Z</p> |
| name</br>`string` | <p>Name of the promotion tier.</p> |
| banner</br>`string` | <p>Text to be displayed to your customers on your website.</p> |
| action</br>`object` | <p>Contains details about the discount applied by the promotion tier.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">discount</td><td style="text-align:left">See: <a href="#discount">Discount</a></td></tr></tbody></table> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the promotion tier. A set of key/value pairs that you can attach to a promotion tier object. It can be useful for storing additional information about the promotion tier in a structured format.</p> |
| hierarchy</br>`integer` | <p>The promotions hierarchy defines the order in which the discounts from different tiers will be applied to a customer's order. If a customer qualifies for discounts from more than one tier, discounts will be applied in the order defined in the hierarchy.</p> |
| promotion_id</br>`string` | <p>Promotion unique ID.</p> |
| campaign</br>`object` | <p>Contains details about promotion tier's parent campaign.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique campaign ID.</p></td></tr><tr><td style="text-align:left">start_date</br><code>string</code></td><td style="text-align:left"><p>Activation timestamp defines when the campaign starts to be active in ISO 8601 format. Campaign is <em>inactive before</em> this date.</p> <strong>Example:</strong> <p>2022-09-22T00:00:00.000Z</p></td></tr><tr><td style="text-align:left">expiration_date</br><code>string</code></td><td style="text-align:left"><p>Expiration timestamp defines when the campaign expires in ISO 8601 format.  Campaign is <em>inactive after</em> this date.</p> <strong>Example:</strong> <p>2022-09-30T00:00:00.000Z</p></td></tr><tr><td style="text-align:left">validity_timeframe</td><td style="text-align:left">See: <a href="#validity-timeframe">Validity Timeframe</a></td></tr><tr><td style="text-align:left">validity_day_of_week</td><td style="text-align:left">See: <a href="#validity-day-of-week">Validity Day Of Week</a></td></tr><tr><td style="text-align:left">validity_hours</td><td style="text-align:left">See: <a href="#validity-hours">Validity Hours</a></td></tr><tr><td style="text-align:left">active</br><code>boolean</code></td><td style="text-align:left"><p>A flag indicating whether the campaign is active or not active. A campaign can be disabled even though it's within the active period defined by the <code>start_date</code> and <code>expiration_date</code> using the <!-- [Disable Campaign](OpenAPI.json/paths/~1campaigns~1{campaignId}~1disable) --><a href="ref:disable-campaign">Disable Campaign</a> endpoint.</p><ul><li><code>true</code> indicates an <em>active</em> campaign</li><li><code>false</code> indicates an <em>inactive</em> campaign</li></ul></td></tr><tr><td style="text-align:left">category_id</br><code>string</code></td><td style="text-align:left"><p>Unique category ID that this campaign belongs to.</p> <strong>Example:</strong> <p>cat_0b688929a2476386a6</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>The type of the object represented by the campaign object. This object stores information about the campaign.</p></td></tr></tbody></table> |
| campaign_id</br>`string` | <p>Promotion tier's parent campaign's unique ID.</p> |
| active</br>`boolean` | <p>A flag to toggle the promotion tier on or off. You can disable a promotion tier even though it's within the active period defined by the <code>start_date</code> and <code>expiration_date</code>.</p><ul><li><code>true</code> indicates an <em>active</em> promotion tier</li><li><code>false</code> indicates an <em>inactive</em> promotion tier</li></ul> |
| start_date</br>`string` | <p>Activation timestamp defines when the promotion tier starts to be active in ISO 8601 format. Promotion tier is <em>inactive before</em> this date.</p> **Example:** <p>2022-09-23T00:00:00.000Z</p> |
| expiration_date</br>`string` | <p>Activation timestamp defines when the promotion tier expires in ISO 8601 format. Promotion tier is <em>inactive after</em> this date.</p> **Example:** <p>2022-09-26T00:00:00.000Z</p> |
| validity_timeframe | See: [Validity Timeframe](#validity-timeframe) |
| validity_day_of_week | See: [Validity Day Of Week](#validity-day-of-week) |
| validity_hours | See: [Validity Hours](#validity-hours) |
| summary</br>`object` | <p>Contains statistics about promotion tier redemptions and orders.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">redemptions</br><code>object</code></td><td style="text-align:left"><p>Contains statistics about promotion tier redemptions.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">total_redeemed</br><code>integer</code></td><td style="text-align:left"><p>Number of times the promotion tier was redeemed.</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">orders</br><code>object</code></td><td style="text-align:left"><p>Contains statistics about orders related to the promotion tier.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">total_amount</br><code>integer</code></td><td style="text-align:left"><p>Sum of order totals.</p></td></tr><tr><td style="text-align:left">total_discount_amount</br><code>integer</code></td><td style="text-align:left"><p>Sum of total discount applied using the promotion tier.</p></td></tr></tbody></table></td></tr></tbody></table> |
| object</br>`string` | <p>The type of the object represented by JSON. This object stores information about the promotion tier.</p> |
| validation_rule_assignments | See: [Validation Rule Assignments List](#validation-rule-assignments-list) |
| category_id</br>`string` | <p>Promotion tier category ID.</p> **Example:** <p>cat_0c9da30e7116ba6bba</p> |
| categories</br>`array` | Array of [Category](#category) |

## Business Validation Rule Assignment
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>The unique identifier for a assignment</p> |
| rule_id</br>`string` | <p>The unique identifier for a rule</p> |
| related_object_id</br>`string` | <p>The unique identifier for a related object</p> |
| related_object_type</br>`string` | <p>The type of related object</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the object was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-03-09T11:19:04.819Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the object was last updated in ISO 8601 format.</p> **Example:** <p>2022-03-09T11:19:04.819Z</p> |
| object</br>`string` | <p>The type of the object represented by JSON.</p> Available values: `validation_rules_assignment` |
| validation_status</br>`string` | <p>The validation status of the assignment</p> Available values: `VALID`, `PARTIALLY_VALID`, `INVALID` |
| validation_omitted_rules</br>`array` | <p>The list of omitted rules</p> |

## Discount
<p>Contains information about discount.</p>

One of:

[Amount](#amount), [Unit](#unit), [Unit Multiple](#unit-multiple), [Percent](#percent), [Fixed](#fixed)

## Gift
| Attributes |  Description |
|:-----|:--------|
| amount</br>`number` | <p>Total gift card income over the lifetime of the card. The value is multiplied by 100 to represent 2 decimal places. For example <code>10000 cents</code> for <code>$100.00</code>.</p> |
| subtracted_amount</br>`integer` | <p>Total amount of subtracted credits over the gift card lifetime.</p> |
| balance</br>`number` | <p>Available funds. The value is multiplied by 100 to represent 2 decimal places. For example <code>10000 cents</code> for <code>$100.00</code>. <code>balance</code> = <code>amount</code> - <code>subtracted_amount</code> - <code>redemption.redeemed_amount</code>.</p> |
| effect</br>`string` | <p>Defines how the credits are applied to the customer's order.</p> Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS` |

## Campaign Loyalty Card
| Attributes |  Description |
|:-----|:--------|
| points</br>`integer` | <p>The initial number of points to assign to the loyalty card. This is the current loyalty card score i.e. the number of loyalty points on the card.</p> |
| expiration_rules</br>`object` | <p>Defines the loyalty point expiration rule. This expiration rule applies when there are no <code>expiration_rules</code> defined for an earning rule.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">period_type</br><code>string</code></td><td style="text-align:left"><p>Type of period. Can be set for <code>MONTH</code> or <code>FIXED_DAY_OF_YEAR</code>. <code>MONTH</code> requires the <code>period_value</code> field. <code>FIXED_DAY_OF_YEAR</code> requires the <code>fixed_month</code> and <code>fixed_day</code> fields.</p> Available values: <code>FIXED_DAY_OF_YEAR</code>, <code>MONTH</code></td></tr><tr><td style="text-align:left">period_value</br><code>integer</code></td><td style="text-align:left"><p>Value of the period. Required for the <code>period_type: MONTH</code>.</p></td></tr><tr><td style="text-align:left">rounding_type</br><code>string</code></td><td style="text-align:left"><p>Type of rounding of the expiration period. Optional for the <code>period_type: MONTH</code>.</p> Available values: <code>END_OF_MONTH</code>, <code>END_OF_QUARTER</code>, <code>END_OF_HALF_YEAR</code>, <code>END_OF_YEAR</code>, <code>PARTICULAR_MONTH</code></td></tr><tr><td style="text-align:left">rounding_value</br><code>integer</code></td><td style="text-align:left"><p>Value of rounding of the expiration period. Required for the <code>rounding_type</code>.</p></td></tr><tr><td style="text-align:left">fixed_month</br><code>integer</code></td><td style="text-align:left"><p>Determines the month when the points expire; <code>1</code> is January, <code>2</code> is February, and so on. Required for the <code>period_type: FIXED_DAY_OF_YEAR</code>.</p></td></tr><tr><td style="text-align:left">fixed_day</br><code>integer</code></td><td style="text-align:left"><p>Determines the day of the month when the points expire. Required for the <code>period_type: FIXED_DAY_OF_YEAR</code>.</p></td></tr></tbody></table> |

## Code Config
| Attributes |  Description |
|:-----|:--------|
| length</br>`number` | <p>Number of characters in a generated code (excluding prefix and postfix).</p> |
| charset</br>`string` | <p>Characters that can appear in the code.</p><p>Examples:</p><ul><li>Alphanumeric: <code>0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ</code></li><li>Alphabetic: <code>abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ</code></li><li>Alphabetic Lowercase: <code>abcdefghijklmnopqrstuvwxyz</code></li><li>Alphabetic Uppercase: <code>ABCDEFGHIJKLMNOPQRSTUVWXYZ</code></li><li>Numbers: <code>0123456789</code></li><li>Custom: a custom character set</li></ul> |
| prefix</br>`string` | <p>A text appended before the code.</p> |
| postfix</br>`string` | <p>A text appended after the code.</p> |
| pattern</br>`string` | <p>A pattern for codes where hashes (#) will be replaced with random characters. Overrides <code>length</code>.</p> |
| initial_count</br>`integer` | <p>Internal value, does not change anything if provided.</p> |

## Areas and Stores Campain Assignment
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique identifier of the campaign assignment.</p> **Example:** <p>arsca_0ef5ee192117ae2416</p> |
| area_id</br>`string` | <p>Unique identifier of the area to which the campaign is assigned.</p> **Example:** <p>ar_0ea6cd7b781b8f857f</p> |
| all_stores</br>`boolean` | <p>Determines if the campaign is assigned to all of the stores in the area, i.e. if an area ID is passed in the <code>access_settings.assign.area_all_stores_ids</code> in the request.</p> |
| area_store_id</br>`string` | <p>Unique identifier of the store to which the campaign is assigned.</p> **Example:** <p>ars_0ec347e2016bed85f4</p> |
| created_at</br>`string` | <p>Date and time when the assignment was made. The value is shown in the ISO 8601 format.</p> **Example:** <p>2024-06-25T19:04:16.260Z</p> |
| object</br>`string` | <p>The type of the object represented by JSON. This object stores information about the campaign assignment to areas or stores.</p> Available values: `area_store_campaign_assignment` |

## Validation Rule Assignments List
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>The type of the object represented by JSON. This object stores information about validation rule assignments.</p> |
| data_ref</br>`string` | <p>Identifies the name of the JSON property that contains the array of validation rule assignments.</p> |
| data</br>`array` | <p>A dictionary that contains an array of validation rule assignments.</p> Array of [Validation Rule Assignment](#validation-rule-assignment) |
| total</br>`integer` | <p>Total number of validation rule assignments.</p> |

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
| unit_off_formula</br>`string` | <p>Formula used to calculate the number of units.</p> |
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

## Validation Rule Assignment
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Validation rule assignment ID.</p> **Example:** <p>asgm_74F7QZoYbUoljwQO</p> |
| rule_id</br>`string` | <p>Validation rule ID.</p> **Example:** <p>val_4j7DCRm2IS59</p> |
| related_object_id</br>`string` | <p>The resource ID to which the validation rule was assigned.</p> **Example:** <p>v_JtWunK6jUo7X2qOFj0SyRHq4p9tgENlT</p> |
| related_object_type</br>`string` | <p>The type of resource to which the validation rule was assigned.</p> Available values: `voucher`, `campaign`, `earning_rule`, `reward_assignment`, `promotion_tier`, `distribution` |
| created_at</br>`string` | <p>Timestamp representing the date and time when the validation rule assignment was created. The value is shown in the ISO 8601 format.</p> **Example:** <p>2022-02-17T08:18:15.085Z</p> |
| object</br>`string` | <p>The type of the object represented by the ID.</p> Available values: `validation_rules_assignment` |

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
| unit_off_formula</br>`string` | <p>Formula used to calculate the number of units.</p> |
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
