module.exports = {
  check(maxLines, tokens, report) {
    tokens.matchAll('function', (token) => {
      const name = token.copy().step().body();
      const end = token.copy().stepTo('{').stepToClosing();
      const lines = (end.current().line - token.current().line);
      if (lines > maxLines) {
        report(`Function ${name} is longer than ${maxLines} lines [${lines}].`, token.current());
      }
    });
  },
};
