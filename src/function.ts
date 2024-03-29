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
			executionCount: typeof json.executionCount == "number" && Number.isInteger(json.executionCount) ? json.executionCount : 0,
			functionName: typeof json.functionName == "string" ? json.functionName : "",
			lineNumber: typeof json.lineNumber == "number" && Number.isInteger(json.lineNumber) ? json.lineNumber : 0
		});
	}

	/**
	 * Returns a string representation of this object.
	 * @param asDefinition Whether to return the function definition instead of its data.
	 * @returns The string representation of this object.
	 */
	toString(asDefinition = false): string {
		const token = asDefinition ? Token.functionName : Token.functionData;
		const count = asDefinition ? this.lineNumber : this.executionCount;
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
			found: typeof json.found == "number" && Number.isInteger(json.found) ? json.found : 0,
			hit: typeof json.hit == "number" && Number.isInteger(json.hit) ? json.hit : 0
		});
	}

	/**
	 * Returns a string representation of this object.
	 * @returns The string representation of this object.
	 */
	toString(): string {
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
