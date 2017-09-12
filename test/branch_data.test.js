'use strict';

const {expect} = require('chai');
const {BranchData} = require('../lib');

/**
 * @test {BranchData}
 */
describe('BranchData', () => {

  /**
   * @test {BranchData.fromJson}
   */
  describe('.fromJson()', () => {
    it('should return a null reference with a non-object value', () => {
      expect(BranchData.fromJson('foo')).to.be.null;
    });

    it('should return an instance with default values for an empty map', () => {
      let data = BranchData.fromJson({});
      expect(data).to.be.instanceof(BranchData);
      expect(data.blockNumber).to.equal(0);
      expect(data.branchNumber).to.equal(0);
      expect(data.lineNumber).to.equal(0);
      expect(data.taken).to.equal(0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      let data = BranchData.fromJson({
        blockNumber: 3,
        branchNumber: 2,
        lineNumber: 127,
        taken: 1
      });

      expect(data).to.be.instanceof(BranchData);
      expect(data.blockNumber).to.equal(3);
      expect(data.branchNumber).to.equal(2);
      expect(data.lineNumber).to.equal(127);
      expect(data.taken).to.equal(1);
    });
  });

  /**
   * @test {BranchData#toJSON}
   */
  describe('#toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      let map = new BranchData(0, 0, 0).toJSON();
      expect(Object.keys(map)).to.have.lengthOf(4);
      expect(map.blockNumber).to.equal(0);
      expect(map.branchNumber).to.equal(0);
      expect(map.lineNumber).to.equal(0);
      expect(map.taken).to.equal(0);
    });

    it('should return a non-empty map for an initialized instance', () => {
      let map = new BranchData(127, 3, 2, 1).toJSON();
      expect(Object.keys(map)).to.have.lengthOf(4);
      expect(map.blockNumber).to.equal(3);
      expect(map.branchNumber).to.equal(2);
      expect(map.lineNumber).to.equal(127);
      expect(map.taken).to.equal(1);
    });
  });

  /**
   * @test {BranchData#toString}
   */
  describe('#toString()', () => {
    it('should return a format like "BRDA:<lineNumber>,<blockNumber>,<branchNumber>,<taken>"', () => {
      expect(String(new BranchData(0, 0, 0))).to.equal('BRDA:0,0,0,-');
      expect(String(new BranchData(127, 3, 2, 1))).to.equal('BRDA:127,3,2,1');
    });
  });
});
