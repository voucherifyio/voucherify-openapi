---
title: Customer Activity Object
type: basic
categorySlug: voucherify-api
parentDocSlug: customers-api
slug: customer-activity-object
hidden: false
order: 2
---

## Customer Activity Object
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique event ID, assigned by Voucherify.</p> **Example:** <p>evcus_0c150c51730c6b60b1</p> |
| type</br>`string` | <p>Event type.</p> Available values: `customer.confirmed`, `customer.created`, `customer.updated`, `customer.deleted`, `customer.referred`, `customer.custom_event`, `customer.segment_entered`, `customer.segment.left`, `customer.sms.sent`, `customer.sms.failed`, `customer.email.sent`, `customer.email.failed`, `customer.activecampaign.sent`, `customer.braze.sent`, `customer.mailchimp.sent`, `customer.intercom.sent`, `customer.intercom.failed`, `customer.rewarded`, `customer.rewarded.loyalty_points`, `customer.voucher.gift.balance_added`, `customer.voucher.loyalty_card.points_added`, `customer.voucher.loyalty_card.points_transferred`, `customer.publication.succeeded`, `customer.publication.failed`, `customer.redemption.succeeded`, `customer.redemption.failed`, `customer.redemption.rollback.succeeded`, `customer.redemption.rollback.failed`, `customer.consents.given`, `customer.consents.revoked` |
| data</br>`array` | <p>Contains details about the event. The objects that are returned in the data attribute differ based on the context of the event type.</p> Array of [Customer Activity Data Object](#customer-activity-data-object) |
| created_at</br>`string` | <p>Timestamp representing the date and time when the customer activity occurred in ISO 8601 format.</p> **Example:** <p>2022-08-30T09:14:07.660Z</p> |

## Customer Activity Data Object
<p>Event data object schema.</p>

Any of:

[Customer Confirmed](#customer-confirmed), [Customer Created](#customer-created), [Customer Updated](#customer-updated), [Customer Deleted](#customer-deleted), [Customer Referred](#customer-referred), [Custom Event](#custom-event), [Segment Entered](#segment-entered), [Segment Left](#segment-left), [SMS Sent](#sms-sent), [SMS Failed](#sms-failed), [Email Sent](#email-sent), [Email Failed](#email-failed), [ActiveCampaign Sent](#activecampaign-sent), [ActiveCampaign Failed](#activecampaign-failed), [Braze Sent](#braze-sent), [Braze Failed](#braze-failed), [Mailchimp Sent](#mailchimp-sent), [Mailchimp Failed](#mailchimp-failed), [Intercom Sent](#intercom-sent), [Intercom Failed](#intercom-failed), [Customer Rewarded](#customer-rewarded), [Customer Rewarded Loyalty Points](#customer-rewarded-loyalty-points), [Gift Voucher Balance Added](#gift-voucher-balance-added), [Loyalty Card Points Added](#loyalty-card-points-added), [Loyalty Card Points Transferred](#loyalty-card-points-transferred), [Publication Succeeded](#publication-succeeded), [Publication Failed](#publication-failed), [Redemption Succeeded](#redemption-succeeded), [Redemption Succeeded](#redemption-succeeded), [Redemption Rollback Succeeded](#redemption-rollback-succeeded), [Redemption Rollback Failed](#redemption-rollback-failed), [Consents Given](#consents-given), [Consents Given](#consents-given)

## Customer Confirmed
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Customer Object](#customer-object) |
| unconfirmed_customer</br>`string` | **Example:** <p>ucust_1qa70mVfYkl11Ab0ZxDPdWNa</p> |

## Customer Created
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Customer Object](#customer-object) |

## Customer Updated
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Customer Object](#customer-object) |

## Customer Deleted
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Customer Object](#customer-object) |

## Customer Referred
| Attributes |  Description |
|:-----|:--------|
| voucher</br>`object` |  |
| campaign</br>`object` |  |
| customer</br>`object` |  |
| referrer</br>`object` |  |
| redemption</br>`object` |  |
| custom_event</br>`object` |  |

## Custom Event
| Attributes |  Description |
|:-----|:--------|
| event</br>`object` |  |
| loyalty</br>`object` |  |
| customer</br>`object` |  |
| referral</br>`object` |  |
| event_schema</br>`object` |  |

## Segment Entered
| Attributes |  Description |
|:-----|:--------|
| segment</br>`object` |  |
| customer</br>`object` |  |

## Segment Left
| Attributes |  Description |
|:-----|:--------|
| segment</br>`object` |  |
| customer</br>`object` |  |

## SMS Sent
<p>Event data object schema for <code>customer.sms.sent</code>.</p>

## SMS Failed
<p>Event data object schema for <code>customer.sms.failed</code>.</p>

## Email Sent
<p>Event data object schema for <code>customer.email.sent</code>.</p>

## Email Failed
<p>Event data object schema for <code>customer.email.failed</code>.</p>

## ActiveCampaign Sent
<p>Event data object schema for <code>customer.activecampaign.sent</code>.</p>

## ActiveCampaign Failed
<p>Event data object schema for <code>customer.activecampaign.failed</code>.</p>

## Braze Sent
<p>Event data object schema for <code>customer.braze.sent</code>.</p>

## Braze Failed
<p>Event data object schema for <code>customer.braze.failed</code>.</p>

## Mailchimp Sent
<p>Event data object schema for <code>customer.mailchimp.sent</code>.</p>

## Mailchimp Failed
<p>Event data object schema for <code>customer.mailchimp.failed</code>.</p>

## Intercom Sent
<p>Event data object schema for <code>customer.intercom.sent</code>.</p>

## Intercom Failed
<p>Event data object schema for <code>customer.intercom.failed</code>.</p>

## Customer Rewarded
| Attributes |  Description |
|:-----|:--------|
| holder</br>`object` |  |
| reward</br>`object` |  |
| balance</br>`object` |  |
| voucher</br>`object` |  |
| campaign</br>`object` |  |
| customer</br>`object` |  |
| redemption</br>`object` |  |
| custom_event</br>`object` |  |
| referral_tier</br>`object` |  |
| customer_event</br>`object` |  |

## Customer Rewarded Loyalty Points
| Attributes |  Description |
|:-----|:--------|
| order</br>`object` |  |
| holder</br>`object` |  |
| balance</br>`object` |  |
| voucher</br>`object` |  |
| campaign</br>`object` |  |
| customer</br>`object` |  |
| earning_rule</br>`object` |  |
| loyalty_tier</br>`object` |  |

## Gift Voucher Balance Added
| Attributes |  Description |
|:-----|:--------|
| balance</br>`object` |  |
| voucher</br>`object` |  |
| campaign</br>`object` |  |
| customer</br>`object` |  |

## Loyalty Card Points Added
| Attributes |  Description |
|:-----|:--------|
| balance</br>`object` |  |
| voucher</br>`object` |  |
| campaign</br>`object` |  |
| customer</br>`object` |  |

## Loyalty Card Points Transferred
<p>Event data object schema for <code>customer.voucher.loyalty_card.points_transferred</code>.</p>

## Publication Succeeded
| Attributes |  Description |
|:-----|:--------|
| campaign</br>`object` |  |
| customer</br>`object` |  |
| publication</br>`object` |  |

## Publication Failed
| Attributes |  Description |
|:-----|:--------|
| campaign</br>`object` |  |
| customer</br>`object` |  |
| publication</br>`object` |  |

## Redemption Succeeded
| Attributes |  Description |
|:-----|:--------|
| order</br>`object` |  |
| holder</br>`object` |  |
| voucher</br>`object` |  |
| campaign</br>`object` |  |
| customer</br>`object` |  |
| redemption</br>`object` |  |
| promotion_tier</br>`object` |  |

## Redemption Succeeded
| Attributes |  Description |
|:-----|:--------|
| order</br>`object` |  |
| holder</br>`object` |  |
| voucher</br>`object` |  |
| campaign</br>`object` |  |
| customer</br>`object` |  |
| redemption</br>`object` |  |
| promotion_tier</br>`object` |  |

## Redemption Rollback Succeeded
| Attributes |  Description |
|:-----|:--------|
| order</br>`object` |  |
| holder</br>`object` |  |
| voucher</br>`object` |  |
| campaign</br>`object` |  |
| customer</br>`object` |  |
| redemption</br>`object` |  |
| promotion_tier</br>`object` |  |
| redemption_rollback</br>`object` |  |

## Redemption Rollback Failed
| Attributes |  Description |
|:-----|:--------|
| order</br>`object` |  |
| holder</br>`object` |  |
| campaign</br>`object` |  |
| customer</br>`object` |  |
| redemption</br>`object` |  |
| promotion_tier</br>`object` |  |
| redemption_rollback</br>`object` |  |

## Consents Given
| Attributes |  Description |
|:-----|:--------|
| consents</br>`object` |  |
| customer</br>`object` |  |

## Consents Given
| Attributes |  Description |
|:-----|:--------|
| consents</br>`object` |  |
| customer</br>`object` |  |

## Customer Object
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>The unique ID of a customer that is assigned by Voucherify.</p> **Example:** <p>cust_CSnYd37MXmrbS19XCrghjBsv</p> |
| source_id</br>`string` | <p>The merchant’s customer ID if it is different from the Voucherify customer ID. It is really useful in case of an integration between multiple systems. It can be a customer ID from a CRM system, database or 3rd-party service.</p> |
| name</br>`string` | <p>Customer's first and last name.</p> |
| description</br>`string` | <p>An arbitrary string that you can attach to a customer object.</p> |
| email</br>`string` | <p>Customer's email address.</p> |
| phone</br>`string` | <p>Customer's phone number.</p> |
| birthdate</br>`string` | <p>Customer's birthdate.</p> |
| birthday</br>`string` | <p>Customer's birthday.</p> |
| address</br>`object` | <p>Customer's address.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">city</br><code>string</code></td><td style="text-align:left"><p>City</p></td></tr><tr><td style="text-align:left">state</br><code>string</code></td><td style="text-align:left"><p>State</p></td></tr><tr><td style="text-align:left">line_1</br><code>string</code></td><td style="text-align:left"><p>First line of address.</p></td></tr><tr><td style="text-align:left">line_2</br><code>string</code></td><td style="text-align:left"><p>Second line of address.</p></td></tr><tr><td style="text-align:left">country</br><code>string</code></td><td style="text-align:left"><p>Country.</p></td></tr><tr><td style="text-align:left">postal_code</br><code>string</code></td><td style="text-align:left"><p>Postal code.</p></td></tr></tbody></table> |
| summary</br>`object` | <p>Contains a summary of customer's redemption and order statistics.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">redemptions</br><code>object</code></td><td style="text-align:left"><p>Customer's redemptions statistics.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">total_redeemed</br><code>integer</code></td><td style="text-align:left"><p>Total number of redemptions made by the customer.</p></td></tr><tr><td style="text-align:left">total_failed</br><code>integer</code></td><td style="text-align:left"><p>Total number of redemptions that failed.</p></td></tr><tr><td style="text-align:left">total_succeeded</br><code>integer</code></td><td style="text-align:left"><p>Total number of redemptions that succeeded.</p></td></tr><tr><td style="text-align:left">total_rolled_back</br><code>integer</code></td><td style="text-align:left"><p>Total number of redemptions that were rolled back for the customer.</p></td></tr><tr><td style="text-align:left">total_rollback_failed</br><code>integer</code></td><td style="text-align:left"><p>Total number of redemption rollbacks that failed.</p></td></tr><tr><td style="text-align:left">total_rollback_succeeded</br><code>integer</code></td><td style="text-align:left"><p>Total number of redemption rollbacks that succeeded.</p></td></tr><tr><td style="text-align:left">gift</br><code>object</code></td><td style="text-align:left"><p>Summary of gift card credits.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">redeemed_amount</br><code>integer</code></td><td style="text-align:left"><p>Total amount of gift card credits redeemed by customer. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 is written as 10000.</p></td></tr><tr><td style="text-align:left">amount_to_go</br><code>integer</code></td><td style="text-align:left"><p>Remaining gift card balance across all gift cards. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 is written as 10000.</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">loyalty_card</br><code>object</code></td><td style="text-align:left"><p>Summary of loyalty points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">redeemed_points</br><code>integer</code></td><td style="text-align:left"><p>Total number of loyalty points redeemed by the customer.</p></td></tr><tr><td style="text-align:left">points_to_go</br><code>integer</code></td><td style="text-align:left"><p>Sum of remaining available point balance accross all loyalty cards.</p></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="text-align:left">orders</br><code>object</code></td><td style="text-align:left"><p>Customer's order statistics.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">total_amount</br><code>integer</code></td><td style="text-align:left"><p>The total amount spent by the customer. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 is written as 10000.</p></td></tr><tr><td style="text-align:left">total_count</br><code>integer</code></td><td style="text-align:left"><p>Total number of orders made by the customer.</p></td></tr><tr><td style="text-align:left">average_amount</br><code>integer</code></td><td style="text-align:left"><p>Average amount spent on orders. <code>total_amount</code> ÷ <code>total_count</code>. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 is written as 10000.</p></td></tr><tr><td style="text-align:left">last_order_amount</br><code>integer</code></td><td style="text-align:left"><p>Amount spent on last order. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 is written as 10000.</p></td></tr><tr><td style="text-align:left">last_order_date</br><code>string</code></td><td style="text-align:left"><p>Timestamp representing the date and time of the customer's last order in ISO 8601 format.</p> <strong>Example:</strong> <p>2022-08-30T11:51:08.029Z</p></td></tr></tbody></table></td></tr></tbody></table> |
| loyalty</br>`object` | <p>Summary of customer's loyalty information.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"></td></tr><tr><td style="text-align:left">referred_customers</br><code>integer</code></td><td style="text-align:left"><p>Total number of customers referred by the customer.</p></td></tr><tr><td style="text-align:left">campaigns</br><code>object</code></td><td style="text-align:left"><p>Contains campaigns with details about point balances and how many customers were referred by the customer.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">campaign_name</br><code>object</code></td><td style="text-align:left"><p>Contains details about the point balances left on loyalty cards and the number of referred customers in each campaign.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>Remaining point balance in campaign.</p></td></tr><tr><td style="text-align:left">loyalty_tier</br><code>string</code></td><td style="text-align:left"><p>Customer's loyalty tier within the campaign.</p> <strong>Example:</strong> <p>ltr_UJ5Q54Q0OvEhua87Qfv2Ki5x</p></td></tr><tr><td style="text-align:left">referred_customers</br><code>integer</code></td><td style="text-align:left"><p>Number of customers referred by the customer in campaign.</p></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table> |
| referrals</br>`object` | <p>Summary of customer's referrals, in this case, the customer being the referee, i.e. information about the source of referrals and number of times the customer was referred by other customers.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">total</br><code>integer</code></td><td style="text-align:left"><p>Total number of times this customer received a referral, i.e. was referred by another customer.</p></td></tr><tr><td style="text-align:left">campaigns</br><code>array</code></td><td style="text-align:left"><p>Contains an array of campaigns that served as the source of a referral for the customer.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">campaign_id</br><code>string</code></td><td style="text-align:left"><p>Unique campaign ID, assigned by Voucherify.</p> <strong>Example:</strong> <p>camp_rRsfatlwN7unSeUIJDCYedal</p></td></tr><tr><td style="text-align:left">referrer_id</br><code>string</code></td><td style="text-align:left"><p>Unique referrer ID, assigned by Voucherify. This is the customer ID of a customer that is referring this customer.</p> <strong>Example:</strong> <p>cust_sehkNIi8Uq2qQuRqSr7xn4Zi</p></td></tr><tr><td style="text-align:left">related_object_id</br><code>string</code></td><td style="text-align:left"><p>Related object ID, i.e. <code>r_0b9d4cc4aa164dd073</code>.</p></td></tr><tr><td style="text-align:left">related_object_type</br><code>string</code></td><td style="text-align:left"><p>Related object type, i.e. <code>redemption</code>.</p></td></tr><tr><td style="text-align:left">date</br><code>string</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the customer was referred in ISO 8601 format.</p> <strong>Example:</strong> <p>2022-08-30T10:19:39.196Z</p></td></tr></tbody></table></td></tr></tbody></table> |
| metadata</br>`object` | <p>A set of custom key/value pairs that you can attach to a customer. The metadata object stores all custom attributes assigned to the customer. It can be useful for storing additional information about the customer in a structured format. This metadata can be used for validating whether the customer qualifies for a discount or it can be used in building customer segments.</p> |
| system_metadata</br>`object` | <p>Object used to store system metadata information.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">consents</br><code>object</code></td><td style="text-align:left"><p>Stores a list of consent ID's along with the timestamp and decision on accepting or rejecting a marketing permission.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">consentId</br><code>object</code></td><td style="text-align:left"><p>Unique ID of a consent, i.e. <code>cnst_lbgOBhHTuDrB7sjIhFjvIALj</code>.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">date</br><code>string</code></td><td style="text-align:left"><p>Timestamp representing the date and time when a consent was accepted or rejected in ISO 8601 format.</p> <strong>Example:</strong> <p>2022-05-10T08:50:10.338Z</p></td></tr><tr><td style="text-align:left">value</br><code>boolean</code></td><td style="text-align:left"><p>Accepted: <code>true</code>, Rejected: <code>false</code></p></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="text-align:left">source</br><code>string</code></td><td style="text-align:left"><p>Takes on the name of the source of the integration if the customer was created through an integration, i.e. <code>Bigcommerce</code> or <code>Shopify</code>.</p></td></tr></tbody></table> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the customer was created in ISO 8601 format.</p> **Example:** <p>2022-08-30T06:32:07.380Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the customer was updated in ISO 8601 format.</p> **Example:** <p>2022-08-31T06:32:07.380Z</p> |
| assets</br>`object` | <p>Contains information about the customer's cockpit.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">cockpit_url</br><code>string</code></td><td style="text-align:left"><p>Customer's cockpit URL address.</p></td></tr></tbody></table> |
| object</br>`string` | <p>The type of object represented by the JSON. This object stores information about the customer.</p> |
| email_unsubscribed</br>`boolean` |  |

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
