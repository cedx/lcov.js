const {join} = require('path');
const sources = {
  lib: join(__dirname, '../src/**/*.ts'),
  test: join(__dirname, '../test/**/*_test.ts')
};

module.exports = config => config.set({
  browsers: ['FirefoxHeadless'],
  files: [sources.lib, sources.test],
  frameworks: ['mocha', 'karma-typescript'],
  karmaTypescriptConfig: {
    coverageOptions: {exclude: /_test\.ts/i},
    include: [sources.lib, sources.test],
    reports: {lcovonly: {directory: join(__dirname, '..'), filename: 'lcov.info', subdirectory: 'var'}},
    tsconfig: '../tsconfig.json'
  },
  preprocessors: {[join(__dirname, '../**/*.ts')]: ['karma-typescript']},
  reporters: ['progress', 'karma-typescript'],
  singleRun: true
});
