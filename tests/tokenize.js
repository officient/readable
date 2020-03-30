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
  t.is(tokens.array[tokens.array.length - 1].body, '# old style');
});

test('tokenize detects function calls', (t) => {
  const tokens = tokenize('var_dump($var);');
  t.true(hasToken(tokens, 'var_dump'));
});

test('tokenize detects variables', (t) => {
  const tokens = tokenize('var_dump($var);');
  t.true(hasToken(tokens, '$var'));
});

test('tokenize steps to', (t) => {
  const tokens = tokenize('one(); next(); last();');

  t.is(tokens.stepTo('next').body(), 'next');
});

test('tokenize steps to close', (t) => {
  const tokens = tokenize('{ { } } }');
  const closed = tokens.stepToClosing();
  t.is(closed.current().column, 7);
});
