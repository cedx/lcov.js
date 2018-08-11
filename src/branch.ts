import {JsonMap} from './json';
import {Token} from './token';

/**
 * Provides the coverage data of branches.
 */
export class BranchCoverage {

  /**
   * Initializes a new instance of the class.
   * @param found The number of branches found.
   * @param hit The number of branches found.
   * @param data The coverage data.
   */
  constructor(public found: number = 0, public hit: number = 0, public data: BranchData[] = []) {}

  /**
   * The class name.
   */
  get [Symbol.toStringTag](): string {
    return 'BranchCoverage';
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param map A JSON map representing a branch data.
   * @return The instance corresponding to the specified JSON map.
   */
  public static fromJson(map: JsonMap): BranchCoverage {
    return new this(
      Number.isInteger(map.found) ? map.found : 0,
      Number.isInteger(map.hit) ? map.hit : 0,
      Array.isArray(map.data) ? map.data.map(item => BranchData.fromJson(item)) : []
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
    lines.push(`${Token.branchesFound}:${this.found}`);
    lines.push(`${Token.branchesHit}:${this.hit}`);
    return lines.join('\n');
  }
}

/**
 * Provides details for branch coverage.
 */
export class BranchData {

  /**
   * Initializes a new instance of the class.
   * @param lineNumber The line number.
   * @param blockNumber The block number.
   * @param branchNumber The branch number.
   * @param taken A number indicating how often this branch was taken.
   */
  constructor(public lineNumber: number, public blockNumber: number, public branchNumber: number, public taken: number = 0) {}

  /**
   * The class name.
   */
  get [Symbol.toStringTag](): string {
    return 'BranchData';
  }

  /**
   * Creates a new branch data from the specified JSON map.
   * @param map A JSON map representing a branch data.
   * @return The instance corresponding to the specified JSON map.
   */
  public static fromJson(map: JsonMap): BranchData {
    return new this(
      Number.isInteger(map.lineNumber) ? map.lineNumber : 0,
      Number.isInteger(map.blockNumber) ? map.blockNumber : 0,
      Number.isInteger(map.branchNumber) ? map.branchNumber : 0,
      Number.isInteger(map.taken) ? map.taken : 0
    );
  }

  /**
   * Converts this object to a map in JSON format.
   * @return The map in JSON format corresponding to this object.
   */
  public toJSON(): JsonMap {
    return {
      blockNumber: this.blockNumber,
      branchNumber: this.branchNumber,
      lineNumber: this.lineNumber,
      taken: this.taken
    };
  }

  /**
   * Returns a string representation of this object.
   * @return The string representation of this object.
   */
  public toString(): string {
    const value = `${Token.branchData}:${this.lineNumber},${this.blockNumber},${this.branchNumber}`;
    return this.taken > 0 ? `${value},${this.taken}` : `${value},-`;
  }
}