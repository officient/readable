const test = require('ava');
const { tokenize } = require('../src/tokenize');


test('tokenize track lines and columns', (t) => {
  const tokens = tokenize(`first

third
 forth`);

  const last = tokens[tokens.length - 1];
  t.is(last.column, 2);
  t.is(last.line, 4);
});
