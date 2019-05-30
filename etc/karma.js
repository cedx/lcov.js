const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');

module.exports = config => config.set({
  basePath: require('path').resolve(__dirname, '..'),
  browsers: ['FirefoxHeadless'],
  files: [
    {pattern: 'lib/**/*.js', type: 'module'},
    {pattern: 'test/**/*.js', type: 'module'}
  ],
  frameworks: ['mocha'],
  preprocessors: {
    '**/*.js': ['rollup']
  },
  reporters: ['progress'],
  rollupPreprocessor: {
    output: {format: 'iife', name: 'lcov', sourcemap: 'inline'},
    plugins: [resolve(), commonjs()]
  },
  singleRun: true
});
