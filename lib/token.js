/** Provides the list of tokens supported by the parser. */
export var Token;
(function (Token) {
    /** The coverage data of a branch. */
    Token["branchesFound"] = "BRF";
    /** The number of branches found. */
    Token["branchesHit"] = "BRH";
    /** The number of branches hit. */
    Token["branchData"] = "BRDA";
    /** The end of a section. */
    Token["endOfRecord"] = "end_of_record";
    /** The coverage data of a function. */
    Token["functionData"] = "FNDA";
    /** A function name. */
    Token["functionName"] = "FN";
    /** The number of functions found. */
    Token["functionsFound"] = "FNF";
    /** The number of functions hit. */
    Token["functionsHit"] = "FNH";
    /** The coverage data of a line. */
    Token["lineData"] = "DA";
    /** The number of lines found. */
    Token["linesFound"] = "LF";
    /** The number of lines hit. */
    Token["linesHit"] = "LH";
    /** The path to a source file. */
    Token["sourceFile"] = "SF";
    /** A test name. */
    Token["testName"] = "TN";
})(Token || (Token = {}));
