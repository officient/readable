module.exports = {
  check(prefixes, tokens, report) {
    tokens.matchAll('function', (token) => {
      const name = token.step().body();
      prefixes.forEach((prefix) => {
        if (name.startsWith(prefix)) {
          report(`Function name can't start from ${prefix} [${name}].`, token.current());
        }
      });
    });
  },
};
