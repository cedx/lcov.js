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
	 * Creates a new function data.
	 * @param {Partial<FunctionDataOptions>} [options] An object providing values to initialize this instance.
	 */
	constructor(options = {}) {
		const {executionCount = 0, functionName = "", lineNumber = 0} = options;
		this.executionCount = executionCount;
		this.functionName = functionName;
		this.lineNumber = lineNumber;
	}

	/**
	 * Converts this object to a map in JSON format.
	 * @returns {FunctionDataOptions} The map in JSON format corresponding to this object.
	 */
	toJSON() {
		return {
			executionCount: this.executionCount,
			functionName: this.functionName,
			lineNumber: this.lineNumber
		};
	}

	/**
	 * Returns a string representation of this object.
	 * @param {boolean} [asDefinition] Whether to return the function definition (i.e. name and line number) instead of its data (i.e. name and execution count).
	 * @returns {string} The string representation of this object.
	 */
	toString(asDefinition = false) {
		const token = asDefinition ? Token.functionName : Token.functionData;
		const count = asDefinition ? this.lineNumber : this.executionCount;
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
	 * @param {Partial<FunctionCoverageOptions>} [options] An object providing values to initialize this instance.
	 */
	constructor(options = {}) {
		const {data = [], found = 0, hit = 0} = options;
		this.data = data;
		this.found = found;
		this.hit = hit;
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
			...this.data.map(item => item.toString(true)),
			...this.data.map(item => item.toString(false)),
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
