import {JsonObject} from './json.js';
import {Token} from './token.js';

/** Provides details for function coverage. */
export class FunctionData {

  /**
   * Creates a new function data.
   * @param functionName The function name.
   * @param lineNumber The line number of the function start.
   * @param executionCount The execution count.
   */
  constructor(public functionName: string, public lineNumber: number, public executionCount: number = 0) {}

  /**
   * Creates a new function data from the specified JSON object.
   * @param map A JSON object representing a function data.
   * @return The instance corresponding to the specified JSON object.
   */
  static fromJson(map: JsonObject): FunctionData {
    return new FunctionData(
      typeof map.functionName == 'string' ? map.functionName : '',
      typeof map.lineNumber == 'number' && Number.isInteger(map.lineNumber) ? map.lineNumber : 0,
      typeof map.executionCount == 'number' && Number.isInteger(map.executionCount) ? map.executionCount : 0
    );
  }

  /**
   * Converts this object to a map in JSON format.
   * @return The map in JSON format corresponding to this object.
   */
  toJSON(): JsonObject {
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
  toString(asDefinition: boolean = false): string {
    const token = asDefinition ? Token.functionName : Token.functionData;
    const count = asDefinition ? this.lineNumber : this.executionCount;
    return `${token}:${count},${this.functionName}`;
  }
}

/** Provides the coverage data of functions. */
export class FunctionCoverage {

  /**
   * Creates a new function coverage.
   * @param found The number of functions found.
   * @param hit The number of functions found.
   * @param data The coverage data.
   */
  constructor(public found: number = 0, public hit: number = 0, public data: FunctionData[] = []) {}

  /**
   * Creates a new function coverage from the specified JSON object.
   * @param map A JSON object representing a function coverage.
   * @return The instance corresponding to the specified JSON object.
   */
  static fromJson(map: JsonObject): FunctionCoverage {
    return new FunctionCoverage(
      typeof map.found == 'number' && Number.isInteger(map.found) ? map.found : 0,
      typeof map.hit == 'number' && Number.isInteger(map.hit) ? map.hit : 0,
      Array.isArray(map.data) ? map.data.map(item => FunctionData.fromJson(item as JsonObject)) : []
    );
  }

  /**
   * Converts this object to a map in JSON format.
   * @return The map in JSON format corresponding to this object.
   */
  toJSON(): JsonObject {
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
  toString(): string {
    const lines = this.data.map(item => item.toString(true));
    lines.push(...this.data.map(item => item.toString(false)));
    lines.push(`${Token.functionsFound}:${this.found}`, `${Token.functionsHit}:${this.hit}`);
    return lines.join('\n');
  }
}
