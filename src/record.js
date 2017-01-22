import {BranchCoverage} from './branch';
import {FunctionCoverage} from './function';
import {LineCoverage} from './line';
import {Token} from './token';

/**
 * Provides the coverage data of a source file.
 */
export class Record {

  /**
   * Initializes a new instance of the class.
   * @param {string} [sourceFile] The path to the source file.
   */
  constructor(sourceFile = '') {

    /**
     * The branch coverage.
     * @type {BranchCoverage}
     */
    this.branches = null;

    /**
     * The function coverage.
     * @type {FunctionCoverage}
     */
    this.functions = null;

    /**
     * The line coverage.
     * @type {LineCoverage}
     */
    this.lines = null;

    /**
     * The path to the source file.
     * @type {string}
     */
    this.sourceFile = sourceFile;
  }

  /**
   * Creates a new record from the specified JSON map.
   * @param {object} map A JSON map representing a record.
   * @return {Record} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJSON(map) {
    if (!map || typeof map != 'object') return null;

    let record = new Record(typeof map.sourceFile == 'string' ? map.sourceFile : '');
    record.branches = BranchCoverage.fromJSON(map.branches);
    record.functions = FunctionCoverage.fromJSON(map.functions);
    record.lines = LineCoverage.fromJSON(map.lines);
    return record;
  }

  /**
   * Converts this object to a map in JSON format.
   * @return {object} The map in JSON format corresponding to this object.
   */
  toJSON() {
    return {
      /* eslint-disable sort-keys */
      sourceFile: this.sourceFile,
      branches: this.branches ? this.branches.toJSON() : null,
      functions: this.functions ? this.functions.toJSON() : null,
      lines: this.lines ? this.lines.toJSON() : null
      /* eslint-enable sort-keys */
    };
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
