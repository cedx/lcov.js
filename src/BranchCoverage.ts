import type {BranchData} from "./BranchData.js";
import {Tokens} from "./Tokens.js";

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
		this.found = Math.max(0, options.found ?? 0);
		this.hit = Math.max(0, options.hit ?? 0);
	}

	/**
	 * Returns a string representation of this object.
	 * @returns The string representation of this object.
	 */
	toString(): string {
		return [
			...this.data.map(item => item.toString()),
			`${Tokens.BranchesFound}:${this.found}`,
			`${Tokens.BranchesHit}:${this.hit}`
		].join("\n");
	}
}

/**
 * Defines the options of a {@link BranchCoverage} instance.
 */
export type BranchCoverageOptions = Partial<Omit<BranchCoverage, "toString">>;
