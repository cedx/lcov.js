# LCOV Reports for JS
![Runtime](https://img.shields.io/badge/node-%3E%3D8.0-brightgreen.svg) ![Release](https://img.shields.io/npm/v/@cedx/lcov.svg) ![License](https://img.shields.io/npm/l/@cedx/lcov.svg) ![Downloads](https://img.shields.io/npm/dt/@cedx/lcov.svg) ![Dependencies](https://david-dm.org/cedx/lcov.js.svg) ![Coverage](https://coveralls.io/repos/github/cedx/lcov.js/badge.svg) ![Build](https://travis-ci.org/cedx/lcov.js.svg)

Parse and format [LCOV](http://ltp.sourceforge.net/coverage/lcov.php) coverage reports, in [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript).

## Requirements
The latest [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com) versions.
If you plan to play with the sources, you will also need the latest [Gulp](http://gulpjs.com) version.

## Installing via [npm](https://www.npmjs.com)
From a command prompt, run:

```shell
$ npm install --save @cedx/lcov
```

## Usage
This package provides a set of classes representing a coverage report and its data.
The [`Report`](https://github.com/cedx/lcov.js/blob/master/src/report.js) class, the main one, provides the parsing and formatting features.

### Parse coverage data from a [LCOV](http://ltp.sourceforge.net/coverage/lcov.php) file
The `Report.parse()` static method parses a coverage report provided as string, and returns a `Report` instance giving detailed information about this coverage report:

```javascript
const {Report} = require('@cedx/lcov');
const {readFile} = require('fs');
const {promisify} = require('util');

try {
  const loadReport = promisify(readFile);
  
  let coverage = await loadReport('lcov.info', 'utf8');
  let report = Report.parse(coverage);
  
  console.log(`The coverage report contains ${report.records.length} records:`);
  console.log(report.toJSON());
}

catch (error) {
  console.log('The LCOV report has an invalid format.');
}
```

The `Report.toJSON()` instance method will return a map like this:

```javascript
{
  testName: "Example",
  records: [
    {
      sourceFile: "/home/cedx/lcov.js/fixture.js",
      branches: {
        data: [],
        found: 0,
        hit: 0
      },
      functions: {
        data: [
          {executionCount: 2, functionName: "main", lineNumber: 4}
        ],
        found: 1,
        hit: 1
      },
      lines: {
        data: [
          {checksum: "PF4Rz2r7RTliO9u6bZ7h6g", executionCount: 2, lineNumber: 6},
          {checksum: "y7GE3Y4FyXCeXcrtqgSVzw", executionCount: 2, lineNumber: 9}
        ],
        found: 2,
        hit: 2
      }
    }
  ]
}
```

### Format coverage data to the [LCOV](http://ltp.sourceforge.net/coverage/lcov.php) format
Each provided class has a dedicated `toString()` instance method returning the corresponding data formatted as LCOV string.
All you have to do is to create the adequate structure using these different classes, and to export the final result:

```javascript
const {FunctionCoverage, LineCoverage, LineData, Record, Report} = require('@cedx/lcov');

let record = new Record('/home/cedx/lcov.js/fixture.js');
record.functions = new FunctionCoverage(1, 1);
record.lines = new LineCoverage(2, 2, [
 new LineData(6, 2, 'PF4Rz2r7RTliO9u6bZ7h6g'),
 new LineData(7, 2, 'yGMB6FhEEAd8OyASe3Ni1w')
]);

let report = new Report('Example', [record]);
console.log(report.toString());
```

The `Report.toString()` method will return a LCOV report formatted like this:

```
TN:Example
SF:/home/cedx/lcov.js/fixture.js
FNF:1
FNH:1
DA:6,2,PF4Rz2r7RTliO9u6bZ7h6g
DA:7,2,yGMB6FhEEAd8OyASe3Ni1w
LF:2
LH:2
end_of_record
```

## See also
- [API reference](https://cedx.github.io/lcov.js)
- [Code coverage](https://coveralls.io/github/cedx/lcov.js)
- [Continuous integration](https://travis-ci.org/cedx/lcov.js)

## License
[LCOV Reports for JS](https://github.com/cedx/lcov.js) is distributed under the Apache License, version 2.0.
