# Contribution to Voucherify's documentation and API reference

## How the documentation is built

### Introduction

This guide explains how the Mintlify site is produced from this repository, and how to change the API reference and the guides. The repository map is in [README.md](./README.md). Publishing an SDK is described in [SDKS.md](./SDKS.md).

### Documentation structure

`documentation/` is the Mintlify site. `documentation/docs.json` is navigation, theme, and which OpenAPI file each API group uses. Prose is `*.mdx`.

The site tabs are:

- **Voucherify**, from `documentation/get-started/`
- **Developer guides**, from `documentation/guides/` and `documentation/integrations/`
- **User guides**, from `documentation/discover/`, `prepare/`, `build/`, `optimize/`, `orchestrate/`, `analyze/`, and `manage/`
- **API reference**, from `documentation/api-reference/` together with the generated OpenAPI files
- **Changelog**, from `documentation/changelog/`

Shared fragments live in `documentation/snippets/` and are imported by other pages. Sample files live in `documentation/examples/`.

Mintlify builds a preview only for a pull request whose base is `master`. A pull request into another branch does not get that preview.

`documentation/.mintlify/AGENTS.md` is Mintlify's writing guide for MDX components. It is not this contribution process.

### API reference

`reference/OpenAPI.json` is the source. It is OpenAPI 3.1.0 and it contains both `paths` and `webhooks`. Every other OpenAPI file is generated from it.

`npm run prepare-generated` refreshes the derived OpenAPI files and the schema tables. It does not regenerate SDK source. `npm run pre-commit` is the same command. CI runs it and fails if the working tree is dirty.

The split writes two kinds of Mintlify files, both still OpenAPI 3.1.0:

- `documentation/openapi/*.json` comes from `paths` and has no `webhooks` key. A group in `docs.json` points at one of these files with `"openapi": "/openapi/....json"` and lists operations as `METHOD /path`. Mintlify renders those endpoint pages from the operation.
- `documentation/openapi-events/*.json` comes from `webhooks`. An event page is MDX. Its `openapi` frontmatter names the webhook file and the event.

Paths under `/v2/loyalties` use tags that start with `LV2-`, such as `LV2-Programs`. The split writes every such path to `documentation/openapi/loyalties-v2.json` and removes the `LV2-` prefix in that file.

Schema pages under `documentation/api-reference/` are MDX. The pages listed in `scripts/mintlify/utils/md-tables.ts` are rewritten by `prepare-generated` from a downgraded view of the spec. Introduction pages in the same folder are written by hand.

`prepare-generated` runs `scripts/shared/fix-schemas-with-refs.ts` first. Where a `$ref` has sibling keywords, that script wraps them in `allOf` for schemas reachable from `paths`. OpenAPI 3.1 allows the `$ref` to keep those siblings. The wrap is there for later generators. The script leaves `webhooks` and `/v2/loyalties` as written.

Null in the source uses JSON Schema null. SDK and production specs are downgraded to OpenAPI 3.0.1, and that downgrade is what introduces `nullable`.

### Developer documentation

Developer pages explain how to call the API and how to connect other systems. They live in `documentation/get-started/`, `documentation/guides/`, and `documentation/integrations/`, in the groups `docs.json` already defines for those folders.

### User interface documentation

User-interface pages explain the dashboard. They live in `documentation/discover/`, `prepare/`, `build/`, `optimize/`, `orchestrate/`, `analyze/`, and `manage/`, in the groups `docs.json` defines for the User guides tab.

### API reference and SDKs

Published clients are built from the same source, through `reference/readonly-sdks/<lang>/OpenAPI.json`. `prepare-generated` writes those files. It does not regenerate the checkouts under `sdks/`.

SDK and production specs are OpenAPI 3.0.1. They omit `webhooks`, paths under `/v2/loyalties`, and any schema only those paths reach. `scripts/shared/get-take-list.ts` is the list of endpoints those specs include. A new endpoint stays off that list until an SDK release adds it.

Filters in `scripts/shared/prepare-open-api/remove-breaking-changes/` undo source changes that would break a published client. A change that should not affect published clients leaves `reference/readonly-sdks/` and `production/readOnly-openAPI.json` byte-for-byte unchanged.

Files under `sdks/` stay untouched during an OpenAPI or documentation change. A commit in this repository only stores the submodule SHA.

## How to change the documentation

### Add or edit a guide page

