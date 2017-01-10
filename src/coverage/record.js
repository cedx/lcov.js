import {BranchCoverage} from './branch';
import {FunctionCoverage} from './function';
import {LineCoverage} from './line';
import {Token} from '../token';

/**
 * Provides the coverage data of a source file.
 */
class Record {

  /**
   * Initializes a new instance of the class.
   * @param {string} [sourceFile] The path to the source file.
   */
  constructor(sourceFile) {

    /**
     * The branch coverage.
     * @type {BranchCoverage}
     */
    this.branches = new BranchCoverage();

    /**
     * The function coverage.
     * @type {FunctionCoverage}
     */
    this.functions = new FunctionCoverage();

    /**
     * The line coverage.
     * @type {LineCoverage}
     */
    this.lines = new LineCoverage();

    /**
     * The path to the source file.
     * @type {string}
     */
    this.sourceFile = typeof sourceFile == 'string' ? sourceFile : '';
  }

  /**
   * Creates a new record from the specified JSON map.
   * @param {object} map A JSON map representing a record.
   * @return {BranchData} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJSON(map) {
    return !map || typeof map != 'object' ? null : new Record({
      branches: map.branches,
      functions: map.functions,
      lines: map.lines,
      sourceFile: map.sourceFile
    });
  }

  /**
   * Converts this object to a map in JSON format.
   * @return {object} The map in JSON format corresponding to this object.
   */
  toJSON() {
    return {
      file: this.sourceFile,
      branches: this.branches.toJSON(),
      functions: this.functions.toJSON(),
      lines: this.lines.toJSON()
    }
  }

  /**
   * Returns a string representation of this object.
   * @return {string} The string representation of this object.
   */
  toString() {
    let output = [`${Token.SOURCE_FILE}:${this.sourceFile}`];
    if (this.functions) output.push(this.functions.toString());
    if (this.branches) output.push(this.branches.toString());
    if (this.lines) output.push(this.lines.toString());
    output.push(Token.END_OF_RECORD);
    return output.join('\n');
  }
}
