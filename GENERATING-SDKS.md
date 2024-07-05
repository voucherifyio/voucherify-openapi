# GENERATING SDKs FROM OPEN API FILE

## Introduction

We use [OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator) with version 7.0.1
to generate SDKs for different languages.
Our template aka mustache files are located in `./mustache-templates` directory. 
Are slightly modified from the original ones for our needs.

## Requirements

- Node.js ^16 || ^18 and npm
- installed `@openapitools/openapi-generator-cli` globally
- docker (optional)
- java runtime

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

## Creating changes 

1. Init all submodules `git submodule update --init --recursive`.
2. Create a new branch: `git checkout -b MY_BRANCH_NAME`
3. Add changes (sticking to the rules from [CONTRIBUTING.md](./CONTRIBUTING.md))
4. [Generate SDKs](#how-to-generate-sdk)
5. Create new ones for Your changes and [ensure everything run without errors](#running-tests)
6. Commit all changes to main repo and submodules
7. Push your branch and create a [pull request](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork) against `main` branch
8. When the changes are merged, [publish new version to remote repositories](#publishing-for-remote-repositories-).

### Running tests

Easiest way for running tests is to use `docker-compose` file.
1. Ensure that you have installed `docker`.
2. Ensure that You have init submodules `git submodule update --init --recursive`
3. `docker-compose build` - build docker images for containers
4. `docker-compose up` - run containers (running commands separately for better readability of logs)

For running SDK separately or on Your local machine without docker go in to the directory of the SDK and read `README.md` file.

**Note that running tests will affect your Voucherify project data. Run tests only on development projects.**

## Uploading new versions

Manual steps checklist:
- [ ] Ensure that all SDKs were generated without error.
- [ ] Ensure new tests were created for changes.
- [ ] Ensure that all SDKs tests passed.
- [ ] Decide whether the changes concern the minor, major or patch version.
- [ ] Commit all generated changes to submodules and main module.
- [ ] Publish new version of the SDKs to repositories manager

### Versioning 

- **patch** - backward compatible changes - bug fixes, small changes, refactoring
- **minor** - backward compatible changes - new endpoints or properties
- **major** - breaking changes - new schemas, naming changes, removing endpoints or properties, changes in the mustache logic


### Publishing for remote repositories 

#### Ruby

1. Ensure changes are on main branch and all tests has passed.
2. Ensure that all data are correct in the `VoucherifySdk.gemspec` file. 
3. Ensure which version You want to build.
4. Use command `git tag vx.y.z` to add tag
5. Use command `git push origin vx.y.z` this will run GitHub action that will publish new version of ruby SDK
