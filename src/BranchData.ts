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
		this.blockNumber = Math.max(0, options.blockNumber ?? 0);
		this.branchNumber = Math.max(0, options.branchNumber ?? 0);
		this.lineNumber = Math.max(0, options.lineNumber ?? 0);
		this.taken = Math.max(0, options.taken ?? 0);
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
