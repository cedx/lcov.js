import {BranchCoverage, BranchData} from "./BranchCoverage.js";
import {FunctionCoverage, FunctionData} from "./FunctionCoverage.js";
import {LineCoverage, LineData} from "./LineCoverage.js";
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
	 * Parses the specified coverage data in LCOV format.
	 * @param coverage The LCOV coverage data.
	 * @returns The resulting coverage report.
	 * @throws `SyntaxError` if a parsing error occurred.
	 */
	static parse(coverage: string): Report { // eslint-disable-line max-statements
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
				case Tokens.TestName: {
					report.testName ||= data[0];
					break;
				}
				case Tokens.BranchData: {
					if (data.length < 4) throw SyntaxError(`Invalid branch data at line #${offset}.`);
					sourceFile.branches?.data.push(new BranchData({
						blockNumber: Number(data[1]),
						branchNumber: Number(data[2]),
						lineNumber: Number(data[0]),
						taken: data[3] == "-" ? 0 : Number(data[3])
					}));
					break;
				}
				case Tokens.BranchesFound: {
					if (sourceFile.branches) sourceFile.branches.found = Number(data[0]);
					break;
				}
				case Tokens.BranchesHit: {
					if (sourceFile.branches) sourceFile.branches.hit = Number(data[0]);
					break;
				}
				case Tokens.FunctionData: {
					if (data.length < 2) throw SyntaxError(`Invalid function data at line #${offset}.`);
					if (sourceFile.functions) for (const item of sourceFile.functions.data) if (item.functionName == data[1]) { // eslint-disable-line max-depth
						item.executionCount = Number(data[0]);
						break;
					}
					break;
				}
				case Tokens.FunctionsFound: {
					if (sourceFile.functions) sourceFile.functions.found = Number(data[0]);
					break;
				}
				case Tokens.FunctionsHit: {
					if (sourceFile.functions) sourceFile.functions.hit = Number(data[0]);
					break;
				}
				case Tokens.FunctionName: {
					if (data.length < 2) throw SyntaxError(`Invalid function name at line #${offset}.`);
					sourceFile.functions?.data.push(new FunctionData({functionName: data[1], lineNumber: Number(data[0])}));
					break;
				}
				case Tokens.LineData: {
					if (data.length < 2) throw SyntaxError(`Invalid line data at line #${offset}.`);
					sourceFile.lines?.data.push(new LineData({
						checksum: data.length >= 3 ? data[2] : "",
						executionCount: Number(data[1]),
						lineNumber: Number(data[0])
					}));
					break;
				}
				case Tokens.LinesFound: {
					if (sourceFile.lines) sourceFile.lines.found = Number(data[0]);
					break;
				}
				case Tokens.LinesHit: {
					if (sourceFile.lines) sourceFile.lines.hit = Number(data[0]);
					break;
				}
				case Tokens.SourceFile: {
					sourceFile = new SourceFile(data[0], {
						branches: new BranchCoverage,
						functions: new FunctionCoverage,
						lines: new LineCoverage
					});
					break;
				}
				case Tokens.EndOfRecord: {
					report.sourceFiles.push(sourceFile);
					break;
				}
				default:
					throw SyntaxError(`Unknown token at line #${offset}.`);
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
			...this.testName ? [`${Tokens.TestName}:${this.testName}`] : [],
			...this.sourceFiles.map(item => item.toString())
		].join("\n");
	}
}
