---
title: Limits
excerpt: API calls limits and optimization
categorySlug: implementation-blueprint
slug: limits
type: basic
hidden: false
order: 8
---

To understand the basic limits of your account, check out [Pricing](https://www.voucherify.io/pricing) and [Fair Use Policy](https://www.voucherify.io/legal/fair-use-policy). Now, let's navigate through what we limit and how to monitor your usage.

## API Limits

| **Limit** | **Value** |
|:---|:---|
| API requests per hour | Free plan: 100,<br>Startup plan: 1000,<br>Growth plan: 2000,<br>Professional plan: 5000 |
| Bulk API requests per hour | Free plan: 1,<br>Startup plan: 10,<br>Growth plan: 20,<br>Professional plan: 50 |
| Billing cycle API requests<br><br>Bulk API requests are not added to the billing cycle limit. | Free plan: 500,<br>Startup plan: 10000,<br>Growth plan: 30000,<br>Professional plan: 100000 |
| Client-side requests (e.g., validate) from a single IP address | 5 requests per 5 seconds |

> 📘 What happens if you exceed your limits?
>
> You can't exceed the number of API calls (both hourly and monthly) defined in your pricing plan. Exceeding this limit will block your access to the API immediately.

## Enterprise plan

Users with an Enterprise plan have custom API requests limits. Depending on the case, it can be counted per hour or per minute. Bulk API requests are counted in hour periods in both cases.

## Webhooks

Webhook calls coming from integrations are counted in separate daily buckets.
The size of the daily bucket is derived from the API request limit. 

**Webhooks used per day:**
  * Free: 7 200
  * Startup: 21 600
  * Growth: 50 400
  * Professional: 122 400

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
- `X-Rate-Limit-Type` -  (optional) type of API limit that was reached, possible values: api_calls / bulk_api_calls / api_calls_cycle / webhook_calls

## Notifications

Voucherify will send an email with the notification whenever the number of API calls reaches a safety threshold.
The project owner can configure these thresholds and notifications in the `Project settings > API Usage` tab.

Notifications for webhooks usage will be sent if the usage exceeds the limit for an hour, even though they are counted in daily periods. It is a measure to inform you in advance about any suspicious user activity.
