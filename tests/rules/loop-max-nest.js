const ruleTest = require('../../src/rule-test');
const rule = require('../../src/rules/loop-max-nest');

const src = `
<?php

foreach ($arr as $key => $value) {
    for ($i = 1; $i <= 10; $i++) {
        foreach ($arr as $key => $value) {
            echo $i;
        }
    }
}
`;

const invalid = `
<?php

do {
    while ($i <= 10) {
        foreach ($arr as $key => $value) {
            echo $i;
        }
    }
} while ($i > 0);

`;


ruleTest('loop-max-nest', rule, {
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
    {
      src: invalid,
      config: 2,
    },
  ],
});
