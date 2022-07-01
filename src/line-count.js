const { types } = require('./tokenize');

function countLines(startToken, endToken, { comments, emptyLines }) {
  const tokens = startToken.copy();

  // Count empty lines
  let typesPerLine = {};
  const tokenIterator = startToken.copy();
  while (tokenIterator.pos !== endToken.pos) {
    const currentLine = tokenIterator.current().line;
    const group = (typesPerLine[currentLine] || []);
    group.push(tokenIterator.current().type);
    typesPerLine = { ...typesPerLine, [currentLine]: group };
    tokenIterator.step(false, true);
  }

  let emptyLineCount = Object.values(typesPerLine)
    .filter((typesOnLine) => typesOnLine.every((tokenType) => tokenType === types.whitespace))
    .length;

  // Ignore new lines after block comments
  const lineNumbers = Object.keys(typesPerLine).sort();
  for (let i = 1; i < lineNumbers.length; i += 1) {
    const previousLine = typesPerLine[lineNumbers[i - 1]];
    const currentLine = typesPerLine[lineNumbers[i]];
    const prevLineIsComment = previousLine.every((tokenType) => tokenType === types.comment);
    const curLineIsWhitespace = currentLine.every((tokenType) => tokenType === types.whitespace);
    // Current line contains the new line for the block comment. So, this is not an empty line.
    if (prevLineIsComment && curLineIsWhitespace) {
      emptyLineCount -= 1;
    }
  }

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
  if (!emptyLines || !comments) {
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
