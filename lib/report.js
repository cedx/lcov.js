import {BranchCoverage, BranchData} from "./branch.js";
import {FunctionCoverage, FunctionData} from "./function.js";
import {LineCoverage, LineData} from "./line.js";
import {Record} from "./record.js";
import {Token} from "./token.js";

/**
 * Represents a trace file, that is a coverage report.
 */
export class Report {

	/**
	 *
	 * @type {Record[]}
	 */
	records;


	/**
	 *
	 * @type {string}
	 */
	testName;

	/**
	 * Creates a new report.
	 * @param testName The test name.
	 * @param records The record list.
	 */
	constructor(public testName: string = "", public records: Record[] = []) {}

	/**
	 * Parses the specified coverage data in [LCOV](http://ltp.sourceforge.net/coverage/lcov.php) format.
	 * @param coverage The coverage data.
	 * @returns The resulting coverage report.
	 * @throws [[SyntaxError]] A parsing error occurred.
	 */
	static fromCoverage(coverage: string): Report {
		const report = new Report;

		try {
			let record!: Record;
			for (let line of coverage.split(/\r?\n/g)) {
				line = line.trim();
				if (!line.length) continue;

				const parts = line.split(":");
				if (parts.length < 2 && parts[0] != Token.endOfRecord) throw new Error("Invalid token format");

				const token = parts.shift();
				const data = parts.join(":").split(",");

				switch (token) {
					case Token.testName:
						report.testName = data[0];
						break;

					case Token.sourceFile:
						record = new Record(data[0], {
							branches: new BranchCoverage,
							functions: new FunctionCoverage,
							lines: new LineCoverage
						});
						break;

					case Token.functionName:
						if (data.length < 2) throw new Error("Invalid function name");
						record.functions!.data.push(new FunctionData(data[1], Number.parseInt(data[0])));
						break;

					case Token.functionData:
						if (data.length < 2) throw new Error("Invalid function data");
						for (const item of record.functions!.data) if (item.functionName == data[1]) {
							item.executionCount = Number.parseInt(data[0]);
							break;
						}
						break;

					case Token.functionsFound:
						record.functions!.found = Number.parseInt(data[0]);
						break;

					case Token.functionsHit:
						record.functions!.hit = Number.parseInt(data[0]);
						break;

					case Token.branchData:
						if (data.length < 4) throw new Error("Invalid branch data");
						record.branches!.data.push(new BranchData(
							Number.parseInt(data[0]),
							Number.parseInt(data[1]),
							Number.parseInt(data[2]),
							data[3] == "-" ? 0 : Number.parseInt(data[3])
						));
						break;

					case Token.branchesFound:
						record.branches!.found = Number.parseInt(data[0]);
						break;

					case Token.branchesHit:
						record.branches!.hit = Number.parseInt(data[0]);
						break;

					case Token.lineData:
						if (data.length < 2) throw new Error("Invalid line data");
						record.lines!.data.push(new LineData(
							Number.parseInt(data[0]),
							Number.parseInt(data[1]),
							data.length >= 3 ? data[2] : ""
						));
						break;

					case Token.linesFound:
						record.lines!.found = Number.parseInt(data[0]);
						break;

					case Token.linesHit:
						record.lines!.hit = Number.parseInt(data[0]);
						break;

					case Token.endOfRecord:
						report.records.push(record);
						break;

					default:
						throw new Error("Unknown token");
				}
			}
		}

		catch {
			throw new SyntaxError("The coverage data has an invalid LCOV format.", coverage);
		}

		if (!report.records.length) throw new SyntaxError("The coverage data is empty.", coverage);
		return report;
	}

	/**
	 * Converts this object to a map in JSON format.
	 * @returns {Record<string, any>} The map in JSON format corresponding to this object.
	 */
	toJSON() {
		return {
			records: this.records.map(item => item.toJSON()),
			testName: this.testName
		};
	}

	/**
	 * Returns a string representation of this object.
	 * @returns {string} The string representation of this object.
	 */
	toString() {
		const lines = this.testName.length ? [`${Token.testName}:${this.testName}`] : [];
		lines.push(...this.records.map(item => item.toString()));
		return lines.join("\n");
	}
}
