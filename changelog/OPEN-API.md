

--------------------

Older changes in [DEPRECATED.md](DEPRECATED.md)

## 2024-03-13

- OpenAPIWebhooks.json:
  - Changed webhook documentation into Event documentation. Now, individual pages describe only the events
  - Added base webhook payload to the `introduction-to-webhook.md` file for distribution webhooks and project settings webhooks
  - Added the following events for distribution webhooks:
    - `customer.loyalty.tier.upgraded`
    - `customer.entered.segment`
    - `customer.order.paid`
    - `customer.voucher.loyalty_card.points_added`
    - `customer.order.updated`
    - `customer.order.created`
    - `customer.order.canceled`
    - `customer.segment.left`
  - Relevant changes to custom webhook pages
  - Added `category`, `start_date`, `expiration_date`, `description` to the `SimpleCampaign` schema
  - Added `start_date` and `expiratotion_date` to the `SimpleVoucher` schema
- OpenAPI.json:
  - Added GET `/v1/customers/{id}/activity` endpoint
  - Deprecated GET `/v1/customers/{id}/activities`
  - Removed inadequate request body parameters for POST `/v1/campaigns/{campaignId}/import`

## 2024-02-28

OpenAPI.json:
- Added `metadata` object to the following schemas (release v20240124):
  - `SimpleCampaign`,
  - `SimpleVoucher`,
  - `SimplePromotionTier`.
- Updated the `page` objects' descriptions with: `The lowest value is 1.`.
  - Fixed several articles to correctly display interactive `page` and limit `fields`.
- Added `order.initial_amount` to the `ValidationRuleRules` schema.
- Fixed `number` to `integer` on the "Validation Rule Object" page.
- Added `updated_at` filter to `ExportCustomerFilters` schema. Tested for `$before`, `$after`, `$is` – works. The `$is_not` fitler does not work.
- Added a `SimplePromotionStack` schema because `promotion_stack` was added to customer redemption events.
- Changed info about the maximum of vouchers returned in List Vouchers
- Changed descriptions to `total`, `balance`, and `points` descriptions for List Voucher Transactions
- Added `deprecated` note to the `birthday` properties
- Info about an async action to Add or Remove Loyalty Card Balance articles
- Fixed the table in the `ValidationRuleRules` schema.

OpenAPIWebhooks.json:
- Added a `SimplePromotionStack` schema because `promotion_stack` was added to customer redemption events.

## 2024-02-22

- Fixed the title for `"QualificationsFiltersCondition"` object.
- Added the following webhooks to OpenAPIWebhook.json:
  - EVENTS.CAMPAIGN.ENABLED
  - EVENTS.CAMPAIGN.DISABLED
  - EVENTS.CAMPAIGN.CREATED
  - EVENTS.CAMPAIGN.UPDATED
  - EVENTS.CAMPAIGN.DELETED
  - EVENTS.CAMPAIGN.VOUCHERS.GENERATION.COMPLETED

## 2024-02-16

Added the following webhooks to OpenAPIWebhooks.json:
- EVENTS.BUS_VAL_RULE.ASSIGNMENT.CREATED
- EVENTS.BUS_VAL_RULE.ASSIGNMENT.DELETED
- EVENTS.BUS_VAL_RULE.CREATED
- EVENTS.BUS_VAL_RULE.UPDATED
- EVENTS.BUS_VAL_RULE.DELETED

## 2024-02-14

Added the following webhooks to OpenAPIWebhooks.json:
- EVENTS.VOUCHER.PUBLISHED
- EVENTS.VOUCHER.UPDATED
- EVENTS.VOUCHER.DELETED
- EVENTS.VOUCHER.CREATED
- EVENTS.VOUCHER.ENABLED
- EVENTS.VOUCHER.DISABLED
- EVENTS.VOUCHER.LOYALTY_CARD.POINTS_ADDED

## 2024-02-13

- Added an introductory page for webhooks.
- Fixes to `CUSTOMER.CREATED` and `CUSTOMER.DELETED` schemas

## 2024-02-08

- Added info to `Redemption rollback` and `Stackable redemption rollback` about the 3 months limit for rollbacks.
- Added the following webhooks:
  - REDEMPTION:
    - EVENTS.REDEMPTION.SUCCEEDED
    - EVENTS.REDEMPTION.FAILED
    - EVENTS.REDEMPTION.ROLLBACK.SUCCEEDED
    - EVENTS.REDEMPTION.ROLLBACK.FAILED
  - CUSTOMER:
    - EVENTS.CUSTOMER.CREATED
    - EVENTS.CUSTOMER.DELETED
    - EVENTS.CUSTOMER.REWARDED.MAIN
    - EVENTS.CUSTOMER.REWARDED.LOYALTY_POINTS
    - EVENTS.CUSTOMER.CONSENTS.REVOKED
    - EVENTS.CUSTOMER.CONSENTS.GIVEN
  - PUBLICATION:
    - EVENTS.PUBLICATION.SUCCEEDED
