module.exports = {
  check(options, tokens, report) {
    tokens.matchAll('catch', (catchToken) => {
      const next = catchToken.copy().stepTo('{').step();

      if (next.body() === '}') {
        report('Empty catch block.', catchToken.current());
      }
    });
  },
};
