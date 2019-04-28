import {Token} from './token.js';

/** Provides the coverage data of lines. */
export class LineCoverage {

  /**
   * The coverage data.
   * @type {LineData[]}
   */
  data;

  /**
   * The number of lines found.
   * @type {number}
   */
  found;

  /**
   * The number of lines hit.
   * @type {number}
   */
  hit;

  /**
   * Creates a new line coverage.
   * @param {number} [found] The number of lines found.
   * @param {number} [hit] The number of lines hit.
   * @param {LineData[]} [data] The coverage data.
   */
  constructor(found = 0, hit = 0, data = []) {
    this.data = data;
    this.found = found;
    this.hit = hit;
  }

  /**
   * Creates a new line coverage from the specified JSON map.
   * @param {JsonMap} map A JSON map representing a line coverage.
   * @return {LineCoverage} The instance corresponding to the specified JSON map.
   */
  static fromJson(map) {
    return new LineCoverage(
      Number.isInteger(map.found) ? map.found : 0,
      Number.isInteger(map.hit) ? map.hit : 0,
      Array.isArray(map.data) ? map.data.map(LineData.fromJson) : []
    );
  }

  /**
   * Converts this object to a map in JSON format.
   * @return {JsonMap} The map in JSON format corresponding to this object.
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
    const lines = this.data.map(item => item.toString());
    lines.push(`${Token.linesFound}:${this.found}`);
    lines.push(`${Token.linesHit}:${this.hit}`);
    return lines.join('\n');
  }
}

/** Provides details for line coverage. */
export class LineData {

  /**
   * The data checksum.
   * @type {string}
   */
  checksum;

  /**
   * The execution count.
   * @type {number}
   */
  executionCount;

  /**
   * The line number.
   * @type {number}
   */
  lineNumber;

  /**
   * Creates a new line data.
   * @param {number} lineNumber The line number.
   * @param {number} [executionCount] The execution count.
   * @param {string} [checksum] The data checksum.
   */
  constructor(lineNumber, executionCount = 0, checksum = '') {
    this.checksum = checksum;
    this.executionCount = executionCount;
    this.lineNumber = lineNumber;
  }

  /**
   * Creates a new line data from the specified JSON map.
   * @param {JsonMap} map A JSON map representing a line data.
   * @return {LineData} The instance corresponding to the specified JSON map.
   */
  static fromJson(map) {
    return new LineData(
      Number.isInteger(map.lineNumber) ? map.lineNumber : 0,
      Number.isInteger(map.executionCount) ? map.executionCount : 0,
      typeof map.checksum == 'string' ? map.checksum : ''
    );
  }

  /**
   * Converts this object to a map in JSON format.
   * @return {JsonMap} The map in JSON format corresponding to this object.
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
    const value = `${Token.lineData}:${this.lineNumber},${this.executionCount}`;
    return this.checksum.length ? `${value},${this.checksum}` : value;
  }
}
