const ruleTest = require('../../src/rule-test');
const rule = require('../../src/rules/empty-catch');

const valid = `
<?php

try {
    something();
} catch (Exception $e) {
    doSomething();
};`;

const invalid = `
<?php

try {
    something();
} catch (Exception $e) {
    // do nothing
};`;

ruleTest('empty-catch', rule, {
  valid: [
    { src: valid },
  ],
  invalid: [
    {
      src: invalid,
      messageIncludes: 'Empty catch block',
    },
  ],
});
