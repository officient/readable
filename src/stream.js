// helper to parse string and keep track
// of line numbers
class Stream {
  constructor(string) {
    this.string = string;
    this.line = 1;
    this.column = 1;
    this.current = '';
  }

  eof() {
    return (this.string === '');
  }

  next() {
    // update counters
    const lines = this.current.split(/\r?\n/);
    const newLines = lines.length - 1;
    if (newLines > 0) {
      this.line += lines.length - 1;
      this.column = lines[newLines].length + 1;
    } else {
      this.column += this.current.length;
    }

    this.current = '';
  }

  eatChars(count) {
    this.current += this.string.substring(0, count);
    this.string = this.string.substring(count);
  }

  eatString(pattern) {
    if (this.string.startsWith(pattern)) {
      this.eatChars(pattern.length);
      return true;
    }

    return false;
  }

  eat(pattern) {
    if (typeof pattern === 'string') {
      return this.eatString(pattern);
    }

    const match = pattern.exec(this.string);
    if ((match === null) || (match.index !== 0)) {
      return false;
    }

    this.eatChars(match[0].length);
    return true;
  }

  eatUntil(pattern, include) {
    const match = pattern.exec(this.string);
    if ((match === null)) {
      this.eatChars(this.string.length);
    } else {
      this.eatChars(match.index);
      if (include) {
        this.eatChars(match[0].length);
      }
    }
  }
}

module.exports = Stream;
