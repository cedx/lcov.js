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
	 * @param {Partial<SourceFileOptions>} options An object providing values to initialize this instance.
	 */
	constructor(path, options = {}) {
		this.branches = options.branches ?? null;
		this.functions = options.functions ?? null;
		this.lines = options.lines ?? null;
		this.path = path;
	}

	/**
	 * Creates a new source file from the specified JSON object.
	 * @param {Record<string, any>} json A JSON object representing a source file.
	 * @returns {SourceFile} The instance corresponding to the specified JSON object.
	 */
	static fromJson(json) {
		return new this(typeof json.path == "string" ? json.path : "", {
			branches: typeof json.branches == "object" && json.branches ? BranchCoverage.fromJson(json.branches) : null,
			functions: typeof json.functions == "object" && json.functions ? FunctionCoverage.fromJson(json.functions) : null,
			lines: typeof json.lines == "object" && json.lines ? LineCoverage.fromJson(json.lines) : null
		});
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
 * @property {FunctionCoverage|null} functions The branch coverage.
 * @property {LineCoverage|null} lines The line coverage.
 */
