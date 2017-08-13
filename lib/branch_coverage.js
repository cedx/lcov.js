'use strict';

const {BranchData} = require('./branch_data');
const {Token} = require('./token');

/**
 * Provides the coverage data of branches.
 */
exports.BranchCoverage = class BranchCoverage {

  /**
   * Initializes a new instance of the class.
   * @param {number} [found] The number of branches found.
   * @param {number} [hit] The number of branches found.
   * @param {BranchData[]} [data] The coverage data.
   */
  constructor(found = 0, hit = 0, data = []) {

    /**
     * The coverage data.
     * @type {BranchData[]}
     */
    this.data = data;

    /**
     * The number of branches found.
     * @type {number}
     */
    this.found = found;

    /**
     * The number of branches hit.
     * @type {number}
     */
    this.hit = hit;
  }

  /**
   * The class name.
   * @type {string}
   */
  get [Symbol.toStringTag]() {
    return 'BranchCoverage';
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param {object} map A JSON map representing a branch data.
   * @return {BranchCoverage} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJson(map) {
    return !map || typeof map != 'object' ? null : new BranchCoverage(
      Number.isInteger(map.found) ? map.found : 0,
      Number.isInteger(map.hit) ? map.hit : 0,
      Array.isArray(map.data) ? map.data.map(item => BranchData.fromJson(item)).filter(item => item) : []
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
    lines.push(`${Token.BRANCHES_FOUND}:${this.found}`);
    lines.push(`${Token.BRANCHES_HIT}:${this.hit}`);
    return lines.join('\n');
  }
};
