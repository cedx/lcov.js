import assert from "node:assert/strict";
import test from "node:test";
import {FunctionCoverage, FunctionData} from "../lib/index.js";

test("FunctionCoverage.fromJson()", async ctx => {
	await ctx.test("should return an instance with default values for an empty map", () => {
		const coverage = FunctionCoverage.fromJson({});
		assert.equal(coverage.data.length, 0);
		assert.equal(coverage.found, 0);
		assert.equal(coverage.hit, 0);
	});

	await ctx.test("should return an initialized instance for a non-empty map", () => {
		const coverage = FunctionCoverage.fromJson({data: [{lineNumber: 127}], found: 23, hit: 11});
		assert.equal(coverage.data.length, 1);
		assert.equal(coverage.found, 23);
		assert.equal(coverage.hit, 11);

		const [data] = coverage.data;
		assert.ok(data instanceof FunctionData);
		assert.equal(data.lineNumber, 127);
	});
});

test("FunctionCoverage.toJSON()", async ctx => {
	await ctx.test("should return a map with default values for a newly created instance", () => {
		const map = new FunctionCoverage().toJSON();
		assert.equal(Object.keys(map).length, 3);
		assert.ok(Array.isArray(map.data));
		assert.equal(map.data.length, 0);
		assert.equal(map.found, 0);
		assert.equal(map.hit, 0);
	});

	await ctx.test("should return a non-empty map for an initialized instance", () => {
		const map = new FunctionCoverage({data: [new FunctionData], found: 23, hit: 11}).toJSON();
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

test("FunctionCoverage.toString()", async ctx => {
	await ctx.test("should return a format like 'FNF:<found>\\nFNH:<hit>'", () => {
		assert.equal(String(new FunctionCoverage), "FNF:0\nFNH:0");

		const coverage = new FunctionCoverage({data: [new FunctionData({executionCount: 3, functionName: "main", lineNumber: 127})], found: 23, hit: 11});
		assert.equal(String(coverage), "FN:127,main\nFNDA:3,main\nFNF:23\nFNH:11");
	});
});

test("FunctionData.fromJson()", async ctx => {
	await ctx.test("should return an instance with default values for an empty map", () => {
		const data = FunctionData.fromJson({});
		assert.equal(data.executionCount, 0);
		assert.equal(data.functionName.length, 0);
		assert.equal(data.lineNumber, 0);
	});

	await ctx.test("should return an initialized instance for a non-empty map", () => {
		const data = FunctionData.fromJson({executionCount: 3, functionName: "main", lineNumber: 127});
		assert.equal(data.executionCount, 3);
		assert.equal(data.functionName, "main");
		assert.equal(data.lineNumber, 127);
	});
});

test("FunctionData.toJSON()", async ctx => {
	await ctx.test("should return a map with default values for a newly created instance", () => {
		const map = new FunctionData().toJSON();
		assert.equal(Object.keys(map).length, 3);
		assert.equal(map.executionCount, 0);
		assert.equal(map.functionName.length, 0);
		assert.equal(map.lineNumber, 0);
	});

	await ctx.test("should return a non-empty map for an initialized instance", () => {
		const map = new FunctionData({executionCount: 3, functionName: "main", lineNumber: 127}).toJSON();
		assert.equal(Object.keys(map).length, 3);
		assert.equal(map.executionCount, 3);
		assert.equal(map.functionName, "main");
		assert.equal(map.lineNumber, 127);
	});
});

test("FunctionData.toString()", async ctx => {
	await ctx.test("should return a format like 'FN:<lineNumber>,<functionName>' when used as definition", () => {
		assert.equal(new FunctionData().toString(true), "FN:0,");
		assert.equal(new FunctionData({executionCount: 3, functionName: "main", lineNumber: 127}).toString(true), "FN:127,main");
	});

	await ctx.test("should return a format like 'FNDA:<executionCount>,<functionName>' when used as data", () => {
		assert.equal(new FunctionData().toString(false), "FNDA:0,");
		assert.equal(new FunctionData({executionCount: 3, functionName: "main", lineNumber: 127}).toString(false), "FNDA:3,main");
	});
});
