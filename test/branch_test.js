import assert from "assert/strict";
import {BranchCoverage, BranchData} from "../lib/index.js";

/**
 * Tests the features of the {@link BranchCoverage} class.
 */
describe("BranchCoverage", () => {
	describe("constructor", () => {
		it("should return an instance with default values for an empty map", () => {
			const coverage = new BranchCoverage;
			assert.equal(coverage.data.length, 0);
			assert.equal(coverage.found, 0);
			assert.equal(coverage.hit, 0);
		});

		it("should return an initialized instance for a non-empty map", () => {
			const coverage = new BranchCoverage({
				data: [new BranchData({lineNumber: 127})],
				found: 23,
				hit: 11
			});

			assert.equal(coverage.data.length, 1);
			assert.ok(coverage.data[0] instanceof BranchData);
			assert.equal(coverage.data[0].lineNumber, 127);

			assert.equal(coverage.found, 23);
			assert.equal(coverage.hit, 11);
		});
	});

	describe(".toJSON()", () => {
		it("should return a map with default values for a newly created instance", () => {
			const map = new BranchCoverage().toJSON();
			assert.equal(Object.keys(map).length, 3);
			assert.ok(Array.isArray(map.data));
			assert.equal(map.data.length, 0);
			assert.equal(map.found, 0);
			assert.equal(map.hit, 0);
		});

		it("should return a non-empty map for an initialized instance", () => {
			const map = new BranchCoverage({found: 23, hit: 11, data: [new BranchData]}).toJSON();
			assert.equal(Object.keys(map).length, 3);
			assert.ok(Array.isArray(map.data));
			assert.equal(map.data.length, 1);

			assert.ok(map.data[0]);
			assert.equal(typeof map.data[0], "object");
			assert.equal(typeof map.data[0].lineNumber, "number");
			assert.equal(map.found, 23);
			assert.equal(map.hit, 11);
		});
	});

	describe(".toString()", () => {
		it(String.raw`should return a format like "BRF:<found>\nBRH:<hit>"`, () => {
			assert.equal(String(new BranchCoverage), "BRF:0\nBRH:0");

			const data = new BranchData(127, 3, 2, 1);
			assert.equal(String(new BranchCoverage(23, 11, [data])), `${data}\nBRF:23\nBRH:11`);
		});
	});
});

/**
 * Tests the features of the {@link BranchData} class.
 */
describe("BranchData", () => {
	describe("constructor", () => {
		it("should return an instance with default values for an empty map", () => {
			const data = new BranchData;
			assert.equal(data.blockNumber, 0);
			assert.equal(data.branchNumber, 0);
			assert.equal(data.lineNumber, 0);
			assert.equal(data.taken, 0);
		});

		it("should return an initialized instance for a non-empty map", () => {
			const data = new BranchData({
				blockNumber: 3,
				branchNumber: 2,
				lineNumber: 127,
				taken: 1
			});

			assert.equal(data.blockNumber, 3);
			assert.equal(data.branchNumber, 2);
			assert.equal(data.lineNumber, 127);
			assert.equal(data.taken, 1);
		});
	});

	describe(".toJSON()", () => {
		it("should return a map with default values for a newly created instance", () => {
			const map = new BranchData().toJSON();
			assert.equal(Object.keys(map).length, 4);
			assert.equal(map.blockNumber, 0);
			assert.equal(map.branchNumber, 0);
			assert.equal(map.lineNumber, 0);
			assert.equal(map.taken, 0);
		});

		it("should return a non-empty map for an initialized instance", () => {
			const map = new BranchData(127, 3, 2, 1).toJSON();
			assert.equal(Object.keys(map).length, 4);
			assert.equal(map.blockNumber, 3);
			assert.equal(map.branchNumber, 2);
			assert.equal(map.lineNumber, 127);
			assert.equal(map.taken, 1);
		});
	});

	describe(".toString()", () => {
		it("should return a format like 'BRDA:<lineNumber>,<blockNumber>,<branchNumber>,<taken>'", () => {
			assert.equal(String(new BranchData), "BRDA:0,0,0,-");
			assert.equal(String(new BranchData(127, 3, 2, 1)), "BRDA:127,3,2,1");
		});
	});
});
