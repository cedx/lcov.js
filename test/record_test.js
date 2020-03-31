import {strict as assert} from 'assert';
import {BranchCoverage, FunctionCoverage, LineCoverage, Record} from '../lib/index.js';

/** Tests the features of the {@link Record} class. */
describe('Record', () => {
  describe('.fromJson()', () => {
    it('should return an instance with default values for an empty map', () => {
      const record = Record.fromJson({});
      assert.equal(record.branches, undefined);
      assert.equal(record.functions, undefined);
      assert.equal(record.lines, undefined);
      assert.equal(record.sourceFile.length, 0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      const record = Record.fromJson({
        branches: {},
        functions: {},
        lines: {},
        sourceFile: '/home/cedx/lcov.js'
      });

      assert(record.branches instanceof BranchCoverage);
      assert(record.functions instanceof FunctionCoverage);
      assert(record.lines instanceof LineCoverage);
      assert.equal(record.sourceFile, '/home/cedx/lcov.js');
    });
  });

  describe('.toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      const map = new Record('').toJSON();
      assert.equal(Object.keys(map).length, 4);
      assert.equal(map.branches, null);
      assert.equal(map.functions, null);
      assert.equal(map.lines, null);
      assert.equal(map.sourceFile.length, 0);
    });

    it('should return a non-empty map for an initialized instance', () => {
      const record = new Record('/home/cedx/lcov.js', {
        branches: new BranchCoverage,
        functions: new FunctionCoverage,
        lines: new LineCoverage
      });

      const map = record.toJSON();
      assert.equal(Object.keys(map).length, 4);
      assert.ok(map.branches);
      assert.equal(typeof map.branches, 'object');
      assert.ok(map.functions);
      assert.equal(typeof map.functions, 'object');
      assert.ok(map.lines);
      assert.equal(typeof map.lines, 'object');
      assert.equal(map.sourceFile, '/home/cedx/lcov.js');
    });
  });

  describe('.toString()', () => {
    it(String.raw`should return a format like "SF:<sourceFile>\nend_of_record"`, () => {
      assert.equal(String(new Record('')), 'SF:\nend_of_record');

      const record = new Record('/home/cedx/lcov.js', {
        branches: new BranchCoverage,
        functions: new FunctionCoverage,
        lines: new LineCoverage
      });

      assert.equal(String(record), `SF:/home/cedx/lcov.js\n${record.functions}\n${record.branches}\n${record.lines}\nend_of_record`);
    });
  });
});
