'use strict';

import assert from 'assert';
import {BranchCoverage, BranchData} from '../src/index';

/**
 * @test {BranchCoverage}
 */
describe('BranchCoverage', () => {

  /**
   * @test {BranchCoverage#constructor}
   */
  describe('#constructor()', () => {
    it('should initialize the existing properties', () => {
      let data = new BranchData();
      let coverage = new BranchCoverage({data: [data], found: 23, hit: 11});

      assert.ok(Array.isArray(coverage.data));
      assert.equal(coverage.data.length, 1);
      assert.strictEqual(coverage.data[0], data);

      assert.equal(coverage.found, 23);
      assert.equal(coverage.hit, 11);
    });

    it('should not create new properties', () => {
      assert.ok(!('foo' in new BranchCoverage({foo: 'bar'})));
    });
  });

  /**
   * @test {BranchCoverage.fromJSON}
   */
  describe('.fromJSON()', () => {
    it('should return a null reference with a non-object value', () => {
      assert.strictEqual(BranchCoverage.fromJSON('foo'), null);
    });

    it('should return an instance with default values for an empty map', () => {
      let coverage = BranchCoverage.fromJSON({});
      assert.ok(Array.isArray(coverage.data));
      assert.equal(coverage.data.length, 0);
      assert.equal(coverage.found, 0);
      assert.equal(coverage.hit, 0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      let coverage = BranchCoverage.fromJSON({
        data: [{lineNumber: 23}],
        found: 23,
        hit: 11,
      });

      assert.ok(Array.isArray(coverage.data));
      assert.equal(coverage.data.length, 1);
      assert.ok(coverage.data[0] instanceof BranchData);

      assert.equal(coverage.found, 23);
      assert.equal(coverage.hit, 11);
    });
  });

  /**
   * @test {BranchCoverage#toJSON}
   */
  describe('.toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      let map = new BranchCoverage().toJSON();

      assert.equal(Object.keys(map).length, 3);
      assert.ok(Array.isArray(map.data));
      assert.equal(map.data.length, 0);

      assert.equal(map.found, 0);
      assert.equal(map.hit, 0);
    });

    it('should return a non-empty map for an initialized instance', () => {
      let map = new BranchCoverage({
        data: [new BranchData()],
        found: 23,
        hit: 11
      }).toJSON();

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
   * @test {BranchCoverage#toString}
   */
  describe('.toString()', () => {
    it('should return a format like "BRF:<found>\\n,BRH:<hit>"', () => {
      let coverage = new BranchCoverage();
      assert.equal(String(coverage), 'BRF:0\nBRH:0');

      let data = new BranchData({
        blockNumber: 3,
        branchNumber: 2,
        lineNumber: 127
      });

      coverage = new BranchCoverage({data: [data], found: 23, hit: 11});
      assert.equal(String(coverage), `${data}\nBRF:23\nBRH:11`);
    });
  });
});

/**
 * @test {BranchData}
 */
describe('BranchData', () => {

  /**
   * @test {BranchData#constructor}
   */
  describe('#constructor()', () => {
    it('should initialize the existing properties', () => {
      let data = new BranchData({blockNumber: 3, branchNumber: 2, lineNumber: 127, taken: 1});
      assert.equal(data.blockNumber, 3);
      assert.equal(data.branchNumber, 2);
      assert.equal(data.lineNumber, 127);
      assert.equal(data.taken, 1);
    });

    it('should not create new properties', () => {
      assert.ok(!('foo' in new BranchData({foo: 'bar'})));
    });
  });

  /**
   * @test {BranchData.fromJSON}
   */
  describe('.fromJSON()', () => {
    it('should return a null reference with a non-object value', () => {
      assert.strictEqual(BranchData.fromJSON('foo'), null);
    });

    it('should return an instance with default values for an empty map', () => {
      let data = BranchData.fromJSON({});
      assert.equal(data.blockNumber, 0);
      assert.equal(data.branchNumber, 0);
      assert.equal(data.lineNumber, 0);
      assert.equal(data.taken, 0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      let data = BranchData.fromJSON({
        blockNumber: 3,
        branchNumber: 2,
        lineNumber: 127,
        taken: 1
      });

      assert.equal(data.blockNumber, 3);
      assert.equal(data.branchNumber, 2);
      assert.equal(data.lineNumber, 127);
      assert.equal(data.taken, 1);
    });
  });

  /**
   * @test {BranchData#toJSON}
   */
  describe('.toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      let map = new BranchData().toJSON();
      assert.equal(Object.keys(map).length, 4);
      assert.equal(map.blockNumber, 0);
      assert.equal(map.branchNumber, 0);
      assert.equal(map.lineNumber, 0);
      assert.equal(map.taken, 0);
    });

    it('should return a non-empty map for an initialized instance', () => {
      let map = new BranchData({
        blockNumber: 3,
        branchNumber: 2,
        lineNumber: 127,
        taken: 1
      }).toJSON();

      assert.equal(Object.keys(map).length, 4);
      assert.equal(map.blockNumber, 3);
      assert.equal(map.branchNumber, 2);
      assert.equal(map.lineNumber, 127);
      assert.equal(map.taken, 1);
    });
  });

  /**
   * @test {BranchData#toString}
   */
  describe('.toString()', () => {
    it('should return a format like "BRDA:<lineNumber>,<blockNumber>,<branchNumber>,<taken>"', () => {
      let data = new BranchData();
      assert.equal(String(data), 'BRDA:0,0,0,-');

      data = new BranchData({blockNumber: 3, branchNumber: 2, lineNumber: 127, taken: 1});
      assert.equal(String(data), 'BRDA:127,3,2,1');
    });
  });
});
