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

> 👍 Access to Team and Project Settings 
>
> Team Settings can be viewed and managed only by an account owner.
> Project Settings can be managed by the account owner (by default) or users with proper access granted by the owner. The default Admin role can access Project Settings.

In Team Settings, go to the following tabs:
- Subscription to view a summary of API calls for each of your projects. 
- API Usage to view a summary of API calls connected with a specific project.

## API Limits

The following API limits apply to Business and Organization plans.

| **Limit**                                                      | **Value**                                  |
| :------------------------------------------------------------- | :----------------------------------------- |
| API requests per minute                                        | Business: 100<br>Organization: 2,000       |
| Total API requests per cycle                                   | Business: 100,000<br>Organization: 300,000 |
| Client-side requests (e.g., validate) from a single IP address | 5 requests per 5 seconds                   |

To understand the basic limits of your account, go to Voucherify [Pricing](https://www.voucherify.io/pricing "Voucherify Pricing") and [Fair Use Policy](https://www.voucherify.io/legal/fair-use-policy "Voucherify Fair Use Policy").

## Enterprise Plan

Users with an Enterprise plan have custom API request limits.

Contact [Voucherify Sales](https://www.voucherify.io/contact-sales) to learn more about the Enterprise plan.

## Notifications

You can receive notifications in your app and through email when you use a certain percentage of your redemptions, API calls, or bulk API calls. The account owner can configure these thresholds and notifications in the API Usage tab in the Project settings.

If you are the account owner, set this up as follows:

1. Click the bell icon in the left sidebar and go to Notifications Center to select Account Settings.
2. Alternatively, in the Team Settings, Subscription tab, click the pencil icon under one of the charts. This will take you directly to the API usage notification settings.

To get email notifications:
1. Go to Notifications Center and Account Settings.
2. Click Show details next to the notifications you want to activate.
3. Turn on the switch next to Email.
4. Set the percentage usage limit that will trigger the notification.
5. Click Add email to specify the email address where you want to receive notifications.
6. Save your settings.

For in-app notifications, toggle the switch next to "In app."

Notifications for webhooks usage will be sent if the usage exceeds the limit for an hour, even though they are counted in daily periods. As a result, you will be informed in advance about any suspicious user activity.

> 📘 What Happens If Limits Are Exceeded?
>
> You cannot exceed the number of API calls (both hourly and monthly) defined in your pricing plan. Exceeding this limit will block your access to the API immediately.

## Buying Additional API Packages

If you expect to use more API calls than your usual limit, you can [purchase extra packages](https://support.voucherify.io/article/583-how-to-buy-extra-api-calls-packages "Buying additional API call packages") to raise those limits. This lets you temporarily increase the number of API calls you can make per hour, per minute, or per cycle, providing a boost when needed.

> 🚧 API Packages And The Sandbox Project
>
> Buying additional API packages will not raise the API call limits for the Sandbox project. The Sandbox project is set to a fixed limit of 100 API calls per hour.

## Webhooks

Webhook calls coming from integrations (third-party webhooks) are counted in separate daily buckets.

The size of the daily bucket is derived from the API request limit. 

**Webhooks used per day:**
- Business: 144,000
- Organization: 288,00

Webhook calls are gathered in a queue, so their number per hour can exceed the API hourly limit, and they will still be processed. However, if their number exceeds the daily limit, they will get rejected.

> 👍 Project Settings Webhooks
>
> The webhooks sent by Voucherify, which include the webhooks configured in the [Project Settings](ref:introduction-to-webhooks#webhooks-available-in-project-settings) are not covered by any limit. The webhooks sent through [Distributions](ref:introduction-to-webhooks#webhooks-available-in-distributions) are covered by [distribution limits](#distribution-limits).

## Distribution Limits

Voucherify allows the Customer to send messages using the Distribution Manager. According to Voucherify [Anti-Spam](https://www.voucherify.io/legal/anti-spam-policy-v1-1) policy, the Customer has to pass a few checks to unlock the full limits.

### Distribution Message Limits **Without** the Anti-Spam Check

These limits apply to all plans:
- 10 messages per day
- 10 messages per month
- 0 emails from Voucherify

### Distribution Messages Limits **With** the Anti-Spam Check:

Limits for trial accounts:
- 10 messages per day.
- 100 messages per month.

All other accounts at the current pricing scheme: 
- Unlimited messages.

All other accounts at the older pricing scheme (created before December 2021):
- Limited according to the plan parameters.

## Response Headers

Each API response coming from the Voucherify platform has a couple of headers informing about the current status of the API limits.

These headers are:
- `X-Rate-Limit-Limit` - maximum API requests that can be made in a period (an hour or a minute)
- `X-Rate-Limit-Remaining` - number of API requests that can still be made in a current period
- `X-Rate-Limit-Retry` - the time when the next API request can be made, in Unix epoch format (in seconds)
- `Retry-After` - (optional) number of seconds left before the next API request can be made, shown after a limit is reached
- `X-Rate-Limit-Type` - (optional) type of API limit that was reached, possible values: api_calls / bulk_api_calls/ api_calls_cycle / webhook_calls