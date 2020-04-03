module.exports = {
  check(maxLevel, tokens, report) {
    tokens.matchAll('function', (token) => {
      let level = 0;
      token.copy().stepTo('{').stepToClosing((inner) => {
        if (inner.body() === '{') {
          level += 1;
          if (level > maxLevel) {
            report(`Blocks are nested more than ${maxLevel} lines [${level}].`, inner.current());
          }
        }
        if (inner.body() === '}') {
          level -= 1;
        }
      });
    });
  },
};
