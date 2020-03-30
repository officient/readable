const ruleTest = require('../../src/rule-test');
const rule = require('../../src/rules/loop-max-size');

const src = `
<?php

foreach ($arr as $key => $value) {
    one();
    two();
    three();
}
`;

ruleTest('loop-max-size', rule, {
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
