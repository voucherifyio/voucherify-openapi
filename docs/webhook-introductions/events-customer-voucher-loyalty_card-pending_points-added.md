The `EVENTS.CUSTOMER.VOUCHER.LOYALTY_CARD.PENDING_POINTS.ADDED` event indicates that loyalty pending points have been successfully added to a customer's loyalty card associated with a voucher. The pending points activate automatically after a predefined time set in days or they can be activated manually with the [**POST** Activate Member Pending Points](ref:activate-member-pending-points) endpoint. The pending points can be also canceled manually with the [**POST** Cancel Member Pending Points](ref:cancel-member-pending-points) endpoint.

This event is triggered by distribution – Loyalty pending points added.

It is both a project settings and a distribution webhook.

> 📘 Webhook documentation
>
> This page documents only the event. If you need more details about the webhook payload data that includes this event, go to [Webhook v2024-01-01](ref:introduction-to-webhooks "Introduction to webhooks v2024-01-01") page.