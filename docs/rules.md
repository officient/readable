# Rules and default configuration

## disable rule

```JSON
"namespace-max-files": false,
```

### namespace-max-files

Avoid namespaces with 15+ files:

```JSON
"namespace-max-files": 15
```

### argument-override

Avoid overriding of a function's arguments:

```JSON
"argument-override": true
```

### file-max-size

Avoid files with more than 200 lines:

```JSON
"file-max-size": 200
```

### empty-catch

Avoid empty catch blocks:

```JSON
"empty-catch": true
```

### class-comment

Avoid a class without a single comment at the top stating purpose:

```JSON
"class-comment": true
```

### forbidden-functions

Avoid dangerous calls to `eval`, `print_r`, `var_export`, `var_dump`, `phpinfo`, `exec`, ... (forbidden function list):

```JSON
"forbidden-functions": [
  "eval", "print_r", "var_export", "var_dump", "phpinfo", "exec"
],
```

### missing-braces

Avoid an if statement or for loop without braces:

```JSON
"missing-braces": true,
```

### variable-length

Avoid variables with names shorter than 3 letters (while whitelisting $i or $id)

```JSON
"variable-length": {
  "min-length": 3,
  "whitelist": ["$id", "$i"]
}
```

### function-max-size

Avoid any function longer than 50 lines:

```JSON
"function-max-size": 50,
```

### loop-max-size

Aavoid loops with inside of them more than 15 lines (a block that should be a function):

```JSON
"loop-max-size": 15,
```

### forbidden-function-prefix

Avoid function names starting with a certain pattern:

```JSON
"forbidden-function-prefix": ["check"],
```

### if-assigment

Avoid assignment inside of an if statement:

```JSON
"if-assigment": true,
```

### complex-if

Avoid complicated ifs (eg more than 2 `&&`, combination of `&&` and `||`):

```JSON
"complex-if": true,
```

### ternary-max-length

Avoid ternary operator combined with line length exceeding 50 chars:

```JSON
"ternary-max-length": 50,
```

### loop-max-nest

Avoid triple inner for/foreach (eg for within for within for loop):

```JSON
"loop-max-nest": 2,
```

## TODO

Below is an exhaustive set of the initial rules we need implemented. Each rule should have it's own 'class/module' and act as a plugin for the wider system:

- [x] avoid triple inner for/foreach (eg for within for within for loop)
- [x] avoid a class without a single comment at the top stating purpose
- [x] avoid any function longer than 50 lines
- [ ] avoid indent deeper than 4 (maximum block nesting, eg for loop within an if within a for loop within a for loop)
- [x] avoid complicated ifs (eg more than 2 &&.., combination of && and ||)
- [x] avoid ternary operator combined with line length exceeding 50 chars
- [x] avoid namespaces with 15+ files
- [x] avoid loops with inside of them more than 15 lines (a block that should be a function)
- [x] avoid files with more than 200 lines.
- [x] avoid dangerous calls to eval, print_r, var_export, var_dump, phpinfo, exec,..(forbidden function list)
- [x] avoid assignment inside of an if statement
- [x] avoid an if statement or for loop without braces
- [x] avoid variables with names shorter than 3 letters (while whitelisting $i or $id)
- [x]
- [x] avoid overriding of a function's arguments
- [x] avoid empty catch blocks
