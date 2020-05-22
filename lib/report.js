import { BranchCoverage, BranchData } from "./branch.js";
import { FunctionCoverage, FunctionData } from "./function.js";
import { LineCoverage, LineData } from "./line.js";
import { Record } from "./record.js";
import { Token } from "./token.js";
/** An exception caused by a parsing error. */
export class LcovError extends SyntaxError {
    /**
     * Creates a new LCOV error.
     * @param message A message describing the error.
     * @param source The actual source input which caused the error.
     * @param offset The offset in `source` where the error was detected.
     */
    constructor(message, source = "", offset = 0) {
        super(message);
        this.source = source;
        this.offset = offset;
        this.name = "LcovError";
    }
}
/** Represents a trace file, that is a coverage report. */
export class Report {
    /**
     * Creates a new report.
     * @param testName The test name.
     * @param records The record list.
     */
    constructor(testName = "", records = []) {
        this.testName = testName;
        this.records = records;
    }
    /**
     * Parses the specified coverage data in [LCOV](http://ltp.sourceforge.net/coverage/lcov.php) format.
     * @param coverage The coverage data.
     * @return The resulting coverage report.
     * @throws [[LcovError]] A parsing error occurred.
     */
    static fromCoverage(coverage) {
        const report = new Report;
        try {
            let record;
            for (let line of coverage.split(/\r?\n/g)) {
                line = line.trim();
                if (!line.length)
                    continue;
                const parts = line.split(":");
                if (parts.length < 2 && parts[0] != Token.endOfRecord)
                    throw new Error("Invalid token format");
                const token = parts.shift();
                const data = parts.join(":").split(",");
                switch (token) {
                    case Token.testName:
                        report.testName = data[0]; // eslint-disable-line prefer-destructuring
                        break;
                    case Token.sourceFile:
                        record = new Record(data[0], {
                            branches: new BranchCoverage,
                            functions: new FunctionCoverage,
                            lines: new LineCoverage
                        });
                        break;
                    case Token.functionName:
                        if (data.length < 2)
                            throw new Error("Invalid function name");
                        record.functions.data.push(new FunctionData(data[1], Number.parseInt(data[0])));
                        break;
                    case Token.functionData:
                        if (data.length < 2)
                            throw new Error("Invalid function data");
                        for (const item of record.functions.data)
                            if (item.functionName == data[1]) { // eslint-disable-line max-depth
                                item.executionCount = Number.parseInt(data[0]);
                                break;
                            }
                        break;
                    case Token.functionsFound:
                        record.functions.found = Number.parseInt(data[0]);
                        break;
                    case Token.functionsHit:
                        record.functions.hit = Number.parseInt(data[0]);
                        break;
                    case Token.branchData:
                        if (data.length < 4)
                            throw new Error("Invalid branch data");
                        record.branches.data.push(new BranchData(Number.parseInt(data[0]), Number.parseInt(data[1]), Number.parseInt(data[2]), data[3] == "-" ? 0 : Number.parseInt(data[3])));
                        break;
                    case Token.branchesFound:
                        record.branches.found = Number.parseInt(data[0]);
                        break;
                    case Token.branchesHit:
                        record.branches.hit = Number.parseInt(data[0]);
                        break;
                    case Token.lineData:
                        if (data.length < 2)
                            throw new Error("Invalid line data");
                        record.lines.data.push(new LineData(Number.parseInt(data[0]), Number.parseInt(data[1]), data.length >= 3 ? data[2] : ""));
                        break;
                    case Token.linesFound:
                        record.lines.found = Number.parseInt(data[0]);
                        break;
                    case Token.linesHit:
                        record.lines.hit = Number.parseInt(data[0]);
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
            throw new LcovError("The coverage data has an invalid LCOV format", coverage);
        }
        if (!report.records.length)
            throw new LcovError("The coverage data is empty", coverage);
        return report;
    }
    /**
     * Creates a new report from the specified JSON object.
     * @param map A JSON object representing a report.
     * @return The instance corresponding to the specified JSON object.
     */
    static fromJson(map) {
        return new Report(typeof map.testName == "string" ? map.testName : "", Array.isArray(map.records) ? map.records.map(item => Record.fromJson(item)) : []);
    }
    /**
     * Converts this object to a map in JSON format.
     * @return The map in JSON format corresponding to this object.
     */
    toJSON() {
        return {
            records: this.records.map(item => item.toJSON()),
            testName: this.testName
        };
    }
    /**
     * Returns a string representation of this object.
     * @return The string representation of this object.
     */
    toString() {
        const lines = this.testName.length ? [`${Token.testName}:${this.testName}`] : [];
        lines.push(...this.records.map(item => item.toString()));
        return lines.join("\n");
    }
}
