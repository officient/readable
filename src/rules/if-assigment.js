const matches = ['if', 'elseif'];

module.exports = {
  check(_, tokens, report) {
    tokens.matchAll(matches, (token) => {
      const braket = token.copy().step();
      braket.stepToClosing((assigment) => {
        if (assigment.body() === '=') {
          report('Assignment inside of an if statement.', token.current());
        }
      });
    });
  },
};
