# GENERATING SDKs FROM OPEN API FILE

## Introduction

Voucherify is using openAPI definition to generate sdks.

## Requirements

- Node.js v16+
- installed `@openapitools/openapi-generator-cli` globally

## How to generate sdk

- `npm i` (if you have not already installed)
- `npm install @openapitools/openapi-generator-cli -g` (if you have not already installed)
- `npm run generate-sdk-ruby`/`generate-sdk-python`

## For testing purposes you need to export environment variables by running

#### For python

1. Use `pip3 install python-dotenv` or `pip install python-dotenv`.
2. Add `.env` file inside `sdk-tests` folder with following content:
```dotenv
VOUCHERIFY_HOST=https://api.voucherify.io #optional
X_APP_ID=4xxx17d6-xxxx-xxxx-xxxx-ce24381228ab
X_APP_TOKEN=3xxx165i-xxxx-xxxx-xxxx-cb5327024ce4
```

**NOTE** If You have problem with wrong reading of `.env` file variables You probably need to use unset command for removing aforementioned variables from OS ENV.

#### Deprecated

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
- install using pip `responses 0.24.0` and `Urllib3 2.0.5`
- run in terminal `/Applications/Python\ 3.XXXXXX/Install\ Certificates.command`, where `XXXXXX` is the version of your Python3. For example `3.12` for `3.12.0`.
- run `python3 sdk-tests/python.py` (fails...)
