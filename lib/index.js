export * from "./branch.js";
export * from "./function.js";
export * from "./line.js";
export * from "./record.js";
export * from "./report.js";
export * from "./token.js";

/**
 * Represents a JSON value.
 * @typedef {null|boolean|number|string|JsonArray|JsonRecord} Json
 */

/**
 * Represents a JSON array.
 * @typedef {Json[]} JsonArray
 */

/**
 * Represents a JSON record.
 * @typedef {{[key: string]: Json}} JsonRecord
 */
