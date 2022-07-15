import assert from "node:assert/strict";
// @ts-expect-error TS2614
import {describe, it} from "node:test";
import {readFileSync} from "fs";
import {BranchData, FunctionData, LineData, Report, SourceFile} from "../src/index.js";

/**
 * Tests the features of the {@link Report} class.
 */
describe("Report", () => {
	describe(".fromString()", () => {
		const report = Report.fromString(readFileSync("test/fixture/lcov.info", "utf8"));
		it("should have a test name", () => assert.equal(report.testName, "Example"));

		it("should contain three source files", () => {
			assert.equal(report.sourceFiles.length, 3);
			assert.ok(report.sourceFiles[0] instanceof SourceFile);
			assert.equal(report.sourceFiles[0].path, "/home/cedx/lcov.js/fixture.js");
			assert.equal(report.sourceFiles[1].path, "/home/cedx/lcov.js/func1.js");
			assert.equal(report.sourceFiles[2].path, "/home/cedx/lcov.js/func2.js");
		});

		it("should have detailed branch coverage", () => {
			const {branches} = report.sourceFiles[1]; // eslint-disable-line prefer-destructuring
			assert.ok(branches);
			assert.equal(branches.found, 4);
			assert.equal(branches.hit, 4);
			assert.equal(branches.data.length, 4);

			const [data] = branches.data;
			assert.ok(data instanceof BranchData);
			assert.equal(data.lineNumber, 8);
		});

		it("should have detailed function coverage", () => {
			const {functions} = report.sourceFiles[1]; // eslint-disable-line prefer-destructuring
			assert.ok(functions);
			assert.equal(functions.found, 1);
			assert.equal(functions.hit, 1);
			assert.equal(functions.data.length, 1);

			const [data] = functions.data;
			assert.ok(data instanceof FunctionData);
			assert.equal(data.functionName, "func1");
		});

		it("should have detailed line coverage", () => {
			const {lines} = report.sourceFiles[1]; // eslint-disable-line prefer-destructuring
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
			assert.equal(report.sourceFiles.length, 0);
			assert.equal(report.testName.length, 0);
		});

		it("should return an initialized instance for a non-empty map", () => {
			const report = Report.fromJson({sourceFiles: [{}], testName: "LcovTest"});
			assert.equal(report.sourceFiles.length, 1);
			assert.ok(report.sourceFiles[0] instanceof SourceFile);
			assert.equal(report.testName, "LcovTest");
		});
	});

	describe(".toString()", () => {
		it("should return a format like 'TN:<testName>'", () => {
			assert.equal(String(new Report("")).length, 0);

			const sourceFile = new SourceFile("");
			assert.equal(String(new Report("LcovTest", [sourceFile])), `TN:LcovTest\n${sourceFile}`);
		});
	});
});
