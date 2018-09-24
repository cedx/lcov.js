/* tslint:disable: variable-name */
const BabelMinifyPlugin = require('babel-minify-webpack-plugin');
const {join} = require('path');

module.exports = {
  entry: './lib/index.js',
  mode: 'production',
  optimization: {
    minimizer: [new BabelMinifyPlugin({}, {comments: false})]
  },
  output: {
    filename: 'lcov.js',
    library: 'Lcov',
    libraryExport: 'Lcov',
    libraryTarget: 'window',
    path: join(__dirname, 'build')
  }
};
