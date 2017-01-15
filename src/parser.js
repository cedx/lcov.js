import {BranchCoverage, BranchData} from './coverage/branch';
import {FunctionCoverage, FunctionData} from './coverage/function';
import {LineCoverage, LineData} from './coverage/line';
import {Record} from './coverage/record';
import {Report} from './coverage/report';
import {Token} from './token';

/**
 * Parses the specified coverage data in [LCOV](http://ltp.sourceforge.net/coverage/lcov.php) format.
 * @param {string} coverage The coverage data.
 * @return {Report} The resulting coverage report.
 * @throws {Error} A parsing error occurred.
 */
export function parse(coverage) {
  let report = new Report();
  let record = new Record({
    branches: new BranchCoverage(),
    functions: new FunctionCoverage(),
    lines: new LineCoverage()
  });

  try {
    for (let line in coverage.split(/\r?\n/)) {
      let parts = line.trim().split(':');

      let token = parts.shift().toUpperCase();
      let data = parts.join(':').split(',');

      switch (token) {
        case Token.TEST_NAME:
          report.testName = data[0];
          break;

        case Token.SOURCE_FILE:
          record.sourceFile = data[0];
          break;

        case Token.FUNCTION_NAME:
          record.functions.data.push(new FunctionData({
            functionName: data[1],
            lineNumber: Number(data[0])
          }));
          break;

        case Token.FUNCTION_DATA:
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
          record.lines.data.push(new LineData({
            /* eslint-disable sort-keys */
            lineNumber: Number(data[0]),
            executionCount: Number(data[1]),
            checksum: data.length >= 3 ? data[2] : null
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
          record = new Record();
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
