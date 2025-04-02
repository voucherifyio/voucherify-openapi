# NEW SDKs FROM OPEN API FILE

## Introduction

Sometimes we need to generate entirely new SDK out of the OpenAPI, this README is dedicated to go through steps that need to be done to create new SDK.
If you think that something is missing here. Please update it.

## Requirements

- See `./GENERATING-SDKS.md`

## How to generate sdk

1. Check what's the newest version of [OpenAPi-Generator](https://github.com/OpenAPITools/openapi-generator) and get `cli-X.X.Xjar` file if not already in the folder `./openapi-generator-jar` for the version you need.
   1. Go to the repo and read README.md - you may need to create cli yourself (instruction shall be in the README, java is required, the file you will be looking for is called openapi-generator-cli-*****.jar ) or you may have luck and find [SNAPSHOT](https://oss.sonatype.org/content/repositories/snapshots/org/openapitools/openapi-generator-cli/7.12.0-SNAPSHOT/) 
   2. Add new `openapi-generator-cli-*****.jar` to `./openapi-generator-jar` folder.
   3. Go to the repo and find mustache template - shall be located in `modules/openapi-generator/src/main/resources/{language}` - copy it over to `./mustache-templates`
2. Go to `./scripts/prepare-open-api-for-sdk/index.ts` and add new sdk support, make it similar to previous sdks.
   1. This may be tricky since some sdks needs limitations. For example python does not allow multiple response statuses for single path, so we must merge them. (option use2XX), sometimes objects cannot have additionalProperties and regular properties in same object so we need to add option `simplifyAllObjectsThatHaveAdditionalProperties`, sometimes else OpenAPI must be created in specific way, for example option `putNotObjectSchemasIntoObjectSchemas` to make enums directly in the object models. So I don't have a solution to that. We shall start with no options, than check/test generated sdk and be sure that everything is working as expected.
   2. New sdk should have all breaking changes included.
3. Go to `scripts/helpers/get-take-list.ts` and add support for the new sdk - all non deprecated paths shall be included
4. Go to `scripts/generate-endpoints-coverage-doc.ts` and add support for the new sdk
5. Generate OpenAPI file for the new sdk. Shall be located in `./reference/readonly-sdks/{language}/OpenAPI.json`
6. In `package.json` create new script that will create new sdk, it should look something like: `"generate-sdk-{language}": "npm run generate-endpoints-coverage-doc -- --generateFor={language};rm -r ./sdks/{language}/{sdk generated file folder};npm run prepare-open-api-for-sdk -- --language={language};java -jar openapi-generator-jar/openapi-generator-cli-X.X.X.jar generate -i ./reference/readonly-sdks/{language}/OpenAPI.json -g {language} -o ./sdks/{language} -t ./mustache-templates/{language} --additional-properties={check documentation}`
   1. language - for example `csharp` or `php-nextgen`
   2. for additional properties go to https://openapi-generator.tech/docs/generators and click your language
7. In `package.json` add your script to `generate-sdks`
8. Generate sdk using your script - **add it to the new repo/existing repo if there is any already created for the sdk - we always use old repo if there is any.**
9. Recommended* remove auto generated sdk tests - add to your new `generate-sdk-{language}` script; command to remove the tests automatically. (Recommended since we have not found them useful)
10. Head to mustache templates and remove all safety guards that would throw error if there is mismatch model - we have decided that this shall not be done since we often add new api properties, and such safety guards would break sdk. Loom for (throw error - translated to the new sdk language)
11. Create tests that at least:
    1. Tests should load `./env` file that should contain: `VOUCHERIFY_HOST=https://api.voucherify.io`, `X_APP_ID=`, `X_APP_TOKEN=`, `X_MANAGEMENT_ID=` and `X_MANAGEMENT_TOKEN=`
    2. Using `X_APP_ID=`, `X_APP_TOKEN=` we shall create simple campaign and customer, query qualifications and return voucher from the campaign, than do validation and redemption with success. Se shall compare at least few response parameters `expect`.
    3. Using `X_MANAGEMENT_ID=` and `X_MANAGEMENT_TOKEN=` we shall at least query projects, list metadata schemas and update metadata schema with success. Some `expect` shall be in the test
    4. Using `X_APP_ID=` and `X_APP_TOKEN=` we shall create OAuth token with scope `api` and do the exactly the same as in step 2.
    5. **Create example/test where we shall use object that regular properties and additional properties in same model.** - this is needed to ensure that complex objects are created properly - if not we may need to update sdk generating options. 
12. Once tests are ready, prepare dockerfile that would install sdk if needed and run tests. You may check examples in already created sdks `./sdks/{language}/Dockerfile` - than add it to the script in `./package.json` as `test-{language}-sdk` and update `test-sdks` script.
13. Update SDK readme (probably you shall update `./mustache-templates/{language}/README.mustache`) to make sure that is useful. Readme shall be created similarly to the other sdks - so use them as an example.
14. Do the research how to add the sdk to the package manager (such as maven or npm - package manager dedicated for your sdk language)
