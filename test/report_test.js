'use strict';

import assert from 'assert';
import fs from 'fs';
import {BranchData, FunctionData, LineData, Record, Report} from '../src/index';

/**
 * @test {Report}
 */
describe('Report', () => {

  /**
   * @test {Report#constructor}
   */
  describe('#constructor()', () => {
    it('should initialize the existing properties', () => {
      let record = new Record();
      let report = new Report({
        records: [record],
        testName: 'LcovTest'
      });

      assert.ok(Array.isArray(report.records));
      assert.equal(report.records.length, 1);
      assert.strictEqual(report.records[0], record);
      assert.equal(report.testName, 'LcovTest');
    });

    it('should not create new properties', () => {
      assert.ok(!('foo' in new Report({foo: 'bar'})));
    });
  });

  /**
   * @test {Report.fromJSON}
   */
  describe('.fromJSON()', () => {
    it('should return a null reference with a non-object value', () => {
      assert.strictEqual(Report.fromJSON('foo'), null);
    });

    it('should return an instance with default values for an empty map', () => {
      let report = Report.fromJSON({});
      assert.ok(report instanceof Report);
      assert.ok(Array.isArray(report.records));
      assert.equal(report.records.length, 0);
      assert.equal(report.testName, '');
    });

    it('should return an initialized instance for a non-empty map', () => {
      let report = Report.fromJSON({
        records: [{}],
        testName: 'LcovTest'
      });

      assert.ok(report instanceof Report);
      assert.ok(Array.isArray(report.records));
      assert.equal(report.records.length, 1);
      assert.ok(report.records[0] instanceof Record);
      assert.equal(report.testName, 'LcovTest');
    });
  });

  /**
   * @test {Report#toJSON}
   */
  describe('#toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      let map = new Report().toJSON();
      assert.equal(Object.keys(map).length, 2);
      assert.ok(Array.isArray(map.records));
      assert.equal(map.records.length, 0);
      assert.equal(map.testName, '');
    });

    it('should return a non-empty map for an initialized instance', () => {
      let map = new Report({
        records: [new Record()],
        testName: 'LcovTest'
      }).toJSON();

      assert.equal(Object.keys(map).length, 2);
      assert.ok(Array.isArray(map.records));
      assert.equal(map.records.length, 1);
      assert.ok(map.records[0] && typeof map.records[0] == 'object');
      assert.equal(map.testName, 'LcovTest');
    });
  });

  /**
   * @test {Report.parse}
   */
  describe('.parse()', () => {
    /* eslint-disable no-sync */
    let report = Report.parse(fs.readFileSync(`${__dirname}/lcov.info`, 'utf8'));
    /* eslint-enable no-sync */

    it('should have a test name', () => {
      assert.equal(report.testName, 'Example');
    });

    it('should contain three records', () => {
      assert.equal(report.records.length, 3);
      assert.ok(report.records[0] instanceof Record);
      assert.equal(report.records[0].sourceFile, '/home/cedx/lcov.js/fixture.js');
      assert.equal(report.records[1].sourceFile, '/home/cedx/lcov.js/func1.js');
      assert.equal(report.records[2].sourceFile, '/home/cedx/lcov.js/func2.js');
    });

    it('should have detailed branch coverage', () => {
      let branches = report.records[1].branches;
      assert.equal(branches.found, 4);
      assert.equal(branches.hit, 4);

      assert.equal(branches.data.length, 4);
      assert.ok(branches.data[0] instanceof BranchData);
      assert.equal(branches.data[0].lineNumber, 8);
    });

    it('should have detailed function coverage', () => {
      let functions = report.records[1].functions;
      assert.equal(functions.found, 1);
      assert.equal(functions.hit, 1);

      assert.equal(functions.data.length, 1);
      assert.ok(functions.data[0] instanceof FunctionData);
      assert.equal('func1', functions.data[0].functionName);
    });

    it('should have detailed line coverage', () => {
      let lines = report.records[1].lines;
      assert.equal(lines.found, 9);
      assert.equal(lines.hit, 9);

      assert.equal(lines.data.length, 9);
      assert.ok(lines.data[0] instanceof LineData);
      assert.equal(lines.data[0].checksum, '5kX7OTfHFcjnS98fjeVqNA');
    });

    it('should throw an error if the input is invalid', () => {
      assert.throws(() => Report.parse('TN:Example'));
    });
  });

  /**
   * @test {Report#toString}
   */
  describe('#toString()', () => {
    it('should return a format like "TN:<testName>"', () => {
      let report = new Report();
      assert.equal(String(report), 'TN:');

      let record = new Record();
      report = new Report({
        records: [record],
        testName: 'LcovTest'
      });

      assert.equal(String(report), `TN:LcovTest\n${record}`);
    });
  });
});
