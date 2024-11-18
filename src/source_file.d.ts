import {BranchCoverage} from "./branch.js";
import {FunctionCoverage} from "./function.js";
import {LineCoverage} from "./line.js";

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
	constructor(path: string, options?: SourceFileOptions);

	/**
	 * Creates a new source file from the specified JSON object.
	 * @param json A JSON object representing a source file.
	 * @returns The instance corresponding to the specified JSON object.
	 */
	static fromJson(json: Record<string, any>): SourceFile;
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
