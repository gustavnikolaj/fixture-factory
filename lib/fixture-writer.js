const fs = require("fs");
const { promisify } = require("util");
const path = require("path");

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

/**
 * Serialize a fixture manifest to disc.
 */
async function fixtureWriter(fixtureSpec, outputDir) {
  await mkdir(outputDir);

  for (const [fileName, contents] of Object.entries(fixtureSpec)) {
    if (typeof contents === "object") {
      await fixtureWriter(contents, path.resolve(outputDir, fileName));
    } else {
      await writeFile(path.resolve(outputDir, fileName), contents, "utf-8");
    }
  }
}

module.exports = fixtureWriter;
