'use strict';

import assert from 'assert';
import {BranchCoverage, FunctionCoverage, LineCoverage, Record} from '../src/index';

/**
 * @test {Record}
 */
describe('Record', () => {

  /**
   * @test {Record.fromJSON}
   */
  describe('.fromJSON()', () => {
    it('should return a null reference with a non-object value', () => {
      assert.strictEqual(Record.fromJSON('foo'), null);
    });

    it('should return an instance with default values for an empty map', () => {
      let record = Record.fromJSON({});
      assert.ok(record instanceof Record);
      assert.strictEqual(record.branches, null);
      assert.strictEqual(record.functions, null);
      assert.strictEqual(record.lines, null);
      assert.equal(record.sourceFile, '');
    });

    it('should return an initialized instance for a non-empty map', () => {
      let record = Record.fromJSON({
        branches: {},
        functions: {},
        lines: {},
        sourceFile: '/home/cedx/lcov.js'
      });

      assert.ok(record instanceof Record);
      assert.ok(record.branches instanceof BranchCoverage);
      assert.ok(record.functions instanceof FunctionCoverage);
      assert.ok(record.lines instanceof LineCoverage);
      assert.equal(record.sourceFile, '/home/cedx/lcov.js');
    });
  });

  /**
   * @test {Record#toJSON}
   */
  describe('#toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      let map = new Record().toJSON();
      assert.equal(Object.keys(map).length, 4);
      assert.strictEqual(map.branches, null);
      assert.strictEqual(map.functions, null);
      assert.strictEqual(map.lines, null);
      assert.equal(map.sourceFile, '');
    });

    it('should return a non-empty map for an initialized instance', () => {
      let record = new Record('/home/cedx/lcov.js');
      record.branches = new BranchCoverage();
      record.functions = new FunctionCoverage();
      record.lines = new LineCoverage();

      let map = record.toJSON();
      assert.equal(Object.keys(map).length, 4);
      assert.ok(map.branches && typeof map.branches == 'object');
      assert.ok(map.functions && typeof map.functions == 'object');
      assert.ok(map.lines && typeof map.lines == 'object');
      assert.equal(map.sourceFile, '/home/cedx/lcov.js');
    });
  });

  /**
   * @test {Record#toString}
   */
  describe('#toString()', () => {
    it('should return a format like "SF:<sourceFile>\\n,end_of_record"', () => {
      assert.equal(String(new Record()), 'SF:\nend_of_record');

      let record = new Record('/home/cedx/lcov.js');
      record.branches = new BranchCoverage();
      record.functions = new FunctionCoverage();
      record.lines = new LineCoverage();

      assert.equal(String(record), `SF:/home/cedx/lcov.js\n${record.functions}\n${record.branches}\n${record.lines}\nend_of_record`);
    });
  });
});
