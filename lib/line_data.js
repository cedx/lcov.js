'use strict';
const {Token} = require('./token');

/**
 * Provides details for line coverage.
 */
exports.LineData = class LineData {

  /**
   * Initializes a new instance of the class.
   * @param {number} [lineNumber] The line number.
   * @param {number} [executionCount] The execution count.
   * @param {string} [checksum] The data checksum.
   */
  constructor(lineNumber = 0, executionCount = 0, checksum = '') {

    /**
     * The data checksum.
     * @type {string}
     */
    this.checksum = checksum;

    /**
     * The execution count.
     * @type {number}
     */
    this.executionCount = executionCount;

    /**
     * The line number.
     * @type {number}
     */
    this.lineNumber = lineNumber;
  }

  /**
   * The class name.
   * @type {string}
   */
  get [Symbol.toStringTag]() {
    return 'LineData';
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param {object} map A JSON map representing a branch data.
   * @return {LineData} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJson(map) {
    return !map || typeof map != 'object' ? null : new LineData(
      Number.isInteger(map.lineNumber) ? map.lineNumber : 0,
      Number.isInteger(map.executionCount) ? map.executionCount : 0,
      typeof map.checksum == 'string' ? map.checksum : ''
    );
  }

  /**
   * Converts this object to a map in JSON format.
   * @return {object} The map in JSON format corresponding to this object.
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
   * @return {string} The string representation of this object.
   */
  toString() {
    let value = `${Token.lineData}:${this.lineNumber},${this.executionCount}`;
    return this.checksum.length ? `${value},${this.checksum}` : value;
  }
};
