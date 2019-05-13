import {Token} from './token.js';

/** Provides the coverage data of functions. */
export class FunctionCoverage {

  /**
   * Creates a new function coverage.
   * @param {number} [found] The number of functions found.
   * @param {number} [hit] The number of functions hit.
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
   * Creates a new function coverage from the specified JSON map.
   * @param {object} map A JSON map representing a function coverage.
   * @return {FunctionCoverage} The instance corresponding to the specified JSON map.
   */
  static fromJson(map) {
    return new FunctionCoverage(
      Number.isInteger(map.found) ? map.found : 0,
      Number.isInteger(map.hit) ? map.hit : 0,
      Array.isArray(map.data) ? map.data.map(FunctionData.fromJson) : []
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
    const lines = this.data.map(item => item.toString(true));
    lines.push(...this.data.map(item => item.toString(false)));
    lines.push(`${Token.functionsFound}:${this.found}`, `${Token.functionsHit}:${this.hit}`);
    return lines.join('\n');
  }
}

/** Provides details for function coverage. */
export class FunctionData {

  /**
   * Creates a new function data.
   * @param {string} functionName The function name.
   * @param {number} lineNumber The line number of the function start.
   * @param {number} [executionCount] The execution count.
   */
  constructor(functionName, lineNumber, executionCount = 0) {

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
   * Creates a new function data from the specified JSON map.
   * @param {object} map A JSON map representing a function data.
   * @return {FunctionData} The instance corresponding to the specified JSON map.
   */
  static fromJson(map) {
    return new FunctionData(
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
   * @param {boolean} [asDefinition] Whether to return the function definition (e.g. name and line number) instead of its data (e.g. name and execution count).
   * @return {string} The string representation of this object.
   */
  toString(asDefinition = false) {
    const token = asDefinition ? Token.functionName : Token.functionData;
    const count = asDefinition ? this.lineNumber : this.executionCount;
    return `${token}:${count},${this.functionName}`;
  }
}
