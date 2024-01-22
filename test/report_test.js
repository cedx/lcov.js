import {equal} from "node:assert/strict";
import {describe, it} from "node:test";
import {readFileSync} from "fs";
import {BranchData, FunctionData, LineData, Report, SourceFile} from "#lcov";

/**
 * Tests the features of the {@link Report} class.
 */
describe("Report", () => {
	describe("fromJson()", () => {
		it("should return an instance with default values for an empty map", () => {
			const report = Report.fromJson({});
			equal(report.sourceFiles.length, 0);
			equal(report.testName.length, 0);
		});

		it("should return an initialized instance for a non-empty map", () => {
			const report = Report.fromJson({sourceFiles: [{}], testName: "LcovTest"});
			equal(report.sourceFiles.length, 1);
			assert(report.sourceFiles[0] instanceof SourceFile);
			equal(report.testName, "LcovTest");
		});
	});

	describe("parse()", () => {
		const report = Report.parse(readFileSync("share/lcov.info", "utf8"));
		it("should have a test name", () => equal(report.testName, "Example"));

		it("should contain three source files", () => {
			equal(report.sourceFiles.length, 3);
			assert(report.sourceFiles[0] instanceof SourceFile);
			equal(report.sourceFiles[0].path, "/home/cedx/lcov.js/fixture.js");
			equal(report.sourceFiles[1].path, "/home/cedx/lcov.js/func1.js");
			equal(report.sourceFiles[2].path, "/home/cedx/lcov.js/func2.js");
		});

		it("should have detailed branch coverage", () => {
			const {branches} = report.sourceFiles[1]; // eslint-disable-line prefer-destructuring
			assert(branches);
			equal(branches.found, 4);
			equal(branches.hit, 4);
			equal(branches.data.length, 4);

			const [data] = branches.data;
			assert(data instanceof BranchData);
			equal(data.lineNumber, 8);
		});

		it("should have detailed function coverage", () => {
			const {functions} = report.sourceFiles[1]; // eslint-disable-line prefer-destructuring
			assert(functions);
			equal(functions.found, 1);
			equal(functions.hit, 1);
			equal(functions.data.length, 1);

			const [data] = functions.data;
			assert(data instanceof FunctionData);
			equal(data.functionName, "func1");
		});

		it("should have detailed line coverage", () => {
			const {lines} = report.sourceFiles[1]; // eslint-disable-line prefer-destructuring
			assert(lines);
			equal(lines.found, 9);
			equal(lines.hit, 9);
			equal(lines.data.length, 9);

			const [data] = lines.data;
			assert(data instanceof LineData);
			equal(data.checksum, "5kX7OTfHFcjnS98fjeVqNA");
		});

		it("should throw an error if the input is invalid", () => assert.throws(() => Report.parse("ZZ"), SyntaxError));
		it("should throw an error if the report is empty", () => assert.throws(() => Report.parse("TN:Example"), SyntaxError));
	});

	describe("toString()", () => {
		it("should return a format like 'TN:<testName>'", () => {
			equal(String(new Report("")).length, 0);

			const sourceFile = new SourceFile("");
			equal(String(new Report("LcovTest", [sourceFile])), `TN:LcovTest\n${sourceFile}`);
		});
	});
});
