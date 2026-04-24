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
	 * @returns The string representation of this object.
	 */
	toString(): string {
		return [
			`${Tokens.FunctionName}:${this.lineNumber},${this.functionName}`,
			`${Tokens.FunctionData}:${this.executionCount},${this.functionName}`
		].join("\n");
	}
}

/**
 * Defines the options of a {@link FunctionData} instance.
 */
export type FunctionDataOptions = Partial<Omit<FunctionData, "toString">>;
