/* eslint no-continue: off */
const { types } = require('../tokenize');

module.exports = {
  check(options, tokens, report) {
    // backward compatibility
    const oldConfig = (typeof options === 'number');
    const maxLines = oldConfig ? options : options['max-lines'];
    const comments = oldConfig ? true : options['include-comments'];
    const emptyLines = oldConfig ? true : options['include-empty-lines'];

    const lines = new Set();
    while (tokens.type() !== types.eof) {
      tokens.body().split(/\r?\n/).forEach((_, i) => {
        if (tokens.type() === types.whitespace) {
          return;
        }
        if ((tokens.type() === types.comments) && !comments) {
          return;
        }
        lines.add(tokens.current().line + i);
      });
      tokens.step(false, comments || emptyLines);
    }

    tokens.step(true);
    const lineCount = (emptyLines && comments) ? tokens.current().line : lines.size;
    if (lineCount > maxLines) {
      report(`file contains more than ${maxLines} lines [${lineCount}].`, tokens.current());
    }
  },
};
