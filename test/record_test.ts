/* tslint:disable: no-unused-expression */
import {expect} from 'chai';
import {suite, test} from 'mocha-typescript';
import {BranchCoverage, FunctionCoverage, LineCoverage, Record} from '../src';

/**
 * Tests the features of the `Record` class.
 */
@suite class RecordTest {

  /**
   * @test {Record.fromJson}
   */
  @test('It should initialize the instance from a JSON map')
  public testFromJson(): void {
    // It should return an instance with default values for an empty map.
    let record = Record.fromJson({});
    expect(record).to.be.instanceof(Record);
    expect(record.branches).to.be.null;
    expect(record.functions).to.be.null;
    expect(record.lines).to.be.null;
    expect(record.sourceFile).to.be.empty;

    // It should return an initialized instance for a non-empty map.
    record = Record.fromJson({
      branches: {},
      functions: {},
      lines: {},
      sourceFile: '/home/cedx/lcov.js'
    });

    expect(record).to.be.instanceof(Record);
    expect(record.branches).to.be.instanceof(BranchCoverage);
    expect(record.functions).to.be.instanceof(FunctionCoverage);
    expect(record.lines).to.be.instanceof(LineCoverage);
    expect(record.sourceFile).to.equal('/home/cedx/lcov.js');
  }

  /**
   * @test {Record#toJSON}
   */
  @test('It should return a JSON map corresponding to the instance properties')
  public testToJson(): void {
    // It should return a map with default values for a newly created instance.
    let map = new Record('').toJSON();
    expect(Object.keys(map)).to.have.lengthOf(4);
    expect(map.branches).to.be.null;
    expect(map.functions).to.be.null;
    expect(map.lines).to.be.null;
    expect(map.sourceFile).to.be.empty;

    // It should return a non-empty map for an initialized instance.
    const record = new Record('/home/cedx/lcov.js', {
      branches: new BranchCoverage,
      functions: new FunctionCoverage,
      lines: new LineCoverage
    });

    map = record.toJSON();
    expect(Object.keys(map)).to.have.lengthOf(4);
    expect(map.branches).to.be.an('object');
    expect(map.functions).to.be.an('object');
    expect(map.lines).to.be.an('object');
    expect(map.sourceFile).to.equal('/home/cedx/lcov.js');
  }

  /**
   * @test {Record#toString}
   */
  @test('It should return a format like "SF:<sourceFile>\\\\n,end_of_record"')
  public testToString(): void {
    expect(String(new Record(''))).to.equal('SF:\nend_of_record');

    const record = new Record('/home/cedx/lcov.js', {
      branches: new BranchCoverage,
      functions: new FunctionCoverage,
      lines: new LineCoverage
    });

    expect(String(record)).to.equal(`SF:/home/cedx/lcov.js\n${record.functions}\n${record.branches}\n${record.lines}\nend_of_record`);
  }
}