1. Choose the folder for the audience. Developer pages go in `get-started/`, `guides/`, or `integrations/`. User-interface pages go in `discover/`, `prepare/`, `build/`, `optimize/`, `orchestrate/`, `analyze/`, or `manage/`.
2. Add an `.mdx` file. Start it with `title` and `description` frontmatter.
3. Add the page path, without `.mdx`, to the matching group in `documentation/docs.json`.
4. Put text that several pages share in `documentation/snippets/` and import it:

```mdx
import TimeFrame from "/snippets/time-frame.mdx"
```

5. Open the pull request against `master` so Mintlify builds a preview.

### Change an endpoint

1. Edit the operation in `reference/OpenAPI.json`. Set its tag to the API group it belongs to.
2. In `documentation/docs.json`, add the operation to that group's `pages` as `METHOD /path`, for example `GET /v1/vouchers/{code}`. A new group also needs `"openapi": "/openapi/<tag-file>.json"`.
3. Leave `scripts/shared/get-take-list.ts` unchanged. A new endpoint is not added there, so the SDK specs omit it.
4. For a path under `/v2/loyalties`, tag the operation with an `LV2-` tag, such as `LV2-Programs`. The split writes it to `documentation/openapi/loyalties-v2.json`. SDK and production specs omit it.
5. To add or refresh a schema page, register the schema in `scripts/mintlify/utils/md-tables.ts`. `prepare-generated` writes `documentation/api-reference/<group>/<title>.mdx` from that entry, with the path lowercased and spaces turned into hyphens. Add that path to the group in `docs.json`. Edit the schema in `reference/OpenAPI.json`.
6. Run `npm run prepare-generated` and commit what it rewrites.
7. Open the pull request against `master` so Mintlify builds a preview.

