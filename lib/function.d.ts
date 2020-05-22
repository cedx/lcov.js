import { JsonObject } from "./json.js";
/** Provides details for function coverage. */
export declare class FunctionData {
    functionName: string;
    lineNumber: number;
    executionCount: number;
    /**
     * Creates a new function data.
     * @param functionName The function name.
     * @param lineNumber The line number of the function start.
     * @param executionCount The execution count.
     */
    constructor(functionName: string, lineNumber: number, executionCount?: number);
    /**
     * Creates a new function data from the specified JSON object.
     * @param map A JSON object representing a function data.
     * @return The instance corresponding to the specified JSON object.
     */
    static fromJson(map: JsonObject): FunctionData;
    /**
     * Converts this object to a map in JSON format.
     * @return The map in JSON format corresponding to this object.
     */
    toJSON(): JsonObject;
    /**
     * Returns a string representation of this object.
     * @param asDefinition Whether to return the function definition (i.e. name and line number) instead of its data (i.e. name and execution count).
     * @return The string representation of this object.
     */
    toString(asDefinition?: boolean): string;
}
/** Provides the coverage data of functions. */
export declare class FunctionCoverage {
    found: number;
    hit: number;
    data: FunctionData[];
    /**
     * Creates a new function coverage.
     * @param found The number of functions found.
     * @param hit The number of functions found.
     * @param data The coverage data.
     */
    constructor(found?: number, hit?: number, data?: FunctionData[]);
    /**
     * Creates a new function coverage from the specified JSON object.
     * @param map A JSON object representing a function coverage.
     * @return The instance corresponding to the specified JSON object.
     */
    static fromJson(map: JsonObject): FunctionCoverage;
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
