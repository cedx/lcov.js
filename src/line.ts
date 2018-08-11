import {JsonMap} from './json';
import {Token} from './token';

/**
 * Provides the coverage data of lines.
 */
export class LineCoverage {

  /**
   * Initializes a new instance of the class.
   * @param found The number of lines found.
   * @param hit The number of lines found.
   * @param data The coverage data.
   */
  constructor(public found: number = 0, public hit: number = 0, public data: LineData[] = []) {}

  /**
   * The class name.
   */
  get [Symbol.toStringTag](): string {
    return 'LineCoverage';
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param map A JSON map representing a branch data.
   * @return The instance corresponding to the specified JSON map.
   */
  public static fromJson(map: JsonMap): LineCoverage {
    return new this(
      Number.isInteger(map.found) ? map.found : 0,
      Number.isInteger(map.hit) ? map.hit : 0,
      Array.isArray(map.data) ? map.data.map(item => LineData.fromJson(item)) : []
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
    const lines = this.data.map(item => item.toString());
    lines.push(`${Token.linesFound}:${this.found}`);
    lines.push(`${Token.linesHit}:${this.hit}`);
    return lines.join('\n');
  }
}

/**
 * Provides details for line coverage.
 */
export class LineData {

  /**
   * Initializes a new instance of the class.
   * @param lineNumber The line number.
   * @param executionCount The execution count.
   * @param checksum The data checksum.
   */
  constructor(public lineNumber: number, public executionCount: number = 0, public checksum: string = '') {}

  /**
   * The class name.
   */
  get [Symbol.toStringTag](): string {
    return 'LineData';
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param map A JSON map representing a branch data.
   * @return The instance corresponding to the specified JSON map.
   */
  public static fromJson(map: JsonMap): LineData {
    return new this(
      Number.isInteger(map.lineNumber) ? map.lineNumber : 0,
      Number.isInteger(map.executionCount) ? map.executionCount : 0,
      typeof map.checksum == 'string' ? map.checksum : ''
    );
  }

  /**
   * Converts this object to a map in JSON format.
   * @return The map in JSON format corresponding to this object.
   */
  public toJSON(): JsonMap {
    return {
      checksum: this.checksum,
      executionCount: this.executionCount,
      lineNumber: this.lineNumber
    };
  }

  /**
   * Returns a string representation of this object.
   * @return The string representation of this object.
   */
  public toString(): string {
    const value = `${Token.lineData}:${this.lineNumber},${this.executionCount}`;
    return this.checksum.length ? `${value},${this.checksum}` : value;
  }
}