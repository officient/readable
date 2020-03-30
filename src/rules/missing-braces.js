const matches = ['if', 'elseif', 'else', 'for', 'foreach'];

module.exports = {
  check(_, tokens, report) {
    tokens.matchAll(matches, (token) => {
      const braket = token.step();
      if (braket.body() === '(') {
        braket.stepToClosing().step();
      }
      if (braket.body() !== '{') {
        report('If statement or loop without braces.', token.current());
      }
    });
  },
};
