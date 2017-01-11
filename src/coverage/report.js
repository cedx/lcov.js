import {Record} from './record';
import {Token} from '../token';

/**
 * Represents a trace file, that is a coverage report.
 */
export class Report {

  /**
   * Initializes a new instance of the class.
   * @param {object} [options] An object specifying values used to initialize this instance.
   */
  constructor(options = {}) {

    /**
     * The record list.
     * @type {Record[]}
     */
    this.records = Array.isArray(options.records) ? options.records : [];

    /**
     * The test name.
     * @type {string}
     */
    this.testName = typeof options.testName == 'string' ? options.testName : '';
  }

  /**
   * Creates a new record from the specified JSON map.
   * @param {object} map A JSON map representing a record.
   * @return {Record} The instance corresponding to the specified JSON map, or `null` if a parsing error occurred.
   */
  static fromJSON(map) {
    return !map || typeof map != 'object' ? null : new Record({
      records: Array.isArray(map.records) ? map.records.map(item => Record.fromJSON(item)).filter(item => item) : [],
      testName: map.test
    });
  }

  /**
   * Converts this object to a map in JSON format.
   * @return {object} The map in JSON format corresponding to this object.
   */
  toJSON() {
    return {
      /* eslint-disable sort-keys */
      test: this.testName,
      records: this.records.map(item => item.toJSON())
      /* eslint-enable sort-keys */
    };
  }

  /**
   * Returns a string representation of this object.
   * @return {string} The string representation of this object.
   */
  toString() {
    let lines = [`${Token.TEST_NAME}:${this.testName}`];
    lines.push(...this.records.map(item => item.toString()));
    return lines.join('\n');
  }
}
