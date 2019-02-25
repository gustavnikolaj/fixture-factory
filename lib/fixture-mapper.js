const path = require("path");

function fixtureMapper(fileSpec, rootDir) {
  const manifest = {};
  for (const [key, value] of Object.entries(fileSpec)) {
    let mapping = key;

    if (typeof value === "object" && !value.__symbolicLink) {
      manifest[key] = fixtureMapper(value, path.resolve(rootDir, key));
    } else {
      if (rootDir) {
        mapping = path.resolve(rootDir, key);
      }

      manifest[key] = mapping;
    }
  }
  return manifest;
}

module.exports = fixtureMapper;
