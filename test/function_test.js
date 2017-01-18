'use strict';

import assert from 'assert';
import {FunctionCoverage, FunctionData} from '../src/index';

/**
 * @test {FunctionCoverage}
 */
describe('FunctionCoverage', () => {

  /**
   * @test {FunctionCoverage#constructor}
   */
  describe('#constructor()', () => {
    it('should initialize the existing properties', () => {
      let data = new FunctionData();
      let coverage = new FunctionCoverage({data: [data], found: 23, hit: 11});

      assert.ok(Array.isArray(coverage.data));
      assert.equal(coverage.data.length, 1);
      assert.strictEqual(coverage.data[0], data);

      assert.equal(coverage.found, 23);
      assert.equal(coverage.hit, 11);
    });

    it('should not create new properties', () => {
      assert.ok(!('foo' in new FunctionCoverage({foo: 'bar'})));
    });
  });

  /**
   * @test {FunctionCoverage.fromJSON}
   */
  describe('.fromJSON()', () => {
    it('should return a null reference with a non-object value', () => {
      assert.strictEqual(FunctionCoverage.fromJSON('foo'), null);
    });

    it('should return an instance with default values for an empty map', () => {
      let coverage = FunctionCoverage.fromJSON({});
      assert.ok(Array.isArray(coverage.data));
      assert.equal(coverage.data.length, 0);
      assert.equal(coverage.found, 0);
      assert.equal(coverage.hit, 0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      let coverage = FunctionCoverage.fromJSON({
        data: [{lineNumber: 23}],
        found: 23,
        hit: 11,
      });

      assert.ok(Array.isArray(coverage.data));
      assert.equal(coverage.data.length, 1);
      assert.ok(coverage.data[0] instanceof FunctionData);

      assert.equal(coverage.found, 23);
      assert.equal(coverage.hit, 11);
    });
  });
});

/**
 * @test {FunctionData}
 */
describe('FunctionData', () => {

  /**
   * @test {FunctionData#constructor}
   */
  describe('#constructor()', () => {
    it('should initialize the existing properties', () => {
      let data = new FunctionData({blockNumber: 3, branchNumber: 2, lineNumber: 127, taken: 1});
      assert.equal(data.blockNumber, 3);
      assert.equal(data.branchNumber, 2);
      assert.equal(data.lineNumber, 127);
      assert.equal(data.taken, 1);
    });

    it('should not create new properties', () => {
      assert.ok(!('foo' in new FunctionData({foo: 'bar'})));
    });
  });

  /**
   * @test {FunctionData.fromJSON}
   */
  describe('.fromJSON()', () => {
    it('should return a null reference with a non-object value', () => {
      assert.strictEqual(FunctionData.fromJSON('foo'), null);
    });

    it('should return an instance with default values for an empty map', () => {
      let data = FunctionData.fromJSON({});
      assert.equal(data.blockNumber, 0);
      assert.equal(data.branchNumber, 0);
      assert.equal(data.lineNumber, 0);
      assert.equal(data.taken, 0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      let data = FunctionData.fromJSON({
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
   * @test {FunctionData#toJSON}
   */
  describe('.toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      let map = new FunctionData().toJSON();
      assert.equal(Object.keys(map).length, 4);
      assert.equal(map.blockNumber, 0);
      assert.equal(map.branchNumber, 0);
      assert.equal(map.lineNumber, 0);
      assert.equal(map.taken, 0);
    });

    it('should return a non-empty map for an initialized instance', () => {
      let map = new FunctionData({
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
   * @test {FunctionData#toString}
   */
  describe('.toString()', () => {
    it('should return a format like "BRDA:<lineNumber>,<blockNumber>,<branchNumber>,<taken>"', () => {
      let data = new FunctionData();
      assert.equal(String(data), 'BRDA:0,0,0,-');

      data = new FunctionData({blockNumber: 3, branchNumber: 2, lineNumber: 127, taken: 1});
      assert.equal(String(data), 'BRDA:127,3,2,1');
    });
  });
});
