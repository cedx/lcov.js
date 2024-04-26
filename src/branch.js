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
	 * Creates new branch data.
	 * @param {Partial<BranchDataOptions>} options An object providing values to initialize this instance.
	 */
	constructor(options = {}) {
		this.blockNumber = options.blockNumber ?? 0;
		this.branchNumber = options.branchNumber ?? 0;
		this.lineNumber = options.lineNumber ?? 0;
		this.taken = options.taken ?? 0;
	}

	/**
	 * Creates new branch data from the specified JSON object.
	 * @param {Record<string, any>} json A JSON object representing branch data.
	 * @returns {BranchData} The instance corresponding to the specified JSON object.
	 */
	static fromJson(json) {
		return new this({
			blockNumber: typeof json.blockNumber == "number" && Number.isInteger(json.blockNumber) ? json.blockNumber : 0,
			branchNumber: typeof json.branchNumber == "number" && Number.isInteger(json.branchNumber) ? json.branchNumber : 0,
			lineNumber: typeof json.lineNumber == "number" && Number.isInteger(json.lineNumber) ? json.lineNumber : 0,
			taken: typeof json.taken == "number" && Number.isInteger(json.taken) ? json.taken : 0
		});
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
	 * @param {Partial<BranchCoverageOptions>} options An object providing values to initialize this instance.
	 */
	constructor(options = {}) {
		this.data = options.data ?? [];
		this.found = options.found ?? 0;
		this.hit = options.hit ?? 0;
	}

	/**
	 * Creates a new branch coverage from the specified JSON object.
	 * @param {Record<string, any>} json A JSON object representing a branch coverage.
	 * @returns {BranchCoverage} The instance corresponding to the specified JSON object.
	 */
	static fromJson(json) {
		return new this({
			data: Array.isArray(json.data) ? json.data.map(item => BranchData.fromJson(item)) : [],
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
