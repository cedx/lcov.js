/** Provides the coverage data of branches. */
export declare class BranchCoverage {

  /** The coverage data. */
  data: BranchData[];

  /** The number of branches found. */
  found: number;

  /** The number of branches hit. */
  hit: number;

  /**
   * Creates a new branch coverage.
   * @param found The number of branches found.
   * @param hit The number of branches hit.
   * @param data The coverage data.
   */
  constructor(found?: number, hit?: number, data?: BranchData[]);

  /**
   * Creates a new branch data from the specified JSON map.
   * @param map A JSON map representing a branch data.
   * @return The instance corresponding to the specified JSON map.
   */
  static fromJson(map: JsonMap): BranchCoverage;

  /**
   * Converts this object to a map in JSON format.
   * @return The map in JSON format corresponding to this object.
   */
  toJSON(): JsonMap;

  /**
   * Returns a string representation of this object.
   * @return The string representation of this object.
   */
  toString(): string;
}

/** Provides details for branch coverage. */
export declare class BranchData {

  /** The block number. */
  blockNumber: number;

  /** The branch number. */
  branchNumber: number;

  /** The line number. */
  lineNumber: number;

  /** A number indicating how often this branch was taken. */
  taken: number;

  /**
   * Creates a new branch data.
   * @param lineNumber The line number.
   * @param blockNumber The block number.
   * @param branchNumber The branch number.
   * @param taken A number indicating how often this branch was taken.
   */
  constructor(lineNumber: number, blockNumber: number, branchNumber: number, taken?: number);

  /**
   * Creates a new branch data from the specified JSON map.
   * @param map A JSON map representing a branch data.
   * @return The instance corresponding to the specified JSON map.
   */
  static fromJson(map: JsonMap): BranchData;

  /**
   * Converts this object to a map in JSON format.
   * @return The map in JSON format corresponding to this object.
   */
  toJSON(): JsonMap;

  /**
   * Returns a string representation of this object.
   * @return The string representation of this object.
   */
  toString(): string;
}

/** Provides the coverage data of functions. */
export declare class FunctionCoverage {

  /** The coverage data. */
  data: FunctionData[];

  /** The number of functions found. */
  found: number;

  /** The number of functions hit. */
  hit: number;

  /**
   * Creates a new function coverage.
   * @param found The number of functions found.
   * @param hit The number of functions hit.
   * @param data The coverage data.
   */
  constructor(found?: number, hit?: number, data?: FunctionData[]);

  /**
   * Creates a new function coverage from the specified JSON map.
   * @param map A JSON map representing a function coverage.
   * @return The instance corresponding to the specified JSON map.
   */
  static fromJson(map: JsonMap): FunctionCoverage;

  /**
   * Converts this object to a map in JSON format.
   * @return The map in JSON format corresponding to this object.
   */
  toJSON(): JsonMap;

  /**
   * Returns a string representation of this object.
   * @return The string representation of this object.
   */
  toString(): string;
}

/** Provides details for function coverage. */
export declare class FunctionData {

  /** The execution count. */
  executionCount: number;

  /** The function name. */
  functionName: string;

  /** The line number of the function start. */
  lineNumber: number;

  /**
   * Creates a new function data.
   * @param functionName The function name.
   * @param lineNumber The line number of the function start.
   * @param executionCount The execution count.
   */
  constructor(functionName: string, lineNumber: number, executionCount?: number);

  /**
   * Creates a new function data from the specified JSON map.
   * @param map A JSON map representing a function data.
   * @return The instance corresponding to the specified JSON map.
   */
  static fromJson(map: JsonMap): FunctionData;

  /**
   * Converts this object to a map in JSON format.
   * @return The map in JSON format corresponding to this object.
   */
  toJSON(): JsonMap;

  /**
   * Returns a string representation of this object.
   * @param asDefinition Whether to return the function definition (e.g. name and line number) instead of its data (e.g. name and execution count).
   * @return The string representation of this object.
   */
  toString(asDefinition?: boolean): string;
}

/** Defines the shape of a map in JSON format. */
export declare type JsonMap = {
  [key: string]: any;
};

/** An exception caused by a parsing error. */
export declare class LcovError extends SyntaxError {

  /** The offset in `source` where the error was detected. */
  offset: number;

  /** The actual source input which caused the error. */
  source: string | null;

  /**
   * Creates a new LCOV error.
   * @param message A message describing the error.
   * @param source The actual source input which caused the error.
   * @param offset The offset in `source` where the error was detected.
   */
  constructor(message: string, source?: string | null, offset?: number);
}

/** Provides the coverage data of lines. */
export declare class LineCoverage {

  /** The coverage data. */
  data: LineData[];

  /** The number of lines found. */
  found: number;

  /** The number of lines hit. */
  hit: number;

