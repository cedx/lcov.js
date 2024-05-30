import {Token} from "./token.js";

/**
 * Provides details for function coverage.
 */
export class FunctionData {

	/**
	 * The execution count.
	 * @type {number}
	 */
	executionCount;

	/**
	 * The function name.
	 * @type {string}
	 */
	functionName;

	/**
	 * The line number of the function start.
	 * @type {number}
	 */
	lineNumber;

	/**
	 * Creates new function data.
	 * @param {Partial<FunctionDataOptions>} options An object providing values to initialize this instance.
	 */
	constructor(options = {}) {
		this.executionCount = options.executionCount ?? 0;
		this.functionName = options.functionName ?? "";
		this.lineNumber = options.lineNumber ?? 0;
	}

	/**
	 * Creates new function data from the specified JSON object.
	 * @param {Record<string, any>} json A JSON object representing function data.
	 * @returns {FunctionData} The instance corresponding to the specified JSON object.
	 */
	static fromJson(json) {
		return new this({
			executionCount: typeof json.executionCount == "number" && Number.isInteger(json.executionCount) ? json.executionCount : 0,
			functionName: typeof json.functionName == "string" ? json.functionName : "",
			lineNumber: typeof json.lineNumber == "number" && Number.isInteger(json.lineNumber) ? json.lineNumber : 0
		});
	}

	/**
	 * Returns a string representation of this object.
	 * @param {Partial<{asDefinition: boolean}>} options Value indicating whether to return the function definition instead of its data.
	 * @returns {string} The string representation of this object.
	 */
	toString(options = {}) {
		const token = options.asDefinition ? Token.functionName : Token.functionData;
		const count = options.asDefinition ? this.lineNumber : this.executionCount;
		return `${token}:${count},${this.functionName}`;
	}
}

/**
 * Defines the options of a {@link FunctionData} instance.
 * @typedef {object} FunctionDataOptions
 * @property {number} executionCount The execution count.
 * @property {string} functionName The function name.
 * @property {number} lineNumber The line number of the function start.
 */

/**
 * Provides the coverage data of functions.
 */
export class FunctionCoverage {

	/**
	 * The coverage data.
	 * @type {FunctionData[]}
	 */
	data;

	/**
	 * The number of functions found.
	 * @type {number}
	 */
	found;

	/**
	 * The number of functions hit.
	 * @type {number}
	 */
	hit;

	/**
	 * Creates a new function coverage.
	 * @param {Partial<FunctionCoverageOptions>} options An object providing values to initialize this instance.
	 */
	constructor(options = {}) {
		this.data = options.data ?? [];
		this.found = options.found ?? 0;
		this.hit = options.hit ?? 0;
	}

	/**
	 * Creates a new function coverage from the specified JSON object.
	 * @param {Record<string, any>} json A JSON object representing a function coverage.
	 * @returns {FunctionCoverage} The instance corresponding to the specified JSON object.
	 */
	static fromJson(json) {
		return new this({
			data: Array.isArray(json.data) ? json.data.map(item => FunctionData.fromJson(item)) : [],
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
			...this.data.map(item => item.toString({asDefinition: true})),
			...this.data.map(item => item.toString({asDefinition: false})),
			`${Token.functionsFound}:${this.found}`,
			`${Token.functionsHit}:${this.hit}`
		].join("\n");
	}
}

/**
 * Defines the options of a {@link FunctionCoverage} instance.
 * @typedef {object} FunctionCoverageOptions
 * @property {FunctionData[]} data The coverage data.
 * @property {number} found The number of functions found.
 * @property {number} hit The number of functions hit.
 */
