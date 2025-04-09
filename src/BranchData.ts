import {Tokens} from "./Tokens.js";

/**
 * Provides details for branch coverage.
 */
export class BranchData {

	/**
	 * The block number.
	 */
	blockNumber: number;

	/**
	 * The branch number.
	 */
	branchNumber: number;

	/**
	 * The line number.
	 */
	lineNumber: number;

	/**
	 * A number indicating how often this branch was taken.
	 */
	taken: number;

	/**
	 * Creates new branch data.
	 * @param options An object providing values to initialize this instance.
	 */
	constructor(options: BranchDataOptions = {}) {
		this.blockNumber = options.blockNumber ?? 0;
		this.branchNumber = options.branchNumber ?? 0;
		this.lineNumber = options.lineNumber ?? 0;
		this.taken = options.taken ?? 0;
	}

	/**
	 * Creates new branch data from the specified JSON object.
	 * @param json A JSON object representing branch data.
	 * @returns The instance corresponding to the specified JSON object.
	 */
	static fromJson(json: Record<string, any>): BranchData {
		return new this({
			blockNumber: Number.isInteger(json.blockNumber) ? json.blockNumber as number : 0,
			branchNumber: Number.isInteger(json.branchNumber) ? json.branchNumber as number : 0,
			lineNumber: Number.isInteger(json.lineNumber) ? json.lineNumber as number : 0,
			taken: Number.isInteger(json.taken) ? json.taken as number : 0
		});
	}

	/**
	 * Returns a string representation of this object.
	 * @returns The string representation of this object.
	 */
	toString(): string {
		const value = `${Tokens.BranchData}:${this.lineNumber},${this.blockNumber},${this.branchNumber}`;
		return this.taken > 0 ? `${value},${this.taken}` : `${value},-`;
	}
}

/**
 * Defines the options of a {@link BranchData} instance.
 */
export type BranchDataOptions = Partial<Omit<BranchData, "toString">>;
