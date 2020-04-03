const ruleTest = require('../../src/rule-test');
const rule = require('../../src/rules/if-assigment');


const src = `
<?php

if ($a == $b) {
    print_r($a);
}
`;

const invalid = `
<?php

if ($a = $b) {
    print_r($a);
}
`;

ruleTest('if-assigment', rule, {
  valid: [
    {
      src,
      config: true,
    },
  ],
  invalid: [
    {
      src: invalid,
      config: true,
      messageIncludes: 'Assignment inside of an if statement',
    },
  ],
});
