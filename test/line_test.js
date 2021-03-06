import {strict as assert} from "assert";
import {LineCoverage, LineData} from "../lib/index.js";

/** Tests the features of the `LineCoverage` class. */
describe("LineCoverage", function() {
	describe(".fromJson()", function() {
		it("should return an instance with default values for an empty map", function() {
			const coverage = LineCoverage.fromJson({});
			assert.equal(coverage.data.length, 0);
			assert.equal(coverage.found, 0);
			assert.equal(coverage.hit, 0);
		});

		it("should return an initialized instance for a non-empty map", function() {
			const coverage = LineCoverage.fromJson({
				data: [{lineNumber: 127}],
				found: 23,
				hit: 11
			});

			assert.equal(coverage.data.length, 1);
			assert(coverage.data[0] instanceof LineData);
			assert.equal(coverage.data[0].lineNumber, 127);

			assert.equal(coverage.found, 23);
			assert.equal(coverage.hit, 11);
		});
	});

	describe(".toJSON()", function() {
		it("should return a map with default values for a newly created instance", function() {
			const map = new LineCoverage().toJSON();
			assert.equal(Object.keys(map).length, 3);
			assert(Array.isArray(map.data));
			assert.equal(map.data.length, 0);
			assert.equal(map.found, 0);
			assert.equal(map.hit, 0);
		});

		it("should return a non-empty map for an initialized instance", function() {
			const map = new LineCoverage(23, 11, [new LineData(0)]).toJSON();
			assert.equal(Object.keys(map).length, 3);
			assert(Array.isArray(map.data));
			assert.equal(map.data.length, 1);

			assert.ok(map.data[0]);
			assert.equal(typeof map.data[0], "object");
			assert.equal(typeof map.data[0].lineNumber, "number");
			assert.equal(map.found, 23);
			assert.equal(map.hit, 11);
		});
	});

	describe(".toString()", function() {
		it(String.raw`should return a format like "LF:<found>\nLH:<hit>"`, function() {
			assert.equal(String(new LineCoverage), "LF:0\nLH:0");

			const data = new LineData(127, 3);
			assert.equal(String(new LineCoverage(23, 11, [data])), `${data}\nLF:23\nLH:11`);
		});
	});
});

/** Tests the features of the `LineData` class. */
describe("LineData", function() {
	describe(".fromJson()", function() {
		it("should return an instance with default values for an empty map", function() {
			const data = LineData.fromJson({});
			assert.equal(data.checksum.length, 0);
			assert.equal(data.executionCount, 0);
			assert.equal(data.lineNumber, 0);
		});

		it("should return an initialized instance for a non-empty map", function() {
			const data = LineData.fromJson({
				checksum: "ed076287532e86365e841e92bfc50d8c",
				executionCount: 3,
				lineNumber: 127
			});

			assert.equal(data.checksum, "ed076287532e86365e841e92bfc50d8c");
			assert.equal(data.executionCount, 3);
			assert.equal(data.lineNumber, 127);
		});
	});

	describe(".toJSON()", function() {
		it("should return a map with default values for a newly created instance", function() {
			const map = new LineData(0).toJSON();
			assert.equal(Object.keys(map).length, 3);
			assert.equal(map.checksum.length, 0);
			assert.equal(map.executionCount, 0);
			assert.equal(map.lineNumber, 0);
		});

		it("should return a non-empty map for an initialized instance", function() {
			const map = new LineData(127, 3, "ed076287532e86365e841e92bfc50d8c").toJSON();
			assert.equal(Object.keys(map).length, 3);
			assert.equal(map.checksum, "ed076287532e86365e841e92bfc50d8c");
			assert.equal(map.executionCount, 3);
			assert.equal(map.lineNumber, 127);
		});
	});

	describe(".toString()", function() {
		it("should return a format like 'DA:<lineNumber>,<executionCount>[,<checksum>]'", function() {
			assert.equal(String(new LineData(0)), "DA:0,0");
			assert.equal(String(new LineData(127, 3, "ed076287532e86365e841e92bfc50d8c")), "DA:127,3,ed076287532e86365e841e92bfc50d8c");
		});
	});
});
