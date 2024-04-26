import {Token} from "./token.js";

/**
 * Provides details for line coverage.
 */
export class LineData {

	/**
	 * The data checksum.
	 * @type {string}
	 */
	checksum;

	/**
	 * The execution count.
	 * @type {number}
	 */
	executionCount;

	/**
	 * The line number.
	 * @type {number}
	 */
	lineNumber;

	/**
	 * Creates new line data.
	 * @param {Partial<LineDataOptions>} options An object providing values to initialize this instance.
	 */
	constructor(options = {}) {
		this.checksum = options.checksum ?? "";
		this.executionCount = options.executionCount ?? 0;
		this.lineNumber = options.lineNumber ?? 0;
	}

	/**
	 * Creates new line data from the specified JSON object.
	 * @param {Record<string, any>} json A JSON object representing line data.
	 * @returns {LineData} The instance corresponding to the specified JSON object.
	 */
	static fromJson(json) {
		return new this({
			checksum: typeof json.checksum == "string" ? json.checksum : "",
			executionCount: typeof json.executionCount == "number" && Number.isInteger(json.executionCount) ? json.executionCount : 0,
			lineNumber: typeof json.lineNumber == "number" && Number.isInteger(json.lineNumber) ? json.lineNumber : 0
		});
	}

	/**
	 * Returns a string representation of this object.
	 * @returns {string} The string representation of this object.
	 */
	toString() {
		const value = `${Token.lineData}:${this.lineNumber},${this.executionCount}`;
		return this.checksum ? `${value},${this.checksum}` : value;
	}
}

/**
 * Defines the options of a {@link LineData} instance.
 * @typedef {object} LineDataOptions
 * @property {string} checksum The data checksum.
 * @property {number} executionCount The execution count.
 * @property {number} lineNumber The line number.
 */

/**
 * Provides the coverage data of lines.
 */
export class LineCoverage {

	/**
	 * The coverage data.
	 * @type {LineData[]}
	 */
	data;

	/**
	 * The number of lines found.
	 * @type {number}
	 */
	found;

	/**
	 * The number of lines hit.
	 * @type {number}
	 */
	hit;

	/**
	 * Creates a new line coverage.
	 * @param {Partial<LineCoverageOptions>} options An object providing values to initialize this instance.
	 */
	constructor(options = {}) {
		this.data = options.data ?? [];
		this.found = options.found ?? 0;
		this.hit = options.hit ?? 0;
	}

	/**
	 * Creates a new line coverage from the specified JSON object.
	 * @param {Record<string, any>} json A JSON object representing a line coverage.
	 * @returns {LineCoverage} The instance corresponding to the specified JSON object.
	 */
	static fromJson(json) {
		return new this({
			data: Array.isArray(json.data) ? json.data.map(item => LineData.fromJson(item)) : [],
			found: typeof json.found == "number" && Number.isInteger(json.found) ? json.found : 0,
			hit: typeof json.hit == "number" && Number.isInteger(json.hit) ? json.hit : 0
		});
	}

	/**
	 * Returns a string representation of this object.
	 * @returns {string} The string representation of this object.
	 */
	toString() {
		return [
			...this.data.map(item => item.toString()),
			`${Token.linesFound}:${this.found}`,
			`${Token.linesHit}:${this.hit}`
		].join("\n");
	}
}

/**
 * Defines the options of a {@link LineCoverage} instance.
 * @typedef {object} LineCoverageOptions
 * @property {LineData[]} data The coverage data.
 * @property {number} found The number of lines found.
 * @property {number} hit The number of lines hit.
 */
