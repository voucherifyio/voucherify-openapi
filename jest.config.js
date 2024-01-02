/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  watchPathIgnorePatterns: ['<rootDir>/scripts/prepare-open-api-for-sdk/__snapshots__/index.test.ts.snap', ]
};