The `EVENTS.REDEMPTION.ROLLBACK.FAILED` event indicates that a redemption was unsuccessfully reverted.

This occurs when the system encounters difficulties in rolling back a previously redeemed voucher code or promotional tier. The main reasons are that a rollback was applied to a redemption created more than 3 months ago or an attempt was made to rollback a redemption that had been rolled back already.

This event is used in a webhook configured in Project settings in Voucherify dashboard.

> 📘 Webhook documentation
>
> This page documents only the event. If you need more details about the webhook payload data that includes this event, go to [Webhook v2024-01-01](ref:introduction-to-webhooks "Introduction to webhooks v2024-01-01") page.