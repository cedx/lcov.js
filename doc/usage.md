path: blob/master
source: lib/report.js

# Usage
**LCOV Reports for JS** provides a set of classes representing a [LCOV](http://ltp.sourceforge.net/coverage/lcov.php) coverage report and its data.
The `Report` class, the main one, provides the parsing and formatting features.

## Parse coverage data from a LCOV file
The `Report.fromCoverage()` static method parses a [LCOV](http://ltp.sourceforge.net/coverage/lcov.php) coverage report provided as string, and creates a `Report` instance giving detailed information about this coverage report:

```ts
import {Report} from '@cedx/lcov';
import {promises} from 'fs';

async function main(): Promise<void> {
  try {
    const coverage = await promises.readFile('lcov.info', 'utf8');
    const report = Report.fromCoverage(coverage);  
    console.log(`The coverage report contains ${report.records.length} records:`);
    console.log(report.toJSON());
  }

  catch (error) {
    console.log(`An error occurred: ${error.message}`);
  }
}
```

!!! info
    A `LcovError` is thrown if any error occurred while parsing the coverage report.

The `Report.toJSON()` instance method will return a [JSON](https://www.json.org) map like this:

```json
{
  "testName": "Example",
  "records": [
    {
      "sourceFile": "/home/cedx/lcov.js/fixture.js",
      "branches": {
        "found": 0,
        "hit": 0,
        "data": []
      },
      "functions": {
        "found": 1,
        "hit": 1,
        "data": [
          {"functionName": "main", "lineNumber": 4, "executionCount": 2}
        ]
      },
      "lines": {
        "found": 2,
        "hit": 2,
        "data": [
          {"lineNumber": 6, "executionCount": 2, "checksum": "PF4Rz2r7RTliO9u6bZ7h6g"},
          {"lineNumber": 9, "executionCount": 2, "checksum": "y7GE3Y4FyXCeXcrtqgSVzw"}
        ]
      }
    }
  ]
}
```

## Format coverage data to the LCOV format
Each provided class has a dedicated `toString()` instance method returning the corresponding data formatted as [LCOV](http://ltp.sourceforge.net/coverage/lcov.php) string.
All you have to do is to create the adequate structure using these different classes, and to export the final result:

```ts
import {FunctionCoverage, LineCoverage, LineData, Record, Report} from '@cedx/lcov';

function main(): void {
  const lineCoverage = new LineCoverage(2, 2, [
    new LineData(6, 2, 'PF4Rz2r7RTliO9u6bZ7h6g'),
    new LineData(7, 2, 'yGMB6FhEEAd8OyASe3Ni1w')
  ]);

  const record = new Record('/home/cedx/lcov.js/fixture.js', {
    functions: new FunctionCoverage(1, 1),
    lines: lineCoverage
  });

  const report = new Report('Example', [record]);
  console.log(report.toString());
}
```

The `Report#toString()` method will return a [LCOV](http://ltp.sourceforge.net/coverage/lcov.php) report formatted like this:

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
