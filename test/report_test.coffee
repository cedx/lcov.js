import {BranchData, FunctionData, LineData, Report, SourceFile} from "@cedx/lcov"
import {equal, ok, throws} from "node:assert/strict"
import {readFileSync} from "node:fs"
import {describe, it} from "node:test"

# Tests the features of the `Report` class.
describe "Report", ->
	describe "fromJson()", ->
		it "should return an instance with default values for an empty map", ->
			report = Report.fromJson {}
			equal report.sourceFiles.length, 0
			equal report.testName.length, 0

		it "should return an initialized instance for a non-empty map", ->
			report = Report.fromJson sourceFiles: [{}], testName: "LcovTest"
			equal report.sourceFiles.length, 1
			ok report.sourceFiles[0] instanceof SourceFile
			equal report.testName, "LcovTest"

	describe "parse()", ->
		report = Report.parse readFileSync "res/lcov.info", "utf8"
		it "should have a test name", (-> equal report.testName, "Example")

		it "should contain three source files", ->
			equal report.sourceFiles.length, 3
			ok report.sourceFiles[0] instanceof SourceFile
			equal report.sourceFiles[0].path, "/home/cedx/lcov.js/fixture.js"
			equal report.sourceFiles[1].path, "/home/cedx/lcov.js/func1.js"
			equal report.sourceFiles[2].path, "/home/cedx/lcov.js/func2.js"

		it "should have detailed branch coverage", ->
			[, {branches}] = report.sourceFiles
			ok branches
			equal branches.found, 4
			equal branches.hit, 4
			equal branches.data.length, 4

			[data] = branches.data
			ok data instanceof BranchData
			equal data.lineNumber, 8

		it "should have detailed function coverage", ->
			[, {functions}] = report.sourceFiles
			ok functions
			equal functions.found, 1
			equal functions.hit, 1
			equal functions.data.length, 1

			[data] = functions.data
			ok data instanceof FunctionData
			equal data.functionName, "func1"

		it "should have detailed line coverage", ->
			[, {lines}] = report.sourceFiles
			ok lines
			equal lines.found, 9
			equal lines.hit, 9
			equal lines.data.length, 9

			[data] = lines.data
			ok data instanceof LineData
			equal data.checksum, "5kX7OTfHFcjnS98fjeVqNA"

		it "should throw an error if the input is invalid", -> throws (-> Report.parse "ZZ"), SyntaxError
		it "should throw an error if the report is empty", -> throws (-> Report.parse "TN:Example"), SyntaxError

	describe "toString()", ->
		it "should return a format like 'TN:<testName>'", ->
			equal String(new Report "").length, 0

			sourceFile = new SourceFile ""
			equal String(new Report "LcovTest", [sourceFile]), "TN:LcovTest\n#{sourceFile}"
