import {BranchCoverage} from "./BranchCoverage.js";
import {BranchData} from "./BranchData.js";
import {FunctionCoverage} from "./FunctionCoverage.js";
import {FunctionData} from "./FunctionData.js";
import {LineCoverage} from "./LineCoverage.js";
import {LineData} from "./LineData.js";
import {SourceFile} from "./SourceFile.js";
import {Tokens} from "./Tokens.js";

/**
 * Represents a trace file, that is a coverage report.
 */
export class Report {

	/**
	 * The source file list.
	 */
	sourceFiles: SourceFile[];

	/**
	 * The test name.
	 */
	testName: string;

	/**
	 * Creates a new report.
	 * @param testName The test name.
	 * @param sourceFiles The source file list.
	 */
	constructor(testName: string, sourceFiles: SourceFile[] = []) {
		this.sourceFiles = sourceFiles;
		this.testName = testName;
	}

	/**
	 * Creates a new report from the specified JSON object.
	 * @param json A JSON object representing a report.
	 * @returns The instance corresponding to the specified JSON object.
	 */
	static fromJson(json: Record<string, any>): Report {
		return new this(
			typeof json.testName == "string" ? json.testName : "",
			Array.isArray(json.sourceFiles) ? json.sourceFiles.map(item => SourceFile.fromJson(item as Record<string, any>)) : []
		);
	}

	/**
	 * Parses the specified coverage data in LCOV format.
	 * @param coverage The LCOV coverage data.
	 * @returns The resulting coverage report.
	 * @throws `SyntaxError` if a parsing error occurred.
	 */
	static parse(coverage: string): Report {
		const report = new this("");
		let offset = 0;
		let sourceFile = new SourceFile("");

		for (let line of coverage.split(/\r?\n/g)) {
			offset++;
			if (!(line = line.trim())) continue;

			const parts = line.split(":");
			const token = parts.shift();
			const data = parts.join(":").split(",");

			switch (token) {
				case Tokens.testName: report.testName ||= data[0]; break;
				case Tokens.endOfRecord: report.sourceFiles.push(sourceFile); break;

				case Tokens.branchData:
					if (data.length < 4) throw SyntaxError(`Invalid branch data at line #${offset}.`);
					sourceFile.branches?.data.push(new BranchData({
						blockNumber: Number(data[1]),
						branchNumber: Number(data[2]),
						lineNumber: Number(data[0]),
						taken: data[3] == "-" ? 0 : Number(data[3])
					}));
					break;

				case Tokens.functionData:
					if (data.length < 2) throw SyntaxError(`Invalid function data at line #${offset}.`);
					if (sourceFile.functions) for (const item of sourceFile.functions.data) if (item.functionName == data[1]) { // eslint-disable-line max-depth
						item.executionCount = Number(data[0]);
						break;
					}
					break;

				case Tokens.functionName:
					if (data.length < 2) throw SyntaxError(`Invalid function name at line #${offset}.`);
					sourceFile.functions?.data.push(new FunctionData({functionName: data[1], lineNumber: Number(data[0])}));
					break;

				case Tokens.lineData:
					if (data.length < 2) throw SyntaxError(`Invalid line data at line #${offset}.`);
					sourceFile.lines?.data.push(new LineData({
						checksum: data.length >= 3 ? data[2] : "",
						executionCount: Number(data[1]),
						lineNumber: Number(data[0])
					}));
					break;

				case Tokens.sourceFile:
					sourceFile = new SourceFile(data[0], {
						branches: new BranchCoverage,
						functions: new FunctionCoverage,
						lines: new LineCoverage
					});
					break;

				case Tokens.branchesFound: if (sourceFile.branches) sourceFile.branches.found = Number(data[0]); break;
				case Tokens.branchesHit: if (sourceFile.branches) sourceFile.branches.hit = Number(data[0]); break;
				case Tokens.functionsFound: if (sourceFile.functions) sourceFile.functions.found = Number(data[0]); break;
				case Tokens.functionsHit: if (sourceFile.functions) sourceFile.functions.hit = Number(data[0]); break;
				case Tokens.linesFound: if (sourceFile.lines) sourceFile.lines.found = Number(data[0]); break;
				case Tokens.linesHit: if (sourceFile.lines) sourceFile.lines.hit = Number(data[0]); break;
				default: throw SyntaxError(`Unknown token at line #${offset}.`);
			}
		}

		if (!report.sourceFiles.length) throw SyntaxError("The coverage data is empty or invalid.");
		return report;
	}

	/**
	 * Parses the specified coverage data in LCOV format.
	 * @param coverage The LCOV coverage data.
	 * @returns The resulting coverage report, or `null` if a parsing error occurred.
	 */
	static tryParse(coverage: string): Report|null {
		try { return this.parse(coverage); }
		catch { return null; }
	}

	/**
	 * Returns a string representation of this object.
	 * @returns The string representation of this object.
	 */
	toString(): string {
		return [
			...this.testName ? [`${Tokens.testName}:${this.testName}`] : [],
			...this.sourceFiles.map(item => item.toString())
		].join("\n");
	}
}
