const test = require('ava');
const { checkFiles } = require('../../src/rules/namespace-max-files');

const files = [['./src/1.php', './src/2.php', './src/3.php']];

test.cb('namespace-max-files passes', (t) => {
  checkFiles({ 'max-files': 3 }, files, () => {
    t.fail();
    t.end();
  });
  t.pass();
  t.end();
});

test.cb('namespace-max-files reports', (t) => {
  t.plan(2);
  checkFiles({ 'max-files': 2 }, files, (path, message) => {
    t.is(path, './src');
    t.true(message.includes('than 2 files.'));
    t.end();
  });
});
