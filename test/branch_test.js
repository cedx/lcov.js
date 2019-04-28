import {expect} from 'chai';
import {BranchCoverage, BranchData} from '../lib/index.js';

/** @test {BranchCoverage} */
describe('BranchCoverage', () => {

  /** @test {BranchCoverage.fromJson} */
  describe('.fromJson()', () => {
    it('should return an instance with default values for an empty map', () => {
      const coverage = BranchCoverage.fromJson({});
      expect(coverage).to.be.an.instanceof(BranchCoverage);
      expect(coverage.data).to.be.an('array').and.be.empty;
      expect(coverage.found).to.equal(0);
      expect(coverage.hit).to.equal(0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      const coverage = BranchCoverage.fromJson({
        data: [{lineNumber: 127}],
        found: 23,
        hit: 11
      });

      expect(coverage).to.be.an.instanceof(BranchCoverage);
      expect(coverage.data).to.be.an('array').and.have.lengthOf(1);
      expect(coverage.data[0]).to.be.an.instanceof(BranchData);
      expect(coverage.data[0].lineNumber).to.equal(127);

      expect(coverage.found).to.equal(23);
      expect(coverage.hit).to.equal(11);
    });
  });

  /** @test {BranchCoverage#toJSON} */
  describe('#toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      const map = (new BranchCoverage).toJSON();
      expect(Object.keys(map)).to.have.lengthOf(3);

      expect(map.data).to.be.an('array').and.be.empty;
      expect(map.found).to.equal(0);
      expect(map.hit).to.equal(0);
    });

    it('should return a non-empty map for an initialized instance', () => {
      const map = new BranchCoverage(23, 11, [new BranchData(0, 0, 0)]).toJSON();
      expect(Object.keys(map)).to.have.lengthOf(3);

      expect(map.data).to.be.an('array').and.have.lengthOf(1);
      expect(map.data[0]).to.be.an('object').and.have.property('lineNumber').that.is.a('number');
      expect(map.found).to.equal(23);
      expect(map.hit).to.equal(11);
    });
  });

  /** @test {BranchCoverage#toString} */
  describe('#toString()', () => {
    it('should return a format like "BRF:<found>\\\\n,BRH:<hit>"', () => {
      expect(String(new BranchCoverage)).to.equal('BRF:0\nBRH:0');

      const data = new BranchData(127, 3, 2, 1);
      expect(String(new BranchCoverage(23, 11, [data]))).to.equal(`${data}\nBRF:23\nBRH:11`);
    });
  });
});

/** @test {BranchData} */
describe('BranchData', () => {

  /** @test {BranchData.fromJson} */
  describe('.fromJson()', () => {
    it('should return an instance with default values for an empty map', () => {
      const data = BranchData.fromJson({});
      expect(data).to.be.an.instanceof(BranchData);
      expect(data.blockNumber).to.equal(0);
      expect(data.branchNumber).to.equal(0);
      expect(data.lineNumber).to.equal(0);
      expect(data.taken).to.equal(0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      const data = BranchData.fromJson({
        blockNumber: 3,
        branchNumber: 2,
        lineNumber: 127,
        taken: 1
      });

      expect(data).to.be.an.instanceof(BranchData);
      expect(data.blockNumber).to.equal(3);
      expect(data.branchNumber).to.equal(2);
      expect(data.lineNumber).to.equal(127);
      expect(data.taken).to.equal(1);
    });
  });

  /** @test {BranchData#toJSON} */
  describe('#toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      const map = new BranchData(0, 0, 0).toJSON();
      expect(Object.keys(map)).to.have.lengthOf(4);
      expect(map.blockNumber).to.equal(0);
      expect(map.branchNumber).to.equal(0);
      expect(map.lineNumber).to.equal(0);
      expect(map.taken).to.equal(0);
    });

    it('should return a non-empty map for an initialized instance', () => {
      const map = new BranchData(127, 3, 2, 1).toJSON();
      expect(Object.keys(map)).to.have.lengthOf(4);
      expect(map.blockNumber).to.equal(3);
      expect(map.branchNumber).to.equal(2);
      expect(map.lineNumber).to.equal(127);
      expect(map.taken).to.equal(1);
    });
  });

  /** @test {BranchData#toString} */
  describe('#toString()', () => {
    it('should return a format like "BRDA:<lineNumber>,<blockNumber>,<branchNumber>,<taken>"', () => {
      expect(String(new BranchData(0, 0, 0))).to.equal('BRDA:0,0,0,-');
      expect(String(new BranchData(127, 3, 2, 1))).to.equal('BRDA:127,3,2,1');
    });
  });
});
