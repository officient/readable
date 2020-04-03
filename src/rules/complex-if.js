const matches = ['if', 'elseif'];

module.exports = {
  check(_, tokens, report) {
    tokens.matchAll(matches, (token) => {
      const braket = token.copy().step();
      let countAnd = 0;
      let countOr = 0;
      braket.stepToClosing((operator) => {
        if (operator.body() === '&&') {
          countAnd += 1;
        }
        if (operator.body() === '||') {
          countOr += 1;
        }
      });
      if (countOr && countAnd) {
        report('Mixing && and || inside if statement.', token.current());
      }
      if ((countOr + countAnd) > 2) {
        report('More than 2 && or || inside if statement.', token.current());
      }
    });
  },
};
