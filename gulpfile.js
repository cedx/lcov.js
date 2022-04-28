import {spawn} from "node:child_process";
import {cp, readFile} from "node:fs/promises";
import del from "del";
import gulp from "gulp";

/** The default task. */
export default gulp.series(
	clean,
	build
);

/** Builds the project. */
export function build() {
	return exec("npx", ["tsc", "--project", "lib/jsconfig.json"]);
}

/** Deletes all generated files and reset any saved state. */
export function clean() {
	return del(["share", "var/**/*"]);
}

/** Builds the documentation. */
export async function doc() {
	await exec("npx", ["typedoc", "--options", "etc/typedoc.json"]);
	return cp("www/favicon.ico", "docs/favicon.ico");
}

/** Performs the static analysis of source code. */
export async function lint() {
	const sources = JSON.parse(await readFile("jsconfig.json", "utf8")).include;
	await exec("npx", ["eslint", "--config=etc/eslint.json", ...sources]);
	return exec("npx", ["tsc", "--project", "jsconfig.json"]);
}

/** Publishes the package in the registry. */
export async function publish() {
	await exec("npm", ["publish"]);
	const {version} = JSON.parse(await readFile("package.json", "utf8"));
	for (const command of [["tag"], ["push", "origin"]]) await exec("git", [...command, `v${version}`]);
}

/** Runs the test suite. */
export function test() {
	return exec("npx", ["c8", "--all", "--include=lib/**/*.js", "--report-dir=var", "--reporter=lcovonly", "node_modules/.bin/mocha", "--recursive"]);
}

/** Watches for file changes. */
export function watch() {
	return exec("npx", ["tsc", "--project", "jsconfig.json", "--watch"]);
}

/**
 * Spawns a new process using the specified command.
 * @param {string} command The command to run.
 * @param {string[]} [args] The command arguments.
 * @returns {Promise<void>} Resolves when the command is finally terminated.
 */
function exec(command, args = []) {
	return new Promise((resolve, reject) => spawn(command, args, {shell: true, stdio: "inherit"})
		.on("close", code => code ? reject(new Error(args.length ? `${command} ${args.join(" ")}` : command)) : resolve()));
}
