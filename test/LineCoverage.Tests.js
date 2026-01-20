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
