const test = require('ava');
const { tokenize } = require('../src/tokenize');

function hasToken(tokens, token) {
  let found = false;
  tokens.matchAll(token, () => {
    found = true;
  });

  return found;
}

test('tokenize track lines and columns', (t) => {
  const tokens = tokenize(`first

third
 forth`).array;

  const last = tokens[tokens.length - 1];
  t.is(last.column, 2);
  t.is(last.line, 4);
});

test('tokenize detects comments', (t) => {
  const tokens = tokenize(`
// comment
/*
multiline comment
*/
# old style`);
  t.true(hasToken(tokens, '# old style'));
});

test('tokenize detects function calls', (t) => {
  const tokens = tokenize('var_dump($var);');
  t.true(hasToken(tokens, 'var_dump'));
});

test('tokenize detects variables', (t) => {
  const tokens = tokenize('var_dump($var);');
  t.true(hasToken(tokens, '$var'));
});
