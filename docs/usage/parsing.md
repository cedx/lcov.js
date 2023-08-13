# LCOV parsing
The `Report.parse()` static method parses a [LCOV](https://github.com/linux-test-project/lcov) coverage report provided as string,
and creates a `Report` instance giving detailed information about this coverage report:

```javascript
import console from "node:console";
import {readFile} from "node:fs/promises";
import {Report} from "@cedx/lcov";

try {
  const report = Report.parse(await readFile("/path/to/lcov.info", "utf8"));
  console.log(`The coverage report contains ${report.sourceFiles.length} source files:`);
  console.log(JSON.stringify(report));
}
catch (error) {
  console.log(error instanceof SyntaxError ? error.message : error);
}
```

> A `SyntaxError` is thrown if any error occurred while parsing the coverage report.

Converting the `Report` instance to [JSON](https://www.json.org) format will return a map like this:

```json
{
  "testName": "Example",
  "sourceFiles": [
    {
      "path": "/home/cedx/lcov.js/fixture.js",
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

> See the [API reference](api/) of this library for more information on the `Report` class.
