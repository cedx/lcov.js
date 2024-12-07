import {Token} from "./token.js"

# Provides the coverage data of functions.
export class FunctionCoverage

	# Creates a new function coverage.
	constructor: (options = {}) ->

		# The coverage data.
		@data = options.data ? []

		# The number of functions found.
		@found = options.found ? 0

		# The number of functions hit.
		@hit = options.hit ? 0

	# Creates a new function coverage from the specified JSON object.
	@fromJson: (json) -> new @
		data: if Array.isArray json.data then json.data.map (item) -> FunctionData.fromJson item else []
		found: if Number.isInteger json.found then json.found else 0
		hit: if Number.isInteger json.hit then json.hit else 0

	# Returns a string representation of this object.
	toString: -> [
		@data.map((item) -> item.toString(asDefinition: yes))...
		@data.map((item) -> item.toString(asDefinition: no))...
		"#{Token.functionsFound}:#{@found}"
		"#{Token.functionsHit}:#{@hit}"
	].join "\n"

# Provides details for function coverage.
export class FunctionData

	# Creates new function data.
	constructor: (options = {}) ->

		# The execution count.
		@executionCount = options.executionCount ? 0

		# The function name.
		@functionName = options.functionName ? ""

		# The line number of the function start.
		@lineNumber = options.lineNumber ? 0

	# Creates new function data from the specified JSON object.
	@fromJson: (json) -> new @
		executionCount: if Number.isInteger(json.executionCount) then json.executionCount else 0,
		functionName: if typeof json.functionName is "string" then json.functionName else "",
		lineNumber: if Number.isInteger(json.lineNumber) then json.lineNumber else 0

	# Returns a string representation of this object.
	toString: (options = {}) ->
		token = if options.asDefinition then Token.functionName else Token.functionData
		count = if options.asDefinition then @lineNumber else @executionCount
		"#{token}:#{count},#{@functionName}"
