import {BranchData, FunctionData, LineData, Report, SourceFile} from "@cedx/lcov";
import {readFileSync} from "fs";
import {equal, ok, throws} from "node:assert/strict";
import {describe, it} from "node:test";

/**
 * Tests the features of the {@link Report} class.
 */
describe("Report", () => {
	const coverage = readFileSync("res/Lcov.info", "utf8");

	describe("fromJson()", () => {
		it("should return an instance with default values for an empty map", () => {
			const report = Report.fromJson({});
			equal(report.sourceFiles.length, 0);
			equal(report.testName.length, 0);
		});

		it("should return an initialized instance for a non-empty map", () => {
			const report = Report.fromJson({sourceFiles: [{}], testName: "LcovTest"});
			equal(report.sourceFiles.length, 1);
			ok(report.sourceFiles[0] instanceof SourceFile);
			equal(report.testName, "LcovTest");
		});
	});

	describe("parse()", () => {
		const report = Report.parse(coverage);
		it("should have a test name", () => equal(report.testName, "Example"));

		it("should contain three source files", () => {
			equal(report.sourceFiles.length, 3);
			ok(report.sourceFiles[0] instanceof SourceFile);
			equal(report.sourceFiles[0].path, "/home/cedx/lcov.js/fixture.js");
			equal(report.sourceFiles[1].path, "/home/cedx/lcov.js/func1.js");
			equal(report.sourceFiles[2].path, "/home/cedx/lcov.js/func2.js");
		});

		it("should have detailed branch coverage", () => {
			const [, {branches}] = report.sourceFiles;
			ok(branches);
			equal(branches.found, 4);
			equal(branches.hit, 4);
			equal(branches.data.length, 4);

			const [data] = branches.data;
			ok(data instanceof BranchData);
			equal(data.lineNumber, 8);
		});

		it("should have detailed function coverage", () => {
			const [, {functions}] = report.sourceFiles;
			ok(functions);
			equal(functions.found, 1);
			equal(functions.hit, 1);
			equal(functions.data.length, 1);

			const [data] = functions.data;
			ok(data instanceof FunctionData);
			equal(data.functionName, "func1");
		});

		it("should have detailed line coverage", () => {
			const [, {lines}] = report.sourceFiles;
			ok(lines);
			equal(lines.found, 9);
			equal(lines.hit, 9);
			equal(lines.data.length, 9);

			const [data] = lines.data;
			ok(data instanceof LineData);
			equal(data.checksum, "5kX7OTfHFcjnS98fjeVqNA");
		});

		it("should throw an error if the input is invalid", () => throws(() => Report.parse("ZZ"), SyntaxError));
		it("should throw an error if the report is empty", () => throws(() => Report.parse("TN:Example"), SyntaxError));
	});

	describe("toString()", () => {
		it("should return a format like 'TN:<testName>'", () => {
			equal(String(new Report("")).length, 0);

			const sourceFile = new SourceFile("");
			equal(String(new Report("LcovTest", [sourceFile])), `TN:LcovTest\n${sourceFile}`);
		});
	});

	describe("tryParse()", () => {
		it("should return a `Report` if the parsing succeeded", () => ok(Report.tryParse(coverage) instanceof Report));
		it("should return `null` if the parsing failed", () => equal(Report.tryParse("TN:Example"), null));
	});
});
