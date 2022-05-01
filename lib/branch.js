import {Token} from "./token.js";

/**
 * Provides details for branch coverage.
 */
export class BranchData {

	/**
	 * The block number.
	 * @type {number}
	 */
	blockNumber;

	/**
	 * The branch number.
	 * @type {number}
	 */
	branchNumber;

	/**
	 * The line number.
	 * @type {number}
	 */
	lineNumber;

	/**
	 * A number indicating how often this branch was taken.
	 * @type {number}
	 */
	taken;

	/**
	 * Creates a new branch data.
	 * @param {Partial<BranchDataOptions>} [options] An object providing values to initialize this instance.
	 */
	constructor(options = {}) {
		const {blockNumber = 0, branchNumber = 0, lineNumber = 0, taken = 0} = options;
		this.blockNumber = blockNumber;
		this.branchNumber = branchNumber;
		this.lineNumber = lineNumber;
		this.taken = taken;
	}

	/**
	 * Creates a new branch data from the specified JSON object.
	 * @param {Record<string, any>} map A JSON object representing a branch data.
	 * @returns {BranchData} The instance corresponding to the specified JSON object.
	 */
	static fromJson(map) {
		return new this({
			blockNumber: typeof map.blockNumber == "number" && Number.isInteger(map.blockNumber) ? map.blockNumber : 0,
			branchNumber: typeof map.branchNumber == "number" && Number.isInteger(map.branchNumber) ? map.branchNumber : 0,
			lineNumber: typeof map.lineNumber == "number" && Number.isInteger(map.lineNumber) ? map.lineNumber : 0,
			taken: typeof map.taken == "number" && Number.isInteger(map.taken) ? map.taken : 0
		});
	}

	/**
	 * Converts this object to a map in JSON format.
	 * @returns {Record<string, any>} The map in JSON format corresponding to this object.
	 */
	toJSON() {
		return {
			blockNumber: this.blockNumber,
			branchNumber: this.branchNumber,
			lineNumber: this.lineNumber,
			taken: this.taken
		};
	}

	/**
	 * Returns a string representation of this object.
	 * @returns {string} The string representation of this object.
	 */
	toString() {
		const value = `${Token.branchData}:${this.lineNumber},${this.blockNumber},${this.branchNumber}`;
		return this.taken > 0 ? `${value},${this.taken}` : `${value},-`;
	}
}

/**
 * Defines the options of a {@link BranchData} instance.
 * @typedef {object} BranchDataOptions
 * @property {number} blockNumber The block number.
 * @property {number} branchNumber The branch number.
 * @property {number} lineNumber The line number.
 * @property {number} taken A number indicating how often this branch was taken.
 */

/**
 * Provides the coverage data of branches.
 */
export class BranchCoverage {

	/**
	 * The coverage data.
	 * @type {BranchData[]}
	 */
	data;

	/**
	 * The number of branches found.
	 * @type {number}
	 */
	found;

	/**
	 * The number of branches hit.
	 * @type {number}
	 */
	hit;

	/**
	 * Creates a new branch coverage.
	 * @param {Partial<BranchCoverageOptions>} [options] An object providing values to initialize this instance.
	 */
	constructor(options = {}) {
		const {data = [], found = 0, hit = 0} = options;
		this.data = data;
		this.found = found;
		this.hit = hit;
	}

	/**
	 * Creates a new branch coverage from the specified JSON object.
	 * @param {Record<string, any>} map A JSON object representing a branch coverage.
	 * @returns {BranchCoverage} The instance corresponding to the specified JSON object.
	 */
	static fromJson(map) {
		return new this({
			data: Array.isArray(map.data) ? map.data.map(item => BranchData.fromJson(item)) : [],
			found: typeof map.found == "number" && Number.isInteger(map.found) ? map.found : 0,
			hit: typeof map.hit == "number" && Number.isInteger(map.hit) ? map.hit : 0
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
			`${Token.branchesFound}:${this.found}`,
			`${Token.branchesHit}:${this.hit}`
		].join("\n");
	}
}

/**
 * Defines the options of a {@link BranchCoverage} instance.
 * @typedef {object} BranchCoverageOptions
 * @property {BranchData[]} data The coverage data.
 * @property {number} found The number of branches found.
 * @property {number} hit The number of branches hit.
 */
