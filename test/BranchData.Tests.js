import {BranchData} from "@cedx/lcov";
import {equal} from "node:assert/strict";
import {describe, it} from "node:test";

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
