/**
 * Provides the coverage data of functions.
 */
export class FunctionCoverage {

	/**
	 * The coverage data.
	 */
	data: Array<FunctionData>;

	/**
	 * The number of functions found.
	 */
	found: number;

	/**
	 * The number of functions hit.
	 */
	hit: number;

	/**
	 * Creates a new function coverage.
	 * @param options An object providing values to initialize this instance.
	 */
	constructor(options?: FunctionCoverageOptions);

	/**
	 * Creates a new function coverage from the specified JSON object.
	 * @param json A JSON object representing a function coverage.
	 * @returns The instance corresponding to the specified JSON object.
	 */
	static fromJson(json: Record<string, any>): FunctionCoverage;

	/**
	 * Returns a string representation of this object.
	 * @returns The string representation of this object.
	 */
	toString(): string;
}

/**
 * Defines the options of a {@link FunctionCoverage} instance.
 */
export type FunctionCoverageOptions = Partial<{

	/**
	 * The coverage data.
	 */
	data: Array<FunctionData>;

	/**
	 * The number of functions found.
	 */
	found: number;

	/**
	 * The number of functions hit.
	 */
	hit: number;
}>;

/**
 * Provides details for function coverage.
 */
export class FunctionData {

	/**
	 * The execution count.
	 */
	executionCount: number;

	/**
	 * The function name.
	 */
	functionName: string;

	/**
	 * The line number of the function start.
	 */
	lineNumber: number;

	/**
	 * Creates new function data.
	 * @param options An object providing values to initialize this instance.
	 */
	constructor(options?: FunctionDataOptions);

	/**
	 * Creates new function data from the specified JSON object.
	 * @param json A JSON object representing function data.
	 * @returns The instance corresponding to the specified JSON object.
	 */
	static fromJson(json: Record<string, any>): FunctionData;

	/**
	 * Returns a string representation of this object.
	 * @param options Value indicating whether to return the function definition instead of its data.
	 * @returns The string representation of this object.
	 */
	toString(options?: Partial<{asDefinition: boolean}>): string;
}

/**
 * Defines the options of a {@link FunctionData} instance.
 */
export type FunctionDataOptions = Partial<{

	/**
	 * The execution count.
	 */
	executionCount: number;

	/**
	 * The function name.
	 */
	functionName: string;

	/**
	 * The line number of the function start.
	 */
	lineNumber: number;
}>;
