const {FunctionCoverage, LineCoverage, LineData, Record, Report} = require('@cedx/lcov');
const {promises} = require('fs');

/**
 * Formats coverage data as LCOV report.
 */
async function formatReport() {
  try {
    let coverage = await promises.readFile('lcov.info', 'utf8');
    let report = Report.fromCoverage(coverage);
    console.log(`The coverage report contains ${report.records.length} records:`);
    console.log(report.toJSON());
  }

  catch (error) {
    console.log(`An error occurred: ${error.message}`);
  }
}

/**
 * Parses a LCOV report to coverage data.
 */
function parseReport() {
  let lineCoverage = new LineCoverage(2, 2, [
    new LineData(6, 2, 'PF4Rz2r7RTliO9u6bZ7h6g'),
    new LineData(7, 2, 'yGMB6FhEEAd8OyASe3Ni1w')
  ]);

  let record = new Record('/home/cedx/lcov.js/fixture.js', {
    functions: new FunctionCoverage(1, 1),
    lines: lineCoverage
  });

  let report = new Report('Example', [record]);
  console.log(report.toString());
}
