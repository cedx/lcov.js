import type {BranchCoverage} from "./BranchCoverage.js";
import type {FunctionCoverage} from "./FunctionCoverage.js";
import type {LineCoverage} from "./LineCoverage.js";
import {Tokens} from "./Tokens.js";


/**
 * Provides the coverage data of a source file.
 */
export class SourceFile {

	/**
	 * The branch coverage.
	 */
	branches: BranchCoverage|null;

	/**
	 * The function coverage.
	 */
	functions: FunctionCoverage|null;

	/**
	 * The line coverage.
	 */
	lines: LineCoverage|null;

	/**
	 * The path to the source file.
	 */
	path: string;

	/**
	 * Creates a new source file.
	 * @param path The path to the source file.
	 * @param options An object providing values to initialize this instance.
	 */
	constructor(path: string, options: SourceFileOptions = {}) {
		this.branches = options.branches ?? null;
		this.functions = options.functions ?? null;
		this.lines = options.lines ?? null;
		this.path = path;
	}

	/**
	 * Returns a string representation of this object.
	 * @returns The string representation of this object.
	 */
	toString(): string {
		const output = [`${Tokens.SourceFile}:${this.path}`];
		if (this.functions) output.push(this.functions.toString());
		if (this.branches) output.push(this.branches.toString());
		if (this.lines) output.push(this.lines.toString());
		output.push(Tokens.EndOfRecord);
		return output.join("\n");
	}
}

/**
 * Defines the options of a {@link SourceFile} instance.
 */
export type SourceFileOptions = Partial<Omit<SourceFile, "path"|"toString">>;
