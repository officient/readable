# Adding new rule

Assume you want to add rule that prevents functions that
start from certain words. We will get the list of prefixes
from readable config file. Add to `default.readable.json`
new rule:

```JSON
{
  "pathes": [
    "src/"
  ],
  "rules": {
    "...": "...",
    "forbidden-function-prefix": ["check"],
    "...": "..."
}
```

Rule is a javascript module that exports one function `check`.
Create the file `rules\forbidden-function-prefix.js`:

```javascript
module.exports = {
  check(prefixes, tokens, report) {
    // Find all occurances of string `function`
    tokens.matchAll('function', (token) => {
      const name = token.step().body();
      prefixes.forEach((prefix) => {
        if (name.startsWith(prefix)) {
          report(`Function name can't start from ${prefix} [${name}].`, token.current());
        }
      });
    });
  },
};
```
First param of a function is a config from config file.
Secon is an instance of [Tokens](api.md#module_tokenize..Tokens) class,
it helps to navigate over ther tokens array. Assume we have next php
file:

```php
<?php

function checkMsg($msg) {
    echo $msg;
}
```

We shoud found all occurances of `function`, we should select the next token
after it (`step()`) and get it's body. If we found that name starts from
forbidden words we report it.

## ruleTest helper

Create unit test for your rule in `tests\rules\forbidden-function-prefix.js`.

```javascriptconst ruleTest = require('../../src/rule-test');
const rule = require('../../src/rules/forbidden-function-prefix');

const code = `
<?php

function checkMsg($msg) {
    echo $msg;
}
`;

ruleTest('forbidden-function-prefix', rule, {
  valid: [
    {
      src: code,
      config: ['other'],
    },
  ],
  invalid: [
    {
      src: code,
      config: ['check'],
      messageIncludes: 'can\'t start from',
    },
  ],
});
```

`ruleTest` helper accepts rule, and list of valid and invalid cases.
