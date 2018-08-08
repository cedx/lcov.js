/**
 * Provides the list of tokens supported by the parser.
 *
 * @property branchData The coverage data of a branch.
 * @property branchesFound The number of branches found.
 * @property branchesHit The number of branches hit.
 * @property endOfRecord The end of a section.
 * @property functionData The coverage data of a function.
 * @property functionName A function name.
 * @property functionsFound The number of functions found.
 * @property functionsHit The number of functions hit.
 * @property lineData The coverage data of a line.
 * @property linesFound The number of lines found.
 * @property linesHit The number of lines hit.
 * @property sourceFile The path to a source file.
 * @property testName A test name.
 */
export enum Token {
  branchesFound = 'BRF',
  branchesHit = 'BRH',
  branchData = 'BRDA',
  endOfRecord = 'end_of_record',
  functionData = 'FNDA',
  functionName = 'FN',
  functionsFound = 'FNF',
  functionsHit = 'FNH',
  lineData = 'DA',
  linesFound = 'LF',
  linesHit = 'LH',
  sourceFile = 'SF',
  testName = 'TN'
}
