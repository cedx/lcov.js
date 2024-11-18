/**
 * Provides the coverage data of lines.
 */
export class LineCoverage {

	/**
	 * The coverage data.
	 */
	data: Array<LineData>;

	/**
	 * The number of lines found.
	 */
	found: number;

	/**
	 * The number of lines hit.
	 */
	hit: number;

	/**
	 * Creates a new line coverage.
	 * @param options An object providing values to initialize this instance.
	 */
	constructor(options?: LineCoverageOptions);

	/**
	 * Creates a new line coverage from the specified JSON object.
	 * @param json A JSON object representing a line coverage.
	 * @returns The instance corresponding to the specified JSON object.
	 */
	static fromJson(json: Record<string, any>): LineCoverage;
}

/**
 * Defines the options of a {@link LineCoverage} instance.
 */
export type LineCoverageOptions = Partial<{

	/**
	 * The coverage data.
	 */
	data: Array<LineData>;

	/**
	 * The number of lines found.
	 */
	found: number;

	/**
	 * The number of lines hit.
	 */
	hit: number;
}>;

/**
 * Provides details for line coverage.
 */
export class LineData {

	/**
	 * The data checksum.
	 */
	checksum: string;

	/**
	 * The execution count.
	 */
	executionCount: number;

	/**
	 * The line number.
	 */
	lineNumber: number;

	/**
	 * Creates new line data.
	 * @param options An object providing values to initialize this instance.
	 */
	constructor(options?: LineDataOptions);

	/**
	 * Creates new line data from the specified JSON object.
	 * @param json A JSON object representing line data.
	 * @returns The instance corresponding to the specified JSON object.
	 */
	static fromJson(json: Record<string, any>): LineData;
}

/**
 * Defines the options of a {@link LineData} instance.
 */
export type LineDataOptions = Partial<{

	/**
	 * The data checksum.
	 */
	checksum: string;

	/**
	 * The execution count.
	 */
	executionCount: number;

	/**
	 * The line number.
	 */
	lineNumber: number;
}>;
