import {join} from 'path';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: join(__dirname, '../lib/index.mjs'),
  output: {file: join(__dirname, '../build/lcov.js'), format: 'iife', name: 'lcov'},
  plugins: [resolve()]
};
