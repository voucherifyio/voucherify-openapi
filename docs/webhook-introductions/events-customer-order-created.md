The `EVENTS.ORDER.CREATED` event indicates that an order has been created.

When the event is used in an "Order creation" distribution webhook, the `data` object always contains the following required objects:
- `customer`,
- `referrer`,
- `order`,
- `redemption`.

Additional objects are also sent depending on the purpose:
- "Notify customers about promotion" sends also the following objects:
  - `campaign`,
  - `promotion_tier`,
- "Send and publish unique codes from campaign" sends also  the following objects:
  - `campaign`,
  - `voucher`,
  - `publication`,
- "Send plain message to customers" sends only the basic objects listed above.

> 📘 Webhook documentation
>
> This page documents only the event. If you need more details about the webhook payload data that includes this event, go to [Webhook v2024-01-01](ref:introduction-to-webhooks "Introduction to webhooks v2024-01-01") page.