'use strict';
const {Token} = require('./token');

/**
 * Provides details for branch coverage.
 */
exports.BranchData = class BranchData {

  /**
   * Initializes a new instance of the class.
   * @param {number} lineNumber The line number.
   * @param {number} blockNumber The block number.
   * @param {number} branchNumber The branch number.
   * @param {number} [taken] A number indicating how often this branch was taken.
   */
  constructor(lineNumber, blockNumber, branchNumber, taken = 0) {

    /**
     * The block number.
     * @type {number}
     */
    this.blockNumber = Math.max(0, blockNumber);

    /**
     * The branch number.
     * @type {number}
     */
    this.branchNumber = Math.max(0, branchNumber);

    /**
     * The line number.
     * @type {number}
     */
    this.lineNumber = Math.max(0, lineNumber);

    /**
     * A number indicating how often this branch was taken.
     * @type {number}
     */
    this.taken = Math.max(0, taken);
  }

  /**
   * The class name.
   * @type {string}
   */
  get [Symbol.toStringTag]() {
    return 'BranchData';
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param {object} map A JSON map representing a branch data.
   * @return {BranchData} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJson(map) {
    return !map || typeof map != 'object' ? null : new BranchData(
      Number.isInteger(map.lineNumber) ? map.lineNumber : 0,
      Number.isInteger(map.blockNumber) ? map.blockNumber : 0,
      Number.isInteger(map.branchNumber) ? map.branchNumber : 0,
      Number.isInteger(map.taken) ? map.taken : 0
    );
  }

  /**
   * Converts this object to a map in JSON format.
   * @return {object} The map in JSON format corresponding to this object.
   */
  toJSON() {
    return {
      lineNumber: this.lineNumber,
      blockNumber: this.blockNumber,
      branchNumber: this.branchNumber,
      taken: this.taken
    };
  }

  /**
   * Returns a string representation of this object.
   * @return {string} The string representation of this object.
   */
  toString() {
    let value = `${Token.branchData}:${this.lineNumber},${this.blockNumber},${this.branchNumber}`;
    return this.taken > 0 ? `${value},${this.taken}` : `${value},-`;
  }
};
