const increments = ['++', '--'];
const assigment = ['=', '+=', '-=', '*=', '/=', '%=', '.='];

module.exports = {
  check(options, tokens, report) {
    const allowKey = 'allow-pass-by-reference';
    const allowReference = (options && allowKey in options) ? options[allowKey] : false;
    tokens.matchAll('function', (token) => {
      const args = [];
      // extract args from ()
      token.step().step().stepToClosing((t1) => {
        if (t1.body().startsWith('$')) {
          if (allowReference && t1.copy().step(true).matches('&')) {
            return;
          }
          args.push(t1.body());
        }
      });
      // search for args in function body
      token.step().stepToClosing((argToken) => {
        if (argToken.matches(args)) {
          const rep = (arg, t) => {
            report(`Overriding of a function's argument ${arg}.`, t.current());
          };
          const arg = argToken.body();
          const prev = argToken.copy().step(true);
          if (prev.matches(increments)) {
            rep(arg, prev);
          }
          // check if token in beginning of statement
          if (!prev.matches(['{', ';', ')'])) {
            return;
          }
          argToken.stepTo(';', (t3) => {
            if (t3.matches(increments) || t3.matches(assigment)) {
              rep(arg, t3);
            }
          });
        }
      });
    });
  },
};
