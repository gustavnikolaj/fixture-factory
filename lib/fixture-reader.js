const fs = require("fs");
const { promisify } = require("util");
const { resolve } = require("path");

const readdir = promisify(fs.readdir);
const readlink = promisify(fs.readlink);
const readFile = promisify(fs.readFile);
const lstat = promisify(fs.lstat);

/**
 * Construct a fixture manifest from a directory on disk.
 */
async function fixtureReader(rootDir) {
  const entries = await readdir(rootDir);
  const files = {};

  for (const entry of entries) {
    const entryPath = resolve(rootDir, entry);
    const stats = await lstat(entryPath);

    if (stats.isSymbolicLink()) {
      files[entry] = {
        __symbolicLink: await readlink(entryPath)
      };
    } else if (stats.isDirectory()) {
      files[entry] = await fixtureReader(entryPath);
    } else {
      files[entry] = await readFile(entryPath, "utf-8");
    }
  }

  return files;
}

module.exports = fixtureReader;
