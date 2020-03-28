const ruleTest = require('../../src/rule-test');
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
