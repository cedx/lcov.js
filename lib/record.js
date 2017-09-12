'use strict';

const {BranchCoverage} = require('./branch_coverage');
const {FunctionCoverage} = require('./function_coverage');
const {LineCoverage} = require('./line_coverage');
const {Token} = require('./token');

/**
 * Provides the coverage data of a source file.
 */
exports.Record = class Record {

  /**
   * Initializes a new instance of the class.
   * @param {string} sourceFile The path to the source file.
   * @param {object} [options] An object specifying values used to initialize this instance.
   */
  constructor(sourceFile, {branches = null, functions = null, lines = null} = {}) {

    /**
     * The branch coverage.
     * @type {BranchCoverage}
     */
    this.branches = branches;

    /**
     * The function coverage.
     * @type {FunctionCoverage}
     */
    this.functions = functions;

    /**
     * The line coverage.
     * @type {LineCoverage}
     */
    this.lines = lines;

    /**
     * The path to the source file.
     * @type {string}
     */
    this.sourceFile = sourceFile;
  }

  /**
   * The class name.
   * @type {string}
   */
  get [Symbol.toStringTag]() {
    return 'Record';
  }

  /**
   * Creates a new record from the specified JSON map.
   * @param {object} map A JSON map representing a record.
   * @return {Record} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJson(map) {
    if (!map || typeof map != 'object') return null;

    let record = new Record(typeof map.sourceFile == 'string' ? map.sourceFile : '');
    record.branches = BranchCoverage.fromJson(map.branches);
    record.functions = FunctionCoverage.fromJson(map.functions);
    record.lines = LineCoverage.fromJson(map.lines);
    return record;
  }

  /**
   * Converts this object to a map in JSON format.
   * @return {object} The map in JSON format corresponding to this object.
   */
  toJSON() {
    return {
      sourceFile: this.sourceFile,
      branches: this.branches ? this.branches.toJSON() : null,
      functions: this.functions ? this.functions.toJSON() : null,
      lines: this.lines ? this.lines.toJSON() : null
    };
  }

  /**
   * Returns a string representation of this object.
   * @return {string} The string representation of this object.
   */
  toString() {
    let output = [`${Token.sourceFile}:${this.sourceFile}`];
    if (this.functions) output.push(this.functions.toString());
    if (this.branches) output.push(this.branches.toString());
    if (this.lines) output.push(this.lines.toString());
    output.push(Token.endOfRecord);
    return output.join('\n');
  }
};
