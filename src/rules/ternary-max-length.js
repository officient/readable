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

      if (isTernary && (lineEnd.current().column > maxLength)) {
        report(`Line with ternaty longer than ${maxLength} []`, token.current());
      }
    });
  },
};
