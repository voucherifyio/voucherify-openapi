---
title: Campaign Object
type: basic
categorySlug: voucherify-api
parentDocSlug: campaigns-api
slug: campaign-object
hidden: false
order: 1
---

## Campaign Response
All of:

1. [Campaign](#campaign)
2. <h3>Campaign Additional Data</h3><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">promotion</td><td style="text-align:left">See: <a href="#promotion-tiers">Promotion Tiers</a></td></tr><tr><td style="text-align:left">validation_rules_assignments</td><td style="text-align:left">See: <a href="#validation-rules-assignments-list">Validation Rules Assignments List</a></td></tr></tbody></table>

## Campaign
#### This is an object representing a campaign.
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique campaign ID, assigned by Voucherify.</p> **Example:** <p>camp_f7fBbQxUuTN7dI7tGOo5XMDA</p> |
| name</br>`string` | <p>Campaign name.</p> |
| description</br>`string` | <p>An optional field to keep any extra textual information about the campaign such as a campaign description and details.</p> |
| campaign_type</br>`string` | <p>Type of campaign.</p> Available values: `LOYALTY_PROGRAM`, `GIFT_VOUCHERS`, `DISCOUNT_COUPONS`, `PROMOTION`, `REFERRAL_PROGRAM`, `LUCKY_DRAW` |
| type</br>`string` | <p>Defines whether the campaign can be updated with new vouchers after campaign creation.</p><ul><li><code>AUTO_UPDATE</code>: the campaign is dynamic, i.e. vouchers will generate based on set criteria</li><li><code>STATIC</code>: vouchers need to be manually published</li></ul> Available values: `AUTO_UPDATE`, `STATIC` |
| voucher | See: [Campaign Discount Voucher](#campaign-discount-voucher) |
| auto_join</br>`boolean` | <p>Indicates whether customers will be able to auto-join a loyalty campaign if any earning rule is fulfilled.</p> |
| join_once</br>`boolean` | <p>If this value is set to <code>true</code>, customers will be able to join the campaign only once.</p> |
| use_voucher_metadata_schema</br>`boolean` | <p>Flag indicating whether the campaign is to use the voucher's metadata schema instead of the campaign metadata schema.</p> |
| validity_timeframe</br>`object` | <p>Set recurrent time periods when the campaign is valid. For example, valid for 1 hour every other day.<code>start_date</code> <strong>required</strong> when including the <code>validity_timeframe</code>.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">interval</br><code>string</code></td><td style="text-align:left"><p>Defines the intervening time between two time points in ISO 8601 format, expressed as a duration. For example, a campaign with an <code>interval</code> of <code>P2D</code> will be active every other day.</p></td></tr><tr><td style="text-align:left">duration</br><code>string</code></td><td style="text-align:left"><p>Defines the amount of time the campaign will be active in ISO 8601 format. For example, a campaign with a <code>duration</code> of <code>P1D</code> will be valid for a duration of one day.</p></td></tr></tbody></table> |
| validity_day_of_week</br>`array` | <p>Integer array corresponding to the particular days of the week in which the campaign is valid.</p><ul><li><code>0</code>  Sunday</li><li><code>1</code>  Monday</li><li><code>2</code>  Tuesday</li><li><code>3</code>  Wednesday</li><li><code>4</code>  Thursday</li><li><code>5</code>  Friday</li><li><code>6</code>  Saturday</li></ul> |
| activity_duration_after_publishing</br>`string` | <p>Defines the amount of time the campaign will be active in ISO 8601 format after publishing. For example, a campaign with a <code>duration</code> of <code>P24D</code> will be valid for a duration of 24 days.</p> |
| vouchers_count</br>`integer` | <p>Total number of unique vouchers in campaign.</p> |
| start_date</br>`string` | <p>Activation timestamp defines when the campaign starts to be active in ISO 8601 format. Campaign is <em>inactive before</em> this date.</p> **Example:** <p>2022-09-20T00:00:00.000Z</p> |
| expiration_date</br>`string` | <p>Expiration timestamp defines when the campaign expires in ISO 8601 format.  Campaign is <em>inactive after</em> this date.</p> **Example:** <p>2022-09-30T00:00:00.000Z</p> |
| active</br>`boolean` | <p>A flag to toggle the campaign on or off. You can disable a campaign even though it's within the active period defined by the <code>start_date</code> and <code>expiration_date</code>.</p><ul><li><code>true</code> indicates an <em>active</em> campaign</li><li><code>false</code> indicates an <em>inactive</em> campaign</li></ul> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the campaign. A set of key/value pairs that you can attach to a campaign object. It can be useful for storing additional information about the campaign in a structured format.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the campaign was created in ISO 8601 format.</p> **Example:** <p>2021-12-01T08:00:50.038Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the voucher was updated in ISO 8601 format.</p> **Example:** <p>2022-09-20T09:18:19.623Z</p> |
| category</br>`string` | <p>Unique category name.</p> |
| creation_status</br>`string` | <p>Indicates the status of the campaign creation.</p> Available values: `DONE`, `IN_PROGRESS`, `FAILED`, `DRAFT`, `MODIFYING` |
| vouchers_generation_status</br>`string` | <p>Indicates the status of the campaign's vouchers.</p> Available values: `DONE`, `IN_PROGRESS`, `FAILED`, `DRAFT`, `MODIFYING` |
| protected</br>`boolean` | <p>Indicates whether the resource can be deleted.</p> |
| category_id</br>`string,null` | <p>Unique category ID that this campaign belongs to.</p> **Example:** <p>cat_0b688929a2476386a7</p> |
| categories</br>`array` | <p>Contains details about the category.</p> Array of [Category](#category) |
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about the campaign.</p> |
| referral_program | See: [Referral Program](#referral-program) |
| loyalty_tiers_expiration | See: [Loyalty Tiers Expiration](#loyalty-tiers-expiration) |

## Promotion Tiers
#### Promotion Tiers
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about promotion tiers in a dictionary.</p> |
| data_ref</br>`string` | <p>Identifies the name of the attribute that contains the array of promotion tier objects.</p> |
| tiers</br>`array` | <p>Contains array of promotion tier objects.</p> Array of [Promotion Tier](#promotion-tier) |
| total</br>`integer` | <p>Total number of promotion tiers.</p> |
| has_more</br>`boolean` | <p>As query results are always limited (by the limit parameter), the <code>has_more</code> flag indicates whether there are more records for given filter parameters. This let's you know if you are able to run another request (with a different page or a different start date filter) to get more records returned in the results.</p> |

## Validation Rules Assignments List
#### List of Validation Rules Assignments
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about validation rules assignments.</p> Available values: `list` |
| data_ref</br>`string` | <p>Identifies the name of the attribute that contains the array of validation rules assignments.</p> Available values: `data` |
| data</br>`array` | <p>Contains array of validation rules assignments.</p> Array of [Business Validation Rule Assignment](#business-validation-rule-assignment) |
| total</br>`integer` | <p>Total number of validation rules assignments.</p> |

## Campaign Discount Voucher
#### Schema model for a campaign voucher.
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Type of voucher.</p> |
| discount | <p>Defines the voucher discount type and details.</p> See: [Discount](#discount) |
| gift | <p>Defines the voucher gift details.</p> See: [Gift](#gift) |
| loyalty_card | <p>Defines the voucher loyalty card details.</p> See: [Campaign Loyalty Card](#campaign-loyalty-card) |
| redemption</br>`object` | <p>Defines the redemption limits on vouchers.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">quantity</br><code>integer,null</code></td><td style="text-align:left"><p>How many times a voucher can be redeemed. A <code>null</code> value means unlimited.</p></td></tr></tbody></table> |
| code_config | See: [Code Config Response](#code-config-response) |
| is_referral_code</br>`boolean` | <p>Indicates whether the voucher is a referral code; this is <code>true</code> for campaign type <code>REFERRAL_PROGRAM</code>.</p> |
| start_date</br>`string` | <p>Activation timestamp defines when the campaign starts to be active in ISO 8601 format. Campaign is <em>inactive before</em> this date.</p> **Example:** <p>2022-09-20T00:00:00.000Z</p> |
| expiration_date</br>`string` | <p>Expiration timestamp defines when the campaign expires in ISO 8601 format.  Campaign is <em>inactive after</em> this date.</p> **Example:** <p>2022-09-30T00:00:00.000Z</p> |
| validity_timeframe</br>`object` | <p>Set recurrent time periods when the campaign is valid. For example, valid for 1 hour every other day.<code>start_date</code> <strong>required</strong> when including the <code>validity_timeframe</code>.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">interval</br><code>string</code></td><td style="text-align:left"><p>Defines the intervening time between two time points in ISO 8601 format, expressed as a duration. For example, a campaign with an <code>interval</code> of <code>P2D</code> will be active every other day.</p></td></tr><tr><td style="text-align:left">duration</br><code>string</code></td><td style="text-align:left"><p>Defines the amount of time the campaign will be active in ISO 8601 format. For example, a campaign with a <code>duration</code> of <code>P1D</code> will be valid for a duration of one day.</p></td></tr></tbody></table> |

## Category
#### This is an object representing a category.
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique category ID assigned by Voucherify.</p> |
| name</br>`string` | <p>Category name.</p> |
| hierarchy</br>`integer` | <p>Category hierarchy.</p> |
| object</br>`string` | <p>The type of object represented by the JSON. This object stores information about the category.</p> Available values: `category` |
| created_at</br>`string` | <p>Timestamp representing the date and time when the category was created in ISO 8601 format.</p> **Example:** <p>2022-07-14T10:45:13.156Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the category was updated in ISO 8601 format.</p> **Example:** <p>2022-08-16T10:52:08.094Z</p> |
| stacking_rules_type</br>`string` | <p>The type of the stacking rule eligibility.</p> Available values: `JOINT`, `EXCLUSIVE` |

## Referral Program
#### Defines the referee reward and the way a referral is triggered. Context: `REFERRAL_PROGRAM`.
| Attributes |  Description |
|:-----|:--------|
| conversion_event_type</br>`string` | <p>Define how a referral is triggered.</p> Available values: `redemption`, `custom_event` |
| custom_event</br>`object` | <p>Contains details about the custom event.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique custom event ID.</p> <strong>Example:</strong> <p>ms_Ll9enAm2BCN0M1s4VxWobLFM</p></td></tr><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"><p>Custom event name.</p></td></tr></tbody></table> |
| referee_reward</br>`object` | <p>Defines the referee reward.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">related_object_parent</br><code>object</code></td><td style="text-align:left"><p>Details of the resource from which the reward originates.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique ID of the reward source.</p> <strong>Example:</strong> <p>camp_kdxp3vf1clQ9CFs1jpqv3tZe</p></td></tr><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"><p>Name of the reward source.</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>Type of resource represented by the source of the reward.</p> Available values: <code>CAMPAIGN</code></td></tr></tbody></table></td></tr><tr><td style="text-align:left">type</br><code>string</code></td><td style="text-align:left"><p>Type of reward.</p> Available values: <code>DISCOUNT_VOUCHER</code>, <code>LOYALTY_CARD</code>, <code>GIFT_VOUCHER</code>, <code>LUCKY_DRAW_CODE</code></td></tr><tr><td style="text-align:left">amount</br><code>string</code></td><td style="text-align:left"><p>Define the number of <code>points</code> to add to a loyalty card or <code>credits</code> to the balance on a gift card. In case of the gift card, the value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 amount is written as 10000.</p></td></tr></tbody></table> |

## Loyalty Tiers Expiration
#### Defines the Loyalty Tiers Expiration.
| Attributes |  Description |
|:-----|:--------|
| qualification_type</br>`string` | <p>Tier qualification.</p><p><code>BALANCE</code>: Points balance is based on the customer's current points balance. Customers qualify for the tier if their points balance is in the points range of the tier.<br><code>POINTS_IN_PERIOD</code>: A customer qualifies for the tier only if the sum of the accumulated points in a <strong>defined time interval</strong> reaches the tier threshold.</p> Available values: `BALANCE`, `POINTS_IN_PERIOD` |
| qualification_period</br>`string` | <p>Customers can qualify for the tier if they collected enough points in a given time period. So, in addition to the customer having to reach a points range, they also need to have collected the points within a set time period.</p><table><thead><tr><th style="text-align:left"><strong>Period</strong></th><th style="text-align:left"><strong>Definition</strong></th></tr></thead><tbody><tr><td style="text-align:left"><strong>Calendar Month</strong></td><td style="text-align:left">Points collected in one calendar month<br>January, February, March, etc.</td></tr><tr><td style="text-align:left"><strong>Calendar Quarter</strong></td><td style="text-align:left">Points collected in the quarter<br>- January - March<br>- April - June<br>- July - September<br>- October - December</td></tr><tr><td style="text-align:left"><strong>Calendar Half-year</strong></td><td style="text-align:left">Points collected in the half-year<br>- January - June<br>- July - December</td></tr><tr><td style="text-align:left"><strong>Calendar Year</strong></td><td style="text-align:left">Points collected in one calendar year<br>January - December</td></tr></tbody></table> Available values: `MONTH`, `QUARTER`, `HALF_YEAR`, `YEAR` |
| start_date</br>`object` | <p>Defines the conditions for the start date of the tier.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">type</br><code>string</code></td><td style="text-align:left"><p>What triggers the tier to be valid for a customer.<br><code>IMMEDIATE</code>: After reaching the minimum required points.<br><code>NEXT_PERIOD</code>: When the next qualification period starts.</p> Available values: <code>IMMEDIATE</code>, <code>NEXT_PERIOD</code></td></tr></tbody></table> |
| expiration_date</br>`object` | <p>Defines the conditions for the expiration date of a tier.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">type</br><code>string</code></td><td style="text-align:left"><p>What triggers the tier to expire for a customer.<br><code>END_OF_PERIOD</code>: Expire tier at the end of the period.<br><code>END_OF_NEXT_PERIOD</code>:  Expire tier at the end of the next period.<br><code>BALANCE_DROP</code>: Tier expires when the points balance drops below the required range of the tier.<br><code>CUSTOM</code>: Tier expires after a certain time period passes following the instance the points balance drops below the required range of the tier.</p> Available values: <code>END_OF_PERIOD</code>, <code>END_OF_NEXT_PERIOD</code>, <code>BALANCE_DROP</code>, <code>CUSTOM</code></td></tr><tr><td style="text-align:left">extend</br><code>string</code></td><td style="text-align:left"><p>Extend the expiration by adding extra months or days in ISO 8601 format. The tier will remain active even though it reaches its expiration time period. For example, a tier with a duration of <code>P3M</code> will be valid for an additional duration of 3 months and a tier with a duration of <code>P1D</code> will be valid for an additional duration of 1 day.</p></td></tr><tr><td style="text-align:left">rounding</td><td style="text-align:left"><p>Defines the rounding mechanism for tier expiration.</p></td></tr></tbody></table> |

## Promotion Tier
#### This is an object representing a promotion tier. Promotion tiers are always assigned to a campaign and cannot be used standalone.
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique promotion tier ID.</p> **Example:** <p>promo_63fYCt81Aw0h7lzyRkrGZh9p</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the promotion tier was created in ISO 8601 format.</p> **Example:** <p>2021-12-15T11:34:01.333Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the promotion tier was updated in ISO 8601 format.</p> **Example:** <p>2022-02-09T09:20:05.603Z</p> |
| name</br>`string` | <p>Name of the promotion tier.</p> |
| banner</br>`string` | <p>Text to be displayed to your customers on your website.</p> |
| action</br>`object` | <p>Contains details about the discount applied by the promotion tier.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">discount</td><td style="text-align:left">See: <a href="#discount">Discount</a></td></tr></tbody></table> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the promotion tier. A set of key/value pairs that you can attach to a promotion tier object. It can be useful for storing additional information about the promotion tier in a structured format.</p> |
| hierarchy</br>`integer` | <p>The promotions hierarchy defines the order in which the discounts from different tiers will be applied to a customer's order. If a customer qualifies for discounts from more than one tier, discounts will be applied in the order defined in the hierarchy.</p> |
| promotion_id</br>`string` | <p>Promotion unique ID.</p> |
| campaign</br>`object` | <p>Contains details about promotion tier's parent campaign.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique campaign ID.</p></td></tr><tr><td style="text-align:left">start_date</br><code>string</code></td><td style="text-align:left"><p>Activation timestamp defines when the campaign starts to be active in ISO 8601 format. Campaign is <em>inactive before</em> this date.</p> <strong>Example:</strong> <p>2022-09-22T00:00:00.000Z</p></td></tr><tr><td style="text-align:left">expiration_date</br><code>string</code></td><td style="text-align:left"><p>Expiration timestamp defines when the campaign expires in ISO 8601 format.  Campaign is <em>inactive after</em> this date.</p> <strong>Example:</strong> <p>2022-09-30T00:00:00.000Z</p></td></tr><tr><td style="text-align:left">validity_timeframe</br><code>object</code></td><td style="text-align:left"><p>Recurrent time periods when the campaign is valid. For example, valid for 1 hour every other day.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">interval</br><code>string</code></td><td style="text-align:left"><p>Defines the intervening time between two time points in ISO 8601 format, expressed as a duration. For example, a campaign with an <code>interval</code> of <code>P2D</code> will be active every other day.</p></td></tr><tr><td style="text-align:left">duration</br><code>string</code></td><td style="text-align:left"><p>Defines the amount of time the campaign will be active in ISO 8601 format. For example, a campaign with a <code>duration</code> of <code>P1D</code> will be valid for a duration of one day.</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">validity_day_of_week</br><code>array</code></td><td style="text-align:left"><p>Integer array corresponding to the particular days of the week in which the campaign is valid.</p><ul><li><code>0</code>  Sunday</li><li><code>1</code>  Monday</li><li><code>2</code>  Tuesday</li><li><code>3</code>  Wednesday</li><li><code>4</code>  Thursday</li><li><code>5</code>  Friday</li><li><code>6</code>  Saturday</li></ul></td></tr><tr><td style="text-align:left">active</br><code>boolean</code></td><td style="text-align:left"><p>A flag indicating whether the campaign is active or not active. A campaign can be disabled even though it's within the active period defined by the <code>start_date</code> and <code>expiration_date</code> using the <!-- [Disable Campaign](OpenAPI.json/paths/~1campaigns~1{campaignId}~1disable) --><a href="ref:disable-campaign">Disable Campaign</a> endpoint.</p><ul><li><code>true</code> indicates an <em>active</em> campaign</li><li><code>false</code> indicates an <em>inactive</em> campaign</li></ul></td></tr><tr><td style="text-align:left">category_id</br><code>string</code></td><td style="text-align:left"><p>Unique category ID that this campaign belongs to.</p> <strong>Example:</strong> <p>cat_0b688929a2476386a6</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>The type of object represented by the campaign object. This object stores information about the campaign.</p></td></tr></tbody></table> |
| campaign_id</br>`string` | <p>Promotion tier's parent campaign's unique ID.</p> |
| active</br>`boolean` | <p>A flag to toggle the promotion tier on or off. You can disable a promotion tier even though it's within the active period defined by the <code>start_date</code> and <code>expiration_date</code>.</p><ul><li><code>true</code> indicates an <em>active</em> promotion tier</li><li><code>false</code> indicates an <em>inactive</em> promotion tier</li></ul> |
| start_date</br>`string` | <p>Activation timestamp defines when the promotion tier starts to be active in ISO 8601 format. Promotion tier is <em>inactive before</em> this date.</p> **Example:** <p>2022-09-23T00:00:00.000Z</p> |
| expiration_date</br>`string` | <p>Activation timestamp defines when the promotion tier expires in ISO 8601 format. Promotion tier is <em>inactive after</em> this date.</p> **Example:** <p>2022-09-26T00:00:00.000Z</p> |
| validity_timeframe</br>`object` | <p>Set recurrent time periods when the promotion tier is valid. For example, valid for 1 hour every other day.<code>start_date</code> <strong>required</strong> when including the <code>validity_timeframe</code>.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">interval</br><code>string</code></td><td style="text-align:left"><p>Defines the intervening time between two time points in ISO 8601 format, expressed as a duration. For example, a promotion tier with an <code>interval</code> of <code>P2D</code> will be active every other day.</p></td></tr><tr><td style="text-align:left">duration</br><code>string</code></td><td style="text-align:left"><p>Defines the amount of time the promotion tier will be active in ISO 8601 format. For example, a promotion tier with a <code>duration</code> of <code>P1D</code> will be valid for a duration of one day.</p></td></tr></tbody></table> |
| validity_day_of_week</br>`array` | <p>Integer array corresponding to the particular days of the week in which the promotion tier is valid.</p><ul><li><code>0</code>  Sunday</li><li><code>1</code>  Monday</li><li><code>2</code>  Tuesday</li><li><code>3</code>  Wednesday</li><li><code>4</code>  Thursday</li><li><code>5</code>  Friday</li><li><code>6</code>  Saturday</li></ul> |
| summary</br>`object` | <p>Contains statistics about promotion tier redemptions and orders.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">redemptions</br><code>object</code></td><td style="text-align:left"><p>Contains statistics about promotion tier redemptions.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">total_redeemed</br><code>integer</code></td><td style="text-align:left"><p>Number of times the promotion tier was redeemed.</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">orders</br><code>object</code></td><td style="text-align:left"><p>Contains statistics about orders related to the promotion tier.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">total_amount</br><code>integer</code></td><td style="text-align:left"><p>Sum of order totals.</p></td></tr><tr><td style="text-align:left">total_discount_amount</br><code>integer</code></td><td style="text-align:left"><p>Sum of total discount applied using the promotion tier.</p></td></tr></tbody></table></td></tr></tbody></table> |
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about the promotion tier.</p> |
| validation_rule_assignments | See: [Validation Rule Assignments](#validation-rule-assignments) |
| category_id</br>`string` | <p>Promotion tier category ID.</p> **Example:** <p>cat_0c9da30e7116ba6bba</p> |
| categories</br>`array` | Array of [Category](#category) |

## Business Validation Rule Assignment
#### Assignments of business validation rule
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

## Discount
#### Contains information about discount.
<p>Contains information about discount.</p>

Any of:

[Amount](#amount), [Unit](#unit), [Unit Multiple](#unit-multiple), [Percent](#percent), [Fixed](#fixed)

## Gift
#### Contains current gift card balance information.
| Attributes |  Description |
|:-----|:--------|
| amount</br>`number` | <p>Total gift card income over the lifetime of the card. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 amount is written as 10000.</p> |
| balance</br>`number` | <p>Available funds. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 amount is written as 10000.</p> |
| effect</br>`string` | <p>Defines how the credits are applied to the customer's order.</p> Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS` |

## Campaign Loyalty Card
#### Schema model for a campaign loyalty card.
| Attributes |  Description |
|:-----|:--------|
| points</br>`integer` | <p>The initial number of points to assign to the loyalty card. This is the current loyalty card score i.e. the number of loyalty points on the card.</p> |
| expiration_rules</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">period_type</br><code>string</code></td><td style="text-align:left"><p>Type of period</p></td></tr><tr><td style="text-align:left">period_value</br><code>integer</code></td><td style="text-align:left"><p>Value of the period</p></td></tr><tr><td style="text-align:left">rounding_type</br><code>string</code></td><td style="text-align:left"><p>Type of rounding</p></td></tr><tr><td style="text-align:left">rounding_value</br><code>integer</code></td><td style="text-align:left"><p>Value of rounding</p></td></tr></tbody></table> |

## Code Config Response
All of:

1. [Code Config](#code-config)

## Validation Rule Assignments
#### Validation Rule Assignments
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about validation rule assignments.</p> |
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
| effect | <p>Defines how the discount is applied to the customer's order.</p> See: [Discount Amount Vouchers Effect Types](#discount-amount-vouchers-effect-types) |
| is_dynamic</br>`boolean` | <p>Flag indicating whether the discount was calculated using a formula.</p> |

## Unit
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Discount type.</p> Available values: `UNIT` |
| unit_off</br>`integer` | <p>Number of units to be granted a full value discount.</p> |
| unit_off_formula</br>`string` |  |
| effect | <p>Defines how the unit is added to the customer's order.</p> See: [Discount Unit Vouchers Effect Types](#discount-unit-vouchers-effect-types) |
| unit_type</br>`string` | <p>The product deemed as free, chosen from product inventory (e.g. time, items).</p> |
| product | <p>Contains information about the product.</p> See: [Simple Product Discount Unit](#simple-product-discount-unit) |
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
| effect | <p>Defines how the discount is applied to the customer's order.</p> See: [Discount Percent Vouchers Effect Types](#discount-percent-vouchers-effect-types) |
| is_dynamic</br>`boolean` | <p>Flag indicating whether the discount was calculated using a formula.</p> |

## Fixed
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines the type of the voucher.</p> Available values: `FIXED` |
| fixed_amount</br>`number` | <p>Sets a fixed value for an order total or the item price. The value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 discount is written as 1000. If the fixed amount is calculated by the formula, i.e. the <code>fixed_amount_formula</code> parameter is present in the fixed amount definition, this value becomes the <strong>fallback value</strong>. As a result, if the formula cannot be calculated due to missing metadata, for example, this value will be used as the fixed value.</p> |
| fixed_amount_formula</br>`string` |  |
| effect | <p>Defines how the discount is applied to the customer's order.</p> See: [Discount Fixed Vouchers Effect Types](#discount-fixed-vouchers-effect-types) |
| is_dynamic</br>`boolean` | <p>Flag indicating whether the discount was calculated using a formula.</p> |

## Code Config
#### Schema containing information about config used for voucher. Defines code's pattern (prefix, suffix, length, charset, etc).
| Attributes |  Description |
|:-----|:--------|
| length</br>`string` | <p>Number of characters in a generated code (excluding prefix and postfix).</p> |
| charset</br>`string` | <p>Characters that can appear in the code.</p><p>Examples:</p><ul><li>Alphanumeric: <code>0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ</code></li><li>Alphabetic: <code>abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ</code></li><li>Alphabetic Lowercase: <code>abcdefghijklmnopqrstuvwxyz</code></li><li>Alphabetic Uppercase: <code>ABCDEFGHIJKLMNOPQRSTUVWXYZ</code></li><li>Numbers: <code>0123456789</code></li><li>Custom: a custom character set</li></ul> |
| prefix</br>`string` | <p>A text appended before the code.</p> |
| postfix</br>`string` | <p>A text appended after the code.</p> |
| pattern</br>`string` | <p>A pattern for codes where hashes (#) will be replaced with random characters. Overrides <code>length</code>.</p> |
| initial_count</br>`integer` | <p>The initial count</p> |

## Validation Rule Assignment
#### This is an object representing a validation rule assignment.
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Validation rule assignment ID.</p> **Example:** <p>asgm_74F7QZoYbUoljwQO</p> |
| rule_id</br>`string` | <p>Validation rule ID.</p> **Example:** <p>val_4j7DCRm2IS59</p> |
| related_object_id</br>`string` | <p>The resource ID to which the validation rule was assigned.</p> **Example:** <p>v_JtWunK6jUo7X2qOFj0SyRHq4p9tgENlT</p> |
| related_object_type</br>`string` | <p>The type of resource to which the validation rule was assigned.</p> Available values: `voucher`, `campaign`, `earning_rule`, `reward_assignment`, `promotion_tier`, `distribution` |
| created_at</br>`string` | <p>Timestamp representing the date and time when the validation rule assignment was created in ISO 8601 format.</p> **Example:** <p>2022-02-17T08:18:15.085Z</p> |
| object</br>`string` | <p>The type of object represented by the ID.</p> Available values: `validation_rules_assignment` |

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
| product | <p>Contains information about the product.</p> See: [Simple Product Discount Unit](#simple-product-discount-unit) |
| sku | <p>Contains information about the sku.</p> See: [Simple Sku Discount Unit](#simple-sku-discount-unit) |

## Discount Percent Vouchers Effect Types
Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS`

## Discount Fixed Vouchers Effect Types
Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS`

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
