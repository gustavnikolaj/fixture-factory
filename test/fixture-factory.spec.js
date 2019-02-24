const expect = require("unexpected");
const fixtureFactory = require("../lib/fixture-factory");
const deindent = require("@gustavnikolaj/string-utils/deindent");

it("should create the files in a temp directory", () => {
  const files = fixtureFactory(
    {
      "package.json": deindent`
        {
          "name": "my-package",
          "version": "1.2.3"
        }
      `
    },
    {
      rootDir: "/tmp/fixture-factory"
    }
  );

  expect(files, "to equal", {
    "package.json": "/tmp/fixture-factory/package.json"
  });
});
