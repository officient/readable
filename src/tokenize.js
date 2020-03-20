const Stream = require('./stream');

const types = {
  whitespace: 'whitespace',
  comment: 'comment',
  other: 'other',
  eof: 'eof',
};

// wraper around array of tokens
// to hep search and navigate
class Tokens {
  constructor(tokens) {
    this.array = tokens;
    this.pos = 0;
  }

  prev() { this.pos -= 1; }

  next() { this.pos += 1; }

  body() { return this.current().body; }

  type() { return this.current().type; }

  current() {
    if ((this.pos < 0) || (this.pos >= this.array.length)) {
      return { body: '', type: types.eof };
    }

    return this.array[this.pos];
  }

  forEach(callback) {
    const { pos } = this;
    for (let i = 0; i < 9; i += 1) {
      this.pos = i;
      callback(this);
    }
    // keep position
    this.pos = pos;
  }

  find(str, callback) {
    this.forEach((tokens) => {
      if (tokens.current().body === str) {
        callback(tokens);
      }
    });
  }
}


function readToken(stream) {
  if (stream.eat('\r') || stream.eat('\n')) {
    return types.whitespace;
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
