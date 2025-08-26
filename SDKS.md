# GENERATING SDKs FROM OPEN API FILE

## Introduction

We use [OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator) with version 7.0.1, 7.1.0, 7.8.0 and 7.12.0 (depending on the SDK)

We use jar file generators located in `./openapi-generator-jar` to generate SDKs for different languages.

The template (mustache) files are located in `./mustache-templates` directory. 
They are slightly modified from the original ones for our needs.

## Requirements

- Node.js ^22 and npm
- docker (optional)
- java runtime v18 or higher

## How to generate an SDK

1. Run `npm install`, if you have not already installed.
2. Run `npm run generate-sdk-ruby`/`generate-sdk-python`/`generate-sdk-java`/`generate-sdk-php`/`generate-sdk-dotnet`.

SDK will be generated in `./sdks` directory in the respective language folder.

## Command explanation

### `build-update-md-tables-from-openapi`

Creates and updates docs in `./docs/reference-docs` directory.

### `remove-stoplight-tags-from-openapi`

Spotlight is GUI software for editing OpenAPI files. Each usage added some tags to an OpenAPI file. This command removes them.

### `prepare-open-api-for-sdk`
 
Scripts in the basic form are not ready for generating SDKs without errors or bugs. This command performs actions which are mostly language-specific.
  - (all) removing unsupported endpoints (deprecated or those that wasn't refactored to the newest versions of the API)
  - (all) removing not used schemas and parameters 
  - (all) removing `additionalProperties` from schemas
  - (java / python) removing `required` property from schema parameters that is assigned as `nullable`
  - (java) merging multiple response schemas with 2xx status code into one schema
  - (php) merging `oneOf` schemas into one schema
  - (php) associating each element into object

### `create-clean-project`

Run `build-update-md-tables-from-openapi` command to upload the OpenAPI file to the ReadMe server.

### `fix-schemas-with-refs

Fixes `oneOf` schemas with `$ref`.

### `fix-schemas-properties-with-single-enum`

Adds default values to schemas with a single enum.

### `readme-upload-missing-images`

Uploads images to the ReadMe server.

### `count-important-statistics-about-openapi`

Counts occurrences and statistics which are important for OpenAPI correctness.

### `build-production-openapi`

Creates an OpenAPI snapshot file which is uploaded to the ReadMe server.

### `fix-zero-level-schemas`

Generates an OpenAPI file with correct zero-level schemas for requests and responses consistent with the arrangements from [CONTRIBUTING.md](CONTRIBUTING.md#naming-convention).

### `generate-endpoints-coverage-docs`

Generates a readme file with endpoints coverage.

### `generate-sdk-xxx`

Generates an SDK in a given language.

### `generate-sdks`

Generates all SDKs at the same time.

## `test

Checks if the OpenAPI schemas haven't changed after scripts refactoring.

## Creating changes 

1. Init all submodules `git submodule update --init --recursive`.
2. Create a new branch: `git checkout -b MY_BRANCH_NAME`
3. Add changes in accordance with [CONTRIBUTING.md](./CONTRIBUTING.md).
4. [Generate SDKs](#how-to-generate-sdk).
5. Create new ones for your changes and [ensure everything runs without errors](#running-tests).
6. Commit all changes to the main repo and submodules.
7. Push your branch and create a [pull request](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork) against the `main` branch.
8. When the changes are merged, [publish the new version to remote repositories](#publishing-for-remote-repositories-).

## Running tests

The easiest way for running tests is to use the `docker-compose` file.
1. Ensure that you have installed `docker`.
2. Ensure that you have the init submodules with `git submodule update --init --recursive`.
3. Make sure you filled up `./env` file in root directory and `./scripts/copy-env-to-sdks.sh` have been launched.
4. Run `npm run test-sdks` or `npm run test-python-sdk/test-php-sdk/test-java-sdk/test-ruby-sdk/test-dotnet-sdk`

To run SDKs separately or on your local machine without docker, go to the SDK directory and read the `README.md` file.

**Running tests will affect your Voucherify project data. Run tests only on development projects!**

## Uploading new versions

Manual steps checklist:
- [ ] Ensure that all SDKs were generated without errors.
- [ ] Ensure new tests were created for changes.
- [ ] Ensure that all SDKs tests passed.
- [ ] Make sure no breaking changes have been introduced - only as a last resort can such changes be added (read section "Releasing major version")
- [ ] Commit all generated changes to the submodules and main module.
- [ ] Publish the new version of the SDKs to repositories manager.

### Versioning 

- **patch** - backward compatible changes - bug fixes, small changes, refactoring.
- **minor** - backward compatible changes - new endpoints or properties.
- **major** - breaking changes - new schemas, naming changes, removing endpoints or properties, changes in the mustache logic.

### Version Update Process

When updating the version number from X.Y.Z to U.I.O:

1. Search and replace all version number occurrences across:
    - Main repository
    - All language-specific SDK in `sdks/**language*` directories

2. **Important Exception:**
    - Skip version number updates in `sdks/**language**/README.md` files where X.Y.Z appears in changelog entries
    - These changelog entries should be preserved for historical documentation

3. **Search Pattern:**
    - Look for exact matches of the previous version number (X.Y.Z)
    - Replace with new version number (U.I.O)

Note: This process ensures version consistency across the codebase while maintaining changelog history.

#### Breaking changes

The following changes to the `OpenAPI.json` file consistent breaking changes:
- Adding a new query parameter.
- Deleting anything: a query property, a schema, property schema, etc.
- Changing the order of query parameters.
- When an object is replaced with a `$ref`.
- Deleting an element from an `enum`.
- Adding an `enum` if, until now, the type was `string`.
- Adding `format` or its change in a schema which has `"type": "string"`.
- Adding a `default` (**most likely**).
- Adding a new `enum` value if the existing values have the same prefix.

To avoid breaking changes, fix them in the [`index.ts` file](./scripts/prepare-open-api-for-sdk/index.ts).

#### Releasing major version

Before releasing new major version please go to [`index.ts` file](./scripts/prepare-open-api-for-sdk/index.ts) and update `breakingChangesVersion` to make sure that all breaking changes will be applied at the same time. 
