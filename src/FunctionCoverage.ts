import {FunctionData} from "./FunctionData.js";
import {Token} from "./Token.js";

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
		this.found = options.found ?? 0;
		this.hit = options.hit ?? 0;
	}

	/**
	 * Creates a new function coverage from the specified JSON object.
	 * @param json A JSON object representing a function coverage.
	 * @returns The instance corresponding to the specified JSON object.
	 */
	static fromJson(json: Record<string, any>): FunctionCoverage {
		return new this({
			data: Array.isArray(json.data) ? json.data.map(item => FunctionData.fromJson(item as Record<string, any>)) : [],
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
			...this.data.map(item => item.toString({asDefinition: true})),
			...this.data.map(item => item.toString({asDefinition: false})),
			`${Token.functionsFound}:${this.found}`,
			`${Token.functionsHit}:${this.hit}`
		].join("\n");
	}
}

/**
 * Defines the options of a {@link FunctionCoverage} instance.
 */
export type FunctionCoverageOptions = Partial<Omit<FunctionCoverage, "toString">>;
