/* global beforeAll */

const expect = require("unexpected");
const path = require("path");
const fixtureFactory = require("../lib/fixture-factory");
const deindent = require("@gustavnikolaj/string-utils/deindent");
const { mkdirp, remove } = require("fs-extra");

const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const fixtureRootDir = path.resolve(__dirname, "../__tmp__/fixtureMapper");

beforeAll(async () => {
  await remove(fixtureRootDir);
  await mkdirp(fixtureRootDir);
});

it("should create the files in a temp directory", async () => {
  const { map } = await fixtureFactory(
    {
      "data.json": deindent`
        {
          "text": "This is read from a generated fixture"
        }
      `
    },
    {
      rootDir: path.resolve(fixtureRootDir, "fact1")
    }
  );

  const content = JSON.parse(await readFile(map["data.json"]));

  expect(content, "to equal", {
    text: "This is read from a generated fixture"
  });
});

it("should create the files in a temp directory", async () => {
  const { map, readFixtures } = await fixtureFactory(
    {
      "data.json": deindent`
        {
          "text": "This is read from a generated fixture"
        }
      `
    },
    {
      rootDir: path.resolve(fixtureRootDir, "fact2")
    }
  );

  const content = JSON.parse(await readFile(map["data.json"]));

  content.data = "This is updated in a generated fixture";

  await writeFile(map["data.json"], JSON.stringify(content, false, 4));

  expect(await readFixtures(), "to equal", {
    "data.json": deindent`
      {
          "text": "This is read from a generated fixture",
          "data": "This is updated in a generated fixture"
      }
    `
  });
});
