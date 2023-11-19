import assert from "node:assert/strict";
import {describe, it} from "node:test";
import {FunctionCoverage, FunctionData} from "#lcov";

/**
 * Tests the features of the {@link FunctionCoverage} class.
 */
describe("FunctionCoverage", () => {
	describe("fromJson()", () => {
		it("should return an instance with default values for an empty map", () => {
			const coverage = FunctionCoverage.fromJson({});
			assert.equal(coverage.data.length, 0);
			assert.equal(coverage.found, 0);
			assert.equal(coverage.hit, 0);
		});

		it("should return an initialized instance for a non-empty map", () => {
			const coverage = FunctionCoverage.fromJson({data: [{lineNumber: 127}], found: 23, hit: 11});
			assert.equal(coverage.data.length, 1);
			assert.equal(coverage.found, 23);
			assert.equal(coverage.hit, 11);

			const [data] = coverage.data;
			assert(data instanceof FunctionData);
			assert.equal(data.lineNumber, 127);
		});
	});

	describe("toString()", () => {
		it("should return a format like 'FNF:<found>\\nFNH:<hit>'", () => {
			assert.equal(String(new FunctionCoverage), "FNF:0\nFNH:0");

			const coverage = new FunctionCoverage({data: [new FunctionData({executionCount: 3, functionName: "main", lineNumber: 127})], found: 23, hit: 11});
			assert.equal(String(coverage), "FN:127,main\nFNDA:3,main\nFNF:23\nFNH:11");
		});
	});
});

/**
 * Tests the features of the {@link FunctionData} class.
 */
describe("FunctionData", () => {
	describe("fromJson()", () => {
		it("should return an instance with default values for an empty map", () => {
			const data = FunctionData.fromJson({});
			assert.equal(data.executionCount, 0);
			assert.equal(data.functionName.length, 0);
			assert.equal(data.lineNumber, 0);
		});

		it("should return an initialized instance for a non-empty map", () => {
			const data = FunctionData.fromJson({executionCount: 3, functionName: "main", lineNumber: 127});
			assert.equal(data.executionCount, 3);
			assert.equal(data.functionName, "main");
			assert.equal(data.lineNumber, 127);
		});
	});

	describe("toString()", () => {
		it("should return a format like 'FN:<lineNumber>,<functionName>' when used as definition", () => {
			assert.equal(new FunctionData().toString(true), "FN:0,");
			assert.equal(new FunctionData({executionCount: 3, functionName: "main", lineNumber: 127}).toString(true), "FN:127,main");
		});

		it("should return a format like 'FNDA:<executionCount>,<functionName>' when used as data", () => {
			assert.equal(new FunctionData().toString(false), "FNDA:0,");
			assert.equal(new FunctionData({executionCount: 3, functionName: "main", lineNumber: 127}).toString(false), "FNDA:3,main");
		});
	});
});
