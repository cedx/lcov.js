import {BranchCoverage, BranchData} from "./branch.js";
import {File} from "./file.js";
import {FunctionCoverage, FunctionData} from "./function.js";
import {LineCoverage, LineData} from "./line.js";
import {Token} from "./token.js";

/**
 * Represents a trace file, that is a coverage report.
 */
export class Report {

	/**
	 * The file list.
	 * @type {File[]}
	 */
	files;

	/**
	 * The test name.
	 * @type {string}
	 */
	testName;

	/**
	 * Creates a new report.
	 * @param {string} testName The test name.
	 * @param {File[]} files The file list.
	 */
	constructor(testName = "", files = []) {
		this.files = files;
		this.testName = testName;
	}

	/**
	 * Creates a new report from the specified JSON object.
	 * @param {Record<string, any>} map A JSON object representing a report.
	 * @returns {Report} The instance corresponding to the specified JSON object.
	 */
	static fromJson(map) {
		return new Report(
			typeof map.testName == "string" ? map.testName : "",
			Array.isArray(map.files) ? map.files.map(item => File.fromJson(item)) : []
		);
	}

	/**
	 * Parses the specified coverage data in [LCOV](http://ltp.sourceforge.net/coverage/lcov.php) format.
	 * @param {string} coverage The coverage data.
	 * @returns {Report} The resulting coverage report.
	 * @throws {SyntaxError} A parsing error occurred.
	 */
	static fromString(coverage) {
		/** @type {File} */
		let file = new File("");
		let offset = 0;
		const report = new Report;

		for (let line of coverage.split(/\r?\n/g)) {
			offset++;
			line = line.trim();
			if (!line.length) continue;

			const parts = line.split(":");
			if (parts.length < 2 && parts[0] != Token.endOfRecord) throw new SyntaxError(`Invalid token format at line #${offset}.`);

			const token = parts.shift();
			const data = parts.join(":").split(",");

			switch (token) {
				case Token.testName: if (!report.testName.length) report.testName = data[0]; break; // eslint-disable-line
				case Token.endOfRecord: report.files.push(file); break;

				case Token.branchData:
					if (data.length < 4) throw new SyntaxError(`Invalid branch data at line #${offset}.`);
					file.branches?.data.push(new BranchData({
						blockNumber: Number.parseInt(data[1]),
						branchNumber: Number.parseInt(data[2]),
						lineNumber: Number.parseInt(data[0]),
						taken: data[3] == "-" ? 0 : Number.parseInt(data[3])
					}));
					break;

				case Token.functionData:
					if (data.length < 2) throw new SyntaxError(`Invalid function data at line #${offset}.`);
					if (file.functions) for (const item of file.functions.data) if (item.functionName == data[1]) {
						item.executionCount = Number.parseInt(data[0]);
						break;
					}
					break;

				case Token.functionName:
					if (data.length < 2) throw new SyntaxError(`Invalid function name at line #${offset}.`);
					file.functions?.data.push(new FunctionData({functionName: data[1], lineNumber: Number.parseInt(data[0])}));
					break;

				case Token.lineData:
					if (data.length < 2) throw new SyntaxError(`Invalid line data at line #${offset}.`);
					file.lines?.data.push(new LineData({
						checksum: data.length >= 3 ? data[2] : "",
						executionCount: Number.parseInt(data[1]),
						lineNumber: Number.parseInt(data[0])
					}));
					break;

				case Token.sourceFile:
					file = new File(data[0], {
						branches: new BranchCoverage,
						functions: new FunctionCoverage,
						lines: new LineCoverage
					});
					break;

				case Token.branchesFound: if (file.branches) file.branches.found = Number.parseInt(data[0]); break;
				case Token.branchesHit: if (file.branches) file.branches.hit = Number.parseInt(data[0]); break;
				case Token.functionsFound: if (file.functions) file.functions.found = Number.parseInt(data[0]); break;
				case Token.functionsHit: if (file.functions) file.functions.hit = Number.parseInt(data[0]); break;
				case Token.linesFound: if (file.lines) file.lines.found = Number.parseInt(data[0]); break;
				case Token.linesHit: if (file.lines) file.lines.hit = Number.parseInt(data[0]); break;
				default: throw new SyntaxError(`Unknown token at line #${offset}.`);
			}
		}

		if (!report.files.length) throw new SyntaxError("The coverage data is empty or invalid.");
		return report;
	}

	/**
	 * Converts this object to a map in JSON format.
	 * @returns {Record<string, any>} The map in JSON format corresponding to this object.
	 */
	toJSON() {
		return {
			files: this.files.map(item => item.toJSON()),
			testName: this.testName
		};
	}

	/**
	 * Returns a string representation of this object.
	 * @returns {string} The string representation of this object.
	 */
	toString() {
		const lines = this.testName.length ? [`${Token.testName}:${this.testName}`] : [];
		lines.push(...this.files.map(item => item.toString()));
		return lines.join("\n");
	}
}
