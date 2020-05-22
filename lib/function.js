import { Token } from "./token.js";
/** Provides details for function coverage. */
export class FunctionData {
    /**
     * Creates a new function data.
     * @param functionName The function name.
     * @param lineNumber The line number of the function start.
     * @param executionCount The execution count.
     */
    constructor(functionName, lineNumber, executionCount = 0) {
        this.functionName = functionName;
        this.lineNumber = lineNumber;
        this.executionCount = executionCount;
    }
    /**
     * Creates a new function data from the specified JSON object.
     * @param map A JSON object representing a function data.
     * @return The instance corresponding to the specified JSON object.
     */
    static fromJson(map) {
        return new FunctionData(typeof map.functionName == "string" ? map.functionName : "", typeof map.lineNumber == "number" && Number.isInteger(map.lineNumber) ? map.lineNumber : 0, typeof map.executionCount == "number" && Number.isInteger(map.executionCount) ? map.executionCount : 0);
    }
    /**
     * Converts this object to a map in JSON format.
     * @return The map in JSON format corresponding to this object.
     */
    toJSON() {
        return {
            executionCount: this.executionCount,
            functionName: this.functionName,
            lineNumber: this.lineNumber
        };
    }
    /**
     * Returns a string representation of this object.
     * @param asDefinition Whether to return the function definition (i.e. name and line number) instead of its data (i.e. name and execution count).
     * @return The string representation of this object.
     */
    toString(asDefinition = false) {
        const token = asDefinition ? Token.functionName : Token.functionData;
        const count = asDefinition ? this.lineNumber : this.executionCount;
        return `${token}:${count},${this.functionName}`;
    }
}
/** Provides the coverage data of functions. */
export class FunctionCoverage {
    /**
     * Creates a new function coverage.
     * @param found The number of functions found.
     * @param hit The number of functions found.
     * @param data The coverage data.
     */
    constructor(found = 0, hit = 0, data = []) {
        this.found = found;
        this.hit = hit;
        this.data = data;
    }
    /**
     * Creates a new function coverage from the specified JSON object.
     * @param map A JSON object representing a function coverage.
     * @return The instance corresponding to the specified JSON object.
     */
    static fromJson(map) {
        return new FunctionCoverage(typeof map.found == "number" && Number.isInteger(map.found) ? map.found : 0, typeof map.hit == "number" && Number.isInteger(map.hit) ? map.hit : 0, Array.isArray(map.data) ? map.data.map(item => FunctionData.fromJson(item)) : []);
    }
    /**
     * Converts this object to a map in JSON format.
     * @return The map in JSON format corresponding to this object.
     */
    toJSON() {
        return {
            data: this.data.map(item => item.toJSON()),
            found: this.found,
            hit: this.hit
        };
    }
    /**
     * Returns a string representation of this object.
     * @return The string representation of this object.
     */
    toString() {
        const lines = this.data.map(item => item.toString(true));
        lines.push(...this.data.map(item => item.toString(false)));
        lines.push(`${Token.functionsFound}:${this.found}`, `${Token.functionsHit}:${this.hit}`);
        return lines.join("\n");
    }
}
