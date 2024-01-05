---
title: Limits
excerpt: API calls limits and optimization
categorySlug: development
slug: limits
type: basic
hidden: false
order: 140
---

## Accessing the API Use Summary

Navigate to `Team Settings > Subscription` to view a summary of API calls for each of your projects. 

Navigate to `Project Settings > API Usage` to view a summary of API calls connected with a specific project.

Note, however, that team settings can be viewed and managed only by an account owner, and project settings can be managed by the account owner or users with proper access granted by the owner.

## API Limits

| **Limit** | **Value** |
|:---|:---|
| API requests per hour | Free plan: 100,<br>Startup plan: 1000,<br>Growth plan: 2000,<br>Professional plan: 5000 |
| Bulk API requests per hour | Free plan: 1,<br>Startup plan: 10,<br>Growth plan: 20,<br>Professional plan: 50 |
| Billing cycle API requests<br><br>Bulk API requests are not added to the billing cycle limit. | Free plan: 500,<br>Startup plan: 10,000,<br>Growth plan: 30,000,<br>Professional plan: 100,000 |
| Client-side requests (e.g., validate) from a single IP address | 5 requests per 5 seconds |

To understand the basic limits of your account, check out [Pricing](https://www.voucherify.io/pricing) and [Fair Use Policy](https://www.voucherify.io/legal/fair-use-policy).

## Notifications

You can receive notifications in your app and through email when you use a certain percentage of your redemptions, API calls, or bulk API calls. The account owner can configure these thresholds and notifications in the `Project settings > API Usage` tab.
To set this up, the account owner has two options:

1. Go to the Bell Icon at the top of your Dashboard, then click on Notifications Center and select Account Settings.

2. Alternatively, click the pencil icon under one of the charts. This will take you directly to the API usage notification settings.

To get email notifications, follow these steps:

1. Visit Notifications Center > Account Settings.

2. Click on Show details next to the notifications you want to activate.

3. Turn on the switch next to Email.

4. Set the percentage usage limit that will trigger the notification.

5. Click Add email to specify the email address where you want to receive notifications.

6. Save your settings.

For in-app notifications, simply toggle the switch next to "In app."

Notifications for webhooks usage will be sent if the usage exceeds the limit for an hour, even though they are counted in daily periods. It is a measure to inform you in advance about any suspicious user activity.

> 📘 What happens if you exceed your limits?
>
> You can't exceed the number of API calls (both hourly and monthly) defined in your pricing plan. Exceeding this limit will block your access to the API immediately.

## Buying additional API packages

If you think you'll use more API calls than your usual limit, you can [purchase extra packages](https://support.voucherify.io/article/583-how-to-buy-extra-api-calls-packages) to raise those limits. This lets you temporarily increase the number of API calls you can make per hour, per minute, or per cycle, providing a boost when needed.

> 📘 Important: Buying additional API packages won't raise the API call limits for the Sandbox project. The Sandbox project is set to a fixed limit of 100 API calls per hour.

## Enterprise plan

Users with an Enterprise plan have custom API request limits. Depending on the case, it can be counted per hour or per minute. Bulk API requests are counted in hour periods in both cases.

## Webhooks

Webhook calls coming from integrations are counted in separate daily buckets.
The size of the daily bucket is derived from the API request limit. 

**Webhooks used per day:**
  * Free: 7200
  * Startup: 21,600
  * Growth: 50,400
  * Professional: 122,400

Webhook calls are gathered in a queue, so their number per hour can exceed the API hourly limit, and they will still be processed. However, if their number exceeds the daily limit, they will get rejected. 

## Distribution limits

Voucherify allows the Customer to send messages using the Distribution Manager. According to Voucherify [Anti-Spam](https://www.voucherify.io/legal/anti-spam-policy-v1-1) policy, the Customer has to pass a few checks to unlock the full limits.

1. Distribution messages limits **without** the anti-spam check:

* 10 messages per day.
* 10 messages per month.
* 0 emails from Voucherify.

2. Distribution messages limits **with** the anti-spam check:

Trial or Free Plan accounts:

* 10 messages per day.
* 100 messages per month.

All other accounts at the current pricing scheme: 

* Unlimited messages.

All other accounts at the older pricing scheme (created before December 2021):

* Limited according to the plan parameters.

## Response headers

Each API response coming from the Voucherify platform has a couple of headers informing about the current status of the API limits.
These headers are:
- `X-Rate-Limit-Limit` - maximum API requests that can be made in a period (an hour or a minute)
- `X-Rate-Limit-Remaining` - number of API requests that can still be made in a current period
- `X-Rate-Limit-Retry` - the time when the next API request can be made, in Unix epoch format (in seconds)
- `Retry-After` - (optional) number of seconds left before the next API request can be made, shown after a limit is reached
- `X-Rate-Limit-Type` - (optional) type of API limit that was reached, possible values: api_calls / bulk_api_calls/ api_calls_cycle / webhook_calls