import { BranchCoverage } from './branch';
import { FunctionCoverage } from './function';
import { JsonObject } from './json';
import { LineCoverage } from './line';
/** Provides the coverage data of a source file. */
export declare class Record {
    sourceFile: string;
    /** The branch coverage. */
    branches?: BranchCoverage;
    /** The function coverage. */
    functions?: FunctionCoverage;
    /** The line coverage. */
    lines?: LineCoverage;
    /**
     * Creates a new record.
     * @param sourceFile The path to the source file.
     * @param options An object specifying values used to initialize this instance.
     */
    constructor(sourceFile: string, options?: Partial<RecordOptions>);
    /**
     * Creates a new record from the specified JSON object.
     * @param map A JSON object representing a record.
     * @return The instance corresponding to the specified JSON object.
     */
    static fromJson(map: JsonObject): Record;
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
/** Defines the options of a [[Record]] instance. */
export interface RecordOptions {
    /** The branch coverage. */
    branches: BranchCoverage;
    /** The function coverage. */
    functions: FunctionCoverage;
    /** The line coverage. */
    lines: LineCoverage;
}
