/**
 * Defines the options of a {@link BranchCoverage} instance.
 */
export type BranchCoverageOptions = Partial<{

	/**
	 * The coverage data.
	 */
	data: Array<BranchData>;

	/**
	 * The number of branches found.
	 */
	found: number;

	/**
	 * The number of branches hit.
	 */
	hit: number;
}>;

/**
 * Defines the options of a {@link BranchData} instance.
 */
export type BranchDataOptions = Partial<{

	/**
	 * The block number.
	 */
	blockNumber: number,

	/**
	 * The branch number.
	 */
	branchNumber: number,

	/**
	 * The line number.
	 */
	lineNumber: number,

	/**
	 * A number indicating how often this branch was taken.
	 */
	taken: number
}>;

/**
 * Provides the coverage data of branches.
 */
export class BranchCoverage {

	/**
	 * The coverage data.
	 */
	data: Array<BranchData>;

	/**
	 * The number of branches found.
	 */
	found: number;

	/**
	 * The number of branches hit.
	 */
	hit: number;

	/**
	 * Creates a new branch coverage.
	 * @param options An object providing values to initialize this instance.
	 */
	constructor(options?: BranchCoverageOptions);

	/**
	 * Creates a new branch coverage from the specified JSON object.
	 * @param json A JSON object representing a branch coverage.
	 * @returns The instance corresponding to the specified JSON object.
	 */
	static fromJson(json: Record<string, any>): BranchCoverage;

	/**
	 * Returns a string representation of this object.
	 * @returns The string representation of this object.
	 */
	toString(): string;
}

/**
 * Provides details for branch coverage.
 */
export class BranchData {

	/**
	 * The block number.
	 */
	blockNumber: number;

	/**
	 * The branch number.
	 */
	branchNumber: number;

	/**
	 * The line number.
	 */
	lineNumber: number;

	/**
	 * A number indicating how often this branch was taken.
	 */
	taken: number;

	/**
	 * Creates new branch data.
	 * @param options An object providing values to initialize this instance.
	 */
	constructor(options?: BranchDataOptions);

	/**
	 * Creates new branch data from the specified JSON object.
	 * @param json A JSON object representing branch data.
	 * @returns The instance corresponding to the specified JSON object.
	 */
	static fromJson(json: Record<string, any>): BranchData;

	/**
	 * Returns a string representation of this object.
	 * @returns The string representation of this object.
	 */
	toString(): string;
}
