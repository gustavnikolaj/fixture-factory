const path = require("path");

function fileSpecToManifest(fileSpec, rootDir) {
  const manifest = {};
  for (const [key /* value */] of Object.entries(fileSpec)) {
    // TODO: Call recursively if value has a children object
    let mapping = key;

    if (rootDir) {
      mapping = path.resolve(rootDir, key);
    }

    manifest[key] = mapping;
  }
  return manifest;
}

module.exports = function(fileSpec, { rootDir } = {}) {
  if (!rootDir) {
    throw new Error("No rootdir passed. NYI");
  }

  return fileSpecToManifest(fileSpec, rootDir);
};
