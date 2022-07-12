import assert from "node:assert/strict";
import test from "node:test";
import {BranchCoverage, BranchData} from "../src/index.js";

test("BranchCoverage.fromJson()", async ctx => {
	await ctx.test("should return an instance with default values for an empty map", () => {
		const coverage = BranchCoverage.fromJson({});
		assert.equal(coverage.data.length, 0);
		assert.equal(coverage.found, 0);
		assert.equal(coverage.hit, 0);
	});

	await ctx.test("should return an initialized instance for a non-empty map", () => {
		const coverage = BranchCoverage.fromJson({data: [{lineNumber: 127}], found: 23, hit: 11});
		assert.equal(coverage.data.length, 1);
		assert.equal(coverage.found, 23);
		assert.equal(coverage.hit, 11);

		const [data] = coverage.data;
		assert.ok(data instanceof BranchData);
		assert.equal(data.lineNumber, 127);
	});
});

test("BranchCoverage.toString()", async ctx => {
	await ctx.test("should return a format like 'BRF:<found>\\nBRH:<hit>'", () => {
		assert.equal(String(new BranchCoverage), "BRF:0\nBRH:0");

		const data = new BranchData({blockNumber: 3, branchNumber: 2, lineNumber: 127, taken: 1});
		assert.equal(String(new BranchCoverage({data: [data], found: 23, hit: 11})), `${data}\nBRF:23\nBRH:11`);
	});
});

test("BranchData.fromJson()", async ctx => {
	await ctx.test("should return an instance with default values for an empty map", () => {
		const data = BranchData.fromJson({});
		assert.equal(data.blockNumber, 0);
		assert.equal(data.branchNumber, 0);
		assert.equal(data.lineNumber, 0);
		assert.equal(data.taken, 0);
	});

	await ctx.test("should return an initialized instance for a non-empty map", () => {
		const data = BranchData.fromJson({blockNumber: 3, branchNumber: 2, lineNumber: 127, taken: 1});
		assert.equal(data.blockNumber, 3);
		assert.equal(data.branchNumber, 2);
		assert.equal(data.lineNumber, 127);
		assert.equal(data.taken, 1);
	});
});

test("BranchData.toString()", async ctx => {
	await ctx.test("should return a format like 'BRDA:<lineNumber>,<blockNumber>,<branchNumber>,<taken>'", () => {
		assert.equal(String(new BranchData), "BRDA:0,0,0,-");
		assert.equal(String(new BranchData({blockNumber: 3, branchNumber: 2, lineNumber: 127, taken: 1})), "BRDA:127,3,2,1");
	});
});
