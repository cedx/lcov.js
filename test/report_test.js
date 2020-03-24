import {strict as assert} from 'assert';
import {readFileSync} from 'fs';
import {BranchData, FunctionData, LcovError, LineData, Record, Report} from '../lib/index.js';

/** Tests the features of the {@link Report} class. */
describe('Report', () => {
  describe('.fromCoverage()', () => {
    const report = Report.fromCoverage(readFileSync('test/fixtures/lcov.info', 'utf8'));

    it('should have a test name', () => {
      assert.equal(report.testName, 'Example');
    });

    it('should contain three records', () => {
      assert.equal(report.records.length, 3);
      assert(report.records[0] instanceof Record);
      assert.equal(report.records[0].sourceFile, '/home/cedx/lcov.js/fixture.js');
      assert.equal(report.records[1].sourceFile, '/home/cedx/lcov.js/func1.js');
      assert.equal(report.records[2].sourceFile, '/home/cedx/lcov.js/func2.js');
    });

    it('should have detailed branch coverage', () => {
      const branches = report.records[1].branches;
      assert.equal(branches.found, 4);
      assert.equal(branches.hit, 4);

      assert.equal(branches.data.length, 4);
      assert(branches.data[0] instanceof BranchData);
      assert.equal(branches.data[0].lineNumber, 8);
    });

    it('should have detailed function coverage', () => {
      const functions = report.records[1].functions;
      assert.equal(functions.found, 1);
      assert.equal(functions.hit, 1);

      assert.equal(functions.data.length, 1);
      assert(functions.data[0] instanceof FunctionData);
      assert.equal(functions.data[0].functionName, 'func1');
    });

    it('should have detailed line coverage', () => {
      const lines = report.records[1].lines;
      assert.equal(lines.found, 9);
      assert.equal(lines.hit, 9);

      assert.equal(lines.data.length, 9);
      assert(lines.data[0] instanceof LineData);
      assert.equal(lines.data[0].checksum, '5kX7OTfHFcjnS98fjeVqNA');
    });

    it('should throw an error if the input is invalid', () => {
      assert.throws(() => Report.fromCoverage('ZZ'), LcovError);
    });

    it('should throw an error if the report is empty', () => {
      assert.throws(() => Report.fromCoverage('TN:Example'), LcovError);
    });
  });

  describe('.fromJson()', () => {
    it('should return an instance with default values for an empty map', () => {
      const report = Report.fromJson({});
      assert.equal(report.records.length, 0);
      assert.equal(report.testName.length, 0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      const report = Report.fromJson({
        records: [{}],
        testName: 'LcovTest'
      });

      assert.equal(report.records.length, 1);
      assert(report.records[0] instanceof Record);
      assert.equal(report.testName, 'LcovTest');
    });
  });

  describe('.toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      const map = new Report().toJSON();
      assert.equal(Object.keys(map).length, 2);
      assert(Array.isArray(map.records));
      assert.equal(map.records.length, 0);
      assert.equal(map.testName.length, 0);
    });

    it('should return a non-empty map for an initialized instance', () => {
      const map = new Report('LcovTest', [new Record('')]).toJSON();
      assert.equal(Object.keys(map).length, 2);
      assert(Array.isArray(map.records));
      assert.equal(map.records.length, 1);
      assert.ok(map.records[0]);
      assert.equal(typeof map.records[0], 'object');
      assert.equal(map.testName, 'LcovTest');
    });
  });

  describe('.toString()', () => {
    it('should return a format like "TN:<testName>"', () => {
      assert.equal(String(new Report).length, 0);

      const record = new Record('');
      assert.equal(String(new Report('LcovTest', [record])), `TN:LcovTest\n${record}`);
    });
  });
});
