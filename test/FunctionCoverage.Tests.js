import {FunctionCoverage, FunctionData} from "@cedx/lcov";
import {equal} from "node:assert/strict";
import {describe, it} from "node:test";

/**
 * Tests the features of the {@link FunctionCoverage} class.
 */
describe("FunctionCoverage", () => {
	describe("toString()", () => {
		it("should return a format like 'FNF:<found>\\nFNH:<hit>'", () => {
			equal(String(new FunctionCoverage), "FNF:0\nFNH:0");

			const coverage = new FunctionCoverage({data: [new FunctionData({executionCount: 3, functionName: "main", lineNumber: 127})], found: 23, hit: 11});
			equal(String(coverage), "FN:127,main\nFNDA:3,main\nFNF:23\nFNH:11");
		});
	});
});

/**
 * Tests the features of the {@link FunctionData} class.
 */
describe("FunctionData", () => {
	describe("toString()", () => {
		it("should return a format like 'FN:<lineNumber>,<functionName>' when used as definition", () => {
			equal(new FunctionData().toString({asDefinition: true}), "FN:0,");
			equal(new FunctionData({executionCount: 3, functionName: "main", lineNumber: 127}).toString({asDefinition: true}), "FN:127,main");
		});

		it("should return a format like 'FNDA:<executionCount>,<functionName>' when used as data", () => {
			equal(new FunctionData().toString({asDefinition: false}), "FNDA:0,");
			equal(new FunctionData({executionCount: 3, functionName: "main", lineNumber: 127}).toString({asDefinition: false}), "FNDA:3,main");
		});
	});
});
