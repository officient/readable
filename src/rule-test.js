
/* eslint import/no-extraneous-dependencies:off */

const ava = require('ava');
const { tokenize } = require('./tokenize');

function ruleTest(name, rule, tests) {
  tests.valid.forEach((test, i) => {
    const tokens = tokenize(test.src);
    ava.cb(`${name} passes [${i + 1}]`, (t) => {
      rule.check(test.config, tokens, () => {
        t.fail();
        t.end();
      });
      t.pass();
      t.end();
    });
  });
  tests.invalid.forEach((test, i) => {
    const tokens = tokenize(test.src);
    ava.cb(`${name} reports [${i + 1}]`, (t) => {
      rule.check(test.config, tokens, (message) => {
        if (test.messageIncludes) {
          t.true(
            message.includes(test.messageIncludes),
            `Expected '${test.messageIncludes}' got '${message}'`,
          );
        }
        t.end();
      });
    });
  });
}

module.exports = ruleTest;
