const ruleTest = require('../../src/rule-test');
const rule = require('../../src/rules/argument-override');

const src = `
<?php

function some($one, $two)
{
    other($one);
    if ($one) {
        $other = 0;
    }
}
`;


const valid = `
function some(&$one)
{
    $one += 1;
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

const invalid3 = `
function some($one, $two)
{
    ++$one;
}
`;


const invalid4 = `
function some($one, $two)
{
    $one += 1;
}
`;

ruleTest('argument-override', rule, {
  valid: [
    { src },
    {
      src: valid,
      config: {
        'allow-pass-by-reference': true,
      },
    },
  ],
  invalid: [
    {
      src: invalid1,
      messageIncludes: 'Overriding of a function\'s argument',
    },
    { src: invalid2 },
    { src: invalid3 },
    { src: invalid4 },
  ],
});
