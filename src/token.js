/**
 * Provides the list of tokens supported by the parser.
 * @type {object}
 *
 * @property {string} BRANCH_DATA The coverage data of a branch.
 * @property {string} BRANCHES_FOUND The number of branches found.
 * @property {string} BRANCHES_HIT The number of branches hit.
 * @property {string} END_OF_RECORD The end of a section.
 * @property {string} FUNCTION_DATA The coverage data of a function.
 * @property {string} FUNCTION_NAME A function name.
 * @property {string} FUNCTIONS_FOUND The number of functions found.
 * @property {string} FUNCTIONS_HIT The number of functions hit.
 * @property {string} LINE_DATA The coverage data of a line.
 * @property {string} LINES_FOUND The number of lines found.
 * @property {string} LINES_HIT The number of lines hit.
 * @property {string} SOURCE_FILE The path to a source file.
 * @property {string} TEST_NAME A test name.
 */
export const Token = Object.freeze({
  BRANCHES_FOUND: 'BRF',
  BRANCHES_HIT: 'BRH',
  BRANCH_DATA: 'BRDA',
  END_OF_RECORD: 'end_of_record',
  FUNCTIONS_FOUND: 'FNF',
  FUNCTIONS_HIT: 'FNH',
  FUNCTION_DATA: 'FNDA',
  FUNCTION_NAME: 'FN',
  LINES_FOUND: 'LF',
  LINES_HIT: 'LH',
  LINE_DATA: 'DA',
  SOURCE_FILE: 'SF',
  TEST_NAME: 'TN'
});
