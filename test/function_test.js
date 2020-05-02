import {strict as assert} from 'assert';
import {FunctionCoverage, FunctionData} from '../lib/index.js';

/** Tests the features of the `FunctionCoverage` class. */
describe('FunctionCoverage', () => {
  describe('.fromJson()', () => {
    it('should return an instance with default values for an empty map', () => {
      const coverage = FunctionCoverage.fromJson({});
      assert.equal(coverage.data.length, 0);
      assert.equal(coverage.found, 0);
      assert.equal(coverage.hit, 0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      const coverage = FunctionCoverage.fromJson({
        data: [{lineNumber: 127}],
        found: 23,
        hit: 11
      });

      assert.equal(coverage.data.length, 1);
      assert(coverage.data[0] instanceof FunctionData);
      assert.equal(coverage.data[0].lineNumber, 127);

      assert.equal(coverage.found, 23);
      assert.equal(coverage.hit, 11);
    });
  });

  describe('.toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      const map = new FunctionCoverage().toJSON();
      assert.equal(Object.keys(map).length, 3);

      assert(Array.isArray(map.data));
      assert.equal(map.data.length, 0);
      assert.equal(map.found, 0);
      assert.equal(map.hit, 0);
    });

    it('should return a non-empty map for an initialized instance', () => {
      const map = new FunctionCoverage(23, 11, [new FunctionData('', 0)]).toJSON();
      assert.equal(Object.keys(map).length, 3);
      assert(Array.isArray(map.data));
      assert.equal(map.data.length, 1);

      assert.ok(map.data[0]);
      assert.equal(typeof map.data[0], 'object');
      assert.equal(typeof map.data[0].lineNumber, 'number');
      assert.equal(map.found, 23);
      assert.equal(map.hit, 11);
    });
  });

  describe('.toString()', () => {
    it(String.raw`should return a format like "FNF:<found>\nFNH:<hit>"`, () => {
      assert.equal(String(new FunctionCoverage), 'FNF:0\nFNH:0');

      const coverage = new FunctionCoverage(23, 11, [new FunctionData('main', 127, 3)]);
      assert.equal(String(coverage), 'FN:127,main\nFNDA:3,main\nFNF:23\nFNH:11');
    });
  });
});

/** Tests the features of the `FunctionData` class. */
describe('FunctionData', () => {
  describe('.fromJson()', () => {
    it('should return an instance with default values for an empty map', () => {
      const data = FunctionData.fromJson({});
      assert.equal(data.executionCount, 0);
      assert.equal(data.functionName.length, 0);
      assert.equal(data.lineNumber, 0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      const data = FunctionData.fromJson({
        executionCount: 3,
        functionName: 'main',
        lineNumber: 127
      });

      assert.equal(data.executionCount, 3);
      assert.equal(data.functionName, 'main');
      assert.equal(data.lineNumber, 127);
    });
  });

  describe('.toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      const map = new FunctionData('', 0).toJSON();
      assert.equal(Object.keys(map).length, 3);
      assert.equal(map.executionCount, 0);
      assert.equal(map.functionName.length, 0);
      assert.equal(map.lineNumber, 0);
    });

    it('should return a non-empty map for an initialized instance', () => {
      const map = new FunctionData('main', 127, 3).toJSON();
      assert.equal(Object.keys(map).length, 3);
      assert.equal(map.executionCount, 3);
      assert.equal(map.functionName, 'main');
      assert.equal(map.lineNumber, 127);
    });
  });

  describe('.toString()', () => {
    it('should return a format like "FN:<lineNumber>,<functionName>" when used as definition', () => {
      assert.equal(new FunctionData('', 0).toString(true), 'FN:0,');
      assert.equal(new FunctionData('main', 127, 3).toString(true), 'FN:127,main');
    });

    it('should return a format like "FNDA:<executionCount>,<functionName>" when used as data', () => {
      assert.equal(new FunctionData('', 0).toString(false), 'FNDA:0,');
      assert.equal(new FunctionData('main', 127, 3).toString(false), 'FNDA:3,main');
    });
  });
});
