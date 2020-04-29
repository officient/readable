const { normalisePath } = require('./utils');

// gather errors by path and message
class Errors {
  constructor(baseline) {
    this.errors = {};
    this.baseline = baseline || {};
  }

  isBaselined(path, rule) {
    // errors report pathes OS dependent
    // baseline stores unix-style baseline
    const normalPath = normalisePath(path);
    if (!(normalPath in this.baseline)) {
      return false;
    }

    if (!(rule in this.baseline[normalPath])) {
      return false;
    }

    const left = this.baseline[normalPath][rule];
    if (left === 0) {
      return false;
    }

    this.baseline[normalPath][rule] = left - 1;
    return true;
  }

  report(path, rule, message, token) {
    if (this.isBaselined(path, rule)) {
      return;
    }

    if (!(path in this.errors)) {
      this.errors[path] = {};
    }
    if (!(rule in this.errors[path])) {
      this.errors[path][rule] = {};
    }
    if (!(message in this.errors[path][rule])) {
      this.errors[path][rule][message] = [];
    }
    this.errors[path][rule][message].push(token);
  }

  generateBaseline() {
    const baseline = {};
    Object.keys(this.errors).forEach((path) => {
      const normalPath = normalisePath(path);
      baseline[normalPath] = {};
      Object.keys(this.errors[path]).forEach((r) => {
        const rule = this.errors[path][r];
        const messages = Object.keys(rule);
        const count = messages.reduce((acc, msg) => acc + rule[msg].length, 0);
        baseline[normalPath][r] = count;
      });
    });

    return baseline;
  }
}

module.exports = Errors;
