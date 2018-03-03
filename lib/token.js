'use strict';

/**
 * Provides the list of tokens supported by the parser.
 * @type {object}
 *
 * @property {string} branchData The coverage data of a branch.
 * @property {string} branchesFound The number of branches found.
 * @property {string} branchesHit The number of branches hit.
 * @property {string} endOfRecord The end of a section.
 * @property {string} functionData The coverage data of a function.
 * @property {string} functionName A function name.
 * @property {string} functionsFound The number of functions found.
 * @property {string} functionsHit The number of functions hit.
 * @property {string} lineData The coverage data of a line.
 * @property {string} linesFound The number of lines found.
 * @property {string} linesHit The number of lines hit.
 * @property {string} sourceFile The path to a source file.
 * @property {string} testName A test name.
 */
const Token = Object.freeze({
  branchesFound: 'BRF',
  branchesHit: 'BRH',
  branchData: 'BRDA',
  endOfRecord: 'end_of_record',
  functionData: 'FNDA',
  functionName: 'FN',
  functionsFound: 'FNF',
  functionsHit: 'FNH',
  lineData: 'DA',
  linesFound: 'LF',
  linesHit: 'LH',
  sourceFile: 'SF',
  testName: 'TN'
});

// Module exports.
exports.Token = Token;
