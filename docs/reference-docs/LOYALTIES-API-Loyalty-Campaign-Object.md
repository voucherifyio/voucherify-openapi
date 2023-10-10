---
title: Loyalty Campaign Object
type: basic
categorySlug: voucherify-api
parentDocSlug: loyalties-api
slug: loyalty-campaign-object
hidden: false
order: 1
---

## Loyalty Campaign Object
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique campaign ID, assigned by Voucherify.</p> **Example:** <p>camp_f7fBbQxUuTN7dI7tGOo5XMDA</p> |
| name</br>`string` | <p>Loyalty campaign name.</p> |
| campaign_type</br>`string` | <p>Type of campaign.</p> Available values: `LOYALTY_PROGRAM` |
| type</br>`string` | <p>Defines whether the campaign can be updated with new vouchers after campaign creation.</p><ul><li><code>AUTO_UPDATE</code>: the campaign is dynamic, i.e. vouchers will generate based on set criteria</li><li><code>STATIC</code>: vouchers need to be manually published</li></ul> Available values: `AUTO_UPDATE`, `STATIC` |
| voucher | See: [Loyalty Card](#loyalty-card) |
| auto_join</br>`boolean` | <p>Indicates whether customers will be able to auto-join a loyalty campaign if any earning rule is fulfilled.</p> |
| join_once</br>`boolean` | <p>If this value is set to <code>true</code>, customers will be able to join the campaign only once.</p> |
| use_voucher_metadata_schema</br>`boolean` | <p>Flag indicating whether the campaign is to use the voucher's metadata schema instead of the campaign metadata schema.</p> |
| start_date</br>`string` | <p>Activation timestamp defines when the campaign starts to be active in ISO 8601 format. Campaign is <em>inactive before</em> this date.</p> **Example:** <p>2022-09-20T00:00:00.000Z</p> |
| expiration_date</br>`string` | <p>Expiration timestamp defines when the campaign expires in ISO 8601 format.  Campaign is <em>inactive after</em> this date.</p> **Example:** <p>2022-09-30T00:00:00.000Z</p> |
| validity_timeframe</br>`object` | <p>Set recurrent time periods when the campaign is valid. For example, valid for 1 hour every other day.<code>start_date</code> <strong>required</strong> when including the <code>validity_timeframe</code>.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">interval</br><code>string</code></td><td style="text-align:left"><p>Defines the intervening time between two time points in ISO 8601 format, expressed as a duration. For example, a campaign with an <code>interval</code> of <code>P2D</code> will be active every other day.</p></td></tr><tr><td style="text-align:left">duration</br><code>string</code></td><td style="text-align:left"><p>Defines the amount of time the campaign will be active in ISO 8601 format. For example, a campaign with a <code>duration</code> of <code>P1D</code> will be valid for a duration of one day.</p></td></tr></tbody></table> |
| validity_day_of_week</br>`array` | <p>Integer array corresponding to the particular days of the week in which the campaign is valid.</p><ul><li><code>0</code>  Sunday</li><li><code>1</code>  Monday</li><li><code>2</code>  Tuesday</li><li><code>3</code>  Wednesday</li><li><code>4</code>  Thursday</li><li><code>5</code>  Friday</li><li><code>6</code>  Saturday</li></ul> |
| activity_duration_after_publishing</br>`string` | <p>Defines the amount of time the campaign will be active in ISO 8601 format after publishing. For example, a campaign with a <code>duration</code> of <code>P24D</code> will be valid for a duration of 24 days.</p> |
| description</br>`string` | <p>An optional field to keep any extra textual information about the campaign such as a campaign description and details.</p> |
| vouchers_count</br>`integer` | <p>Total number of unique vouchers in campaign.</p> |
| active</br>`boolean` | <p>A flag to toggle the campaign on or off. You can disable a campaign even though it's within the active period defined by the <code>start_date</code> and <code>expiration_date</code>.</p><ul><li><code>true</code> indicates an <em>active</em> campaign</li><li><code>false</code> indicates an <em>inactive</em> campaign</li></ul> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the campaign. A set of key/value pairs that you can attach to a campaign object. It can be useful for storing additional information about the campaign in a structured format.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the campaign was created in ISO 8601 format.</p> **Example:** <p>2021-12-01T08:00:50.038Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the voucher was updated in ISO 8601 format.</p> **Example:** <p>2022-09-20T09:18:19.623Z</p> |
| creation_status</br>`string` | <p>Indicates the status of the campaign creation.</p> Available values: `DONE`, `IN_PROGRESS`, `FAILED`, `DRAFT`, `MODIFYING` |
| vouchers_generation_status</br>`string` | <p>Indicates the status of the campaign's vouchers.</p> Available values: `DONE`, `IN_PROGRESS`, `FAILED`, `DRAFT` |
| protected</br>`boolean` | <p>Indicates whether the resource can be deleted.</p> |
| category_id</br>`string` | <p>Unique category ID that this campaign belongs to.</p> **Example:** <p>cat_0b688929a2476386a7</p> |
| categories | See: [Category Object](#category-object) |
| loyalty_tiers_expiration</br>`object` | <p>Defines the expiration mechanism for loyalty tiers.</p> Any of: [Balance](#balance), [Points in Period](#points-in-period) |
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about the campaign.</p> |

## Loyalty Card
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Type of voucher.</p> |
| loyalty_card</br>`object` | <p>Defines the loyalty card details.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>Initial loyalty card income in points to be applied to the loyalty card at voucher generation.</p></td></tr><tr><td style="text-align:left">expiration_rules</br><code>object</code></td><td style="text-align:left"><p>Defines point expiration rules.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">period_type</br><code>string</code></td><td style="text-align:left"><p>The expiration period.</p> Available values: <code>MONTH</code></td></tr><tr><td style="text-align:left">period_value</br><code>integer</code></td><td style="text-align:left"><p>How many periods should pass before the expiration occurs.</p></td></tr><tr><td style="text-align:left">rounding_type</br><code>string</code></td><td style="text-align:left"><p>Round up expiration till the end of the given period type.</p> Available values: <code>END_OF_MONTH</code>, <code>END_OF_QUARTER</code>, <code>END_OF_HALF_YEAR</code>, <code>END_OF_YEAR</code>, <code>PARTICULAR_MONTH</code></td></tr></tbody></table></td></tr></tbody></table> |
| redemption</br>`object` | <p>Defines the redemption limits on vouchers.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">quantity</br><code>integer</code></td><td style="text-align:left"><p>How many times a voucher can be redeemed. A <code>null</code> value means unlimited.</p></td></tr></tbody></table> |
| code_config</br>`object` | <p>Defines code's pattern (prefix, suffix, length, charset, etc).</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">length</br><code>string</code></td><td style="text-align:left"><p>Number of characters in a generated code (excluding prefix and postfix).</p></td></tr><tr><td style="text-align:left">charset</br><code>string</code></td><td style="text-align:left"><p>Characters that can appear in the code.</p><p>Examples:</p><ul><li>Alphanumeric: <code>0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ</code></li><li>Alphabetic: <code>abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ</code></li><li>Alphabetic Lowercase: <code>abcdefghijklmnopqrstuvwxyz</code></li><li>Alphabetic Uppercase: <code>ABCDEFGHIJKLMNOPQRSTUVWXYZ</code></li><li>Numbers: <code>0123456789</code></li><li>Custom: a custom character set</li></ul></td></tr><tr><td style="text-align:left">prefix</br><code>string</code></td><td style="text-align:left"><p>A text appended before the code.</p></td></tr><tr><td style="text-align:left">postfix</br><code>string</code></td><td style="text-align:left"><p>A text appended after the code.</p></td></tr><tr><td style="text-align:left">pattern</br><code>string</code></td><td style="text-align:left"><p>A pattern for codes where hashes (#) will be replaced with random characters. Overrides <code>length</code>.</p></td></tr></tbody></table> |
| is_referral_code</br>`boolean` | <p>Indicates whether the voucher is a referral code; this is <code>true</code> for campaign type <code>REFERRAL_PROGRAM</code>.</p> |

## Category Object
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique category ID assigned by Voucherify.</p> |
| name</br>`string` | <p>Category name.</p> |
| hierarchy</br>`integer` | <p>Category hierarchy.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the category was created in ISO 8601 format.</p> **Example:** <p>2022-07-14T10:45:13.156Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the category was updated in ISO 8601 format.</p> **Example:** <p>2022-08-16T10:52:08.094Z</p> |
| object</br>`string` | <p>The type of object represented by the JSON. This object stores information about the category.</p> |

## Balance
| Attributes |  Description |
|:-----|:--------|
| qualification_type</br>`string` | <p>Tier qualification.</p><p><code>BALANCE</code>: Points balance is based on the customer's current points balance. Customers qualify for the tier if their points balance is in the points range of the tier.</p> Available values: `BALANCE` |
| start_date</br>`object` | <p>Defines the conditions for the start date of the tier.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">type</br><code>string</code></td><td style="text-align:left"><p>What triggers the tier to be valid for a customer.<br><code>IMMEDIATE</code>: After reaching the minimum required points.</p> Available values: <code>IMMEDIATE</code></td></tr></tbody></table> |
| expiration_date | <p>Defines the conditions for the expiration date of a tier.</p> Any of: [Balance Drop](#balance-drop), [Custom](#custom) |

## Points in Period
| Attributes |  Description |
|:-----|:--------|
| qualification_type</br>`string` | <p>Tier qualification.</p><p><code>POINTS_IN_PERIOD</code>: A customer qualifies for the tier only if the sum of the accumulated points in a <strong>defined time interval</strong> reaches the tier threshold.</p> Available values: `POINTS_IN_PERIOD` |
| qualification_period</br>`string` | <p>Customers can qualify for the tier if they collected enough points in a given time period. So, in addition to the customer having to reach a points range, they also need to have collected the points within a set time period.</p><table><thead><tr><th style="text-align:left"><strong>Period</strong></th><th style="text-align:left"><strong>Definition</strong></th></tr></thead><tbody><tr><td style="text-align:left"><strong>Calendar Month</strong></td><td style="text-align:left">Points collected in one calendar month<br>January, February, March, etc.</td></tr><tr><td style="text-align:left"><strong>Calendar Quarter</strong></td><td style="text-align:left">Points collected in the quarter<br>- January - March<br>- April - June<br>- July - September<br>- October - December</td></tr><tr><td style="text-align:left"><strong>Calendar Half-year</strong></td><td style="text-align:left">Points collected in the half-year<br>- January - June<br>- July - December</td></tr><tr><td style="text-align:left"><strong>Calendar Year</strong></td><td style="text-align:left">Points collected in one calendar year<br>January - December</td></tr></tbody></table> Available values: `MONTH`, `QUARTER`, `HALF_YEAR`, `YEAR` |
| start_date</br>`object` | <p>Defines the conditions for the start date of the tier.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">type</br><code>string</code></td><td style="text-align:left"><p>What triggers the tier to be valid for a customer.<br><code>IMMEDIATE</code>: After reaching the minimum required points.<br><code>NEXT_PERIOD</code>: When the next qualification period starts.</p> Available values: <code>IMMEDIATE</code>, <code>NEXT_PERIOD</code></td></tr></tbody></table> |
| expiration_date</br>`object` | <p>Defines the conditions for the expiration date of a tier.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">type</br><code>string</code></td><td style="text-align:left"><p>What triggers the tier to expire for a customer.<br><code>END_OF_PERIOD</code>: Expire tier at the end of the period.<br><code>END_OF_NEXT_PERIOD</code>:  Expire tier at the end of the next period.</p> Available values: <code>END_OF_PERIOD</code>, <code>END_OF_NEXT_PERIOD</code></td></tr><tr><td style="text-align:left">extend</br><code>string</code></td><td style="text-align:left"><p>Extend the expiration by adding extra months or days in ISO 8601 format. The tier will remain active even though it reaches its expiration time period. For example, a tier with a duration of <code>P3M</code> will be valid for an additional duration of 3 months and a tier with a duration of <code>P1D</code> will be valid for an additional duration of 1 day.</p></td></tr></tbody></table> |

## Balance Drop
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>What triggers the tier to expire for a customer.<br><code>BALANCE_DROP</code>: Tier expires when the points balance drops below the required range of the tier.</p> Available values: `BALANCE_DROP` |

## Custom
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>What triggers the tier to expire for a customer.<br><code>CUSTOM</code>: Tier expires after a certain time period passes following the instance the points balance drops below the required range of the tier.</p> Available values: `CUSTOM` |
| extend</br>`string` | <p>Defines the amount of time the tier will remain active in ISO 8601 format. The expiration date counter starts at the moment when the customer reaches the minimum required points that are required to be in the tier. For example, a tier with a duration of P3M will be valid for a duration of 3 months.</p> |
| rounding | <p>Defines the rounding mechanism for tier expiration.</p> Any of: [Calendar Periods](#calendar-periods), [Specific Month](#specific-month) |

## Calendar Periods
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Period to which the expiration will be rounded to.</p><ul><li><code>MONTH</code>: The expiration date will be rounded to the end of the month.</li><li><code>QUARTER</code>: The expiration date will be rounded to the end of the quarter.</li><li><code>HALF_YEAR</code>: The expiration date will be rounded to the half year.</li><li><code>YEAR</code>: The expiration date will be rounded to the end of the year.</li></ul> Available values: `MONTH`, `QUARTER`, `HALF_YEAR`, `YEAR` |
| strategy</br>`string` | <p>Which portion of the given period should the rounding be applied to.</p> Available values: `END` |

## Specific Month
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>This mechanism describes a custom rounding for the expiration date.</p> Available values: `CUSTOM` |
| strategy</br>`string` | <p>Which portion of the given period should the rounding be applied to.</p> Available values: `END` |
| unit</br>`string` | <p>Defines the type of unit of time in which the rounding period is counted.</p> Available values: `MONTH` |
| value</br>`integer` | <p>Value for the unit of time that the rounding applies to. Units for this parameter are defined by the <code>rounding.unit</code> parameter.</p><ul><li><code>0</code>: January</li><li><code>1</code>: February</li><li><code>2</code>: March</li><li><code>3</code>: April</li><li><code>4</code>: May</li><li><code>5</code>: June</li><li><code>6</code>: July</li><li><code>7</code>: August</li><li><code>8</code>: September</li><li><code>9</code>: October</li><li><code>10</code>: November</li><li><code>11</code>: December</li></ul> |

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
