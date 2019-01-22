const commonjs = require('rollup-plugin-commonjs');

module.exports = {
  input: 'lib/index.js',
  output: {file: 'build/lcov.js', format: 'iife', name: 'lcov'},
  plugins: [commonjs()]
};
