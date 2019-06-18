import {BranchCoverage} from './branch.js';
import {FunctionCoverage} from './function.js';
import {LineCoverage} from './line.js';
import {Token} from './token.js';

/**
 * Defines the options of a {@link Record} instance.
 * @typedef {object} RecordOptions
 * @property {BranchCoverage} [branches] The branch coverage.
 * @property {FunctionCoverage} [functions] The function coverage.
 * @property {LineCoverage} [lines] The line coverage.
 */

/** Provides the coverage data of a source file. */
export class Record {

  /**
   * Creates a new record.
   * @param {string} sourceFile The path to the source file.
   * @param {RecordOptions} [options] An object specifying values used to initialize this instance.
   */
  constructor(sourceFile, options = {}) {
    const {branches = null, functions = null, lines = null} = options;

    /**
     * The branch coverage.
     * @type {?BranchCoverage}
     */
    this.branches = branches;

    /**
     * The function coverage.
     * @type {?FunctionCoverage}
     */
    this.functions = functions;

    /**
     * The line coverage.
     * @type {?LineCoverage}
     */
    this.lines = lines;

    /**
     * The path to the source file.
     * @type {string}
     */
    this.sourceFile = sourceFile;
  }

  /**
   * Creates a new record from the specified JSON map.
   * @param {Object<string, *>} map A JSON map representing a record.
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
   * @return {Object<string, *>} The map in JSON format corresponding to this object.
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
