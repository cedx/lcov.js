'use strict';

const {FunctionData} = require('./function_data');
const {Token} = require('./token');

/**
 * Provides the coverage data of functions.
 */
exports.FunctionCoverage = class FunctionCoverage {

  /**
   * Initializes a new instance of the class.
   * @param {number} [found] The number of functions found.
   * @param {number} [hit] The number of functions found.
   * @param {FunctionData[]} [data] The coverage data.
   */
  constructor(found = 0, hit = 0, data = []) {

    /**
     * The coverage data.
     * @type {FunctionData[]}
     */
    this.data = data;

    /**
     * The number of functions found.
     * @type {number}
     */
    this.found = found;

    /**
     * The number of functions hit.
     * @type {number}
     */
    this.hit = hit;
  }

  /**
   * The class name.
   * @type {string}
   */
  get [Symbol.toStringTag]() {
    return 'FunctionCoverage';
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param {object} map A JSON map representing a branch data.
   * @return {FunctionCoverage} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJson(map) {
    return !map || typeof map != 'object' ? null : new FunctionCoverage(
      Number.isInteger(map.found) ? map.found : 0,
      Number.isInteger(map.hit) ? map.hit : 0,
      Array.isArray(map.data) ? map.data.map(item => FunctionData.fromJson(item)).filter(item => item) : []
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
    let lines = this.data.map(item => item.toString(true));
    lines.push(...this.data.map(item => item.toString(false)));
    lines.push(`${Token.functionsFound}:${this.found}`);
    lines.push(`${Token.functionsHit}:${this.hit}`);
    return lines.join('\n');
  }
};
