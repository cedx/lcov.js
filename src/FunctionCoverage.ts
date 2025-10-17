import {Tokens} from "./Tokens.js";

/**
 * Provides details for function coverage.
 */
export class FunctionData {

	/**
	 * The execution count.
	 */
	executionCount: number;

	/**
	 * The function name.
	 */
	functionName: string;

	/**
	 * The line number of the function start.
	 */
	lineNumber: number;

	/**
	 * Creates new function data.
	 * @param options An object providing values to initialize this instance.
	 */
	constructor(options: FunctionDataOptions = {}) {
		this.executionCount = Math.max(0, options.executionCount ?? 0);
		this.functionName = options.functionName ?? "";
		this.lineNumber = Math.max(0, options.lineNumber ?? 0);
	}

	/**
	 * Returns a string representation of this object.
	 * @param options Value indicating whether to return the function definition instead of its data.
	 * @returns The string representation of this object.
	 */
	toString(options: {asDefinition?: boolean} = {}): string {
		const token = options.asDefinition ? Tokens.FunctionName : Tokens.FunctionData;
		const count = options.asDefinition ? this.lineNumber : this.executionCount;
		return `${token}:${count},${this.functionName}`;
	}
}

/**
 * Defines the options of a {@link FunctionData} instance.
 */
export type FunctionDataOptions = Partial<Omit<FunctionData, "toString">>;

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