Before you commit, confirm that the operation includes its query parameters, filters, body fields, and response fields, and that the change follows [Avoid a breaking SDK change](#avoid-a-breaking-sdk-change). When the change must stay out of published clients, `reference/readonly-sdks/` and `production/readOnly-openAPI.json` stay byte-for-byte unchanged.

### Add or change a webhook event

1. Add the event under `webhooks` in `reference/OpenAPI.json`. Use the `post` method. The webhook key is the event name, such as `EVENTS.CUSTOMER.CREATED`.
2. Set `tags` to a category that starts with `Events`, such as `Events customer`. A new category is a new tag. The split writes `documentation/openapi-events/events-customer.json` from that tag: lowercase, with spaces turned into hyphens.
3. When an API path already uses the payload schema, reference that schema. When the payload is a different object, give the schema a `Webhook` prefix.
4. Add an MDX page under `documentation/api-reference/` and list its path in the Events group in `docs.json`. The frontmatter points at the webhook file and the event name:

```yaml
---
title: "Created"
openapi: "/openapi-events/events-customer.json webhook EVENTS.CUSTOMER.CREATED"
---
```

5. Run `npm run prepare-generated` and commit the rewrite. A webhook-only schema stays out of `reference/readonly-sdks/` and `production/readOnly-openAPI.json`.

### Name a schema

Use PascalCase.

A schema that describes one operation (a 0-level model) follows `{Client?}{PathNameResult}{Action}{Differentiator?}{Request|Response}{Body|Query}`:

- `Client` is optional. Use it for client schemas.
- `PathNameResult` is `location.pathname` without `v1` and without path parameters, in PascalCase.
  - `/v1/rewards/{rewardId}/assignments` becomes `RewardsAssignments`
  - `/v1/rewards/{rewardId}/assignments/{assignmentId}` becomes `RewardsAssignments`
  - `/v1/rewards/{rewardId}/assignments/{assignmentId}/redemptions` becomes `RewardsAssignmentsRedemptions`
  - `/client/v1/rewards/{rewardId}/assignments/{assignmentId}/redemptions` becomes `ClientRewardsAssignmentsRedemptions`
- `Action` comes from the HTTP method or from what the endpoint does.
  - `Get` for one record, `List` for many
  - `Update` for one record, `UpdateInBulk` for many
  - `Delete` for one record
  - `Create` for one record, `CreateInBulk` for many
  - Or a verb such as `Track`, `Validate`, `Import`, or `Export`
- `Differentiator` is optional. Use it when a 0-level model contains only `oneOf`. The child model's `title` is its schema name in Title Case. Its `description` follows `{Response|Request} {Body|Query} schema for **{Method}** {Path}`, and names a second method and path when the schema serves both.
- `Request` or `Response`
- `Body` or `Query`

A 0-level model that needs a differentiator:

```json
"PublicationsCreateResponseBody": {
    "title": "Publications Create Response Body",
    "type": "object",
    "description": "Response body schema for **POST** `v1/publication` and **GET** `v1/publications/create`.",
    "oneOf": [
        {
            "$ref": "#/components/schemas/PublicationsCreateVoucherResponseBody"
        },
        {
            "$ref": "#/components/schemas/PublicationsCreateVouchersResponseBody"
        }
    ]
}
```

The child titles follow the same rule: `Voucher [PublicationsCreateVoucherResponseBody]`, `Vouchers [PublicationsCreateVouchersResponseBody]`. A shared part of those children is a `Base` model, such as `PublicationsCreateBaseResponseBody`.

A schema used by more than one operation takes a domain name, such as `Customer`, `Category`, `Discount`, or `DiscountUnit`. When part of a schema is shared, save that part as its own schema and include it with `allOf`.

Correct a schema whose name breaks this pattern.

A 0-level model has:

- `type` of `object` or `array` in most cases
- `title` equal to the schema name in Title Case
- `description` that points at the operation, for example: Response body schema for **GET** `v1/redemptions/{redemptionId}`
- `properties`, `oneOf`, or `allOf` for the fields or for `$ref`s to other schemas

```json
{
  "RedemptionsGetResponseBody": {
    "type": "object",
    "title": "Redemptions Get Response Body",
    "description": "Response body schema for **GET** `v1/redemptions/{redemptionId}`",
    "oneOf": [
      {
        "$ref": "#/components/schemas/Redemption"
      },
      {
        "$ref": "#/components/schemas/RedemptionRollback"
      }
    ]
  }
}
```

Two names for vouchers:

- The voucher shape used by many operations is `Voucher`.
- The 0-level model for `GET /v1/vouchers` is `VouchersListResponseBody`.

The general model is often the same object the `GET` response returns. `CategoriesGetResponseBody` can be a reference to `Category`. A `PUT` response usually needs its own model, because that response always includes `updated_at`.

### Write a schema

- For a literal union, use `enum`.
- For a type union, use `oneOf`.
- For a value that may be null, use a union such as `"type": ["string", "null"]`. For a reference that may be null, use `anyOf` of the `$ref` and `{ "type": "null" }`.
- For a value that is always null, use `"type": "null"`.
- For a date, use `"type": "string"` with `"format": "date-time"` or `"format": "date"`.
- For an object, set `required` to the list of required fields.
- A `$ref` may sit next to other keywords. OpenAPI 3.1 allows it.
- Leave out `writeOnly` and `readOnly`. They cause errors when the SDKs are generated.

Keep `nullable` out of `reference/OpenAPI.json` and out of `documentation/openapi*`. The SDK and production downgrade adds it.

### Avoid a breaking SDK change

These edits to `reference/OpenAPI.json` are safe for published SDKs:
- Changing a `title`
- Changing a `description`
- Adding a property to an object
- Reordering properties on a response object
- Adding a schema
- Removing a field from `required`
- Adding an `example`
- Adding a value to an existing `enum`

These edits break published SDKs:
- Adding a query parameter
- Deleting anything: a query parameter, a schema, a property, or similar
- Reordering query parameters
- Removing a query parameter that clients already send, such as `page` after paging changes
- Replacing an inline object with a `$ref`
- Removing a value from an `enum`
- Adding an `enum` to a schema that was only `"type": "string"`
- Adding `format`, or changing it, on a schema with `"type": "string"`
- Adding `default` (likely to break clients)
- Adding an `enum` value when the existing values share a prefix. That case needs a filter in `remove-breaking-changes/`

Changing `operationId` or `tags` on an existing operation is forbidden. A mapping is added when either one has to change.

### Filter a breaking change

To keep a breaking edit out of the SDK specs, undo it in `scripts/shared/prepare-open-api/remove-breaking-changes/<lang>.ts`. Each language file has `before` and `after`. `scripts/shared/prepare-open-api/index.ts` runs those functions while it writes `reference/readonly-sdks/<lang>/OpenAPI.json`.

Run `npm run prepare-generated` afterward. The SDK input files and `production/readOnly-openAPI.json` stay free of the breaking edit.

When a major SDK release should include the change, update the filters in `remove-breaking-changes/` so the change passes through. Version numbering for that release is in [SDKS.md](./SDKS.md).
