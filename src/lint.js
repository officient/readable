
/* eslint import/no-dynamic-require:off */
/* eslint global-require:off */

const { readFileSync } = require('fs');
const { flattenDeep } = require('lodash');
const { dirsTree } = require('./utils.js');
const { tokenize } = require('./tokenize');
const Errors = require('./errors');

// load rules from config
function loadRules(rulesConfig) {
  const namespace = [];
  const file = [];

  Object.keys(rulesConfig).forEach((name) => {
    if (rulesConfig[name] === false) {
      return;
    }

    const rule = {
      name,
      module: require(`./rules/${name}`),
      config: rulesConfig[name],
    };

    if (typeof rule.module.checkFiles === 'function') {
      // namespace scope of rule
      namespace.push(rule);
    } else {
      file.push(rule);
    }
  });

  return {
    namespace,
    file,
  };
}


// main lint
function lint(config) {
  const rules = loadRules(config.rules);
  const files = dirsTree(config.pathes, '.php');

  const errors = new Errors(config.baseline);
  // rules with namespace scope
  rules.namespace.forEach(
    (rule) => rule.module.checkFiles(rule.config, files, (path, message) => {
      errors.report(path, rule.name, message, true);
    }),
  );

  // rules with file scope
  flattenDeep(files).forEach((file) => {
    let tokens;
    try {
      const string = readFileSync(file, 'utf8');
      tokens = tokenize(string);
    } catch (err) {
      errors.report(file, `Cant parse file: ${err.message}`);
      return;
    }
    rules.file.forEach(
      (rule) => rule.module.check(rule.config, tokens, (message, token) => {
        errors.report(file, rule.name, message, token);
      }),
    );
  });

  return errors;
}

module.exports = lint;
