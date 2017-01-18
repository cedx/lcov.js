'use strict';

import assert from 'assert';
import {BranchData, FunctionData, LineData, Record, Report} from '../src/index';

/**
 * @test {Report}
 */
describe('Report', () => {

  /**
   * @test {Report#constructor}
   */

  /*
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
      assert.ok(!('foo' in new Report({foo: 'bar'})));
    });
  });
  */
});
