module.exports = {
  check(options, tokens, report) {
    tokens.find(options.functions, (token) => {
      report(`Dangerous call to ${token.body()}.`, token.current());
    });
  },
};
