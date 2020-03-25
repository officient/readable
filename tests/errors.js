const test = require('ava');
const Errors = require('../src/errors');


test('generaets baseline ', (t) => {
  const errors = new Errors();
  errors.report('path1', 'rule1', 'msg', { line: 1 });
  errors.report('path1', 'rule1', 'msg', { line: 1 });
  errors.report('path1', 'rule2', 'msg', { line: 1 });
  t.deepEqual(errors.generateBaseline(), { path1: { rule1: 2, rule2: 1 } });
});
