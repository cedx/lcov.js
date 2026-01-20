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
