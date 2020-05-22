import { JsonObject } from "./json.js";
/** Provides details for line coverage. */
export declare class LineData {
    lineNumber: number;
    executionCount: number;
    checksum: string;
    /**
     * Creates a new line data.
     * @param lineNumber The line number.
     * @param executionCount The execution count.
     * @param checksum The data checksum.
     */
    constructor(lineNumber: number, executionCount?: number, checksum?: string);
    /**
     * Creates a new line data from the specified JSON object.
     * @param map A JSON object representing a line data.
     * @return The instance corresponding to the specified JSON object.
     */
    static fromJson(map: JsonObject): LineData;
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
/** Provides the coverage data of lines. */
export declare class LineCoverage {
    found: number;
    hit: number;
    data: LineData[];
    /**
     * Creates a new line coverage.
     * @param found The number of lines found.
     * @param hit The number of lines found.
     * @param data The coverage data.
     */
    constructor(found?: number, hit?: number, data?: LineData[]);
    /**
     * Creates a new line coverage from the specified JSON object.
     * @param map A JSON object representing a line coverage.
     * @return The instance corresponding to the specified JSON object.
     */
    static fromJson(map: JsonObject): LineCoverage;
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
