'use strict';

import assert from 'assert';
import {FunctionCoverage, FunctionData} from '../src/index';

/**
 * @test {FunctionCoverage}
 */
describe('FunctionCoverage', () => {

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

  /**
   * @test {FunctionCoverage#toJSON}
   */
  describe('#toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      let map = new FunctionCoverage().toJSON();

      assert.equal(Object.keys(map).length, 3);
      assert.ok(Array.isArray(map.data));
      assert.equal(map.data.length, 0);

      assert.equal(map.found, 0);
      assert.equal(map.hit, 0);
    });

    it('should return a non-empty map for an initialized instance', () => {
      let map = new FunctionCoverage(23, 11, [new FunctionData()]).toJSON();

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
   * @test {FunctionCoverage#toString}
   */
  describe('#toString()', () => {
    it('should return a format like "FNF:<found>\\n,FNH:<hit>"', () => {
      assert.equal(String(new FunctionCoverage()), 'FNF:0\nFNH:0');

      let coverage = new FunctionCoverage(23, 11, [new FunctionData('main', 127, 3)]);
      assert.equal(String(coverage), 'FN:127,main\nFNDA:3,main\nFNF:23\nFNH:11');
    });
  });
});

/**
 * @test {FunctionData}
 */
describe('FunctionData', () => {

  /**
   * @test {FunctionData.fromJSON}
   */
  describe('.fromJSON()', () => {
    it('should return a null reference with a non-object value', () => {
      assert.strictEqual(FunctionData.fromJSON('foo'), null);
    });

    it('should return an instance with default values for an empty map', () => {
      let data = FunctionData.fromJSON({});
      assert.equal(data.executionCount, 0);
      assert.equal(data.functionName, '');
      assert.equal(data.lineNumber, 0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      let data = FunctionData.fromJSON({
        executionCount: 3,
        functionName: 'main',
        lineNumber: 127
      });

      assert.equal(data.executionCount, 3);
      assert.equal(data.functionName, 'main');
      assert.equal(data.lineNumber, 127);
    });
  });

  /**
   * @test {FunctionData#toJSON}
   */
  describe('#toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      let map = new FunctionData().toJSON();
      assert.equal(Object.keys(map).length, 3);
      assert.equal(map.executionCount, 0);
      assert.equal(map.functionName, '');
      assert.equal(map.lineNumber, 0);
    });

    it('should return a non-empty map for an initialized instance', () => {
      let map = new FunctionData('main', 127, 3).toJSON();
      assert.equal(Object.keys(map).length, 3);
      assert.equal(map.executionCount, 3);
      assert.equal(map.functionName, 'main');
      assert.equal(map.lineNumber, 127);
    });
  });

  /**
   * @test {FunctionData#toString}
   */
  describe('#toString()', () => {
    it('should return a format like "FN:<lineNumber>,<functionName>" when used as definition', () => {
      assert.equal(new FunctionData().toString(true), 'FN:0,');
      assert.equal(new FunctionData('main', 127, 3).toString(true), 'FN:127,main');
    });

    it('should return a format like "FNDA:<executionCount>,<functionName>" when used as data', () => {
      assert.equal(new FunctionData().toString(false), 'FNDA:0,');
      assert.equal(new FunctionData('main', 127, 3).toString(false), 'FNDA:3,main');
    });
  });
});
