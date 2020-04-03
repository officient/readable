const ruleTest = require('../../src/rule-test');
const rule = require('../../src/rules/max-nest');

const src = `
<?php

function some()
{
    foreach ($arr as $key => $value) {
        for ($i = 1; $i <= 10; $i++) {
            foreach ($arr as $key => $value) {
                echo $i;
            }
        }
    }
}
`;

ruleTest('max-nest', rule, {
  valid: [
    {
      src,
      config: 3,
    },
  ],
  invalid: [
    {
      src,
      config: 2,
      messageIncludes: 'are nested more',
    },
  ],
});
