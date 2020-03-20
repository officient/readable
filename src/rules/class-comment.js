const { types } = require('../tokenize');

module.exports = {
  check(options, tokens, report) {
    tokens.find('class', (tokens) => {
      tokens.prev();
      while ((tokens.type() == types.whitespace) || (tokens.body() == 'abstract')) {
        tokens.prev();
      }
      if (tokens.type() !== types.comment) {
        report('Class have no comment above.', tokens.current());
      }
    });
  },
};
