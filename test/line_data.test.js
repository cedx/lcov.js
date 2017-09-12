'use strict';

const {expect} = require('chai');
const {LineData} = require('../lib');

/**
 * @test {LineData}
 */
describe('LineData', () => {

  /**
   * @test {LineData.fromJson}
   */
  describe('.fromJson()', () => {
    it('should return a null reference with a non-object value', () => {
      expect(LineData.fromJson('foo')).to.be.null;
    });

    it('should return an instance with default values for an empty map', () => {
      let data = LineData.fromJson({});
      expect(data).to.be.instanceof(LineData);
      expect(data.checksum).to.be.empty;
      expect(data.executionCount).to.equal(0);
      expect(data.lineNumber).to.equal(0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      let data = LineData.fromJson({
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
   * @test {LineData#toJSON}
   */
  describe('#toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      let map = new LineData(0).toJSON();
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
      expect(String(new LineData(0)).to.equal('DA:0,0');
      expect(String(new LineData(127, 3, 'ed076287532e86365e841e92bfc50d8c'))).to.equal('DA:127,3,ed076287532e86365e841e92bfc50d8c');
    });
  });
});
