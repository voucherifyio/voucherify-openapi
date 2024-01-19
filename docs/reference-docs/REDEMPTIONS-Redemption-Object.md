---
title: Redemption Object
type: basic
categorySlug: voucherify-api
parentDocSlug: redemptions-api
slug: redemption-object
hidden: false
order: 1
---

## Redemption
#### This is an object representing a redemption.
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique redemption ID.</p> **Example:** <p>r_0bc92f81a6801f9bca</p> |
| object</br>`string` | <p>The type of object represented by the JSON</p> Available values: `redemption` |
| date</br>`string` | <p>Timestamp representing the date and time when the object was created in ISO 8601 format.</p> **Example:** <p>2021-12-22T10:13:06.487Z</p> |
| customer_id</br>`string,null` | <p>Unique customer ID of the redeeming customer.</p> **Example:** <p>cust_i8t5Tt6eiKG5K79KQlJ0Vs64</p> |
| tracking_id</br>`string,null` | <p>Hashed customer source ID.</p> |
| metadata</br>`object,null` | <p>The metadata object stores all custom attributes assigned to the redemption.</p> |
| amount</br>`integer` | <p>A positive integer in the smallest currency unit (e.g. 100 cents for $1.00) representing the total amount of the order. This is the sum of the order items' amounts.</p> **Example:** <p>10000</p> |
| redemption</br>`string` | <p>Unique redemption ID of the parent redemption.</p> **Example:** <p>r_0c656311b5878a2031</p> |
| result</br>`string` | <p>Redemption result.</p> Available values: `SUCCESS`, `FAILURE` |
| status</br>`string` | <p>Redemption status.</p> Available values: `SUCCEEDED`, `FAILED`, `ROLLED_BACK` |
| related_redemptions</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">rollbacks</br><code>array</code></td><td style="text-align:left">Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique rollback redemption ID.</p> <strong>Example:</strong> <p>rr_0bc92f81a6801f9bca</p></td></tr><tr><td style="text-align:left">date</br><code>string</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the object was created in ISO 8601 format.</p> <strong>Example:</strong> <p>2021-12-22T10:13:06.487Z</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">redemptions</br><code>array</code></td><td style="text-align:left">Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique redemption ID.</p> <strong>Example:</strong> <p>r_0bc92f81a6801f9bca</p></td></tr><tr><td style="text-align:left">date</br><code>string</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the object was created in ISO 8601 format.</p> <strong>Example:</strong> <p>2021-12-22T10:13:06.487Z</p></td></tr></tbody></table></td></tr></tbody></table> |
| failure_code</br>`string` | <p>If the result is <code>FAILURE</code>, this parameter will provide a generic reason as to why the redemption failed.</p> **Example:** <p>customer_rules_violated</p> |
| failure_message</br>`string` | <p>If the result is <code>FAILURE</code>, this parameter will provide a more expanded reason as to why the redemption failed.</p> |
| order | See: [Order Response No Customer Data](#order-response-no-customer-data) |
| channel</br>`object` | <p>Defines the details of the channel through which the redemption was issued.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">channel_id</br><code>string</code></td><td style="text-align:left"><p>Unique channel ID of the user performing the redemption. This is either a user ID from a user using the Voucherify Dashboard or an X-APP-Id of a user using the API.</p> <strong>Example:</strong> <p>user_g24UoRO3Caxu7FCT4n5tpYEa3zUG0FrH</p></td></tr><tr><td style="text-align:left">channel_type</br><code>string</code></td><td style="text-align:left"><p>The source of the channel for the redemption. A <code>USER</code> corresponds to the Voucherify Dashboard and an <code>API</code> corresponds to the API.</p> Available values: <code>USER</code>, <code>API</code></td></tr></tbody></table> |
| customer | See: [Simple Customer](#simple-customer) |
| related_object_type</br>`string` | <p>Defines the related object.</p> Available values: `voucher`, `promotion_tier`, `redemption` |
| related_object_id</br>`string` | <p>Unique related object ID assigned by Voucherify, i.e. v_lfZi4rcEGe0sN9gmnj40bzwK2FH6QUno for a voucher.</p> |
| voucher | <p>Defines the details of the voucher being redeemed.</p> See: [Voucher](#voucher) |
| promotion_tier | <p>Contains details of the promotion tier and the parent campaign.</p> See: [Promotion Tier](#promotion-tier) |
| reward | See: [Redemption Reward Result](#redemption-reward-result) |
| gift</br>`object` | <p>Contains the amount being subtracted from the gift card for the redemption.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">amount</br><code>integer</code></td><td style="text-align:left"><p>The amount subtracted from the gift card expressed as the smallest currency unit (e.g. 100 cents for $1.00).</p></td></tr></tbody></table> |
| loyalty_card</br>`object` | <p>Stores the number of points being added back to the loyalty card for the reward redemption rollback.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>Number of points being added back to the loyalty card for the reward redemption rollback.</p></td></tr></tbody></table> |

## Order Response No Customer Data
All of:

1. [Order Response Base](#order-response-base)
2. <h3>Order Customer And Referrer Ids Objects</h3><h5>Order information.</h5><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">customer</td><td style="text-align:left"><p>If only <code>customer_id</code> was provided, customer return data will be limited.</p> See: <a href="#customer-id">Customer Id</a></td></tr><tr><td style="text-align:left">referrer</td><td style="text-align:left"><p>If only <code>referrer_id</code> was provided, referrer return data will be limited.</p> See: <a href="#referrer-id">Referrer Id</a></td></tr></tbody></table>

## Simple Customer
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>The ID of an existing customer that will be linked to redemption in this request.</p> |
| source_id</br>`string` | <p>A unique identifier of the customer who validates a voucher. It can be a customer ID or email from a CRM system, database, or a third-party service. If you also pass a customer ID (unique ID assigned by Voucherify), the source ID will be ignored.</p> |
| name</br>`string` | <p>Customer's first and last name.</p> |
| email</br>`string` | <p>Customer's email address.</p> |
| metadata</br>`object` | <p>A set of custom key/value pairs that you can attach to a customer. The metadata object stores all custom attributes assigned to the customer. It can be useful for storing additional information about the customer in a structured format. This metadata can be used for validating whether the customer qualifies for a discount or it can be used in building customer segments.</p> |
| object</br>`string` | <p>The type of object represented by JSON.</p> Available values: `customer` |

## Voucher
#### This is an object representing a voucher.
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
| validity_day_of_week</br>`array` | <p>Integer array corresponding to the particular days of the week in which the voucher is valid.</p><ul><li><code>0</code>  Sunday</li><li><code>1</code>  Monday</li><li><code>2</code>  Tuesday</li><li><code>3</code>  Wednesday</li><li><code>4</code>  Thursday</li><li><code>5</code>  Friday</li><li><code>6</code>  Saturday</li></ul> Available values: `0`, `1`, `2`, `3`, `4`, `5`, `6` |
| active</br>`boolean,null` | <p>A flag to toggle the voucher on or off. You can disable a voucher even though it's within the active period defined by the <code>start_date</code> and <code>expiration_date</code>.</p><ul><li><code>true</code> indicates an <em>active</em> voucher</li><li><code>false</code> indicates an <em>inactive</em> voucher</li></ul> |
| additional_info</br>`string` | <p>An optional field to keep any extra textual information about the code such as a code description and details.</p> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the code. A set of key/value pairs that you can attach to a voucher object. It can be useful for storing additional information about the voucher in a structured format.</p> |
| assets | See: [Voucher Assets](#voucher-assets) |
| is_referral_code</br>`boolean,null` | <p>Flag indicating whether this voucher is a referral code.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the voucher was created in ISO 8601 format.</p> **Example:** <p>2021-12-22T10:13:06.487Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the voucher was last updated in ISO 8601 format.</p> **Example:** <p>2021-12-22T10:14:45.316Z</p> |
| holder_id</br>`string` | <p>Unique customer ID of voucher owner.</p> **Example:** <p>cust_eWgXlBBiY6THFRJwX45Iakv4</p> |
| holder | See: [Simple Customer](#simple-customer) |
| object</br>`string` | <p>The type of object represented by JSON. Default is <code>voucher</code>.</p> |
| distributions</br>`array` | Array of:  |
| deleted</br>`boolean` | <p>Flag indicating whether this voucher is deleted.</p> |
| publish</br>`object` | <p>This object stores a summary of publish events: an events counter and an endpoint which can be called to return details of each event.  A publication is required for loyalty cards and referral codes. This object gets updated whenever a voucher has been published. Publication means assigning a code to a particular customer. Typically, a publication is made by distributing your codes to your customers, e.g. through Export to MailChimp or <!-- [publish voucher](OpenAPI.json/paths/~1publications/post) --><a href="ref:create-publication">publish voucher</a> API method.</p><!-- title: My Table Title --><table><thead><tr><th>Required</th><th style="text-align:center">Optional</th></tr></thead><tbody><tr><td><code>type</code>:<code>LOYALTY_CARD</code></td><td style="text-align:center"><code>type</code>:<code>DISCOUNT_VOUCHER</code></td></tr><tr><td><code>is_referral_code</code>:<code>true</code></td><td style="text-align:center"><code>type</code>:<code>GIFT_VOUCHER</code></td></tr></tbody></table> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>The type of object represented is by default <code>list</code>. To get this list, you need to make a call to the endpoint returned in the <code>url</code> attribute.</p></td></tr><tr><td style="text-align:left">count</br><code>integer</code></td><td style="text-align:left"><p>Publication events counter.</p> <strong>Example:</strong> <p>0</p></td></tr><tr><td style="text-align:left">url</br><code>string</code></td><td style="text-align:left"><p>The endpoint where this list of publications can be accessed using a GET method. <code>/v1/vouchers/{voucher_code}/publications</code></p> <strong>Example:</strong> <p>/v1/vouchers/WVPblOYX/publications?page=1&amp;limit=10</p></td></tr></tbody></table> |
| redemption</br>`object` | <p>Stores a summary of redemptions that have been applied to the voucher.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">quantity</br><code>integer</code></td><td style="text-align:left"><p>How many times a voucher can be redeemed. A <code>null</code> value means unlimited.</p></td></tr><tr><td style="text-align:left">redeemed_quantity</br><code>integer</code></td><td style="text-align:left"><p>How many times a voucher has already been redeemed.</p> <strong>Example:</strong> <p>1</p></td></tr><tr><td style="text-align:left">redeemed_amount</br><code>integer</code></td><td style="text-align:left"><p>Total amount redeemed. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 balance is written as 10000.</p> <strong>Example:</strong> <p>100000</p></td></tr><tr><td style="text-align:left">redeemed_points</br><code>integer</code></td><td style="text-align:left"><p>Total loyalty points redeemed.</p> <strong>Example:</strong> <p>100000</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>The type of object represented is by default <code>list</code>. To get this list, you need to make a call to the endpoint returned in the url attribute.</p></td></tr><tr><td style="text-align:left">url</br><code>string</code></td><td style="text-align:left"><p>The endpoint where this list of redemptions can be accessed using a GET method. <code>/v1/vouchers/{voucher_code}/redemptions</code></p> <strong>Example:</strong> <p>/v1/vouchers/WVPblOYX/redemptions?page=1&amp;limit=10</p></td></tr></tbody></table> |

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

## Redemption Reward Result
| Attributes |  Description |
|:-----|:--------|
| reward | See: [Reward](#reward) |
| customer | See: [Customer Response](#customer-response) |
| assignment_id</br>`string` | <p>Unique reward assignment ID assigned by Voucherify.</p> |
| voucher | <p>Defines of the voucher.</p> See: [Voucher](#voucher) |
| product | <p>Defines of the product.</p> See: [Product Object](#product-object) |
| sku | <p>Defines of the sku.</p> See: [SKU Object](#sku-object) |
| loyalty_tier_id</br>`string` | <p>Unique loyalty tier ID assigned by Voucherify.</p> |

## Order Response Base
#### Order information.
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique ID assigned by Voucherify of an existing order that will be linked to the redemption of this request.</p> |
| source_id</br>`string,null` | <p>Unique source ID of an existing order that will be linked to the redemption of this request.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the order was created in ISO 8601 format.</p> **Example:** <p>2021-12-22T10:13:06.487Z</p> |
| updated_at</br>`string,null` | <p>Timestamp representing the date and time when the order was last updated in ISO 8601 format.</p> **Example:** <p>2021-12-22T10:14:45.316Z</p> |
| status</br>`string` | <p>The order status.</p> Available values: `CREATED`, `PAID`, `CANCELED`, `FULFILLED` |
| amount</br>`integer` | <p>A positive integer in the smallest currency unit (e.g. 100 cents for $1.00) representing the total amount of the order. This is the sum of the order items' amounts.</p> |
| initial_amount</br>`integer` | <p>A positive integer in the smallest currency unit (e.g. 100 cents for $1.00) representing the total amount of the order. This is the sum of the order items' amounts.</p> |
| discount_amount</br>`integer` | <p>Sum of all order-level discounts applied to the order.</p> |
| items_discount_amount</br>`integer` | <p>Sum of all product-specific discounts applied to the order.</p> |
| total_discount_amount</br>`integer` | <p>Sum of all order-level AND all product-specific discounts applied to the order.</p> |
| total_amount</br>`integer` | <p>Order amount after undoing all the discounts through the rollback redemption.</p> |
| applied_discount_amount</br>`integer` | <p>This field shows the order-level discount applied.</p> |
| items_applied_discount_amount</br>`integer` | <p>Sum of all product-specific discounts applied in a particular request.<br><code>sum(items, i =&gt; i.applied_discount_amount)</code></p> |
| total_applied_discount_amount</br>`integer` | <p>Sum of all order-level AND all product-specific discounts applied in a particular request.<br><code>total_applied_discount_amount</code> = <code>applied_discount_amount</code> + <code>items_applied_discount_amount</code></p> |
| items</br>`array` | <p>Array of items applied to the order.</p> Array of [Order Item Response](#order-item-response) |
| metadata</br>`object` | <p>A set of custom key/value pairs that you can attach to an order. It can be useful for storing additional information about the order in a structured format.</p> |
| customer_id</br>`string,null` | <p>Unique customer ID of the customer making the purchase.</p> **Example:** <p>cust_7iUa6ICKyU6gH40dBU25kQU1</p> |
| referrer_id</br>`string,null` | <p>Unique referrer ID.</p> **Example:** <p>cust_nM4jqPiaXUvQdVSA6vTRUnix</p> |
| object</br>`string` | <p>The type of object represented by JSON.</p> Available values: `order` |
| redemptions</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">[propertyName]</td><td style="text-align:left">See: <a href="#order-redemptions">Order Redemptions</a></td></tr></tbody></table> |

## Customer Id
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>A unique identifier of an existing customer.</p> |
| object</br>`string` | <p>The type of object represented by JSON.</p> Available values: `customer` |

## Referrer Id
All of:

1. [Customer Id](#customer-id)

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

## Discount
#### Contains information about discount.
<p>Contains information about discount.</p>

Any of:

[Amount](#amount), [Unit](#unit), [Unit Multiple](#unit-multiple), [Percent](#percent), [Fixed](#fixed)

## Voucher Assets
#### Stores links to images of QR and barcode that correspond to an encrypted voucher code.
| Attributes |  Description |
|:-----|:--------|
| qr</br>`object` | <p>Stores Quick Response (QR) representation of encrypted code.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Encrypted voucher code ID.</p> <strong>Example:</strong> <p>U2FsdGVkX19ucFhvVmBVpVYG5KoswTsjSIaqoKg5L9ie4BK+t4pp7U7oFzjGJzj9q/bmuMOj9mEFiVKDMIkSaruKedMvHbKoPX5Sg+BaZk5QwXMf8k/OzSlOEVybpwSq+AiqPoNtjeuqtIgkDyvT6Q==</p></td></tr><tr><td style="text-align:left">url</br><code>string</code></td><td style="text-align:left"><p>URL to QR code</p><p><em>Optional:</em> Attach query parameters to base URL to customize the image of the encrypted voucher code.</p><ul><li><code>size</code>: integer value from <code>1</code> to <code>100</code></li><li><code>format</code>: string, either <code>png</code> (default) or <code>svg</code></li></ul> <strong>Example:</strong> <p>https://dev.dl.voucherify.io/api/v1/assets/qr/U2FsdGVkX19ucFhvVmBVpVYG5KoswTsjSIaqoKg5L9ie4BK%2Bt4pp7U7oFzjGJzj9q%2FbmuMOj9mEFiVKDMIkSaruKedMvHbKoPX5Sg%2BBaZk5QwXMf8k%2FOzSlOEVybpwSq%2BAiqPoNtjeuqtIgkDyvT6Q%3D%3D</p></td></tr></tbody></table> |
| barcode</br>`object` | <p>Stores barcode representation of encrypted code.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Encrypted voucher code ID.</p> <strong>Example:</strong> <p>U2FsdGVkX19eJhGfWwUrH9+tulBkON+AnMktic+N6CVWzZ9+fHVxuVx22WakrzxiWXy0skuvvEHSeZIw9HlgyIJ+kJ1iPdUKpyENuNYJKzoZlO0mmTf6WQM6/pFs61apEn9SJx32ttCF6d3oxKISQQ==</p></td></tr><tr><td style="text-align:left">url</br><code>string</code></td><td style="text-align:left"><p>URL to barcode</p><p><em>Optional:</em> Attach query parameters to base URL to customize the image of the encrypted voucher code.</p><ul><li><code>size</code>: integer value from <code>1</code> to <code>100</code></li><li><code>format</code>: string, either <code>png</code> (default) or <code>svg</code></li></ul> <strong>Example:</strong> <p>https://dev.dl.voucherify.io/api/v1/assets/barcode/U2FsdGVkX19eJhGfWwUrH9%2BtulBkON%2BAnMktic%2BN6CVWzZ9%2BfHVxuVx22WakrzxiWXy0skuvvEHSeZIw9HlgyIJ%2BkJ1iPdUKpyENuNYJKzoZlO0mmTf6WQM6%2FpFs61apEn9SJx32ttCF6d3oxKISQQ%3D%3D</p></td></tr></tbody></table> |

## Validation Rule Assignments
#### Validation Rule Assignments
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about validation rule assignments.</p> |
| data_ref</br>`string` | <p>Identifies the name of the JSON property that contains the array of validation rule assignments.</p> |
| data</br>`array` | <p>A dictionary that contains an array of validation rule assignments.</p> Array of [Validation Rule Assignment](#validation-rule-assignment) |
| total</br>`integer` | <p>Total number of validation rule assignments.</p> |

## Reward
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique reward ID, assigned by Voucherify.</p> **Example:** <p>rew_nIy4gHpQHle2c3pNMwuj7G6j</p> |
| name</br>`string` | <p>Reward name.</p> |
| stock</br>`integer,null` | <p>Configurable for <strong>material rewards</strong>. The number of units of the product that you want to share as reward.</p> |
| redeemed</br>`integer,null` | <p>Defines the number of already invoked (successful) reward redemptions.</p> |
| attributes</br>`object` | <p>These properties are configurable for <strong>material rewards</strong>.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">image_url</br><code>string</code></td><td style="text-align:left"><p>The HTTPS URL pointing to the .png or .jpg file.</p></td></tr><tr><td style="text-align:left">description</br><code>string</code></td><td style="text-align:left"><p>An arbitrary string that you can attach to a material reward.</p></td></tr></tbody></table> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the reward. A set of key/value pairs that you can attach to a reward object. It can be useful for storing additional information about the reward in a structured format.</p> |
| type</br>`string` | <p>Reward type.</p> Available values: `CAMPAIGN`, `COIN`, `MATERIAL` |
| parameters | <p>Defines how the reward is generated.</p> See: [Reward type](#reward-type) |
| created_at</br>`string` | <p>Timestamp representing the date and time when the reward was created in ISO 8601 format.</p> **Example:** <p>2022-08-11T14:49:22.586Z</p> |
| updated_at</br>`string,null` | <p>Timestamp representing the date and time when the reward was updated in ISO 8601 format.</p> **Example:** <p>2022-08-11T16:01:34.885Z</p> |
| object | <p>The type of object represented by the JSON. This object stores information about the reward.</p> Available values: `reward` |

## Customer Response
All of:

1. <h3>Customer Response Data</h3><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>The ID of an existing customer that will be linked to redemption in this request.</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier of the customer who validates a voucher. It can be a customer ID or email from a CRM system, database, or a third-party service. If you also pass a customer ID (unique ID assigned by Voucherify), the source ID will be ignored.</p></td></tr><tr><td style="text-align:left">summary</br><code>object,null</code></td><td style="text-align:left">All of: 1. <a href="#customer-summary">Customer Summary</a></td></tr><tr><td style="text-align:left">loyalty</br><code>object,null</code></td><td style="text-align:left">All of: 1. <a href="#customer-loyalty">Customer Loyalty</a></td></tr><tr><td style="text-align:left">referrals</br><code>object,null</code></td><td style="text-align:left">All of: 1. <a href="#customer-referrals">Customer Referrals</a></td></tr><tr><td style="text-align:left">system_metadata</br><code>object</code></td><td style="text-align:left"><p>Object used to store system metadata information.</p></td></tr><tr><td style="text-align:left">created_at</br><code>string</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the customer was created in ISO 8601 format.</p> <strong>Example:</strong> <p>2022-08-30T06:32:07.380Z</p></td></tr><tr><td style="text-align:left">updated_at</br><code>string</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the customer was updated in ISO 8601 format.</p> <strong>Example:</strong> <p>2022-08-31T06:32:07.380Z</p></td></tr><tr><td style="text-align:left">assets</br><code>object</code></td><td style="text-align:left"><p>Contains information about the customer's cockpit.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">cockpit_url</br><code>string</code></td><td style="text-align:left"><p>Customer's cockpit URL address.</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>The type of object represented by JSON.</p> Available values: <code>customer</code></td></tr></tbody></table>
2. [Customer Base](#customer-base)

## Product Object
#### This is an object representing a product.  

This entity should be used to map product items from your inventory management system. The aim of products is to build which reflect product-specific campaigns.
<p>This is an object representing a product.</p><p>This entity should be used to map product items from your inventory management system. The aim of products is to build which reflect product-specific campaigns.</p>

All of:

1. [Product without Skus Object](#product-without-skus-object)
2. <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">skus</td><td style="text-align:left">See: <a href="#skus-object">SKUs object</a></td></tr></tbody></table>

## SKU Object
#### This is an object representing a product SKU.
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>A unique identifier that represents the SKU and is assigned by Voucherify.</p> **Example:** <p>sku_0b1621b319d248b79f</p> |
| source_id</br>`string,null` | <p>A unique SKU identifier from your inventory system.</p> **Example:** <p>sku_source_id_4</p> |
| product_id</br>`string` | <p>The parent product's unique ID.</p> **Example:** <p>prod_0b15f6b9f650c16990</p> |
| sku</br>`string,null` | <p>Unique user-defined SKU name.</p> **Example:** <p>Large Pink Shirt</p> |
| price</br>`integer,null` | <p>SKU unit price. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 is written as 10000.</p> |
| currency</br>`string,null` | <p>SKU price currency.</p> **Example:** <p>USD</p> |
| attributes</br>`object` | <p>The attributes object stores values for all custom attributes inherited by the SKU from the parent product. A set of key/value pairs that are attached to a SKU object and are unique to each SKU within a product family.</p> |
| image_url</br>`string,null` | <p>The HTTPS URL pointing to the .png or .jpg file that will be used to render the SKU image.</p> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the SKU. A set of key/value pairs that you can attach to a SKU object. It can be useful for storing additional information about the SKU in a structured format.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the SKU was created in ISO 8601 format.</p> **Example:** <p>2022-05-17T10:36:30.187Z</p> |
| updated_at</br>`string,null` | <p>Timestamp representing the date and time when the SKU was updated in ISO 8601 format.</p> **Example:** <p>2022-05-17T10:55:09.137Z</p> |
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about the <code>SKU</code>.</p> Available values: `sku` |

## Order Item Response
| Attributes |  Description |
|:-----|:--------|
| sku_id</br>`string` | <p>A unique SKU ID assigned by Voucherify.</p> |
| product_id</br>`string` | <p>A unique product ID assigned by Voucherify.</p> |
| related_object</br>`string` | <p>Used along with the source_id property, can be set to either sku or product.</p> Available values: `product`, `sku` |
| source_id</br>`string` | <p>The merchant’s product/SKU ID (if it is different from the Voucherify product/SKU ID). It is useful in the integration between multiple systems. It can be an ID from an eCommerce site, a database, or a third-party service.</p> |
| quantity</br>`integer` | <p>The quantity of the particular item in the cart.</p> |
| discount_quantity</br>`integer` | <p>Number of dicounted items.</p> |
| initial_quantity</br>`integer` | <p>A positive integer in the smallest unit quantity representing the total amount of the order; this is the sum of the order items' quantity.</p> |
| amount</br>`integer` | <p>The total amount of the order item (price * quantity).</p> |
| discount_amount</br>`integer` | <p>Sum of all order-item-level discounts applied to the order.</p> |
| initial_amount</br>`integer` | <p>A positive integer in the smallest currency unit (e.g. 100 cents for $1.00) representing the total amount of the order. This is the sum of the order items' amounts.</p> |
| total_applied_discount_amount</br>`integer` | <p>Sum of all order-level AND all product-specific discounts applied in a particular request.<br><code>total_applied_discount_amount</code> = <code>applied_discount_amount</code> + <code>items_applied_discount_amount</code></p> |
| price</br>`integer` | <p>Unit price of an item. Value is multiplied by 100 to precisely represent 2 decimal places. For example <code>10000 cents</code> for <code>$100.00</code>.</p> |
| subtotal_amount</br>`integer` | <p>Final order item amount after the applied item-level discount.  If there are no item-level discounts applied, this item is equal to the <code>amount</code>.<br><code>subtotal_amount</code>=<code>amount</code>-<code>applied_discount_amount</code></p> |
| product</br>`object` | <p>An object containing details of the related product.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier that represents the product and is assigned by Voucherify.</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>The merchant’s product ID (if it is different than Voucherify's product ID). It is really useful in case of integration between multiple systems. It can be an ID from an eCommerce site, a database or a 3rd party service.</p></td></tr><tr><td style="text-align:left">override</br><code>boolean</code></td><td style="text-align:left"><p>The override set to <code>true</code> is used to store the product information in the system. If the product does not exist, it will be created with a source_id; if it does exist, the provided values for the name, price, and metadata will replace those already stored in the system.</p></td></tr><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"><p>Product name.</p></td></tr><tr><td style="text-align:left">metadata</br><code>object</code></td><td style="text-align:left"><p>A set of custom key/value pairs that you can attach to a product. It can be useful for storing additional information about the product in a structured format.</p></td></tr><tr><td style="text-align:left">price</br><code>number</code></td><td style="text-align:left"><p>Product price. A positive integer in the smallest currency unit (e.g. 100 cents for $1.00).</p></td></tr></tbody></table> |
| sku</br>`object` | <p>An object containing details of the related SKU.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier that represents the SKU and is assigned by Voucherify.</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>The merchant’s SKU ID (if it is different than Voucherify's SKU ID). It is really useful in case of integration between multiple systems. It can be an ID from an eCommerce site, a database or a 3rd party service.</p></td></tr><tr><td style="text-align:left">override</br><code>boolean</code></td><td style="text-align:left"><p>The override set to <code>true</code> is used to store the product information in the system. If the product does not exist, it will be created with a source_id; if it does exist, the provided values for the name, price, and metadata will replace those already stored in the system.</p></td></tr><tr><td style="text-align:left">sku</br><code>string</code></td><td style="text-align:left"><p>The SKU name.</p></td></tr><tr><td style="text-align:left">price</br><code>number</code></td><td style="text-align:left"><p>SKU price. A positive integer in the smallest currency unit (e.g. 100 cents for $1.00).</p></td></tr></tbody></table> |
| object</br>`string` | <p>The type of object represented by JSON.</p> Available values: `order_item` |
| metadata</br>`object` | <p>A set of custom key/value pairs that you can attach to an SKU. It can be useful for storing additional information about the SKU in a structured format.</p> |

## Order Redemptions
| Attributes |  Description |
|:-----|:--------|
| date</br>`string` | <p>Timestamp representing the date and time when the redemption was created in ISO 8601 format.</p> **Example:** <p>2022-09-02T17:06:56.649Z</p> |
| rollback_id</br>`string` | <p>Unique ID of the redemption rollback.</p> **Example:** <p>rr_0c63c84eb78ee0a6c0</p> |
| rollback_date</br>`string` | <p>Timestamp representing the date and tiem when the redemption rollback was created in ISO 8601 format.</p> **Example:** <p>2023-01-31T14:18:37.150Z</p> |
| related_object_type</br>`string` | <p>The source of the incentive.</p> |
| related_object_id</br>`string` | <p>Unique ID of the parent redemption.</p> **Example:** <p>r_0ba186c4824e4881e1</p> |
| related_object_parent_id</br>`string` | <p>Represent's the campaign ID of the voucher if the redemption was based on a voucher that was part of bulk codes generated within a campaign. In case of a promotion tier, this represents the campaign ID of the promotion tier's parent campaign.</p> |
| stacked</br>`array` | <p>Contains a list of unique IDs of child redemptions, which belong to the stacked incentives.</p> |
| rollback_stacked</br>`array` | <p>Lists the rollback redemption IDs of the particular child redemptions.</p> |

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

## Reward type
One of:

[Digital](#digital), [Pay with Points](#pay-with-points), [Material](#material)

## Customer Summary
| Attributes |  Description |
|:-----|:--------|
| redemptions | See: [Customer Summary Redemptions](#customer-summary-redemptions) |
| orders | See: [Customer Summary Orders](#customer-summary-orders) |

## Customer Loyalty
| Attributes |  Description |
|:-----|:--------|
| points</br>`integer` | <p>Customer's loyalty points.</p> |
| referred_customers</br>`integer` | <p>Total number of customers referred by the customer.</p> |
| campaigns</br>`object` | <p>Contains campaigns with details about point balances and how many customers were referred by the customer.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">[propertyName]</br><code>object</code></td><td style="text-align:left"><p>Contains details about the point balances left on loyalty cards and the number of referred customers in each campaign.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>Remaining point balance in campaign.</p></td></tr><tr><td style="text-align:left">loyalty_tier</br><code>string</code></td><td style="text-align:left"><p>Customer's loyalty tier within the campaign.</p> <strong>Example:</strong> <p>ltr_UJ5Q54Q0OvEhua87Qfv2Ki5x</p></td></tr><tr><td style="text-align:left">referred_customers</br><code>integer</code></td><td style="text-align:left"><p>Number of customers referred by the customer in campaign.</p></td></tr></tbody></table></td></tr></tbody></table> |

## Customer Referrals
#### Summary of customer's referrals, in this case, the customer being the referee, i.e. information about the source of referrals and number of times the customer was referred by other customers.
| Attributes |  Description |
|:-----|:--------|
| total</br>`integer` | <p>Total number of times this customer received a referral, i.e. was referred by another customer.</p> |
| campaigns</br>`array` | <p>Contains an array of campaigns that served as the source of a referral for the customer.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">campaign_id</br><code>string</code></td><td style="text-align:left"><p>Unique campaign ID, assigned by Voucherify.</p> <strong>Example:</strong> <p>camp_rRsfatlwN7unSeUIJDCYedal</p></td></tr><tr><td style="text-align:left">referrer_id</br><code>string</code></td><td style="text-align:left"><p>Unique referrer ID, assigned by Voucherify. This is the customer ID of a customer that is referring this customer.</p> <strong>Example:</strong> <p>cust_sehkNIi8Uq2qQuRqSr7xn4Zi</p></td></tr><tr><td style="text-align:left">related_object_id</br><code>string</code></td><td style="text-align:left"><p>Related object id</p> <strong>Example:</strong> <p>r_0b9d4cc4aa164dd073</p></td></tr><tr><td style="text-align:left">related_object_type</br><code>string</code></td><td style="text-align:left"><p>Related object type, i.e. <code>redemption</code>.</p></td></tr><tr><td style="text-align:left">date</br><code>string</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the customer was referred in ISO 8601 format.</p> <strong>Example:</strong> <p>2022-08-30T10:19:39.196Z</p></td></tr></tbody></table> |

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

## Product without Skus Object
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique product ID assigned by Voucherify.</p> **Example:** <p>prod_0b1da8105693710357</p> |
| source_id</br>`string,null` | <p>Unique product source ID.</p> **Example:** <p>productSourceID16</p> |
| name</br>`string,null` | <p>Unique user-defined product name.</p> **Example:** <p>T-shirt</p> |
| price</br>`integer,null` | <p>Product unit price. Value is multiplied by 100 to precisely represent 2 decimal places. For example <code>10000 cents</code> for <code>$100.00</code>.</p> |
| attributes</br>`array` | <p>A list of product attributes whose values you can customize for given SKUs: <code>[&quot;color&quot;,&quot;size&quot;,&quot;ranking&quot;]</code>. Each child SKU can have a unique value for a given attribute.</p> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the product. A set of key/value pairs that you can attach to a product object. It can be useful for storing additional information about the product in a structured format.</p> |
| image_url</br>`string,null` | <p>The HTTPS URL pointing to the .png or .jpg file that will be used to render the product image.</p> **Example:** <p>https://images.com/original.jpg</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the product was created in ISO 8601 format.</p> **Example:** <p>2022-05-23T06:52:55.008Z</p> |
| updated_at</br>`string,null` | <p>Timestamp representing the date and time when the product was updated in ISO 8601 format.</p> **Example:** <p>2022-05-23T09:24:07.405Z</p> |
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about the product.</p> Available values: `product` |

## SKUs object
#### Contains information about child SKUs.
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about SKUs.</p> |
| data_ref</br>`string` | <p>Identifies the name of the JSON property that contains the array of SKUs.</p> |
| data</br>`array` | <p>A dictionary that contains an array of SKUs.</p> Array of [SKU Object](#sku-object) |
| total</br>`integer` | <p>Total number of SKUs in the product.</p> |

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

## Digital
| Attributes |  Description |
|:-----|:--------|
| campaign</br>`object` | <p>Objects stores information about the campaign related to the reward.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique campaign ID, assigned by Voucherify.</p></td></tr><tr><td style="text-align:left">balance</br><code>integer</code></td><td style="text-align:left"><p>The incremental amout to be added to the current balance on the gift card. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 amount is written as 10000.</p></td></tr><tr><td style="text-align:left">type</br><code>string</code></td><td style="text-align:left"><p>Campaign type.</p> Available values: <code>DISCOUNT_COUPONS</code>, <code>PROMOTION</code>, <code>GIFT_VOUCHERS</code>, <code>REFERRAL_PROGRAM</code></td></tr></tbody></table> |

## Pay with Points
| Attributes |  Description |
|:-----|:--------|
| coin</br>`object` | <p>Defines the ratio by mapping the number of loyalty points in points_ratio to a predefined cash amount in exchange_ratio.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">exchange_ratio</br><code>number</code></td><td style="text-align:left"><p>The cash equivalent of the points defined in the points_ratio property.</p></td></tr><tr><td style="text-align:left">points_ratio</br><code>integer</code></td><td style="text-align:left"><p>The number of loyalty points that will map to the predefined cash amount defined by the exchange_ratio property.</p></td></tr></tbody></table> |

## Material
| Attributes |  Description |
|:-----|:--------|
| product</br>`object` | <p>Contains information about the product given as a reward.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique product ID, assigned by Voucherify.</p> <strong>Example:</strong> <p>prod_0b7d7dfb05cbe5c616</p></td></tr><tr><td style="text-align:left">sku</br><code>string,null</code></td><td style="text-align:left"><p>Unique SKU ID, assigned by Voucherify, of the SKU given as a reward.</p> <strong>Example:</strong> <p>sku_0b7d7dfb090be5c619</p></td></tr></tbody></table> |

## Customer Summary Redemptions
| Attributes |  Description |
|:-----|:--------|
| total_redeemed</br>`integer` | <p>Total number of redemptions made by the customer.</p> |
| total_failed</br>`integer` | <p>Total number of redemptions that failed.</p> |
| total_succeeded</br>`integer` | <p>Total number of redemptions that succeeded.</p> |
| total_rolled_back</br>`integer` | <p>Total number of redemptions that were rolled back for the customer.</p> |
| total_rollback_failed</br>`integer` | <p>Total number of redemption rollbacks that failed.</p> |
| total_rollback_succeeded</br>`integer` | <p>Total number of redemption rollbacks that succeeded.</p> |
| gift</br>`object` | <p>Summary of gift card credits.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">redeemed_amount</br><code>integer</code></td><td style="text-align:left"><p>Total amount of gift card credits redeemed by customer. Value is multiplied by 100 to precisely represent 2 decimal places. For example <code>10000 cents</code> for <code>$100.00</code>.</p></td></tr><tr><td style="text-align:left">amount_to_go</br><code>integer</code></td><td style="text-align:left"><p>Remaining gift card balance across all gift cards. Value is multiplied by 100 to precisely represent 2 decimal places. For example <code>10000 cents</code> for <code>$100.00</code>.</p></td></tr></tbody></table> |
| loyalty_card</br>`object` | <p>Summary of loyalty points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">redeemed_points</br><code>integer</code></td><td style="text-align:left"><p>Total number of loyalty points redeemed by the customer.</p></td></tr><tr><td style="text-align:left">points_to_go</br><code>integer</code></td><td style="text-align:left"><p>Sum of remaining available point balance across all loyalty cards.</p></td></tr></tbody></table> |

## Customer Summary Orders
| Attributes |  Description |
|:-----|:--------|
| total_amount</br>`integer` | <p>The total amount spent by the customer. Value is multiplied by 100 to precisely represent 2 decimal places. For example <code>10000 cents</code> for <code>$100.00</code>.</p> |
| total_count</br>`integer` | <p>Total number of orders made by the customer.</p> |
| average_amount</br>`integer` | <p>Average amount spent on orders. <code>total_amount</code> ÷ <code>total_count</code>. Value is multiplied by 100 to precisely represent 2 decimal places. For example <code>10000 cents</code> for <code>$100.00</code>.</p> |
| last_order_amount</br>`integer` | <p>Amount spent on last order. Value is multiplied by 100 to precisely represent 2 decimal places. For example <code>10000 cents</code> for <code>$100.00</code>.</p> |
| last_order_date</br>`string` | <p>Timestamp representing the date and time of the customer's last order in ISO 8601 format.</p> **Example:** <p>2022-08-30T11:51:08.029Z</p> |

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
