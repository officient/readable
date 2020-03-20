const ruleTest = require('../../src/rule-test');
const rule = require('../../src/rules/variable-length');

ruleTest('variable-length', rule, {
  valid: [
    {
      src: '$normal = 1;',
      config: { 'min-length': ['3'] },
    },
    {
      src: '$id = 1;',
      config: { 'min-length': ['3'], whitelist: ['$id'] },
    },
  ],
  invalid: [
    {
      src: '$ii = 1;',
      config: { 'min-length': ['3'] },
      messageIncludes: 'is shorter than 3',
    },
  ],
});
