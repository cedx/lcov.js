import {BranchCoverage, FunctionCoverage, LineCoverage, SourceFile} from "@cedx/lcov";
import {equal, ok} from "node:assert/strict";
import {describe, it} from "node:test";

/**
 * Tests the features of the {@link SourceFile} class.
 */
describe("SourceFile", () => {
	describe("fromJson()", () => {
		it("should return an instance with default values for an empty map", () => {
			const record = SourceFile.fromJson({});
			equal(record.branches, null);
			equal(record.functions, null);
			equal(record.lines, null);
			equal(record.path.length, 0);
		});

		it("should return an initialized instance for a non-empty map", () => {
			const record = SourceFile.fromJson({branches: {}, functions: {}, lines: {}, path: "/home/cedx/lcov.js"});
			ok(record.branches instanceof BranchCoverage);
			ok(record.functions instanceof FunctionCoverage);
			ok(record.lines instanceof LineCoverage);
			equal(record.path, "/home/cedx/lcov.js");
		});
	});

	describe("toString()", () => {
		it("should return a format like 'SF:<path>\\nend_of_record'", () => {
			equal(String(new SourceFile("")), "SF:\nend_of_record");

			const record = new SourceFile("/home/cedx/lcov.js", {branches: new BranchCoverage, functions: new FunctionCoverage, lines: new LineCoverage});
			equal(String(record), `SF:/home/cedx/lcov.js\n${record.functions}\n${record.branches}\n${record.lines}\nend_of_record`);
		});
	});
});
