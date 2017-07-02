import {Token} from './token';

/**
 * Provides details for line coverage.
 */
export class LineData {

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
   * Creates a new branch data from the specified JSON map.
   * @param {object} map A JSON map representing a branch data.
   * @return {LineData} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJSON(map) {
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
    let value = `${Token.LINE_DATA}:${this.lineNumber},${this.executionCount}`;
    return this.checksum.length ? `${value},${this.checksum}` : value;
  }
}

/**
 * Provides the coverage data of lines.
 */
export class LineCoverage {

  /**
   * Initializes a new instance of the class.
   * @param {number} [found] The number of lines found.
   * @param {number} [hit] The number of lines found.
   * @param {LineData[]} [data] The coverage data.
   */
  constructor(found = 0, hit = 0, data = []) {

    /**
     * The coverage data.
     * @type {LineData[]}
     */
    this.data = data;

    /**
     * The number of lines found.
     * @type {number}
     */
    this.found = found;

    /**
     * The number of lines hit.
     * @type {number}
     */
    this.hit = hit;
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param {object} map A JSON map representing a branch data.
   * @return {LineCoverage} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJSON(map) {
    return !map || typeof map != 'object' ? null : new LineCoverage(
      Number.isInteger(map.found) ? map.found : 0,
      Number.isInteger(map.hit) ? map.hit : 0,
      Array.isArray(map.data) ? map.data.map(item => LineData.fromJSON(item)).filter(item => item) : []
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
    lines.push(`${Token.LINES_FOUND}:${this.found}`);
    lines.push(`${Token.LINES_HIT}:${this.hit}`);
    return lines.join('\n');
  }
}
