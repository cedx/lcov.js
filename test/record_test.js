'use strict';

import assert from 'assert';
import {BranchCoverage, FunctionCoverage, LineCoverage, Record} from '../src/index';

/**
 * @test {Record}
 */
describe('Record', () => {

  /**
   * @test {Report#constructor}
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
    });

    it('should return an initialized instance for a non-empty map', () => {
    });
  });

  /**
   * @test {Record#toJSON}
   */
  describe('#toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
    });

    it('should return a non-empty map for an initialized instance', () => {
    });
  });

  /**
   * @test {Report#toString}
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
