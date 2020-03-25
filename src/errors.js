// gather errors by path and message
class Errors {
  constructor(baseline) {
    this.errors = {};
    this.baseline = baseline || {};
  }

  report(path, rule, message, token) {
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
      baseline[path] = {};
      Object.keys(this.errors[path]).forEach((r) => {
        const rule = this.errors[path][r];
        const messages = Object.keys(rule);
        const count = messages.reduce((acc, msg) => acc + rule[msg].length, 0);
        baseline[path][r] = count;
      });
    });

    return baseline;
  }
}

module.exports = Errors;
