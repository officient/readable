![readable](docs/logo.png)

PHP code analyzer, similar to eslint, but with a focus on readability. The idea is to build an analyzer that can guarantee long term code maintainability for a project. The main project values are extendibility, ease of use, speed of analysis and simplicity.

quick links: [Rules and default configuration](docs/rules.md)

[![codecov](https://codecov.io/gh/officient/readable/branch/master/graph/badge.svg)](https://codecov.io/gh/officient/readable)

![Tests](https://github.com/officient/readable/workflows/Tests/badge.svg)

### Installation and Usage

You can install readable using npm:

    $ npm install @officient/readable --save-dev

You should then set up a configuration file:

    $ npx readable --init

After that, you can run readable on any file or directory like this:

    $ npx readable

You can also add it to your NPM scripts:

```json
"scripts": {
    "test": "readable"
},
```

     $ npm run readable

### Exit code

Returns 0 if no errors. Returns 1 if there are some errors. Can return 2 if some
exception happend during linting.

### Configuration

After running `readable --init`, you'll have a `.readable.json` file in your directory. In it, you'll see some rules configured like this:

```JSON
{
  "pathes": [
    "src/"
  ],
  "rules": {}
}
```
## Baseline

Create baseline file:

    $ npx readable --save-base-line .baseline.json

Add `"baseline"` param to your `.readable.json`:

```JSON
{
  "baseline": ".baseline.json",
  "pathes": [
    "src/"
  ],
  "rules": {}
}
```

Now errors from baseline file would be ignored. If you want to see all errors run
with `--disable-base-line` flag:

    $ npx readable --disable-base-line

## Rules

See [Rules and default configuration](docs/rules.md) for default rules.
Or read [how to create a custom rule](docs/add-rule.md).

### Development

To lint code run:

    npm run lint

To fix lint:

    npm run fix

To test:

    npm run test

To update api docs:

    npm run docs

While developing you can update to latest master with

    $ npm install @officient/readable@latest
