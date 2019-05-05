import {join} from 'path';

export default {
  input: join(__dirname, '../lib/index.js'),
  output: {file: join(__dirname, '../build/lcov.js'), format: 'iife', name: 'lcov'}
};
