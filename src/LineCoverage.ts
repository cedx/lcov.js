import {LineData} from "./LineData.js";
import {Token} from "./Token.js";

/**
 * Provides the coverage data of lines.
 */
export class LineCoverage {

	/**
	 * The coverage data.
	 */
	data: LineData[];

	/**
	 * The number of lines found.
	 */
	found: number;

	/**
	 * The number of lines hit.
	 */
	hit: number;

	/**
	 * Creates a new line coverage.
	 * @param options An object providing values to initialize this instance.
	 */
	constructor(options: LineCoverageOptions = {}) {
		this.data = options.data ?? [];
		this.found = options.found ?? 0;
		this.hit = options.hit ?? 0;
	}

	/**
	 * Creates a new line coverage from the specified JSON object.
	 * @param json A JSON object representing a line coverage.
	 * @returns The instance corresponding to the specified JSON object.
	 */
	static fromJson(json: Record<string, any>): LineCoverage {
		return new this({
			data: Array.isArray(json.data) ? json.data.map(item => LineData.fromJson(item as Record<string, any>)) : [],
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
			`${Token.linesFound}:${this.found}`,
			`${Token.linesHit}:${this.hit}`
		].join("\n");
	}
}

/**
 * Defines the options of a {@link LineCoverage} instance.
 */
export type LineCoverageOptions = Partial<Omit<LineCoverage, "toString">>;
