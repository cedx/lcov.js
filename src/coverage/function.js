import {Token} from '../token';

/**
 * Provides the coverage data of functions.
 */
export class FunctionCoverage {

  /**
   * Initializes a new instance of the class.
   * @param {object} [options] An object specifying values used to initialize this instance.
   */
  constructor(options = {}) {

  }
}

/**
 * Provides details for function coverage.
 */
export class FunctionData {

  /**
   * Initializes a new instance of the class.
   * @param {object} [options] An object specifying values used to initialize this instance.
   */
  constructor(options = {}) {

    /**
     * The execution count.
     * @type {number}
     */
    this.executionCount = typeof options.executionCount == 'number' ? options.executionCount : 0;

    /**
     * The function name.
     * @type {string}
     */
    this.functionName = typeof options.functionName == 'string' ? options.functionName : '';

    /**
     * The line number of the function start.
     * @type {number}
     */
    this.lineNumber = typeof options.lineNumber == 'number' ? options.lineNumber : 0;
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param {object} map A JSON map representing a branch data.
   * @return {BranchData} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJSON(map) {
    return !map || typeof map != 'object' ? null : new FunctionData({
      executionCount: map.hit,
      functionName: map.name,
      lineNumber: map.line
    });
  }

  /**
   * Converts this object to a map in JSON format.
   * @return {object} The map in JSON format corresponding to this object.
   */
  toJSON() {
    return {
      hit: this.executionCount,
      line: this.lineNumber,
      name: this.functionName
    }
  }

  /**
   * Returns a string representation of this object.
   * @param {boolean} asDefinition Value indicating whether to return the function definition (e.g. name and line number) instead of its data (e.g. name and execution count).
   * @return {string} The string representation of this object.
   */
  toString(asDefinition = false) {
    let token = asDefinition ? Token.FUNCTION_NAME : Token.FUNCTION_DATA;
    let number = asDefinition ? this.lineNumber : this.executionCount;
    return `${token}:${number},${this.functionName}`;
  }
}
