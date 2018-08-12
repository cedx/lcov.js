import {JsonMap} from './map';
import {Token} from './token';

/**
 * Provides the coverage data of functions.
 */
export class FunctionCoverage {

  /**
   * Initializes a new instance of the class.
   * @param found The number of functions found.
   * @param hit The number of functions found.
   * @param data The coverage data.
   */
  constructor(public found: number = 0, public hit: number = 0, public data: FunctionData[] = []) {}

  /**
   * The class name.
   */
  get [Symbol.toStringTag](): string {
    return 'FunctionCoverage';
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param map A JSON map representing a branch data.
   * @return The instance corresponding to the specified JSON map.
   */
  public static fromJson(map: JsonMap): FunctionCoverage {
    return new this(
      Number.isInteger(map.found) ? map.found : 0,
      Number.isInteger(map.hit) ? map.hit : 0,
      Array.isArray(map.data) ? map.data.map(item => FunctionData.fromJson(item)) : []
    );
  }

  /**
   * Converts this object to a map in JSON format.
   * @return The map in JSON format corresponding to this object.
   */
  public toJSON(): JsonMap {
    return {
      data: this.data.map(item => item.toJSON()),
      found: this.found,
      hit: this.hit
    };
  }

  /**
   * Returns a string representation of this object.
   * @return The string representation of this object.
   */
  public toString(): string {
    const lines = this.data.map(item => item.toString(true));
    lines.push(...this.data.map(item => item.toString(false)));
    lines.push(`${Token.functionsFound}:${this.found}`);
    lines.push(`${Token.functionsHit}:${this.hit}`);
    return lines.join('\n');
  }
}

/**
 * Provides details for function coverage.
 */
export class FunctionData {

  /**
   * Initializes a new instance of the class.
   * @param functionName The function name.
   * @param lineNumber The line number of the function start.
   * @param executionCount The execution count.
   */
  constructor(public functionName: string, public lineNumber: number, public executionCount: number = 0) {}

  /**
   * The class name.
   */
  get [Symbol.toStringTag](): string {
    return 'FunctionData';
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param map A JSON map representing a branch data.
   * @return The instance corresponding to the specified JSON map.
   */
  public static fromJson(map: JsonMap): FunctionData {
    return new this(
      typeof map.functionName == 'string' ? map.functionName : '',
      Number.isInteger(map.lineNumber) ? map.lineNumber : 0,
      Number.isInteger(map.executionCount) ? map.executionCount : 0
    );
  }

  /**
   * Converts this object to a map in JSON format.
   * @return The map in JSON format corresponding to this object.
   */
  public toJSON(): JsonMap {
    return {
      executionCount: this.executionCount,
      functionName: this.functionName,
      lineNumber: this.lineNumber
    };
  }

  /**
   * Returns a string representation of this object.
   * @param asDefinition Whether to return the function definition (e.g. name and line number) instead of its data (e.g. name and execution count).
   * @return The string representation of this object.
   */
  public toString(asDefinition: boolean = false): string {
    const token = asDefinition ? Token.functionName : Token.functionData;
    const count = asDefinition ? this.lineNumber : this.executionCount;
    return `${token}:${count},${this.functionName}`;
  }
}
