import {LineCoverage, LineData} from "@cedx/lcov";
import {equal, ok} from "node:assert/strict";
import {describe, it} from "node:test";

/**
 * Tests the features of the {@link LineCoverage} class.
 */
describe("LineCoverage", () => {
	describe("fromJson()", () => {
		it("should return an instance with default values for an empty map", () => {
			const coverage = LineCoverage.fromJson({});
			equal(coverage.data.length, 0);
			equal(coverage.found, 0);
			equal(coverage.hit, 0);
		});

		it("should return an initialized instance for a non-empty map", () => {
			const coverage = LineCoverage.fromJson({data: [{lineNumber: 127}], found: 23, hit: 11});
			equal(coverage.data.length, 1);
			equal(coverage.found, 23);
			equal(coverage.hit, 11);

			const [data] = coverage.data;
			ok(data instanceof LineData);
			equal(data.lineNumber, 127);
		});
	});

	describe("toString()", () => {
		it("should return a format like 'LF:<found>\\nLH:<hit>'", () => {
			equal(String(new LineCoverage), "LF:0\nLH:0");

			const data = new LineData({executionCount: 3, lineNumber: 127});
			equal(String(new LineCoverage({data: [data], found: 23, hit: 11})), `${data}\nLF:23\nLH:11`);
		});
	});
});
