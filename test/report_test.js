import assert from "assert/strict";
import {readFileSync} from "fs";
import {BranchData, File, FunctionData, LineData, Report} from "../lib/index.js";

/**
 * Tests the features of the {@link Report} class.
 */
describe("Report", () => {
	describe(".fromString()", () => {
		const report = Report.fromString(readFileSync("test/fixtures/lcov.info", "utf8"));
		it("should have a test name", () => assert.equal(report.testName, "Example"));

		it("should contain three files", () => {
			assert.equal(report.files.length, 3);
			assert.ok(report.files[0] instanceof File);
			assert.equal(report.files[0].path, "/home/cedx/lcov.js/fixture.js");
			assert.equal(report.files[1].path, "/home/cedx/lcov.js/func1.js");
			assert.equal(report.files[2].path, "/home/cedx/lcov.js/func2.js");
		});

		it("should have detailed branch coverage", () => {
			const {branches} = report.files[1]; // eslint-disable-line prefer-destructuring
			assert.ok(branches);
			assert.equal(branches.found, 4);
			assert.equal(branches.hit, 4);
			assert.equal(branches.data.length, 4);

			const [data] = branches.data;
			assert.ok(data instanceof BranchData);
			assert.equal(data.lineNumber, 8);
		});

		it("should have detailed function coverage", () => {
			const {functions} = report.files[1]; // eslint-disable-line prefer-destructuring
			assert.ok(functions);
			assert.equal(functions.found, 1);
			assert.equal(functions.hit, 1);
			assert.equal(functions.data.length, 1);

			const [data] = functions.data;
			assert.ok(data instanceof FunctionData);
			assert.equal(data.functionName, "func1");
		});

		it("should have detailed line coverage", () => {
			const {lines} = report.files[1]; // eslint-disable-line prefer-destructuring
			assert.ok(lines);
			assert.equal(lines.found, 9);
			assert.equal(lines.hit, 9);
			assert.equal(lines.data.length, 9);

			const [data] = lines.data;
			assert.ok(data instanceof LineData);
			assert.equal(data.checksum, "5kX7OTfHFcjnS98fjeVqNA");
		});

		it("should throw an error if the input is invalid", () => assert.throws(() => Report.fromString("ZZ"), SyntaxError));
		it("should throw an error if the report is empty", () => assert.throws(() => Report.fromString("TN:Example"), SyntaxError));
	});

	describe(".fromJson()", () => {
		it("should return an instance with default values for an empty map", () => {
			const report = Report.fromJson({});
			assert.equal(report.files.length, 0);
			assert.equal(report.testName.length, 0);
		});

		it("should return an initialized instance for a non-empty map", () => {
			const report = Report.fromJson({files: [{}], testName: "LcovTest"});
			assert.equal(report.files.length, 1);
			assert.ok(report.files[0] instanceof File);
			assert.equal(report.testName, "LcovTest");
		});
	});

	describe(".toJSON()", () => {
		it("should return a map with default values for a newly created instance", () => {
			const map = new Report("").toJSON();
			assert.equal(Object.keys(map).length, 2);
			assert.ok(Array.isArray(map.files));
			assert.equal(map.files.length, 0);
			assert.equal(map.testName.length, 0);
		});

		it("should return a non-empty map for an initialized instance", () => {
			const map = new Report("LcovTest", [new File("")]).toJSON();
			assert.equal(Object.keys(map).length, 2);
			assert.ok(Array.isArray(map.files));
			assert.equal(map.files.length, 1);

			const [file] = map.files;
			assert.ok(file);
			assert.equal(typeof file, "object");
			assert.equal(map.testName, "LcovTest");
		});
	});

	describe(".toString()", () => {
		it("should return a format like 'TN:<testName>'", () => {
			assert.equal(String(new Report("")).length, 0);

			const file = new File("");
			assert.equal(String(new Report("LcovTest", [file])), `TN:LcovTest\n${file}`);
		});
	});
});
