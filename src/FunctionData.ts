import {Token} from "./Token.js";

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
	toString(options: {asDefinition?: boolean} = {}): string {
		const token = options.asDefinition ? Token.functionName : Token.functionData;
		const count = options.asDefinition ? this.lineNumber : this.executionCount;
		return `${token}:${count},${this.functionName}`;
	}
}

/**
 * Defines the options of a {@link FunctionData} instance.
 */
export type FunctionDataOptions = Partial<Omit<FunctionData, "toString">>;
