import { Token } from './token.js';
/** Provides details for branch coverage. */
export class BranchData {
    /**
     * Creates a new branch data.
     * @param lineNumber The line number.
     * @param blockNumber The block number.
     * @param branchNumber The branch number.
     * @param taken A number indicating how often this branch was taken.
     */
    constructor(lineNumber, blockNumber, branchNumber, taken = 0) {
        this.lineNumber = lineNumber;
        this.blockNumber = blockNumber;
        this.branchNumber = branchNumber;
        this.taken = taken;
    }
    /**
     * Creates a new branch data from the specified JSON object.
     * @param map A JSON object representing a branch data.
     * @return The instance corresponding to the specified JSON object.
     */
    static fromJson(map) {
        return new BranchData(typeof map.lineNumber == 'number' && Number.isInteger(map.lineNumber) ? map.lineNumber : 0, typeof map.blockNumber == 'number' && Number.isInteger(map.blockNumber) ? map.blockNumber : 0, typeof map.branchNumber == 'number' && Number.isInteger(map.branchNumber) ? map.branchNumber : 0, typeof map.taken == 'number' && Number.isInteger(map.taken) ? map.taken : 0);
    }
    /**
     * Converts this object to a map in JSON format.
     * @return The map in JSON format corresponding to this object.
     */
    toJSON() {
        return {
            blockNumber: this.blockNumber,
            branchNumber: this.branchNumber,
            lineNumber: this.lineNumber,
            taken: this.taken
        };
    }
    /**
     * Returns a string representation of this object.
     * @return The string representation of this object.
     */
    toString() {
        const value = `${Token.branchData}:${this.lineNumber},${this.blockNumber},${this.branchNumber}`;
        return this.taken > 0 ? `${value},${this.taken}` : `${value},-`;
    }
}
/** Provides the coverage data of branches. */
export class BranchCoverage {
    /**
     * Creates a new branch coverage.
     * @param found The number of branches found.
     * @param hit The number of branches found.
     * @param data The coverage data.
     */
    constructor(found = 0, hit = 0, data = []) {
        this.found = found;
        this.hit = hit;
        this.data = data;
    }
    /**
     * Creates a new branch data from the specified JSON object.
     * @param map A JSON object representing a branch data.
     * @return The instance corresponding to the specified JSON object.
     */
    static fromJson(map) {
        return new BranchCoverage(typeof map.found == 'number' && Number.isInteger(map.found) ? map.found : 0, typeof map.hit == 'number' && Number.isInteger(map.hit) ? map.hit : 0, Array.isArray(map.data) ? map.data.map(item => BranchData.fromJson(item)) : []);
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
        lines.push(`${Token.branchesFound}:${this.found}`);
        lines.push(`${Token.branchesHit}:${this.hit}`);
        return lines.join('\n');
    }
}
