import {Token} from "./token.js"

# Provides the coverage data of lines.
export class LineCoverage

	# Creates a new line coverage.
	constructor: (options = {}) ->

		# The coverage data.
		@data = options.data ? []

		# The number of lines found.
		@found = options.found ? 0

		# The number of lines hit.
		@hit = options.hit ? 0

	# Creates a new line coverage from the specified JSON object.
	@fromJson: (json) -> new @
		data: if Array.isArray json.data then json.data.map (item) -> LineData.fromJson item else []
		found: if Number.isInteger json.found then json.found else 0
		hit: if Number.isInteger json.hit then json.hit else 0

	# Returns a string representation of this object.
	toString: -> [
		@data.map((item) -> item.toString())...
		"#{Token.linesFound}:#{@found}"
		"#{Token.linesHit}:#{@hit}"
	].join "\n"

# Provides details for line coverage.
export class LineData

	# Creates new line data.
	constructor: (options = {}) ->

		# The data checksum.
		@checksum = options.checksum ? ""

		# The execution count.
		@executionCount = options.executionCount ? 0

		# The line number.
		@lineNumber = options.lineNumber ? 0

	# Creates new line data from the specified JSON object.
	@fromJson: (json) -> new @
		checksum: if typeof json.checksum is "string" then json.checksum else ""
		executionCount: if Number.isInteger json.executionCount then json.executionCount else 0
		lineNumber: if Number.isInteger json.lineNumber then json.lineNumber else 0

	# Returns a string representation of this object.
	toString: ->
		value = "#{Token.lineData}:#{@lineNumber},#{@executionCount}"
		if @checksum then "#{value},#{@checksum}" else value
