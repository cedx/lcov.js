import assert from "assert/strict";
import {BranchCoverage, BranchData} from "../lib/index.js";

/**
 * Tests the features of the {@link BranchCoverage} class.
 */
describe("BranchCoverage", () => {
	describe(".fromJson()", () => {
		it("should return an instance with default values for an empty map", () => {
			const coverage = BranchCoverage.fromJson({});
			assert.equal(coverage.data.length, 0);
			assert.equal(coverage.found, 0);
			assert.equal(coverage.hit, 0);
		});

		it("should return an initialized instance for a non-empty map", () => {
			const coverage = BranchCoverage.fromJson({data: [{lineNumber: 127}], found: 23, hit: 11});
			assert.equal(coverage.data.length, 1);

			const [data] = coverage.data;
			assert.ok(data instanceof BranchData);
			assert.equal(data.lineNumber, 127);
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

			const [data] = map.data;
			assert.ok(data);
			assert.equal(typeof data, "object");
			assert.equal(typeof data.lineNumber, "number");
			assert.equal(map.found, 23);
			assert.equal(map.hit, 11);
		});
	});

	describe(".toString()", () => {
		it("should return a format like 'BRF:<found>\\nBRH:<hit>'", () => {
			assert.equal(String(new BranchCoverage), "BRF:0\nBRH:0");

			const data = new BranchData({blockNumber: 3, branchNumber: 2, lineNumber: 127, taken: 1});
			assert.equal(String(new BranchCoverage({data: [data], found: 23, hit: 11})), `${data}\nBRF:23\nBRH:11`);
		});
	});
});

/**
 * Tests the features of the {@link BranchData} class.
 */
describe("BranchData", () => {
	describe(".fromJson()", () => {
		it("should return an instance with default values for an empty map", () => {
			const data = BranchData.fromJson({});
			assert.equal(data.blockNumber, 0);
			assert.equal(data.branchNumber, 0);
			assert.equal(data.lineNumber, 0);
			assert.equal(data.taken, 0);
		});

		it("should return an initialized instance for a non-empty map", () => {
			const data = BranchData.fromJson({blockNumber: 3, branchNumber: 2, lineNumber: 127, taken: 1});
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
			const map = new BranchData({blockNumber: 3, branchNumber: 2, lineNumber: 127, taken: 1}).toJSON();
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
			assert.equal(String(new BranchData({blockNumber: 3, branchNumber: 2, lineNumber: 127, taken: 1})), "BRDA:127,3,2,1");
		});
	});
});
