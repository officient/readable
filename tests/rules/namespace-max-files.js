const test = require('ava');
const { checkFiles } = require('../../src/rules/namespace-max-files');

const files = [['./src/1.php', './src/2.php', './src/3.php']];

test.cb('namespace-max-files passes', (t) => {
  checkFiles(3, files, () => {
    t.fail();
    t.end();
  });
  t.pass();
  t.end();
});

test.cb('namespace-max-files reports', (t) => {
  t.plan(2);
  checkFiles(2, files, (path, message) => {
    t.is(path, './src');
    t.true(message.includes('than 2 files [3].'));
    t.end();
  });
});

const files2 = [['./src/1.php'], './src/2.php', './src/3.php', './src/4.php'];
test.cb('namespace-max-files reports when first file is dir', (t) => {
  checkFiles(2, files2, () => {
    t.end();
  });
});
