import {Tokens} from "./Tokens.js";

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
		this.executionCount = Math.max(0, options.executionCount ?? 0);
		this.lineNumber = Math.max(0, options.lineNumber ?? 0);
	}

	/**
	 * Returns a string representation of this object.
	 * @returns The string representation of this object.
	 */
	toString(): string {
		const value = `${Tokens.LineData}:${this.lineNumber},${this.executionCount}`;
		return this.checksum ? `${value},${this.checksum}` : value;
	}
}

/**
 * Defines the options of a {@link LineData} instance.
 */
export type LineDataOptions = Partial<Omit<LineData, "toString">>;