  /**
   * Creates a new line coverage.
   * @param found The number of lines found.
   * @param hit The number of lines found.
   * @param data The coverage data.
   */
  constructor(found?: number, hit?: number, data?: LineData[]);

  /**
   * Creates a new line coverage from the specified JSON map.
   * @param map A JSON map representing a line coverage.
   * @return The instance corresponding to the specified JSON map.
   */
  static fromJson(map: JsonMap): LineCoverage;

  /**
   * Converts this object to a map in JSON format.
   * @return The map in JSON format corresponding to this object.
   */
  toJSON(): JsonMap;

  /**
   * Returns a string representation of this object.
   * @return The string representation of this object.
   */
  toString(): string;
}

/** Provides details for line coverage. */
export declare class LineData {

  /** The data checksum. */
  checksum: string;

  /** The execution count. */
  executionCount: number;

  /** The line number. */
  lineNumber: number;

  /**
   * Creates a new line data.
   * @param lineNumber The line number.
   * @param executionCount The execution count.
   * @param checksum The data checksum.
   */
  constructor(lineNumber: number, executionCount?: number, checksum?: string);

  /**
   * Creates a new line data from the specified JSON map.
   * @param map A JSON map representing a line data.
   * @return The instance corresponding to the specified JSON map.
   */
  static fromJson(map: JsonMap): LineData;

  /**
   * Converts this object to a map in JSON format.
   * @return The map in JSON format corresponding to this object.
   */
  toJSON(): JsonMap;

  /**
   * Returns a string representation of this object.
   * @return The string representation of this object.
   */
  toString(): string;
}

/** Provides the coverage data of a source file. */
export declare class Record {

  /** The branch coverage. */
  branches: BranchCoverage | null;

  /** The function coverage. */
  functions: FunctionCoverage | null;

  /** The line coverage. */
  lines: LineCoverage | null;

  /** The path to the source file. */
  sourceFile: string;

  /**
   * Creates a new record.
   * @param sourceFile The path to the source file.
   * @param options An object specifying values used to initialize this instance.
   */
  constructor(sourceFile: string, options?: Partial<RecordOptions>);

  /**
   * Creates a new record from the specified JSON map.
   * @param map A JSON map representing a record.
   * @return The instance corresponding to the specified JSON map.
   */
  static fromJson(map: JsonMap): Record;

  /**
   * Converts this object to a map in JSON format.
   * @return The map in JSON format corresponding to this object.
   */
  toJSON(): JsonMap;

  /**
   * Returns a string representation of this object.
   * @return The string representation of this object.
   */
  toString(): string;
}

/** Defines the options of a `Record` instance. */
export interface RecordOptions {

  /** The branch coverage. */
  branches: BranchCoverage | null;

  /** The function coverage. */
  functions: FunctionCoverage | null;

  /** The line coverage. */
  lines: LineCoverage | null;
}

/** An exception caused by a parsing error. */
export declare class Report {

  /** The test name. */
  testName: string;

  /** The record list. */
  records: Record[];

  /**
   * Creates a new report.
   * @param testName The test name.
   * @param records The record list.
   */
  constructor(testName?: string, records?: Record[]);

  /**
   * Parses the specified coverage data in [LCOV](http://ltp.sourceforge.net/coverage/lcov.php) format.
   * @param coverage The coverage data.
   * @return The resulting coverage report.
   * @throws {LcovError} A parsing error occurred.
   */
  static fromCoverage(coverage: string): Report;

  /**
   * Creates a new report from the specified JSON map.
   * @param map A JSON map representing a report.
   * @return The instance corresponding to the specified JSON map.
   */
  static fromJson(map: JsonMap): Report;

  /**
   * Converts this object to a map in JSON format.
   * @return The map in JSON format corresponding to this object.
   */
  toJSON(): JsonMap;

  /**
   * Returns a string representation of this object.
   * @return The string representation of this object.
   */
  toString(): string;
}

/** Provides the list of tokens supported by the parser. */
export declare enum Token {

  /** The coverage data of a branch. */
  branchesFound = 'BRF',

  /** The number of branches found. */
  branchesHit = 'BRH',

  /** The number of branches hit. */
  branchData = 'BRDA',

  /** The end of a section. */
  endOfRecord = 'end_of_record',

  /** The coverage data of a function. */
  functionData = 'FNDA',

  /** A function name. */
  functionName = 'FN',

  /** The number of functions found. */
  functionsFound = 'FNF',

  /** The number of functions hit. */
  functionsHit = 'FNH',

  /** The coverage data of a line. */
  lineData = 'DA',

  /** The number of lines found. */
  linesFound = 'LF',

  /** The number of lines hit. */
  linesHit = 'LH',

  /** The path to a source file. */
  sourceFile = 'SF',

  /** A test name. */
  testName = 'TN'
}
