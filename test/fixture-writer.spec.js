/* global beforeAll */

const expect = require("unexpected");
const fixtureReader = require("../lib/fixture-reader");
const fixtureWriter = require("../lib/fixture-writer");
const { mkdirp, remove } = require("fs-extra");
const path = require("path");

const fixtureRootDir = path.resolve(__dirname, "../__tmp__/fixtureWriterTest");

beforeAll(async () => {
  await remove(fixtureRootDir);
  await mkdirp(fixtureRootDir);
});

it("should write a copy of a fixture/test1", async () => {
  const fixtureTest1Path = path.resolve(__dirname, "../fixtures/test1");
  const fixtureTest1Spec = await fixtureReader(fixtureTest1Path);

  const fixtureDir = path.resolve(fixtureRootDir, "fixture-test1");
  await fixtureWriter(fixtureTest1Spec, fixtureDir);

  const writtenSpec = await fixtureReader(fixtureDir);

  expect(writtenSpec, "to equal", fixtureTest1Spec);
});

it("should write a copy of a fixture/test2", async () => {
  const fixtureTest1Path = path.resolve(__dirname, "../fixtures/test2");
  const fixtureTest1Spec = await fixtureReader(fixtureTest1Path);

  const fixtureDir = path.resolve(fixtureRootDir, "fixture-test2");
  await fixtureWriter(fixtureTest1Spec, fixtureDir);

  const writtenSpec = await fixtureReader(fixtureDir);

  expect(writtenSpec, "to equal", fixtureTest1Spec);
});

it("should write a copy of a fixture/test2", async () => {
  const fixtureTest1Path = path.resolve(__dirname, "../fixtures/test3");
  const fixtureTest1Spec = await fixtureReader(fixtureTest1Path);

  const fixtureDir = path.resolve(fixtureRootDir, "fixture-test3");
  await fixtureWriter(fixtureTest1Spec, fixtureDir);

  const writtenSpec = await fixtureReader(fixtureDir);

  expect(writtenSpec, "to equal", fixtureTest1Spec);
});
