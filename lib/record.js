import {BranchCoverage} from './branch.js';
import {FunctionCoverage} from './function.js';
import {LineCoverage} from './line.js';
import {Token} from './token.js';

/** Provides the coverage data of a source file. */
export class Record {

  /**
   * The branch coverage.
   * @type {(BranchCoverage|null)}
   */
  branches;

  /**
   * The function coverage.
   * @type {(FunctionCoverage|null)}
   */
  functions;

  /**
   * The line coverage.
   * @type {(LineCoverage|null)}
   */
  lines;

  /**
   * The path to the source file.
   * @type {string}
   */
  sourceFile;

  /**
   * Creates a new record.
   * @param {string} sourceFile The path to the source file.
   * @param {Partial<RecordOptions>} options An object specifying values used to initialize this instance.
   */
  constructor(sourceFile, options = {}) {
    const {branches = null, functions = null, lines = null} = options;
    this.branches = branches;
    this.functions = functions;
    this.lines = lines;
    this.sourceFile = sourceFile;
  }

  /**
   * Creates a new record from the specified JSON map.
   * @param {JsonMap} map A JSON map representing a record.
   * @return {Record} The instance corresponding to the specified JSON map.
   */
  static fromJson(map) {
    return new Record(typeof map.sourceFile == 'string' ? map.sourceFile : '', {
      branches: typeof map.branches == 'object' && map.branches ? BranchCoverage.fromJson(map.branches) : null,
      functions: typeof map.functions == 'object' && map.functions ? FunctionCoverage.fromJson(map.functions) : null,
      lines: typeof map.lines == 'object' && map.lines ? LineCoverage.fromJson(map.lines) : null
    });
  }

  /**
   * Converts this object to a map in JSON format.
   * @return {JsonMap} The map in JSON format corresponding to this object.
   */
  toJSON() {
    return {
      branches: this.branches ? this.branches.toJSON() : null,
      functions: this.functions ? this.functions.toJSON() : null,
      lines: this.lines ? this.lines.toJSON() : null,
      sourceFile: this.sourceFile
    };
  }

  /**
   * Returns a string representation of this object.
   * @return {string} The string representation of this object.
   */
  toString() {
    const output = [`${Token.sourceFile}:${this.sourceFile}`];
    if (this.functions) output.push(this.functions.toString());
    if (this.branches) output.push(this.branches.toString());
    if (this.lines) output.push(this.lines.toString());
    output.push(Token.endOfRecord);
    return output.join('\n');
  }
}
