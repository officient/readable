# readable

PHP code analyzer, similar to eslint, but with a focus on readability. The idea is to build an analyzer that can guarantee long term code maintainability for a project. The main project values are extendibility, ease of use, speed of analysis and simplicity.

### Installation and Usage

You can install readable using npm:

    $ npm install readable --save-dev

You should then set up a configuration file:

    $ npx readable --init

After that, you can run readable on any file or directory like this:

    $ npx readable

### Configuration

After running `readable --init`, you'll have a `.readable.json` file in your directory. In it, you'll see some rules configured like this:

    {
        "pathes": [
            "src/"
        ],
        "rules": {}
    }

## TODO

 - [ ] works for PHP initially, but a next version could support more languages, such as JS (next version not in scope)
 - [ ] can easily run on the commandline (eg npm run analyze)
 - [ ] can be plugged into our CI (running the cli command returns either green or red code-state via exit status)
 - [ ] written in javascript or typescript. This way we have to option to build this into a vs code plugin (vs code plugin itself not in scope). We are open to other suggestions on this point
 - [ ] does NOT have to parse code into an AST for static code-like analysis. We want to focus on coding conventions that can be detected with simpler methods (eg regex or pattern matching, simple algorithms,..)
 - [ ] should be easy to extend with a new rule (documentation with samples should be provided)
 - [ ] should run fast for the given ruleset ( below 1 minute for 2000+ php files of 100-150 lines)
 - [ ] rules should be configurable (turned on/off and add parameters) via a json config file
 - [ ] in order to use the analyzer on a CI on an existing codebase, we need a whitelist approach. One rule might have 100 violations, but we still want to use that rule on the codebase for new code. That means those 100 existing violations should be ignored. An ignore-config-file (similar to 'Psalm' by vimeo) should be used. A command should exist to generate such an ignore file. The ignore file should be json-structured. It should contain the types of violations, the filename/path and the amount of occurrences to be ignored in that file or folder.
 - [ ] every rule should have at least a 2 unit tests, a green example and an example that is in violation

## rules

Below is an exhaustive set of the initial rules we need implemented. Each rule should have it's own 'class/module' and act as a plugin for the wider system:

- [ ] avoid triple inner for/foreach (eg for within for within for loop)
- [ ] avoid a class without a single comment at the top stating purpose
- [ ] avoid any function longer than 50 lines
- [ ] avoid indent deeper than 4 (maximum block nesting, eg for loop within an if within a for loop within a for loop)
- [ ] avoid complicated ifs (eg more than 2 &&.., combination of && and ||)
- [ ] avoid ternary operator combined with line length exceeding 50 chars
- [ ] avoid namespaces with 15+ files
- [ ] avoid loops with inside of them more than 15 lines (a block that should be a function)
- [ ] avoid files with more than 200 lines.
- [ ] avoid dangerous calls to eval, print_r, var_export, var_dump, phpinfo, exec,..(forbidden function list)
- [ ] avoid assignment inside of an if statement
- [ ] avoid an if statement or for loop without braces
- [ ] avoid variables with names shorter than 3 letters (while whitelisting $i or $id)
- [ ] avoid function names starting with a certain pattern (configurable list of prefixes)
- [ ] avoid overriding of a function's arguments
- [ ] avoid empty catch blocks
