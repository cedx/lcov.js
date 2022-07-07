import {BranchCoverage} from "./branch.js";
import {FunctionCoverage} from "./function.js";
import {LineCoverage} from "./line.js";
import {Token} from "./token.js";

/**
 * Provides the coverage data of a source file.
 */
export class SourceFile {

	/**
	 * The branch coverage.
	 * @type {BranchCoverage|null}
	 */
	branches;

	/**
	 * The branch coverage.
	 * @type {FunctionCoverage|null}
	 */
	functions;

	/**
	 * The line coverage.
	 * @type {LineCoverage|null}
	 */
	lines;

	/**
	 * The path to the source file.
	 * @type {string}
	 */
	path;

	/**
	 * Creates a new source file.
	 * @param {string} path The path to the source file.
	 * @param {Partial<SourceFileOptions>} [options] An object providing values to initialize this instance.
	 */
	constructor(path, options = {}) {
		this.branches = options.branches ?? null;
		this.functions = options.functions ?? null;
		this.lines = options.lines ?? null;
		this.path = path;
	}

	/**
	 * Creates a new source file from the specified JSON object.
	 * @param {Record<string, any>} map A JSON object representing a source file.
	 * @returns {SourceFile} The instance corresponding to the specified JSON object.
	 */
	static fromJson(map) {
		return new this(typeof map.path == "string" ? map.path : "", {
			branches: typeof map.branches == "object" && map.branches ? BranchCoverage.fromJson(map.branches) : null,
			functions: typeof map.functions == "object" && map.functions ? FunctionCoverage.fromJson(map.functions) : null,
			lines: typeof map.lines == "object" && map.lines ? LineCoverage.fromJson(map.lines) : null
		});
	}

	/**
	 * Converts this object to a map in JSON format.
	 * @returns {Record<string, any>} The map in JSON format corresponding to this object.
	 */
	toJSON() {
		return {
			branches: this.branches ? this.branches.toJSON() : null,
			functions: this.functions ? this.functions.toJSON() : null,
			lines: this.lines ? this.lines.toJSON() : null,
			path: this.path
		};
	}

	/**
	 * Returns a string representation of this object.
	 * @returns {string} The string representation of this object.
	 */
	toString() {
		const output = [`${Token.sourceFile}:${this.path}`];
		if (this.functions) output.push(this.functions.toString());
		if (this.branches) output.push(this.branches.toString());
		if (this.lines) output.push(this.lines.toString());
		output.push(Token.endOfRecord);
		return output.join("\n");
	}
}

/**
 * Defines the options of a {@link SourceFile} instance.
 * @typedef {object} SourceFileOptions
 * @property {BranchCoverage|null} branches The branch coverage.
 * @property {FunctionCoverage|null} functions The function coverage.
 * @property {LineCoverage|null} lines The line coverage.
 */
