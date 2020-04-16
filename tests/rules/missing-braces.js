const ruleTest = require('../../src/rule-test');
const rule = require('../../src/rules/missing-braces');


const valid = `
<?php

foreach ($arr as $key => $value) {
    print_r($arr);
}

if ($a == 1) {
    do();
} else if ($b == 1) {
    do();
};
`;

const invalid = `
<?php

if ($a > $b)
  echo "something";
`;

ruleTest('missing-braces', rule, {
  valid: [
    {
      src: valid,
      config: true,
    },
  ],
  invalid: [
    {
      src: invalid,
      config: true,
      messageIncludes: 'If statement or loop without braces',
    },
  ],
});
