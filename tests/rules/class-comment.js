const ruleTest = require('../../src/rule-test');
const rule = require('../../src/rules/class-comment');

const valid1 = `
// good case
class Good()
{
}`;

const valid2 = `
/*
also good
*/
abstract class Good()
{
}`;

const invalid = `
class Bad()
{
}`;

ruleTest('class-comment', rule, {
  valid: [
    { src: valid1 },
    { src: valid2 },
  ],
  invalid: [
    {
      src: invalid,
      messageIncludes: 'no comment above.',
    },
  ],
});
