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
	 * Creates a new line data.
	 * @param {Partial<LineDataOptions>} [options] An object providing values to initialize this instance.
	 */
	constructor(options = {}) {
		this.checksum = options.checksum ?? "";
		this.executionCount = options.executionCount ?? 0;
		this.lineNumber = options.lineNumber ?? 0;
	}

	/**
	 * Creates a new line data from the specified JSON object.
	 * @param {Record<string, any>} map A JSON object representing a line data.
	 * @returns {LineData} The instance corresponding to the specified JSON object.
	 */
	static fromJson(map) {
		return new this({
			checksum: typeof map.checksum == "string" ? map.checksum : "",
			executionCount: Number.isInteger(map.executionCount) ? map.executionCount : 0,
			lineNumber: Number.isInteger(map.lineNumber) ? map.lineNumber : 0
		});
	}

	/**
	 * Converts this object to a map in JSON format.
	 * @returns {Record<string, any>} The map in JSON format corresponding to this object.
	 */
	toJSON() {
		return {
			checksum: this.checksum,
			executionCount: this.executionCount,
			lineNumber: this.lineNumber
		};
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
	 * @param {Partial<LineCoverageOptions>} [options] An object providing values to initialize this instance.
	 */
	constructor(options = {}) {
		this.data = options.data ?? [];
		this.found = options.found ?? 0;
		this.hit = options.hit ?? 0;
	}

	/**
	 * Creates a new line coverage from the specified JSON object.
	 * @param {Record<string, any>} map A JSON object representing a line coverage.
	 * @returns {LineCoverage} The instance corresponding to the specified JSON object.
	 */
	static fromJson(map) {
		return new this({
			data: Array.isArray(map.data) ? map.data.map(item => LineData.fromJson(item)) : [],
			found: Number.isInteger(map.found) ? map.found : 0,
			hit: Number.isInteger(map.hit) ? map.hit : 0
		});
	}

	/**
	 * Converts this object to a map in JSON format.
	 * @returns {Record<string, any>} The map in JSON format corresponding to this object.
	 */
	toJSON() {
		return {
			data: this.data.map(item => item.toJSON()),
			found: this.found,
			hit: this.hit
		};
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
