import {Token} from './token';

/**
 * Provides details for function coverage.
 */
export class FunctionData {

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
   * Creates a new branch data from the specified JSON map.
   * @param {object} map A JSON map representing a branch data.
   * @return {FunctionData} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJSON(map) {
    return !map || typeof map != 'object' ? null : new FunctionData(
      typeof map.functionName == 'string' ? map.functionName : '',
      typeof map.lineNumber == 'number' ? map.lineNumber : 0,
      typeof map.executionCount == 'number' ? map.executionCount : 0
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
    let token = asDefinition ? Token.FUNCTION_NAME : Token.FUNCTION_DATA;
    let number = asDefinition ? this.lineNumber : this.executionCount;
    return `${token}:${number},${this.functionName}`;
  }
}

/**
 * Provides the coverage data of functions.
 */
export class FunctionCoverage {

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
   * Creates a new branch data from the specified JSON map.
   * @param {object} map A JSON map representing a branch data.
   * @return {FunctionCoverage} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJSON(map) {
    return !map || typeof map != 'object' ? null : new FunctionCoverage(
      typeof map.found == 'number' ? map.found : 0,
      typeof map.hit == 'number' ? map.hit : 0,
      Array.isArray(map.data) ? map.data.map(item => FunctionData.fromJSON(item)).filter(item => item) : []
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
    let lines = this.data.map(item => item.toString(true));
    lines.push(...this.data.map(item => item.toString(false)));
    lines.push(`${Token.FUNCTIONS_FOUND}:${this.found}`);
    lines.push(`${Token.FUNCTIONS_HIT}:${this.hit}`);
    return lines.join('\n');
  }
}
