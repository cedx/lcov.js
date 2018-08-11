module.exports = config => config.set({
  browsers: ['Chrome'],
  files: ['src/**/*.ts', 'test/**/*.ts'],
  frameworks: ['mocha', 'karma-typescript'],
  karmaTypescriptConfig: {
    include: ['test/**/*.ts'],
    tsconfig: 'tsconfig.json'
  },
  preprocessors: {
    'src/**/*.ts': ['karma-typescript', 'coverage'],
    'test/**/*.ts': ['karma-typescript']
  },
  reporters: ['progress', 'karma-typescript']
});
