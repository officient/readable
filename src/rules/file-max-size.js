module.exports = {
  check(options, tokens, report) {
    const last = tokens.array[tokens.array.length - 1];
    if (typeof last === 'undefined') {
      // empty file do nothing;
      return;
    }

    if (last.line > options['max-lines']) {
      report(`file contains more than ${options['max-lines']} lines [${last.line}].`, last);
    }
  },
};
