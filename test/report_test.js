'use strict';

import {expect} from 'chai';
import {readFile} from 'fs';
import {describe, it} from 'mocha';
import {promisify} from 'util';
import {BranchData, FunctionData, LineData, Record, Report} from '../src/index';

/**
 * @test {Report}
 */
describe('Report', () => {

  /**
   * @test {Report.fromJSON}
   */
  describe('.fromJSON()', () => {
    it('should return a null reference with a non-object value', () => {
      expect(Report.fromJSON('foo')).to.be.null;
    });

    it('should return an instance with default values for an empty map', () => {
      let report = Report.fromJSON({});
      expect(report).to.be.instanceof(Report);
      expect(report.records).to.be.an('array').and.be.empty;
      expect(report.testName).to.be.empty;
    });

    it('should return an initialized instance for a non-empty map', () => {
      let report = Report.fromJSON({
        records: [{}],
        testName: 'LcovTest'
      });

      expect(report).to.be.instanceof(Report);
      expect(report.records).to.be.an('array').and.have.lengthOf(1);
      expect(report.records[0]).to.be.instanceof(Record);
      expect(report.testName).to.equal('LcovTest');
    });
  });

  /**
   * @test {Report.parse}
   */
  describe('.parse()', async () => {
    const loadReport = promisify(readFile);
    let reportPath = `${__dirname}/fixtures/lcov.info`;

    it('should have a test name', async () => {
      let report = Report.parse(await loadReport(reportPath, 'utf8'));
      expect(report.testName).to.equal('Example');
    });

    it('should contain three records', async () => {
      let report = Report.parse(await loadReport(reportPath, 'utf8'));
      expect(report.records).to.have.lengthOf(3);
      expect(report.records[0]).to.be.instanceof(Record);
      expect(report.records[0].sourceFile).to.equal('/home/cedx/lcov.js/fixture.js');
      expect(report.records[1].sourceFile).to.equal('/home/cedx/lcov.js/func1.js');
      expect(report.records[2].sourceFile).to.equal('/home/cedx/lcov.js/func2.js');
    });

    it('should have detailed branch coverage', async () => {
      let report = Report.parse(await loadReport(reportPath, 'utf8'));

      let branches = report.records[1].branches;
      expect(branches.found).to.equal(4);
      expect(branches.hit).to.equal(4);

      expect(branches.data).to.have.lengthOf(4);
      expect(branches.data[0]).to.be.instanceof(BranchData);
      expect(branches.data[0].lineNumber).to.equal(8);
    });

    it('should have detailed function coverage', async () => {
      let report = Report.parse(await loadReport(reportPath, 'utf8'));

      let functions = report.records[1].functions;
      expect(functions.found).to.equal(1);
      expect(functions.hit).to.equal(1);

      expect(functions.data).to.have.lengthOf(1);
      expect(functions.data[0]).to.be.instanceof(FunctionData);
      expect(functions.data[0].functionName).to.equal('func1');
    });

    it('should have detailed line coverage', async () => {
      let report = Report.parse(await loadReport(reportPath, 'utf8'));

      let lines = report.records[1].lines;
      expect(lines.found).to.equal(9);
      expect(lines.hit).to.equal(9);

      expect(lines.data).to.have.lengthOf(9);
      expect(lines.data[0]).to.be.instanceof(LineData);
      expect(lines.data[0].checksum).to.equal('5kX7OTfHFcjnS98fjeVqNA');
    });

    it('should throw an error if the input is invalid', () => {
      expect(() => Report.parse('ZZ:dummy')).to.throw();
    });

    it('should throw an error if the report is empty', () => {
      expect(() => Report.parse('TN:Example')).to.throw();
    });
  });

  /**
   * @test {Report#toJSON}
   */
  describe('#toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      let map = (new Report).toJSON();
      expect(Object.keys(map)).to.have.lengthOf(2);
      expect(map.records).to.be.an('array').and.be.empty;
      expect(map.testName).to.be.empty;
    });

    it('should return a non-empty map for an initialized instance', () => {
      let map = new Report('LcovTest', [new Record]).toJSON();
      expect(Object.keys(map)).to.have.lengthOf(2);
      expect(map.records).to.be.an('array').and.have.lengthOf(1);
      expect(map.records[0]).to.be.an('object');
      expect(map.testName).to.equal('LcovTest');
    });
  });

  /**
   * @test {Report#toString}
   */
  describe('#toString()', () => {
    it('should return a format like "TN:<testName>"', () => {
      expect(String(new Report)).to.be.empty;

      let record = new Record;
      expect(String(new Report('LcovTest', [record]))).to.equal(`TN:LcovTest\n${record}`);
    });
  });
});
