'use strict';
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
    this.found = Math.max(0, found);

    /**
     * The number of functions hit.
     * @type {number}
     */
    this.hit = Math.max(0, hit);
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
    return !map || typeof map != 'object' ? null : new this(
      Number.isInteger(map.found) ? map.found : 0,
      Number.isInteger(map.hit) ? map.hit : 0,
      Array.isArray(map.data) ? map.data.map(item => exports.FunctionData.fromJson(item)).filter(item => item) : []
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

/**
 * Provides details for function coverage.
 */
exports.FunctionData = class FunctionData {

  /**
   * Initializes a new instance of the class.
   * @param {string} functionName The function name.
   * @param {number} lineNumber The line number of the function start.
   * @param {number} [executionCount] The execution count.
   */
  constructor(functionName, lineNumber, executionCount = 0) {

    /**
     * The execution count.
     * @type {number}
     */
    this.executionCount = Math.max(0, executionCount);

    /**
     * The function name.
     * @type {string}
     */
    this.functionName = functionName;

    /**
     * The line number of the function start.
     * @type {number}
     */
    this.lineNumber = Math.max(0, lineNumber);
  }

  /**
   * The class name.
   * @type {string}
   */
  get [Symbol.toStringTag]() {
    return 'FunctionData';
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param {object} map A JSON map representing a branch data.
   * @return {FunctionData} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJson(map) {
    return !map || typeof map != 'object' ? null : new this(
      typeof map.functionName == 'string' ? map.functionName : '',
      Number.isInteger(map.lineNumber) ? map.lineNumber : 0,
      Number.isInteger(map.executionCount) ? map.executionCount : 0
    );
  }

  /**
   * Converts this object to a map in JSON format.
   * @return {object} The map in JSON format corresponding to this object.
   */
  toJSON() {
    return {
      functionName: this.functionName,
      lineNumber: this.lineNumber,
      executionCount: this.executionCount
    };
  }

  /**
   * Returns a string representation of this object.
   * @param {boolean} asDefinition Whether to return the function definition (e.g. name and line number) instead of its data (e.g. name and execution count).
   * @return {string} The string representation of this object.
   */
  toString(asDefinition = false) {
    let token = asDefinition ? Token.functionName : Token.functionData;
    let number = asDefinition ? this.lineNumber : this.executionCount;
    return `${token}:${number},${this.functionName}`;
  }
};
