const ruleTest = require('../../src/rule-test');
const rule = require('../../src/rules/function-max-size');

const src = `
<?php

function some() {
    one();
    two();
    three();
}
`;

ruleTest('function-max-size', rule, {
  valid: [
    {
      src,
      config: 4,
    },
  ],
  invalid: [
    {
      src,
      config: 3,
      messageIncludes: 'than 3 lines',
    },
  ],
});
