import {BranchCoverage, FunctionCoverage, LineCoverage, SourceFile} from "@cedx/lcov";
import {equal} from "node:assert/strict";
import {describe, it} from "node:test";

/**
 * Tests the features of the {@link SourceFile} class.
 */
describe("SourceFile", () => {
	describe("toString()", () => {
		it("should return a format like 'SF:<path>\\nend_of_record'", () => {
			equal(String(new SourceFile("")), "SF:\nend_of_record");

			const record = new SourceFile("/home/CedX/Lcov.js", {branches: new BranchCoverage, functions: new FunctionCoverage, lines: new LineCoverage});
			equal(String(record), `SF:/home/CedX/Lcov.js\n${record.functions}\n${record.branches}\n${record.lines}\nend_of_record`);
		});
	});
});
