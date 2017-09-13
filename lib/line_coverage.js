'use strict';

const {LineData} = require('./line_data');
const {Token} = require('./token');

/**
 * Provides the coverage data of lines.
 */
exports.LineCoverage = class LineCoverage {

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
  get [Symbol.toStringTag]() {
    return 'LineCoverage';
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param {object} map A JSON map representing a branch data.
   * @return {LineCoverage} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJson(map) {
    return !map || typeof map != 'object' ? null : new LineCoverage(
      Number.isInteger(map.found) ? map.found : 0,
      Number.isInteger(map.hit) ? map.hit : 0,
      Array.isArray(map.data) ? map.data.map(item => LineData.fromJson(item)).filter(item => item) : []
    );
  }

  /**
   * Converts this object to a map in JSON format.
   * @return {object} The map in JSON format corresponding to this object.
   */
  toJSON() {
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
};
