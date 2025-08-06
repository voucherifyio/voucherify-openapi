---
title: Custom Events in Referral Campaigns
excerpt: This guide will show you how to build a definition of an event that you can use to identify converted new customers (referred customers).
categorySlug: campaigns-recipes
slug: custom-referrals
type: basic
hidden: false
order: 15
---

This guide will show you how to build a definition of an event that you can use to identify converted new customers (referred customers).

Custom Events denote your customers’ actions that are not tracked in Voucherify by default. Before using them in your API calls, you need to create them in the Event Schema (Project Settings). Logging a custom event can trigger coupon distribution and enable customer segmentation filters around the event's recency and frequency.

[Go to the Custom Events article to learn more](https://support.voucherify.io/article/111-custom-events).

### Add custom event to Event Schema

Firstly, add a definition (name) of the new event.

If you need any additional properties to send along with the event request, which will be included in the validation process, you can build a proper schema definition from the configurator. Choose the 
Add next attribute option and define a new property (name, type, optional/required checkbox). 

Defining properties is an optional step. The properties which you add to the schema 
must be passed through API in the metadata object. Remember that in the API request, you need to determine the customer (new referred person) and referral object (with only one mandatory property – referral code). 

Here's a code sample with an example of a POST API request defining a custom event:

<pre>
{
  "event": "signed_up",
  "customer": {
    "source_id": "tom+referrer_3_4@voucherify.io",
    "email": "tom+referrer_3_4@voucherify.io",
    "name": "Tomasz Pindel",
    "metadata": {
      "test": true
    }
  },
  "metadata": {
    "sign_up_date": "2019-01-25T14:30:00.000Z"
  },
  "referral": {
    "code": "NRY"
  }
}
</pre>

### Define successful referral with custom event

With Event Schema defined and added to your API, you can use these custom events as a reward trigger in referral campaigns. Follow the [step-by-step guide](https://support.voucherify.io/article/161-how-to-create-referral-program-step-by-step) and launch a referral program based on events defined in your Event Schema.

### Custom events ideas

Here are some examples of popular custom events that you can use in your referral program, customer segmentation, or distribution:
- customer_subscribed
- cart_abandoned
- sign_up
- newsletter_subscribe
- ebook_download
- check_in
- check_out
- share_social
- share_email
- join_webinar
- join_event
- like_social
- left_review
- left_comment