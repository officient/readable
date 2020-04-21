const loops = ['for', 'foreach', 'do', 'while'];

function check(maxNest, token, report, depth) {
  const end = token.copy().step();
  if (end.body() === '(') { // skip () if present
    end.stepToClosing().step();
  }
  if (end.body() === ';') { // do {} while ();
    return;
  }
  end.stepToClosing((inner) => {
    if (inner.matches(loops)) {
      if (depth === maxNest) {
        report(`Loop are nested more than ${maxNest} [${depth + 1}].`, inner.current());
      } else {
        check(maxNest, inner, report, depth + 1);
      }
    }
  });
}

module.exports = {
  check(maxNest, tokens, report) {
    tokens.matchAll(loops, (token) => {
      check(maxNest, token, report, 1);
    });
  },
};
