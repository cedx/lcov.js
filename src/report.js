import {BranchCoverage, BranchData} from './branch';
import {FunctionCoverage, FunctionData} from './function';
import {LineCoverage, LineData} from './line';
import {Record} from './record';
import {Token} from './token';

/**
 * Represents a trace file, that is a coverage report.
 */
export class Report {

  /**
   * Initializes a new instance of the class.
   * @param {object} [options] An object specifying values used to initialize this instance.
   */
  constructor(options = {}) {

    /**
     * The record list.
     * @type {Record[]}
     */
    this.records = Array.isArray(options.records) ? options.records : [];

    /**
     * The test name.
     * @type {string}
     */
    this.testName = typeof options.testName == 'string' ? options.testName : '';
  }

  /**
   * Creates a new record from the specified JSON map.
   * @param {object} map A JSON map representing a record.
   * @return {Report} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJSON(map) {
    return !map || typeof map != 'object' ? null : new Report({
      records: Array.isArray(map.records) ? map.records.map(item => Record.fromJSON(item)).filter(item => item) : [],
      testName: map.testName
    });
  }

  /**
   * Parses the specified coverage data in [LCOV](http://ltp.sourceforge.net/coverage/lcov.php) format.
   * @param {string} coverage The coverage data.
   * @return {Report} The resulting coverage report.
   * @throws {Error} A parsing error occurred.
   */
  static parse(coverage) {
    let report = new Report();

    try {
      let record = new Record({
        branches: new BranchCoverage(),
        functions: new FunctionCoverage(),
        lines: new LineCoverage()
      });

      for (let line of coverage.split(/\r?\n/g)) {
        line = line.trim();
        if (!line.length) continue;

        let parts = line.split(':');
        if (parts.length < 2 && parts[0] != Token.END_OF_RECORD) throw new Error('Invalid token format.');

        let token = parts.shift();
        let data = parts.join(':').split(',');

        switch (token) {
          case Token.TEST_NAME:
            report.testName = data[0];
            break;

          case Token.SOURCE_FILE:
            record.sourceFile = data[0];
            break;

          case Token.FUNCTION_NAME:
            if (data.length < 2) throw new Error('Invalid function name.');
            record.functions.data.push(new FunctionData({
              functionName: data[1],
              lineNumber: Number(data[0])
            }));
            break;

          case Token.FUNCTION_DATA:
            if (data.length < 2) throw new Error('Invalid function data.');
            record.functions.data.some(item => {
              if (item.functionName != data[1]) return false;
              item.executionCount = Number(data[0]);
              return true;
            });
            break;

          case Token.FUNCTIONS_FOUND:
            record.functions.found = Number(data[0]);
            break;

          case Token.FUNCTIONS_HIT:
            record.functions.hit = Number(data[0]);
            break;

          case Token.BRANCH_DATA:
            if (data.length < 4) throw new Error('Invalid branch data.');
            record.branches.data.push(new BranchData({
              /* eslint-disable sort-keys */
              lineNumber: Number(data[0]),
              blockNumber: Number(data[1]),
              branchNumber: Number(data[2]),
              taken: data[3] == '-' ? 0 : Number(data[3])
              /* eslint-enable sort-keys */
            }));
            break;

          case Token.BRANCHES_FOUND:
            record.branches.found = Number(data[0]);
            break;

          case Token.BRANCHES_HIT:
            record.branches.hit = Number(data[0]);
            break;

          case Token.LINE_DATA:
            if (data.length < 3) throw new Error('Invalid branch data.');
            record.lines.data.push(new LineData({
              /* eslint-disable sort-keys */
              lineNumber: Number(data[0]),
              executionCount: Number(data[1]),
              checksum: data.length >= 3 ? data[2] : ''
              /* eslint-enable sort-keys */
            }));
            break;

          case Token.LINES_FOUND:
            record.lines.found = Number(data[0]);
            break;

          case Token.LINES_HIT:
            record.lines.hit = Number(data[0]);
            break;

          case Token.END_OF_RECORD:
            report.records.push(record);
            record = new Record({
              branches: new BranchCoverage(),
              functions: new FunctionCoverage(),
              lines: new LineCoverage()
            });
            break;
        }
      }
    }

    catch (e) {
      throw new Error('The coverage data has an invalid LCOV format.');
    }

    if (!report.records.length) throw new Error('The coverage data is empty.');
    return report;
  }

  /**
   * Converts this object to a map in JSON format.
   * @return {object} The map in JSON format corresponding to this object.
   */
  toJSON() {
    return {
      /* eslint-disable sort-keys */
      testName: this.testName,
      records: this.records.map(item => item.toJSON())
      /* eslint-enable sort-keys */
    };
  }

  /**
   * Returns a string representation of this object.
   * @return {string} The string representation of this object.
   */
  toString() {
    let lines = [`${Token.TEST_NAME}:${this.testName}`];
    lines.push(...this.records.map(item => item.toString()));
    return lines.join('\n');
  }
}
