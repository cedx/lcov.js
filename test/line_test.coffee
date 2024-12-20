import {LineCoverage, LineData} from "@cedx/lcov"
import {equal, ok} from "node:assert/strict"
import {describe, it} from "node:test"

# Tests the features of the `LineCoverage` class.
describe "LineCoverage", ->
	describe "fromJson()", ->
		it "should return an instance with default values for an empty map", ->
			coverage = LineCoverage.fromJson {}
			equal coverage.data.length, 0
			equal coverage.found, 0
			equal coverage.hit, 0

		it "should return an initialized instance for a non-empty map", ->
			coverage = LineCoverage.fromJson data: [{lineNumber: 127}], found: 23, hit: 11
			equal coverage.data.length, 1
			equal coverage.found, 23
			equal coverage.hit, 11

			[data] = coverage.data
			ok data instanceof LineData
			equal data.lineNumber, 127

	describe "toString()", ->
		it "should return a format like 'LF:<found>\\nLH:<hit>'", ->
			equal String(new LineCoverage), "LF:0\nLH:0"

			data = new LineData executionCount: 3, lineNumber: 127
			equal String(new LineCoverage data: [data], found: 23, hit: 11), "#{data}\nLF:23\nLH:11"

# Tests the features of the `LineData` class.
describe "LineData", ->
	describe "fromJson()", ->
		it "should return an instance with default values for an empty map", ->
			data = LineData.fromJson {}
			equal data.checksum.length, 0
			equal data.executionCount, 0
			equal data.lineNumber, 0

		it "should return an initialized instance for a non-empty map", ->
			data = LineData.fromJson checksum: "ed076287532e86365e841e92bfc50d8c", executionCount: 3, lineNumber: 127
			equal data.checksum, "ed076287532e86365e841e92bfc50d8c"
			equal data.executionCount, 3
			equal data.lineNumber, 127

	describe "toString()", ->
		it "should return a format like 'DA:<lineNumber>,<executionCount>[,<checksum>]'", ->
			equal String(new LineData), "DA:0,0"

			data = new LineData checksum: "ed076287532e86365e841e92bfc50d8c", executionCount: 3, lineNumber: 127
			equal String(data), "DA:127,3,ed076287532e86365e841e92bfc50d8c"
