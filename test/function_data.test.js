'use strict';

const {expect} = require('chai');
const {FunctionData} = require('../lib');

/**
 * @test {FunctionData}
 */
describe('FunctionData', () => {

  /**
   * @test {FunctionData.fromJson}
   */
  describe('.fromJson()', () => {
    it('should return a null reference with a non-object value', () => {
      expect(FunctionData.fromJson('foo')).to.be.null;
    });

    it('should return an instance with default values for an empty map', () => {
      let data = FunctionData.fromJson({});
      expect(data).to.be.instanceof(FunctionData);
      expect(data.executionCount).to.equal(0);
      expect(data.functionName).to.be.empty;
      expect(data.lineNumber).to.equal(0);
    });

    it('should return an initialized instance for a non-empty map', () => {
      let data = FunctionData.fromJson({
        executionCount: 3,
        functionName: 'main',
        lineNumber: 127
      });

      expect(data).to.be.instanceof(FunctionData);
      expect(data.executionCount).to.equal(3);
      expect(data.functionName).to.equal('main');
      expect(data.lineNumber).to.equal(127);
    });
  });

  /**
   * @test {FunctionData#toJSON}
   */
  describe('#toJSON()', () => {
    it('should return a map with default values for a newly created instance', () => {
      let map = (new FunctionData).toJSON();
      expect(Object.keys(map)).to.have.lengthOf(3);
      expect(map.executionCount).to.equal(0);
      expect(map.functionName).to.be.empty;
      expect(map.lineNumber).to.equal(0);
    });

    it('should return a non-empty map for an initialized instance', () => {
      let map = new FunctionData('main', 127, 3).toJSON();
      expect(Object.keys(map)).to.have.lengthOf(3);
      expect(map.executionCount).to.equal(3);
      expect(map.functionName).to.equal('main');
      expect(map.lineNumber).to.equal(127);
    });
  });

  /**
   * @test {FunctionData#toString}
   */
  describe('#toString()', () => {
    it('should return a format like "FN:<lineNumber>,<functionName>" when used as definition', () => {
      expect((new FunctionData).toString(true)).to.equal('FN:0,');
      expect(new FunctionData('main', 127, 3).toString(true)).to.equal('FN:127,main');
    });

    it('should return a format like "FNDA:<executionCount>,<functionName>" when used as data', () => {
      expect((new FunctionData).toString(false)).to.equal('FNDA:0,');
      expect(new FunctionData('main', 127, 3).toString(false)).to.equal('FNDA:3,main');
    });
  });
});
