import {Token} from "./token.js";

/**
 * Provides the coverage data of branches.
 */
export class BranchCoverage {

	/**
	 * The coverage data.
	 */
	data: Array<BranchData>;

	/**
	 * The number of branches found.
	 */
	found: number;

	/**
	 * The number of branches hit.
	 */
	hit: number;

	/**
	 * Creates a new branch coverage.
	 * @param options An object providing values to initialize this instance.
	 */
	constructor(options: BranchCoverageOptions = {}) {
		this.data = options.data ?? [];
		this.found = options.found ?? 0;
		this.hit = options.hit ?? 0;
	}

	/**
	 * Creates a new branch coverage from the specified JSON object.
	 * @param json A JSON object representing a branch coverage.
	 * @returns The instance corresponding to the specified JSON object.
	 */
	static fromJson(json: Record<string, any>): BranchCoverage {
		return new this({
			data: Array.isArray(json.data) ? json.data.map(item => BranchData.fromJson(item as Record<string, any>)) : [],
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
			...this.data.map(item => item.toString()),
			`${Token.branchesFound}:${this.found}`,
			`${Token.branchesHit}:${this.hit}`
		].join("\n");
	}
}

/**
 * Defines the options of a {@link BranchCoverage} instance.
 */
export type BranchCoverageOptions = Partial<{

	/**
	 * The coverage data.
	 */
	data: Array<BranchData>;

	/**
	 * The number of branches found.
	 */
	found: number;

	/**
	 * The number of branches hit.
	 */
	hit: number;
}>;

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
		const value = `${Token.branchData}:${this.lineNumber},${this.blockNumber},${this.branchNumber}`;
		return this.taken > 0 ? `${value},${this.taken}` : `${value},-`;
	}
}

/**
 * Defines the options of a {@link BranchData} instance.
 */
export type BranchDataOptions = Partial<{

	/**
	 * The block number.
	 */
	blockNumber: number,

	/**
	 * The branch number.
	 */
	branchNumber: number,

	/**
	 * The line number.
	 */
	lineNumber: number,

	/**
	 * A number indicating how often this branch was taken.
	 */
	taken: number
}>;
