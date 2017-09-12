'use strict';
const {Token} = require('./token');

/**
 * Provides details for function coverage.
 */
exports.FunctionData = class FunctionData {

  /**
   * Initializes a new instance of the class.
   * @param {string} [functionName] The function name.
   * @param {number} [lineNumber] The line number of the function start.
   * @param {number} [executionCount] The execution count.
   */
  constructor(functionName = '', lineNumber = 0, executionCount = 0) {

    /**
     * The execution count.
     * @type {number}
     */
    this.executionCount = executionCount;

    /**
     * The function name.
     * @type {string}
     */
    this.functionName = functionName;

    /**
     * The line number of the function start.
     * @type {number}
     */
    this.lineNumber = lineNumber;
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
    return !map || typeof map != 'object' ? null : new FunctionData(
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
      executionCount: this.executionCount,
      functionName: this.functionName,
      lineNumber: this.lineNumber
    };
  }

  /**
   * Returns a string representation of this object.
   * @param {boolean} asDefinition Value indicating whether to return the function definition (e.g. name and line number) instead of its data (e.g. name and execution count).
   * @return {string} The string representation of this object.
   */
  toString(asDefinition = false) {
    let token = asDefinition ? Token.functionName : Token.functionData;
    let number = asDefinition ? this.lineNumber : this.executionCount;
    return `${token}:${number},${this.functionName}`;
  }
};
