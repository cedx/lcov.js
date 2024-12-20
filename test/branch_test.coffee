import {BranchCoverage, BranchData} from "@cedx/lcov"
import {equal, ok} from "node:assert/strict"
import {describe, it} from "node:test"

# Tests the features of the `BranchCoverage` class.
describe "BranchCoverage", ->
	describe "fromJson()", ->
		it "should return an instance with default values for an empty map", ->
			coverage = BranchCoverage.fromJson {}
			equal coverage.data.length, 0
			equal coverage.found, 0
			equal coverage.hit, 0

		it "should return an initialized instance for a non-empty map", ->
			coverage = BranchCoverage.fromJson data: [{lineNumber: 127}], found: 23, hit: 11
			equal coverage.data.length, 1
			equal coverage.found, 23
			equal coverage.hit, 11

			[data] = coverage.data
			ok data instanceof BranchData
			equal data.lineNumber, 127

	describe "toString()", ->
		it "should return a format like 'BRF:<found>\\nBRH:<hit>'", ->
			equal String(new BranchCoverage), "BRF:0\nBRH:0"

			data = new BranchData blockNumber: 3, branchNumber: 2, lineNumber: 127, taken: 1
			equal String(new BranchCoverage data: [data], found: 23, hit: 11), "#{data}\nBRF:23\nBRH:11"

# Tests the features of the `BranchData` class.
describe "BranchData", ->
	describe "fromJson()", ->
		it "should return an instance with default values for an empty map", ->
			data = BranchData.fromJson {}
			equal data.blockNumber, 0
			equal data.branchNumber, 0
			equal data.lineNumber, 0
			equal data.taken, 0

		it "should return an initialized instance for a non-empty map", ->
			data = BranchData.fromJson blockNumber: 3, branchNumber: 2, lineNumber: 127, taken: 1
			equal data.blockNumber, 3
			equal data.branchNumber, 2
			equal data.lineNumber, 127
			equal data.taken, 1

	describe "toString()", ->
		it "should return a format like 'BRDA:<lineNumber>,<blockNumber>,<branchNumber>,<taken>'", ->
			equal String(new BranchData), "BRDA:0,0,0,-"
			equal String(new BranchData blockNumber: 3, branchNumber: 2, lineNumber: 127, taken: 1), "BRDA:127,3,2,1"
