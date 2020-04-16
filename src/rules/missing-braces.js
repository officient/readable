const matches = ['if', 'elseif', 'else', 'for', 'foreach'];

module.exports = {
  check(_, tokens, report) {
    tokens.matchAll(matches, (token) => {
      const braket = token.copy().step();
      // special treatment for else if
      if ((token.body() === 'else') && (braket.body() === 'if')) {
        return;
      }
      if (braket.body() === '(') {
        braket.stepToClosing().step();
      }
      if (braket.body() !== '{') {
        report('If statement or loop without braces.', token.current());
      }
    });
  },
};
