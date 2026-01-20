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
