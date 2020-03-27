module.exports = {
  check(functions, tokens, report) {
    tokens.matchAll(functions, (token) => {
      report(`Dangerous call to ${token.body()}.`, token.current());
    });
  },
};
