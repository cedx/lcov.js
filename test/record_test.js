'use strict';

import assert from 'assert';
import {BranchCoverage, FunctionCoverage, LineCoverage, Record} from '../src/index';

/**
 * @test {Record}
 */
describe('Record', () => {

  /**
   * @test {Record#constructor}
   */
  describe('#constructor()', () => {
    it('should initialize the existing properties', () => {
      let record = new Record();
      assert.strictEqual(record.branches, null);
      assert.strictEqual(record.functions, null);
      assert.strictEqual(record.lines, null);
      assert.equal(record.sourceFile, '');

      let branches = new BranchCoverage();
      let functions = new FunctionCoverage();
      let lines = new LineCoverage();
      record = new Record({branches, functions, lines, sourceFile: '/home/cedx/lcov.js'});

      assert.strictEqual(record.branches, branches);
      assert.strictEqual(record.functions, functions);
      assert.strictEqual(record.lines, lines);
      assert.equal(record.sourceFile, '/home/cedx/lcov.js');
    });

    it('should not create new properties', () => {
      assert.ok(!('foo' in new Record({foo: 'bar'})));
    });
  });

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
      let map = new Record({
        branches: new BranchCoverage(),
        functions: new FunctionCoverage(),
        lines: new LineCoverage(),
        sourceFile: '/home/cedx/lcov.js'
      }).toJSON();

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
      let record = new Record();
      assert.equal(String(record), 'SF:\nend_of_record');

      let branches = new BranchCoverage();
      let functions = new FunctionCoverage();
      let lines = new LineCoverage();
      record = new Record({branches, functions, lines, sourceFile: '/home/cedx/lcov.js'});
      assert.equal(String(record), `SF:/home/cedx/lcov.js\n${functions}\n${branches}\n${lines}\nend_of_record`);
    });
  });
});
