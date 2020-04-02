/**
 * A module for tokenizing PHP code.
 * @module tokenize
 */

const Stream = require('./stream');

/**
 * Token types enum.
 * @readonly
 * @enum {number}
 */
const types = {
  whitespace: 0,
  comment: 1,
  label: 2,
  variable: 3,
  other: 4,
  bracket: 5,
  operator: 6,
  string: 7,
  number: 8,
  eof: 9,
};

/**
 * @typedef Token
 * @type {object}
 * @property {string} type - token type
 * @property {string} body - token body
 * @property {number} line - token line
 * @property {number} column - token column
 */

/**
 * Class for navigation over array tokens
 */
class Tokens {
  constructor(tokens, pos) {
    this.array = tokens;
    this.pos = pos || 0;
  }

  /**
   * Is current token a code (not whitespace and comment)
   * @return {Boolean}
   */
  isCode() {
    const type = this.type();
    return (type !== types.whitespace) && (type !== types.comment);
  }

  /**
   * Moves current position
   * @param  {Boolean} [backward] move backward
   * @param  {Boolean} [includeAll] include comments and whitespace
   * @return {this}
   */
  step(backward, includeAll) {
    const step = backward ? -1 : 1;
    do {
      this.pos += step;
      if (includeAll) {
        return this;
      }
    } while (!this.isCode());

    return this;
  }

  /**
   * Check if current body matches string
   * or array of strings
   * @param  {(string|string[])}
   * @return {Boolean}
   */
  matches(strings) {
    if (typeof strings === 'string') {
      return this.body() === strings;
    }

    return strings.includes(this.body());
  }

  /**
   * Steps to next occutance of strings
   *
   * @param  {(string|string[])}
   * @param  {tockensCallback} callback callback for each step
   * @return {this}
   */
  stepTo(strings, callback) {
    do {
      this.step();
      this.call(callback);
    } while (!(this.matches(strings) || this.type() === types.eof));
    return this;
  }

  /**
   * Steps to correct closing brace
   * @param  {tockensCallback} callback callback for each step
   *
   * @return {this}
   */
  stepToClosing(callback) {
    const pairs = { '{': '}', '[': ']', '(': ')' };
    const open = this.body();
    if (!(open in pairs)) {
      // do nothing if not brace
      return this;
    }
    const close = pairs[open];
    let level = 1;
    while (level > 0) {
      this.step();
      if (this.body() === open) {
        level += 1;
      }
      if (this.body() === close) {
        level -= 1;
      }
      if (this.type() === types.eof) {
        // reached end of file
        break;
      }
      this.call(callback);
    }

    return this;
  }

  /**
   * Returns current token body
   * @return {string}
   */
  body() { return this.current().body; }

  /**
   * Returns current token type
   * @return {string}
   */
  type() { return this.current().type; }

  copy() { return new Tokens(this.array, this.pos); }

  /**
   * Returns current token
   * @return {Token}
   */
  current() {
    if ((this.pos < 0) || (this.pos >= this.array.length)) {
      return { body: '', type: types.eof };
    }

    return this.array[this.pos];
  }

  /**
   * Call callback preserving current position;
   * @param  {tockensCallback} callback
   */
  call(callback) {
    if (callback) {
      const { pos } = this;
      callback(this);
      this.pos = pos;
    }
  }

  forEach(callback) {
    const { pos } = this;
    for (let i = 0; i < this.array.length; i += 1) {
      this.pos = i;
      if (this.isCode()) {
        callback(this);
      }
    }
    // keep position
    this.pos = pos;
  }

  /**
   * This callback is called by matchAll and for Each
   * @callback tockensCallback
   * @param {Tokens} tokens
   */

  /**
   * Match all occurances of string or array of
   * string
   *
   * @param  {(string|string[])}
   * @param  {tockensCallback} callback function
   */
  matchAll(strings, callback) {
    const array = (typeof strings === 'string') ? [strings] : strings;

    this.forEach((tokens) => {
      const body = tokens.body();
      if (array.includes(body)) {
        callback(tokens);
      }
    });
  }
}

const space = /\s+/g;
const nonSpace = /\S+/g;
const brackets = /[[\]{}()]/g;
// from official PHP docs
const labelText = '[a-zA-Z_\\u0080-\\u00ff][a-zA-Z0-9_\\u0080-\\u00ff]*';
const label = new RegExp(labelText, 'g');
const variable = new RegExp(`\\$${labelText}`, 'g');
const operators = /[*+\-%!^&|?><>=@]+/g;
const separators = /[,;]/g;
const number = /[0-9][0-9._]*/g;
// terminators
const enfOfLine = /[\r\n]/gm;
const endOfComment = /\*\//gm;
const enfOfQuote = /[^\\]"/gm;
const endOfSingleQuote = /[^\\]'/gm;

function readToken(stream) {
  if (stream.eat('\r') || stream.eat('\n')) {
    return types.whitespace;
  }

  if (stream.eat(space)) {
    return types.whitespace;
  }

  if (stream.eat('//') || stream.eat('#')) {
    stream.eatUntil(enfOfLine);
    return types.comment;
  }

  if (stream.eat('/*')) {
    stream.eatUntil(endOfComment, true);
    return types.comment;
  }

  if (stream.eat(brackets)) {
    return types.bracket;
  }

  if (stream.eat(label)) {
    return types.label;
  }

  if (stream.eat(variable)) {
    return types.variable;
  }

  if (stream.eat('"')) {
    stream.eatUntil(enfOfQuote, true);
    return types.string;
  }

  if (stream.eat("'")) {
    stream.eatUntil(endOfSingleQuote, true);
    return types.string;
  }

  if (stream.eat(number)) {
    return types.number;
  }

  if (stream.eat(operators)) {
    return types.operator;
  }

  if (stream.eat(separators)) {
    return types.operator;
  }

  if (stream.eat(nonSpace)) {
    return types.other;
  }

  return false;
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
    if (token.type === false) {
      return false;
    }
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
