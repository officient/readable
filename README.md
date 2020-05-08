![readable](docs/logo.png)

PHP code analyzer, similar to eslint, but with a focus on readability. The idea is to build an analyzer that can guarantee long term code maintainability for a project. The main project values are extendibility, ease of use, speed of analysis and simplicity.

quick links: [Rules and default configuration](docs/rules.md)

[![codecov](https://codecov.io/gh/officient/readable/branch/master/graph/badge.svg)](https://codecov.io/gh/officient/readable)

[![Codeship Status for officient/readable](https://app.codeship.com/projects/4fd4eea0-676f-0138-8ef4-52f6c3762b41/status?branch=master)](https://app.codeship.com/projects/393877)

### Installation and Usage

You can install readable using npm:

    $ npm install @officient/readable --save-dev

You can get the help on useage:

    $ npx readable --help

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

     $ npm run test

### Exit code

<dl>
  <dt>0</dt>
  <dd>No errors</dd>
  <dt>1</dt>
  <dd>Found errors</dd>
  <dt>2</dt>
  <dd>Unexpected behaviour</dd>
</dl>

### Configuration

After running `readable --init`, you'll have a `.readable.json` file in your directory. In it, you'll see some rules configured like this:

```JSON
{
  "paths": [
    "src/",
    "!src/vendor/"
  ],
  "rules": {}
}
```

Start a path with `!` to ignore the folder.

## Baseline

If you have a bunch of errors and you don't want to fix them all
at once, readable can ignore errors in existing code, while
ensuring that new code doesn't have errors:

    $ npx readable --save-base-line .baseline.json

will generate or update `.baseline.json` file containing the
current errors. Add `"baseline"` param to your `.readable.json:`

```JSON
{
  "baseline": ".baseline.json",
  "..."
}
```

You can commit the changes so that readable running in other
places (e.g. CI) won't complain about those errors. If you want
to see all errors run with `--disable-base-line` flag:

    $ npx readable --disable-base-line

## Rules

See [Rules and default configuration](docs/rules.md) for default rules.
Or read [how to create a custom rule](docs/add-rule.md).

### Development

To lint code run:

    npm run lint

To fix lint:

    $ npm run fix

To test:

    $ npm run test

To update api docs:

    $ npm run docs

While developing you can update to latest master with

    $ npm install @officient/readable@latest
