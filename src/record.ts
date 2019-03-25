import {BranchCoverage} from './branch';
import {FunctionCoverage} from './function';
import {LineCoverage} from './line';
import {JsonMap} from './map';
import {Token} from './token';

/**
 * Provides the coverage data of a source file.
 */
export class Record {

  /**
   * The branch coverage.
   */
  branches: BranchCoverage | null;

  /**
   * The function coverage.
   */
  functions: FunctionCoverage | null;

  /**
   * The line coverage.
   */
  lines: LineCoverage | null;

  /**
   * Creates a new record.
   * @param sourceFile The path to the source file.
   * @param options An object specifying values used to initialize this instance.
   */
  constructor(public sourceFile: string, options: Partial<RecordOptions> = {}) {
    const {branches = null, functions = null, lines = null} = options;
    this.branches = branches;
    this.functions = functions;
    this.lines = lines;
  }

  /**
   * Creates a new record from the specified JSON map.
   * @param map A JSON map representing a record.
   * @return The instance corresponding to the specified JSON map.
   */
  static fromJson(map: JsonMap): Record {
    return new Record(typeof map.sourceFile == 'string' ? map.sourceFile : '', {
      branches: typeof map.branches == 'object' && map.branches ? BranchCoverage.fromJson(map.branches) : null,
      functions: typeof map.functions == 'object' && map.functions ? FunctionCoverage.fromJson(map.functions) : null,
      lines: typeof map.lines == 'object' && map.lines ? LineCoverage.fromJson(map.lines) : null
    });
  }

  /**
   * Converts this object to a map in JSON format.
   * @return The map in JSON format corresponding to this object.
   */
  toJSON(): JsonMap {
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
  toString(): string {
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
  branches: BranchCoverage | null;

  /**
   * The function coverage.
   */
  functions: FunctionCoverage | null;

  /**
   * The line coverage.
   */
  lines: LineCoverage | null;
}
