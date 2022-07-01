/* eslint no-continue: off */
const countLines = require('../line-count');

module.exports = {
  check(options, tokens, report) {
    // backward compatibility
    const oldConfig = (typeof options === 'number');
    const maxLines = oldConfig ? options : options['max-lines'];
    const comments = oldConfig ? true : options['include-comments'];
    const emptyLines = oldConfig ? true : options['include-empty-lines'];

    const { lineCount, currentToken } = countLines(tokens.copy(), { comments, emptyLines });
    if (lineCount > maxLines) {
      report(`file contains more than ${maxLines} lines [${lineCount}].`, currentToken);
    }
  },
};
