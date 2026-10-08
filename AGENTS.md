# Agent guide

This repository holds the Voucherify OpenAPI source, the Mintlify documentation site, and checkouts of the published SDK repositories.

`README.md` and `CONTRIBUTING.md` still describe an older readme.io layout. Prefer this file and `package.json` when they disagree.

## Edit the source, then regenerate

Change the API in `reference/OpenAPI.json`. It is OpenAPI 3.1.0 and it contains both `paths` and `webhooks`.

After a spec or generator change, run:

```bash
npm run prepare-generated
```

`npm run pre-commit` is the same command. Commit whatever it rewrites. CI runs this command and fails if the working tree is dirty.

`prepare-generated` does not regenerate SDK source code. It only refreshes the derived OpenAPI files and the Markdown tables.

## Two outputs from one source

| Output | Path | OpenAPI | `webhooks` key | Who reads it |
|--------|------|---------|----------------|--------------|
| Source | `reference/OpenAPI.json` | 3.1.0 | yes | Humans and the generators |
| Mintlify API tags | `documentation/openapi/*.json` | 3.1.0 | no | `documentation/docs.json` (`"openapi": "/openapi/....json"`) |
| Mintlify events | `documentation/openapi-events/*.json` | 3.1.0 | the operations live here | MDX `openapi:` frontmatter |
| SDK input | `reference/readonly-sdks/<lang>/OpenAPI.json` | 3.0.1 | no | `npm run generate-sdk-<lang>` |
| Public spec | `production/readOnly-openAPI.json` | 3.0.1 | no | External consumers |

Languages under `reference/readonly-sdks/` are `ruby`, `java`, `php`, `python`, `js`, and `dotnet`.

`documentation/openapi/loyalties-v2.json` is one file for every path under `/v2/loyalties`. Operation tags there start with `LV2-` (`LV2-Programs`, `LV2-Rewards`, and the other loyalty tags) so they do not join an API tag such as `Rewards`. The tag split merges every `LV2-` tag into that one file the same way it writes `oauth.json`: main info and servers, security from the operation, schemas from `$ref`. It removes the `LV2-` prefix in that file, so the operations still show `Programs` and `Rewards`. Those schemas use their own names in `reference/OpenAPI.json`. A schema is not copied again when an existing schema has the same body and its name ends with the loyalty name. A `VL` prefix remains only when that name already belongs to an API schema (`BadRequest`, `MemberActivity`, `MemberActivityData`). SDK and production specs omit `/v2/loyalties` and any schema only those paths reach, because those paths are not on the SDK allowlist.

Null in 3.1 is `"type": "null"` or a union such as `"type": ["string", "null"]`. A nullable reference is `anyOf` of the `$ref` and `{ "type": "null" }`. Do not write the OpenAPI 3.0 keyword `nullable` into `reference/OpenAPI.json` or into `documentation/openapi*`. SDK and production specs are downgraded to 3.0.1, and that downgrade is what introduces `nullable`.

`downgradeTo301` in `scripts/shared/prepare-open-api/index.ts` stays `true` for every language. The OpenAPI Generator versions pinned in `package.json` still expect 3.0.1. `scripts/shared/prepare-open-api/AGENTS.md` is the map of that generator pipeline. Read it before editing `prepare-open-api` or the 3.0.1 downgrade.

## What `prepare-generated` runs

1. `scripts/shared/fix-schemas-with-refs.ts` — on the 3.1 source, a `$ref` cannot sit next to other keywords. The script wraps those in `allOf` for schemas reachable from `paths`. It does not walk `webhooks` or `/v2/loyalties`. The rewrite is `JSON.stringify` with no trailing spaces.
2. `scripts/mintlify/split-security-params-then-split-openapi-by-tags.ts` — writes `documentation/openapi` from `paths` and `documentation/openapi-events` from `webhooks`. Both stay 3.1.0. The round-trip key `x-openapi-30-nullable-index` is stripped. Tags that start with `LV2-` are written together to `loyalties-v2.json` with that prefix removed.
3. `scripts/shared/generate-endpoints-coverage-doc.ts` — coverage notes.
4. `scripts/mintlify/build-update-md-tables-from-openapi.ts` — Markdown tables inside the docs. It reads a downgraded view of the spec.
5. `scripts/shared/prepare-open-api/index.ts` once per language — writes `reference/readonly-sdks/<lang>/OpenAPI.json`.
6. `scripts/shared/build-production-openapi.ts` — writes `production/readOnly-openAPI.json`.

