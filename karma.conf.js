'use strict';

module.exports = config => config.set({
  browsers: ['Chrome'],
  browserify: {debug: true},
  client: {mocha: {opts: true}},
  frameworks: ['browserify', 'mocha'],
  files: ['test/**/*.js'],
  preprocessors: {'test/**/*.js': ['browserify']}
});
