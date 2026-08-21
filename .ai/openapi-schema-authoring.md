# OpenAPI Schema Authoring Guide (AI)

> **Audience:** AI agents and developers editing `reference/OpenAPI.json`.  
> **Last updated:** 2026-08-21  
> **Human-readable summary:** see also [CONTRIBUTING.md § Naming Convention](../CONTRIBUTING.md#naming-convention) and [SDKS.md § Breaking changes](../SDKS.md#breaking-changes).

---

## 1. Golden rules

1. **Edit only** `reference/OpenAPI.json` (and `reference/OpenAPIWebhooks.json` for webhook events). Every other OpenAPI file is generated.
2. **Schema keys in `components.schemas` are the SDK type contract.** Renaming a key is a **major** breaking change across Ruby, Python, Java, PHP, .NET, and JS.
3. **Reuse domain models via `$ref` / `allOf`, but give each endpoint its own 0-level wrapper** (`*RequestBody` / `*ResponseBody`) even when the payload is identical to a shared model.
4. **Never use** `readOnly`, `writeOnly`, or rename `operationId` / endpoint `tags`.
5. **After edits:** run `npm run fix-schemas-with-refs`, then validate with `npm run count-important-statistics-about-openapi`.

---

## 2. Repository layout & data flow

```
reference/OpenAPI.json          ← SOURCE OF TRUTH (edit here)
        │
        ├── prepare-open-api --language={ruby|python|java|php|dotnet|js}
        │         └── reference/readonly-sdks/{lang}/OpenAPI.json  → OpenAPI Generator → sdks/{lang}/
        │
        ├── split (pre-commit / mintlify scripts)
        │         └── documentation/openapi/{tag}.json             → Mintlify docs (NOT used for SDKs)
        │
        └── build-production-openapi
                  └── production/readOnly-openAPI.json             → external client-facing spec
```

| Artifact | Used for SDK generation? | Schema names preserved? |
|----------|--------------------------|-------------------------|
| `reference/OpenAPI.json` | Indirectly | As authored |
| `reference/readonly-sdks/{lang}/OpenAPI.json` | **Yes — generator input** | Keys preserved; shapes transformed |
| `documentation/openapi/*.json` | No | Same keys as source |
| `production/readOnly-openAPI.json` | No | Subset of source |

**Scale (approx.):** ~101k lines, ~1,195 component schemas, ~175 paths, ~3,028 `$ref` usages.

---

## 3. File structure inside `reference/OpenAPI.json`

```json
{
  "openapi": "3.0.1",
  "info": { ... },
  "tags": [ ... ],
  "components": {
    "securitySchemes": { ... },
    "parameters": { ... },          // 18 shared query/path params (limit, page, code, …)
    "schemas": { ... },               // ~1,195 schemas — MAIN CATALOG
    "examples": { ... }               // 3 reusable examples
  },
  "paths": { ... }                    // 175 endpoints — NO components.responses section
}
```

### How paths wire schemas

**Request body** (preferred pattern):

```json
"requestBody": {
  "content": {
    "application/json": {
      "schema": { "$ref": "#/components/schemas/QualificationsCheckEligibilityRequestBody" }
    }
  }
}
```

**Response body:**

```json
"responses": {
  "200": {
    "content": {
      "application/json": {
        "schema": { "$ref": "#/components/schemas/VouchersListResponseBody" }
      }
    }
  }
}
```

**Parameters:** either `$ref` to `components.parameters/limit` or inline with `"schema": { "$ref": "#/components/schemas/ParameterCode" }`.

**Avoid inline schemas in paths** — only ~12 legacy cases remain; always use `$ref`.

---

## 4. Schema taxonomy — four levels

Understanding which kind of schema you are creating determines naming and reuse strategy.

### 4.1. 0-level (endpoint) schemas — **stable SDK class per operation**

Bound to exactly one HTTP operation (or a small set sharing the same body). These become top-level SDK model classes.

**Naming pattern:**

```
{Client?}{PathNameResult}{Action}{Differentiator?}{Request|Response}{Body|Query}
```

| Segment | Rule | Example |
|---------|------|---------|
| `Client?` | Prefix for `/client/v1/...` endpoints | `ClientValidationsValidateRequestBody` |
| `PathNameResult` | Path without `/v1/` and `{params}`, PascalCase | `/v1/rewards/{rewardId}/assignments` → `RewardsAssignments` |
| `Action` | HTTP verb mapping or domain verb | `List`, `Get`, `Create`, `Update`, `Delete`, `CreateInBulk`, `UpdateInBulk`, `Validate`, `Export`, `Import` |
| `Differentiator?` | When parent uses `oneOf` for variants | `PublicationsCreateVoucherResponseBody` |
| `Request\|Response` | Direction | Always one of these |
| `Body\|Query` | Payload location | Usually `Body`; `Query` for GET query-object schemas |

**Required metadata on every 0-level schema:**

```json
{
  "VouchersGetResponseBody": {
    "type": "object",
    "title": "Vouchers Get Response Body",
    "description": "Response body schema for **GET** `v1/vouchers/{code}`.",
    "allOf": [{ "$ref": "#/components/schemas/Voucher" }]
  }
}
```

- `title` — human-readable; should match the schema key semantically (Title Case words).
- `description` — **must** include HTTP method and path: `` `{Request|Response} body schema for **{METHOD}** \`{path}\`.` ``

**Why separate wrappers when content is identical?**

```json
"VouchersGetResponseBody": {
  "allOf": [{ "$ref": "#/components/schemas/Voucher" }]
},
"VouchersUpdateResponseBody": {
  "allOf": [{ "$ref": "#/components/schemas/Voucher" }]
}
```

Both reference `Voucher`, but SDKs generate **distinct classes** (`VouchersGetResponseBody` vs `VouchersUpdateResponseBody`). This lets us evolve one endpoint's response without breaking others. **Never collapse these into a single shared 0-level name.**

### 4.2. General (domain) schemas — **long-lived shared types**

Used across multiple endpoints. Short domain names:

- `Customer`, `Voucher`, `Discount`, `Order`, `Redemption`, `Category`, …
- Often split: `CustomerBase` (field bundle) + `Customer` (composed model)
- Reduced variants for lists/nesting: `SimpleCustomer`, `SimpleVoucher`

**Rule:** Renaming `Voucher` → `VoucherObject` breaks every SDK import site. Treat general schema names as **immutable** unless shipping a major SDK release.

### 4.3. Parameter schemas

| Prefix | Purpose | Examples |
|--------|---------|----------|
| `Parameter{Field}` | Reusable primitive/enum for path or query | `ParameterCode`, `ParameterOrder`, `ParameterBoolean` |
| `ParameterFilters{Resource}` | Complex filter object for list endpoints | `ParameterFiltersListLocations` |
| `FilterConditions{Type}` | Reusable filter operators | `FilterConditionsString`, `FilterConditionsDateTime` |
| `FieldConditions` | Wrapper with `conditions` key | Used ~63 times across filters |

### 4.4. Nested / inline-derived schemas — **auto-named by pipeline**

When you define an inline `type: object` inside a property (instead of `$ref`), the `prepare-open-api` pipeline auto-generates nested model names via `fixSchemasTitles()`:

```
{ParentSchemaKey}{PropertyNameInPascalCase}
```

Examples:
- Property `redemptions` under `RedemptionsListResponseBody` → `RedemptionsListResponseBodyRedemptions`
- Array items → suffix `Item` (e.g. `VouchersListResponseBodyItemsItem`)
- `additionalProperties` maps → suffix `Entry`

**Implication for AI:** Renaming a property key (e.g. `loyalty` → `loyaltyProgram`) renames all nested SDK types derived from it. Prefer `$ref` to a named general schema when the nested object is reused.

---

## 5. Reusability patterns — decision tree

```
Is this schema tied to ONE endpoint's request/response?
├── YES → Create 0-level *RequestBody / *ResponseBody
│         Compose from general models via $ref / allOf
└── NO  → Is it a query/path parameter type?
          ├── YES → Parameter* or FilterConditions*
          └── NO  → Is it a domain entity (Customer, Voucher, …)?
                    ├── YES → General schema with short name
                    └── NO  → Is it shared field bundle?
                              ├── YES → *Base schema + allOf composition
                              └── NO  → Is it a polymorphic union?
                                        ├── Literal values → enum
                                        └── Different shapes → oneOf (+ Differentiator names)
```

### 5.1. `$ref` — primary reuse mechanism

Reference an existing schema without duplication:

```json
"customer": {
  "description": "Customer's information.",
  "allOf": [{ "$ref": "#/components/schemas/Customer" }]
}
```

**Why `allOf` wrapper around `$ref`?** OpenAPI 3.0 does not allow sibling keywords (`nullable`, `description`) next to bare `$ref`. Always wrap when you need metadata alongside a reference. Run `npm run fix-schemas-with-refs` to auto-fix violations.

### 5.2. `allOf` — composition & extension

| Pattern | When to use | Example |
|---------|-------------|---------|
| **Alias wrapper** | 0-level response ≡ domain model | `VouchersGetResponseBody` = `allOf: [Voucher]` |
| **Base + extension** | Shared fields + context-specific fields | `Voucher` = `VoucherBase` + categories |
| **Shared part + endpoint fields** | Common response envelope + variant | `PublicationsCreateBaseResponseBody` extended by children |
| **Nullable ref workaround** | `$ref` + `nullable: true` | `{ "allOf": [{ "$ref": "..." }], "nullable": true }` |

### 5.3. `oneOf` — type unions (not literal enums)

Used when the JSON shape differs by variant (~133 uses). **No `discriminator`** in this repo.

```json
"PublicationsCreateResponseBody": {
  "title": "Publications Create Response Body",
  "type": "object",
  "description": "Response body schema for **POST** `v1/publications`.",
  "oneOf": [
    { "$ref": "#/components/schemas/PublicationsCreateVoucherResponseBody" },
    { "$ref": "#/components/schemas/PublicationsCreateVouchersResponseBody" }
  ]
}
```

**Differentiator child naming:**
- Parent: `PublicationsCreateResponseBody`
- Children: `PublicationsCreateVoucherResponseBody`, `PublicationsCreateVouchersResponseBody`
- Child `title`: Title Case differentiator only (`"Voucher"`, `"Vouchers"`)

**SDK note:** `removeOneOfs.ts` flattens many `oneOf` branches before generation. Source spec keeps `oneOf` for documentation accuracy; SDKs may see merged shapes. Do not rely on SDK union types matching source `oneOf` 1:1.

### 5.4. `enum` vs `oneOf`

| Need | Use |
|------|-----|
| Fixed string/number literals | `"enum": ["active", "inactive"]` |
| Structurally different object shapes | `oneOf` with `$ref` to variant schemas |
| Nullable field | `"nullable": true` (never `"type": "null"` alone in new schemas) |

### 5.5. `Simple*` variants

For list items and nested objects where the full domain model is too heavy:

- `SimpleCustomer` (~41 refs) — reduced customer in nested contexts
- `SimpleVoucher` (~36 refs) — reduced voucher in nested contexts

Use when the API actually returns fewer fields than the full `Customer` / `Voucher`.

### 5.6. When to extract vs inline

| Situation | Strategy |
|-----------|----------|
| Same object shape in 2+ endpoints | Extract general schema + `$ref` |
| Endpoint-specific envelope (pagination, `object: "list"`) | Keep in 0-level `*ResponseBody` |
| Shared field group across 2+ schemas | Extract `*Base` schema |
| One-off nested object, never reused | Inline `type: object` (accepts auto-generated nested SDK name) |
| POST vs PUT differ (e.g. `updated_at` only in PUT response) | Separate `*RequestBody` / `*ResponseBody`; do not reuse GET response schema for PUT |

---

## 6. SDK breaking changes — what renames actually break

From [SDKS.md](../SDKS.md). **Major version** required for:

| Change | Why it breaks SDKs |
|--------|-------------------|
| Renaming `components.schemas` key | Class/module/import name changes in all 6 languages |
| Deleting schema or property | Compile errors in consumer code |
| Adding query parameter | Method signature changes |
| Reordering query parameters | Positional arg breakage (some languages) |
| Inline object → `$ref` (or reverse) | Creates/destroys nested model classes |
| `enum` value deletion or prefix change | Generated enum constants change |
| Adding `format` to string | Type narrowing in some generators |
| Adding `default` | Constructor/signature changes |
| Changing `operationId` | **FORBIDDEN** — drives client method names |
| Changing endpoint `tags` | **FORBIDDEN** — drives API class grouping |

### What does NOT cause a rename break

- Changing `description`, `example`, `title` (human-readable) — **as long as the schema key stays the same**
- Adding optional properties to response schemas (minor version)
- Adding new endpoints with new schema keys (minor version)

### Mitigation layer: `remove-breaking-changes/`

When a schema change is **correct in the API** but would break published SDKs, add a per-language revert in:

```
scripts/shared/prepare-open-api/remove-breaking-changes/{ruby,python,java,php,dotnet,js}.ts
```

These run `before()` and `after()` hooks around the prepare pipeline. Examples:
- Restore removed query params
- Revert `$ref` → inline for specific properties
- Restore old enum values
- Strip new filter properties

**Before a major SDK release:** disable accumulated mitigations in `index.ts` so all deferred breaking changes land together ([SDKS.md § Releasing a major version](../SDKS.md#releasing-a-major-version)).

---

## 7. Prepare-open-api pipeline — transforms that affect your schemas

Order of operations in `scripts/shared/prepare-open-api/index.ts`:

1. **Prohibited check** — throws if `readOnly` / `writeOnly` found
2. **Cleanup** — remove Stoplight tags, simplify `AsyncAction.result`, strip `CustomerActivity.data` details
3. **`fixBreakingChanges.before(lang)`** — language-specific pre-patches
4. **`getPathsWithoutDeprecated`** — remove deprecated endpoints
5. **`removeNotUsedSchemas`** — prune schemas not reachable from active paths
6. **`removeAllOneOfs`** — flatten polymorphic unions for SDK output
7. **`copySchemasIfUsedAsAllOfInBase`** — inline single-`$ref` `allOf` bases into concrete objects
8. **`fixSchemasTitles`** — set `title` = schema key; derive nested titles from property paths
9. **`fixBreakingChanges.after(lang)`** — language-specific post-patches
10. **`shortenRubySchemaTitles`** (Ruby only) — gem filename ≤100 bytes limit

### Nested title algorithm (`fixSchemasTitles`)

For property `order_items` under `LoyaltiesEarningRulesCreateRequestBody`:

```
LoyaltiesEarningRulesCreateRequestBody + OrderItems
→ LoyaltiesEarningRulesCreateRequestBodyOrderItems
```

Special suffixes:
- Array `items` → `{Parent}Item`
- `additionalProperties` → `{Parent}Entry`

**Ruby constraint:** If a derived title exceeds gem build limits, add a shortening entry to `shorten-ruby-schema-titles.ts`.

---

## 8. Step-by-step workflows

### 8.1. Add a new endpoint

1. Add path under `paths` with `operationId`, `tags`, parameters, requestBody, responses.
2. Create `{Resource}{Action}RequestBody` in `components.schemas` (if POST/PUT/PATCH).
3. Create `{Resource}{Action}ResponseBody` in `components.schemas`.
4. Set `title`, `description` (method + path) on both.
5. Compose body from existing domain schemas via `$ref` / `allOf`.
6. Wire `$ref` in path — no inline schemas.
7. Run:
   ```bash
   npm run fix-schemas-with-refs
   npm run count-important-statistics-about-openapi
   npm run prepare-open-api -- --language=ruby   # spot-check one language
   ```

### 8.2. Add fields to an existing domain model

1. Edit the **general** schema (e.g. `Voucher`) — field appears wherever `$ref`'d.
2. **Do not rename** the schema key.
3. New fields should be **optional** (not in `required`) unless the API truly requires them everywhere.
4. 0-level wrappers (`VouchersGetResponseBody`) that `allOf`-ref the model inherit new fields automatically.
5. Check if any `remove-breaking-changes` hook strips the field — if so, update the hook when ready to ship the change.

### 8.3. Refactor legacy schema names

Legacy Stoplight names (~242 remain): `1_req_vouchers_code_POST`, `1_obj_voucher_object_discount_amount_POST`.

**When touching a legacy endpoint:**
1. Rename to modern convention: `VouchersUpdateRequestBody`, etc.
2. Update all `$ref` targets in paths and other schemas.
3. This is a **major SDK breaking change** — either:
   - Coordinate with a major SDK release, OR
   - Add `remove-breaking-changes` alias patches until then.

Automated checker skips endpoints where schema names contain `_` (legacy marker).

### 8.4. Add a polymorphic response

1. Create `{Endpoint}{Variant}ResponseBody` for each variant (Differentiator in name).
2. Create parent `{Endpoint}ResponseBody` with `oneOf` refs to variants.
3. Set variant `title` to Title Case differentiator.
4. Verify flattening: inspect `reference/readonly-sdks/ruby/OpenAPI.json` after prepare.

### 8.5. Add list endpoint with filters

1. Create `{Resources}ListResponseBody` with pagination envelope (`object`, `data`, `total`, …).
2. Reuse `ParameterFilters{Resource}` or create new filter schema composing `FilterConditions*`.
3. Wire query params — prefer `$ref` to `components.parameters` or `Parameter*` schemas.

### 8.6. Reformat existing schema (AI task)

When asked to "clean up" or "reformat" a schema without changing API semantics:

**Safe:**
- Fix `description` / `title` text
- Extract repeated property groups into `*Base` + `allOf` (keep original 0-level key)
- Replace duplicate inline objects with `$ref` to existing general schemas
- Add missing `required` arrays
- Run `fix-schemas-with-refs`

**Unsafe (requires explicit approval + major version plan):**
- Renaming schema keys
- Renaming property keys (changes nested SDK type names)
- Merging separate 0-level wrappers
- Converting inline → `$ref` or vice versa
- Changing `oneOf` structure

---

## 9. Validation & verification checklist

Run after every schema edit session:

```bash
# 1. Fix ref+nullable/allOf issues
npm run fix-schemas-with-refs

# 2. Naming & statistics (flags wrong *RequestBody/*ResponseBody suffixes)
npm run count-important-statistics-about-openapi

# 3. Spot-check SDK spec for one language
npm run prepare-open-api -- --language=ruby

# 4. Full pre-commit pipeline (before PR)
npm run pre-commit
```

**Manual checks:**
- [ ] Schema key matches naming convention (§4.1 or §4.2)
- [ ] 0-level schema has `description` with method + path
- [ ] No `readOnly` / `writeOnly`
- [ ] No bare `$ref` with sibling keywords (nullable, description)
- [ ] Path uses `$ref`, not inline schema
- [ ] `operationId` and `tags` unchanged on existing endpoints
- [ ] If renamed anything: grep `sdks/` and `remove-breaking-changes/` for impact

---

## 10. Real examples from the codebase

### General model with Base split

```
CustomerBase   — shared field bundle (name, email, metadata, …)
Customer       — id + source_id object composed with CustomerBase via allOf
SimpleCustomer — reduced variant for nested/list contexts
```

### 0-level wrapper reusing domain model

```
VouchersGetResponseBody:
  allOf: [Voucher]
  → SDK class VouchersGetResponseBody, fields from Voucher

VouchersListResponseBody:
  properties: { object, data: [VoucherWithCategories], total, … }
  → list envelope + item refs
```

### Polymorphic domain type

```
Discount:
  oneOf: [DiscountAmount, DiscountUnit, DiscountPercent, DiscountFixed]
  → SDK flattening merges variants; keep oneOf in source for docs
```

### Parameter reuse

```
ParameterCode          — reused across many path params
ParameterFiltersListLocations — composes FilterConditionsString, FilterConditionsDateTime
FieldConditions        — { conditions: { … FilterConditions* … } }
```

### Client-side prefix

```
/client/v1/validations/validate → ClientValidationsValidateRequestBody
```

---

## 11. Anti-patterns — never do these

| Anti-pattern | Why |
|--------------|-----|
| Rename published `components.schemas` key | Major SDK break |
| Use legacy `1_req_*` / `1_obj_*` names on new schemas | Fails naming checker; unclear SDK classes |
| Inline schemas in `paths` | Bypasses reuse, pruning, and naming conventions |
| `readOnly` / `writeOnly` | Pipeline throws; generators fail |
| `$ref` + sibling `nullable` without `allOf` wrapper | Invalid/unstable; run fix script |
| Collapse multiple 0-level wrappers into one shared name | Prevents per-endpoint SDK evolution |
| Change `operationId` or `tags` | Forbidden — breaks docs and SDK method grouping |
| Hand-edit `readonly-sdks/`, `documentation/openapi/`, or `sdks/` | All generated; changes will be overwritten |
| Deep nesting without `$ref` for reusable objects | Explosion of auto-generated long nested type names |
| Assume SDK `oneOf` unions match source spec | Pipeline flattens many unions |

---

## 12. Legacy naming reference (do not emulate)

~242 schemas still use Stoplight-era names:

```
1_req_vouchers_code_POST
1_obj_voucher_object_discount_amount_POST
2_req_examine_qualification
6_res_validate_promotion_tier
```

When AI encounters these during a refactor: rename to modern convention **only if** the user explicitly accepts SDK major version impact or provides a migration/mitigation plan.

---

## 13. Related files

| File | Purpose |
|------|---------|
| [CONTRIBUTING.md](../CONTRIBUTING.md) | Human contributor guide (naming, good practices) |
| [SDKS.md](../SDKS.md) | SDK generation, versioning, breaking changes |
| [README.md](../README.md) | Repo structure, pipeline overview |
| [scripts/shared/prepare-open-api/index.ts](../scripts/shared/prepare-open-api/index.ts) | Main SDK prep pipeline |
| [scripts/shared/fix-schemas-with-refs.ts](../scripts/shared/fix-schemas-with-refs.ts) | Nullable + `$ref` fixer |
| [scripts/shared/count-important-statistics-about-openapi.ts](../scripts/shared/count-important-statistics-about-openapi.ts) | Naming validation |
| [scripts/shared/prepare-open-api/remove-breaking-changes/](../scripts/shared/prepare-open-api/remove-breaking-changes/) | Per-language SDK compatibility patches |
| [production/ENDPOINTS-COVERAGE.md](../production/ENDPOINTS-COVERAGE.md) | Which endpoints are in production/SDK specs |

---

## 14. Quick prompt for AI agents

When building or reformatting schemas in this repo, follow this prompt:

> Edit `reference/OpenAPI.json` only. Use PascalCase schema keys. For endpoints, create `{Path}{Action}{Request|Response}{Body}` wrappers that compose shared domain models via `$ref`/`allOf` — never rename existing schema keys without explicit approval. Use `Parameter*` for reusable params, `*Base` for shared field bundles, `oneOf` for structural unions, `enum` for literal unions. Wrap `$ref` with `allOf` when adding nullable/description. No `readOnly`/`writeOnly`. Do not change `operationId` or `tags`. After edits run `npm run fix-schemas-with-refs` and `npm run count-important-statistics-about-openapi`. Treat schema keys as immutable SDK public API.
