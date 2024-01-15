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
  - go to `./tmp/ruby`
  - run `gem build openapi_client.gemspec`
  - run `gem install ./openapi_client-1.0.0.gem`
- Php
  - install `php >= 8.1` and `composer` (if you have not already installed)
- Java
  - install `java` and `maven` e.g. `Java 18.0.2` and `Mvn 14.1.2` (if you have not already installed)
  - go to `./tmp/java`
  - run `mvn clean install`

### Run tests

- Python
  - run `pip3 install python-dotenv` (if you have never)
  - run `python3 ./sdk-tests/python.py` for tests
- Ruby
  - run `gem install dotenv` (if you have never)
  - run `ruby ./sdk-tests/ruby.rb` for tests
- Php
  - run `npm run generate-php-sdk-for-tests`
  - go to `./sdk-tests` (`cd ./sdk-tests`)
  - run `php -S localhost:8000 php/index.php`
  - visit `http://localhost:8000/`
- Java
  - in main catalog run `mvn install:install-file -Dfile=./tmp/java/target/openapi-java-client-v2018-08-01.jar -DgroupId=voucherify -DartifactId=java-sdk-test -Dversion=0.0.1 -Dpackaging=jar` to add jar to local maven repository
  - use `mvn -f ./sdk-tests/java clean install && mvn -f ./sdk-tests/java exec:java` for build and run tests

