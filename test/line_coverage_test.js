'use strict';

const {expect} = require('chai');
const {LineCoverage, LineData} = require('../lib');

/**
 * @test {LineCoverage}
 */
describe('LineCoverage', () => {

  /**
   * @test {LineCoverage.fromJson}
   */
  describe('.fromJson()', () => {
    it('should return a null reference with a non-object value', () => {
      expect(LineCoverage.fromJson('foo')).to.be.null;
    });

    it('should return an instance with default values for an empty map', () => {
      let coverage = LineCoverage.fromJson({});
      expect(coverage).to.be.instanceof(LineCoverage);
      expect(coverage.data).to.be.an('array').and.be.empty;
      expect(coverage.found).to.equal(0);
      expect(coverage.hit).to.equal(0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      let coverage = LineCoverage.fromJson({
        data: [{lineNumber: 127}],
        found: 23,
        hit: 11,
      });

      expect(coverage).to.be.instanceof(LineCoverage);
      expect(coverage.data).to.be.an('array').and.have.lengthOf(1);
      expect(coverage.data[0]).to.be.instanceof(LineData);
      expect(coverage.data[0].lineNumber).to.equal(127);

      expect(coverage.found).to.equal(23);
      expect(coverage.hit).to.equal(11);
    });
  });

  /**
   * @test {LineCoverage#toJSON}
   */
  describe('#toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      let map = (new LineCoverage).toJSON();

      expect(Object.keys(map)).to.have.lengthOf(3);
      expect(map.data).to.be.an('array').and.be.empty;

      expect(map.found).to.equal(0);
      expect(map.hit).to.equal(0);
    });

    it('should return a non-empty map for an initialized instance', () => {
      let map = new LineCoverage(23, 11, [new LineData]).toJSON();
      expect(Object.keys(map)).to.have.lengthOf(3);

      expect(map.data).to.be.an('array').and.have.lengthOf(1);
      expect(map.data[0]).to.be.an('object').and.have.property('lineNumber').that.is.a('number');

      expect(map.found).to.equal(23);
      expect(map.hit).to.equal(11);
    });
  });

  /**
   * @test {LineCoverage#toString}
   */
  describe('#toString()', () => {
    it('should return a format like "LF:<found>\\n,LH:<hit>"', () => {
      expect(String(new LineCoverage)).to.equal('LF:0\nLH:0');

      let data = new LineData(127, 3);
      expect(String(new LineCoverage(23, 11, [data]))).to.equal(`${data}\nLF:23\nLH:11`);
    });
  });
});
