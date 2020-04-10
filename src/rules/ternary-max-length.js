module.exports = {
  check(maxLength, tokens, report) {
    tokens.matchAll('?', (token) => {
      const lineEnd = token.copy();
      let isTernary = false;
      lineEnd.stepTo(';', (operator) => {
        if (operator.body() === ':') {
          // check if it's really ternary
          isTernary = true;
        }
      });

      const length = lineEnd.current().column;
      if (isTernary && (length > maxLength)) {
        report(`Line with ternaty longer than ${maxLength} [${length}]`, token.current());
      }
    });
  },
};
