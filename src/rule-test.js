
/* eslint import/no-extraneous-dependencies:off */

const ava = require('ava');
const { tokenize } = require('./tokenize');

function ruleTest(name, rule, tests) {
  tests.valid.forEach((test) => {
    const tokens = tokenize(test.src);
    ava.cb(`${name} passes`, (t) => {
      rule.check(test.config, tokens, () => {
        t.fail();
        t.end();
      });
      t.pass();
      t.end();
    });
  });
  tests.invalid.forEach((test) => {
    const tokens = tokenize(test.src);
    ava.cb(`${name} reports`, (t) => {
      rule.check(test.config, tokens, (message) => {
        t.true(message.includes(test.messageIncludes));
        t.end();
      });
    });
  });
}

module.exports = ruleTest;
