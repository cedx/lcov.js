'use strict';

const {BranchCoverage, BranchData} = require('./branch.js');
const {FunctionCoverage, FunctionData} = require('./function.js');
const {LineCoverage, LineData} = require('./line.js');
const {Record} = require('./record.js');
const {Token} = require('./token.js');

/**
 * An exception caused by a parsing error.
 */
class LcovError extends SyntaxError {

  /**
   * Creates a new LCOV error.
   * @param {string} message A message describing the error.
   * @param {*} [source] The actual source input which caused the error.
   * @param {number} [offset] message The offset in `source` where the error was detected.
   */
  constructor(message, source = null, offset = -1) {
    super(message);

    /**
     * The error name.
     * @type {string}
     */
    this.name = 'LcovError';

    /**
     * The offset in `source` where the error was detected.
     * @type {number}
     */
    this.offset = offset;

    /**
     * The actual source input which caused the error.
     * @type {*}
     */
    this.source = source;
  }

  /**
   * Returns a string representation of this object.
   * @return {string} The string representation of this object.
   */
  toString() {
    let values = [`"${this.message}"`];
    if (this.offset >= 0) values.push(`offset: ${this.offset}`);
    return `${this.name}(${values.join(', ')})`;
  }
}

/**
 * Represents a trace file, that is a coverage report.
 */
class Report {

  /**
   * Initializes a new instance of the class.
   * @param {string} [testName] The test name.
   * @param {Record[]} [records] The record list.
   */
  constructor(testName = '', records = []) {

    /**
     * The record list.
     * @type {Record[]}
     */
    this.records = records;

    /**
     * The test name.
     * @type {string}
     */
    this.testName = testName;
  }

  /**
   * The class name.
   * @type {string}
   */
  get [Symbol.toStringTag]() {
    return 'Report';
  }

  /**
   * Parses the specified coverage data in [LCOV](http://ltp.sourceforge.net/coverage/lcov.php) format.
   * @param {string} coverage The coverage data.
   * @return {Report} The resulting coverage report.
   * @throws {Error} A parsing error occurred.
   */
  static fromCoverage(coverage) {
    let report = new this;

    try {
      let record;
      for (let line of coverage.split(/\r?\n/g)) {
        line = line.trim();
        if (!line.length) continue;

        let parts = line.split(':');
        if (parts.length < 2 && parts[0] != Token.endOfRecord) throw new Error('Invalid token format');

        let token = parts.shift();
        let data = parts.join(':').split(',');

        switch (token) {
          case Token.testName:
            report.testName = data[0];
            break;

          case Token.sourceFile:
            record = new Record(data[0], {
              branches: new BranchCoverage,
              functions: new FunctionCoverage,
              lines: new LineCoverage
            });
            break;

          case Token.functionName:
            if (data.length < 2) throw new Error('Invalid function name');
            record.functions.data.push(new FunctionData(data[1], Number.parseInt(data[0], 10)));
            break;

          case Token.functionData:
            if (data.length < 2) throw new Error('Invalid function data');
            record.functions.data.some(item => {
              if (item.functionName != data[1]) return false;
              item.executionCount = Number.parseInt(data[0], 10);
              return true;
            });
            break;

          case Token.functionsFound:
            record.functions.found = Number.parseInt(data[0], 10);
            break;

          case Token.functionsHit:
            record.functions.hit = Number.parseInt(data[0], 10);
            break;

          case Token.branchData:
            if (data.length < 4) throw new Error('Invalid branch data');
            record.branches.data.push(new BranchData(
              Number.parseInt(data[0], 10),
              Number.parseInt(data[1], 10),
              Number.parseInt(data[2], 10),
              data[3] == '-' ? 0 : Number.parseInt(data[3], 10)
            ));
            break;

          case Token.branchesFound:
            record.branches.found = Number.parseInt(data[0], 10);
            break;

          case Token.branchesHit:
            record.branches.hit = Number.parseInt(data[0], 10);
            break;

          case Token.lineData:
            if (data.length < 2) throw new Error('Invalid line data');
            record.lines.data.push(new LineData(
              Number.parseInt(data[0], 10),
              Number.parseInt(data[1], 10),
              data.length >= 3 ? data[2] : ''
            ));
            break;

          case Token.linesFound:
            record.lines.found = Number.parseInt(data[0], 10);
            break;

          case Token.linesHit:
            record.lines.hit = Number.parseInt(data[0], 10);
            break;

          case Token.endOfRecord:
            report.records.push(record);
            break;
        }
      }
    }

    catch (err) {
      throw new LcovError('The coverage data has an invalid LCOV format', coverage);
    }

    if (!report.records.length) throw new LcovError('The coverage data is empty', coverage);
    return report;
  }

  /**
   * Creates a new record from the specified JSON map.
   * @param {Object} map A JSON map representing a record.
   * @return {Report} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJson(map) {
    return !map || typeof map != 'object' ? null : new this(
      typeof map.testName == 'string' ? map.testName : '',
      Array.isArray(map.records) ? map.records.map(item => Record.fromJson(item)).filter(item => item != null) : []
    );
  }

  /**
   * Converts this object to a map in JSON format.
   * @return {Object} The map in JSON format corresponding to this object.
   */
  toJSON() {
    return {
      testName: this.testName,
      records: this.records.map(item => item.toJSON())
    };
  }

  /**
   * Returns a string representation of this object.
   * @return {string} The string representation of this object.
   */
  toString() {
    let lines = this.testName.length ? [`${Token.testName}:${this.testName}`] : [];
    lines.push(...this.records.map(item => item.toString()));
    return lines.join('\n');
  }
}

// Module exports.
exports.LcovError = LcovError;
exports.Report = Report;
