import {LineCoverage, LineData} from "@cedx/lcov";
import {equal} from "node:assert/strict";
import {describe, it} from "node:test";

/**
 * Tests the features of the {@link LineCoverage} class.
 */
describe("LineCoverage", () => {
	describe("toString()", () => {
		it("should return a format like 'LF:<found>\\nLH:<hit>'", () => {
			equal(String(new LineCoverage), "LF:0\nLH:0");

			const data = new LineData({executionCount: 3, lineNumber: 127});
			equal(String(new LineCoverage({data: [data], found: 23, hit: 11})), `${data}\nLF:23\nLH:11`);
		});
	});
});

/**
 * Tests the features of the {@link LineData} class.
 */
describe("LineData", () => {
	describe("toString()", () => {
		it("should return a format like 'DA:<lineNumber>,<executionCount>[,<checksum>]'", () => {
			equal(String(new LineData), "DA:0,0");

			const data = new LineData({checksum: "ed076287532e86365e841e92bfc50d8c", executionCount: 3, lineNumber: 127});
			equal(String(data), "DA:127,3,ed076287532e86365e841e92bfc50d8c");
		});
	});
});
