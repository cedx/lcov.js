import { JsonObject } from './json';
import { Record } from './record';
/** An exception caused by a parsing error. */
export declare class LcovError extends SyntaxError {
    readonly source: string;
    readonly offset: number;
    /**
     * Creates a new LCOV error.
     * @param message A message describing the error.
     * @param source The actual source input which caused the error.
     * @param offset The offset in `source` where the error was detected.
     */
    constructor(message: string, source?: string, offset?: number);
}
/** Represents a trace file, that is a coverage report. */
export declare class Report {
    testName: string;
    records: Record[];
    /**
     * Creates a new report.
     * @param testName The test name.
     * @param records The record list.
     */
    constructor(testName?: string, records?: Record[]);
    /**
     * Parses the specified coverage data in [LCOV](http://ltp.sourceforge.net/coverage/lcov.php) format.
     * @param coverage The coverage data.
     * @return The resulting coverage report.
     * @throws [[LcovError]] A parsing error occurred.
     */
    static fromCoverage(coverage: string): Report;
    /**
     * Creates a new report from the specified JSON object.
     * @param map A JSON object representing a report.
     * @return The instance corresponding to the specified JSON object.
     */
    static fromJson(map: JsonObject): Report;
    /**
     * Converts this object to a map in JSON format.
     * @return The map in JSON format corresponding to this object.
     */
    toJSON(): JsonObject;
    /**
     * Returns a string representation of this object.
     * @return The string representation of this object.
     */
    toString(): string;
}
