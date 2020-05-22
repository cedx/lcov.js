import { Token } from "./token.js";
/** Provides details for line coverage. */
export class LineData {
    /**
     * Creates a new line data.
     * @param lineNumber The line number.
     * @param executionCount The execution count.
     * @param checksum The data checksum.
     */
    constructor(lineNumber, executionCount = 0, checksum = "") {
        this.lineNumber = lineNumber;
        this.executionCount = executionCount;
        this.checksum = checksum;
    }
    /**
     * Creates a new line data from the specified JSON object.
     * @param map A JSON object representing a line data.
     * @return The instance corresponding to the specified JSON object.
     */
    static fromJson(map) {
        return new LineData(typeof map.lineNumber == "number" && Number.isInteger(map.lineNumber) ? map.lineNumber : 0, typeof map.executionCount == "number" && Number.isInteger(map.executionCount) ? map.executionCount : 0, typeof map.checksum == "string" ? map.checksum : "");
    }
    /**
     * Converts this object to a map in JSON format.
     * @return The map in JSON format corresponding to this object.
     */
    toJSON() {
        return {
            checksum: this.checksum,
            executionCount: this.executionCount,
            lineNumber: this.lineNumber
        };
    }
    /**
     * Returns a string representation of this object.
     * @return The string representation of this object.
     */
    toString() {
        const value = `${Token.lineData}:${this.lineNumber},${this.executionCount}`;
        return this.checksum.length ? `${value},${this.checksum}` : value;
    }
}
/** Provides the coverage data of lines. */
export class LineCoverage {
    /**
     * Creates a new line coverage.
     * @param found The number of lines found.
     * @param hit The number of lines found.
     * @param data The coverage data.
     */
    constructor(found = 0, hit = 0, data = []) {
        this.found = found;
        this.hit = hit;
        this.data = data;
    }
    /**
     * Creates a new line coverage from the specified JSON object.
     * @param map A JSON object representing a line coverage.
     * @return The instance corresponding to the specified JSON object.
     */
    static fromJson(map) {
        return new LineCoverage(typeof map.found == "number" && Number.isInteger(map.found) ? map.found : 0, typeof map.hit == "number" && Number.isInteger(map.hit) ? map.hit : 0, Array.isArray(map.data) ? map.data.map(item => LineData.fromJson(item)) : []);
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
        const lines = this.data.map(item => item.toString());
        lines.push(`${Token.linesFound}:${this.found}`, `${Token.linesHit}:${this.hit}`);
        return lines.join("\n");
    }
}
