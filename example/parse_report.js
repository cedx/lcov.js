import console from "node:console";
import {readFile} from "node:fs/promises";
import {Report} from "@cedx/lcov";

/**
 * Parses a LCOV report to coverage data.
 */
try {
	const report = Report.fromString(await readFile("/path/to/lcov.info", "utf8"));
	console.log(`The coverage report contains ${report.files.length} files:`);
	console.log(JSON.stringify(report));
}

catch (error) {
	console.log(error);
}
