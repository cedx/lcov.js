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
   * Creates a new record from the specified JSON map.
   * @param {object} map A JSON map representing a record.
   * @return {Report} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJSON(map) {
    return !map || typeof map != 'object' ? null : new Report(
      typeof map.testName == 'string' ? map.testName : '',
      Array.isArray(map.records) ? map.records.map(item => Record.fromJSON(item)).filter(item => item) : []
    );
  }

  /**
   * Parses the specified coverage data in [LCOV](http://ltp.sourceforge.net/coverage/lcov.php) format.
   * @param {string} coverage The coverage data.
   * @return {Report} The resulting coverage report.
   * @throws {Error} A parsing error occurred.
   */
  static parse(coverage) {
    let report = new Report;

    try {
      let record = new Record;
      record.branches = new BranchCoverage;
      record.functions = new FunctionCoverage;
      record.lines = new LineCoverage;

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
            record.functions.data.push(new FunctionData(data[1], parseInt(data[0], 10)));
            break;

          case Token.FUNCTION_DATA:
            if (data.length < 2) throw new Error('Invalid function data.');
            record.functions.data.some(item => {
              if (item.functionName != data[1]) return false;
              item.executionCount = parseInt(data[0], 10);
              return true;
            });
            break;

          case Token.FUNCTIONS_FOUND:
            record.functions.found = parseInt(data[0], 10);
            break;

          case Token.FUNCTIONS_HIT:
            record.functions.hit = parseInt(data[0], 10);
            break;

          case Token.BRANCH_DATA:
            if (data.length < 4) throw new Error('Invalid branch data.');
            record.branches.data.push(new BranchData(
              parseInt(data[0], 10),
              parseInt(data[1], 10),
              parseInt(data[2], 10),
              data[3] == '-' ? 0 : parseInt(data[3], 10)
            ));
            break;

          case Token.BRANCHES_FOUND:
            record.branches.found = parseInt(data[0], 10);
            break;

          case Token.BRANCHES_HIT:
            record.branches.hit = parseInt(data[0], 10);
            break;

          case Token.LINE_DATA:
            if (data.length < 2) throw new Error('Invalid line data.');
            record.lines.data.push(new LineData(
              parseInt(data[0], 10),
              parseInt(data[1], 10),
              data.length >= 3 ? data[2] : ''
            ));
            break;

          case Token.LINES_FOUND:
            record.lines.found = parseInt(data[0], 10);
            break;

          case Token.LINES_HIT:
            record.lines.hit = parseInt(data[0], 10);
            break;

          case Token.END_OF_RECORD:
            report.records.push(record);

            record = new Record;
            record.branches = new BranchCoverage;
            record.functions = new FunctionCoverage;
            record.lines = new LineCoverage;
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
      testName: this.testName,
      records: this.records.map(item => item.toJSON())
    };
  }

  /**
   * Returns a string representation of this object.
   * @return {string} The string representation of this object.
   */
  toString() {
    let lines = this.testName.length ? [`${Token.TEST_NAME}:${this.testName}`] : [];
    lines.push(...this.records.map(item => item.toString()));
    return lines.join('\n');
  }
}
