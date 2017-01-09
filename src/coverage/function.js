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
     * The branch number.
     * @type {number}
     */
    this.executionCount = typeof options.executionCount == 'number' ? options.executionCount : 0;

    /**
     * The block number.
     * @type {string}
     */
    this.functionName = typeof options.functionName == 'string' ? options.functionName : '';
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param {object} map A JSON map representing a branch data.
   * @return {BranchData} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJSON(map) {
    return !map || typeof map != 'object' ? null : new FunctionData({
      executionCount: map.hit,
      functionName: map.name
    });
  }

  /**
   * Converts this object to a map in JSON format.
   * @return {object} The map in JSON format corresponding to this object.
   */
  toJSON() {
    return {
      hit: this.executionCount,
      name: this.functionName
    }
  }

  /**
   * Returns a string representation of this object.
   * @return {string} The string representation of this object.
   */
  toString() {
    return `${Token.FUNCTION_DATA}:${this.executionCount},${this.functionName}`;
  }
}
