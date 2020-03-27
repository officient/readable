/**
 * A module for tokenizing PHP code.
 * @module tokenize
 */

const Stream = require('./stream');

/**
 * Token types enum.
 * @readonly
 * @enum {string}
 */
const types = {
  whitespace: 'whitespace',
  comment: 'comment',
  label: 'label',
  variable: 'variable',
  other: 'other',
  bracket: 'bracket',
  eof: 'eof',
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
   * Is current token a code (not whitespace adn comment)
   * @return {Boolean}
   */
  isCode() {
    const type = this.type();
    return (type !== types.whitespace) && (type !== types.comment);
  }

  /**
   * Moves current position
   * @param  {Boolean} [backward] move backward
   * @param  {Boolean} [includeAll] include comments and whotespace
   */
  step(backward, includeAll) {
    const step = backward ? -1 : 1;
    do {
      this.pos += step;
    } while ((!includeAll) || (!this.isCode));
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

  forEach(callback) {
    const { pos } = this;
    for (let i = 0; i < this.array.length; i += 1) {
      this.pos = i;
      callback(this);
    }
    // keep position
    this.pos = pos;
  }

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

function readToken(stream) {
  if (stream.eat('\r') || stream.eat('\n')) {
    return types.whitespace;
  }

  if (stream.eat(space)) {
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

  if (stream.eat(brackets)) {
    return types.bracket;
  }

  if (stream.eat(label)) {
    return types.label;
  }

  if (stream.eat(variable)) {
    return types.variable;
  }

  if (stream.eat(nonSpace)) {
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
