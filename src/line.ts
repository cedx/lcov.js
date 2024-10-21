import {Token} from "./token.js";

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
	constructor(options: LineDataOptions = {}) {
		this.checksum = options.checksum ?? "";
		this.executionCount = options.executionCount ?? 0;
		this.lineNumber = options.lineNumber ?? 0;
	}

	/**
	 * Creates new line data from the specified JSON object.
	 * @param json A JSON object representing line data.
	 * @returns The instance corresponding to the specified JSON object.
	 */
	static fromJson(json: Record<string, any>): LineData {
		return new this({
			checksum: typeof json.checksum == "string" ? json.checksum : "",
			executionCount: Number.isInteger(json.executionCount) ? json.executionCount as number : 0,
			lineNumber: Number.isInteger(json.lineNumber) ? json.lineNumber as number : 0
		});
	}

	/**
	 * Returns a string representation of this object.
	 * @returns The string representation of this object.
	 */
	toString(): string {
		const value = `${Token.lineData}:${this.lineNumber},${this.executionCount}`;
		return this.checksum ? `${value},${this.checksum}` : value;
	}
}

/**
 * Defines the options of a {@link LineData} instance.
 */
export type LineDataOptions = Partial<{

	/**
	 * The data checksum.
	 */
	checksum: string,

	/**
	 * The execution count.
	 */
	executionCount: number,

	/**
	 * The line number.
	 */
	lineNumber: number
}>;

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
	constructor(options: LineCoverageOptions = {}) {
		this.data = options.data ?? [];
		this.found = options.found ?? 0;
		this.hit = options.hit ?? 0;
	}

	/**
	 * Creates a new line coverage from the specified JSON object.
	 * @param json A JSON object representing a line coverage.
	 * @returns The instance corresponding to the specified JSON object.
	 */
	static fromJson(json: Record<string, any>): LineCoverage {
		return new this({
			data: Array.isArray(json.data) ? json.data.map(item => LineData.fromJson(item as Record<string, any>)) : [],
			found: Number.isInteger(json.found) ? json.found as number : 0,
			hit: Number.isInteger(json.hit) ? json.hit as number : 0
		});
	}

	/**
	 * Returns a string representation of this object.
	 * @returns The string representation of this object.
	 */
	toString(): string {
		return [
			...this.data.map(item => item.toString()),
			`${Token.linesFound}:${this.found}`,
			`${Token.linesHit}:${this.hit}`
		].join("\n");
	}
}

/**
 * Defines the options of a {@link LineCoverage} instance.
 */
export type LineCoverageOptions = Partial<{

	/**
	 * The coverage data.
	 */
	data: Array<LineData>,

	/**
	 * The number of lines found.
	 */
	found: number,

	/**
	 * The number of lines hit.
	 */
	hit: number
}>;
