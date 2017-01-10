import {Token} from '../token';

/**
 * Provides the coverage data of lines.
 */
export class LineCoverage {

  /**
   * Initializes a new instance of the class.
   * @param {object} [options] An object specifying values used to initialize this instance.
   */
  constructor(options = {}) {

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
 * Provides details for line coverage.
 */
export class LineData {

  /**
   * Initializes a new instance of the class.
   * @param {object} [options] An object specifying values used to initialize this instance.
   */
  constructor(options = {}) {

    /**
     * The data checksum.
     * @type {string}
     */
    this.checksum = typeof options.checksum == 'string' ? options.checksum : '';

    /**
     * The execution count.
     * @type {number}
     */
    this.executionCount = typeof options.executionCount == 'number' ? options.executionCount : 0;

    /**
     * The line number.
     * @type {number}
     */
    this.lineNumber = typeof options.lineNumber == 'number' ? options.lineNumber : 0;
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param {object} map A JSON map representing a branch data.
   * @return {BranchData} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJSON(map) {
    return !map || typeof map != 'object' ? null : new LineData({
      checksum: map.checksum,
      executionCount: map.hit,
      lineNumber: map.line
    });
  }

  /**
   * Converts this object to a map in JSON format.
   * @return {object} The map in JSON format corresponding to this object.
   */
  toJSON() {
    return {
      checksum: this.checksum,
      hit: this.executionCount,
      line: this.lineNumber
    }
  }

  /**
   * Returns a string representation of this object.
   * @return {string} The string representation of this object.
   */
  toString() {
    let value = `${Token.LINE_DATA}:${this.lineNumber},${this.executionCount}`;
    return this.checksum.length ? `${value},${this.checksum}` : value;
  }
}
