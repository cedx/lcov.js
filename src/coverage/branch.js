import {Token} from '../token';

/**
 * Provides the coverage data of branches.
 */
export class BranchCoverage {

  /**
   * Initializes a new instance of the class.
   * @param {object} [options] An object specifying values used to initialize this instance.
   */
  constructor(options = {}) {
    // TODO
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param {object} map A JSON map representing a branch data.
   * @return {BranchData} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJSON(map) {
    return !map || typeof map != 'object' ? null : new BranchData({
        branchNumber: map.branch,
        blockNumber: map.block,
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
      branch: this.branchNumber,
      block: this.blockNumber,
      line: this.lineNumber,
      taken: this.taken
    }
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
 * Provides details for branch coverage.
 */
export class BranchData {

  /**
   * Initializes a new instance of the class.
   * @param {object} [options] An object specifying values used to initialize this instance.
   */
  constructor(options = {}) {

    /**
     * The branch number.
     * @type {number}
     */
    this.branchNumber = typeof options.branchNumber == 'number' ? options.branchNumber : 0;

    /**
     * The block number.
     * @type {number}
     */
    this.blockNumber = typeof options.blockNumber == 'number' ? options.blockNumber : 0;

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
      branchNumber: map.branch,
      blockNumber: map.block,
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
      branch: this.branchNumber,
      block: this.blockNumber,
      line: this.lineNumber,
      taken: this.taken
    }
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
