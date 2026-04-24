import {FunctionData} from "@cedx/lcov";
import {equal} from "node:assert/strict";
import {describe, it} from "node:test";

/**
 * Tests the features of the {@link FunctionData} class.
 */
describe("FunctionData", () => {
	describe("toString()", () => {
		it("should return a format like 'FN:<lineNumber>,<functionName>\\nFNDA:<executionCount>,<functionName>'", () => {
			equal(new FunctionData().toString(), "FN:0,\nFNDA:0,");
			equal(new FunctionData({executionCount: 3, functionName: "main", lineNumber: 127}).toString(), "FN:127,main\nFNDA:3,main");
		});
	});
});
