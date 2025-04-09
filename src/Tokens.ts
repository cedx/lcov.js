/**
 * Provides the list of tokens supported by the parser.
 */
export const Tokens = Object.freeze({

	/**
	 * The coverage data of a branch.
	 */
	BranchData: "BRDA",

	/**
	 * The number of branches found.
	 */
	BranchesFound: "BRF",

	/**
	 * The number of branches hit.
	 */
	BranchesHit: "BRH",

	/**
	 * The end of a section.
	 */
	EndOfRecord: "end_of_record",

	/**
	 * The coverage data of a function.
	 */
	FunctionData: "FNDA",

	/**
	 * A function name.
	 */
	FunctionName: "FN",

	/**
	 * The number of functions found.
	 */
	FunctionsFound: "FNF",

	/**
	 * The number of functions hit.
	 */
	FunctionsHit: "FNH",

	/**
	 * The coverage data of a line.
	 */
	LineData: "DA",

	/**
	 * The number of lines found.
	 */
	LinesFound: "LF",

	/**
	 * The number of lines hit.
	 */
	LinesHit: "LH",

	/**
	 * The path to a source file.
	 */
	SourceFile: "SF",

	/**
	 * A test name.
	 */
	TestName: "TN"
});

/**
 * Provides the list of tokens supported by the parser.
 */
export type Tokens = typeof Tokens[keyof typeof Tokens];
