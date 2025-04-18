The `MANUAL_DISTRIBUTION_SCHEDULE` event indicates that the distribution is a result of a scheduled distribution.

When the event is used in a "Manual message" distribution webhook, the `data` object always contains the following required objects:
- `distribution`.

Additional objects are also sent depending on the purpose:
- "Notify customers about promotion" sends also the following objects:
  - `campaign`,
  - `customer`,
  - `promotion_tier`,
- "Send and publish unique codes from campaign" sends also  the following objects:
  - `campaign`,
  - `voucher`,
  - `customer`,
  - `publication`,
- "Send plain message to customers" is unavailable for this distribution webhook.

This event is used in a webhook configured in Distributions in Voucherify dashboard.

> 📘 Webhook documentation
>
> This page documents only the event. If you need more details about the webhook payload data that includes this event, go to [Webhook v2024-01-01](ref:introduction-to-webhooks "Introduction to webhooks v2024-01-01") page.