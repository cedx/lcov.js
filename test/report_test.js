'use strict';

const {expect} = require('chai');
const {BranchData, FunctionData, LineData, LcovError, Record, Report} = require('../lib/index.js');

/**
 * @test {Report}
 */
describe('Report', () => {
  const coverage = `
TN:Example

SF:/home/cedx/lcov.js/fixture.js
FN:4,main
FNDA:2,main
FNF:1
FNH:1
DA:6,2,PF4Rz2r7RTliO9u6bZ7h6g
DA:7,2,yGMB6FhEEAd8OyASe3Ni1w
DA:8,2,8F2cpOfOtP7xrzoeUaNfTg
DA:9,2,y7GE3Y4FyXCeXcrtqgSVzw
LF:4
LH:4
end_of_record

SF:/home/cedx/lcov.js/func1.js
FN:5,func1
FNDA:4,func1
FNF:1
FNH:1
BRDA:8,0,0,2
BRDA:8,0,1,2
BRDA:11,0,0,2
BRDA:11,0,1,2
BRF:4
BRH:4
DA:7,4,5kX7OTfHFcjnS98fjeVqNA
DA:8,4,Z0wAKBAY/gWvszzK23gPjg
DA:9,2,axfyTWsiE2y4xhwLfts4Hg
DA:10,2,fu+5DeZoKYnvkzvK3Lt96Q
DA:11,4,RY9SlOU8MfTJFeL6YlmwVQ
DA:12,2,ZHrTdJHnvMtpEN3wqQEqbw
DA:13,2,fu+5DeZoKYnvkzvK3Lt96Q
DA:14,4,7/m6ZIVdeOR9WTEt9UzqSA
DA:15,4,y7GE3Y4FyXCeXcrtqgSVzw
LF:9
LH:9
end_of_record

SF:/home/cedx/lcov.js/func2.js
FN:5,func2
FNDA:2,func2
FNF:1
FNH:1
BRDA:8,0,0,2
BRDA:8,0,1,0
BRDA:11,0,0,0
BRDA:11,0,1,2
BRF:4
BRH:2
DA:7,2,5kX7OTfHFcjnS98fjeVqNA
DA:8,2,Z0wAKBAY/gWvszzK23gPjg
DA:9,2,axfyTWsiE2y4xhwLfts4Hg
DA:10,2,fu+5DeZoKYnvkzvK3Lt96Q
DA:11,2,RY9SlOU8MfTJFeL6YlmwVQ
DA:12,0,ZHrTdJHnvMtpEN3wqQEqbw
DA:13,0,fu+5DeZoKYnvkzvK3Lt96Q
DA:14,2,7/m6ZIVdeOR9WTEt9UzqSA
DA:15,2,y7GE3Y4FyXCeXcrtqgSVzw
LF:9
LH:7
end_of_record
`;

  /**
   * @test {Report.fromCoverage}
   */
  describe('.fromCoverage()', () => {
    let report = Report.fromCoverage(coverage);

    it('should have a test name', async () => {
      expect(report.testName).to.equal('Example');
    });

    it('should contain three records', async () => {
      expect(report.records).to.have.lengthOf(3);
      expect(report.records[0]).to.be.instanceof(Record);
      expect(report.records[0].sourceFile).to.equal('/home/cedx/lcov.js/fixture.js');
      expect(report.records[1].sourceFile).to.equal('/home/cedx/lcov.js/func1.js');
      expect(report.records[2].sourceFile).to.equal('/home/cedx/lcov.js/func2.js');
    });

    it('should have detailed branch coverage', async () => {
      let branches = report.records[1].branches;
      expect(branches.found).to.equal(4);
      expect(branches.hit).to.equal(4);

      expect(branches.data).to.have.lengthOf(4);
      expect(branches.data[0]).to.be.instanceof(BranchData);
      expect(branches.data[0].lineNumber).to.equal(8);
    });

    it('should have detailed function coverage', async () => {
      let functions = report.records[1].functions;
      expect(functions.found).to.equal(1);
      expect(functions.hit).to.equal(1);

      expect(functions.data).to.have.lengthOf(1);
      expect(functions.data[0]).to.be.instanceof(FunctionData);
      expect(functions.data[0].functionName).to.equal('func1');
    });

    it('should have detailed line coverage', async () => {
      let lines = report.records[1].lines;
      expect(lines.found).to.equal(9);
      expect(lines.hit).to.equal(9);

      expect(lines.data).to.have.lengthOf(9);
      expect(lines.data[0]).to.be.instanceof(LineData);
      expect(lines.data[0].checksum).to.equal('5kX7OTfHFcjnS98fjeVqNA');
    });

    it('should throw an error if the input is invalid', () => {
      expect(() => Report.fromCoverage('ZZ')).to.throw(LcovError, 'invalid LCOV format');
    });

    it('should throw an error if the report is empty', () => {
      expect(() => Report.fromCoverage('TN:Example')).to.throw(LcovError, 'coverage data is empty');
    });
  });

  /**
   * @test {Report.fromJson}
   */
  describe('.fromJson()', () => {
    it('should return a null reference with a non-object value', () => {
      expect(Report.fromJson('foo')).to.be.null;
    });

    it('should return an instance with default values for an empty map', () => {
      let report = Report.fromJson({});
      expect(report).to.be.instanceof(Report);
      expect(report.records).to.be.an('array').and.be.empty;
      expect(report.testName).to.be.empty;
    });

    it('should return an initialized instance for a non-empty map', () => {
      let report = Report.fromJson({
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
      let map = new Report('LcovTest', [new Record('')]).toJSON();
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

      let record = new Record('');
      expect(String(new Report('LcovTest', [record]))).to.equal(`TN:LcovTest\n${record}`);
    });
  });
});
