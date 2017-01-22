import {Token} from './token';

/**
 * Provides details for branch coverage.
 */
export class BranchData {

  /**
   * Initializes a new instance of the class.
   * @param {number} [lineNumber] The line number.
   * @param {number} [blockNumber] The block number.
   * @param {number} [branchNumber] The branch number.
   * @param {number} [taken] A number indicating how often this branch was taken.
   */
  constructor(lineNumber = 0, blockNumber = 0, branchNumber = 0, taken = 0) {

    /**
     * The block number.
     * @type {number}
     */
    this.blockNumber = blockNumber;

    /**
     * The branch number.
     * @type {number}
     */
    this.branchNumber = branchNumber;

    /**
     * The line number.
     * @type {number}
     */
    this.lineNumber = lineNumber;

    /**
     * A number indicating how often this branch was taken.
     * @type {number}
     */
    this.taken = taken;
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param {object} map A JSON map representing a branch data.
   * @return {BranchData} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJSON(map) {
    return !map || typeof map != 'object' ? null : new BranchData(
      typeof map.lineNumber == 'number' ? map.lineNumber : 0,
      typeof map.blockNumber == 'number' ? map.blockNumber : 0,
      typeof map.branchNumber == 'number' ? map.branchNumber : 0,
      typeof map.taken == 'number' ? map.taken : 0
    );
  }

  /**
   * Converts this object to a map in JSON format.
   * @return {object} The map in JSON format corresponding to this object.
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
   * @return {string} The string representation of this object.
   */
  toString() {
    let value = `${Token.BRANCH_DATA}:${this.lineNumber},${this.blockNumber},${this.branchNumber}`;
    return this.taken > 0 ? `${value},${this.taken}` : `${value},-`;
  }
}

/**
 * Provides the coverage data of branches.
 */
export class BranchCoverage {

  /**
   * Initializes a new instance of the class.
   * @param {number} [found] The number of branches found.
   * @param {number} [hit] The number of branches found.
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
    this.found = found;

    /**
     * The number of branches hit.
     * @type {number}
     */
    this.hit = hit;
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param {object} map A JSON map representing a branch data.
   * @return {BranchCoverage} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJSON(map) {
    return !map || typeof map != 'object' ? null : new BranchCoverage(
      typeof map.found == 'number' ? map.found : 0,
      typeof map.hit == 'number' ? map.hit : 0,
      Array.isArray(map.data) ? map.data.map(item => BranchData.fromJSON(item)).filter(item => item) : []
    );
  }

  /**
   * Converts this object to a map in JSON format.
   * @return {object} The map in JSON format corresponding to this object.
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
   * @return {string} The string representation of this object.
   */
  toString() {
    let lines = this.data.map(item => item.toString());
    lines.push(`${Token.BRANCHES_FOUND}:${this.found}`);
    lines.push(`${Token.BRANCHES_HIT}:${this.hit}`);
    return lines.join('\n');
  }
}
