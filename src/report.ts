import {BranchCoverage, BranchData} from './branch';
import {FunctionCoverage, FunctionData} from './function';
import {JsonMap} from './json';
import {LineCoverage, LineData} from './line';
import {Record} from './record';
import {Token} from './token';

/**
 * An exception caused by a parsing error.
 */
export class LcovError extends SyntaxError {

  /**
   * Creates a new LCOV error.
   * @param message A message describing the error.
   * @param source The actual source input which caused the error.
   * @param offset The offset in `source` where the error was detected.
   */
  constructor(message: string, public source: any = null, public offset: number = -1) {
    super(message);
    this.name = 'LcovError';
  }

  /**
   * Returns a string representation of this object.
   * @return The string representation of this object.
   */
  public toString(): string {
    const values = [`"${this.message}"`];
    if (this.offset >= 0) values.push(`offset: ${this.offset}`);
    return `${this.name}(${values.join(', ')})`;
  }
}

/**
 * Represents a trace file, that is a coverage report.
 */
export class Report {

  /**
   * Initializes a new instance of the class.
   * @param testName The test name.
   * @param records The record list.
   */
  constructor(public testName: string = '', public records: Record[] = []) {}

  /**
   * The class name.
   */
  get [Symbol.toStringTag](): string {
    return 'Report';
  }

  /**
   * Parses the specified coverage data in [LCOV](http://ltp.sourceforge.net/coverage/lcov.php) format.
   * @param coverage The coverage data.
   * @return The resulting coverage report.
   * @throws {Error} A parsing error occurred.
   */
  public static fromCoverage(coverage: string): Report {
    const report = new this;

    try {
      let record = new Record('');
      for (let line of coverage.split(/\r?\n/g)) {
        line = line.trim();
        if (!line.length) continue;

        const parts = line.split(':');
        if (parts.length < 2 && parts[0] != Token.endOfRecord) throw new Error('Invalid token format');

        const token = parts.shift();
        const data = parts.join(':').split(',');

        switch (token) {
          case Token.testName:
            report.testName = data[0];
            break;

          case Token.sourceFile:
            record = new Record(data[0], {
              branches: new BranchCoverage,
              functions: new FunctionCoverage,
              lines: new LineCoverage
            });
            break;

          case Token.functionName:
            if (data.length < 2) throw new Error('Invalid function name');
            record.functions!.data.push(new FunctionData(data[1], Number.parseInt(data[0], 10)));
            break;

          case Token.functionData:
            if (data.length < 2) throw new Error('Invalid function data');
            record.functions!.data.some(item => {
              if (item.functionName != data[1]) return false;
              item.executionCount = Number.parseInt(data[0], 10);
              return true;
            });
            break;

          case Token.functionsFound:
            record.functions!.found = Number.parseInt(data[0], 10);
            break;

          case Token.functionsHit:
            record.functions!.hit = Number.parseInt(data[0], 10);
            break;

          case Token.branchData:
            if (data.length < 4) throw new Error('Invalid branch data');
            record.branches!.data.push(new BranchData(
              Number.parseInt(data[0], 10),
              Number.parseInt(data[1], 10),
              Number.parseInt(data[2], 10),
              data[3] == '-' ? 0 : Number.parseInt(data[3], 10)
            ));
            break;

          case Token.branchesFound:
            record.branches!.found = Number.parseInt(data[0], 10);
            break;

          case Token.branchesHit:
            record.branches!.hit = Number.parseInt(data[0], 10);
            break;

          case Token.lineData:
            if (data.length < 2) throw new Error('Invalid line data');
            record.lines!.data.push(new LineData(
              Number.parseInt(data[0], 10),
              Number.parseInt(data[1], 10),
              data.length >= 3 ? data[2] : ''
            ));
            break;

          case Token.linesFound:
            record.lines!.found = Number.parseInt(data[0], 10);
            break;

          case Token.linesHit:
            record.lines!.hit = Number.parseInt(data[0], 10);
            break;

          case Token.endOfRecord:
            report.records.push(record);
            break;
        }
      }
    }

    catch {
      throw new LcovError('The coverage data has an invalid LCOV format', coverage);
    }

    if (!report.records.length) throw new LcovError('The coverage data is empty', coverage);
    return report;
  }

  /**
   * Creates a new record from the specified JSON map.
   * @param map A JSON map representing a record.
   * @return The instance corresponding to the specified JSON map.
   */
  public static fromJson(map: JsonMap): Report {
    return new this(
      typeof map.testName == 'string' ? map.testName : '',
      Array.isArray(map.records) ? map.records.map(item => Record.fromJson(item)) : []
    );
  }

  /**
   * Converts this object to a map in JSON format.
   * @return The map in JSON format corresponding to this object.
   */
  public toJSON(): JsonMap {
    return {
      records: this.records.map(item => item.toJSON()),
      testName: this.testName
    };
  }

  /**
   * Returns a string representation of this object.
   * @return The string representation of this object.
   */
  public toString(): string {
    const lines = this.testName.length ? [`${Token.testName}:${this.testName}`] : [];
    lines.push(...this.records.map(item => item.toString()));
    return lines.join('\n');
  }
}