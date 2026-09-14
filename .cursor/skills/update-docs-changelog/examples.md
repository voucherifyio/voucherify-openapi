# Changelog entry examples

Copy structure and voice from these real patterns. Do not copy the dates or topics unless they match the current change.

## OPEN-API.md — single endpoint

```markdown
## 2026-09-03

Add warning to DELETE `/v1/product-collections/{productCollectionId}`.
```

## OPEN-API.md — several endpoints, nested detail

```markdown
## 2026-09-02

- Verified and updated POST `/v2/loyalties/programs/{programId}/members/{memberId}/activate`.
  - Clarified that the 200 body is the member without cards and that `status` is always `ACTIVE`.
  - Corrected the `400` description to invalid state transition (`invalid_state_transition`) instead of a validation error.
- Verified and updated DELETE `/v2/loyalties/programs/{programId}/members/{memberId}`.
  - Added `LoyaltiesProgramsMembersDeleteResponseBody` schema (`Member` via `allOf`).
  - Clarified soft-delete: sets `status` to `DELETED` and returns the member without a `cards` array.
```

## OPEN-API.md — schema-only

```markdown
## 2026-08-26

Changed type `integer` to `number` in `exchange_ratio` in the `RedemptionRewardResult` schema.
```

## ARTICLES.md — one article + tickets

```markdown
## 2026-09-09

Updated `distribution-webhooks.mdx` with the **Send raw payload** behavior for default, custom, and legacy webhook configurations (DOC-1340 / DEV-3883 / DEV-4305).
```

## ARTICLES.md — theme plus file list

```markdown
## 2026-09-03

Removed leftover “standalone” campaign wording from dashboard articles and aligned it with **generic** (DOC-1180 / DEV-4102). API `STANDALONE` type is unchanged.

- Updated `dashboard-quickstart.mdx`
- Updated `approval-requests.mdx`
- Updated `key-concepts.mdx`
```

## ARTICLES.md — new pages

```markdown
## 2026-08-10

Published Loyalty v2 guides and Build articles:

- `loyalty-v2-overview.mdx`
- `loyalty-v2-integrate.mdx`
```
