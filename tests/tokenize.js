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

test('tokenize string', (t) => {
  const tokens = tokenize(`
"double \\" ";
'single \\' ';
"\\\\";
`);

  t.true(hasToken(tokens, '"double \\" "'));
  t.true(hasToken(tokens, "'single \\' '"));
  t.true(hasToken(tokens, '"\\\\"'));
});

test('tokenize empty strings', (t) => {
  const tokens = tokenize(`
$a = "";
$a = '';
`);

  t.true(hasToken(tokens, '""'));
  t.true(hasToken(tokens, "''"));
});


test('tokenize numbers', (t) => {
  const tokens = tokenize(`
// yes, this is a valid php numbers in 7.4
1_234.567
6.674_083e-11
0xCAFE_F00D
`);

  t.true(hasToken(tokens, '1_234.567'));
});

test('tokenize operators', (t) => {
  const tokens = tokenize(`
if( !isset($city['id']))
{
  for($i = 2005; $i <= $year_end;$i++){}
}`);

  t.true(hasToken(tokens, 'isset'));
  t.true(hasToken(tokens, '!'));
  t.true(hasToken(tokens, ';'));
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

test('tokenize :: ', (t) => {
  const src = `
if($i == Auth::getUser())
{
  throw new Exception("null");
}
  `;
  const tokens = tokenize(src);
  t.true(hasToken(tokens, '::'));
});
