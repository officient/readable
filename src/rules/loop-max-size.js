const loops = ['for', 'foreach'];

module.exports = {
  check(maxLines, tokens, report) {
    tokens.matchAll(loops, (token) => {
      const end = token.copy().step().stepToClosing(); // skip ()
      end.step().stepToClosing();
      const lines = (end.current().line - token.current().line);
      if (lines > maxLines) {
        report(`Loop is longer than ${maxLines} lines [${lines}].`, token.current());
      }
    });
  },
};
