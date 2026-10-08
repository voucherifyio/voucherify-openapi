# prepare-open-api

This folder builds the OpenAPI document that OpenAPI Generator consumes. Agents change it; people do not hand-edit the generated SDK files to compensate.

Read this file before editing `index.ts`, `scripts/shared/openapi-version/`, or `scripts/shared/build-production-openapi.ts`.

## What is in and what is out

`reference/OpenAPI.json` is the source. It is OpenAPI 3.1.0 and may use JSON Schema keywords (`if`, `then`, `else`, `not`, `const`).

This folder writes `reference/readonly-sdks/<language>/OpenAPI.json`. That file is OpenAPI 3.0.1. Mintlify tag files (`documentation/openapi/*.json`, `documentation/openapi-events/*.json`) stay 3.1.0 and are produced by `scripts/mintlify/split-security-params-then-split-openapi-by-tags.ts`, not by this folder.

`production/readOnly-openAPI.json` is also 3.0.1. `scripts/shared/build-production-openapi.ts` downgrades the source the same way, then drops paths that are not published yet. It does not run the language-specific cleanup in `index.ts`.

Do not edit files under `sdks/`. A commit here only stores a submodule SHA, and that SHA changes only when publishing an SDK.

## Entry point

`npm run prepare-open-api -- --language=<language>` runs `index.ts`. `downgradeTo301` stays `true` for every language in `supportedLanguages`. The generator jars pinned in `package.json` still expect 3.0.1 `nullable`.

`index.ts` is the language loop and the place for one-off cleanups that already live there (AsyncAction, the `Any` schema, the campaign-template query parameter). New keyword rewrites do not go in `index.ts`. Put them in their own module with tests, and call that module from the downgrade step.

## Order inside `main`

1. Drop Loyalty v2 paths and the schemas only those paths reach (`documentWithoutLoyaltyV2`). Schemas that a non-loyalty path also reaches stay.
2. Downgrade 3.1.0 to 3.0.1 when `downgradeTo301` is set (`applySdkOpenApiVersion` in `scripts/shared/openapi-version/migrate.ts`).
3. Reject a document that still contains `readOnly` or `writeOnly`.
4. Run the in-file cleanups, then `fixBreakingChanges.before` for that language.
5. Fill missing defaults, drop deprecated operations, and drop parameters and schemas nothing reachable still references.
6. PHP wraps non-object schemas. Every language then flattens `oneOf` (`removeOneOfs.ts`).
7. Keep only successful responses, copy `allOf` into a single object where the generators require that, turn `type: "null"` into a 3.0 nullable object, and fix titles.
8. Drop unused schemas again. .NET also drops `default`. Languages without OAuth support drop the OAuth security scheme.
9. Drop `webhooks` and the Loyalty v2 envelope, clean descriptions, run `fixBreakingChanges.after`, shorten Ruby titles, and write the file.

`removeOneOfs.ts` is lossy on purpose. Branches become one object. A rule that the generator cannot express stays in a description, and the API enforces it.

## Version keywords

`scripts/shared/openapi-version/migrate.ts` is reversible for `nullable` and for `const`.

- `nullable: true` becomes a `null` union, or `anyOf` with `{ "type": "null" }` when the schema is a composition or a `$ref`. Downgrade puts `nullable` back. The marker `x-openapi-30-nullable-index` remembers a `nullable` key that was not sitting next to `type`.
- `const` becomes a one-value `enum` plus `x-openapi-31-const`. Upgrade restores `const` only when that marker is present, so a hand-written one-value `enum` stays an enum.
- `downgradeOpenApi310To301` leaves `if`, `then`, `else`, and `not` in place. It only rewrites `const` inside them. That is what keeps the round trip exact.

`if`, `then`, `else`, and `not` are JSON Schema. OpenAPI 3.0.1 and the pinned generators do not implement them. A generator-facing document has to replace each such branch with one object: keep the properties already declared on the parent, keep the parent's `required`, and say in a description that the API validates the combination. Do not promote a branch `required` array onto the parent, and do not replace a parent property with `type: "null"` from a single branch.

`mergeJsonSchemaConditionals` in `scripts/shared/openapi-version/merge-json-schema-conditionals.ts` does that fold. It leaves `const` untouched. `applySdkOpenApiVersion` runs it after the reversible downgrade. `index.ts` and `build-production-openapi.ts` both use that entry, so SDK files and `production/readOnly-openAPI.json` get the fold. `npm run openapi:downgrade-to-301` stays reversible and still leaves `if` / `then` / `not` in place. Markdown tables call `ensureOpenApi301` and do not fold.

The full source cannot be downgraded as a whole. Some Loyalty v2 schemas use `type: ["null"]`, which has no 3.0.1 `nullable` form. Strip Loyalty v2 first, then downgrade. `npm run openapi:downgrade-to-301` runs the reversible downgrade on whatever file you pass and still throws on that union.

## What must stay byte-identical

A change that should not affect published clients leaves `reference/readonly-sdks/` and `production/readOnly-openAPI.json` byte-for-byte unchanged. Webhook-only schemas are in that set, because reachability starts at `paths`. Loyalty-only schemas are in that set too, because step 1 deletes them before downgrade.

Shared schemas are not in that set. A schema reached by a non-loyalty path is still in the downgraded document even when its name starts with `LoyaltyV2`. If it is unused after deprecated paths are removed, a later step deletes it. If it survives into a published file, editing it changes that file.

## Checks

From the repository root:

```bash
npm test -- --ci --watchman=false scripts/shared/openapi-version/migrate.test.ts scripts/shared/openapi-version/merge-json-schema-conditionals.test.ts scripts/shared/prepare-open-api/supported-languages.test.ts
```

After a change that can affect published output, run `npm run prepare-open-api -- --language=ruby` and `npm run build-production-openapi`, then inspect `git diff` for those JSON files. Diagnostics printed by the prep (`DESCRIPTIONS ARE NOT THE SAME`, `"DEFAULT" IS NOT A STRING`, `not found ... in schemas`) do not fail the script.
