import {resolve} from 'path';

export default {
  input: resolve(__dirname, '../lib/index.js'),
  output: {
    file: resolve(__dirname, '../build/lcov.js'),
    format: 'iife',
    name: 'lcov'
  }
};
