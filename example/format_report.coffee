import {FunctionCoverage, LineCoverage, LineData, Report, SourceFile} from "@cedx/lcov"
import console from "node:console"

# Formats coverage data as LCOV report.
sourceFile = new SourceFile "/home/cedx/lcov.js/fixture.js",
	functions: new FunctionCoverage found: 1, hit: 1
	lines: new LineCoverage found: 2, hit: 2, data: [
		new LineData lineNumber: 6, executionCount: 2, checksum: "PF4Rz2r7RTliO9u6bZ7h6g"
		new LineData lineNumber: 7, executionCount: 2, checksum: "yGMB6FhEEAd8OyASe3Ni1w"
	]

report = new Report "Example", [sourceFile]
console.log report.toString()
