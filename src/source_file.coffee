import {BranchCoverage} from "./branch.js"
import {FunctionCoverage} from "./function.js"
import {LineCoverage} from "./line.js"
import {Token} from "./token.js"

# Provides the coverage data of a source file.
export class SourceFile

	# Creates a new source file.
	constructor: (path, options = {}) ->

		# The branch coverage.
		@branches = options.branches ? null

		# The function coverage.
		@functions = options.functions ? null

		# The line coverage.
		@lines = options.lines ? null

		# The path to the source file.
		@path = path

	# Creates a new source file from the specified JSON object.
	@fromJson: (json) -> new @ (if typeof json.path is "string" then json.path else ""),
		branches: if typeof json.branches is "object" and json.branches then BranchCoverage.fromJson json.branches else null
		functions: if typeof json.functions is "object" and json.functions then FunctionCoverage.fromJson json.functions else null
		lines: if typeof json.lines is "object" and json.lines then LineCoverage.fromJson json.lines else null

	# Returns a string representation of this object.
	toString: ->
		output = ["#{Token.sourceFile}:#{@path}"]
		output.push @functions.toString() if @functions?
		output.push @branches.toString() if @branches?
		output.push @lines.toString() if @lines?
		output.push Token.endOfRecord
		output.join "\n"
