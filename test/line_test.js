import assert from "node:assert/strict";
import {describe, it} from "node:test";
import {LineCoverage, LineData} from "#lcov";

/**
 * Tests the features of the {@link LineCoverage} class.
 */
describe("LineCoverage", () => {
	describe("fromJson()", () => {
		it("should return an instance with default values for an empty map", () => {
			const coverage = LineCoverage.fromJson({});
			assert.equal(coverage.data.length, 0);
			assert.equal(coverage.found, 0);
			assert.equal(coverage.hit, 0);
		});

		it("should return an initialized instance for a non-empty map", () => {
			const coverage = LineCoverage.fromJson({data: [{lineNumber: 127}], found: 23, hit: 11});
			assert.equal(coverage.data.length, 1);
			assert.equal(coverage.found, 23);
			assert.equal(coverage.hit, 11);

			const [data] = coverage.data;
			assert.ok(data instanceof LineData);
			assert.equal(data.lineNumber, 127);
		});
	});

	describe("toString()", () => {
		it("should return a format like 'LF:<found>\\nLH:<hit>'", () => {
			assert.equal(String(new LineCoverage), "LF:0\nLH:0");

			const data = new LineData({executionCount: 3, lineNumber: 127});
			assert.equal(String(new LineCoverage({data: [data], found: 23, hit: 11})), `${data}\nLF:23\nLH:11`);
		});
	});
});

/**
 * Tests the features of the {@link LineData} class.
 */
describe("LineData", () => {
	describe("fromJson()", () => {
		it("should return an instance with default values for an empty map", () => {
			const data = LineData.fromJson({});
			assert.equal(data.checksum.length, 0);
			assert.equal(data.executionCount, 0);
			assert.equal(data.lineNumber, 0);
		});

		it("should return an initialized instance for a non-empty map", () => {
			const data = LineData.fromJson({checksum: "ed076287532e86365e841e92bfc50d8c", executionCount: 3, lineNumber: 127});
			assert.equal(data.checksum, "ed076287532e86365e841e92bfc50d8c");
			assert.equal(data.executionCount, 3);
			assert.equal(data.lineNumber, 127);
		});
	});

	describe("toString()", () => {
		it("should return a format like 'DA:<lineNumber>,<executionCount>[,<checksum>]'", () => {
			assert.equal(String(new LineData), "DA:0,0");

			const data = new LineData({checksum: "ed076287532e86365e841e92bfc50d8c", executionCount: 3, lineNumber: 127});
			assert.equal(String(data), "DA:127,3,ed076287532e86365e841e92bfc50d8c");
		});
	});
});
