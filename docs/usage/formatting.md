# LCOV formatting
Each class provided by this library has a dedicated `toString()` method returning the corresponding data formatted as [LCOV](https://github.com/linux-test-project/lcov) string.
All you have to do is to create the adequate structure using these different classes, and to export the final result:

```javascript
import console from "node:console";
import {FunctionCoverage, LineCoverage, LineData, Report, SourceFile} from "@cedx/lcov";

const sourceFile = new SourceFile("/home/cedx/lcov.js/fixture.js", {
  functions: new FunctionCoverage({found: 1, hit: 1}),
  lines: new LineCoverage({found: 2, hit: 2, data: [
    new LineData({lineNumber: 6, executionCount: 2, checksum: "PF4Rz2r7RTliO9u6bZ7h6g"}),
    new LineData({lineNumber: 7, executionCount: 2, checksum: "yGMB6FhEEAd8OyASe3Ni1w"})
  ]})
});

const report = new Report("Example", [sourceFile]);
console.log(report.toString());
```

The `Report.toString()` method will return a [LCOV](https://github.com/linux-test-project/lcov) report formatted like this:

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

> See the [API reference](https://docs.belin.io/lcov.js) of this library for detailed information on the available classes.
