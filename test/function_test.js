'use strict';

import {expect} from 'chai';
import {describe, it} from 'mocha';
import {FunctionCoverage, FunctionData} from '../src/index';

/**
 * @test {FunctionCoverage}
 */
describe('FunctionCoverage', () => {

  /**
   * @test {FunctionCoverage.fromJSON}
   */
  describe('.fromJSON()', () => {
    it('should return a null reference with a non-object value', () => {
      expect(FunctionCoverage.fromJSON('foo')).to.be.null;
    });

    it('should return an instance with default values for an empty map', () => {
      let coverage = FunctionCoverage.fromJSON({});
      expect(coverage).to.be.instanceof(FunctionCoverage);
      expect(coverage.data).to.be.an('array').and.be.empty;
      expect(coverage.found).to.equal(0);
      expect(coverage.hit).to.equal(0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      let coverage = FunctionCoverage.fromJSON({
        data: [{lineNumber: 127}],
        found: 23,
        hit: 11,
      });

      expect(coverage).to.be.instanceof(FunctionCoverage);
      expect(coverage.data).to.be.an('array').and.have.lengthOf(1);
      expect(coverage.data[0]).to.be.instanceof(FunctionData);
      expect(coverage.data[0].lineNumber).to.equal(127);

      expect(coverage.found).to.equal(23);
      expect(coverage.hit).to.equal(11);
    });
  });

  /**
   * @test {FunctionCoverage#toJSON}
   */
  describe('#toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      let map = (new FunctionCoverage).toJSON();

      expect(Object.keys(map)).to.have.lengthOf(3);
      expect(map.data).to.be.an('array').and.be.empty;

      expect(map.found).to.equal(0);
      expect(map.hit).to.equal(0);
    });

    it('should return a non-empty map for an initialized instance', () => {
      let map = new FunctionCoverage(23, 11, [new FunctionData]).toJSON();
      expect(Object.keys(map)).to.have.lengthOf(3);

      expect(map.data).to.be.an('array').and.have.lengthOf(1);
      expect(map.data[0]).to.be.an('object').and.have.property('lineNumber').that.is.a('number');

      expect(map.found).to.equal(23);
      expect(map.hit).to.equal(11);
    });
  });

  /**
   * @test {FunctionCoverage#toString}
   */
  describe('#toString()', () => {
    it('should return a format like "FNF:<found>\\n,FNH:<hit>"', () => {
      expect(String(new FunctionCoverage)).to.equal('FNF:0\nFNH:0');

      let coverage = new FunctionCoverage(23, 11, [new FunctionData('main', 127, 3)]);
      expect(String(coverage)).to.equal('FN:127,main\nFNDA:3,main\nFNF:23\nFNH:11');
    });
  });
});

/**
 * @test {FunctionData}
 */
describe('FunctionData', () => {

  /**
   * @test {FunctionData.fromJSON}
   */
  describe('.fromJSON()', () => {
    it('should return a null reference with a non-object value', () => {
      expect(FunctionData.fromJSON('foo')).to.be.null;
    });

    it('should return an instance with default values for an empty map', () => {
      let data = FunctionData.fromJSON({});
      expect(data).to.be.instanceof(FunctionData);
      expect(data.executionCount).to.equal(0);
      expect(data.functionName).to.be.empty;
      expect(data.lineNumber).to.equal(0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      let data = FunctionData.fromJSON({
        executionCount: 3,
        functionName: 'main',
        lineNumber: 127
      });

      expect(data).to.be.instanceof(FunctionData);
      expect(data.executionCount).to.equal(3);
      expect(data.functionName).to.equal('main');
      expect(data.lineNumber).to.equal(127);
    });
  });

  /**
   * @test {FunctionData#toJSON}
   */
  describe('#toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      let map = (new FunctionData).toJSON();
      expect(Object.keys(map)).to.have.lengthOf(3);
      expect(map.executionCount).to.equal(0);
      expect(map.functionName).to.be.empty;
      expect(map.lineNumber).to.equal(0);
    });

    it('should return a non-empty map for an initialized instance', () => {
      let map = new FunctionData('main', 127, 3).toJSON();
      expect(Object.keys(map)).to.have.lengthOf(3);
      expect(map.executionCount).to.equal(3);
      expect(map.functionName).to.equal('main');
      expect(map.lineNumber).to.equal(127);
    });
  });

  /**
   * @test {FunctionData#toString}
   */
  describe('#toString()', () => {
    it('should return a format like "FN:<lineNumber>,<functionName>" when used as definition', () => {
      expect((new FunctionData).toString(true)).to.equal('FN:0,');
      expect(new FunctionData('main', 127, 3).toString(true)).to.equal('FN:127,main');
    });

    it('should return a format like "FNDA:<executionCount>,<functionName>" when used as data', () => {
      expect((new FunctionData).toString(false)).to.equal('FNDA:0,');
      expect(new FunctionData('main', 127, 3).toString(false)).to.equal('FNDA:3,main');
    });
  });
});
