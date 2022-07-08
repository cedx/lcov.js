/* eslint-disable complexity, max-depth, max-statements */
import {BranchCoverage, BranchData} from "./branch.js";
import {FunctionCoverage, FunctionData} from "./function.js";
import {LineCoverage, LineData} from "./line.js";
import {SourceFile} from "./source_file.js";
import {Token} from "./token.js";

/**
 * Represents a trace file, that is a coverage report.
 */
export class Report {

	/**
	 * The source file list.
	 * @type {SourceFile[]}
	 */
	sourceFiles;

	/**
	 * The test name.
	 * @type {string}
	 */
	testName;

	/**
	 * Creates a new report.
	 * @param {string} testName The test name.
	 * @param {SourceFile[]} [sourceFiles] The source file list.
	 */
	constructor(testName, sourceFiles = []) {
		this.sourceFiles = sourceFiles;
		this.testName = testName;
	}

	/**
	 * Creates a new report from the specified JSON object.
	 * @param {Record<string, any>} json A JSON object representing a report.
	 * @returns {Report} The instance corresponding to the specified JSON object.
	 */
	static fromJson(json) {
		return new this(
			typeof json.testName == "string" ? json.testName : "",
			Array.isArray(json.sourceFiles) ? json.sourceFiles.map(item => SourceFile.fromJson(item)) : []
		);
	}

	/**
	 * Parses the specified coverage data in [LCOV](http://ltp.sourceforge.net/coverage/lcov.php) format.
	 * @param {string} coverage The LCOV coverage data.
	 * @returns {Report} The resulting coverage report.
	 * @throws {SyntaxError} A parsing error occurred.
	 */
	static fromString(coverage) {
		const report = new this("");
		let offset = 0;
		let sourceFile = new SourceFile("");

		for (let line of coverage.split(/\r?\n/g)) {
			offset++;
			line = line.trim();
			if (!line) continue;

			const parts = line.split(":");
			if (parts.length < 2 && parts[0] != Token.endOfRecord) throw new SyntaxError(`Invalid token format at line #${offset}.`);

			const token = parts.shift();
			const data = parts.join(":").split(",");

			switch (token) {
				// eslint-disable-next-line prefer-destructuring
				case Token.testName: if (!report.testName) report.testName = data[0]; break;
				case Token.endOfRecord: report.sourceFiles.push(sourceFile); break;

				case Token.branchData:
					if (data.length < 4) throw new SyntaxError(`Invalid branch data at line #${offset}.`);
					sourceFile.branches?.data.push(new BranchData({
						blockNumber: Number.parseInt(data[1]),
						branchNumber: Number.parseInt(data[2]),
						lineNumber: Number.parseInt(data[0]),
						taken: data[3] == "-" ? 0 : Number.parseInt(data[3])
					}));
					break;

				case Token.functionData:
					if (data.length < 2) throw new SyntaxError(`Invalid function data at line #${offset}.`);
					if (sourceFile.functions) for (const item of sourceFile.functions.data) if (item.functionName == data[1]) {
						item.executionCount = Number.parseInt(data[0]);
						break;
					}
					break;

				case Token.functionName:
					if (data.length < 2) throw new SyntaxError(`Invalid function name at line #${offset}.`);
					sourceFile.functions?.data.push(new FunctionData({functionName: data[1], lineNumber: Number.parseInt(data[0])}));
					break;

				case Token.lineData:
					if (data.length < 2) throw new SyntaxError(`Invalid line data at line #${offset}.`);
					sourceFile.lines?.data.push(new LineData({
						checksum: data.length >= 3 ? data[2] : "",
						executionCount: Number.parseInt(data[1]),
						lineNumber: Number.parseInt(data[0])
					}));
					break;

				case Token.sourceFile:
					sourceFile = new SourceFile(data[0], {
						branches: new BranchCoverage,
						functions: new FunctionCoverage,
						lines: new LineCoverage
					});
					break;

				case Token.branchesFound: if (sourceFile.branches) sourceFile.branches.found = Number.parseInt(data[0]); break;
				case Token.branchesHit: if (sourceFile.branches) sourceFile.branches.hit = Number.parseInt(data[0]); break;
				case Token.functionsFound: if (sourceFile.functions) sourceFile.functions.found = Number.parseInt(data[0]); break;
				case Token.functionsHit: if (sourceFile.functions) sourceFile.functions.hit = Number.parseInt(data[0]); break;
				case Token.linesFound: if (sourceFile.lines) sourceFile.lines.found = Number.parseInt(data[0]); break;
				case Token.linesHit: if (sourceFile.lines) sourceFile.lines.hit = Number.parseInt(data[0]); break;
				default: throw new SyntaxError(`Unknown token at line #${offset}.`);
			}
		}

		if (!report.sourceFiles.length) throw new SyntaxError("The coverage data is empty or invalid.");
		return report;
	}

	/**
	 * Converts this object to a map in JSON format.
	 * @returns {Record<string, any>} The map in JSON format corresponding to this object.
	 */
	toJSON() {
		return {
			sourceFiles: this.sourceFiles.map(item => item.toJSON()),
			testName: this.testName
		};
	}

	/**
	 * Returns a string representation of this object.
	 * @returns {string} The string representation of this object.
	 */
	toString() {
		const lines = this.testName ? [`${Token.testName}:${this.testName}`] : [];
		lines.push(...this.sourceFiles.map(item => item.toString()));
		return lines.join("\n");
	}
}
