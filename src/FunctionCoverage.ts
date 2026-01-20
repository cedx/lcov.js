import type {FunctionData} from "./FunctionData.js";
import {Tokens} from "./Tokens.js";

/**
 * Provides the coverage data of functions.
 */
export class FunctionCoverage {

	/**
	 * The coverage data.
	 */
	data: FunctionData[];

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
	constructor(options: FunctionCoverageOptions = {}) {
		this.data = options.data ?? [];
		this.found = Math.max(0, options.found ?? 0);
		this.hit = Math.max(0, options.hit ?? 0);
	}

	/**
	 * Returns a string representation of this object.
	 * @returns The string representation of this object.
	 */
	toString(): string {
		return [
			...this.data.map(item => item.toString({asDefinition: true})),
			...this.data.map(item => item.toString({asDefinition: false})),
			`${Tokens.FunctionsFound}:${this.found}`,
			`${Tokens.FunctionsHit}:${this.hit}`
		].join("\n");
	}
}

/**
 * Defines the options of a {@link FunctionCoverage} instance.
 */
export type FunctionCoverageOptions = Partial<Omit<FunctionCoverage, "toString">>;
