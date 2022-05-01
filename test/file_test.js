import assert from "assert/strict";
import {BranchCoverage, File, FunctionCoverage, LineCoverage} from "../lib/index.js";

/**
 * Tests the features of the {@link File} class.
 */
describe("File", () => {
	describe(".fromJson()", () => {
		it("should return an instance with default values for an empty map", () => {
			const record = File.fromJson({});
			assert.equal(record.branches, null);
			assert.equal(record.functions, null);
			assert.equal(record.lines, null);
			assert.equal(record.path.length, 0);
		});

		it("should return an initialized instance for a non-empty map", () => {
			const record = File.fromJson({branches: {}, functions: {}, lines: {}, path: "/home/cedx/lcov.js"});
			assert.ok(record.branches instanceof BranchCoverage);
			assert.ok(record.functions instanceof FunctionCoverage);
			assert.ok(record.lines instanceof LineCoverage);
			assert.equal(record.path, "/home/cedx/lcov.js");
		});
	});

	describe(".toJSON()", () => {
		it("should return a map with default values for a newly created instance", () => {
			const map = new File("").toJSON();
			assert.equal(Object.keys(map).length, 4);
			assert.equal(map.branches, null);
			assert.equal(map.functions, null);
			assert.equal(map.lines, null);
			assert.equal(map.path.length, 0);
		});

		it("should return a non-empty map for an initialized instance", () => {
			const record = new File("/home/cedx/lcov.js", {
				branches: new BranchCoverage,
				functions: new FunctionCoverage,
				lines: new LineCoverage
			});

			const map = record.toJSON();
			assert.equal(Object.keys(map).length, 4);
			assert.ok(map.branches);
			assert.equal(typeof map.branches, "object");
			assert.ok(map.functions);
			assert.equal(typeof map.functions, "object");
			assert.ok(map.lines);
			assert.equal(typeof map.lines, "object");
			assert.equal(map.path, "/home/cedx/lcov.js");
		});
	});

	describe(".toString()", () => {
		it("should return a format like 'SF:<path>\\nend_of_record'", () => {
			assert.equal(String(new File("")), "SF:\nend_of_record");

			const record = new File("/home/cedx/lcov.js", {branches: new BranchCoverage, functions: new FunctionCoverage, lines: new LineCoverage});
			assert.equal(String(record), `SF:/home/cedx/lcov.js\n${record.functions}\n${record.branches}\n${record.lines}\nend_of_record`);
		});
	});
});
