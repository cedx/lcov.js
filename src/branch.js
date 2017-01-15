import {Token} from './token';

/**
 * Provides details for branch coverage.
 */
export class BranchData {

  /**
   * Initializes a new instance of the class.
   * @param {object} [options] An object specifying values used to initialize this instance.
   */
  constructor(options = {}) {

    /**
     * The block number.
     * @type {number}
     */
    this.blockNumber = typeof options.blockNumber == 'number' ? options.blockNumber : 0;

    /**
     * The branch number.
     * @type {number}
     */
    this.branchNumber = typeof options.branchNumber == 'number' ? options.branchNumber : 0;

    /**
     * The line number.
     * @type {number}
     */
    this.lineNumber = typeof options.lineNumber == 'number' ? options.lineNumber : 0;

    /**
     * A number indicating how often this branch was taken.
     * @type {number}
     */
    this.taken = typeof options.taken == 'number' ? options.taken : 0;
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param {object} map A JSON map representing a branch data.
   * @return {BranchData} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJSON(map) {
    return !map || typeof map != 'object' ? null : new BranchData({
      blockNumber: map.block,
      branchNumber: map.branch,
      lineNumber: map.line,
      taken: map.taken
    });
  }

  /**
   * Converts this object to a map in JSON format.
   * @return {object} The map in JSON format corresponding to this object.
   */
  toJSON() {
    return {
      block: this.blockNumber,
      branch: this.branchNumber,
      line: this.lineNumber,
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
   * @param {object} [options] An object specifying values used to initialize this instance.
   */
  constructor(options = {}) {

    /**
     * The coverage data.
     * @type {BranchData[]}
     */
    this.data = Array.isArray(options.data) ? options.data : [];

    /**
     * The number of branches found.
     * @type {number}
     */
    this.found = typeof options.found == 'number' ? options.found : 0;

    /**
     * The number of branches hit.
     * @type {number}
     */
    this.hit = typeof options.hit == 'number' ? options.hit : 0;
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param {object} map A JSON map representing a branch data.
   * @return {BranchCoverage} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJSON(map) {
    return !map || typeof map != 'object' ? null : new BranchCoverage({
      data: Array.isArray(map.data) ? map.data.map(item => BranchData.fromJSON(item)).filter(item => item) : [],
      found: map.found,
      hit: map.hit
    });
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
