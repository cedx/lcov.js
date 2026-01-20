import {FunctionData} from "@cedx/lcov";
import {equal} from "node:assert/strict";
import {describe, it} from "node:test";

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
