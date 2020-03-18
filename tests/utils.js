const test = require('ava');
const utils = require('../src/utils');


test('build dir tree', (t) => {
  t.deepEqual(utils.dirsTree(['./tests/fixtures/files/'], '.php'), [
    [
      'tests/fixtures/files/1.php',
      [
        'tests/fixtures/files/inner/2.php',
        'tests/fixtures/files/inner/3.php',
      ],
    ],
  ]);
});
