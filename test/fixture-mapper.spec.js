const expect = require("unexpected");
const fixtureMapper = require("../lib/fixture-mapper");

it("map a simple spec", () => {
  expect(
    fixtureMapper(
      {
        foo: "foofoo",
        bar: "barbar"
      },
      "/tmp/fixtures"
    ),
    "to equal",
    {
      foo: "/tmp/fixtures/foo",
      bar: "/tmp/fixtures/bar"
    }
  );
});

it("map a spec with folders", () => {
  expect(
    fixtureMapper(
      {
        foo: "foofoo",
        bar: "barbar",
        qux: {
          baz: "bazbaz"
        }
      },
      "/tmp/fixtures"
    ),
    "to equal",
    {
      foo: "/tmp/fixtures/foo",
      bar: "/tmp/fixtures/bar",
      qux: {
        baz: "/tmp/fixtures/qux/baz"
      }
    }
  );
});

it("map a spec with symlinks", () => {
  expect(
    fixtureMapper(
      {
        foo: "foofoo",
        bar: "barbar",
        qux: {
          baz: { __symbolicLink: "../foo" }
        }
      },
      "/tmp/fixtures"
    ),
    "to equal",
    {
      foo: "/tmp/fixtures/foo",
      bar: "/tmp/fixtures/bar",
      qux: {
        baz: "/tmp/fixtures/qux/baz"
      }
    }
  );
});
