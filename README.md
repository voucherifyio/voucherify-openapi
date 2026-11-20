# Voucherify OpenAPI Specification and SDK

This repository contains OpenAPI specifications for the Voucherify API and all resources necessary for generating SDKs and documentation. It uses Git submodules to manage generated SDKs and includes scripts for processing OpenAPI specifications.

## Repository Structure

### 📁 `sdks/`
Git submodules for the published SDKs. Each SDK lives in its own repository. See `.gitmodules` for the remotes. A commit in this repository only stores the submodule SHA.

Do not edit files under `sdks/` as part of an OpenAPI or docs change. Publish an SDK with `npm run generate-sdk-<lang>`. `npm run generate-sdks` runs every language.

Available SDKs:
- **Ruby** - `sdks/ruby` → [voucherify-ruby-sdk](https://github.com/voucherifyio/voucherify-ruby-sdk)
- **Java** - `sdks/java` → [voucherify-java-sdk](https://github.com/voucherifyio/voucherify-java-sdk)
- **Python** - `sdks/python` → [voucherify-python-sdk](https://github.com/voucherifyio/voucherify-python-sdk)
- **PHP** - `sdks/php` → [voucherify-php-sdk](https://github.com/voucherifyio/voucherify-php-sdk)
- **.NET** - `sdks/dotnet` → [voucherify-dotNET-sdk](https://github.com/voucherifyio/voucherify-dotNET-sdk)
- **JavaScript** - `sdks/js` → [voucherify-js-sdk](https://github.com/voucherifyio/voucherify-js-sdk)

### 📁 `reference/`
- **`OpenAPI.json`** - Source OpenAPI specification (`paths` and `webhooks`). Edit this file.
- **`readonly-sdks/`** - Generated SDK input, one `OpenAPI.json` per language. Written by `npm run prepare-generated`.
- **`split-openapi-by-tags/`** - Old tag split. The current generator writes `documentation/openapi`.

### 📁 `documentation/`
The Mintlify documentation site. Prose is `*.mdx`. Generated OpenAPI files in this folder are rewritten by `npm run prepare-generated`; edit `reference/OpenAPI.json` instead.

Mintlify builds a preview only for a pull request whose base is the deployment branch (`master`). A pull request into another branch does not get that preview.

`documentation/.mintlify/AGENTS.md` is Mintlify's writing guide for MDX components. It is not a map of this repository.

**Configuration**
- **`docs.json`** - navigation, theme, and which OpenAPI file each API group uses (`"openapi": "/openapi/....json"`)
- **`style.css`** - site styles
- **`images/`** - images referenced by the site

**Prose**, grouped the same way as the navigation in `docs.json`:
- **`get-started/`** - Get started
- **`guides/`** - developer guides
- **`integrations/`** - integrations
- **`discover/`**, **`prepare/`**, **`build/`**, **`optimize/`**, **`orchestrate/`**, **`analyze/`**, **`manage/`** - product guides for those sections
- **`api-reference/`** - API reference pages, including webhook event pages
- **`changelog/`** - public Voucherify changelog
- **`snippets/`** - MDX imported by other pages
- **`examples/`** - sample files, such as CSV import templates

Event pages point at a webhook file with frontmatter such as `openapi: "/openapi-events/events-customer.json webhook EVENTS.CUSTOMER.CREATED"`.

**Generated OpenAPI** (OpenAPI 3.1.0; do not edit by hand):
- **`openapi/*.json`** - built from `paths`. No `webhooks` key. `loyalties-v2.json` holds every path under `/v2/loyalties`.
- **`openapi-events/*.json`** - webhook operations, built from `webhooks`. Event pages reference these files.

### 📁 `production/`
Contains the production-ready OpenAPI specification that can be distributed to clients:
- **`readOnly-openAPI.json`** - Production OpenAPI schema with verified correctness (may not include all endpoints)
- **`ENDPOINTS-COVERAGE.md`** - Documentation showing which endpoints are supported in the production schema vs. deprecated endpoints

Use `ENDPOINTS-COVERAGE.md` to verify which endpoints are included in the production schema.

### 📁 `mustache-templates/`
Contains custom Mustache templates used by OpenAPI Generator to customize SDK generation for each language:
- **`csharp/`** - Templates for .NET SDK
- **`java/`** - Templates for Java SDK
- **`javascript/`** & **`typescript/`** - Templates for JS/TS SDK
- **`php-nextgen/`** - Templates for PHP SDK
- **`python/`** - Templates for Python SDK
- **`ruby-client/`** - Templates for Ruby SDK

### 📁 `scripts/`
Contains all automation scripts for processing OpenAPI specifications and generating SDKs/documentation. This is organized into several subdirectories:

#### `scripts/mintlify/`
Scripts specific to Mintlify documentation generation:
- **`build-update-md-tables-from-openapi.ts`** - Generates Markdown tables from OpenAPI schemas
- **`split-security-params-then-split-openapi-by-tags.ts`** - Writes `documentation/openapi` and `documentation/openapi-events` from the source spec
- **`output/`** - Generated Markdown files for various API objects (Voucher, Campaign, Redemption, etc.)
- **`utils/`** - Utility functions:
  - `add-ids-to-h2.ts` - Adds IDs to H2 headings
  - `md-tables.ts` - Markdown table utilities
  - `sanitize-html-attributes.ts` - HTML attribute sanitization
  - `schema-to-md-table.ts` - Converts schemas to Markdown tables

#### `scripts/sdks/`
Post-processing applied when an SDK is published:
- **`dotnet/`** - `fix-dotnet-imports.ts`, `fix-enums-in-dotnet.js`
- **`js/`** - `clean-js-sdk-files.sh`, `fix-JS-sdk-required-properties-types.js`, `fix-JS-sdk-types.js`
- **`ruby/`** - `update-ruby-dockerfile-sdk-version.ts`
- **`shared/`** - `copy-env-to-sdks.sh`

#### `scripts/shared/`
Core scripts used across both SDK and documentation generation:
- **`build-production-openapi.ts`** - Builds the production OpenAPI file
- **`count-important-statistics-about-openapi.ts`** - Generates statistics
- **`generate-endpoints-coverage-doc.ts`** - Creates the ENDPOINTS-COVERAGE.md file
- **`fix-schemas-with-refs.ts`** - Resolves schema references
- **`remove-not-yet-refactored-paths.ts`** - Filters out incomplete endpoints
- **`prepare-open-api/`** - OpenAPI preparation pipeline:
  - `add-missing-defaults.ts` - Adds default values
  - `get-paths-without-deprecated.ts` - Filters deprecated paths
  - `merge-multiple-ok-responses-into-one.ts` - Response merging
  - `put-not-object-schemas-into-object-schemas.ts` - Schema normalization
  - `remove-breaking-changes/` - Language-specific breaking change prevention:
    - `dotnet.ts`, `java.ts`, `js.ts`, `php.ts`, `python.ts`, `ruby.ts` - Per-language filters
    - `utils.ts` - Shared utilities
  - `remove-bugged-tags-from-open-api.ts` - Tag cleanup
  - `remove-not-used-schemas.ts` - Unused schema removal
  - `remove-required-from-request-and-responses.ts` - Required field handling
  - `remove-unwanted-properties.ts` - Property filtering
  - `removeOneOfs.ts` - OneOf schema resolution
  - `searchAndReplaceInFiles.ts` - Bulk file modifications

#### `scripts/types/`
TypeScript type definitions:
- **`globals.t.ts`** - Global type definitions

## Getting Started

### Prerequisites
- Git with submodules support
- Node.js and npm/yarn (for running scripts)
- OpenAPI Generator (for SDK generation)

### Cloning the Repository
```bash
git clone --recurse-submodules https://github.com/voucherifyio/voucherify-openapi-new.git
```

If you already cloned without submodules:
```bash
git submodule update --init --recursive
```

## Contributing

Read the [Contributing guide](CONTRIBUTING.md) for complete information regarding contribution.

When contributing to this repository:
1. Change the API in `reference/OpenAPI.json`.
2. Run `npm run prepare-generated` and commit what it rewrites. This refreshes derived OpenAPI files and Markdown tables. It does not regenerate SDK source. `npm run pre-commit` is the same command.
3. Publish an SDK only with `npm run generate-sdk-<lang>`. That prepares `reference/readonly-sdks/<lang>/OpenAPI.json`, runs OpenAPI Generator with `mustache-templates/`, then applies `scripts/sdks/<lang>/`.
4. Documentation changes belong in `documentation/`.
5. Check `production/ENDPOINTS-COVERAGE.md` for which endpoints are in the production spec.

Mintlify builds a documentation preview only for a pull request whose base is `master`. A pull request into another branch does not get that preview.

## Workflow Overview

1. **Source** → Edit `reference/OpenAPI.json`.
2. **Derived files** → `npm run prepare-generated` refreshes the Mintlify OpenAPI files, `reference/readonly-sdks/`, Markdown tables, and `production/readOnly-openAPI.json`. It does not regenerate SDK source.
3. **SDK publish** → `npm run generate-sdk-<lang>` is a separate step. It uses `mustache-templates/` and `scripts/sdks/<lang>/`.
4. **Documentation** → Mintlify reads `documentation/`.
5. **Production** → `production/readOnly-openAPI.json` is the client-facing specification.
