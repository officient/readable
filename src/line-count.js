const { types } = require('./tokenize');

function countLines(startToken, endToken, { comments, emptyLines, brackets }) {
  const tokens = startToken.copy();

  // Count empty lines
  let typesPerLine = {};
  const tokenIterator = startToken.copy();
  let emptyLineCount = 0;
  let previousToken = null;
  let currentToken = tokenIterator.current();
  while (tokenIterator.pos <= endToken.pos && tokens.type() !== types.eof) {
    const currentLine = currentToken.line;

    // Update types per line
    const group = (typesPerLine[currentLine] || []);
    group.push(tokenIterator.current().type);
    typesPerLine = { ...typesPerLine, [currentLine]: group };

    // If a comment is followed with a newline on a future line number.
    // The comment ends on that line. Therefore, the future line is not an empty line.
    // And we cannot count this for our empty line count.
    const isDiffLine = previousToken && previousToken.line !== currentToken.line;
    const currentIsNewLine = currentToken.body === '\n' || currentToken.body === '\r';
    const previousIsComment = previousToken && previousToken.type === types.comment;
    if (isDiffLine && previousIsComment && currentIsNewLine) {
      emptyLineCount -= 1;
    }

    // Step through iterator and update variables
    tokenIterator.step(false, true);
    previousToken = currentToken;
    currentToken = tokenIterator.current();
  }

  // Empty lines are lines which contain only whitespaces
  emptyLineCount += Object.values(typesPerLine)
    .filter((typesOnLine) => typesOnLine.every((tokenType) => tokenType === types.whitespace))
    .length;

  // Count lines including empty lines. Excludes comments if `include-comments` is falsy.
  const lines = new Set();
  while (tokens.pos <= endToken.pos && tokens.type() !== types.eof) {
    tokens.body().split(/\r?\n/).forEach((_, i) => {
      if (tokens.type() === types.whitespace) {
        return;
      }
      if (tokens.type() === types.comment && !comments) {
        return;
      }
      if ((tokens.type() === types.bracket && !brackets)) {
        return;
      }
      lines.add(tokens.current().line + i);
    });
    tokens.step(false, comments || emptyLines);
  }

  if (tokens.current().type === types.eof) {
    tokens.step(true);
  }
  // Count the total amount of lines based on the settings
  // +1 to include the first line.
  let lineCount = tokens.current().line - startToken.current().line + 1;
  if (!emptyLines || !comments || !brackets) {
    lineCount = lines.size;
    if (emptyLines) {
      lineCount += emptyLineCount;
    }
  }

  return {
    lineCount,
    currentToken: tokens.current(),
  };
}

module.exports = countLines;
