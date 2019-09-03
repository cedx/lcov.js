/* eslint-disable no-console, @typescript-eslint/no-unused-vars */
import {FunctionCoverage, LineCoverage, LineData, Record, Report} from '@cedx/lcov';
import {promises} from 'fs';

/** Formats coverage data as LCOV report. */
function formatReport(): void {
  const lineCoverage = new LineCoverage(2, 2, [
    new LineData(6, 2, 'PF4Rz2r7RTliO9u6bZ7h6g'),
    new LineData(7, 2, 'yGMB6FhEEAd8OyASe3Ni1w')
  ]);

  const record = new Record('/home/cedx/lcov.js/fixture.js', {
    functions: new FunctionCoverage(1, 1),
    lines: lineCoverage
  });

  const report = new Report('Example', [record]);
  console.log(report.toString());
}

/**
 * Parses a LCOV report to coverage data.
 * @return Completes when the parsing is terminated.
 */
async function parseReport(): Promise<void> {
  try {
    const coverage = await promises.readFile('lcov.info', 'utf8');
    const report = Report.fromCoverage(coverage);
    console.log(`The coverage report contains ${report.records.length} records:`);
    console.log(report.toJSON());
  }

  catch (error) {
    console.log(`An error occurred: ${error.message}`);
  }
}
