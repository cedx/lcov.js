import {BranchCoverage, BranchData} from "@cedx/lcov";
import {equal, ok} from "node:assert/strict";
import {describe, it} from "node:test";

/**
 * Tests the features of the {@link BranchCoverage} class.
 */
describe("BranchCoverage", () => {
	describe("fromJson()", () => {
		it("should return an instance with default values for an empty map", () => {
			const coverage = BranchCoverage.fromJson({});
			equal(coverage.data.length, 0);
			equal(coverage.found, 0);
			equal(coverage.hit, 0);
		});

		it("should return an initialized instance for a non-empty map", () => {
			const coverage = BranchCoverage.fromJson({data: [{lineNumber: 127}], found: 23, hit: 11});
			equal(coverage.data.length, 1);
			equal(coverage.found, 23);
			equal(coverage.hit, 11);

			const [data] = coverage.data;
			ok(data instanceof BranchData);
			equal(data.lineNumber, 127);
		});
	});

	describe("toString()", () => {
		it("should return a format like 'BRF:<found>\\nBRH:<hit>'", () => {
			equal(String(new BranchCoverage), "BRF:0\nBRH:0");

			const data = new BranchData({blockNumber: 3, branchNumber: 2, lineNumber: 127, taken: 1});
			equal(String(new BranchCoverage({data: [data], found: 23, hit: 11})), `${data}\nBRF:23\nBRH:11`);
		});
	});
});
