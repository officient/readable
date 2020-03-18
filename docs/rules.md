# Rules and default configuration

### namespace-max-files

Avoid namespaces with 15+ files

```JSON
"namespace-max-files": {
  "max-files": 15
}
```

## TODO

Below is an exhaustive set of the initial rules we need implemented. Each rule should have it's own 'class/module' and act as a plugin for the wider system:

- [ ] avoid triple inner for/foreach (eg for within for within for loop)
- [ ] avoid a class without a single comment at the top stating purpose
- [ ] avoid any function longer than 50 lines
- [ ] avoid indent deeper than 4 (maximum block nesting, eg for loop within an if within a for loop within a for loop)
- [ ] avoid complicated ifs (eg more than 2 &&.., combination of && and ||)
- [ ] avoid ternary operator combined with line length exceeding 50 chars
- [+] avoid namespaces with 15+ files
- [ ] avoid loops with inside of them more than 15 lines (a block that should be a function)
- [ ] avoid files with more than 200 lines.
- [ ] avoid dangerous calls to eval, print_r, var_export, var_dump, phpinfo, exec,..(forbidden function list)
- [ ] avoid assignment inside of an if statement
- [ ] avoid an if statement or for loop without braces
- [ ] avoid variables with names shorter than 3 letters (while whitelisting $i or $id)
- [ ] avoid function names starting with a certain pattern (configurable list of prefixes)
- [ ] avoid overriding of a function's arguments
- [ ] avoid empty catch blocks
