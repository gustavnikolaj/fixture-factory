const expect = require("unexpected");
const fixtureReader = require("../lib/fixture-reader");
const path = require("path");

it("should read a simple fixture into a FixtureSpec object", async () => {
  const fixturePath = path.resolve(__dirname, "../fixtures/test1");
  const spec = await fixtureReader(fixturePath);

  expect(spec, "to equal", {
    foo: "foofoo\n",
    bar: "barbar\n"
  });
});

it("should read a fixture with a folder into a FixtureSpec object", async () => {
  const fixturePath = path.resolve(__dirname, "../fixtures/test2");
  const spec = await fixtureReader(fixturePath);

  expect(spec, "to equal", {
    qux: {
      foo: "foofoo\n",
      bar: "barbar\n"
    },
    baz: "bazbaz\n"
  });
});

it.only("should read a symlink", async () => {
  const fixturePath = path.resolve(__dirname, "../fixtures/test3");
  const spec = await fixtureReader(fixturePath);

  expect(spec, "to equal", {
    qux: {
      foo: "foofoo\n",
      bar: "barbar\n",
      baaaz: { __symbolicLink: "../baz" }
    },
    baz: "bazbaz\n"
  });
});
