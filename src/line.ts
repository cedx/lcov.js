import {Token} from './token';

/**
 * Provides details for line coverage.
 */
export class LineData {

  /**
   * Initializes a new instance of the class.
   * @param {number} lineNumber The line number.
   * @param {number} [executionCount] The execution count.
   * @param {string} [checksum] The data checksum.
   */
  constructor(lineNumber, executionCount = 0, checksum = '') {

    /**
     * The data checksum.
     * @type {string}
     */
    this.checksum = checksum;

    /**
     * The execution count.
     * @type {number}
     */
    this.executionCount = Math.max(0, executionCount);

    /**
     * The line number.
     * @type {number}
     */
    this.lineNumber = Math.max(0, lineNumber);
  }

  /**
   * The class name.
   * @type {string}
   */
  public get [Symbol.toStringTag](): string {
    return 'LineData';
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param {Object} map A JSON map representing a branch data.
   * @return {LineData} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  public static fromJson(map) {
    return !map || typeof map != 'object' ? null : new this(
      Number.isInteger(map.lineNumber) ? map.lineNumber : 0,
      Number.isInteger(map.executionCount) ? map.executionCount : 0,
      typeof map.checksum == 'string' ? map.checksum : ''
    );
  }

  /**
   * Converts this object to a map in JSON format.
   * @return {Object} The map in JSON format corresponding to this object.
   */
  public toJSON() {
    return {
      lineNumber: this.lineNumber,
      executionCount: this.executionCount,
      checksum: this.checksum
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
    this.found = Math.max(0, found);

    /**
     * The number of lines hit.
     * @type {number}
     */
    this.hit = Math.max(0, hit);
  }

  /**
   * The class name.
   * @type {string}
   */
  public get [Symbol.toStringTag](): string {
    return 'LineCoverage';
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param {Object} map A JSON map representing a branch data.
   * @return {LineCoverage} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  public static fromJson(map) {
    return !map || typeof map != 'object' ? null : new this(
      Number.isInteger(map.found) ? map.found : 0,
      Number.isInteger(map.hit) ? map.hit : 0,
      Array.isArray(map.data) ? map.data.map(item => LineData.fromJson(item)).filter(item => item != null) : []
    );
  }

  /**
   * Converts this object to a map in JSON format.
   * @return {Object} The map in JSON format corresponding to this object.
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
   * @return {string} The string representation of this object.
   */
  toString() {
    let lines = this.data.map(item => item.toString());
    lines.push(`${Token.linesFound}:${this.found}`);
    lines.push(`${Token.linesHit}:${this.hit}`);
    return lines.join('\n');
  }
}
