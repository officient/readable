const countLines = require('../line-count');

module.exports = {
  check(options, tokens, report) {
    // backward compatibility
    const oldConfig = (typeof options === 'number');
    const maxLines = oldConfig ? options : options['max-lines'];
    const comments = oldConfig ? true : options['include-comments'];
    const emptyLines = oldConfig ? true : options['include-empty-lines'];

    const settings = { comments, emptyLines };
    const startToken = tokens.copy();
    const endToken = tokens.copy().stepToEof();
    const { lineCount, currentToken } = countLines(startToken, endToken, settings);
    if (lineCount > maxLines) {
      report(`file contains more than ${maxLines} lines [${lineCount}].`, currentToken);
    }
  },
};
