const {expect} = require('chai');
const {BranchCoverage, FunctionCoverage, LineCoverage, Record} = require('../lib/index.js');

/**
 * @test {Record}
 */
describe('Record', () => {

  /**
   * @test {Record.fromJson}
   */
  describe('.fromJson()', () => {
    it('should return a null reference with a non-object value', () => {
      expect(Record.fromJson('foo')).to.be.null;
    });

    it('should return an instance with default values for an empty map', () => {
      let record = Record.fromJson({});
      expect(record).to.be.instanceof(Record);
      expect(record.branches).to.be.null;
      expect(record.functions).to.be.null;
      expect(record.lines).to.be.null;
      expect(record.sourceFile).to.be.empty;
    });

    it('should return an initialized instance for a non-empty map', () => {
      let record = Record.fromJson({
        branches: {},
        functions: {},
        lines: {},
        sourceFile: '/home/cedx/lcov.js'
      });

      expect(record).to.be.instanceof(Record);
      expect(record.branches).to.be.instanceof(BranchCoverage);
      expect(record.functions).to.be.instanceof(FunctionCoverage);
      expect(record.lines).to.be.instanceof(LineCoverage);
      expect(record.sourceFile).to.equal('/home/cedx/lcov.js');
    });
  });

  /**
   * @test {Record#toJSON}
   */
  describe('#toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      let map = new Record('').toJSON();
      expect(Object.keys(map)).to.have.lengthOf(4);
      expect(map.branches).to.be.null;
      expect(map.functions).to.be.null;
      expect(map.lines).to.be.null;
      expect(map.sourceFile).to.be.empty;
    });

    it('should return a non-empty map for an initialized instance', () => {
      let record = new Record('/home/cedx/lcov.js', {
        branches: new BranchCoverage,
        functions: new FunctionCoverage,
        lines: new LineCoverage
      });

      let map = record.toJSON();
      expect(Object.keys(map)).to.have.lengthOf(4);
      expect(map.branches).to.be.an('object');
      expect(map.functions).to.be.an('object');
      expect(map.lines).to.be.an('object');
      expect(map.sourceFile).to.equal('/home/cedx/lcov.js');
    });
  });

  /**
   * @test {Record#toString}
   */
  describe('#toString()', () => {
    it('should return a format like "SF:<sourceFile>\\n,end_of_record"', () => {
      expect(String(new Record(''))).to.equal('SF:\nend_of_record');

      let record = new Record('/home/cedx/lcov.js', {
        branches: new BranchCoverage,
        functions: new FunctionCoverage,
        lines: new LineCoverage
      });

      expect(String(record)).to.equal(`SF:/home/cedx/lcov.js\n${record.functions}\n${record.branches}\n${record.lines}\nend_of_record`);
    });
  });
});
