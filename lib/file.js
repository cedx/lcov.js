import {BranchCoverage} from "./branch.js";
import {FunctionCoverage} from "./function.js";
import {LineCoverage} from "./line.js";
import {Token} from "./token.js";

/**
 * Provides the coverage data of a source file.
 */
export class File {

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
	 * Creates a new record.
	 * @param {string} path The path to the source file.
	 * @param {Partial<FileOptions>} [options] An object providing values to initialize this instance.
	 */
	constructor(path, options = {}) {
		const {branches = null, functions = null, lines = null} = options;
		this.branches = branches;
		this.functions = functions;
		this.lines = lines;
		this.path = path;
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
 * Defines the options of a {@link File} instance.
 * @typedef {object} FileOptions
 * @property {BranchCoverage} branches The branch coverage.
 * @property {FunctionCoverage} functions The function coverage.
 * @property {LineCoverage} lines The line coverage.
 */
