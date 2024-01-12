# GENERATING SDKs FROM OPEN API FILE

## Introduction

Voucherify is using openAPI definition to generate sdks.

## Requirements

- Node.js v16+
- installed `@openapitools/openapi-generator-cli` globally

## How to generate sdk

- `npm i` (if you have not already installed)
- `npm install @openapitools/openapi-generator-cli -g` (if you have not already installed)
- `npm run generate-sdk-ruby`/`generate-sdk-python`/`generate-sdk-java`/`generate-sdk-php`

## Tests

### Before start

- Add `.env` file inside `sdk-tests` folder with following content:

```dotenv
X_APP_ID=4xxx17d6-xxxx-xxxx-xxxx-ce24381228ab
X_APP_TOKEN=3xxx165i-xxxx-xxxx-xxxx-cb5327024ce4
#optional:
VOUCHERIFY_HOST=https://api.voucherify.io
```

- Python
  - install `python3` and pip (if you have not already installed)
  - install requirement python packages using pip -> **tmp/python/requirements.txt**
  - install using pip `responses 0.24.0` and `Urllib3 2.0.5`
  - run in terminal `/Applications/Python\ 3.XXXXXX/Install\ Certificates.command`, where `XXXXXX` is the version of your Python3. For example `3.12` for `3.12.0`.
- Ruby
  - install `ruby >= 2.7` and `gem` (if you have not already installed)
  - run `npm run generate-sdk-ruby-for-tests`
- Php
  - install `php >= 8.1` and `composer` (if you have not already installed)

### Run tests

- Python
  - run `pip3 install python-dotenv` (if you have never)
  - run `python3 ./sdk-tests/python.py` for tests
- Ruby
  - run `gem install dotenv` (if you have never)
  - run `cd ./sdk-tests && ruby ./ruby.rb` for tests
- Php
  - run `npm run generate-php-sdk-for-tests`
  - go to `./sdk-tests` (`cd ./sdk-tests`)
  - run `php -S localhost:8000 php/index.php`
  - visit `http://localhost:8000/`
