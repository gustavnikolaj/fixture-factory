# Data Structures

```
FixtureSpec: {
  [path: String]: (content: String | FixtureSpec)
}

FixtureMapping: {
  [path:String]: (generatedPath: String | FixtureMapping)
}
```

FixtureManifest: The thing that maps from the developer facing references to
the generated paths in the fixture.

FixtureSpec: The thing that the developer writes, which contains the paths and
the content for each of the elements.

```js
const fixtures = fixtureFactory({
  filename: "foobar"
});

await fixtures.write();

const content = await fs.readFile(fixtures.filename, "utf-8");

console.log(content); // => foobar
```
