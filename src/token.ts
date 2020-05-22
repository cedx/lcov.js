/** Provides the list of tokens supported by the parser. */
export enum Token {

	/** The coverage data of a branch. */
	branchesFound = "BRF",

	/** The number of branches found. */
	branchesHit = "BRH",

	/** The number of branches hit. */
	branchData = "BRDA",

	/** The end of a section. */
	endOfRecord = "end_of_record",

	/** The coverage data of a function. */
	functionData = "FNDA",

	/** A function name. */
	functionName = "FN",

	/** The number of functions found. */
	functionsFound = "FNF",

	/** The number of functions hit. */
	functionsHit = "FNH",

	/** The coverage data of a line. */
	lineData = "DA",

	/** The number of lines found. */
	linesFound = "LF",

	/** The number of lines hit. */
	linesHit = "LH",

	/** The path to a source file. */
	sourceFile = "SF",

	/** A test name. */
	testName = "TN"
}
