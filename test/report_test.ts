/* tslint:disable: no-unused-expression */
import {expect} from 'chai';
import {suite, test} from 'mocha-typescript';
import {
  BranchCoverage, BranchData,
  FunctionCoverage, FunctionData,
  LcovError,
  LineCoverage, LineData,
  Record, Report
} from '../src';

/**
 * Tests the features of the `Record` class.
 */
@suite class ReportTest {

  /**
   * A sample coverage report.
   */
  public static readonly coverage: string = `
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
  @test('It should initialize the instance from a coverage report')
  public testFromCoverage(): void {
    const report = Report.fromCoverage(ReportTest.coverage);

    // It should have a test name.
    expect(report.testName).to.equal('Example');

    // It should contain three records.
    expect(report.records).to.have.lengthOf(3);
    expect(report.records[0]).to.be.instanceof(Record);
    expect(report.records[0].sourceFile).to.equal('/home/cedx/lcov.js/fixture.js');
    expect(report.records[1].sourceFile).to.equal('/home/cedx/lcov.js/func1.js');
    expect(report.records[2].sourceFile).to.equal('/home/cedx/lcov.js/func2.js');

    // It should have detailed branch coverage.
    const branches = report.records[1].branches as BranchCoverage;
    expect(branches.found).to.equal(4);
    expect(branches.hit).to.equal(4);

    expect(branches.data).to.have.lengthOf(4);
    expect(branches.data[0]).to.be.instanceof(BranchData);
    expect(branches.data[0].lineNumber).to.equal(8);

    // It should have detailed function coverage.
    const functions = report.records[1].functions as FunctionCoverage;
    expect(functions.found).to.equal(1);
    expect(functions.hit).to.equal(1);

    expect(functions.data).to.have.lengthOf(1);
    expect(functions.data[0]).to.be.instanceof(FunctionData);
    expect(functions.data[0].functionName).to.equal('func1');

    // It should have detailed line coverage.
    const lines = report.records[1].lines as LineCoverage;
    expect(lines.found).to.equal(9);
    expect(lines.hit).to.equal(9);

    expect(lines.data).to.have.lengthOf(9);
    expect(lines.data[0]).to.be.instanceof(LineData);
    expect(lines.data[0].checksum).to.equal('5kX7OTfHFcjnS98fjeVqNA');

    // It should throw an error if the input is invalid.
    expect(() => Report.fromCoverage('ZZ')).to.throw(LcovError, 'invalid LCOV format');

    // It should throw an error if the report is empty.
    expect(() => Report.fromCoverage('TN:Example')).to.throw(LcovError, 'coverage data is empty');
  }

  /**
   * @test {Report.fromJson}
   */
  @test('It should initialize the instance from a JSON map')
  public testFromJson(): void {
    // It should return an instance with default values for an empty map.
    let report = Report.fromJson({});
    expect(report).to.be.instanceof(Report);
    expect(report.records).to.be.an('array').and.be.empty;
    expect(report.testName).to.be.empty;

    // It should return an initialized instance for a non-empty map.
    report = Report.fromJson({
      records: [{}],
      testName: 'LcovTest'
    });

    expect(report).to.be.instanceof(Report);
    expect(report.records).to.be.an('array').and.have.lengthOf(1);
    expect(report.records[0]).to.be.instanceof(Record);
    expect(report.testName).to.equal('LcovTest');
  }

  /**
   * @test {Report#toJSON}
   */
  @test('It should return a JSON map corresponding to the instance properties')
  public testToJson(): void {
    // It should return a map with default values for a newly created instance.
    let map = (new Report).toJSON();
    expect(Object.keys(map)).to.have.lengthOf(2);
    expect(map.records).to.be.an('array').and.be.empty;
    expect(map.testName).to.be.empty;

    // It should return a non-empty map for an initialized instance.
    map = new Report('LcovTest', [new Record('')]).toJSON();
    expect(Object.keys(map)).to.have.lengthOf(2);
    expect(map.records).to.be.an('array').and.have.lengthOf(1);
    expect(map.records[0]).to.be.an('object');
    expect(map.testName).to.equal('LcovTest');
  }

  /**
   * @test {Report#toString}
   */
  @test('It should return a format like "TN:<testName>"')
  public testToString(): void {
    expect(String(new Report)).to.be.empty;

    const record = new Record('');
    expect(String(new Report('LcovTest', [record]))).to.equal(`TN:LcovTest\n${record}`);
  }
}
