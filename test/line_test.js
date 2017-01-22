'use strict';

import assert from 'assert';
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
      assert.strictEqual(LineCoverage.fromJSON('foo'), null);
    });

    it('should return an instance with default values for an empty map', () => {
      let coverage = LineCoverage.fromJSON({});
      assert.ok(Array.isArray(coverage.data));
      assert.equal(coverage.data.length, 0);
      assert.equal(coverage.found, 0);
      assert.equal(coverage.hit, 0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      let coverage = LineCoverage.fromJSON({
        data: [{lineNumber: 23}],
        found: 23,
        hit: 11,
      });

      assert.ok(Array.isArray(coverage.data));
      assert.equal(coverage.data.length, 1);
      assert.ok(coverage.data[0] instanceof LineData);

      assert.equal(coverage.found, 23);
      assert.equal(coverage.hit, 11);
    });
  });

  /**
   * @test {LineCoverage#toJSON}
   */
  describe('#toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      let map = new LineCoverage().toJSON();

      assert.equal(Object.keys(map).length, 3);
      assert.ok(Array.isArray(map.data));
      assert.equal(map.data.length, 0);

      assert.equal(map.found, 0);
      assert.equal(map.hit, 0);
    });

    it('should return a non-empty map for an initialized instance', () => {
      let map = new LineCoverage(23, 11, [new LineData()]).toJSON();

      assert.equal(Object.keys(map).length, 3);
      assert.ok(Array.isArray(map.data));
      assert.equal(map.data.length, 1);

      assert.ok(map.data[0] && typeof map.data[0] == 'object');
      assert.ok('lineNumber' in map.data[0]);

      assert.equal(map.found, 23);
      assert.equal(map.hit, 11);
    });
  });

  /**
   * @test {LineCoverage#toString}
   */
  describe('#toString()', () => {
    it('should return a format like "LF:<found>\\n,LH:<hit>"', () => {
      assert.equal(String(new LineCoverage()), 'LF:0\nLH:0');

      let data = new LineData(127, 3);
      assert.equal(String(new LineCoverage(23, 11, [data])), `${data}\nLF:23\nLH:11`);
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
      assert.strictEqual(LineData.fromJSON('foo'), null);
    });

    it('should return an instance with default values for an empty map', () => {
      let data = LineData.fromJSON({});
      assert.equal(data.checksum, '');
      assert.equal(data.executionCount, 0);
      assert.equal(data.lineNumber, 0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      let data = LineData.fromJSON({
        checksum: 'ed076287532e86365e841e92bfc50d8c',
        executionCount: 3,
        lineNumber: 127
      });

      assert.equal(data.checksum, 'ed076287532e86365e841e92bfc50d8c');
      assert.equal(data.executionCount, 3);
      assert.equal(data.lineNumber, 127);
    });
  });

  /**
   * @test {LineData#toJSON}
   */
  describe('#toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      let map = new LineData().toJSON();
      assert.equal(Object.keys(map).length, 3);
      assert.equal(map.checksum, '');
      assert.equal(map.executionCount, 0);
      assert.equal(map.lineNumber, 0);
    });

    it('should return a non-empty map for an initialized instance', () => {
      let map = new LineData(127, 3, 'ed076287532e86365e841e92bfc50d8c').toJSON();
      assert.equal(Object.keys(map).length, 3);
      assert.equal(map.checksum, 'ed076287532e86365e841e92bfc50d8c');
      assert.equal(map.executionCount, 3);
      assert.equal(map.lineNumber, 127);
    });
  });

  /**
   * @test {LineData#toString}
   */
  describe('#toString()', () => {
    it('should return a format like "DA:<lineNumber>,<executionCount>[,<checksum>]"', () => {
      assert.equal(String(new LineData()), 'DA:0,0');
      assert.equal(String(new LineData(127, 3, 'ed076287532e86365e841e92bfc50d8c')), 'DA:127,3,ed076287532e86365e841e92bfc50d8c');
    });
  });
});
