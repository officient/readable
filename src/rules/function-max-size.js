const countLines = require('../line-count');

function getOptions(options) {
  // backward compatibility
  const oldConfig = (typeof options === 'number');
  const maxLines = oldConfig ? options : options['max-lines'];
  let comments = oldConfig ? true : options['include-comments'];
  let emptyLines = oldConfig ? true : options['include-empty-lines'];
  let brackets = oldConfig ? true : options['include-brackets'];
  if (comments === undefined) {
    comments = true;
  }
  if (emptyLines === undefined) {
    emptyLines = true;
  }
  if (brackets === undefined) {
    brackets = true;
  }

  return {
    maxLines, comments, emptyLines, brackets,
  };
}


module.exports = {
  check(options, tokens, report) {
    const settings = getOptions(options);

    tokens
      .matchAll('function', (token) => {
        const name = token.copy().step().body();
        const startToken = token.copy();
        const endToken = token.copy().stepTo('{').stepToClosing();
        const { lineCount, currentToken } = countLines(startToken, endToken, settings);

        if (lineCount > settings.maxLines) {
          report(`Function ${name} is longer than ${settings.maxLines} lines [${lineCount}].`, currentToken);
        }
      });
  },
};
