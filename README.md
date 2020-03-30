# readable

PHP code analyzer, similar to eslint, but with a focus on readability. The idea is to build an analyzer that can guarantee long term code maintainability for a project. The main project values are extendibility, ease of use, speed of analysis and simplicity.

### Installation and Usage

You can install readable using npm:

    $ npm install willem-delbare/readable#master --save-dev

While developing you can update to latest master with

    $ npm uninstall readable && npm install willem-delbare/readable#master

You should then set up a configuration file:

    $ npx readable --init

After that, you can run readable on any file or directory like this:

    $ npx readable

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
Or read [how to create custom rule](docs/add-rule.md).

### Development

To lint code run:

    npm run lint

To fix lint:

    npm run fix

To test:

    npm run test

To update api docs:

    npm run docs


## TODO

 - [x] works for PHP initially, but a next version could support more languages, such as JS (next version not in scope)
 - [x] can easily run on the commandline (eg npm run analyze)
 - [x] can be plugged into our CI (running the cli command returns either green or red code-state via exit status)
 - [x] written in javascript or typescript. This way we have to option to build this into a vs code plugin (vs code plugin itself not in scope). We are open to other suggestions on this point
 - [x] does NOT have to parse code into an AST for static code-like analysis. We want to focus on coding conventions that can be detected with simpler methods (eg regex or pattern matching, simple algorithms,..)
 - [x] should be easy to extend with a new rule (documentation with samples should be provided)
 - [x] should run fast for the given ruleset ( below 1 minute for 2000+ php files of 100-150 lines)
 - [x] rules should be configurable (turned on/off and add parameters) via a json config file
 - [x] in order to use the analyzer on a CI on an existing codebase, we need a whitelist approach. One rule might have 100 violations, but we still want to use that rule on the codebase for new code. That means those 100 existing violations should be ignored. An ignore-config-file (similar to 'Psalm' by vimeo) should be used. A command should exist to generate such an ignore file. The ignore file should be json-structured. It should contain the types of violations, the filename/path and the amount of occurrences to be ignored in that file or folder.
 - [x] every rule should have at least a 2 unit tests, a green example and an example that is in violation

