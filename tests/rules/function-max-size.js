const ruleTest = require('../../src/rule-test');
const rule = require('../../src/rules/function-max-size');

const src = `
<?php

function some() {
    one();
    two();
    three();
}
`;

/**
 * function has 12 lines
 * -> 4 lines are comments
 * -> 3 lines are empty new lines
 * -> 2 lines are brackets
 */
const src2 = `<?php

function hooray()
{
    one();
    /**
     * comment
     */

    // comment 2
    two();

}

`;
ruleTest('function-max-size', rule, {
  valid: [
    {
      src,
      config: 5,
    },
    {
      src: src2,
      config: {
        'max-lines': 11,
        'include-comments': true,
        'include-empty-lines': true,
        'include-brackets': true,
      },
    },
  ],
  invalid: [
    {
      src,
      config: 3,
      messageIncludes: 'than 3 lines [5]',
    },
    {
      src: src2,
      config: {
        'max-lines': 3,
        'include-comments': false,
        'include-empty-lines': true,
        'include-brackets': true,
      },
      messageIncludes: 'than 3 lines [8]',
    },
    {
      src: src2,
      config: {
        'max-lines': 3,
        'include-empty-lines': false,
      },
      messageIncludes: 'than 3 lines [9]',
    },
    {
      src: src2,
      config: {
        'max-lines': 4,
        'include-brackets': false,
      },
      messageIncludes: 'than 4 lines [10]',
    },
    {
      src: src2,
      config: {
        'max-lines': 1,
        'include-comments': false,
        'include-empty-lines': false,
        'include-brackets': false,
      },
      messageIncludes: 'than 1 lines [3]',
    },
  ],
});
