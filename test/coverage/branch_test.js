'use strict';

import assert from 'assert';
import {BranchCoverage, BranchData} from '../../src/index';

/**
 * @test {BranchCoverage}
 */
describe('BranchCoverage', () => {
  // TODO
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
      let data = new BranchData({branchNumber: 2, blockNumber: 3, lineNumber: 127, taken: 1});
      assert.equal(data.branchNumber, 2);
      assert.equal(data.blockNumber, 3);
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
      assert.equal(data.branchNumber, 0);
      assert.equal(data.blockNumber, 0);
      assert.equal(data.lineNumber, 0);
      assert.equal(data.taken, 0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      let data = BranchData.fromJSON({
        'branch': 2,
        'block': 3,
        'line': 127,
        'taken': 1
      });

      assert.equal(data.branchNumber, 2);
      assert.equal(data.blockNumber, 3);
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
      assert.equal(map.branch, 0);
      assert.equal(map.block, 0);
      assert.equal(map.line, 0);
      assert.equal(map.taken, 0);
    });

    it('should return a non-empty map for an initialized instance', () => {
      let map = new BranchData({
        branchNumber: 2,
        blockNumber: 3,
        lineNumber: 127,
        taken: 1
      }).toJSON();

      assert.equal(Object.keys(map).length, 4);
      assert.equal(map.branch, 2);
      assert.equal(map.block, 3);
      assert.equal(map.line, 127);
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

      data = new BranchData({branchNumber: 2, blockNumber: 3, lineNumber: 127, taken: 1});
      assert.equal(String(data), 'BRDA:127,3,2,1');
    });
  });
});
