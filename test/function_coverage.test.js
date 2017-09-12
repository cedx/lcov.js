'use strict';

const {expect} = require('chai');
const {FunctionCoverage, FunctionData} = require('../lib');

/**
 * @test {FunctionCoverage}
 */
describe('FunctionCoverage', () => {

  /**
   * @test {FunctionCoverage.fromJson}
   */
  describe('.fromJson()', () => {
    it('should return a null reference with a non-object value', () => {
      expect(FunctionCoverage.fromJson('foo')).to.be.null;
    });

    it('should return an instance with default values for an empty map', () => {
      let coverage = FunctionCoverage.fromJson({});
      expect(coverage).to.be.instanceof(FunctionCoverage);
      expect(coverage.data).to.be.an('array').and.be.empty;
      expect(coverage.found).to.equal(0);
      expect(coverage.hit).to.equal(0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      let coverage = FunctionCoverage.fromJson({
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
      let map = new FunctionCoverage(23, 11, [new FunctionData('', 0)]).toJSON();
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
