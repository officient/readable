module.exports = {
  check(maxLines, tokens, report) {
    const last = tokens.array[tokens.array.length - 1];
    if (typeof last === 'undefined') {
      // empty file do nothing;
      return;
    }

    if (last.line > maxLines) {
      report(`file contains more than ${maxLines} lines [${last.line}].`, last);
    }
  },
};
