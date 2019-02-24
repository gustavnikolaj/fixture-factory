const fs = require("fs");
const { promisify } = require("util");
const { resolve } = require("path");

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const stat = promisify(fs.stat);

/**
 * Construct a fixture manifest from a directory on disk.
 */
async function fixtureReader(rootDir) {
  const entries = await readdir(rootDir);
  const files = {};

  for (const entry of entries) {
    const entryPath = resolve(rootDir, entry);
    const stats = await stat(entryPath);

    if (stats.isDirectory()) {
      files[entry] = await fixtureReader(entryPath);
    } else {
      files[entry] = await readFile(entryPath, "utf-8");
    }
  }

  return files;
}

module.exports = fixtureReader;
