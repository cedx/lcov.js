import {FunctionCoverage, FunctionData} from "@cedx/lcov"
import {equal, ok} from "node:assert/strict"
import {describe, it} from "node:test"

# Tests the features of the `FunctionCoverage` class.
describe "FunctionCoverage", ->
	describe "fromJson()", ->
		it "should return an instance with default values for an empty map", ->
			coverage = FunctionCoverage.fromJson {}
			equal coverage.data.length, 0
			equal coverage.found, 0
			equal coverage.hit, 0

		it "should return an initialized instance for a non-empty map", ->
			coverage = FunctionCoverage.fromJson data: [{lineNumber: 127}], found: 23, hit: 11
			equal coverage.data.length, 1
			equal coverage.found, 23
			equal coverage.hit, 11

			[data] = coverage.data
			ok data instanceof FunctionData
			equal data.lineNumber, 127

	describe "toString()", ->
		it "should return a format like 'FNF:<found>\\nFNH:<hit>'", ->
			equal String(new FunctionCoverage), "FNF:0\nFNH:0"

			coverage = new FunctionCoverage data: [new FunctionData(executionCount: 3, functionName: "main", lineNumber: 127)], found: 23, hit: 11
			equal String(coverage), "FN:127,main\nFNDA:3,main\nFNF:23\nFNH:11"

# Tests the features of the `FunctionData` class.
describe "FunctionData", ->
	describe "fromJson()", ->
		it "should return an instance with default values for an empty map", ->
			data = FunctionData.fromJson {}
			equal data.executionCount, 0
			equal data.functionName.length, 0
			equal data.lineNumber, 0

		it "should return an initialized instance for a non-empty map", ->
			data = FunctionData.fromJson executionCount: 3, functionName: "main", lineNumber: 127
			equal data.executionCount, 3
			equal data.functionName, "main"
			equal data.lineNumber, 127

	describe "toString()", ->
		it "should return a format like 'FN:<lineNumber>,<functionName>' when used as definition", ->
			equal new FunctionData().toString(asDefinition: yes), "FN:0,"
			equal new FunctionData(executionCount: 3, functionName: "main", lineNumber: 127).toString(asDefinition: yes), "FN:127,main"

		it "should return a format like 'FNDA:<executionCount>,<functionName>' when used as data", ->
			equal new FunctionData().toString(asDefinition: no), "FNDA:0,"
			equal new FunctionData(executionCount: 3, functionName: "main", lineNumber: 127).toString(asDefinition: no), "FNDA:3,main"
