module.exports = config => config.set({
  browsers: ['Chrome'],
  client: {mocha: {opts: true}},
  frameworks: ['karma-typescript', 'mocha'],
  files: ['test/**/*.ts'],
  preprocessors: {'test/**/*.ts': ['karma-typescript']}
});
