import assert from "node:assert/strict";
import {describe, it} from "node:test";
import {BranchCoverage, FunctionCoverage, LineCoverage, SourceFile} from "#lcov";

/**
 * Tests the features of the {@link SourceFile} class.
 */
describe("SourceFile", () => {
	describe("fromJson()", () => {
		it("should return an instance with default values for an empty map", () => {
			const record = SourceFile.fromJson({});
			assert.equal(record.branches, null);
			assert.equal(record.functions, null);
			assert.equal(record.lines, null);
			assert.equal(record.path.length, 0);
		});

		it("should return an initialized instance for a non-empty map", () => {
			const record = SourceFile.fromJson({branches: {}, functions: {}, lines: {}, path: "/home/cedx/lcov.js"});
			assert(record.branches instanceof BranchCoverage);
			assert(record.functions instanceof FunctionCoverage);
			assert(record.lines instanceof LineCoverage);
			assert.equal(record.path, "/home/cedx/lcov.js");
		});
	});

	describe("toString()", () => {
		it("should return a format like 'SF:<path>\\nend_of_record'", () => {
			assert.equal(String(new SourceFile("")), "SF:\nend_of_record");

			const record = new SourceFile("/home/cedx/lcov.js", {branches: new BranchCoverage, functions: new FunctionCoverage, lines: new LineCoverage});
			assert.equal(String(record), `SF:/home/cedx/lcov.js\n${record.functions}\n${record.branches}\n${record.lines}\nend_of_record`);
		});
	});
});
