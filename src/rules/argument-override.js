module.exports = {
  check(options, tokens, report) {
    tokens.matchAll('function', (token) => {
      const args = [];
      // extract args from ()
      token.step().step().stepToClosing((t1) => {
        if (t1.body().startsWith('$')) {
          args.push(t1.body());
        }
      });
      // search for args in function body
      token.step().stepToClosing((argToken) => {
        if (argToken.matches(args)) {
          argToken.stepTo(';', (t3) => {
            if (t3.matches('=')) {
              report(`Overriding of a function's argument ${argToken.body()}.`, argToken.current());
            }
          });
        }
      });
    });
  },
};
