const ruleTest = require('../../src/rule-test');
const rule = require('../../src/rules/file-max-size');

const src = `
first();
second();
third();
`;

ruleTest('file-max-size', rule, {
  valid: [
    {
      src,
      config: { 'max-lines': 5 },
    },
  ],
  invalid: [
    {
      src,
      config: { 'max-lines': 2 },
      messageIncludes: 'than 2 lines [4]',
    },
  ],
});
