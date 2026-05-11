# Voucherify OpenAPI Specification and SDK

This repository contains OpenAPI specifications for the Voucherify API and all resources necessary for generating SDKs and documentation. It uses Git submodules to manage generated SDKs and includes scripts for processing OpenAPI specifications.

## Repository Structure

### 📁 `sdks/`
Contains Git submodules for all generated SDKs. Each SDK is maintained in its own repository and linked here as a submodule. See `.gitmodules` for the complete list of SDKs and their repositories.

Available SDKs:
- **Ruby** - `sdks/ruby` → [voucherify-ruby-sdk](https://github.com/voucherifyio/voucherify-ruby-sdk)
- **Java** - `sdks/java` → [voucherify-java-sdk](https://github.com/voucherifyio/voucherify-java-sdk)
- **Python** - `sdks/python` → [voucherify-python-sdk](https://github.com/voucherifyio/voucherify-python-sdk)
- **PHP** - `sdks/php` → [voucherify-php-sdk](https://github.com/voucherifyio/voucherify-php-sdk)
- **.NET** - `sdks/dotnet` → [voucherify-dotNET-sdk](https://github.com/voucherifyio/voucherify-dotNET-sdk)
- **JavaScript** - `sdks/js` → [voucherify-js-sdk](https://github.com/voucherifyio/voucherify-js-sdk)

### 📁 `reference/`
Contains the source OpenAPI specification files that serve as the foundation for SDK generation and documentation:
- **`OpenAPI.json`** - Main OpenAPI specification
- **`OpenAPIWebhooks.json`** - Webhooks specification
- **`readonly-sdks/`** - Read-only SDK specifications
- **`split-openapi-by-tags/`** - OpenAPI spec split by API resource tags

### 📁 `documentation/`
Contains all Mintlify documentation files. This entire folder is shared with Mintlify for generating the API documentation website:
- **`api-reference/`** - API reference documentation pages
- **`guides/`** - User guides and tutorials
- **`integrations/`** - Integration documentation
- **`openapi/`** - Processed OpenAPI files for documentation
- **`changelog/`** - API changelog
- **`docs.json`** - Mintlify configuration

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
- **`split-openapi-by-tags.ts`** - Splits the OpenAPI spec by tags for documentation
- **`output/`** - Generated Markdown files for various API objects (Voucher, Campaign, Redemption, etc.)
- **`utils/`** - Utility functions:
  - `add-ids-to-h2.ts` - Adds IDs to H2 headings
  - `md-tables.ts` - Markdown table utilities
  - `sanitize-html-attributes.ts` - HTML attribute sanitization
  - `schema-to-md-table.ts` - Converts schemas to Markdown tables

#### `scripts/sdks/`
SDK-specific processing scripts organized by language:
- **`dotnet/`** - .NET SDK fixes:
  - `fix-dotnet-imports.ts` - Fixes import statements
  - `fix-enums-in-dotnet.js` - Corrects enum definitions
- **`java/`** - Java SDK specific scripts
- **`js/`** - JavaScript SDK processing:
  - `clean-js-sdk-files.sh` - Cleanup script
  - `fix-JS-sdk-required-properties-types.js` - Type corrections
  - `fix-JS-sdk-types.js` - Additional type fixes
- **`php/`** - PHP SDK specific scripts
- **`python/`** - Python SDK specific scripts
- **`ruby/`** - Ruby SDK processing:
  - `update-ruby-dockefile-sdk-version.ts` - Version management
- **`shared/`** - Scripts shared across SDKs:
  - `copy-env-to-sdks.sh` - Environment variable distribution

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

#### `scripts/production/`
Scripts specific to production build processes

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

When contributing to this repository, please be aware that:
1. Changes to OpenAPI specifications in `reference/` will affect SDK generation
2. Scripts in `scripts/shared/prepare-open-api/` process the spec before generation
3. Each SDK may have language-specific post-processing scripts
4. Documentation changes should be made in the `documentation/` folder
5. Always check `production/ENDPOINTS-COVERAGE.md` for endpoint availability

## Workflow Overview

1. **Source Specification** → `reference/OpenAPI.json` contains the master specification
2. **Processing** → Scripts in `scripts/shared/prepare-open-api/` transform the spec
3. **SDK Generation** → OpenAPI Generator uses specs + `mustache-templates/` to create SDKs
4. **Post-Processing** → Language-specific scripts in `scripts/sdks/{language}/` refine the output
5. **Documentation** → Mintlify uses files from `documentation/` folder
6. **Production** → `production/readOnly-openAPI.json` is the client-facing specification


