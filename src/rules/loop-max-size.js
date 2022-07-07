
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

    const loops = ['for', 'foreach'];
    tokens.matchAll(loops, (token) => {
      const startToken = token.copy();
      const endToken = token.copy()
        .step()
        .stepToClosing() // skip ()
        .step()
        .stepToClosing(); // Go to ending bracelet

      const { lineCount, currentToken } = countLines(startToken, endToken, settings);
      if (lineCount > settings.maxLines) {
        report(`Loop is longer than ${settings.maxLines} lines [${lineCount}].`, currentToken);
      }
    });
  },
};
