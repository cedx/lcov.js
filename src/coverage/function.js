import {Token} from '../token';

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
   * @return {FunctionData} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJSON(map) {
    return !map || typeof map != 'object' ? null : new FunctionData({
      executionCount: map.count,
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
      count: this.executionCount,
      line: this.lineNumber,
      name: this.functionName
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
   * @param {object} [options] An object specifying values used to initialize this instance.
   */
  constructor(options = {}) {

    /**
     * The coverage data.
     * @type {FunctionData[]}
     */
    this.data = Array.isArray(options.data) ? options.data : [];

    /**
     * The number of functions found.
     * @type {number}
     */
    this.found = typeof options.found == 'number' ? options.found : 0;

    /**
     * The number of functions hit.
     * @type {number}
     */
    this.hit = typeof options.hit == 'number' ? options.hit : 0;
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param {object} map A JSON map representing a branch data.
   * @return {FunctionCoverage} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJSON(map) {
    return !map || typeof map != 'object' ? null : new FunctionCoverage({
      data: Array.isArray(map.data) ? map.data.map(item => FunctionData.fromJSON(item)).filter(item => item) : [],
      found: map.found,
      hit: map.hit
    });
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
    lines.push(`${Token.LINES_FOUND}:${this.found}`);
    lines.push(`${Token.LINES_HIT}:${this.hit}`);
    return lines.join('\n');
  }
}
