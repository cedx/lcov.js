import {readFileSync, readdirSync, rmSync} from "node:fs";
import {join} from "node:path";

/**
 * Recursively deletes all files in the specified directory.
 * @param {string} directory The directory to clean.
 */
export function cleanDirectory(directory) {
	readdirSync(directory).filter(item => item != ".gitkeep").forEach(item => rmSync(join(directory, item), {force: true, recursive: true}));
}

/**
 * Parses the content of the specified JSON file.
 * @param {string} path The relative path to the JSON file.
 * @returns {any} The parsed content.
 */
export function parseJson(path) {
	return JSON.parse(readFileSync(new URL(path, import.meta.url), {encoding: "utf8"}));
}