SDK prep and the production build both:

- drop Loyalty v2 paths and schemas only those paths reach before downgrade (`documentWithoutLoyaltyV2`)
- downgrade 3.1.0 to 3.0.1 (`scripts/shared/openapi-version/migrate.ts`)
- drop the `webhooks` key (`omitWebhooks` in `scripts/shared/openapi-webhooks/reachable-schemas.ts`)
- keep only schemas reachable from `paths`
- turn a bare `"type": "null"` into an OpenAPI 3.0 nullable object (`parseNullsToNullableObjects`)

SDK prep also flattens `oneOf`, applies per-language files in `scripts/shared/prepare-open-api/remove-breaking-changes/`, and prints old diagnostics (`DESCRIPTIONS ARE NOT THE SAME`, `"DEFAULT" IS NOT A STRING`, `not found ... in schemas`). Those lines do not fail the script.

A spec change that should not affect published clients must leave `reference/readonly-sdks/` and `production/readOnly-openAPI.json` byte-for-byte unchanged. Webhook-only schemas are in that category, because reachability starts at `paths`.

## SDK repositories

`sdks/ruby`, `sdks/java`, `sdks/php`, `sdks/python`, `sdks/js`, and `sdks/dotnet` are git submodules. Each has its own remote, listed in `.gitmodules`. A commit in this repository only stores the submodule SHA.

Do not edit files under `sdks/` as part of an OpenAPI or docs change. Do not commit a submodule SHA change unless the task is to publish a new SDK.

`npm run generate-sdk-<lang>` is that publish step. It prepares `reference/readonly-sdks/<lang>/OpenAPI.json`, runs OpenAPI Generator with `mustache-templates/`, then applies small fixes in `scripts/sdks/<lang>/`. `npm run generate-sdks` runs every language. `npm run test-<lang>-sdk` builds the SDK Docker image and runs its tests.

## Documentation site

`documentation/` is the Mintlify site.

- `docs.json` is navigation, theme, and which OpenAPI file each API group uses.
- `documentation/**/*.mdx` is prose. Event pages point at a file with frontmatter like `openapi: "/openapi-events/events-customer.json webhook EVENTS.CUSTOMER.CREATED"`.
- `documentation/.mintlify/AGENTS.md` is Mintlify's own writing guide for MDX components. It is not this repository map.

Mintlify builds a preview only for a pull request whose base is the deployment branch (`master`). A pull request into another branch does not get that preview.

## Other directories

| Path | Role |
|------|------|
| `scripts/shared/openapi-version/` | Reversible 3.0.1 ↔ 3.1.0 conversion. CLIs: `npm run openapi:upgrade-to-310` and `npm run openapi:downgrade-to-301`. |
| `scripts/shared/openapi-webhooks/` | `reachable-schemas.ts` is used by SDK prep, production, and `fix-schemas-with-refs`. `merge.ts` is covered by a test of the committed spec. |
| `scripts/mintlify/output/` | Scratch Markdown from the table builder. |
| `mustache-templates/` | OpenAPI Generator templates per language. |
| `openapi-generator-jar/` | Generator jars invoked by `generate-sdk-*`. |
| `changelog/` | Changelog notes for this repository. |
| `reference/split-openapi-by-tags/` | Old tag split. The current generator writes `documentation/openapi` instead. |

## CI

`.github/workflows/prepare-generated.yml` runs on a non-draft pull request into any base. It runs the unit tests under `scripts/`, then `npm run prepare-generated`, then fails if `git status` is not clean.
