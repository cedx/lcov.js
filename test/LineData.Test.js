import {LineData} from "@cedx/lcov";
import {equal} from "node:assert/strict";
import {describe, it} from "node:test";

/**
 * Tests the features of the {@link LineData} class.
 */
describe("LineData", () => {
	describe("fromJson()", () => {
		it("should return an instance with default values for an empty map", () => {
			const data = LineData.fromJson({});
			equal(data.checksum.length, 0);
			equal(data.executionCount, 0);
			equal(data.lineNumber, 0);
		});

		it("should return an initialized instance for a non-empty map", () => {
			const data = LineData.fromJson({checksum: "ed076287532e86365e841e92bfc50d8c", executionCount: 3, lineNumber: 127});
			equal(data.checksum, "ed076287532e86365e841e92bfc50d8c");
			equal(data.executionCount, 3);
			equal(data.lineNumber, 127);
		});
	});

	describe("toString()", () => {
		it("should return a format like 'DA:<lineNumber>,<executionCount>[,<checksum>]'", () => {
			equal(String(new LineData), "DA:0,0");

			const data = new LineData({checksum: "ed076287532e86365e841e92bfc50d8c", executionCount: 3, lineNumber: 127});
			equal(String(data), "DA:127,3,ed076287532e86365e841e92bfc50d8c");
		});
	});
});
