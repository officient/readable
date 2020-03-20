const { types } = require('../tokenize');

module.exports = {
  check(options, tokens, report) {
    tokens.find('class', (classToken) => {
      const prev = classToken.copy();
      prev.movePrev();
      while ((prev.type() === types.whitespace) || (prev.body() === 'abstract')) {
        prev.movePrev();
      }
      if (prev.type() !== types.comment) {
        report('Class have no comment above.', classToken.current());
      }
    });
  },
};
