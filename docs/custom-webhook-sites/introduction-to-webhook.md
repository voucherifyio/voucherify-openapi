---
title: Webhooks v2024-01-01
type: basic
categorySlug: webhooks
slug: introduction-to-webhooks
hidden: false
order: -1
---
The v2024-01-01 webhook version can be used to inform your system about various events that are triggered in Voucherify. The v2024-01-01 webhooks work for distributions and events listed in the Project settings.

> 🚧 Work in progress
>
> The current documentation is still in progress. Documentation of the Webhooks for campaign events and business validation events will be published soon.

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

To update webhook details, click the Pencil button – edit. Enter your changes and click Update endpoint.

## Audit log

You can check details about a webhook sendout. In Voucherify dashboard, go to Audit log and Webhook sendouts tab.

## Events in the Project Settings

The following events can send a webhook:
- Redemption events:
  - [Redemption succeeded](ref:events-redemption-succeeded "Redemption succeeded webhook documentation")
  - [Redemption failed](ref:events-redemption-failed "Redemption failed webhook documentation")
  - [Redemption rollback succeeded](ref:events-redemption-rollback-succeeded "Redemption rollback succeeded webhook documentation")
  - [Redemption rollback failed](ref:events-redemption-rollback-failed "Redemption rollback failed webhook documentation")
- Publication event:
  - [Publication succeeded](ref:events-publication-succeeded "Publication succeeded webhook documentation")
- Customer events:
  - [Customer created](ref:events-customer-created "Customer created webhook documentation")
  - [Customer deleted](ref:events-customer-deleted "Customer deleted webhook documentation")
  - [Customer rewarded](ref:events-customer-rewarded-main "Customer rewarded webhook documentation")
  - [Customer rewarded loyalty points](ref:events-customer-rewarded-loyalty_points "Customer rewarded loyalty points webhook documentation")
  - [Customer consent given](ref:events-customer-consents-given "Customer consent given webhook documentation")
  - [Customer consent revoked](ref:events-customer-consents-revoked "Customer consent revoked webhook documentation")
- Voucher events:
  - [Voucher created](ref:events-voucher-created "Voucher created webhook documentation")
  - [Voucher disabled](ref:events-voucher-disabled "Voucher disabled webhook documentation")
  - [Voucher enabled](ref:events-voucher-enabled "Voucher enabled webhook documentation")
  - [Voucher updated](ref:events-voucher-updated "Voucher updated webhook documentation")
  - [Voucher published](ref:events-voucher-published "Voucher published webhook documentation")
  - [Voucher loyalty card points added](ref:events-voucher-loyalty_card-points_added "Voucher loyalty card points added webhook documentation")
  - [Voucher gift balance added](events-voucher-gift-balance_added "Voucher gift balance added webhook documentation")
  - [Voucher deleted](ref:events-voucher-deleted "Voucher deleted webhook documentation")
- Campaign events (work in progress):
  - Campaign created
  - Campaign voucher generation completed
  - Campaign enabled
  - Campaign updated
  - Campaign deleted
- Business validation rule events (work in progress):
  - Business validation rule created
  - Business validation rule updated
  - Business validation rule assignment created
  - Business validation rule assignment deleted
  - Business validation rule deleted