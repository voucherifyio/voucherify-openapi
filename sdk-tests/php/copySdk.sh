#!/bin/bash

cd ./tmp/php || exit
composer install
cd ../../ || exit
cp -r ./tmp/php/vendor ./sdk-tests/php
cp -r ./tmp/php/src ./sdk-tests/php
cp -r ./tmp/php/tests ./sdk-tests/php
