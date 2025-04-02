# NEW SDKs FROM OPENAPI FILE

## Introduction

Sometimes, we need to generate an entirely new SDK from an OpenAPI file. This README is dedicated to guiding you through the steps required to create a new SDK.  
If you think something is missing here, please update it.

## Requirements

- See `./GENERATING-SDKS.md`.

## How to generate an SDK

1. Check the latest version of the [OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator) and download the `cli-X.X.X.jar` file if it is not already present in the `./openapi-generator-jar` folder for the required version.
    1. Go to the repository and read `README.md`. You may need to generate the CLI yourself (instructions should be in the README; Java is required). The file you need is called `openapi-generator-cli-*****.jar`. Alternatively, you might find a prebuilt [SNAPSHOT](https://oss.sonatype.org/content/repositories/snapshots/org/openapitools/openapi-generator-cli/7.12.0-SNAPSHOT/).
    2. Add the new `openapi-generator-cli-*****.jar` to the `./openapi-generator-jar` folder.
    3. Go to the repository and locate the Mustache template. It should be in `modules/openapi-generator/src/main/resources/{language}`. Copy it to `./mustache-templates`.

2. Open `./scripts/prepare-open-api-for-sdk/index.ts` and add support for the new SDK, following the structure of previous SDKs.
    1. This step may be tricky since some SDKs have specific limitations. For example:
        - **Python** does not allow multiple response statuses for a single path, so we must merge them using the `use2XX` option.
        - Some objects cannot have both `additionalProperties` and regular properties simultaneously, so we need the `simplifyAllObjectsThatHaveAdditionalProperties` option.
        - In some cases, OpenAPI must be structured in a specific way, such as using the `putNotObjectSchemasIntoObjectSchemas` option to ensure enums are correctly placed inside object models.
        - There is no universal solution for these issues. Start without additional options, then test the generated SDK and make sure everything works as expected.
        - New sdk should contain all breaking changes, so provide `breakingChangesVersion` option with the highest number (+1 if the highest number already have known breaking changes `see if (languageOptions.breakingChangesVersion <= {highestNumber}) {`)
    2. The new SDK should include all breaking changes.

3. Open `scripts/helpers/get-take-list.ts` and add support for the new SDK. All non-deprecated paths should be included.

4. Open `scripts/generate-endpoints-coverage-doc.ts` and add support for the new SDK.

5. Generate the OpenAPI file for the new SDK. It should be located in `./reference/readonly-sdks/{language}/OpenAPI.json`.

6. In `package.json`, create a new script to generate the SDK. It should look like this:
   ```json
   "generate-sdk-{language}": "npm run generate-endpoints-coverage-doc -- --generateFor={language}; rm -r ./sdks/{language}/{sdk_generated_file_folder}; npm run prepare-open-api-for-sdk -- --language={language}; java -jar openapi-generator-jar/openapi-generator-cli-X.X.X.jar generate -i ./reference/readonly-sdks/{language}/OpenAPI.json -g {language} -o ./sdks/{language} -t ./mustache-templates/{language} --additional-properties={check_documentation}"
   ```  
    1. `{language}` should be replaced with the target language, e.g., `csharp` or `php-nextgen`.
    2. To determine the correct `additional-properties`, visit [OpenAPI Generator Documentation](https://openapi-generator.tech/docs/generators) and select your language.

7. Add your script to `generate-sdks` in `package.json`.

8. Generate the SDK using your script.
    - If a repository already exists for this SDK, use it instead of creating a new one.

9. *(Recommended)* Remove auto-generated SDK tests.
    - Add a command to your `generate-sdk-{language}` script that removes the tests automatically.
    - This is recommended since we have found them to be of limited use.

10. Modify the Mustache templates:
    - Remove all safety guards that throw errors due to model mismatches.
    - We have decided not to enforce these checks, as new API properties are frequently added, and such safety guards could break the SDK.
    - Look for error-throwing conditions in the generated SDK language and remove them.

11. Create tests that ensure:
    1. The test suite loads the `./env` file (add `./env.example`, `./env` shall be added to `.gitigniore`), which contains:
       ```plaintext
       VOUCHERIFY_HOST=https://api.voucherify.io
       X_APP_ID=
       X_APP_TOKEN=
       X_MANAGEMENT_ID=
       X_MANAGEMENT_TOKEN=
       ```  
    2. Using `X_APP_ID` and `X_APP_TOKEN`:
        - Create a simple campaign and a customer.
        - Query qualifications.
        - Retrieve a voucher from the campaign.
        - Perform validation and redemption successfully.
        - Compare at least a few response parameters using `expect()`.
    3. Using `X_MANAGEMENT_ID` and `X_MANAGEMENT_TOKEN`:
        - Query projects.
        - List metadata schemas.
        - Update a metadata schema successfully.
        - Ensure some `expect()` checks are included.
    4. Using `X_APP_ID` and `X_APP_TOKEN`:
        - Create an OAuth token with the `api` scope.
        - Repeat the steps from point 2.
    5. **Ensure that an object containing both regular properties and additional properties in the same model is tested.**
        - This is critical to verify that complex objects are correctly generated.
        - If issues arise, update the SDK generation options accordingly.

12. Once the tests are ready:
    - Prepare a Dockerfile that installs the SDK (if necessary) and runs the tests.
    - You can find examples in existing SDKs: `./sdks/{language}/Dockerfile`.
    - Add a script in `package.json` under `test-{language}-sdk` and update the `test-sdks` script.

13. Update the SDK README.
    - This will likely involve modifying `./mustache-templates/{language}/README.mustache`.
    - Ensure it is useful and structured similarly to other SDKs.

14. Research how to publish the SDK to the appropriate package manager (e.g., Maven, npm) based on its language.
