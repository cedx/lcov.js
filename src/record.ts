import {BranchCoverage} from "./branch.js";
import {FunctionCoverage} from "./function.js";
import {JsonObject} from "./json.js";
import {LineCoverage} from "./line.js";
import {Token} from "./token.js";

/** Provides the coverage data of a source file. */
export class Record {

	/** The branch coverage. */
	branches?: BranchCoverage;

	/** The function coverage. */
	functions?: FunctionCoverage;

	/** The line coverage. */
	lines?: LineCoverage;

	/**
	 * Creates a new record.
	 * @param sourceFile The path to the source file.
	 * @param options An object specifying values used to initialize this instance.
	 */
	constructor(public sourceFile: string, options: Partial<RecordOptions> = {}) {
		const {branches, functions, lines} = options;
		this.branches = branches;
		this.functions = functions;
		this.lines = lines;
	}

	/**
	 * Creates a new record from the specified JSON object.
	 * @param map A JSON object representing a record.
	 * @returns The instance corresponding to the specified JSON object.
	 */
	static fromJson(map: JsonObject): Record {
		return new Record(typeof map.sourceFile == "string" ? map.sourceFile : "", {
			branches: typeof map.branches == "object" && map.branches ? BranchCoverage.fromJson(map.branches as JsonObject) : undefined,
			functions: typeof map.functions == "object" && map.functions ? FunctionCoverage.fromJson(map.functions as JsonObject) : undefined,
			lines: typeof map.lines == "object" && map.lines ? LineCoverage.fromJson(map.lines as JsonObject) : undefined
		});
	}

	/**
	 * Converts this object to a map in JSON format.
	 * @returns The map in JSON format corresponding to this object.
	 */
	toJSON(): JsonObject {
		return {
			branches: this.branches ? this.branches.toJSON() : null,
			functions: this.functions ? this.functions.toJSON() : null,
			lines: this.lines ? this.lines.toJSON() : null,
			sourceFile: this.sourceFile
		};
	}

	/**
	 * Returns a string representation of this object.
	 * @returns The string representation of this object.
	 */
	toString(): string {
		const output = [`${Token.sourceFile}:${this.sourceFile}`];
		if (this.functions) output.push(this.functions.toString());
		if (this.branches) output.push(this.branches.toString());
		if (this.lines) output.push(this.lines.toString());
		output.push(Token.endOfRecord);
		return output.join("\n");
	}
}

/** Defines the options of a [[Record]] instance. */
export interface RecordOptions {

	/** The branch coverage. */
	branches: BranchCoverage;

	/** The function coverage. */
	functions: FunctionCoverage;

	/** The line coverage. */
	lines: LineCoverage;
}
