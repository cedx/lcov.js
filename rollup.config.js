const resolve = require('rollup-plugin-node-resolve');
module.exports = {
  input: 'lib/index.mjs',
  output: {file: 'build/lcov.js', format: 'iife', name: 'lcov'},
  plugins: [resolve()]
};
