module.exports = {
  check(options, tokens, report) {
    const whitelist = options.whitelist || [];
    tokens.forEach((token) => {
      const variable = token.body();
      if (!variable.startsWith('$') || (whitelist.includes(variable))) {
        return;
      }

      const length = variable.length - 1;
      const minLength = options['min-length'];
      if (length < minLength) {
        report(`Variable ${variable} name is shorter than ${minLength} [${length}].`, token.current());
      }
    });
  },
};
