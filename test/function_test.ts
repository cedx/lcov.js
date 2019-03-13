/* tslint:disable: no-unused-expression */
import {expect} from 'chai';
import {FunctionCoverage, FunctionData} from '../src';

/**
 * Tests the features of the `FunctionCoverage` class.
 */
describe('FunctionCoverage', () => {

  /**
   * Tests the `FunctionCoverage.fromJson()` method.
   */
  describe('.fromJson()', () => {
    it('should return an instance with default values for an empty map', () => {
      const coverage = FunctionCoverage.fromJson({});
      expect(coverage).to.be.an.instanceof(FunctionCoverage);
      expect(coverage.data).to.be.an('array').and.be.empty;
      expect(coverage.found).to.equal(0);
      expect(coverage.hit).to.equal(0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      const coverage = FunctionCoverage.fromJson({
        data: [{lineNumber: 127}],
        found: 23,
        hit: 11
      });

      expect(coverage).to.be.an.instanceof(FunctionCoverage);
      expect(coverage.data).to.be.an('array').and.have.lengthOf(1);
      expect(coverage.data[0]).to.be.an.instanceof(FunctionData);
      expect(coverage.data[0].lineNumber).to.equal(127);

      expect(coverage.found).to.equal(23);
      expect(coverage.hit).to.equal(11);
    });
  });

  /**
   * Tests the `FunctionCoverage#toJSON()` method.
   */
  describe('#toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      const map = (new FunctionCoverage).toJSON();

      expect(Object.keys(map)).to.have.lengthOf(3);
      expect(map.data).to.be.an('array').and.be.empty;

      expect(map.found).to.equal(0);
      expect(map.hit).to.equal(0);
    });

    it('should return a non-empty map for an initialized instance', () => {
      const map = new FunctionCoverage(23, 11, [new FunctionData('', 0)]).toJSON();
      expect(Object.keys(map)).to.have.lengthOf(3);

      expect(map.data).to.be.an('array').and.have.lengthOf(1);
      expect(map.data[0]).to.be.an('object').and.have.property('lineNumber').that.is.a('number');

      expect(map.found).to.equal(23);
      expect(map.hit).to.equal(11);
    });
  });

  /**
   * Tests the `FunctionCoverage#toString()` method.
   */
  describe('#toString()', () => {
    it('should return a format like "FNF:<found>\\\\n,FNH:<hit>"', () => {
      expect(String(new FunctionCoverage)).to.equal('FNF:0\nFNH:0');

      const coverage = new FunctionCoverage(23, 11, [new FunctionData('main', 127, 3)]);
      expect(String(coverage)).to.equal('FN:127,main\nFNDA:3,main\nFNF:23\nFNH:11');
    });
  });
});

/**
 * Tests the features of the `FunctionData` class.
 */
describe('FunctionData', () => {

  /**
   * Tests the `FunctionData.fromJson()` method.
   */
  describe('.fromJson()', () => {
    it('should return an instance with default values for an empty map', () => {
      const data = FunctionData.fromJson({});
      expect(data).to.be.an.instanceof(FunctionData);
      expect(data.executionCount).to.equal(0);
      expect(data.functionName).to.be.empty;
      expect(data.lineNumber).to.equal(0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      const data = FunctionData.fromJson({
        executionCount: 3,
        functionName: 'main',
        lineNumber: 127
      });

      expect(data).to.be.an.instanceof(FunctionData);
      expect(data.executionCount).to.equal(3);
      expect(data.functionName).to.equal('main');
      expect(data.lineNumber).to.equal(127);
    });
  });

  /**
   * Tests the `FunctionData#toJSON()` method.
   */
  describe('#toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      const map = new FunctionData('', 0).toJSON();
      expect(Object.keys(map)).to.have.lengthOf(3);
      expect(map.executionCount).to.equal(0);
      expect(map.functionName).to.be.empty;
      expect(map.lineNumber).to.equal(0);
    });

    it('should return a non-empty map for an initialized instance', () => {
      const map = new FunctionData('main', 127, 3).toJSON();
      expect(Object.keys(map)).to.have.lengthOf(3);
      expect(map.executionCount).to.equal(3);
      expect(map.functionName).to.equal('main');
      expect(map.lineNumber).to.equal(127);
    });
  });

  /**
   * Tests the `FunctionData#toString()` method.
   */
  describe('#toString()', () => {
    it('should return a format like "FN:<lineNumber>,<functionName>" when used as definition', () => {
      expect(new FunctionData('', 0).toString(true)).to.equal('FN:0,');
      expect(new FunctionData('main', 127, 3).toString(true)).to.equal('FN:127,main');
    });

    it('should return a format like "FNDA:<executionCount>,<functionName>" when used as data', () => {
      expect(new FunctionData('', 0).toString(false)).to.equal('FNDA:0,');
      expect(new FunctionData('main', 127, 3).toString(false)).to.equal('FNDA:3,main');
    });
  });
});
