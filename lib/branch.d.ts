import { JsonObject } from './json';
/** Provides details for branch coverage. */
export declare class BranchData {
    lineNumber: number;
    blockNumber: number;
    branchNumber: number;
    taken: number;
    /**
     * Creates a new branch data.
     * @param lineNumber The line number.
     * @param blockNumber The block number.
     * @param branchNumber The branch number.
     * @param taken A number indicating how often this branch was taken.
     */
    constructor(lineNumber: number, blockNumber: number, branchNumber: number, taken?: number);
    /**
     * Creates a new branch data from the specified JSON object.
     * @param map A JSON object representing a branch data.
     * @return The instance corresponding to the specified JSON object.
     */
    static fromJson(map: JsonObject): BranchData;
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
/** Provides the coverage data of branches. */
export declare class BranchCoverage {
    found: number;
    hit: number;
    data: BranchData[];
    /**
     * Creates a new branch coverage.
     * @param found The number of branches found.
     * @param hit The number of branches found.
     * @param data The coverage data.
     */
    constructor(found?: number, hit?: number, data?: BranchData[]);
    /**
     * Creates a new branch data from the specified JSON object.
     * @param map A JSON object representing a branch data.
     * @return The instance corresponding to the specified JSON object.
     */
    static fromJson(map: JsonObject): BranchCoverage;
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
