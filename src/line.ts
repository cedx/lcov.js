import {JsonObject} from "./json.js";
import {Token} from "./token.js";

/** Provides the coverage data of lines. */
export class LineCoverage {

	/**
	 * Creates a new line coverage.
	 * @param found The number of lines found.
	 * @param hit The number of lines found.
	 * @param data The coverage data.
	 */
	constructor(public found: number = 0, public hit: number = 0, public data: LineData[] = []) {}

	/**
	 * Creates a new line coverage from the specified JSON object.
	 * @param map A JSON object representing a line coverage.
	 * @returns The instance corresponding to the specified JSON object.
	 */
	static fromJson(map: JsonObject): LineCoverage {
		return new LineCoverage(
			typeof map.found == "number" && Number.isInteger(map.found) ? map.found : 0,
			typeof map.hit == "number" && Number.isInteger(map.hit) ? map.hit : 0,
			Array.isArray(map.data) ? map.data.map(item => LineData.fromJson(item as JsonObject)) : []
		);
	}

	/**
	 * Converts this object to a map in JSON format.
	 * @returns The map in JSON format corresponding to this object.
	 */
	toJSON(): JsonObject {
		return {
			data: this.data.map(item => item.toJSON()),
			found: this.found,
			hit: this.hit
		};
	}

	/**
	 * Returns a string representation of this object.
	 * @returns The string representation of this object.
	 */
	toString(): string {
		const lines = this.data.map(item => item.toString());
		lines.push(`${Token.linesFound}:${this.found}`, `${Token.linesHit}:${this.hit}`);
		return lines.join("\n");
	}
}
