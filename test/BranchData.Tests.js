import {BranchData} from "@cedx/lcov";
import {equal} from "node:assert/strict";
import {describe, it} from "node:test";

/**
 * Tests the features of the {@link BranchData} class.
 */
describe("BranchData", () => {
	describe("fromJson()", () => {
		it("should return an instance with default values for an empty map", () => {
			const data = BranchData.fromJson({});
			equal(data.blockNumber, 0);
			equal(data.branchNumber, 0);
			equal(data.lineNumber, 0);
			equal(data.taken, 0);
		});

		it("should return an initialized instance for a non-empty map", () => {
			const data = BranchData.fromJson({blockNumber: 3, branchNumber: 2, lineNumber: 127, taken: 1});
			equal(data.blockNumber, 3);
			equal(data.branchNumber, 2);
			equal(data.lineNumber, 127);
			equal(data.taken, 1);
		});
	});

	describe("toString()", () => {
		it("should return a format like 'BRDA:<lineNumber>,<blockNumber>,<branchNumber>,<taken>'", () => {
			equal(String(new BranchData), "BRDA:0,0,0,-");
			equal(String(new BranchData({blockNumber: 3, branchNumber: 2, lineNumber: 127, taken: 1})), "BRDA:127,3,2,1");
		});
	});
});
