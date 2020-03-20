const Stream = require('./stream');

const types = {
  whitespace: 'whitespace',
  newline: 'newline',
  comment: 'comment',
  other: 'other',
};

// wraper around array of tokens
// to hep search and navigate
class Tokens {
  constructor(tokens) {
    this.array = tokens;
  }
}


function readToken(stream) {
  if (stream.eat('\r') || stream.eat('\n')) {
    return types.newline;
  }
  if (stream.eat(/\s+/)) {
    return types.whitespace;
  }

  if (stream.eat('//') || stream.eat('#')) {
    stream.eatUntil(/[\r\n]/);
    return types.comment;
  }
  if (stream.eat('/*')) {
    stream.eatUntil(/\*\//, true);
    return types.comment;
  }

  if (stream.eat(/\S+/)) {
    return types.other;
  }

  throw new Error(`Error parsing near ${stream.line}:${stream.column}`);
}

function tokenize(str) {
  const stream = new Stream(str);
  const tokens = [];

  while (!stream.eof()) {
    const token = {
      line: stream.line,
      column: stream.column,
    };
    token.type = readToken(stream);
    token.body = stream.current();

    tokens.push(token);
    stream.next();
  }
  return new Tokens(tokens);
}

module.exports = {
  types,
  tokenize,
};
