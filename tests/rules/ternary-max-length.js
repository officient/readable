const ruleTest = require('../../src/rule-test');
const rule = require('../../src/rules/ternary-max-length');

const src = `
<?php

    $action = (empty($_POST['action'])) ? 'default' : $_POST['action'];

`;

ruleTest('ternary-max-length', rule, {
  valid: [
    {
      src,
      config: 80,
    },
  ],
  invalid: [
    {
      src,
      config: 50,
      messageIncludes: 'longer than 50 [67]',
    },
  ],
});
