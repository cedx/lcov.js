import {BranchCoverage, BranchData} from "@cedx/lcov";
import {equal} from "node:assert/strict";
import {describe, it} from "node:test";

/**
 * Tests the features of the {@link BranchCoverage} class.
 */
describe("BranchCoverage", () => {
	describe("toString()", () => {
		it("should return a format like 'BRF:<found>\\nBRH:<hit>'", () => {
			equal(String(new BranchCoverage), "BRF:0\nBRH:0");

			const data = new BranchData({blockNumber: 3, branchNumber: 2, lineNumber: 127, taken: 1});
			equal(String(new BranchCoverage({data: [data], found: 23, hit: 11})), `${data}\nBRF:23\nBRH:11`);
		});
	});
});

/**
 * Tests the features of the {@link BranchData} class.
 */
describe("BranchData", () => {
	describe("toString()", () => {
		it("should return a format like 'BRDA:<lineNumber>,<blockNumber>,<branchNumber>,<taken>'", () => {
			equal(String(new BranchData), "BRDA:0,0,0,-");
			equal(String(new BranchData({blockNumber: 3, branchNumber: 2, lineNumber: 127, taken: 1})), "BRDA:127,3,2,1");
		});
	});
});
