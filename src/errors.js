
// gather errors by path and message
class Errors {
  constructor(baseline) {
    this.errors = {};
    this.baseline = baseline || {};
  }

  report(path, message, token) {
    if (!(path in this.errors)) {
      this.errors[path] = {};
    }
    if (!(message in this.errors[path])) {
      this.errors[path][message] = [];
    }
    if (typeof token !== 'undefined') {
      this.errors[path][message].push(token);
    }
  }
}

module.export = Errors;
