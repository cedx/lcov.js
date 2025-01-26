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
	 * Creates a new source file from the specified JSON object.
	 * @param json A JSON object representing a source file.
	 * @returns The instance corresponding to the specified JSON object.
	 */
	static fromJson(json: Record<string, any>): SourceFile {
		return new this(typeof json.path == "string" ? json.path : "", {
			branches: typeof json.branches == "object" && json.branches ? BranchCoverage.fromJson(json.branches as Record<string, any>) : null,
			functions: typeof json.functions == "object" && json.functions ? FunctionCoverage.fromJson(json.functions as Record<string, any>) : null,
			lines: typeof json.lines == "object" && json.lines ? LineCoverage.fromJson(json.lines as Record<string, any>) : null
		});
	}

	/**
	 * Returns a string representation of this object.
	 * @returns The string representation of this object.
	 */
	toString(): string {
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
 */
export type SourceFileOptions = Partial<{

	/**
	 * The branch coverage.
	 */
	branches: BranchCoverage|null;

	/**
	 * The branch coverage.
	 */
	functions: FunctionCoverage|null;

	/**
	 * The line coverage.
	 */
	lines: LineCoverage|null;
}>;
