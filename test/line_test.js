'use strict';

import {expect} from 'chai';
import {LineCoverage, LineData} from '../src/index';

/**
 * @test {LineCoverage}
 */
describe('LineCoverage', () => {

  /**
   * @test {LineCoverage.fromJSON}
   */
  describe('.fromJSON()', () => {
    it('should return a null reference with a non-object value', () => {
      expect(LineCoverage.fromJSON('foo')).to.be.null;
    });

    it('should return an instance with default values for an empty map', () => {
      let coverage = LineCoverage.fromJSON({});
      expect(coverage.data).to.be.an('array').and.to.be.empty;
      expect(coverage.found).to.equal(0);
      expect(coverage.hit).to.equal(0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      let coverage = LineCoverage.fromJSON({
        data: [{lineNumber: 23}],
        found: 23,
        hit: 11,
      });

      expect(coverage.data).to.be.an('array').and.have.lengthOf(1);
      expect(coverage.data[0]).to.be.instanceof(LineData);

      expect(coverage.found).to.equal(23);
      expect(coverage.hit).to.equal(11);
    });
  });

  /**
   * @test {LineCoverage#toJSON}
   */
  describe('#toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      let map = new LineCoverage().toJSON();

      expect(Object.keys(map)).to.have.lengthOf(3);
      expect(map.data).to.be.an('array').and.to.be.empty;

      expect(map.found).to.equal(0);
      expect(map.hit).to.equal(0);
    });

    it('should return a non-empty map for an initialized instance', () => {
      let map = new LineCoverage(23, 11, [new LineData()]).toJSON();
      expect(Object.keys(map)).to.have.lengthOf(3);

      expect(map.data).to.be.an('array').and.have.lengthOf(1);
      expect(map.data[0]).to.be.an('object').and.contain.keys('lineNumber');

      expect(map.found).to.equal(23);
      expect(map.hit).to.equal(11);
    });
  });

  /**
   * @test {LineCoverage#toString}
   */
  describe('#toString()', () => {
    it('should return a format like "LF:<found>\\n,LH:<hit>"', () => {
      expect(String(new LineCoverage())).to.equal('LF:0\nLH:0');

      let data = new LineData(127, 3);
      expect(String(new LineCoverage(23, 11, [data]))).to.equal(`${data}\nLF:23\nLH:11`);
    });
  });
});

/**
 * @test {LineData}
 */
describe('LineData', () => {

  /**
   * @test {LineData.fromJSON}
   */
  describe('.fromJSON()', () => {
    it('should return a null reference with a non-object value', () => {
      expect(LineData.fromJSON('foo')).to.be.null;
    });

    it('should return an instance with default values for an empty map', () => {
      let data = LineData.fromJSON({});
      expect(data.checksum).to.be.empty;
      expect(data.executionCount).to.equal(0);
      expect(data.lineNumber).to.equal(0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      let data = LineData.fromJSON({
        checksum: 'ed076287532e86365e841e92bfc50d8c',
        executionCount: 3,
        lineNumber: 127
      });

      expect(data.checksum).to.equal('ed076287532e86365e841e92bfc50d8c');
      expect(data.executionCount).to.equal(3);
      expect(data.lineNumber).to.equal(127);
    });
  });

  /**
   * @test {LineData#toJSON}
   */
  describe('#toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      let map = new LineData().toJSON();
      expect(Object.keys(map)).to.have.lengthOf(3);
      expect(map.checksum).to.be.empty;
      expect(map.executionCount).to.equal(0);
      expect(map.lineNumber).to.equal(0);
    });

    it('should return a non-empty map for an initialized instance', () => {
      let map = new LineData(127, 3, 'ed076287532e86365e841e92bfc50d8c').toJSON();
      expect(Object.keys(map)).to.have.lengthOf(3);
      expect(map.checksum).to.equal('ed076287532e86365e841e92bfc50d8c');
      expect(map.executionCount).to.equal(3);
      expect(map.lineNumber).to.equal(127);
    });
  });

  /**
   * @test {LineData#toString}
   */
  describe('#toString()', () => {
    it('should return a format like "DA:<lineNumber>,<executionCount>[,<checksum>]"', () => {
      expect(String(new LineData())).to.equal('DA:0,0');
      expect(String(new LineData(127, 3, 'ed076287532e86365e841e92bfc50d8c'))).to.equal('DA:127,3,ed076287532e86365e841e92bfc50d8c');
    });
  });
});
