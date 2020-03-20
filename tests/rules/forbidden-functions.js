const ruleTest = require('../../src/rule-test');
const rule = require('../../src/rules/forbidden-functions');

const invalid2 = `
<?php

func_call();
func_call();
func_call();
var_dump($variable);
func_call();`;

ruleTest('forbidden-functions', rule, {
  valid: [
    {
      src: '$var_dump = $print;',
      config: { functions: ['var_dump', 'phpinfo'] },
    },
  ],
  invalid: [
    {
      src: 'var_dump($variable);',
      config: { functions: ['var_dump', 'phpinfo'] },
      messageIncludes: 'call to var_dump.',
    },
    {
      src: invalid2,
      config: { functions: ['var_dump', 'phpinfo'] },
      messageIncludes: 'call to var_dump.',
    },
  ],
});
