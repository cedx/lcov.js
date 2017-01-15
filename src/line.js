import {Token} from './token';

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
   * @return {LineData} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJSON(map) {
    return !map || typeof map != 'object' ? null : new LineData({
      checksum: map.checksum,
      executionCount: map.count,
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
      count: this.executionCount,
      line: this.lineNumber
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
   * @param {object} [options] An object specifying values used to initialize this instance.
   */
  constructor(options = {}) {

    /**
     * The coverage data.
     * @type {LineData[]}
     */
    this.data = Array.isArray(options.data) ? options.data : [];

    /**
     * The number of lines found.
     * @type {number}
     */
    this.found = typeof options.found == 'number' ? options.found : 0;

    /**
     * The number of lines hit.
     * @type {number}
     */
    this.hit = typeof options.hit == 'number' ? options.hit : 0;
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param {object} map A JSON map representing a branch data.
   * @return {LineCoverage} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJSON(map) {
    return !map || typeof map != 'object' ? null : new LineCoverage({
      data: Array.isArray(map.data) ? map.data.map(item => LineData.fromJSON(item)).filter(item => item) : [],
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
    lines.push(`${Token.LINES_FOUND}:${this.found}`);
    lines.push(`${Token.LINES_HIT}:${this.hit}`);
    return lines.join('\n');
  }
}
