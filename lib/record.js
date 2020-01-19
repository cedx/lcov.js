import { BranchCoverage } from './branch.js';
import { FunctionCoverage } from './function.js';
import { LineCoverage } from './line.js';
import { Token } from './token.js';
/** Provides the coverage data of a source file. */
export class Record {
    /**
     * Creates a new record.
     * @param sourceFile The path to the source file.
     * @param options An object specifying values used to initialize this instance.
     */
    constructor(sourceFile, options = {}) {
        this.sourceFile = sourceFile;
        const { branches, functions, lines } = options;
        this.branches = branches;
        this.functions = functions;
        this.lines = lines;
    }
    /**
     * Creates a new record from the specified JSON object.
     * @param map A JSON object representing a record.
     * @return The instance corresponding to the specified JSON object.
     */
    static fromJson(map) {
        return new Record(typeof map.sourceFile == 'string' ? map.sourceFile : '', {
            branches: typeof map.branches == 'object' && map.branches ? BranchCoverage.fromJson(map.branches) : undefined,
            functions: typeof map.functions == 'object' && map.functions ? FunctionCoverage.fromJson(map.functions) : undefined,
            lines: typeof map.lines == 'object' && map.lines ? LineCoverage.fromJson(map.lines) : undefined
        });
    }
    /**
     * Converts this object to a map in JSON format.
     * @return The map in JSON format corresponding to this object.
     */
    toJSON() {
        return {
            branches: this.branches ? this.branches.toJSON() : null,
            functions: this.functions ? this.functions.toJSON() : null,
            lines: this.lines ? this.lines.toJSON() : null,
            sourceFile: this.sourceFile
        };
    }
    /**
     * Returns a string representation of this object.
     * @return The string representation of this object.
     */
    toString() {
        const output = [`${Token.sourceFile}:${this.sourceFile}`];
        if (this.functions)
            output.push(this.functions.toString());
        if (this.branches)
            output.push(this.branches.toString());
        if (this.lines)
            output.push(this.lines.toString());
        output.push(Token.endOfRecord);
        return output.join('\n');
    }
}
