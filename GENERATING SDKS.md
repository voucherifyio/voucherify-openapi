# GENERATING SDKs FROM OPEN API FILE

## Introduction

Voucherify is using openAPI definition to generate sdks.

## Requirements

- Node.js v16+
- installed `@openapitools/openapi-generator-cli` globally

## How to generate sdk

- `npm i` (if you have not already installed)
- `npm install @openapitools/openapi-generator-cli -g` (if you have not already installed)
- `openapi-generator-cli version-manager set 7.0.1`
- `npm run build-production-openapi -- --language={language}` (available languages are `python`, `ruby`)
- `npx @openapitools/openapi-generator-cli generate -i ./tmp/reference/{language}/OpenAPI.json -g {language} -o ./tmp/{language}` (available languages are `python`, `ruby`)

## For testing purposes you need to export environment variables by running

- required:
  - export X_APP_ID=UUID...
  - export X_APP_TOKEN=UUID...
- optionally:
  - export VOUCHERIFY_HOST=https://us1.api.voucherify.io

## For ruby

- Install `gem` and `ruby` (if you have not already installed)
- Go to `./tmp/ruby`
- run `gem build openapi_client.gemspec`
- run `gem install ./openapi_client-1.0.0.gem`
- Test it:
  - Go to branch root folder
  - run `ruby ./sdk-tests/ruby.rb` for tests

## For python

- install python3 and pip (if you have not already installed)
- install requirement python packages using pip -> **tmp/python/requirements.txt**
- run `python3 sdk-tests/python.py` (fails...)
