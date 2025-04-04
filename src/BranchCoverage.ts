import {BranchData} from "./BranchData.js";
import {Token} from "./Token.js";

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
export type BranchCoverageOptions = Partial<Omit<BranchCoverage, "toString">>;
