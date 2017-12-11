'use strict';

const {BranchCoverage, BranchData} = require('./branch');
const {FunctionCoverage, FunctionData} = require('./function');
const {LineCoverage, LineData} = require('./line');
const {Record} = require('./record');
const {Report} = require('./report');
const {Token} = require('./token');

module.exports = {
  BranchCoverage,
  BranchData,
  FunctionCoverage,
  FunctionData,
  LineCoverage,
  LineData,
  Record,
  Report,
  Token
};
