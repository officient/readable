const test = require('ava');
const Errors = require('../src/errors');


test('generaets baseline ', (t) => {
  const errors = new Errors();
  errors.report('path1', 'rule1', 'msg', { line: 1 });
  errors.report('path1', 'rule1', 'msg', { line: 1 });
  errors.report('path1', 'rule2', 'msg', { line: 1 });
  t.deepEqual(errors.generateBaseline(), { path1: { rule1: 2, rule2: 1 } });
});

test('iognores  baselined errors ', (t) => {
  const errors = new Errors();
  errors.report('path1', 'rule1', 'msg', { line: 1 });
  errors.report('path1', 'rule1', 'msg', { line: 1 });

  const baseline = errors.generateBaseline();
  const errors2 = new Errors(baseline);
  errors2.report('path1', 'rule1', 'msg1', { line: 1 });
  errors2.report('path1', 'rule1', 'msg2', { line: 1 });
  errors2.report('path1', 'rule1', 'msg3', { line: 1 });
  t.deepEqual(errors2.errors, {
    path1: {
      rule1: { msg3: [{ line: 1 }] },
    },
  });
});

test('normalises baseline paths', (t) => {
  const errors = new Errors();
  errors.report('path1\\file1', 'rule1', 'msg', { line: 1 });
  errors.report('path2/file2', 'rule1', 'msg', { line: 1 });

  const baseline = errors.generateBaseline();

  const errors2 = new Errors(baseline);
  errors2.report('path1/file1', 'rule1', 'msg1', { line: 1 });
  errors2.report('path2\\file2', 'rule1', 'msg2', { line: 1 });
  t.deepEqual(errors2.errors, {});
});
