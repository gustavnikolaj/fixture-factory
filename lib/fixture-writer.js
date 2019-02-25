const fs = require("fs");
const { promisify } = require("util");
const path = require("path");

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);
const symlink = promisify(fs.symlink);

/**
 * Serialize a fixture manifest to disc.
 */
async function fixtureWriter(fixtureSpec, outputDir) {
  await mkdir(outputDir);

  for (const [fileName, contents] of Object.entries(fixtureSpec)) {
    const outputPath = path.resolve(outputDir, fileName);

    if (typeof contents === "object") {
      if (contents.__symbolicLink) {
        await symlink(
          // path.resolve(outputPath, contents.__symbolicLink),
          contents.__symbolicLink,
          outputPath
        );
      } else {
        await fixtureWriter(contents, outputPath);
      }
    } else {
      await writeFile(outputPath, contents, "utf-8");
    }
  }
}

module.exports = fixtureWriter;
