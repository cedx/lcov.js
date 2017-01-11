import {BranchCoverage} from './branch';
import {FunctionCoverage} from './function';
import {LineCoverage} from './line';
import {Token} from '../token';

/**
 * Provides the coverage data of a source file.
 */
export class Record {

  /**
   * Initializes a new instance of the class.
   * @param {object} [options] An object specifying values used to initialize this instance.
   */
  constructor(options = {}) {

    /**
     * The branch coverage.
     * @type {BranchCoverage}
     */
    this.branches = options.branches instanceof BranchCoverage ? options.branches : new BranchCoverage();

    /**
     * The function coverage.
     * @type {FunctionCoverage}
     */
    this.functions = options.functions instanceof FunctionCoverage ? options.functions : new FunctionCoverage();

    /**
     * The line coverage.
     * @type {LineCoverage}
     */
    this.lines = options.lines instanceof LineCoverage ? options.lines : new LineCoverage();

    /**
     * The path to the source file.
     * @type {string}
     */
    this.sourceFile = typeof options.sourceFile == 'string' ? options.sourceFile : '';
  }

  /**
   * Creates a new record from the specified JSON map.
   * @param {object} map A JSON map representing a record.
   * @return {BranchData} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJSON(map) {
    return !map || typeof map != 'object' ? null : new Record({
      branches: BranchCoverage.fromJSON(map.branches),
      functions: FunctionCoverage.fromJSON(map.functions),
      lines: LineCoverage.fromJSON(map.lines),
      sourceFile: map.file
    });
  }

  /**
   * Converts this object to a map in JSON format.
   * @return {object} The map in JSON format corresponding to this object.
   */
  toJSON() {
    return {
      /* eslint-disable sort-keys */
      file: this.sourceFile,
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
