The `EVENTS.VOUCHER.CREATED` event indicates that a new voucher has been successfully created in Voucherify. It informs other systems or applications about the addition of a new voucher. The `VOUCHER.CREATED` webhook is sent only when a single voucher is created. When vouchers are created in bulk, this action does not trigger the webhook. 

The webhook provides, among others, the following details:
- URLs to the voucher's assets, such as QR code and barcode images,
- Associated campaign and its type,
- Expiration date.

This event is used in a webhook configured in Project settings in Voucherify dashboard.

> 📘 Webhook documentation
>
> This page documents only the event. If you need more details about the webhook payload data that includes this event, go to [Webhook v2024-01-01](ref:introduction-to-webhooks "Introduction to webhooks v2024-01-01") page.