const test = require('ava');
const utils = require('../src/utils');


test('build dir tree', (t) => {
  const dirs = [
    './tests/fixtures/files/',
    '!./tests/fixtures/files/ignore/',
  ];
  t.deepEqual(utils.dirsTree(dirs, '.php'), [
    [
      'tests/fixtures/files/1.php',
      [
        'tests/fixtures/files/inner/2.php',
        'tests/fixtures/files/inner/3.php',
      ],
    ],
  ]);
});

test('keeps order on stringify', (t) => {
  const obj1 = {};
  obj1.prop1 = '1';
  obj1.prop2 = '2';
  const obj2 = {};
  obj2.prop2 = '2';
  obj2.prop1 = '1';
  t.is(utils.stringify(obj1), utils.stringify(obj2));
});
