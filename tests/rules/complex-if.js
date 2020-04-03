const ruleTest = require('../../src/rule-test');
const rule = require('../../src/rules/complex-if');


const src = `
<?php

if ($a && $b) {
    print_r($a);
}
`;

const invalid1 = `
<?php

if (($a && $b) || $c) {
    print_r($a);
}
`;

const invalid2 = `
<?php

if ($a && $b && $c && d) {
    print_r($a);
}
`;


ruleTest('complex-if', rule, {
  valid: [
    {
      src,
      config: true,
    },
  ],
  invalid: [
    {
      src: invalid1,
      config: true,
      messageIncludes: 'Mixing',
    },
    {
      src: invalid2,
      config: true,
      messageIncludes: 'More than 2',
    },
  ],
});
