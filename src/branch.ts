import {Token} from "./token.js";

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
	constructor(options: Partial<BranchDataOptions> = {}) {
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
			blockNumber: typeof json.blockNumber == "number" && Number.isInteger(json.blockNumber) ? json.blockNumber : 0,
			branchNumber: typeof json.branchNumber == "number" && Number.isInteger(json.branchNumber) ? json.branchNumber : 0,
			lineNumber: typeof json.lineNumber == "number" && Number.isInteger(json.lineNumber) ? json.lineNumber : 0,
			taken: typeof json.taken == "number" && Number.isInteger(json.taken) ? json.taken : 0
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
export interface BranchDataOptions {

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
}

/**
 * Provides the coverage data of branches.
 */
export class BranchCoverage {

	/**
	 * The coverage data.
	 */
	data: BranchData[];

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
	constructor(options: Partial<BranchCoverageOptions> = {}) {
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
			...this.data.map(item => item.toString()),
			`${Token.branchesFound}:${this.found}`,
			`${Token.branchesHit}:${this.hit}`
		].join("\n");
	}
}

/**
 * Defines the options of a {@link BranchCoverage} instance.
 */
export interface BranchCoverageOptions {

	/**
	 * The coverage data.
	 */
	data: BranchData[];

	/**
	 * The number of branches found.
	 */
	found: number;

	/**
	 * The number of branches hit.
	 */
	hit: number;
}
