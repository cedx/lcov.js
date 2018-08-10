import {BranchCoverage} from './branch';
import {FunctionCoverage} from './function';
import {JsonMap} from './json';
import {LineCoverage} from './line';
import {Token} from './token';

/**
 * Provides the coverage data of a source file.
 */
export class Record {

  /**
   * The branch coverage.
   */
  public branches?: BranchCoverage;

  /**
   * The function coverage.
   */
  public functions?: FunctionCoverage;

  /**
   * The line coverage.
   */
  public lines?: LineCoverage;

  /**
   * Initializes a new instance of the class.
   * @param sourceFile The path to the source file.
   * @param options An object specifying values used to initialize this instance.
   */
  constructor(public sourceFile: string, options: Partial<RecordOptions> = {}) {
    const {branches, functions, lines} = options;
    this.branches = branches;
    this.functions = functions;
    this.lines = lines;
  }

  /**
   * The class name.
   */
  get [Symbol.toStringTag](): string {
    return 'Record';
  }

  /**
   * Creates a new record from the specified JSON map.
   * @param map A JSON map representing a record.
   * @return {Record} The instance corresponding to the specified JSON map.
   */
  public static fromJson(map: JsonMap): Record {
    return new this(typeof map.sourceFile == 'string' ? map.sourceFile : '', {
      branches: BranchCoverage.fromJson(map.branches),
      functions: FunctionCoverage.fromJson(map.functions),
      lines: LineCoverage.fromJson(map.lines)
    });
  }

  /**
   * Converts this object to a map in JSON format.
   * @return The map in JSON format corresponding to this object.
   */
  public toJSON(): JsonMap {
    return {
      branches: this.branches ? this.branches.toJSON() : null,
      functions: this.functions ? this.functions.toJSON() : null,
      lines: this.lines ? this.lines.toJSON() : null,
      sourceFile: this.sourceFile
    };
  }

  /**
   * Returns a string representation of this object.
   * @return The string representation of this object.
   */
  public toString(): string {
    const output = [`${Token.sourceFile}:${this.sourceFile}`];
    if (this.functions) output.push(this.functions.toString());
    if (this.branches) output.push(this.branches.toString());
    if (this.lines) output.push(this.lines.toString());
    output.push(Token.endOfRecord);
    return output.join('\n');
  }
}

/**
 * Defines the options of a `Record` instance.
 */
export interface RecordOptions {

  /**
   * The branch coverage.
   */
  branches: BranchCoverage;

  /**
   * The function coverage.
   */
  functions: FunctionCoverage;

  /**
   * The line coverage.
   */
  lines: LineCoverage;
}
