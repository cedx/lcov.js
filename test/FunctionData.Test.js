import {FunctionData} from "@cedx/lcov";
import {equal} from "node:assert/strict";
import {describe, it} from "node:test";

/**
 * Tests the features of the {@link FunctionData} class.
 */
describe("FunctionData", () => {
	describe("fromJson()", () => {
		it("should return an instance with default values for an empty map", () => {
			const data = FunctionData.fromJson({});
			equal(data.executionCount, 0);
			equal(data.functionName.length, 0);
			equal(data.lineNumber, 0);
		});

		it("should return an initialized instance for a non-empty map", () => {
			const data = FunctionData.fromJson({executionCount: 3, functionName: "main", lineNumber: 127});
			equal(data.executionCount, 3);
			equal(data.functionName, "main");
			equal(data.lineNumber, 127);
		});
	});

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
