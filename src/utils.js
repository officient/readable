const fs = require('fs');
const { join, extname } = require('path');

function walkDir(dir, ext) {
  const filesTree = fs.readdirSync(dir).map((file) => {
    const path = join(dir, file);
    if (fs.statSync(path).isDirectory()) {
      return walkDir(join(path, ''), ext);
    }
    return path;
  });

  return filesTree.filter((file) => (
    (typeof file === 'object') || (extname(file) === ext)));
}

// list files recursivelly (filter by extension)
function dirsTree(dirs, ext) {
  return dirs.map((d) => walkDir(d, ext));
}

// helper to parse string and keep track
// of line numbers
class Stream {
  constructor(string) {
    this.string = string;
    this.start = 0;
    this.pos = 0;
    this.line = 1;
    this.column = 1;
  }

  eof() {
    return (this.start === this.string.length);
  }

  next() {
    // update counters
    const lines = this.current().split(/\r?\n/);
    const newLines = lines.length - 1;
    if (newLines > 0) {
      this.line += lines.length - 1;
      this.column = lines[newLines].length + 1;
    } else {
      this.column += this.pos - this.start;
    }

    this.start = this.pos;
  }

  current() {
    return this.string.slice(this.start, this.pos);
  }

  eatString(pattern) {
    const slice = this.string.slice(this.pos, this.pos + pattern.length);
    if (slice === pattern) {
      this.pos += pattern.length;
      return true;
    }

    return false;
  }

  eat(pattern) {
    if (typeof pattern === 'string') {
      return this.eatString(pattern);
    }

    const reg = new RegExp(`${pattern.source}`, 'gm');
    reg.lastIndex = this.pos;
    const match = reg.exec(this.string);
    if ((match === null) || (match.index !== this.pos)) {
      return false;
    }

    this.pos += match[0].length;
    return true;
  }
}

module.exports = {
  dirsTree,
  Stream,
};
