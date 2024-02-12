Webhook v2024-01-01
===

The v2024-01-01 webhook version can be used to inform your system about various events that are triggered in Voucherify. The v2024-01-01 webhooks work for distributions and events listed in the Project settings.

## Enabling v2024-01-01 Webhooks

1. In Voucherify dashboard, go to Project settings.
2. Scroll down to the Webhooks section.
3. Click the plus button – Add new webhook.
4. Choose v2024-01-01 webhook version.
5. Provide the following details:
   1. Enter the target URL
   2. Tick the Is active? checkbox.
   3. Select the events you want to receive. If you want to receive all the events, choose Send me all events option.
   4. Click Create endpoint.
6. If necessary for authentication reasons, enter the Secret key in your system to receive webhooks from Voucherify.

## Events in the Project Settings

The following events can send a webhook:
- Redemption events:
  - Redemption succeeded
  - Redemption failed
  - Redemption rollback succeeded
  - Redemption rollback failed
- Customer events:
  - Customer created
  - Customer deleted
  - Customer rewarded
  - Customer rewarded loyalty points
  - Customer consent given
  - Customer consent revoked
- Publication event:
  - Publication succeeded
- Voucher events:
  - Voucher created
  - Voucher disabled
  - Voucher enabled
  - Voucher updated
  - Voucher published
  - Voucher loyalty card point added
  - Voucher gift balance added
  - Voucher deleted