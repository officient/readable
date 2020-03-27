const { types } = require('../tokenize');

module.exports = {
  check(options, tokens, report) {
    tokens.matchAll('class', (classToken) => {
      const prev = classToken.copy();
      do {
        prev.step(true, true);
      } while ((prev.type() === types.whitespace) || (prev.body() === 'abstract'));

      if (prev.type() !== types.comment) {
        report('Class have no comment above.', classToken.current());
      }
    });
  },
};
