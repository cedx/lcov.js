import {BranchCoverage, BranchData} from "./branch.js"
import {FunctionCoverage, FunctionData} from "./function.js"
import {LineCoverage, LineData} from "./line.js"
import {SourceFile} from "./source_file.js"
import {Token} from "./token.js"

# Represents a trace file, that is a coverage report.
export class Report

	# Creates a new report.
	constructor: (testName, sourceFiles = []) ->

		# The source file list.
		@sourceFiles = sourceFiles

		# The test name.
		@testName = testName

	# Creates a new report from the specified JSON object.
	@fromJson: (json) ->
		testName = if typeof json.testName is "string" then json.testName else ""
		sourceFiles = if Array.isArray(json.sourceFiles) then json.sourceFiles.map((item) -> SourceFile.fromJson item) else []
		new @ testName, sourceFiles

	# Parses the specified coverage data in LCOV format.
	@parse: (coverage) -> # coffeelint: disable-line=cyclomatic_complexity
		offset = 0
		report = new @ ""
		sourceFile = new SourceFile ""

		for line from coverage.split /\r?\n/g
			offset++
			unless line = line.trim() then continue

			parts = line.split ":"
			token = parts.shift()
			data = parts.join(":").split ","

			switch token
				when Token.testName then report.testName or= data[0]
				when Token.endOfRecord then report.sourceFiles.push sourceFile

				when Token.branchData
					throw SyntaxError "Invalid branch data at line ##{offset}." if data.length < 4
					sourceFile.branches?.data.push new BranchData
						blockNumber: Number data[1]
						branchNumber: Number data[2]
						lineNumber: Number data[0]
						taken: if data[3] is "-" then 0 else Number data[3]

				when Token.functionData
					throw SyntaxError "Invalid function data at line ##{offset}." if data.length < 2
					if sourceFile.functions? then for item from sourceFile.functions.data when item.functionName is data[1]
						item.executionCount = Number data[0]
						break

				when Token.functionName
					throw SyntaxError "Invalid function name at line ##{offset}." if data.length < 2
					sourceFile.functions?.data.push new FunctionData functionName: data[1], lineNumber: Number data[0]

				when Token.lineData
					throw SyntaxError "Invalid line data at line ##{offset}." if data.length < 2
					sourceFile.lines?.data.push new LineData
						checksum: if data.length >= 3 then data[2] else ""
						executionCount: Number data[1]
						lineNumber: Number data[0]

				when Token.sourceFile then sourceFile = new SourceFile data[0],
					branches: new BranchCoverage,
					functions: new FunctionCoverage,
					lines: new LineCoverage

				when Token.branchesFound then sourceFile.branches.found = Number data[0] if sourceFile.branches?
				when Token.branchesHit then sourceFile.branches.hit = Number data[0] if sourceFile.branches?
				when Token.functionsFound then sourceFile.functions.found = Number data[0] if sourceFile.functions?
				when Token.functionsHit then sourceFile.functions.hit = Number data[0] if sourceFile.functions?
				when Token.linesFound then sourceFile.lines.found = Number data[0] if sourceFile.lines?
				when Token.linesHit then sourceFile.lines.hit = Number data[0] if sourceFile.lines?
				else throw SyntaxError "Unknown token at line ##{offset}."

		throw SyntaxError "The coverage data is empty or invalid." unless report.sourceFiles.length
		report

	# TODO tryParse !

	# Returns a string representation of this object.
	toString: -> [
		(if @testName then ["#{Token.testName}:#{@testName}"] else [])...
		@sourceFiles.map((item) -> item.toString())...
	].join "\n"
