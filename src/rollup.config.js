import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'lib/index.mjs',
  output: {file: 'build/lcov.js', format: 'iife', name: 'lcov'},
  plugins: [resolve()]
};
