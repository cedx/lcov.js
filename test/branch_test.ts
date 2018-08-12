/* tslint:disable: no-unused-expression */
import {expect} from 'chai';
import {suite, test} from 'mocha-typescript';
import {BranchCoverage, BranchData} from '../src';

/**
 * Tests the features of the `BranchCoverage` class.
 */
@suite class BranchCoverageTest {

  /**
   * @test {BranchCoverage.fromJson}
   */
  @test('It should initialize the instance from a JSON map')
  public testFromJson(): void {
    // It should return an instance with default values for an empty map.
    let coverage = BranchCoverage.fromJson({});
    expect(coverage).to.be.instanceof(BranchCoverage);
    expect(coverage.data).to.be.an('array').and.be.empty;
    expect(coverage.found).to.equal(0);
    expect(coverage.hit).to.equal(0);

    // It should return an initialized instance for a non-empty map.
    coverage = BranchCoverage.fromJson({
      data: [{lineNumber: 127}],
      found: 23,
      hit: 11
    });

    expect(coverage).to.be.instanceof(BranchCoverage);
    expect(coverage.data).to.be.an('array').and.have.lengthOf(1);
    expect(coverage.data[0]).to.be.instanceof(BranchData);
    expect(coverage.data[0].lineNumber).to.equal(127);

    expect(coverage.found).to.equal(23);
    expect(coverage.hit).to.equal(11);
  }

  /**
   * @test {BranchCoverage#toJSON}
   */
  @test('It should return a JSON map corresponding to the instance properties')
  public testToJson(): void {
    // It should return a map with default values for a newly created instance.
    let map = (new BranchCoverage).toJSON();
    expect(Object.keys(map)).to.have.lengthOf(3);

    expect(map.data).to.be.an('array').and.be.empty;
    expect(map.found).to.equal(0);
    expect(map.hit).to.equal(0);

    // It should return a non-empty map for an initialized instance.
    map = new BranchCoverage(23, 11, [new BranchData(0, 0, 0)]).toJSON();
    expect(Object.keys(map)).to.have.lengthOf(3);

    expect(map.data).to.be.an('array').and.have.lengthOf(1);
    expect(map.data[0]).to.be.an('object').and.have.property('lineNumber').that.is.a('number');
    expect(map.found).to.equal(23);
    expect(map.hit).to.equal(11);
  }

  /**
   * @test {BranchCoverage#toString}
   */
  @test('It should return a format like "BRF:<found>\\\\n,BRH:<hit>"')
  public testToString(): void {
    expect(String(new BranchCoverage)).to.equal('BRF:0\nBRH:0');

    const data = new BranchData(127, 3, 2, 1);
    expect(String(new BranchCoverage(23, 11, [data]))).to.equal(`${data}\nBRF:23\nBRH:11`);
  }
}

/**
 * Tests the features of the `BranchData` class.
 */
@suite class BranchDataTest {

  /**
   * @test {BranchData.fromJson}
   */
  @test('It should initialize the instance from a JSON map')
  public testFromJson(): void {
    // It should return an instance with default values for an empty map.
    let data = BranchData.fromJson({});
    expect(data).to.be.instanceof(BranchData);
    expect(data.blockNumber).to.equal(0);
    expect(data.branchNumber).to.equal(0);
    expect(data.lineNumber).to.equal(0);
    expect(data.taken).to.equal(0);

    // It should return an initialized instance for a non-empty map.
    data = BranchData.fromJson({
      blockNumber: 3,
      branchNumber: 2,
      lineNumber: 127,
      taken: 1
    });

    expect(data).to.be.instanceof(BranchData);
    expect(data.blockNumber).to.equal(3);
    expect(data.branchNumber).to.equal(2);
    expect(data.lineNumber).to.equal(127);
    expect(data.taken).to.equal(1);
  }

  /**
   * @test {BranchData#toJSON}
   */
  @test('It should return a JSON map corresponding to the instance properties')
  public testToJson(): void {
    // It should return a map with default values for a newly created instance.
    let map = new BranchData(0, 0, 0).toJSON();
    expect(Object.keys(map)).to.have.lengthOf(4);
    expect(map.blockNumber).to.equal(0);
    expect(map.branchNumber).to.equal(0);
    expect(map.lineNumber).to.equal(0);
    expect(map.taken).to.equal(0);

    // It should return a non-empty map for an initialized instance.
    map = new BranchData(127, 3, 2, 1).toJSON();
    expect(Object.keys(map)).to.have.lengthOf(4);
    expect(map.blockNumber).to.equal(3);
    expect(map.branchNumber).to.equal(2);
    expect(map.lineNumber).to.equal(127);
    expect(map.taken).to.equal(1);
  }

  /**
   * @test {BranchData#toString}
   */
  @test('It should return a format like "BRDA:<lineNumber>,<blockNumber>,<branchNumber>,<taken>"')
  public testToString(): void {
    expect(String(new BranchData(0, 0, 0))).to.equal('BRDA:0,0,0,-');
    expect(String(new BranchData(127, 3, 2, 1))).to.equal('BRDA:127,3,2,1');
  }
}
