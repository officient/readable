/* eslint no-continue: off */
const { types } = require('../tokenize');

module.exports = {
  check(options, tokens, report) {
    // backward compatibility
    const oldConfig = (typeof options === 'number');
    const maxLines = oldConfig ? options : options['max-lines'];
    const comments = oldConfig ? true : options['include-commants'];
    const emptyLines = oldConfig ? true : options['include-empty-lines'];

    const lines = new Set();
    while (tokens.type() !== types.eof) {
      if ((tokens.type() === types.comment && !comments)
          || (tokens.type() === types.whitespace && !emptyLines)) {
        tokens.step();
        continue;
      }
      tokens.body().split(/\r?\n/).forEach((_, i) => {
        lines.add(tokens.current().line + i);
      });
      tokens.step(false, comments || emptyLines);
    }
    if (lines.size > maxLines) {
      report(`file contains more than ${maxLines} lines [${lines.size}].`, tokens.current());
    }
  },
};
