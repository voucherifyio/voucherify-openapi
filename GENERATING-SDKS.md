# GENERATING SDKs FROM OPEN API FILE

## Introduction

We use [OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator) with version 7.0.1
to generate SDKs for different languages.
Our template aka mustache files are located in `./mustache-templates` directory. 
Are slightly modified from the original ones for our needs.

## Requirements

- Node.js v16+ and npm
- installed `@openapitools/openapi-generator-cli` globally
- docker (optional)

## How to generate sdk

- `npm install` (if you have not already installed)
- `npm install @openapitools/openapi-generator-cli -g` (if you have not already installed)
- `npm run generate-sdk-ruby`/`generate-sdk-python`/`generate-sdk-java`/`generate-sdk-php`

SDK will be generated in `./sdks` directory in associated language folder.


## Commands explanation

- **build-update-md-tables-from-openapi** - creating and updates docs in `./docs/reference-docs` directory
- **remove-stoplight-tags-from-openapi** - spotlight is gui software for editing openapi files. Each usage added some tags to openapi file. This command removes them.  
- **prepare-open-api-for-sdk** - scripts in the basic form are not ready for generating sdks without errors or bugs. This command make bunch of actions which mostly language specific.
  - (all) removing not supported endpoints (deprecated or those wasn't refactored to the newest versions of the API)
  - (all) removing not used schemas and parameters 
  - (all) removing `additional properties` from schemas
  - (java / python) removing `required` property from schema's parameters that is assigned as `nullable`
  - (java) merging multiple response schemas with 2xx status code into one schema
  - (php) merging oneOf schemas into one schema
  - (php) associating each element into object
- **manage-project** - running `build-update-md-tables-from-openapi` command and uploading openapi file to the server
- **fix-schemas-with-refs** - script for fixing `oneOf` schemas with `$ref`
- **fix-schemas-properties-with-single-enum** - script for adding default value to schemas with single enum
- **readme-upload-missing-images** - script for uploading images to the server
- **count-important-statistics-about-openapi** - script for counting occurrences and counting statistics which are important for openapi correctness
- **build-production-openapi** - creating openapi snapshot file which was uploaded to openapi server 
- **fix-zero-level-schemas** - script generating openapi with correct zero level schemas for requests and responses consistent with the arrangements from [CONTRIBUTING.md](CONTRIBUTING.md#naming-convention)
- **generate-endpoints-coverage-docs** - script for generating readme file with endpoints coverage
- **generate-sdk-xxx** - script for generating sdk in associated language 
- **generate-sdks** - script for concurrently generating all sdks
- **test** - tests are used to check openapi schema didn't change after scripts refactoring

## Uploading new versions

Creating new version of the SDKs required a few manual steps:
1. Ensure that all SDKs generation without errors.
2. Ensure that all SDKs tests are passing.
3. Add/change tests for all SDKs containing all changes.
4. Decide whether the changes concern the minor, major or patch version.
5. Commit all generated changes to submodules. 
6. Publish new version of the SDKs to repositories manager

### Running tests

Easiest way for running tests is to use `docker-compose` file.
1. Ensure that you have installed `docker`.
2. Ensure that You have init submodules `git submodule update --init --recursive`
3. `docker-compose build` - build docker images for containers
4. `docker-compose up` - run containers (running commands separately for better readability of logs)

For running SDK separately or on Your local machine without docker go in to the directory of the SDK and read `README.md` file.

**Note that running tests will affect your Voucherify project data. Run tests only on development projects.**

### Versioning 

- **patch** - backward compatible changes - bug fixes, small changes, refactoring
- **minor** - backward compatible changes - new endpoints or properties
- **major** - breaking changes - new schemas, naming changes, removing endpoints or properties, changes in the mustache logic


### Publishing for remote repositories 

TODO
