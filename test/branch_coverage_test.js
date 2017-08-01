'use strict';

const {expect} = require('chai');
const {BranchCoverage, BranchData} = require('../lib');

/**
 * @test {BranchCoverage}
 */
describe('BranchCoverage', () => {

  /**
   * @test {BranchCoverage.fromJson}
   */
  describe('.fromJson()', () => {
    it('should return a null reference with a non-object value', () => {
      expect(BranchCoverage.fromJson('foo')).to.be.null;
    });

    it('should return an instance with default values for an empty map', () => {
      let coverage = BranchCoverage.fromJson({});
      expect(coverage).to.be.instanceof(BranchCoverage);
      expect(coverage.data).to.be.an('array').and.be.empty;
      expect(coverage.found).to.equal(0);
      expect(coverage.hit).to.equal(0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      let coverage = BranchCoverage.fromJson({
        data: [{lineNumber: 127}],
        found: 23,
        hit: 11,
      });

      expect(coverage).to.be.instanceof(BranchCoverage);
      expect(coverage.data).to.be.an('array').and.have.lengthOf(1);
      expect(coverage.data[0]).to.be.instanceof(BranchData);
      expect(coverage.data[0].lineNumber).to.equal(127);

      expect(coverage.found).to.equal(23);
      expect(coverage.hit).to.equal(11);
    });
  });

  /**
   * @test {BranchCoverage#toJSON}
   */
  describe('#toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      let map = (new BranchCoverage).toJSON();

      expect(Object.keys(map)).to.have.lengthOf(3);
      expect(map.data).to.be.an('array').and.be.empty;

      expect(map.found).to.equal(0);
      expect(map.hit).to.equal(0);
    });

    it('should return a non-empty map for an initialized instance', () => {
      let map = new BranchCoverage(23, 11, [new BranchData]).toJSON();
      expect(Object.keys(map)).to.have.lengthOf(3);

      expect(map.data).to.be.an('array').and.have.lengthOf(1);
      expect(map.data[0]).to.be.an('object').and.have.property('lineNumber').that.is.a('number');

      expect(map.found).to.equal(23);
      expect(map.hit).to.equal(11);
    });
  });

  /**
   * @test {BranchCoverage#toString}
   */
  describe('#toString()', () => {
    it('should return a format like "BRF:<found>\\n,BRH:<hit>"', () => {
      expect(String(new BranchCoverage)).to.equal('BRF:0\nBRH:0');

      let data = new BranchData(127, 3, 2, 1);
      expect(String(new BranchCoverage(23, 11, [data]))).to.equal(`${data}\nBRF:23\nBRH:11`);
    });
  });
});
