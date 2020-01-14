# Changelog

## Version [6.3.0](https://github.com/cedx/lcov.js/compare/v6.2.0...v6.3.0)
- Updated the package dependencies.

## Version [6.2.0](https://github.com/cedx/lcov.js/compare/v6.1.0...v6.2.0)
- Replaced [`babel-minify`](https://github.com/babel/minify) by [`terser`](https://terser.org) for minification.
- Updated the package dependencies.
- Using the null coalescing operator.

## Version [6.1.0](https://github.com/cedx/lcov.js/compare/v6.0.0...v6.1.0)
- Due to strong user demand, restored the [TypeScript](https://www.typescriptlang.org) source code.
- Raised the [Node.js](https://nodejs.org) constraint.
- Replaced the [JSDoc](https://jsdoc.app) documentation generator by [TypeDoc](https://typedoc.org).

## Version [6.0.0](https://github.com/cedx/lcov.js/compare/v5.2.0...v6.0.0)
- Breaking change: dropped support for [CommonJS modules](https://nodejs.org/api/modules.html).
- Breaking change: raised the required [Node.js](https://nodejs.org) version.
- Breaking change: reverted the source code to [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript).
- Replaced the [TypeDoc](https://typedoc.org) documentation generator by [JSDoc](https://jsdoc.app).
- Replaced the [TSLint](https://palantir.github.io/tslint) static analyzer by [ESLint](https://eslint.org).
- Updated the package dependencies.

## Version [5.2.0](https://github.com/cedx/lcov.js/compare/v5.1.1...v5.2.0)
- Modified the package layout.
- Updated the package dependencies.

## Version [5.1.1](https://github.com/cedx/lcov.js/compare/v5.1.0...v5.1.1)
- Fixed the [issue #3](https://github.com/cedx/lcov.js/issues/3): the browser bundle was not deployed on CDNs.

## Version [5.1.0](https://github.com/cedx/lcov.js/compare/v5.0.0...v5.1.0)
- Added support for [ECMAScript modules](https://nodejs.org/api/esm.html).
- Updated the package dependencies.

## Version [5.0.0](https://github.com/cedx/lcov.js/compare/v4.8.0...v5.0.0)
- Breaking change: the browser classes are exposed as `lcov` property instead of `LCOV`.
- Replaced the [Webpack](https://webpack.js.org) bundler by [Rollup](https://rollupjs.org) and [Babel Minify](https://github.com/babel/minify).
- Updated the package dependencies.

## Version [4.8.0](https://github.com/cedx/lcov.js/compare/v4.7.0...v4.8.0)
- Updated the package dependencies.
- Updated the URL of the Git repository.

## Version [4.7.0](https://github.com/cedx/lcov.js/compare/v4.6.0...v4.7.0)
- Added support for a redistributable bundle.

## Version [4.6.0](https://github.com/cedx/lcov.js/compare/v4.5.0...v4.6.0)
- Ported the unit tests to classes with experimental decorators.
- Removed a cyclic dependency.
- Updated the package dependencies.

## Version [4.5.0](https://github.com/cedx/lcov.js/compare/v4.4.0...v4.5.0)
- Ported the source code to [TypeScript](https://www.typescriptlang.org).
- Replaced the [ESDoc](https://esdoc.org) documentation generator by [TypeDoc](https://typedoc.org).
- Replaced the [ESLint](https://eslint.org) static analyzer by [TSLint](https://palantir.github.io/tslint).
- Updated the package dependencies.

## Version [4.4.0](https://github.com/cedx/lcov.js/compare/v4.3.0...v4.4.0)
- Added the `offset` and `source` properties to the `LcovError` class.
- Updated the package dependencies.

## Version [4.3.0](https://github.com/cedx/lcov.js/compare/v4.2.0...v4.3.0)
- Added the `LcovError` class.

## Version [4.2.0](https://github.com/cedx/lcov.js/compare/v4.1.0...v4.2.0)
- Added a user guide based on [MkDocs](http://www.mkdocs.org).
- Updated the build system to [Gulp](https://gulpjs.com) version 4.
- Updated the package dependencies.

## Version [4.1.0](https://github.com/cedx/lcov.js/compare/v4.0.0...v4.1.0)
- Added support for browser testing.
- Updated the package dependencies.

## Version [4.0.0](https://github.com/cedx/lcov.js/compare/v3.1.0...v4.0.0)
- Breaking change: changed the signature of most constructors.
- Breaking change: using camel case instead of studly caps for the properties of the `Token` class.

## Version [3.1.0](https://github.com/cedx/lcov.js/compare/v3.0.0...v3.1.0)
- Added the [`#[Symbol.toStringTag]`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) property to all classes.
- Changed licensing for the [MIT License](https://opensource.org/licenses/MIT).
- Updated the package dependencies.

## Version [3.0.0](https://github.com/cedx/lcov.js/compare/v2.1.0...v3.0.0)
- Breaking change: renamed the `fromJSON()` static methods to `fromJson`.
- Breaking change: renamed the `Report.parse()` static method to `fromCoverage`.
- Changed the naming convention: acronyms and abbreviations are capitalized like regular words, except for two-letter acronyms.
- Updated the package dependencies.

## Version [2.1.0](https://github.com/cedx/lcov.js/compare/v2.0.0...v2.1.0)
- Removed the dependency on [Babel](https://babeljs.io) compiler.
- Updated the package dependencies.

## Version [2.0.0](https://github.com/cedx/lcov.js/compare/v1.1.1...v2.0.0)
- Breaking change: raised the required [Node.js](https://nodejs.org) version.
- Updated the package dependencies.

## Version [1.1.1](https://github.com/cedx/lcov.js/compare/v1.1.0...v1.1.1)
- Fixed a code generation bug.
- Updated the package dependencies.

## Version [1.1.0](https://github.com/cedx/lcov.js/compare/v1.0.0...v1.1.0)
- Added support for the [Node Security Platform](https://nodesecurity.io) reports.
- Updated the package dependencies.

## Version [1.0.0](https://github.com/cedx/lcov.js/compare/v0.4.0...v1.0.0)
- First stable release.

## Version [0.4.0](https://github.com/cedx/lcov.js/compare/v0.3.0...v0.4.0)
- Breaking change: raised the required [Node.js](https://nodejs.org) version.
- Breaking change: using ES2017 features, like async/await functions.
- Improved the build system.
- Ported the unit test assertions from [TDD](https://en.wikipedia.org/wiki/Test-driven_development) to [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development).
- Removed the dependency on the `@cedx/enum` module.
- Removed the dependency on the `gulp-load-plugins` module.
- Updated the package dependencies.

## Version [0.3.0](https://github.com/cedx/lcov.js/compare/v0.2.1...v0.3.0)
- Updated the package dependencies.

## Version [0.2.1](https://github.com/cedx/lcov.js/compare/v0.2.0...v0.2.1)
- Fixed a bug in `Report.parse()` method.

## Version [0.2.0](https://github.com/cedx/lcov.js/compare/v0.1.0...v0.2.0)
- Breaking change: changed the signature of most constructors.
- Empty test names are not included in the report output.
- Updated the package dependencies.

## Version 0.1.0
- Initial release.
