const fixtureMapper = require("./fixture-mapper");
const fixtureWriter = require("./fixture-writer");
const fixtureReader = require("./fixture-reader");

async function fixtureFactory(fileSpec, { rootDir } = {}) {
  if (!rootDir) {
    throw new Error("No rootdir passed. NYI");
  }

  const map = fixtureMapper(fileSpec, rootDir);

  await fixtureWriter(fileSpec, rootDir);

  return {
    map,
    readFixtures: () => fixtureReader(rootDir)
  };
}

module.exports = fixtureFactory;
