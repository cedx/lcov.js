import {Token} from "./token.js"

# Provides the coverage data of branches.
export class BranchCoverage

	# Creates a new branch coverage.
	constructor: (options = {}) ->

		# The coverage data.
		@data = options.data ? []

		# The number of branches found.
		@found = options.found ? 0

		# The number of branches hit.
		@hit = options.hit ? 0

	# Creates a new branch coverage from the specified JSON object.
	@fromJson: (json) -> new @
		data: if Array.isArray json.data then json.data.map ($) -> BranchData.fromJson $ else []
		found: if Number.isInteger json.found then json.found else 0
		hit: if Number.isInteger json.hit then json.hit else 0

	# Returns a string representation of this object.
	toString: -> [
		@data.map(($) -> $.toString())...
		"#{Token.branchesFound}:#{@found}"
		"#{Token.branchesHit}:#{@hit}"
	].join "\n"

# Provides details for branch coverage.
export class BranchData

	# Creates new branch data.
	constructor: (options = {}) ->

		# The block number.
		@blockNumber = options.blockNumber ? 0

		# The branch number.
		@branchNumber = options.branchNumber ? 0

		# The line number.
		@lineNumber = options.lineNumber ? 0

		# A number indicating how often this branch was taken.
		@taken = options.taken ? 0

	# Creates new branch data from the specified JSON object.
	@fromJson: (json) -> new @
		blockNumber: if Number.isInteger json.blockNumber then json.blockNumber else 0
		branchNumber: if Number.isInteger json.branchNumber then json.branchNumber else 0
		lineNumber: if Number.isInteger json.lineNumber then json.lineNumber else 0
		taken: if Number.isInteger json.taken then json.taken else 0

	# Returns a string representation of this object.
	toString: ->
		value = "#{Token.branchData}:#{@lineNumber},#{@blockNumber},#{@branchNumber}"
		if @taken > 0 then "#{value},#{@taken}" else "#{value},-"
