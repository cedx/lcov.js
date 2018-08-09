import {Token} from './token';

/**
 * Provides details for branch coverage.
 */
export class BranchData {

  /**
   * Initializes a new instance of the class.
   * @param lineNumber The line number.
   * @param blockNumber The block number.
   * @param branchNumber The branch number.
   * @param taken A number indicating how often this branch was taken.
   */
  constructor(public lineNumber: number, public blockNumber: number, public branchNumber: number, public taken: number = 0) {}

  /**
   * The class name.
   */
  get [Symbol.toStringTag](): string {
    return 'BranchData';
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param {Object} map A JSON map representing a branch data.
   * @return {BranchData} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  public static fromJson(map): BranchData | null {
    return !map || typeof map != 'object' ? null : new this(
      Number.isInteger(map.lineNumber) ? map.lineNumber : 0,
      Number.isInteger(map.blockNumber) ? map.blockNumber : 0,
      Number.isInteger(map.branchNumber) ? map.branchNumber : 0,
      Number.isInteger(map.taken) ? map.taken : 0
    );
  }

  /**
   * Converts this object to a map in JSON format.
   * @return The map in JSON format corresponding to this object.
   */
  public toJSON() {
    return {
      lineNumber: this.lineNumber,
      blockNumber: this.blockNumber,
      branchNumber: this.branchNumber,
      taken: this.taken
    };
  }

  /**
   * Returns a string representation of this object.
   * @return The string representation of this object.
   */
  public toString(): string {
    let value = `${Token.branchData}:${this.lineNumber},${this.blockNumber},${this.branchNumber}`;
    return this.taken > 0 ? `${value},${this.taken}` : `${value},-`;
  }
}

/**
 * Provides the coverage data of branches.
 */
export class BranchCoverage {

  /**
   * Initializes a new instance of the class.
   * @param [found] The number of branches found.
   * @param [hit] The number of branches found.
   * @param {BranchData[]} [data] The coverage data.
   */
  constructor(found = 0, hit = 0, data = []) {

    /**
     * The coverage data.
     * @type {BranchData[]}
     */
    this.data = data;

    /**
     * The number of branches found.
     * @type {number}
     */
    this.found = Math.max(0, found);

    /**
     * The number of branches hit.
     * @type {number}
     */
    this.hit = Math.max(0, hit);
  }

  /**
   * The class name.
   * @type {string}
   */
  get [Symbol.toStringTag](): string {
    return 'BranchCoverage';
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param {Object} map A JSON map representing a branch data.
   * @return {BranchCoverage} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  public static fromJson(map) {
    return !map || typeof map != 'object' ? null : new this(
      Number.isInteger(map.found) ? map.found : 0,
      Number.isInteger(map.hit) ? map.hit : 0,
      Array.isArray(map.data) ? map.data.map(item => BranchData.fromJson(item)).filter(item => item != null) : []
    );
  }

  /**
   * Converts this object to a map in JSON format.
   * @return The map in JSON format corresponding to this object.
   */
  public toJSON() {
    return {
      found: this.found,
      hit: this.hit,
      data: this.data.map(item => item.toJSON())
    };
  }

  /**
   * Returns a string representation of this object.
   * @return The string representation of this object.
   */
  public toString(): string {
    let lines = this.data.map(item => item.toString());
    lines.push(`${Token.branchesFound}:${this.found}`);
    lines.push(`${Token.branchesHit}:${this.hit}`);
    return lines.join('\n');
  }
}
