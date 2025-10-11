import {FunctionCoverage, FunctionData} from "@cedx/lcov";
import {equal, ok} from "node:assert/strict";
import {describe, it} from "node:test";

/**
 * Tests the features of the {@link FunctionCoverage} class.
 */
describe("FunctionCoverage", () => {
	describe("fromJson()", () => {
		it("should return an instance with default values for an empty map", () => {
			const coverage = FunctionCoverage.fromJson({});
			equal(coverage.data.length, 0);
			equal(coverage.found, 0);
			equal(coverage.hit, 0);
		});

		it("should return an initialized instance for a non-empty map", () => {
			const coverage = FunctionCoverage.fromJson({data: [{lineNumber: 127}], found: 23, hit: 11});
			equal(coverage.data.length, 1);
			equal(coverage.found, 23);
			equal(coverage.hit, 11);

			const [data] = coverage.data;
			ok(data instanceof FunctionData);
			equal(data.lineNumber, 127);
		});
	});

	describe("toString()", () => {
		it("should return a format like 'FNF:<found>\\nFNH:<hit>'", () => {
			equal(String(new FunctionCoverage), "FNF:0\nFNH:0");

			const coverage = new FunctionCoverage({data: [new FunctionData({executionCount: 3, functionName: "main", lineNumber: 127})], found: 23, hit: 11});
			equal(String(coverage), "FN:127,main\nFNDA:3,main\nFNF:23\nFNH:11");
		});
	});
});
