import {Token} from "./token.js";

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
	constructor(options: Partial<FunctionDataOptions> = {}) {
		this.executionCount = options.executionCount ?? 0;
		this.functionName = options.functionName ?? "";
		this.lineNumber = options.lineNumber ?? 0;
	}

	/**
	 * Creates new function data from the specified JSON object.
	 * @param json A JSON object representing function data.
	 * @returns The instance corresponding to the specified JSON object.
	 */
	static fromJson(json: Record<string, any>): FunctionData {
		return new this({
			executionCount: Number.isInteger(json.executionCount) ? json.executionCount as number : 0,
			functionName: typeof json.functionName == "string" ? json.functionName : "",
			lineNumber: Number.isInteger(json.lineNumber) ? json.lineNumber as number : 0
		});
	}

	/**
	 * Returns a string representation of this object.
	 * @param options Value indicating whether to return the function definition instead of its data.
	 * @returns The string representation of this object.
	 */
	toString(options: Partial<{asDefinition: boolean}> = {}): string {
		const token = options.asDefinition ? Token.functionName : Token.functionData;
		const count = options.asDefinition ? this.lineNumber : this.executionCount;
		return `${token}:${count},${this.functionName}`;
	}
}

/**
 * Defines the options of a {@link FunctionData} instance.
 */
export interface FunctionDataOptions {

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
}

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
	constructor(options: Partial<FunctionCoverageOptions> = {}) {
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
export interface FunctionCoverageOptions {

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
}
