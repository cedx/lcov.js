module.exports = config => config.set({
  browsers: ['Chrome'],
  files: ['test/**/*.ts'],
  frameworks: ['mocha', 'karma-typescript'],
  karmaTypescriptConfig: {
    include: ['src/**/*.ts', 'test/**/*.ts'],
    tsconfig: 'tsconfig.json'
  },
  preprocessors: {
    'src/**/*.ts': ['karma-typescript', 'coverage'],
    'test/**/*.ts': ['karma-typescript']
  },
  reporters: ['progress', 'karma-typescript']
});
