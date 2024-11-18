import {SourceFile} from "./source_file.js";

/**
 * Represents a trace file, that is a coverage report.
 */
export class Report {

	/**
	 * The source file list.
	 */
	sourceFiles: Array<SourceFile>;

	/**
	 * The test name.
	 */
	testName: string;

	/**
	 * Creates a new report.
	 * @param testName The test name.
	 * @param sourceFiles The source file list.
	 */
	constructor(testName: string, sourceFiles?: Array<SourceFile>);

	/**
	 * Creates a new report from the specified JSON object.
	 * @param json A JSON object representing a report.
	 * @returns The instance corresponding to the specified JSON object.
	 */
	static fromJson(json: Record<string, any>): Report;

	/**
	 * Parses the specified coverage data in LCOV format.
	 * @param coverage The LCOV coverage data.
	 * @returns The resulting coverage report.
	 * @throws `SyntaxError` if a parsing error occurred.
	 */
	static parse(coverage: string): Report;
}
