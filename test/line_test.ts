/* tslint:disable: no-unused-expression */
import {expect} from 'chai';
import {LineCoverage, LineData} from '../src';

/**
 * Tests the features of the `LineCoverage` class.
 */
describe('LineCoverage', () => {

  /**
   * Tests the `LineCoverage.fromJson()` method.
   */
  describe('.fromJson()', () => {
    it('should return an instance with default values for an empty map', () => {
      const coverage = LineCoverage.fromJson({});
      expect(coverage).to.be.instanceof(LineCoverage);
      expect(coverage.data).to.be.an('array').and.be.empty;
      expect(coverage.found).to.equal(0);
      expect(coverage.hit).to.equal(0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      const coverage = LineCoverage.fromJson({
        data: [{lineNumber: 127}],
        found: 23,
        hit: 11
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
   * Tests the `LineCoverage#toJSON()` method.
   */
  describe('#toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      const map = (new LineCoverage).toJSON();
      expect(Object.keys(map)).to.have.lengthOf(3);

      expect(map.data).to.be.an('array').and.be.empty;
      expect(map.found).to.equal(0);
      expect(map.hit).to.equal(0);
    });

    it('should return a non-empty map for an initialized instance', () => {
      const map = new LineCoverage(23, 11, [new LineData(0)]).toJSON();
      expect(Object.keys(map)).to.have.lengthOf(3);

      expect(map.data).to.be.an('array').and.have.lengthOf(1);
      expect(map.data[0]).to.be.an('object').and.have.property('lineNumber').that.is.a('number');
      expect(map.found).to.equal(23);
      expect(map.hit).to.equal(11);
    });
  });

  /**
   * Tests the `LineCoverage#toString()` method.
   */
  describe('#toString()', () => {
    it('should return a format like "LF:<found>\\\\n,LH:<hit>"', () => {
      expect(String(new LineCoverage)).to.equal('LF:0\nLH:0');

      const data = new LineData(127, 3);
      expect(String(new LineCoverage(23, 11, [data]))).to.equal(`${data}\nLF:23\nLH:11`);
    });
  });
});

/**
 * Tests the features of the `LineData` class.
 */
describe('LineData', () => {

  /**
   * Tests the `LineData.fromJson()` method.
   */
  describe('.fromJson()', () => {
    it('should return an instance with default values for an empty map', () => {
      const data = LineData.fromJson({});
      expect(data).to.be.instanceof(LineData);
      expect(data.checksum).to.be.empty;
      expect(data.executionCount).to.equal(0);
      expect(data.lineNumber).to.equal(0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      const data = LineData.fromJson({
        checksum: 'ed076287532e86365e841e92bfc50d8c',
        executionCount: 3,
        lineNumber: 127
      });

      expect(data).to.be.instanceof(LineData);
      expect(data.checksum).to.equal('ed076287532e86365e841e92bfc50d8c');
      expect(data.executionCount).to.equal(3);
      expect(data.lineNumber).to.equal(127);
    });
  });

  /**
   * Tests the `LineData#toJSON()` method.
   */
  describe('#toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      const map = new LineData(0).toJSON();
      expect(Object.keys(map)).to.have.lengthOf(3);
      expect(map.checksum).to.be.empty;
      expect(map.executionCount).to.equal(0);
      expect(map.lineNumber).to.equal(0);
    });

    it('should return a non-empty map for an initialized instance', () => {
      const map = new LineData(127, 3, 'ed076287532e86365e841e92bfc50d8c').toJSON();
      expect(Object.keys(map)).to.have.lengthOf(3);
      expect(map.checksum).to.equal('ed076287532e86365e841e92bfc50d8c');
      expect(map.executionCount).to.equal(3);
      expect(map.lineNumber).to.equal(127);
    });
  });

  /**
   * Tests the `LineData#toString()` method.
   */
  describe('#toString()', () => {
    it('should return a format like "DA:<lineNumber>,<executionCount>[,<checksum>]"', () => {
      expect(String(new LineData(0))).to.equal('DA:0,0');
      expect(String(new LineData(127, 3, 'ed076287532e86365e841e92bfc50d8c'))).to.equal('DA:127,3,ed076287532e86365e841e92bfc50d8c');
    });
  });
});
