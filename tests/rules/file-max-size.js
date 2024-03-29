/* eslint-disable no-tabs */
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

/**
 * 17 line breaks
 * 7 comments
 * 4 empty lines
 * 2 brackets
 */
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
		  
if(true)
{
  echo "hello world";
}
`;

ruleTest('file-max-size', rule, {
  valid: [
    {
      src,
      config: 4,
    },
    {
      src: src2,
      config: 9,
    },
    {
      src: src3,
      config: {
        'max-lines': 17,
        'include-empty-lines': true,
        'include-comments': true,
        'include-brackets': true,
      },
    },
    {
      src: src3,
      config: {
        'max-lines': 17,
        'include-empty-lines': true,
        'include-comments': true,
        'include-brackets': true,
      },
    },
  ],
  invalid: [
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
      messageIncludes: 'than 2 lines [14]',
    },
    {
      src: src3,
      config: {
        'max-lines': 2,
        'include-comments': false,
        'include-empty-lines': true,
      },
      messageIncludes: 'than 2 lines [10]',
    },
    {
      src: src3,
      config: {
        'max-lines': 2,
        'include-comments': true,
        'include-empty-lines': true,
        'include-brackets': false,
      },
      messageIncludes: 'than 2 lines [15]',
    },
  ],
});
