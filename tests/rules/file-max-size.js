const ruleTest = require('../../src/rule-test');
const rule = require('../../src/rules/file-max-size');

const src = `
first();
second();
third();
`;

const src2 = `<?php
one();

/**
 * comment
 */

// comment 2
two();
`;

const src3 = `<?php
/**
 * This is
 * a very
 * long
 * comment
 */
   doSomething();

// This is a shorter comment

doSomethingElse();
`;

ruleTest('file-max-size', rule, {
  valid: [
    {
      src,
      config: 5,
    },
  ],
  invalid: [
    {
      src,
      config: 2,
      messageIncludes: 'than 2 lines [4]',
    },
    {
      src: src2,
      config: {
        'max-lines': 2,
        'include-comments': false,
        'include-empty-lines': true,
      },
      messageIncludes: 'than 2 lines [5]',
    },
    {
      src: src2,
      config: {
        'max-lines': 2,
        'include-comments': false,
        'include-empty-lines': false,
      },
      messageIncludes: 'than 2 lines [3]',
    },
    {
      src: src2,
      config: {
        'max-lines': 2,
        'include-comments': true,
        'include-empty-lines': true,
      },
      messageIncludes: 'than 2 lines [9]',
    },
    {
      src: src3,
      config: {
        'max-lines': 2,
        'include-comments': true,
        'include-empty-lines': false,
      },
      messageIncludes: 'than 2 lines [10]',
    },
    {
      src: src3,
      config: {
        'max-lines': 2,
        'include-comments': false,
        'include-empty-lines': true,
      },
      messageIncludes: 'than 2 lines [5]',
    }
  ],
});
