const ruleTest = require('../../src/rule-test');
const rule = require('../../src/rules/argument-override');

const src = `
<?php

function some($one, $two)
{
    other($one);
}
`;

const invalid1 = `
function some($one, $two)
{
    $one = 1;
}
`;

const invalid2 = `
function some($one, $two)
{
    $one->some = 1;
}
`;

ruleTest('argument-override', rule, {
  valid: [
    { src },
  ],
  invalid: [
    {
      src: invalid1,
      messageIncludes: 'Overriding of a function\'s argument',
    },
    {
      src: invalid2,
      messageIncludes: 'Overriding of a function\'s argument',
    },
  ],
});
