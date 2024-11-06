import {Report} from "@cedx/lcov"
import console from "node:console"
import {readFile} from "node:fs/promises"

# Parses a LCOV report to coverage data.
try
	report = Report.parse await readFile "/path/to/lcov.info", "utf8"
	console.log "The coverage report contains #{report.sourceFiles.length} source files:"
	console.log JSON.stringify report

catch error
	console.error if error instanceof SyntaxError then error.message else error
