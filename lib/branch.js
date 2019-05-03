import {Token} from './token.js';

/** Provides the coverage data of branches. */
export class BranchCoverage {

  /**
   * The coverage data.
   * @type {BranchData[]}
   */
  data;

  /**
   * The number of branches found.
   * @type {number}
   */
  found;

  /**
   * The number of branches hit.
   * @type {number}
   */
  hit;

  /**
   * Creates a new branch coverage.
   * @param {number} [found] The number of branches found.
   * @param {number} [hit] The number of branches hit.
   * @param {BranchData[]} [data] The coverage data.
   */
  constructor(found = 0, hit = 0, data = []) {
    this.data = data;
    this.found = found;
    this.hit = hit;
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param {JsonMap} map A JSON map representing a branch data.
   * @return {BranchCoverage} The instance corresponding to the specified JSON map.
   */
  static fromJson(map) {
    return new BranchCoverage(
      Number.isInteger(map.found) ? map.found : 0,
      Number.isInteger(map.hit) ? map.hit : 0,
      Array.isArray(map.data) ? map.data.map(BranchData.fromJson) : []
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
    lines.push(`${Token.branchesFound}:${this.found}`);
    lines.push(`${Token.branchesHit}:${this.hit}`);
    return lines.join('\n');
  }
}

/** Provides details for branch coverage. */
export class BranchData {

  /**
   * The block number.
   * @type {number}
   */
  blockNumber;

  /**
   * The branch number.
   * @type {number}
   */
  branchNumber;

  /**
   * The line number.
   * @type {number}
   */
  lineNumber;

  /**
   * A number indicating how often this branch was taken.
   * @type {number}
   */
  taken;

  /**
   * Creates a new branch data.
   * @param {number} lineNumber The line number.
   * @param {number} blockNumber The block number.
   * @param {number} branchNumber The branch number.
   * @param {number} [taken] A number indicating how often this branch was taken.
   */
  constructor(lineNumber, blockNumber, branchNumber, taken = 0) {
    this.blockNumber = blockNumber;
    this.branchNumber = branchNumber;
    this.lineNumber = lineNumber;
    this.taken = taken;
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param {JsonMap} map A JSON map representing a branch data.
   * @return {BranchData} The instance corresponding to the specified JSON map.
   */
  static fromJson(map) {
    return new BranchData(
      Number.isInteger(map.lineNumber) ? map.lineNumber : 0,
      Number.isInteger(map.blockNumber) ? map.blockNumber : 0,
      Number.isInteger(map.branchNumber) ? map.branchNumber : 0,
      Number.isInteger(map.taken) ? map.taken : 0
    );
  }

  /**
   * Converts this object to a map in JSON format.
   * @return {JsonMap} The map in JSON format corresponding to this object.
   */
  toJSON() {
    return {
      blockNumber: this.blockNumber,
      branchNumber: this.branchNumber,
      lineNumber: this.lineNumber,
      taken: this.taken
    };
  }

  /**
   * Returns a string representation of this object.
   * @return {string} The string representation of this object.
   */
  toString() {
    const value = `${Token.branchData}:${this.lineNumber},${this.blockNumber},${this.branchNumber}`;
    return this.taken > 0 ? `${value},${this.taken}` : `${value},-`;
  }
}