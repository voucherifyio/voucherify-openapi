---
title: Customer Activity Object
type: basic
categorySlug: voucherify-api
parentDocSlug: customers
slug: customer-activity-object
hidden: false
order: 2
---

## Customer Activity
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique event ID, assigned by Voucherify.</p> **Example:** <p>evcus_0c150c51730c6b60b1</p> |
| type</br>`string` | <p>Event type.</p> Available values: `customer.confirmed`, `customer.created`, `customer.updated`, `customer.deleted`, `customer.referred`, `customer.custom_event`, `customer.segment.entered`, `customer.segment.left`, `customer.sms.sent`, `customer.sms.recovered`, `customer.sms.failed`, `customer.email.sent`, `customer.email.recovered`, `customer.email.failed`, `customer.activecampaign.sent`, `customer.activecampaign.recovered`, `customer.activecampaign.failed`, `customer.braze.sent`, `customer.braze.recovered`, `customer.braze.failed`, `customer.mailchimp.sent`, `customer.mailchimp.recovered`, `customer.mailchimp.failed`, `customer.intercom.sent`, `customer.intercom.recovered`, `customer.intercom.failed`, `customer.shopify.sent`, `customer.shopify.recovered`, `customer.shopify.failed`, `customer.klaviyo.sent`, `customer.klaviyo.recovered`, `customer.klaviyo.failed`, `customer.batch.sent`, `customer.batch.recovered`, `customer.batch.failed`, `customer.rewarded`, `customer.rewarded.loyalty_points`, `customer.voucher.gift.balance_added`, `customer.voucher.loyalty_card.points_added`, `customer.voucher.loyalty_card.points_transferred`, `customer.voucher.loyalty_card.points_expired`, `customer.voucher.deleted`, `customer.publication.succeeded`, `customer.publication.failed`, `customer.validation.succeeded`, `customer.validation.failed`, `customer.redemption.failed`, `customer.redemption.succeeded`, `customer.redemption.rollback.failed`, `customer.redemption.rollback.succeeded`, `customer.consents.given`, `customer.consents.revoked`, `customer.order.canceled`, `customer.order.created`, `customer.order.fulfilled`, `customer.order.paid`, `customer.order.processing`, `customer.order.updated`, `customer.reward_redemptions.created`, `customer.reward_redemptions.pending`, `customer.reward_redemptions.completed`, `customer.reward_redemptions.rolledback`, `customer.loyalty.updated`, `customer.loyalty.tier.upgraded`, `customer.loyalty.tier.downgraded`, `customer.loyalty.tier.prolonged`, `customer.loyalty.tier.expiration.changed`, `customer.loyalty.tier.joined`, `customer.loyalty.tier.left` |
| data</br>`array` | <p>Contains details about the event. The objects that are returned in the data attribute differ based on the context of the event type.</p> Array of [Customer Activity Data](#customer-activity-data) |
| created_at</br>`string` | <p>Timestamp representing the date and time when the customer activity occurred in ISO 8601 format.</p> **Example:** <p>2022-08-30T09:14:07.660Z</p> |

## Customer Activity Data
<p>Event data object schema.</p>

One of:

[Event Customer Confirmed](#event-customer-confirmed), [Event Customer Created](#event-customer-created), [Event Customer Updated](#event-customer-updated), [Event Customer Deleted](#event-customer-deleted), [Event Customer Referred](#event-customer-referred), [Event Customer Custom Event](#event-customer-custom-event), [Event Customer Segment Entered](#event-customer-segment-entered), [Event Customer Segment Left](#event-customer-segment-left), [Event Customer SMS Sent](#event-customer-sms-sent), [Event Customer SMS Recovered](#event-customer-sms-recovered), [Event Customer SMS Failed](#event-customer-sms-failed), [Event Customer Email Sent](#event-customer-email-sent), [Event Customer Email Recovered](#event-customer-email-recovered), [Event Customer Email Failed](#event-customer-email-failed), [Event Customer ActiveCampaign Sent](#event-customer-activecampaign-sent), [Event Customer ActiveCampaign Recovered](#event-customer-activecampaign-recovered), [Event Customer ActiveCampaign Failed](#event-customer-activecampaign-failed), [Event Customer Braze Sent](#event-customer-braze-sent), [Event Customer Braze Recovered](#event-customer-braze-recovered), [Event Customer Braze Failed](#event-customer-braze-failed), [Event Customer Mailchimp Sent](#event-customer-mailchimp-sent), [Event Customer Mailchimp Recovered](#event-customer-mailchimp-recovered), [Event Customer Mailchimp Failed](#event-customer-mailchimp-failed), [Event Customer Intercom Sent](#event-customer-intercom-sent), [Event Customer Intercom Recovered](#event-customer-intercom-recovered), [Event Customer Intercom Failed](#event-customer-intercom-failed), [Event Customer Shopify Sent](#event-customer-shopify-sent), [Event Customer Shopify Recovered](#event-customer-shopify-recovered), [Event Customer Shopify Failed](#event-customer-shopify-failed), [Event Customer Klaviyo Sent](#event-customer-klaviyo-sent), [Event Customer Klaviyo Recovered](#event-customer-klaviyo-recovered), [Event Customer Klaviyo Failed](#event-customer-klaviyo-failed), [Event Customer Batch Sent](#event-customer-batch-sent), [Event Customer Batch Recovered](#event-customer-batch-recovered), [Event Customer Batch Failed](#event-customer-batch-failed), [Event Customer Rewarded](#event-customer-rewarded), [Event Customer Rewarded Loyalty Points](#event-customer-rewarded-loyalty-points), [Event Customer Gift Voucher Balance Added](#event-customer-gift-voucher-balance-added), [Event Customer Loyalty Card Points Added](#event-customer-loyalty-card-points-added), [Event Customer Loyalty Card Points Transferred](#event-customer-loyalty-card-points-transferred), [Event Customer Loyalty Card Points Expired](#event-customer-loyalty-card-points-expired), [Event Customer Voucher Deleted](#event-customer-voucher-deleted), [Event Customer Publication Succeeded](#event-customer-publication-succeeded), [Event Customer Publication Failed](#event-customer-publication-failed), [Event Customer Validation Succeeded](#event-customer-validation-succeeded), [Event Customer Validation Failed](#event-customer-validation-failed), [Event Customer Redemption Succeeded](#event-customer-redemption-succeeded), [Event Customer Redemption Failed](#event-customer-redemption-failed), [Event Customer Redemption Rollback Succeeded](#event-customer-redemption-rollback-succeeded), [Event Customer Redemption Rollback Failed](#event-customer-redemption-rollback-failed), [Event Customer Consents Given](#event-customer-consents-given), [Event Customer Consents Revoked](#event-customer-consents-revoked), [Event Customer Order Canceled](#event-customer-order-canceled), [Event Customer Order Created](#event-customer-order-created), [Event Customer Order Fulfilled](#event-customer-order-fulfilled), [Event Customer Order Paid](#event-customer-order-paid), [Event Customer Order Processing](#event-customer-order-processing), [Event Customer Order Updated](#event-customer-order-updated), [Event Customer Reward Redemptions Created](#event-customer-reward-redemptions-created), [Event Customer Reward Redemptions Pending](#event-customer-reward-redemptions-pending), [Event Customer Reward Redemptions Completed](#event-customer-reward-redemptions-completed), [Event Customer Reward Redemptions Rolled Back](#event-customer-reward-redemptions-rolled-back), [Event Customer Loyalty Updated](#event-customer-loyalty-updated), [Event Customer Loyalty Tier Upgraded](#event-customer-loyalty-tier-upgraded), [Event Customer Loyalty Tier Downgraded](#event-customer-loyalty-tier-downgraded), [Event Customer Loyalty Tier Prolonged](#event-customer-loyalty-tier-prolonged), [Event Customer Loyalty Tier Expiration Changed](#event-customer-loyalty-tier-expiration-changed), [Event Customer Loyalty Tier Joined](#event-customer-loyalty-tier-joined), [Event Customer Loyalty Tier Left](#event-customer-loyalty-tier-left)

## Event Customer Confirmed
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Customer With Summary Loyalty Referrals](#customer-with-summary-loyalty-referrals) |
| unconfirmed_customer</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><strong>Example:</strong> <p>ucust_1qa70mVfYkl11Ab0ZxDPdWNa</p></td></tr></tbody></table> |

## Event Customer Created
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Customer With Summary Loyalty Referrals](#customer-with-summary-loyalty-referrals) |

## Event Customer Updated
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Customer With Summary Loyalty Referrals](#customer-with-summary-loyalty-referrals) |

## Event Customer Deleted
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Customer With Summary Loyalty Referrals](#customer-with-summary-loyalty-referrals) |

## Event Customer Referred
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Simple Customer](#simple-customer) |
| referrer | See: [Simple Customer](#simple-customer) |
| campaign | See: [Simple Campaign](#simple-campaign) |
| voucher | See: [Simple Voucher](#simple-voucher) |
| custom_event | See: [Custom Event](#custom-event) |
| redemption | See: [Redemption Internal](#redemption-internal) |

## Event Customer Custom Event
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Customer With Summary Loyalty Referrals](#customer-with-summary-loyalty-referrals) |

## Event Customer Segment Entered
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Customer With Summary Loyalty Referrals](#customer-with-summary-loyalty-referrals) |
| segment | See: [Simple Segment](#simple-segment) |

## Event Customer Segment Left
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Customer With Summary Loyalty Referrals](#customer-with-summary-loyalty-referrals) |
| segment | See: [Simple Segment](#simple-segment) |

## Event Customer SMS Sent
<p>Event data object schema for <code>customer.sms.sent</code>.</p>

[Event Customer Sent](#event-customer-sent)

## Event Customer SMS Recovered
<p>Event data object schema for <code>customer.sms.recovered</code>.</p>

[Event Customer Recovered](#event-customer-recovered)

## Event Customer SMS Failed
<p>Event data object schema for <code>customer.sms.failed</code>.</p>

[Event Customer Failed](#event-customer-failed)

## Event Customer Email Sent
<p>Event data object schema for <code>customer.email.sent</code>.</p>

[Event Customer Sent](#event-customer-sent)

## Event Customer Email Recovered
<p>Event data object schema for <code>customer.email.recovered</code>.</p>

[Event Customer Recovered](#event-customer-recovered)

## Event Customer Email Failed
<p>Event data object schema for <code>customer.email.failed</code>.</p>

[Event Customer Failed](#event-customer-failed)

## Event Customer ActiveCampaign Sent
<p>Event data object schema for <code>customer.activecampaign.sent</code>.</p>

[Event Customer Sent](#event-customer-sent)

## Event Customer ActiveCampaign Recovered
<p>Event data object schema for <code>customer.activecampaign.recovered</code>.</p>

[Event Customer Recovered](#event-customer-recovered)

## Event Customer ActiveCampaign Failed
<p>Event data object schema for <code>customer.activecampaign.failed</code>.</p>

[Event Customer Failed](#event-customer-failed)

## Event Customer Braze Sent
<p>Event data object schema for <code>customer.braze.sent</code>.</p>

[Event Customer Sent](#event-customer-sent)

## Event Customer Braze Recovered
<p>Event data object schema for <code>customer.braze.recovered</code>.</p>

[Event Customer Recovered](#event-customer-recovered)

## Event Customer Braze Failed
<p>Event data object schema for <code>customer.braze.failed</code>.</p>

[Event Customer Failed](#event-customer-failed)

## Event Customer Mailchimp Sent
<p>Event data object schema for <code>customer.mailchimp.sent</code>.</p>

[Event Customer Sent](#event-customer-sent)

## Event Customer Mailchimp Recovered
<p>Event data object schema for <code>customer.mailchimp.recovered</code>.</p>

[Event Customer Recovered](#event-customer-recovered)

## Event Customer Mailchimp Failed
<p>Event data object schema for <code>customer.mailchimp.failed</code>.</p>

[Event Customer Failed](#event-customer-failed)

## Event Customer Intercom Sent
<p>Event data object schema for <code>customer.intercom.sent</code>.</p>

[Event Customer Sent](#event-customer-sent)

## Event Customer Intercom Recovered
<p>Event data object schema for <code>customer.intercom.recovered</code>.</p>

[Event Customer Recovered](#event-customer-recovered)

## Event Customer Intercom Failed
<p>Event data object schema for <code>customer.intercom.failed</code>.</p>

[Event Customer Failed](#event-customer-failed)

## Event Customer Shopify Sent
<p>Event data object schema for <code>customer.shopify.sent</code>.</p>

[Event Customer Sent](#event-customer-sent)

## Event Customer Shopify Recovered
<p>Event data object schema for <code>customer.shopify.recovered</code>.</p>

[Event Customer Recovered](#event-customer-recovered)

## Event Customer Shopify Failed
<p>Event data object schema for <code>customer.shopify.failed</code>.</p>

[Event Customer Failed](#event-customer-failed)

## Event Customer Klaviyo Sent
<p>Event data object schema for <code>customer.klaviyo.sent</code>.</p>

[Event Customer Sent](#event-customer-sent)

## Event Customer Klaviyo Recovered
<p>Event data object schema for <code>customer.klaviyo.recovered</code>.</p>

[Event Customer Recovered](#event-customer-recovered)

## Event Customer Klaviyo Failed
<p>Event data object schema for <code>customer.klaviyo.failed</code>.</p>

[Event Customer Failed](#event-customer-failed)

## Event Customer Batch Sent
<p>Event data object schema for <code>customer.batch.sent</code>.</p>

[Event Customer Sent](#event-customer-sent)

## Event Customer Batch Recovered
<p>Event data object schema for <code>customer.batch.recovered</code>.</p>

[Event Customer Recovered](#event-customer-recovered)

## Event Customer Batch Failed
<p>Event data object schema for <code>customer.batch.failed</code>.</p>

[Event Customer Failed](#event-customer-failed)

## Event Customer Rewarded
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Simple Customer](#simple-customer) |
| holder | See: [Simple Customer](#simple-customer) |
| voucher | See: [Simple Voucher](#simple-voucher) |
| campaign | See: [Simple Campaign](#simple-campaign) |
| redemption | See: [Redemption Internal](#redemption-internal) |
| reward | See: [Simple Redemption Reward Result](#simple-redemption-reward-result) |
| referral_tier | See: [Simple Referral Tier](#simple-referral-tier) |
| balance</br>`integer` |  |
| custom_event | See: [Custom Event](#custom-event) |
| customer_event</br>`object` |  |

## Event Customer Rewarded Loyalty Points
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Simple Customer](#simple-customer) |
| holder | See: [Simple Customer](#simple-customer) |
| voucher | See: [Simple Voucher](#simple-voucher) |
| campaign | See: [Simple Campaign](#simple-campaign) |
| loyalty_tier | See: [Loyalty Tier](#loyalty-tier) |
| earning_rule | See: [Earning Rule](#earning-rule) |
| balance</br>`integer` |  |
| order | See: [Order Calculated](#order-calculated) |
| event</br>`object` |  |

## Event Customer Gift Voucher Balance Added
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Simple Customer](#simple-customer) |
| campaign | See: [Simple Campaign](#simple-campaign) |
| voucher | See: [Simple Voucher](#simple-voucher) |
| balance</br>`integer` |  |
| transaction | See: [Voucher Transaction](#voucher-transaction) |

## Event Customer Loyalty Card Points Added
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Simple Customer](#simple-customer) |
| campaign | See: [Simple Campaign](#simple-campaign) |
| voucher | See: [Simple Voucher](#simple-voucher) |
| balance</br>`integer` |  |
| transaction | See: [Voucher Transaction](#voucher-transaction) |

## Event Customer Loyalty Card Points Transferred
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Simple Customer](#simple-customer) |
| campaign | See: [Simple Campaign](#simple-campaign) |
| voucher | See: [Simple Voucher](#simple-voucher) |
| source_voucher | See: [Simple Voucher](#simple-voucher) |
| destination_voucher | See: [Simple Voucher](#simple-voucher) |
| balance</br>`integer` |  |
| transaction | See: [Voucher Transaction](#voucher-transaction) |

## Event Customer Loyalty Card Points Expired
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Simple Customer](#simple-customer) |
| campaign | See: [Simple Campaign](#simple-campaign) |
| voucher | See: [Simple Voucher](#simple-voucher) |
| points</br>`integer` |  |
| buckets</br>`array` | Array of [Voucher Transaction](#voucher-transaction) |
| transaction | See: [Voucher Transaction](#voucher-transaction) |

## Event Customer Voucher Deleted
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Simple Customer](#simple-customer) |
| campaign | See: [Simple Campaign](#simple-campaign) |
| voucher | See: [Simple Voucher](#simple-voucher) |

## Event Customer Publication Succeeded
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Simple Customer](#simple-customer) |
| campaign | See: [Simple Campaign](#simple-campaign) |
| publication</br>`object` |  |

## Event Customer Publication Failed
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Simple Customer](#simple-customer) |
| campaign | See: [Simple Campaign](#simple-campaign) |
| publication</br>`object` |  |

## Event Customer Validation Succeeded
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Simple Customer](#simple-customer) |
| validation | See: [Validation Entity](#validation-entity) |

## Event Customer Validation Failed
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Simple Customer](#simple-customer) |
| validation | See: [Validation Entity](#validation-entity) |

## Event Customer Redemption Succeeded
<p>Event data object schema for <code>customer.redemption.succeeded</code>.</p>

[Event Customer Redemption](#event-customer-redemption)

## Event Customer Redemption Failed
<p>Event data object schema for <code>customer.redemption.failed</code>.</p>

[Event Customer Redemption](#event-customer-redemption)

## Event Customer Redemption Rollback Succeeded
<p>Event data object schema for <code>customer.redemption.rollback.succeeded</code>.</p>

All of:

1. [Event Customer Redemption](#event-customer-redemption)
2. <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">redemption_rollback</td><td style="text-align:left">See: <a href="#simple-redemption">Simple Redemption</a></td></tr></tbody></table>

## Event Customer Redemption Rollback Failed
<p>Event data object schema for <code>customer.redemption.rollback.failed</code>.</p>

All of:

1. [Event Customer Redemption](#event-customer-redemption)
2. <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">redemption_rollback</td><td style="text-align:left">See: <a href="#simple-redemption">Simple Redemption</a></td></tr></tbody></table>

## Event Customer Consents Given
<p>Event data object schema for <code>customer.consents.given</code>.</p>

[Event Customer Consents](#event-customer-consents)

## Event Customer Consents Revoked
<p>Event data object schema for <code>customer.consents.revoked</code>.</p>

[Event Customer Consents](#event-customer-consents)

## Event Customer Order Canceled
<p>Event data object schema for <code>customer.order.canceled</code>.</p>

[Event Customer Order](#event-customer-order)

## Event Customer Order Created
<p>Event data object schema for <code>customer.order.created</code>.</p>

[Event Customer Order](#event-customer-order)

## Event Customer Order Fulfilled
<p>Event data object schema for <code>customer.order.fulfilled</code>.</p>

[Event Customer Order](#event-customer-order)

## Event Customer Order Paid
<p>Event data object schema for <code>customer.order.paid</code>.</p>

[Event Customer Order](#event-customer-order)

## Event Customer Order Processing
<p>Event data object schema for <code>customer.order.processing</code>.</p>

[Event Customer Order](#event-customer-order)

## Event Customer Order Updated
<p>Event data object schema for <code>customer.order.updated</code>.</p>

[Event Customer Order](#event-customer-order)

## Event Customer Reward Redemptions Created
<p>Event data object schema for <code>customer.reward_redemptions.created</code>.</p>

[Event Customer Reward Redemptions](#event-customer-reward-redemptions)

## Event Customer Reward Redemptions Pending
<p>Event data object schema for <code>customer.reward_redemptions.pending</code>.</p>

[Event Customer Reward Redemptions](#event-customer-reward-redemptions)

## Event Customer Reward Redemptions Completed
<p>Event data object schema for <code>customer.reward_redemptions.completed</code>.</p>

[Event Customer Reward Redemptions](#event-customer-reward-redemptions)

## Event Customer Reward Redemptions Rolled Back
<p>Event data object schema for <code>customer.reward_redemptions.rolledback</code>.</p>

[Event Customer Reward Redemptions](#event-customer-reward-redemptions)

## Event Customer Loyalty Updated
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Simple Customer](#simple-customer) |
| campaign | See: [Simple Campaign](#simple-campaign) |
| loyalty</br>`object` |  |
| created_at</br>`string` | **Example:** <p>2022-02-25T13:32:08.734Z</p> |

## Event Customer Loyalty Tier Upgraded
<p>Event data object schema for <code>customer.loyalty.tier.upgraded</code>.</p>

All of:

1. [Event Customer Loyalty Tier Base](#event-customer-loyalty-tier-base)
2. <h3>Loyalty Tier Upgraded</h3><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">loyalty_tier_from</td><td style="text-align:left">See: <a href="#loyalty-tier">Loyalty Tier</a></td></tr><tr><td style="text-align:left">loyalty_tier_to</td><td style="text-align:left">See: <a href="#loyalty-tier">Loyalty Tier</a></td></tr><tr><td style="text-align:left">created_at</br><code>string</code></td><td style="text-align:left"><strong>Example:</strong> <p>2022-02-25T13:32:08.734Z</p></td></tr></tbody></table>

## Event Customer Loyalty Tier Downgraded
<p>Event data object schema for <code>customer.loyalty.tier.downgraded</code>.</p>

All of:

1. [Event Customer Loyalty Tier Base](#event-customer-loyalty-tier-base)
2. <h3>Loyalty Tier Downgraded</h3><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">loyalty_tier_from</td><td style="text-align:left">See: <a href="#loyalty-tier">Loyalty Tier</a></td></tr><tr><td style="text-align:left">loyalty_tier_to</td><td style="text-align:left">See: <a href="#loyalty-tier">Loyalty Tier</a></td></tr><tr><td style="text-align:left">created_at</br><code>string</code></td><td style="text-align:left"><strong>Example:</strong> <p>2022-02-25T13:32:08.734Z</p></td></tr></tbody></table>

## Event Customer Loyalty Tier Prolonged
<p>Event data object schema for <code>customer.loyalty.tier.prolonged</code>.</p>

All of:

1. [Event Customer Loyalty Tier Base](#event-customer-loyalty-tier-base)
2. <h3>Loyalty Tier Prolonged</h3><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">loyalty_tier</td><td style="text-align:left">See: <a href="#loyalty-tier">Loyalty Tier</a></td></tr><tr><td style="text-align:left">created_at</br><code>string</code></td><td style="text-align:left"><strong>Example:</strong> <p>2022-02-25T13:32:08.734Z</p></td></tr></tbody></table>

## Event Customer Loyalty Tier Expiration Changed
<p>Event data object schema for <code>customer.loyalty.tier.expiration.changed</code>.</p>

All of:

1. [Event Customer Loyalty Tier Base](#event-customer-loyalty-tier-base)
2. <h3>Loyalty Tier Expiration Changed</h3><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">loyalty_tier</td><td style="text-align:left">See: <a href="#loyalty-tier">Loyalty Tier</a></td></tr><tr><td style="text-align:left">created_at</br><code>string</code></td><td style="text-align:left"><strong>Example:</strong> <p>2022-02-25T13:32:08.734Z</p></td></tr><tr><td style="text-align:left">expiration_date</br><code>string</code></td><td style="text-align:left"><strong>Example:</strong> <p>2022-02-25T13:32:08.734Z</p></td></tr></tbody></table>

## Event Customer Loyalty Tier Joined
<p>Event data object schema for <code>customer.loyalty.tier.joined</code>.</p>

All of:

1. [Event Customer Loyalty Tier Base](#event-customer-loyalty-tier-base)
2. <h3>Loyalty Tier Joined</h3><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">loyalty_tier</td><td style="text-align:left">See: <a href="#loyalty-tier">Loyalty Tier</a></td></tr><tr><td style="text-align:left">created_at</br><code>string</code></td><td style="text-align:left"><strong>Example:</strong> <p>2022-02-25T13:32:08.734Z</p></td></tr></tbody></table>

## Event Customer Loyalty Tier Left
<p>Event data object schema for <code>customer.loyalty.tier.left</code>.</p>

All of:

1. [Event Customer Loyalty Tier Base](#event-customer-loyalty-tier-base)
2. <h3>Loyalty Tier Left</h3><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">loyalty_tier</td><td style="text-align:left">See: <a href="#loyalty-tier">Loyalty Tier</a></td></tr><tr><td style="text-align:left">created_at</br><code>string</code></td><td style="text-align:left"><strong>Example:</strong> <p>2022-02-25T13:32:08.734Z</p></td></tr></tbody></table>

## Customer With Summary Loyalty Referrals
All of:

1. <h3>Customer Response Data</h3><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>The ID of an existing customer that will be linked to redemption in this request.</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier of the customer who validates a voucher. It can be a customer ID or email from a CRM system, database, or a third-party service. If you also pass a customer ID (unique ID assigned by Voucherify), the source ID will be ignored.</p></td></tr><tr><td style="text-align:left">summary</td><td style="text-align:left"><a href="#customer-summary">Customer Summary</a></td></tr><tr><td style="text-align:left">loyalty</td><td style="text-align:left"><a href="#customer-loyalty">Customer Loyalty</a></td></tr><tr><td style="text-align:left">referrals</td><td style="text-align:left"><a href="#customer-referrals">Customer Referrals</a></td></tr><tr><td style="text-align:left">system_metadata</br><code>object</code></td><td style="text-align:left"><p>Object used to store system metadata information.</p></td></tr><tr><td style="text-align:left">created_at</br><code>string</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the customer was created in ISO 8601 format.</p> <strong>Example:</strong> <p>2022-08-30T06:32:07.380Z</p></td></tr><tr><td style="text-align:left">updated_at</br><code>string</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the customer was updated in ISO 8601 format.</p> <strong>Example:</strong> <p>2022-08-31T06:32:07.380Z</p></td></tr><tr><td style="text-align:left">assets</br><code>object</code></td><td style="text-align:left"><p>Contains information about the customer's cockpit.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">cockpit_url</br><code>string</code></td><td style="text-align:left"><p>Customer's cockpit URL address.</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>The type of object represented by JSON.</p> Available values: <code>customer</code></td></tr></tbody></table>
2. [Customer Base](#customer-base)

## Simple Customer
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>The ID of an existing customer that will be linked to redemption in this request.</p> |
| source_id</br>`string` | <p>A unique identifier of the customer who validates a voucher. It can be a customer ID or email from a CRM system, database, or a third-party service. If you also pass a customer ID (unique ID assigned by Voucherify), the source ID will be ignored.</p> |
| name</br>`string` | <p>Customer's first and last name.</p> |
| email</br>`string` | <p>Customer's email address.</p> |
| metadata</br>`object` | <p>A set of custom key/value pairs that you can attach to a customer. The metadata object stores all custom attributes assigned to the customer. It can be useful for storing additional information about the customer in a structured format. This metadata can be used for validating whether the customer qualifies for a discount or it can be used in building customer segments.</p> |
| object</br>`string` | <p>The type of object represented by JSON.</p> Available values: `customer` |

## Simple Campaign
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Campaign name.</p> |
| name</br>`string` | <p>Campaign name.</p> |
| campaign_type</br>`string` | <p>Type of campaign.</p> |
| type</br>`string` | <p>Defines whether the campaign can be updated with new vouchers after campaign creation.</p><ul><li><code>AUTO_UPDATE</code>: By choosing the auto update option you will create a campaign that can be enhanced by new vouchers after the time of creation (e.g. by publish vouchers method).</li><li><code>STATIC</code>: vouchers need to be manually published.</li></ul> Available values: `AUTO_UPDATE`, `STATIC` |
| is_referral_code</br>`boolean` | <p>Flag indicating whether this voucher is a referral code.</p> |
| voucher</br>`object` |  |
| lucky_draw</br>`object` |  |
| referral_program | See: [Referral Program](#referral-program) |
| auto_join</br>`boolean` | <p>Indicates whether customers will be able to auto-join a loyalty campaign if any earning rule is fulfilled.</p> |
| join_once</br>`boolean` | <p>If this value is set to <code>true</code>, customers will be able to join the campaign only once.</p> |
| active</br>`boolean` | <p>Indicates whether campaign is active</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the campaign was created in ISO 8601 format.</p> **Example:** <p>2021-12-22T10:13:06.487Z</p> |
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about the campaign.</p> Available values: `campaign` |

## Simple Voucher
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>A unique identifier that represents the voucher assigned by Voucherify.</p> |
| code</br>`string` | <p>Voucher code.</p> |
| gift | <p>Gift object response</p> [Gift](#gift) |
| discount | See: [Discount](#discount) |
| loyalty_card</br>`object` | <p>Defines the loyalty card details.</p> |
| type</br>`string` | <p>Type of the object.</p> Available values: `voucher` |
| campaign</br>`object` | <p>Campaign object</p> |
| campaign_id</br>`string` | <p>Campaign unique ID.</p> |
| is_referral_code</br>`boolean` | <p>Indicates whether the voucher is a referral code; this is <code>true</code> for campaign type <code>REFERRAL_PROGRAM</code>.</p> |
| holder_id</br>`string` | <p>Unique customer ID of campaign owner.</p> **Example:** <p>cust_eWgXlBBiY6THFRJwX45Iakv4</p> |
| referrer_id</br>`string` | <p>Unique referrer ID.</p> **Example:** <p>cust_nM4jqPiaXUvQdVSA6vTRUnix</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the order was created in ISO 8601 format.</p> **Example:** <p>2021-12-22T10:13:06.487Z</p> |
| object</br>`string` | <p>The type of object represented by JSON.</p> Available values: `voucher` |

## Custom Event
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique custom event ID.</p> |
| object</br>`string` | <p>The object represented is an <code>event</code>.</p> Available values: `event` |
| type</br>`string` | <p>The event name.</p> |
| customer | <p>A simple customer object</p> [Customer Object Required Object Type](#customer-object-required-object-type) |
| referral</br>`object` | <p>Referral object.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">referrer_id</br><code>string</code></td><td style="text-align:left"><p>Unique referrer ID.</p> <strong>Example:</strong> <p>cust_nM4jqPiaXUvQdVSA6vTRUnix</p></td></tr><tr><td style="text-align:left">code</br><code>string</code></td><td style="text-align:left"><p>Voucher code.</p></td></tr><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique voucher ID.</p></td></tr></tbody></table> |
| loyalty</br>`object` |  |
| metadata</br>`object` | <p>A set of custom key/value pairs that you can attach to a customer. The metadata object stores all custom attributes assigned to the custom event.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the custom event was created in ISO 8601 format.</p> **Example:** <p>2021-12-22T10:13:06.487Z</p> |

## Redemption Internal
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique redemption ID.</p> **Example:** <p>r_0bc92f81a6801f9bca</p> |
| object</br>`string` | <p>The type of object represented by the JSON. This object stores information about the <code>redemption</code>.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the redemption was created in ISO 8601 format.</p> **Example:** <p>2021-12-22T10:13:06.487Z</p> |
| tracking_id</br>`string` | <p>Hashed customer source ID.</p> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the redemption.</p> |
| channel_type</br>`string` | <p>The source of the channel for the redemption rollback. A <code>USER</code> corresponds to the Voucherify Dashboard and an <code>API</code> corresponds to the API.</p> Available values: `USER`, `API` |
| channel_id</br>`string` | <p>Unique channel ID of the user performing the redemption. This is either a user ID from a user using the Voucherify Dashboard or an X-APP-Id of a user using the API.</p> **Example:** <p>user_g24UoRO3Caxu7FCT4n5tpYEa3zUG0FrH</p> |
| failure_code</br>`string` | <p>If the result is <code>FAILURE</code>, this parameter will provide a generic reason as to why the redemption failed.</p> **Example:** <p>customer_rules_violated</p> |
| failure_message</br>`string` | <p>If the result is <code>FAILURE</code>, this parameter will provide a more expanded reason as to why the redemption failed.</p> |
| order | See: [Order Calculated](#order-calculated) |
| previous_order | See: [Order Calculated](#order-calculated) |
| reward | See: [Redemption Reward Result](#redemption-reward-result) |
| amount</br>`integer` | <p>A positive integer in the smallest currency unit (e.g. 100 cents for $1.00) representing the total amount of the order. This is the sum of the order items' amounts.</p> **Example:** <p>10000</p> |
| reason</br>`string` | <p>System generated cause for the redemption being invalid in the context of the provided parameters.</p> |
| result</br>`string` | <p>Redemption result.</p> Available values: `SUCCESS`, `FAILURE` |
| status</br>`string` | <p>Redemption status.</p> Available values: `SUCCEEDED`, `FAILED` |
| related_redemptions</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">rollbacks</br><code>array</code></td><td style="text-align:left">Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique rollback redemption ID.</p> <strong>Example:</strong> <p>rr_0bc92f81a6801f9bca</p></td></tr><tr><td style="text-align:left">date</br><code>string</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the object was created in ISO 8601 format.</p> <strong>Example:</strong> <p>2021-12-22T10:13:06.487Z</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">redemptions</br><code>array</code></td><td style="text-align:left">Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique redemption ID.</p> <strong>Example:</strong> <p>r_0bc92f81a6801f9bca</p></td></tr><tr><td style="text-align:left">date</br><code>string</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the object was created in ISO 8601 format.</p> <strong>Example:</strong> <p>2021-12-22T10:13:06.487Z</p></td></tr></tbody></table></td></tr></tbody></table> |
| parent_redemption_id</br>`string` | <p>Unique redemption ID of the parent redemption.</p> **Example:** <p>r_0c656311b5878a2031</p> |
| redemption</br>`string` | <p>Unique redemption ID of the parent redemption.</p> **Example:** <p>r_0c656311b5878a2031</p> |
| customer | See: [Simple Customer](#simple-customer) |
| customer_id</br>`string`, `null` | <p>Unique customer ID of the redeeming customer.</p> **Example:** <p>cust_i8t5Tt6eiKG5K79KQlJ0Vs64</p> |
| related_object_type</br>`string` | <p>Defines the related object.</p> Available values: `voucher`, `promotion_tier` |
| related_object_id</br>`string` | <p>Unique related object ID assigned by Voucherify, i.e. v_lfZi4rcEGe0sN9gmnj40bzwK2FH6QUno for a voucher.</p> |
| related_object_parent_id</br>`string` | <p>Unique related parent object ID assigned by Voucherify, i.e. v_lfZi4rcEGe0sN9gmnj40bzwK2FH6QUno for a voucher.</p> |
| campaign_name</br>`string` | <p>Campaign name</p> |
| voucher | <p>Defines the details of the voucher being redeemed.</p> [Voucher](#voucher) |
| promotion_tier | <p>Contains details of the promotion tier and the parent campaign.</p> [Promotion Tier](#promotion-tier) |

## Simple Segment
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique segment ID.</p> **Example:** <p>seg_DNAOhUtJffvX0f57ajLMFBYR</p> |
| name</br>`string` | <p>Segment name.</p> |
| object</br>`string` | <p>The type of object represented by the ID.</p> Available values: `segment` |

## Event Customer Sent
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Simple Customer](#simple-customer) |
| distribution</br>`object` |  |
| sent_at</br>`string` | <p>Timestamp representing the date and time when the distribution was sent in ISO 8601 format.</p> **Example:** <p>2021-12-22T10:13:06.487Z</p> |

## Event Customer Recovered
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Simple Customer](#simple-customer) |
| distribution</br>`object` |  |
| recovered_at</br>`string` | <p>Timestamp representing the date and time when the distribution was recovered in ISO 8601 format.</p> **Example:** <p>2021-12-22T10:13:06.487Z</p> |

## Event Customer Failed
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Simple Customer](#simple-customer) |
| distribution</br>`object` |  |
| failed_at</br>`string` | <p>Timestamp representing the date and time when the distribution failed in ISO 8601 format.</p> **Example:** <p>2021-12-22T10:13:06.487Z</p> |

## Simple Redemption Reward Result
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Simple Customer](#simple-customer) |
| assignment_id</br>`string` | <p>Unique reward assignment ID assigned by Voucherify.</p> |
| voucher | <p>Defines of the voucher.</p> [Simple Voucher](#simple-voucher) |
| product | <p>Defines of the product.</p> [Simple Product](#simple-product) |
| sku | <p>Defines of the sku.</p> [Simple Sku](#simple-sku) |
| loyalty_tier_id</br>`string` | <p>Unique loyalty tier ID assigned by Voucherify.</p> |
| id</br>`string` | <p>Unique reward ID, assigned by Voucherify.</p> **Example:** <p>rew_nIy4gHpQHle2c3pNMwuj7G6j</p> |
| object</br>`string` | <p>The type of object represented by the JSON. This object stores information about the reward.</p> Available values: `reward` |
| name</br>`string` | <p>Reward name.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the reward was created in ISO 8601 format.</p> **Example:** <p>2022-08-11T14:49:22.586Z</p> |
| updated_at</br>`string`, `null` | <p>Timestamp representing the date and time when the reward was updated in ISO 8601 format.</p> **Example:** <p>2022-08-11T16:01:34.885Z</p> |
| parameters</br>`object` | <p>Defines how the reward is generated.</p> |
| type</br>`string` | <p>Reward type.</p> Available values: `CAMPAIGN`, `COIN`, `MATERIAL` |

## Simple Referral Tier
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique referral tier ID.</p> **Example:** <p>seg_DNAOhUtJffvX0f57ajLMFBYR</p> |
| campaign_id</br>`string` | <p>Campaign Id.</p> |
| banner</br>`string` | <p>Text to be displayed to your customers on your website.</p> |
| parameters</br>`object` | <p>Referral tier parameters</p> |

## Loyalty Tier
All of:

1. [Loyalty Tier Base](#loyalty-tier-base)
2. <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique loyalty tier ID.</p></td></tr><tr><td style="text-align:left">campaign_id</br><code>string</code></td><td style="text-align:left"><p>Unique parent campaign ID.</p></td></tr><tr><td style="text-align:left">metadata</br><code>object</code>, <code>null</code></td><td style="text-align:left"><p>The metadata object stores all custom attributes assigned to the loyalty tier. A set of key/value pairs that you can attach to a loyalty tier object. It can be useful for storing additional information about the loyalty tier in a structured format.</p></td></tr><tr><td style="text-align:left">created_at</br><code>string</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the loyalty tier was created in ISO 8601 format.</p></td></tr><tr><td style="text-align:left">updated_at</br><code>string</code>, <code>null</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the loyalty tier was updated in ISO 8601 format.</p></td></tr><tr><td style="text-align:left">config</br><code>object</code></td><td style="text-align:left"><p>Defines loyalty tier range in points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">points</br><code>object</code></td><td style="text-align:left"><p>Defines range of loyalty tier in points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">from</br><code>integer</code></td><td style="text-align:left"><p>Bottom points threshold value.</p></td></tr><tr><td style="text-align:left">to</br><code>integer</code></td><td style="text-align:left"><p>Top points threshold value.</p></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="text-align:left">expiration</td><td style="text-align:left">See: <a href="#loyalty-tier-expiration">Loyalty Tier Expiration</a></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>The type of object represented by JSON. This object stores information about the loyalty.</p> Available values: <code>loyalty_tier</code></td></tr></tbody></table>

## Earning Rule
All of:

1. [EarningRuleBase](#earningrulebase)
2. <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">validation_rule_id</br><code>string</code>, <code>null</code></td><td style="text-align:left"><p>A unique validation rule identifier assigned by the Voucherify API. The validation rule is verified before points are added to the balance.</p></td></tr><tr><td style="text-align:left">updated_at</br><code>string</code>, <code>null</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the earning rule was last updated in ISO 8601 format.</p></td></tr><tr><td style="text-align:left">active</br><code>boolean</code></td><td style="text-align:left"><p>A flag to toggle the earning rule on or off. You can disable an earning rule even though it's within the active period defined by the start_date and expiration_date of the campaign or the earning rule's own start_date and expiration_date.</p><ul><li><code>true</code> indicates an active earning rule</li><li><code>false</code> indicates an inactive earning rule</li></ul></td></tr></tbody></table>

## Order Calculated
All of:

1. [Order Response Base](#order-response-base)
2. <h3>Order Calculated</h3><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">customer</td><td style="text-align:left">One of: <a href="#customer-with-summary-loyalty-referrals">Customer With Summary Loyalty Referrals</a>, <a href="#customer-id">Customer Id</a></td></tr><tr><td style="text-align:left">referrer</td><td style="text-align:left">One of: <a href="#referrer-with-summary-loyalty-referrals">Referrer With Summary Loyalty Referrals</a>, <a href="#referrer-id">Referrer Id</a></td></tr></tbody></table>

## Voucher Transaction
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique transaction ID.</p> |
| source_id</br>`string`, `null` | <p>The merchant’s transaction ID if it is different from the Voucherify transaction ID. It is really useful in case of an integration between multiple systems. It can be a transaction ID from a CRM system, database or 3rd-party service. In case of a redemption, this value is null.</p> |
| voucher_id</br>`string` | <p>Unique voucher ID.</p> |
| campaign_id</br>`string` | <p>Unqiue campaign ID of the voucher's parent campaign if it is part of campaign that generates bulk codes.</p> |
| source</br>`string`, `null` | <p>The channel through which the transaction took place, whether through the API or the the Dashboard. In case of a redemption, this value is null.</p> |
| reason</br>`string`, `null` | <p>Reason why the transaction occurred. In case of a redemption, this value is null.</p> |
| type | <p>Type of transaction.</p> [LoyaltyCardTransactionsType](#loyaltycardtransactionstype) |
| details</br>`object` | <p>Contains the detailed information about the transaction.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">balance</br><code>object</code></td><td style="text-align:left"><p>Contains information on how the balance was affected by the transaction.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">type</br><code>string</code></td><td style="text-align:left"><p>The type of voucher whose balance is being adjusted due to the transaction.</p> Available values: <code>loyalty_card</code></td></tr><tr><td style="text-align:left">total</br><code>integer</code></td><td style="text-align:left"><p>The available points prior to the transaction.</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>The type of object represented by the JSON.</p> Available values: <code>balance</code></td></tr><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>The amount of points being used up in the transaction.</p></td></tr><tr><td style="text-align:left">balance</br><code>integer</code></td><td style="text-align:left"><p>The points balance on the loyalty card after the points in the transaction are subtracted from the loyalty card.</p></td></tr><tr><td style="text-align:left">related_object</br><code>object</code></td><td style="text-align:left"><p>Defines the resource that is being modified with the values that are returned in the balance object.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Identifies the voucher that is being modified, this is the ID that was assigned by the Voucherify API.</p></td></tr><tr><td style="text-align:left">type</br><code>string</code></td><td style="text-align:left"><p>The object being modified, i.e. voucher.</p> Available values: <code>voucher</code></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="text-align:left">order</br><code>object</code></td><td style="text-align:left"><p>Contains information about the original order.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique order ID.</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>The merchant’s order ID if it is different from the Voucherify order ID. It is really useful in case of integration between multiple systems. It can be an order ID from CRM, database or 3rd party service.</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">event</br><code>object</code></td><td style="text-align:left"><p>Contains information about the event that triggers the point accrual.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique event ID.</p></td></tr><tr><td style="text-align:left">type</br><code>string</code></td><td style="text-align:left"><p>Type of event.</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">earning_rule</br><code>object</code></td><td style="text-align:left"><p>Contains information about the earning rule.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique earning rule ID.</p></td></tr><tr><td style="text-align:left">source</br><code>object</code></td><td style="text-align:left"><p>Contains the custom earning rule name.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">banner</br><code>string</code></td><td style="text-align:left"><p>Name of the earning rule. This is displayed as a header for the earning rule in the Dashboard.</p></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="text-align:left">segment</br><code>object</code></td><td style="text-align:left"><p>Contains information about the segment.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"></td></tr><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"></td></tr></tbody></table></td></tr><tr><td style="text-align:left">loyalty_tier</br><code>object</code></td><td style="text-align:left"><p>Contains information about the loyalty tier.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"></td></tr><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"></td></tr></tbody></table></td></tr><tr><td style="text-align:left">redemption</br><code>object</code></td><td style="text-align:left"><p>Contains information about the original redemption.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique redemption ID.</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">rollback</br><code>object</code></td><td style="text-align:left"><p>Contains information about the redemption rollback.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique redemption rollback ID.</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">custom_event</br><code>object</code></td><td style="text-align:left"><p>Contains information about the custom event that triggers the point accrual.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique event ID.</p></td></tr><tr><td style="text-align:left">type</br><code>string</code></td><td style="text-align:left"><p>Type of custom event.</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">event_schema</br><code>object</code></td><td style="text-align:left"><p>Contains information about the custom event metadata schema.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique metadata schema ID.</p></td></tr><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"><p>Type of custom event.</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">reward</br><code>object</code></td><td style="text-align:left"><p>Contains information about the pay with points reward.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique reward ID.</p></td></tr><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"><p>Reward name.</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">source_voucher</td><td style="text-align:left"><p>Contains information on how the balance on the donor loyalty card was affected by the transaction.</p> <a href="#simple-voucher">Simple Voucher</a></td></tr><tr><td style="text-align:left">destination_voucher</td><td style="text-align:left"><p>Contains information on how the balance on the receiving loyalty card was affected by the transaction.</p> <a href="#simple-voucher">Simple Voucher</a></td></tr></tbody></table> |
| related_transaction_id</br>`string`, `null` | <p>The related transaction ID on the receiving card.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the transaction was created in ISO 8601 format.</p> |

## Validation Entity
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique validation id.</p> |
| session_id</br>`string` | <p>Unique session id.</p> |
| status</br>`string` | <p>The validation status</p> Available values: `VALID`, `INVALID` |
| created_at</br>`string` | <p>Timestamp representing the date and time when the validation was created in ISO 8601 format.</p> **Example:** <p>2021-12-22T10:13:06.487Z</p> |
| customer_id</br>`string` | <p>Unique customer ID of the customer making the purchase.</p> **Example:** <p>cust_7iUa6ICKyU6gH40dBU25kQU1</p> |
| redeemables</br>`array` | <p>Lists validation results of each redeemable.</p> Array of [Applicable Redeemable](#applicable-redeemable) |
| skipped_redeemables</br>`array` | <p>Lists validation results of each redeemable.</p> Array of [Inapplicable Redeemable](#inapplicable-redeemable) |
| inapplicable_redeemables</br>`array` | <p>Lists validation results of each redeemable.</p> Array of [Skipped Redeemable](#skipped-redeemable) |

## Event Customer Redemption
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Simple Customer](#simple-customer) |
| order | See: [Simple Order](#simple-order) |
| campaign | See: [Simple Campaign](#simple-campaign) |
| voucher | See: [Simple Voucher](#simple-voucher) |
| holder | See: [Simple Customer](#simple-customer) |
| promotion_tier | See: [Simple Promotion Tier](#simple-promotion-tier) |
| redemption | See: [Simple Redemption](#simple-redemption) |

## Simple Redemption
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique redemption ID.</p> **Example:** <p>r_0bc92f81a6801f9bca</p> |
| customer_id</br>`string`, `null` | <p>Unique customer ID of the redeeming customer.</p> **Example:** <p>cust_i8t5Tt6eiKG5K79KQlJ0Vs64</p> |
| tracking_id</br>`string` | <p>Hashed customer source ID.</p> |
| date</br>`string` | <p>Timestamp representing the date and time when the redemption was created in ISO 8601 format.</p> **Example:** <p>2021-12-22T10:13:06.487Z</p> |
| amount</br>`integer` | <p>A positive integer in the smallest currency unit (e.g. 100 cents for $1.00) representing the total amount of the order. This is the sum of the order items' amounts.</p> **Example:** <p>10000</p> |
| order | See: [Simple Order](#simple-order) |
| reward | See: [Simple Redemption Reward Result](#simple-redemption-reward-result) |
| customer | See: [Simple Customer](#simple-customer) |
| result</br>`string` | <p>Redemption result.</p> Available values: `SUCCESS`, `FAILURE` |
| voucher | <p>Defines the details of the voucher being redeemed.</p> [Simple Voucher](#simple-voucher) |
| promotion_tier | See: [Simple Promotion Tier](#simple-promotion-tier) |
| redemption</br>`string` | <p>Unique redemption ID of the parent redemption.</p> **Example:** <p>r_0c656311b5878a2031</p> |
| object</br>`string` | <p>The type of object represented by the JSON. This object stores information about the <code>redemption</code>.</p> |

## Event Customer Consents
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Simple Customer](#simple-customer) |
| consents</br>`array` | Array of [Simple Consent](#simple-consent) |

## Event Customer Order
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Simple Customer](#simple-customer) |
| referrer | See: [Simple Customer](#simple-customer) |
| order | See: [Order Calculated](#order-calculated) |
| redemption | See: [Redemption Internal](#redemption-internal) |

## Event Customer Reward Redemptions
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Simple Customer](#simple-customer) |
| holder | See: [Simple Customer](#simple-customer) |
| voucher | See: [Simple Voucher](#simple-voucher) |
| campaign | See: [Simple Campaign](#simple-campaign) |
| reward_redemption</br>`object` |  |
| reward | See: [Simple Redemption Reward Result](#simple-redemption-reward-result) |
| reward_assignment | See: [Reward Assignment](#reward-assignment) |
| source</br>`string` |  |
| balance</br>`integer` |  |

## Event Customer Loyalty Tier Base
| Attributes |  Description |
|:-----|:--------|
| customer | See: [Simple Customer](#simple-customer) |
| campaign | See: [Simple Campaign](#simple-campaign) |

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
| address</br>`object`, `null` | <p>Customer's address.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">city</br><code>string</code></td><td style="text-align:left"><p>City</p></td></tr><tr><td style="text-align:left">state</br><code>string</code></td><td style="text-align:left"><p>State</p></td></tr><tr><td style="text-align:left">line_1</br><code>string</code></td><td style="text-align:left"><p>First line of address.</p></td></tr><tr><td style="text-align:left">line_2</br><code>string</code></td><td style="text-align:left"><p>Second line of address.</p></td></tr><tr><td style="text-align:left">country</br><code>string</code></td><td style="text-align:left"><p>Country.</p></td></tr><tr><td style="text-align:left">postal_code</br><code>string</code></td><td style="text-align:left"><p>Postal code.</p></td></tr></tbody></table> |
| metadata</br>`object` | <p>A set of custom key/value pairs that you can attach to a customer. The metadata object stores all custom attributes assigned to the customer. It can be useful for storing additional information about the customer in a structured format. This metadata can be used for validating whether the customer qualifies for a discount or it can be used in building customer segments.</p> |

## Referral Program
| Attributes |  Description |
|:-----|:--------|
| conversion_event_type</br>`string` | <p>Define how a referral is triggered.</p> Available values: `redemption`, `custom_event` |
| custom_event</br>`object` | <p>Contains details about the custom event.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique custom event ID.</p> <strong>Example:</strong> <p>ms_Ll9enAm2BCN0M1s4VxWobLFM</p></td></tr><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"><p>Custom event name.</p></td></tr></tbody></table> |
| referee_reward</br>`object` | <p>Defines the referee reward.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">related_object_parent</br><code>object</code></td><td style="text-align:left"><p>Details of the resource from which the reward originates.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique ID of the reward source.</p> <strong>Example:</strong> <p>camp_kdxp3vf1clQ9CFs1jpqv3tZe</p></td></tr><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"><p>Name of the reward source.</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>Type of resource represented by the source of the reward.</p> Available values: <code>CAMPAIGN</code></td></tr></tbody></table></td></tr><tr><td style="text-align:left">type</br><code>string</code></td><td style="text-align:left"><p>Type of reward.</p> Available values: <code>DISCOUNT_VOUCHER</code>, <code>LOYALTY_CARD</code>, <code>GIFT_VOUCHER</code>, <code>LUCKY_DRAW_CODE</code></td></tr><tr><td style="text-align:left">amount</br><code>string</code></td><td style="text-align:left"><p>Define the number of <code>points</code> to add to a loyalty card or <code>credits</code> to the balance on a gift card. In case of the gift card, the value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 amount is written as 10000.</p></td></tr></tbody></table> |

## Gift
| Attributes |  Description |
|:-----|:--------|
| amount</br>`number` | <p>Total gift card income over the lifetime of the card. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 amount is written as 10000.</p> |
| balance</br>`number` | <p>Available funds. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 amount is written as 10000.</p> |
| effect</br>`string` | <p>Defines how the credits are applied to the customer's order.</p> Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS` |

## Discount
<p>Contains information about discount.</p>

One of:

[Amount](#amount), [Unit](#unit), [Unit Multiple](#unit-multiple), [Percent](#percent), [Fixed](#fixed)

## Customer Object Required Object Type
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>The unique ID of a customer that is assigned by Voucherify.</p> **Example:** <p>cust_CSnYd37MXmrbS19XCrghjBsv</p> |
| source_id</br>`string` | <p>The merchant’s customer ID if it is different from the Voucherify customer ID. It is really useful in case of an integration between multiple systems. It can be a customer ID from a CRM system, database or 3rd-party service.</p> |
| name</br>`string` | <p>Customer's first and last name.</p> |
| email</br>`string` | <p>Customer's email address.</p> |
| metadata</br>`object` | <p>A set of custom key/value pairs that you can attach to a customer. The metadata object stores all custom attributes assigned to the customer. It can be useful for storing additional information about the customer in a structured format. This metadata can be used for validating whether the customer qualifies for a discount or it can be used in building customer segments.</p> |
| object</br>`string` | <p>The type of object represented by the JSON. This object stores information about the customer.</p> |

## Redemption Reward Result
| Attributes |  Description |
|:-----|:--------|
| reward | [Reward](#reward) |
| customer | [Simple Customer](#simple-customer) |
| assignment_id</br>`string`, `null` | <p>Unique reward assignment ID assigned by Voucherify.</p> |
| voucher | <p>Defines of the voucher.</p> [Voucher](#voucher) |
| product | <p>Defines of the product.</p> [Product](#product) |
| sku | <p>Defines of the sku.</p> [SKU Object](#sku-object) |
| loyalty_tier_id</br>`string`, `null` | <p>Unique loyalty tier ID assigned by Voucherify.</p> |

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
| is_referral_code</br>`boolean`, `null` | <p>Flag indicating whether this voucher is a referral code.</p> |
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
| validation_rule_assignments | See: [Validation Rule Assignments List](#validation-rule-assignments-list) |
| category_id</br>`string` | <p>Promotion tier category ID.</p> **Example:** <p>cat_0c9da30e7116ba6bba</p> |
| categories</br>`array` | Array of [Category](#category) |

## Simple Product
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique product ID.</p> |
| source_id</br>`string` | <p>Product source id.</p> |
| name</br>`string` | <p>Product name.</p> |

## Simple Sku
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique sku ID.</p> |
| source_id</br>`string` | <p>Sku source id.</p> |
| sku</br>`string` | <p>Sku name.</p> |

## Loyalty Tier Base
| Attributes |  Description |
|:-----|:--------|
| name</br>`string` | <p>Loyalty Tier name.</p> |
| earning_rules</br>`object` | <p>Contains a list of earning rule IDs and their points mapping for the given earning rule.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">[propertyName]</td><td style="text-align:left">See: <a href="#mappingpoints">MappingPoints</a></td></tr></tbody></table> |
| rewards</br>`object` | <p>Contains a list of reward IDs and their points mapping for the given reward.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">[propertyName]</td><td style="text-align:left">See: <a href="#mappingpoints">MappingPoints</a></td></tr></tbody></table> |
| points</br>`object` | <p>Defines range of loyalty tier in points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">from</br><code>integer</code></td><td style="text-align:left"><p>Bottom points threshold value.</p></td></tr><tr><td style="text-align:left">to</br><code>integer</code></td><td style="text-align:left"><p>Top points threshold value.</p></td></tr></tbody></table> |

## Loyalty Tier Expiration
| Attributes |  Description |
|:-----|:--------|
| customer_id</br>`string` | <p>Unique customer ID of the customer making the purchase.</p> **Example:** <p>cust_7iUa6ICKyU6gH40dBU25kQU1</p> |
| campaign_id</br>`string` | <p>Unique campaign ID, assigned by Voucherify.</p> **Example:** <p>camp_rRsfatlwN7unSeUIJDCYedal</p> |
| tier_id</br>`string` | <p>Unique tier ID, assigned by Voucherify.</p> |
| start_date</br>`string` | <p>Activation timestamp defines when the loyalty tier starts to be active in ISO 8601 format. Loyalty tier is inactive before this date.</p> |
| expiration_date</br>`string` | <p>Expiration timestamp defines when the loyalty tier expires in ISO 8601 format. Loyalty tier is inactive after this date.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the loyalty tier was created in ISO 8601 format.</p> **Example:** <p>2021-12-22T10:13:06.487Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the loyalty tier was updated in ISO 8601 format.</p> **Example:** <p>2021-12-22T10:13:06.487Z</p> |

## EarningRuleBase
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Assigned by the Voucherify API, identifies the earning rule object.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the earning rule was created in ISO 8601 format.</p> |
| loyalty | One of: [Define fixed amount of points](#define-fixed-amount-of-points), [Calculate points proportionally](#calculate-points-proportionally) |
| event | <p>Defines the event which triggers the earning rule to add points to a loyalty card.</p> [Earning Rule Event](#earning-rule-event) |
| custom_event</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">schema_id</br><code>string</code></td><td style="text-align:left"></td></tr></tbody></table> |
| segment</br>`object` | <p>Contains the id of a customer segment. Required for the customer.segment.entered option in event.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Contains a unique identifier of a customer segment. Assigned by the Voucherify API.</p></td></tr></tbody></table> |
| source</br>`object` | <p>Contains the custom earning rule name and parent campaign.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">banner</br><code>string</code></td><td style="text-align:left"><p>Name of the earning rule. This is displayed as a header for the earning rule in the Dashboard.</p></td></tr><tr><td style="text-align:left">object_id</br><code>string</code></td><td style="text-align:left"><p>A unique campaign identifier assigned by the Voucherify API.</p></td></tr><tr><td style="text-align:left">object_type</br><code>string</code></td><td style="text-align:left"><p>Defines the object associated with the earning rule. Defaults to <code>campaign</code>.</p> Available values: <code>campaign</code></td></tr></tbody></table> |
| object</br>`string` | <p>The type of object represented by JSON. Default is earning_rule.</p> Available values: `earning_rule` |
| automation_id</br>`string` | <p>For internal use by Voucherify.</p> |
| start_date</br>`string` | <p>Start date defines when the earning rule starts to be active. Activation timestamp in ISO 8601 format. Earning rule is inactive before this date. If you don't define the start date for an earning rule, it'll inherit the campaign start date by default.</p> |
| expiration_date</br>`string` | <p>Expiration date defines when the earning rule expires. Expiration timestamp in ISO 8601 format. Earning rule is inactive after this date.If you don't define the expiration date for an earning rule, it'll inherit the campaign expiration date by default.</p> |
| validity_timeframe</br>`object` | <p>Set recurrent time periods when the earning rule is valid. For example, valid for 1 hour every other day.start_date required when including the <code>validity_timeframe</code>.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">duration</br><code>string</code></td><td style="text-align:left"><p>Defines the amount of time an earning rule will be active in ISO 8601 format. For example, an earning rule with a duration of PT1H will be valid for a duration of one hour.</p></td></tr><tr><td style="text-align:left">interval</br><code>string</code></td><td style="text-align:left"><p>Defines the intervening time between two time points in ISO 8601 format, expressed as a duration. For example, an earning rule with an interval of P2D will be valid every other day.</p></td></tr></tbody></table> |
| validity_day_of_week</br>`array` | <p>Integer array corresponding to the particular days of the week in which the earning rule is valid.</p><ul><li><code>0</code> Sunday</li><li><code>1</code> Monday</li><li><code>2</code> Tuesday</li><li><code>3</code> Wednesday</li><li><code>4</code> Thursday</li><li><code>5</code> Friday</li><li><code>6</code> Saturday</li></ul> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the earning rule. A set of key/value pairs that you can attach to an earning rule object. It can be useful for storing additional information about the earning rule in a structured format.</p> |

## Order Response Base
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique ID assigned by Voucherify of an existing order that will be linked to the redemption of this request.</p> |
| source_id</br>`string`, `null` | <p>Unique source ID of an existing order that will be linked to the redemption of this request.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the order was created in ISO 8601 format.</p> **Example:** <p>2021-12-22T10:13:06.487Z</p> |
| updated_at</br>`string`, `null` | <p>Timestamp representing the date and time when the order was last updated in ISO 8601 format.</p> **Example:** <p>2021-12-22T10:14:45.316Z</p> |
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
| items</br>`array` | <p>Array of items applied to the order.</p> Array of [Order Item Calculated](#order-item-calculated) |
| metadata</br>`object` | <p>A set of custom key/value pairs that you can attach to an order. It can be useful for storing additional information about the order in a structured format.</p> |
| customer_id</br>`string`, `null` | <p>Unique customer ID of the customer making the purchase.</p> **Example:** <p>cust_7iUa6ICKyU6gH40dBU25kQU1</p> |
| referrer_id</br>`string`, `null` | <p>Unique referrer ID.</p> **Example:** <p>cust_nM4jqPiaXUvQdVSA6vTRUnix</p> |
| object</br>`string` | <p>The type of object represented by JSON.</p> Available values: `order` |
| redemptions</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">[propertyName]</td><td style="text-align:left">See: <a href="#order-redemptions">Order Redemptions</a></td></tr></tbody></table> |

## Customer Id
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>A unique identifier of an existing customer.</p> |
| object</br>`string` | <p>The type of object represented by JSON.</p> Available values: `customer` |

## Referrer With Summary Loyalty Referrals
[Customer With Summary Loyalty Referrals](#customer-with-summary-loyalty-referrals)

## Referrer Id
[Customer Id](#customer-id)

## LoyaltyCardTransactionsType
Available values: `POINTS_ACCRUAL`, `POINTS_CANCELLATION`, `POINTS_REDEMPTION`, `POINTS_REFUND`, `POINTS_ADDITION`, `POINTS_REMOVAL`, `POINTS_EXPIRATION`, `POINTS_TRANSFER_IN`, `POINTS_TRANSFER_OUT`

## Applicable Redeemable
| Attributes |  Description |
|:-----|:--------|
| status</br>`string` | <p>Indicates whether the redeemable can be applied or not applied based on the validation rules.</p> Available values: `APPLICABLE` |
| id</br>`string` | <p>Redeemable ID, i.e. the voucher code.</p> |
| object</br>`string` | <p>Redeemable's object type.</p> Available values: `voucher`, `promotion_tier` |
| order | See: [Order Calculated](#order-calculated) |
| applicable_to | See: [Applicable To](#applicable-to) |
| inapplicable_to | See: [Inapplicable To](#inapplicable-to) |
| result | <p>Specifies the redeemable's end effect on the order. This object is unique to each type of redeemable.</p> One of: [Coupon Code](#coupon-code), [Gift Card](#gift-card), [Loyalty Card](#loyalty-card), [Redeemable Result Promotion Tier](#redeemable-result-promotion-tier), [Promotion Stack](#promotion-stack) |
| metadata</br>`object` | <p>The metadata object stores all custom attributes in the form of key/value pairs assigned to the redeemable.</p> |
| categories</br>`array` | Array of [Category](#category) |

## Inapplicable Redeemable
| Attributes |  Description |
|:-----|:--------|
| status</br>`string` | <p>Indicates whether the redeemable can be applied or not applied based on the validation rules.</p> Available values: `INAPPLICABLE` |
| id</br>`string` | <p>Redeemable ID, i.e. the voucher code.</p> |
| object</br>`string` | <p>Redeemable's object type.</p> Available values: `voucher`, `promotion_tier` |
| result</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">error</td><td style="text-align:left">See: <a href="#error-object">Error Object</a></td></tr></tbody></table> |

## Skipped Redeemable
| Attributes |  Description |
|:-----|:--------|
| status</br>`string` | <p>Indicates whether the redeemable can be applied or not applied based on the validation rules.</p> Available values: `SKIPPED` |
| id</br>`string` | <p>Redeemable ID, i.e. the voucher code.</p> |
| object</br>`string` | <p>Redeemable's object type.</p> Available values: `voucher`, `promotion_tier` |
| result</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead></table> |

## Simple Order
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique ID assigned by Voucherify of an existing order that will be linked to the redemption of this request.</p> |
| source_id</br>`string` | <p>Unique source ID of an existing order that will be linked to the redemption of this request.</p> |
| status</br>`string` | <p>The order status.</p> Available values: `CREATED`, `PAID`, `CANCELED`, `FULFILLED` |
| customer_id</br>`string`, `null` | <p>Unique customer ID of the customer making the purchase.</p> **Example:** <p>cust_7iUa6ICKyU6gH40dBU25kQU1</p> |
| referrer_id</br>`string`, `null` | <p>Unique referrer ID.</p> **Example:** <p>cust_nM4jqPiaXUvQdVSA6vTRUnix</p> |
| amount</br>`integer` | <p>A positive integer in the smallest currency unit (e.g. 100 cents for $1.00) representing the total amount of the order. This is the sum of the order items' amounts.</p> |
| discount_amount</br>`integer` | <p>Sum of all order-level discounts applied to the order.</p> |
| applied_discount_amount</br>`integer` | <p>This field shows the order-level discount applied.</p> |
| items_discount_amount</br>`integer` | <p>Sum of all product-specific discounts applied to the order.</p> |
| items_applied_discount_amount</br>`integer` | <p>Sum of all product-specific discounts applied in a particular request.<br><code>sum(items, i =&gt; i.applied_discount_amount)</code></p> |
| total_discount_amount</br>`integer` | <p>Sum of all order-level AND all product-specific discounts applied to the order.</p> |
| total_applied_discount_amount</br>`integer` | <p>Sum of all order-level AND all product-specific discounts applied in a particular request.<br><code>total_applied_discount_amount</code> = <code>applied_discount_amount</code> + <code>items_applied_discount_amount</code></p> |
| total_amount</br>`integer` | <p>Order amount after undoing all the discounts through the rollback redemption.</p> |
| items</br>`array` | <p>Array of items applied to the order.</p> Array of [Simple Order Item](#simple-order-item) |
| metadata</br>`object` | <p>A set of custom key/value pairs that you can attach to an order. It can be useful for storing additional information about the order in a structured format.</p> |
| object</br>`string` | <p>The type of object represented by JSON.</p> Available values: `order` |

## Simple Promotion Tier
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique promotion tier ID.</p> **Example:** <p>promo_63fYCt81Aw0h7lzyRkrGZh9p</p> |
| name</br>`string` | <p>Name of the promotion tier.</p> |
| banner</br>`string` | <p>Text to be displayed to your customers on your website.</p> |
| campaign</br>`object` | <p>Contains details about promotion tier's parent campaign.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique campaign ID.</p></td></tr></tbody></table> |

## Simple Consent
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` |  |
| name</br>`string` |  |
| object</br>`string` | Available values: `consent` |

## Reward Assignment
All of:

1. [Reward Assignment Base](#reward-assignment-base)
2. [Digital or Material Reward - Parameters](#digital-or-material-reward---parameters)

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

## Reward
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique reward ID, assigned by Voucherify.</p> **Example:** <p>rew_nIy4gHpQHle2c3pNMwuj7G6j</p> |
| name</br>`string` | <p>Reward name.</p> |
| stock</br>`integer`, `null` | <p>Configurable for <strong>material rewards</strong>. The number of units of the product that you want to share as reward.</p> |
| redeemed</br>`integer`, `null` | <p>Defines the number of already invoked (successful) reward redemptions.</p> |
| attributes</br>`object` | <p>These properties are configurable for <strong>material rewards</strong>.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">image_url</br><code>string</code></td><td style="text-align:left"><p>The HTTPS URL pointing to the .png or .jpg file.</p></td></tr><tr><td style="text-align:left">description</br><code>string</code></td><td style="text-align:left"><p>An arbitrary string that you can attach to a material reward.</p></td></tr></tbody></table> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the reward. A set of key/value pairs that you can attach to a reward object. It can be useful for storing additional information about the reward in a structured format.</p> |
| type</br>`string` | <p>Reward type.</p> Available values: `CAMPAIGN`, `COIN`, `MATERIAL` |
| parameters | <p>Defines how the reward is generated.</p> [Reward type](#reward-type) |
| created_at</br>`string` | <p>Timestamp representing the date and time when the reward was created in ISO 8601 format.</p> **Example:** <p>2022-08-11T14:49:22.586Z</p> |
| updated_at</br>`string`, `null` | <p>Timestamp representing the date and time when the reward was updated in ISO 8601 format.</p> **Example:** <p>2022-08-11T16:01:34.885Z</p> |
| object | <p>The type of object represented by the JSON. This object stores information about the reward.</p> Available values: `reward` |

## Product
<p>This is an object representing a product.</p><p>This entity should be used to map product items from your inventory management system. The aim of products is to build which reflect product-specific campaigns.</p>

All of:

1. [Product without Skus Object](#product-without-skus-object)
2. <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">skus</td><td style="text-align:left">See: <a href="#skus-list-for-product">Skus List For Product</a></td></tr></tbody></table>

## SKU Object
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>A unique identifier that represents the SKU and is assigned by Voucherify.</p> **Example:** <p>sku_0b1621b319d248b79f</p> |
| source_id</br>`string`, `null` | <p>A unique SKU identifier from your inventory system.</p> **Example:** <p>sku_source_id_4</p> |
| product_id</br>`string` | <p>The parent product's unique ID.</p> **Example:** <p>prod_0b15f6b9f650c16990</p> |
| sku</br>`string`, `null` | <p>Unique user-defined SKU name.</p> **Example:** <p>Large Pink Shirt</p> |
| price</br>`integer`, `null` | <p>SKU unit price. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 is written as 10000.</p> |
| currency</br>`string`, `null` | <p>SKU price currency.</p> **Example:** <p>USD</p> |
| attributes</br>`object` | <p>The attributes object stores values for all custom attributes inherited by the SKU from the parent product. A set of key/value pairs that are attached to a SKU object and are unique to each SKU within a product family.</p> |
| image_url</br>`string`, `null` | <p>The HTTPS URL pointing to the .png or .jpg file that will be used to render the SKU image.</p> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the SKU. A set of key/value pairs that you can attach to a SKU object. It can be useful for storing additional information about the SKU in a structured format.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the SKU was created in ISO 8601 format.</p> **Example:** <p>2022-05-17T10:36:30.187Z</p> |
| updated_at</br>`string`, `null` | <p>Timestamp representing the date and time when the SKU was updated in ISO 8601 format.</p> **Example:** <p>2022-05-17T10:55:09.137Z</p> |
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about the <code>SKU</code>.</p> Available values: `sku` |

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

## Voucher Assets
| Attributes |  Description |
|:-----|:--------|
| qr</br>`object` | <p>Stores Quick Response (QR) representation of encrypted code.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Encrypted voucher code ID.</p> <strong>Example:</strong> <p>U2FsdGVkX19ucFhvVmBVpVYG5KoswTsjSIaqoKg5L9ie4BK+t4pp7U7oFzjGJzj9q/bmuMOj9mEFiVKDMIkSaruKedMvHbKoPX5Sg+BaZk5QwXMf8k/OzSlOEVybpwSq+AiqPoNtjeuqtIgkDyvT6Q==</p></td></tr><tr><td style="text-align:left">url</br><code>string</code></td><td style="text-align:left"><p>URL to QR code</p><p><em>Optional:</em> Attach query parameters to base URL to customize the image of the encrypted voucher code.</p><ul><li><code>size</code>: integer value from <code>1</code> to <code>100</code></li><li><code>format</code>: string, either <code>png</code> (default) or <code>svg</code></li></ul> <strong>Example:</strong> <p>https://dev.dl.voucherify.io/api/v1/assets/qr/U2FsdGVkX19ucFhvVmBVpVYG5KoswTsjSIaqoKg5L9ie4BK%2Bt4pp7U7oFzjGJzj9q%2FbmuMOj9mEFiVKDMIkSaruKedMvHbKoPX5Sg%2BBaZk5QwXMf8k%2FOzSlOEVybpwSq%2BAiqPoNtjeuqtIgkDyvT6Q%3D%3D</p></td></tr></tbody></table> |
| barcode</br>`object` | <p>Stores barcode representation of encrypted code.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Encrypted voucher code ID.</p> <strong>Example:</strong> <p>U2FsdGVkX19eJhGfWwUrH9+tulBkON+AnMktic+N6CVWzZ9+fHVxuVx22WakrzxiWXy0skuvvEHSeZIw9HlgyIJ+kJ1iPdUKpyENuNYJKzoZlO0mmTf6WQM6/pFs61apEn9SJx32ttCF6d3oxKISQQ==</p></td></tr><tr><td style="text-align:left">url</br><code>string</code></td><td style="text-align:left"><p>URL to barcode</p><p><em>Optional:</em> Attach query parameters to base URL to customize the image of the encrypted voucher code.</p><ul><li><code>size</code>: integer value from <code>1</code> to <code>100</code></li><li><code>format</code>: string, either <code>png</code> (default) or <code>svg</code></li></ul> <strong>Example:</strong> <p>https://dev.dl.voucherify.io/api/v1/assets/barcode/U2FsdGVkX19eJhGfWwUrH9%2BtulBkON%2BAnMktic%2BN6CVWzZ9%2BfHVxuVx22WakrzxiWXy0skuvvEHSeZIw9HlgyIJ%2BkJ1iPdUKpyENuNYJKzoZlO0mmTf6WQM6%2FpFs61apEn9SJx32ttCF6d3oxKISQQ%3D%3D</p></td></tr></tbody></table> |

## Validation Rule Assignments List
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about validation rule assignments.</p> |
| data_ref</br>`string` | <p>Identifies the name of the JSON property that contains the array of validation rule assignments.</p> |
| data</br>`array` | <p>A dictionary that contains an array of validation rule assignments.</p> Array of [Validation Rule Assignment](#validation-rule-assignment) |
| total</br>`integer` | <p>Total number of validation rule assignments.</p> |

## MappingPoints
One of:

[MappingMultiply](#mappingmultiply), [MappingFixed](#mappingfixed)

## Define fixed amount of points
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>The number of points to be added to the loyalty card.</p> Available values: `FIXED` |
| points</br>`integer` | <p>Defines how the points will be added to the loyalty card. FIXED adds a fixed number of points.</p> |

## Calculate points proportionally
One of:

[Order](#order), [Order Items](#order-items), [Customer Metadata](#customer-metadata), [Earning Rule Proportional Custom Event](#earning-rule-proportional-custom-event)

## Earning Rule Event
Available values: `order.paid`, `customer.segment.entered`, `custom_event`, `customer.loyalty.tier.upgraded`, `customer.loyalty.tier.downgraded`, `customer.loyalty.tier.prolonged`, `customer.loyalty.tier.joined`, `customer.loyalty.tier.left`

## Order Item Calculated
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

## Applicable To
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>This object stores information about the product collection.</p> Available values: `product`, `sku`, `products_collection` |
| id</br>`string` | <p>Unique product collection ID assigned by Voucherify.</p> |
| source_id</br>`string` | <p>The source ID from your inventory system.</p> |
| product_id</br>`string` | <p>Parent product's unique ID assigned by Voucherify.</p> |
| product_source_id</br>`string` | <p>Parent product's source ID from your inventory system.</p> |
| strict</br>`boolean` |  |
| price</br>`number` | <p>New fixed price of an item. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 price is written as 1000. In case of the fixed price being calculated by the formula, i.e. the price_formula parameter is present in the fixed price definition, this value becomes the fallback value. Such that in a case where the formula cannot be calculated due to missing metadata, for example, this value will be used as the fixed price.</p> |
| price_formula</br>`number` | <p>Formula used to calculate the discounted price of an item.</p> |
| effect | <p>Defines how the discount is applied to the customer's order.</p> [Applicable To Effect](#applicable-to-effect) |
| quantity_limit</br>`integer` | <p>The maximum number of units allowed to be discounted per order line item.</p> |
| aggregated_quantity_limit</br>`integer` | <p>The maximum number of units allowed to be discounted combined across all matched order line items.</p> |
| amount_limit</br>`integer` | <p>Upper limit allowed to be applied as a discount per order line item. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $6 maximum discount is written as 600.</p> |
| aggregated_amount_limit</br>`integer` | <p>Maximum discount amount per order. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $6 maximum discount on the entire order is written as 600. This value is definable for the following discount effects:</p><ul><li><code>APPLY_TO_ITEMS</code> (each item subtotal is discounted equally)</li><li><code>APPLY_TO_ITEMS_BY_QUANTITY</code> (each unit of matched products has the same discount value)</li></ul> |
| order_item_indices</br>`array` |  |

## Inapplicable To
[Applicable To](#applicable-to)

## Coupon Code
| Attributes |  Description |
|:-----|:--------|
| discount | <p>Discount details about the type of discount to be applied for the redeemable.</p> One of: [Amount](#amount), [Unit](#unit), [Unit Multiple](#unit-multiple), [Percent](#percent), [Fixed](#fixed) |

## Gift Card
| Attributes |  Description |
|:-----|:--------|
| gift</br>`object` | <p>Stores the amount of gift card credits to be applied in the redemption.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">credits</br><code>integer</code></td><td style="text-align:left"><p>Total number of gift card credits to be applied in the redemption expressed as the smallest currency unit (e.g. 100 cents for $1.00).</p></td></tr></tbody></table> |

## Loyalty Card
| Attributes |  Description |
|:-----|:--------|
| loyalty_card</br>`object` | <p>Stores the amount of loyalty card points to be applied in the redemption.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>Total number of loyalty points to be applied in the redemption.</p></td></tr></tbody></table> |

## Redeemable Result Promotion Tier
| Attributes |  Description |
|:-----|:--------|
| discount | <p>Discount details about the type of discount to be applied for the redeemable.</p> One of: [Amount](#amount), [Unit](#unit), [Unit Multiple](#unit-multiple), [Percent](#percent), [Fixed](#fixed) |

## Promotion Stack
| Attributes |  Description |
|:-----|:--------|
| loyalty_card</br>`object` | <p>Stores the amount of loyalty card points to be applied in the redemption.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>Total number of loyalty points to be applied in the redemption.</p></td></tr></tbody></table> |

## Error Object
| Attributes |  Description |
|:-----|:--------|
| code</br>`integer` | <p>Error's HTTP status code.</p> |
| key</br>`string` | <p>Short string describing the kind of error which occurred.</p> |
| message</br>`string` | <p>A human-readable message providing a short description about the error.</p> |
| details</br>`string` | <p>A human-readable message providing more details about the error.</p> |
| request_id</br>`string` | <p>This ID is useful when troubleshooting and/or finding the root cause of an error response by our support team.</p> **Example:** <p>v-0a885062c80375740f</p> |
| resource_id</br>`string` | <p>Unique resource ID that can be used in another endpoint to get more details.</p> **Example:** <p>rf_0c5d710a87c8a31f86</p> |
| resource_type</br>`string` | <p>The resource type.</p> **Example:** <p>voucher</p> |

## Simple Order Item
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about the <code>order_item</code>.</p> Available values: `order_item` |
| source_id</br>`string` | <p>The merchant’s product/SKU ID (if it is different from the Voucherify product/SKU ID). It is useful in the integration between multiple systems. It can be an ID from an eCommerce site, a database, or a third-party service.</p> |
| related_object</br>`string` | <p>Used along with the source_id property, can be set to either sku or product.</p> Available values: `product`, `sku` |
| product_id</br>`string` | <p>A unique product ID assigned by Voucherify.</p> |
| sku_id</br>`string` | <p>A unique SKU ID assigned by Voucherify.</p> |
| quantity</br>`integer` | <p>The quantity of the particular item in the cart.</p> |
| discount_quantity</br>`integer` | <p>Number of dicounted items.</p> |
| amount</br>`integer` | <p>The total amount of the order item (price * quantity).</p> |
| discount_amount</br>`integer` | <p>Sum of all order-item-level discounts applied to the order.</p> |
| applied_discount_amount</br>`integer` | <p>This field shows the order-level discount applied.</p> |
| price</br>`integer` | <p>Unit price of an item. Value is multiplied by 100 to precisely represent 2 decimal places. For example <code>10000 cents</code> for <code>$100.00</code>.</p> |

## Reward Assignment Base
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique reward assignment ID, assigned by Voucherify.</p> **Example:** <p>rewa_PbIRoMXpwe5QhobW4JKu0VjH</p> |
| reward_id</br>`string` | <p>Associated reward ID.</p> **Example:** <p>rew_C7wS9eHFDN4CIbXI5PpLSkGY</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the reward assignment was created in ISO 8601 format.</p> **Example:** <p>2022-08-11T14:49:22.586Z</p> |
| updated_at</br>`string`, `null` | <p>Timestamp representing the date and time when the reward assignment was updated in ISO 8601 format.</p> **Example:** <p>2022-08-11T16:01:34.885Z</p> |
| object</br>`string` | <p>The type of object represented by the JSON. This object stores information about the reward assignment.</p> Available values: `reward_assignment` |
| related_object_id</br>`string` | <p>Related object ID to which the reward was assigned.</p> **Example:** <p>camp_wciTvaOfYmAa3EmIIW3QpXXZ</p> |
| related_object_type</br>`string` | <p>Related object type to which the reward was assigned.</p> Available values: `campaign` |

## Digital or Material Reward - Parameters
| Attributes |  Description |
|:-----|:--------|
| parameters</br>`object` | <p>Defines the cost of the reward.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">loyalty</br><code>object</code></td><td style="text-align:left"><p>Defines the equivalent points value of the reward.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>The number of points required to redeem the reward.</p></td></tr></tbody></table></td></tr></tbody></table> |

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

## Reward type
One of:

[Digital](#digital), [Pay with Points](#pay-with-points), [Material](#material)

## Product without Skus Object
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique product ID assigned by Voucherify.</p> **Example:** <p>prod_0b1da8105693710357</p> |
| source_id</br>`string`, `null` | <p>Unique product source ID.</p> **Example:** <p>productSourceID16</p> |
| name</br>`string`, `null` | <p>Unique user-defined product name.</p> **Example:** <p>T-shirt</p> |
| price</br>`integer`, `null` | <p>Product unit price. Value is multiplied by 100 to precisely represent 2 decimal places. For example <code>10000 cents</code> for <code>$100.00</code>.</p> |
| attributes</br>`array` | <p>A list of product attributes whose values you can customize for given SKUs: <code>[&quot;color&quot;,&quot;size&quot;,&quot;ranking&quot;]</code>. Each child SKU can have a unique value for a given attribute.</p> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the product. A set of key/value pairs that you can attach to a product object. It can be useful for storing additional information about the product in a structured format.</p> |
| image_url</br>`string`, `null` | <p>The HTTPS URL pointing to the .png or .jpg file that will be used to render the product image.</p> **Example:** <p>https://images.com/original.jpg</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the product was created in ISO 8601 format.</p> **Example:** <p>2022-05-23T06:52:55.008Z</p> |
| updated_at</br>`string`, `null` | <p>Timestamp representing the date and time when the product was updated in ISO 8601 format.</p> **Example:** <p>2022-05-23T09:24:07.405Z</p> |
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about the product.</p> Available values: `product` |

## Skus List For Product
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about SKUs.</p> |
| data_ref</br>`string` | <p>Identifies the name of the JSON property that contains the array of SKUs.</p> |
| data</br>`array` | <p>A dictionary that contains an array of SKUs.</p> Array of [SKU Object](#sku-object) |
| total</br>`integer` | <p>Total number of SKUs in the product.</p> |

## Validation Rule Assignment
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Validation rule assignment ID.</p> **Example:** <p>asgm_74F7QZoYbUoljwQO</p> |
| rule_id</br>`string` | <p>Validation rule ID.</p> **Example:** <p>val_4j7DCRm2IS59</p> |
| related_object_id</br>`string` | <p>The resource ID to which the validation rule was assigned.</p> **Example:** <p>v_JtWunK6jUo7X2qOFj0SyRHq4p9tgENlT</p> |
| related_object_type</br>`string` | <p>The type of resource to which the validation rule was assigned.</p> Available values: `voucher`, `campaign`, `earning_rule`, `reward_assignment`, `promotion_tier`, `distribution` |
| created_at</br>`string` | <p>Timestamp representing the date and time when the validation rule assignment was created in ISO 8601 format.</p> **Example:** <p>2022-02-17T08:18:15.085Z</p> |
| object</br>`string` | <p>The type of object represented by the ID.</p> Available values: `validation_rules_assignment` |

## MappingMultiply
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Type of calculation.</p> Available values: `MULTIPLY` |
| multiplier</br>`number` | <p>Multiplication factor used to multiply the points to obtain the mapped points.</p> |

## MappingFixed
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Type of calculation.</p> Available values: `CUSTOM` |
| points</br>`integer` | <p>Fixed number of points to be applied.</p> |

## Order
One of:

[Order Amount](#order-amount), [Order Total Amount](#order-total-amount), [Order Metadata](#order-metadata)

## Order Items
One of:

[Order Items Quantity](#order-items-quantity), [Order Items Amount](#order-items-amount), [Order Items Subtotal Amount](#order-items-subtotal-amount)

## Customer Metadata
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines how the points will be added to the loyalty card.PROPORTIONAL adds points based on a pre-defined ratio.</p> Available values: `PROPORTIONAL` |
| calculation_type</br>`string` | <p>CUSTOMER_METADATA: Customer Metadata (X points for every Y in metadata attribute, defined in the property key under the customer.metadata object)</p> Available values: `CUSTOMER_METADATA` |
| customer</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">metadata</br><code>object</code></td><td style="text-align:left"><p>Defines the ratio based on the property defined in the calculation_type parameter. For every given increment of value (1, 10, etc) defined in the every parameter for the property defined in calculation_type, give the customer the number of points defined in the points parameter. In other words, for every order metadata property value, give points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">every</br><code>integer</code></td><td style="text-align:left"><p>For how many increments of the customer metadata property to grant points for.</p></td></tr><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>Number of points to be awarded, i.e. how many points to be added to the loyalty card.</p></td></tr><tr><td style="text-align:left">property</br><code>string</code></td><td style="text-align:left"><p>Customer metadata property.</p></td></tr></tbody></table></td></tr></tbody></table> |

## Earning Rule Proportional Custom Event
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines how the points will be added to the loyalty card.PROPORTIONAL adds points based on a pre-defined ratio.</p> Available values: `PROPORTIONAL` |
| calculation_type</br>`string` | <p>CUSTOM_EVENT_METADATA: Custom event metadata (X points for every Y in metadata attribute).</p> Available values: `CUSTOM_EVENT_METADATA` |
| custom_event</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">metadata</br><code>object</code></td><td style="text-align:left"><p>Defines the ratio based on the property defined in the calculation_type parameter. For every given increment of value (1, 10, etc) defined in the every parameter for the property defined in calculation_type, give the customer the number of points defined in the points parameter. In other words, for every order metadata property value, give points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">every</br><code>integer</code></td><td style="text-align:left"><p>For how many increments of the customer metadata property to grant points for.</p></td></tr><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>Number of points to be awarded, i.e. how many points to be added to the loyalty card.</p></td></tr><tr><td style="text-align:left">property</br><code>string</code></td><td style="text-align:left"><p>Custom event metadata property.</p></td></tr></tbody></table></td></tr></tbody></table> |

## Applicable To Effect
Available values: `APPLY_TO_EVERY`, `APPLY_TO_CHEAPEST`, `APPLY_TO_MOST_EXPENSIVE`

## Digital
| Attributes |  Description |
|:-----|:--------|
| campaign</br>`object` | <p>Objects stores information about the campaign related to the reward.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique campaign ID, assigned by Voucherify.</p></td></tr><tr><td style="text-align:left">balance</br><code>integer</code></td><td style="text-align:left"><p>The incremental amout to be added to the current balance on the gift card. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 amount is written as 10000.</p></td></tr><tr><td style="text-align:left">type</br><code>string</code></td><td style="text-align:left"><p>Campaign type.</p> Available values: <code>DISCOUNT_COUPONS</code>, <code>PROMOTION</code>, <code>GIFT_VOUCHERS</code>, <code>REFERRAL_PROGRAM</code>, <code>LOYALTY_PROGRAM</code></td></tr></tbody></table> |

## Pay with Points
| Attributes |  Description |
|:-----|:--------|
| coin</br>`object` | <p>Defines the ratio by mapping the number of loyalty points in points_ratio to a predefined cash amount in exchange_ratio.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">exchange_ratio</br><code>number</code></td><td style="text-align:left"><p>The cash equivalent of the points defined in the points_ratio property.</p></td></tr><tr><td style="text-align:left">points_ratio</br><code>integer</code></td><td style="text-align:left"><p>The number of loyalty points that will map to the predefined cash amount defined by the exchange_ratio property.</p></td></tr></tbody></table> |

## Material
| Attributes |  Description |
|:-----|:--------|
| product</br>`object` | <p>Contains information about the product given as a reward.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique product ID, assigned by Voucherify.</p> <strong>Example:</strong> <p>prod_0b7d7dfb05cbe5c616</p></td></tr><tr><td style="text-align:left">sku_id</br><code>string</code>, <code>null</code></td><td style="text-align:left"><p>Unique SKU ID, assigned by Voucherify, of the SKU given as a reward.</p> <strong>Example:</strong> <p>sku_0b7d7dfb090be5c619</p></td></tr></tbody></table> |

## Order Amount
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines how the points will be added to the loyalty card.PROPORTIONAL adds points based on a pre-defined ratio.</p> Available values: `PROPORTIONAL` |
| calculation_type</br>`string` | <p><code>ORDER_AMOUNT</code>: Pre-discount order amount (X points for every Y spent excluding discounts)</p> Available values: `ORDER_AMOUNT` |
| order</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">amount</br><code>object</code></td><td style="text-align:left"><p>Defines the ratio based on the property defined in the calculation_type parameter. For every set of value (1, 10, etc) defined in the every parameter for the property defined in calculation_type, give the customer the number of points defined in the points parameter. In other words, for every calculation_type, give points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">every</br><code>integer</code></td><td style="text-align:left"><p>Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 order amount is written as 1000.</p></td></tr><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>Number of points to be awarded, i.e. how many points to be added to the loyalty card.</p></td></tr></tbody></table></td></tr></tbody></table> |

## Order Total Amount
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines how the points will be added to the loyalty card.PROPORTIONAL adds points based on a pre-defined ratio.</p> Available values: `PROPORTIONAL` |
| calculation_type</br>`string` | <p><code>ORDER_TOTAL_AMOUNT</code>: Total order amount (X points for every Y spent including discount)</p> Available values: `ORDER_TOTAL_AMOUNT` |
| order</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">total_amount</br><code>object</code></td><td style="text-align:left"><p>Defines the ratio based on the property defined in the calculation_type parameter. For every set of value (1, 10, etc) defined in the every parameter for the property defined in calculation_type, give the customer the number of points defined in the points parameter. In other words, for every calculation_type, give points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">every</br><code>integer</code></td><td style="text-align:left"><p>Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 order amount is written as 1000.</p></td></tr><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>Number of points to be awarded, i.e. how many points to be added to the loyalty card.</p></td></tr></tbody></table></td></tr></tbody></table> |

## Order Metadata
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines how the points will be added to the loyalty card.PROPORTIONAL adds points based on a pre-defined ratio.</p> Available values: `PROPORTIONAL` |
| calculation_type</br>`string` | <p><code>ORDER_METADATA</code>: Order Metadata (X points for every Y in metadata attribute, defined in the property key under the order.metadata object)</p> Available values: `ORDER_METADATA` |
| order</br>`object` | <p>Defines the formula for calculating points proportionally.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">metadata</br><code>object</code></td><td style="text-align:left"><p>Defines the ratio based on the property defined in the calculation_type parameter. For every given increment of value (1, 10, etc) defined in the every parameter for the property defined in calculation_type, give the customer the number of points defined in the points parameter. In other words, for every order metadata property value, give points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">every</br><code>integer</code></td><td style="text-align:left"><p>For how many increments of the order metadata property to grant points for.</p></td></tr><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>Number of points to be awarded, i.e. how many points to be added to the loyalty card.</p></td></tr><tr><td style="text-align:left">property</br><code>string</code></td><td style="text-align:left"><p>Order metadata property.</p></td></tr></tbody></table></td></tr></tbody></table> |

## Order Items Quantity
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines how the points will be added to the loyalty card.PROPORTIONAL adds points based on a pre-defined ratio.</p> Available values: `PROPORTIONAL` |
| calculation_type</br>`string` | <p><code>ORDER_ITEMS_QUANTITY</code>: Quantity of items defined in order_items.quantity.object &amp; .id (X points for every Y items excluding free items)</p> Available values: `ORDER_ITEMS_QUANTITY` |
| order_items</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">quantity</br><code>object</code></td><td style="text-align:left"><p>Defines the ratio based on the property defined in the calculation_type parameter. For every set of value (1, 10, etc) defined in the every parameter for the property defined in calculation_type, give the customer the number of points defined in the points parameter. In other words, for every calculation_type, give points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">every</br><code>integer</code></td><td style="text-align:left"><p>Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 order amount is written as 1000.</p></td></tr><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>Number of points to be awarded, i.e. how many points to be added to the loyalty card.</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>Type of object taken under consideration.</p> Available values: <code>products_collection</code>, <code>product</code>, <code>sku</code></td></tr><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique ID of the resource, i.e. pc_75U0dHlr7u75BJodrW1AE3t6, prod_0bae32322150fd0546, or sku_0b7d7dfb090be5c619.</p></td></tr></tbody></table></td></tr></tbody></table> |

## Order Items Amount
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines how the points will be added to the loyalty card.PROPORTIONAL adds points based on a pre-defined ratio.</p> Available values: `PROPORTIONAL` |
| calculation_type</br>`string` | <p>ORDER_ITEMS_AMOUNT; Pre-discount amount spent on items defined in the order_items.amount.object &amp; .id (X points for every Y spent on items excluding discounts)</p> Available values: `ORDER_ITEMS_AMOUNT` |
| order_items</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">amount</br><code>object</code></td><td style="text-align:left"><p>Defines the ratio based on the property defined in the calculation_type parameter. For every set of value (1, 10, etc) defined in the every parameter for the property defined in calculation_type, give the customer the number of points defined in the points parameter. In other words, for every calculation_type, give points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">every</br><code>integer</code></td><td style="text-align:left"><p>Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 order amount is written as 1000.</p></td></tr><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>Number of points to be awarded, i.e. how many points to be added to the loyalty card.</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>Type of object taken under consideration.</p> Available values: <code>products_collection</code>, <code>product</code>, <code>sku</code></td></tr><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique ID of the resource, i.e. pc_75U0dHlr7u75BJodrW1AE3t6, prod_0bae32322150fd0546, or sku_0b7d7dfb090be5c619.</p></td></tr></tbody></table></td></tr></tbody></table> |

## Order Items Subtotal Amount
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines how the points will be added to the loyalty card.PROPORTIONAL adds points based on a pre-defined ratio.</p> Available values: `PROPORTIONAL` |
| calculation_type</br>`string` | <p>ORDER_ITEMS_SUBTOTAL_AMOUNT; Amount spent on items defined in the order_items.subtotal_amount.object &amp; .id (X points for every Y spent on items including discounts)</p> Available values: `ORDER_ITEMS_SUBTOTAL_AMOUNT` |
| order_items</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">subtotal_amount</br><code>object</code></td><td style="text-align:left"><p>Defines the ratio based on the property defined in the calculation_type parameter. For every set of value (1, 10, etc) defined in the every parameter for the property defined in calculation_type, give the customer the number of points defined in the points parameter. In other words, for every calculation_type, give points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">every</br><code>integer</code></td><td style="text-align:left"><p>Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 order amount is written as 1000.</p></td></tr><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>Number of points to be awarded, i.e. how many points to be added to the loyalty card.</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>Type of object taken under consideration.</p> Available values: <code>products_collection</code>, <code>product</code>, <code>sku</code></td></tr><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique ID of the resource, i.e. pc_75U0dHlr7u75BJodrW1AE3t6, prod_0bae32322150fd0546, or sku_0b7d7dfb090be5c619.</p></td></tr></tbody></table></td></tr></tbody></table> |

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]